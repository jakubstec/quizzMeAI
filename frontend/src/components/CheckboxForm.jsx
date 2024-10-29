import React from 'react';

const CheckboxForm = ({ checkedItems, onCheckboxChange }) => {
  const checkboxLabels = [
    "Multiple Choice Questions",
    "True or False",
    "Open Questions",
    "Fill the Gaps"
  ];

  return (
    <div className="w-full max-w-xs p-2 m-2 border border-gray-200 rounded-xl">
      {checkboxLabels.map((label, index) => (
        <label key={index} className="flex items-center py-1 mb-2 text-xs">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 mr-2"
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
