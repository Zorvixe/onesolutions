import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ---------- NORMAL QUESTIONS (5) ----------

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
    question: "Which method is used to handle successful fetch responses?",
    options: ["catch()", "then()", "error()", "reject()"],
    answer: "then()",
  },
  {
    question: "Which property defines the HTTP request type in fetch?",
    options: ["headers", "method", "mode", "body"],
    answer: "method",
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
    question: "Which form event triggers when a form is submitted?",
    options: ["onClick", "onChange", "onSubmit", "onBlur"],
    answer: "onSubmit",
  },

  // ---------- CODEBLOCK QUESTIONS (10) ----------

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
    options: ["response.text()", "response.json()", "JSON.parse()", "data.json()"],
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
        <p>Which code correctly prevents form reload?</p>
        <CodeBlock
          language="javascript"
          code={`form.addEventListener("submit", event => {
  event.preventDefault();
});`}
        />
      </div>
    ),
    options: [
      "event.stop()",
      "event.preventDefault()",
      "event.reload(false)",
      "event.cancel()",
    ],
    answer: "event.preventDefault()",
  },
  {
    question: (
      <div>
        <p>Which input type allows selecting only one option?</p>
        <CodeBlock
          language="html"
          code={`<input type="radio" name="gender" />`}
        />
      </div>
    ),
    options: ["checkbox", "text", "radio", "select"],
    answer: "radio",
  },
  {
    question: (
      <div>
        <p>Which HTML elements create a dropdown menu?</p>
        <CodeBlock
          language="html"
          code={`<select>
  <option>Option 1</option>
</select>`}
        />
      </div>
    ),
    options: [
      "<input> & <label>",
      "<select> & <option>",
      "<ul> & <li>",
      "<menu> & <item>",
    ],
    answer: "<select> & <option>",
  },
  {
    question: (
      <div>
        <p>What does the checked attribute do?</p>
        <CodeBlock
          language="html"
          code={`<input type="checkbox" checked />`}
        />
      </div>
    ),
    options: [
      "Disables the input",
      "Pre-selects the input",
      "Hides the input",
      "Clears selection",
    ],
    answer: "Pre-selects the input",
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
  {
    question: (
      <div>
        <p>Which input attribute sets default selection?</p>
        <CodeBlock
          language="html"
          code={`<input type="radio" checked />`}
        />
      </div>
    ),
    options: ["selected", "default", "checked", "active"],
    answer: "checked",
  },
];


const JS_MCQ_Assignment_4 = ({
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
      title="JS Assignment 4 - MCQs"
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

export default JS_MCQ_Assignment_4;
