import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const ForLoop_MCQ = ({ onComplete }) => {
  const originalQuestions = [
    {
      question: "What does a for loop do in Python?",
      options: [
        "Executes a block of code once",
        "Executes a block of code multiple times iterating over a sequence",
        "Defines a function",
        "Stops code execution"
      ],
      answer: "Executes a block of code multiple times iterating over a sequence"
    },
    {
      question: "Which of the following is a sequence that a for loop can iterate over?",
      options: ["String", "List", "Range", "All of the above"],
      answer: "All of the above"
    },
    {
      question: (
        <div>
          <p>What is the output of the following code?</p>
          <CodeBlock
            language="python"
            code={`for item in 'hi':\n    print(item)`}
          />
        </div>
      ),
      options: ["'hi'", "h i", "h\ni", "hi"],
      answer: "h\ni"
    },
    {
      question: (
        <div>
          <p>What is the output of the following code?</p>
          <CodeBlock
            language="python"
            code={`for i in range(4):\n    print(i)`}
          />
        </div>
      ),
      options: ["0 1 2 3", "1 2 3 4", "0 1 2 3 4", "Error"],
      answer: "0 1 2 3"
    },
    {
      question: (
        <div>
          <p>What does the following code generate?</p>
          <CodeBlock
            language="python"
            code={`for i in range(2, 5):\n    print(i)`}
          />
        </div>
      ),
      options: ["2 3 4", "2 3 4 5", "0 1 2 3 4", "1 2 3"],
      answer: "2 3 4"
    },
    {
      question: "Does the end value in range(start, end) get included?",
      options: ["Yes", "No"],
      answer: "No"
    },
    {
      question: (
        <div>
          <p>Which of the following is correct syntax for a for loop iterating over a string?</p>
          <CodeBlock
            language="python"
            code={`for i in 'hello':\n    print(i)`}
          />
        </div>
      ),
      options: [
        "for i in 'hello': print(i)",
        "for i 'hello': print(i)",
        "for i in 'hello' do print(i)",
        "for i='hello': print(i)"
      ],
      answer: "for i in 'hello': print(i)"
    },
    {
      question: "Can a for loop iterate over a list in Python?",
      options: ["Yes", "No"],
      answer: "Yes"
    },
    {
      question: (
        <div>
          <p>What will happen if the sequence in a for loop is empty?</p>
          <CodeBlock
            language="python"
            code={`for i in []:\n    print(i)`}
          />
        </div>
      ),
      options: [
        "Loop runs once",
        "Loop runs infinitely",
        "Loop does not execute",
        "SyntaxError"
      ],
      answer: "Loop does not execute"
    },
    {
      question: "Which of the following statements is true about for loops?",
      options: [
        "They can iterate over strings, lists, and ranges",
        "They can only iterate over numbers",
        "They must have a counter variable",
        "They cannot be nested"
      ],
      answer: "They can iterate over strings, lists, and ranges"
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
      <h3 className="mcq-title">For Loop - MCQs</h3>

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

export default ForLoop_MCQ;
