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
  const [examFailed, setExamFailed] = useState(false);

  const iframeRef = useRef(null);
  const autoSaveTimeoutRef = useRef(null);
  const examEndTimeRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const activityMonitorRef = useRef(null);

  const {
    subtopicId,
    goalName,
    courseName,
    topicId,
    examMode,
    timeRemaining: initialTime,
  } = location.state || {};

  // Enhanced security event handlers
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === "hidden" && examMode && !examFailed) {
      handleSecurityViolation("Tab switched");
    }
  }, [examMode, examFailed]);

  const handleBlur = useCallback(() => {
    if (document.activeElement === document.body && examMode && !examFailed) {
      handleSecurityViolation("Window switched");
    }
  }, [examMode, examFailed]);

  const handleBeforeUnload = useCallback(
    (e) => {
      if (examMode && !examFailed) {
        e.preventDefault();
        e.returnValue = "Are you sure you want to leave? You will fail the exam if you leave.";
        handleSecurityViolation("Attempted to leave page");
      }
    },
    [examMode, examFailed]
  );

  const handleSecurityViolation = async (type) => {
    if (examFailed) return;

    const newWarnings = warnings + 1;
    setWarnings(newWarnings);

    const event = {
      type,
      timestamp: new Date().toISOString(),
      warningCount: newWarnings,
    };

    setSecurityEvents((prev) => [...prev, event]);

    // Save to localStorage
    const userId = user?.id || "guest";
    const savedExam = localStorage.getItem(`exam_${practiceId}_${userId}`);
    if (savedExam) {
      const examData = JSON.parse(savedExam);
      examData.warnings = newWarnings;
      examData.securityEvents = [...(examData.securityEvents || []), event];
      localStorage.setItem(
        `exam_${practiceId}_${userId}`,
        JSON.stringify(examData)
      );
    }

    if (newWarnings <= 3) {
      setShowWarningModal(true);
    }

    if (newWarnings >= 3) {
      await handleExamFailure("Maximum security warnings exceeded (3/3)");
    }
  };

  const handleExamFailure = async (reason) => {
    if (examFailed) return;
    
    setExamFailed(true);
    
    // Stop all timers
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    
    // Clear all timeouts
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    
    if (activityMonitorRef.current) {
      clearInterval(activityMonitorRef.current);
    }

    // Mark exam as failed in backend
    try {
      const userId = user?.id || "guest";
      const savedExam = localStorage.getItem(`exam_${practiceId}_${userId}`);
      
      if (savedExam) {
        const examData = JSON.parse(savedExam);
        examData.status = "failed";
        examData.failedReason = reason;
        examData.failedAt = new Date().toISOString();
        examData.timeRemaining = timeRemaining;
        examData.finalWarnings = warnings;
        
        // Save failed exam data
        localStorage.setItem(
          `exam_${practiceId}_${userId}_failed`,
          JSON.stringify(examData)
        );
        
        // Remove active exam
        localStorage.removeItem(`exam_${practiceId}_${userId}`);
      }
      
      // Notify backend about exam failure
      if (user?.id) {
        await CodingPracticeService.recordExamFailure(
          practiceId,
          user.id,
          reason,
          warnings,
          timeRemaining
        );
      }
    } catch (error) {
      console.error("Failed to record exam failure:", error);
    }

    // Show failure message
    alert(`❌ Exam Failed: ${reason}. You will be redirected.`);

    // Navigate back
    if (topicId && subtopicId) {
      navigate(`/topic/${topicId}/subtopic/${subtopicId}`, {
        state: { 
          subtopicId, 
          goalName, 
          courseName, 
          topicId,
          examFailed: true,
          failedReason: reason
        },
      });
    } else {
      navigate(-1);
    }
  };

  // Initialize enhanced security monitoring
  useEffect(() => {
    if (!examMode || examFailed) return;

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Prevent copy-paste
    const preventCopyPaste = (e) => {
      if (examMode && !examFailed) {
        e.preventDefault();
        handleSecurityViolation("Copy-paste attempt detected");
      }
    };

    document.addEventListener("copy", preventCopyPaste);
    document.addEventListener("paste", preventCopyPaste);
    document.addEventListener("cut", preventCopyPaste);

    // Prevent dev tools with enhanced detection
    const preventDevTools = (e) => {
      if (examMode && !examFailed) {
        if (
          e.key === "F12" ||
          (e.ctrlKey && e.shiftKey && e.key === "I") ||
          (e.ctrlKey && e.shiftKey && e.key === "J") ||
          (e.ctrlKey && e.key === "U") ||
          (e.metaKey && e.altKey && e.key === "I") // Mac dev tools
        ) {
          e.preventDefault();
          handleSecurityViolation("Dev tools attempt detected");
          return false;
        }
      }
    };

    document.addEventListener("keydown", preventDevTools);

    // Detect right-click context menu
    const preventContextMenu = (e) => {
      if (examMode && !examFailed) {
        e.preventDefault();
        handleSecurityViolation("Right-click context menu attempt");
      }
    };

    document.addEventListener("contextmenu", preventContextMenu);

    // Detect fullscreen exit
    const detectFullscreenChange = () => {
      if (examMode && !examFailed && !document.fullscreenElement) {
        handleSecurityViolation("Fullscreen exit detected");
      }
    };

    document.addEventListener("fullscreenchange", detectFullscreenChange);
    document.addEventListener("webkitfullscreenchange", detectFullscreenChange);
    document.addEventListener("mozfullscreenchange", detectFullscreenChange);
    document.addEventListener("MSFullscreenChange", detectFullscreenChange);

    // Activity monitoring
    let lastActivity = Date.now();
    activityMonitorRef.current = setInterval(() => {
      const now = Date.now();
      if (examMode && !examFailed && (now - lastActivity) > 60000) { // 1 minute inactivity
        handleSecurityViolation("Extended inactivity detected");
      }
    }, 30000); // Check every 30 seconds

    // Update activity on user interaction
    const updateActivity = () => {
      lastActivity = Date.now();
    };

    document.addEventListener("mousemove", updateActivity);
    document.addEventListener("keydown", updateActivity);
    document.addEventListener("click", updateActivity);
    document.addEventListener("scroll", updateActivity);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("copy", preventCopyPaste);
      document.removeEventListener("paste", preventCopyPaste);
      document.removeEventListener("cut", preventCopyPaste);
      document.removeEventListener("keydown", preventDevTools);
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("fullscreenchange", detectFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", detectFullscreenChange);
      document.removeEventListener("mozfullscreenchange", detectFullscreenChange);
      document.removeEventListener("MSFullscreenChange", detectFullscreenChange);
      document.removeEventListener("mousemove", updateActivity);
      document.removeEventListener("keydown", updateActivity);
      document.removeEventListener("click", updateActivity);
      document.removeEventListener("scroll", updateActivity);
      
      if (activityMonitorRef.current) {
        clearInterval(activityMonitorRef.current);
      }
    };
  }, [examMode, examFailed, handleVisibilityChange, handleBlur, handleBeforeUnload]);

  // Load exam data and timer with enhanced failure handling
  useEffect(() => {
    if (examMode) {
      const userId = user?.id || "guest";
      const savedExam = localStorage.getItem(`exam_${practiceId}_${userId}`);

      if (savedExam) {
        const examData = JSON.parse(savedExam);
        
        // Check if exam is already failed
        if (examData.status === "failed") {
          handleExamFailure("Exam was previously failed");
          return;
        }

        setWarnings(examData.warnings || 0);
        setSecurityEvents(examData.securityEvents || []);

        if (examData.endTime) {
          const endTime = new Date(examData.endTime);
          examEndTimeRef.current = endTime;

          // Calculate remaining time
          const updateRemainingTime = () => {
            if (examFailed) return;
            
            const now = new Date();
            const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
            setTimeRemaining(remaining);

            if (remaining <= 0) {
              handleTimeUp();
            }
          };

          updateRemainingTime();
          timerIntervalRef.current = setInterval(updateRemainingTime, 1000);

          return () => {
            if (timerIntervalRef.current) {
              clearInterval(timerIntervalRef.current);
            }
          };
        }
      }
    } else if (initialTime) {
      setTimeRemaining(initialTime);
    }
  }, [practiceId, user?.id, examMode, initialTime, examFailed]);

  const handleTimeUp = () => {
    if (examFailed) return;
    
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    
    alert("⏰ Time's up! You will be redirected to the exam summary.");
    navigate(`/web-practice-exam/${practiceId}`, {
      state: { subtopicId, goalName, courseName, topicId, timeUp: true },
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

    if (!examFailed) {
      loadQuestionData();
    }
  }, [practiceId, questionId, examFailed]);

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
          if (examMode && !examFailed) {
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
    [practiceId, selectedQuestion, examMode, user?.id, examFailed]
  );

  const updatePreview = (iframeRef) => {
    if (!iframeRef.current || examFailed) return;

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
    if (!selectedQuestion || !iframeRef.current || examFailed) return;

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

  const renderDescriptionDetails = () => {
    if (!selectedQuestion?.descriptionDetails || examFailed) return null;
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

  const handleRunTests = (iframeRef) => {
    if (examFailed) return;
    
    updatePreview(iframeRef);
    setTimeout(() => {
      runTests(iframeRef);
    }, 500);
  };

  const handleCodeChange = (newCode) => {
    if (examFailed) return;
    
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
    if (examFailed) return;
    
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
    if (examFailed) return;
    
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
    if (!showWarningModal || examFailed) return null;

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
          <p className="warning-note">
            <strong>Note:</strong> If you receive 3 warnings, your exam will be automatically failed.
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

  if (error || examFailed) {
    return (
      <div className="error-container">
        <h2>{examFailed ? "Exam Failed" : "Error"}</h2>
        <p>{examFailed ? "You have failed the exam due to security violations." : error}</p>
        <button onClick={handleBackToExam} className="back-button">
          ← Back to Exam
        </button>
      </div>
    );
  }

  const currentStatus = userProgress[selectedQuestion.id]?.status || "unsolved";

  return (
    <div className="web-practice-exam-question-container">
      <div className="web-practice-header">
        <button className="back-button" onClick={handleBackToExam}>
          ← {selectedPractice.title}
        </button>
        <div>
          <span
            className={`timer-value ${timeRemaining < 300 ? "warning" : ""}`}
          >
            {formatTime(timeRemaining)}
          </span>
          {warnings > 0 && (
            <span className="warnings-counter">
              ⚠️ Warnings: {warnings}/3
            </span>
          )}
        </div>
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

      <div className="web-practice-content" style={{ marginTop: "60px" }}>
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
                  disabled={isSubmitting || examFailed}
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
            disabled={examFailed}
          />
          <div className="output-section">
            <h3>Test Output</h3>
            <div className="output-container">
              <pre>{output || "Test results will appear here..."}</pre>
            </div>
          </div>
        </div>
      </div>
      <WarningModal />
    </div>
  );
};

export default WebPracticeExamQuestion;