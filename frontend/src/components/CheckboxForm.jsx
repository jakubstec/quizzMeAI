import React from 'react';

const CheckboxForm = ({ checkedItems, onCheckboxChange }) => {
  const checkboxLabels = [
    "Multiple Choice Questions",
    "True or False",
    "Open Questions",
    "Match the Definition"
  ];

  return (
    <div className='w-3/5 h-auto p-4 m-4 border border-black-500 border-solid'>
      {checkboxLabels.map((label, index) => (
        <label key={index} className='flex items-center py-1 mb-2'>
          <input
            type="checkbox"
            checked={checkedItems[index]}
            onChange={() => onCheckboxChange(index)}
          />
          {label}
        </label>
      ))}
    </div>
  );
};

export default CheckboxForm;
