import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; 

const Nested_con_MCQ = ({ onComplete }) => {
 const questionsData = [
  {
    question: "What is a nested loop?",
    options: [
      "A loop that runs only once",
      "A loop inside another loop",
      "A loop after a condition",
      "A loop that never runs",
    ],
    answer: "A loop inside another loop",
  },
  {
    question:
      "How many times will the inner loop execute if the outer loop runs 3 times and the inner loop runs 2 times?",
    options: ["2", "3", "5", "6"],
    answer: "6",
  },
  {
    question: (
      <div>
        <p>What will be the output of the following code?</p>
        <CodeBlock
          language="python"
          code={`for i in range(2):\n    for j in range(2):\n        print(i, j)`}
        />
      </div>
    ),
    options: [
      "0 0\n0 1\n1 0\n1 1",
      "0 0\n1 0\n0 1\n1 1",
      "0 1\n1 0\n1 1",
      "0 0\n1 1",
    ],
    answer: "0 0\n0 1\n1 0\n1 1",
  },
  {
    question: (
      <div>
        <p>Which loop will execute first in a nested loop structure?</p>
        <CodeBlock
          language="python"
          code={`for i in range(3):\n    for j in range(2):\n        print(i, j)`}
        />
      </div>
    ),
    options: ["Inner loop", "Outer loop", "Both at the same time", "None"],
    answer: "Outer loop",
  },
  {
    question: (
      <div>
        <p>What is the value of <code>j</code> in the last iteration of this code?</p>
        <CodeBlock
          language="python"
          code={`for i in range(2):\n    for j in range(3):\n        print(i, j)`}
        />
      </div>
    ),
    options: ["0", "1", "2", "3"],
    answer: "2",
  },
  {
    question: (
      <div>
        <p>How many times will the statement inside print be executed?</p>
        <CodeBlock
          language="python"
          code={`for i in range(2):\n    for j in range(3):\n        print("Hello")`}
        />
      </div>
    ),
    options: ["2", "3", "5", "6"],
    answer: "6",
  },
  {
    question: (
      <div>
        <p>What is the output of the following code?</p>
        <CodeBlock
          language="python"
          code={`outer = 0\nwhile outer < 2:\n    inner = 0\n    while inner < 2:\n        print(outer, inner)\n        inner += 1\n    outer += 1`}
        />
      </div>
    ),
    options: [
      "0 0\n0 1\n1 0\n1 1",
      "0 0\n1 0\n0 1\n1 1",
      "0 1\n1 0",
      "0 0\n1 1",
    ],
    answer: "0 0\n0 1\n1 0\n1 1",
  },
  {
    question: (
      <div>
        <p>What is the repeating block in a nested loop?</p>
        <CodeBlock
          language="python"
          code={`for i in range(3):\n    for j in range(2):\n        print(i, j)`}
        />
      </div>
    ),
    options: [
      "The outer loop header",
      "The inner loop header",
      "The body of the inner loop",
      "The print statement",
    ],
    answer: "The body of the inner loop",
  },
  {
    question: (
      <div>
        <p>What will be printed by this code?</p>
        <CodeBlock
          language="python"
          code={`for i in range(2):\n    for j in range(2):\n        print("*", end=" ")\n    print()`} 
        />
      </div>
    ),
    options: [
      "* * \n* *",
      "**\n**",
      "*\n*",
      "* * * *",
    ],
    answer: "* * \n* *",
  },
  {
    question: (
      <div>
        <p>Which statement best describes the working of a nested loop?</p>
        <CodeBlock
          language="python"
          code={`for i in range(3):\n    for j in range(2):\n        print(i, j)`} 
        />
      </div>
    ),
    options: [
      "The inner loop completes all iterations for each single iteration of the outer loop",
      "The outer loop completes after one iteration of the inner loop",
      "Both loops run independently",
      "Inner loop runs only once",
    ],
    answer:
      "The inner loop completes all iterations for each single iteration of the outer loop",
  },
];


  // Shuffle questions
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  const [questions] = useState(shuffleArray([...questionsData]));

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
      <h3 className="mcq-title">Nested Conditionals - MCQs</h3>

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
            <div
              className={`mcq-feedback ${feedback.correct ? "correct" : "wrong"}`}
            >
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

export default Nested_con_MCQ;
