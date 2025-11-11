import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What does this HTML code do?</p>
        <CodeBlock
          language="html"
          code={`<link rel="stylesheet" href="styles.css">`}
        />
      </div>
    ),
    options: [
      "Links a JavaScript file",
      "Links an external CSS file",
      "Adds internal styles",
      "Creates a hyperlink",
    ],
    answer: "Links an external CSS file",
  },
  {
    question: (
      <div>
        <p>Where should this link element be placed?</p>
        <CodeBlock
          language="html"
          code={`<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
</body>
</html>`}
        />
      </div>
    ),
    options: [
      "Inside the body tag",
      "Inside the head tag",
      "Before <!DOCTYPE html>",
      "After </body>",
    ],
    answer: "Inside the head tag",
  },
  {
    question: (
      <div>
        <p>What is the purpose of Cloudinary in web development?</p>
        <CodeBlock
          language="html"
          code={`<img src="https://res.cloudinary.com/demo/image/upload/sample.jpg">`}
        />
      </div>
    ),
    options: [
      "To write CSS",
      "To host and provide image URLs",
      "To link CSS files",
      "To install VS Code",
    ],
    answer: "To host and provide image URLs",
  },
  {
    question: (
      <div>
        <p>Which website should you visit to upload images and get URLs?</p>
        <CodeBlock
          language="html"
          code={`<!-- Visit: https://cloudinary.com/ -->`}
        />
      </div>
    ),
    options: [
      "https://github.com",
      "https://cloudinary.com/",
      "https://bootstrap.com",
      "https://w3schools.com",
    ],
    answer: "https://cloudinary.com/",
  },
  {
    question: (
      <div>
        <p>Which editor is recommended for writing HTML and CSS?</p>
        <CodeBlock
          language="html"
          code={`<!-- Install Visual Studio Code -->`}
        />
      </div>
    ),
    options: ["Notepad", "Word", "Visual Studio Code", "Paint"],
    answer: "Visual Studio Code",
  },
  {
    question: (
      <div>
        <p>Is the link element a void element?</p>
        <CodeBlock
          language="html"
          code={`<link rel="stylesheet" href="style.css">`}
        />
      </div>
    ),
    options: [
      "No, it needs a closing tag",
      "Yes, it has no closing tag",
      "Only in body",
      "Only with script",
    ],
    answer: "Yes, it has no closing tag",
  },
  {
    question: (
      <div>
        <p>What will happen if you forget to add this inside head?</p>
        <CodeBlock
          language="html"
          code={`<!-- Missing link tag -->
<style> body { background: blue; } </style>`}
        />
      </div>
    ),
    options: [
      "CSS won't apply",
      "Page won't load",
      "CSS will apply inline",
      "No difference",
    ],
    answer: "CSS won't apply",
  },
  {
    question: "Which HTML element is used to link the HTML and CSS files?",
    options: ["<link>", "<script>", "<a>", "<style>"],
    answer: "<link>",
  },
  {
    question: "Where should the Cloudinary URL be opened to sign up?",
    options: ["Same tab", "New tab", "Download it", "No need to open"],
    answer: "New tab",
  },
  {
    question:
      "For how long should Mac users watch the VS Code installation video?",
    options: ["2 minutes", "2 minutes 30 seconds", "5 minutes", "Full video"],
    answer: "2 minutes 30 seconds",
  },
];

const OnDemand_Session_MCQ = ({ subtopicId, goalName, courseName }) => {
  const { markSubtopicComplete, loadProgressSummary } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  const handleCompletion = async () => {
    try {
      await markSubtopicComplete(subtopicId, goalName, courseName);
      await loadProgressSummary();
      setIsCompleted(true);
    } catch (error) {
      console.error("❌ Failed to mark subtopic complete:", error);
    }
  };
  return (
    <MCQLogic
      title="On-Demand Session - Setup & Linking - MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default OnDemand_Session_MCQ;
