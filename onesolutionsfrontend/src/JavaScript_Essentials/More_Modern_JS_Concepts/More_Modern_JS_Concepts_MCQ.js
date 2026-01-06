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
    options: ["[1, 2, 3]", "[[1, 2, 3]]", "1 2 3", "Error"],
    answer: "[1, 2, 3]",
  },

  {
    question: (
      <div>
        <p>Which concept is demonstrated here?</p>
        <CodeBlock
          language="javascript"
          code={`const a = [1, 2];
  const b = [3, 4];
  const result = [...a, ...b];`}
        />
      </div>
    ),
    options: [
      "Array copying",
      "Array concatenation using spread",
      "Rest parameter",
      "Default parameters",
    ],
    answer: "Array concatenation using spread",
  },

  {
    question: (
      <div>
        <p>What will this code output?</p>
        <CodeBlock
          language="javascript"
          code={`const obj = { x: 1, y: 2 };
  const copy = { ...obj };
  console.log(copy);`}
        />
      </div>
    ),
    options: ["{ x: 1, y: 2 }", "{ obj }", "undefined", "Error"],
    answer: "{ x: 1, y: 2 }",
  },

  {
    question: (
      <div>
        <p>What happens in the following object spread example?</p>
        <CodeBlock
          language="javascript"
          code={`const obj1 = { a: 1 };
  const obj2 = { b: 2 };
  const result = { ...obj1, ...obj2 };`}
        />
      </div>
    ),
    options: [
      "Objects are merged",
      "Objects are nested",
      "Only obj1 is copied",
      "Error occurs",
    ],
    answer: "Objects are merged",
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
  const nums = [1, 2, 3];
  console.log(sum(...nums));`}
        />
      </div>
    ),
    options: ["6", "123", "NaN", "Error"],
    answer: "6",
  },

  {
    question: (
      <div>
        <p>What is the output of this code?</p>
        <CodeBlock
          language="javascript"
          code={`function show(...values) {
    console.log(values);
  }
  show(1, 2, 3);`}
        />
      </div>
    ),
    options: ["1, 2, 3", "[1, 2, 3]", "{1, 2, 3}", "Error"],
    answer: "[1, 2, 3]",
  },

  {
    question: (
      <div>
        <p>Which array will be logged?</p>
        <CodeBlock
          language="javascript"
          code={`const nums = [10, 20, 30];
  const [first, ...rest] = nums;
  console.log(rest);`}
        />
      </div>
    ),
    options: ["[10]", "[20, 30]", "[10, 20]", "[]"],
    answer: "[20, 30]",
  },

  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="javascript"
          code={`function greet(name = "Guest") {
    console.log(name);
  }
  greet();`}
        />
      </div>
    ),
    options: ["undefined", "null", "Guest", "Error"],
    answer: "Guest",
  },

  {
    question: (
      <div>
        <p>What is printed to the console?</p>
        <CodeBlock
          language="javascript"
          code={`const name = "onesolutions";
  console.log(\`Hello \${name}\`);`}
        />
      </div>
    ),
    options: ["Hello name", "Hello ${name}", "Hello onesolutions", "Error"],
    answer: "Hello onesolutions",
  },

  {
    question: (
      <div>
        <p>What feature is used here?</p>
        <CodeBlock
          language="javascript"
          code={`const msg = \`Line 1
  Line 2\`;`}
        />
      </div>
    ),
    options: [
      "String concatenation",
      "Template literals multiline string",
      "Default parameters",
      "Rest parameter",
    ],
    answer: "Template literals multiline string",
  },

  // ===================== NORMAL QUESTIONS (5) =====================

  {
    question: "What is the main purpose of the spread operator?",
    options: [
      "To loop through arrays",
      "To unpack iterable values",
      "To declare variables",
      "To compare values",
    ],
    answer: "To unpack iterable values",
  },

  {
    question: "Which syntax is used for the rest parameter?",
    options: ["...", "***", "??", "::"],
    answer: "...",
  },

  {
    question: "Where should the rest parameter be placed in a function?",
    options: ["At the beginning", "In the middle", "At the end", "Anywhere"],
    answer: "At the end",
  },

  {
    question: "What are template literals enclosed with?",
    options: ["Single quotes", "Double quotes", "Backticks (`)", "Parentheses"],
    answer: "Backticks (`)",
  },

  {
    question: "What is the purpose of default parameters?",
    options: [
      "To stop function execution",
      "To provide initial values to parameters",
      "To loop function arguments",
      "To return multiple values",
    ],
    answer: "To provide initial values to parameters",
  },
];

const More_Modern_Js_Concepts_MCQ = ({
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
      title="More Modern JS Concepts - MCQs"
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
export default More_Modern_Js_Concepts_MCQ;
