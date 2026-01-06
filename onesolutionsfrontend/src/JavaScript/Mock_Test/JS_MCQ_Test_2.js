import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ================= NORMAL QUESTIONS (5) =================

  {
    question: "Why is map() commonly used while rendering todos in React?",
    options: [
      "To permanently update todos",
      "To loop and return JSX elements",
      "To remove todos",
      "To sort todos",
    ],
    answer: "To loop and return JSX elements",
  },

  {
    question: "Which event is used to detect Enter key press while adding a todo?",
    options: ["onClick", "onChange", "onKeyDown", "onFocus"],
    answer: "onKeyDown",
  },

  {
    question: "What is the main purpose of the fetch() method in JavaScript?",
    options: [
      "To execute SQL queries",
      "To fetch resources or data from a server",
      "To modify HTML elements dynamically",
      "To create callback functions",
    ],
    answer: "To fetch resources or data from a server",
  },

  {
    question: "What is a callback function?",
    options: [
      "A function executed immediately",
      "A function passed as an argument to another function",
      "A function that never returns data",
      "A function used only in loops",
    ],
    answer: "A function passed as an argument to another function",
  },

  {
    question: "What is the main advantage of saving todos in localStorage?",
    options: [
      "Todos are deleted on refresh",
      "Todos persist after page reload",
      "Todos sync across devices",
      "Todos auto update UI",
    ],
    answer: "Todos persist after page reload",
  },

  // ================= CODEBLOCK QUESTIONS (10) =================

  {
    question: (
      <div>
        <p>What does the following code achieve?</p>
        <CodeBlock
          language="javascript"
          code={`todos.map(todo => <li key={todo.id}>{todo.title}</li>);`}
        />
      </div>
    ),
    options: [
      "Deletes todos",
      "Returns JSX list items",
      "Updates todos",
      "Filters todos",
    ],
    answer: "Returns JSX list items",
  },

  {
    question: (
      <div>
        <p>What is the purpose of this code?</p>
        <CodeBlock
          language="javascript"
          code={`setTodos(prev =>
  prev.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  )
);`}
        />
      </div>
    ),
    options: [
      "Deletes a todo",
      "Toggles todo completion",
      "Adds a todo",
      "Clears all todos",
    ],
    answer: "Toggles todo completion",
  },

  {
    question: (
      <div>
        <p>What does this filter logic do?</p>
        <CodeBlock
          language="javascript"
          code={`todos.filter(todo => todo.id !== id);`}
        />
      </div>
    ),
    options: [
      "Edits a todo",
      "Deletes a specific todo",
      "Marks todo completed",
      "Sorts todos",
    ],
    answer: "Deletes a specific todo",
  },

  {
    question: (
      <div>
        <p>Which method converts fetch response to JSON?</p>
        <CodeBlock
          language="javascript"
          code={`fetch(url).then(response => response.json());`}
        />
      </div>
    ),
    options: [
      "response.text()",
      "response.json()",
      "JSON.parse()",
      "data.json()",
    ],
    answer: "response.json()",
  },

  {
    question: (
      <div>
        <p>Which method is used to handle errors in fetch?</p>
        <CodeBlock
          language="javascript"
          code={`fetch(url)
  .then(res => res.json())
  .catch(error => console.log(error));`}
        />
      </div>
    ),
    options: ["then()", "error()", "catch()", "finally()"],
    answer: "catch()",
  },

  {
    question: (
      <div>
        <p>What does the method property specify in fetch?</p>
        <CodeBlock
          language="javascript"
          code={`fetch(url, { method: "POST" });`}
        />
      </div>
    ),
    options: [
      "Response format",
      "HTTP request type",
      "Server address",
      "Authorization token",
    ],
    answer: "HTTP request type",
  },

  {
    question: (
      <div>
        <p>What makes this input a controlled component?</p>
        <CodeBlock
          language="javascript"
          code={`<input value={text} onChange={e => setText(e.target.value)} />`}
        />
      </div>
    ),
    options: [
      "Using placeholder",
      "Using ref",
      "Using value and onChange",
      "Using defaultValue",
    ],
    answer: "Using value and onChange",
  },

  {
    question: (
      <div>
        <p>When does this effect run?</p>
        <CodeBlock
          language="javascript"
          code={`useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, []);`}
        />
      </div>
    ),
    options: [
      "On every render",
      "Only once on mount",
      "On todo update",
      "On unmount",
    ],
    answer: "Only once on mount",
  },

  {
    question: (
      <div>
        <p>Which event is triggered on form submission?</p>
        <CodeBlock
          language="javascript"
          code={`form.addEventListener("submit", handleSubmit);`}
        />
      </div>
    ),
    options: ["click", "change", "submit", "blur"],
    answer: "submit",
  },

  {
    question: (
      <div>
        <p>Which example shows a callback function?</p>
        <CodeBlock
          language="javascript"
          code={`setTimeout(() => {
  console.log("Hello");
}, 1000);`}
        />
      </div>
    ),
    options: [
      "console.log()",
      "Arrow function passed to setTimeout",
      "Variable declaration",
      "Fetch method",
    ],
    answer: "Arrow function passed to setTimeout",
  },
];

const JS_MCQ_Test_2 =  ({
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
      title="JS Mock Test | Part 2 - MCQs"
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

export default JS_MCQ_Test_2;
