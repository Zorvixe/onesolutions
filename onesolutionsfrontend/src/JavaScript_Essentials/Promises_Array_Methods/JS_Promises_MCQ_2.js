import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ===================== CODE BLOCK QUESTIONS (10) =====================

  {
    question: (
      <div>
        <p>Which asynchronous code style is shown here?</p>
        <CodeBlock
          language="javascript"
          code={`setTimeout(() => {
    console.log("Hello");
  }, 1000);`}
        />
      </div>
    ),
    options: ["Promise based", "Callback based", "Synchronous", "Blocking"],
    answer: "Callback based",
  },

  {
    question: (
      <div>
        <p>Which asynchronous code style is used by fetch()?</p>
        <CodeBlock
          language="javascript"
          code={`fetch("https://api.example.com/data");`}
        />
      </div>
    ),
    options: [
      "Callback based",
      "Promise based",
      "Synchronous",
      "Interval based",
    ],
    answer: "Promise based",
  },

  {
    question: (
      <div>
        <p>What does this code create?</p>
        <CodeBlock
          language="javascript"
          code={`const promise = new Promise((resolve, reject) => {
    resolve("Done");
  });`}
        />
      </div>
    ),
    options: ["Callback", "Async function", "Promise object", "Event"],
    answer: "Promise object",
  },

  {
    question: (
      <div>
        <p>Which function is called when the promise is fulfilled?</p>
        <CodeBlock
          language="javascript"
          code={`new Promise((resolve, reject) => {
    resolve("Success");
  }).then(result => console.log(result));`}
        />
      </div>
    ),
    options: ["reject", "catch", "then", "finally"],
    answer: "then",
  },

  {
    question: (
      <div>
        <p>Which function is called when the promise is rejected?</p>
        <CodeBlock
          language="javascript"
          code={`new Promise((resolve, reject) => {
    reject("Error");
  }).catch(err => console.log(err));`}
        />
      </div>
    ),
    options: ["then", "resolve", "catch", "await"],
    answer: "catch",
  },

  {
    question: (
      <div>
        <p>
          What does <b>await</b> do here?
        </p>
        <CodeBlock
          language="javascript"
          code={`async function getData() {
    const response = await fetch("https://api.example.com");
  }`}
        />
      </div>
    ),
    options: [
      "Runs fetch in parallel",
      "Stops function execution",
      "Waits for the Promise to resolve",
      "Rejects the Promise",
    ],
    answer: "Waits for the Promise to resolve",
  },

  {
    question: (
      <div>
        <p>
          Where can <b>await</b> be used?
        </p>
        <CodeBlock
          language="javascript"
          code={`function test() {
    await fetch("https://api.example.com");
  }`}
        />
      </div>
    ),
    options: [
      "Anywhere",
      "Only inside async functions",
      "Only inside promises",
      "Only in callbacks",
    ],
    answer: "Only inside async functions",
  },

  {
    question: (
      <div>
        <p>What will this function return?</p>
        <CodeBlock
          language="javascript"
          code={`async function demo() {
    return "Hello";
  }`}
        />
      </div>
    ),
    options: ["String", "Object", "Promise", "Undefined"],
    answer: "Promise",
  },

  {
    question: (
      <div>
        <p>What does this code do?</p>
        <CodeBlock
          language="javascript"
          code={`const text = "  Hello World  ";
  console.log(text.trim());`}
        />
      </div>
    ),
    options: [
      "Removes all spaces",
      "Removes spaces from both ends",
      "Converts to uppercase",
      "Splits the string",
    ],
    answer: "Removes spaces from both ends",
  },

  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="javascript"
          code={`const name = "JavaScript";
  console.log(name.slice(0, 4));`}
        />
      </div>
    ),
    options: ["Java", "Script", "JavaScript", "Undefined"],
    answer: "Java",
  },

  // ===================== NORMAL QUESTIONS (5) =====================

  {
    question: "Which are the two main asynchronous code styles in JavaScript?",
    options: [
      "Loop based and Event based",
      "Callback based and Promise based",
      "Sync and Parallel",
      "Function and Object based",
    ],
    answer: "Callback based and Promise based",
  },

  {
    question: "Which keyword is used to consume promises in a modern way?",
    options: ["then", "resolve", "async / await", "callback"],
    answer: "async / await",
  },

  {
    question: "What does the trim() method do?",
    options: [
      "Removes all characters",
      "Removes whitespace from both ends",
      "Splits a string",
      "Changes case",
    ],
    answer: "Removes whitespace from both ends",
  },

  {
    question: "Which string method converts text to uppercase?",
    options: ["toLowerCase()", "slice()", "toUpperCase()", "concat()"],
    answer: "toUpperCase()",
  },

  {
    question: "Which property returns the length of a string?",
    options: ["size", "count", "length", "index"],
    answer: "length",
  },
];

const JS_Promises_MCQ_2 = ({
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
      title="JS Promises | Part 2 - MCQs"
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
export default JS_Promises_MCQ_2;
