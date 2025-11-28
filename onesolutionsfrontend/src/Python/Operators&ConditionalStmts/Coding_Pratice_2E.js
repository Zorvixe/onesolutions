"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../CodingPracticeCss/CodingPractice.css";
import { codingPracticesData } from "../../codingPracticesData/codingPracticesData";
import CodingPracticeService from "../../services/codingPracticeService";
import { useAuth } from "../../context/AuthContext";

const Coding_Pratice_2E = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Use Auth context for progress tracking
  const {
    codingPracticeProgress,
    loadProgressSummary,
    markSubtopicComplete,
    completedContent,
    loadProgressSummary: refreshProgress,
  } = useAuth();

  const [selectedPractice, setSelectedPractice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [practiceCompletionStatus, setPracticeCompletionStatus] = useState({});

  // Get goalName and courseName from navigation state with fallbacks
  const {
    goalName: stateGoalName,
    courseName: stateCourseName,
    subtopicId: codingPracticeSubtopicId,
  } = location.state || {};

  // Extract goal and course names from practice data
  const goalName = stateGoalName;
  const courseName = stateCourseName;

  // Use provided subtopicId or fallback
  const finalSubtopicId = codingPracticeSubtopicId;

  // Load "Coding Practice - 1" from codingPracticesData
  useEffect(() => {
    const practice1 = codingPracticesData.python.find(
      (p) => p.id === "Codingpractice-python-2E"
    );
    if (practice1) {
      setSelectedPractice(practice1);
      console.log("📝 Loaded practice with details:", {
        practiceId: practice1.id,
        goalName,
        courseName,
        subtopicId: finalSubtopicId,
      });
    }
    setLoading(false);
  }, [goalName, courseName, finalSubtopicId]);

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

  // ✅ FIXED: Auto-mark practice as complete when all questions are solved
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
          // This is crucial for goal and course progress tracking
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
    navigate(`/practice/${selectedPractice.id}/${question.id}`, {
      state: {
        subtopicId: finalSubtopicId,
        goalName,
        courseName,
      },
    });
  };

  if (loading) {
    return (
      <div className="loader-container-cod">
        <div className="cod-loader"></div>
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
  const solvedCount = selectedPractice.questions.filter(
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
                {selectedPractice.questions.length} questions
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
                  {selectedPractice.questions.map((question) => {
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
                            {question.description}
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
                    {solvedCount} / {selectedPractice.questions.length}
                  </span>
                </div>
                <div className="progress-stat-cod">
                  <span className="stat-label-cod">Total Score:</span>
                  <span className="stat-value-cod">
                    {selectedPractice.questions.reduce(
                      (total, q) => total + (getQuestionScore(q.id) || 0),
                      0
                    )}{" "}
                    /{" "}
                    {selectedPractice.questions.reduce(
                      (total, q) => total + q.score,
                      0
                    )}{" "}
                    pts
                  </span>
                </div>
              </div>
              <div className="overall-progress-bar-cod">
                <div
                  className="overall-progress-fill-cod"
                  style={{
                    width: `${
                      (solvedCount / selectedPractice.questions.length) * 100
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
export default Coding_Pratice_2E;
