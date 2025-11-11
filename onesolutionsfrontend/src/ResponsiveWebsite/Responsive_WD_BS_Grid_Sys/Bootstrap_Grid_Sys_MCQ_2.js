import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>
          Which CSS property is used to get spacing <strong>between</strong>{" "}
          elements?
        </p>
      </div>
    ),
    options: ["padding", "margin", "border", "spacing"],
    answer: "margin",
  },
  {
    question: (
      <div>
        <p>What Bootstrap class is used for top margin?</p>
      </div>
    ),
    options: ["mt-*", "mb-*", "m-*", "ml-*"],
    answer: "mt-*",
  },
  {
    question: (
      <div>
        <p>What Bootstrap class is used for left padding?</p>
      </div>
    ),
    options: ["pl-*", "pr-*", "pt-*", "pb-*"],
    answer: "pl-*",
  },
  {
    question: (
      <div>
        <p>How much spacing does this class add?</p>
        <CodeBlock
          language="html"
          code={`<div class="mt-3">Top Margin</div>`}
        />
      </div>
    ),
    options: ["4px", "16px", "24px", "48px"],
    answer: "16px",
  },
  {
    question: (
      <div>
        <p>What does this class combination do?</p>
        <CodeBlock
          language="html"
          code={`<div class="p-4 bg-primary text-white">
  Padded Primary Box
</div>`}
        />
      </div>
    ),
    options: [
      "No padding, blue background",
      "24px padding all sides, blue background, white text",
      "Only background color",
      "Only white text",
    ],
    answer: "24px padding all sides, blue background, white text",
  },
  {
    question: (
      <div>
        <p>Which class adds 48px margin on all sides?</p>
        <CodeBlock language="html" code={`<div class="m-5">Big Margin</div>`} />
      </div>
    ),
    options: ["m-3", "m-4", "m-5", "mt-5"],
    answer: "m-5",
  },
  {
    question: (
      <div>
        <p>What will this button look like?</p>
        <CodeBlock
          language="html"
          code={`<button class="btn bg-success text-white p-3">
  Success Button
</button>`}
        />
      </div>
    ),
    options: [
      "Green background, white text, large padding",
      "Red background, no padding",
      "No background, small text",
      "Gray button with border",
    ],
    answer: "Green background, white text, large padding",
  },
  {
    question: (
      <div>
        <p>Which class adds bottom padding of 1.5rem?</p>
        <CodeBlock
          language="html"
          code={`<div class="pb-4">Bottom Padding</div>`}
        />
      </div>
    ),
    options: ["pb-3", "pb-4", "p-4", "mb-4"],
    answer: "pb-4",
  },
  {
    question: (
      <div>
        <p>Can background color classes be used on any HTML element?</p>
        <CodeBlock
          language="html"
          code={`<p class="bg-warning">Warning Paragraph</p>
<span class="bg-danger text-white">Alert</span>
<div class="bg-info p-2">Info Box</div>`}
        />
      </div>
    ),
    options: [
      "Only on div elements",
      "Only on buttons",
      "Yes, on all HTML elements",
      "Only on headings",
    ],
    answer: "Yes, on all HTML elements",
  },
  {
    question: (
      <div>
        <p>Which class adds right margin of 0.5rem?</p>
        <CodeBlock
          language="html"
          code={`<button class="mr-2">Button 1</button>
<button>Button 2</button>`}
        />
      </div>
    ),
    options: ["ml-2", "mr-2", "m-2", "mt-2"],
    answer: "mr-2",
  },
];

const Bootstrap_Grid_Sys_MCQ_2 = ({ subtopicId, goalName, courseName }) => {
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
      title="Bootstrap Spacing, Padding & Background Utilities - MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default Bootstrap_Grid_Sys_MCQ_2;
