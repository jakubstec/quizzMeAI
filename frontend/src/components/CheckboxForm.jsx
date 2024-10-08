import React from 'react';

const CheckboxForm = ({ checkedItems, onCheckboxChange }) => {
  const checkboxLabels = [
    "Multiple Choice Questions",
    "True or False",
    "Open Questions",
    "Fill the Gaps"
  ];

  return (
    <div className="w-full max-w-xs p-2 m-2 border border-gray-400 rounded-xl">
      {checkboxLabels.map((label, index) => (
        <label key={index} className="flex items-center py-1 mb-2 text-xs">
          <input
            type="checkbox"
            className="mr-1"
            checked={checkedItems[index]}
            onChange={() => onCheckboxChange(index)}
          />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckboxForm;
