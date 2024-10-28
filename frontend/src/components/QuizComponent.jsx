import React, { useState } from 'react';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import TrueFalseQuestion from './TrueFalseQuestion';
import OpenQuestion from './OpenQuestion';
import FillTheGapsQuestion from './FillTheGapsQuestion';

const QuizComponent = ({ quizData, checkedItems }) => {
  const [currentSection, setCurrentSection] = useState(getDefaultSection(checkedItems));
  const [selectedOption, setSelectedOption] = useState('');
  const [sectionIndices, setSectionIndices] = useState({
    multipleChoice: 0,
    trueFalse: 0,
    openQuestions: 0,
    fillTheGaps: 0,
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

  if (!currentQuestions || currentQuestions.length === 0) {
    return <div>No questions available in this section</div>;
  }

  const handleNext = () => {
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
    if (currentSection === 'multipleChoice') {
      const { question: questionText, options, correctOption } = question;
      return (
        <MultipleChoiceQuestion
          question={questionText}
          options={options}
          correctOption={correctOption}
          selectedOption={selectedOption}
          onOptionSelect={setSelectedOption}
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
          onOptionSelect={setSelectedOption}
        />
      );
    }
    if (currentSection === 'openQuestions') {
      console.log(currentQuestion);
      const { question: questionText } = question;
      return (
        <OpenQuestion
          question={{questionText }}
          onAnswerChange={(answer) => setSelectedOption(answer)}
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
            setSelectedOption({ ...selectedOption, [gap]: value })
          }
        />
      );
    }
    return <div>Error</div>;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
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
