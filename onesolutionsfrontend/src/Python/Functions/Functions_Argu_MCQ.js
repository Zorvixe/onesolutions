import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const Functions_Argu_MCQ = ({ onComplete }) => {
  const originalQuestions =  [
  {
    question: (
      <div>
        <p>What is the output of the following code?</p>
        <CodeBlock
          language="python"
          code={`def greet(name, greeting):\n    print(f'{greeting}, {name}!')\ngreet(greeting='Hello', name='Alice')`}
        />
      </div>
    ),
    options: ["Hello Alice", "Alice Hello", "Error", "Hello, Alice!"],
    answer: "Hello, Alice!",
  },
  {
    question: (
      <div>
        <p>What happens if you call the function with an extra argument?</p>
        <CodeBlock
          language="python"
          code={`greet(name='Bob', greeting='Hi', extra='Error')`}
        />
      </div>
    ),
    options: ["Prints normally", "TypeError", "SyntaxError", "Ignored extra argument"],
    answer: "TypeError",
  },
  {
    question: "Which of the following is correct about positional arguments?",
    options: [
      "Values must be passed in order",
      "Argument names must be specified",
      "Order does not matter",
      "Cannot mix with keyword arguments",
    ],
    answer: "Values must be passed in order",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="python"
          code={`def add(a, b=10):\n    print(a + b)\nadd(5)`}
        />
      </div>
    ),
    options: ["5", "10", "15", "TypeError"],
    answer: "15",
  },
  {
    question: "What will be printed when immutable objects are passed to a function?",
    options: [
      "Changes affect the original object",
      "Changes do not affect the original object",
      "Error",
      "Depends on the object type",
    ],
    answer: "Changes do not affect the original object",
  },
  {
    question: "Which is invalid in Python function arguments?",
    options: [
      "Non-default argument after default argument",
      "Keyword arguments",
      "Default arguments",
      "Positional arguments",
    ],
    answer: "Non-default argument after default argument",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="python"
          code={`def greet(name, greeting='Hello'):\n    print(f'{greeting}, {name}!')\ngreet('Bob', 'Hi')`}
        />
      </div>
    ),
    options: ["Hello, Bob!", "Hi, Bob!", "Error", "Bob, Hi!"],
    answer: "Hi, Bob!",
  },
  {
    question: "Which of these is true for keyword arguments?",
    options: [
      "You must provide all arguments",
      "Order does not matter",
      "Cannot use default values",
      "Always causes error",
    ],
    answer: "Order does not matter",
  },
  {
    question: "What happens if a required positional argument is missing?",
    options: [
      "Python assigns default value",
      "Error is raised",
      "Ignored silently",
      "It becomes None",
    ],
    answer: "Error is raised",
  },
  {
    question: "How do you call a function with both positional and keyword arguments?",
    options: [
      "Function must use only positional",
      "Positional arguments first, then keyword arguments",
      "Keyword arguments first, then positional",
      "Cannot mix",
    ],
    answer: "Positional arguments first, then keyword arguments",
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
      } else setCompleted(true);
    } else {
      if (currentIndex + 1 < skippedQuestions.length) setCurrentIndex(prev => prev + 1);
      else setCompleted(true);
    }
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const currentQuestion = showingSkipped
      ? questions[skippedQuestions[currentIndex]]
      : questions[currentIndex];

    const isCorrect = selectedAnswer === currentQuestion.answer;

    // Time-based scoring
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
      <h3 className="mcq-title">Function Arguments - MCQs</h3>

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

export default Functions_Argu_MCQ;
