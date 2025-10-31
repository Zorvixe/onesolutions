"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Practice.css";
import { codingPracticesData } from "../../codingPracticesData/codingPracticesData";
import AceEditor from "react-ace";

// Import Ace modes & themes
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

// Import SQL.js
import initSqlJs from "sql.js";

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
  const [theme] = useState("monokai");
  const [fontSize] = useState(14);
  const [executionResult, setExecutionResult] = useState(null);
  const [userProgress, setUserProgress] = useState({});

  // CodePlayground integration states
  const [pyodideReady, setPyodideReady] = useState(false);
  const pyodideRef = useRef(null);
  const [sqlJs, setSqlJs] = useState(null);
  const [db, setDb] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const inputIndexRef = useRef(0);

  // Load user progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem("codingPracticeProgress");
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save user progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "codingPracticeProgress",
      JSON.stringify(userProgress)
    );
  }, [userProgress]);

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
        // Load saved code or use default code
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

  // Load Pyodide for Python - FIXED VERSION
  useEffect(() => {
    let mounted = true;

    const initializePyodide = async () => {
      try {
        // Load Pyodide if not already loaded
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

  // Load SQL.js - From CodePlayground
  useEffect(() => {
    const loadSqlJs = async () => {
      try {
        const SQL = await initSqlJs({
          locateFile: (file) => `https://sql.js.org/dist/${file}`,
        });
        setSqlJs(SQL);
        const database = new SQL.Database();
        setDb(database);
      } catch (error) {
        console.error("Failed to load SQL.js:", error);
      }
    };
    loadSqlJs();
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
    navigate(`/practice/${practiceId}/${question.id}`);
  };

  const handleBackToPractice = () => {
    navigate(`/practice/${practiceId}`);
  };

  const isEmptyCode = (userCode) => {
    if (!userCode) return true;
    const cleanCode = userCode
      .replace(/\/\/.*$|\/\*[\s\S]*?\*\//gm, "") // Remove comments
      .replace(/#.*$/gm, "") // Remove Python comments
      .replace(/\s/g, ""); // Remove all whitespace
    return cleanCode === "";
  };

  const updateQuestionStatus = (questionId, passed, score) => {
    setUserProgress((prev) => ({
      ...prev,
      [questionId]: {
        status: passed ? "solved" : "attempted",
        code: code,
        lastAttempt: new Date().toISOString(),
        score: passed ? score : 0,
        attempts: [
          ...(prev[questionId]?.attempts || []),
          {
            passed,
            score: passed ? score : 0,
            timestamp: new Date().toISOString(),
          },
        ],
      },
    }));
  };

  // Enhanced execution functions from CodePlayground - FIXED OUTPUT CAPTURE
  const runJavaScriptStandalone = useCallback(async (userCode) => {
    setIsRunning(true);
    let result = "";
    try {
      // Capture console.log output
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => {
        const message = args
          .map((arg) =>
            typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
          )
          .join(" ");
        logs.push(message);
        originalLog.apply(console, args);
      };

      try {
        // Use Function constructor to execute the code
        const func = new Function(userCode);
        func();
      } catch (err) {
        logs.push(`Error: ${err.message}`);
      } finally {
        console.log = originalLog;
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
  }, []);

  // FIXED Python execution with proper output capture
  const runPython = useCallback(
    async (userCode) => {
      setIsRunning(true);
      let result = "";

      try {
        if (!pyodideRef.current) {
          result = "Python environment is still loading. Please wait...";
          return result;
        }

        const pyodide = pyodideRef.current;

        // Set up input handling
        const inputLines = inputValue
          .split("\n")
          .filter((line) => line.trim() !== "");
        let inputIndex = 0;

        // Set up custom input function
        pyodide.globals.set("__python_input__", () => {
          if (inputIndex < inputLines.length) {
            return inputLines[inputIndex++];
          }
          return "";
        });

        // Inject input function replacement and output capture
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

# Capture both stdout and stderr
output_capture = OutputCapture()
sys.stdout = output_capture
sys.stderr = output_capture

# Override input function
_original_input = builtins.input

def custom_input(prompt=""):
    if prompt:
        output_capture.write(prompt)
    result = __python_input__()
    if result:
        output_capture.write(result + "\\n")
    return result

builtins.input = custom_input
`);

        // Execute the Python code
        await pyodide.runPythonAsync(userCode);

        // Get the captured output
        const output = await pyodide.runPythonAsync(
          "output_capture.get_value()"
        );
        result = output || "Python code executed successfully (no output)";
      } catch (err) {
        result = `Error: ${err.message}\n`;
      } finally {
        setIsRunning(false);
        return result;
      }
    },
    [inputValue]
  );

  // Enhanced Java execution with proper simulation from CodePlayground
  const runJava = useCallback(
    async (userCode) => {
      setIsRunning(true);
      let result = "";

      try {
        // Enhanced Java code analysis and execution simulation
        const javaCode = userCode;
        const outputLines = [];

        // Input simulation
        const inputLines = inputValue
          .split("\n")
          .filter((line) => line.trim() !== "");
        let inputIndex = 0;

        // Simple Java code interpreter for common patterns
        const interpretJavaCode = (code) => {
          const lines = code.split("\n");

          // Look for main method
          const mainMethodIndex = lines.findIndex((line) =>
            line.includes("public static void main")
          );
          if (mainMethodIndex === -1) {
            return ["Error: No main method found"];
          }

          // Process each line in main method scope
          for (let i = mainMethodIndex; i < lines.length; i++) {
            const line = lines[i].trim();

            // Handle System.out.println
            if (line.includes("System.out.println")) {
              const match = line.match(/System\.out\.println\((.*)\);/);
              if (match) {
                let content = match[1];

                // Handle string concatenation
                if (content.includes("+")) {
                  content = content
                    .split("+")
                    .map((part) => {
                      part = part.trim().replace(/["']/g, "");
                      // Handle variable substitution for common patterns
                      if (part === "i") return "${i}";
                      if (part === "num") return "${num}";
                      return part;
                    })
                    .join(" ");

                  // Simple variable evaluation for common cases
                  if (content.includes("${i}")) {
                    // This is likely inside a loop - simulate loop output
                    for (let i = 1; i <= 5; i++) {
                      outputLines.push(content.replace("${i}", i));
                    }
                  } else {
                    outputLines.push(content);
                  }
                } else {
                  // Remove quotes and add to output
                  content = content.replace(/["']/g, "");
                  if (content && content !== '""') {
                    outputLines.push(content);
                  }
                }
              }
            }

            // Handle for loops with variable i
            if (
              line.includes("for (int i =") &&
              line.includes("i <") &&
              line.includes("i++")
            ) {
              const match = line.match(
                /for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\+\+\s*\)/
              );
              if (match) {
                const start = parseInt(match[1]);
                const end = parseInt(match[2]);
                for (let i = start; i < end; i++) {
                  outputLines.push(i.toString());
                }
              }
            }

            // Handle Scanner input patterns
            if (line.includes("nextInt()") && inputIndex < inputLines.length) {
              inputIndex++; // Consume input
            }
          }
        };

        interpretJavaCode(javaCode);

        if (outputLines.length > 0) {
          result = outputLines.join("\n");
        } else {
          result = `Java Code Analysis:

Your Java code has been processed in simulation mode.

Code Structure:
- ${
            javaCode.includes("public class")
              ? "✓ Class definition found"
              : "✗ No class definition"
          }
- ${
            javaCode.includes("main(String[] args)")
              ? "✓ Main method found"
              : "✗ No main method"
          }
- ${
            javaCode.includes("System.out.println")
              ? `✓ ${
                  (javaCode.match(/System\.out\.println/g) || []).length
                } print statements`
              : "✗ No output statements"
          }
- ${
            javaCode.includes("Scanner")
              ? "✓ Scanner input detected"
              : "✗ No Scanner input"
          }
- ${
            javaCode.includes("for (") || javaCode.includes("while (")
              ? "✓ Loop structures detected"
              : "✗ No loops detected"
          }

Input Provided: ${inputValue || "None"}

For full Java execution, set up a remote runner.`;
        }
        return result;
      } catch (err) {
        result = `Error: ${err.message}`;
        return result;
      } finally {
        setIsRunning(false);
      }
    },
    [inputValue]
  );

  const runSQL = useCallback(
    async (userCode) => {
      setIsRunning(true);
      let result = "";

      if (!sqlJs || !db) {
        setIsRunning(false);
        result =
          "SQL database is still loading. Please wait a moment and try again.";
        return result;
      }

      try {
        let outputText = "";
        const statements = userCode.split(";").filter((stmt) => stmt.trim());

        for (const statement of statements) {
          if (!statement.trim()) continue;

          try {
            const stmtUpper = statement.trim().toUpperCase();
            if (
              stmtUpper.startsWith("SELECT") ||
              stmtUpper.startsWith("PRAGMA") ||
              stmtUpper.startsWith("EXPLAIN")
            ) {
              const result = db.exec(statement);
              if (result.length > 0) {
                const columns = result[0].columns;
                const values = result[0].values;

                // Calculate column widths
                const colWidths = columns.map((col, index) => {
                  const maxDataWidth = Math.max(
                    ...values.map((row) => String(row[index] || "").length)
                  );
                  return Math.max(col.length, maxDataWidth, 3);
                });

                // Create header
                const header = columns
                  .map((col, i) =>
                    col.padEnd(colWidths[i] + 1).padStart(colWidths[i] + 2)
                  )
                  .join("│");

                const separator = colWidths
                  .map((width) => "─".repeat(width + 2))
                  .join("┼");

                outputText +=
                  "┌" +
                  colWidths.map((width) => "─".repeat(width + 2)).join("┬") +
                  "┐\n";
                outputText += "│" + header + "│\n";
                outputText += "├" + separator + "┤\n";

                // Add rows
                values.forEach((row) => {
                  const rowStr =
                    "│" +
                    row
                      .map((cell, i) =>
                        String(cell || "")
                          .padEnd(colWidths[i] + 1)
                          .padStart(colWidths[i] + 2)
                      )
                      .join("│") +
                    "│";
                  outputText += rowStr + "\n";
                });

                outputText +=
                  "└" +
                  colWidths.map((width) => "─".repeat(width + 2)).join("┴") +
                  "┘\n";
                outputText += `\n${values.length} row(s) returned\n\n`;
              } else {
                outputText += "Query executed successfully (no results)\n\n";
              }
            } else {
              db.run(statement);
              const changes = db.getRowsModified();
              outputText += `✓ ${
                statement.split(" ")[0]
              } executed successfully. ${changes} row(s) affected.\n\n`;
            }
          } catch (err) {
            outputText += `✗ Error in statement: ${err.message}\n\n`;
          }
        }

        result = outputText || "No SQL statements to execute.";
        return result;
      } catch (err) {
        result = `SQL Error: ${err.message}`;
        return result;
      } finally {
        setIsRunning(false);
      }
    },
    [sqlJs, db]
  );

  const executeCode = async (userCode, testCaseInput) => {
    // Set input value for this specific test case
    const originalInputValue = inputValue;
    setInputValue(testCaseInput || "");

    let result = "";
    try {
      if (selectedLanguage === "python") {
        result = await runPython(userCode);
      } else if (selectedLanguage === "javascript") {
        result = await runJavaScriptStandalone(userCode);
      } else if (selectedLanguage === "java") {
        result = await runJava(userCode);
      } else if (selectedLanguage === "sql") {
        result = await runSQL(userCode);
      } else {
        result = "Unsupported language";
      }
    } catch (error) {
      result = `Execution error: ${error.message}`;
    }

    // Restore original input value
    setInputValue(originalInputValue);
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

    try {
      const results = [];
      let passedCount = 0;

      for (let i = 0; i < selectedQuestion.testCases.length; i++) {
        const testCase = selectedQuestion.testCases[i];
        const actualOutput = await executeCode(code, testCase.input);
        const passed = actualOutput.trim() === testCase.output.trim();

        if (passed) passedCount++;

        results.push({
          ...testCase,
          passed,
          actualOutput,
          expectedOutput: testCase.output,
          id: i,
        });
      }

      setTestResults(results);
      setExecutionResult({
        total: selectedQuestion.testCases.length,
        passed: passedCount,
        failed: selectedQuestion.testCases.length - passedCount,
      });

      setOutput(
        `Execution completed: ${passedCount}/${selectedQuestion.testCases.length} test cases passed`
      );
    } catch (error) {
      setOutput(`Error during execution: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
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

    try {
      const results = [];
      let passedCount = 0;

      for (let i = 0; i < selectedQuestion.testCases.length; i++) {
        const testCase = selectedQuestion.testCases[i];
        const actualOutput = await executeCode(code, testCase.input);
        const passed = actualOutput.trim() === testCase.output.trim();

        if (passed) passedCount++;

        results.push({
          ...testCase,
          passed,
          actualOutput,
          expectedOutput: testCase.output,
          id: i,
        });
      }

      const allPassed = passedCount === selectedQuestion.testCases.length;

      setTestResults(results);
      setExecutionResult({
        total: selectedQuestion.testCases.length,
        passed: passedCount,
        failed: selectedQuestion.testCases.length - passedCount,
      });

      // Update question status
      updateQuestionStatus(
        selectedQuestion.id,
        allPassed,
        selectedQuestion.score
      );

      if (allPassed) {
        setOutput("✅ All test cases passed! Submission successful.");
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

  if (!selectedPractice) {
    return (
      <div className="loading-state-prac">
        <h3>Loading Practice...</h3>
      </div>
    );
  }

  if (questionId && selectedQuestion) {
    const currentStatus = getQuestionStatus(selectedQuestion.id);
    const attempts = getQuestionAttempts(selectedQuestion.id);

    return (
      <div className="practice-full-question-prac">
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
              <div className="test-cases-header-prac">
                <h3>Test Cases</h3>
                {executionResult && (
                  <div className="execution-summary-prac">
                    <span className="summary-text-prac">
                      {executionResult.passed}/{executionResult.total} test
                      cases passed
                    </span>
                    <div className="progress-bar-prac">
                      <div
                        className="progress-fill-prac"
                        style={{
                          width: `${
                            (executionResult.passed / executionResult.total) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
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
                      <div className="test-execution-result-prac">
                        <div
                          className={`test-result-prac ${
                            testResults[index].passed
                              ? "passed-prac"
                              : "failed-prac"
                          }`}
                        >
                          {testResults[index].passed ? "✓ Passed" : "✗ Failed"}
                        </div>
                        {!testResults[index].passed && testCase.visible && (
                          <div className="output-comparison-prac">
                            <div className="output-row-prac">
                              <span className="output-label-prac">
                                Your Output:
                              </span>
                              <div className="code-block-prac small-prac error-prac">
                                <pre>
                                  {testResults[index].actualOutput || "(empty)"}
                                </pre>
                              </div>
                            </div>
                            <div className="output-row-prac">
                              <span className="output-label-prac">
                                Expected Output:
                              </span>
                              <div className="code-block-prac small-prac success-prac">
                                <pre>{testResults[index].expectedOutput}</pre>
                              </div>
                            </div>
                          </div>
                        )}
                        {testResults[index].passed && testCase.visible && (
                          <div className="output-comparison-prac">
                            <div className="output-row-prac">
                              <span className="output-label-prac">
                                Your Output:
                              </span>
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
                    : selectedLanguage === "java"
                    ? "Java"
                    : "SQL"}{" "}
                  | Lines: {code.split("\n").length} | Length: {code.length}
                  {isEmptyCode(code) && (
                    <span className="empty-warning-prac"> • Empty code!</span>
                  )}
                  {selectedLanguage === "python" && !pyodideReady && (
                    <span className="loading-warning-prac">
                      {" "}
                      • Loading Python...
                    </span>
                  )}
                  {selectedLanguage === "sql" && !sqlJs && (
                    <span className="loading-warning-prac">
                      {" "}
                      • Loading SQL...
                    </span>
                  )}
                </div>
              </div>
              <div className="editor-controls-prac">
                <div className="editor-actions-prac">
                  <button
                    className="run-button-prac"
                    onClick={handleRunCode}
                    disabled={
                      isRunning ||
                      (selectedLanguage === "python" && !pyodideReady) ||
                      (selectedLanguage === "sql" && !sqlJs)
                    }
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
                      (selectedLanguage === "sql" && !sqlJs)
                    }
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
                      output.includes("✅")
                        ? "success-prac"
                        : output.includes("❌")
                        ? "error-prac"
                        : "info-prac"
                    }`}
                  >
                    {output.includes("✅")
                      ? "Success"
                      : output.includes("❌")
                      ? "Failed"
                      : "Running"}
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
                <h3>Questions - {selectedPractice.title}</h3>
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
                                <span className="attempts-score-prac">
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
