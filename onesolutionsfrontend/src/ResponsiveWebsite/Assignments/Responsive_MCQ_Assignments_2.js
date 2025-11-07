import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>
          What does <strong>CSS Specificity</strong> determine?
        </p>
      </div>
    ),
    options: [
      "Which style rule wins when multiple apply",
      "How styles are inherited",
      "Browser rendering speed",
      "File size",
    ],
    answer: "Which style rule wins when multiple apply",
  },
  {
    question: (
      <div>
        <p>
          Which selector has the <strong>highest specificity</strong>?
        </p>
      </div>
    ),
    options: ["#header", ".title", "h1", "div p"],
    answer: "#header",
  },
  {
    question: (
      <div>
        <p>What will be the color of the text?</p>
        <CodeBlock
          language="html"
          code={`<style>
  .alert { color: red; }
  p { color: blue; }
</style>
<p class="alert">Warning!</p>`}
        />
      </div>
    ),
    options: ["blue", "red", "black", "green"],
    answer: "red",
  },
  {
    question: (
      <div>
        <p>Which wins if two rules have same specificity?</p>
      </div>
    ),
    options: [
      "The one written first",
      "The one written last (Cascade)",
      "The one with !important",
      "Browser chooses",
    ],
    answer: "The one written last (Cascade)",
  },
  {
    question: (
      <div>
        <p>
          What does <code>!important</code> do?
        </p>
      </div>
    ),
    options: [
      "Increases specificity dramatically",
      "Makes text bold",
      "Forces inheritance",
      "Invalid syntax",
    ],
    answer: "Increases specificity dramatically",
  },
  {
    question: (
      <div>
        <p>
          Which property is <strong>inherited</strong>?
        </p>
      </div>
    ),
    options: ["margin", "color", "border", "padding"],
    answer: "color",
  },
  {
    question: (
      <div>
        <p>Will this span be blue?</p>
        <CodeBlock
          language="html"
          code={`<div style="color: blue;">
  <span>Text</span>
</div>`}
        />
      </div>
    ),
    options: ["Yes", "No", "Only if span has color", "Only on hover"],
    answer: "Yes",
  },
  {
    question: (
      <div>
        <p>
          Which is <strong>NOT inherited</strong>?
        </p>
      </div>
    ),
    options: ["font-family", "text-align", "background-color", "line-height"],
    answer: "background-color",
  },
  {
    question: (
      <div>
        <p>
          What does <strong>CSS Cascade</strong> mean?
        </p>
      </div>
    ),
    options: [
      "Styles flow down",
      "Order of rule application",
      "Animation sequence",
      "Browser fallback",
    ],
    answer: "Order of rule application",
  },
  {
    question: (
      <div>
        <p>Which has highest priority?</p>
      </div>
    ),
    options: ["Inline style", "ID selector", "External CSS", "Browser default"],
    answer: "Inline style",
  },
  {
    question: (
      <div>
        <p>What is the correct order of specificity (low to high)?</p>
      </div>
    ),
    options: [
      "Type → Class → ID",
      "ID → Class → Type",
      "Class → ID → Type",
      "All same",
    ],
    answer: "Type → Class → ID",
  },
  {
    question: (
      <div>
        <p>Can multiple elements have the same ID?</p>
      </div>
    ),
    options: ["Yes", "No (invalid HTML)", "Only in Bootstrap", "Only in React"],
    answer: "No (invalid HTML)",
  },
  {
    question: (
      <div>
        <p>Can multiple elements share a class?</p>
      </div>
    ),
    options: ["No", "Yes", "Only two", "Only in lists"],
    answer: "Yes",
  },
  {
    question: (
      <div>
        <p>
          What does <code>display: block</code> do?
        </p>
      </div>
    ),
    options: [
      "Takes full width, starts new line",
      "Takes only needed width",
      "Hides element",
      "Makes it float",
    ],
    answer: "Takes full width, starts new line",
  },
  {
    question: (
      <div>
        <p>
          Which is an <strong>inline</strong> element?
        </p>
      </div>
    ),
    options: ["div", "p", "span", "section"],
    answer: "span",
  },
  {
    question: (
      <div>
        <p>
          What does <code>display: flex</code> create?
        </p>
      </div>
    ),
    options: [
      "Flex container",
      "Grid container",
      "Block element",
      "Inline element",
    ],
    answer: "Flex container",
  },
  {
    question: (
      <div>
        <p>Default flex direction?</p>
      </div>
    ),
    options: ["column", "row", "row-reverse", "column-reverse"],
    answer: "row",
  },
  {
    question: (
      <div>
        <p>
          What does <code>justify-content: center</code> do?
        </p>
      </div>
    ),
    options: [
      "Centers along main axis",
      "Centers along cross axis",
      "Stretches items",
      "Aligns to start",
    ],
    answer: "Centers along main axis",
  },
  {
    question: (
      <div>
        <p>
          What does <code>align-items: center</code> do?
        </p>
      </div>
    ),
    options: [
      "Centers along cross axis",
      "Centers along main axis",
      "Stretches",
      "Baseline alignment",
    ],
    answer: "Centers along cross axis",
  },
  {
    question: (
      <div>
        <p>How to center content vertically in flex?</p>
      </div>
    ),
    options: [
      "align-items: center",
      "justify-content: center",
      "margin: auto",
      "text-align: center",
    ],
    answer: "align-items: center",
  },
  {
    question: (
      <div>
        <p>How to center both horizontally and vertically?</p>
      </div>
    ),
    options: [
      "justify-content: center; align-items: center",
      "margin: auto",
      "text-align: center; vertical-align: middle",
      "position: center",
    ],
    answer: "justify-content: center; align-items: center",
  },
  {
    question: (
      <div>
        <p>
          What does <code>flex: 1</code> mean?
        </p>
      </div>
    ),
    options: [
      "flex-grow: 1; flex-shrink: 1; flex-basis: 0%",
      "flex-grow: 1 only",
      "width: 100%",
      "height: 100%",
    ],
    answer: "flex-grow: 1; flex-shrink: 1; flex-basis: 0%",
  },
  {
    question: (
      <div>
        <p>
          What does <code>flex-wrap: wrap</code> do?
        </p>
      </div>
    ),
    options: [
      "Allows items to wrap to next line",
      "Keeps all in one line",
      "Hides overflow",
      "Invalid",
    ],
    answer: "Allows items to wrap to next line",
  },
  {
    question: (
      <div>
        <p>
          What does <code>order: 2</code> do?
        </p>
      </div>
    ),
    options: [
      "Changes visual order",
      "Changes HTML source order",
      "Increases size",
      "Hides item",
    ],
    answer: "Changes visual order",
  },
  {
    question: (
      <div>
        <p>
          What does <code>gap: 20px</code> do in flex?
        </p>
      </div>
    ),
    options: [
      "Adds space between items",
      "Adds margin to container",
      "Adds padding inside items",
      "Does nothing",
    ],
    answer: "Adds space between items",
  },
  {
    question: (
      <div>
        <p>Which creates a 2-column layout?</p>
      </div>
    ),
    options: [
      "display: grid; grid-template-columns: 1fr 1fr",
      "display: flex; flex-direction: row",
      "Both",
      "Only flex",
    ],
    answer: "Both",
  },
  {
    question: (
      <div>
        <p>
          What does <code>display: grid</code> create?
        </p>
      </div>
    ),
    options: ["Grid container", "Flex container", "Block element", "Table"],
    answer: "Grid container",
  },
  {
    question: (
      <div>
        <p>How to define 3 equal columns in grid?</p>
      </div>
    ),
    options: [
      "grid-template-columns: 1fr 1fr 1fr",
      "grid-template-columns: repeat(3, 1fr)",
      "Both",
      "grid-columns: 3",
    ],
    answer: "Both",
  },
  {
    question: (
      <div>
        <p>
          What does <code>grid-gap: 1rem</code> do?
        </p>
      </div>
    ),
    options: [
      "Space between grid items",
      "Margin around container",
      "Padding inside items",
      "Invalid",
    ],
    answer: "Space between grid items",
  },
  {
    question: (
      <div>
        <p>How to span an item across 2 columns?</p>
      </div>
    ),
    options: [
      "grid-column: span 2",
      "grid-column: 1 / 3",
      "Both",
      "width: 200%",
    ],
    answer: "Both",
  },
  {
    question: (
      <div>
        <p>
          What does <code>place-items: center</code> do?
        </p>
      </div>
    ),
    options: [
      "align-items: center; justify-items: center",
      "Centers text only",
      "Invalid",
      "Only for flex",
    ],
    answer: "align-items: center; justify-items: center",
  },
  {
    question: (
      <div>
        <p>Which is better for complex 2D layouts?</p>
      </div>
    ),
    options: ["Flexbox", "CSS Grid", "Both same", "Float"],
    answer: "CSS Grid",
  },
  {
    question: (
      <div>
        <p>Which is better for 1D layouts (rows/columns)?</p>
      </div>
    ),
    options: ["Flexbox", "CSS Grid", "Both", "Tables"],
    answer: "Flexbox",
  },
  {
    question: (
      <div>
        <p>
          What does <code>position: relative</code> do?
        </p>
      </div>
    ),
    options: [
      "Positions relative to its normal position",
      "Removes from flow",
      "Fixes to viewport",
      "Nothing",
    ],
    answer: "Positions relative to its normal position",
  },
  {
    question: (
      <div>
        <p>
          What does <code>position: absolute</code> do?
        </p>
      </div>
    ),
    options: [
      "Removes from document flow",
      "Keeps in flow",
      "Floats",
      "Becomes inline",
    ],
    answer: "Removes from document flow",
  },
  {
    question: (
      <div>
        <p>Where is absolute positioned element placed?</p>
      </div>
    ),
    options: ["Nearest positioned ancestor", "Parent div", "Body", "Viewport"],
    answer: "Nearest positioned ancestor",
  },
  {
    question: (
      <div>
        <p>What makes an ancestor "positioned"?</p>
      </div>
    ),
    options: [
      "position: relative/absolute/fixed/sticky",
      "display: block",
      "width/height set",
      "Any div",
    ],
    answer: "position: relative/absolute/fixed/sticky",
  },
];

const Responsive_MCQ_Assignments_2 = () => {
  const randomQuestions = [...questionsData]
    .sort(() => Math.random() - 0.5)
    .slice(0, 30);

  return (
    <MCQLogic
      title="Responsive MCQ Assignments 2"
      questions={randomQuestions}
      showScore={true}
      allowReview={true}
      timeLimit={1800} // 30 minutes
    />
  );
};

export default Responsive_MCQ_Assignments_2;
