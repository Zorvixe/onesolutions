"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { sqlCodingPracticesData } from "../../codingPracticesData/sqlCodingPracticesData";
import CodingPracticeService from "../../services/codingPracticeService";
import { useAuth } from "../../context/AuthContext";
import CodePlayground from "../../CodePlayground/CodePlayground";
import validateSqlTest from "./validateSqlTest";
import "./sqlPracticee.css";
import "../../codingPracticesData/codingpracticesweb.css";
import "../../Python/IntroductiontoPython/Pro_W_P_CS_1.css";
import confetti from "canvas-confetti";

const SQLPractice = () => {
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
    sql: "",
  });
  const [allTestsPassed, setAllTestsPassed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [debugInfo, setDebugInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [tweakIncrease, setTweakIncrease] = useState(0);
  const confettiRef = useRef([]);
  const autoSaveTimeoutRef = useRef(null);
  const [isJustSolved, setIsJustSolved] = useState(false);
  const [audio, setAudio] = useState(null);
  const [showTestCases, setShowTestCases] = useState(false);
  const [queryResult, setQueryResult] = useState(null);
  const [executionError, setExecutionError] = useState(null);

  const subtopicId = location.state?.subtopicId;
  const topicId = location.state?.topicId;
  const goalName = location.state?.goalName;
  const courseName = location.state?.courseName;

  // Add state for resize functionality
  const [editorWidth, setEditorWidth] = useState(65);
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(50);

  const MIN_LEFT_PANEL_PX = 50;
  const MAX_RIGHT_PANEL_PERCENT = 95;

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
        console.error("Failed to load progress:", response.error);
      }
    } catch (error) {
      console.error("Failed to load progress:", error);
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
          "sql",
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
        console.error("Auto-save failed:", error);
        return { success: false, error: error.message };
      }
    },
    [practiceId, selectedQuestion]
  );

  // Resize functionality
  const startResize = useCallback(
    (e) => {
      isResizing.current = true;
      startX.current = e.clientX;
      startWidth.current = editorWidth;
      document.body.style.cursor = "ew-resize";
      document.body.style.userSelect = "none";
    },
    [editorWidth]
  );

  const stopResize = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  const handleResize = useCallback((e) => {
    if (!isResizing.current) return;

    // 👈 INVERTED HERE
    const deltaX = startX.current - e.clientX;

    const container = document.querySelector(".sql-practice-content");
    const containerWidth = container?.offsetWidth || window.innerWidth;

    const deltaPercent = (deltaX / containerWidth) * 100;
    let newEditorWidth = startWidth.current + deltaPercent;

    const minLeftPercent = (MIN_LEFT_PANEL_PX / containerWidth) * 100;
    const maxEditorWidth = 100 - minLeftPercent;

    newEditorWidth = Math.max(0, Math.min(maxEditorWidth, newEditorWidth));

    setEditorWidth(newEditorWidth);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", stopResize);
    return () => {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", stopResize);
    };
  }, [handleResize, stopResize]);

  useEffect(() => {
    const loadPracticeData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const practice = sqlCodingPracticesData.sql.find(
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
          sql: question.defaultCode?.sql || "",
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
                sql: parsedCode.sql || initialCode.sql,
              };
            }
          } catch (error) {
            console.error("Failed to parse saved code:", error);
          }
        }

        setCurrentCode(initialCode);
        setIsJustSolved(false);
      } catch (error) {
        console.error("Error loading practice data:", error);
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
          "sql",
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
          console.error("Failed to save progress:", response.message);
          return { success: false, error: response.message };
        }
      } catch (error) {
        console.error("Failed to update question status:", error);
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
      // Cleanup confetti
      confettiRef.current.forEach((conf) => {
        if (conf && conf.parentNode) {
          conf.parentNode.removeChild(conf);
        }
      });
    };
  }, []);

  const executeQuery = async () => {
    setIsRunning(true);
    setOutput("");
    setQueryResult(null);
    setExecutionError(null);
    setTestResults([]);

    try {
      // Simulate SQL execution for now
      // In a real implementation, you would connect to a SQL execution service
      const result = await validateSqlTest(selectedQuestion, currentCode.sql);

      if (result.success) {
        setOutput(result.output || "Query executed successfully");
        setQueryResult(result.data);

        // If there are test cases, run them
        if (
          selectedQuestion.testCases &&
          selectedQuestion.testCases.length > 0
        ) {
          runTests(result);
        }
      } else {
        setExecutionError(result.error);
        setOutput(`Error: ${result.error}`);
      }
    } catch (error) {
      setExecutionError(error.message);
      setOutput(`Execution Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const runTests = async (executionResult) => {
    if (!selectedQuestion) return;

    setIsRunning(true);
    setOutput("Running tests...");
    setSubmitMessage("");
    setDebugInfo("");

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

        try {
          const result = validateSqlTest(
            testCase,
            currentCode.sql,
            executionResult
          );
          passed = result.passed;
          actual = result.actual || "";
        } catch (error) {
          console.error(`Test ${testCase.id} error:`, error);
          passed = false;
          actual = `Error: ${error.message}`;
        }

        if (passed) passedCount++;

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
      console.error("Error running tests:", error);
      setOutput(`Error running tests: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleRunTests = () => {
    console.log("Running SQL tests...");
    setShowTestCases(true);
    executeQuery();
  };

  const handleCodeChange = (newCode) => {
    if (newCode && typeof newCode === "object") {
      setCurrentCode(newCode);
      setAllTestsPassed(false);
      setSubmitMessage("");
      setQueryResult(null);
      setExecutionError(null);

      if (isJustSolved) {
        setIsJustSolved(false);
        return;
      }

      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }

      autoSaveTimeoutRef.current = setTimeout(() => {
        if (selectedQuestion) {
          const currentStatus = getQuestionStatus(selectedQuestion.id);
          if (currentStatus !== "solved") {
            autoSaveCode(selectedQuestion.id, newCode, false);
          }
        }
      }, 2000);
    }
  };

  // UPDATED: Improved createConfetti function
  const createConfetti = () => {
    const container = document.querySelector(".confetti-container");
    if (!container) {
      console.warn("Confetti container not found");
      return;
    }

    // Clear existing confetti
    confettiRef.current.forEach((conf) => {
      if (conf && conf.parentNode) {
        conf.parentNode.removeChild(conf);
      }
    });
    confettiRef.current = [];

    const colors = [
      "#FFD700",
      "#FF6B6B",
      "#4ECDC4",
      "#FFDE59",
      "#667eea",
      "#764ba2",
      "#ff9a9e",
      "#a18cd1",
      "#fbc2eb",
      "#a1c4fd",
    ];

    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.position = "absolute";
      confetti.style.zIndex = "9999";
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `${Math.random() * 100}%`;
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = `${Math.random() * 12 + 6}px`;
      confetti.style.height = confetti.style.width;
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";

      // Create animation
      const animationName = `confettiFall_${Date.now()}_${i}`;
      const animationDuration = Math.random() * 3 + 2;

      // Create style for animation
      const style = document.createElement("style");
      style.innerHTML = `
        @keyframes ${animationName} {
          0% {
            transform: translate(0, -20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(${Math.random() * 100 - 50}px, 100vh) rotate(${
              Math.random() * 720
            }deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);

      confetti.style.animation = `${animationName} ${animationDuration}s linear forwards`;
      confetti.style.animationDelay = `${Math.random() * 1}s`;

      container.appendChild(confetti);
      confettiRef.current.push(confetti);

      // Remove style element after animation
      setTimeout(
        () => {
          if (style.parentNode) {
            style.parentNode.removeChild(style);
          }
        },
        animationDuration * 1000 + 1000
      );
    }
  };

  // UPDATED: Improved playSuccessSound function
  const playSuccessSound = () => {
    try {
      // Initialize audio only when needed (on submit)
      if (!audio) {
        const newAudio = new Audio("/sounds/success-sound.mp3");
        newAudio.volume = 0.2;
        newAudio.preload = "auto";
        setAudio(newAudio);

        // Play the sound
        newAudio.currentTime = 0;
        const playPromise = newAudio.play();

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log(
              "Audio play failed, trying user interaction fallback:",
              error
            );
            // Create a fallback beep sound using Web Audio API
            playFallbackSound();
          });
        }
      } else {
        // If audio already exists, play it
        audio.currentTime = 0;
        const playPromise = audio.play();

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log(
              "Audio play failed, trying user interaction fallback:",
              error
            );
            // Create a fallback beep sound using Web Audio API
            playFallbackSound();
          });
        }
      }
    } catch (error) {
      console.warn("Could not play success sound:", error);
      playFallbackSound();
    }
  };

  // NEW: Fallback sound using Web Audio API
  const playFallbackSound = () => {
    try {
      // Check if AudioContext is available
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) {
        console.log("Web Audio API not supported");
        return;
      }

      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.1);
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0.3,
        audioContext.currentTime + 0.05
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 1
      );

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 1);

      // Clean up after sound completes
      setTimeout(() => {
        audioContext.close();
      }, 2000);
    } catch (error) {
      console.log("Fallback sound failed:", error);
    }
  };

  // UPDATED: Improved celebrateSuccess function
  const celebrateSuccess = () => {
    // Play sound first (only when this function is called)
    playSuccessSound();

    // Then trigger confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      // Launch confetti from left edge
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.5 },
        colors: ["#FFD700", "#FF6B6B", "#4ECDC4", "#FFDE59"],
      });

      // Launch confetti from right edge
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.5 },
        colors: ["#667eea", "#764ba2", "#ff9a9e", "#a18cd1"],
      });

      // Launch some from the top
      if (Math.random() > 0.7) {
        confetti({
          particleCount: 5,
          angle: 90,
          spread: 100,
          origin: { x: 0.5, y: 0 },
          colors: ["#FFD700", "#4ECDC4", "#FF6B6B"],
        });
      }

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // Start the animation
    frame();

    // Add an extra burst after 500ms
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });
    }, 500);
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

        setIsJustSolved(true);

        if (autoSaveTimeoutRef.current) {
          clearTimeout(autoSaveTimeoutRef.current);
        }

        setShowCelebrationModal(true);

        // Trigger both celebrations
        setTimeout(() => {
          createConfetti();
          celebrateSuccess(); // This is where sound will play
        }, 100);

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
      console.error("Submit error:", error);
      setSubmitMessage(`❌ Error submitting solution: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeCelebrationModal = () => {
    setShowCelebrationModal(false);
    // Clean up confetti
    confettiRef.current.forEach((conf) => {
      if (conf && conf.parentNode) {
        conf.parentNode.removeChild(conf);
      }
    });
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

  const renderQueryResult = () => {
    if (!queryResult) return null;

    if (queryResult.error) {
      return (
        <div className="sql-error-output">
          <h4>Error:</h4>
          <pre>{queryResult.error}</pre>
        </div>
      );
    }

    if (queryResult.results && queryResult.results.length > 0) {
      return (
        <div className="sql-result-output">
          <h4>Query Result:</h4>
          <div className="sql-result-table">
            <table>
              <thead>
                <tr>
                  {queryResult.columns?.map((col, idx) => (
                    <th key={idx}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queryResult.results.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {queryResult.columns?.map((col, colIdx) => (
                      <td key={colIdx}>{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="sql-row-count">
            {queryResult.rowCount} row(s) returned
          </p>
        </div>
      );
    }

    return (
      <div className="sql-success-output">
        <p>✓ Query executed successfully.</p>
        <p>{queryResult.rowCount || 0} row(s) affected.</p>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
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
            <p>You've successfully solved this SQL challenge!</p>
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
    <div className="sql-practice-container">
      <CelebrationModal />
      <div className="full-question-header-prac">
        <button className="back-button-prac" onClick={handleBackToPractice}>
          ← <span className="practice-name-prac">{selectedPractice.title}</span>
        </button>
        <div className="full-question-title-prac">
          <div className="full-question-meta-prac">
            <span
              className={`status-indicator-prac ${currentStatus} large-prac`}
            >
              {currentStatus === "solved"
                ? "✓ Solved"
                : currentStatus === "attempted"
                  ? "● Attempted"
                  : "○ Unsolved"}
            </span>
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
      <div className="sql-practice-content">
        <div
          className={`left-panel ${100 - editorWidth < 8 ? "collapsed" : ""}`}
          style={{ width: `${100 - editorWidth}%` }}
        >
          <div className="question-description">
            <div className="question-description-header">Description</div>
            <div className="question-description-content">
              <h2>{selectedQuestion.title}</h2>
              <p>{selectedQuestion.description}</p>
              <div className="desc-question-full-view">
                {renderDescriptionDetails()}
              </div>
            </div>
          </div>
        </div>

        {/* Resizer */}
        <div className="resizer-prac" onMouseDown={startResize} />

        <div className="right-panel">
          <CodePlayground
            customHeight="calc(90vh - 90px)"
            initialLanguage="sql"
            initialCode={currentCode}
            autoRun={false}
            onCodeChange={handleCodeChange}
            customRunHandler={() => handleRunTests()}
            runButtonText="Run Query & Test"
          />

          {/* Display SQL execution results */}
          {output && (
            <div className="sql-output-preview">
              <div className="sql-output-header">
                <h3>Query Output</h3>
              </div>
              <div className="sql-output-content">
                <pre className="sql-output-text">{output}</pre>
                {renderQueryResult()}
              </div>
            </div>
          )}
        </div>

        {showTestCases && (
          <div className="test-cases">
            <div className="test-cases-header">
              <div className="test-cases-head-row">
                <h3>Test Cases</h3>
                <button
                  className="hide-test-btn"
                  onClick={() => setShowTestCases(false)}
                  title="Hide test cases"
                >
                  ✕
                </button>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span className="tests-count">
                  {testResults.filter((t) => t.passed).length}/
                  {testResults.length} Passed
                </span>
              </div>
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
                        {test.passed ? "✓" : "✗"}
                        <p className="test-description">{test.description}</p>
                      </span>
                      {test.actual && !test.passed && (
                        <div className="test-actual">Actual: {test.actual}</div>
                      )}
                    </div>
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
                  disabled={isSubmitting || !allTestsPassed}
                >
                  {isSubmitting ? (
                    <span className="btn-loader"></span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SQLPractice;
