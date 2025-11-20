import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>
          1. What is the main purpose of the <code>fetch()</code> method in
          JavaScript?
        </p>
      </div>
    ),
    options: [
      "To execute SQL queries",
      "To fetch resources or data from a server",
      "To modify HTML elements dynamically",
      "To run callback functions automatically",
    ],
    answer: "To fetch resources or data from a server",
  },
  {
    question: (
      <div>
        <p>
          2. Which method is used to handle successful responses from a fetch
          request?
        </p>
        <CodeBlock
          language="javascript"
          code={`fetch("https://api.example.com/data")
    .then(response => response.json())
    .then(data => console.log(data));`}
        />
      </div>
    ),
    options: [
      "response.catch()",
      "response.handle()",
      "then()",
      "await.response()",
    ],
    answer: "then()",
  },
  {
    question: (
      <div>
        <p>
          3. What is the correct syntax to handle errors in a fetch request?
        </p>
        <CodeBlock
          language="javascript"
          code={`fetch("https://example.com")
    .then(res => res.json())
    .catch(error => console.log("Error:", error));`}
        />
      </div>
    ),
    options: [
      "By using .finally()",
      "By using .catch()",
      "By using .error()",
      "By using .reject()",
    ],
    answer: "By using .catch()",
  },
  {
    question: (
      <div>
        <p>
          4. In Fetch & Callbacks 2, what does the <code>method</code> property
          define in fetch options?
        </p>
      </div>
    ),
    options: [
      "The type of HTTP request (GET, POST, PUT, DELETE)",
      "The server domain name",
      "The response type",
      "The headers for authorization",
    ],
    answer: "The type of HTTP request (GET, POST, PUT, DELETE)",
  },
  {
    question: (
      <div>
        <p>5. Which statement best describes a callback function?</p>
      </div>
    ),
    options: [
      "A function that executes immediately after definition",
      "A function passed as an argument to another function",
      "A function that never returns a value",
      "A function used only for loops",
    ],
    answer: "A function passed as an argument to another function",
  },
  {
    question: (
      <div>
        <p>6. Which form event is triggered when a user submits a form?</p>
      </div>
    ),
    options: ["onChange", "onClick", "onSubmit", "onBlur"],
    answer: "onSubmit",
  },
  {
    question: (
      <div>
        <p>
          7. What is the main purpose of the <code>event.preventDefault()</code>{" "}
          method in form handling?
        </p>
      </div>
    ),
    options: [
      "It resets all form fields to default values",
      "It prevents the default browser action like page reload on form submit",
      "It clears all input fields",
      "It validates the form data automatically",
    ],
    answer:
      "It prevents the default browser action like page reload on form submit",
  },
  {
    question: (
      <div>
        <p>
          8. Which input type is used for selecting one option from a list of
          predefined choices?
        </p>
        <CodeBlock
          language="html"
          code={`<input type="radio" name="gender" value="male"> Male
  <input type="radio" name="gender" value="female"> Female`}
        />
      </div>
    ),
    options: ["text", "checkbox", "radio", "select"],
    answer: "radio",
  },
  {
    question: (
      <div>
        <p>
          9. Which of the following correctly represents a drop-down menu in
          HTML?
        </p>
        <CodeBlock
          language="html"
          code={`<select name="city">
    <option value="hyd">Hyderabad</option>
    <option value="delhi">Delhi</option>
  </select>`}
        />
      </div>
    ),
    options: [
      "<input type='dropdown'>",
      "<select> with <option> elements",
      "<menu> with <item>",
      "<ul> with <li>",
    ],
    answer: "<select> with <option> elements",
  },
  {
    question: (
      <div>
        <p>
          10. What does the <code>checked</code> attribute do in an HTML input
          element?
        </p>
      </div>
    ),
    options: [
      "Specifies a default checked state for radio or checkbox input",
      "Marks the input as invalid",
      "Hides the input field",
      "Clears all checked options",
    ],
    answer: "Specifies a default checked state for radio or checkbox input",
  },
];

const JS_MCQ_Assignment_1 = ({
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

export default JS_MCQ_Assignment_1;
