import React, { useState } from 'react';

const DifficultyButtonGroup = () => {
  const [selectedButton, setSelectedButton] = useState('normal');

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div className="w-full max-w-xs mt-2 p-2 m-2 grid grid-cols-3 gap-2">
      <button
        className={`py-2 px-2 text-xs rounded-lg ${
          selectedButton === 'easy'
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => handleButtonClick('easy')}
      >
        <span className="hidden md:inline">Easy</span>
        <span className="md:hidden">E</span> 
      </button>

      <button
        className={`py-2 px-2 text-xs rounded-lg ${
          selectedButton === 'normal'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => handleButtonClick('normal')}
      >
        <span className="hidden md:inline">Normal</span>
        <span className="md:hidden">N</span>
      </button>

      <button
        className={`py-2 px-2 text-xs rounded-lg ${
          selectedButton === 'hard'
            ? 'bg-red-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => handleButtonClick('hard')}
      >
        <span className="hidden md:inline">Hard</span>
        <span className="md:hidden">H</span>
      </button>
    </div>
  );
};

export default DifficultyButtonGroup;
