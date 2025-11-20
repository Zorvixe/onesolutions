import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // 1
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
  // 2
  {
    question: (
      <div>
        <p>
          Which HTML element is typically used to take input for a new todo
          item?
        </p>
        <CodeBlock
          language="html"
          code={`<input type="text" id="todoInput" />`}
        />
      </div>
    ),
    options: ["<button>", "<input>", "<textarea>", "<label>"],
    answer: "<input>",
  },
  // 3
  {
    question: (
      <div>
        <p>
          Which JavaScript method is commonly used to add a new todo to an
          array?
        </p>
        <CodeBlock language="javascript" code={`todos.push(newTodo);`} />
      </div>
    ),
    options: ["push()", "pop()", "shift()", "splice()"],
    answer: "push()",
  },
  // 4
  {
    question: (
      <div>
        <p>What will be the output of the following code?</p>
        <CodeBlock
          language="javascript"
          code={`let todos = ["Buy milk", "Study JS"];\ntodos.pop();\nconsole.log(todos);`}
        />
      </div>
    ),
    options: [`["Buy milk", "Study JS"]`, `["Study JS"]`, `["Buy milk"]`, `[]`],
    answer: `["Buy milk"]`,
  },
  // 5
  {
    question: (
      <div>
        <p>
          What event should be used to detect when the user clicks the "Add
          Todo" button?
        </p>
      </div>
    ),
    options: ["keypress", "submit", "click", "change"],
    answer: "click",
  },
  // 6
  {
    question: (
      <div>
        <p>What will be displayed in the console?</p>
        <CodeBlock
          language="javascript"
          code={`let todos = ["Task1", "Task2", "Task3"];\ntodos.splice(1, 1);\nconsole.log(todos);`}
        />
      </div>
    ),
    options: [
      `["Task1", "Task2", "Task3"]`,
      `["Task1", "Task3"]`,
      `["Task2", "Task3"]`,
      `["Task1", "Task2"]`,
    ],
    answer: `["Task1", "Task3"]`,
  },
  // 7
  {
    question: (
      <div>
        <p>
          Which of the following methods is used to update the UI dynamically
          when a new todo is added?
        </p>
      </div>
    ),
    options: ["document.write()", "innerHTML", "alert()", "prompt()"],
    answer: "innerHTML",
  },
  // 8
  {
    question: (
      <div>
        <p>What will this code log in the console?</p>
        <CodeBlock
          language="javascript"
          code={`let todos = ["Eat", "Code", "Sleep"];\nlet result = todos.includes("Code");\nconsole.log(result);`}
        />
      </div>
    ),
    options: ["true", "false", "undefined", "Error"],
    answer: "true",
  },
  // 9
  {
    question: (
      <div>
        <p>
          Which event method is used to prevent a form from refreshing the page
          when a todo is submitted?
        </p>
        <CodeBlock language="javascript" code={`event.preventDefault();`} />
      </div>
    ),
    options: [
      "stopPropagation()",
      "preventDefault()",
      "stopImmediatePropagation()",
      "return false",
    ],
    answer: "preventDefault()",
  },
  // 10
  {
    question: (
      <div>
        <p>
          Which JavaScript property is used to access the value entered by the
          user in an input field?
        </p>
        <CodeBlock
          language="javascript"
          code={`let inputValue = document.getElementById("todoInput").value;`}
        />
      </div>
    ),
    options: [".data", ".content", ".value", ".text"],
    answer: ".value",
  },
];

const JS_MCQ_Assignment_2 = ({
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
  return <MCQLogic title="JS Assignment 2 - MCQs"questions={randomQuestions}
  isCompleted={isCompleted}
  isLoading={isLoading}
  onComplete={handleCompletion}
  subtopicId={subtopicId}
  goalName={goalName}
  courseName={courseName} />;
};

export default JS_MCQ_Assignment_2;
