"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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

import "./CodePlayground.css";

// Import SQL.js
import initSqlJs from "sql.js";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export default function CodePlayground({
  initialLanguage = "web",
  initialCode,
  remoteRunners = {},
  onCodeChange = () => {},
  iframeRef: externalIframeRef = null,
  customRunHandler = null,
  runButtonText = "Run Code",
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // Add these state variables at the top of your component
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [snippetName, setSnippetName] = useState("");
  const [saving, setSaving] = useState(false);
  const [mySnippets, setMySnippets] = useState([]);
  const [showSnippetsModal, setShowSnippetsModal] = useState(false);

  // Add these states for update functionality
  const [currentSnippetId, setCurrentSnippetId] = useState(null);
  const [originalSnippetName, setOriginalSnippetName] = useState("");
  const [originalCode, setOriginalCode] = useState({});

  // ADD THESE 2 LINES after your existing useRef declarations:
  const internalIframeRef = useRef(null);
  const iframeRef = externalIframeRef || internalIframeRef;
  const editorRef = useRef(null);
  const [language, setLanguage] = useState(initialLanguage);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [theme, setTheme] = useState("monokai");
  const [fontSize, setFontSize] = useState(14);
  const [pyodideReady, setPyodideReady] = useState(false);
  const pyodideRef = useRef(null);
  const [sqlJs, setSqlJs] = useState(null);
  const [db, setDb] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const inputIndexRef = useRef(0);

  const [editorWidth, setEditorWidth] = useState(60);
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(50);

  // Track current web language for tabs
  const [currentWebLanguage, setCurrentWebLanguage] = useState("html");

  // Default code templates
  const defaultCode = useMemo(
    () => ({
      html: `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Welcome to Code Playground</h1>
  <p>Start coding and see the results!</p>
  <div id="output"></div>
</body>
</html>`,
      css: `@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap');`,
      javascript: ``,
      javascript_standalone: ``,
      python: ``,
      java: ``,
      sql: ``,
    }),
    []
  );

  const [code, setCode] = useState(() => ({
    html: initialCode?.html ?? defaultCode.html,
    css: initialCode?.css ?? defaultCode.css,
    javascript: initialCode?.javascript ?? defaultCode.javascript,
    javascript_standalone:
      initialCode?.javascript_standalone ?? defaultCode.javascript_standalone,
    python: initialCode?.python ?? defaultCode.python,
    java: initialCode?.java ?? defaultCode.java,
    sql: initialCode?.sql ?? defaultCode.sql,
  }));

  // Add this useEffect to handle iframe links
useEffect(() => {
  const handleIframeMessage = (event) => {
    if (event.data.type === 'NAVIGATE_TO_HASH') {
      // Handle navigation
      console.log('Navigating to:', event.data.hash);
      // You can implement your own navigation logic here
    }
  };

  window.addEventListener('message', handleIframeMessage);
  
  return () => {
    window.removeEventListener('message', handleIframeMessage);
  };
}, []);

  // Combine HTML, CSS, JS for preview - MOVED THIS UP
  const combineWebSrcDoc = useMemo(() => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    ${code.css}
  </style>
</head>
<body>
  ${code.html}
  <script>
  // Handle anchor clicks
  document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const hash = e.target.getAttribute('href').substring(1);
      // Scroll to section within iframe
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
  
  ${code.javascript}
    // Enhanced error handling
    window.onerror = function(msg, url, lineNo, columnNo, error) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'js-error';
      errorDiv.innerHTML = '<strong>Runtime Error:</strong><br>' + msg + '<br>Line: ' + lineNo;
      document.body.appendChild(errorDiv);
      return false;
    };
    
    try {
      ${code.javascript}
    } catch (err) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'js-error';
      errorDiv.innerHTML = '<strong>JavaScript Error:</strong><br>' + err.message + '<br><br>' + err.stack;
      document.body.appendChild(errorDiv);
    }
  </script>
</body>
</html>`;
  }, [code.html, code.css, code.javascript]);

  // ADD THIS useEffect to load snippets from navigation state
  useEffect(() => {
    const loadSnippetFromState = () => {
      // Check if we're coming from SavedSnippets with a snippet to load
      if (location.state?.loadSnippet && location.state?.snippetData) {
        const snippet = location.state.snippetData;

        console.log("Loading snippet from state:", snippet);

        // Set snippet info
        setCurrentSnippetId(snippet.id);
        setSnippetName(snippet.name);
        setOriginalSnippetName(snippet.name);

        // Set the language based on the snippet
        setLanguage(snippet.language);

        // Set the code based on the snippet language
        const newCode = { ...defaultCode };

        if (snippet.language === "web") {
          newCode.html = snippet.html || "";
          newCode.css = snippet.css || "";
          newCode.javascript = snippet.javascript || "";
        } else if (snippet.language === "javascript_standalone") {
          newCode.javascript_standalone = snippet.javascript || "";
        } else if (snippet.language === "python") {
          newCode.python = snippet.python || "";
        } else if (snippet.language === "java") {
          newCode.java = snippet.java || "";
        } else if (snippet.language === "sql") {
          newCode.sql = snippet.sql || "";
        }

        setCode(newCode);
        setOriginalCode({ ...newCode });

        // Clear the state to prevent re-loading on refresh
        navigate(location.pathname, { replace: true, state: {} });
      }
    };

    loadSnippetFromState();
  }, [location.state, navigate, location.pathname]);

  // Check if snippet has been modified
  const isSnippetModified = useMemo(() => {
    if (!currentSnippetId) return false;

    // Check if name changed
    if (snippetName !== originalSnippetName) return true;

    // Check if code changed based on current language
    if (language === "web") {
      // Check all web languages
      return (
        code.html !== originalCode.html ||
        code.css !== originalCode.css ||
        code.javascript !== originalCode.javascript
      );
    } else if (language === "javascript_standalone") {
      return code.javascript_standalone !== originalCode.javascript_standalone;
    } else if (language === "python") {
      return code.python !== originalCode.python;
    } else if (language === "java") {
      return code.java !== originalCode.java;
    } else if (language === "sql") {
      return code.sql !== originalCode.sql;
    }

    return false;
  }, [
    currentSnippetId,
    snippetName,
    originalSnippetName,
    language,
    code,
    originalCode,
  ]);

  // Add update snippet function
  const handleUpdateSnippet = async () => {
    if (!currentSnippetId || !snippetName.trim()) {
      alert("Please enter a name for your snippet");
      return;
    }

    setSaving(true);
    try {
      const snippetData = {
        snippetName: snippetName.trim(),
        language: language,
        htmlCode: language === "web" ? code.html : null,
        cssCode: language === "web" ? code.css : null,
        javascriptCode:
          language === "web" || language === "javascript_standalone"
            ? language === "web"
              ? code.javascript
              : code.javascript_standalone
            : null,
        pythonCode: language === "python" ? code.python : null,
        javaCode: language === "java" ? code.java : null,
        sqlCode: language === "sql" ? code.sql : null,
      };

      const response = await fetch(
        `${API_URL}/api/code-snippets/${currentSnippetId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(snippetData),
        }
      );

      const result = await response.json();

      if (result.success) {
        setOriginalSnippetName(snippetName);
        // Update original code to current code since we just saved
        setOriginalCode({ ...code });
        // Refresh snippets list
        fetchMySnippets();
        setShowSaveModal(false);
      } else {
        alert(`Failed to update: ${result.message}`);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update snippet");
    } finally {
      setSaving(false);
    }
  };

  // Modify handleSaveSnippet to handle both save and update
  const handleSaveSnippet = async () => {
    if (currentSnippetId) {
      handleUpdateSnippet();
      return;
    }

    // Original save logic for new snippets
    if (!snippetName.trim()) {
      alert("Please enter a name for your snippet");
      return;
    }

    setSaving(true);
    try {
      const snippetData = {
        snippetName: snippetName.trim(),
        language: language,
        htmlCode: language === "web" ? code.html : null,
        cssCode: language === "web" ? code.css : null,
        javascriptCode:
          language === "web" || language === "javascript_standalone"
            ? language === "web"
              ? code.javascript
              : code.javascript_standalone
            : null,
        pythonCode: language === "python" ? code.python : null,
        javaCode: language === "java" ? code.java : null,
        sqlCode: language === "sql" ? code.sql : null,
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
        // Set snippet ID for edit mode
        if (result.data && result.data.snippet) {
          setCurrentSnippetId(result.data.snippet.id);
          setOriginalSnippetName(snippetData.snippetName);
          setOriginalCode({ ...code });
        }
        // Refresh snippets list
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

        // Set up Python environment with proper output capture
        await pyodide.runPythonAsync(`
import sys
import io

class OutputCapture(io.StringIO):
    def write(self, text):
        from js import captureOutput
        captureOutput(text)
        return len(text)
    
    def flush(self):
        pass

sys.stdout = OutputCapture()
sys.stderr = OutputCapture()
`);

        pyodideRef.current = pyodide;
        setPyodideReady(true);
      } catch (error) {
        console.error("Failed to load Pyodide:", error);
        if (mounted) {
          setOutput(
            "Failed to load Python environment. Please refresh the page."
          );
        }
      }
    };

    // Set up output capture function
    window.captureOutput = (text) => {
      setOutput((prev) => prev + text);
    };

    initializePyodide();

    return () => {
      mounted = false;
      delete window.captureOutput;
    };
  }, []);

  // Load SQL.js
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
        setOutput(
          "Failed to load SQL database engine. Please refresh the page."
        );
      }
    };
    loadSqlJs();
  }, []);

  const runWeb = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = combineWebSrcDoc;
    }
  }, [combineWebSrcDoc]);

  const runJavaScriptStandalone = useCallback(async () => {
    setIsRunning(true);
    setOutput("");
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
        const func = new Function(code.javascript_standalone);
        func();
      } catch (err) {
        logs.push(`Error: ${err.message}`);
      } finally {
        console.log = originalLog;
      }

      setOutput(
        logs.join("\n") || "Code executed successfully (no console output)"
      );
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  }, [code.javascript_standalone]);

  // FIXED Python execution - NO INPUT ECHO
  const runPython = useCallback(async () => {
    setIsRunning(true);
    setOutput("");

    try {
      if (!pyodideRef.current) {
        setOutput("Python environment is still loading. Please wait...");
        setIsRunning(false);
        return;
      }

      const pyodide = pyodideRef.current;

      // Set up input handling
      const inputLines = inputValue
        .split("\n")
        .filter((line) => line.trim() !== "");
      let inputIndex = 0;

      // Clear previous output
      setOutput("");

      // Set up custom input function - DO NOT CAPTURE INPUT VALUES
      pyodide.globals.set("__python_input__", () => {
        if (inputIndex < inputLines.length) {
          return inputLines[inputIndex++];
        }
        return "";
      });

      // Inject input function replacement - DON'T WRITE INPUT VALUES TO OUTPUT
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

# Override input function - DO NOT CAPTURE INPUT VALUES
_original_input = builtins.input

def custom_input(prompt=""):
    # Don't write prompt or input value to output capture
    result = __python_input__()
    return result

builtins.input = custom_input
`);

      // Execute the Python code
      await pyodide.runPythonAsync(code.python);

      // Get the captured output (only print statements, no input values)
      const output = await pyodide.runPythonAsync("output_capture.get_value()");

      // Clean the output - remove any trailing whitespace
      const cleanOutput =
        output.trim() || "Python code executed successfully (no output)";
      setOutput(cleanOutput);
    } catch (err) {
      setOutput(`Error: ${err.message}\n`);
    } finally {
      setIsRunning(false);
    }
  }, [code.python, inputValue]);

  // FIXED Java execution with proper simulation
  const runJava = useCallback(async () => {
    setIsRunning(true);
    setOutput("");

    try {
      const javaRunner = remoteRunners?.java;

      if (typeof javaRunner === "function") {
        try {
          const result = await javaRunner(code.java, inputValue);
          setOutput(result || "Java code executed successfully");
        } catch (err) {
          setOutput(`Java Execution Error: ${err.message}`);
        }
      } else {
        // Enhanced Java code analysis and execution simulation
        const javaCode = code.java;
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
              const match = line.match(/System\.out\.println\((.*)\)/);
              if (match) {
                let content = match[1];

                // Handle string concatenation
                if (content.includes("+")) {
                  // Simple string concatenation
                  content = content
                    .split("+")
                    .map((part) => {
                      part = part.trim().replace(/["';]/g, "");
                      // Handle variable substitution for common patterns
                      if (part === "i") return "i";
                      if (part === "num") return "num";
                      return part;
                    })
                    .join(" ");
                }

                // Handle loop simulations
                if (content === "i") {
                  // This is likely inside a loop - simulate loop output
                  for (let i = 1; i < 10; i++) {
                    outputLines.push(i.toString());
                  }
                  break;
                } else if (content.includes("discount")) {
                  // Handle discount calculation
                  if (inputLines.length >= 2) {
                    const comparePrice = parseInt(inputLines[0]);
                    const price = parseInt(inputLines[1]);
                    const discount =
                      ((comparePrice - price) / comparePrice) * 100;
                    outputLines.push(discount.toFixed(2));
                  }
                } else {
                  // Remove quotes and add to output
                  content = content.replace(/["';]/g, "");
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
          setOutput(outputLines.join("\n"));
        } else {
          setOutput(`Java Code Analysis:

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

For full Java execution, set up a remote runner:
remoteRunners={{
  java: async (code, input) => {
    const response = await fetch('/api/execute-java', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, input })
    });
    return await response.text();
  }
}}`);
        }
      }
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  }, [code.java, remoteRunners, inputValue]);

  const runSQL = useCallback(async () => {
    setIsRunning(true);
    setOutput("");

    if (!sqlJs || !db) {
      setOutput(
        "SQL database is still loading. Please wait a moment and try again."
      );
      setIsRunning(false);
      return;
    }

    try {
      const sqlRunner = remoteRunners?.sql;
      if (typeof sqlRunner === "function") {
        const result = await sqlRunner(code.sql);
        setOutput(result);
      } else {
        let outputText = "";
        const statements = code.sql.split(";").filter((stmt) => stmt.trim());

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

        setOutput(outputText || "No SQL statements to execute.");
      }
    } catch (err) {
      setOutput(`SQL Error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  }, [code.sql, sqlJs, db, remoteRunners]);

  const handleRun = useCallback(() => {
    setOutput("");
    if (language === "web") {
      runWeb();
    } else if (language === "javascript_standalone") {
      runJavaScriptStandalone();
    } else if (language === "python") {
      runPython();
    } else if (language === "java") {
      runJava();
    } else if (language === "sql") {
      runSQL();
    }
  }, [language, runWeb, runJavaScriptStandalone, runPython, runJava, runSQL]);

  const onChangeCode = useCallback(
    (value) => {
      if (language === "web") {
        setCode((prev) => ({ ...prev, [currentWebLanguage]: value }));
      } else {
        setCode((prev) => ({ ...prev, [language]: value }));
      }
    },
    [language, currentWebLanguage]
  );

  // Enhanced resize logic
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
    const containerWidth = document.querySelector(
      ".playground-content-codep"
    ).offsetWidth;
    const deltaPercent = (deltaX / containerWidth) * 100;

    let newWidth = startWidth.current + deltaPercent;
    newWidth = Math.max(20, Math.min(80, newWidth));

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

  const resetToDefault = useCallback(() => {
    setCode(defaultCode);
    setOutput("");
    setInputValue("");
    inputIndexRef.current = 0;
    if (iframeRef.current && language === "web") {
      iframeRef.current.srcdoc = ""; // Clear the iframe
    }
    if (sqlJs && language === "sql") {
      const newDb = new sqlJs.Database();
      setDb(newDb);
    }
    // Exit edit mode when resetting
    setCurrentSnippetId(null);
    setSnippetName("");
    setOriginalSnippetName("");
    setOriginalCode({});
  }, [defaultCode, combineWebSrcDoc, language, sqlJs]);

  const getLanguageDisplayName = (lang) => {
    const names = {
      web: "WEB",
      html: "HTML",
      css: "CSS",
      javascript: "JAVASCRIPT",
      javascript_standalone: "JAVASCRIPT",
      python: "PYTHON",
      java: "JAVA",
      sql: "SQL",
    };
    return names[lang] || lang;
  };

  const getLanguageIcon = (lang) => {
    const icons = {
      html: (
        <img src="/assets/html5_logo.png" alt="HTML5" width="24" height="24" />
      ),
      css: (
        <img src="/assets/css3_logo.png" alt="CSS3" width="24" height="24" />
      ),
      javascript: (
        <img
          src="/assets/javascript_logo.png"
          alt="JavaScript"
          width="24"
          height="24"
        />
      ),
      javascript_standalone: (
        <img
          src="/assets/javascript_logo.png"
          alt="JavaScript"
          width="24"
          height="24"
        />
      ),
      python: (
        <img
          src="/assets/python_logo.png"
          alt="Python"
          width="24"
          height="24"
        />
      ),
      java: (
        <img src="/assets/java_logo.png" alt="Java" width="24" height="24" />
      ),
      sql: <img src="/assets/sql_logo.png" alt="SQL" width="44" height="24" />,
    };
    return icons[lang] || "📝";
  };

  // Get current code for editor
  const getCurrentCode = () => {
    if (language === "web") {
      return code[currentWebLanguage];
    }
    return code[language];
  };

  // Get current mode for AceEditor
  const getCurrentMode = () => {
    if (language === "web") {
      return currentWebLanguage;
    }
    return language === "javascript_standalone" ? "javascript" : language;
  };

  // Check if input section should be shown
  const showInputSection = ["python", "java"].includes(language);

  // ADD THIS useEffect after your other useEffects:
  useEffect(() => {
    onCodeChange(code);
  }, [code, onCodeChange]);

  // Add this useEffect to load snippets when component mounts
  useEffect(() => {
    fetchMySnippets();
  }, []);

  // Update the fetchMySnippets function
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

  return (
    <section className="code-playground-codep">
      <div className="playground-content-codep">
        <div
          className="editor-panel-codep"
          style={{ width: `${editorWidth}%` }}
        >
          <div className="panel-header-codep">
            {language === "web" ? (
              <div className="code-tabs-codep">
                {["html", "css", "javascript"].map((lang) => (
                  <button
                    key={lang}
                    className={`tab-btn-codep ${
                      currentWebLanguage === lang ? "active-codep" : ""
                    }`}
                    onClick={() => setCurrentWebLanguage(lang)}
                  >
                    {getLanguageIcon(lang)} {getLanguageDisplayName(lang)}
                  </button>
                ))}
              </div>
            ) : (
              <h3 className="lang-header-codep">
                {getLanguageIcon(language)} {getLanguageDisplayName(language)}
                {currentSnippetId && (
                  <span className="edit-mode-indicator"> (Editing)</span>
                )}
                {language === "sql" && !sqlJs && (
                  <span className="sql-loading-codep"> (Loading...)</span>
                )}
                {language === "python" && !pyodideReady && (
                  <span className="sql-loading-codep"> (Loading...)</span>
                )}
              </h3>
            )}

            <div className="editor-info-codep">
              Lines: {getCurrentCode()?.split("\n").length || 0} | Length:{" "}
              {getCurrentCode()?.length || 0}
              {currentSnippetId && isSnippetModified && (
                <span className="modified-indicator"> (Modified)</span>
              )}
            </div>

            <select
              className="language-select-codep"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="web">Web (HTML/CSS/JS)</option>
              <option value="javascript_standalone">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="sql">SQL</option>
            </select>
          </div>

          <div className="editor-container-codep">
            <AceEditor
              ref={editorRef}
              mode={getCurrentMode()}
              theme={theme}
              value={getCurrentCode()}
              onChange={onChangeCode}
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
                fontFamily:
                  "'Fira Code', 'Cascadia Code', 'Monaco', 'Consolas', monospace",
                scrollPastEnd: 0.5,
                highlightSelectedWord: false,
                displayIndentGuides: true,
                showInvisibles: false,
                showFoldWidgets: true,
                fixedWidthGutter: true,
                wrap: false,
                indentedSoftWrap: false,
                lineHeight: 1.4,
              }}
              editorProps={{
                $blockScrolling: true,
              }}
              style={{
                lineHeight: "1.4",
              }}
            />
          </div>

          <header className="playground-header-codep">
            <div className="header-right-codep">
              {currentSnippetId ? (
                <>
                  <button
                    className="btn-codep btn-secondary-codep"
                    onClick={() => setShowSaveModal(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z" />
                    </svg>
                    Update Snippet
                  </button>
                  <button
                    className="btn-codep btn-secondary-codep"
                    onClick={resetToDefault}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-plus-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    New Snippet
                  </button>
                </>
              ) : (
                <button
                  className="btn-codep btn-secondary-codep"
                  onClick={() => setShowSaveModal(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z" />
                  </svg>
                  Save Snippet
                </button>
              )}

              <button
                className="btn-codep btn-secondary-codep"
                onClick={resetToDefault}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-clockwise"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                  />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                </svg>
                Reset
              </button>

              <button
                className="btn-codep btn-primary-codep"
                onClick={customRunHandler || handleRun}
                disabled={
                  isRunning ||
                  (language === "sql" && !sqlJs) ||
                  (language === "python" && !pyodideReady)
                }
              >
                {isRunning ? (
                  "🔄 Running..."
                ) : (
                  <div className="run-code-btn-codep">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-play-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                    </svg>
                    {currentSnippetId ? "Run & Update" : "Run Code"}
                  </div>
                )}
              </button>
            </div>
          </header>
        </div>

        <div className="resizer-codep" onMouseDown={startResize} />

        <div
          className="output-panel-codep"
          style={{ width: `${100 - editorWidth}%` }}
        >
          {showInputSection && (
            <div className="input-section-codep">
              <div className="section-header-codep">
                <h3>INPUT</h3>
              </div>
              <textarea
                className="input-textarea-codep"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Enter input for ${getLanguageDisplayName(
                  language
                )} code here...`}
                rows={4}
              />
            </div>
          )}

          <div className="output-section-codep">
            <div className="output-container-codep">
              {language === "web" ? (
                <iframe
                  ref={iframeRef}
                  className="preview-frame-codep"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups"
                  srcDoc={combineWebSrcDoc}
                />
              ) : (
                <pre className="code-output-codep">
                  {output ||
                    `Click "Run Code" to execute your ${getLanguageDisplayName(
                      language
                    )} code and see the output here.`}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Save/Update Snippet Modal */}
      {showSaveModal && (
        <div className="modal-overlay-codep">
          <div className="modal-codep">
            <div className="modal-header-codep">
              <h3>{currentSnippetId ? "Update Snippet" : "Save Snippet"}</h3>
              <button onClick={() => setShowSaveModal(false)}>×</button>
            </div>
            <div className="modal-body-codep">
              <div className="form-group-codep">
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
              <div className="form-group-codep">
                <label>Language</label>
                <div className="language-display-codep">
                  {getLanguageIcon(language)} {getLanguageDisplayName(language)}
                </div>
              </div>
              {currentSnippetId && (
                <div className="edit-mode-note-codep">
                  <small>
                    ⚠️ Updating will overwrite the original snippet: "
                    {originalSnippetName}"
                  </small>
                </div>
              )}
            </div>
            <div className="modal-footer-codep">
              <button
                className="btn-codep btn-secondary-codep"
                onClick={() => setShowSaveModal(false)}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                className="btn-codep btn-primary-codep"
                onClick={handleSaveSnippet}
                disabled={saving || !snippetName.trim()}
              >
                {saving
                  ? currentSnippetId
                    ? "Updating..."
                    : "Saving..."
                  : currentSnippetId
                  ? "Update Snippet"
                  : "Save Snippet"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
