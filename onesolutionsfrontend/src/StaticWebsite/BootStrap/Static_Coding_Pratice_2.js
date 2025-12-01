"use client";

// Static_Coding_Practice_2.js - Same structure as Practice 1
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { codingPracticesData } from "../../codingPracticesData/codingPracticesData";
import CodingPracticeService from "../../services/codingPracticeService";
import { useAuth } from "../../context/AuthContext";

const Static_Coding_Practice_2 = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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

  const {
    goalName: stateGoalName,
    courseName: stateCourseName,
    subtopicId: codingPracticeSubtopicId,
  } = location.state || {};

  const goalName = stateGoalName;
  const courseName = stateCourseName;
  const finalSubtopicId = codingPracticeSubtopicId;

  useEffect(() => {
    const practice2 = codingPracticesData.static.find(
      (p) => p.id === "static-coding-practice-2"
    );
    if (practice2) {
      setSelectedPractice(practice2);
      console.log("[v0] Loaded practice:", practice2.id);
    }
    setLoading(false);
  }, [goalName, courseName, finalSubtopicId]);

  useEffect(() => {
    const loadProgressData = async () => {
      try {
        setLoading(true);
        await loadProgressSummary();

        if (selectedPractice) {
          const completionStatus = {};
          for (const practice of codingPracticesData.static) {
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

  useEffect(() => {
    const autoCompletePractice = async () => {
      if (
        selectedPractice &&
        areAllQuestionsSolved(selectedPractice) &&
        !isPracticeCompleted(selectedPractice.id)
      ) {
        try {
          console.log("[v0] All questions solved, marking practice complete");
          await CodingPracticeService.completePractice(
            selectedPractice.id,
            goalName,
            courseName
          );

          await markSubtopicComplete(finalSubtopicId, goalName, courseName);

          await refreshProgress();

          setPracticeCompletionStatus((prev) => ({
            ...prev,
            [selectedPractice.id]: true,
          }));

          console.log("[v0] Practice marked complete");
        } catch (error) {
          console.error("[v0] Failed to mark practice complete:", error);
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
                  </tr>
                </thead>
                <tbody>
                  {selectedPractice.questions.map((question) => {
                    const status = getQuestionStatus(question.id);
                    const score = getQuestionScore(question.id);

                    return (
                      <tr
                        key={question.id}
                        className={`question-row-cod ${
                          status === "solved" ? "solved-cod" : ""
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

export default Static_Coding_Practice_2;
