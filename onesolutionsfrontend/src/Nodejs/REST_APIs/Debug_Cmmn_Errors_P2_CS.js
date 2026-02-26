import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Debug_Cmmn_Errors_P2_CS = ({   
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if subtopic is already completed
  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleContinue = async () => {
    if (isLoading || isSubtopicCompleted) return;

    try {
      setIsLoading(true);
      const result = await markSubtopicComplete(
        subtopicId,
        goalName,
        courseName
      );

      if (result.success) {
        await loadProgressSummary();
        setIsSubtopicCompleted(true);
        console.log("✅ Cheat sheet marked as completed");
      } else {
        console.error(
          "❌ Failed to mark cheat sheet complete:",
          result.message
        );
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      console.error("❌ Failed to mark cheat sheet complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="intro-container">
    <h1>Debugging Common Errors | Part 2 | Cheat Sheet</h1>

  
    <section>
      <h2>1. Request Methods</h2>
      <p>When we try to request with a wrong method</p>
  
      <CodeBlock language="http" code={`HTTP/1.1 404 Not Found`} />
  
      <p><b>Reason:</b> Using wrong HTTP method.</p>
  
      <p><b>Example:</b> Using POST instead of GET.</p>
  
      <p><b>Fix:</b> Use correct method in API call.</p>
    </section>
  
    {/* MISSING COLON */}
  
    <section>
      <h2>2. Missing colon(:) in Path Params</h2>
  
      <CodeBlock language="javascript" code={`// ❌ Wrong
  app.get("/books/bookId/")
  
  // ✅ Correct
  app.get("/books/:bookId/")`} />
  
      <p><b>Error:</b> 404 Not Found</p>
    </section>
  
    {/* WRONG PARAM NAME */}
  
    <section>
      <h2>3. Accessing Path Parameters with Wrong Name</h2>
  
      <CodeBlock
        language="bash"
        code={`ReferenceError: bookId is not defined`}
      />
  
      <p><b>Reason:</b> Param name mismatch.</p>
  
      <CodeBlock
        language="javascript"
        code={`// Path
  app.get("/books/:bookId/")
  
  // Access
  const { bookId } = request.params;`}
      />
    </section>
  
    {/* QUERY FORMATTING */}
  
    <section>
      <h2>4. Query Formatting Error</h2>
  
      <CodeBlock
        language="bash"
        code={`SQLITE_ERROR: no such table: book`}
      />
  
      <p><b>Reason:</b> Expression not embedded properly.</p>
  
      <CodeBlock
        language="javascript"
        code={`//  Wrong
  "SELECT * FROM book WHERE book_id = \${bookId}"
  
  //  Correct
  \`SELECT * FROM book WHERE book_id = \${bookId}\``}
      />
    </section>
  
    {/* SQLITE METHOD */}
  
    <section>
      <h2>5. Replacing SQLite Methods</h2>
  
      <CodeBlock
        language="json"
        code={`{
    "stmt": {},
    "lastID": 0,
    "changes": 0
  }`}
      />
  
      <p><b>Reason:</b> Used db.run() instead of db.get()/db.all()</p>
      <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
        <thead>
          <tr>
            <th>Method</th>
            <th>Use</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>db.get()</td>
            <td>Single row</td>
          </tr>
          <tr>
            <td>db.all()</td>
            <td>Multiple rows</td>
          </tr>
          <tr>
            <td>db.run()</td>
            <td>Insert / Update / Delete</td>
          </tr>
        </tbody>
      </table>
    </section>
  
    {/* QUERY PARAM URL */}
  
    <section>
      <h2>6. HTTP Request URL Errors</h2>
  
      <h3>6.1 Missing ?</h3>
  
      <CodeBlock language="http" code={`HTTP/1.1 404 Not Found`} />
  
      <CodeBlock
        language="text"
        code={`//  Wrong
  /books/limit=2
  
  //  Correct
  /books/?limit=2`}
      />
  
      <h3>6.2 Missing & between Query Params</h3>
  
      <CodeBlock
        language="bash"
        code={`SQLITE_ERROR: unrecognized token: "3offset"`}
      />
  
      <CodeBlock
        language="text"
        code={`//  Wrong
  /books/?limit=3offset=2
  
  //  Correct
  /books/?limit=3&offset=2`}
      />
  
      <h3>6.3 Using , instead of &</h3>
  
      <CodeBlock
        language="bash"
        code={`SQLITE_ERROR: near ",": syntax error`}
      />
  
      <CodeBlock
        language="text"
        code={`//  Wrong
  /books/?limit=3,offset=2
  
  // Correct
  /books/?limit=3&offset=2`}
      />
    </section>
  
    {/* UNKNOWN DB */}
  
    <section>
      <h2>7. Accessing Unknown Database</h2>
      <p>When we are trying to access an unknown Database it will not show any error instead it creates a new database with the given name</p>
  
      <CodeBlock
        language="bash"
        code={`sqlite> .tables
  (no output)`}
      />
  
      <p><b>Reason:</b> Wrong database file name.</p>
  
      <p className="note">
        <b>Note:</b> SQLite creates a new empty DB if file not found.
      </p>
    </section>
  
    {/* WRONG PORT */}
  
    <section>
      <h2>8. Accessing Wrong Port Number</h2>
      <p>When we are trying to access the wrong port number, we may get the below notification</p>
  
      <CodeBlock
        language="bash"
        code={`connect ECONNREFUSED 127.0.0.1:4000`}
      />
  
      <p><b>Reason:</b> Server running on different port.</p>
  
      <p><b>Fix:</b> Check app.listen(PORT).</p>
    </section>
  
  
      {/* Continue Button */}
      <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted}
        >
          {isSubtopicCompleted ? "Completed" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Debug_Cmmn_Errors_P2_CS;
