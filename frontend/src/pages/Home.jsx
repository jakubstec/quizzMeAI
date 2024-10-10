import React, { useState } from 'react';
import Header from '../components/Header';
import InputForm from '../components/InputForm';
import CheckboxForm from '../components/CheckboxForm';
import GenerateButton from '../components/GenerateButton';
import ButtonGroup from '../components/ButtonGroup';
import QuizComponent from '../components/QuizComponent';

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
            <CheckboxForm
              checkedItems={checkedItems}
              onCheckboxChange={handleCheckboxChange}
            />
            <ButtonGroup/>
          </div>
        </div>

        <div className="mt-6">
          <GenerateButton onClick={handleSubmit} />
        </div>
        </>
      )}
        

        {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p>generating your quizz, pleaseee wait!</p>
          </div>
        </div>
      )}
      {quizData && (
        <div className="quiz-output mt-8">
          <QuizComponent quizData={quizData} />

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
