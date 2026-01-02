import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========= 5 Normal Questions =========
  {
    question: "In JavaScript, values are divided into which two categories?",
    options: [
      "Static and Dynamic",
      "Primitive Types and Reference Types",
      "Simple and Complex",
      "Variables and Functions",
    ],
    answer: "Primitive Types and Reference Types",
  },
  {
    question: "Which of the following is a primitive type in JavaScript?",
    options: ["Array", "Object", "String", "Function"],
    answer: "String",
  },
  {
    question: "Which primitive type represents true or false values?",
    options: ["Number", "String", "Boolean", "Undefined"],
    answer: "Boolean",
  },
  {
    question:
      "What happens when a variable is declared but not assigned a value?",
    options: [
      "It becomes null",
      "It throws an error",
      "It takes undefined as its value",
      "It becomes 0",
    ],
    answer: "It takes undefined as its value",
  },
  {
    question: "Why are conditional statements used in JavaScript?",
    options: [
      "To declare variables",
      "To convert data types",
      "To execute code based on a condition",
      "To style HTML elements",
    ],
    answer: "To execute code based on a condition",
  },

  // ========= 10 CodeBlock Questions =========
  {
    question: (
      <div>
        <p>What is the output of the following code?</p>
        <CodeBlock
          language="javascript"
          code={`let a = 10;\nconsole.log(typeof a);`}
        />
      </div>
    ),
    options: ["'integer'", "'number'", "'string'", "'object'"],
    answer: "'number'",
  },
  {
    question: (
      <div>
        <p>What is the result of the following code?</p>
        <CodeBlock
          language="javascript"
          code={`let value;\nconsole.log(typeof value);`}
        />
      </div>
    ),
    options: ["'null'", "'undefined'", "'object'", "'string'"],
    answer: "'undefined'",
  },
  {
    question: (
      <div>
        <p>What will be printed in the console?</p>
        <CodeBlock
          language="javascript"
          code={`let isHappy = true;\nconsole.log(typeof isHappy);`}
        />
      </div>
    ),
    options: ["'boolean'", "'string'", "'object'", "'undefined'"],
    answer: "'boolean'",
  },
  {
    question: (
      <div>
        <p>What is the output of this code?</p>
        <CodeBlock
          language="javascript"
          code={`let name = "Rahul";\nconsole.log(typeof name);`}
        />
      </div>
    ),
    options: ["'object'", "'string'", "'number'", "'symbol'"],
    answer: "'string'",
  },
  {
    question: (
      <div>
        <p>What will this code log?</p>
        <CodeBlock
          language="javascript"
          code={`let value = null;\nconsole.log(typeof value);`}
        />
      </div>
    ),
    options: ["'null'", "'undefined'", "'object'", "'boolean'"],
    answer: "'object'",
  },
  {
    question: (
      <div>
        <p>What does this code output?</p>
        <CodeBlock
          language="javascript"
          code={`let x = "5" + 2;\nconsole.log(x);`}
        />
      </div>
    ),
    options: ["7", "'7'", "'52'", "Error"],
    answer: "'52'",
  },
  {
    question: (
      <div>
        <p>What is the output after using parseInt?</p>
        <CodeBlock
          language="javascript"
          code={`let num = parseInt("25");\nconsole.log(num);`}
        />
      </div>
    ),
    options: ["'25'", "25", "NaN", "undefined"],
    answer: "25",
  },
  {
    question: (
      <div>
        <p>What is the output of this conditional statement?</p>
        <CodeBlock
          language="javascript"
          code={`let x = 5;\nif (x === "5") {\n  console.log("Equal");\n} else {\n  console.log("Not Equal");\n}`}
        />
      </div>
    ),
    options: ["Equal", "Not Equal", "Error", "undefined"],
    answer: "Not Equal",
  },
  {
    question: (
      <div>
        <p>What will be printed in the console?</p>
        <CodeBlock
          language="javascript"
          code={`let y = "10";\nif (y == 10) {\n  console.log("Matched");\n} else {\n  console.log("Not Matched");\n}`}
        />
      </div>
    ),
    options: ["Matched", "Not Matched", "Error", "undefined"],
    answer: "Matched",
  },
  {
    question: (
      <div>
        <p>Which operator is used below?</p>
        <CodeBlock
          language="javascript"
          code={`console.log(typeof "Hello");`}
        />
      </div>
    ),
    options: ["parseInt()", "typeof()", "Number()", "String()"],
    answer: "typeof()",
  },
];

const PrimitiveTypes_Conditionals_MCQ = ({
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
      title="Primitive Types Conditionals - MCQs"
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

export default PrimitiveTypes_Conditionals_MCQ;
