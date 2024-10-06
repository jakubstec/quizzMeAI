import React from 'react';

const InputForm = ({ value, onChange, isFileMode, onFileUpload }) => {
  return (
    <div className="mb-4 w-full">
      {!isFileMode ? (
        <textarea
        className="h-96 p-4 w-full border border-black-500 border-solid"
        placeholder="Write your note here or specific topic you want your Quizz about!"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      ) : (
        
        <>
        
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-96 border-2 border-black-300 border-solid rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-300 dark:bg-gray-200 hover:bg-gray-100 dark:border-gray-200 dark:hover:border-gray-100">
        <div className="h-96 w-full flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-black-500 dark:text-black-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-black-500 dark:text-black-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
          
        </div>
         <input
          id="dropzone-file"
           type="file"
           onChange={onFileUpload}
           className="hidden"
         />
    </label>
        </>
      )}
    </div>
  );
};

export default InputForm;
