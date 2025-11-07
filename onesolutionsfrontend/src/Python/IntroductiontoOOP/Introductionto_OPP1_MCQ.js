import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const Introductionto_OOP1_MCQ = ({ onComplete }) => {
  const originalQuestions = [
  {
    question: "What is meant by 'software softness'?",
    options: [
      "Physical softness of the computer",
      "Ease of changing and updating the software",
      "Low memory usage",
      "Faster execution speed"
    ],
    answer: "Ease of changing and updating the software"
  },
  {
    question: "Why is code readability important in software development?",
    options: [
      "It helps maintain and extend software easily",
      "It increases execution speed",
      "It avoids using functions",
      "It reduces memory usage"
    ],
    answer: "It helps maintain and extend software easily"
  },
  {
    question: "What is the main purpose of Object-Oriented Programming (OOP)?",
    options: [
      "To model software after real-life objects and their interactions",
      "To write sequential code only",
      "To avoid using classes",
      "To focus only on memory optimization"
    ],
    answer: "To model software after real-life objects and their interactions"
  },
  {
    question: "Which of the following is a good practice when describing objects?",
    options: [
      "Organizing what an object has and what it can do",
      "Listing attributes randomly",
      "Ignoring object behaviors",
      "Using only object names"
    ],
    answer: "Organizing what an object has and what it can do"
  },
  {
    question: "Why is maintainability crucial in software development?",
    options: [
      "Because software evolves with new features and fixes",
      "Because debugging is unnecessary",
      "Because software is always used once",
      "Because code never changes"
    ],
    answer: "Because software evolves with new features and fixes"
  },
  {
    question: "What does OOP help achieve in software projects?",
    options: [
      "Well-organized, reusable, and extendable code",
      "Faster code execution only",
      "Automatic debugging",
      "Smaller code files"
    ],
    answer: "Well-organized, reusable, and extendable code"
  },
  {
    question: "Which of the following is a key aspect of good software?",
    options: [
      "Easy to understand and maintain",
      "Confusing code structure",
      "Hard to read",
      "Random grouping of data"
    ],
    answer: "Easy to understand and maintain"
  },
  {
    question: "Why is modeling after real-life objects recommended in OOP?",
    options: [
      "It helps create organized and realistic software structures",
      "It avoids using classes",
      "It ensures faster execution",
      "It reduces memory usage"
    ],
    answer: "It helps create organized and realistic software structures"
  },
  {
    question: "Which approach describes a 'bad' object description?",
    options: [
      "Listing all attributes and actions randomly without grouping",
      "Separating what object has and what it can do",
      "Grouping attributes and behaviors clearly",
      "Defining object type first"
    ],
    answer: "Listing all attributes and actions randomly without grouping"
  },
  {
    question: "In OOP, what is an organized object description?",
    options: [
      "Grouping information about what an object has and what it can do",
      "Randomly listing attributes",
      "Ignoring object behaviors",
      "Focusing only on object names"
    ],
    answer: "Grouping information about what an object has and what it can do"
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
      <h3 className="mcq-title">Introduction to Opps Part1 - MCQs</h3>

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

export default Introductionto_OOP1_MCQ;
