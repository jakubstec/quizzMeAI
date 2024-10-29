import React from 'react';

const TrueFalseQuestion = ({ question, correctOption, selectedOption, onOptionSelect, questionCounter }) => {
  return (
    <div>
      <p className='mb-4'>{questionCounter}</p>
      <h3 className='text-xl mb-12'>{question}</h3>
      <div className='w-full mt-2 p-2 m-2 grid grid-cols-2 gap-2'>
      <button
          className={`px-4 py-2 rounded ${
            selectedOption === 'false' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => onOptionSelect('false')}
        >
          False
        </button>
        <button
          className={`px-4 py-2 rounded ${
            selectedOption === 'true' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => onOptionSelect('true')}
        >
          True
        </button>
      </div>
    </div>
  );
};

export default TrueFalseQuestion;
