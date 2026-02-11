"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { javascriptCodingPracticesData } from "../../codingPracticesData/javascriptCodingPracticesData";
import CodingPracticeService from "../../services/codingPracticeService";
import { useAuth } from "../../context/AuthContext";

const JS_Coding_Test_2 = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    codingPracticeProgress,
    loadProgressSummary,
    markSubtopicComplete,
    loadProgressSummary: refreshProgress,
  } = useAuth();

  const [selectedPractice, setSelectedPractice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [practiceCompletionStatus, setPracticeCompletionStatus] = useState({});
  const [progressData, setProgressData] = useState({});

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

  // Load practice
  useEffect(() => {
    const practice42 = javascriptCodingPracticesData.javascript.find(
      (p) => p.id === "javascript-coding-test-2"
    );
    if (practice42) {
      setSelectedPractice(practice42);
      console.log("✅ Loaded practice:", practice42.id);
    }
    setLoading(false);
  }, [goalName, courseName, finalSubtopicId]);

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
    if (question.type === "web") {
      navigate(`/web-practice/${selectedPractice.id}/${question.id}`, {
        state: {
          subtopicId: finalSubtopicId,
          goalName,
          courseName,
        },
      });
    } else {
      navigate(`/practice/${selectedPractice.id}/${question.id}`, {
        state: {
          subtopicId: finalSubtopicId,
          goalName,
          courseName,
        },
      });
    }
  };

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

  const solvedCount = selectedPractice.questions.filter(
    (q) => getQuestionStatus(q.id) === "solved"
  ).length;

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
                {selectedPractice.questions.length} questions
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
export default JS_Coding_Test_2;
