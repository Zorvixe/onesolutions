import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const JavaPractice = ({
  contentId,
  contentUuid: propContentUuid,
  goalId,
  moduleId,
  topicId,
  subtopicId,
  onComplete,
  preLoadedContent,
}) => {
  const { contentUuid: paramContentUuid } = useParams();
  const navigate = useNavigate();
  const { getJavaContentByUuid } = useAuth();
  const finalContentUuid = propContentUuid || paramContentUuid;

  const [problem, setProblem] = useState(preLoadedContent || null);
  const [loading, setLoading] = useState(!preLoadedContent);
  const [code, setCode] = useState("");
  const [results, setResults] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (preLoadedContent) {
      setProblem(preLoadedContent);
      setLoading(false);
      return;
    }
    if (finalContentUuid) {
      const load = async () => {
        try {
          setLoading(true);
          const res = await getJavaContentByUuid(finalContentUuid);
          if (res?.success) setProblem(res.data);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      };
      load();
    }
  }, [finalContentUuid, preLoadedContent, getJavaContentByUuid]);

  const runCode = async () => {
    if (!problem) return;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/student/java/coding/run`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ contentId: problem.id, code }),
        }
      );
      const data = await res.json();
      if (data.success) setResults(data.results);
    } catch (e) {
      console.error(e);
    }
  };

  const submitCode = async () => {
    if (!problem) return;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/student/java/coding/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ contentId: problem.id, code }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setResults(data.results);
        if (data.allPassed) {
          setIsCompleted(true);
          if (onComplete) onComplete();
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="spinner" />;
  if (!problem) return <div>Problem not found</div>;

  return (
    <div className="coding-practice-container-cod">
      <div className="coding-header-cod">
        <h3>{problem.coding_title}</h3>
        <div
          className="problem-description"
          dangerouslySetInnerHTML={{ __html: problem.coding_description }}
        />
      </div>

      <div className="problem-detail-cod">
        <h4>Sample Test Cases</h4>
        {problem.sample_test_cases?.map((tc, idx) => (
          <pre key={idx}>
            Input: {tc.input} → Expected: {tc.expected_output}
          </pre>
        ))}

        <textarea
          rows={12}
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
            <h5>Results</h5>
            <pre>{JSON.stringify(results, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default JavaPractice;