import React from 'react';

const InputForm = ({ value, onChange, isFileMode, onFileUpload }) => {
  return (
    <div className="mb-4 w-full max-w-2xl mx-auto">
      {!isFileMode ? (
        <textarea
          className="w-full h-60 sm:h-64 md:h-80 lg:h-96 p-4 border border-gray-200 rounded-xl resize-none"
          placeholder="Write your note here or specific topic you want your Quizz about!"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-60 sm:h-64 md:h-80 lg:h-96 border-2 border-gray-300 border-solid rounded-xl cursor-pointer bg-gray-50 dark::bg-gray-300 dark:bg-gray-200 hover:bg-gray-100 dark:border-gray-200 dark:hover:border-gray-100hover">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <br/>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">it's not working yet sorry</p>
          </div>
          <input id="dropzone-file" type="file" onChange={onFileUpload} className="hidden" />
        </label>
      )}
    </div>
  );
};

export default InputForm;
