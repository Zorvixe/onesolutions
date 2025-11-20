import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./MCQLogic.css";
import { useAuth } from "../context/AuthContext";

const MCQLogic = ({
  title,
  questions,
  onComplete,
  isCompleted = false,
  isLoading = false,
  subtopicId,
  goalName,
  courseName,
}) => {
  const navigate = useNavigate();
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

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

  const [savingCompletion, setSavingCompletion] = useState(false);
  const [markedComplete, setMarkedComplete] = useState(isCompleted);
  const [error, setError] = useState("");

  // Check if already completed
  useEffect(() => {
    if (subtopicId && completedContent.includes(subtopicId)) {
      setMarkedComplete(true);
    } else {
      setMarkedComplete(isCompleted);
    }
  }, [subtopicId, completedContent, isCompleted]);

  // Timer setup
  useEffect(() => {
    if (completed) return;
    setTimeLeft(20);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentIndex, completed]);

  // Validate required props
  useEffect(() => {
    if (!subtopicId) {
      setError("❌ Subtopic ID is required for progress tracking");
      console.error("Missing subtopicId:", {
        subtopicId,
        goalName,
        courseName,
      });
    }
  }, [subtopicId, goalName, courseName]);

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
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const currentQuestion = showingSkipped
      ? quiz[skippedQuestions[currentIndex]]
      : quiz[currentIndex];

    const correctAnswer = currentQuestion.answer;
    const isCorrect = selectedAnswer === correctAnswer;

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

  const handleProceed = async () => {
    if (savingCompletion || markedComplete) return;

    try {
      setSavingCompletion(true);
      setError("");

      // Validate required fields
      if (!subtopicId) {
        setError("❌ Cannot save progress: Subtopic ID is missing");
        return;
      }

      if (!goalName || !courseName) {
        setError(
          "❌ Cannot save progress: Goal name or course name is missing"
        );
        return;
      }

      // Only mark as complete if score is 80% or higher
      const finalScore = Math.max(0, Math.min(100, score));
      const isPassed = finalScore >= 80;

      if (isPassed) {
        console.log("📊 Attempting to mark subtopic as complete:", {
          subtopicId,
          goalName,
          courseName,
          score: finalScore,
        });

        const result = await markSubtopicComplete(
          subtopicId,
          goalName,
          courseName
        );

        if (result.success) {
          await loadProgressSummary();
          setMarkedComplete(true);

          // Call the onComplete callback if provided
          if (onComplete) {
            await onComplete();
          }

          console.log("✅ MCQ successfully marked as completed");

          // Navigate back after a short delay
          setTimeout(() => {
            navigate(-1); // Go back to previous page
          }, 2000);
        } else {
          console.error("❌ Failed to mark MCQ complete:", result.message);
          setError(`Failed to save progress: ${result.message}`);
        }
      } else {
        setError("You need to score at least 80% to mark this as complete.");
      }
    } catch (err) {
      console.error("❌ Error marking completion:", err);
      setError("Failed to mark as complete. Please try again.");
    } finally {
      setSavingCompletion(false);
    }
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

  return (
    <div className="mcq-container full-width">
      {/* Error Display */}
      {error && (
        <div
          className="mcq-error"
          style={{
            background: "#ffebee",
            color: "#c62828",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "15px",
            border: "1px solid #ffcdd2",
          }}
        >
          {error}
        </div>
      )}

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
              <div className="question-content">
                {typeof currentQuestion.question === "string"
                  ? currentQuestion.question
                  : currentQuestion.question}
              </div>
            </div>
          </div>

          <ul className="mcq-options">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              return (
                <li key={idx} className="mcq-option-item">
                  <label className="mcq-option-label">
                    <input
                      type="radio"
                      name={`q${currentIndex}`}
                      checked={isSelected}
                      onChange={() => setSelectedAnswer(option)}
                      disabled={feedback !== null}
                    />
                    <span className="mcq-option-text">{option}</span>
                  </label>
                </li>
              );
            })}
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
              {feedback.correct ? `+${feedback.points}` : `-1`}
            </div>
          )}

          <div className="mcq-buttons">
            {currentIndex > 0 && (
              <button
                className="mcq-prev"
                onClick={() => {
                  setCurrentIndex((prev) => prev - 1);
                  setSelectedAnswer(null);
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
                  style={{
                    strokeDashoffset: 283 - (283 * finalScore) / 100,
                  }}
                ></circle>
              </svg>
              <div className={`pass-badge ${isPassed ? "passed" : "failed"}`}>
                {isPassed ? "PASSED" : "FAILED"}
              </div>
            </div>
          </div>

          <div className="result-stats">
            <div className="stat correct">
              Correct Answers: {answeredStats.correct}
            </div>
            <div className="stat wrong">
              Wrong Answers: {answeredStats.wrong}
            </div>
            {/* <div className="stat unanswered">
              Unanswered: {answeredStats.unanswered}
            </div> */}
          </div>

          <div className="result-actions">
            <button
              className="btn-secondary"
              onClick={() => window.location.reload()}
            >
              PRACTICE AGAIN
            </button>

            <button
              className={`btn-primary ${isPassed ? "" : "disabled"}`}
              onClick={handleProceed}
              disabled={savingCompletion || markedComplete || !isPassed}
            >
              {markedComplete
                ? "✅ COMPLETED"
                : savingCompletion
                ? "Saving..."
                : isPassed
                ? "PROCEED TO NEXT"
                : "SCORE 80% TO PROCEED"}
            </button>

            {!isPassed && (
              <p className="score-warning">
                You need to score at least 80% to mark this as complete.
              </p>
            )}

            {markedComplete && (
              <p
                className="success-message"
                style={{ color: "green", marginTop: "10px" }}
              >
                ✅ Progress saved successfully! Redirecting...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MCQLogic;
