import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
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
    answer: "Horizontally (row)",
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
    answer: "Vertical column",
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
];

const Introductionto_BootStrap_MCQ_2 = ({
  subtopicId,
  goalName,
  courseName,
}) => {
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
      title="Introduction to Bootstrap part 2 - MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default Introductionto_BootStrap_MCQ_2;
