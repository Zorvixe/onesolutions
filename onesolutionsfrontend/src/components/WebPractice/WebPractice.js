// WebPractice.js
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { codingPracticesData } from "../../codingPracticesData/codingPracticesData";
import CodingPracticeService from "../../services/codingPracticeService";
import { useAuth } from "../../context/AuthContext";
import CodePlayground from "../../CodePlayground/CodePlayground";

import "./WebPractice.css";

const WebPractice = () => {
  const { practiceId, questionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { loadProgressSummary } = useAuth();

  const [selectedPractice, setSelectedPractice] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [userProgress, setUserProgress] = useState({});
  const [currentCode, setCurrentCode] = useState({
    html: "",
    css: "",
    javascript: "",
  });

  const iframeRef = useRef(null);

  const subtopicId = location.state?.subtopicId;
  const goalName = location.state?.goalName;
  const courseName = location.state?.courseName;

  // Load practice and question data
  useEffect(() => {
    const practice = codingPracticesData.static.find(
      (p) => p.id === practiceId
    );
    if (practice) {
      setSelectedPractice(practice);

      const question =
        practice.questions.find((q) => q.id === questionId) ||
        practice.questions[0];
      if (question) {
        setSelectedQuestion(question);
        // Set initial code from question defaults
        setCurrentCode({
          html: question.defaultCode?.html || "",
          css: question.defaultCode?.css || "",
          javascript: question.defaultCode?.javascript || "",
        });
      }
    }
  }, [practiceId, questionId]);

  // Load user progress
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const response = await CodingPracticeService.getAllProgress();
        if (response.success) {
          const progressMap = {};
          response.data.progress.forEach((prog) => {
            progressMap[prog.question_id] = prog;
          });
          setUserProgress(progressMap);
        }
      } catch (error) {
        console.error("Failed to load progress:", error);
      }
    };
    loadProgress();
  }, []);

  // Handle code changes from CodePlayground
  const handleCodeChange = (newCode) => {
    setCurrentCode(newCode);
  };

  // Update preview using the iframe from CodePlayground
  const updatePreview = (iframeRef) => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${currentCode.css}</style>
      </head>
      <body>
        ${currentCode.html}
        <script>${currentCode.javascript}</script>
      </body>
      </html>
    `;

    iframeDoc.open();
    iframeDoc.write(fullHtml);
    iframeDoc.close();
  };

  // Run HTML/CSS validation tests
  const runTests = async (iframeRef) => {
    if (!selectedQuestion || !iframeRef.current) return;

    setIsRunning(true);
    setOutput("Running tests...");

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const results = [];
    let passedCount = 0;

    try {
      for (const testCase of selectedQuestion.testCases) {
        let passed = false;
        let actual = "";

        try {
          switch (testCase.type) {
            case "html-validation":
              if (testCase.validationType === "element-exists") {
                const element = iframeDoc.querySelector(testCase.selector);
                passed = !!element === testCase.expected;
                actual = !!element;
              }
              break;

            case "css-validation":
              if (testCase.validationType === "style-check") {
                const element = iframeDoc.querySelector(testCase.selector);
                if (element) {
                  const computedStyle =
                    iframe.contentWindow.getComputedStyle(element);
                  actual = computedStyle[testCase.property];
                  passed = actual === testCase.expected;
                }
              } else if (testCase.validationType === "background-image-check") {
                const element = iframeDoc.querySelector(testCase.selector);
                if (element) {
                  const computedStyle =
                    iframe.contentWindow.getComputedStyle(element);
                  actual = computedStyle.backgroundImage;
                  passed = actual !== "none" && actual !== "";
                }
              }
              break;
          }
        } catch (error) {
          console.error(`Test ${testCase.id} failed:`, error);
          passed = false;
        }

        if (passed) passedCount++;

        results.push({
          ...testCase,
          passed,
          actual: actual.toString(),
          expected: testCase.expected?.toString() || "true",
        });
      }

      setTestResults(results);

      const allPassed = passedCount === selectedQuestion.testCases.length;
      setOutput(
        `Tests completed: ${passedCount}/${selectedQuestion.testCases.length} passed`
      );

      // Update progress if all tests passed
      if (allPassed && selectedQuestion) {
        await updateQuestionStatus(
          selectedQuestion.id,
          true,
          selectedQuestion.score
        );
      }
    } catch (error) {
      setOutput(`Error running tests: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const updateQuestionStatus = async (questionId, passed, score) => {
    try {
      const codeContent = JSON.stringify(currentCode);

      const attemptData = {
        passed,
        score: passed ? score : 0,
        timestamp: new Date().toISOString(),
      };

      await CodingPracticeService.saveProgress(
        practiceId,
        questionId,
        "web",
        codeContent,
        passed ? "solved" : "attempted",
        passed ? score : 0,
        attemptData
      );

      await loadProgressSummary();
    } catch (error) {
      console.error("Failed to update question status:", error);
    }
  };

  const handleBackToPractice = () => {
    navigate(`/static-practice/${practiceId}`, {
      state: { subtopicId, goalName, courseName },
    });
  };

  const getQuestionStatus = (questionId) => {
    return userProgress[questionId]?.status || "unsolved";
  };

  // Custom handler for running tests from CodePlayground
  const handleRunTests = (iframeRef) => {
    updatePreview(iframeRef);
    setTimeout(() => {
      runTests(iframeRef);
    }, 100);
  };

  if (!selectedPractice || !selectedQuestion) {
    return <div>Loading...</div>;
  }

  const currentStatus = getQuestionStatus(selectedQuestion.id);

  return (
    <div className="web-practice-container">
      {/* Header */}
      <div className="web-practice-header">
        <button className="back-button" onClick={handleBackToPractice}>
          ← {selectedPractice.title}
        </button>
        <div className="question-info">
          <div className="question-meta">
            <span className={`status ${currentStatus}`}>
              {currentStatus === "solved"
                ? "✓ Solved"
                : currentStatus === "attempted"
                ? "● Attempted"
                : "○ Unsolved"}
            </span>
            <span
              className={`difficulty ${selectedQuestion.difficulty.toLowerCase()}`}
            >
              {selectedQuestion.difficulty}
            </span>
            <span className="score-head">{selectedQuestion.score} points</span>
          </div>
        </div>
      </div>

      <div className="web-practice-content">
        {/* Left Side - Question & Tests */}
        <div className="left-panel">
          <div className="question-description">
            <h3>Description</h3>
            <h2>{selectedQuestion.title}</h2>
            <p>{selectedQuestion.description}</p>
          </div>

          <div className="test-cases">
            <h3>Test Cases</h3>
            <div className="test-results">
              {testResults.map((test, index) => (
                <div
                  key={index}
                  className={`test-case ${test.passed ? "passed" : "failed"}`}
                >
                  <div className="test-header">
                    <span className="test-status">
                      {test.passed ? "✓" : "✗"} Test {index + 1}
                    </span>
                    <span className="test-visibility">
                      {test.visible ? "Visible" : "Hidden"}
                    </span>
                  </div>
                  <p className="test-description">{test.description}</p>
                  {!test.passed && test.visible && (
                    <div className="test-details">
                      <span>Expected: {test.expected}</span>
                      <span>Actual: {test.actual}</span>
                    </div>
                  )}
                </div>
              ))}
              {testResults.length === 0 && (
                <div className="no-tests">
                  Run the tests to see results here
                </div>
              )}
            </div>

            <div className="test-actions">
              <button
                onClick={() => handleRunTests(iframeRef)}
                disabled={isRunning}
                className="run-tests-btn"
              >
                {isRunning ? "Running Tests..." : "Run Tests"}
              </button>
            </div>
          </div>

          {/* Output Section */}
        </div>

        {/* Right Side - CodePlayground */}
        <div className="right-panel">
          <CodePlayground
            initialLanguage="web"
            initialCode={currentCode}
            autoRun={false}
            onCodeChange={handleCodeChange}
            iframeRef={iframeRef}
            customRunHandler={() => handleRunTests(iframeRef)}
            runButtonText="Run Tests"
          />
          <div className="output-section">
            <h3>Test Output</h3>
            <div className="output-container">
              <pre>{output || "Test results will appear here..."}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebPractice;
