import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What will this button look like after Bootstrap is added?</p>
        <CodeBlock
          language="html"
          code={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <button class="btn">Click Me</button>
</body>
</html>`}
        />
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
        <CodeBlock
          language="html"
          code={`<div class="bg-primary text-white">Hello</div>`}
        />
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
        <CodeBlock
          language="html"
          code={`<button class="btn btn-outline-primary">Outline Button</button>`}
        />
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
        <CodeBlock
          language="html"
          code={`<button class="btn btn-outline-success">Success</button>`}
        />
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
        <CodeBlock
          language="html"
          code={`<p class="text-danger">Warning Text</p>`}
        />
      </div>
    ),
    options: ["Blue", "Red", "Green", "Black"],
    answer: "Red",
  },
  {
    question: (
      <div>
        <p>How is Bootstrap typically included in an HTML file?</p>
        <CodeBlock
          language="html"
          code={`<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>`}
        />
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
        <CodeBlock
          language="html"
          code={`<p class="text-uppercase">hello world</p>`}
        />
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
  onComplete,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (subtopicId && completedContent.includes(subtopicId)) {
      setIsCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleCompletion = async () => {
    if (isLoading || isCompleted) return;

    try {
      setIsLoading(true);

      const result = await markSubtopicComplete(
        subtopicId,
        goalName || "Goal 1",
        courseName || "Static Website: HTML CSS & Bootstrap"
      );

      if (result.success) {
        await loadProgressSummary();
        setIsCompleted(true);
        if (onComplete) onComplete();
      }
    } catch (error) {
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
