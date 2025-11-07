import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 7 CodeBlock Questions ==========
  {
    question: (
      <div>
        <p>What does this CSS rule do?</p>
        <CodeBlock
          language="css"
          code={`.box {
  padding: 20px;
  margin: 15px;
  border: 5px solid blue;
}`}
        />
        <CodeBlock language="html" code={`<div class="box">Content</div>`} />
      </div>
    ),
    options: [
      "Adds space inside the border",
      "Adds space outside the element",
      "Both A and B",
      "Changes text color",
    ],
    answer: "Both A and B",
  },
  {
    question: (
      <div>
        <p>What will be the total width of this element?</p>
        <CodeBlock
          language="css"
          code={`.card {
  width: 300px;
  padding: 20px;
  border: 10px solid black;
  margin: 30px;
}`}
        />
      </div>
    ),
    options: ["300px", "340px", "380px", "400px"],
    answer: "380px",
  },
  {
    question: (
      <div>
        <p>Which property controls space between content and border?</p>
        <CodeBlock
          language="css"
          code={`.btn {
  padding: 15px 30px;
}`}
        />
      </div>
    ),
    options: ["margin", "border", "padding", "gap"],
    answer: "padding",
  },
  {
    question: (
      <div>
        <p>What happens if you forget border-style?</p>
        <CodeBlock
          language="css"
          code={`.warning {
  border-width: 4px;
  border-color: red;
}`}
        />
      </div>
    ),
    options: [
      "Red border appears",
      "No border visible",
      "Dashed border",
      "Only on button",
    ],
    answer: "No border visible",
  },
  {
    question: (
      <div>
        <p>What is the final height of this element?</p>
        <CodeBlock
          language="css"
          code={`.hero {
  height: 200px;
  padding-top: 50px;
  padding-bottom: 50px;
  border-top: 10px solid gold;
  border-bottom: 10px solid gold;
}`}
        />
      </div>
    ),
    options: ["200px", "300px", "320px", "270px"],
    answer: "320px",
  },
  {
    question: (
      <div>
        <p>Which creates rounded corners?</p>
        <CodeBlock
          language="css"
          code={`.pill {
  border-radius: 50px;
}`}
        />
      </div>
    ),
    options: ["border-style", "border-radius", "border-width", "border-color"],
    answer: "border-radius",
  },
  {
    question: (
      <div>
        <p>What does this shorthand do?</p>
        <CodeBlock
          language="css"
          code={`.card {
  border: 2px dashed #25b1cc;
}`}
        />
      </div>
    ),
    options: [
      "Sets width, style, color",
      "Only color",
      "Only style",
      "Removes border",
    ],
    answer: "Sets width, style, color",
  },

  // ========== 3 Exact MCQs from Introduction to HTML & CSS + Box Model ==========
  {
    question: "Which CSS property adds space between elements?",
    options: ["padding", "margin", "border", "gap"],
    answer: "margin",
  },
  {
    question:
      "The CSS Box Model consists of: content, padding, border, and margin.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    question:
      "What is the correct order in the box model from inside to outside?",
    options: [
      "Margin → Border → Padding → Content",
      "Content → Padding → Border → Margin",
      "Border → Padding → Content → Margin",
      "Padding → Content → Border → Margin",
    ],
    answer: "Content → Padding → Border → Margin",
  },
];

const Static_MCQ_Assignment1 = () => {
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic title="Static MCQ Assignment 1" questions={randomQuestions} />
  );
};

export default Static_MCQ_Assignment1;
