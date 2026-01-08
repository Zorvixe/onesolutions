import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";


const questionsData = [
  // ===================== CODE BLOCK QUESTIONS (10) =====================

  {
    question: (
      <div>
        <p>How will this code execute?</p>
        <CodeBlock
          language="javascript"
          code={`console.log("Start");
console.log("End");`}
        />
      </div>
    ),
    options: [
      "Asynchronously",
      "Synchronously",
      "Promise based",
      "Callback based",
    ],
    answer: "Synchronously",
  },

  {
    question: (
      <div>
        <p>Which line executes first?</p>
        <CodeBlock
          language="javascript"
          code={`console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");`}
        />
      </div>
    ),
    options: [
      "B",
      "A",
      "C",
      "A then C",
    ],
    answer: "A then C",
  },

  {
    question: (
      <div>
        <p>What is the state of this promise initially?</p>
        <CodeBlock
          language="javascript"
          code={`const promise = new Promise((resolve, reject) => {});`}
        />
      </div>
    ),
    options: [
      "Fulfilled",
      "Rejected",
      "Pending",
      "Resolved",
    ],
    answer: "Pending",
  },

  {
    question: (
      <div>
        <p>Which method handles promise rejection?</p>
        <CodeBlock
          language="javascript"
          code={`fetch("https://example.com")
  .then(response => response.json())
  .catch(error => console.log(error));`}
        />
      </div>
    ),
    options: [
      "then()",
      "resolve()",
      "catch()",
      "finally()",
    ],
    answer: "catch()",
  },

  {
    question: (
      <div>
        <p>What is returned by this async function?</p>
        <CodeBlock
          language="javascript"
          code={`async function getData() {
  return 10;
}`}
        />
      </div>
    ),
    options: [
      "Number",
      "Promise",
      "Object",
      "Undefined",
    ],
    answer: "Promise",
  },

  {
    question: (
      <div>
        <p>Which keyword ensures async operation completes?</p>
        <CodeBlock
          language="javascript"
          code={`async function fetchData() {
  const result = await fetch("url");
}`}
        />
      </div>
    ),
    options: [
      "async",
      "then",
      "await",
      "promise",
    ],
    answer: "await",
  },

  {
    question: (
      <div>
        <p>What does trim() do here?</p>
        <CodeBlock
          language="javascript"
          code={`const text = "  Hello  ";
console.log(text.trim());`}
        />
      </div>
    ),
    options: [
      "Removes inner spaces",
      "Removes spaces from both ends",
      "Removes all spaces",
      "Returns length",
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
console.log(name.includes("Script"));`}
        />
      </div>
    ),
    options: [
      "false",
      "true",
      "Error",
      "undefined",
    ],
    answer: "true",
  },

  {
    question: (
      <div>
        <p>Which scope does <b>value</b> belong to?</p>
        <CodeBlock
          language="javascript"
          code={`if (true) {
  let value = 100;
}`}
        />
      </div>
    ),
    options: [
      "Global Scope",
      "Block Scope",
      "Function Scope",
      "Window Scope",
    ],
    answer: "Block Scope",
  },

  {
    question: (
      <div>
        <p>What does map() return?</p>
        <CodeBlock
          language="javascript"
          code={`const nums = [1, 2, 3];
const result = nums.map(n => n + 1);`}
        />
      </div>
    ),
    options: [
      "Modified array",
      "New array",
      "Single value",
      "undefined",
    ],
    answer: "New array",
  },

  // ===================== NORMAL QUESTIONS (5) =====================

  {
    question: "Which execution waits for the previous line to finish?",
    options: [
      "Asynchronous",
      "Promise based",
      "Synchronous",
      "Callback based",
    ],
    answer: "Synchronous",
  },

  {
    question: "Which promise state represents failure?",
    options: [
      "Pending",
      "Fulfilled",
      "Rejected",
      "Resolved",
    ],
    answer: "Rejected",
  },

  {
    question: "Which keyword is mandatory inside async functions?",
    options: [
      "then",
      "await",
      "catch",
      "resolve",
    ],
    answer: "await",
  },

  {
    question: "Which array method always returns undefined?",
    options: [
      "map()",
      "filter()",
      "forEach()",
      "reduce()",
    ],
    answer: "forEach()",
  },

  {
    question: "Which array method checks if at least one element passes a condition?",
    options: [
      "every()",
      "some()",
      "map()",
      "filter()",
    ],
    answer: "some()",
  },
];

const JS_Essential_MCQ_Assignment_4 = ({
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
      title="JS Essential Assignment | Part 4 - MCQs"
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
export default JS_Essential_MCQ_Assignment_4;
