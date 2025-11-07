import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const Tuples_Sequences_MCQ = ({ onComplete }) => {
  const originalQuestions = [
  {
    question: (
      <div>
        <p>Which of the following is a valid tuple in Python?</p>
        <CodeBlock
          language="python"
          code={`# Valid tuple example\nt = (1, 2, 3)\nprint(t)`}
        />
      </div>
    ),
    options: ["(1, 2, 3)", "[1, 2, 3]", "{1, 2, 3}", "1, 2, 3"],
    answer: "(1, 2, 3)",
  },
  {
    question: (
      <div>
        <p>How do you create a tuple with a single element?</p>
        <CodeBlock
          language="python"
          code={`# Single element tuple\nt = (5,)\nprint(t)`}
        />
      </div>
    ),
    options: ["(5)", "(5,)", "[5]", "{5}"],
    answer: "(5,)",
  },
  {
    question: (
      <div>
        <p>Which statement is true about tuples?</p>
        <CodeBlock
          language="python"
          code={`t = (1, 2, 3)\n# t[0] = 10  # This will raise an error because tuples are immutable`}
        />
      </div>
    ),
    options: [
      "Tuples are mutable",
      "Tuples are immutable",
      "Tuples can be changed after creation",
      "Tuples are always empty",
    ],
    answer: "Tuples are immutable",
  },
  {
    question: (
      <div>
        <p>What is the output of <code>len((1,2,3,4))</code>?</p>
        <CodeBlock language="python" code={`t = (1,2,3,4)\nprint(len(t))`} />
      </div>
    ),
    options: ["3", "4", "1", "Error"],
    answer: "4",
  },
  {
    question: (
      <div>
        <p>Which of the following operations is NOT allowed on tuples?</p>
        <CodeBlock
          language="python"
          code={`t = (1,2,3)\n# t.append(4)  # This will raise an AttributeError`}
        />
      </div>
    ),
    options: ["Indexing", "Slicing", "Appending elements", "Membership checking"],
    answer: "Appending elements",
  },
  {
    question: (
      <div>
        <p>What will be the result of <code>a, b = (1, 2)</code>?</p>
        <CodeBlock language="python" code={`a, b = (1, 2)\nprint(a, b)`} />
      </div>
    ),
    options: [
      "a = 1, b = 2",
      "a = (1, 2), b = None",
      "Error",
      "a = 2, b = 1",
    ],
    answer: "a = 1, b = 2",
  },
  {
    question: (
      <div>
        <p>Which of the following converts a list to a tuple?</p>
        <CodeBlock
          language="python"
          code={`my_list = [1,2,3]\nt = tuple(my_list)\nprint(t)`}
        />
      </div>
    ),
    options: [
      "tuple([1,2,3])",
      "list((1,2,3))",
      "set([1,2,3])",
      "[1,2,3].tuple()",
    ],
    answer: "tuple([1,2,3])",
  },
  {
    question: (
      <div>
        <p>Which operator is used for membership checking in tuples?</p>
        <CodeBlock
          language="python"
          code={`t = (1,2,3)\nprint(2 in t)\nprint(5 not in t)`}
        />
      </div>
    ),
    options: ["in", "not in", "both a and b", "is"],
    answer: "both a and b",
  },
  {
    question: (
      <div>
        <p>What will be the result of the expression <code>(1, 2) + (3, 4)</code>?</p>
        <CodeBlock
          language="python"
          code={`t = (1, 2) + (3, 4)\nprint(t)`}
        />
      </div>
    ),
    options: ["(1, 2, 3, 4)", "(4, 3, 2, 1)", "Error", "(1, 2)(3, 4)"],
    answer: "(1, 2, 3, 4)",
  },
  {
    question: (
      <div>
        <p>What does <code>(1, 2) * 2</code> produce?</p>
        <CodeBlock
          language="python"
          code={`t = (1, 2) * 2\nprint(t)`}
        />
      </div>
    ),
    options: ["(1, 2, 1, 2)", "(1, 2, 2, 1)", "(1, 2, 2)", "Error"],
    answer: "(1, 2, 1, 2)",
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
      <h3 className="mcq-title">Tuples Sequences - MCQs</h3>

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

export default Tuples_Sequences_MCQ;
