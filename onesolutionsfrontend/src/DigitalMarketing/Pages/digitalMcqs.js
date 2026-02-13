import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DigitalMcqs = ({
  contentId,
  contentUuid: propContentUuid,
  goalId,
  moduleId,
  topicId,
  subtopicId,
  onComplete,
  preLoadedContent,
}) => {
  const { contentUuid: paramContentUuid } = useParams();
  const navigate = useNavigate();
  const {
    getContentByUuid,
    markSubtopicComplete,
    loadProgressSummary,
    completedContent,
    user,
  } = useAuth();
  const finalContentUuid = propContentUuid || paramContentUuid;

  const [content, setContent] = useState(preLoadedContent || null);
  const [loading, setLoading] = useState(!preLoadedContent);
  const [error, setError] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [showingReview, setShowingReview] = useState(false);
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
  const [userAnswers, setUserAnswers] = useState({});
  const [questionStatus, setQuestionStatus] = useState({});
  const [questionPoints, setQuestionPoints] = useState({});

  const [savingCompletion, setSavingCompletion] = useState(false);
  const [markedComplete, setMarkedComplete] = useState(false);

  // Points configuration
  const POINTS_PER_QUESTION = 6.67;
  const TIME_BONUS_POINTS = 3.33;
  const PENALTY_POINTS = 1;

  // Shuffle function
  const shuffleArray = (array) => {
    if (!array) return [];
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (preLoadedContent) {
      setContent(preLoadedContent);
      setLoading(false);
      const shuffledQuestions = preLoadedContent.questions
        ? shuffleArray(preLoadedContent.questions)
        : [];
      setQuiz(shuffledQuestions);
      setMarkedComplete(
        completedContent.includes(preLoadedContent.id) ||
          preLoadedContent.is_completed
      );
    }
  }, [preLoadedContent, completedContent]);

  useEffect(() => {
    if (!content && finalContentUuid) {
      const loadContent = async () => {
        try {
          setLoading(true);
          const res = await getContentByUuid(finalContentUuid);
          if (res?.success) {
            setContent(res.data);
            const shuffledQuestions = res.data.questions
              ? shuffleArray(res.data.questions)
              : [];
            setQuiz(shuffledQuestions);
            setMarkedComplete(
              completedContent.includes(res.data.id) || res.data.is_completed
            );
          }
        } catch (e) {
          setError("Failed to load content");
        } finally {
          setLoading(false);
        }
      };
      loadContent();
    }
  }, [finalContentUuid, content, getContentByUuid, completedContent]);

  // Check if already completed
  useEffect(() => {
    if (content?.id && completedContent.includes(content.id)) {
      setMarkedComplete(true);
    }
  }, [content, completedContent]);

  // Timer setup
  useEffect(() => {
    if (completed || showingReview || quiz.length === 0) return;
    setTimeLeft(20);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentIndex, completed, showingReview, quiz.length]);

  // Calculate final score when quiz is completed
  useEffect(() => {
    if (completed) {
      calculateFinalScore();
    }
  }, [completed]);

  const calculateFinalScore = () => {
    let correctCount = 0;
    let wrongCount = 0;
    let totalPoints = 0;

    // Calculate points and counts
    quiz.forEach((_, index) => {
      const points = questionPoints[index] || 0;
      totalPoints += points;

      if (points > 0) {
        correctCount++;
      } else if (points < 0) {
        wrongCount++;
      }
    });

    // Calculate percentage based on 100 marks
    const totalPossiblePoints = quiz.length * POINTS_PER_QUESTION;
    let percentageScore =
      totalPossiblePoints > 0 ? (totalPoints / totalPossiblePoints) * 100 : 0;

    // Ensure score is between 0-100
    percentageScore = Math.max(0, Math.min(100, percentageScore));

    const skipped = skippedQuestions.length;
    const unanswered = quiz.length - (correctCount + wrongCount + skipped);

    setScore(percentageScore);
    setAnsweredStats({
      correct: correctCount,
      wrong: wrongCount,
      unanswered: unanswered,
    });
  };

  const nextQuestion = () => {
    clearInterval(timerRef.current);
    setSelectedAnswer(null);
    setFeedback(null);

    if (currentIndex + 1 < quiz.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setEndTime(Date.now());
    setCompleted(true);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const currentQuestion = quiz[currentIndex];
    const correctAnswer =
      currentQuestion.correctAnswer !== undefined
        ? currentQuestion.correctAnswer
        : currentQuestion.answer;
    const isCorrect = selectedAnswer === correctAnswer;

    // Calculate points for this question
    let points = 0;
    if (isCorrect) {
      if (timeLeft > 10) {
        points = POINTS_PER_QUESTION + TIME_BONUS_POINTS; // 6.67 + 3.33 = 10
      } else if (timeLeft > 0) {
        points = POINTS_PER_QUESTION; // 6.67
      } else {
        points = POINTS_PER_QUESTION - 1; // 5.67
      }
    } else {
      points = -PENALTY_POINTS; // -1
    }

    // Store user answer
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        userAnswer: selectedAnswer,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect,
        points: points,
        timeLeft: timeLeft,
        hasTimeBonus: timeLeft > 10 && isCorrect,
      },
    }));

    // Store question status
    setQuestionStatus((prev) => ({
      ...prev,
      [currentIndex]: isCorrect ? "correct" : "wrong",
    }));

    // Store points for this question
    setQuestionPoints((prev) => ({
      ...prev,
      [currentIndex]: points,
    }));

    // Update stats
    setAnsweredStats((prev) => ({
      ...prev,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      wrong: !isCorrect ? prev.wrong + 1 : prev.wrong,
    }));

    // Calculate and update current score
    const currentTotal = Object.values({
      ...questionPoints,
      [currentIndex]: points,
    }).reduce((sum, p) => sum + p, 0);

    const totalPossiblePoints = quiz.length * POINTS_PER_QUESTION;
    let currentPercentage =
      totalPossiblePoints > 0 ? (currentTotal / totalPossiblePoints) * 100 : 0;
    currentPercentage = Math.max(0, Math.min(100, currentPercentage));

    setScore(currentPercentage);

    // Show feedback
    setFeedback({
      correct: isCorrect,
      points: Number(points.toFixed(2)),
      timeBonus: timeLeft > 10 && isCorrect ? TIME_BONUS_POINTS : 0,
    });
  };

  const handleSkip = () => {
    // Store skipped question
    setSkippedQuestions((prev) => {
      if (!prev.includes(currentIndex)) {
        return [...prev, currentIndex];
      }
      return prev;
    });

    // Store question status as skipped
    setQuestionStatus((prev) => ({
      ...prev,
      [currentIndex]: "skipped",
    }));

    // Store 0 points for skipped question
    setQuestionPoints((prev) => ({
      ...prev,
      [currentIndex]: 0,
    }));

    // Store user answer as skipped
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        userAnswer: null,
        correctAnswer:
          quiz[currentIndex].correctAnswer !== undefined
            ? quiz[currentIndex].correctAnswer
            : quiz[currentIndex].answer,
        isCorrect: false,
        points: 0,
        timeLeft: timeLeft,
        skipped: true,
      },
    }));

    nextQuestion();
  };

  const handleRetrySkipped = () => {
    if (skippedQuestions.length === 0) return;

    // Reset to first skipped question
    setCurrentIndex(skippedQuestions[0]);
    setShowingReview(false);
    setCompleted(false);
    setSelectedAnswer(null);
    setFeedback(null);

    // Clear only the skipped questions status
    const newStatus = { ...questionStatus };
    const newPoints = { ...questionPoints };
    const newUserAnswers = { ...userAnswers };

    skippedQuestions.forEach((index) => {
      delete newStatus[index];
      delete newPoints[index];
      delete newUserAnswers[index];
    });

    setQuestionStatus(newStatus);
    setQuestionPoints(newPoints);
    setUserAnswers(newUserAnswers);

    // Reset stats for retry
    const correctCount = Object.values(newStatus).filter(
      (status) => status === "correct"
    ).length;
    const wrongCount = Object.values(newStatus).filter(
      (status) => status === "wrong"
    ).length;

    setAnsweredStats({
      correct: correctCount,
      wrong: wrongCount,
      unanswered:
        quiz.length - (correctCount + wrongCount + skippedQuestions.length),
    });

    // Clear skipped questions array
    setSkippedQuestions([]);
  };

  const handleMarkComplete = async () => {
    if (!content || savingCompletion || markedComplete) return;

    try {
      setSavingCompletion(true);
      setError(null);

      // Only mark as complete if score is 80% or higher
      const finalScore = Math.max(0, Math.min(100, score));
      const isPassed = finalScore >= 80;

      if (isPassed) {
        const result = await markSubtopicComplete(
          content.id,
          goalId || content.goal_id || "",
          moduleId || content.module_id || "",
          subtopicId || content.subtopic_id || content.id,
          finalScore
        );

        if (result?.success) {
          if (loadProgressSummary) {
            await loadProgressSummary();
          }
          setMarkedComplete(true);

          if (onComplete) {
            await onComplete();
          }

          // Navigate back after a short delay
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          setError("Failed to save progress. Please try again.");
        }
      } else {
        setError("You need to score at least 80% to mark this as complete.");
      }
    } catch (err) {
      console.error("Error marking completion:", err);
      setError("Failed to mark as complete. Please try again.");
    } finally {
      setSavingCompletion(false);
    }
  };

  const renderReviewScreen = () => {
    return (
      <div className="mcq-review-screen">
        <div className="review-header">
          <div className="review-header-content">
            <h2>
              <i className="bi bi-clipboard-check"></i> Question Review
            </h2>
            <p className="review-subtitle">
              Review all questions with correct answers and your responses
            </p>
          </div>
          <button
            className="btn-back-to-results"
            onClick={() => setShowingReview(false)}
          >
            <i className="bi bi-arrow-left"></i> Back to Results
          </button>
        </div>

        <div className="review-stats-summary">
          <div className="review-stat-card correct-stat">
            <div className="stat-icon">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <div className="stat-content">
              <div className="stat-value">{answeredStats.correct}</div>
              <div className="stat-label">Correct</div>
            </div>
          </div>
          <div className="review-stat-card wrong-stat">
            <div className="stat-icon">
              <i className="bi bi-x-circle-fill"></i>
            </div>
            <div className="stat-content">
              <div className="stat-value">{answeredStats.wrong}</div>
              <div className="stat-label">Wrong</div>
            </div>
          </div>
          <div className="review-stat-card skipped-stat">
            <div className="stat-icon">
              <i className="bi bi-skip-forward-circle-fill"></i>
            </div>
            <div className="stat-content">
              <div className="stat-value">{skippedQuestions.length}</div>
              <div className="stat-label">Skipped</div>
            </div>
          </div>
          <div className="review-stat-card score-stat">
            <div className="stat-icon">
              <i className="bi bi-award-fill"></i>
            </div>
            <div className="stat-content">
              <div className="stat-value">{Math.round(score)}%</div>
              <div className="stat-label">Score</div>
            </div>
          </div>
        </div>

        <div className="review-questions-container">
          {quiz.map((question, index) => {
            const userAnswer = userAnswers[index];
            const status = questionStatus[index];
            const points = questionPoints[index] || 0;
            const isSkipped = skippedQuestions.includes(index);
            const questionNumber = index + 1;
            const options = question.options || [];

            return (
              <div
                key={index}
                className={`review-question-card ${status || isSkipped ? status || "skipped" : ""}`}
              >
                <div className="review-question-header">
                  <div className="question-number-badge">
                    <span className="question-number">Q{questionNumber}</span>
                  </div>
                  <div className="question-status-indicator">
                    {isSkipped ? (
                      <span className="status-badge skipped-badge">
                        <i className="bi bi-skip-forward"></i> Skipped
                      </span>
                    ) : status === "correct" ? (
                      <span className="status-badge correct-badge">
                        <i className="bi bi-check-circle"></i> Correct
                      </span>
                    ) : status === "wrong" ? (
                      <span className="status-badge wrong-badge">
                        <i className="bi bi-x-circle"></i> Wrong
                      </span>
                    ) : (
                      <span className="status-badge not-attempted-badge">
                        <i className="bi bi-question-circle"></i> Not Attempted
                      </span>
                    )}
                    {points !== 0 && (
                      <span
                        className={`points-badge ${points > 0 ? "positive-points" : "negative-points"}`}
                      >
                        {points > 0 ? "+" : ""}
                        {points.toFixed(2)} pts
                      </span>
                    )}
                  </div>
                </div>

                <div className="review-question-content">
                  <div className="review-question-text">
                    {typeof question.question === "string"
                      ? question.question
                      : question.question}
                  </div>

                  <div className="review-options-grid">
                    {options.map((option, optIdx) => {
                      const correctAnswer =
                        question.correctAnswer !== undefined
                          ? question.correctAnswer
                          : question.answer;
                      const isCorrectAnswer =
                        optIdx === correctAnswer || option === correctAnswer;
                      const isUserAnswer =
                        userAnswer &&
                        (userAnswer.userAnswer === optIdx ||
                          userAnswer.userAnswer === option);
                      const optionLetter = String.fromCharCode(65 + optIdx);

                      let className = "review-option";
                      if (isCorrectAnswer) className += " correct-answer";
                      if (isUserAnswer) className += " user-answer";
                      if (isUserAnswer && !isCorrectAnswer)
                        className += " wrong-answer";

                      return (
                        <div key={optIdx} className={className}>
                          <div className="option-header">
                            <div className="questions-options">
                              <span className="option-letter">
                                {optionLetter}
                              </span>
                              <span className="option-text-content">
                                {option}
                              </span>
                            </div>
                            <div className="option-indicators">
                              {isCorrectAnswer && (
                                <span className="indicator correct-indicator">
                                  <i className="bi bi-check-circle"></i> Correct
                                  Answer
                                </span>
                              )}
                              {isUserAnswer && !isCorrectAnswer && (
                                <span className="indicator wrong-indicator">
                                  <i className="bi bi-x-circle"></i> Your Answer
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {userAnswer && (
                    <div className="review-question-feedback">
                      {userAnswer.skipped ? (
                        <div className="feedback-message skipped-feedback">
                          <i className="bi bi-info-circle"></i>
                          <div>
                            <strong>This question was skipped</strong>
                            <p>
                              You chose to skip this question during the quiz.
                            </p>
                          </div>
                        </div>
                      ) : userAnswer.isCorrect ? (
                        <div className="feedback-message correct-feedback">
                          <i className="bi bi-check-circle-fill"></i>
                          <div>
                            <strong>Excellent! You answered correctly</strong>
                            {userAnswer.hasTimeBonus ? (
                              <p>
                                You earned a time bonus for answering quickly!
                              </p>
                            ) : (
                              <p>Good job! Your answer was correct.</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="feedback-message wrong-feedback">
                          <i className="bi bi-x-circle-fill"></i>
                          <div>
                            <strong>Incorrect Answer</strong>
                            <p>
                              You selected the wrong option for this question.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="review-footer-actions">
          <button
            className="btn-back-results-foot"
            onClick={() => setShowingReview(false)}
          >
            <i className="bi bi-arrow-left"></i> Back to Results
          </button>

          {skippedQuestions.length > 0 && (
            <button
              className="btn-back-results-foot"
              onClick={handleRetrySkipped}
            >
              <i className="bi bi-arrow-clockwise"></i> Retry Skipped Questions
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading) return <div className="spinner"></div>;
  if (!content) return <div>No content available</div>;
  if (quiz.length === 0) return <div>No questions available for this quiz</div>;

  const currentQuestion = quiz[currentIndex];
  const questionNumber = currentIndex + 1;
  const totalQuestions = quiz.length;
  const finalScore = Math.max(0, Math.min(100, score));
  const isPassed = finalScore >= 80;
  const timeTaken = endTime ? Math.floor((endTime - startTime) / 1000) : 0;
  const mins = String(Math.floor(timeTaken / 60)).padStart(2, "0");
  const secs = String(timeTaken % 60).padStart(2, "0");
  const options = currentQuestion.options || [];

  return (
    <div className="mcq-container full-width">
      {/* Error Display */}
      {error && (
        <div className="mcq-error-alert">
          <i className="bi bi-exclamation-triangle"></i>
          <span>{error}</span>
        </div>
      )}

      {showingReview ? (
        renderReviewScreen()
      ) : (
        <>
          <div className="mcq-header">
            <div className="mcq-header-left">
              <h1 className="mcq-title">{content.mcq_title || "Quiz"}</h1>
              <div className="mcq-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(questionNumber / totalQuestions) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="progress-text">
                  Question {questionNumber} of {totalQuestions}
                </span>
              </div>
            </div>
            <div className="mcq-score-display">
              <div className="score-circle">
                <span className="score-value">{Math.round(score)}</span>
                <span className="score-label">/ 100</span>
              </div>
              <div className="score-text">Current Score</div>
            </div>
          </div>

          {!completed ? (
            <div className="mcq-question-container">
              <div className="question-card">
                <div className="question-header">
                  <span className="question-number-badge">
                    Q{questionNumber}
                  </span>
                  <div className="question-timer">
                    <i className="bi bi-clock"></i>
                    <span className="timer-value">{timeLeft}s</span>
                  </div>
                </div>

                <div className="question-body">
                  <div className="question-text">
                    {typeof currentQuestion.question === "string"
                      ? currentQuestion.question
                      : currentQuestion.question}
                  </div>

                  <div className="options-container">
                    {options.map((option, idx) => {
                      const isSelected =
                        selectedAnswer === idx || selectedAnswer === option;
                      const optionLetter = String.fromCharCode(65 + idx);

                      return (
                        <div
                          key={idx}
                          className={`option-item ${isSelected ? "selected" : ""}`}
                          onClick={() => !feedback && setSelectedAnswer(idx)}
                        >
                          <div className="option-radio">
                            <div
                              className={`radio-circle ${isSelected ? "selected" : ""}`}
                            >
                              {isSelected && <div className="radio-dot"></div>}
                            </div>
                            <span className="option-letter">
                              {optionLetter}
                            </span>
                          </div>
                          <div className="option-text">{option}</div>
                        </div>
                      );
                    })}
                  </div>

                  {feedback && (
                    <div
                      className={`feedback-container ${feedback.correct ? "correct-feedback" : "wrong-feedback"}`}
                    >
                      <div className="feedback-icon">
                        <i
                          className={`bi ${feedback.correct ? "bi-check-circle-fill" : "bi-x-circle-fill"}`}
                        ></i>
                      </div>
                      <div className="feedback-content">
                        <div className="feedback-title">
                          {feedback.correct ? "Correct!" : "Incorrect!"}
                        </div>
                        <div className="feedback-points">
                          {feedback.correct
                            ? `+${feedback.points.toFixed(2)} points`
                            : `-${PENALTY_POINTS} point`}
                          {feedback.timeBonus > 0 && (
                            <span className="bonus-badge">
                              +{TIME_BONUS_POINTS} time bonus
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="question-footer">
                  <div className="navigation-buttons">
                    <button
                      className="btn-nav prev-btn"
                      onClick={() => {
                        if (currentIndex > 0) {
                          setCurrentIndex((prev) => prev - 1);
                          setSelectedAnswer(null);
                          setFeedback(null);
                        }
                      }}
                      disabled={currentIndex === 0}
                    >
                      <i className="bi bi-arrow-left"></i> Previous
                    </button>

                    <div className="action-buttons">
                      <button
                        className="btn-skip"
                        onClick={handleSkip}
                        disabled={timeLeft > 0 || feedback !== null}
                      >
                        {timeLeft > 0 ? (
                          <>
                            <i className="bi bi-clock"></i> Skip ({timeLeft}s)
                          </>
                        ) : (
                          <>
                            <i className="bi bi-forward"></i> Skip
                          </>
                        )}
                      </button>

                      <button
                        className="btn-submit"
                        disabled={!selectedAnswer}
                        onClick={feedback ? nextQuestion : handleNext}
                      >
                        {feedback ? (
                          <>
                            Next <i className="bi bi-arrow-right"></i>
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send"></i> Submit Answer
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {timeLeft === 0 && !feedback && (
                    <div className="skip-notice">
                      <i className="bi bi-info-circle"></i>
                      You can now skip this question if needed
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="mcq-results-screen">
              <div className="results-header">
                <div className="results-title">
                  <h2>Quiz Results</h2>
                  <p className="results-date">
                    <i className="bi bi-calendar"></i>
                    {new Date().toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="results-time">
                  <i className="bi bi-stopwatch"></i>
                  <span>
                    Time: {mins}:{secs}
                  </span>
                </div>
              </div>

              <div className="results-score-card">
                <div className="score-circle-large">
                  <div className="score-circle-inner">
                    <span className="score-percentage">
                      {Math.round(finalScore)}%
                    </span>
                    <div
                      className={`score-status ${isPassed ? "passed" : "failed"}`}
                    >
                      {isPassed ? "PASSED" : "FAILED"}
                    </div>
                  </div>
                  <svg className="score-svg" viewBox="0 0 36 36">
                    <path
                      className="score-circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="score-circle-fg"
                      strokeDasharray={`${finalScore}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                </div>

                <div className="score-breakdown">
                  <div className="breakdown-title">Score Breakdown</div>
                  <div className="breakdown-stats">
                    <div className="breakdown-stat correct-stat">
                      <div className="stat-dot correct-dot"></div>
                      <div className="stat-info">
                        <span className="stat-count">
                          {answeredStats.correct}
                        </span>
                        <span className="stat-label">Correct</span>
                      </div>
                    </div>
                    <div className="breakdown-stat wrong-stat">
                      <div className="stat-dot wrong-dot"></div>
                      <div className="stat-info">
                        <span className="stat-count">
                          {answeredStats.wrong}
                        </span>
                        <span className="stat-label">Wrong</span>
                      </div>
                    </div>
                    <div className="breakdown-stat skipped-stat">
                      <div className="stat-dot skipped-dot"></div>
                      <div className="stat-info">
                        <span className="stat-count">
                          {skippedQuestions.length}
                        </span>
                        <span className="stat-label">Skipped</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="results-actions">
                <div className="action-buttons-grid">
                  {skippedQuestions.length > 0 && (
                    <button
                      className="action-btn retry-skipped-btn"
                      onClick={handleRetrySkipped}
                    >
                      <i className="bi bi-arrow-clockwise"></i>
                      <div className="btn-content">
                        <div className="btn-title">Retry Skipped</div>
                        <div className="btn-subtitle">
                          {skippedQuestions.length} questions
                        </div>
                      </div>
                    </button>
                  )}

                  <button
                    className="action-btn review-btn"
                    onClick={() => setShowingReview(true)}
                  >
                    <i className="bi bi-clipboard-check"></i>
                    <div className="btn-content">
                      <div className="btn-title">Review Questions</div>
                      <div className="btn-subtitle">See all answers</div>
                    </div>
                  </button>

                  <button
                    className="action-btn restart-btn"
                    onClick={() => window.location.reload()}
                  >
                    <i className="bi bi-arrow-repeat"></i>
                    <div className="btn-content">
                      <div className="btn-title">Practice Again</div>
                      <div className="btn-subtitle">Retry all questions</div>
                    </div>
                  </button>

                  <button
                    className={`action-btn proceed-btn ${isPassed ? "" : "disabled"}`}
                    onClick={handleMarkComplete}
                    disabled={savingCompletion || markedComplete || !isPassed}
                  >
                    <i className="bi bi-arrow-right-circle"></i>
                    <div className="btn-content">
                      <div className="btn-title">
                        {markedComplete
                          ? "✅ Completed"
                          : savingCompletion
                            ? "Saving..."
                            : isPassed
                              ? "Proceed to Next"
                              : "Score 80% to Proceed"}
                      </div>
                      <div className="btn-subtitle">
                        {markedComplete
                          ? "Progress saved"
                          : isPassed
                            ? "Continue learning"
                            : "Need higher score"}
                      </div>
                    </div>
                  </button>
                </div>

                {!isPassed && (
                  <div className="score-warning-message">
                    <i className="bi bi-exclamation-triangle"></i>
                    <span>
                      You need to score at least 80% to mark this as complete.
                    </span>
                  </div>
                )}

                {markedComplete && (
                  <div className="success-message">
                    <i className="bi bi-check-circle"></i>
                    <span>Progress saved successfully! Redirecting...</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DigitalMcqs;
