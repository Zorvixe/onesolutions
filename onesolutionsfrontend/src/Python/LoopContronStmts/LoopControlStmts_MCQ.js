import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const LoopControlStmts_MCQ = ({ onComplete }) => {
  const originalQuestions = [
  {
    question: (
      <div>
        <p>What does the 'break' statement do in a loop?</p>
        <CodeBlock
          language="python"
          code={`for i in range(5):\n    if i == 3:\n        break\n    print(i)`} 
        />
      </div>
    ),
    options: [
      "Skips the current iteration",
      "Exits the loop immediately",
      "Does nothing",
      "Restarts the loop",
    ],
    answer: "Exits the loop immediately",
  },
  {
    question: (
      <div>
        <p>What does the 'continue' statement do in a loop?</p>
        <CodeBlock
          language="python"
          code={`for i in range(5):\n    if i == 3:\n        continue\n    print(i)`} 
        />
      </div>
    ),
    options: [
      "Exits the loop immediately",
      "Skips the rest of the current iteration",
      "Terminates the program",
      "Pauses the loop",
    ],
    answer: "Skips the rest of the current iteration",
  },
  {
    question: (
      <div>
        <p>Which statement is used as a placeholder in Python?</p>
        <CodeBlock
          language="python"
          code={`def my_function():\n    pass`} 
        />
      </div>
    ),
    options: ["break", "continue", "pass", "exit"],
    answer: "pass",
  },
  {
    question: (
      <div>
        <p>Where is 'break' usually used?</p>
        <CodeBlock
          language="python"
          code={`for i in range(10):\n    if i > 5:\n        break\n    print(i)`} 
        />
      </div>
    ),
    options: [
      "To exit a loop when a condition is satisfied",
      "To skip a statement",
      "To pause the program",
      "To define a function",
    ],
    answer: "To exit a loop when a condition is satisfied",
  },
  {
    question: (
      <div>
        <p>Where is 'continue' usually used?</p>
        <CodeBlock
          language="python"
          code={`for i in range(5):\n    if i % 2 == 0:\n        continue\n    print(i)`} 
        />
      </div>
    ),
    options: [
      "To exit the loop",
      "To skip the remaining statements in the current iteration",
      "To terminate the program",
      "To end the function",
    ],
    answer: "To skip the remaining statements in the current iteration",
  },
  {
    question: (
      <div>
        <p>What will be the output of the following code?</p>
        <CodeBlock
          language="python"
          code={`for i in range(3):\n    if i == 1:\n        break\n    print(i)`} 
        />
      </div>
    ),
    options: ["0 1 2", "0", "1 2", "Error"],
    answer: "0",
  },
  {
    question: (
      <div>
        <p>What will be printed here?</p>
        <CodeBlock
          language="python"
          code={`for i in range(3):\n    if i == 1:\n        continue\n    print(i)`} 
        />
      </div>
    ),
    options: ["0 1 2", "0 2", "1 2", "0 1"],
    answer: "0 2",
  },
  {
    question: (
      <div>
        <p>Which statement allows a loop to finish without doing anything?</p>
        <CodeBlock
          language="python"
          code={`for i in range(5):\n    pass`} 
        />
      </div>
    ),
    options: [
      "break",
      "continue",
      "pass",
      "exit"
    ],
    answer: "pass",
  },
  {
    question: (
      <div>
        <p>What happens if you use 'break' in a nested loop?</p>
        <CodeBlock
          language="python"
          code={`for i in range(3):\n    for j in range(3):\n        if j == 1:\n            break\n        print(i, j)`} 
        />
      </div>
    ),
    options: [
      "Exits the inner loop only",
      "Exits both loops",
      "Skips the iteration",
      "Causes an error"
    ],
    answer: "Exits the inner loop only",
  },
  {
    question: (
      <div>
        <p>What happens if you use 'continue' in a nested loop?</p>
        <CodeBlock
          language="python"
          code={`for i in range(2):\n    for j in range(3):\n        if j == 1:\n            continue\n        print(i, j)`} 
        />
      </div>
    ),
    options: [
      "Skips the current iteration of the inner loop",
      "Skips the outer loop",
      "Exits both loops",
      "Causes an error"
    ],
    answer: "Skips the current iteration of the inner loop",
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
      <h3 className="mcq-title">Loop Control Statements - MCQs</h3>

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

export default LoopControlStmts_MCQ;
