import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>
          Which method is used to remove a specific key-value pair from Local
          Storage?
        </p>
      </div>
    ),
    options: [
      "localStorage.clear()",
      "localStorage.removeItem()",
      "localStorage.delete()",
      "localStorage.reset()",
    ],
    answer: "localStorage.removeItem()",
  },
  {
    question: (
      <div>
        <p>What argument does the removeItem() method require?</p>
      </div>
    ),
    options: ["Value", "Key", "Index", "Object"],
    answer: "Key",
  },
  {
    question: (
      <div>
        <p>
          What will happen if we pass a key that doesn’t exist in localStorage
          to removeItem()?
        </p>
      </div>
    ),
    options: [
      "It will throw an error",
      "It will create an empty key",
      "It will simply do nothing",
      "It will clear all data",
    ],
    answer: "It will simply do nothing",
  },
  {
    question: (
      <div>
        <p>Which of the following is true about Local Storage?</p>
      </div>
    ),
    options: [
      "Data persists even after closing the browser",
      "Data is deleted when the tab is closed",
      "Data is stored temporarily in RAM",
      "It stores data only for a single session",
    ],
    answer: "Data persists even after closing the browser",
  },
  {
    question: (
      <div>
        <p>
          What type of argument must be passed to
          <b> localStorage.removeItem() </b>?
        </p>
      </div>
    ),
    options: ["Number", "Boolean", "String", "Array"],
    answer: "String",
  },
  {
    question: (
      <div>
        <p>
          Which statement is correct regarding
          <b> removeItem() </b>?
        </p>
      </div>
    ),
    options: [
      "It removes all items from Local Storage",
      "It removes only the specified key-value pair",
      "It clears session storage",
      "It returns the removed value",
    ],
    answer: "It removes only the specified key-value pair",
  },
  {
    question: (
      <div>
        <p>
          What will be the value returned by
          <b> localStorage.removeItem() </b>?
        </p>
      </div>
    ),
    options: ["true", "false", "null", "undefined"],
    answer: "undefined",
  },
  {
    question: (
      <div>
        <p>
          In a Todos application, when should
          <b> removeItem() </b> be used?
        </p>
      </div>
    ),
    options: [
      "When adding a new todo",
      "When fetching todos",
      "When deleting a todo permanently",
      "When marking a todo as active",
    ],
    answer: "When deleting a todo permanently",
  },
  {
    question: (
      <div>
        <p>
          What happens to other Local Storage data when
          <b> removeItem("todo") </b> is executed?
        </p>
      </div>
    ),
    options: [
      "All data is cleared",
      "Only the specified key is removed",
      "Browser storage is reset",
      "Session storage is cleared",
    ],
    answer: "Only the specified key is removed",
  },
  {
    question: (
      <div>
        <p>
          Which of the following best describes the purpose of removeItem() in a
          Todos App?
        </p>
      </div>
    ),
    options: [
      "To add new todos to local storage",
      "To remove completed or deleted todos from local storage",
      "To update todo status in local storage",
      "To reload todos from the server",
    ],
    answer: "To remove completed or deleted todos from local storage",
  },
  {
    question: (
      <div>
        <p>
          What is the correct syntax to remove a key named
          <b> "todoList" </b> from Local Storage?
        </p>
        <CodeBlock
          language="javascript"
          code={`localStorage.removeItem("todoList");`}
        />
      </div>
    ),
    options: [
      'localStorage.removeItem("todoList");',
      'localStorage.deleteItem("todoList");',
      'localStorage.clear("todoList");',
      'localStorage.remove("todoList");',
    ],
    answer: 'localStorage.removeItem("todoList");',
  },
  {
    question: (
      <div>
        <p>Which method should be used to clear all data from Local Storage?</p>
        <CodeBlock language="javascript" code={`localStorage.clear();`} />
      </div>
    ),
    options: [
      "localStorage.removeItem()",
      "localStorage.clear()",
      "localStorage.reset()",
      "localStorage.deleteAll()",
    ],
    answer: "localStorage.clear()",
  },
  {
    question: (
      <div>
        <p>
          What is the output of the following code if the key “user” does not
          exist?
        </p>
        <CodeBlock
          language="javascript"
          code={`localStorage.removeItem("user");`}
        />
      </div>
    ),
    options: [
      "Throws ReferenceError",
      "Removes all keys",
      "Does nothing",
      "Prints undefined",
    ],
    answer: "Does nothing",
  },
  {
    question: (
      <div>
        <p>Identify the output when executing the code below:</p>
        <CodeBlock
          language="javascript"
          code={`localStorage.setItem("task", "Read");
localStorage.removeItem("task");
console.log(localStorage.getItem("task"));`}
        />
      </div>
    ),
    options: ["null", "undefined", "task", "Error"],
    answer: "null",
  },
  {
    question: (
      <div>
        <p>
          Which key-value pair will remain after executing the following code?
        </p>
        <CodeBlock
          language="javascript"
          code={`localStorage.setItem("task1", "Read");
localStorage.setItem("task2", "Write");
localStorage.removeItem("task1");`}
        />
      </div>
    ),
    options: [
      '{ task1: "Read" }',
      '{ task2: "Write" }',
      '{ task1: "Read", task2: "Write" }',
      "No data remains",
    ],
    answer: '{ task2: "Write" }',
  },
];

const Todos_Application_MCQ_6 = ({
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
      title="Todos Application 6 - MCQs"
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

export default Todos_Application_MCQ_6;
