import React from 'react';

const QuizComponent = ({ quizData }) => {
  return (
    <div>
      <h2>Generated Quiz</h2>
      <pre>{JSON.stringify(quizData, null, 2)}</pre>
    </div>
  );
};

export default QuizComponent;
