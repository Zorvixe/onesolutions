import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ======== CodeBlock Questions (10) ========
  {
    question: (
      <div>
        <p>What is the purpose of the placeholder attribute?</p>
        <CodeBlock
          language="html"
          code={`<input type="text" placeholder="Enter task" />`}
        />
      </div>
    ),
    options: [
      "Displays hint text when input is empty",
      "Sets permanent input value",
      "Disables the input",
      "Validates the input",
    ],
    answer: "Displays hint text when input is empty",
  },
  {
    question: (
      <div>
        <p>What will this JavaScript code do?</p>
        <CodeBlock
          language="javascript"
          code={`alert("Todo added successfully");`}
        />
      </div>
    ),
    options: [
      "Displays a popup alert",
      "Logs message to console",
      "Shows confirm dialog",
      "Returns true",
    ],
    answer: "Displays a popup alert",
  },
  {
    question: (
      <div>
        <p>What value will be logged if the checkbox is checked?</p>
        <CodeBlock
          language="javascript"
          code={`const isDone = document.getElementById("taskCheck").checked;
console.log(isDone);`}
        />
      </div>
    ),
    options: ["true", "false", "'true'", "undefined"],
    answer: "true",
  },
  {
    question: (
      <div>
        <p>Which method removes a child element?</p>
        <CodeBlock
          language="javascript"
          code={`const list = document.getElementById("list");
const item = document.getElementById("item1");
list.removeChild(item);`}
        />
      </div>
    ),
    options: ["deleteChild()", "removeNode()", "removeChild()", "clearChild()"],
    answer: "removeChild()",
  },
  {
    question: (
      <div>
        <p>What is the effect of this code?</p>
        <CodeBlock
          language="javascript"
          code={`task.classList.toggle("completed");`}
        />
      </div>
    ),
    options: [
      "Always adds class",
      "Always removes class",
      "Adds or removes class based on state",
      "Deletes the element",
    ],
    answer: "Adds or removes class based on state",
  },
  {
    question: (
      <div>
        <p>Which method can replace add() and remove()?</p>
        <CodeBlock
          language="javascript"
          code={`box.classList.toggle("active");`}
        />
      </div>
    ),
    options: [
      "classList.switch()",
      "classList.toggle()",
      "classList.replace()",
      "classList.update()",
    ],
    answer: "classList.toggle()",
  },
  {
    question: (
      <div>
        <p>Which code shows an alert when button is clicked?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="alert('Task completed')">Done</button>`}
        />
      </div>
    ),
    options: [
      "<button alert()>Done</button>",
      "<button onclick='alert(`Task completed`)'>Done</button>",
      "<button message='Task completed'></button>",
      "<button onClickAlert>Done</button>",
    ],
    answer: "<button onclick='alert(`Task completed`)'>Done</button>",
  },
  {
    question: (
      <div>
        <p>What does removeChild() return?</p>
        <CodeBlock
          language="javascript"
          code={`const removed = parent.removeChild(child);
console.log(removed);`}
        />
      </div>
    ),
    options: ["The removed child element", "true", "undefined", "null"],
    answer: "The removed child element",
  },
  {
    question: (
      <div>
        <p>Which property changes checkbox state?</p>
        <CodeBlock language="javascript" code={`checkbox.checked = false;`} />
      </div>
    ),
    options: ["value", "status", "checked", "selected"],
    answer: "checked",
  },
  {
    question: (
      <div>
        <p>What happens when alert() is executed?</p>
        <CodeBlock
          language="javascript"
          code={`alert("Please enter a task");`}
        />
      </div>
    ),
    options: [
      "Popup with OK button appears",
      "Message logs to console",
      "Returns true",
      "Page reloads",
    ],
    answer: "Popup with OK button appears",
  },

  // ======== Normal Questions (5) ========
  {
    question: "Which attribute provides hint text inside an input?",
    options: ["value", "name", "placeholder", "type"],
    answer: "placeholder",
  },
  {
    question: "What does alert() return in JavaScript?",
    options: ["true", "false", "undefined", "null"],
    answer: "undefined",
  },
  {
    question: "Which property returns a boolean value for checkbox status?",
    options: ["value", "checked", "selected", "state"],
    answer: "checked",
  },
  {
    question: "Which DOM method removes a child from its parent?",
    options: ["removeChild()", "deleteNode()", "clearElement()", "remove()"],
    answer: "removeChild()",
  },
  {
    question: "Why is classList.toggle() useful?",
    options: [
      "It creates CSS classes",
      "It switches class on and off",
      "It removes all classes",
      "It styles elements directly",
    ],
    answer: "It switches class on and off",
  },
];

const Todos_Application_MCQ_2 = ({
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
      title="Todos Application 2 - MCQs"
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

export default Todos_Application_MCQ_2;
