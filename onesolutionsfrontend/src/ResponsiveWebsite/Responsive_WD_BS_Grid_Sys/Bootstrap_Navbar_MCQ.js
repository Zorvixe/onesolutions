import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // 10 Code Block Questions
  {
    question: (
      <div>
        <p>How does this Navbar align its items?</p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Logo</a>
    <ul class="navbar-nav ms-auto">
      <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
      <li class="nav-item"><a class="nav-link" href="#">About</a></li>
    </ul>
  </div>
</nav>`}
        />
      </div>
    ),
    options: [
      "Items aligned to left",
      "Items aligned to right",
      "Items centered",
      "No alignment",
    ],
    answer: "Items aligned to right",
  },
  {
    question: (
      <div>
        <p>What background color does this Navbar have?</p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar navbar-expand-lg bg-primary">
  <!-- Navbar content -->
</nav>`}
        />
      </div>
    ),
    options: ["White", "Blue", "Gray", "Transparent"],
    answer: "Blue",
  },
  {
    question: (
      <div>
        <p>Which class centers this div horizontally?</p>
        <CodeBlock
          language="html"
          code={`<div class="m-auto" style="width: 50%;">Centered Content</div>`}
        />
      </div>
    ),
    options: ["m-0", "m-auto", "ml-auto", "mr-auto"],
    answer: "m-auto",
  },
  {
    question: (
      <div>
        <p>What does this CSS do to the element?</p>
        <CodeBlock
          language="css"
          code={`.block-element {
  margin: 0 auto;
  width: 300px;
}`}
        />
      </div>
    ),
    options: [
      "Aligns to left",
      "Aligns to right",
      "Centers horizontally",
      "Adds top margin",
    ],
    answer: "Centers horizontally",
  },
  {
    question: (
      <div>
        <p>Which Bootstrap class aligns this nav to the left?</p>
        <CodeBlock
          language="html"
          code={`<ul class="navbar-nav mr-auto">
  <!-- Nav items -->
</ul>`}
        />
      </div>
    ),
    options: ["ms-auto", "me-auto", "ml-auto", "mr-auto"],
    answer: "mr-auto",
  },
  {
    question: (
      <div>
        <p>How is the logo added in this Navbar?</p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar">
  <a class="navbar-brand" href="#">
    <img src="logo.png" alt="Logo">
  </a>
  <!-- Other items -->
</nav>`}
        />
      </div>
    ),
    options: [
      "Using navbar-logo class",
      "Inside navbar-brand",
      "Directly in nav",
      "With brand-img class",
    ],
    answer: "Inside navbar-brand",
  },
  {
    question: (
      <div>
        <p>What does this CSS do for alignment?</p>
        <CodeBlock
          language="css"
          code={`.element {
  margin-right: auto;
}`}
        />
      </div>
    ),
    options: ["Aligns to left", "Aligns to right", "Centers", "No alignment"],
    answer: "Aligns to left",
  },
  {
    question: (
      <div>
        <p>What is added first in the step by step process for Navbar?</p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar navbar-expand-lg bg-light">
  <!-- Content -->
</nav>`}
        />
      </div>
    ),
    options: [
      "Logo",
      "Nav items",
      "Bootstrap Navbar Component",
      "Background color",
    ],
    answer: "Bootstrap Navbar Component",
  },
  {
    question: (
      <div>
        <p>Which class changes the Navbar background?</p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar navbar-expand-lg bg-dark">
  <!-- Content -->
</nav>`}
        />
      </div>
    ),
    options: ["bg-light", "bg-primary", "bg-dark", "navbar-bg"],
    answer: "bg-dark",
  },
  {
    question: (
      <div>
        <p>What does this Bootstrap class do?</p>
        <CodeBlock
          language="html"
          code={`<ul class="navbar-nav ml-auto">
  <!-- Items -->
</ul>`}
        />
      </div>
    ),
    options: [
      "Aligns to left",
      "Aligns to right",
      "Centers",
      "Stacks vertically",
    ],
    answer: "Aligns to right",
  },

  // 5 Normal (Non-CodeBlock) Questions
  {
    question: "Which HTML element is used as a container for a Navbar?",
    options: ["div", "nav", "header", "section"],
    answer: "nav",
  },
  {
    question: "Which of these is a block-level element?",
    options: ["div", "img", "a", "span"],
    answer: "div",
  },
  {
    question: "What does 'margin: 0 auto;' do?",
    options: [
      "Aligns element to left",
      "Aligns element to right",
      "Centers element horizontally",
      "Aligns element to top",
    ],
    answer: "Centers element horizontally",
  },
  {
    question:
      "HTML hyperlinks can be used to navigate within the same document.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    question: "Which Bootstrap class centers an element horizontally?",
    options: ["m-0", "m-auto", "ml-5", "mr-5"],
    answer: "m-auto",
  },
];

const Bootstrap_Navbar_MCQ = ({
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
      title="Bootstrap Navbar - MCQs"
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

export default Bootstrap_Navbar_MCQ;
