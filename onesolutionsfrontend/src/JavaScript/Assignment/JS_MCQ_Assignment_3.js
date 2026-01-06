import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ---------- NORMAL QUESTIONS (5) ----------

  {
    question: (
      <div>
        <p>
          1. Why is <b>map()</b> commonly used while rendering todos in React?
        </p>
      </div>
    ),
    options: [
      "To permanently update todos",
      "To loop and return JSX elements",
      "To remove todos",
      "To sort todos",
    ],
    answer: "To loop and return JSX elements",
  },
  {
    question: (
      <div>
        <p>
          2. Which event is used to detect Enter key press while adding a todo?
        </p>
      </div>
    ),
    options: ["onClick", "onChange", "onKeyDown", "onFocus"],
    answer: "onKeyDown",
  },
  {
    question: (
      <div>
        <p>3. Which property helps uniquely identify each todo item?</p>
      </div>
    ),
    options: ["index", "title", "id", "name"],
    answer: "id",
  },
  {
    question: (
      <div>
        <p>4. Why are controlled components preferred in React forms?</p>
      </div>
    ),
    options: [
      "They directly modify DOM",
      "They allow React to control input state",
      "They improve CSS styling",
      "They prevent rerenders",
    ],
    answer: "They allow React to control input state",
  },
  {
    question: (
      <div>
        <p>5. What is the main advantage of saving todos in localStorage?</p>
      </div>
    ),
    options: [
      "Todos are deleted on refresh",
      "Todos persist after page reload",
      "Todos sync across devices",
      "Todos auto update UI",
    ],
    answer: "Todos persist after page reload",
  },

  // ---------- CODEBLOCK QUESTIONS (10) ----------

  {
    question: (
      <div>
        <p>6. What does the following code achieve?</p>
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
        <p>7. What is the purpose of this code?</p>
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
        <p>8. What does this filter logic do?</p>
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
        <p>
          9. Why is the <b>key</b> prop important here?
        </p>
        <CodeBlock
          language="javascript"
          code={`<li key={todo.id}>{todo.title}</li>`}
        />
      </div>
    ),
    options: [
      "For styling",
      "For unique identification during rendering",
      "For event handling",
      "For state update",
    ],
    answer: "For unique identification during rendering",
  },
  {
    question: (
      <div>
        <p>10. What makes this input a controlled component?</p>
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
        <p>11. What does this conditional className do?</p>
        <CodeBlock
          language="javascript"
          code={`<li className={todo.completed ? "done" : ""}>{todo.title}</li>`}
        />
      </div>
    ),
    options: [
      "Deletes completed todos",
      "Applies style conditionally",
      "Filters todos",
      "Updates title",
    ],
    answer: "Applies style conditionally",
  },
  {
    question: (
      <div>
        <p>12. When does this effect run?</p>
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
        <p>
          13. Why is <b>filter()</b> preferred for deleting todos?
        </p>
        <CodeBlock
          language="javascript"
          code={`setTodos(todos.filter(todo => !todo.completed));`}
        />
      </div>
    ),
    options: [
      "It mutates state",
      "It returns a new array",
      "It refreshes UI",
      "It sorts todos",
    ],
    answer: "It returns a new array",
  },
  {
    question: (
      <div>
        <p>14. Which event is suitable for Enter key handling?</p>
        <CodeBlock language="javascript" code={`onKeyDown={handleKey}`} />
      </div>
    ),
    options: ["onClick", "onKeyDown", "onChange", "onBlur"],
    answer: "onKeyDown",
  },
  {
    question: (
      <div>
        <p>15. Why is localStorage useful in Todos App?</p>
        <CodeBlock
          language="javascript"
          code={`localStorage.getItem("todos");`}
        />
      </div>
    ),
    options: [
      "For styling",
      "For permanent storage across reloads",
      "For routing",
      "For animations",
    ],
    answer: "For permanent storage across reloads",
  },
];

const JS_MCQ_Assignment_3 = ({
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
      title="JS Assignment 3 - MCQs"
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

export default JS_MCQ_Assignment_3;
