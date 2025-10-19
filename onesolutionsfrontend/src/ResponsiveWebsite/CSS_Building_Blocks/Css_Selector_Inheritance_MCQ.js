import React, { useState, useEffect, useRef } from "react";

const Css_Selector_Inheritance_MCQ = () => {
  const originalQuestions = [
  {
    question: "Which symbol is used for a CSS class selector?",
    options: [".", "#", "*", "$"],
    answer: ".",
  },
  {
    question: "How many elements in an HTML document can have the same ID?",
    options: ["Multiple elements", "Only one element", "Two elements", "None"],
    answer: "Only one element",
  },
  {
    question: "Which CSS selector selects elements by tag name?",
    options: [".className", "#idName", "p", "*"],
    answer: "p",
  },
  {
    question: "Which CSS concept passes styles from parent to child elements?",
    options: ["Specificity", "Cascade", "Inheritance", "Selector"],
    answer: "Inheritance",
  },
  {
    question: "Which of these CSS properties are typically inherited?",
    options: [
      "font-family, color, list-style-type",
      "width, height, margin",
      "background-color, padding",
      "border-style, border-width",
    ],
    answer: "font-family, color, list-style-type",
  },
  {
    question: "Which CSS properties are NOT inherited by default?",
    options: [
      "font-size, color",
      "margin, padding, border-style",
      "text-align, font-weight",
      "list-style-type, font-family",
    ],
    answer: "margin, padding, border-style",
  },
  {
    question: "Which CSS selector uses a hash (#) symbol?",
    options: ["Class selector", "ID selector", "Type selector", "Universal selector"],
    answer: "ID selector",
  },
  {
    question: "If a <div> contains an <h1> and a <p>, what is the <div> called?",
    options: ["Child element", "Parent element", "Sibling element", "Ancestor element"],
    answer: "Parent element",
  },
  {
    question: "Which CSS property is inherited by default?",
    options: ["padding", "margin", "color", "border-width"],
    answer: "color",
  },
  {
    question: "Which CSS selector selects all elements in the document?",
    options: [".all", "*", "#all", "html"],
    answer: "*",
  },
];
  
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
    const [questions] = useState(shuffleArray([...originalQuestions]));
  
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [skippedQuestions, setSkippedQuestions] = useState([]);
    const [showingSkipped, setShowingSkipped] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [timeLeft, setTimeLeft] = useState(10);
    const timerRef = useRef(null);
  
    useEffect(() => {
      if (completed) return;
      setTimeLeft(10);
  
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
  
      return () => clearInterval(timerRef.current);
    }, [currentIndex, completed]);
  
    const nextQuestion = () => {
      clearInterval(timerRef.current);
      setSelectedAnswer(null);
      setFeedback(null);
  
      if (!showingSkipped) {
        if (currentIndex + 1 < questions.length) setCurrentIndex((prev) => prev + 1);
        else if (skippedQuestions.length > 0) {
          setShowingSkipped(true);
          setCurrentIndex(0);
        } else setCompleted(true);
      } else {
        if (currentIndex + 1 < skippedQuestions.length) setCurrentIndex((prev) => prev + 1);
        else setCompleted(true);
      }
    };
  
    const handleNext = () => {
      if (!selectedAnswer) return;
  
      const currentQuestion = showingSkipped
        ? questions[skippedQuestions[currentIndex]]
        : questions[currentIndex];
  
      const isCorrect = selectedAnswer === currentQuestion.answer;
      let points = 0;
      if (isCorrect) points = timeLeft > 0 ? 10 : 7;
      else points = -5;
  
      setScore((prev) => prev + points);
      setFeedback({ correct: isCorrect, points });
    };
  
    const handleSkip = () => {
      if (!showingSkipped) setSkippedQuestions((prev) => [...prev, currentIndex]);
      nextQuestion();
    };
  
    if (questions.length === 0) return <p>Loading questions...</p>;
  
    const currentQuestion = showingSkipped
      ? questions[skippedQuestions[currentIndex]]
      : questions[currentIndex];
  
    const questionNumber = showingSkipped
      ? questions.length - skippedQuestions.length + currentIndex + 1
      : currentIndex + 1;
  
    const percentage = (score / (questions.length * 10)) * 100;
  
    const getNextButtonLabel = () => {
      if (showingSkipped && currentIndex + 1 === skippedQuestions.length) return "Finish";
      if (!showingSkipped && currentIndex + 1 === questions.length && skippedQuestions.length === 0)
        return "Finish";
      return "Next";
    };
  
    return (
      <div className="mcq-container full-width">
        <h3 className="mcq-title">Css SelectorInheritance - MCQs</h3>
  
        {!completed ? (
          <div className="mcq-question-block">
            <p className="mcq-question">
              Q{questionNumber}. {currentQuestion.question}
            </p>
  
            <ul className="mcq-options">
              {currentQuestion.options.map((option) => (
                <li key={option} className="mcq-option">
                  <label>
                    <input
                      type="radio"
                      name={`q${currentIndex}`}
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                      disabled={feedback !== null}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
  
            {feedback && (
              <div className={`mcq-feedback ${feedback.correct ? "correct" : "wrong"}`}>
                {feedback.correct
                  ? `✅ Correct! +${feedback.points}`
                  : `❌ Wrong! -${Math.abs(feedback.points)}`}
              </div>
            )}
  
            <div className="mcq-buttons">
              <button
                className="mcq-next"
                disabled={!selectedAnswer}
                onClick={feedback ? nextQuestion : handleNext}
              >
                {getNextButtonLabel()}
              </button>
              {!showingSkipped && (
                <button className="mcq-skip" onClick={handleSkip} disabled={feedback !== null}>
                  Skip
                </button>
              )}
            </div>
  
            <div className={`mcq-timer ${timeLeft === 0 ? "time-over" : ""}`}>
              Time Left: {timeLeft} sec
            </div>
          </div>
        ) : (
          <div className="mcq-completed">
            <h4>✅ Quiz Completed!</h4>
            <p>Your Score: {score} / {questions.length * 10}</p>
            <p className="score-feedback">
              {percentage < 50
                ? "Poor performance. You need to improve!"
                : percentage <= 80
                ? "Good performance. Keep practicing!"
                : "Excellent performance. Well done!"}
            </p>
          </div>
        )}
      </div>
    );
  };
  

export default Css_Selector_Inheritance_MCQ
