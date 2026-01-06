import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========= 10 CODE BLOCK QUESTIONS =========

  {
    question: (
      <div>
        <p>Which method is used to add an event listener in a modern way?</p>
        <CodeBlock
          language="javascript"
          code={`const button = document.querySelector("button");

button.addEventListener("click", function() {
  console.log("Clicked");
});`}
        />
      </div>
    ),
    options: [
      "button.onclick()",
      "button.addListener()",
      "button.addEventListener()",
      "button.listen()",
    ],
    answer: "button.addEventListener()",
  },

  {
    question: (
      <div>
        <p>Which type of event listener is used in the following code?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="handleClick()">Click Me</button>`}
        />
      </div>
    ),
    options: [
      "onevent listener",
      "Inline event listener",
      "addEventListener()",
      "Keyboard event",
    ],
    answer: "Inline event listener",
  },

  {
    question: (
      <div>
        <p>Identify the event listener type used here.</p>
        <CodeBlock
          language="javascript"
          code={`const btn = document.querySelector("button");
btn.onclick = function() {
  alert("Clicked");
};`}
        />
      </div>
    ),
    options: [
      "Inline event listener",
      "addEventListener()",
      "onevent listener",
      "Keyboard event",
    ],
    answer: "onevent listener",
  },

  {
    question: (
      <div>
        <p>What does the following code log when any element is clicked?</p>
        <CodeBlock
          language="javascript"
          code={`document.addEventListener("click", function(event) {
  console.log(event.target);
});`}
        />
      </div>
    ),
    options: [
      "Type of event",
      "HTML element that triggered the event",
      "Key pressed by user",
      "Time of event",
    ],
    answer: "HTML element that triggered the event",
  },

  {
    question: (
      <div>
        <p>Which event is triggered when a key is pressed?</p>
        <CodeBlock
          language="javascript"
          code={`document.addEventListener("keydown", function(event) {
  console.log(event.type);
});`}
        />
      </div>
    ),
    options: ["keyup", "keydown", "click", "keypress"],
    answer: "keydown",
  },

  {
    question: (
      <div>
        <p>What will be logged when the "A" key is pressed?</p>
        <CodeBlock
          language="javascript"
          code={`document.addEventListener("keydown", function(event) {
  console.log(event.key);
});`}
        />
      </div>
    ),
    options: ["a", "A", "Enter", "undefined"],
    answer: "A",
  },

  {
    question: (
      <div>
        <p>
          What does the <b>event.type</b> property contain?
        </p>
        <CodeBlock
          language="javascript"
          code={`document.addEventListener("click", function(event) {
  console.log(event.type);
});`}
        />
      </div>
    ),
    options: [
      "Element clicked",
      "Key pressed",
      "Type of event occurred",
      "Time of execution",
    ],
    answer: "Type of event occurred",
  },

  {
    question: (
      <div>
        <p>What will be the output of the following comparison?</p>
        <CodeBlock language="javascript" code={`console.log(5 === "5");`} />
      </div>
    ),
    options: ["true", "false", "undefined", "error"],
    answer: "false",
  },

  {
    question: (
      <div>
        <p>What does the following logical expression return?</p>
        <CodeBlock language="javascript" code={`console.log(true && false);`} />
      </div>
    ),
    options: ["true", "false", "null", "undefined"],
    answer: "false",
  },

  {
    question: (
      <div>
        <p>What will this code output?</p>
        <CodeBlock
          language="javascript"
          code={`let a = 10, b = 5;
console.log(a > b || b > 20);`}
        />
      </div>
    ),
    options: ["true", "false", "undefined", "null"],
    answer: "true",
  },

  // ========= 5 NORMAL QUESTIONS =========

  {
    question:
      "How many ways are available to add event listeners in JavaScript?",
    options: ["One", "Two", "Three", "Four"],
    answer: "Three",
  },

  {
    question: "Which operator checks both value and type equality?",
    options: ["==", "===", "!=", "<="],
    answer: "===",
  },

  {
    question: "Which keyboard event occurs when a key is released?",
    options: ["keydown", "keyup", "click", "keypress"],
    answer: "keyup",
  },

  {
    question: "Which logical operator returns true if both values are true?",
    options: ["||", "&&", "!", "=="],
    answer: "&&",
  },

  {
    question: "Which property gives the key pressed by the user?",
    options: ["event.type", "event.target", "event.key", "event.timeStamp"],
    answer: "event.key",
  },
];

const Event_Listners_More_Events_MCQ = ({
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
      title="Event Listeners and More Events - MCQs"
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

export default Event_Listners_More_Events_MCQ;
