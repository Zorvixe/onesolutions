import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>Which of the following correctly adds an event listener using <code>addEventListener()</code>?</p>
        <CodeBlock
          language="javascript"
          code={`const btn = document.querySelector("button");\nbtn.addEventListener("click", function() {\n  alert("Button clicked!");\n});`}
        />
      </div>
    ),
    options: [
      'btn.on("click", function() {})',
      'btn.addEventListener("click", function() {})',
      'addEvent(btn, "click", function() {})',
      'btn.listen("click", function() {})',
    ],
    answer: 'btn.addEventListener("click", function() {})',
  },
  {
    question: (
      <div>
        <p>Which code snippet correctly uses an inline event listener?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="sayHello()">Click Me</button>`}
        />
      </div>
    ),
    options: [
      `<button addEvent="sayHello()">Click</button>`,
      `<button onClick="sayHello()">Click Me</button>`,
      `<button onclick="sayHello()">Click Me</button>`,
      `<button listen="sayHello()">Click</button>`,
    ],
    answer: `<button onclick="sayHello()">Click Me</button>`,
  },
  {
    question: (
      <div>
        <p>Which statement about the <code>event.target</code> property is true?</p>
        <CodeBlock
          language="javascript"
          code={`document.addEventListener("click", function(event) {\n  console.log(event.target.tagName);\n});`}
        />
      </div>
    ),
    options: [
      "It refers to the element that triggered the event",
      "It always refers to the document element",
      "It shows only the event type",
      "It stores the key pressed by the user",
    ],
    answer: "It refers to the element that triggered the event",
  },
  {
    question: (
      <div>
        <p>What will the following code log when the 'Enter' key is pressed?</p>
        <CodeBlock
          language="javascript"
          code={`document.addEventListener("keydown", function(e) {\n  console.log(e.key);\n});`}
        />
      </div>
    ),
    options: ["'enter'", "'Enter'", "'E'", "'ENTER'"],
    answer: "'Enter'",
  },
  {
    question: (
      <div>
        <p>Which operator will return true for both value and type equality?</p>
        <CodeBlock
          language="javascript"
          code={`console.log(10 === "10");`}
        />
      </div>
    ),
    options: ["==", "===", "!=", "!=="],
    answer: "===",
  },
  {
    question: (
      <div>
        <p>What will the following code output?</p>
        <CodeBlock
          language="javascript"
          code={`let a = 5, b = 10;\nconsole.log(a < b && b > 8);`}
        />
      </div>
    ),
    options: ["false", "true", "undefined", "null"],
    answer: "true",
  },
  {
    question: (
      <div>
        <p>What is the purpose of <code>clearInterval()</code> in JavaScript?</p>
        <CodeBlock
          language="javascript"
          code={`let id = setInterval(() => console.log("Hi"), 1000);\nclearInterval(id);`}
        />
      </div>
    ),
    options: [
      "It repeats a task forever",
      "It clears the browser cache",
      "It cancels a repeating function created by setInterval()",
      "It pauses the execution for 1 second",
    ],
    answer: "It cancels a repeating function created by setInterval()",
  },
  {
    question: "Which of the following is NOT a type of event listener in JavaScript?",
    options: [
      "Inline event listener",
      "addEventListener()",
      "onEventListener()",
      "onevent listener",
    ],
    answer: "onEventListener()",
  },
  {
    question: "Which event occurs when a key is released on the keyboard?",
    options: ["keydown", "keyup", "keypress", "keyrelease"],
    answer: "keyup",
  },
  {
    question: "What does the '!' logical operator do in JavaScript?",
    options: [
      "Performs addition",
      "Negates a boolean value",
      "Compares two numbers",
      "Converts string to number",
    ],
    answer: "Negates a boolean value",
  },
];

const Event_Listners_More_Events_MCQ = ({
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
    <MCQLogic
      title="Event Listeners and More Events - MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      isLoading={isLoading}
      onComplete={handleCompletion}
      subtopicId={subtopicId}
      goalName={goalName}
      courseName={courseName}    />
  );
};

export default Event_Listners_More_Events_MCQ;
