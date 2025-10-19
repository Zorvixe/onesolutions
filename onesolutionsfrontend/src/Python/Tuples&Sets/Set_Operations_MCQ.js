import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const SetOperations_MCQ = ({ onComplete }) => {
  const originalQuestions = [
  {
    question: (
      <div>
        <p>Which operator or method is used for union of two sets?</p>
        <CodeBlock
          language="python"
          code={`A = {1, 2, 3}\nB = {3, 4, 5}\nprint(A | B)\nprint(A.union(B))`}
        />
      </div>
    ),
    options: ["| or union()", "& or intersection()", "- or difference()", "^ or symmetric_difference()"],
    answer: "| or union()",
  },
  {
    question: (
      <div>
        <p>Which operator or method is used for intersection of two sets?</p>
        <CodeBlock
          language="python"
          code={`A = {1, 2, 3}\nB = {2, 3, 4}\nprint(A & B)\nprint(A.intersection(B))`}
        />
      </div>
    ),
    options: ["| or union()", "& or intersection()", "- or difference()", "^ or symmetric_difference()"],
    answer: "& or intersection()",
  },
  {
    question: (
      <div>
        <p>Which operator or method gives elements in the first set but not in the second?</p>
        <CodeBlock
          language="python"
          code={`A = {1, 2, 3}\nB = {2, 3, 4}\nprint(A - B)\nprint(A.difference(B))`}
        />
      </div>
    ),
    options: ["| or union()", "& or intersection()", "- or difference()", "^ or symmetric_difference()"],
    answer: "- or difference()",
  },
  {
    question: (
      <div>
        <p>Which operator or method gives elements not common to both sets?</p>
        <CodeBlock
          language="python"
          code={`A = {1, 2, 3}\nB = {2, 3, 4}\nprint(A ^ B)\nprint(A.symmetric_difference(B))`}
        />
      </div>
    ),
    options: ["| or union()", "& or intersection()", "- or difference()", "^ or symmetric_difference()"],
    answer: "^ or symmetric_difference()",
  },
  {
    question: (
      <div>
        <p>Which method checks if all elements of one set exist in another?</p>
        <CodeBlock
          language="python"
          code={`A = {1, 2}\nB = {1, 2, 3}\nprint(A.issubset(B))`}
        />
      </div>
    ),
    options: ["issubset()", "issuperset()", "isdisjoint()", "union()"],
    answer: "issubset()",
  },
  {
    question: (
      <div>
        <p>Which method checks if a set contains all elements of another set?</p>
        <CodeBlock
          language="python"
          code={`A = {1, 2, 3}\nB = {2, 3}\nprint(A.issuperset(B))`}
        />
      </div>
    ),
    options: ["issubset()", "issuperset()", "isdisjoint()", "intersection()"],
    answer: "issuperset()",
  },
  {
    question: (
      <div>
        <p>Which method checks if two sets have no elements in common?</p>
        <CodeBlock
          language="python"
          code={`A = {1, 2}\nB = {3, 4}\nprint(A.isdisjoint(B))`}
        />
      </div>
    ),
    options: ["issubset()", "issuperset()", "isdisjoint()", "difference()"],
    answer: "isdisjoint()",
  },
  {
    question: (
      <div>
        <p>Which method updates a set with elements from another set?</p>
        <CodeBlock
          language="python"
          code={`A = {1, 2}\nB = {2, 3}\nA.update(B)\nprint(A)`}
        />
      </div>
    ),
    options: ["update()", "union()", "extend()", "add()"],
    answer: "update()",
  },
  {
    question: (
      <div>
        <p>Which statement about frozenset is correct?</p>
      </div>
    ),
    options: [
      "It is a mutable version of set",
      "It can be used as a dictionary key",
      "It supports add() and remove() methods",
      "It is unordered and mutable",
    ],
    answer: "It can be used as a dictionary key",
  },
  {
    question: (
      <div>
        <p>Which method removes an element from a set and raises an error if not found?</p>
        <CodeBlock
          language="python"
          code={`A = {1, 2, 3}\nA.remove(4)`}
        />
      </div>
    ),
    options: ["remove()", "discard()", "pop()", "clear()"],
    answer: "remove()",
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
      <h3 className="mcq-title">Set Operations - MCQs</h3>

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

export default SetOperations_MCQ;
