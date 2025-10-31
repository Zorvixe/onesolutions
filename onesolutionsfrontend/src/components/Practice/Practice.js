import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Practice.css";
import { codingPracticesData } from "../../codingPracticesData/codingPracticesData";

// Import Ace Editor
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";

const Practice = () => {
  const { practiceId, questionId } = useParams();
  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [theme, setTheme] = useState("monokai");
  const [fontSize, setFontSize] = useState(14);

  // Load practice based on URL parameter or default to first practice
  useEffect(() => {
    const findPractice = () => {
      // If practiceId is provided in URL, find that practice
      if (practiceId) {
        for (const language in codingPracticesData) {
          const practice = codingPracticesData[language].find(
            (p) => p.id === practiceId
          );
          if (practice) {
            setSelectedPractice(practice);
            setSelectedLanguage(language);
            return;
          }
        }
      }

      // If no practiceId or practice not found, use first practice as default
      const firstLanguage = Object.keys(codingPracticesData)[0];
      const firstPractice = codingPracticesData[firstLanguage][0];
      if (firstPractice) {
        setSelectedPractice(firstPractice);
        setSelectedLanguage(firstLanguage);
        // Update URL to reflect the default practice
        if (!practiceId) {
          navigate(`/practice/${firstPractice.id}`, { replace: true });
        }
      }
    };

    findPractice();
  }, [practiceId, navigate]);

  // Load question based on URL parameter
  useEffect(() => {
    if (selectedPractice && questionId) {
      const question = selectedPractice.questions.find(
        (q) => q.id === questionId
      );
      if (question) {
        setSelectedQuestion(question);
        setCode(question.defaultCode || "");
      } else {
        setSelectedQuestion(null);
        setCode("");
      }
    } else {
      setSelectedQuestion(null);
      setCode("");
    }
    setOutput("");
    setTestResults([]);
  }, [selectedPractice, questionId]);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);

    // When language changes, select the first practice of that language
    const practices = codingPracticesData[newLanguage] || [];
    if (practices.length > 0) {
      const firstPractice = practices[0];
      setSelectedPractice(firstPractice);
      navigate(`/practice/${firstPractice.id}`);
    }
  };

  const handlePracticeSelect = (practice) => {
    setSelectedPractice(practice);
    navigate(`/practice/${practice.id}`);
  };

  const handleQuestionSelect = (question) => {
    navigate(`/practice/${practiceId}/${question.id}`);
  };

  const handleBackToPractice = () => {
    navigate(`/practice/${practiceId}`);
  };

  const handleRunCode = () => {
    if (!selectedQuestion) return;

    setIsRunning(true);
    setOutput("Running code...");

    // Simulate code execution
    setTimeout(() => {
      const results = [];
      let passed = 0;

      selectedQuestion.testCases.forEach((testCase, index) => {
        // In a real application, this would execute the code against test cases
        const isPassed = Math.random() > 0.3; // Simulate test results

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

    // Simulate submission
    setTimeout(() => {
      const allPassed =
        testResults.every((result) => result.passed) || Math.random() > 0.5;

      if (allPassed) {
        setOutput("✅ All test cases passed! Submission successful.");
        // Update question status
        if (selectedPractice && selectedQuestion) {
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
        }
      } else {
        setOutput("❌ Some test cases failed. Please try again.");
      }
      setIsRunning(false);
    }, 1500);
  };

  const practices = codingPracticesData[selectedLanguage] || [];

  if (!selectedPractice) {
    return (
      <div className="loading-state-prac">
        <h3>Loading Practice...</h3>
      </div>
    );
  }

  // If questionId is present, show only the question in full width
  if (questionId && selectedQuestion) {
    return (
      <div
        className="practice-full-question-prac"
        style={{ marginTop: "80px" }}
      >
        {/* Header for full question view */}
        <div className="full-question-header-prac">
          <button className="back-button-prac" onClick={handleBackToPractice}>
            ←{" "}
            <span className="practice-name-prac">{selectedPractice.title}</span>
          </button>
          <div className="full-question-title-prac">
            <div className="full-question-meta-prac">
              <span
                className={`difficulty-badge-prac large-prac ${selectedQuestion.difficulty.toLowerCase()}`}
              >
                {selectedQuestion.difficulty}
              </span>
              <span className="score-badge-prac">
                {selectedQuestion.score} points
              </span>
            </div>
          </div>
        </div>

        <div className="full-question-content-prac">
          {/* Question Details */}
          <div className="full-question-detail-prac">
            <div className="question-description-section-prac">
              <h3>Description</h3>
              <span className="practice-name-prac">
                {selectedQuestion.title}
              </span>
              <div className="description-content-prac">
                <p>{selectedQuestion.description}</p>
              </div>
            </div>

            <div className="sample-io-section-prac">
              <div className="sample-input-prac">
                <h3>Sample Input</h3>
                <div className="code-block-prac">
                  <pre>
                    {selectedQuestion.sampleInput || "No input provided"}
                  </pre>
                </div>
              </div>
              <div className="sample-output-prac">
                <h3>Sample Output</h3>
                <div className="code-block-prac">
                  <pre>{selectedQuestion.sampleOutput}</pre>
                </div>
              </div>
            </div>

            <div className="test-cases-section-prac">
              <h3>Test Cases</h3>
              <div className="test-cases-grid-prac">
                {selectedQuestion.testCases.map((testCase, index) => (
                  <div
                    key={index}
                    className={`test-case-prac ${
                      testCase.visible ? "visible-prac" : "hidden-prac"
                    }`}
                  >
                    <div className="test-case-header-prac">
                      <span className="test-case-number-prac">
                        Test Case {index + 1}
                      </span>
                      <span
                        className={`test-case-visibility-prac ${
                          testCase.visible ? "visible-prac" : "hidden-prac"
                        }`}
                      >
                        {testCase.visible ? "Visible" : "Hidden"}
                      </span>
                    </div>
                    {testCase.visible && (
                      <div className="test-case-content-prac">
                        <div className="test-input-prac">
                          <label>Input:</label>
                          <div className="code-block-prac small-prac">
                            <pre>{testCase.input || "No input"}</pre>
                          </div>
                        </div>
                        <div className="test-output-prac">
                          <label>Expected Output:</label>
                          <div className="code-block-prac small-prac">
                            <pre>{testCase.output}</pre>
                          </div>
                        </div>
                      </div>
                    )}
                    {testResults[index] && (
                      <div
                        className={`test-result-prac ${
                          testResults[index].passed
                            ? "passed-prac"
                            : "failed-prac"
                        }`}
                      >
                        {testResults[index].passed ? "✓ Passed" : "✗ Failed"}
                        {!testResults[index].passed && (
                          <span className="actual-output-prac">
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

          {/* Code Editor */}
          <div className="full-code-editor-section-prac">
            <div className="editor-header-prac">
              <div className="editor-title-prac">
                <div className="editor-info-prac">
                  {selectedLanguage === "python" ? "Python 3.10" : "JavaScript"}{" "}
                  | Lines: {code.split("\n").length} | Length: {code.length}
                </div>
              </div>
              <div className="editor-controls-prac">
                <div className="editor-actions-prac">
                  <button
                    className="run-button-prac"
                    onClick={handleRunCode}
                    disabled={isRunning}
                  >
                    {isRunning ? <span className="loader-prac"></span> : "Run"}
                  </button>
                  <button
                    className="submit-button-prac"
                    onClick={handleSubmitCode}
                    disabled={isRunning}
                  >
                    {isRunning ? (
                      <span className="loader-prac"></span>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="code-editor-container-prac">
              <AceEditor
                mode={selectedLanguage}
                theme={theme}
                value={code}
                onChange={setCode}
                fontSize={fontSize}
                width="100%"
                height="100%"
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 4,
                  useWorker: false,
                  fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
                  scrollPastEnd: 0.5,
                  highlightSelectedWord: true,
                  displayIndentGuides: true,
                  showInvisibles: false,
                  showFoldWidgets: true,
                  fixedWidthGutter: true,
                  wrap: false,
                  indentedSoftWrap: false,
                  lineHeight: 2,
                }}
                editorProps={{
                  $blockScrolling: true,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normal practice view (no question selected)
  return (
    <div className="practice-container-prac" style={{ marginTop: "80px" }}>
      <div className="practice-content-prac">
        {/* Left Sidebar - Practice List */}
        <div className="practice-sidebar-prac">
          <h3>Coding Practices</h3>
          <div className="practice-list-prac">
            {practices.map((practice) => (
              <div
                key={practice.id}
                className={`practice-item-prac ${
                  selectedPractice?.id === practice.id ? "active-prac" : ""
                }`}
                onClick={() => handlePracticeSelect(practice)}
              >
                <div className="practice-title-prac">{practice.title}</div>
                <div className="practice-description-prac">
                  {practice.description}
                </div>
                <div className="practice-stats-prac">
                  {
                    practice.questions.filter((q) => q.status === "solved")
                      .length
                  }{" "}
                  / {practice.questions.length} solved
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content-coding-prac">
          {selectedPractice && (
            <div className="questions-section-prac">
              <div className="questions-header-prac">
                <h3>Questions</h3>
                <div className="questions-stats-prac">
                  {selectedPractice.questions.length} questions
                </div>
              </div>
              <div className="questions-table-prac">
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
                        className={`question-row-prac ${
                          question.status === "solved" ? "solved-prac" : ""
                        }`}
                        onClick={() => handleQuestionSelect(question)}
                      >
                        <td className="status-cell-prac">
                          <span
                            className={`status-indicator-prac ${question.status}`}
                          >
                            {question.status === "solved" ? "✓" : "●"}
                          </span>
                        </td>
                        <td className="question-title-cell-prac">
                          <div className="question-title-main-prac">
                            {question.title}
                          </div>
                        </td>
                        <td className="difficulty-cell-prac">
                          <span
                            className={`difficulty-badge-prac ${question.difficulty.toLowerCase()}`}
                          >
                            {question.difficulty}
                          </span>
                        </td>
                        <td className="score-cell-prac">
                          {question.score} pts
                        </td>
                        <td className="attempts-cell-prac">
                          {question.attempts.length > 0 ? (
                            <div className="attempts-info-prac">
                              <span className="attempts-count-prac">
                                {question.attempts[0].passed}/
                                {question.attempts[0].total} passed
                              </span>
                              <span className="attempts-score-prac">
                                Score: {question.attempts[0].score}/
                                {question.score}
                              </span>
                            </div>
                          ) : (
                            <span className="no-attempts-prac">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Practice;
