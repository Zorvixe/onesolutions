"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import "./Practice.css"
import { codingPracticesData } from "../../codingPracticesData/codingPracticesData"
import CodingPracticeService from "../../services/codingPracticeService"
import AceEditor from "react-ace"
import { useAuth } from "../../context/AuthContext"

import "ace-builds/src-noconflict/mode-html"
import "ace-builds/src-noconflict/mode-css"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/mode-sql"
import "ace-builds/src-noconflict/theme-monokai"
import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-noconflict/theme-twilight"
import "ace-builds/src-noconflict/ext-language_tools"

const Practice = () => {
  const { practiceId, questionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { loadProgressSummary } = useAuth()

  const [selectedLanguage, setSelectedLanguage] = useState("python")
  const [selectedPractice, setSelectedPractice] = useState(null)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState([])
  const [theme] = useState("monokai")
  const [fontSize] = useState(16)
  const [executionResult, setExecutionResult] = useState(null)
  const [userProgress, setUserProgress] = useState({})
  const [isMarkingComplete, setIsMarkingComplete] = useState(false)
  const [isPracticeCompleted, setIsPracticeCompleted] = useState(false)
  const [loading, setLoading] = useState(false)

  const pyodideRef = useRef(null)
  const [pyodideReady, setPyodideReady] = useState(false)

  const subtopicId = location.state?.subtopicId
  const goalName = location.state?.goalName
  const courseName = location.state?.courseName

  useEffect(() => {
    const loadProgress = async () => {
      try {
        setLoading(true)
        const response = await CodingPracticeService.getAllProgress()
        if (response.success) {
          const progressMap = {}
          response.data.progress.forEach((prog) => {
            progressMap[prog.question_id] = {
              status: prog.status,
              code: prog.code,
              score: prog.score,
              attempts: prog.attempts || [],
              lastAttempt: prog.last_attempt,
            }
          })
          setUserProgress(progressMap)
        }
      } catch (error) {
        console.error("Failed to load progress:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProgress()
  }, [])

  const checkPracticeCompletion = useCallback(async () => {
    if (!practiceId) return
    try {
      const response = await CodingPracticeService.getCompletionStatus(practiceId)
      if (response.success) {
        setIsPracticeCompleted(response.data.isCompleted)
      }
    } catch (error) {
      console.error("Failed to check practice completion:", error)
    }
  }, [practiceId])

  useEffect(() => {
    checkPracticeCompletion()
  }, [practiceId, checkPracticeCompletion])

  // Check if all questions in current practice are solved
  const areAllQuestionsSolved = useMemo(() => {
    if (!selectedPractice) return false

    return selectedPractice.questions.every((question) => userProgress[question.id]?.status === "solved")
  }, [selectedPractice, userProgress])

  useEffect(() => {
    const markPracticeAsComplete = async () => {
      if (areAllQuestionsSolved && practiceId && !isPracticeCompleted && !isMarkingComplete) {
        try {
          setIsMarkingComplete(true)
          console.log("🎯 All questions solved! Marking practice as complete...")

          await CodingPracticeService.completePractice(practiceId, goalName, courseName)
          await loadProgressSummary()
          await checkPracticeCompletion()

          console.log("✅ Practice marked as completed!")
        } catch (error) {
          console.error("❌ Failed to mark practice complete:", error)
        } finally {
          setIsMarkingComplete(false)
        }
      }
    }

    markPracticeAsComplete()
  }, [
    areAllQuestionsSolved,
    practiceId,
    isPracticeCompleted,
    isMarkingComplete,
    loadProgressSummary,
    goalName,
    courseName,
    checkPracticeCompletion,
  ])

  useEffect(() => {
    const findPractice = () => {
      if (practiceId) {
        for (const language in codingPracticesData) {
          const practice = codingPracticesData[language].find((p) => p.id === practiceId)
          if (practice) {
            setSelectedPractice(practice)
            setSelectedLanguage(language)
            return
          }
        }
      }

      const firstLanguage = Object.keys(codingPracticesData)[0]
      const firstPractice = codingPracticesData[firstLanguage][0]
      if (firstPractice) {
        setSelectedPractice(firstPractice)
        setSelectedLanguage(firstLanguage)
        if (!practiceId) {
          navigate(`/practice/${firstPractice.id}`, { replace: true })
        }
      }
    }

    findPractice()
  }, [practiceId, navigate])

  useEffect(() => {
    if (selectedPractice && questionId) {
      const question = selectedPractice.questions.find((q) => q.id === questionId)
      if (question) {
        setSelectedQuestion(question)
        const savedCode = userProgress[question.id]?.code
        setCode(savedCode || question.defaultCode || "")
      } else {
        setSelectedQuestion(null)
        setCode("")
      }
    } else {
      setSelectedQuestion(null)
      setCode("")
    }
    setOutput("")
    setTestResults([])
    setExecutionResult(null)
  }, [selectedPractice, questionId, userProgress])

  // Load Pyodide for Python
  useEffect(() => {
    let mounted = true

    const initializePyodide = async () => {
      try {
        if (!window.loadPyodide) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script")
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js"
            script.onload = resolve
            script.onerror = reject
            document.head.appendChild(script)
          })
        }

        if (!mounted) return

        const pyodide = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/",
        })

        if (!mounted) return

        pyodideRef.current = pyodide
        setPyodideReady(true)
      } catch (error) {
        console.error("Failed to load Pyodide:", error)
      }
    }

    initializePyodide()

    return () => {
      mounted = false
    }
  }, [])

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value
    setSelectedLanguage(newLanguage)

    const practices = codingPracticesData[newLanguage] || []
    if (practices.length > 0) {
      const firstPractice = practices[0]
      setSelectedPractice(firstPractice)
      navigate(`/practice/${firstPractice.id}`)
    }
  }

  const handlePracticeSelect = (practice) => {
    setSelectedPractice(practice)
    navigate(`/practice/${practice.id}`)
  }

  const handleQuestionSelect = (question) => {
    navigate(`/practice/${practiceId}/${question.id}`, {
      state: {
        subtopicId,
        goalName,
        courseName,
      },
    })
  }

  const handleBackToPractice = () => {
    navigate(`/practice/${practiceId}`, {
      state: {
        subtopicId,
        goalName,
        courseName,
      },
    })
  }

  const isEmptyCode = (userCode) => {
    if (!userCode) return true
    const cleanCode = userCode
      .replace(/\/\/.*$|\/\*[\s\S]*?\*\//gm, "")
      .replace(/#.*$/gm, "")
      .replace(/\s/g, "")
    return cleanCode === ""
  }

  const updateQuestionStatus = async (questionId, passed, score) => {
    try {
      const attemptData = {
        passed,
        score: passed ? score : 0,
        timestamp: new Date().toISOString(),
      }

      const response = await CodingPracticeService.saveProgress(
        practiceId,
        questionId,
        selectedLanguage,
        code,
        passed ? "solved" : "attempted",
        passed ? score : 0,
        attemptData,
      )

      if (response.success) {
        setUserProgress((prev) => ({
          ...prev,
          [questionId]: {
            status: passed ? "solved" : "attempted",
            code: code,
            lastAttempt: new Date().toISOString(),
            score: passed ? score : 0,
            attempts: prev[questionId]?.attempts ? [...prev[questionId].attempts, attemptData] : [attemptData],
          },
        }))
      }
    } catch (error) {
      console.error("Failed to update question status:", error)
    }
  }

  const runJavaScriptStandalone = useCallback(async (userCode, inputLines = []) => {
    setIsRunning(true)
    let result = ""
    try {
      const logs = []
      const originalLog = console.log
      console.log = (...args) => {
        const message = args
          .map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)))
          .join(" ")
        logs.push(message)
        originalLog.apply(console, args)
      }

      let inputIndex = 0
      const mockInput = (prompt = "") => {
        if (inputIndex < inputLines.length) {
          return inputLines[inputIndex++]
        }
        return ""
      }

      window.prompt = mockInput

      try {
        const func = new Function(userCode)
        func()
      } catch (err) {
        logs.push(`Error: ${err.message}`)
      } finally {
        console.log = originalLog
        delete window.prompt
      }

      result = logs.join("\n") || "Code executed successfully (no console output)"
      return result
    } catch (err) {
      result = `Error: ${err.message}`
      return result
    } finally {
      setIsRunning(false)
    }
  }, [])

  const runPython = useCallback(async (userCode, inputLines = []) => {
    setIsRunning(true)
    let result = ""

    try {
      if (!pyodideRef.current) {
        result = "Python environment is still loading. Please wait..."
        return result
      }

      const pyodide = pyodideRef.current
      let inputIndex = 0

      pyodide.globals.set("__python_input__", () => {
        if (inputIndex < inputLines.length) {
          return inputLines[inputIndex++]
        }
        return ""
      })

      await pyodide.runPythonAsync(`
import sys
import io
import builtins

class OutputCapture(io.StringIO):
    def __init__(self):
        super().__init__()
        self.contents = ""
    
    def write(self, text):
        self.contents += text
        return len(text)
    
    def get_value(self):
        return self.contents

output_capture = OutputCapture()
sys.stdout = output_capture
sys.stderr = output_capture

_original_input = builtins.input

def custom_input(prompt=""):
    result = __python_input__()
    return result

builtins.input = custom_input
`)

      await pyodide.runPythonAsync(userCode)
      const output = await pyodide.runPythonAsync("output_capture.get_value()")
      result = output.trim() || "Python code executed successfully (no output)"
    } catch (err) {
      result = `Error: ${err.message}\n`
    } finally {
      setIsRunning(false)
      return result
    }
  }, [])

  const executeCode = async (userCode, testCaseInput) => {
    const inputLines = testCaseInput ? testCaseInput.split("\n").filter((line) => line.trim() !== "") : []

    let result = ""
    try {
      if (selectedLanguage === "python") {
        result = await runPython(userCode, inputLines)
      } else if (selectedLanguage === "javascript") {
        result = await runJavaScriptStandalone(userCode, inputLines)
      } else {
        result = "Unsupported language"
      }
    } catch (error) {
      result = `Execution error: ${error.message}`
    }

    return result
  }

  const handleRunCode = async () => {
    if (!selectedQuestion) return

    if (isEmptyCode(code)) {
      setOutput("❌ No code to execute. Please write your solution.")
      setIsRunning(false)
      return
    }

    setIsRunning(true)
    setOutput("Running code...")
    setExecutionResult(null)

    try {
      const results = []
      let passedCount = 0

      for (let i = 0; i < selectedQuestion.testCases.length; i++) {
        const testCase = selectedQuestion.testCases[i]
        const actualOutput = await executeCode(code, testCase.input)

        const cleanActualOutput = actualOutput.trim()
        const cleanExpectedOutput = testCase.output.trim()

        const passed = cleanActualOutput === cleanExpectedOutput

        if (passed) passedCount++

        results.push({
          ...testCase,
          passed,
          actualOutput: cleanActualOutput,
          expectedOutput: cleanExpectedOutput,
          id: i,
        })
      }

      setTestResults(results)
      setExecutionResult({
        total: selectedQuestion.testCases.length,
        passed: passedCount,
        failed: selectedQuestion.testCases.length - passedCount,
      })

      setOutput(`Execution completed: ${passedCount}/${selectedQuestion.testCases.length} test cases passed`)
    } catch (error) {
      setOutput(`Error during execution: ${error.message}`)
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmitCode = async () => {
    if (!selectedQuestion) return

    if (isEmptyCode(code)) {
      setOutput("❌ Cannot submit empty code. Please write your solution.")
      setIsRunning(false)
      return
    }

    setIsRunning(true)
    setOutput("Submitting code...")

    try {
      const results = []
      let passedCount = 0

      for (let i = 0; i < selectedQuestion.testCases.length; i++) {
        const testCase = selectedQuestion.testCases[i]
        const actualOutput = await executeCode(code, testCase.input)

        const cleanActualOutput = actualOutput.trim()
        const cleanExpectedOutput = testCase.output.trim()

        const passed = cleanActualOutput === cleanExpectedOutput

        if (passed) passedCount++

        results.push({
          ...testCase,
          passed,
          actualOutput: cleanActualOutput,
          expectedOutput: cleanExpectedOutput,
          id: i,
        })
      }

      const allPassed = passedCount === selectedQuestion.testCases.length

      setTestResults(results)
      setExecutionResult({
        total: selectedQuestion.testCases.length,
        passed: passedCount,
        failed: selectedQuestion.testCases.length - passedCount,
      })

      await updateQuestionStatus(selectedQuestion.id, allPassed, selectedQuestion.score)

      if (allPassed) {
        setOutput("✅ All test cases passed! Submission successful.")

        // Check if all questions in practice are now solved
        const allQuestionsSolved = selectedPractice.questions.every((question) => {
          if (question.id === selectedQuestion.id) {
            return true // Current question is solved
          }
          return userProgress[question.id]?.status === "solved"
        })

        if (allQuestionsSolved && practiceId && !isPracticeCompleted) {
          setOutput(
            "✅ All test cases passed! 🎉 All questions in this practice are now solved! Marking practice as complete...",
          )

          setIsMarkingComplete(true)
          await CodingPracticeService.completePractice(practiceId, goalName, courseName)
          await loadProgressSummary()
          await checkPracticeCompletion()
          setIsMarkingComplete(false)

          setOutput("✅ All test cases passed! 🎉 Practice completed successfully!")
        }
      } else {
        setOutput(`❌ Submission failed: ${passedCount}/${selectedQuestion.testCases.length} test cases passed.`)
      }
    } catch (error) {
      setOutput(`Error during submission: ${error.message}`)
    } finally {
      setIsRunning(false)
    }
  }

  const getQuestionStatus = (questionId) => {
    return userProgress[questionId]?.status || "unsolved"
  }

  const getQuestionAttempts = (questionId) => {
    return userProgress[questionId]?.attempts || []
  }

  const practices = codingPracticesData[selectedLanguage] || []

  if (loading) {
    return (
      <div className="loading-state-prac">
        <h3>Loading Practice...</h3>
      </div>
    )
  }

  if (!selectedPractice) {
    return (
      <div className="loading-state-prac">
        <h3>Loading Practice...</h3>
      </div>
    )
  }

  if (questionId && selectedQuestion) {
    const currentStatus = getQuestionStatus(selectedQuestion.id)
    const attempts = getQuestionAttempts(selectedQuestion.id)

    return (
      <div className="practice-full-question-prac">
        <div className="full-question-header-prac">
          <button className="back-button-prac" onClick={handleBackToPractice}>
            ← <span className="practice-name-prac">{selectedPractice.title}</span>
          </button>
          <div className="full-question-title-prac">
            <div className="full-question-meta-prac">
              <span className={`status-indicator-prac ${currentStatus} large-prac`}>
                {currentStatus === "solved" ? "✓ Solved" : currentStatus === "attempted" ? "● Attempted" : "○ Unsolved"}
              </span>
              <span className={`difficulty-badge-prac large-prac ${selectedQuestion.difficulty.toLowerCase()}`}>
                {selectedQuestion.difficulty}
              </span>
              <span className="score-badge-prac">{selectedQuestion.score} points</span>
              {isPracticeCompleted && <span className="completed-badge-prac">✓ Practice Completed</span>}
              {areAllQuestionsSolved && !isPracticeCompleted && (
                <span className="completing-badge-prac">● Completing Practice...</span>
              )}
            </div>
          </div>
        </div>

        <div className="full-question-content-prac">
          <div className="full-question-detail-prac">
            <div className="question-description-section-prac">
              <h3>Description</h3>
              <span className="practice-name-prac">{selectedQuestion.title}</span>
              <div className="description-content-prac">
                <p>{selectedQuestion.description}</p>
              </div>
            </div>

            <div className="sample-io-section-prac">
              <div className="sample-input-prac">
                <h3>Sample Input</h3>
                <div className="code-block-prac">
                  <pre>{selectedQuestion.sampleInput || "No input provided"}</pre>
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
                {executionResult && (
                  <div className="execution-summary-prac">
                    <span className="summary-text-prac">
                      {executionResult.passed}/{executionResult.total} test cases passed
                    </span>
                    <div className="progress-bar-prac">
                      <div
                        className="progress-fill-prac"
                        style={{
                          width: `${(executionResult.passed / executionResult.total) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="test-cases-grid-prac">
                {selectedQuestion.testCases.map((testCase, index) => (
                  <div key={index} className={`test-case-prac ${testCase.visible ? "visible-prac" : "hidden-prac"}`}>
                    <div className="test-case-header-prac">
                      <span className="test-case-number-prac">Test Case {index + 1}</span>
                      <span
                        className={`test-case-visibility-prac ${testCase.visible ? "visible-prac" : "hidden-prac"}`}
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
                      <div className="test-execution-result-prac">
                        <div
                          className={`test-result-prac ${testResults[index].passed ? "passed-prac" : "failed-prac"}`}
                        >
                          {testResults[index].passed ? "✓ Passed" : "✗ Failed"}
                        </div>
                        {!testResults[index].passed && testCase.visible && (
                          <div className="output-comparison-prac">
                            <div className="output-row-prac">
                              <span className="output-label-prac">Your Output:</span>
                              <div className="code-block-prac small-prac error-prac">
                                <pre>{testResults[index].actualOutput || "(empty)"}</pre>
                              </div>
                            </div>
                            <div className="output-row-prac">
                              <span className="output-label-prac">Expected Output:</span>
                              <div className="code-block-prac small-prac success-prac">
                                <pre>{testResults[index].expectedOutput}</pre>
                              </div>
                            </div>
                          </div>
                        )}
                        {testResults[index].passed && testCase.visible && (
                          <div className="output-comparison-prac">
                            <div className="output-row-prac">
                              <span className="output-label-prac">Your Output:</span>
                              <div className="code-block-prac small-prac success-prac">
                                <pre>{testResults[index].actualOutput}</pre>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="full-code-editor-section-prac">
            <div className="editor-header-prac">
              <div className="editor-title-prac">
                <div className="editor-info-prac">
                  {selectedLanguage === "python"
                    ? "Python 3.10"
                    : selectedLanguage === "javascript"
                      ? "JavaScript"
                      : "Other"}{" "}
                  | Lines: {code.split("\n").length} | Length: {code.length}
                  {isEmptyCode(code) && <span className="empty-warning-prac"> • Empty code!</span>}
                  {selectedLanguage === "python" && !pyodideReady && (
                    <span className="loading-warning-prac"> • Loading Python...</span>
                  )}
                  {isPracticeCompleted && <span className="completed-warning-prac"> • Practice Completed ✓</span>}
                  {areAllQuestionsSolved && !isPracticeCompleted && (
                    <span className="completing-warning-prac"> • Completing Practice...</span>
                  )}
                </div>
              </div>
              <div className="editor-controls-prac">
                <div className="editor-actions-prac">
                  <button
                    className="run-button-prac"
                    onClick={handleRunCode}
                    disabled={isRunning || (selectedLanguage === "python" && !pyodideReady)}
                  >
                    {isRunning ? <span className="loader-prac"></span> : "Run"}
                  </button>
                  <button
                    className="submit-button-prac"
                    onClick={handleSubmitCode}
                    disabled={
                      isRunning ||
                      isEmptyCode(code) ||
                      (selectedLanguage === "python" && !pyodideReady) ||
                      isPracticeCompleted
                    }
                  >
                    {isRunning ? (
                      <span className="loader-prac"></span>
                    ) : isMarkingComplete ? (
                      "Marking..."
                    ) : isPracticeCompleted ? (
                      "✓ Practice Completed"
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

            <div className="output-section-prac">
              <div className="output-header-prac">
                <h4>Execution Result</h4>
                {output && (
                  <span
                    className={`output-status-prac ${
                      output.includes("✅") ? "success-prac" : output.includes("❌") ? "error-prac" : "info-prac"
                    }`}
                  >
                    {output.includes("✅") ? "Success" : output.includes("❌") ? "Failed" : "Running"}
                  </span>
                )}
              </div>
              <div className="output-container-prac">
                <pre className="output-content-prac">{output}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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
                className={`practice-item-prac ${selectedPractice?.id === practice.id ? "active-prac" : ""}`}
                onClick={() => handlePracticeSelect(practice)}
              >
                <div className="practice-title-prac">{practice.title}</div>
                <div className="practice-description-prac">{practice.description}</div>
                <div className="practice-stats-prac">
                  {practice.questions.filter((q) => getQuestionStatus(q.id) === "solved").length} /{" "}
                  {practice.questions.length} solved
                  {isPracticeCompleted && <span className="practice-completed-badge">✓ Completed</span>}
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
                  {isPracticeCompleted && <span className="practice-completed-header">✓ Practice Completed</span>}
                  {areAllQuestionsSolved && !isPracticeCompleted && (
                    <span className="practice-completing-header">● Completing Practice...</span>
                  )}
                </div>
                <div className="questions-stats-prac">
                  {selectedPractice.questions.length} questions
                  {areAllQuestionsSolved && <span className="all-solved-indicator"> • All Solved!</span>}
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
                      <th>Last Attempt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPractice.questions.map((question) => {
                      const status = getQuestionStatus(question.id)
                      const attempts = getQuestionAttempts(question.id)
                      const lastAttempt = attempts.length > 0 ? attempts[attempts.length - 1] : null

                      return (
                        <tr
                          key={question.id}
                          className={`question-row-prac ${
                            status === "solved" ? "solved-prac" : status === "attempted" ? "attempted-prac" : ""
                          }`}
                          onClick={() => handleQuestionSelect(question)}
                        >
                          <td className="status-cell-prac">
                            <span className={`status-indicator-prac ${status}`}>
                              {status === "solved" ? "✓" : status === "attempted" ? "●" : "○"}
                            </span>
                          </td>
                          <td className="question-title-cell-prac">
                            <div className="question-title-main-prac">{question.title}</div>
                            <div className="question-description-prac">{question.description}</div>
                          </td>
                          <td className="difficulty-cell-prac">
                            <span className={`difficulty-badge-prac ${question.difficulty.toLowerCase()}`}>
                              {question.difficulty}
                            </span>
                          </td>
                          <td className="score-cell-prac">
                            {lastAttempt ? `${lastAttempt.score}/${question.score}` : `0/${question.score}`} pts
                          </td>
                          <td className="attempts-cell-prac">
                            {lastAttempt ? (
                              <div className="attempts-info-prac">
                                <span className="attempts-count-prac">{lastAttempt.passed ? "Passed" : "Failed"}</span>
                                <span className="attempts-date-prac">
                                  {new Date(lastAttempt.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                            ) : (
                              <span className="no-attempts-prac">Not attempted</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Practice
