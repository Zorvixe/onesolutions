import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const Errors_Exceptions_MCQ = ({ onComplete }) => {
  const originalQuestions = [
  {
    question: (
      <div>
        <p>What is a Syntax Error in Python?</p>
        <CodeBlock language="python" code={`def greet()\n    print("Hello")`} />
      </div>
    ),
    options: [
      "An error occurring during program execution",
      "An error caused by incorrect Python syntax",
      "An error in logic",
      "An error due to missing modules"
    ],
    answer: "An error caused by incorrect Python syntax",
  },
  {
    question: (
      <div>
        <p>Which of the following is an example of an exception?</p>
        <CodeBlock language="python" code={`x = 5 / 0`} />
      </div>
    ),
    options: ["x = 5 / 0", "print('Hello')", "x = 10", "y = x + 5"],
    answer: "x = 5 / 0",
  },
  {
    question: (
      <div>
        <p>Which block is used to handle exceptions in Python?</p>
        <CodeBlock language="python" code={`try:\n    x = int(input())\nexcept ValueError:\n    print("Invalid")`} />
      </div>
    ),
    options: ["try-except", "if-else", "while", "for"],
    answer: "try-except",
  },
  {
    question: (
      <div>
        <p>How do you raise a ValueError with a message?</p>
        <CodeBlock language="python" code={`raise ValueError("Invalid input")`} />
      </div>
    ),
    options: [
      "throw ValueError('Invalid input')",
      "raise ValueError('Invalid input')",
      "error ValueError('Invalid input')",
      "ValueError('Invalid input')"
    ],
    answer: "raise ValueError('Invalid input')",
  },
  {
    question: (
      <div>
        <p>Which exception occurs when dividing by zero?</p>
        <CodeBlock language="python" code={`x = 5 / 0`} />
      </div>
    ),
    options: ["ValueError", "ZeroDivisionError", "TypeError", "IndexError"],
    answer: "ZeroDivisionError",
  },
  {
    question: (
      <div>
        <p>How do you catch a specific exception?</p>
        <CodeBlock language="python" code={`try:\n    x = int(input())\nexcept ValueError:\n    print("Invalid")`} />
      </div>
    ),
    options: ["except ValueError:", "except:", "catch(ValueError):", "handle(ValueError):"],
    answer: "except ValueError:",
  },
  {
    question: (
      <div>
        <p>What happens if an exception is not handled?</p>
        <CodeBlock language="python" code={`x = 5 / 0`} />
      </div>
    ),
    options: [
      "The program terminates with an error",
      "The program continues silently",
      "The exception is ignored",
      "Python automatically fixes it"
    ],
    answer: "The program terminates with an error",
  },
  {
    question: (
      <div>
        <p>Can multiple except blocks handle different exceptions?</p>
        <CodeBlock language="python" code={`try:\n    x = int(input())\n    y = 10 / x\nexcept ValueError:\n    print("Invalid")\nexcept ZeroDivisionError:\n    print("Division by zero")`} />
      </div>
    ),
    options: ["Yes", "No", "Only one", "Depends on Python version"],
    answer: "Yes",
  },
  {
    question: (
      <div>
        <p>What keyword is used to execute code regardless of exceptions?</p>
        <CodeBlock language="python" code={`try:\n    x = int(input())\nfinally:\n    print("Always executes")`} />
      </div>
    ),
    options: ["finally", "always", "end", "complete"],
    answer: "finally",
  },
  {
    question: (
      <div>
        <p>Which of the following is NOT a built-in exception?</p>
        <CodeBlock language="python" code={`x = 5 / 0\nlen([])\nint("abc")`} />
      </div>
    ),
    options: ["IndexError", "ZeroDivisionError", "InputError", "ValueError"],
    answer: "InputError",
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
  
    // Timer logic
    useEffect(() => {
      if (completed) return;
      setTimeLeft(10);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
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
        } else {
          setCompleted(true);
          if (onComplete) onComplete();
        }
      } else {
        if (currentIndex + 1 < skippedQuestions.length) setCurrentIndex((prev) => prev + 1);
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
  
      setScore((prev) => prev + points);
      setFeedback({ correct: isCorrect, points });
    };
  
    const handleSkip = () => {
      if (!showingSkipped) setSkippedQuestions((prev) => [...prev, currentIndex]);
      nextQuestion();
    };
  
    const currentQuestion = showingSkipped
      ? questions[skippedQuestions[currentIndex]]
      : questions[currentIndex];
  
    const questionNumber = showingSkipped
      ? questions.length - skippedQuestions.length + currentIndex + 1
      : currentIndex + 1;
  
    const percentage = (score / (questions.length * 10)) * 100;
  
    return (
      <div className="mcq-container full-width">
        <h3 className="mcq-title">Errors Exceptions - MCQs</h3>
  
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
                <i
                  className={`bi ${feedback.correct ? "bi-check-circle" : "bi-x-circle"}`}
                  style={{ marginRight: "10px", fontSize: "20px" }}
                ></i>
                {feedback.correct
                  ? `+${feedback.points}`
                  : `-${Math.abs(feedback.points)}`}
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
          <div className="mcq-completed shadow">
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

export default Errors_Exceptions_MCQ;
