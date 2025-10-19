"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import AceEditor from "react-ace"

import "./CodePlayground.css"

// Import Ace modes & themes
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

// Import SQL.js
import initSqlJs from "sql.js"

export default function CodePlayground({
  initialLanguage = "web",
  initialCode,
  autoRun = false,
  remoteRunners = {}
}) {
  const iframeRef = useRef(null)
  const editorRef = useRef(null)
  const [language, setLanguage] = useState(initialLanguage)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [autoRunEnabled, setAutoRunEnabled] = useState(Boolean(autoRun))
  const [theme, setTheme] = useState("monokai")
  const [fontSize, setFontSize] = useState(20)
  const [pyodideReady, setPyodideReady] = useState(false)
  const pyodideRef = useRef(null)
  const [sqlJs, setSqlJs] = useState(null)
  const [db, setDb] = useState(null)

  const [editorWidth, setEditorWidth] = useState(60)
  const isResizing = useRef(false)
  const startX = useRef(0)
  const startWidth = useRef(50)

  // Track current web language for tabs
  const [currentWebLanguage, setCurrentWebLanguage] = useState("html")

  // Default code templates
  const defaultCode = useMemo(() => ({
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
    css: `body {
  font-family: Arial, sans-serif;
  background: #f5f5f5;
  color: #333;
  margin: 40px;
}
h1 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}`,
    javascript: `// Welcome to JavaScript Playground
document.addEventListener('DOMContentLoaded', function() {
  const output = document.getElementById('output');
  if (output) {
    output.innerHTML = '<h3>JavaScript is working 🎉</h3>';
    output.style.color = '#2c3e50';
    output.style.padding = '20px';
    output.style.backgroundColor = '#e8f4fd';
    output.style.borderRadius = '8px';
  }
  console.log('JavaScript executed successfully!');
});`,
    javascript_standalone: `// Standalone JavaScript Execution
console.log("Hello from standalone JavaScript!");

// Example calculations
const a = 10;
const b = 20;
console.log(\`\${a} + \${b} = \${a + b}\`);

// Example array operations
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Original:", numbers);
console.log("Doubled:", doubled);

// You can use any JavaScript features here
function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}
console.log(\`Factorial of 5: \${factorial(5)}\`);`,
    python: `# Welcome to Python Playground
print("Hello from Python! 🐍")

# Example calculations
x = 10
y = 20
result = x + y
print(f"{x} + {y} = {result}")

# Example loop
print("\\nCounting from 1 to 5:")
for i in range(1, 6):
    print(f"Number: {i}")`,
    java: `// Welcome to Java Playground
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello from Java! ☕");
    System.out.println("This Java code is running in your browser!");
    
    // Example calculations
    int number1 = 15;
    int number2 = 25;
    int sum = number1 + number2;
    System.out.println("\\nCalculation:");
    System.out.println(number1 + " + " + number2 + " = " + sum);
  }
}`,
    sql: `-- Welcome to SQL Playground
-- Sample database schema for demonstration
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  department TEXT,
  salary REAL,
  hire_date TEXT
);

CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name TEXT,
  manager TEXT
);

-- Insert sample data
INSERT INTO employees VALUES 
(1, 'John Doe', 'Engineering', 75000, '2020-01-15'),
(2, 'Jane Smith', 'Marketing', 65000, '2019-03-20'),
(3, 'Mike Johnson', 'Engineering', 80000, '2018-06-10'),
(4, 'Sarah Wilson', 'Sales', 60000, '2021-02-28'),
(5, 'Tom Brown', 'Marketing', 70000, '2020-11-05');

INSERT INTO departments VALUES
(1, 'Engineering', 'Robert Chen'),
(2, 'Marketing', 'Lisa Wang'),
(3, 'Sales', 'David Kim');

-- Example queries
SELECT * FROM employees;

SELECT name, department, salary 
FROM employees 
WHERE salary > 70000;

SELECT department, AVG(salary) as avg_salary
FROM employees 
GROUP BY department;

SELECT e.name, e.department, d.manager
FROM employees e
JOIN departments d ON e.department = d.name;`
  }), [])

  const [code, setCode] = useState(() => ({
    html: initialCode?.html ?? defaultCode.html,
    css: initialCode?.css ?? defaultCode.css,
    javascript: initialCode?.javascript ?? defaultCode.javascript,
    javascript_standalone: initialCode?.javascript_standalone ?? defaultCode.javascript_standalone,
    python: initialCode?.python ?? defaultCode.python,
    java: initialCode?.java ?? defaultCode.java,
    sql: initialCode?.sql ?? defaultCode.sql,
  }))

  // Load Pyodide for Python
  useEffect(() => {
    window._pyCapture = (chunk) => setOutput((prev) => prev + String(chunk))
    return () => delete window._pyCapture
  }, [])

  // Load SQL.js
  useEffect(() => {
    const loadSqlJs = async () => {
      try {
        const SQL = await initSqlJs({
          locateFile: file => `https://sql.js.org/dist/${file}`
        })
        setSqlJs(SQL)
        const database = new SQL.Database()
        setDb(database)
      } catch (error) {
        console.error("Failed to load SQL.js:", error)
        setOutput("Failed to load SQL database engine. Please refresh the page.")
      }
    }
    loadSqlJs()
  }, [])

  const loadPyodide = useCallback(async () => {
    if (pyodideRef.current) return pyodideRef.current
    if (!window.loadPyodide) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script")
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js"
        script.onload = resolve
        script.onerror = () => reject(new Error("Failed to load Pyodide"))
        document.head.appendChild(script)
      })
    }
    const pyodide = await window.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/",
    })
    pyodideRef.current = pyodide
    setPyodideReady(true)
    return pyodide
  }, [])

  // Combine HTML, CSS, JS for preview
  const combineWebSrcDoc = useMemo(() => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    ${code.css}
    
    /* Error styling */
    .js-error {
      background: #fee;
      color: #c33;
      padding: 15px;
      margin: 10px;
      border: 1px solid #c33;
      border-radius: 5px;
      font-family: monospace;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  ${code.html}
  <script>
    try {
      ${code.javascript}
    } catch (err) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'js-error';
      errorDiv.innerHTML = '<strong>JavaScript Error:</strong>\\n' + err.message + '\\n\\n' + err.stack;
      document.body.appendChild(errorDiv);
    }
  </script>
</body>
</html>`
  }, [code.html, code.css, code.javascript])

  const runWeb = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = combineWebSrcDoc
    }
  }, [combineWebSrcDoc])

  const runJavaScriptStandalone = useCallback(async () => {
    setIsRunning(true)
    setOutput("")
    try {
      // Create a function from the code and execute it
      const userCode = new Function(`
        const originalLog = console.log;
        const logs = [];
        console.log = (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
          originalLog.apply(console, args);
        };
        
        try {
          ${code.javascript_standalone}
        } catch (err) {
          console.log('Error:', err.message);
        }
        
        return logs.join('\\n');
      `)

      const result = userCode()
      setOutput(result || "Code executed successfully (no console output)")
    } catch (err) {
      setOutput(`Error: ${err.message}`)
    } finally {
      setIsRunning(false)
    }
  }, [code.javascript_standalone])

  const runPython = useCallback(async () => {
    setIsRunning(true)
    setOutput("")
    try {
      const pyodide = await loadPyodide()
      await pyodide.runPythonAsync(`
import sys
from js import _pyCapture

class OutputCapture:
    def write(self, text):
        _pyCapture(text)
    def flush(self):
        pass

sys.stdout = OutputCapture()
sys.stderr = OutputCapture()
`)
      await pyodide.runPythonAsync(code.python)
    } catch (err) {
      setOutput((prev) => prev + `\\nError: ${err.message}`)
    } finally {
      setIsRunning(false)
    }
  }, [code.python, loadPyodide])

  const runJava = useCallback(async () => {
    setIsRunning(true)
    setOutput("")
    try {
      const javaRunner = remoteRunners?.java
      if (typeof javaRunner === "function") {
        const result = await javaRunner(code.java)
        setOutput(result)
      } else {
        setOutput(`Java execution requires a remote runner.

To enable Java execution, provide a remote runner function:

remoteRunners={{
  java: async (code) => {
    // Connect to your Java execution backend
    return "Java output will appear here when configured."
  }
}}`)
      }
    } catch (err) {
      setOutput((prev) => prev + `\\nError: ${err.message}`)
    } finally {
      setIsRunning(false)
    }
  }, [code.java, remoteRunners])

  const runSQL = useCallback(async () => {
    setIsRunning(true)
    setOutput("")

    if (!sqlJs || !db) {
      setOutput("SQL database is still loading. Please wait a moment and try again.")
      setIsRunning(false)
      return
    }

    try {
      const sqlRunner = remoteRunners?.sql
      if (typeof sqlRunner === "function") {
        // Use remote runner if provided
        const result = await sqlRunner(code.sql)
        setOutput(result)
      } else {
        // Use local SQL.js implementation
        let outputText = ""

        // Split SQL by semicolons to handle multiple statements
        const statements = code.sql.split(';').filter(stmt => stmt.trim())

        for (const statement of statements) {
          if (!statement.trim()) continue

          try {
            if (statement.trim().toUpperCase().startsWith('SELECT')) {
              // For SELECT statements, execute and format results
              const result = db.exec(statement)
              if (result.length > 0) {
                const columns = result[0].columns
                const values = result[0].values

                // Calculate column widths
                const colWidths = columns.map((col, index) => {
                  const maxDataWidth = Math.max(...values.map(row =>
                    String(row[index] || '').length
                  ))
                  return Math.max(col.length, maxDataWidth)
                })

                // Create header
                const header = columns.map((col, i) =>
                  col.padEnd(colWidths[i], ' ')
                ).join(' | ')

                const separator = colWidths.map(width =>
                  '-'.repeat(width)
                ).join('-+-')

                outputText += header + '\n'
                outputText += separator + '\n'

                // Add rows
                values.forEach(row => {
                  const rowStr = row.map((cell, i) =>
                    String(cell || '').padEnd(colWidths[i], ' ')
                  ).join(' | ')
                  outputText += rowStr + '\n'
                })
                outputText += '\n'
              } else {
                outputText += "Query executed successfully (no results)\n\n"
              }
            } else {
              // For non-SELECT statements (CREATE, INSERT, UPDATE, DELETE)
              db.run(statement)
              const changes = db.getRowsModified()
              outputText += `Query executed successfully. ${changes} row(s) affected.\n\n`
            }
          } catch (err) {
            outputText += `Error in statement: ${statement}\n${err.message}\n\n`
          }
        }

        if (outputText === "") {
          outputText = "No SQL statements to execute."
        }

        setOutput(outputText)
      }
    } catch (err) {
      setOutput(`SQL Error: ${err.message}`)
    } finally {
      setIsRunning(false)
    }
  }, [code.sql, sqlJs, db, remoteRunners])

  const handleRun = useCallback(() => {
    setOutput("")
    if (language === "web") {
      runWeb()
    } else if (language === "javascript_standalone") {
      runJavaScriptStandalone()
    } else if (language === "python") {
      runPython()
    } else if (language === "java") {
      runJava()
    } else if (language === "sql") {
      runSQL()
    }
  }, [language, runWeb, runJavaScriptStandalone, runPython, runJava, runSQL])

  // Auto-run for web languages
  useEffect(() => {
    if (!autoRunEnabled) return
    if (language !== "web") return
    const timeout = setTimeout(runWeb, 500)
    return () => clearTimeout(timeout)
  }, [code.html, code.css, code.javascript, autoRunEnabled, language, runWeb])

  const onChangeCode = useCallback((value) => {
    if (language === "web") {
      setCode((prev) => ({ ...prev, [currentWebLanguage]: value }))
    } else {
      setCode((prev) => ({ ...prev, [language]: value }))
    }
  }, [language, currentWebLanguage])

  // Enhanced resize logic
  const startResize = useCallback((e) => {
    isResizing.current = true
    startX.current = e.clientX
    startWidth.current = editorWidth
    document.body.style.cursor = 'ew-resize'
    document.body.style.userSelect = 'none'
  }, [editorWidth])

  const stopResize = useCallback(() => {
    isResizing.current = false
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }, [])

  const handleResize = useCallback((e) => {
    if (!isResizing.current) return

    const deltaX = e.clientX - startX.current
    const containerWidth = document.querySelector('.playground-content').offsetWidth
    const deltaPercent = (deltaX / containerWidth) * 100

    let newWidth = startWidth.current + deltaPercent
    newWidth = Math.max(20, Math.min(80, newWidth))

    setEditorWidth(newWidth)
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', handleResize)
    document.addEventListener('mouseup', stopResize)

    return () => {
      document.removeEventListener('mousemove', handleResize)
      document.removeEventListener('mouseup', stopResize)
    }
  }, [handleResize, stopResize])

  const resetToDefault = useCallback(() => {
    setCode(defaultCode)
    setOutput("")
    if (iframeRef.current && language === "web") {
      iframeRef.current.srcdoc = combineWebSrcDoc
    }
    // Reset SQL database
    if (sqlJs && language === "sql") {
      const newDb = new sqlJs.Database()
      setDb(newDb)
    }
  }, [defaultCode, combineWebSrcDoc, language, sqlJs])

  const getLanguageDisplayName = (lang) => {
    const names = {
      web: "WEB",
      html: "HTML",
      css: "CSS",
      javascript: "JAVASCRIPT",
      javascript_standalone: "JAVASCRIPT",
      python: "PYTHON",
      java: "JAVA",
      sql: "SQL"
    }
    return names[lang] || lang
  }

  const getLanguageIcon = (lang) => {
    const icons = {
      html: <img src="/assets/html5_logo.png" alt="HTML5" width="24" height="24" />,
      css: <img src="/assets/css3_logo.png" alt="CSS3" width="24" height="24" />,
      javascript: <img src="/assets/javascript_logo.png" alt="JavaScript" width="24" height="24" />,
      javascript_standalone: <img src="/assets/javascript_logo.png" alt="JavaScript" width="24" height="24" />,
      python: <img src="/assets/python_logo.png" alt="Python" width="24" height="24" />,
      java: <img src="/assets/java_logo.png" alt="Java" width="24" height="24" />,
      sql: <img src="/assets/sql_logo.png" alt="SQL" width="44" height="24" />
    }
    return icons[lang] || "📝"
  }

  // Get current code for editor
  const getCurrentCode = () => {
    if (language === "web") {
      return code[currentWebLanguage]
    }
    return code[language]
  }

  // Get current mode for AceEditor
  const getCurrentMode = () => {
    if (language === "web") {
      return currentWebLanguage
    }
    return language === "javascript_standalone" ? "javascript" : language
  }

  return (
    <section className="code-playground">
      <div className="playground-content">
        <div
          className="editor-panel"
          style={{ width: `${editorWidth}%` }}
        >
          <div className="panel-header">
            {/* Show tabs only for Web mode */}
            {language === "web" ? (
              <div className="code-tabs">
                {["html", "css", "javascript"].map((lang) => (
                  <button
                    key={lang}
                    className={`tab-btn ${currentWebLanguage === lang ? "active" : ""}`}
                    onClick={() => setCurrentWebLanguage(lang)}
                  >
                    {getLanguageIcon(lang)} {getLanguageDisplayName(lang)}
                  </button>
                ))}
              </div>
            ) : (
              // Show only selected language (JavaScript, Python, Java, or SQL)
              <h3 className="lang-header">
                {getLanguageIcon(language)} {getLanguageDisplayName(language)}
                {language === "sql" && !sqlJs && (
                  <span style={{ fontSize: '12px', color: '#666', marginLeft: '10px' }}>
                    (Loading SQL engine...)
                  </span>
                )}
              </h3>
            )}

            {/* Editor info */}
            <div className="editor-info">
              Lines: {getCurrentCode()?.split("\n").length || 0} | Length:{" "}
              {getCurrentCode()?.length || 0}
            </div>

            {/* Dropdown for selecting all languages */}
            <select
              className="language-select"
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

          <div className="editor-container">
            <AceEditor
              ref={editorRef}
              mode={getCurrentMode()}
              theme={theme}
              value={getCurrentCode()}
              onChange={onChangeCode}
              fontSize={fontSize}
              width="100%"
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
                fontFamily: "'Fira Code', 'Cascadia Code', 'Monaco', 'Consolas', monospace",
                scrollPastEnd: 0.5,
                highlightSelectedWord: true,
                displayIndentGuides: true,
              }}
              editorProps={{
                $blockScrolling: true,
              }}
            />
          </div>

          <header className="playground-header">
            <div className="header-right">
              <label className="auto-run-toggle">
                <input
                  type="checkbox"
                  checked={autoRunEnabled}
                  onChange={(e) => setAutoRunEnabled(e.target.checked)}
                  disabled={language !== "web"}
                />
                <span className="auto_run">Auto-run</span>
              </label>

              <button className="btn btn-secondary" onClick={resetToDefault}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                </svg> Reset Code
              </button>

              <button
                className="btn btn-primary"
                onClick={handleRun}
                disabled={isRunning || (language === "sql" && !sqlJs)}
              >
                {isRunning ? (
                  "🔄 Running..."
                ) : (
                  <div className="run_code_btn">
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
                    Run Code
                  </div>
                )}
              </button>
            </div>
          </header>
        </div>

        <div
          className="resizer"
          onMouseDown={startResize}
        />

        <div
          className="output-panel"
          style={{ width: `${100 - editorWidth}%` }}
        >
          <div className="output-container">
            {language === "web" ? (
              <iframe
                ref={iframeRef}
                className="preview-frame"
                title="Live Code Preview"
                sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups"
                srcDoc={combineWebSrcDoc}
              />
            ) : (
              <pre className="code-output">
                {output || `Click "Run Code" to execute your ${getLanguageDisplayName(language)} code and see the output here.`}
              </pre>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}