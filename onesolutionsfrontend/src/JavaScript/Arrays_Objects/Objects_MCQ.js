import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What will this code log in the console?</p>
        <CodeBlock
          language="javascript"
          code={`const book = {
  title: "Atomic Habits",
  author: "James Clear"
};
console.log(book.title);`}
        />
      </div>
    ),
    options: ["Atomic Habits", "James Clear", "undefined", "Error"],
    answer: "Atomic Habits",
  },
  {
    question: (
      <div>
        <p>What is the output of this code?</p>
        <CodeBlock
          language="javascript"
          code={`const mobile = {
  brand: "Samsung",
  model: "S24"
};
console.log(mobile["brand"]);`}
        />
      </div>
    ),
    options: ["Samsung", "S24", "undefined", "Error"],
    answer: "Samsung",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="javascript"
          code={`const employee = { name: "Anu" };
console.log(employee.salary);`}
        />
      </div>
    ),
    options: ["Error", "undefined", "null", "0"],
    answer: "undefined",
  },
  {
    question: (
      <div>
        <p>What does this code print?</p>
        <CodeBlock
          language="javascript"
          code={`const key = "country";
const info = { name: "Ravi", country: "India" };
console.log(info[key]);`}
        />
      </div>
    ),
    options: ["country", "India", "undefined", "Error"],
    answer: "India",
  },
  {
    question: (
      <div>
        <p>What will this code display?</p>
        <CodeBlock
          language="javascript"
          code={`const profile = { name: "Sai", age: 22 };
profile.age = 26;
console.log(profile.age);`}
        />
      </div>
    ),
    options: ["22", "26", "undefined", "Error"],
    answer: "26",
  },
  {
    question: (
      <div>
        <p>What will the console log?</p>
        <CodeBlock
          language="javascript"
          code={`const item = {};
item.name = "Pen";
item["price"] = 10;
console.log(item);`}
        />
      </div>
    ),
    options: [`{ name: "Pen", price: 10 }`, `{}`, `{ name: "Pen" }`, "Error"],
    answer: `{ name: "Pen", price: 10 }`,
  },
  {
    question: (
      <div>
        <p>What will this print?</p>
        <CodeBlock
          language="javascript"
          code={`const computer = {
  brand: "Dell",
  specs: { cpu: "i5", ram: "16GB" }
};
console.log(computer.specs.cpu);`}
        />
      </div>
    ),
    options: ["Dell", "i5", "16GB", "undefined"],
    answer: "i5",
  },
  {
    question:
      "Which notation is required to access a property with spaces in its name?",
    options: ["Dot Notation", "Bracket Notation", "Both", "Neither"],
    answer: "Bracket Notation",
  },
  {
    question:
      "When a property value in an object is a function, what is it called?",
    options: ["Object Method", "Function Property", "Action", "Callable Value"],
    answer: "Object Method",
  },
  {
    question:
      "Which syntax feature is used to extract multiple properties from an object?",
    options: ["Destructuring", "Extracting", "Splitting", "Mapping"],
    answer: "Destructuring",
  },
];

const Objects_MCQ = ({
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
  return <MCQLogic title="Objects - MCQs" questions={randomQuestions}
  isCompleted={isCompleted}
  isLoading={isLoading}
  onComplete={handleCompletion}
  subtopicId={subtopicId}
  goalName={goalName}
  courseName={courseName} />;
};
export default Objects_MCQ;
