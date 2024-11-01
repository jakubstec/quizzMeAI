import React, { useState } from 'react';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import TrueFalseQuestion from './TrueFalseQuestion';
import OpenQuestion from './OpenQuestion';
import FillTheGapsQuestion from './FillTheGapsQuestion';

const QuizComponent = ({ quizData, checkedItems }) => {
  const [currentSection, setCurrentSection] = useState(getDefaultSection(checkedItems));
  const [selectedOption, setSelectedOption] = useState('');
  const [currentTotalQuestionIndex, setCurrentTotalQuestionIndex] = useState(1);
  const [sectionIndices, setSectionIndices] = useState({
    multipleChoice: 0,
    trueFalse: 0,
    openQuestions: 0,
    fillTheGaps: 0,
  });

  const [responses, setResponses] = useState({
    multipleChoice: {},
    trueFalse: {},
    OpenQuestions: {},
    fillTheGaps: {},
  });

  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);

  function getDefaultSection(checkedItems) {
    const sections = ['multipleChoice', 'trueFalse', 'openQuestions', 'fillTheGaps'];
    for (let i = 0; i < checkedItems.length; i++) {
      if (checkedItems[i]) {
        return sections[i];
      }
    }
    return '';
  }
  if (!quizData) {
    return <div>No quiz data available</div>;
  }

  const currentQuestions = quizData[currentSection];
  const currentQuestionIndex = sectionIndices[currentSection] || 0;
  const currentQuestion = currentQuestions ? currentQuestions[currentQuestionIndex] : null;

  const totalQuestions = Object.keys(quizData).reduce((count, section) => {
    return count + (quizData[section] ? quizData[section].length : 0);
  }, 0);

  if (!currentQuestions || currentQuestions.length === 0) {
    return <div>No questions available in this section</div>;
  }

  const handleNext = () => {
    if(currentTotalQuestionIndex<totalQuestions) {
      setCurrentTotalQuestionIndex(currentTotalQuestionIndex+1)
    }

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setSectionIndices({
        ...sectionIndices,
        [currentSection]: currentQuestionIndex + 1,
      });
      setSelectedOption('');
    } else {
      const nextSection = getNextSection(currentSection);
      if (nextSection) {
        setCurrentSection(nextSection);
        setSelectedOption('');
      } else {
        setQuizComplete(true);
        collectIncorrectQuestions();
      }
    }
  };

  const handleBack = () => {
    if(currentTotalQuestionIndex>0) {
      setCurrentTotalQuestionIndex(currentTotalQuestionIndex-1)
    }
    if (currentQuestionIndex > 0) {
      setSectionIndices({
        ...sectionIndices,
        [currentSection]: currentQuestionIndex - 1,
      });
      setSelectedOption('');
    } else {
      const previousSection = getPreviousSection(currentSection);
      if (previousSection) {
        setCurrentSection(previousSection);
        setSelectedOption('');
      }
    }
  };

  const handleOptionSelect = (option) => {
    let isCorrect = 0;

    if (currentSection === "fillTheGaps") {
      const isFillTheGapsCorrect = (option, correct) => {
        const selectedValues = Object.values(option);

        return selectedValues.length === correct.length && selectedValues.every((value, index) => value === correct[index]);
      };
      
      isCorrect = isFillTheGapsCorrect(option, currentQuestion.correct);
    } else {
      isCorrect = option === currentQuestion.correct;
    }

    console.log(isCorrect);

    setResponses((prevResponses) => ({
      ...prevResponses,
      [currentSection]: {
        ...prevResponses[currentSection],
        [currentQuestionIndex]: {
          option,
          isCorrect
        }
      }
    }));


    setScore((prevScore) => {
      const prevAnswer = responses[currentSection]?.[currentQuestionIndex];
      if(prevAnswer) {
        if(prevAnswer.isCorrect && !isCorrect) return prevScore - 1;
        if(!prevAnswer.isCorrect && isCorrect) return prevScore + 1;
      } else {
        return isCorrect ? prevScore + 1 : prevScore;
      }
      return prevScore;
    })
  }

  function collectIncorrectQuestions() {
    const incorrect = [];
    Object.keys(quizData).forEach((section) => {
      quizData[section].forEach((question, questionIndex) => {
        const userResponse = responses[section]?.[questionIndex];
        
        if (!userResponse || !userResponse.isCorrect) {
          incorrect.push({
            section,
            question: question,
            userAnswer: userResponse?.option || 'No answer selected',
            correctAnswer: question.correct,
          });
        }
      });
    });
    setIncorrectQuestions(incorrect);
  }

  function getNextSection(section) {
    const sections = ['multipleChoice', 'trueFalse', 'openQuestions', 'fillTheGaps'];
    const currentIndex = sections.indexOf(section);
    return currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
  }

  function getPreviousSection(section) {
    const sections = ['multipleChoice', 'trueFalse', 'openQuestions', 'fillTheGaps'];
    const currentIndex = sections.indexOf(section);
    return currentIndex > 0 ? sections[currentIndex - 1] : null;
  }

  const renderQuestion = (question) => {
    const questionCounter = `Question ${currentTotalQuestionIndex} of ${totalQuestions}`;
    const selectedOption = responses[currentSection]?.[currentQuestionIndex]?.option || '';

    if (currentSection === 'multipleChoice') {
      const { question: questionText, options, correctOption } = question;
      return (
        <MultipleChoiceQuestion
          question={questionText}
          options={options}
          correctOption={correctOption}
          selectedOption={selectedOption}
          onOptionSelect={handleOptionSelect}
          questionCounter={questionCounter}
        />
      );
    }
    if (currentSection === 'trueFalse') {
      const { question: questionText, correctOption } = question;
      return (
        <TrueFalseQuestion
          question={questionText}
          correctOption={correctOption}
          selectedOption={selectedOption}
          onOptionSelect={handleOptionSelect}
          questionCounter={questionCounter}
        />
      );
    }
    if (currentSection === 'openQuestions') {
      const { question: questionText } = question;
      return (
        <OpenQuestion
          question={{questionText }}
          selectedAnswer={selectedOption}
          onAnswerChange={(answer) => handleOptionSelect(answer)}
          questionCounter={questionCounter}
        />
      );
    }
    if (currentSection === 'fillTheGaps') {
      const { text, options } = question;
      return (
        <FillTheGapsQuestion
          question={{ text, options }}
          selectedOptions={selectedOption}
          onOptionSelect={(gap, value) =>
            handleOptionSelect({ ...selectedOption, [gap]: value })
          }
          questionCounter={questionCounter}
        />
      );
    }
    return <div>Error</div>;
  };

  const renderIncorrectQuestions = () => (
    <div>
      <h2 className="text-xl font-bold mb-4">Review Incorrect or Unanswered Questions</h2>
      {incorrectQuestions.map((item, index) => {
        const { question, userAnswer, correctAnswer, section } = item;
        const isFillTheGaps = section === 'fillTheGaps';
        const isOpenQuestion = section === 'openQuestions';
        const answerLabel = isOpenQuestion ? 'Suggested Answer' : 'Correct Answer';
  
        const formatCorrectAnswer = () => {
          if (isFillTheGaps) {
            return question.correct.map((correctKey, idx) => {
              const gapKey = `gap${idx + 1}`;
              const gapOptions = question.options[gapKey] || {};
              return gapOptions[correctKey] || 'N/A';
            }).join(', ');
          } else if (section === 'multipleChoice') {
            return question.options[correctAnswer] || 'N/A';
          }
          return correctAnswer;
        };
  
        const formatUserAnswer = () => {
          if (!userAnswer || userAnswer === 'No answer selected') return 'No answer selected';
          if (isFillTheGaps) {
            return Object.entries(userAnswer)
              .map(([gap, value]) => {
                const gapOptions = question.options?.[gap] || {};
                return `${gap}: ${gapOptions[value] || 'N/A'}`;
              })
              .join(', ');
          }
          return section === 'multipleChoice' ? question.options[userAnswer] : userAnswer;
        };
  
        const descriptiveCorrectAnswer = formatCorrectAnswer();
  
        return (
          <div key={index} className="mb-6 p-4 border rounded-md bg-gray-100">
            <h3 className="text-lg font-semibold mb-2">
              {isFillTheGaps ? question.text : question.question || question.text}
            </h3>
            <div className="text-sm text-gray-700 mb-2">
              <strong>Question Type:</strong> {section.replace(/([A-Z])/g, ' $1')}
            </div>
            <div className="mb-2">
              <p className="text-red-600 font-semibold">Your answer: {formatUserAnswer()}</p>
              <p className="text-green-600 font-semibold">{answerLabel}: {isOpenQuestion ? question.suggestedAnswer : descriptiveCorrectAnswer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
  
  
  if (quizComplete) {
    return (
      <div className="flex justify-center items-center min-h-screen mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-xl font-bold mb-4">Quiz Results</h2>
          <p>Your Score: {score} out of {totalQuestions}</p>
          <br/>
          {renderIncorrectQuestions()}
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="flex justify-center items-center min-h-screen -mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="max-w-screen-md mx-auto">
            {renderQuestion(currentQuestion)}
          </div>
          <div className="flex justify-center mt-6 gap-4">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={handleBack}
              disabled={currentQuestionIndex === 0 && currentSection === 'multipleChoice'}
            >
              Back
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleNext}
            >
              {currentSection === 'fillTheGaps' && currentQuestionIndex === currentQuestions.length - 1
                ? 'Finish'
                : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default QuizComponent;
