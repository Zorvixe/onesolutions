import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: <p>Which Node.js module is used to handle file paths?</p>,
    options: ["fs", "path", "url", "http"],
    answer: "path",
  },
  {
    question: (
      <div>
        <p>What will be the output of the following code?</p>
        <CodeBlock
          language="javascript"
                code={`const path = require("path");
      const filePath = path.join("users", "ravi", "notes.txt");
      console.log(filePath);`}
        />
      </div>
    ),
    options: [
      "users\\ravi\\notes.txt",
      "users/ravi/notes.txt",
      "users-ravi-notes.txt",
      "notes.txt/users/ravi",
    ],
    answer: "users/ravi/notes.txt",
  },
  {
    question: <p>Which command initializes a Node.js project and creates package.json?</p>,
    options: [
      "npm start",
      "npm install",
      "npm init -y",
      "node init",
    ],
    answer: "npm init -y",
  },
  {
    question: <p>What is the role of NPM in Node.js?</p>,
    options: [
      "Runs JavaScript code",
      "Manages Node packages",
      "Compiles JavaScript",
      "Creates databases",
    ],
    answer: "Manages Node packages",
  },
  {
    question: (
      <div>
        <p>Which module is used to work with the file system in Node.js?</p>
      </div>
    ),
    options: ["url", "fs", "path", "os"],
    answer: "fs",
  },
  {
    question: <p>Which command installs a third-party package?</p>,
    options: [
      "npm install &lt;package-name&gt;",
      "npm run package",
      "node install",
      "npm start",
    ],
    answer: "npm install <package-name>",
  },
  {
    question: (
      <div>
        <p>Which function from date-fns adds days to a date?</p>
      </div>
    ),
    options: ["addMonths()", "addYears()", "addDays()", "addHours()"],
    answer: "addDays()",
  },
  {
    question: (
      <div>
        <p>What does bcrypt.hash(password, 10) do?</p>
      </div>
    ),
    options: [
      "Decrypts password",
      "Encrypts password",
      "Deletes password",
      "Stores password",
    ],
    answer: "Encrypts password",
  },
  {
    question: (
      <div>
        <p>Which bcrypt function compares a password with a hashed password?</p>
      </div>
    ),
    options: [
      "bcrypt.hash()",
      "bcrypt.check()",
      "bcrypt.compare()",
      "bcrypt.verify()",
    ],
    answer: "bcrypt.compare()",
  },
  {
    question: (
      <div>
        <p>What is the commonly used saltRounds value in bcrypt?</p>
      </div>
    ),
    options: ["5", "10", "15", "20"],
    answer: "10",
  },
  {
    question: (
      <div>
        <p>What happens if a user already exists during registration?</p>
      </div>
    ),
    options: [
      "User is overwritten",
      "Password is updated",
      "Error response is sent",
      "User is ignored",
    ],
    answer: "Error response is sent",
  },
  {
    question: (
      <div>
        <p>Which HTTP status code indicates a successful request?</p>
      </div>
    ),
    options: ["200", "301", "400", "401"],
    answer: "200",
  },
  {
    question: (
      <div>
        <p>Which status code represents "Bad Request"?</p>
      </div>
    ),
    options: ["200", "204", "301", "400"],
    answer: "400",
  },
  {
    question: (
      <div>
        <p>Which status code indicates that authentication is required?</p>
      </div>
    ),
    options: ["204", "301", "401", "403"],
    answer: "401",
  },
  {
    question: (
      <div>
        <p>What does HTTP status code 403 mean?</p>
      </div>
    ),
    options: [
      "Forbidden",
      "Unauthorized",
      "Bad Request",
      "No Content",
    ],
    answer: "Forbidden",
  },
];

const Nodejs_Mock_Test_1 = ({
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
      title="Nodejs MCQ Test 1 - MCQs"
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

export default Nodejs_Mock_Test_1;
