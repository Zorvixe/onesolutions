import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const FunCallStack_Recursion_MCQ = ({ onComplete }) => {
 const originalQuestions =  [
  {
    question: (
      <div>
        <p>What data structure keeps track of function calls in progress?</p>
      </div>
    ),
    options: ["Queue", "Stack", "Linked List", "Dictionary"],
    answer: "Stack",
  },
  {
    question: (
      <div>
        <p>What is a function calling itself called?</p>
      </div>
    ),
    options: ["Iteration", "Recursion", "Lambda", "Closure"],
    answer: "Recursion",
  },
  {
    question: (
      <div>
        <p>What is the base case in recursion?</p>
      </div>
    ),
    options: [
      "The recursive call",
      "The condition when recursion stops",
      "The first function call",
      "A global variable",
    ],
    answer: "The condition when recursion stops",
  },
  {
    question: (
      <div>
        <p>What is the output of the following recursive function?</p>
        <CodeBlock
          language="python"
          code={`def multiply_n(lst):\n    if len(lst) == 1:\n        return lst[0]\n    return lst[0] * multiply_n(lst[1:])\n\nprint(multiply_n([2,3,4]))`}
        />
      </div>
    ),
    options: ["9", "24", "14", "Error"],
    answer: "24",
  },
  {
    question: (
      <div>
        <p>What is the output of factorial(4) using recursion?</p>
        <CodeBlock
          language="python"
          code={`def factorial(n):\n    if n == 1:\n        return 1\n    return n * factorial(n-1)\n\nprint(factorial(4))`}
        />
      </div>
    ),
    options: ["16", "24", "10", "Error"],
    answer: "24",
  },
  {
    question: (
      <div>
        <p>What happens if a recursive function has no base case?</p>
      </div>
    ),
    options: [
      "It works normally",
      "It stops after one call",
      "RecursionError occurs",
      "Python ignores recursion",
    ],
    answer: "RecursionError occurs",
  },
  {
    question: (
      <div>
        <p>Calling get_largest_sqr([1,2,3,4]) returns?</p>
        <CodeBlock
          language="python"
          code={`def get_largest_sqr(lst):\n    if len(lst) == 1:\n        return lst[0]**2\n    return max(lst[0]**2, get_largest_sqr(lst[1:]))\n\nprint(get_largest_sqr([1,2,3,4]))`}
        />
      </div>
    ),
    options: ["10", "16", "24", "Error"],
    answer: "16",
  },
  {
    question: (
      <div>
        <p>Sum of squares of [1,2,3] is?</p>
        <CodeBlock
          language="python"
          code={`def sum_sqr(lst):\n    if len(lst) == 0:\n        return 0\n    return lst[0]**2 + sum_sqr(lst[1:])\n\nprint(sum_sqr([1,2,3]))`}
        />
      </div>
    ),
    options: ["6", "9", "14", "12"],
    answer: "14",
  },
  {
    question: (
      <div>
        <p>Which statement best describes recursion?</p>
      </div>
    ),
    options: [
      "A function that repeats using loops",
      "A function that calls itself until a condition is met",
      "A function that executes only once",
      "A function that runs in parallel",
    ],
    answer: "A function that calls itself until a condition is met",
  },
  {
    question: (
      <div>
        <p>Which of the following recursive functions correctly finds the sum of numbers from 1 to n?</p>
        <CodeBlock
          language="python"
          code={`def sum_n(n):\n    if n == 0:\n        return 0\n    return n + sum_n(n-1)`}
        />
      </div>
    ),
    options: [
      "def sum_n(n): return n * sum_n(n-1)",
      "def sum_n(n): return n + sum_n(n+1)",
      "def sum_n(n): return n + sum_n(n-1)",
      "def sum_n(n): return 0",
    ],
    answer: "def sum_n(n): return n + sum_n(n-1)",
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
      <h3 className="mcq-title">Function Call Stack Recursion - MCQs</h3>

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

export default FunCallStack_Recursion_MCQ;
