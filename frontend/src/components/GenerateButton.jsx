import React from 'react';

const GenerateButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
    >
      Generate
    </button>
  );
};

export default GenerateButton;
