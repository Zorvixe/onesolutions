import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What happens when you place more than 12 columns in a single row?</p>
      </div>
    ),
    options: [
      "The page breaks",
      "Extra columns wrap to a new line",
      "Columns shrink automatically",
      "Bootstrap shows an error",
    ],
    answer: "Extra columns wrap to a new line",
  },
  {
    question: (
      <div>
        <p>Which Bootstrap prefix is used for medium devices ({">="}768px)?</p>
      </div>
    ),
    options: ["col-sm-", "col-md-", "col-lg-", "col-xl-"],
    answer: "col-md-",
  },
  {
    question: (
      <div>
        <p>Bootstrap follows which design approach?</p>
      </div>
    ),
    options: [
      "Desktop First",
      "Mobile First",
      "Tablet First",
      "Large Screen First",
    ],
    answer: "Mobile First",
  },
  {
    question: (
      <div>
        <p>What will happen in this row?</p>
        <CodeBlock
          language="html"
          code={`<div class="row">
  <div class="col-4">One</div>
  <div class="col-4">Two</div>
  <div class="col-6">Three</div>
</div>`}
        />
      </div>
    ),
    options: [
      "All three stay in one line",
      "Third column wraps to next line",
      "Columns overlap",
      "Error in layout",
    ],
    answer: "Third column wraps to next line",
  },
  {
    question: (
      <div>
        <p>How many columns are used here and what happens?</p>
        <CodeBlock
          language="html"
          code={`<div class="row">
  <div class="col-6">A</div>
  <div class="col-4">B</div>
  <div class="col-6">C</div>
  <div class="col-4">D</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Total 12, all in one row",
      "Total 20, so C and D wrap to next line",
      "Only first two show",
      "Layout breaks completely",
    ],
    answer: "Total 20, so C and D wrap to next line",
  },
  {
    question: (
      <div>
        <p>Which class applies to Extra small devices (less than 576px)?</p>
        <CodeBlock
          language="html"
          code={`<div class="col-12">Full on mobile</div>
<div class="col-sm-6">Half on small and up</div>`}
        />
      </div>
    ),
    options: ["col-", "col-sm-", "col-md-", "col-lg-"],
    answer: "col-",
  },
  {
    question: (
      <div>
        <p>What does this class mean?</p>
        <CodeBlock
          language="html"
          code={`<div class="col-lg-8">Content</div>`}
        />
      </div>
    ),
    options: [
      "8 columns on all devices",
      "8 columns only on large devices ({'>='}992px) and up",
      "8 columns only on mobile",
      "8 columns starting from small devices",
    ],
    answer: "8 columns only on large devices ({'>='}992px) and up",
  },
  {
    question: (
      <div>
        <p>
          Correct the layout: We want 3 equal columns on medium and larger
          screens
        </p>
        <CodeBlock
          language="html"
          code={`<!-- Which is correct? -->
<div class="row">
  <div class="col-4">1</div>
  <div class="col-4">2</div>
  <div class="col-4">3</div>
</div>

<!-- OR -->
<div class="row">
  <div class="col-md-4">1</div>
  <div class="col-md-4">2</div>
  <div class="col-md-4">3</div>
</div>`}
        />
      </div>
    ),
    options: [
      "First one – col-4 works everywhere",
      "Second one – col-md-4 for medium and up",
      "Both are wrong",
      "Both are correct but different behavior",
    ],
    answer: "Second one – col-md-4 for medium and up",
  },
  {
    question: (
      <div>
        <p>What layout do you get on small phones?</p>
        <CodeBlock
          language="html"
          code={`<div class="row">
  <div class="col-12 col-md-6">Left</div>
  <div class="col-12 col-md-6">Right</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Two side-by-side columns",
      "Two full-width stacked columns",
      "One column disappears",
      "Layout breaks",
    ],
    answer: "Two full-width stacked columns",
  },
  {
    question: (
      <div>
        <p>Which prefix targets screens {">="}1200px?</p>
        <CodeBlock
          language="html"
          code={`<div class="col-xl-3">25% on XL</div>`}
        />
      </div>
    ),
    options: ["col-lg-", "col-xl-", "col-xxl-", "col-md-"],
    answer: "col-xl-",
  },
];

const Bootstrap_Grid_Sys_MCQ_1 = ({ subtopicId, goalName, courseName }) => {
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
      title="Bootstrap Grid System - Wrapping & Breakpoints MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default Bootstrap_Grid_Sys_MCQ_1;
