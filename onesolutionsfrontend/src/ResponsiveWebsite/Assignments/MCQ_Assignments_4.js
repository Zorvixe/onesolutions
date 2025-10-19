import React, { useState, useEffect, useRef } from "react";

const MCQ_Assignment4 = () => {
  const originalQuestions =  [
  {
    question: "Which property creates a gradient background?",
    options: ["background-color", "linear-gradient", "color", "gradient"],
    answer: "linear-gradient",
  },
  {
    question: "Which gradient type radiates from a center point?",
    options: ["linear-gradient", "radial-gradient", "conic-gradient", "angular-gradient"],
    answer: "radial-gradient",
  },
  {
    question: "Which property rounds only specific corners?",
    options: ["border-radius", "corner-radius", "border-corner", "radius"],
    answer: "border-radius",
  },
  {
    question: "Which unit is viewport width?",
    options: ["vw", "vh", "%", "px"],
    answer: "vw",
  },
  {
    question: "Which property adds shadow to an element?",
    options: ["box-shadow", "text-shadow", "shadow", "element-shadow"],
    answer: "box-shadow",
  },
  {
    question: "Which property changes text alignment?",
    options: ["text-align", "align-text", "justify-content", "align-items"],
    answer: "text-align",
  },
  {
    question: "Which property defines how flex items wrap?",
    options: ["flex-wrap", "flex-flow", "flex-direction", "flex-align"],
    answer: "flex-wrap",
  },
  {
    question: "Which property changes the direction of flex items?",
    options: ["flex-direction", "flex-wrap", "align-items", "justify-content"],
    answer: "flex-direction",
  },
  {
    question: "Which CSS function creates repeating gradients?",
    options: ["repeat-linear-gradient", "repeating-linear-gradient", "repeat-gradient", "gradient-repeat"],
    answer: "repeating-linear-gradient",
  },
  {
    question: "Which property is used to center an element horizontally?",
    options: ["margin: 0 auto", "text-align: center", "justify-content: center", "align-items: center"],
    answer: "margin: 0 auto",
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
    let points = isCorrect ? (timeLeft > 0 ? 10 : 7) : -5;
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
      <h3 className="mcq-title">Assignment 4 - MCQs</h3>
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
          <p>
            Your Score: {score} / {questions.length * 10}
          </p>
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

export default MCQ_Assignment4;
