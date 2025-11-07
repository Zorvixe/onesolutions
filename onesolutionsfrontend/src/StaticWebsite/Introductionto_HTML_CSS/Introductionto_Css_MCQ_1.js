import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>Which HTML element is used as a container in the following code?</p>
        <CodeBlock
          language="html"
          code={`<div>
  <h1>Tourism</h1>
  <p>Plan your trip wherever you want to go</p>
  <button>Get Started</button>
</div>`}
        />
      </div>
    ),
    options: ["<span>", "<section>", "<div>", "<article>"],
    answer: "<div>",
  },
  {
    question: (
      <div>
        <p>
          Refer to the given CSS code. Which of the following is a CSS Property?
        </p>
        <CodeBlock
          language="css"
          code={`.h-center {
  text-align: center;
}`}
        />
      </div>
    ),
    options: [".h-center", "center", "text-align", ":"],
    answer: "text-align",
  },
  {
    question: (
      <div>
        <p>What does this CSS rule do to the text?</p>
        <CodeBlock
          language="css"
          code={`.header {
  text-align: center;
}`}
        />
      </div>
    ),
    options: [
      "Aligns text to the left",
      "Aligns text to the right",
      "Centers the text horizontally",
      "Makes text italic",
    ],
    answer: "Centers the text horizontally",
  },
  {
    question: (
      <div>
        <p>
          In the CSS code below, what is the value of the text-align property?
        </p>
        <CodeBlock
          language="css"
          code={`.h-right {
  text-align: right;
}`}
        />
      </div>
    ),
    options: ["h-right", "right", ".h-right", "text-align"],
    answer: "right",
  },
  {
    question: (
      <div>
        <p>
          Observe the CSS selector and property. What will happen to elements
          with class "end"?
        </p>
        <CodeBlock
          language="css"
          code={`.end {
  text-align: right;
}`}
        />
      </div>
    ),
    options: [
      "Text will be centered",
      "Text will be aligned to the right",
      "Text will be aligned to the left",
      "Text will disappear",
    ],
    answer: "Text will be aligned to the right",
  },
  {
    question: (
      <div>
        <p>Which part of this CSS rule is the selector?</p>
        <CodeBlock
          language="css"
          code={`.h-center {
  text-align: center;
}`}
        />
      </div>
    ),
    options: ["text-align", "center", ".h-center", "{"],
    answer: ".h-center",
  },
  {
    question: (
      <div>
        <p>What is the correct syntax for a CSS property-value pair?</p>
        <CodeBlock language="css" code={`text-align: center;`} />
      </div>
    ),
    options: [
      "text-align = center",
      "text-align: center;",
      "text-align center",
      "text-align {center}",
    ],
    answer: "text-align: center;",
  },
  {
    question:
      "Which HTML element is primarily used as a generic container for grouping content?",
    options: ["<span>", "<section>", "<div>", "<main>"],
    answer: "<div>",
  },
  {
    question:
      "Which of the following is NOT a valid value for the CSS text-align property?",
    options: ["left", "center", "justify", "middle"],
    answer: "middle",
  },
  {
    question:
      "In CSS, the text-align property controls the ______ alignment of text.",
    options: ["vertical", "horizontal", "diagonal", "circular"],
    answer: "horizontal",
  },
];

const CSS_Cheat_Sheet_MCQ = () => {
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic title="Introduction to CSS - MCQs" questions={randomQuestions} />
  );
};

export default CSS_Cheat_Sheet_MCQ;
