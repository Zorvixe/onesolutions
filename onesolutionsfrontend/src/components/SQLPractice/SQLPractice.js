"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";

import initSqlJs from "sql.js";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export default function SQLPractice({
  initialCode = "",
  remoteRunners = {},
  onCodeChange = () => {},
  customHeight = "calc(90vh - 20px)",
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // Add these state variables
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [snippetName, setSnippetName] = useState("");
  const [saving, setSaving] = useState(false);
  const [mySnippets, setMySnippets] = useState([]);

  // Add these states for update functionality
  const [currentSnippetId, setCurrentSnippetId] = useState(null);
  const [originalSnippetName, setOriginalSnippetName] = useState("");
  const [originalCode, setOriginalCode] = useState("");

  const editorRef = useRef(null);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [theme, setTheme] = useState("monokai");
  const [fontSize, setFontSize] = useState(14);
  const [sqlJs, setSqlJs] = useState(null);
  const [db, setDb] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const [editorWidth, setEditorWidth] = useState(60);
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(50);

  // Default SQL template
  const defaultCode = useMemo(
    () => `-- Sample SQL Practice
-- Create tables
CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER,
    grade TEXT,
    email TEXT UNIQUE
);

CREATE TABLE courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    instructor TEXT,
    credits INTEGER
);

CREATE TABLE enrollments (
    student_id INTEGER,
    course_id INTEGER,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    grade REAL,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    PRIMARY KEY (student_id, course_id)
);

-- Insert sample data
INSERT INTO students (name, age, grade, email) VALUES 
('Alice Johnson', 20, 'A', 'alice@example.com'),
('Bob Smith', 21, 'B', 'bob@example.com'),
('Carol Davis', 19, 'A', 'carol@example.com'),
('David Wilson', 22, 'C', 'david@example.com'),
('Eva Brown', 20, 'B', 'eva@example.com');

INSERT INTO courses (name, instructor, credits) VALUES 
('Database Systems', 'Dr. Smith', 3),
('Web Development', 'Prof. Johnson', 4),
('Data Structures', 'Dr. Williams', 3),
('Algorithms', 'Prof. Davis', 4);

INSERT INTO enrollments (student_id, course_id, grade) VALUES 
(1, 1, 85.5),
(1, 2, 92.0),
(2, 1, 78.0),
(2, 3, 88.5),
(3, 2, 95.0),
(3, 4, 90.5),
(4, 1, 72.0),
(4, 2, 81.5),
(5, 3, 89.0),
(5, 4, 86.5);

-- Query examples
-- 1. Basic SELECT
SELECT * FROM students;

-- 2. Filter with WHERE
SELECT name, age FROM students WHERE age > 20;

-- 3. JOIN tables
SELECT 
    s.name AS student_name,
    c.name AS course_name,
    e.grade,
    e.enrollment_date
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON e.course_id = c.id;

-- 4. Aggregate functions
SELECT 
    c.name AS course_name,
    COUNT(e.student_id) AS total_students,
    AVG(e.grade) AS average_grade,
    MAX(e.grade) AS highest_grade,
    MIN(e.grade) AS lowest_grade
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY c.id, c.name;

-- 5. Subquery
SELECT 
    name,
    age,
    (SELECT COUNT(*) FROM enrollments WHERE student_id = students.id) AS courses_taken
FROM students;

-- 6. Update records
UPDATE students SET grade = 'A+' WHERE name = 'Alice Johnson';

-- 7. Delete record
-- DELETE FROM students WHERE name = 'David Wilson';

-- 8. Create index
CREATE INDEX idx_students_email ON students(email);

-- 9. Views
CREATE VIEW student_course_summary AS
SELECT 
    s.name AS student,
    COUNT(e.course_id) AS total_courses,
    AVG(e.grade) AS average_grade
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
GROUP BY s.id, s.name;

-- Query the view
SELECT * FROM student_course_summary WHERE average_grade > 85;`,
    []
  );

  const [code, setCode] = useState(initialCode || defaultCode);

  // Add this useEffect to handle iframe links (removed iframe-specific code)
  useEffect(() => {
    const handleIframeMessage = (event) => {
      if (event.data.type === "NAVIGATE_TO_HASH") {
        console.log("Navigating to:", event.data.hash);
      }
    };

    window.addEventListener("message", handleIframeMessage);

    return () => {
      window.removeEventListener("message", handleIframeMessage);
    };
  }, []);

  // ADD THIS useEffect to load snippets from navigation state
  useEffect(() => {
    const loadSnippetFromState = () => {
      if (location.state?.loadSnippet && location.state?.snippetData) {
        const snippet = location.state.snippetData;

        console.log("Loading snippet from state:", snippet);
        console.log("Available fields:", Object.keys(snippet));

        setCurrentSnippetId(snippet.id);
        setSnippetName(snippet.name);
        setOriginalSnippetName(snippet.name);

        // Handle SQL code
        const sqlCode =
          snippet.sqlCode || snippet.code || snippet.sql || defaultCode;
        setCode(sqlCode);
        setOriginalCode(sqlCode);

        navigate(location.pathname, { replace: true, state: {} });
      }
    };

    loadSnippetFromState();
  }, [location.state, navigate, location.pathname, defaultCode]);

  // Check if snippet has been modified
  const isSnippetModified = useMemo(() => {
    if (!currentSnippetId) return false;
    return snippetName !== originalSnippetName || code !== originalCode;
  }, [currentSnippetId, snippetName, originalSnippetName, code, originalCode]);

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
        language: "sql",
        sqlCode: code,
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
        setOriginalCode(code);
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
        if (result.data && result.data.snippet) {
          setCurrentSnippetId(result.data.snippet.id);
          setOriginalSnippetName(snippetData.snippetName);
          setOriginalCode(code);
        }
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
        const result = await sqlRunner(code);
        setOutput(result);
      } else {
        let outputText = "";
        const statements = code.split(";").filter((stmt) => stmt.trim());

        // Track execution statistics
        let totalStatements = 0;
        let successfulStatements = 0;
        let errorStatements = 0;

        for (const statement of statements) {
          if (!statement.trim()) continue;
          totalStatements++;

          try {
            const stmtUpper = statement.trim().toUpperCase();
            if (
              stmtUpper.startsWith("SELECT") ||
              stmtUpper.startsWith("PRAGMA") ||
              stmtUpper.startsWith("EXPLAIN") ||
              stmtUpper.startsWith("WITH")
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

                // Build table header
                const header = columns
                  .map((col, i) =>
                    col.padEnd(colWidths[i] + 1).padStart(colWidths[i] + 2)
                  )
                  .join("│");

                const topBorder =
                  "┌" +
                  colWidths.map((width) => "─".repeat(width + 2)).join("┬") +
                  "┐";
                const middleBorder =
                  "├" +
                  colWidths.map((width) => "─".repeat(width + 2)).join("┼") +
                  "┤";
                const bottomBorder =
                  "└" +
                  colWidths.map((width) => "─".repeat(width + 2)).join("┴") +
                  "┘";

                outputText += topBorder + "\n";
                outputText += "│" + header + "│\n";
                outputText += middleBorder + "\n";

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

                outputText += bottomBorder + "\n";
                outputText += `\n${values.length} row(s) returned\n\n`;
              } else {
                outputText += "✓ Query executed successfully (no results)\n\n";
              }
              successfulStatements++;
            } else if (
              stmtUpper.startsWith("INSERT") ||
              stmtUpper.startsWith("UPDATE") ||
              stmtUpper.startsWith("DELETE") ||
              stmtUpper.startsWith("CREATE") ||
              stmtUpper.startsWith("ALTER") ||
              stmtUpper.startsWith("DROP") ||
              stmtUpper.startsWith("TRUNCATE")
            ) {
              db.run(statement);
              const changes = db.getRowsModified();
              const operation = statement.split(" ")[0].toUpperCase();
              outputText += `✓ ${operation} executed successfully. ${changes} row(s) affected.\n\n`;
              successfulStatements++;
            } else if (
              stmtUpper.startsWith("BEGIN") ||
              stmtUpper.startsWith("COMMIT") ||
              stmtUpper.startsWith("ROLLBACK")
            ) {
              // Transaction control statements
              db.run(statement);
              outputText += `✓ ${statement.trim()}\n\n`;
              successfulStatements++;
            } else {
              // Other SQL statements
              db.run(statement);
              outputText += `✓ Statement executed successfully.\n\n`;
              successfulStatements++;
            }
          } catch (err) {
            errorStatements++;
            outputText += `✗ Error in statement ${totalStatements}:\n`;
            outputText += `   Statement: ${statement.trim()}\n`;
            outputText += `   Error: ${err.message}\n\n`;
          }
        }

        // Add execution summary
        if (totalStatements > 0) {
          outputText += "=".repeat(50) + "\n";
          outputText += "EXECUTION SUMMARY:\n";
          outputText += `Total Statements: ${totalStatements}\n`;
          outputText += `Successful: ${successfulStatements}\n`;
          outputText += `Failed: ${errorStatements}\n`;
          outputText += "=".repeat(50) + "\n";
        }

        if (!outputText.trim()) {
          outputText =
            "No SQL statements to execute. Please write some SQL code.";
        }

        setOutput(outputText);
      }
    } catch (err) {
      setOutput(`SQL Error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  }, [code, sqlJs, db, remoteRunners]);

  const handleRun = useCallback(() => {
    setOutput("");
    console.log("Running SQL code");
    runSQL();
  }, [runSQL]);

  const onChangeCode = useCallback((value) => {
    setCode(value);
  }, []);

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
    newWidth = Math.max(15, Math.min(85, newWidth));

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
    if (sqlJs) {
      const newDb = new sqlJs.Database();
      setDb(newDb);
    }
    setCurrentSnippetId(null);
    setSnippetName("");
    setOriginalSnippetName("");
    setOriginalCode("");
  }, [defaultCode, sqlJs]);

  const getLanguageIcon = () => {
    return <img src="/assets/sql_logo.png" alt="SQL" width="44" height="24" />;
  };

  useEffect(() => {
    onCodeChange(code);
  }, [code, onCodeChange]);

  useEffect(() => {
    fetchMySnippets();
  }, []);

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
    <section
      className="code-playground-codep"
      style={{ minHeight: customHeight }}
    >
      <div className="playground-content-codep">
        <div
          className="editor-panel-codep"
          style={{ width: `${editorWidth}%` }}
        >
          <div className="panel-header-codep">
            <h3 className="lang-header-codep">
              {getLanguageIcon()}
              {editorWidth > 25 && (
                <p className="code-tabs-lang-names">
                  {editorWidth > 40 ? "SQL" : "SQL"}
                </p>
              )}
              {currentSnippetId && (
                <span className="edit-mode-indicator"> (Editing)</span>
              )}
              {!sqlJs && (
                <span className="sql-loading-codep"> (Loading...)</span>
              )}
            </h3>
          </div>

          <div className="editor-container-codep">
            <AceEditor
              ref={editorRef}
              mode="sql"
              theme={theme}
              value={code}
              onChange={onChangeCode}
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
                tabSize: 2,
                useWorker: false,
                fontFamily:
                  "'Fira Code', 'Cascadia Code', 'Monaco', 'Consolas', monospace",
                scrollPastEnd: 0.5,
                highlightSelectedWord: true,
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
                    title="Update Snippet"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className="bi bi-floppy"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 2H9v3h2z" />
                      <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                    </svg>
                    Update
                  </button>
                  <button
                    className="btn-codep btn-secondary-codep"
                    onClick={resetToDefault}
                    title="New Snippet"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className="bi bi-plus-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    New
                  </button>
                </>
              ) : (
                <button
                  className="btn-codep btn-secondary-codep"
                  onClick={() => setShowSaveModal(true)}
                  title="Save Snippet"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-floppy"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 2H9v3h2z" />
                    <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                  </svg>
                </button>
              )}

              <button
                className="btn-codep btn-secondary-codep"
                onClick={resetToDefault}
                title="Reset"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
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
              </button>

              <button
                className="btn-codep btn-primary-codep"
                onClick={handleRun}
                disabled={isRunning || !sqlJs}
              >
                {isRunning ? (
                  "🔄 Running..."
                ) : (
                  <div className="run-code-btn-codep">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className="bi bi-play-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                    </svg>
                    {currentSnippetId ? "Run SQL" : "Run SQL"}
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
          <div className="output-section-codep">
            <div className="output-container-codep">
              <div className="section-header-codep">
                <h3>SQL Output</h3>
              </div>
              <pre className="sql-output-codep">
                {output || "Click 'Run SQL' to execute your SQL code"}
              </pre>

              {/* Database Info Section */}
              {sqlJs && db && (
                <div className="database-info-codep">
                  <div className="section-header-codep">
                    <h4>Database Information</h4>
                  </div>
                  <div className="database-stats-codep">
                    <p>✅ SQL.js Engine Loaded</p>
                    <p>📊 In-memory SQLite Database Ready</p>
                    <p>💾 All changes are temporary (in browser memory)</p>
                    <p>🔄 Refresh the page to reset database</p>
                  </div>
                </div>
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
              <h3>
                {currentSnippetId ? "Update SQL Snippet" : "Save SQL Snippet"}
              </h3>
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
                  placeholder="Enter SQL snippet name"
                  autoFocus
                />
              </div>
              <div className="form-group-codep">
                <label>Language</label>
                <div className="language-display-codep">
                  {getLanguageIcon()} SQL
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
                    ? "Update SQL Snippet"
                    : "Save SQL Snippet"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
