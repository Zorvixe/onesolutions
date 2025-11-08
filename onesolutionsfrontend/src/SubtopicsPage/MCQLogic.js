import React, { useState, useEffect, useRef } from "react";
import "./MCQLogic.css"; // Make sure to create this CSS file

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
  const [startTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(null);
  const timerRef = useRef(null);
  const [answeredStats, setAnsweredStats] = useState({
    correct: 0,
    wrong: 0,
    unanswered: 0,
  });

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
      if (currentIndex + 1 < quiz.length) {
        setCurrentIndex((prev) => prev + 1);
      } else if (skippedQuestions.length > 0) {
        setShowingSkipped(true);
        setCurrentIndex(0);
      } else {
        finishQuiz();
      }
    } else {
      if (currentIndex + 1 < skippedQuestions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        finishQuiz();
      }
    }
  };

  const finishQuiz = () => {
    setEndTime(Date.now());
    setCompleted(true);
    const totalAnswered = answeredStats.correct + answeredStats.wrong;
    const unanswered = quiz.length - totalAnswered;
    setAnsweredStats((prev) => ({ ...prev, unanswered }));
    if (onComplete)
      onComplete({ score, answeredStats: { ...answeredStats, unanswered } });
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const currentQuestion = showingSkipped
      ? quiz[skippedQuestions[currentIndex]]
      : quiz[currentIndex];

    const isCorrect = selectedAnswer === currentQuestion.answer;
    let points = 0;

    if (isCorrect) {
      points = timeLeft > 0 ? 10 : 7;
      setAnsweredStats((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      points = -1;
      setAnsweredStats((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
    }

    setScore((prev) => Math.min(100, Math.max(0, prev + points)));
    setFeedback({ correct: isCorrect, points });
  };

  const handleSkip = () => {
    if (!showingSkipped) {
      setSkippedQuestions((prev) => [...prev, currentIndex]);
    }
    nextQuestion();
  };

  if (quiz.length === 0) return <p>Loading questions...</p>;

  const currentQuestion = showingSkipped
    ? quiz[skippedQuestions[currentIndex]]
    : quiz[currentIndex];

  const questionNumber = showingSkipped
    ? quiz.length - skippedQuestions.length + currentIndex + 1
    : currentIndex + 1;

  const totalQuestions = quiz.length;
  const finalScore = Math.max(0, Math.min(100, score));
  const isPassed = finalScore >= 80;
  const timeTaken = endTime ? Math.floor((endTime - startTime) / 1000) : 0;
  const mins = String(Math.floor(timeTaken / 60)).padStart(2, "0");
  const secs = String(timeTaken % 60).padStart(2, "0");

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
      <div className="mcq-scoreboard">
        <div className="score-item">
          <strong>Score:</strong> {finalScore} / 100
        </div>
        <div>
          <p className="mcq-title">{title}</p>
        </div>
        <div className="score-item">
          <strong>Question:</strong> {questionNumber} / {totalQuestions}
        </div>
      </div>

      {!completed ? (
        <div className="mcq-question-block">
          <div className="mcq-question">
            <div className="question-row">
              <span className="question-number">{questionNumber}.</span>
              <span className="question-text">{questionText}</span>
            </div>
            {questionCode && (
              <div className="question-code">{questionCode}</div>
            )}
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
              ></i>
              {feedback.correct
                ? `+${feedback.points}`
                : `-${Math.abs(feedback.points)}`}
            </div>
          )}

          <div className="mcq-buttons">
            {currentIndex > 0 && (
              <button
                className="mcq-prev"
                onClick={() => {
                  setCurrentIndex((prev) => prev - 1);
                  setFeedback(null);
                }}
              >
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
        <div className="mcq-result-screen">
          <div className="result-header">
            <h2>Attempt</h2>
            <p className="result-date">
              {new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            
          </div>

           <div className="result-gauge">
            <div className="circular-progress">
              <div className="progress-value">{finalScore}/100</div>
              <svg>
                <circle className="bg"></circle>
                <circle
                  className="fg"
                  style={{ strokeDashoffset: 283 - (283 * finalScore) / 100 }}
                ></circle>
              </svg>
              <div className={`pass-badge ${isPassed ? "passed" : "failed"}`}>
                {isPassed ? "PASSED" : "FAILED"}
              </div>
            </div>
          </div> 

           <div className="result-stats">
            <div className="stat correct">
              <span className="icon">✔</span>
              <span>{answeredStats.correct} Correct Answers</span>
            </div>
            <div className="stat wrong">
              <span className="icon">✖</span>
              <span>{answeredStats.wrong} Wrong Answers</span>
            </div>
            <div className="stat unanswered">
              <span className="icon">•</span>
              <span>{answeredStats.unanswered} Unanswered</span>
            </div>
          </div> 

           <div className="result-actions">
            <button className="btn-secondary">PRACTICE AGAIN</button>
            <button className="btn-primary">PROCEED TO NEXT ➜</button>
            <button className="btn-skip">SKIP</button>
          </div> 
        </div>
      )}
    </div>
  );
};

export default MCQLogic;
