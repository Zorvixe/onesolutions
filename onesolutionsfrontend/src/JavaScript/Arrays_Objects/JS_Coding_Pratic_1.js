"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { javascriptCodingPracticesData } from "../../codingPracticesData/javascriptCodingPracticesData";
import CodingPracticeService from "../../services/codingPracticeService";
import { useAuth } from "../../context/AuthContext";

const JS_Coding_Pratic_1 = () => {
  const { topicId, subtopicId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    codingPracticeProgress,
    loadProgressSummary,
    markSubtopicComplete,
    loadProgressSummary: refreshProgress,
    user, // Get user from auth context
  } = useAuth();

  const [selectedPractice, setSelectedPractice] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [practiceCompletionStatus, setPracticeCompletionStatus] = useState({});
  const [progressData, setProgressData] = useState({});

  // Get student type from user context - default to "zorvixe_core" if not specified
  const studentType = user?.studentType || "zorvixe_core";

  const {
    goalName: stateGoalName,
    courseName: stateCourseName,
    subtopicId: codingPracticeSubtopicId,
  } = location.state || {};

  const goalName = stateGoalName;
  const courseName = stateCourseName;
  const finalSubtopicId = codingPracticeSubtopicId;

  // Load progress data
  const loadProgressData = useCallback(async () => {
    try {
      console.log("🔄 Loading progress data...");

      // Load overall progress summary
      await loadProgressSummary();

      // Load specific practice progress
      const response = await CodingPracticeService.getAllProgress();
      if (response.success) {
        const progressMap = {};
        response.data.progress.forEach((prog) => {
          progressMap[prog.question_id] = prog;
        });
        setProgressData(progressMap);
        console.log(
          "✅ Progress data loaded:",
          Object.keys(progressMap).length,
          "items"
        );
      }

      // Load completion status for all javascript practices
      const completionStatus = {};
      for (const practice of javascriptCodingPracticesData.javascript) {
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
    } catch (error) {
      console.error("❌ Failed to load progress data:", error);
    }
  }, [loadProgressSummary]);

  // Load practice and filter questions based on student type
  useEffect(() => {
    const practice5 = javascriptCodingPracticesData.javascript.find(
      (p) => p.id === "js-coding-practice-1"
    );
    
    if (practice5) {
      // Filter questions based on student type
      const accessibleQuestions = practice5.questions.filter(
        (question) => 
          !question.accessibleTo || 
          question.accessibleTo.includes(studentType)
      );
      
      // Create a new practice object with filtered questions
      const filteredPractice = {
        ...practice5,
        questions: accessibleQuestions
      };
      
      setSelectedPractice(filteredPractice);
      setFilteredQuestions(accessibleQuestions);
      
      console.log("✅ Loaded practice with details:", {
        practiceId: practice5.id,
        goalName,
        courseName,
        subtopicId: finalSubtopicId,
        studentType,
        totalQuestions: practice5.questions.length,
        accessibleQuestions: accessibleQuestions.length
      });
    }
    setLoading(false);
  }, [goalName, courseName, finalSubtopicId, studentType]);

  // Load progress on mount and when practice changes
  useEffect(() => {
    if (selectedPractice) {
      loadProgressData();
    }
  }, [selectedPractice, loadProgressData]);

  const getQuestionStatus = useCallback(
    (questionId) => {
      return (
        progressData[questionId]?.status ||
        codingPracticeProgress[questionId]?.status ||
        "unsolved"
      );
    },
    [progressData, codingPracticeProgress]
  );

  const getQuestionScore = useCallback(
    (questionId) => {
      return (
        progressData[questionId]?.score ||
        codingPracticeProgress[questionId]?.score ||
        0
      );
    },
    [progressData, codingPracticeProgress]
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

  // Auto-complete practice when all questions are solved
  useEffect(() => {
    const autoCompletePractice = async () => {
      if (
        selectedPractice &&
        areAllQuestionsSolved(selectedPractice) &&
        !isPracticeCompleted(selectedPractice.id)
      ) {
        try {
          console.log("🎉 All questions solved, marking practice complete");
          await CodingPracticeService.completePractice(
            selectedPractice.id,
            goalName,
            courseName
          );

          if (finalSubtopicId) {
            await markSubtopicComplete(finalSubtopicId, goalName, courseName);
          }

          await refreshProgress();

          // Reload progress data
          await loadProgressData();

          setPracticeCompletionStatus((prev) => ({
            ...prev,
            [selectedPractice.id]: true,
          }));

          console.log("✅ Practice marked complete");
        } catch (error) {
          console.error("❌ Failed to mark practice complete:", error);
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
    loadProgressData,
    finalSubtopicId,
    goalName,
    courseName,
  ]);

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
      },
    });
  };

  // Show message if no accessible questions
  if (!loading && selectedPractice && filteredQuestions.length === 0) {
    const originalPractice = javascriptCodingPracticesData.javascript.find(
      (p) => p.id === "js-coding-practice-1"
    );
    
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
          <div className="no-questions-message" style={{ textAlign: 'center', padding: '50px' }}>
            <h4>No Accessible Questions</h4>
            <p>You don't have access to any questions in this practice based on your student type: <strong>{studentType}</strong></p>
            <p>This practice has {originalPractice?.questions.length || 0} total questions, but none are accessible to {studentType}.</p>
            <p>Please contact your administrator for access to more questions.</p>
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

  const solvedCount = filteredQuestions.filter(
    (q) => getQuestionStatus(q.id) === "solved"
  ).length;

  const originalPractice = javascriptCodingPracticesData.javascript.find(
    (p) => p.id === "js-coding-practice-1"
  );
  const totalOriginalQuestions = originalPractice?.questions.length || 0;

  return (
    <div className="coding-practice-container-cod">
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
                {filteredQuestions.length < totalOriginalQuestions && (
                  <span className="filtered-badge" style={{ marginLeft: '10px', fontSize: '12px', color: '#666', backgroundColor: '#f0f0f0', padding: '2px 8px', borderRadius: '12px' }}>
                    filtered for {studentType}
                  </span>
                )}
              </span>
              <span className="solved-questions-cod">{solvedCount} solved</span>
            </div>
          </div>
        </div>
      </div>

      <div className="coding-practice-content-cod">
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
                            {status === "solved" ? "✓" : "○"}
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
                    {filteredQuestions.reduce(
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

export default JS_Coding_Pratic_1;