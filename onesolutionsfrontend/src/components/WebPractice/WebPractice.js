"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { staticCodingPracticesData } from "../../codingPracticesData/staticCodingPracticesData";
import CodingPracticeService from "../../services/codingPracticeService";
import { useAuth } from "../../context/AuthContext";
import CodePlayground from "../../CodePlayground/CodePlayground";
import validateHtmlTest from "./validateHtmlTest";
import validateCssTest from "./validateCssTest";
import "./WebPractice.css";
import "../../codingPracticesData/codingpracticesweb.css";

const WebPractice = () => {
  const { practiceId, questionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { loadProgressSummary, user } = useAuth();
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
  const [allTestsPassed, setAllTestsPassed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [debugInfo, setDebugInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [tweakIncrease, setTweakIncrease] = useState(0);
  const iframeRef = useRef(null);
  const confettiRef = useRef([]);
  const autoSaveTimeoutRef = useRef(null);
  const [isJustSolved, setIsJustSolved] = useState(false); // NEW: Track if question was just solved

  const subtopicId = location.state?.subtopicId;
  const topicId = location.state?.topicId;
  const goalName = location.state?.goalName;
  const courseName = location.state?.courseName;

  const loadProgress = useCallback(async () => {
    try {
      const response = await CodingPracticeService.getAllProgress();
      if (response.success) {
        const progressMap = {};
        if (response.data?.progress && Array.isArray(response.data.progress)) {
          response.data.progress.forEach((prog) => {
            if (prog && prog.question_id) {
              progressMap[prog.question_id] = prog;
            }
          });
        }
        setUserProgress(progressMap);
        return progressMap;
      } else {
        console.error("[v0] Failed to load progress:", response.error);
      }
    } catch (error) {
      console.error("[v0] Failed to load progress:", error);
      setDebugInfo(`Error loading progress: ${error.message}`);
    }
    return {};
  }, []);

  const autoSaveCode = useCallback(
    async (questionId, code, isSolved = false) => {
      try {
        const codeContent = JSON.stringify(code);
        const status = isSolved ? "solved" : "attempted";
        const score = isSolved ? selectedQuestion?.score || 0 : 0;

        const response = await CodingPracticeService.saveProgress(
          practiceId,
          questionId,
          "web",
          codeContent,
          status,
          score,
          {
            passed: isSolved,
            score: score,
            timestamp: new Date().toISOString(),
          }
        );

        if (response.success) {
          setUserProgress((prev) => ({
            ...prev,
            [questionId]: {
              ...prev[questionId],
              question_id: questionId,
              status: status,
              score: score,
              code: codeContent,
            },
          }));
          return { success: true };
        }
        return { success: false };
      } catch (error) {
        console.error("[v0] Auto-save failed:", error);
        return { success: false, error: error.message };
      }
    },
    [practiceId, selectedQuestion]
  );

  useEffect(() => {
    const loadPracticeData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!staticCodingPracticesData || !staticCodingPracticesData.static) {
          console.error(
            "[v0] staticCodingPracticesData is not properly structured"
          );
          setError("Practice data not found. Please try again.");
          return;
        }

        const practice = staticCodingPracticesData.static.find(
          (p) => p.id === practiceId
        );
        if (!practice) {
          setError(`Practice with ID "${practiceId}" not found.`);
          return;
        }

        setSelectedPractice(practice);

        if (!practice.questions || !Array.isArray(practice.questions)) {
          setError("Practice questions not available.");
          return;
        }

        const question =
          practice.questions.find((q) => q.id === questionId) ||
          practice.questions[0];
        if (!question) {
          setError(`Question with ID "${questionId}" not found.`);
          return;
        }

        setSelectedQuestion(question);

        const progressMap = await loadProgress();
        const savedProgress = progressMap[question.id];
        let initialCode = {
          html: question.defaultCode?.html || "",
          css: question.defaultCode?.css || "",
          javascript: question.defaultCode?.javascript || "",
        };

        if (savedProgress && savedProgress.code) {
          try {
            let parsedCode;
            if (typeof savedProgress.code === "string") {
              parsedCode = JSON.parse(savedProgress.code);
            } else {
              parsedCode = savedProgress.code;
            }

            if (parsedCode && typeof parsedCode === "object") {
              initialCode = {
                html: parsedCode.html || initialCode.html,
                css: parsedCode.css || initialCode.css,
                javascript: parsedCode.javascript || initialCode.javascript,
              };
            }
          } catch (error) {
            console.error("[v0] Failed to parse saved code:", error);
          }
        }

        setCurrentCode(initialCode);
        setIsJustSolved(false); // Reset just solved flag when loading new question
      } catch (error) {
        console.error("[v0] Error loading practice data:", error);
        setError(`Error loading practice: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadPracticeData();
  }, [practiceId, questionId, loadProgress]);

  const updateQuestionStatus = useCallback(
    async (questionId, passed, score, code) => {
      try {
        const codeContent = JSON.stringify(code || currentCode);
        const status = passed ? "solved" : "attempted";
        const finalScore = passed ? score : 0;

        const response = await CodingPracticeService.saveProgress(
          practiceId,
          questionId,
          "web",
          codeContent,
          status,
          finalScore,
          {
            passed,
            score: finalScore,
            timestamp: new Date().toISOString(),
          }
        );

        if (response.success) {
          setUserProgress((prev) => ({
            ...prev,
            [questionId]: {
              ...prev[questionId],
              question_id: questionId,
              status: status,
              score: finalScore,
              code: codeContent,
            },
          }));

          await loadProgressSummary();
          return { success: true, data: response.data };
        } else {
          console.error("[v0] Failed to save progress:", response.message);
          return { success: false, error: response.message };
        }
      } catch (error) {
        console.error("[v0] Failed to update question status:", error);
        return { success: false, error: error.message };
      }
    },
    [practiceId, currentCode, loadProgressSummary]
  );

  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

  const updatePreview = (iframeRef) => {
    if (!iframeRef.current) {
      return;
    }

    const iframe = iframeRef.current;

    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      if (!iframeDoc) {
        console.error("[v0] Cannot access iframe document");
        return;
      }

      const htmlContent = `<!DOCTYPE html>
<html style="margin:0;padding:0;width:100%;height:100%;overflow:auto;">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${currentCode.css || ""}
  </style>
</head>
<body>
  ${currentCode.html || ""}
  <script>
    (function() {
      try {
        ${currentCode.javascript || ""}
      } catch (e) {
        console.error('Script error:', e);
      }
    })();
  </script>
</body>
</html>`;

      iframeDoc.open("text/html", "replace");
      iframeDoc.write(htmlContent);
      iframeDoc.close();
    } catch (error) {
      console.error("[v0] Error updating preview:", error);
      try {
        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDoc && iframeDoc.body) {
          iframeDoc.body.innerHTML = `<div style="padding:20px;color:#d32f2f;font-family:Arial;"><p>Error rendering preview. Please check your HTML/CSS/JavaScript for syntax errors.</p><p style="font-size:12px;color:#999;margin-top:10px;">${error.message}</p></div>`;
        }
      } catch (fallbackError) {
        console.error(
          "[v0] Fallback preview update also failed:",
          fallbackError
        );
      }
    }
  };

  const runTests = async (iframeRef) => {
    if (!selectedQuestion || !iframeRef.current) return;

    setIsRunning(true);
    setOutput("Running tests...");
    setSubmitMessage("");
    setDebugInfo("");

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const results = [];
    let passedCount = 0;

    try {
      if (
        !selectedQuestion.testCases ||
        !Array.isArray(selectedQuestion.testCases)
      ) {
        setOutput("No test cases available for this question.");
        setIsRunning(false);
        return;
      }

      for (const testCase of selectedQuestion.testCases) {
        let passed = false;
        let actual = "";
        const testType = testCase.type || "html-validation";

        try {
          if (testType === "html-validation") {
            const result = validateHtmlTest(testCase, iframeDoc, iframe);
            passed = result.passed;
            actual = result.actual;
          } else if (testType === "css-validation") {
            const result = validateCssTest(testCase, iframeDoc, iframe);
            passed = result.passed;
            actual = result.actual;
          } else {
            passed = false;
            actual = `Unknown test type: ${testType}`;
          }

          if (passed) passedCount++;
        } catch (error) {
          console.error(`[v0] Test ${testCase.id} error:`, error);
          passed = false;
          actual = `Error: ${error.message}`;
        }

        results.push({
          ...testCase,
          passed,
          actual,
        });
      }

      setTestResults(results);
      const allPassed = passedCount === selectedQuestion.testCases.length;
      setAllTestsPassed(allPassed);

      if (allPassed) {
        setOutput(
          `✅ All tests passed! ${passedCount}/${selectedQuestion.testCases.length} tests completed successfully. You can now submit your solution.`
        );
      } else {
        setOutput(
          `Tests completed: ${passedCount}/${selectedQuestion.testCases.length} passed. Fix the issues and run tests again.`
        );
      }
    } catch (error) {
      console.error("[v0] Error running tests:", error);
      setOutput(`Error running tests: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleRunTests = (iframeRef) => {
    console.log("[v0] Running tests...");
    updatePreview(iframeRef);
    setTimeout(() => {
      runTests(iframeRef);
    }, 500);
  };

  const handleCodeChange = (newCode) => {
    if (newCode && typeof newCode === "object") {
      setCurrentCode(newCode);
      setAllTestsPassed(false);
      setSubmitMessage("");

      // If question was just solved, don't auto-save as attempted
      if (isJustSolved) {
        setIsJustSolved(false); // Reset the flag
        return;
      }

      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }

      autoSaveTimeoutRef.current = setTimeout(() => {
        if (selectedQuestion) {
          const currentStatus = getQuestionStatus(selectedQuestion.id);
          // Only auto-save as attempted if not already solved
          if (currentStatus !== "solved") {
            autoSaveCode(selectedQuestion.id, newCode, false);
          }
        }
      }, 2000);
    }
  };

  const createConfetti = () => {
    const colors = [
      "#FFD700",
      "#FF6B6B",
      "#4ECDC4",
      "#FFDE59",
      "#667eea",
      "#764ba2",
    ];
    const container = document.querySelector(".confetti-container");
    if (!container) return;

    confettiRef.current.forEach((conf) => conf.remove());
    confettiRef.current = [];

    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = confetti.style.width;
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
      confetti.style.animation = `confettiRain ${
        Math.random() * 3 + 2
      }s linear forwards`;
      confetti.style.animationDelay = `${Math.random() * 1}s`;

      container.appendChild(confetti);
      confettiRef.current.push(confetti);
    }
  };

  const handleSubmit = async () => {
    const allTestsCurrentlyPassed =
      testResults.length > 0 && testResults.every((test) => test.passed);

    if (!allTestsCurrentlyPassed) {
      setSubmitMessage(
        "❌ Please pass all tests before submitting. Run tests first and ensure all tests pass."
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("Submitting your solution...");
    setDebugInfo("");

    try {
      const result = await updateQuestionStatus(
        selectedQuestion.id,
        true,
        selectedQuestion.score,
        currentCode
      );

      if (result.success) {
        const tweakIncreaseValue = selectedQuestion.score || 10;
        setTweakIncrease(tweakIncreaseValue);

        // Set the flag that question was just solved
        setIsJustSolved(true);

        // Clear any pending auto-save
        if (autoSaveTimeoutRef.current) {
          clearTimeout(autoSaveTimeoutRef.current);
        }

        setShowCelebrationModal(true);

        setTimeout(() => {
          createConfetti();
        }, 100);

        setSubmitMessage(
          "✅ Congratulations! Your solution has been submitted successfully and marked as completed."
        );

        if (selectedPractice) {
          try {
            await CodingPracticeService.completePractice(
              selectedPractice.id,
              goalName,
              courseName
            );
            setDebugInfo("Practice completion status updated successfully.");
          } catch (practiceError) {
            console.log(
              "Practice completion update optional:",
              practiceError.message
            );
          }
        }
      } else {
        setSubmitMessage(
          `❌ Failed to submit solution: ${result.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("[v0] Submit error:", error);
      setSubmitMessage(`❌ Error submitting solution: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeCelebrationModal = () => {
    setShowCelebrationModal(false);
    confettiRef.current.forEach((conf) => conf.remove());
    confettiRef.current = [];
  };

  const handleBackToPractice = () => {
    if (topicId && subtopicId) {
      navigate(`/topic/${topicId}/subtopic/${subtopicId}`, {
        state: { subtopicId, goalName, courseName, topicId },
      });
    } else {
      navigate(-1);
    }
  };

  const getQuestionStatus = (questionId) => {
    return userProgress[questionId]?.status || "unsolved";
  };

  const renderDescriptionDetails = () => {
    if (!selectedQuestion?.descriptionDetails) return null;
    if (typeof selectedQuestion.descriptionDetails === "string") {
      return (
        <div
          className="desc-question-details"
          dangerouslySetInnerHTML={{
            __html: selectedQuestion.descriptionDetails,
          }}
        />
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="thread-detail-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Practice</h2>
        <p>{error}</p>
        <button onClick={handleBackToPractice} className="back-button">
          ← Back to Practice
        </button>
      </div>
    );
  }

  if (!selectedPractice || !selectedQuestion) {
    return (
      <div className="loading-container">
        <p>Practice not found...</p>
        <button onClick={handleBackToPractice} className="back-button">
          ← Back to Practice
        </button>
      </div>
    );
  }

  const currentStatus = getQuestionStatus(selectedQuestion.id);
  const isAlreadySolved = currentStatus === "solved";

  const CelebrationModal = () => {
    if (!showCelebrationModal) return null;

    return (
      <div className="celebration-modal-overlay">
        <div className="confetti-container"></div>
        <div className="celebration-modal">
          <h2 className="modal-title">Congratulations!</h2>

          <div className="modal-message">
            <p>
              Great job{" "}
              <span className="modal-username">
                {user?.username || "Coder"}
              </span>
              !
            </p>
            <p>You've successfully solved this challenge!</p>
          </div>

          <div className="modal-tweak-increase">
            <p>Your Today's Tweak has increased by</p>
            <div className="tweak-value">+{tweakIncrease}</div>
            <p>Keep up the great work!</p>
          </div>

          <button
            className="modal-button"
            onClick={closeCelebrationModal}
            autoFocus
          >
            Continue Practicing
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="web-practice-container">
      <CelebrationModal />
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
              className={`difficulty ${
                selectedQuestion.difficulty?.toLowerCase() || "medium"
              }`}
            >
              {selectedQuestion.difficulty || "Medium"}
            </span>
            <span className="score-head">
              {selectedQuestion.score || 0} points
            </span>
          </div>
        </div>
      </div>

      <div className="web-practice-content">
        <div className="left-panel">
          <div className="question-description">
            <div className="question-description-header">
              <h3>Description</h3>
              <h2>{selectedQuestion.title}</h2>
              <p>{selectedQuestion.description}</p>
            </div>
            <div className="question-description-content">
              <div className="desc-question-full-view">
                {renderDescriptionDetails()}
              </div>
            </div>
          </div>

          <div className="test-cases">
            <div className="test-cases-header">
              <h3>Test Cases</h3>
              <span className="tests-count">
                {testResults.filter((t) => t.passed).length}/
                {testResults.length} Passed
              </span>
            </div>
            <div className="test-cases-content">
              <div className="test-results">
                {testResults.map((test, index) => (
                  <div
                    key={index}
                    className={`test-case ${test.passed ? "passed" : "failed"}`}
                  >
                    <div className="test-header">
                      <span className="test-status">
                        {test.passed ? "✓" : "✗"} Test {index + 1}
                        <span className="test-type-badge">
                          {test.type} - {test.input || "unknown"}
                        </span>
                      </span>
                      <span className="test-visibility">
                        {test.visible ? "Visible" : "Hidden"}
                      </span>
                    </div>
                    <p className="test-description">{test.description}</p>
                    {!test.passed && (
                      <div className="test-details">
                        <span>Expected: {test.output || "Test to pass"}</span>
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
                  onClick={handleSubmit}
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Solution"}
                </button>
              </div>
            </div>
          </div>
        </div>

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
