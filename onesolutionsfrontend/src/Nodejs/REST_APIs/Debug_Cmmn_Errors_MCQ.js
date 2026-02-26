import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [ 
    {
      question: <p>What is the reason for “Cannot find module 'expresses'”?</p>,
      options: [
        "Port already in use",
        "Wrong package name",
        "Wrong database",
        "Server not started",
      ],
      answer: "Wrong package name",
    },
    {
      question: <p>Which command stops a running Node server?</p>,
      options: ["Ctrl + C", "Ctrl + Z", "npm stop", "kill node"],
      answer: "Ctrl + C",
    },
    {
      question: <p>Which SQLite method is used to retrieve multiple rows?</p>,
      options: ["db.run()", "db.exec()", "db.all()", "db.get()"],
      answer: "db.all()",
    },
    {
      question: <p>What happens if SQLite DB file name is wrong?</p>,
      options: [
        "Throws error",
        "Creates new empty database",
        "Stops server",
        "Deletes old database",
      ],
      answer: "Creates new empty database",
    },
    {
      question: <p>Which symbol starts query parameters in a URL?</p>,
      options: ["&", "?", "/", ":"],
      answer: "?",
    },
  
    {
      question: (
        <div>
          <p>What is the reason?</p>
          <CodeBlock language="bash" code={`Error: listen EADDRINUSE: address already in use :::3000`} />
        </div>
      ),
      options: [
        "Wrong API path",
        "Database error",
        "Port already running",
        "Express not installed",
      ],
      answer: "Port already running",
    },
  
    {
      question: (
        <div>
          <p>What is the fix?</p>
          <CodeBlock language="bash" code={`Error: Cannot find module '/part-3/index.js'`} />
        </div>
      ),
      options: [
        "Install express",
        "Restart system",
        "cd into project folder",
        "Change port",
      ],
      answer: "cd into project folder",
    },
  
    {
      question: (
        <div>
          <p>Why does this error occur?</p>
          <CodeBlock language="http" code={`HTTP/1.1 404 Not Found`} />
        </div>
      ),
      options: [
        "Wrong route or method",
        "Server crash",
        "SQL error",
        "Port issue",
      ],
      answer: "Wrong route or method",
    },
  
    {
      question: (
        <div>
          <p>What is wrong in this code?</p>
          <CodeBlock
            language="javascript"
            code={`const app = express;`}
          />
        </div>
      ),
      options: [
        "express not imported",
        "Missing () while calling express",
        "app already defined",
        "Wrong variable name",
      ],
      answer: "Missing () while calling express",
    },
  
    {
      question: (
        <div>
          <p>Why this error?</p>
          <CodeBlock language="bash" code={`ReferenceError: bookId is not defined`} />
        </div>
      ),
      options: [
        "Wrong SQL query",
        "Wrong param name",
        "Port issue",
        "Missing middleware",
      ],
      answer: "Wrong param name",
    },
  
    {
      question: (
        <div>
          <p>Identify the mistake:</p>
          <CodeBlock
            language="javascript"
            code={`app.get("/books/bookId/")`}
          />
        </div>
      ),
      options: [
        "Missing slash",
        "Missing colon in param",
        "Wrong method",
        "Invalid route",
      ],
      answer: "Missing colon in param",
    },
  
    {
      question: (
        <div>
          <p>Why this output?</p>
          <CodeBlock
            language="json"
            code={`{
    "stmt": {},
    "lastID": 0,
    "changes": 0
  }`}
          />
        </div>
      ),
      options: [
        "Used db.get()",
        "Used db.run() instead of db.get()/db.all()",
        "Database empty",
        "Wrong table",
      ],
      answer: "Used db.run() instead of db.get()/db.all()",
    },
  
    {
      question: (
        <div>
          <p>What is the issue?</p>
          <CodeBlock language="text" code={`/books/limit=2`} />
        </div>
      ),
      options: [
        "Missing ? before query params",
        "Wrong port",
        "Wrong method",
        "Invalid JSON",
      ],
      answer: "Missing ? before query params",
    },
  
    {
      question: (
        <div>
          <p>Why this error?</p>
          <CodeBlock language="bash" code={`SQLITE_ERROR: unrecognized token: "3offset"`} />
        </div>
      ),
      options: [
        "Missing & between query params",
        "Wrong SQL syntax",
        "Table not found",
        "DB not connected",
      ],
      answer: "Missing & between query params",
    },
  
    {
      question: (
        <div>
          <p>What is the reason?</p>
          <CodeBlock language="bash" code={`connect ECONNREFUSED 127.0.0.1:4000`} />
        </div>
      ),
      options: [
        "Server not installed",
        "Wrong port number",
        "Wrong API path",
        "Express error",
      ],
      answer: "Wrong port number",
    },
];

const  Debug_Cmmn_Errors_MCQ = ({
  subtopicId,
  goalName,
  courseName,
  onComplete,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  // Check if subtopic is already completed
  useEffect(() => {
    if (subtopicId && completedContent.includes(subtopicId)) {
      setIsCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleCompletion = async () => {
    if (isLoading || isCompleted) return;

    try {
      setIsLoading(true);

      // Validate that we have the required parameters
      if (!subtopicId) {
        console.error("❌ Subtopic ID is required");
        alert("Error: Subtopic ID is missing");
        return;
      }

      console.log("🎯 Marking subtopic complete:", {
        subtopicId,
        goalName,
        courseName,
      });

      const result = await markSubtopicComplete(
        subtopicId,
        goalName || "Goal 1",
        courseName || "Static Website: HTML CSS & Bootstrap"
      );

      if (result.success) {
        await loadProgressSummary();
        setIsCompleted(true);
        console.log("✅ MCQ successfully marked as completed");

        // Call the parent completion handler if provided
        if (onComplete) {
          onComplete();
        }
      } else {
        console.error("❌ Failed to mark MCQ complete:", result.message);
        alert(`Failed to mark as complete: ${result.message}`);
      }
    } catch (error) {
      console.error("❌ Failed to mark MCQ complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <MCQLogic
      title="Components and Props - MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      isLoading={isLoading}
      onComplete={handleCompletion}
      subtopicId={subtopicId}
      goalName={goalName}
      courseName={courseName}
    />
  );
};

export default Debug_Cmmn_Errors_MCQ;
