import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const JavaCodingPractice = ({ practice: initialPractice, isSingleProblem, ...props }) => {
  const { contentUuid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    getJavaCodingPractice,
    markJavaContentComplete,
    codingPracticeProgress = {},
    loadProgressSummary,
    user,
  } = useAuth();

  const [practice, setPractice] = useState(initialPractice || null);
  const [loading, setLoading] = useState(!initialPractice);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // Load practice data if not provided
  useEffect(() => {
    if (contentUuid && !practice) {
      const loadPractice = async () => {
        setLoading(true);
        try {
          const res = await getJavaCodingPractice(contentUuid);
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
  }, [contentUuid, practice, getJavaCodingPractice]);

  // Refresh progress on mount and when location changes (back navigation)
  useEffect(() => {
    loadProgressSummary();
  }, [location.key, loadProgressSummary]);

  // Problem status helpers – using codingPracticeProgress from AuthContext
  const getProblemStatus = useCallback(
    (problemId) => {
      return codingPracticeProgress[problemId]?.status || "unsolved";
    },
    [codingPracticeProgress]
  );

  const getProblemScore = useCallback(
    (problemId) => {
      return codingPracticeProgress[problemId]?.score || 0;
    },
    [codingPracticeProgress]
  );

  // Run code (only used in single problem mode)
  const runCode = async () => {
    if (!selectedProblem) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/student/java/coding/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ contentId: selectedProblem.id, code }),
      });
      const data = await res.json();
      if (data.success) setResults(data.results);
    } catch (e) {
      console.error(e);
    }
  };

  // Submit code and update progress (only used in single problem mode)
  const submitCode = async () => {
    if (!selectedProblem) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/student/java/coding/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ contentId: selectedProblem.id, code }),
      });
      const data = await res.json();
      if (data.success) {
        setResults(data.results);
        if (data.allPassed) {
          await markJavaContentComplete(selectedProblem.id, props.goalId);
          await loadProgressSummary(); // Refresh context after marking complete
          alert("All tests passed! Progress saved.");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Navigate to JavaPractice with the correct practice ID and question ID
  const handleProblemSelect = (problem) => {
    const practiceUuid = practice?.practice?.practice_uuid;
    if (!practiceUuid) {
      console.error("Practice UUID is missing", practice);
      return;
    }

    const navigationState = {
      subtopicId: props.subtopicId,
      goalName: props.goalName,
      courseName: props.courseName,
      topicId: props.topicId,
    };

    navigate(`/java-practice/${practiceUuid}/${problem.content_uuid}`, {
      state: navigationState,
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

  // Single problem view (accessed via /java/coding/:contentUuid)
  if (isSingleProblem && props.preLoadedContent) {
    const problem = props.preLoadedContent;
    return (
      <div className="coding-practice-container-cod">
        <div className="coding-header-cod">
          <h3>{problem.coding_title}</h3>
          <p>{problem.coding_description}</p>
        </div>
        <div className="problem-detail-cod">
          <h4>Sample Test Cases</h4>
          <pre>{JSON.stringify(problem.sample_test_cases, null, 2)}</pre>
          <textarea
            rows={12}
            cols={80}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your Java code here..."
            className="code-editor-cod"
          />
          <div className="action-buttons-cod">
            <button onClick={runCode} className="run-btn-cod">Run</button>
            <button onClick={submitCode} className="submit-btn-cod">Submit</button>
          </div>
          {results && (
            <div className="results-cod">
              <h4>Results</h4>
              <pre>{JSON.stringify(results, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Practice list view (multiple problems)
  const problems = practice.problems || [];
  const solvedCount = problems.filter(p => getProblemStatus(p.id) === "solved").length;

  return (
    <div className="coding-practice-container-cod">
      {/* Header */}
      <div className="coding-header-cod">
        <div className="header-left-cod">
          <h3>{practice.practice?.title || "Java Coding Practice"}</h3>
          <div
            className="practice-description-cod"
            dangerouslySetInnerHTML={{
              __html: practice.practice?.description,
            }}
          ></div>
        </div>
        <div className="header-right-cod" style={{ marginTop: "20px" }}>
          <span className="total-questions-cod">{problems.length} problems</span>
          <span className="solved-questions-cod">{solvedCount} solved</span>
        </div>
      </div>

      {/* Problems Table */}
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

                    return (
                      <tr
                        key={problem.id}
                        className={`question-row-cod ${
                          status === "solved"
                            ? "solved-cod"
                            : status === "attempted"
                            ? "attempted-cod"
                            : ""
                        }`}
                        onClick={() => handleProblemSelect(problem)}
                      >
                        <td className="status-cell-cod">
                          <span className={`status-indicator-cod ${status}`}>
                            {status === "solved" ? "✓" : status === "attempted" ? "●" : "○"}
                          </span>
                        </td>
                        <td className="question-title-cell-cod">
                          <div className="question-title-main-cod">
                            {problem.coding_title || problem.title}
                            {status === "solved" && (
                              <span className="solved-indicator-cod">Solved</span>
                            )}
                          </div>
                          <div
                            className="question-description-cod"
                            dangerouslySetInnerHTML={{
                              __html: problem.coding_description?.slice(0, 60),
                            }}
                          ></div>
                        </td>
                        <td className="difficulty-cell-cod">
                          <span className={`difficulty-badge-cod ${problem.difficulty?.toLowerCase() || "easy"}`}>
                            {problem.difficulty || "Easy"}
                          </span>
                        </td>
                        <td className="score-cell-cod">
                          {status === "solved"
                            ? `${score}/${problem.score || 100}`
                            : `0/${problem.score || 100}`} pts
                        </td>
                        <td className="progress-cell-cod">
                          {status === "solved" ? (
                            <div className="progress-info-cod">
                              <span className="attempt-status-cod passed-cod">Solved</span>
                              <div className="progress-bar-cod">
                                <div className="progress-fill-cod passed-fill-cod" style={{ width: "100%" }}></div>
                              </div>
                            </div>
                          ) : status === "attempted" ? (
                            <div className="progress-info-cod">
                              <span className="attempt-status-cod failed-cod">Attempted</span>
                              <div className="progress-bar-cod">
                                <div className="progress-fill-cod failed-fill-cod" style={{ width: "50%" }}></div>
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

        </div>
      </div>
    </div>
  );
};

export default JavaCodingPractice;