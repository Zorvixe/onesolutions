"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Practice.css";
import { codingPracticesData } from "../../codingPracticesData/codingPracticesData";
import CodingPracticeService from "../../services/codingPracticeService";
import AceEditor from "react-ace";
import { useAuth } from "../../context/AuthContext";
import confetti from "canvas-confetti";

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";

const Practice = () => {
  const { practiceId, questionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { loadProgressSummary } = useAuth();

  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [theme] = useState("monokai");
  const [fontSize] = useState(16);
  const [executionResult, setExecutionResult] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);
  const [isPracticeCompleted, setIsPracticeCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Add state for save snippet modal
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [snippetName, setSnippetName] = useState("");
  const [saving, setSaving] = useState(false);
  const [mySnippets, setMySnippets] = useState([]);
  const [showSnippetsModal, setShowSnippetsModal] = useState(false);

  // Add state for resize functionality
  const [editorWidth, setEditorWidth] = useState(70);
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(50);

  const pyodideRef = useRef(null);
  const [pyodideReady, setPyodideReady] = useState(false);

  const subtopicId = location.state?.subtopicId;
  const topicId = location.state?.topicId;
  const goalName = location.state?.goalName;
  const courseName = location.state?.courseName;

  const API_URL = process.env.REACT_APP_API_BASE_URL;

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
    const deltaX = e.clientX - startX.current;
    const containerWidth =
      document.querySelector(".full-question-content-prac")?.offsetWidth ||
      window.innerWidth;
    const deltaPercent = (deltaX / containerWidth) * 100;
    let newWidth = startWidth.current + deltaPercent;
    newWidth = Math.max(30, Math.min(70, newWidth));
    setEditorWidth(newWidth);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", stopResize);
    return () => {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", stopResize);
    };
  }, [handleResize, stopResize]);

  // Reset function
  const resetToDefault = useCallback(() => {
    if (selectedQuestion) {
      // Reset to default code from the question
      const savedCode = userProgress[selectedQuestion.id]?.code;
      setCode(savedCode || selectedQuestion.defaultCode || "");
    } else {
      // If no question selected, clear the code
      setCode("");
    }

    // Clear all outputs and results
    setOutput("");
    setTestResults([]);
    setExecutionResult(null);

    // Reset input related states if they exist
    if (window.__python_input__) {
      delete window.__python_input__;
    }

    // Show a notification
    setOutput("Code has been reset to default.");
  }, [selectedQuestion, userProgress]);

  // Load snippets
  const fetchMySnippets = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${API_URL}/api/code-snippets/my-snippets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        setMySnippets(result.data.snippets || []);
      }
    } catch (error) {
      console.error("Fetch snippets error:", error);
    }
  };

  // Handle save snippet
  const handleSaveSnippet = async () => {
    if (!snippetName.trim()) {
      alert("Please enter a name for your snippet");
      return;
    }

    setSaving(true);
    try {
      const snippetData = {
        snippetName: snippetName.trim(),
        language: selectedLanguage,
        javascriptCode: code,
      };

      const response = await fetch(`${API_URL}/api/code-snippets/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(snippetData),
      });

      const result = await response.json();

      if (result.success) {
        alert("Snippet saved successfully!");
        setShowSaveModal(false);
        setSnippetName("");
        fetchMySnippets();
      } else {
        alert(`Failed to save: ${result.message}`);
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save snippet");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const loadProgress = async () => {
      try {
        setLoading(true);
        const response = await CodingPracticeService.getAllProgress();
        if (response.success) {
          const progressMap = {};
          response.data.progress.forEach((prog) => {
            progressMap[prog.question_id] = {
              status: prog.status,
              code: prog.code,
              score: prog.score,
              attempts: prog.attempts || [],
              lastAttempt: prog.last_attempt,
            };
          });
          setUserProgress(progressMap);
        }
      } catch (error) {
        console.error("Failed to load progress:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
    fetchMySnippets();
  }, []);

  const checkPracticeCompletion = useCallback(async () => {
    if (!practiceId) return;
    try {
      const response =
        await CodingPracticeService.getCompletionStatus(practiceId);
      if (response.success) {
        setIsPracticeCompleted(response.data.isCompleted);
      }
    } catch (error) {
      console.error("Failed to check practice completion:", error);
    }
  }, [practiceId]);

  useEffect(() => {
    checkPracticeCompletion();
  }, [practiceId, checkPracticeCompletion]);

  const areAllQuestionsSolved = useMemo(() => {
    if (!selectedPractice) return false;

    return selectedPractice.questions.every(
      (question) => userProgress[question.id]?.status === "solved"
    );
  }, [selectedPractice, userProgress]);

  useEffect(() => {
    const markPracticeAsComplete = async () => {
      if (
        areAllQuestionsSolved &&
        practiceId &&
        !isPracticeCompleted &&
        !isMarkingComplete
      ) {
        try {
          setIsMarkingComplete(true);
          console.log(
            "🎯 All questions solved! Marking practice as complete..."
          );

          await CodingPracticeService.completePractice(
            practiceId,
            goalName,
            courseName
          );
          await loadProgressSummary();
          await checkPracticeCompletion();

          console.log("✅ Practice marked as completed!");
        } catch (error) {
          console.error("❌ Failed to mark practice complete:", error);
        } finally {
          setIsMarkingComplete(false);
        }
      }
    };

    markPracticeAsComplete();
  }, [
    areAllQuestionsSolved,
    practiceId,
    isPracticeCompleted,
    isMarkingComplete,
    loadProgressSummary,
    goalName,
    courseName,
    checkPracticeCompletion,
  ]);

  useEffect(() => {
    const findPractice = () => {
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

      const firstLanguage = Object.keys(codingPracticesData)[0];
      const firstPractice = codingPracticesData[firstLanguage][0];
      if (firstPractice) {
        setSelectedPractice(firstPractice);
        setSelectedLanguage(firstLanguage);
        if (!practiceId) {
          navigate(`/practice/${firstPractice.id}`, { replace: true });
        }
      }
    };

    findPractice();
  }, [practiceId, navigate]);

  useEffect(() => {
    if (selectedPractice && questionId) {
      const question = selectedPractice.questions.find(
        (q) => q.id === questionId
      );
      if (question) {
        setSelectedQuestion(question);
        const savedCode = userProgress[question.id]?.code;
        setCode(savedCode || question.defaultCode || "");
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
    setExecutionResult(null);
  }, [selectedPractice, questionId, userProgress]);

  useEffect(() => {
    let mounted = true;

    const initializePyodide = async () => {
      try {
        if (!window.loadPyodide) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src =
              "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        if (!mounted) return;

        const pyodide = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/",
        });

        if (!mounted) return;

        pyodideRef.current = pyodide;
        setPyodideReady(true);
      } catch (error) {
        console.error("Failed to load Pyodide:", error);
      }
    };

    initializePyodide();

    return () => {
      mounted = false;
    };
  }, []);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);

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
    navigate(`/practice/${practiceId}/${question.id}`, {
      state: {
        subtopicId,
        goalName,
        courseName,
      },
    });
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

  const isEmptyCode = (userCode) => {
    if (!userCode) return true;
    const cleanCode = userCode
      .replace(/\/\/.*$|\/\*[\s\S]*?\*\//gm, "")
      .replace(/#.*$/gm, "")
      .replace(/\s/g, "");
    return cleanCode === "";
  };

  const updateQuestionStatus = async (questionId, passed, score) => {
    try {
      const attemptData = {
        passed,
        score: passed ? score : 0,
        timestamp: new Date().toISOString(),
      };

      const response = await CodingPracticeService.saveProgress(
        practiceId,
        questionId,
        selectedLanguage,
        code,
        passed ? "solved" : "attempted",
        passed ? score : 0,
        attemptData
      );

      if (response.success) {
        setUserProgress((prev) => ({
          ...prev,
          [questionId]: {
            status: passed ? "solved" : "attempted",
            code: code,
            lastAttempt: new Date().toISOString(),
            score: passed ? score : 0,
            attempts: prev[questionId]?.attempts
              ? [...prev[questionId].attempts, attemptData]
              : [attemptData],
          },
        }));
      }
    } catch (error) {
      console.error("Failed to update question status:", error);
    }
  };

  const runJavaScriptStandalone = useCallback(
    async (userCode, inputLines = []) => {
      setIsRunning(true);
      let result = "";
      try {
        const logs = [];
        const originalLog = console.log;
        console.log = (...args) => {
          const message = args
            .map((arg) =>
              typeof arg === "object"
                ? JSON.stringify(arg, null, 2)
                : String(arg)
            )
            .join(" ");
          logs.push(message);
          originalLog.apply(console, args);
        };

        let inputIndex = 0;
        const mockInput = (prompt = "") => {
          if (inputIndex < inputLines.length) {
            return inputLines[inputIndex++];
          }
          return "";
        };

        window.prompt = mockInput;

        try {
          const func = new Function(userCode);
          func();
        } catch (err) {
          logs.push(`Error: ${err.message}`);
        } finally {
          console.log = originalLog;
          delete window.prompt;
        }

        result =
          logs.join("\n") || "Code executed successfully (no console output)";
        return result;
      } catch (err) {
        result = `Error: ${err.message}`;
        return result;
      } finally {
        setIsRunning(false);
      }
    },
    []
  );

  const runPython = useCallback(async (userCode, inputLines = []) => {
    setIsRunning(true);
    let result = "";

    try {
      if (!pyodideRef.current) {
        return "⚠️ Python environment is still loading. Please wait...";
      }

      const pyodide = pyodideRef.current;
      let inputIndex = 0;

      pyodide.globals.set("__python_input__", () => {
        if (inputIndex < inputLines.length) {
          return inputLines[inputIndex++];
        }
        throw new Error("Input expected but not provided.");
      });

      /** 🧠 Setup Python execution environment */
      await pyodide.runPythonAsync(`
  import sys
  import io
  import builtins
  import traceback
  
  class StreamCapture(io.StringIO):
      def __init__(self):
          super().__init__()
          self.data = ""
  
      def write(self, text):
          self.data += text
          return len(text)
  
      def get(self):
          return self.data
  
  stdout_capture = StreamCapture()
  stderr_capture = StreamCapture()
  
  _original_stdout = sys.stdout
  _original_stderr = sys.stderr
  _original_input = builtins.input
  
  sys.stdout = stdout_capture
  sys.stderr = stderr_capture
  
  def custom_input(prompt=""):
      try:
          return __python_input__()
      except Exception:
          raise RuntimeError("Input expected but not provided.")
  
  builtins.input = custom_input
      `);

      /** ⏱ Execution with timeout (infinite loop protection) */
      const EXECUTION_TIMEOUT = 4000;

      const execution = pyodide.runPythonAsync(`
  try:
      exec(${JSON.stringify(userCode)})
  except Exception:
      traceback.print_exc()
      `);

      await Promise.race([
        execution,
        new Promise((_, reject) =>
          setTimeout(
            () =>
              reject(
                new Error("Execution timed out (possible infinite loop).")
              ),
            EXECUTION_TIMEOUT
          )
        ),
      ]);

      /** 📤 Collect outputs */
      const stdout = await pyodide.runPythonAsync("stdout_capture.get()");
      const stderr = await pyodide.runPythonAsync("stderr_capture.get()");

      /** 🧹 Restore environment */
      await pyodide.runPythonAsync(`
  sys.stdout = _original_stdout
  sys.stderr = _original_stderr
  builtins.input = _original_input
      `);

      /** 🎯 Format final output */
      let finalOutput = "";

      if (stdout.trim()) {
        finalOutput += `${stdout.trim()}\n`;
      }

      if (stderr.trim()) {
        const cleanedError = stderr
          .split("\n")
          .filter((line) => !line.includes('File "<exec>"'))
          .map((line) => line.replace(/File "<string>"/g, 'File "main.py"'))
          .join("\n");

        finalOutput += cleanedError;
      }

      result =
        finalOutput.trim() ||
        "✅ Python code executed successfully (no output).";
    } catch (err) {
      result = `🔥 Execution Failed\n\n${err.message}`;
    } finally {
      setIsRunning(false);
      return result;
    }
  }, []);

  const executeCode = async (userCode, testCaseInput) => {
    const inputLines = testCaseInput
      ? testCaseInput.split("\n").filter((line) => line.trim() !== "")
      : [];

    let result = "";
    try {
      if (selectedLanguage === "python") {
        result = await runPython(userCode, inputLines);
      } else if (selectedLanguage === "javascript") {
        result = await runJavaScriptStandalone(userCode, inputLines);
      } else {
        result = "Unsupported language";
      }
    } catch (error) {
      result = `Execution error: ${error.message}`;
    }

    return result;
  };

  const handleRunCode = async () => {
    if (!selectedQuestion) return;

    if (isEmptyCode(code)) {
      setOutput("❌ No code to execute. Please write your solution.");
      setIsRunning(false);
      return;
    }

    setIsRunning(true);
    setOutput("Running code...");
    setExecutionResult(null);
    setTestResults([]);

    try {
      const results = [];
      let passedCount = 0;

      for (let i = 0; i < selectedQuestion.testCases.length; i++) {
        const testCase = selectedQuestion.testCases[i];
        const actualOutput = await executeCode(code, testCase.input);

        const cleanActualOutput = actualOutput.trim();
        const cleanExpectedOutput = testCase.output.trim();

        const passed = cleanActualOutput === cleanExpectedOutput;

        if (passed) passedCount++;

        results.push({
          ...testCase,
          passed,
          actualOutput: cleanActualOutput,
          expectedOutput: cleanExpectedOutput,
          id: i,
        });
      }

      setTestResults(results);
      const newExecutionResult = {
        total: selectedQuestion.testCases.length,
        passed: passedCount,
        failed: selectedQuestion.testCases.length - passedCount,
      };
      setExecutionResult(newExecutionResult);

      setOutput(
        `Execution completed: ${passedCount}/${selectedQuestion.testCases.length} test cases passed`
      );
    } catch (error) {
      setOutput(`Error during execution: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const playSuccessSound = () => {
    try {
      const audio = new Audio("/sounds/success-sound.mp3");
      audio.volume = 0.2;
      audio.play().catch((e) => {
        console.log(
          "Audio play failed, likely due to browser autoplay policy:",
          e
        );
      });
    } catch (error) {
      console.warn("Could not play success sound:", error);
    }
  };

  const celebrateSuccess = () => {
    playSuccessSound();

    const duration = 1800;
    const end = Date.now() + duration;
    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleSubmitCode = async () => {
    if (!selectedQuestion) return;

    if (isEmptyCode(code)) {
      setOutput("❌ Cannot submit empty code. Please write your solution.");
      setIsRunning(false);
      return;
    }

    setIsRunning(true);
    setOutput("Submitting code...");
    setTestResults([]);
    setExecutionResult(null);

    try {
      const results = [];
      let passedCount = 0;

      for (let i = 0; i < selectedQuestion.testCases.length; i++) {
        const testCase = selectedQuestion.testCases[i];
        const actualOutput = await executeCode(code, testCase.input);

        const cleanActualOutput = actualOutput.trim();
        const cleanExpectedOutput = testCase.output.trim();

        const passed = cleanActualOutput === cleanExpectedOutput;

        if (passed) passedCount++;

        results.push({
          ...testCase,
          passed,
          actualOutput: cleanActualOutput,
          expectedOutput: cleanExpectedOutput,
          id: i,
        });
      }

      const allPassed = passedCount === selectedQuestion.testCases.length;

      setTestResults(results);
      const newExecutionResult = {
        total: selectedQuestion.testCases.length,
        passed: passedCount,
        failed: selectedQuestion.testCases.length - passedCount,
      };
      setExecutionResult(newExecutionResult);

      await updateQuestionStatus(
        selectedQuestion.id,
        allPassed,
        selectedQuestion.score
      );

      if (allPassed) {
        const successMessage = `✅ All test cases passed! Submission successful.`;
        setOutput(successMessage);
        celebrateSuccess();

        setToastMessage(
          `✅ Hurrah! ${passedCount}/${selectedQuestion.testCases.length} Test Cases Passed`
        );
        setShowSuccessToast(true);

        setTimeout(() => {
          setShowSuccessToast(false);
        }, 2200);

        const allQuestionsSolved = selectedPractice.questions.every(
          (question) => {
            if (question.id === selectedQuestion.id) {
              return true;
            }
            return userProgress[question.id]?.status === "solved";
          }
        );

        if (allQuestionsSolved && practiceId && !isPracticeCompleted) {
          setOutput(
            "✅ All test cases passed! 🎉 All questions in this practice are now solved! Marking practice as complete..."
          );

          setIsMarkingComplete(true);
          await CodingPracticeService.completePractice(
            practiceId,
            goalName,
            courseName
          );
          await loadProgressSummary();
          await checkPracticeCompletion();
          setIsMarkingComplete(false);

          setOutput(
            "✅ All test cases passed! 🎉 Practice completed successfully!"
          );
        }
      } else {
        setOutput(
          `❌ Submission failed: ${passedCount}/${selectedQuestion.testCases.length} test cases passed.`
        );
      }
    } catch (error) {
      setOutput(`Error during submission: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const getQuestionStatus = (questionId) => {
    return userProgress[questionId]?.status || "unsolved";
  };

  const getQuestionAttempts = (questionId) => {
    return userProgress[questionId]?.attempts || [];
  };

  const practices = codingPracticesData[selectedLanguage] || [];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!selectedPractice) {
    return (
      <div className="cod-loader">
        <h3>Practice not found</h3>
      </div>
    );
  }

  if (questionId && selectedQuestion) {
    const currentStatus = getQuestionStatus(selectedQuestion.id);

    return (
      <div className="practice-full-question-prac">
        {showSuccessToast && (
          <div className="success-toast-center">{toastMessage}</div>
        )}

        <div className="full-question-header-prac">
          <button className="back-button-prac" onClick={handleBackToPractice}>
            ←{" "}
            <span className="practice-name-prac">{selectedPractice.title}</span>
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

        <div className="full-question-content-prac">
          <div
            className="full-question-detail-prac"
            style={{ width: `${100 - editorWidth}%` }}
          >
            <div className="description-name-header-prac">
              Description
            </div>

            <div className="desc-prac">
              <div className="description-content-prac">
                <span className="practice-name-prac">
                  {selectedQuestion.title}
                </span>
                <p>{selectedQuestion.description}</p>
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
                <div className="test-cases-header-prac">
                  <h3>Test Cases</h3>
                </div>
                <div className="test-cases-grid-prac">
                  {selectedQuestion.testCases
                    .filter((testCase) => testCase.visible)
                    .map((testCase, visibleIndex) => {
                      const testResult = testResults[visibleIndex];

                      return (
                        <div key={visibleIndex} className="test-case-prac">
                          <div className="test-case-header-prac">
                            <span className="test-case-number-prac">
                              Case {visibleIndex + 1}
                            </span>
                            <span className="">
                              {testResult && (
                                <div
                                  className={`test-result-prac ${
                                    testResult.passed
                                      ? "passed-prac"
                                      : "failed-prac"
                                  }`}
                                >
                                  {testResult.passed ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="18"
                                      height="18"
                                      fill="green"
                                      className="bi bi-check-circle-fill"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                  ) : (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="18"
                                      height="18"
                                      fill="red"
                                      className="bi bi-x-circle-fill"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                    </svg>
                                  )}
                                </div>
                              )}
                            </span>
                          </div>
                          <div className="test-case-content-prac">
                            <div className="test-input-prac">
                              <label>Input:</label>
                              <div className="code-block-prac small-prac">
                                <pre>{testCase.input || "No input"}</pre>
                              </div>
                            </div>
                            <div>
                              <div
                                className={`output-section ${
                                  testResult ? "with-result" : "only-expected"
                                }`}
                              >
                                <div className="expected-output">
                                  <span className="output-label-prac">
                                    Expected Output:
                                  </span>
                                  <div
                                    className="code-block-prac small-prac"
                                    style={{ marginTop: "5px" }}
                                  >
                                    <pre>{testCase.output}</pre>
                                  </div>
                                </div>
                                {testResult && (
                                  <div className="test-execution-result-prac">
                                    <div className="output-comparison-prac">
                                      <div className="output-row-prac">
                                        <span className="output-label-prac">
                                          Your Output:
                                        </span>
                                        <div
                                          className={`code-block-prac small-prac ${
                                            testResult.passed
                                              ? "success-prac"
                                              : "error-prac"
                                          }`}
                                        >
                                          <pre>
                                            {testResult.actualOutput ||
                                              "(empty)"}
                                          </pre>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          {/* Resizer */}
          <div className="resizer-prac" onMouseDown={startResize} />

          <div
            className="full-code-editor-section-prac"
            style={{ width: `${editorWidth}%` }}
          >
            <div className="editor-header-prac">
              <div className="editor-title-prac">
                <div className="editor-info-prac">
                  {selectedLanguage === "python"
                    ? "Python 3.10"
                    : selectedLanguage === "javascript"
                      ? "JavaScript"
                      : "Other"}{" "}
                </div>
              </div>
              <button
                className="save-snippet-button-prac"
                onClick={resetToDefault}
                title="Reset"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="#64748b"
                  className="bi bi-arrow-clockwise"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                  />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                </svg>
              </button>
              <button
                className="save-snippet-button-prac"
                onClick={() => setShowSaveModal(true)}
                title="Save Snippet"
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 16 16"
                  fill="none"
                  color="#64748b"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.8 3.2C3.64087 3.2 3.48826 3.26321 3.37574 3.37574C3.26321 3.48826 3.2 3.64087 3.2 3.8V12.2C3.2 12.3591 3.26321 12.5117 3.37574 12.6243C3.48826 12.7368 3.64087 12.8 3.8 12.8H12.2C12.3591 12.8 12.5117 12.7368 12.6243 12.6243C12.7368 12.5117 12.8 12.3591 12.8 12.2V5.84853L10.1515 3.2H3.8ZM2.52721 2.52721C2.86477 2.18964 3.32261 2 3.8 2H10.4C10.5591 2 10.7117 2.06321 10.8243 2.17574L13.8243 5.17574C13.9368 5.28826 14 5.44087 14 5.6V12.2C14 12.6774 13.8104 13.1352 13.4728 13.4728C13.1352 13.8104 12.6774 14 12.2 14H3.8C3.32261 14 2.86477 13.8104 2.52721 13.4728C2.18964 13.1352 2 12.6774 2 12.2V3.8C2 3.32261 2.18964 2.86477 2.52721 2.52721Z"
                    fill="#64748b"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.33325 9.20033C5.33325 8.90577 5.55711 8.66699 5.83325 8.66699H10.8333C11.1094 8.66699 11.3333 8.90577 11.3333 9.20033V13.467C11.3333 13.7615 11.1094 14.0003 10.8333 14.0003C10.5571 14.0003 10.3333 13.7615 10.3333 13.467V9.73366H6.33325V13.467C6.33325 13.7615 6.10939 14.0003 5.83325 14.0003C5.55711 14.0003 5.33325 13.7615 5.33325 13.467V9.20033Z"
                    fill="#64748b"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.86659 2C6.16114 2 6.39992 2.2132 6.39992 2.47619V4.38095H10.1333C10.4278 4.38095 10.6666 4.59415 10.6666 4.85714C10.6666 5.12014 10.4278 5.33333 10.1333 5.33333H5.86659C5.57203 5.33333 5.33325 5.12014 5.33325 4.85714V2.47619C5.33325 2.2132 5.57203 2 5.86659 2Z"
                    fill="#64748b"
                  ></path>
                </svg>
              </button>
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
                highlightActiveLine={false}
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
                  lineHeight: 1.5,
                }}
                editorProps={{
                  $blockScrolling: true,
                }}
              />
            </div>

            <div className="editor-controls-prac">
              {executionResult && (
                <div className="execution-summary-prac">
                  <span className="summary-text-prac">
                    {executionResult.passed}/{executionResult.total} test cases
                    passed
                  </span>
                  <div className="progress-bar-prac">
                    <div
                      className="progress-fill-prac"
                      style={{
                        width: `${
                          (executionResult.passed / executionResult.total) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
              <div className="editor-actions-prac">
                <button
                  className="run-button-prac"
                  onClick={handleRunCode}
                  disabled={
                    isRunning ||
                    (selectedLanguage === "python" && !pyodideReady)
                  }
                >
                  {isRunning ? <span className="loader-prac"></span> : "Run"}
                </button>
                <button
                  className="submit-button-prac"
                  onClick={handleSubmitCode}
                  disabled={isRunning || isEmptyCode(code)}
                >
                  {isRunning ? <span className="loader-prac"></span> : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Snippet Modal */}
        {showSaveModal && (
          <div className="modal-overlay-prac">
            <div className="modal-prac">
              <div className="modal-header-prac">
                <h3>Save Code Snippet</h3>
                <button onClick={() => setShowSaveModal(false)}>×</button>
              </div>
              <div className="modal-body-prac">
                <div className="form-group-prac">
                  <label htmlFor="snippetName">Snippet Name</label>
                  <input
                    type="text"
                    id="snippetName"
                    value={snippetName}
                    onChange={(e) => setSnippetName(e.target.value)}
                    placeholder="Enter snippet name"
                    autoFocus
                  />
                </div>
                <div className="form-group-prac">
                  <label>Language</label>
                  <div className="language-display-prac">
                    {selectedLanguage === "python" && (
                      <img
                        src="/assets/python_logo.png"
                        alt="Python"
                        width="24"
                        height="24"
                      />
                    )}
                    {selectedLanguage === "javascript" && (
                      <img
                        src="/assets/javascript_logo.png"
                        alt="JavaScript"
                        width="24"
                        height="24"
                      />
                    )}
                    {selectedLanguage === "java" && (
                      <img
                        src="/assets/java_logo.png"
                        alt="Java"
                        width="24"
                        height="24"
                      />
                    )}
                    {selectedLanguage === "sql" && (
                      <img
                        src="/assets/sql_logo.png"
                        alt="SQL"
                        width="24"
                        height="24"
                      />
                    )}
                    <span className="language-name-prac">
                      {selectedLanguage === "python"
                        ? "Python"
                        : selectedLanguage === "javascript"
                          ? "JavaScript"
                          : selectedLanguage === "java"
                            ? "Java"
                            : selectedLanguage === "sql"
                              ? "SQL"
                              : selectedLanguage}
                    </span>
                  </div>
                </div>
                <div className="code-preview-prac">
                  <label>Code Preview</label>
                  <div className="code-preview-content-prac">
                    <pre>
                      {code.substring(0, 200)}
                      {code.length > 200 ? "..." : ""}
                    </pre>
                  </div>
                </div>
              </div>
              <div className="modal-footer-prac">
                <button
                  className="btn-secondary-prac"
                  onClick={() => setShowSaveModal(false)}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary-prac"
                  onClick={handleSaveSnippet}
                  disabled={saving || !snippetName.trim()}
                >
                  {saving ? "Saving..." : "Save Snippet"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="practice-container-prac">
      <div className="practice-content-prac">
        <div className="practice-sidebar-prac">
          <h3>Coding Practices</h3>
          <div className="language-selector-prac">
            <select value={selectedLanguage} onChange={handleLanguageChange}>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
              <option value="sql">SQL</option>
            </select>
          </div>
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
                    practice.questions.filter(
                      (q) => getQuestionStatus(q.id) === "solved"
                    ).length
                  }{" "}
                  / {practice.questions.length} solved
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="main-content-coding-prac">
          {selectedPractice && (
            <div className="questions-section-prac">
              <div className="questions-header-prac">
                <div className="questions-title-section">
                  <h3>Questions - {selectedPractice.title}</h3>
                </div>
                <div className="questions-stats-prac">
                  {selectedPractice.questions.length} questions
                  {areAllQuestionsSolved && (
                    <span className="all-solved-indicator"> • All Solved!</span>
                  )}
                </div>
              </div>
              <div className="questions-table-prac">
                <table>
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Question</th>
                      <th>Test Cases</th>
                      <th>Difficulty</th>
                      <th>Score</th>
                      <th>Last Attempt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPractice.questions.map((question) => {
                      const status = getQuestionStatus(question.id);
                      const attempts = getQuestionAttempts(question.id);
                      const lastAttempt =
                        attempts.length > 0
                          ? attempts[attempts.length - 1]
                          : null;

                      return (
                        <tr
                          key={question.id}
                          className={`question-row-prac ${
                            status === "solved"
                              ? "solved-prac"
                              : status === "attempted"
                                ? "attempted-prac"
                                : ""
                          }`}
                          onClick={() => handleQuestionSelect(question)}
                        >
                          <td className="status-cell-prac">
                            <span className={`status-indicator-prac ${status}`}>
                              {status === "solved"
                                ? "✓"
                                : status === "attempted"
                                  ? "●"
                                  : "○"}
                            </span>
                          </td>
                          <td className="question-title-cell-prac">
                            <div className="question-title-main-prac">
                              {question.title}
                            </div>
                          </td>
                          <td className="difficulty-cell-prac">
                            <span className="difficulty-badge-prac">
                              {question.testCases.length}
                            </span>
                          </td>

                          <td className="difficulty-cell-prac">
                            <span
                              className={`difficulty-badge-prac ${question.difficulty.toLowerCase()}`}
                            >
                              {question.difficulty}
                            </span>
                          </td>
                          <td className="score-cell-prac">
                            {lastAttempt
                              ? `${lastAttempt.score}/${question.score}`
                              : `0/${question.score}`}{" "}
                            pts
                          </td>
                          <td className="attempts-cell-prac">
                            {lastAttempt ? (
                              <div className="attempts-info-prac">
                                <span className="attempts-count-prac">
                                  {lastAttempt.passed ? "Passed" : "Failed"}
                                </span>
                                <span className="attempts-date-prac">
                                  {new Date(
                                    lastAttempt.timestamp
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            ) : (
                              <span className="no-attempts-prac">
                                Not attempted
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
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
