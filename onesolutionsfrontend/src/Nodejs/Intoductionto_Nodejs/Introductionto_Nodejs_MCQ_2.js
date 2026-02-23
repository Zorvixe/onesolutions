import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: <p>Which of the following is a Node.js core module?</p>,
    options: ["path", "date-fns", "express", "react"],
    answer: "path",
  },
  {
    question: <p>What does the fs module handle?</p>,
    options: [
      "File system operations",
      "URL parsing",
      "Database queries",
      "Event handling",
    ],
    answer: "File system operations",
  },
  {
    question: <p>What is NPM?</p>,
    options: [
      "Node Package Manager",
      "Node Project Module",
      "New Package Manager",
      "Network Process Manager",
    ],
    answer: "Node Package Manager",
  },
  {
    question: <p>Which command creates package.json?</p>,
    options: ["npm init -y", "npm install", "node init", "npm start"],
    answer: "npm init -y",
  },
  {
    question: <p>A package is ______.</p>,
    options: [
      "A directory with one or more modules",
      "A single JavaScript file",
      "A database",
      "A Node server",
    ],
    answer: "A directory with one or more modules",
  },

  // ✅ CODE MCQs (10)

  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="javascript"
          code={`const path = require("path");
  const filePath = path.join("users", "ravi", "notes.txt");
  console.log(filePath);`}
        />
      </div>
    ),
    options: [
      "users/ravi/notes.txt",
      "users\\ravi\\notes.txt",
      "notes.txt",
      "Error",
    ],
    answer: "users/ravi/notes.txt",
  },

  {
    question: (
      <div>
        <p>Which module is used here?</p>
        <CodeBlock
          language="javascript"
          code={`const path = require("path");`}
        />
      </div>
    ),
    options: [
      "Core module",
      "Third-party module",
      "Local module",
      "JSON module",
    ],
    answer: "Core module",
  },

  {
    question: (
      <div>
        <p>What does this command do?</p>
        <CodeBlock language="bash" code={`npm install date-fns --save`} />
      </div>
    ),
    options: [
      "Installs third-party package",
      "Creates package.json",
      "Runs Node project",
      "Deletes node_modules",
    ],
    answer: "Installs third-party package",
  },

  {
    question: (
      <div>
        <p>What will this create?</p>
        <CodeBlock language="bash" code={`mkdir myapp`} />
      </div>
    ),
    options: ["A folder", "A file", "package.json", "A module"],
    answer: "A folder",
  },

  {
    question: (
      <div>
        <p>What does this command do?</p>
        <CodeBlock language="bash" code={`cd myapp`} />
      </div>
    ),
    options: [
      "Moves into myapp directory",
      "Creates myapp",
      "Deletes myapp",
      "Runs myapp",
    ],
    answer: "Moves into myapp directory",
  },

  {
    question: (
      <div>
        <p>What will be the output type?</p>
        <CodeBlock
          language="javascript"
          code={`const { addDays } = require("date-fns");
  
  const result = addDays(new Date(2021, 0, 11), 10);
  console.log(result);`}
        />
      </div>
    ),
    options: ["Date", "String", "Number", "Object"],
    answer: "Date",
  },

  {
    question: (
      <div>
        <p>Why is 0 used as the month index?</p>
        <CodeBlock language="javascript" code={`new Date(2021, 0, 11)`} />
      </div>
    ),
    options: [
      "Month index starts from 0",
      "January is month 0 in output",
      "To avoid error",
      "It represents Sunday",
    ],
    answer: "Month index starts from 0",
  },

  {
    question: (
      <div>
        <p>Which file stores project metadata?</p>
        <CodeBlock language="bash" code={`npm init -y`} />
      </div>
    ),
    options: ["package.json", "index.js", "node_modules", "app.js"],
    answer: "package.json",
  },

  {
    question: (
      <div>
        <p>How is addDays imported?</p>
        <CodeBlock
          language="javascript"
          code={`const { addDays } = require("date-fns");`}
        />
      </div>
    ),
    options: ["Named import", "Default import", "File import", "Class import"],
    answer: "Named import",
  },

  {
    question: (
      <div>
        <p>date-fns is an example of ______.</p>
        <CodeBlock language="bash" code={`npm install date-fns`} />
      </div>
    ),
    options: [
      "Third-party package",
      "Core module",
      "Local module",
      "Built-in API",
    ],
    answer: "Third-party package",
  },
];

const Introductionto_Nodejs_MCQ_2 = ({
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

export default Introductionto_Nodejs_MCQ_2;
