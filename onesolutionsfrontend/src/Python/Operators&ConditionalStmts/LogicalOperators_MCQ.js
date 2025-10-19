import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const LogicalOperators_MCQ = ({ onComplete }) => {
  const questionsData = [
    {
      question: "Which of the following are logical operators in Python?",
      options: ["and", "or", "not", "+", "=="],
      answer: ["and", "or", "not"],
      multiple: true,
    },
    {
      question: (
        <div>
          <p>What is the output of the following code?</p>
          <CodeBlock language="python" code={`True and False`} />
        </div>
      ),
      options: ["True", "False"],
      answer: "False",
    },
    {
      question: (
        <div>
          <p>Which of the following gives True when at least one condition is True?</p>
          <CodeBlock language="python" code={`# choose from and, or, not`} />
        </div>
      ),
      options: ["and", "or", "not"],
      answer: "or",
    },
    {
      question: (
        <div>
          <p>What is the output of the following code?</p>
          <CodeBlock language="python" code={`not (5 > 3)`} />
        </div>
      ),
      options: ["True", "False"],
      answer: "False",
    },
    {
      question: "Select all correct statements about logical operators:",
      options: [
        "and gives True if both operands are True",
        "or gives True if at least one operand is True",
        "not reverses the Boolean value",
        "and gives True if any operand is True",
      ],
      answer: [
        "and gives True if both operands are True",
        "or gives True if at least one operand is True",
        "not reverses the Boolean value",
      ],
      multiple: true,
    },
    {
      question: (
        <div>
          <p>What is the output of the following code?</p>
          <CodeBlock language="python" code={`True or False and False`} />
        </div>
      ),
      options: ["True", "False"],
      answer: "True",
    },
    {
      question: (
        <div>
          <p>What will be the output of the following code?</p>
          <CodeBlock language="python" code={`not (True and False) or False`} />
        </div>
      ),
      options: ["True", "False"],
      answer: "True",
    },
    {
      question: "Which operator has higher precedence in Python?",
      options: ["and", "or", "not"],
      answer: "not",
    },
    {
      question: (
        <div>
          <p>What is the result of the following expression?</p>
          <CodeBlock language="python" code={`(True or False) and False`} />
        </div>
      ),
      options: ["True", "False"],
      answer: "False",
    },
    {
      question: "Select all valid combinations to check if x is True and y is False:",
      options: ["x and not y", "not x or y", "x or y", "not x and not y"],
      answer: ["x and not y"],
      multiple: true,
    },
  ];
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  const [questions] = useState(shuffleArray([...questionsData]));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
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
    setSelectedAnswer([]);
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

  const arraysEqual = (a, b) => {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    return a.length === b.length && a.every((val) => b.includes(val));
  };

  const handleNext = () => {
    const currentQuestion = showingSkipped
      ? questions[skippedQuestions[currentIndex]]
      : questions[currentIndex];

    if (
      (!currentQuestion.multiple && selectedAnswer.length === 0) ||
      (currentQuestion.multiple && selectedAnswer.length === 0)
    )
      return;

    let isCorrect = false;
    if (currentQuestion.multiple)
      isCorrect = arraysEqual(selectedAnswer, currentQuestion.answer);
    else isCorrect = selectedAnswer[0] === currentQuestion.answer;

    let points = 0;
    if (isCorrect) points = timeLeft > 0 ? 10 : 7;
    else points = -5;

    setScore((prev) => prev + points);
    setFeedback({ correct: isCorrect, points });
  };

  const handleOptionChange = (option, isMultiple) => {
    if (feedback) return;
    if (isMultiple) {
      setSelectedAnswer((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    } else {
      setSelectedAnswer([option]);
    }
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
      <h3 className="mcq-title">Logical Operators - MCQs</h3>

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
                    onChange={() =>
                      handleOptionChange(option, currentQuestion.multiple)
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

export default LogicalOperators_MCQ;
