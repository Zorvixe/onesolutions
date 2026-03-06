import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: <p>Which Node.js core module is used to parse URL strings?</p>,
    options: ["fs", "url", "path", "http"],
    answer: "url",
  },
  {
    question: (
      <div>
        <p>Which command creates a new folder for a Node.js project?</p>
        <CodeBlock language="bash" code={`mkdir myapp`} />
      </div>
    ),
    options: ["Creates a folder", "Deletes folder", "Installs package", "Runs server"],
    answer: "Creates a folder",
  },
  {
    question: (
      <div>
        <p>What does the following command do?</p>
        <CodeBlock language="bash" code={`cd myapp`} />
      </div>
    ),
    options: [
      "Deletes folder",
      "Moves to another directory",
      "Installs packages",
      "Runs application",
    ],
    answer: "Moves to another directory",
  },
  {
    question: <p>Which file is created when running <b>npm init -y</b>?</p>,
    options: ["package.json", "node.json", "app.js", "config.json"],
    answer: "package.json",
  },
  {
    question: <p>What is a Node.js package?</p>,
    options: [
      "Single JavaScript file",
      "Directory containing modules",
      "Database file",
      "Operating system tool",
    ],
    answer: "Directory containing modules",
  },
  {
    question: (
      <div>
        <p>What does the <b>--save</b> flag do when installing packages?</p>
        <CodeBlock language="bash" code={`npm install express --save`} />
      </div>
    ),
    options: [
      "Saves package in package.json",
      "Deletes package",
      "Runs package",
      "Updates package",
    ],
    answer: "Saves package in package.json",
  },
  {
    question: (
      <div>
        <p>Which module is used to work with file system operations?</p>
      </div>
    ),
    options: ["path", "fs", "url", "events"],
    answer: "fs",
  },
  {
    question: (
      <div>
        <p>What does the following function return?</p>
        <CodeBlock
          language="javascript"
          code={`addDays(new Date(2021, 0, 11), 10);`}
        />
      </div>
    ),
    options: [
      "Date after adding days",
      "Previous date",
      "Current date",
      "Random date",
    ],
    answer: "Date after adding days",
  },
  {
    question: (
      <div>
        <p>Why are passwords hashed before storing in database?</p>
      </div>
    ),
    options: [
      "To reduce database size",
      "To improve security",
      "To increase speed",
      "To compress data",
    ],
    answer: "To improve security",
  },
  {
    question: (
      <div>
        <p>Which API allows a new user to create an account?</p>
      </div>
    ),
    options: ["Login API", "Register API", "Delete API", "Update API"],
    answer: "Register API",
  },
  {
    question: (
      <div>
        <p>What happens if the username does not exist during login?</p>
      </div>
    ),
    options: [
      "Login success",
      "Password reset",
      "Invalid User response",
      "Server restart",
    ],
    answer: "Invalid User response",
  },
  {
    question: (
      <div>
        <p>Which HTTP status code indicates that access is forbidden?</p>
      </div>
    ),
    options: ["200", "204", "401", "403"],
    answer: "403",
  },
  {
    question: (
      <div>
        <p>Which HTTP status code represents "No Content"?</p>
      </div>
    ),
    options: ["204", "200", "400", "401"],
    answer: "204",
  },
  {
    question: (
      <div>
        <p>Which function is used to hash passwords in bcrypt?</p>
      </div>
    ),
    options: [
      "bcrypt.compare()",
      "bcrypt.hash()",
      "bcrypt.encrypt()",
      "bcrypt.generate()",
    ],
    answer: "bcrypt.hash()",
  },
  {
    question: (
      <div>
        <p>Which step happens after password comparison during login?</p>
      </div>
    ),
    options: [
      "User deleted",
      "Password stored again",
      "Login success response",
      "Server shutdown",
    ],
    answer: "Login success response",
  },
];

const Nodejs_Mock_Test_2 = ({
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

export default Nodejs_Mock_Test_2;
