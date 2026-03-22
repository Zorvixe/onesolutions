import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { javaAPI } from "../../services/api"; // adjust path
import CodingPracticeService from "../../services/codingPracticeService";

const JavaPracticeList = () => {
  const [practices, setPractices] = useState([]);
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const [isPracticeCompleted, setIsPracticeCompleted] = useState(false);
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);
  const [progressLoading, setProgressLoading] = useState(false);
  const navigate = useNavigate();

  // Load user progress for all questions
  useEffect(() => {
    const loadProgress = async () => {
      try {
        setProgressLoading(true);
        const response = await CodingPracticeService.getAllProgress();
        if (response.success) {
          const progressMap = {};
          response.data.progress.forEach((prog) => {
            progressMap[prog.question_id] = {
              status: prog.status,
              code: prog.code,
              score: prog.score,
              attempts: prog.attempts || [],
              lastAttempt: prog.last_attempt,
            };
          });
          setUserProgress(progressMap);
        }
      } catch (error) {
        console.error("Failed to load progress:", error);
      } finally {
        setProgressLoading(false);
      }
    };

    loadProgress();
  }, []);

  // Fetch practices
  useEffect(() => {
    const fetchPractices = async () => {
      try {
        setLoading(true);
        const res = await javaAPI.getAllCodingPractices();
        if (res.data.success) {
          setPractices(res.data.data);
          // Auto-select first practice if available
          if (res.data.data.length > 0) {
            setSelectedPractice(res.data.data[0]);
          }
        } else {
          setError(res.data.message || "Failed to load practices");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPractices();
  }, []);

  // Check if selected practice is completed
  const checkPracticeCompletion = useCallback(async () => {
    if (!selectedPractice?.practice_uuid) return;
    try {
      const response = await CodingPracticeService.getCompletionStatus(selectedPractice.practice_uuid);
      if (response.success) {
        setIsPracticeCompleted(response.data.isCompleted);
      }
    } catch (error) {
      console.error("Failed to check practice completion:", error);
    }
  }, [selectedPractice]);

  useEffect(() => {
    checkPracticeCompletion();
  }, [selectedPractice, checkPracticeCompletion]);

  // Check if all problems in the selected practice are solved
  const areAllProblemsSolved = useMemo(() => {
    if (!selectedPractice?.problems) return false;

    return selectedPractice.problems.every(
      (problem) => userProgress[problem.id]?.status === "solved"
    );
  }, [selectedPractice, userProgress]);

  useEffect(() => {
  const markPracticeAsComplete = async () => {
    if (
      areAllProblemsSolved &&
      selectedPractice?.practice_uuid &&
      !selectedPractice.is_completed &&    // use the flag from the practice object
      !isMarkingComplete
    ) {
      try {
        setIsMarkingComplete(true);
        console.log("🎯 All problems solved! Marking practice as complete...");

        await javaAPI.completePractice(selectedPractice.practice_uuid);

        // Refresh the practice list to get updated completion status
        const res = await javaAPI.getAllCodingPractices();
        if (res.data.success) {
          setPractices(res.data.data);
          const updatedPractice = res.data.data.find(
            (p) => p.id === selectedPractice.id
          );
          if (updatedPractice) {
            setSelectedPractice(updatedPractice); // now includes is_completed = true
          }
        }

        console.log("✅ Practice marked as completed!");
      } catch (error) {
        console.error("❌ Failed to mark practice complete:", error);
      } finally {
        setIsMarkingComplete(false);
      }
    }
  };

  markPracticeAsComplete();
}, [areAllProblemsSolved, selectedPractice, isMarkingComplete]);
  const handlePracticeSelect = (practice) => {
    setSelectedPractice(practice);
  };

  const handleQuestionClick = (practiceUuid, contentUuid) => {
    // Navigate using content_uuid instead of questionId
    navigate(`/java-practice/${practiceUuid}/${contentUuid}`);
  };

  // Get status for a specific problem
  const getProblemStatus = (problemId) => {
    return userProgress[problemId]?.status || "unsolved";
  };

  // Get attempts for a specific problem
  const getProblemAttempts = (problemId) => {
    return userProgress[problemId]?.attempts || [];
  };

  // Get solved count for a practice
  const getSolvedCount = (practice) => {
    if (!practice.problems) return 0;
    return practice.problems.filter(
      (problem) => userProgress[problem.id]?.status === "solved"
    ).length;
  };

  if (loading || progressLoading) return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );

  if (error) return (
    <div className="error-message">Error: {error}</div>
  );

  return (
    <div className="practice-container-prac">
      <div className="practice-content-prac">
        {/* Left Sidebar - Practice List */}
        <div className="practice-sidebar-prac">
          <h3>Java Coding Practices</h3>
          <div className="language-selector-prac">
            <select value="java" disabled>
              <option value="java">Java</option>
            </select>
          </div>
          <div className="practice-list-prac">
            {practices.map((practice) => {
              const solvedCount = getSolvedCount(practice);
              const totalProblems = practice.problems?.length || 0;
              
              return (
                <div
                  key={practice.id}
                  className={`practice-item-prac ${selectedPractice?.id === practice.id ? "active-prac" : ""
                    }`}
                  onClick={() => handlePracticeSelect(practice)}
                >
                  <div className="practice-title-prac">{practice.title}</div>
                  <div
                    className="practice-description-prac"
                    dangerouslySetInnerHTML={{
                      __html: practice.description,
                    }}
                  ></div>
                  <div className="practice-stats-prac">
                    {solvedCount} / {totalProblems} solved
                    {practice.is_completed && (
                      <span className="all-solved-indicator"> • Completed!</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side - Problems List for Selected Practice */}
        <div className="main-content-coding-prac">
          {selectedPractice ? (
            <div className="questions-section-prac">
              <div className="questions-header-prac">
                <div className="questions-title-section">
                  <h3>Problems - {selectedPractice.title}</h3>
                </div>
                <div className="questions-stats-prac">
                  {selectedPractice.problems?.length || 0} problems
                  {areAllProblemsSolved && (
                    <span className="all-solved-indicator"> • All Solved!</span>
                  )}
                  {isMarkingComplete && (
                    <span className="completing-indicator"> • Marking as complete...</span>
                  )}
                </div>
              </div>
              <div className="questions-table-prac">
                <table>
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Problem</th>
                      <th>Test Cases</th>
                      <th>Difficulty</th>
                      <th>Score</th>
                      <th>Last Attempt</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPractice.problems && selectedPractice.problems.length > 0 ? (
                      selectedPractice.problems.map((problem, index) => {
                        const status = getProblemStatus(problem.id);
                        const attempts = getProblemAttempts(problem.id);
                        const lastAttempt = attempts.length > 0 ? attempts[attempts.length - 1] : null;

                        return (
                          <tr
                            key={problem.id || index}
                            className={`question-row-prac ${
                              status === "solved" ? "solved-prac" : 
                              status === "attempted" ? "attempted-prac" : ""
                            }`}
                            onClick={() => handleQuestionClick(selectedPractice.practice_uuid, problem.content_uuid)}
                          >
                            <td className="status-cell-prac">
                              <span className={`status-indicator-prac ${status}`}>
                                {status === "solved" ? "✓" : status === "attempted" ? "●" : "○"}
                              </span>
                            </td>
                            <td className="question-title-cell-prac">
                              <div className="question-title-main-prac">
                                {problem.title || `Problem ${index + 1}`}
                              </div>
                            </td>
                            <td className="difficulty-cell-prac">
                              <span className="difficulty-badge-prac">
                                {problem.test_case_count || 0}
                              </span>
                            </td>
                            <td className="difficulty-cell-prac">
                              <span className={`difficulty-badge-prac ${problem.difficulty?.toLowerCase() || 'medium'}`}>
                                {problem.difficulty || 'Medium'}
                              </span>
                            </td>
                            <td className="score-cell-prac">
                              {lastAttempt ? `${lastAttempt.score}/${problem.score || 10}` : `0/${problem.score || 10}`} pts
                            </td>
                            <td className="attempts-cell-prac">
                              {lastAttempt ? (
                                <div className="attempts-info-prac">
                                  <span className="attempts-count-prac">
                                    {lastAttempt.passed ? "Passed" : "Failed"}
                                  </span>
                                  <span className="attempts-date-prac">
                                    {new Date(lastAttempt.timestamp).toLocaleDateString()}
                                  </span>
                                </div>
                              ) : (
                                <span className="no-attempts-prac">
                                  Not attempted
                                </span>
                              )}
                            </td>
                            <td className="attempts-cell-prac">
                              <button
                                className="prac-next-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuestionClick(selectedPractice.practice_uuid, problem.content_uuid);
                                }}
                              >
                                Solve
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="7" className="no-data-prac">
                          No problems available for this practice
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="questions-section-prac">
              <div className="questions-header-prac">
                <div className="questions-title-section">
                  <h3>Select a Practice</h3>
                </div>
              </div>
              <div className="no-selection-prac">
                <p>Please select a Java practice from the left sidebar to view its problems.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JavaPracticeList;