import React from 'react';

const MultipleChoiceQuestion = ({ question, options, correctOption, selectedOption, onOptionSelect, questionCounter }) => {
  return (
    <div>
      <p className='mb-4'>{questionCounter}</p>
      <h3 className='text-xl mb-12'>{question}</h3>
      <div className='w-full mt-2 p-2 m-2 grid grid-cols-2 gap-2'>
        {Object.keys(options).map((key) => (
          <button
            key={key}
            className={`px-4 py-2 rounded ${
              selectedOption === key ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => onOptionSelect(key)}
          >
            {options[key]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
