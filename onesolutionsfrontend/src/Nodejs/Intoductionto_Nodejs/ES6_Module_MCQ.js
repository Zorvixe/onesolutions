import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: <p>Which keyword is used for default export in ES6?</p>,
    options: ["export default", "module.exports", "exports", "default export"],
    answer: "export default",
  },
  {
    question: <p>How many default exports are allowed per ES6 module?</p>,
    options: ["One", "Two", "Unlimited", "Five"],
    answer: "One",
  },
  {
    question: <p>Named exports are imported using ______.</p>,
    options: ["{}", "()", "[]", "<>"],
    answer: "{}",
  },
  {
    question: <p>Which extension is commonly used for ES modules in Node?</p>,
    options: [".js", ".mjs", ".node", ".es"],
    answer: ".mjs",
  },
  {
    question: <p>Default exports can be imported with ______.</p>,
    options: [
      "Any name",
      "Same exported name only",
      "Curly braces",
      "require()",
    ],
    answer: "Any name",
  },

  // ✅ CODE BASED MCQs (10)

  {
    question: (
      <div>
        <p>What happens here?</p>
        <CodeBlock
          language="javascript"
          code={`export default let value = 5;`}
        />
      </div>
    ),
    options: ["SyntaxError", "5", "undefined", "null"],
    answer: "SyntaxError",
  },

  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="javascript"
          code={`let a = 5;
export default a;`}
        />
      </div>
    ),
    options: ["5", "Error", "undefined", "a"],
    answer: "5",
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock language="javascript" code={`export default 5 * 3;`} />
      </div>
    ),
    options: ["15", "5", "3", "Error"],
    answer: "15",
  },

  {
    question: (
      <div>
        <p>What is exported here?</p>
        <CodeBlock
          language="javascript"
          code={`export default function (a, b) {
  return a + b;
}`}
        />
      </div>
    ),
    options: ["A function", "A number", "An object", "Nothing"],
    answer: "A function",
  },

  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="javascript"
          code={`function sum(a, b) {
  return a + b;
}
export default sum;`}
        />
      </div>
    ),
    options: ["Function exported", "Error", "undefined", "0"],
    answer: "Function exported",
  },

  {
    question: (
      <div>
        <p>What is exported?</p>
        <CodeBlock
          language="javascript"
          code={`export default class Student {
  constructor(name) {
    this.name = name;
  }
}`}
        />
      </div>
    ),
    options: ["A class", "An object", "A function", "A string"],
    answer: "A class",
  },

  {
    question: (
      <div>
        <p>Identify the type of export:</p>
        <CodeBlock
          language="javascript"
          code={`export let value = 5;
export let name = "Rahul";`}
        />
      </div>
    ),
    options: [
      "Named export",
      "Default export",
      "CommonJS export",
      "Invalid export",
    ],
    answer: "Named export",
  },

  {
    question: (
      <div>
        <p>How do you import these?</p>
        <CodeBlock
          language="javascript"
          code={`export function sum(a, b) {
  return a + b;
}`}
        />
      </div>
    ),
    options: [
      `import { sum } from "./sample.mjs"`,
      `import sum from "./sample.mjs"`,
      `require("./sample.mjs")`,
      `import * as sum from "./sample.mjs"`,
    ],
    answer: `import { sum } from "./sample.mjs"`,
  },

  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="javascript"
          code={`export { value, studentName };`}
        />
      </div>
    ),
    options: ["Named export", "Default export", "Error", "Nothing"],
    answer: "Named export",
  },

  {
    question: (
      <div>
        <p>What is wrong in this import?</p>
        <CodeBlock
          language="javascript"
          code={`import { studentdetails } from "./sample.mjs";`}
        />
      </div>
    ),
    options: [
      "Case mismatch",
      "import keyword is wrong",
      "Curly braces not allowed",
      "Nothing is wrong",
    ],
    answer: "Case mismatch",
  },
];

const ES6_Module_MCQ = ({ subtopicId, goalName, courseName, onComplete }) => {
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

export default ES6_Module_MCQ;
