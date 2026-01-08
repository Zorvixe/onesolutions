import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ===================== CODE BLOCK QUESTIONS (10) =====================

  {
    question: (
      <div>
        <p>What will be the output of the following code?</p>
        <CodeBlock
          language="javascript"
          code={`const arr = [1, 2, 3];
const copy = [...arr];
console.log(copy);`}
        />
      </div>
    ),
    options: ["[1, 2, 3]", "[[1, 2, 3]]", "Error", "undefined"],
    answer: "[1, 2, 3]",
  },

  {
    question: (
      <div>
        <p>What does this code do?</p>
        <CodeBlock
          language="javascript"
          code={`const a = [1, 2];
const b = [3, 4];
const result = [...a, ...b];
console.log(result);`}
        />
      </div>
    ),
    options: [
      "Creates nested array",
      "Concatenates arrays",
      "Throws error",
      "Removes duplicates",
    ],
    answer: "Concatenates arrays",
  },

  {
    question: (
      <div>
        <p>What will be logged to the console?</p>
        <CodeBlock
          language="javascript"
          code={`function sum(a, b, c) {
  return a + b + c;
}
console.log(sum(...[1, 2, 3]));`}
        />
      </div>
    ),
    options: ["6", "[1,2,3]", "Error", "undefined"],
    answer: "6",
  },

  {
    question: (
      <div>
        <p>What does the rest parameter collect?</p>
        <CodeBlock
          language="javascript"
          code={`function show(...args) {
  console.log(args);
}
show(1, 2, 3);`}
        />
      </div>
    ),
    options: [
      "First argument only",
      "Last argument only",
      "All arguments as array",
      "Error",
    ],
    answer: "All arguments as array",
  },

  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="javascript"
          code={`function greet(name = "Guest") {
  return name;
}
console.log(greet());`}
        />
      </div>
    ),
    options: ["undefined", "null", "Guest", "Error"],
    answer: "Guest",
  },

  {
    question: (
      <div>
        <p>What is the output of this template literal?</p>
        <CodeBlock
          language="javascript"
          code={`const age = 20;
console.log(\`Age is \${age}\`);`}
        />
      </div>
    ),
    options: ["Age is ${age}", "Age is 20", "20", "Error"],
    answer: "Age is 20",
  },

  {
    question: (
      <div>
        <p>What will this ternary operator return?</p>
        <CodeBlock
          language="javascript"
          code={`const x = 5;
const result = x > 3 ? "Yes" : "No";
console.log(result);`}
        />
      </div>
    ),
    options: ["Yes", "No", "undefined", "Error"],
    answer: "Yes",
  },

  {
    question: (
      <div>
        <p>What happens when there is no break in switch?</p>
        <CodeBlock
          language="javascript"
          code={`let x = 2;
switch (x) {
  case 1:
    console.log("One");
  case 2:
    console.log("Two");
  default:
    console.log("Default");
}`}
        />
      </div>
    ),
    options: ["Only Two", "Two and Default", "Error", "Only Default"],
    answer: "Two and Default",
  },

  {
    question: (
      <div>
        <p>What will this arrow function return?</p>
        <CodeBlock
          language="javascript"
          code={`const add = (a, b) => a + b;
console.log(add(2, 3));`}
        />
      </div>
    ),
    options: ["5", "undefined", "Error", "23"],
    answer: "5",
  },

  {
    question: (
      <div>
        <p>How do we correctly return an object from an arrow function?</p>
        <CodeBlock
          language="javascript"
          code={`const getUser = () => ({ name: "JS" });
console.log(getUser());`}
        />
      </div>
    ),
    options: [
      "Returns undefined",
      "Throws error",
      "Returns object",
      "Returns string",
    ],
    answer: "Returns object",
  },

  // ===================== NORMAL QUESTIONS (5) =====================

  {
    question: "What does the spread operator do?",
    options: [
      "Packs values into array",
      "Unpacks iterable values",
      "Removes elements",
      "Creates function",
    ],
    answer: "Unpacks iterable values",
  },

  {
    question: "Where should the rest parameter be placed?",
    options: ["At the beginning", "In the middle", "At the end", "Anywhere"],
    answer: "At the end",
  },

  {
    question: "Which symbol is used for template literals?",
    options: ["Single quotes", "Double quotes", "Backticks", "Parentheses"],
    answer: "Backticks",
  },

  {
    question: "Which operator is a short form of if...else?",
    options: [
      "Logical operator",
      "Ternary operator",
      "Comparison operator",
      "Assignment operator",
    ],
    answer: "Ternary operator",
  },

  {
    question:
      "Which function syntax is concise and does not bind its own this?",
    options: [
      "Function Declaration",
      "Function Expression",
      "Arrow Function",
      "Constructor Function",
    ],
    answer: "Arrow Function",
  },
];

const JS_Essential_MCQ_Assignment_1 = ({
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
      title="JS Essential Assignment | Part 1 - MCQs"
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
export default JS_Essential_MCQ_Assignment_1;
