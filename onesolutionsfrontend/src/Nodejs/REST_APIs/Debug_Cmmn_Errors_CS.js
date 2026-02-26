import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Debug_Cmmn_Errors_CS = ({   
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
    <h1>Debugging Common Errors | Cheat Sheet</h1>
  
    <section>
      <h2>1. Importing Unknown Modules</h2>
  
      <CodeBlock
        language="bash"
        code={`Error: Cannot find module 'expresses'`}
      />
  
      <p><b>Reason:</b> Wrong package name.</p>
  
      <p><b>Fix:</b></p>
  
      <CodeBlock language="bash" code={`npm install express`} />
    </section>
  
    {/* PORT IN USE */}
  
    <section>
      <h2>2. Starting Server in Multiple Terminals</h2>
  
      <CodeBlock
        language="bash"
        code={`Error: listen EADDRINUSE: address already in use :::3000`}
      />
  
      <p><b>Reason:</b> Port already running.</p>
  
      <h3>Fix Steps</h3>
  
      <CodeBlock
        language="bash"
        code={`Ctrl + C
  lsof -i :3000
  kill -9 <PID>`}
      />
    </section>
  
    {/* OUTSIDE PROJECT */}
  
    <section>
      <h2>3. Starting Server outside myapp</h2>
  
      <h4>Using node</h4>
  
      <CodeBlock
        language="bash"
        code={`Error: Cannot find module '/part-3/index.js'`}
      />
  
      <h4>Using nodemon</h4>
  
      <CodeBlock
        language="bash"
        code={`Usage: nodemon [nodemon options] [script.js]`}
      />
  
      <p><b>Reason:</b> Running command in wrong folder.</p>
  
      <p><b>Fix:</b></p>
  
      <CodeBlock language="bash" code={`cd myapp`} />
    </section>
  
    {/* WRONG URL */}
  
    <section>
      <h2>4. Accessing Wrong URL</h2>
  
      <CodeBlock
        language="http"
        code={`HTTP/1.1 404 Not Found`}
      />
  
      <p><b>Reason:</b> Route not available.</p>
  
      <p><b>Fix:</b> Check API path & method.</p>
    </section>
  
    {/* EXPRESS FUNCTION */}
  
    <section>
      <h2>5. Missing Function Call</h2>
  
      <CodeBlock
        language="bash"
        code={`TypeError: app.get is not a function`}
      />
  
      <p><b>Reason:</b> express() not called.</p>
  
      <CodeBlock
        language="javascript"
        code={`//  Wrong
  const app = express;
  
  // Correct
  const app = express();`}
      />
    </section>
  
    {/* SQLITE ERROR */}
  
    <section>
      <h2>6. Importing Unknown File / DB Errors</h2>
  
      <CodeBlock
        language="bash"
        code={`SQLITE_ERROR: no such table: book`}
      />
  
      <p><b>Reasons:</b></p>
  
      <ul>
        <li>Wrong database path</li>
        <li>Table not created</li>
        <li>Wrong file imported</li>
      </ul>
  
      <p><b>Fix:</b></p>
  
      <ul>
        <li>Check DB file path</li>
        <li>Create table using SQL</li>
        <li>Use correct filename</li>
      </ul>

      <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
        <p> Always use try-catch for async DB calls.
      </p>
      </div>
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

export default Debug_Cmmn_Errors_CS;
