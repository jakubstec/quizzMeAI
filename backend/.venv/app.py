import json
from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os

#load environment variables from .env file
load_dotenv()

#get the api key from .env file
API_KEY = os.getenv('API_KEY')

#initialize flask app
app = Flask(__name__)
#enable CORS
CORS(app)

#setup google gemini ai api key
genai.configure(api_key=API_KEY)

#model configuration
generation_config = {
    "temperature": 0.8,
    "top_p": 0.9,
    "top_k": 80,
    "max_output_tokens": 1500,
    "response_mime_type": "application/json",  # Ensure response is JSON
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)


#define a route for generating quizes 
@app.route('/', methods=['POST'])
def get_quiz():
    #get data from input form in json
    data = request.json
    
    input_data = data.get('input')
    question_distribution = data.get('questionDistribution')
    difficulty = data.get('selectedDifficulty')

    prompt = f"""
    You are an assistant for a learning platform. Your job is to analyze the provided text or topic and generate questions based on the topic. Please generate the questions (in language text is provided). If it says for example "0 multiplechoice questions" using the following structure:

    {question_distribution.get('multipleChoice')} multiple-choice questions (A B C D). Format each question like this:
    "multipleChoice": [
    {{
        "question": "What is the capital of France?",
        "options": {{ "A": "Berlin", "B": "Madrid", "C": "Paris", "D": "Rome" }},
        "correct": "C"
    }}
    ],
    {question_distribution.get('trueFalse')} true or false questions. Format each question like this:
    "trueFalse": [
    {{
        "question": "The sky is blue.",
        "correct": "true"
    }}
    ],
    {question_distribution.get('openQuestions')} open questions. Format each question like this:
    "openQuestions": [
    {{
        "question": "Explain the theory of relativity.",
        "suggestedAnswer": "The theory of relativity is ..."
    }}
    ],
    {question_distribution.get('fillTheGaps')} fill-the-gaps questions. Format each like this:
    "fillTheGaps": [
    {{
        "text": "The quick ___ fox jumps over the ___ dog.",
        "options": {{
            "gap1": {{ "A": "brown", "B": "black", "C": "white" }},
            "gap2": {{ "A": "lazy", "B": "fast", "C": "sleepy" }}
        }},
        "correct": ["A", "A"]
    }}
    ]
    Please ensure the response is in **valid JSON** format and does not contain any extra explanations or characters. There are 3 levels of quiz difficulty: easy (treat as normal) - simple questions but creative; normal (treat as hard) - more intermediate, specific but creative questions that require effort; hard (treat as very hard) - very specific creative non generic questions, challenging, very intermediate. User has chosen: {difficulty}.Here is the topic: "{input_data}"
    """



    #start a chat session with ai model and give him a query
    chat_session = model.start_chat()
    response = chat_session.send_message(prompt)

    quiz_json = response.text
    try:
        # try to parse bot response as a JSON
        # and convert it into python dictionary
        quiz_data = json.loads(quiz_json)
        # todo: send retry prompt if failed
    except json.JSONDecodeError as e:
        #raise an error while failed
        print(f"JSON decoding error: {e}")
        return jsonify({"error": "Failed to decode JSON response"}), 500
    
    #return json to client
    return jsonify(quiz_data)

# run the flask app in debug mode to allow auto reloading while development
if __name__ == '__main__':
    app.run(debug=False)