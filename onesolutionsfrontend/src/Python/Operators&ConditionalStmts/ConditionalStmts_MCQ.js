import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const ConditionalStmts_MCQ = ({ onComplete }) => {
  const questionsData = [
    {
      question: "Which keyword is used for conditional branching in Python?",
      options: ["if", "for", "while", "def"],
      answer: "if",
    },
    {
      question: (
        <div>
          <p>What will be the output of the following code?</p>
          <CodeBlock language="python" code={`x = 5\nif x > 3:\n    print('Hi')`} />
        </div>
      ),
      options: ["No output", "Error", "Hi", "5"],
      answer: "Hi",
    },
    {
      question: "Which of the following is a valid syntax for if-else?",
      options: [
        "if x > 10 then:",
        "if (x > 10): else:",
        "if x > 10: else:",
        "if x > 10: print('Yes') else: print('No')",
      ],
      answer: "if x > 10: print('Yes') else: print('No')",
    },
    {
      question: "Which of the following statements about if-elif-else is true?",
      options: [
        "Only one block executes even if multiple conditions are true.",
        "All true conditions execute.",
        "It runs in random order.",
        "None of these.",
      ],
      answer: "Only one block executes even if multiple conditions are true.",
    },
    {
      question: (
        <div>
          <p>What will be printed?</p>
          <CodeBlock language="python" code={`x = 10\ny = 20\nif x > y:\n    print('A')\nelse:\n    print('B')`} />
        </div>
      ),
      options: ["A", "B", "A B", "Error"],
      answer: "B",
    },
    {
      question: "Which keyword is used for multiple conditions?",
      options: ["elseif", "elif", "else if", "when"],
      answer: "elif",
    },
    {
      question: (
        <div>
          <p>What is the output of the following code?</p>
          <CodeBlock language="python" code={`if 0:\n    print('True')\nelse:\n    print('False')`} />
        </div>
      ),
      options: ["True", "False", "Error", "0"],
      answer: "False",
    },
    {
      question: (
        <div>
          <p>What is the output of the following code?</p>
          <CodeBlock language="python" code={`x = 5\nif x:\n    print('Yes')`} />
        </div>
      ),
      options: ["Yes", "No", "Error", "Nothing"],
      answer: "Yes",
    },
    {
      question: (
        <div>
          <p>What is the output of the following code?</p>
          <CodeBlock language="python" code={`x = -1\nif x:\n    print('True')\nelse:\n    print('False')`} />
        </div>
      ),
      options: ["True", "False", "Error", "0"],
      answer: "True",
    },
    {
      question: "Which of the following evaluates to True?",
      options: ["if None:", "if '':", "if 0:", "if [1, 2]:"],
      answer: "if [1, 2]:",
    },
  ];

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

    // Time-based scoring
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
      <h3 className="mcq-title">Conditional Statements - MCQs</h3>

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

export default ConditionalStmts_MCQ;
