import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ---------- 1 (Normal) ----------
  {
    question: (
      <div>
        <p>
          What is the main purpose of the HTML <bdi>&lt;form&gt;</bdi> element?
        </p>
      </div>
    ),
    options: [
      "To display images",
      "To collect user input",
      "To apply CSS styles",
      "To play videos",
    ],
    answer: "To collect user input",
  },

  // ---------- 2 (Normal) ----------
  {
    question: (
      <div>
        <p>Which event is triggered when a form is submitted?</p>
      </div>
    ),
    options: ["click", "submit", "change", "blur"],
    answer: "submit",
  },

  // ---------- 3 (Normal) ----------
  {
    question: (
      <div>
        <p>
          Which method is used to prevent the default behavior of a form
          submission?
        </p>
      </div>
    ),
    options: [
      "stopForm()",
      "preventDefault()",
      "cancelSubmit()",
      "disableForm()",
    ],
    answer: "preventDefault()",
  },

  // ---------- 4 (Normal) ----------
  {
    question: (
      <div>
        <p>Which of the following is a Form Event?</p>
      </div>
    ),
    options: ["blur", "scroll", "resize", "load"],
    answer: "blur",
  },

  // ---------- 5 (Normal) ----------
  {
    question: (
      <div>
        <p>
          When does the <b>change</b> event occur in a form?
        </p>
      </div>
    ),
    options: [
      "When the page loads",
      "When the input value changes",
      "When the mouse moves",
      "When the form resets",
    ],
    answer: "When the input value changes",
  },

  // ---------- 6 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>Which HTML element is used to wrap input fields?</p>
        <CodeBlock
          language="html"
          code={`<form>
  <input type="text" />
  <button type="submit">Submit</button>
</form>`}
        />
      </div>
    ),
    options: ["<input>", "<form>", "<button>", "<label>"],
    answer: "<form>",
  },

  // ---------- 7 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>What event will be triggered by the following code?</p>
        <CodeBlock
          language="javascript"
          code={`form.addEventListener("submit", function(event) {
  console.log("Form submitted");
});`}
        />
      </div>
    ),
    options: ["click", "submit", "focus", "blur"],
    answer: "submit",
  },

  // ---------- 8 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>What does the following code do?</p>
        <CodeBlock
          language="javascript"
          code={`form.addEventListener("submit", function(event) {
  event.preventDefault();
});`}
        />
      </div>
    ),
    options: [
      "Submits the form normally",
      "Reloads the page",
      "Prevents default form submission",
      "Clears all input fields",
    ],
    answer: "Prevents default form submission",
  },

  // ---------- 9 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>Which event is used when an input field loses focus?</p>
        <CodeBlock
          language="javascript"
          code={`input.addEventListener("blur", function() {
  console.log("Lost focus");
});`}
        />
      </div>
    ),
    options: ["focus", "change", "blur", "submit"],
    answer: "blur",
  },

  // ---------- 10 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>What happens when you press Enter inside a form input?</p>
        <CodeBlock
          language="html"
          code={`<form>
  <input type="text" />
</form>`}
        />
      </div>
    ),
    options: [
      "blur event is triggered",
      "submit event is triggered",
      "change event is triggered",
      "focus event is triggered",
    ],
    answer: "submit event is triggered",
  },

  // ---------- 11 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>Which event object method is shown below?</p>
        <CodeBlock language="javascript" code={`event.preventDefault();`} />
      </div>
    ),
    options: [
      "stopPropagation()",
      "preventDefault()",
      "cancelEvent()",
      "stopEvent()",
    ],
    answer: "preventDefault()",
  },

  // ---------- 12 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>Which type of event is being handled here?</p>
        <CodeBlock
          language="javascript"
          code={`form.addEventListener("change", function() {
  console.log("Value changed");
});`}
        />
      </div>
    ),
    options: ["Keyboard Event", "Mouse Event", "Form Event", "Touch Event"],
    answer: "Form Event",
  },

  // ---------- 13 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>What does this code listen for?</p>
        <CodeBlock
          language="javascript"
          code={`input.addEventListener("focus", function() {
  console.log("Input focused");
});`}
        />
      </div>
    ),
    options: [
      "When input loses focus",
      "When input gains focus",
      "When form submits",
      "When input changes",
    ],
    answer: "When input gains focus",
  },

  // ---------- 14 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>
          Which event occurs after changing input value and leaving the field?
        </p>
        <CodeBlock
          language="javascript"
          code={`input.addEventListener("change", function() {
  console.log("Changed");
});`}
        />
      </div>
    ),
    options: ["focus", "submit", "change", "blur"],
    answer: "change",
  },

  // ---------- 15 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>What is the purpose of the event parameter in this function?</p>
        <CodeBlock
          language="javascript"
          code={`function handleSubmit(event) {
  event.preventDefault();
}`}
        />
      </div>
    ),
    options: [
      "To store form data",
      "To access event-related methods",
      "To submit the form",
      "To reload the page",
    ],
    answer: "To access event-related methods",
  },
];

const Forms_MCQ_1 = ({ subtopicId, goalName, courseName, onComplete }) => {
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
      title="Forms - MCQs"
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

export default Forms_MCQ_1;
