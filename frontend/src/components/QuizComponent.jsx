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
    setResponses((prevResponses) => ({
      ...prevResponses,
      [currentSection]: {
        ...prevResponses[currentSection],
        [currentQuestionIndex]: option
      }
    }));
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
    const selectedOption = responses[currentSection]?.[currentQuestionIndex] || '';

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

  return (
    <div className="flex justify-center items-center min-h-screen -mt-16">
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
};

export default QuizComponent;
