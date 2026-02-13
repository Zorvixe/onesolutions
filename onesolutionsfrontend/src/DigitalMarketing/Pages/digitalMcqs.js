import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DigitalMcqs = () => {
  const { contentUuid } = useParams();
  const navigate = useNavigate();
  const {
    getContentByUuid,
    markSubtopicComplete,
    completedContent,
    loadDigitalMarketingAllStructure,
    user,
  } = useAuth();

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [goalId, setGoalId] = useState(null);
  const [moduleId, setModuleId] = useState(null);
  const [subtopicId, setSubtopicId] = useState(null);

  const courseSelection = user?.courseSelection || "web_development";
  const hasDigitalAccess =
    courseSelection === "web_development" ||
    courseSelection === "digital_marketing" ||
    courseSelection === "all";

  useEffect(() => {
    if (!hasDigitalAccess) {
      setError("You don't have access to Digital Marketing content.");
      setLoading(false);
      return;
    }

    const loadContent = async () => {
      try {
        setLoading(true);
        if (contentUuid) {
          const response = await getContentByUuid(contentUuid);
          if (response?.success) {
            const contentData = response.data;
            setContent(contentData);
            
            setGoalId(contentData.goal_id);
            setModuleId(contentData.module_id);
            setSubtopicId(contentData.subtopic_id);
            
            setIsCompleted(completedContent.includes(contentData.id));

            if (contentData.questions && contentData.questions.length > 0) {
              setQuestions(contentData.questions);
            }
          } else {
            setError("MCQ assessment not found");
          }
        }
      } catch (err) {
        console.error("Error loading digital MCQs:", err);
        setError("Failed to load assessment");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [contentUuid, hasDigitalAccess, getContentByUuid, completedContent]);

  useEffect(() => {
    if (timeLeft > 0 && quizStarted && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quizStarted && !showResults) {
      calculateScore();
      setShowResults(true);
    }
  }, [timeLeft, quizStarted, showResults]);

  const handleOptionSelect = (questionId, optionIndex) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: optionIndex,
    });
  };

  const handleAnswerSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOptions[currentQuestion.id] !== undefined) {
      setAnswers({
        ...answers,
        [currentQuestion.id]: selectedOptions[currentQuestion.id],
      });

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        calculateScore();
        setShowResults(true);
      }
    } else {
      alert("Please select an option before proceeding.");
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correct_answer) {
        correctCount++;
      }
    });
    const finalScore = (correctCount / questions.length) * 100;
    setScore(finalScore);
  };

  const handleMarkComplete = async () => {
    if (!content || isCompleted) return;

    try {
      const result = await markSubtopicComplete(
        content.id,
        goalId,
        moduleId,
        subtopicId,
        score
      );

      if (result.success) {
        setIsCompleted(true);
        await loadDigitalMarketingAllStructure();
        alert(`✓ Assessment completed! Your score: ${score.toFixed(1)}%`);
      }
    } catch (error) {
      console.error("Error marking MCQs complete:", error);
      alert("Failed to mark as completed. Please try again.");
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions({});
    setAnswers({});
    setShowResults(false);
    setScore(0);
    setQuizStarted(true);
    setReviewMode(false);
    if (content?.time_limit) {
      setTimeLeft(content.time_limit * 60);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    if (content?.time_limit) {
      setTimeLeft(content.time_limit * 60);
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];
    if (!question) return null;
    
    return (
      <div className="mcq-question-container">
        <div className="question-header">
          <span className="question-number">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          {timeLeft !== null && (
            <span className="timer">
              Time Left: {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </span>
          )}
        </div>

        <div className="question-text">
          <h3>{question.question}</h3>
        </div>

        <div className="options-container">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`option-item ${selectedOptions[question.id] === index ? "selected" : ""}`}
              onClick={() => handleOptionSelect(question.id, index)}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="option-text">{option}</span>
            </div>
          ))}
        </div>

        <div className="question-navigation">
          <button
            className="nav-btn prev-btn"
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
            disabled={currentQuestionIndex === 0}
          >
            ← Previous
          </button>
          <button className="nav-btn next-btn" onClick={handleAnswerSubmit}>
            {currentQuestionIndex === questions.length - 1
              ? "Submit Quiz"
              : "Next →"}
          </button>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const passed = score >= (content?.passing_score || 70);
    const correctAnswers = questions.filter(
      (q) => answers[q.id] === q.correct_answer
    ).length;

    return (
      <div className="mcq-results-container">
        <div className={`results-card ${passed ? "passed" : "failed"}`}>
          <div className="score-circle">
            <span className="score-number">{score.toFixed(1)}%</span>
          </div>

          <h2>{passed ? "🎉 Congratulations!" : "📚 Keep Learning!"}</h2>
          <p className="score-message">
            {passed
              ? "You have successfully completed this assessment!"
              : `You scored ${score.toFixed(1)}%. Review the material and try again.`}
          </p>

          <div className="results-stats">
            <div className="stat">
              <span className="stat-label">Correct Answers</span>
              <span className="stat-value">
                {correctAnswers}/{questions.length}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Passing Score</span>
              <span className="stat-value">
                {content?.passing_score || 70}%
              </span>
            </div>
          </div>

          <div className="results-actions">
            <button className="review-btn" onClick={() => setReviewMode(true)}>
              Review Answers
            </button>
            <button className="retry-btn" onClick={resetQuiz}>
              Try Again
            </button>
            {passed && !isCompleted && (
              <button
                className={`complete-btn ${isCompleted ? "completed" : ""}`}
                onClick={handleMarkComplete}
              >
                Mark as Completed
              </button>
            )}
            {isCompleted && (
              <span className="completed-badge">✓ Assessment Completed</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderReview = () => {
    return (
      <div className="mcq-review-container">
        <h2>Review Answers</h2>
        <button
          className="back-to-results"
          onClick={() => setReviewMode(false)}
        >
          ← Back to Results
        </button>

        {questions.map((question, qIndex) => {
          const userAnswer = answers[question.id];
          const isCorrect = userAnswer === question.correct_answer;

          return (
            <div
              key={question.id}
              className={`review-question ${isCorrect ? "correct" : "incorrect"}`}
            >
              <div className="review-question-header">
                <span className="question-tag">Question {qIndex + 1}</span>
                <span
                  className={`result-badge ${isCorrect ? "correct" : "incorrect"}`}
                >
                  {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                </span>
              </div>

              <h3>{question.question}</h3>

              <div className="review-options">
                {question.options.map((option, oIndex) => (
                  <div
                    key={oIndex}
                    className={`review-option 
                      ${oIndex === question.correct_answer ? "correct-answer" : ""}
                      ${userAnswer === oIndex && userAnswer !== question.correct_answer ? "wrong-answer" : ""}
                    `}
                  >
                    <span className="option-letter">
                      {String.fromCharCode(65 + oIndex)}
                    </span>
                    <span className="option-text">{option}</span>
                    {oIndex === question.correct_answer && (
                      <span className="correct-indicator">
                        ✓ Correct Answer
                      </span>
                    )}
                    {userAnswer === oIndex &&
                      userAnswer !== question.correct_answer && (
                        <span className="wrong-indicator">✗ Your Answer</span>
                      )}
                  </div>
                ))}
              </div>

              <div className="explanation">
                <strong>Explanation:</strong> {question.explanation}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (!hasDigitalAccess) {
    return (
      <div className="digital-access-denied">
        <img
          src="/assets/img/locked_image.png"
          alt="Access Denied"
          className="locked_image"
        />
        <h2>Digital Marketing Access Required</h2>
        <p>You don't have access to Digital Marketing assessments.</p>
        <button className="upgrade-button" onClick={() => navigate("/profile")}>
          Upgrade Now
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="digital-mcqs-loading">
        <div className="spinner"></div>
        <p>Loading digital marketing assessment...</p>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="digital-mcqs-error">
        <img src="/assets/img/not_found.png" alt="Not Found" />
        <h2>Assessment Not Found</h2>
        <p>{error || "The requested assessment could not be found."}</p>
        <button
          className="back-button"
          onClick={() => navigate("/digital-courses")}
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="digital-mcqs-container">
      <div className="mcqs-header">
        <div className="mcqs-breadcrumb">
          <span onClick={() => navigate("/digital-courses")}>
            Digital Marketing
          </span>
          <span className="separator">→</span>
          <span>{content.mcq_title || "Digital Marketing Assessment"}</span>
        </div>

        {!quizStarted && !showResults && !reviewMode && (
          <div className="mcqs-intro">
            <h1>{content.mcq_title || "Digital Marketing Assessment"}</h1>
            <p className="assessment-description">
              Test your knowledge of digital marketing concepts.
            </p>

            <div className="assessment-info">
              <div className="info-item">
                <span className="info-label">Questions:</span>
                <span className="info-value">{questions.length}</span>
              </div>
              {content.time_limit && (
                <div className="info-item">
                  <span className="info-label">Time Limit:</span>
                  <span className="info-value">
                    {content.time_limit} minutes
                  </span>
                </div>
              )}
              <div className="info-item">
                <span className="info-label">Passing Score:</span>
                <span className="info-value">
                  {content.passing_score || 70}%
                </span>
              </div>
            </div>

            <button className="start-quiz-btn" onClick={startQuiz}>
              Start Assessment
            </button>
          </div>
        )}
      </div>

      <div className="mcqs-content">
        {quizStarted && !showResults && !reviewMode && renderQuestion()}
        {showResults && !reviewMode && renderResults()}
        {reviewMode && renderReview()}
      </div>

      {isCompleted && !showResults && (
        <div className="already-completed">
          <span className="completed-icon">✓</span>
          <p>You have already completed this assessment.</p>
          <button className="retake-btn" onClick={resetQuiz}>
            Retake Assessment
          </button>
        </div>
      )}
    </div>
  );
};

export default DigitalMcqs;