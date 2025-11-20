import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
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
    options: ["'undefined'", "'null'", "'object'", "'string'"],
    answer: "'undefined'",
  },
  {
    question: (
      <div>
        <p>What will this code print?</p>
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
        <p>What is the output of the following code?</p>
        <CodeBlock
          language="javascript"
          code={`let name = "Rahul";\nconsole.log(typeof name);`}
        />
      </div>
    ),
    options: ["'object'", "'string'", "'symbol'", "'number'"],
    answer: "'string'",
  },
  {
    question: (
      <div>
        <p>What will this code log in the console?</p>
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
        <p>What is the result of this code snippet?</p>
        <CodeBlock
          language="javascript"
          code={`let y = "10";\nif (y == 10) {\n  console.log("Loose Equality");\n} else {\n  console.log("No Match");\n}`}
        />
      </div>
    ),
    options: ["Loose Equality", "No Match", "Error", "undefined"],
    answer: "Loose Equality",
  },
  {
    question: "Which of the following is a primitive data type in JavaScript?",
    options: ["Object", "Array", "String", "Function"],
    answer: "String",
  },
  {
    question: "What does parseInt('25') return in JavaScript?",
    options: ["'25'", "25", "NaN", "undefined"],
    answer: "25",
  },
  {
    question:
      "In an if...else statement, what happens when the condition evaluates to false?",
    options: [
      "Only the if block executes",
      "The else block executes",
      "The program stops execution",
      "It throws an error",
    ],
    answer: "The else block executes",
  },
];

const PrimitiveTypes_Conditionals_MCQ = ({
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
