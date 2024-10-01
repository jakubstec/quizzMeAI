import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Quiz = () => {
    const [questions, setQuestions] = useState([]); // Start with an empty array
    const [inputText, setInputText] = useState(''); // For user input
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true); // Start loading state

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/get-quiz', { text: inputText });
            const data = response.data; // Assuming the API returns the data correctly
            console.log("Fetched data:", data); // Log the response data for debugging
            
            if (Array.isArray(data)) {
                setQuestions(data); // Update state only if data is an array
            } else {
                console.error("Unexpected response format:", data);
                setError("Unexpected response format");
            }
        } catch (error) {
            console.error("Error fetching quiz data:", error);
            setError("Error fetching quiz data");
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    const handleAnswerSelection = (option, questionIndex) => {
        setSelectedAnswer(option);
        setCorrectAnswer(option === questions[questionIndex].correct ? "Correct!" : "Incorrect, the correct answer is " + questions[questionIndex].correct);
    };

    return (
        <div>
            <h1>Quiz</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)} // Update input state
                    placeholder="Enter some text for quiz generation"
                    required
                />
                <button type="submit">Submit</button>
            </form>

            {loading ? (
                <p>Loading questions...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                questions.map((q, index) => ( // Directly map over questions
                    <div key={index}>
                        <p>{q.question}</p>
                        {q.options && typeof q.options === 'object' ? (
                            Object.entries(q.options).map(([key, value]) => (
                                <div key={key}>
                                    <input
                                        type="radio"
                                        name={`question${index}`}
                                        value={key}
                                        onChange={() => handleAnswerSelection(key, index)}
                                    />
                                    <label>{`${key}: ${value}`}</label>
                                </div>
                            ))
                        ) : (
                            <p>No options available for this question.</p>
                        )}
                        {selectedAnswer && <p>{correctAnswer}</p>}
                    </div>
                ))
            )}
        </div>
    );
};

export default Quiz;