"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { staticCodingPracticesData } from "../../codingPracticesData/staticCodingPracticesData";
import CodingPracticeService from "../../services/codingPracticeService";
import { useAuth } from "../../context/AuthContext";
import CodePlayground from "../../CodePlayground/CodePlayground";
import validateHtmlTest from "./validateHtmlTest";
import validateCssTest from "./validateCssTest";
import "./WebPracticeExam.css";

const WebPracticeExamQuestion = () => {
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Exam-specific states
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [warnings, setWarnings] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [securityEvents, setSecurityEvents] = useState([]);

  const iframeRef = useRef(null);
  const autoSaveTimeoutRef = useRef(null);
  const examEndTimeRef = useRef(null);

  const {
    subtopicId,
    goalName,
    courseName,
    topicId,
    examMode,
    timeRemaining: initialTime,
  } = location.state || {};

  // Security event handlers
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === "hidden" && examMode) {
      handleSecurityViolation("Tab switched");
    }
  }, [examMode]);

  const handleBlur = useCallback(() => {
    if (document.activeElement === document.body && examMode) {
      handleSecurityViolation("Window switched");
    }
  }, [examMode]);

  const handleBeforeUnload = useCallback(
    (e) => {
      if (examMode && warnings < 3) {
        e.preventDefault();
        e.returnValue =
          "Are you sure you want to leave? You may fail the exam.";
        handleSecurityViolation("Attempted to leave page");
      }
    },
    [examMode, warnings]
  );

  const handleSecurityViolation = (type) => {
    const newWarnings = warnings + 1;
    setWarnings(newWarnings);

    setSecurityEvents((prev) => [
      ...prev,
      {
        type,
        timestamp: new Date().toISOString(),
        warningCount: newWarnings,
      },
    ]);

    // Save to localStorage
    const userId = user?.id || "guest";
    const savedExam = localStorage.getItem(`exam_${practiceId}_${userId}`);
    if (savedExam) {
      const examData = JSON.parse(savedExam);
      examData.warnings = newWarnings;
      examData.securityEvents = securityEvents;
      localStorage.setItem(
        `exam_${practiceId}_${userId}`,
        JSON.stringify(examData)
      );
    }

    if (newWarnings <= 3) {
      setShowWarningModal(true);
    }

    if (newWarnings >= 3) {
      handleExamFailure("Maximum security warnings exceeded (3/3)");
    }
  };

  const handleExamFailure = (reason) => {
    alert(`❌ Exam Failed: ${reason}. You will be redirected.`);

    // Clear exam data
    const userId = user?.id || "guest";
    localStorage.removeItem(`exam_${practiceId}_${userId}`);

    // Navigate back
    if (topicId && subtopicId) {
      navigate(`/topic/${topicId}/subtopic/${subtopicId}`, {
        state: { subtopicId, goalName, courseName, topicId },
      });
    } else {
      navigate(-1);
    }
  };

  // Initialize security monitoring
  useEffect(() => {
    if (!examMode) return;

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Prevent copy-paste
    const preventCopyPaste = (e) => {
      if (examMode) e.preventDefault();
    };

    document.addEventListener("copy", preventCopyPaste);
    document.addEventListener("paste", preventCopyPaste);
    document.addEventListener("cut", preventCopyPaste);

    // Prevent dev tools
    const preventDevTools = (e) => {
      if (
        examMode &&
        (e.key === "F12" ||
          (e.ctrlKey && e.shiftKey && e.key === "I") ||
          (e.ctrlKey && e.shiftKey && e.key === "J") ||
          (e.ctrlKey && e.key === "U"))
      ) {
        e.preventDefault();
        handleSecurityViolation("Dev tools attempt");
      }
    };

    document.addEventListener("keydown", preventDevTools);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("copy", preventCopyPaste);
      document.removeEventListener("paste", preventCopyPaste);
      document.removeEventListener("cut", preventCopyPaste);
      document.removeEventListener("keydown", preventDevTools);
    };
  }, [examMode, handleVisibilityChange, handleBlur, handleBeforeUnload]);

  // Load exam data and timer
  useEffect(() => {
    if (examMode) {
      const userId = user?.id || "guest";
      const savedExam = localStorage.getItem(`exam_${practiceId}_${userId}`);

      if (savedExam) {
        const examData = JSON.parse(savedExam);
        setWarnings(examData.warnings || 0);
        setSecurityEvents(examData.securityEvents || []);

        if (examData.endTime) {
          const endTime = new Date(examData.endTime);
          examEndTimeRef.current = endTime;

          // Calculate remaining time
          const updateRemainingTime = () => {
            const now = new Date();
            const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
            setTimeRemaining(remaining);

            if (remaining <= 0) {
              handleTimeUp();
            }
          };

          updateRemainingTime();
          const timer = setInterval(updateRemainingTime, 1000);

          return () => clearInterval(timer);
        }
      }
    } else if (initialTime) {
      setTimeRemaining(initialTime);
    }
  }, [practiceId, user?.id, examMode, initialTime]);

  const handleTimeUp = () => {
    alert("⏰ Time's up! You will be redirected to the exam summary.");
    navigate(`/web-practice-exam/${practiceId}`, {
      state: { subtopicId, goalName, courseName, topicId },
    });
  };

  // Load question data
  useEffect(() => {
    const loadQuestionData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!staticCodingPracticesData?.static) {
          setError("Practice data not found.");
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

        const question = practice.questions.find((q) => q.id === questionId);
        if (!question) {
          setError(`Question with ID "${questionId}" not found.`);
          return;
        }

        setSelectedQuestion(question);

        // Load progress
        const response = await CodingPracticeService.getAllProgress();
        if (response.success) {
          const progressMap = {};
          if (
            response.data?.progress &&
            Array.isArray(response.data.progress)
          ) {
            response.data.progress.forEach((prog) => {
              if (prog && prog.question_id) {
                progressMap[prog.question_id] = prog;
              }
            });
          }
          setUserProgress(progressMap);

          const savedProgress = progressMap[question.id];
          let initialCode = {
            html: question.defaultCode?.html || "",
            css: question.defaultCode?.css || "",
            javascript: question.defaultCode?.javascript || "",
          };

          if (savedProgress?.code) {
            try {
              const parsedCode =
                typeof savedProgress.code === "string"
                  ? JSON.parse(savedProgress.code)
                  : savedProgress.code;

              if (parsedCode) {
                initialCode = {
                  html: parsedCode.html || initialCode.html,
                  css: parsedCode.css || initialCode.css,
                  javascript: parsedCode.javascript || initialCode.javascript,
                };
              }
            } catch (error) {
              console.error("Failed to parse saved code:", error);
            }
          }

          setCurrentCode(initialCode);
        }
      } catch (error) {
        console.error("Error loading question:", error);
        setError(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestionData();
  }, [practiceId, questionId]);

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

          // Update exam progress in localStorage
          if (examMode) {
            const userId = user?.id || "guest";
            const savedExam = localStorage.getItem(
              `exam_${practiceId}_${userId}`
            );
            if (savedExam) {
              const examData = JSON.parse(savedExam);
              examData.questionsAttempted = examData.questionsAttempted || {};
              examData.questionsAttempted[questionId] = {
                status,
                score,
                lastSaved: new Date().toISOString(),
              };
              localStorage.setItem(
                `exam_${practiceId}_${userId}`,
                JSON.stringify(examData)
              );
            }
          }

          return { success: true };
        }
        return { success: false };
      } catch (error) {
        console.error("Auto-save failed:", error);
        return { success: false, error: error.message };
      }
    },
    [practiceId, selectedQuestion, examMode, user?.id]
  );

  const updatePreview = (iframeRef) => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      const htmlContent = `<!DOCTYPE html>
<html style="margin:0;padding:0;width:100%;height:100%;overflow:auto;">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${currentCode.css || ""}</style>
</head>
<body>${currentCode.html || ""}
  <script>${currentCode.javascript || ""}</script>
</body>
</html>`;

      iframeDoc.open("text/html", "replace");
      iframeDoc.write(htmlContent);
      iframeDoc.close();
    } catch (error) {
      console.error("Error updating preview:", error);
    }
  };

  const runTests = async (iframeRef) => {
    if (!selectedQuestion || !iframeRef.current) return;

    setIsRunning(true);
    setOutput("Running tests...");
    setSubmitMessage("");

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
          `✅ All tests passed! ${passedCount}/${selectedQuestion.testCases.length} tests completed successfully.`
        );
      } else {
        setOutput(
          `Tests completed: ${passedCount}/${selectedQuestion.testCases.length} passed.`
        );
      }
    } catch (error) {
      console.error("Error running tests:", error);
      setOutput(`Error running tests: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleRunTests = (iframeRef) => {
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

      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }

      autoSaveTimeoutRef.current = setTimeout(() => {
        if (selectedQuestion) {
          autoSaveCode(selectedQuestion.id, newCode, false);
        }
      }, 2000);
    }
  };

  const handleSubmit = async () => {
    if (!allTestsPassed) {
      setSubmitMessage("❌ Please pass all tests before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("Submitting...");

    try {
      const result = await autoSaveCode(selectedQuestion.id, currentCode, true);

      if (result.success) {
        setSubmitMessage("✅ Question submitted successfully!");
        await loadProgressSummary();
      } else {
        setSubmitMessage(`❌ Failed to submit: ${result.error}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToExam = () => {
    navigate(`/web-practice-exam/${practiceId}`, {
      state: { subtopicId, goalName, courseName, topicId },
    });
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const WarningModal = () => {
    if (!showWarningModal) return null;

    return (
      <div className="warning-modal-overlay">
        <div className="warning-modal">
          <h2 className="warning-title">⚠️ Security Warning</h2>
          <p className="warning-message">
            {warnings === 1
              ? "First Warning: "
              : warnings === 2
              ? "Second Warning: "
              : "Final Warning: "}
            Switching tabs or windows is not allowed during the exam.
          </p>
          <p className="warning-detail">
            Warning {warnings}/3 - {3 - warnings} remaining
          </p>
          <button
            className="warning-acknowledge-btn"
            onClick={() => setShowWarningModal(false)}
            autoFocus
          >
            I Understand
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading question...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={handleBackToExam} className="back-button">
          ← Back to Exam
        </button>
      </div>
    );
  }

  if (!selectedQuestion) {
    return (
      <div className="loading-container">
        <p>Question not found...</p>
        <button onClick={handleBackToExam} className="back-button">
          ← Back to Exam
        </button>
      </div>
    );
  }

  const currentStatus = userProgress[selectedQuestion.id]?.status || "unsolved";

  return (
    <div className="web-practice-exam-question-container">
      <WarningModal />

      <div className="exam-question-header">
        <div className="header-left">
          <button className="back-button" onClick={handleBackToExam}>
            ← Back to Exam
          </button>
          <div className="question-info">
            <h2>{selectedQuestion.title}</h2>
            <div className="question-meta">
              <span className={`status ${currentStatus}`}>
                {currentStatus === "solved"
                  ? "✓ Solved"
                  : currentStatus === "attempted"
                  ? "● Attempted"
                  : "○ Unsolved"}
              </span>
              <span
                className={`difficulty ${selectedQuestion.difficulty?.toLowerCase()}`}
              >
                {selectedQuestion.difficulty || "Medium"}
              </span>
              <span className="score">
                {selectedQuestion.score || 0} points
              </span>
            </div>
          </div>
        </div>

        {examMode && (
          <div className="exam-security-info">
            <div className="timer-display">
              <span className="timer-label">Time:</span>
              <span
                className={`timer-value ${
                  timeRemaining < 300 ? "warning" : ""
                }`}
              >
                {formatTime(timeRemaining)}
              </span>
            </div>
            <div className="warnings-display">
              <span className="warnings-label">Warnings:</span>
              <span
                className={`warnings-value ${warnings >= 2 ? "critical" : ""}`}
              >
                {warnings}/3
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="exam-question-content">
        <div className="left-panel">
          <div className="question-description">
            <h3>Description</h3>
            <div className="description-content">
              <p>{selectedQuestion.description}</p>
              {selectedQuestion.descriptionDetails && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: selectedQuestion.descriptionDetails,
                  }}
                />
              )}
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
                  </div>
                  <p>{test.description}</p>
                  {!test.passed && (
                    <div className="test-details">
                      <span>Expected: {test.output}</span>
                      <span>Actual: {test.actual}</span>
                    </div>
                  )}
                </div>
              ))}
              {testResults.length === 0 && (
                <div className="no-tests">Run tests to see results</div>
              )}
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
            readOnly={!examMode || timeRemaining <= 0}
          />

          <div className="output-section">
            <h3>Test Output</h3>
            <div className="output-container">
              <pre>{output || "Run tests to see output..."}</pre>
            </div>
          </div>

          <div className="exam-question-actions">
            <button
              onClick={handleSubmit}
              className="submit-btn"
              disabled={isSubmitting || !allTestsPassed || timeRemaining <= 0}
            >
              {isSubmitting ? "Submitting..." : "Submit Question"}
            </button>
            {submitMessage && (
              <div
                className={`submit-message ${
                  submitMessage.includes("✅") ? "success" : "error"
                }`}
              >
                {submitMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebPracticeExamQuestion;
