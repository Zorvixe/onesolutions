import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";

const questionsData = [
  {
    question: (
      <div>
        <p>What will this button look like after Bootstrap is added?</p>
        <pre>{`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <button class="btn">Click Me</button>
</body>
</html>`}</pre>
      </div>
    ),
    options: [
      "Default browser button",
      "Styled Bootstrap button",
      "Red button",
      "No change",
    ],
    answer: "Styled Bootstrap button",
  },
  {
    question: (
      <div>
        <p>Which classes will be applied to this div?</p>
        <pre>{`<div class="bg-primary text-white">Hello</div>`}</pre>
      </div>
    ),
    options: [
      "Only bg-primary",
      "Only text-white",
      "Both bg-primary and text-white",
      "None",
    ],
    answer: "Both bg-primary and text-white",
  },
  {
    question: (
      <div>
        <p>
          How should multiple class names be written in the class attribute?
        </p>
        <pre>{`<button class="btn btn-outline-primary">Outline Button</button>`}</pre>
      </div>
    ),
    options: [
      "btn,btn-outline-primary",
      "btn;btn-outline-primary",
      "btn btn-outline-primary",
      "btn|btn-outline-primary",
    ],
    answer: "btn btn-outline-primary",
  },
  {
    question: (
      <div>
        <p>What does the btn-outline class do?</p>
        <pre>{`<button class="btn btn-outline-success">Success</button>`}</pre>
      </div>
    ),
    options: [
      "Solid filled button",
      "Outline button with border",
      "No background or border",
      "Text-only button",
    ],
    answer: "Outline button with border",
  },
  {
    question: (
      <div>
        <p>What color will the text be?</p>
        <pre>{`<p class="text-danger">Warning Text</p>`}</pre>
      </div>
    ),
    options: ["Blue", "Red", "Green", "Black"],
    answer: "Red",
  },
  {
    question: (
      <div>
        <p>How is Bootstrap typically included in an HTML file?</p>
        <pre>{`<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>`}</pre>
      </div>
    ),
    options: [
      "In the body tag",
      "Using a script tag",
      "Inside the head with a link tag",
      "No need to include",
    ],
    answer: "Inside the head with a link tag",
  },
  {
    question: (
      <div>
        <p>Which class transforms text to uppercase?</p>
        <pre>{`<p class="text-uppercase">hello world</p>`}</pre>
      </div>
    ),
    options: [
      "text-capitalize",
      "text-lowercase",
      "text-uppercase",
      "text-bold",
    ],
    answer: "text-uppercase",
  },
  {
    question:
      "Can we write the CSS Ruleset once and use it for multiple HTML elements?",
    options: ["Yes", "No"],
    answer: "Yes",
  },
  {
    question:
      "What is the correct syntax to provide multiple class names as a value to the HTML class attribute?",
    options: [
      '<div class="name1,name2,name3">Content</div>',
      '<div class="name1;name2;name3">Content</div>',
      '<div class="name1 name2 name3">Content</div>',
      '<div class="name1|name2|name3">Content</div>',
    ],
    answer: '<div class="name1 name2 name3">Content</div>',
  },
  {
    question:
      "Which Bootstrap class name is used to style the HTML button element?",
    options: ["button", "btn", "class", "style"],
    answer: "btn",
  },
];

const Introductionto_BootStrap_MCQ_1 = ({
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
      title="Introduction to Bootstrap - MCQs"
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

export default Introductionto_BootStrap_MCQ_1;
