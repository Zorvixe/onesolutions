import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const Python_Standard_Library_MCQ = ({ onComplete }) => {
  const originalQuestions =  [
  {
    question: (
      <div>
        <p>Which of the following is a Python standard library module?</p>
        <CodeBlock language="python" code={`import random`} />
      </div>
    ),
    options: ["numpy", "random", "pandas", "requests"],
    answer: "random",
  },
  {
    question: (
      <div>
        <p>Which function is used to generate a random integer between two numbers?</p>
        <CodeBlock language="python" code={`import random\nrandom.randint(1, 10)`} />
      </div>
    ),
    options: ["rand()", "randint()", "choice()", "randomize()"],
    answer: "randint()",
  },
  {
    question: (
      <div>
        <p>Which keyword is used to import a module in Python?</p>
        <CodeBlock language="python" code={`import module_name`} />
      </div>
    ),
    options: ["include", "require", "import", "using"],
    answer: "import",
  },
  {
    question: (
      <div>
        <p>What is the purpose of <code>from module import function</code>?</p>
        <CodeBlock language="python" code={`from math import sqrt`} />
      </div>
    ),
    options: [
      "Imports entire module",
      "Imports only the specified function",
      "Deletes the function",
      "Runs the module automatically"
    ],
    answer: "Imports only the specified function",
  },
  {
    question: (
      <div>
        <p>What does <code>math.sqrt(16)</code> return?</p>
        <CodeBlock language="python" code={`import math\nmath.sqrt(16)`} />
      </div>
    ),
    options: ["4", "16", "256", "Error"],
    answer: "4",
  },
  {
    question: (
      <div>
        <p>Which function selects a random element from a list?</p>
        <CodeBlock language="python" code={`import random\nrandom.choice([1,2,3,4])`} />
      </div>
    ),
    options: ["randint()", "choice()", "shuffle()", "sample()"],
    answer: "choice()",
  },
  {
    question: (
      <div>
        <p>What is the use of <code>reduce()</code> in Python?</p>
        <CodeBlock language="python" code={`from functools import reduce\nreduce(lambda x, y: x+y, [1,2,3,4])`} />
      </div>
    ),
    options: [
      "Apply a function to all elements and reduce to a single value",
      "Filter elements",
      "Map elements to a new list",
      "Sort a list"
    ],
    answer: "Apply a function to all elements and reduce to a single value",
  },
  {
    question: (
      <div>
        <p>Which of the following is NOT a built-in function?</p>
        <CodeBlock language="python" code={`len([1,2,3])\nmax([1,2,3])\naverage([1,2,3])`} />
      </div>
    ),
    options: ["len()", "max()", "average()", "min()"],
    answer: "average()",
  },
  {
    question: (
      <div>
        <p>What does <code>map()</code> function do?</p>
        <CodeBlock language="python" code={`list(map(lambda x: x*2, [1,2,3]))`} />
      </div>
    ),
    options: [
      "Filters items from a list",
      "Applies a function to all elements",
      "Reduces elements to one value",
      "Generates random numbers"
    ],
    answer: "Applies a function to all elements",
  },
  {
    question: (
      <div>
        <p>To use <code>math</code> module functions with an alias, which syntax is correct?</p>
        <CodeBlock language="python" code={`import math as m\nm.sqrt(16)`} />
      </div>
    ),
    options: [
      "import math as m",
      "from math import m",
      "alias math = m",
      "using math as m"
    ],
    answer: "import math as m",
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
      <h3 className="mcq-title">Python Standard Library - MCQs</h3>

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

export default Python_Standard_Library_MCQ;
