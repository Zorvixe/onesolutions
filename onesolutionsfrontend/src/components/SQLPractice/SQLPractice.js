"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { sqlCodingPracticesData } from "../../codingPracticesData/sqlCodingPracticesData";
import CodingPracticeService from "../../services/codingPracticeService";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import { useAuth } from "../../context/AuthContext";
import validateSqlTest from "./validateSqlTest";
import { mockExecuteSql } from "./validateSqlTest";
import "./sqlPracticee.css";
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
  const [currentCode, setCurrentCode] = useState({ sql: "" });
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
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);
  const [isPracticeCompleted, setIsPracticeCompleted] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [tableData, setTableData] = useState(null);
  const [databaseTables, setDatabaseTables] = useState({});
  // Editor state for SQL
  const [code, setCode] = useState("");
  const [theme] = useState("monokai");
  const [fontSize] = useState(16);
  const [executionResult, setExecutionResult] = useState(null);

  // Add state for save snippet modal
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [snippetName, setSnippetName] = useState("");
  const [saving, setSaving] = useState(false);
  const [mySnippets, setMySnippets] = useState([]);

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

  const API_URL = process.env.REACT_APP_API_BASE_URL;

  const questions = selectedPractice?.questions || [];

  const currentQuestionIndex = useMemo(() => {
    if (!selectedQuestion) return -1;
    return questions.findIndex((q) => q.id === selectedQuestion.id);
  }, [questions, selectedQuestion]);

  const hasPrevQuestion = currentQuestionIndex > 0;
  const hasNextQuestion = currentQuestionIndex < questions.length - 1;

  const handlePrevQuestion = () => {
    if (!hasPrevQuestion) return;

    const prevQuestion = questions[currentQuestionIndex - 1];
    navigate(`/sql-practice/${practiceId}/${prevQuestion.id}`, {
      state: { subtopicId, goalName, courseName },
    });
  };

  const handleNextQuestion = () => {
    if (!hasNextQuestion) return;

    const nextQuestion = questions[currentQuestionIndex + 1];
    navigate(`/sql-practice/${practiceId}/${nextQuestion.id}`, {
      state: { subtopicId, goalName, courseName },
    });
  };

  const loadProgress = useCallback(async () => {
    try {
      const response = await CodingPracticeService.getAllProgress();
      if (response.success) {
        const progressMap = {};
        if (response.data?.progress && Array.isArray(response.data.progress)) {
          response.data.progress.forEach((prog) => {
            if (prog && prog.question_id) {
              progressMap[prog.question_id] = {
                status: prog.status,
                code: prog.code,
                score: prog.score,
                attempts: prog.attempts || [],
                lastAttempt: prog.last_attempt,
              };
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

  const autoSaveCode = useCallback(
    async (questionId, code, isSolved = false) => {
      try {
        const codeContent = JSON.stringify({ sql: code });
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
              lastAttempt: new Date().toISOString(),
              attempts: prev[questionId]?.attempts
                ? [
                    ...prev[questionId].attempts,
                    {
                      passed: isSolved,
                      score: score,
                      timestamp: new Date().toISOString(),
                    },
                  ]
                : [
                    {
                      passed: isSolved,
                      score: score,
                      timestamp: new Date().toISOString(),
                    },
                  ],
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

  // Reset function for SQL
  const resetToDefault = useCallback(() => {
    if (selectedQuestion) {
      const savedCode = userProgress[selectedQuestion.id]?.code;
      if (selectedQuestion.defaultCode) {
        if (typeof selectedQuestion.defaultCode === "object") {
          setCode(savedCode || selectedQuestion.defaultCode.sql || "");
        } else {
          setCode(savedCode || selectedQuestion.defaultCode || "");
        }
      } else {
        setCode(savedCode || "");
      }
    } else {
      setCode("");
    }

    setOutput("");
    setTestResults([]);
    setExecutionResult(null);
    setQueryResult(null);
    setExecutionError(null);
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
        language: "sql",
        sqlCode: code,
      };

      console.log("Saving SQL snippet data:", snippetData);

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

        // Initialize tables from question data
        const tables = {};
        if (question.tableData) {
          Object.entries(question.tableData).forEach(
            ([tableName, tableInfo]) => {
              tables[tableName] = {
                name: tableName,
                columns: tableInfo.columns,
                dataTypes: tableInfo.columns.reduce((acc, col) => {
                  // Try to infer data types from column names
                  if (
                    col.toLowerCase().includes("id") ||
                    col.toLowerCase().includes("age") ||
                    col.toLowerCase().includes("score")
                  ) {
                    acc[col] = "INTEGER";
                  } else if (col.toLowerCase().includes("date")) {
                    acc[col] = "DATE";
                  } else if (
                    col.toLowerCase().includes("amount") ||
                    col.toLowerCase().includes("salary")
                  ) {
                    acc[col] = "DECIMAL";
                  } else {
                    acc[col] = "VARCHAR";
                  }
                  return acc;
                }, {}),
                rows: tableInfo.rows
                  ? tableInfo.rows.map((row) => {
                      const rowObj = {};
                      tableInfo.columns.forEach((col, idx) => {
                        rowObj[col] = row[idx];
                      });
                      return rowObj;
                    })
                  : [],
              };
            }
          );
        }
        setDatabaseTables(tables);

        const progressMap = await loadProgress();
        const savedProgress = progressMap[question.id];
        let initialCode = "";

        if (savedProgress && savedProgress.code) {
          try {
            let parsedCode;
            if (typeof savedProgress.code === "string") {
              parsedCode = JSON.parse(savedProgress.code);
            } else {
              parsedCode = savedProgress.code;
            }

            if (parsedCode && typeof parsedCode === "object") {
              initialCode = parsedCode.sql || "";
            } else {
              initialCode = savedProgress.code || "";
            }
          } catch (error) {
            console.error("Failed to parse saved code:", error);
            initialCode = savedProgress.code || "";
          }
        }

        if (!initialCode && question.defaultCode) {
          if (typeof question.defaultCode === "object") {
            initialCode = question.defaultCode.sql || "";
          } else {
            initialCode = question.defaultCode || "";
          }
        }

        setCode(initialCode);
        setIsJustSolved(false);
        setOutput("");
        setTestResults([]);
        setExecutionResult(null);
      } catch (error) {
        console.error("Error loading practice data:", error);
        setError(`Error loading practice: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadPracticeData();
    fetchMySnippets();
  }, [practiceId, questionId, loadProgress]);

  const updateQuestionStatus = useCallback(
    async (questionId, passed, score, codeToSave = code) => {
      try {
        const codeContent = JSON.stringify({ sql: codeToSave });
        const status = passed ? "solved" : "attempted";
        const finalScore = passed ? score : 0;

        const attemptData = {
          passed,
          score: passed ? score : 0,
          timestamp: new Date().toISOString(),
        };

        const response = await CodingPracticeService.saveProgress(
          practiceId,
          questionId,
          "sql",
          codeContent,
          status,
          finalScore,
          attemptData
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
              lastAttempt: new Date().toISOString(),
              attempts: prev[questionId]?.attempts
                ? [...prev[questionId].attempts, attemptData]
                : [attemptData],
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
    [practiceId, code, loadProgressSummary]
  );

  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
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
      // Prepare question data with tables
      const questionData = {
        ...selectedQuestion,
        tables: { ...databaseTables },
      };

      const result = await mockExecuteSql(code, null, questionData);
      console.log("SQL execution result:", result);

      if (result.success) {
        setOutput(result.output || "Query executed successfully");
        setQueryResult(result.data);

        // Update database tables if they were modified
        if (result.data && selectedQuestion?.tableData) {
          // In a real implementation, you would update the tables based on the query
          // For now, we'll just log that tables might have been modified
          console.log("Tables may have been modified by query");
        }

        return result.data;
      } else {
        setExecutionError(result.error);
        setOutput(`Error: ${result.error}`);
        return null;
      }
    } catch (error) {
      setExecutionError(error.message);
      setOutput(`Execution Error: ${error.message}`);
      return null;
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

      // Prepare question data with tables for validation
      const questionData = {
        ...selectedQuestion,
        tables: { ...databaseTables },
      };

      for (let i = 0; i < selectedQuestion.testCases.length; i++) {
        const testCase = selectedQuestion.testCases[i];
        let testResult;

        try {
          testResult = validateSqlTest(
            testCase,
            code,
            executionResult,
            questionData
          );
        } catch (error) {
          console.error(`Test ${testCase.id} error:`, error);
          testResult = {
            passed: false,
            actual: `Error: ${error.message}`,
            expected: testCase.expected || "Test failed",
          };
        }

        if (testResult.passed) passedCount++;

        results.push({
          ...testCase,
          ...testResult,
          visible: testCase.visible !== false,
          id: i,
        });
      }

      setTestResults(results);
      const allPassed = passedCount === selectedQuestion.testCases.length;
      setAllTestsPassed(allPassed);
      const newExecutionResult = {
        total: selectedQuestion.testCases.length,
        passed: passedCount,
        failed: selectedQuestion.testCases.length - passedCount,
      };
      setExecutionResult(newExecutionResult);

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

  const handleRunTests = async () => {
    console.log("Running SQL tests...");
    setShowTestCases(true);
    const executionResult = await executeQuery();
    if (executionResult) {
      await runTests(executionResult);
    }
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
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
  };

  const isEmptyCode = (userCode) => {
    if (!userCode) return true;
    const cleanCode = userCode
      .replace(/--.*$/gm, "")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s/g, "");
    return cleanCode === "";
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

  const createConfetti = () => {
    const container = document.querySelector(".confetti-container");
    if (!container) {
      console.warn("Confetti container not found");
      return;
    }

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

      const animationName = `confettiFall_${Date.now()}_${i}`;
      const animationDuration = Math.random() * 3 + 2;

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

  const handleSubmit = async () => {
    const allTestsCurrentlyPassed =
      testResults.length > 0 && testResults.every((test) => test.passed);

    if (!allTestsCurrentlyPassed) {
      setSubmitMessage(
        "❌ Please pass all tests before submitting. Run tests first and ensure all tests pass."
      );
      return;
    }

    if (isEmptyCode(code)) {
      setSubmitMessage(
        "❌ Cannot submit empty code. Please write your SQL query."
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("Submitting your solution...");
    setDebugInfo("");

    try {
      const allPassed = testResults.every((test) => test.passed);

      await updateQuestionStatus(
        selectedQuestion.id,
        allPassed,
        selectedQuestion.score,
        code
      );

      if (allPassed) {
        const successMessage = `✅ All test cases passed! Submission successful.`;
        setOutput(successMessage);
        celebrateSuccess();

        setToastMessage(
          `✅ Hurrah! ${testResults.filter((t) => t.passed).length}/${selectedQuestion.testCases.length} Test Cases Passed`
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

        const tweakIncreaseValue = selectedQuestion.score || 10;
        setTweakIncrease(tweakIncreaseValue);
        setIsJustSolved(true);

        if (autoSaveTimeoutRef.current) {
          clearTimeout(autoSaveTimeoutRef.current);
        }

        setShowCelebrationModal(true);

        setTimeout(() => {
          createConfetti();
          celebrateSuccess();
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
          `❌ Submission failed: ${testResults.filter((t) => t.passed).length}/${selectedQuestion.testCases.length} test cases passed.`
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

  const getQuestionAttempts = (questionId) => {
    return userProgress[questionId]?.attempts || [];
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

  const renderResultTable = () => {
    if (!queryResult) return null;

    // Show table structure for CREATE TABLE
    if (queryResult.tableInfo && queryResult.columns.includes("Column")) {
      return (
        <div className="sql-result-output">
          <div className="sql-table-structure">
            <h4>Table: {queryResult.tableInfo.name}</h4>
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
          </div>

          {/* Show table data if available */}
          {queryResult.tableInfo.rows &&
            queryResult.tableInfo.rows.length > 0 && (
              <div className="sql-table-data">
                <h4>Table Data:</h4>
                <div className="sql-result-table">
                  <table>
                    <thead>
                      <tr>
                        {queryResult.tableInfo.columns?.map((col, idx) => (
                          <th key={idx}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {queryResult.tableInfo.rows.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                          {queryResult.tableInfo.columns?.map((col, colIdx) => (
                            <td key={colIdx}>{row[col]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
        </div>
      );
    }

    // Regular query results
    if (queryResult.results && queryResult.results.length > 0) {
      return (
        <div className="sql-result-output">
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
          <div className="sql-row-count">
            <p>{queryResult.rowCount || 0} row(s) returned</p>
          </div>
        </div>
      );
    }

    // Success message without data
    return (
      <div className="sql-success-output">
        <p>✓ Query executed successfully.</p>
        <p>{queryResult.rowCount || 0} row(s) affected.</p>
      </div>
    );
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

    // Show message if present
    if (queryResult.message) {
      return <div className="sql-result-output">{renderResultTable()}</div>;
    }

    return renderResultTable();
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
                {user?.lastName || "Coder"}
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
    <div className="practice-full-question-prac">
      <CelebrationModal />
      {showSuccessToast && (
        <div className="success-toast-center">{toastMessage}</div>
      )}

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
      <div className="full-question-content-prac">
        <div
          className={`full-question-detail-prac ${100 - editorWidth < 8 ? "collapsed" : ""}`}
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

        <div className="resizer-prac" onMouseDown={startResize} />

        <div
          className="full-code-editor-section-prac"
          style={{ width: `${editorWidth}%` }}
        >
          <div className="editor-header-prac">
            <div className="editor-title-prac">
              <div className="editor-info-prac">SQL</div>
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
              mode="sql"
              theme={theme}
              value={code}
              onChange={handleCodeChange}
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
                tabSize: 2,
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
                onClick={handleRunTests}
                disabled={isRunning || isEmptyCode(code)}
              >
                {isRunning ? <span className="loader-prac"></span> : "Run"}
              </button>
              <button
                className="submit-button-prac"
                onClick={handleSubmit}
                disabled={isRunning || isEmptyCode(code) || isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loader-prac"></span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>

          {output && (
            <div className="sql-output-section">
              <div className="output-header-prac">
                <h4>Output</h4>
              </div>
              <div className="output-content-prac-sql">
                {renderQueryResult()}
                {!queryResult && output && (
                  <div className="sql-output-text">
                    <pre>{output}</pre>
                  </div>
                )}
                {executionError && (
                  <div className="sql-error-message">
                    <h4>Error:</h4>
                    <pre>{executionError}</pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="prac-footer">
        <div className="full-question-meta-prac">
          {hasPrevQuestion && (
            <button className="prac-back-btn" onClick={handlePrevQuestion}>
              Back
            </button>
          )}

          {hasNextQuestion && (
            <button className="prac-next-btn" onClick={handleNextQuestion}>
              Next
            </button>
          )}
        </div>
      </div>

      {showTestCases && (
        <div className="test-cases sql-testcases">
          <div className="test-cases-header">
            <h3>Test Cases</h3>
            <div className="test-cases-head-row">
              <div
                className="hide-test-btn-sql"
                onClick={() => setShowTestCases(false)}
                title="Hide test cases"
              >
                <button className="hide-test-btn-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-chevron-double-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                    />
                  </svg>
                </button>
                Close
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="tests-count">
                {testResults.filter((t) => t.passed).length}/
                {testResults.length} Passed
              </span>
            </div>
          </div>
          <div className="test-cases-content">
            <div className="test-results">
              {isRunning ? (
                <div className="loading-container-sql">
                  <div className="spinner-sql"></div>
                </div>
              ) : (
                <>
                  {testResults.map((test, index) => (
                    <div
                      key={index}
                      className={`test-case ${test.passed ? "passed" : "failed"}`}
                    >
                      <div className="test-header">
                        <span className="test-status">
                          {test.passed ? "✓" : "✗"}
                        </span>
                        <p className="test-description">{test.description}</p>
                      </div>
                    </div>
                  ))}

                  {testResults.length === 0 && (
                    <div className="no-tests">
                      Run the tests to see results here
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Save Snippet Modal */}
      {showSaveModal && (
        <div className="modal-overlay-prac">
          <div className="modal-prac">
            <div className="modal-header-prac">
              <h3>Save SQL Snippet</h3>
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
                  <img
                    src="/assets/sql_logo.png"
                    alt="SQL"
                    width="24"
                    height="24"
                  />
                  <span className="language-name-prac">SQL</span>
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
};

export default SQLPractice;
