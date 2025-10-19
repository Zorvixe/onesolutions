import React, { useState, useEffect, useRef } from "react";

const Introductionto_Css_MCQ_1 = ({ onComplete }) => {
  const originalQuestions = [
    {
      question: "Which HTML element defines a container?",
      options: ["<div>", "<section>", "<container>", "<span>"],
      answer: "<div>"
    },
    {
      question: "Refer to the given CSS code and choose which of the following is a CSS Property.",
      options: ["text-align", ".h-center", "center", "align-text"],
      answer: "text-align"
    },
    {
      question: "The CSS text-align property specifies the ______ of the text in an HTML element.",
      options: ["vertical alignment", "horizontal alignment", "font size", "color"],
      answer: "horizontal alignment"
    },
    {
      question: "Refer to the given CSS code and choose which of the following is a value for the CSS Property text-align.",
      options: ["right", ".h-right", "centered", "text-right"],
      answer: "right"
    },
    {
      question: "Which CSS property is used to set the background color of an element?",
      options: ["color", "bgcolor", "background-color", "background"],
      answer: "background-color"
    },
    {
      question: "Which CSS property is used to change the text color?",
      options: ["color", "text-color", "font-color", "fgcolor"],
      answer: "color"
    },
    {
      question: "Which CSS property controls the space inside an element's border?",
      options: ["margin", "padding", "border-spacing", "spacing"],
      answer: "padding"
    },
    {
      question: "Which CSS property controls the space outside an element's border?",
      options: ["margin", "padding", "border-spacing", "spacing"],
      answer: "margin"
    },
    {
      question: "Which CSS property is used to change the font size of text?",
      options: ["font-style", "font-weight", "font-size", "text-size"],
      answer: "font-size"
    },
    {
      question: "Which CSS property is used to make text bold?",
      options: ["font-weight", "font-style", "text-bold", "font-bold"],
      answer: "font-weight"
    }
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
  
    // Timer
    useEffect(() => {
      if (completed) return;
      setTimeLeft(10);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timerRef.current);
    }, [currentIndex, completed]);
  
    const nextQuestion = () => {
      clearInterval(timerRef.current);
      setSelectedAnswer(null);
      setFeedback(null);
  
      if (!showingSkipped) {
        if (currentIndex + 1 < questions.length) setCurrentIndex(prev => prev + 1);
        else if (skippedQuestions.length > 0) {
          setShowingSkipped(true);
          setCurrentIndex(0);
        } else {
          setCompleted(true);
          if (onComplete) onComplete();
        }
      } else {
        if (currentIndex + 1 < skippedQuestions.length) setCurrentIndex(prev => prev + 1);
        else {
          setCompleted(true);
          if (onComplete) onComplete();
        }
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
  
      setScore(prev => prev + points);
      setFeedback({ correct: isCorrect, points });
    };
  
    const handleSkip = () => {
      if (!showingSkipped) setSkippedQuestions(prev => [...prev, currentIndex]);
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
  
    return (
      <div className="mcq-container full-width">
        <h3 className="mcq-title">Introduction to CSS Part 1 - MCQs</h3>
  
        {!completed ? (
          <div className="mcq-question-block">
            <p className="mcq-question">
              Q{questionNumber}. {currentQuestion.question}
            </p>
  
            <ul className="mcq-options">
              {currentQuestion.options.map(option => (
                <li key={option} className="mcq-option">
                  <label>
                    <input
                      type="radio"
                      name={`q${currentIndex}`}
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={e => setSelectedAnswer(e.target.value)}
                      disabled={feedback !== null}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
  
            {feedback && (
              <div className={`mcq-feedback ${feedback.correct ? "correct" : "wrong"}`}>
                <i
                  className={`bi ${feedback.correct ? "bi-check-circle" : "bi-x-circle"}`}
                  style={{ marginRight: "10px", fontSize: "20px" }}
                ></i>
                {feedback.correct ? `+${feedback.points}` : `-${Math.abs(feedback.points)}`}
              </div>
            )}
  
            <div className="mcq-buttons">
              <button
                className="mcq-next"
                disabled={!selectedAnswer}
                onClick={feedback ? nextQuestion : handleNext}
              >
                {showingSkipped && currentIndex + 1 === skippedQuestions.length
                  ? "Finish"
                  : !showingSkipped && currentIndex + 1 === questions.length && skippedQuestions.length === 0
                  ? "Finish"
                  : "Next"}
              </button>
              {!showingSkipped && (
                <button
                  className="mcq-skip"
                  onClick={handleSkip}
                  disabled={feedback !== null}
                >
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

export default Introductionto_Css_MCQ_1
