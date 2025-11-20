import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>Which HTML input element uses a placeholder to guide users?</p>
        <CodeBlock
          language="html"
          code={`<input type="email" placeholder="Enter your email address" />`}
        />
      </div>
    ),
    options: [
      "Displays hint text when input is empty",
      "Sets default text permanently",
      "Changes text color inside the input",
      "Hides input text",
    ],
    answer: "Displays hint text when input is empty",
  },
  {
    question: (
      <div>
        <p>What will the following JavaScript code do when executed?</p>
        <CodeBlock
          language="javascript"
          code={`alert("New task has been added successfully!");`}
        />
      </div>
    ),
    options: [
      "Displays a popup alert message",
      "Logs the message to console",
      "Sends a notification to the server",
      "Shows a confirmation dialog with Yes/No",
    ],
    answer: "Displays a popup alert message",
  },
  {
    question: (
      <div>
        <p>What is logged to the console when the checkbox is checked?</p>
        <CodeBlock
          language="javascript"
          code={`let completed = document.getElementById("doneCheck").checked;\nconsole.log(completed);`}
        />
      </div>
    ),
    options: ["true", "false", "'checked'", "'true'"],
    answer: "true",
  },
  {
    question: (
      <div>
        <p>Which method removes a child node from the DOM?</p>
        <CodeBlock
          language="javascript"
          code={`const ul = document.getElementById("taskList");\nconst li = document.getElementById("task1");\nul.removeChild(li);`}
        />
      </div>
    ),
    options: [
      "removeNode()",
      "deleteChild()",
      "removeChild()",
      "clearElement()",
    ],
    answer: "removeChild()",
  },
  {
    question: (
      <div>
        <p>
          What is the effect of using <code>classList.toggle()</code> on an
          element?
        </p>
        <CodeBlock
          language="javascript"
          code={`document.getElementById("taskText").classList.toggle("highlighted");`}
        />
      </div>
    ),
    options: [
      "Adds a class and never removes it",
      "Toggles between adding and removing the class",
      "Removes all classes from element",
      "Creates a new CSS class",
    ],
    answer: "Toggles between adding and removing the class",
  },
  {
    question: (
      <div>
        <p>
          Which of the following statements correctly replaces{" "}
          <code>classList.add()</code> and <code>classList.remove()</code>?
        </p>
        <CodeBlock
          language="javascript"
          code={`// Instead of\nbox.classList.add("visible");\nbox.classList.remove("visible");\n\n// Use\nbox.classList.toggle("visible");`}
        />
      </div>
    ),
    options: [
      "classList.alternate()",
      "classList.toggle()",
      "classList.replace()",
      "classList.change()",
    ],
    answer: "classList.toggle()",
  },
  {
    question: (
      <div>
        <p>Which HTML code shows a popup when clicked?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="alert('Task completed!')">Complete Task</button>`}
        />
      </div>
    ),
    options: [
      "<button alert()>Complete Task</button>",
      "<button onclick='alert(`Task completed!`)' >Complete Task</button>",
      "<button message='Task completed!'></button>",
      "<button onalert='Task completed!'>Complete</button>",
    ],
    answer:
      "<button onclick='alert(`Task completed!`)' >Complete Task</button>",
  },
  {
    question: "What does the alert() function return after the user clicks OK?",
    options: ["true", "undefined", "null", "The message string itself"],
    answer: "undefined",
  },
  {
    question: "Which property checks if a checkbox input is selected?",
    options: ["checked", "value", "selected", "status"],
    answer: "checked",
  },
  {
    question: "Which DOM method removes a child element from its parent?",
    options: [
      "removeChild()",
      "deleteElement()",
      "removeNode()",
      "clearNode()",
    ],
    answer: "removeChild()",
  },
];

const Todos_Application_MCQ_2 = ({
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
    <MCQLogic title="Todos Application 2 - MCQs" questions={randomQuestions}
    isCompleted={isCompleted}
    isLoading={isLoading}
    onComplete={handleCompletion}
    subtopicId={subtopicId}
    goalName={goalName}
    courseName={courseName} />
  );
};

export default Todos_Application_MCQ_2;
