import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Loops_MCQ = ({ onComplete }) => {
  const originalQuestions = [
    {
      question: "What is the purpose of a loop in Python?",
      options: [
        "To execute code sequentially only once",
        "To execute a block of code multiple times",
        "To define variables",
        "To create functions"
      ],
      answer: "To execute a block of code multiple times"
    },
    {
      question: (
        <div>
          <p>Which of the following is a correct while loop syntax?</p>
          <CodeBlock
            language="python"
            code={`while count < 5:\n    print(count)`}
          />
        </div>
      ),
      options: [
        "while count < 5:\n    print(count)",
        "while (count < 5) {\n    print(count)\n}",
        "while count < 5 then print(count)",
        "while count < 5 do print(count)"
      ],
      answer: "while count < 5:\n    print(count)"
    },
    {
      question: (
        <div>
          <p>What will the following code output?</p>
          <CodeBlock
            language="python"
            code={`count = 0\nwhile count < 3:\n    print(count)\n    count += 1`}
          />
        </div>
      ),
      options: ["0 1 2", "1 2 3", "0 1 2 3", "Error"],
      answer: "0 1 2"
    },
    {
      question: "What happens if the counter variable in a while loop is not updated?",
      options: [
        "Loop runs normally",
        "Loop runs infinite times",
        "Loop executes once",
        "SyntaxError occurs"
      ],
      answer: "Loop runs infinite times"
    },
    {
      question: "Which of the following can cause an infinite loop?",
      options: [
        "Incorrect termination condition",
        "Not updating counter variable",
        "Both of the above",
        "None of the above"
      ],
      answer: "Both of the above"
    },
    {
      question: "Is it mandatory to use a counter variable in a while loop?",
      options: ["Yes", "No", "Only in Python 2", "Only in nested loops"],
      answer: "No"
    },
    {
      question: "Which of the following is NOT a loop type in Python?",
      options: ["for", "while", "do-while", "None of these"],
      answer: "do-while"
    },
    {
      question: (
        <div>
          <p>What is printed by the following code?</p>
          <CodeBlock
            language="python"
            code={`num = 2\nwhile num <= 5:\n    print(num)\n    num += 1`}
          />
        </div>
      ),
      options: ["2 3 4 5", "2 3 4 5 6", "1 2 3 4 5", "Error"],
      answer: "2 3 4 5"
    },
    {
      question: "What will happen if the condition in a while loop is initially False?",
      options: [
        "Loop executes once",
        "Loop executes infinitely",
        "Loop does not execute",
        "SyntaxError"
      ],
      answer: "Loop does not execute"
    },
    {
      question: "Which of the following statements is true about loops?",
      options: [
        "Loops cannot be nested",
        "Loops can only run a fixed number of times",
        "Loops allow repetitive execution based on a condition",
        "Loops are used to define functions"
      ],
      answer: "Loops allow repetitive execution based on a condition"
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
      <h3 className="mcq-title">Loops - MCQs</h3>

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

export default Loops_MCQ;
