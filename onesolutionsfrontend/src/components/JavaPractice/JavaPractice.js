import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AceEditor from "react-ace";
import confetti from "canvas-confetti";

// Ace editor imports for Java
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";

// Service for coding progress
import CodingPracticeService from "../../services/codingPracticeService";

const JavaPractice = ({
  contentId: propContentId,
  contentUuid: propContentUuid,
  goalId,
  moduleId,
  topicId,
  subtopicId,
  onComplete,
  preLoadedContent,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { practiceId, questionId } = useParams();
  const {
    getJavaCodingPractice,
    getJavaContentByUuid,
    loadProgressSummary,
  } = useAuth();

  // ---------- State ----------
  const [practiceMetadata, setPracticeMetadata] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [theme] = useState("monokai");
  const [fontSize] = useState(16);
  const [executionResult, setExecutionResult] = useState(null);
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);
  const [isPracticeCompleted, setIsPracticeCompleted] = useState(false);
  const [hasCheckedCompletion, setHasCheckedCompletion] = useState(false);
  const [loadingPractice, setLoadingPractice] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Local progress state (optimistic updates) – same as Practice component
  const [localProgress, setLocalProgress] = useState({});

  // Save snippet modal
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [snippetName, setSnippetName] = useState("");
  const [saving, setSaving] = useState(false);
  const [mySnippets, setMySnippets] = useState([]);

  // Compiler / Console State
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [consoleTab, setConsoleTab] = useState("output");
  const [customInput, setCustomInput] = useState("");

  // Resize state
  const [editorWidth, setEditorWidth] = useState(70);
  const isResizing = useRef(false);
  const hasMarkedPracticeComplete = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(50);
  const initialDataLoaded = useRef(false);
  const questionFetchInProgress = useRef(false);

  const API_URL = process.env.REACT_APP_API_BASE_URL;

  // ---------- Load initial progress (like Practice component) ----------
  useEffect(() => {
    const loadProgress = async () => {
      try {
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
          setLocalProgress(progressMap);
        }
      } catch (error) {
        console.error("Failed to load progress:", error);
      }
    };
    loadProgress();
  }, []);

  // ---------- Helper: is code empty? ----------
  const isEmptyCode = (userCode) => {
    if (!userCode) return true;
    const cleanCode = userCode
      .replace(/\/\/.*$|\/\*[\s\S]*?\*\//gm, "")
      .replace(/\s/g, "");
    return cleanCode === "";
  };

  // ---------- Resize handlers ----------
  const startResize = useCallback((e) => {
    isResizing.current = true;
    startX.current = e.clientX;
    startWidth.current = editorWidth;
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
  }, [editorWidth]);

  const stopResize = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  const handleResize = useCallback((e) => {
    if (!isResizing.current) return;
    const containerWidth = document.querySelector(".full-question-content-prac")?.offsetWidth || window.innerWidth;
    const deltaX = startX.current - e.clientX;
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

  // Fetch full question details
  const fetchFullQuestionDetails = useCallback(async (contentId) => {
    try {
      const response = await fetch(`${API_URL}/student/java/question/${contentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        return data.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching full question details:", error);
      return null;
    }
  }, [API_URL]);

  // Transform API content to component question format
  const transformContentToQuestion = useCallback((content, allTestCases = null) => {
    const testCasesToUse = allTestCases || content.all_test_cases || content.sample_test_cases || [];

    return {
      id: content.id,
      content_uuid: content.content_uuid,
      title: content.coding_title,
      description: content.coding_description,
      sampleInput: (content.sample_test_cases || [])[0]?.input || "",
      sampleOutput: (content.sample_test_cases || [])[0]?.expected_output || "",
      testCases: testCasesToUse.map((tc, idx) => ({
        id: tc.id || idx,
        input: tc.input,
        output: tc.expected_output,
        visible: tc.is_sample || false,
        isSample: tc.is_sample || false,
      })),
      difficulty: content.difficulty || "Medium",
      score: content.score || 10,
      defaultCode: content.starter_code || "",
    };
  }, []);

  // ---------- Data fetching ----------
  useEffect(() => {
    if (initialDataLoaded.current) return;

    const loadInitialData = async () => {
      if (preLoadedContent) {
        const question = transformContentToQuestion(preLoadedContent);
        setSelectedQuestion(question);
        setCode(question.defaultCode || "");
        setPracticeMetadata({
          practice: { id: "single", title: "Java Practice" },
          problems: [question],
        });
        setLoadingPractice(false);
        initialDataLoaded.current = true;
        return;
      }

      if (propContentUuid) {
        setLoadingQuestion(true);
        try {
          const res = await getJavaContentByUuid(propContentUuid);
          if (res?.success) {
            const question = transformContentToQuestion(res.data);
            setSelectedQuestion(question);
            setCode(question.defaultCode || "");
            setPracticeMetadata({
              practice: { id: "single", title: "Java Practice" },
              problems: [question],
            });
          }
        } catch (e) {
          setError(e.message);
        } finally {
          setLoadingQuestion(false);
          initialDataLoaded.current = true;
        }
        return;
      }

      if (practiceId) {
        setLoadingPractice(true);
        setError(null);
        try {
          const res = await getJavaCodingPractice(practiceId);
          if (res?.success) {
            const metadata = {
              ...res.data,
              problems: res.data.problems || [],
            };
            setPracticeMetadata(metadata);

            if (!questionId && metadata.problems.length > 0) {
              const firstUuid = metadata.problems[0].content_uuid;
              navigate(`/java-practice/${practiceId}/${firstUuid}`, {
                replace: true,
                state: location.state,
              });
            }
          } else {
            setError("Practice not found");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoadingPractice(false);
          initialDataLoaded.current = true;
        }
      }
    };

    loadInitialData();
  }, [practiceId, preLoadedContent, propContentUuid, questionId, navigate, getJavaCodingPractice, transformContentToQuestion, location.state]);

  // Fetch question details when questionId changes
  useEffect(() => {
    if (questionFetchInProgress.current) return;

    if (propContentUuid || preLoadedContent || !questionId || selectedQuestion?.content_uuid === questionId) {
      return;
    }

    const fetchQuestion = async () => {
      questionFetchInProgress.current = true;
      setLoadingQuestion(true);
      setError(null);

      try {
        const res = await getJavaContentByUuid(questionId);
        if (res?.success) {
          const fullDetails = await fetchFullQuestionDetails(res.data.id);
          const question = transformContentToQuestion(res.data, fullDetails?.all_test_cases);
          setSelectedQuestion(question);
          const savedCode = localProgress[question.id]?.code;
          setCode(savedCode || question.defaultCode || "");
          setTestResults([]);
          setExecutionResult(null);
          setOutput("");
        } else {
          setError("Question not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingQuestion(false);
        questionFetchInProgress.current = false;
      }
    };

    fetchQuestion();
  }, [questionId, getJavaContentByUuid, fetchFullQuestionDetails, transformContentToQuestion, localProgress, propContentUuid, preLoadedContent, selectedQuestion]);

  const fetchMySnippets = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await fetch(`${API_URL}/api/code-snippets/my-snippets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success) setMySnippets(result.data.snippets || []);
    } catch (error) {
      console.error("Fetch snippets error:", error);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchMySnippets();
  }, [fetchMySnippets]);

  const checkPracticeCompletion = useCallback(async () => {
    if (!practiceMetadata?.practice?.id || practiceMetadata.practice.id === "single" || isPracticeCompleted) {
      setHasCheckedCompletion(true);
      return;
    }

    try {
      const response = await CodingPracticeService.getCompletionStatus(practiceMetadata.practice.id);
      if (response.success) {
        setIsPracticeCompleted(response.data.isCompleted);
      }
    } catch (error) {
      console.error("Failed to check practice completion:", error);
    } finally {
      setHasCheckedCompletion(true);
    }
  }, [practiceMetadata, isPracticeCompleted]);

  useEffect(() => {
    if (practiceMetadata && !hasCheckedCompletion) {
      checkPracticeCompletion();
    }
  }, [practiceMetadata, hasCheckedCompletion, checkPracticeCompletion]);

  const areAllQuestionsSolved = useMemo(() => {
    if (!practiceMetadata || !practiceMetadata.problems) return false;
    return practiceMetadata.problems.every(
      (q) => localProgress[q.id]?.status === "solved"
    );
  }, [practiceMetadata, localProgress]);

  useEffect(() => {
    const markComplete = async () => {
      if (
        hasMarkedPracticeComplete.current ||
        !hasCheckedCompletion ||
        !areAllQuestionsSolved ||
        !practiceMetadata?.practice?.id ||
        practiceMetadata.practice.id === "single" ||
        isPracticeCompleted ||
        isMarkingComplete
      ) {
        return;
      }

      hasMarkedPracticeComplete.current = true;
      setIsMarkingComplete(true);

      try {
        await CodingPracticeService.completePractice(
          practiceMetadata.practice.id,
          location.state?.goalName,
          location.state?.courseName,
          { goalId, moduleId, topicId, subtopicId }
        );

        await loadProgressSummary();
        setIsPracticeCompleted(true);

        if (onComplete) {
          onComplete({ practiceId: practiceMetadata.practice.id, goalId, moduleId, topicId, subtopicId });
        }

        setToastMessage("🎉 Practice Completed Successfully!");
        setShowSuccessToast(true);

        setTimeout(() => {
          setShowSuccessToast(false);
        }, 2500);
      } catch (error) {
        console.error("Failed to mark practice complete:", error);
        hasMarkedPracticeComplete.current = false;
      } finally {
        setIsMarkingComplete(false);
      }
    };

    markComplete();
  }, [
    hasCheckedCompletion,
    areAllQuestionsSolved,
    practiceMetadata,
    isPracticeCompleted,
    isMarkingComplete,
    loadProgressSummary,
    location.state?.goalName,
    location.state?.courseName,
    goalId,
    moduleId,
    topicId,
    subtopicId,
    onComplete,
  ]);

  // ---------- Code Execution ----------
  const normalizeOutput = (str) => str?.replace(/\r\n/g, "\n").replace(/\n+$/, "") || "";

  const executeJavaCode = async (userCode, inputStr) => {
    if (!selectedQuestion) return "";
    try {
      const response = await fetch(`${API_URL}/api/java/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          code: userCode,
          input: inputStr
        }),
      });

      const data = await response.json();

      if (data.success) {
        return data.output || '';
      } else {
        return data.output || data.error || "Execution failed";
      }
    } catch (error) {
      console.error('Java execution error:', error);
      return `Network Error: ${error.message}`;
    }
  };

  const handleCompile = async () => {
    if (!selectedQuestion) return;
    if (isEmptyCode(code)) {
      setIsConsoleOpen(true);
      setConsoleTab("output");
      setOutput("❌ No code to execute. Please write your solution.");
      return;
    }

    setIsRunning(true);
    setIsConsoleOpen(true);
    setConsoleTab("output");
    setOutput("Compiling and running code...\n");

    try {
      const actualOutput = await executeJavaCode(code, customInput);

      if (actualOutput && actualOutput.trim() !== "") {
        setOutput(actualOutput);
      } else {
        setOutput("Program executed successfully (no output).\nMake sure you have a print statement like System.out.println() in your code!");
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleRunCode = async () => {
    if (!selectedQuestion) return;
    if (isEmptyCode(code)) {
      setIsConsoleOpen(true);
      setConsoleTab("output");
      setOutput("❌ No code to execute. Please write your solution.");
      return;
    }

    setIsRunning(true);
    setOutput("Running tests...\n");
    setTestResults([]);
    setExecutionResult(null);

    try {
      const results = [];
      let passedCount = 0;

      for (let i = 0; i < selectedQuestion.testCases.length; i++) {
        const testCase = selectedQuestion.testCases[i];
        const actualOutput = await executeJavaCode(code, testCase.input);

        const cleanActual = normalizeOutput(actualOutput);
        const cleanExpected = normalizeOutput(testCase.output);

        const passed = cleanActual === cleanExpected;
        if (passed) passedCount++;

        results.push({
          ...testCase,
          passed,
          actualOutput: cleanActual,
          expectedOutput: cleanExpected,
          id: i,
        });
      }

      setTestResults(results);
      setExecutionResult({
        total: selectedQuestion.testCases.length,
        passed: passedCount,
        failed: selectedQuestion.testCases.length - passedCount,
      });

      if (passedCount === selectedQuestion.testCases.length) {
        setOutput(`✅ Execution completed: ${passedCount}/${selectedQuestion.testCases.length} test cases passed`);
      } else {
        setOutput(`❌ Execution completed: ${passedCount}/${selectedQuestion.testCases.length} test cases passed.\nCheck the compiler output for potential errors.`);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setIsConsoleOpen(true);
      setConsoleTab("output");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    if (!selectedQuestion) return;
    setIsRunning(true);
    setOutput("Running all test cases...");
    setTestResults([]);
    setExecutionResult(null);

    try {
      const results = [];
      let passedCount = 0;

      for (let i = 0; i < selectedQuestion.testCases.length; i++) {
        const testCase = selectedQuestion.testCases[i];
        const actualOutput = await executeJavaCode(code, testCase.input);
        const cleanActual = normalizeOutput(actualOutput);
        const cleanExpected = normalizeOutput(testCase.output);
        const passed = cleanActual === cleanExpected;
        if (passed) passedCount++;
        results.push({
          ...testCase,
          passed,
          actualOutput: cleanActual,
          expectedOutput: cleanExpected,
          id: i,
        });
      }

      setTestResults(results);
      setExecutionResult({
        total: selectedQuestion.testCases.length,
        passed: passedCount,
        failed: selectedQuestion.testCases.length - passedCount,
      });

      const allPassed = passedCount === selectedQuestion.testCases.length;

      // Update progress on backend
      await updateQuestionStatus(selectedQuestion.id, allPassed, selectedQuestion.score);

      if (allPassed) {
        setOutput(`✅ All ${passedCount}/${selectedQuestion.testCases.length} test cases passed!`);
        celebrateSuccess();

        try {
          await fetch(`${API_URL}/student/java/content/${selectedQuestion.id}/complete`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              quiz_score: selectedQuestion.score,
            }),
          });
        } catch (e) {
          console.error("Error marking completion:", e);
        }

        setToastMessage("🎉 Question Solved Successfully!");
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 2500);

        if (practiceMetadata?.practice?.id && practiceMetadata.practice.id !== "single") {
          const allSolved = practiceMetadata.problems.every(
            (q) => localProgress[q.id]?.status === "solved"
          );
          if (allSolved && !isPracticeCompleted) {
            setOutput("✅ All test cases passed! 🎉 All questions in this practice are now solved!");
          }
        }
      } else {
        setOutput(`❌ ${passedCount}/${selectedQuestion.testCases.length} test cases passed. Keep trying!`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setOutput(`Error: ${error.message}`);
      setIsConsoleOpen(true);
      setConsoleTab("output");
    } finally {
      setIsRunning(false);
    }
  };

  const playSuccessSound = () => {
    try {
      const audio = new Audio("/sounds/success-sound.mp3");
      audio.volume = 0.2;
      audio.play().catch(() => { });
    } catch { }
  };

  const celebrateSuccess = () => {
    playSuccessSound();
    const duration = 1800;
    const end = Date.now() + duration;
    (function frame() {
      confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const updateQuestionStatus = async (questionId, passed, score) => {
    try {
      const attemptData = {
        passed,
        score: passed ? score : 0,
        timestamp: new Date().toISOString(),
      };

      // Optimistic update
      setLocalProgress(prev => ({
        ...prev,
        [questionId]: {
          status: passed ? "solved" : "attempted",
          code: code,
          score: passed ? score : 0,
          lastAttempt: new Date().toISOString(),
          attempts: prev[questionId]?.attempts ? [...prev[questionId].attempts, attemptData] : [attemptData],
        },
      }));

      await CodingPracticeService.saveProgress(
        practiceMetadata?.practice?.id,
        questionId,
        "java",
        code,
        passed ? "solved" : "attempted",
        passed ? score : 0,
        attemptData
      );
    } catch (error) {
      console.error("Failed to update question status:", error);
    }
  };

  const resetToDefault = useCallback(() => {
    if (selectedQuestion) {
      const savedCode = localProgress[selectedQuestion.id]?.code;
      setCode(savedCode || selectedQuestion.defaultCode || "");
      setOutput("");
      setTestResults([]);
      setExecutionResult(null);
    }
  }, [selectedQuestion, localProgress]);

  const handleSaveSnippet = async () => {
    if (!snippetName.trim()) {
      alert("Please enter a name");
      return;
    }
    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/api/code-snippets/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          snippetName: snippetName.trim(),
          language: "java",
          javaCode: code,
        }),
      });
      const result = await response.json();
      if (result.success) {
        alert("Snippet saved!");
        setShowSaveModal(false);
        setSnippetName("");
        fetchMySnippets();
      } else {
        alert(`Failed: ${result.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save snippet");
    } finally {
      setSaving(false);
    }
  };

  const getQuestionStatus = useCallback((qId) => {
    return localProgress[qId]?.status || "unsolved";
  }, [localProgress]);

  useEffect(() => {
    return () => {
      initialDataLoaded.current = false;
      questionFetchInProgress.current = false;
      hasMarkedPracticeComplete.current = false;
    };
  }, []);

  // Update code when localProgress loads and selected question exists
useEffect(() => {
  if (selectedQuestion && localProgress[selectedQuestion.id]?.code) {
    setCode(localProgress[selectedQuestion.id].code);
  }
}, [selectedQuestion, localProgress]);



  // ---------- Render ----------
  if (loadingPractice || loadingQuestion) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="practice-container-prac" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="error" style={{ fontSize: '1.2rem', color: '#dc2626' }}>{error}</div>
      </div>
    );
  }

  if (!selectedQuestion) {
    return (
      <div className="practice-container-prac" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="not-found" style={{ fontSize: '1.2rem', color: '#64748b' }}>
          Please select a question from the practice list.
        </div>
      </div>
    );
  }

  return (
    <div className="practice-full-question-prac">
      {showSuccessToast && <div className="success-toast-center">{toastMessage}</div>}
      <div className="full-question-header-prac">
        <button className="back-button-prac" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className="full-question-title-prac">
          <div className="full-question-meta-prac">
            <span className={`status-indicator-prac ${getQuestionStatus(selectedQuestion.id)} large-prac`}>
              {getQuestionStatus(selectedQuestion.id) === "solved"
                ? "✓ Solved"
                : getQuestionStatus(selectedQuestion.id) === "attempted"
                  ? "● Attempted"
                  : "○ Unsolved"}
            </span>
            <span className={`difficulty-badge-prac large-prac ${selectedQuestion.difficulty.toLowerCase()}`}>
              {selectedQuestion.difficulty}
            </span>
            <span className="score-badge-prac">{selectedQuestion.score} points</span>
          </div>
        </div>
      </div>

      <div className="full-question-content-prac">
        {/* Description panel */}
        <div className="full-question-detail-prac" style={{ width: `${100 - editorWidth}%` }}>
          <div className="description-name-header-prac">Description</div>
          <div className="desc-prac">
            <div className="description-content-prac">
              <span className="practice-name-prac">{selectedQuestion.title}</span>
              <div
                className="practice-description-cod"
                dangerouslySetInnerHTML={{
                  __html: selectedQuestion.description,
                }}
              ></div>
            </div>
            <hr />
            <div className="sample-io-section-prac">
              <div className="sample-input-prac">
                <h3>Sample Input</h3>
                <div className="code-block-prac">
                  <pre>{selectedQuestion.sampleInput || "No input"}</pre>
                </div>
              </div>
              <div className="sample-output-prac">
                <h3>Sample Output</h3>
                <div className="code-block-prac">
                  <pre>{selectedQuestion.sampleOutput}</pre>
                </div>
              </div>
            </div>
            <hr />
            <div className="test-cases-section-prac">
              <div className="test-cases-header-prac">
                <h3>Test Cases</h3>
              </div>
              <div className="test-cases-grid-prac">
                {selectedQuestion.testCases.filter((tc) => tc.visible).map((tc, idx) => {
                  const testResult = testResults[idx];
                  return (
                    <div key={idx} className="test-case-prac">
                      <div className="test-case-header-prac">
                        <span className="test-case-number-prac">Case {idx + 1}</span>
                        {testResult && (
                          <div className={`test-result-prac ${testResult.passed ? "passed-prac" : "failed-prac"}`}>
                            {testResult.passed ? (
                              <svg width="18" height="18" fill="green" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                              </svg>
                            ) : (
                              <svg width="18" height="18" fill="red" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                              </svg>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="test-case-content-prac">
                        <div className="test-input-prac">
                          <label>Input:</label>
                          <div className="code-block-prac small-prac"><pre>{tc.input || "No input"}</pre></div>
                        </div>
                        <div className={`output-section ${testResult ? "with-result" : "only-expected"}`}>
                          <div className="expected-output">
                            <span className="output-label-prac">Expected Output:</span>
                            <div className="code-block-prac small-prac"><pre>{tc.output}</pre></div>
                          </div>
                          {testResult && (
                            <div className="test-execution-result-prac">
                              <div className="output-comparison-prac">
                                <span className="output-label-prac">Your Output:</span>
                                <div className={`code-block-prac small-prac ${testResult.passed ? "success-prac" : "error-prac"}`}>
                                  <pre>{testResult.actualOutput || "(empty)"}</pre>
                                </div>
                              </div>
                            </div>
                          )}
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

        {/* Editor panel */}
        <div
          className="full-code-editor-section-prac"
          style={{ width: `${editorWidth}%`, display: 'flex', flexDirection: 'column' }}
        >
          <div className="editor-header-prac">
            <div className="editor-title-prac">
              <div className="editor-info-prac">Java (OpenJDK 13.0.1)</div>
            </div>
            <button className="save-snippet-button-prac" onClick={resetToDefault} title="Reset">
              <svg width="18" height="18" fill="#64748b" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
              </svg>
            </button>
            <button className="save-snippet-button-prac" onClick={() => setShowSaveModal(true)} title="Save Snippet">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="#64748b">
                <path fillRule="evenodd" d="M3.8 3.2c-.159 0-.312.063-.424.176-.113.112-.176.265-.176.424v8.4c0 .159.063.312.176.424.112.113.265.176.424.176h8.4c.159 0 .312-.063.424-.176.113-.112.176-.265.176-.424V5.848L10.151 3.2H3.8zm-1.273-1.273A1.8 1.8 0 0 1 3.8 1.2H10.4c.159 0 .312.063.424.176l3 3c.113.112.176.265.176.424V12.2a1.8 1.8 0 0 1-1.8 1.8H3.8a1.8 1.8 0 0 1-1.8-1.8V3.8c0-.477.19-.935.527-1.273z" />
                <path fillRule="evenodd" d="M5.333 9.2c0-.294.224-.533.5-.533h5c.276 0 .5.239.5.533v4.267c0 .294-.224.533-.5.533s-.5-.239-.5-.533V9.733h-4v3.734c0 .294-.224.533-.5.533s-.5-.239-.5-.533V9.2z" />
                <path fillRule="evenodd" d="M5.867 2c.294 0 .533.213.533.476v1.905h3.733c.295 0 .534.213.534.476 0 .263-.239.476-.534.476H5.867c-.295 0-.534-.213-.534-.476V2.476c0-.263.239-.476.534-.476z" />
              </svg>
            </button>
          </div>

          <div className="code-editor-container-prac" style={{ flexGrow: 1, minHeight: 0, position: 'relative' }}>
            <AceEditor
              mode="java"
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
              }}
              editorProps={{ $blockScrolling: true }}
            />
          </div>

          {/* Console */}
          {isConsoleOpen && (
            <div
              className="compiler-console-prac"
              style={{
                height: "250px",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#1e1e1e",
                borderTop: "2px solid #333",
                color: "#d4d4d4",
                fontSize: "14px",
                fontFamily: "Consolas, 'Courier New', monospace"
              }}
            >
              <div
                className="console-header-prac"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#2d2d2d",
                  padding: "0 10px",
                  borderBottom: "1px solid #333"
                }}
              >
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => setConsoleTab("output")}
                    style={{
                      background: "none",
                      border: "none",
                      color: consoleTab === "output" ? "#fff" : "#858585",
                      padding: "8px 12px",
                      cursor: "pointer",
                      borderBottom: consoleTab === "output" ? "2px solid #007acc" : "2px solid transparent",
                      fontWeight: consoleTab === "output" ? "bold" : "normal"
                    }}
                  >
                    Console Output
                  </button>
                  <button
                    onClick={() => setConsoleTab("input")}
                    style={{
                      background: "none",
                      border: "none",
                      color: consoleTab === "input" ? "#fff" : "#858585",
                      padding: "8px 12px",
                      cursor: "pointer",
                      borderBottom: consoleTab === "input" ? "2px solid #007acc" : "2px solid transparent",
                      fontWeight: consoleTab === "input" ? "bold" : "normal"
                    }}
                  >
                    Custom Input
                  </button>
                </div>
                <button
                  onClick={() => setIsConsoleOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#858585",
                    cursor: "pointer",
                    fontSize: "16px",
                    padding: "8px",
                  }}
                  title="Close Console"
                >
                  ×
                </button>
              </div>

              <div
                className="console-body-prac"
                style={{
                  flex: 1,
                  padding: "10px",
                  overflowY: "auto",
                  backgroundColor: "#1e1e1e"
                }}
              >
                {consoleTab === "output" ? (
                  <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: "inherit", color: output.includes("[Error") ? "#ef4444" : "inherit" }}>
                    {output || "Run code to see output here."}
                  </pre>
                ) : (
                  <textarea
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Enter custom standard input (stdin) here..."
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#1e1e1e",
                      color: "#d4d4d4",
                      border: "1px solid #333",
                      padding: "8px",
                      fontFamily: "inherit",
                      resize: "none",
                      outline: "none"
                    }}
                  />
                )}
              </div>
            </div>
          )}

          <div className="editor-controls-prac">
            {executionResult && !isConsoleOpen && (
              <div className="execution-summary-prac">
                <span className="summary-text-prac">{executionResult.passed}/{executionResult.total} test cases passed</span>
                <div className="progress-bar-prac">
                  <div className="progress-fill-prac" style={{ width: `${(executionResult.passed / executionResult.total) * 100}%` }} />
                </div>
              </div>
            )}

            <div className="editor-actions-prac" style={{ display: "flex", gap: "10px", alignItems: "center", width: "100%", justifyContent: executionResult && !isConsoleOpen ? "flex-end" : "space-between" }}>
              <button
                className="console-toggle-btn"
                onClick={() => setIsConsoleOpen(!isConsoleOpen)}
                style={{
                  background: "transparent",
                  border: "1px solid #475569",
                  color: "#94a3b8",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "13px"
                }}
              >
                Console {isConsoleOpen ? "▼" : "▲"}
              </button>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="run-button-prac"
                  onClick={handleCompile}
                  disabled={isRunning}
                  style={{ backgroundColor: "#2563eb" }}
                >
                  {isRunning && consoleTab === "output" && isConsoleOpen ? <span className="loader-prac"></span> : "Compile & Run"}
                </button>
                <button className="run-button-prac" onClick={handleRunCode} disabled={isRunning}>
                  {isRunning && (!isConsoleOpen || consoleTab !== "output") ? <span className="loader-prac"></span> : "Run Tests"}
                </button>
                <button className="submit-button-prac" onClick={handleSubmitCode} disabled={isRunning || isEmptyCode(code)}>
                  {isRunning ? <span className="loader-prac"></span> : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save snippet modal */}
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
                  name="snippetName"
                  value={snippetName}
                  onChange={(e) => setSnippetName(e.target.value)}
                  placeholder="Enter snippet name"
                  autoComplete="off"
                  autoFocus
                />
              </div>
              <div className="form-group-prac">
                <label>Language</label>
                <div className="language-display-prac">
                  <img src="/assets/java_logo.png" alt="Java" width="24" height="24" />
                  <span className="language-name-prac">Java (OpenJDK 13.0.1)</span>
                </div>
              </div>
              <div className="code-preview-prac">
                <label>Code Preview</label>
                <div className="code-preview-content-prac">
                  <pre>{code.substring(0, 200)}{code.length > 200 ? "..." : ""}</pre>
                </div>
              </div>
            </div>
            <div className="modal-footer-prac">
              <button className="btn-secondary-prac" onClick={() => setShowSaveModal(false)} disabled={saving}>
                Cancel
              </button>
              <button className="btn-primary-prac" onClick={handleSaveSnippet} disabled={saving || !snippetName.trim()}>
                {saving ? "Saving..." : "Save Snippet"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JavaPractice;