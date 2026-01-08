import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ===================== CODE BLOCK QUESTIONS (10) =====================

  {
    question: (
      <div>
        <p>
          Which scope does the variable <b>x</b> belong to?
        </p>
        <CodeBlock
          language="javascript"
          code={`if (true) {
  let x = 10;
}`}
        />
      </div>
    ),
    options: ["Global Scope", "Block Scope", "Function Scope", "Window Scope"],
    answer: "Block Scope",
  },

  {
    question: (
      <div>
        <p>
          What is the scope of variable <b>count</b>?
        </p>
        <CodeBlock
          language="javascript"
          code={`let count = 5;

function test() {
  console.log(count);
}`}
        />
      </div>
    ),
    options: ["Block Scope", "Local Scope", "Global Scope", "Function Scope"],
    answer: "Global Scope",
  },

  {
    question: (
      <div>
        <p>What will happen when this code runs?</p>
        <CodeBlock
          language="javascript"
          code={`greet();

function greet() {
  console.log("Hello");
}`}
        />
      </div>
    ),
    options: ["Error", "Hello is printed", "Undefined", "Nothing happens"],
    answer: "Hello is printed",
  },

  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="javascript"
          code={`sayHi();

const sayHi = function () {
  console.log("Hi");
};`}
        />
      </div>
    ),
    options: ["Hi", "Undefined", "ReferenceError", "Nothing"],
    answer: "ReferenceError",
  },

  {
    question: (
      <div>
        <p>What happens with arrow functions?</p>
        <CodeBlock
          language="javascript"
          code={`hello();

const hello = () => {
  console.log("Hello");
};`}
        />
      </div>
    ),
    options: ["Hello", "Undefined", "ReferenceError", "Function is hoisted"],
    answer: "ReferenceError",
  },

  {
    question: (
      <div>
        <p>What does this code return?</p>
        <CodeBlock
          language="javascript"
          code={`const nums = [1, 2, 3];
const result = nums.map(num => num * 2);
console.log(result);`}
        />
      </div>
    ),
    options: ["[1, 2, 3]", "[2, 4, 6]", "6", "undefined"],
    answer: "[2, 4, 6]",
  },

  {
    question: (
      <div>
        <p>What does forEach() return?</p>
        <CodeBlock
          language="javascript"
          code={`const arr = [1, 2, 3];
const result = arr.forEach(num => num * 2);
console.log(result);`}
        />
      </div>
    ),
    options: ["New Array", "Modified Array", "undefined", "Error"],
    answer: "undefined",
  },

  {
    question: (
      <div>
        <p>What will filter() return?</p>
        <CodeBlock
          language="javascript"
          code={`const nums = [1, 2, 3, 4];
const even = nums.filter(num => num % 2 === 0);
console.log(even);`}
        />
      </div>
    ),
    options: ["[1, 3]", "[2, 4]", "[4]", "undefined"],
    answer: "[2, 4]",
  },

  {
    question: (
      <div>
        <p>What is the output of reduce()?</p>
        <CodeBlock
          language="javascript"
          code={`const nums = [1, 2, 3];
const sum = nums.reduce((acc, curr) => acc + curr, 0);
console.log(sum);`}
        />
      </div>
    ),
    options: ["6", "123", "undefined", "Error"],
    answer: "6",
  },

  {
    question: (
      <div>
        <p>What does this code return?</p>
        <CodeBlock
          language="javascript"
          code={`const arr = [1, 2, 3];
console.log(arr.every(num => num > 0));`}
        />
      </div>
    ),
    options: ["false", "true", "undefined", "Error"],
    answer: "true",
  },

  // ===================== NORMAL QUESTIONS (5) =====================

  {
    question:
      "Which scope allows a variable to be accessed anywhere in the program?",
    options: ["Block Scope", "Local Scope", "Global Scope", "Function Scope"],
    answer: "Global Scope",
  },

  {
    question: "Which type of functions are hoisted in JavaScript?",
    options: [
      "Arrow Functions",
      "Function Expressions",
      "Function Declarations",
      "Callbacks",
    ],
    answer: "Function Declarations",
  },

  {
    question: "Which array method always returns undefined?",
    options: ["map()", "filter()", "reduce()", "forEach()"],
    answer: "forEach()",
  },

  {
    question:
      "Which array method checks if at least one element passes a condition?",
    options: ["every()", "some()", "filter()", "map()"],
    answer: "some()",
  },

  {
    question: "Which of the following is a mutable array method?",
    options: ["map()", "filter()", "reverse()", "slice()"],
    answer: "reverse()",
  },
];

const More_JS_Concepte_MCQ = ({
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
      title="More JS Concepets - MCQs"
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
export default More_JS_Concepte_MCQ;
