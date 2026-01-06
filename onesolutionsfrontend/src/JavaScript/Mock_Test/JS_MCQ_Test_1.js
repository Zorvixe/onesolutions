import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ================= NORMAL QUESTIONS (5) =================

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

  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["int", "string", "let", "define"],
    answer: "let",
  },

  {
    question: "What is the primary purpose of a Todos Application?",
    options: [
      "To store contact details",
      "To manage and track tasks to be completed",
      "To record video data",
      "To display weather information",
    ],
    answer: "To manage and track tasks to be completed",
  },

  {
    question: "Which method prevents a form from refreshing the page?",
    options: [
      "stopPropagation()",
      "preventDefault()",
      "return true",
      "alert()",
    ],
    answer: "preventDefault()",
  },

  {
    question: "Which property is used to read user input from an input field?",
    options: [".data", ".text", ".value", ".content"],
    answer: ".value",
  },

  // ================= CODEBLOCK QUESTIONS (10) =================

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
    options: ["Hello", "JavaScript", "Hello JavaScript", "Nothing"],
    answer: "Hello JavaScript",
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
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

  {
    question: (
      <div>
        <p>Which HTML element is used to take input for a new todo?</p>
        <CodeBlock language="html" code={`<input type="text" />`} />
      </div>
    ),
    options: ["<button>", "<input>", "<label>", "<div>"],
    answer: "<input>",
  },

  {
    question: (
      <div>
        <p>Which method adds a new todo to the array?</p>
        <CodeBlock
          language="javascript"
          code={`todos.push(newTodo);`}
        />
      </div>
    ),
    options: ["push()", "pop()", "splice()", "includes()"],
    answer: "push()",
  },

  {
    question: (
      <div>
        <p>What will be logged in the console?</p>
        <CodeBlock
          language="javascript"
          code={`let todos = ["Buy milk", "Study JS"];
todos.pop();
console.log(todos);`}
        />
      </div>
    ),
    options: [
      `["Buy milk", "Study JS"]`,
      `["Study JS"]`,
      `["Buy milk"]`,
      `[]`,
    ],
    answer: `["Buy milk"]`,
  },

  {
    question: (
      <div>
        <p>Which method removes one todo using index?</p>
        <CodeBlock
          language="javascript"
          code={`todos.splice(index, 1);`}
        />
      </div>
    ),
    options: ["push()", "pop()", "splice()", "includes()"],
    answer: "splice()",
  },

  {
    question: (
      <div>
        <p>Which method checks if a todo exists?</p>
        <CodeBlock
          language="javascript"
          code={`todos.includes("Task");`}
        />
      </div>
    ),
    options: ["find()", "search()", "includes()", "check()"],
    answer: "includes()",
  },

  {
    question: (
      <div>
        <p>Which event method stops page refresh on form submit?</p>
        <CodeBlock
          language="javascript"
          code={`event.preventDefault();`}
        />
      </div>
    ),
    options: [
      "stopPropagation()",
      "preventDefault()",
      "return false",
      "alert()",
    ],
    answer: "preventDefault()",
  },

  {
    question: (
      <div>
        <p>What will be the output?</p>
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
];

const JS_MCQ_Test_1 = ({
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
      title="JS Mock Test | Part 1 - MCQs"
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

export default JS_MCQ_Test_1;
