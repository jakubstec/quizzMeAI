import React from 'react';

const OpenQuestion = ({ question, onAnswerChange }) => {
  return (
    <div>
      <p className="mb-4">question 1/10</p>
      <h3 className="text-xl mb-12">{question}</h3>
      <textarea
        name="openAnswer"
        rows="5"
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Type your answer here..."
        onChange={(e) => onAnswerChange(e.target.value)}
      />
    </div>
  );
};

export default OpenQuestion;
