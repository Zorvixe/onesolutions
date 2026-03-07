import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const JavaCodingPractice = ({ practice: initialPractice, ...props }) => {
  const { practiceId } = useParams();
  const navigate = useNavigate();
  const {
    getJavaCodingPractice,
    completedContent,
  } = useAuth();

  const [practice, setPractice] = useState(initialPractice || null);
  const [loading, setLoading] = useState(!initialPractice);
  const [error, setError] = useState(null);
  const [localProgress, setLocalProgress] = useState({});

  useEffect(() => {
    if (practiceId && !practice) {
      const loadPractice = async () => {
        setLoading(true);
        try {
          const res = await getJavaCodingPractice(practiceId);
          if (res?.success) {
            setPractice(res.data);
          } else {
            setError(res?.message || "Failed to load practice");
          }
        } catch (e) {
          console.error(e);
          setError(e.message);
        } finally {
          setLoading(false);
        }
      };
      loadPractice();
    }
  }, [practiceId, practice, getJavaCodingPractice]);

  const getProblemStatus = useCallback(
    (problemId) => {
      if (completedContent.includes(problemId)) return "solved";
      return localProgress[problemId]?.status || "unsolved";
    },
    [completedContent, localProgress]
  );

  const getProblemScore = useCallback(
    (problemId) => {
      if (completedContent.includes(problemId)) {
        return localProgress[problemId]?.score || 100;
      }
      return localProgress[problemId]?.score || 0;
    },
    [completedContent, localProgress]
  );

  const getProblemAttempts = useCallback(
    (problemId) => {
      return localProgress[problemId]?.attempts || [];
    },
    [localProgress]
  );

  const handleProblemClick = (problem) => {
    // Navigate to the dedicated problem page, passing the context for sidebar
    navigate(`/java/content/${problem.content_uuid}`, {
      state: {
        goalId: practice.practice?.goalId,
        goalName: practice.practice?.goalName,
        moduleId: practice.practice?.moduleId,
        moduleName: practice.practice?.moduleName,
        topicId: practice.practice?.topicId,
        topicName: practice.practice?.topicName,
        subtopicId: practice.practice?.subtopicId,
        subtopicName: practice.practice?.subtopicName,
        fromCourse: true,
        isJava: true,
      },
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading practice...</p>
      </div>
    );
  }
  if (error) return <div className="error">{error}</div>;
  if (!practice) return <div className="not-found">Practice not found</div>;

  const problems = practice.problems || [];
  const solvedCount = problems.filter(p => getProblemStatus(p.id) === "solved").length;

  return (
    <div className="coding-practice-container-cod">
      <div className="coding-header-cod">
        <div className="header-left-cod">
          <h3>{practice.practice?.title || "Java Coding Practice"}</h3>
          <div
            className="practice-description-cod"
            dangerouslySetInnerHTML={{ __html: practice.practice?.description }}
          ></div>
        </div>
        <div className="header-right-cod" style={{ marginTop: "20px" }}>
          <span className="total-questions-cod">{problems.length} problems</span>
          <span className="solved-questions-cod">{solvedCount} solved</span>
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
                    <th>Problem</th>
                    <th>Difficulty</th>
                    <th>Score</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {problems.map((problem) => {
                    const status = getProblemStatus(problem.id);
                    const score = getProblemScore(problem.id);
                    const attempts = getProblemAttempts(problem.id);
                    const lastAttempt = attempts.length > 0 ? attempts[attempts.length - 1] : null;

                    return (
                      <tr
                        key={problem.id}
                        className={`question-row-cod ${status === "solved" ? "solved-cod" : status === "attempted" ? "attempted-cod" : ""}`}
                        onClick={() => handleProblemClick(problem)}
                      >
                        <td className="status-cell-cod">
                          <span className={`status-indicator-cod ${status}`}>
                            {status === "solved" ? "✓" : status === "attempted" ? "●" : "○"}
                          </span>
                        </td>
                        <td className="question-title-cell-cod">
                          <div className="question-title-main-cod">
                            {problem.coding_title || problem.title}
                            {status === "solved" && <span className="solved-indicator-cod">Solved</span>}
                          </div>
                          <div
                            className="question-description-cod"
                            dangerouslySetInnerHTML={{ __html: problem.coding_description?.slice(0, 60) }}
                          ></div>
                        </td>
                        <td className="difficulty-cell-cod">
                          <span className={`difficulty-badge-cod ${problem.difficulty?.toLowerCase() || "easy"}`}>
                            {problem.difficulty || "Easy"}
                          </span>
                        </td>
                        <td className="score-cell-cod">
                          {status === "solved" ? `${score}/${problem.score || 100}` : `0/${problem.score || 100}`} pts
                        </td>
                        <td className="progress-cell-cod">
                          {lastAttempt ? (
                            <div className="progress-info-cod">
                              <span className={`attempt-status-cod ${lastAttempt.passed ? "passed-cod" : "failed-cod"}`}>
                                {lastAttempt.passed ? "Passed" : "Failed"}
                              </span>
                              <div className="progress-bar-cod">
                                <div
                                  className={`progress-fill-cod ${lastAttempt.passed ? "passed-fill-cod" : "failed-fill-cod"}`}
                                  style={{ width: lastAttempt.passed ? "100%" : "50%" }}
                                ></div>
                              </div>
                            </div>
                          ) : (
                            <span className="no-attempts-cod">Not attempted</span>
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
                  <span className="stat-label-cod">Problems Solved:</span>
                  <span className="stat-value-cod">{solvedCount} / {problems.length}</span>
                </div>
                <div className="progress-stat-cod">
                  <span className="stat-label-cod">Total Score:</span>
                  <span className="stat-value-cod">
                    {problems.reduce((total, p) => total + getProblemScore(p.id), 0)} /{" "}
                    {problems.reduce((total, p) => total + (p.score || 100), 0)} pts
                  </span>
                </div>
              </div>
              <div className="overall-progress-bar-cod">
                <div
                  className="overall-progress-fill-cod"
                  style={{ width: problems.length > 0 ? (solvedCount / problems.length) * 100 : 0 }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavaCodingPractice;