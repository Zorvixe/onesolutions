import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; 

const ProblemSol_Debugging_MCQ =  ({ onComplete }) => {
   const questionsData = [
    {
      question: "Which operator is used to find the remainder of a division in Python?",
      options: ["//", "/", "%", "**"],
      answer: "%"
    },
    {
      question: (
        <div>
          <p>What will be the output of the following code?</p>
          <CodeBlock language="python" code={`print(7 % 2)`} />
        </div>
      ),
      options: ["2", "1", "0", "7"],
      answer: "1"
    },
    {
      question: "Which operator is used to calculate a to the power of b in Python?",
      options: ["^", "**", "pow", "%"],
      answer: "**"
    },
    {
      question: (
        <div>
          <p>What is the output of the following code?</p>
          <CodeBlock language="python" code={`print(2 ** 3)`} />
        </div>
      ),
      options: ["5", "6", "8", "9"],
      answer: "8"
    },
    {
      question: "How can you find the square of a number 'n' using the exponent operator?",
      options: ["n % 2", "n ** 2", "n ** 0.5", "n // 2"],
      answer: "n ** 2"
    },
    {
      question: (
        <div>
          <p>What is the result of the following code?</p>
          <CodeBlock language="python" code={`print(16 ** 0.5)`} />
        </div>
      ),
      options: ["2", "4", "8", "0.5"],
      answer: "4"
    },
    {
      question: "Which statement is correct about debugging in Python?",
      options: [
        "It means writing code faster",
        "It is used to find and fix errors in code",
        "It is used to print output",
        "It is a type of loop"
      ],
      answer: "It is used to find and fix errors in code"
    },
    {
      question: "What common mistake often causes errors in if statements?",
      options: [
        "Using == for assignment",
        "Forgetting to use colons (:) after if",
        "Using print statements",
        "Using too many comments"
      ],
      answer: "Forgetting to use colons (:) after if"
    },
    {
      question: "What will happen if we use '=' instead of '==' in an if condition?",
      options: [
        "It will compare values correctly",
        "It will throw a SyntaxError",
        "It will print True",
        "It will run without error"
      ],
      answer: "It will throw a SyntaxError"
    },
    {
      question: "Which of the following is a good debugging practice?",
      options: [
        "Ignoring indentation",
        "Using print statements to check code flow",
        "Using '=' instead of '=='",
        "Avoiding colons"
      ],
      answer: "Using print statements to check code flow"
    }
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
      <h3 className="mcq-title">Problem Solving Debugging - MCQs</h3>

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

export default ProblemSol_Debugging_MCQ
