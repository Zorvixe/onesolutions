import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>How many columns does the Bootstrap Grid System use?</p>
      </div>
    ),
    options: ["6", "8", "12", "24"],
    answer: "12",
  },
  {
    question: (
      <div>
        <p>Which Bootstrap class is used to define columns?</p>
      </div>
    ),
    options: ["row", "container", "col-*", "grid"],
    answer: "col-*",
  },
  {
    question: (
      <div>
        <p>
          What is the purpose of the <code>container</code> class?
        </p>
      </div>
    ),
    options: [
      "To create columns",
      "To hold rows and columns",
      "To add background color",
      "To make text bold",
    ],
    answer: "To hold rows and columns",
  },
  {
    question: (
      <div>
        <p>What will this column do?</p>
        <CodeBlock
          language="html"
          code={`<div class="col-12">Full Width Content</div>`}
        />
      </div>
    ),
    options: [
      "Takes half the width",
      "Takes full width of the row",
      "Takes only 1 column",
      "No effect",
    ],
    answer: "Takes full width of the row",
  },
  {
    question: (
      <div>
        <p>Where should columns be placed?</p>
        <CodeBlock
          language="html"
          code={`<div class="container">
  <div class="row">
    <!-- Columns go here -->
  </div>
</div>`}
        />
      </div>
    ),
    options: [
      "Directly inside body",
      "Inside a container, outside a row",
      "Inside a row",
      "Inside another column",
    ],
    answer: "Inside a row",
  },
  {
    question: (
      <div>
        <p>What does this structure create?</p>
        <CodeBlock
          language="html"
          code={`<div class="container">
  <div class="row">
    <div class="col-6">Left</div>
    <div class="col-6">Right</div>
  </div>
</div>`}
        />
      </div>
    ),
    options: [
      "One full-width column",
      "Two equal columns side by side",
      "Two stacked columns",
      "Four small columns",
    ],
    answer: "Two equal columns side by side",
  },
  {
    question: (
      <div>
        <p>Which class creates a row that wraps columns?</p>
        <CodeBlock
          language="html"
          code={`<div class="row">
  <div class="col-4">33%</div>
  <div class="col-8">67%</div>
</div>`}
        />
      </div>
    ),
    options: ["container", "row", "col-12", "grid"],
    answer: "row",
  },
  {
    question: (
      <div>
        <p>What is the correct basic grid structure?</p>
        <CodeBlock
          language="html"
          code={`<!-- Option A -->
<div class="container"> <div class="row"> <div class="col-12">Content</div> </div> </div>

<!-- Option B -->
<div class="row"> <div class="container"> <div class="col-12">Content</div> </div> </div>

<!-- Option C -->
<div class="col-12"> <div class="row"> <div class="container">Content</div> </div> </div>`}
        />
      </div>
    ),
    options: ["Option A", "Option B", "Option C", "None are correct"],
    answer: "Option A",
  },
  {
    question: (
      <div>
        <p>How many columns should you specify in total per row?</p>
        <CodeBlock
          language="html"
          code={`<div class="row">
  <div class="col-3">25%</div>
  <div class="col-9">75%</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Exactly 12 columns required",
      "Maximum 10 columns",
      "Any number is fine",
      "Must be less than 12",
    ],
    answer: "Exactly 12 columns required",
  },
  {
    question: (
      <div>
        <p>Can a column use more than 12 as its number?</p>
        <CodeBlock
          language="html"
          code={`<div class="col-15">This is wrong</div>`}
        />
      </div>
    ),
    options: [
      "Yes, it will wrap",
      "No, maximum is 12",
      "Yes, it makes it wider",
      "Only on large screens",
    ],
    answer: "No, maximum is 12",
  },
];

const Introductionto_Responsive_WD_MCQ = ({ subtopicId, goalName, courseName }) => {
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
  };.sort(() => Math.random() - 0.5);

  return (
    <MCQLogic
      title="Introduction to Responsive Web Design - Bootstrap Grid MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default Introductionto_Responsive_WD_MCQ;
