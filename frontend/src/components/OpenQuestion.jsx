import React from 'react';

const OpenQuestion = ({ question, onAnswerChange, selectedAnswer, questionCounter }) => {
  return (
    <div>
      <p className='mb-4'>{questionCounter}</p>
      <h3 className="text-xl mb-12">{question.questionText}</h3>
      <textarea
        name="openAnswer"
        rows="5"
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Type your answer here..."
        value={selectedAnswer}
        onChange={(e) => onAnswerChange(e.target.value)}
      />
    </div>
  );
};

export default OpenQuestion;
