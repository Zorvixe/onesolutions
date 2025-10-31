import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CodingPractice.css";
import { codingPracticesData } from "../../codingPracticesData/codingPracticesData";

const Coding_Practice_1 = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);

  // Load "Coding Practice - 1"
  useEffect(() => {
    const practice1 = codingPracticesData.python.find(
      (p) => p.title === "Coding Practice - 1"
    );
    if (practice1) {
      setSelectedPractice(practice1);
    }
  }, []);

  // Load question based on URL parameter
  useEffect(() => {
    if (selectedPractice && questionId) {
      const question = selectedPractice.questions.find(
        (q) => q.id === questionId
      );
      if (question) {
        setSelectedQuestion(question);
        setCode(question.defaultCode);
      }
    } else {
      setSelectedQuestion(null);
    }
    setOutput("");
    setTestResults([]);
  }, [selectedPractice, questionId]);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleQuestionSelect = (question) => {
    navigate(`/practice-python-1/${question.id}`);
  };

  const handleBackToPractice = () => {
    navigate("/practice-python-1");
  };

  const handleRunCode = () => {
    if (!selectedQuestion) return;
    setIsRunning(true);
    setOutput("Running code...");

    setTimeout(() => {
      const results = [];
      let passed = 0;

      selectedQuestion.testCases.forEach((testCase, index) => {
        const isPassed = Math.random() > 0.3;
        if (isPassed) passed++;
        results.push({
          ...testCase,
          passed: isPassed,
          actualOutput: isPassed ? testCase.output : "Wrong output",
          id: index,
        });
      });

      setTestResults(results);
      setOutput(
        `Tests completed: ${passed}/${selectedQuestion.testCases.length} passed`
      );
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmitCode = () => {
    if (!selectedQuestion) return;
    setIsRunning(true);
    setOutput("Submitting code...");

    setTimeout(() => {
      const allPassed =
        testResults.every((result) => result.passed) || Math.random() > 0.5;

      if (allPassed) {
        setOutput("✅ All test cases passed! Submission successful.");
        const updatedPractice = { ...selectedPractice };
        const questionIndex = updatedPractice.questions.findIndex(
          (q) => q.id === selectedQuestion.id
        );
        if (questionIndex !== -1) {
          updatedPractice.questions[questionIndex].status = "solved";
          updatedPractice.questions[questionIndex].attempts = [
            {
              passed: selectedQuestion.testCases.length,
              total: selectedQuestion.testCases.length,
              score: selectedQuestion.score,
            },
          ];
          setSelectedPractice(updatedPractice);
        }
      } else {
        setOutput("❌ Some test cases failed. Please try again.");
      }
      setIsRunning(false);
    }, 1500);
  };

  if (!selectedPractice)
    return (
      <div className="loading-state-cod">
        <h3>Loading Coding Practice - 1...</h3>
      </div>
    );

  return (
    <div
      className={`coding-practice-container-cod ${
        questionId ? "full-view-cod" : ""
      }`}
    >
      {/* Header */}
      <div className="coding-header-cod">
        <div className="header-left-cod">
          {questionId && (
            <button className="back-button-cod" onClick={handleBackToPractice}>
              ← Back to Practice
            </button>
          )}
          <h1>{selectedPractice.title}</h1>
          <p className="practice-description-cod">
            {selectedPractice.description}
          </p>
        </div>
      </div>

      <div className="coding-practice-content-cod">
        {!questionId ? (
          /* Questions List View */
          <div className="questions-list-view-cod">
            <div className="questions-table-container-cod">
              <div className="table-header-cod">
                <h3>Questions</h3>
                <div className="table-stats-cod">
                  <span className="total-questions-cod">
                    {selectedPractice.questions.length} questions
                  </span>
                </div>
              </div>

              <div className="questions-table-cod">
                <table>
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Question</th>
                      <th>Difficulty</th>
                      <th>Score</th>
                      <th>Attempts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPractice.questions.map((question) => (
                      <tr
                        key={question.id}
                        className={`question-row-cod ${
                          question.status === "solved" ? "solved-cod" : ""
                        } ${
                          selectedQuestion?.id === question.id
                            ? "selected-cod"
                            : ""
                        }`}
                        onClick={() => handleQuestionSelect(question)}
                      >
                        <td className="status-cell-cod">
                          <span
                            className={`status-indicator-cod ${question.status}`}
                          >
                            {question.status === "solved" ? "✓" : "●"}
                          </span>
                        </td>
                        <td className="question-title-cell-cod">
                          <div className="question-title-main-cod">
                            {question.title}
                          </div>
                          <div className="question-id-cod">
                            ID: {question.id}
                          </div>
                        </td>
                        <td className="difficulty-cell-cod">
                          <span
                            className={`difficulty-badge-cod ${question.difficulty.toLowerCase()}`}
                          >
                            {question.difficulty}
                          </span>
                        </td>
                        <td className="score-cell-cod">{question.score} pts</td>
                        <td className="attempts-cell-cod">
                          {question.attempts.length > 0 ? (
                            <div className="attempts-info-cod">
                              <span className="attempts-count-cod">
                                {question.attempts[0].passed}/
                                {question.attempts[0].total} passed
                              </span>
                              <span className="attempts-score-cod">
                                Score: {question.attempts[0].score}/
                                {question.score}
                              </span>
                            </div>
                          ) : (
                            <span className="no-attempts-cod">
                              Not attempted
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* Question Detail View */
          selectedQuestion && (
            <div className="question-detail-view-cod">
              <div className="question-content-cod">
                <div className="question-header-cod">
                  <div className="question-title-section-cod">
                    <h2>{selectedQuestion.title}</h2>
                    <div className="question-meta-tags-cod">
                      <span
                        className={`difficulty-badge-cod large-cod ${selectedQuestion.difficulty.toLowerCase()}`}
                      >
                        {selectedQuestion.difficulty}
                      </span>
                      <span className="score-badge-cod">
                        {selectedQuestion.score} points
                      </span>
                      <span className="question-id-badge-cod">
                        ID: {selectedQuestion.id}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="question-description-section-cod">
                  <h3>Description</h3>
                  <div className="description-content-cod">
                    <p>{selectedQuestion.description}</p>
                  </div>
                </div>

                <div className="sample-io-section-cod">
                  <div className="sample-input-cod">
                    <h3>Sample Input</h3>
                    <div className="code-block-cod">
                      <pre>
                        {selectedQuestion.sampleInput || "No input provided"}
                      </pre>
                    </div>
                  </div>
                  <div className="sample-output-cod">
                    <h3>Sample Output</h3>
                    <div className="code-block-cod">
                      <pre>{selectedQuestion.sampleOutput}</pre>
                    </div>
                  </div>
                </div>

                <div className="test-cases-section-cod">
                  <h3>Test Cases</h3>
                  <div className="test-cases-grid-cod">
                    {selectedQuestion.testCases.map((testCase, index) => (
                      <div
                        key={index}
                        className={`test-case-card-cod ${
                          testCase.visible ? "visible-cod" : "hidden-cod"
                        }`}
                      >
                        <div className="test-case-header-cod">
                          <span className="test-case-number-cod">
                            Test Case {index + 1}
                          </span>
                          <span
                            className={`test-case-visibility-cod ${
                              testCase.visible ? "visible-cod" : "hidden-cod"
                            }`}
                          >
                            {testCase.visible ? "Visible" : "Hidden"}
                          </span>
                        </div>
                        {testCase.visible && (
                          <div className="test-case-content-cod">
                            <div className="test-input-cod">
                              <label>Input:</label>
                              <div className="code-block-cod small-cod">
                                <pre>{testCase.input || "No input"}</pre>
                              </div>
                            </div>
                            <div className="test-output-cod">
                              <label>Expected Output:</label>
                              <div className="code-block-cod small-cod">
                                <pre>{testCase.output}</pre>
                              </div>
                            </div>
                          </div>
                        )}
                        {testResults[index] && (
                          <div
                            className={`test-result-indicator-cod ${
                              testResults[index].passed
                                ? "passed-cod"
                                : "failed-cod"
                            }`}
                          >
                            {testResults[index].passed
                              ? "✓ Passed"
                              : "✗ Failed"}
                            {!testResults[index].passed && (
                              <span className="actual-output-cod">
                                Your output: {testResults[index].actualOutput}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="editor-section-cod">
                <div className="editor-header-cod">
                  <h3>Code Editor</h3>
                  <div className="editor-actions-cod">
                    <button
                      className="run-button-cod"
                      onClick={handleRunCode}
                      disabled={isRunning}
                    >
                      {isRunning ? "Running..." : "Run Code"}
                    </button>
                    <button
                      className="submit-button-cod"
                      onClick={handleSubmitCode}
                      disabled={isRunning}
                    >
                      {isRunning ? "Submitting..." : "Submit Solution"}
                    </button>
                  </div>
                </div>

                <div className="code-editor-cod">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder={`Write your ${selectedLanguage} code here...`}
                    spellCheck="false"
                  />
                </div>

                <div className="output-section-cod">
                  <div className="output-header-cod">
                    <h4>Output</h4>
                    {output && (
                      <span
                        className={`output-status-cod ${
                          output.includes("✅")
                            ? "success-cod"
                            : output.includes("❌")
                            ? "error-cod"
                            : "info-cod"
                        }`}
                      >
                        {output.includes("✅")
                          ? "Success"
                          : output.includes("❌")
                          ? "Error"
                          : "Running"}
                      </span>
                    )}
                  </div>
                  <div className="output-container-cod">
                    <pre className="output-content-cod">{output}</pre>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Coding_Practice_1;
