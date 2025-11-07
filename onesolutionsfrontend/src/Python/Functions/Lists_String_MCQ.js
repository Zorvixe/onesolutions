import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const Lists_String_MCQ = ({ onComplete }) => {
  
  const originalQuestions = [
  {
    question: (
      <div>
        <p>What does <code>str_var.split()</code> do in Python?</p>
      </div>
    ),
    options: [
      "Splits a string into a list at whitespace by default",
      "Joins a list into a string",
      "Removes whitespace from string",
      "Converts string to uppercase"
    ],
    answer: "Splits a string into a list at whitespace by default",
  },
  {
    question: (
      <div>
        <p>What will the following code return?</p>
        <CodeBlock
          language="python"
          code={`'hello   world'.split()`} 
        />
      </div>
    ),
    options: [
      '["hello", "world"]',
      '["hello", "", "", "world"]',
      '["hello   world"]',
      'Error'
    ],
    answer: '["hello", "world"]',
  },
  {
    question: "Which of these are considered whitespace in split()?",
    options: ["Space, newline, tab", "Only space", "Only newline", "Only tab"],
    answer: "Space, newline, tab",
  },
  {
    question: (
      <div>
        <p>What will the following return?</p>
        <CodeBlock
          language="python"
          code={`'apple,banana,cherry'.split(',')`}
        />
      </div>
    ),
    options: [
      '["apple", "banana", "cherry"]',
      '["apple,banana,cherry"]',
      '["apple", ",", "banana", ",", "cherry"]',
      'Error'
    ],
    answer: '["apple", "banana", "cherry"]',
  },
  {
    question: (
      <div>
        <p>What does <code>' '.join(['hello', 'world'])</code> return?</p>
      </div>
    ),
    options: ["hello world", "helloworld", "['hello', 'world']", "Error"],
    answer: "hello world",
  },
  {
    question: (
      <div>
        <p>What happens if join() is used on a list with non-string values?</p>
      </div>
    ),
    options: [
      "TypeError",
      "Joins anyway",
      "Converts values automatically",
      "Returns None"
    ],
    answer: "TypeError",
  },
  {
    question: (
      <div>
        <p>What does <code>my_list[-1]</code> return?</p>
      </div>
    ),
    options: ["Last item of the list", "First item", "Second last item", "Error"],
    answer: "Last item of the list",
  },
  {
    question: (
      <div>
        <p>What will the following return?</p>
        <CodeBlock
          language="python"
          code={`[1, 2, 3, 4][::-1]`}
        />
      </div>
    ),
    options: ["[4, 3, 2, 1]", "[1, 2, 3, 4]", "[1, 2, 3]", "Error"],
    answer: "[4, 3, 2, 1]",
  },
  // ---------- New Questions ----------
  {
    question: (
      <div>
        <p>How can you access the first two elements of a list <code>my_list = [10, 20, 30, 40]</code>?</p>
      </div>
    ),
    options: [
      "my_list[:2]",
      "my_list[2:]",
      "my_list[-2:]",
      "my_list[1:2]"
    ],
    answer: "my_list[:2]",
  },
  {
    question: (
      <div>
        <p>What will <code>'Python'.upper()</code> return?</p>
      </div>
    ),
    options: [
      "PYTHON",
      "python",
      "Python",
      "Error"
    ],
    answer: "PYTHON",
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
      <h3 className="mcq-title">Lists String - MCQs</h3>

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

export default Lists_String_MCQ;
