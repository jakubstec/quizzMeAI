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
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 1000,
    "response_mime_type": "application/json",  # Ensure response is JSON
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

#define a route for generating quizes 
@app.route('/api/get-quiz', methods=['POST'])
def get_quiz():
    #extract user input from POST request's JSON body
    userQuery = request.json.get("text", "")

    #start a chat session with ai model and give him a query
    chat_session = model.start_chat()
    response = chat_session.send_message(
        "You are an assistant for a learning platform. Analyze the provided text and generate a quiz with 5 multiple-choice questions (A, B, C, D) based on the topic discussed in the text. Each question should include the options and the correct answer. Format the output as JSON, like this: [{'question': '...', 'options': {'A': '...', 'B': '...', 'C': '...', 'D': '...'}, 'correct': '...' }, ...]. Here is the user's text: " + userQuery
    )

    quiz_json = response.text

    try:
        # try to parse bot response as a JSON
        # and convert it into python dictionary
        quiz_data = json.loads(quiz_json)
    except json.JSONDecodeError as e:
        #raise an error while failed
        print(f"JSON decoding error: {e}")
        return jsonify({"error": "Failed to decode JSON response"}), 500
    
    #return json to client
    # print(jsonify(quiz_data))
    return jsonify(quiz_data)

# run the flask app in debug mode to allow auto reloading while development
if __name__ == '__main__':
    app.run(debug=True)