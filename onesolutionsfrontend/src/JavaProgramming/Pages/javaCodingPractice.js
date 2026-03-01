import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const JavaCodingPractice = ({ practice: initialPractice, isSingleProblem, ...props }) => {
  const { practiceId } = useParams();
  const navigate = useNavigate();
  const {
    getJavaCodingPractice,
    getJavaContentByUuid,
    markJavaContentComplete,
    completedContent,
  } = useAuth();

  const [practice, setPractice] = useState(initialPractice || null);
  const [loading, setLoading] = useState(!initialPractice);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState("");
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (!practice && practiceId) {
      const load = async () => {
        try {
          setLoading(true);
          const res = await getJavaCodingPractice(practiceId);
          if (res?.success) setPractice(res.data);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      };
      load();
    }
  }, [practiceId, practice, getJavaCodingPractice]);

  const runCode = async () => {
    if (!selectedProblem) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/student/java/coding/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ contentId: selectedProblem.id, code }),
      });
      const data = await res.json();
      if (data.success) setResults(data.results);
    } catch (e) {
      console.error(e);
    }
  };

  const submitCode = async () => {
    if (!selectedProblem) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/student/java/coding/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ contentId: selectedProblem.id, code }),
      });
      const data = await res.json();
      if (data.success) {
        setResults(data.results);
        if (data.allPassed) {
          await markJavaContentComplete(selectedProblem.id, props.goalId);
          alert("All tests passed! Progress saved.");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="spinner"></div>;
  if (!practice) return <div>Practice not found</div>;

  // If it's a single problem (contentUuid route) we directly show the problem
  if (isSingleProblem && props.preLoadedContent) {
    const problem = props.preLoadedContent;
    return (
      <div className="coding-practice-container">
        <h2>{problem.coding_title}</h2>
        <p>{problem.coding_description}</p>
        <h4>Sample Test Cases</h4>
        <pre>{JSON.stringify(problem.sample_test_cases, null, 2)}</pre>
        <textarea rows={10} cols={80} value={code} onChange={(e) => setCode(e.target.value)} placeholder="Write your code here..." />
        <div>
          <button onClick={runCode}>Run</button>
          <button onClick={submitCode}>Submit</button>
        </div>
        {results && (
          <div>
            <h4>Results</h4>
            <pre>{JSON.stringify(results, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }

  // Otherwise show list of problems in the practice
  return (
    <div className="coding-practice-container">
      <h2>{practice.practice?.title}</h2>
      <p>{practice.practice?.description}</p>
      <h3>Problems</h3>
      <ul>
        {practice.problems?.map((prob) => (
          <li key={prob.id} onClick={() => setSelectedProblem(prob)} style={{ cursor: "pointer", fontWeight: selectedProblem?.id === prob.id ? "bold" : "normal" }}>
            {prob.coding_title} {prob.is_completed ? "✓" : ""}
          </li>
        ))}
      </ul>
      {selectedProblem && (
        <div>
          <h4>{selectedProblem.coding_title}</h4>
          <p>{selectedProblem.coding_description}</p>
          <textarea rows={10} cols={80} value={code} onChange={(e) => setCode(e.target.value)} />
          <div>
            <button onClick={runCode}>Run</button>
            <button onClick={submitCode}>Submit</button>
          </div>
          {results && (
            <div>
              <h5>Results</h5>
              <pre>{JSON.stringify(results, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JavaCodingPractice;