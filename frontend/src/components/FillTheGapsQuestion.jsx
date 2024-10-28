import React from 'react';

const FillTheGapsQuestion = ({ question, selectedOptions, onOptionSelect }) => {
  const { text, options } = question;

  return (
    <div>
      <p className="mb-4">question 1/10</p>
      <h3 className="text-xl mb-12">{text}</h3>
      <div>
        {Object.keys(options).map((gap, index) => (
          <div key={gap} className="mb-4">
            <label htmlFor={gap} className="block mb-2">Gap {index + 1}:</label>
            <select
              id={gap}
              name={gap}
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedOptions[gap] || ""}
              onChange={(e) => onOptionSelect(gap, e.target.value)}
            >
              <option value="" disabled>Select an option</option>
              {Object.entries(options[gap]).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FillTheGapsQuestion;
