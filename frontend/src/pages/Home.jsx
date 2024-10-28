import React, { useState } from 'react';
import Header from '../components/Header';
import InputForm from '../components/InputForm';
import CheckboxForm from '../components/CheckboxForm';
import GenerateButton from '../components/GenerateButton';
import ButtonGroup from '../components/ButtonGroup';
import QuizComponent from '../components/QuizComponent';
import DifficultyButtonGroup from '../components/DifficultyButtonGroup';

const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [checkedItems, setCheckedItems] = useState([true, true, true, true]);
  const [isFileMode, setIsFileMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState(null);

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleCheckboxChange = (index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log('Uploaded file:', file);
    // todo ocr (file to text conversion)
    // todo show file name after upload (InputForm.jsx)

    const file_to_text = "bb";
  }

  
  const handleGoBack = () => {
    setQuizData(null);
    setInputValue('');
    setCheckedItems([true,true,true,true]);
    setIsFileMode(false);
    setQuizData(null);
  
  };

  const file_to_text = "aa";

  const handleSubmit = async () => {

    // if user unchecked every box
    const activeTypes = checkedItems.filter(item => item).length;

    if (activeTypes === 0) {
        return alert("No question types selected.");
    }

    // todo: wordCount from file ocr handling
    // todo: add difficulty levels and send them to backend
    const wordCount = inputValue.split(/\s+/).filter(word => word).length;


    if(wordCount == 0) {
      return alert("empty input");
      
    }

    setLoading(true);

    let totalQuestions = 0;

    //  fix whole calculating of quiz options 😭 and add maybe random option
    const percentages = {
      multipleChoice: 0.4,    
      trueFalse: 0.2,         
      openQuestions: 0.2,     
      fillTheGaps: 0.2
    };

    let questionDistribution = {
      multipleChoice: 0,
      trueFalse: 0,
      openQuestions: 0,
      fillTheGaps: 0
    };

    checkedItems.forEach((isChecked) => {
      if (isChecked) {
        totalQuestions++;
      }
    })

    // user wrote probably wrote an topic, not a note
    // so API might use general knowledge to generate a quiz
    if(wordCount < 30) {
      totalQuestions = 10;
    } else {
      // might change to /75
      totalQuestions += Math.floor(wordCount/100);
    }

    if (checkedItems[0]) questionDistribution.multipleChoice += Math.floor(totalQuestions * percentages.multipleChoice);
    if (checkedItems[1]) questionDistribution.trueFalse += Math.floor(totalQuestions * percentages.trueFalse);
    if (checkedItems[2]) questionDistribution.openQuestions += Math.floor(totalQuestions * percentages.openQuestions);
    if (checkedItems[3]) questionDistribution.fillTheGaps += Math.floor(totalQuestions * percentages.fillTheGaps);
    
    const distributedQuestions = Object.values(questionDistribution).reduce((sum, value) => sum + value, 0);

    let remainderQuestions = totalQuestions - distributedQuestions;

    if (remainderQuestions > 0) {
          for (let i = 0; i < checkedItems.length; i++) {
            if (checkedItems[i] && remainderQuestions > 0) {
              // Assign extra questions to first available checked types
              switch (i) {
                case 0:
                  questionDistribution.multipleChoice += 1;
                  break;
                case 1:
                  questionDistribution.trueFalse += 1;
                  break;
                case 2:
                  questionDistribution.openQuestions += 1;
                  break;
                case 3:
                  questionDistribution.fillTheGaps += 1;
                  break;
              }
              remainderQuestions -= 1;
            }
          }
        }

    const dataToSend = {
      input: !isFileMode ? inputValue : file_to_text,
      //checkboxes: checkedItems, 
      //wordCount, 
      questionDistribution
    };

    try {
      const response = await fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if(response.ok) {
        const quizData = await response.json();
        setQuizData(quizData);
      } else {
        alert("Failed to generate quiz ;( try again")
      }
    } catch (error) {
      alert('Failed to connect to the server');
    } finally {
      setLoading(false);
    }

  };
  return (
    <>
      <Header isQuizDisplayed={!!quizData}/>
      
      <div className="flex flex-col items-center p-4">
      {!quizData && (
        <>
        <div className="flex justify-between w-full max-w-5xl">
          <div className="w-3/5">
            <div className='align-top flex content-center items-center'>
            <button
              className={`rounded px-4 py-2 m-2 ${!isFileMode ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setIsFileMode(false)}
            >
              Note
            </button>
            <button
              className={`rounded px-4 py-2 ${isFileMode ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setIsFileMode(true)}
            >
              File
            </button>
          </div>
            <InputForm
              value={inputValue}
              onChange={handleInputChange}
              isFileMode={isFileMode}
              onFileUpload={handleFileUpload}
            />
          </div>
      
          <div className="w-2/5 ml-4">
          <p className='text-xs'>Question types</p>
            <CheckboxForm
              checkedItems={checkedItems}
              onCheckboxChange={handleCheckboxChange}
            />
            <p className='text-xs'>Number of questions</p>
            <ButtonGroup/>
            <p className='text-xs'>Difficulty level</p>
            <DifficultyButtonGroup/>
          </div>
        </div>

        <div className="mt-6">
          <GenerateButton onClick={handleSubmit} />
        </div>
        </>
      )}
        

        {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-12 mb-4 rounded-lg shadow-lg">
        <div className="text-center">
            <div role="status">
                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
        
                <p className='my-2'>generating your quizz, pleaseee wait!</p>
                <p className='text-xs mt-2'>(if it's taking too long, refresh the page)</p>
              
            </div>
          </div>
          </div>
        </div>
      )}
      {quizData && (
        <div className="w-full h-full">
          <QuizComponent quizData={quizData} checkedItems={checkedItems} />

          <button
            onClick={handleGoBack}
            className="fixed bottom-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50 quit-button">
            Quit
          </button>
        </div>
      )}

      </div>
    </>
  );
};

export default Home;
