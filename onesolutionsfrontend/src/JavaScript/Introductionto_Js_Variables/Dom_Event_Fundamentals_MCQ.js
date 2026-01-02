import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========= 5 Normal Questions =========
  {
    question: "What are JavaScript variables?",
    options: [
      "Functions that handle events",
      "Containers used to store values",
      "HTML elements",
      "CSS properties",
    ],
    answer: "Containers used to store values",
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "let", "define", "value"],
    answer: "let",
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Method",
      "Dynamic Output Model",
      "Document Order Map",
    ],
    answer: "Document Object Model",
  },
  {
    question: "What is the document object?",
    options: [
      "A CSS selector",
      "The entry point of the DOM",
      "A JavaScript variable",
      "An HTML tag",
    ],
    answer: "The entry point of the DOM",
  },
  {
    question: "What are JavaScript events?",
    options: [
      "CSS animations",
      "User or browser actions on HTML elements",
      "HTML attributes only",
      "Database triggers",
    ],
    answer: "User or browser actions on HTML elements",
  },

  // ========= 10 CodeBlock Questions =========
  {
    question: (
      <div>
        <p>Which keyword is used to declare a variable?</p>
        <CodeBlock language="javascript" code={`let count;`} />
      </div>
    ),
    options: ["var", "let", "const", "int"],
    answer: "let",
  },
  {
    question: (
      <div>
        <p>What will be the output of this code?</p>
        <CodeBlock
          language="javascript"
          code={`let message;\nconsole.log(message);`}
        />
      </div>
    ),
    options: ["null", "undefined", "0", "error"],
    answer: "undefined",
  },
  {
    question: (
      <div>
        <p>Which object should be accessed first to work with the DOM?</p>
        <CodeBlock
          language="javascript"
          code={`document.getElementById("box");`}
        />
      </div>
    ),
    options: ["window", "html", "document", "body"],
    answer: "document",
  },
  {
    question: (
      <div>
        <p>Which method selects an element using its ID?</p>
        <CodeBlock
          language="javascript"
          code={`document.getElementById("title");`}
        />
      </div>
    ),
    options: [
      "getElementsByClassName()",
      "querySelectorAll()",
      "getElementById()",
      "selectById()",
    ],
    answer: "getElementById()",
  },
  {
    question: (
      <div>
        <p>Which property is used to change text inside an element?</p>
        <CodeBlock
          language="javascript"
          code={`element.textContent = "Hello";`}
        />
      </div>
    ),
    options: ["innerTextValue", "textContent", "contentText", "innerValue"],
    answer: "textContent",
  },
  {
    question: (
      <div>
        <p>Which style property changes text color?</p>
        <CodeBlock
          language="javascript"
          code={`element.style.color = "red";`}
        />
      </div>
    ),
    options: ["text-color", "fontColor", "color", "textColor"],
    answer: "color",
  },
  {
    question: (
      <div>
        <p>Which naming convention is used for style properties?</p>
        <CodeBlock
          language="javascript"
          code={`element.style.backgroundColor = "blue";`}
        />
      </div>
    ),
    options: ["snake_case", "kebab-case", "camelCase", "PascalCase"],
    answer: "camelCase",
  },
  {
    question: (
      <div>
        <p>Which event is triggered when the button is clicked?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="show()">Click</button>`}
        />
      </div>
    ),
    options: ["onmouseover", "onclick", "onload", "onchange"],
    answer: "onclick",
  },
  {
    question: (
      <div>
        <p>What does this function do?</p>
        <CodeBlock
          language="javascript"
          code={`function changeText() {\n  document.getElementById("msg").textContent = "Updated";\n}`}
        />
      </div>
    ),
    options: [
      "Deletes the element",
      "Changes the element text",
      "Adds a new element",
      "Reloads the page",
    ],
    answer: "Changes the element text",
  },
  {
    question: (
      <div>
        <p>Which concept is demonstrated below?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="changeColor()">Change Color</button>`}
        />
      </div>
    ),
    options: [
      "Variable declaration",
      "DOM tree creation",
      "Event handling",
      "CSS animation",
    ],
    answer: "Event handling",
  },
];

const Dom_Event_Fundamentals_MCQ = ({
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
      title="Dom Event Fundamentals - MCQs"
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

export default Dom_Event_Fundamentals_MCQ;
