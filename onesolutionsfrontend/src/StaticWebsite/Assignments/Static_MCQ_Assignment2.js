import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 10 CodeBlock Questions (covering all Bootstrap subtopics) ==========
  {
    question: (
      <div>
        <p>What Bootstrap class creates a primary button?</p>
        <CodeBlock
          language="html"
          code={`<button class="btn btn-primary">Primary</button>`}
        />
      </div>
    ),
    options: [
      "btn btn-success",
      "btn btn-primary",
      "btn btn-danger",
      "btn btn-light",
    ],
    answer: "btn btn-primary",
  },
  {
    question: (
      <div>
        <p>What does this flexbox code do?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex justify-content-center">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Aligns items to the left",
      "Centers items horizontally",
      "Makes vertical column",
      "Adds space between",
    ],
    answer: "Centers items horizontally",
  },
  {
    question: (
      <div>
        <p>Which class makes an outline button?</p>
        <CodeBlock
          language="html"
          code={`<button class="btn btn-outline-warning">Warning</button>`}
        />
      </div>
    ),
    options: [
      "btn btn-warning",
      "btn-outline btn-warning",
      "btn btn-outline-warning",
      "outline-warning",
    ],
    answer: "btn btn-outline-warning",
  },
  {
    question: (
      <div>
        <p>What background color does this apply?</p>
        <CodeBlock
          language="html"
          code={`<div class="bg-success text-white">Success Message</div>`}
        />
      </div>
    ),
    options: ["Red", "Green", "Blue", "Yellow"],
    answer: "Green",
  },
  {
    question: (
      <div>
        <p>How to make text uppercase?</p>
        <CodeBlock
          language="html"
          code={`<p class="text-uppercase">hello world</p>`}
        />
      </div>
    ),
    options: [
      "text-lowercase",
      "text-capitalize",
      "text-uppercase",
      "text-bold",
    ],
    answer: "text-uppercase",
  },
  {
    question: (
      <div>
        <p>What is required for multiple carousels?</p>
        <CodeBlock
          language="html"
          code={`<div id="carousel1" class="carousel slide">...</div>
<div id="carousel2" class="carousel slide">...</div>`}
        />
      </div>
    ),
    options: [
      "Same id",
      "Unique id for each",
      "No id needed",
      "Only one carousel allowed",
    ],
    answer: "Unique id for each",
  },
  {
    question: (
      <div>
        <p>What does this YouTube embed show?</p>
        <CodeBlock
          language="html"
          code={`<div class="embed-responsive embed-responsive-16by9">
  <iframe src="https://www.youtube.com/embed/ABC123"></iframe>
</div>`}
        />
      </div>
    ),
    options: [
      "Square video",
      "16:9 widescreen video",
      "Full screen only",
      "No video",
    ],
    answer: "16:9 widescreen video",
  },
  {
    question: (
      <div>
        <p>Which class creates a vertical flex column?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-column">
  <div>Top</div>
  <div>Bottom</div>
</div>`}
        />
      </div>
    ),
    options: [
      "flex-row",
      "flex-column",
      "d-flex only",
      "justify-content-center",
    ],
    answer: "flex-column",
  },
  {
    question: (
      <div>
        <p>What color is this text?</p>
        <CodeBlock
          language="html"
          code={`<p class="text-danger">Error!</p>`}
        />
      </div>
    ),
    options: ["Green", "Blue", "Red", "Yellow"],
    answer: "Red",
  },
  {
    question: (
      <div>
        <p>How to center items vertically in a flex container?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex align-items-center" style="height: 200px;">
  <div>Centered</div>
</div>`}
        />
      </div>
    ),
    options: [
      "justify-content-center",
      "align-items-center",
      "flex-center",
      "text-center",
    ],
    answer: "align-items-center",
  },

  // ========== 5 Normal (Non-CodeBlock) Questions ==========
  {
    question: "Which class defines a flex container in Bootstrap?",
    options: ["flex", "d-flex", "container-flex", "flexbox"],
    answer: "d-flex",
  },
  {
    question:
      "To create an outline button, replace 'btn' with 'btn-outline' in the class name.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    question: "Which class aligns flex items vertically in the center?",
    options: [
      "justify-content-center",
      "align-items-center",
      "flex-column justify-content-center",
      "text-center",
    ],
    answer: "align-items-center",
  },
  {
    question: "Which Bootstrap class applies a success background color?",
    options: ["bg-primary", "bg-success", "bg-warning", "bg-dark"],
    answer: "bg-success",
  },
  {
    question:
      "What is the correct class to make text appear in uppercase using Bootstrap?",
    options: [
      "text-lowercase",
      "text-capitalize",
      "text-uppercase",
      "text-transform",
    ],
    answer: "text-uppercase",
  },
];

const Static_MCQ_Assignment2 = ({
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
      title="Static MCQ Assignment 2"
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

export default Static_MCQ_Assignment2;
