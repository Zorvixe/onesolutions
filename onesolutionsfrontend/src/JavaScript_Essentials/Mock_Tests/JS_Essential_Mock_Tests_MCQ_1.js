import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ===================== CODE BLOCK QUESTIONS (10) =====================

  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="javascript"
          code={`const nums = [10, 20, 30];
const copyNums = [...nums];
console.log(copyNums);`}
        />
      </div>
    ),
    options: ["[10, 20, 30]", "[[10, 20, 30]]", "Error", "undefined"],
    answer: "[10, 20, 30]",
  },

  {
    question: (
      <div>
        <p>What does this code return?</p>
        <CodeBlock
          language="javascript"
          code={`function createProduct(name, price) {
  return { name, price };
}

console.log(createProduct("Pen", 10));`}
        />
      </div>
    ),
    options: ["Function", "Array", "New object", "undefined"],
    answer: "New object",
  },

  {
    question: (
      <div>
        <p>What will be logged?</p>
        <CodeBlock
          language="javascript"
          code={`function add(a, b, c) {
  return a + b + c;
}
console.log(add(...[2, 4, 6]));`}
        />
      </div>
    ),
    options: ["12", "246", "Error", "undefined"],
    answer: "12",
  },

  {
    question: (
      <div>
        <p>What does the rest parameter collect?</p>
        <CodeBlock
          language="javascript"
          code={`function display(...values) {
  console.log(values);
}
display(5, 10);`}
        />
      </div>
    ),
    options: [
      "Single value",
      "All arguments as array",
      "Only last value",
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
          code={`function welcome(name = "User") {
  return name;
}
console.log(welcome());`}
        />
      </div>
    ),
    options: ["undefined", "null", "User", "Error"],
    answer: "User",
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="javascript"
          code={`const year = 2025;
console.log(\`Year: \${year}\`);`}
        />
      </div>
    ),
    options: ["Year: ${year}", "Year: 2025", "2025", "Error"],
    answer: "Year: 2025",
  },

  {
    question: (
      <div>
        <p>What happens here?</p>
        <CodeBlock
          language="javascript"
          code={`let value = 1;
switch (value) {
  case 1:
    console.log("One");
  default:
    console.log("Done");
}`}
        />
      </div>
    ),
    options: ["Only One", "Only Done", "One and Done", "Error"],
    answer: "One and Done",
  },

  {
    question: (
      <div>
        <p>What will this arrow function return?</p>
        <CodeBlock
          language="javascript"
          code={`const multiply = (a, b) => a * b;
console.log(multiply(3, 4));`}
        />
      </div>
    ),
    options: ["7", "12", "undefined", "Error"],
    answer: "12",
  },

  {
    question: (
      <div>
        <p>How do we correctly return an object?</p>
        <CodeBlock
          language="javascript"
          code={`const getItem = () => ({ id: 1 });
console.log(getItem());`}
        />
      </div>
    ),
    options: [
      "Returns undefined",
      "Returns object",
      "Throws error",
      "Returns string",
    ],
    answer: "Returns object",
  },

  {
    question: (
      <div>
        <p>What does <b>this</b> refer to?</p>
        <CodeBlock
          language="javascript"
          code={`function Student(name) {
  this.name = name;
}

const s1 = new Student("Sam");`}
        />
      </div>
    ),
    options: [
      "Window object",
      "Function itself",
      "Instance object",
      "Global scope",
    ],
    answer: "Instance object",
  },

  // ===================== NORMAL QUESTIONS (5) =====================

  {
    question: "What does the spread operator do?",
    options: [
      "Wraps values into array",
      "Unpacks iterable values",
      "Deletes values",
      "Creates function",
    ],
    answer: "Unpacks iterable values",
  },

  {
    question: "Where should the rest parameter be placed in a function?",
    options: ["Beginning", "Middle", "End", "Anywhere"],
    answer: "End",
  },

  {
    question: "Which symbol is used for template literals?",
    options: ["Quotes", "Backticks", "Brackets", "Parentheses"],
    answer: "Backticks",
  },

  {
    question: "Which operator works as a short form of if...else?",
    options: [
      "Logical operator",
      "Ternary operator",
      "Assignment operator",
      "Bitwise operator",
    ],
    answer: "Ternary operator",
  },

  {
    question: "Which function does not have its own this binding?",
    options: [
      "Function Declaration",
      "Function Expression",
      "Arrow Function",
      "Constructor Function",
    ],
    answer: "Arrow Function",
  },
];


const JS_Essential_Mock_Tests_MCQ_1 = ({
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
      title="JS Essential Mock Test | Part 1 - MCQs"
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
export default JS_Essential_Mock_Tests_MCQ_1;
