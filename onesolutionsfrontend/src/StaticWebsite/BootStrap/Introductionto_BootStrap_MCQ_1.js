import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What happens when the Bootstrap CDN is added?</p>
        <CodeBlock
          language="html"
          code={`<button class="btn">Click Me</button>`}
        />
      </div>
    ),
    options: [
      "Button remains unchanged",
      "Button gets Bootstrap styling",
      "Button becomes red",
      "Button disappears",
    ],
    answer: "Button gets Bootstrap styling",
  },

  {
    question: (
      <div>
        <p>Which styles are applied to this element?</p>
        <CodeBlock
          language="html"
          code={`<div class="bg-danger text-white">Alert</div>`}
        />
      </div>
    ),
    options: [
      "Only background color",
      "Only text color",
      "Both background and text color",
      "No styles applied",
    ],
    answer: "Both background and text color",
  },

  {
    question: (
      <div>
        <p>Which button type is shown here?</p>
        <CodeBlock
          language="html"
          code={`<button class="btn btn-outline-primary">Submit</button>`}
        />
      </div>
    ),
    options: [
      "Filled button",
      "Outline button",
      "Disabled button",
      "Link button",
    ],
    answer: "Outline button",
  },

  {
    question: (
      <div>
        <p>What will be the text case?</p>
        <CodeBlock
          language="html"
          code={`<p class="text-uppercase">hello</p>`}
        />
      </div>
    ),
    options: ["hello", "Hello", "HELLO", "hELLO"],
    answer: "HELLO",
  },

  {
    question: (
      <div>
        <p>Which color is applied to the text?</p>
        <CodeBlock
          language="html"
          code={`<span class="text-success">Success</span>`}
        />
      </div>
    ),
    options: ["Red", "Blue", "Green", "Black"],
    answer: "Green",
  },

  {
    question: (
      <div>
        <p>Where should Bootstrap CDN be placed?</p>
        <CodeBlock
          language="html"
          code={`<head>
  <link href="bootstrap.css" rel="stylesheet">
</head>`}
        />
      </div>
    ),
    options: [
      "Inside body",
      "Inside footer",
      "Inside head",
      "Inside script tag",
    ],
    answer: "Inside head",
  },

  {
    question: (
      <div>
        <p>Which classes are applied here?</p>
        <CodeBlock
          language="html"
          code={`<div class="card card-body">Content</div>`}
        />
      </div>
    ),
    options: [
      "Only card",
      "Only card-body",
      "Both card and card-body",
      "No Bootstrap classes",
    ],
    answer: "Both card and card-body",
  },

  {
    question: (
      <div>
        <p>What does this class do?</p>
        <CodeBlock
          language="html"
          code={`<p class="text-lowercase">HELLO</p>`}
        />
      </div>
    ),
    options: [
      "Converts text to uppercase",
      "Converts text to lowercase",
      "Capitalizes text",
      "Adds bold style",
    ],
    answer: "Converts text to lowercase",
  },

  {
    question: (
      <div>
        <p>Which background color is applied?</p>
        <CodeBlock
          language="html"
          code={`<div class="bg-warning">Note</div>`}
        />
      </div>
    ),
    options: ["Red", "Yellow", "Green", "Blue"],
    answer: "Yellow",
  },

  {
    question: (
      <div>
        <p>Which is the correct way to apply multiple classes?</p>
        <CodeBlock
          language="html"
          code={`<div class="bg-primary text-white">Text</div>`}
        />
      </div>
    ),
    options: [
      "Classes separated by comma",
      "Classes separated by space",
      "Classes separated by semicolon",
      "Only one class allowed",
    ],
    answer: "Classes separated by space",
  },

  {
    question: "Can a single CSS ruleset be reused for multiple HTML elements?",
    options: ["Yes", "No"],
    answer: "Yes",
  },

  {
    question: "Which language is NOT used to build Bootstrap?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: "Python",
  },

  {
    question: "Which Bootstrap class styles a button?",
    options: ["button", "btn", "btn-style", "bootstrap-btn"],
    answer: "btn",
  },

  {
    question: "Which symbol separates multiple class names in HTML?",
    options: ["Comma (,)", "Space ( )", "Semicolon (;)", "Pipe (|)"],
    answer: "Space ( )",
  },

  {
    question: "Using Bootstrap class names inside custom CSS may cause?",
    options: [
      "Better performance",
      "No effect",
      "Unexpected conflicts",
      "Automatic fixes",
    ],
    answer: "Unexpected conflicts",
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
