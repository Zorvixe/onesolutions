import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // 10 Code Block Questions
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
    question: (
      <div>
        <p>What does the <code>rel</code> attribute specify in this tag?</p>
        <CodeBlock
          language="html"
          code={`<link rel="stylesheet" href="styles.css">`}
        />
      </div>
    ),
    options: [
      "The file location",
      "The relationship between files",
      "The file type",
      "The target window",
    ],
    answer: "The relationship between files",
  },
  {
    question: (
      <div>
        <p>Which attribute points to the CSS file?</p>
        <CodeBlock
          language="html"
          code={`<link rel="stylesheet" href="custom.css">`}
        />
      </div>
    ),
    options: ["rel", "href", "src", "type"],
    answer: "href",
  },
  {
    question: (
      <div>
        <p>How should you open Cloudinary to sign up?</p>
        <CodeBlock
          language="html"
          code={`<!-- Copy and open in new tab: https://cloudinary.com/ -->`}
        />
      </div>
    ),
    options: [
      "Same tab",
      "New tab",
      "Incognito mode",
      "No need to open",
    ],
    answer: "New tab",
  },

  // 5 Normal (Non-CodeBlock) Questions
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
  {
    question: "What is the correct value for <code>rel</code> when linking CSS?",
    options: ["script", "stylesheet", "icon", "preload"],
    answer: "stylesheet",
  },
  {
    question:
      "Which operating systems have VS Code installation instructions in the session?",
    options: [
      "Only Windows",
      "Windows, Ubuntu/Linux, Mac",
      "Only Mac",
      "Linux and Mac only",
    ],
    answer: "Windows, Ubuntu/Linux, Mac",
  },
];

const OnDemand_Session_MCQ = ({
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
      title="On-Demand Session - Setup & Linking - MCQs"
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

export default OnDemand_Session_MCQ;
