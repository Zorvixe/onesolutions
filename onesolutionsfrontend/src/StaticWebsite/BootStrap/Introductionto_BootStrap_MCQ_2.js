import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // 10 Code Block Questions
  {
    question: (
      <div>
        <p>What will happen when this HTML is rendered with Bootstrap?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Normal block layout",
      "Flexbox container with horizontal items",
      "Vertical column",
      "No change",
    ],
    answer: "Flexbox container with horizontal items",
  },
  {
    question: (
      <div>
        <p>How will the items be arranged?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-row">
  <div>One</div>
  <div>Two</div>
</div>`}
        />
      </div>
    ),
    options: ["Vertically", "Horizontally", "Diagonally", "No effect"],
    answer: "Horizontally",
  },
  {
    question: (
      <div>
        <p>Where will the flex items be aligned?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex justify-content-center">
  <div>A</div>
  <div>B</div>
</div>`}
        />
      </div>
    ),
    options: ["At the start", "At the center", "At the end", "Spread out"],
    answer: "At the center",
  },
  {
    question: (
      <div>
        <p>What layout will this create?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-column">
  <div>Top</div>
  <div>Bottom</div>
</div>`}
        />
      </div>
    ),
    options: ["Horizontal", "Vertical", "Grid layout", "No flex applied"],
    answer: "Vertical",
  },
  {
    question: (
      <div>
        <p>How will the items be positioned?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex justify-content-end">
  <div>First</div>
  <div>Last</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Left aligned",
      "Center aligned",
      "Right aligned",
      "Evenly spaced",
    ],
    answer: "Right aligned",
  },
  {
    question: (
      <div>
        <p>What spacing will be between items?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex justify-content-between">
  <div>Left</div>
  <div>Right</div>
</div>`}
        />
      </div>
    ),
    options: [
      "No space",
      "Equal space around",
      "Space only between",
      "Space at start and end",
    ],
    answer: "Space only between",
  },
  {
    question: (
      <div>
        <p>Which class combination creates a centered vertical column?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-column justify-content-center" style="height: 200px;">
  <div>Item</div>
</div>`}
        />
      </div>
    ),
    options: [
      "d-flex flex-row",
      "d-flex flex-column justify-content-center",
      "justify-content-center only",
      "flex-column only",
    ],
    answer: "d-flex flex-column justify-content-center",
  },
  {
    question: (
      <div>
        <p>How will the items be aligned in this container?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-row justify-content-start">
  <div>Start</div>
  <div>Item</div>
</div>`}
        />
      </div>
    ),
    options: ["Centered", "At the end", "At the start (left)", "Spread out"],
    answer: "At the start (left)",
  },
  {
    question: (
      <div>
        <p>What happens when only d-flex is used (no flex-row/flex-column)?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex">
  <div>One</div>
  <div>Two</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Items stack vertically",
      "Items align horizontally (default)",
      "No layout change",
      "Items disappear",
    ],
    answer: "Items align horizontally (default)",
  },
  {
    question: (
      <div>
        <p>How will the items be distributed?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-column justify-content-between" style="height: 200px;">
  <div>Top</div>
  <div>Bottom</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Both at top",
      "Both at center",
      "Top at top, bottom at bottom",
      "No effect",
    ],
    answer: "Top at top, bottom at bottom",
  },

  // 5 Normal (Non-CodeBlock) Questions
  {
    question: "Which Bootstrap class name defines a Flexbox Container?",
    options: ["flex", "d-flex", "flexbox-container", "flexbox"],
    answer: "d-flex",
  },
  {
    question:
      "Which Bootstrap class name will move the flex items horizontally?",
    options: ["flex-vertical", "flex-horizontal", "flex-column", "flex-row"],
    answer: "flex-row",
  },
  {
    question:
      "Which Bootstrap class aligns the flex items at the start of a Flexbox Container?",
    options: [
      "justify-content-center",
      "justify-content-end",
      "justify-content-start",
      "justify-content-between",
    ],
    answer: "justify-content-start",
  },
  {
    question:
      "Which Bootstrap class aligns flex items at the center of the container?",
    options: [
      "justify-content-start",
      "justify-content-center",
      "justify-content-end",
      "justify-content-around",
    ],
    answer: "justify-content-center",
  },
  {
    question: "What is the default flex direction when only d-flex is applied?",
    options: ["flex-column", "flex-row", "block", "inline"],
    answer: "flex-row",
  },
];
const Introductionto_BootStrap_MCQ_2 = ({
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
      title="Introduction to Bootstrap part 2 - MCQs"
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

export default Introductionto_BootStrap_MCQ_2;