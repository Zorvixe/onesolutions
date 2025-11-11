import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>How do you write a CSS class selector?</p>
      </div>
    ),
    options: ["#myclass", ".myclass", "myclass", "*myclass"],
    answer: ".myclass",
  },
  {
    question: (
      <div>
        <p>
          Which CSS property is <strong>inherited</strong> by child elements?
        </p>
      </div>
    ),
    options: ["margin", "font-family", "border", "width"],
    answer: "font-family",
  },
  {
    question: (
      <div>
        <p>
          Which of these is a <strong>non-inherited</strong> property?
        </p>
      </div>
    ),
    options: ["color", "text-align", "background-color", "font-style"],
    answer: "background-color",
  },
  {
    question: (
      <div>
        <p>Which selector targets this paragraph?</p>
        <CodeBlock
          language="html"
          code={`<p class="highlight">Important text</p>`}
        />
        <CodeBlock language="css" code={`.highlight { color: red; }`} />
      </div>
    ),
    options: ["#highlight", ".highlight", "p", "highlight"],
    answer: ".highlight",
  },
  {
    question: (
      <div>
        <p>Which selector selects this heading?</p>
        <CodeBlock language="html" code={`<h1 id="main-title">Welcome</h1>`} />
      </div>
    ),
    options: ["#main-title", ".main-title", "h1", "*main-title"],
    answer: "#main-title",
  },
  {
    question: (
      <div>
        <p>What color will the span be?</p>
        <CodeBlock
          language="html"
          code={`<div style="color: blue;">
  <span>Inherited color?</span>
</div>`}
        />
      </div>
    ),
    options: ["Black (default)", "Blue (inherited)", "No color", "Red"],
    answer: "Blue (inherited)",
  },
  {
    question: (
      <div>
        <p>Will the child div have a red border?</p>
        <CodeBlock
          language="html"
          code={`<div style="border: 2px solid red;">
  <div>Child div</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Yes, border is inherited",
      "No, border is not inherited",
      "Only if border-inherit is used",
      "Only on hover",
    ],
    answer: "No, border is not inherited",
  },
  {
    question: (
      <div>
        <p>Which selector styles all paragraph tags?</p>
        <CodeBlock
          language="css"
          code={`p {
  font-size: 18px;
}`}
        />
      </div>
    ),
    options: [
      "Type selector",
      "Class selector",
      "ID selector",
      "Universal selector",
    ],
    answer: "Type selector",
  },
  {
    question: (
      <div>
        <p>
          What happens when a parent has <code>font-weight: bold;</code>?
        </p>
        <CodeBlock
          language="html"
          code={`<section style="font-weight: bold;">
  <p>This text is bold</p>
  <span>So is this</span>
</section>`}
        />
      </div>
    ),
    options: [
      "Only p is bold",
      "Only span is bold",
      "Both are bold (inherited)",
      "Neither is bold",
    ],
    answer: "Both are bold (inherited)",
  },
  {
    question: (
      <div>
        <p>Can multiple elements share the same class?</p>
        <CodeBlock
          language="html"
          code={`<p class="alert">Error!</p>
<p class="alert">Warning!</p>`}
        />
      </div>
    ),
    options: [
      "No, classes must be unique",
      "Yes",
      "Only two elements",
      "Only in Bootstrap",
    ],
    answer: "Yes",
  },
];

const Css_Selector_Inheritance_MCQ = ({ subtopicId, goalName, courseName }) => {
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
      title="CSS Selectors & Inheritance - MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default Css_Selector_Inheritance_MCQ;
