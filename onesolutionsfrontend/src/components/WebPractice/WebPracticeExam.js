"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { staticCodingPracticesData } from "../../codingPracticesData/staticCodingPracticesData";
import CodingPracticeService from "../../services/codingPracticeService";
import { useAuth } from "../../context/AuthContext";
import "./WebPracticeExam.css";

const WebPracticeExam = () => {
  const { practiceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { loadProgressSummary, user, markSubtopicComplete } = useAuth();

  const [selectedPractice, setSelectedPractice] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [examDuration] = useState(180); // 3 hours in minutes
  const [examStarted, setExamStarted] = useState(false);
  const [examEndTime, setExamEndTime] = useState(null);
  const [showStartModal, setShowStartModal] = useState(false);

  // Get navigation params
  const { subtopicId, goalName, courseName, topicId } = location.state || {};

  // Load progress data
  const loadProgress = useCallback(async () => {
    try {
      const response = await CodingPracticeService.getAllProgress();
      if (response.success) {
        const progressMap = {};
        if (response.data?.progress && Array.isArray(response.data.progress)) {
          response.data.progress.forEach((prog) => {
            if (prog && prog.question_id) {
              progressMap[prog.question_id] = prog;
            }
          });
        }
        setUserProgress(progressMap);
        return progressMap;
      }
    } catch (error) {
      console.error("Failed to load progress:", error);
    }
    return {};
  }, []);

  // Load practice data
  useEffect(() => {
    const loadPracticeData = async () => {
      try {
        setLoading(true);

        if (!staticCodingPracticesData || !staticCodingPracticesData.static) {
          console.error("Practice data not found");
          return;
        }

        const practice = staticCodingPracticesData.static.find(
          (p) => p.id === practiceId
        );

        if (!practice) {
          console.error(`Practice with ID "${practiceId}" not found`);
          return;
        }

        setSelectedPractice(practice);

        if (practice.questions && Array.isArray(practice.questions)) {
          setQuestions(practice.questions);

          // Check if exam is already in progress
          const userId = user?.id || "guest";
          const savedExam = localStorage.getItem(
            `exam_${practiceId}_${userId}`
          );
          if (savedExam) {
            const examData = JSON.parse(savedExam);
            if (examData.status === "in-progress" && examData.endTime) {
              const endTime = new Date(examData.endTime);
              if (endTime > new Date()) {
                setExamStarted(true);
                setExamEndTime(endTime);
                // Calculate remaining time
                const remaining = Math.max(
                  0,
                  Math.floor((endTime - new Date()) / 1000)
                );
                setTimeRemaining(remaining);
              } else {
                // Exam time expired
                handleExamCompletion();
              }
            }
          }
        }
      } catch (error) {
        console.error("Error loading practice data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (practiceId) {
      loadPracticeData();
    }
  }, [practiceId, user?.id]);

  // Timer effect
  useEffect(() => {
    let timer;
    if (examStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [examStarted, timeRemaining]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartExam = () => {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + examDuration * 60 * 1000);

    const userId = user?.id || "guest";
    const examData = {
      practiceId,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      status: "in-progress",
      warnings: 0,
      questionsAttempted: {},
    };

    localStorage.setItem(
      `exam_${practiceId}_${userId}`,
      JSON.stringify(examData)
    );

    setExamStarted(true);
    setExamEndTime(endTime);
    setTimeRemaining(examDuration * 60);
    setShowStartModal(false);
  };

  const handleQuestionSelect = (question) => {
    if (!examStarted) {
      setShowStartModal(true);
      return;
    }

    navigate(`/web-practice-exam/${practiceId}/${question.id}`, {
      state: {
        subtopicId,
        goalName,
        courseName,
        topicId,
        examMode: true,
        practiceId,
        timeRemaining,
        examStarted: true,
      },
    });
  };

  const getQuestionStatus = (questionId) => {
    return userProgress[questionId]?.status || "unsolved";
  };

  const getQuestionScore = (questionId) => {
    return userProgress[questionId]?.score || 0;
  };

  const calculateProgress = () => {
    if (questions.length === 0) return 0;
    const solved = questions.filter(
      (q) => getQuestionStatus(q.id) === "solved"
    ).length;
    return Math.round((solved / questions.length) * 100);
  };

  const handleTimeUp = () => {
    alert("Time's up! The exam will be submitted automatically.");
    handleExamCompletion();
  };

  const handleExamCompletion = async () => {
    try {
      // Calculate final score
      let totalScore = 0;
      let maxScore = 0;

      questions.forEach((question) => {
        maxScore += question.score || 0;
        const score = getQuestionScore(question.id);
        if (score > 0) {
          totalScore += score;
        }
      });

      const percentage =
        maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
      const passed = percentage >= 70;

      // Mark practice as complete if passed
      if (passed && selectedPractice) {
        try {
          await CodingPracticeService.completePractice(
            selectedPractice.id,
            goalName,
            courseName
          );

          // Also mark subtopic as complete
          if (subtopicId) {
            await markSubtopicComplete(subtopicId, goalName, courseName);
          }

          await loadProgressSummary();
        } catch (error) {
          console.error("Failed to mark practice complete:", error);
        }
      }

      // Clear exam data from localStorage
      const userId = user?.id || "guest";
      localStorage.removeItem(`exam_${practiceId}_${userId}`);

      setExamStarted(false);

      // Show result
      alert(
        `Exam ${
          passed ? "Passed" : "Failed"
        }! Score: ${totalScore}/${maxScore} (${percentage}%)`
      );

      // Navigate back
      if (topicId && subtopicId) {
        navigate(`/topic/${topicId}/subtopic/${subtopicId}`, {
          state: { subtopicId, goalName, courseName, topicId },
        });
      } else {
        navigate(-1);
      }
    } catch (error) {
      console.error("Failed to complete exam:", error);
      alert("Error completing exam. Please try again.");
    }
  };

  const handleBack = () => {
    if (examStarted) {
      if (
        window.confirm(
          "Are you sure you want to leave the exam? Your progress will be saved, but the timer will continue."
        )
      ) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading exam...</p>
      </div>
    );
  }

  if (!selectedPractice) {
    return (
      <div className="error-container">
        <h2>Exam Not Found</h2>
        <p>The requested exam could not be loaded.</p>
        <button onClick={handleBack} className="back-button">
          ← Go Back
        </button>
      </div>
    );
  }

  const StartExamModal = () => {
    if (!showStartModal) return null;

    return (
      <div className="exam-start-modal-overlay">
        <div className="exam-start-modal">
          <h2 className="modal-title">Start Exam</h2>

          <div className="exam-info">
            <h3>{selectedPractice.title}</h3>
            <p className="exam-description">{selectedPractice.description}</p>

            <div className="exam-details">
              <div className="detail-item">
                <span className="detail-label">Duration:</span>
                <span className="detail-value">3 hours</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Questions:</span>
                <span className="detail-value">{questions.length}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Passing Score:</span>
                <span className="detail-value">70%</span>
              </div>
            </div>
          </div>

          <div className="exam-rules">
            <h4>Important Rules:</h4>
            <ul>
              <li>✅ Complete all questions within 3 hours</li>
              <li>⚠️ Tab switching is monitored (3 warnings allowed)</li>
              <li>⏱️ Timer cannot be paused</li>
              <li>📝 Submit each question individually</li>
              <li>🎯 Minimum 70% required to pass</li>
              <li>🚫 No external help allowed</li>
            </ul>
          </div>

          <div className="modal-actions">
            <button
              className="btn-secondary"
              onClick={() => setShowStartModal(false)}
            >
              Cancel
            </button>
            <button className="btn-primary" onClick={handleStartExam}>
              Start Exam Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  const solvedCount = questions.filter(
    (q) => getQuestionStatus(q.id) === "solved"
  ).length;
  const totalScore = questions.reduce(
    (sum, q) => sum + (getQuestionScore(q.id) || 0),
    0
  );
  const maxScore = questions.reduce((sum, q) => sum + (q.score || 0), 0);

  return (
    <div className="web-practice-exam-container">
      <StartExamModal />

      <div className="exam-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        {examStarted && timeRemaining > 0 && (
          <div className="exam-timer">
            <div className="timer-display">
              <span className="timer-label">Time Remaining:</span>
              <span
                className={`timer-value ${
                  timeRemaining < 300 ? "warning" : ""
                }`}
              >
                {formatTime(timeRemaining)}
              </span>
            </div>
            <div className="timer-progress">
              <div
                className="timer-progress-bar"
                style={{
                  width: `${(timeRemaining / (examDuration * 60)) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="exam-content">
        <div className="questions-list">
          <div className="questions-header">
            <h2>Exam Questions</h2>
            <div className="questions-summary">
              <span className="summary-item">
                ✅ Solved: {solvedCount}/{questions.length}
              </span>
              <span className="summary-item">
                🎯 Score: {totalScore}/{maxScore} points
              </span>
            </div>
          </div>

          <div className="questions-table-container">
            <table className="questions-table onesolutions-table">
              <thead>
                <tr>
                  <th>QUESTION</th>
                  <th>DIFFICULTY</th>
                  <th>TEST CASES PASSED</th>
                  <th>SCORE</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {questions.map((question) => {
                  const status = getQuestionStatus(question.id);
                  const score = getQuestionScore(question.id);

                  return (
                    <tr
                      key={question.id}
                      className={`onesolutions-row ${status}`}
                      onClick={() => handleQuestionSelect(question)}
                    >
                      {/* Question */}
                      <td className="question-title-cell">{question.title}</td>

                      {/* Difficulty */}
                      <td>
                        <span
                          className={`difficulty-pill ${question.difficulty?.toLowerCase()}`}
                        >
                          {question.difficulty}
                        </span>
                      </td>

                      {/* Test cases */}
                      <td className="center">- / -</td>

                      {/* Score */}
                      <td className="center score-text">/{question.score}</td>

                      {/* Status */}
                      <td>
                        <div className="status-wrap">
                          <span className={`status-dot ${status}`}></span>
                          <span className="status-label">
                            {status === "attempted"
                              ? "ATTEMPTED"
                              : "NOT ATTEMPTED"}
                          </span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="right">
                        <button className="open-question-btn">
                          Open Question
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {examStarted && (
            <div className="exam-warning">
              <div className="warning-icon">⚠️</div>
              <div className="warning-content">
                <h4>Security Active</h4>
                <p>
                  Tab switching, window switching, and dev tools are monitored.
                  You have 3 warnings before automatic failure.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebPracticeExam;
