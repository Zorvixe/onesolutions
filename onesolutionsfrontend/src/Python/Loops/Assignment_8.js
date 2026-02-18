"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../CodingPracticeCss/CodingPractice.css";
import { codingPracticesData } from "../../codingPracticesData/codingPracticesData";
import CodingPracticeService from "../../services/codingPracticeService";
import { useAuth } from "../../context/AuthContext";

const Assignment_8 = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Use Auth context for progress tracking and student type
  const {
    codingPracticeProgress,
    loadProgressSummary,
    markSubtopicComplete,
    completedContent,
    loadProgressSummary: refreshProgress,
    user, // Get user from auth context
  } = useAuth();

  const [selectedPractice, setSelectedPractice] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [practiceCompletionStatus, setPracticeCompletionStatus] = useState({});

  // Get student type from user context - default to "zorvixe_core" if not specified
  const studentType = user?.studentType || "zorvixe_core";

  // Get goalName and courseName from navigation state with fallbacks
  const {
    goalName: stateGoalName,
    courseName: stateCourseName,
    subtopicId: codingPracticeSubtopicId,
    topicId: codingPracticeTopicId,
  } = location.state || {};

  // Extract goal and course names from practice data
  const goalName = stateGoalName;
  const courseName = stateCourseName;
  const finalSubtopicId = codingPracticeSubtopicId;
  const finalTopicId = codingPracticeTopicId;

  // Load "Coding Practice - 1" from codingPracticesData and filter questions based on student type
  useEffect(() => {
    const practice1 = codingPracticesData.python.find(
      (p) => p.id === "Codingpractice-python-Assignment-8"
    );

    if (practice1) {
      // Filter questions based on student type
      const accessibleQuestions = practice1.questions.filter(
        (question) =>
          !question.accessibleTo || question.accessibleTo.includes(studentType)
      );

      // Create a new practice object with filtered questions
      const filteredPractice = {
        ...practice1,
        questions: accessibleQuestions,
      };

      setSelectedPractice(filteredPractice);
      setFilteredQuestions(accessibleQuestions);

      console.log("📝 Loaded practice with details:", {
        practiceId: practice1.id,
        goalName,
        courseName,
        subtopicId: finalSubtopicId,
        studentType,
        totalQuestions: practice1.questions.length,
        accessibleQuestions: accessibleQuestions.length,
      });
    }
    setLoading(false);
  }, [goalName, courseName, finalSubtopicId, studentType]);

  // Load progress data when component mounts or when progress updates
  useEffect(() => {
    const loadProgressData = async () => {
      try {
        setLoading(true);
        await loadProgressSummary();

        // Check completion status for each practice
        if (selectedPractice) {
          const completionStatus = {};
          for (const practice of codingPracticesData.python) {
            try {
              const response = await CodingPracticeService.getCompletionStatus(
                practice.id
              );
              if (response.success) {
                completionStatus[practice.id] = response.data.isCompleted;
              }
            } catch (error) {
              console.error(
                `Failed to check completion for ${practice.id}:`,
                error
              );
              completionStatus[practice.id] = false;
            }
          }
          setPracticeCompletionStatus(completionStatus);
        }
      } catch (error) {
        console.error("Failed to load progress data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProgressData();
  }, [selectedPractice, loadProgressSummary]);

  // Enhanced progress tracking functions
  const getQuestionStatus = useCallback(
    (questionId) => {
      return codingPracticeProgress[questionId]?.status || "unsolved";
    },
    [codingPracticeProgress]
  );

  const getQuestionScore = useCallback(
    (questionId) => {
      return codingPracticeProgress[questionId]?.score || 0;
    },
    [codingPracticeProgress]
  );

  const getQuestionAttempts = useCallback(
    (questionId) => {
      const progress = codingPracticeProgress[questionId];
      if (!progress) return [];

      return [
        {
          passed: progress.status === "solved",
          score: progress.score,
          timestamp: new Date().toISOString(),
        },
      ];
    },
    [codingPracticeProgress]
  );

  const isPracticeCompleted = useCallback(
    (practiceId) => {
      return practiceCompletionStatus[practiceId] || false;
    },
    [practiceCompletionStatus]
  );

  const areAllQuestionsSolved = useCallback(
    (practice) => {
      if (!practice || !practice.questions) return false;
      return practice.questions.every(
        (question) => getQuestionStatus(question.id) === "solved"
      );
    },
    [getQuestionStatus]
  );

  // Auto-mark practice as complete when all questions are solved
  useEffect(() => {
    const autoCompletePractice = async () => {
      if (
        selectedPractice &&
        areAllQuestionsSolved(selectedPractice) &&
        !isPracticeCompleted(selectedPractice.id)
      ) {
        try {
          console.log(
            "🎯 All questions solved in practice! Marking as complete...",
            {
              practiceId: selectedPractice.id,
              goalName,
              courseName,
              subtopicId: finalSubtopicId,
            }
          );

          // Method 1: Mark coding practice as complete via coding practice service
          await CodingPracticeService.completePractice(
            selectedPractice.id,
            goalName,
            courseName
          );

          // Method 2: ALSO mark the subtopic as complete in the main progress system
          const result = await markSubtopicComplete(
            finalSubtopicId,
            goalName,
            courseName
          );

          if (result.success) {
            console.log(
              "✅ Coding practice subtopic marked as complete in main progress system"
            );
          }

          await refreshProgress();

          // Update local completion status
          setPracticeCompletionStatus((prev) => ({
            ...prev,
            [selectedPractice.id]: true,
          }));

          console.log("✅ Practice marked as completed in both systems!");
        } catch (error) {
          console.error("❌ Failed to mark practice complete:", error);

          // Fallback: Try to mark just the subtopic
          try {
            await markSubtopicComplete(finalSubtopicId, goalName, courseName);
            await refreshProgress();
          } catch (fallbackError) {
            console.error("❌ Fallback also failed:", fallbackError);
          }
        }
      }
    };

    autoCompletePractice();
  }, [
    selectedPractice,
    areAllQuestionsSolved,
    isPracticeCompleted,
    markSubtopicComplete,
    refreshProgress,
    finalSubtopicId,
    goalName,
    courseName,
  ]);

  // Check if this coding practice subtopic is already completed in main system
  const isSubtopicCompleted = completedContent.includes(finalSubtopicId);

  const handleQuestionSelect = (question) => {
    // Double-check accessibility before allowing navigation
    if (question.accessibleTo && !question.accessibleTo.includes(studentType)) {
      alert("You don't have access to this question.");
      return;
    }

    navigate(`/practice/${selectedPractice.id}/${question.id}`, {
      state: {
        subtopicId: finalSubtopicId,
        goalName,
        courseName,
        topicId: finalTopicId,
      },
    });
  };

  // Show message if no accessible questions
  if (!loading && selectedPractice && filteredQuestions.length === 0) {
    return (
      <div className="coding-practice-container-cod">
        <div className="coding-header-cod">
          <div className="header-left-cod">
            <h3>{selectedPractice.title}</h3>
            <p className="practice-description-cod">
              {selectedPractice.description}
            </p>
          </div>
        </div>
        <div className="coding-practice-content-cod">
          <div
            className="no-questions-message"
            style={{ textAlign: "center", padding: "50px" }}
          >
            <h4>No Accessible Questions</h4>
            <p>
              You don't have access to any questions in this practice based on
              your student type: {studentType}
            </p>
            <p>
              Please contact your administrator for access to more questions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!selectedPractice) {
    return (
      <div className="cod-loader">
        <h3>Practice not found</h3>
      </div>
    );
  }

  const practiceCompleted = isPracticeCompleted(selectedPractice.id);
  const allQuestionsSolved = areAllQuestionsSolved(selectedPractice);
  const solvedCount = filteredQuestions.filter(
    (q) => getQuestionStatus(q.id) === "solved"
  ).length;

  return (
    <div className="coding-practice-container-cod">
      {/* Header */}
      <div className="coding-header-cod">
        <div className="header-left-cod">
          <h3>{selectedPractice.title}</h3>

          <div className="practice-stats-cod">
            <p className="practice-description-cod">
              {selectedPractice.description}
            </p>
            <div className="practice-cod-right-header">
              <span className="total-questions-cod">
                {filteredQuestions.length} accessible questions
                {filteredQuestions.length <
                  (codingPracticesData.python.find(
                    (p) => p.id === "practice-python-1"
                  )?.questions.length || 0) && (
                  <span
                    className="filtered-badge"
                    style={{
                      marginLeft: "10px",
                      fontSize: "12px",
                      color: "#666",
                    }}
                  >
                    (filtered for {studentType})
                  </span>
                )}
              </span>
              <span className="solved-questions-cod">{solvedCount} solved</span>
            </div>
          </div>
        </div>
      </div>

      <div className="coding-practice-content-cod">
        {/* Questions List View */}
        <div className="questions-list-view-cod">
          <div className="questions-table-container-cod">
            <div className="questions-table-cod">
              <table>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Question</th>
                    <th>Difficulty</th>
                    <th>Score</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuestions.map((question) => {
                    const status = getQuestionStatus(question.id);
                    const score = getQuestionScore(question.id);
                    const attempts = getQuestionAttempts(question.id);
                    const lastAttempt =
                      attempts.length > 0
                        ? attempts[attempts.length - 1]
                        : null;

                    return (
                      <tr
                        key={question.id}
                        className={`question-row-cod ${
                          status === "solved"
                            ? "solved-cod"
                            : status === "attempted"
                              ? "attempted-cod"
                              : ""
                        }`}
                        onClick={() => handleQuestionSelect(question)}
                      >
                        <td className="status-cell-cod">
                          <span className={`status-indicator-cod ${status}`}>
                            {status === "solved"
                              ? "✓"
                              : status === "attempted"
                                ? "●"
                                : "○"}
                          </span>
                        </td>
                        <td className="question-title-cell-cod">
                          <div className="question-title-main-cod">
                            {question.title}
                            {status === "solved" && (
                              <span className="solved-indicator-cod">
                                Solved
                              </span>
                            )}
                          </div>
                          <div className="question-description-cod">
                            {question.description.slice(0, 45)}...
                          </div>
                        </td>
                        <td className="difficulty-cell-cod">
                          <span
                            className={`difficulty-badge-cod ${question.difficulty.toLowerCase()}`}
                          >
                            {question.difficulty}
                          </span>
                        </td>
                        <td className="score-cell-cod">
                          {status === "solved"
                            ? `${score}/${question.score}`
                            : `0/${question.score}`}{" "}
                          pts
                        </td>
                        <td className="progress-cell-cod">
                          {lastAttempt ? (
                            <div className="progress-info-cod">
                              <span
                                className={`attempt-status-cod ${
                                  lastAttempt.passed
                                    ? "passed-cod"
                                    : "failed-cod"
                                }`}
                              >
                                {lastAttempt.passed ? "Passed" : "Failed"}
                              </span>
                              <div className="progress-bar-cod">
                                <div
                                  className={`progress-fill-cod ${
                                    lastAttempt.passed
                                      ? "passed-fill-cod"
                                      : "failed-fill-cod"
                                  }`}
                                  style={{
                                    width: lastAttempt.passed ? "100%" : "50%",
                                  }}
                                ></div>
                              </div>
                            </div>
                          ) : (
                            <span className="no-attempts-cod">
                              Not attempted
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Practice Completion Status */}
          <div className="practice-completion-status-cod">
            <div className="completion-header-cod">
              <h4>Practice Progress</h4>
            </div>
            <div className="progress-summary-cod">
              <div className="progress-stats-cod">
                <div className="progress-stat-cod">
                  <span className="stat-label-cod">Questions Solved:</span>
                  <span className="stat-value-cod">
                    {solvedCount} / {filteredQuestions.length}
                  </span>
                </div>
                <div className="progress-stat-cod">
                  <span className="stat-label-cod">Total Score:</span>
                  <span className="stat-value-cod">
                    {filteredQuestions.reduce(
                      (total, q) => total + (getQuestionScore(q.id) || 0),
                      0
                    )}{" "}
                    /{" "}
                    {filteredQuestions.reduce((total, q) => total + q.score, 0)}{" "}
                    pts
                  </span>
                </div>
              </div>
              <div className="overall-progress-bar-cod">
                <div
                  className="overall-progress-fill-cod"
                  style={{
                    width: `${
                      filteredQuestions.length > 0
                        ? (solvedCount / filteredQuestions.length) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Assignment_8;
