import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const RelationOperator_MCQ = ({ onComplete }) => {
 const originalQuestions = [
    {
      question: "Which of the following are relational operators in Python?",
      options: [">", "<", "==", "!=", "+", "and"],
      answer: [">", "<", "==", "!="],
      multiple: true,
    },
    {
      question: (
        <div>
          <p>What is the output of the following code?</p>
          <CodeBlock language="python" code={`5 > 3`} />
        </div>
      ),
      options: ["True", "False"],
      answer: "True",
    },
    {
      question: (
        <div>
          <p>What is the output of the following code?</p>
          <CodeBlock language="python" code={`5 == 5.0`} />
        </div>
      ),
      options: ["True", "False"],
      answer: "True",
    },
    {
      question: (
        <div>
          <p>What is the output of the following code?</p>
          <CodeBlock language="python" code={`'apple' < 'banana'`} />
        </div>
      ),
      options: ["True", "False"],
      answer: "True",
    },
    {
      question: "Which operator is used to check inequality?",
      options: ["!=", "==", "<=", ">="],
      answer: "!=",
    },
    {
      question: "Is Python case sensitive when comparing strings?",
      options: ["Yes", "No"],
      answer: "Yes",
    },
    {
      question: (
        <div>
          <p>What is the output of the following code?</p>
          <CodeBlock language="python" code={`10 <= 10`} />
        </div>
      ),
      options: ["True", "False"],
      answer: "True",
    },
    {
      question: (
        <div>
          <p>What is the output of the following code?</p>
          <CodeBlock language="python" code={`7 >= 8`} />
        </div>
      ),
      options: ["True", "False"],
      answer: "False",
    },
    {
      question: "Which operator checks if two values are exactly equal?",
      options: ["=", "==", "!=", "<>"],
      answer: "==",
    },
    {
      question: (
        <div>
          <p>What is the result of comparing the following?</p>
          <CodeBlock language="python" code={`5 != 5`} />
        </div>
      ),
      options: ["True", "False"],
      answer: "False",
    },
  ];

  // Shuffle function
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  const [questions] = useState(shuffleArray([...originalQuestions]));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
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
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentIndex, completed]);

  const nextQuestion = () => {
    clearInterval(timerRef.current);
    setSelectedAnswer([]);
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

  const handleAnswerChange = (value, isMultiple) => {
    if (!isMultiple) {
      setSelectedAnswer([value]);
    } else {
      setSelectedAnswer((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    }
  };

  const handleNext = () => {
    if (selectedAnswer.length === 0) return;

    const currentQuestion = showingSkipped
      ? questions[skippedQuestions[currentIndex]]
      : questions[currentIndex];

    let isCorrect = false;
    if (currentQuestion.multiple) {
      const correctSet = new Set(currentQuestion.answer);
      const selectedSet = new Set(selectedAnswer);
      isCorrect =
        correctSet.size === selectedSet.size &&
        [...correctSet].every((val) => selectedSet.has(val));
    } else {
      isCorrect = selectedAnswer[0] === currentQuestion.answer;
    }

    const points = isCorrect ? (timeLeft > 0 ? 10 : 7) : -5;
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

  return (
    <div className="mcq-container full-width">
      <h3 className="mcq-title">Relational Operators - MCQs</h3>

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
                    type={currentQuestion.multiple ? "checkbox" : "radio"}
                    name={`q${currentIndex}`}
                    value={option}
                    checked={selectedAnswer.includes(option)}
                    onChange={(e) =>
                      handleAnswerChange(option, currentQuestion.multiple)
                    }
                    disabled={feedback !== null}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>

          {feedback && (
            <div
              className={`mcq-feedback ${feedback.correct ? "correct" : "wrong"}`}
            >
              <i
                className={`bi ${
                  feedback.correct ? "bi-check-circle" : "bi-x-circle"
                }`}
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
              disabled={selectedAnswer.length === 0}
              onClick={feedback ? nextQuestion : handleNext}
            >
              {showingSkipped && currentIndex + 1 === skippedQuestions.length
                ? "Finish"
                : !showingSkipped &&
                  currentIndex + 1 === questions.length &&
                  skippedQuestions.length === 0
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

export default RelationOperator_MCQ;
