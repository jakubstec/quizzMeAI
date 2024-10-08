import React, { useState } from 'react';

const ButtonGroup = () => {
  const [selectedButton, setSelectedButton] = useState('default');

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div className="w-full max-w-xs mt-2 p-2 m-2 grid grid-cols-2 gap-2">
      <button
        className={`text-xs rounded-lg ${
          selectedButton === 'default'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => handleButtonClick('default')}
      >
        Default
      </button>
      <button
        className={`py-2 px-2 text-xs rounded-lg ${
          selectedButton === '0-5'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => handleButtonClick('0-5')}
      >
        0-5
      </button>
      <button
        className={`py-2 px-2 text-xs rounded-lg ${
          selectedButton === '5-10'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => handleButtonClick('5-10')}
      >
        5-10
      </button>
      <button
        className={`text-xs rounded-lg ${
          selectedButton === '10-15'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => handleButtonClick('10-15')}
      >
        10-15
      </button>
    </div>
  );
};

export default ButtonGroup;
