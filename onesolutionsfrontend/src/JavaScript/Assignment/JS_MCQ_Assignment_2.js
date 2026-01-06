import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ---------- NORMAL QUESTIONS (5) ----------

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
    question: "Which event is used when the user clicks the Add Todo button?",
    options: ["keypress", "submit", "click", "change"],
    answer: "click",
  },
  {
    question:
      "Which method is used to update content dynamically on a webpage?",
    options: ["document.write()", "innerHTML", "alert()", "prompt()"],
    answer: "innerHTML",
  },
  {
    question: "Which method prevents a form from refreshing the page?",
    options: [
      "stopPropagation()",
      "preventDefault()",
      "stopImmediatePropagation()",
      "return true",
    ],
    answer: "preventDefault()",
  },
  {
    question: "Which property is used to read user input from an input field?",
    options: [".data", ".content", ".value", ".text"],
    answer: ".value",
  },

  // ---------- CODEBLOCK QUESTIONS (10) ----------

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
        <CodeBlock language="javascript" code={`todos.push(newTodo);`} />
      </div>
    ),
    options: ["push()", "pop()", "shift()", "splice()"],
    answer: "push()",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="javascript"
          code={`let todos = ["Buy milk", "Study JS"];
todos.pop();
console.log(todos);`}
        />
      </div>
    ),
    options: [`["Buy milk", "Study JS"]`, `["Study JS"]`, `["Buy milk"]`, `[]`],
    answer: `["Buy milk"]`,
  },
  {
    question: (
      <div>
        <p>What does this code do?</p>
        <CodeBlock
          language="javascript"
          code={`let todos = ["Task1", "Task2", "Task3"];
todos.splice(1, 1);`}
        />
      </div>
    ),
    options: [
      "Adds a task",
      "Removes one task from index 1",
      "Clears all tasks",
      "Duplicates tasks",
    ],
    answer: "Removes one task from index 1",
  },
  {
    question: (
      <div>
        <p>What will be logged in the console?</p>
        <CodeBlock
          language="javascript"
          code={`let todos = ["Eat", "Code", "Sleep"];
console.log(todos.includes("Code"));`}
        />
      </div>
    ),
    options: ["true", "false", "undefined", "Error"],
    answer: "true",
  },
  {
    question: (
      <div>
        <p>Which event method stops form refresh?</p>
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
  {
    question: (
      <div>
        <p>Which property reads the input value?</p>
        <CodeBlock
          language="javascript"
          code={`document.getElementById("todoInput").value`}
        />
      </div>
    ),
    options: [".text", ".content", ".value", ".data"],
    answer: ".value",
  },
  {
    question: (
      <div>
        <p>Which method removes the last todo?</p>
        <CodeBlock language="javascript" code={`todos.pop();`} />
      </div>
    ),
    options: ["push()", "pop()", "splice()", "includes()"],
    answer: "pop()",
  },
  {
    question: (
      <div>
        <p>Which method checks if a todo exists?</p>
        <CodeBlock language="javascript" code={`todos.includes("Task");`} />
      </div>
    ),
    options: ["find()", "check()", "includes()", "search()"],
    answer: "includes()",
  },
  {
    question: (
      <div>
        <p>Which method removes a todo using index?</p>
        <CodeBlock language="javascript" code={`todos.splice(index, 1);`} />
      </div>
    ),
    options: ["pop()", "push()", "splice()", "includes()"],
    answer: "splice()",
  },
];

const JS_MCQ_Assignment_2 = ({
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
      title="JS Assignment 2 - MCQs"
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

export default JS_MCQ_Assignment_2;
