import React, { useState, useEffect, useRef } from "react";
import "./MCQLogic.css";

const MCQLogic = ({ title, questions, onComplete }) => {
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  const [quiz] = useState(shuffleArray([...questions]));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [showingSkipped, setShowingSkipped] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const timerRef = useRef(null);

  useEffect(() => {
    if (completed) return;
    setTimeLeft(20);
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
      if (currentIndex + 1 < quiz.length) setCurrentIndex((prev) => prev + 1);
      else if (skippedQuestions.length > 0) {
        setShowingSkipped(true);
        setCurrentIndex(0);
      } else setCompleted(true);
    } else {
      if (currentIndex + 1 < skippedQuestions.length)
        setCurrentIndex((prev) => prev + 1);
      else setCompleted(true);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedAnswer(null);
      setFeedback(null);
    }
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const currentQuestion = showingSkipped
      ? quiz[skippedQuestions[currentIndex]]
      : quiz[currentIndex];

    const isCorrect = selectedAnswer === currentQuestion.answer;
    let points = isCorrect ? (timeLeft > 0 ? 10 : 7) : -5;

    setScore((prev) => prev + points);
    setFeedback({ correct: isCorrect, points });
  };

  const handleSkip = () => {
    if (!showingSkipped) setSkippedQuestions((prev) => [...prev, currentIndex]);
    nextQuestion();
  };

  if (quiz.length === 0) return <p>Loading questions...</p>;

  const currentQuestion = showingSkipped
    ? quiz[skippedQuestions[currentIndex]]
    : quiz[currentIndex];

  const questionNumber = showingSkipped
    ? quiz.length - skippedQuestions.length + currentIndex + 1
    : currentIndex + 1;

  const percentage = (score / (quiz.length * 10)) * 100;

  // ✅ Safely extract question text & code (no bold, no repetition)
  let questionText = "";
  let questionCode = null;

  if (currentQuestion.question && currentQuestion.question.props) {
    const children = currentQuestion.question.props.children;
    if (Array.isArray(children)) {
      questionText = children[0]?.props?.children || "";
      questionCode = children[1] || null;
    } else {
      questionText = currentQuestion.question;
    }
  } else {
    questionText = currentQuestion.question;
  }

  return (
    <div className="mcq-container full-width">
      <h3 className="mcq-title">{title}</h3>

      {!completed ? (
        <div className="mcq-question-block">
          <div className="mcq-question">
            <div className="question-row">
              <span className="question-number">{questionNumber}.</span>
              <span className="question-text">{questionText}</span>
            </div>
            {questionCode && <div className="question-code">{questionCode}</div>}
          </div>

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
              className={`mcq-feedback ${
                feedback.correct ? "correct" : "wrong"
              }`}
            >
              <i
                className={`bi ${
                  feedback.correct ? "bi-check-circle" : "bi-x-circle"
                }`}
                style={{ marginRight: "10px", fontSize: "20px" }}
              ></i>
              {feedback.correct
                ? `+${feedback.points}`
                : `-${Math.abs(feedback.points)}`}
            </div>
          )}

          <div className="mcq-buttons">
            {currentIndex > 0 && (
              <button className="mcq-prev" onClick={prevQuestion}>
                Previous
              </button>
            )}

            <button
              className="mcq-next"
              disabled={!selectedAnswer}
              onClick={feedback ? nextQuestion : handleNext}
            >
              {feedback ? "Next" : "Submit"}
            </button>
          </div>

          <div className={`mcq-timer ${timeLeft === 0 ? "time-over" : ""}`}>
            {!showingSkipped && (
              <button
                className="mcq-skip"
                onClick={handleSkip}
                disabled={timeLeft > 0 || feedback !== null}
              >
                {timeLeft > 0 ? `Skip (${timeLeft}s)` : "Skip"}
              </button>
            )}

            <div className="timer-text">
              {timeLeft > 0
                ? `You can Skip this question after ${timeLeft} sec`
                : "If you Skip, You can access this question later"}
            </div>
          </div>
        </div>
      ) : (
        <div className="mcq-completed">
          <h4>Quiz Completed!</h4>
          <p>
            Your Score: {score} / {quiz.length * 10}
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

export default MCQLogic;
