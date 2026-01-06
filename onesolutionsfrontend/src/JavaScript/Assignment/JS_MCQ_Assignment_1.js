import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ---------- 1 (Normal) ----------
  {
    question: "What is JavaScript mainly used for?",
    options: [
      "Styling web pages",
      "Structuring web content",
      "Making web pages interactive",
      "Managing databases",
    ],
    answer: "Making web pages interactive",
  },

  // ---------- 2 (Normal) ----------
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["int", "string", "let", "define"],
    answer: "let",
  },

  // ---------- 3 (Normal) ----------
  {
    question: "Which symbol is used to assign a value to a variable?",
    options: ["==", "===", "=", ":"],
    answer: "=",
  },

  // ---------- 4 (Normal) ----------
  {
    question: "Which data type is used to store multiple values in JavaScript?",
    options: ["String", "Number", "Array", "Boolean"],
    answer: "Array",
  },

  // ---------- 5 (Normal) ----------
  {
    question: "Which JavaScript keyword allows variable re-declaration?",
    options: ["let", "const", "var", "static"],
    answer: "var",
  },

  // ---------- 6 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>What will be displayed in the console?</p>
        <CodeBlock
          language="javascript"
          code={`console.log("Hello JavaScript");`}
        />
      </div>
    ),
    options: [
      "Hello",
      "JavaScript",
      "Hello JavaScript",
      "Nothing",
    ],
    answer: "Hello JavaScript",
  },

  // ---------- 7 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>What is the output of the following code?</p>
        <CodeBlock
          language="javascript"
          code={`let x = 10;
let y = "10";
console.log(x == y);`}
        />
      </div>
    ),
    options: ["true", "false", "undefined", "error"],
    answer: "true",
  },

  // ---------- 8 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="javascript"
          code={`let x = 10;
let y = "10";
console.log(x === y);`}
        />
      </div>
    ),
    options: ["true", "false", "10", `"10"`],
    answer: "false",
  },

  // ---------- 9 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>How many elements are there in the array?</p>
        <CodeBlock
          language="javascript"
          code={`let nums = [1, 2, 3, 4];
console.log(nums.length);`}
        />
      </div>
    ),
    options: ["3", "4", "5", "undefined"],
    answer: "4",
  },

  // ---------- 10 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="javascript"
          code={`let arr = ["a", "b"];
arr.push("c");
console.log(arr);`}
        />
      </div>
    ),
    options: [
      `["a", "b"]`,
      `["a", "b", "c"]`,
      `["c", "a", "b"]`,
      `"a,b,c"`,
    ],
    answer: `["a", "b", "c"]`,
  },

  // ---------- 11 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>What does the <p>pop()</p> method do?</p>
        <CodeBlock
          language="javascript"
          code={`let arr = [10, 20, 30];
arr.pop();`}
        />
      </div>
    ),
    options: [
      "Adds an element at the beginning",
      "Removes the last element",
      "Removes the first element",
      "Adds an element at the end",
    ],
    answer: "Removes the last element",
  },

  // ---------- 12 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="javascript"
          code={`let colors = ["red", "green", "blue"];
console.log(colors[1]);`}
        />
      </div>
    ),
    options: ["red", "green", "blue", "undefined"],
    answer: "green",
  },

  // ---------- 13 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>How do you access the <b>age</b> property?</p>
        <CodeBlock
          language="javascript"
          code={`let user = { name: "Ravi", age: 30 };`}
        />
      </div>
    ),
    options: [
      "user(age)",
      "user->age",
      "user.age",
      "get.user.age",
    ],
    answer: "user.age",
  },

  // ---------- 14 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="javascript"
          code={`let items = [1, 2, 3];
items.pop();
console.log(items.length);`}
        />
      </div>
    ),
    options: ["1", "2", "3", "0"],
    answer: "2",
  },

  // ---------- 15 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>Which of the following correctly defines an object?</p>
        <CodeBlock
          language="javascript"
          code={`let car = { brand: "BMW", year: 2023 };`}
        />
      </div>
    ),
    options: [
      `["BMW", 2023]`,
      `{ brand: "BMW", year: 2023 }`,
      `(brand: "BMW", year: 2023)`,
      `<brand="BMW">`,
    ],
    answer: `{ brand: "BMW", year: 2023 }`,
  },
];


const JS_MCQ_Assignment_1 = ({
  subtopicId,
  goalName,
  courseName,
  onComplete
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } = useAuth();

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
        courseName
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
  return <MCQLogic title="JS Assignment 1 - MCQs" questions={randomQuestions}
  isCompleted={isCompleted}
  isLoading={isLoading}
  onComplete={handleCompletion}
  subtopicId={subtopicId}
  goalName={goalName}
  courseName={courseName} />;
};

export default JS_MCQ_Assignment_1;
