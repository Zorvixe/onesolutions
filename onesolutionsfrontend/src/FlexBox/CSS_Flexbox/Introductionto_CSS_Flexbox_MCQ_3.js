import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What does the align-self property do in a Flexbox layout?</p>
      </div>
    ),
    options: [
      "Defines how flex items grow",
      "Aligns individual flex items along the cross axis",
      "Sets spacing between items",
      "Aligns all items along the main axis",
    ],
    answer: "Aligns individual flex items along the cross axis",
  },
  {
    question: (
      <div>
        <p>
          Which of the following is the default value of the align-self
          property?
        </p>
      </div>
    ),
    options: ["stretch", "auto", "center", "flex-start"],
    answer: "auto",
  },
  {
    question: (
      <div>
        <p>If align-self is set to auto, what value does it inherit?</p>
      </div>
    ),
    options: [
      "The flex-direction value",
      "The justify-content value",
      "The align-items value of its container",
      "The order value of the parent",
    ],
    answer: "The align-items value of its container",
  },
  {
    question: (
      <div>
        <p>
          Which align-self value places the item at the start of the cross axis?
        </p>
      </div>
    ),
    options: ["center", "flex-end", "stretch", "flex-start"],
    answer: "flex-start",
  },
  {
    question: (
      <div>
        <p>What is the purpose of the order property in Flexbox?</p>
      </div>
    ),
    options: [
      "To change the flex direction",
      "To change the visual order of flex items",
      "To align items vertically",
      "To control the spacing between flex items",
    ],
    answer: "To change the visual order of flex items",
  },
  {
    question: (
      <div>
        <p>What is the default order value for all flex items?</p>
      </div>
    ),
    options: ["1", "0", "-1", "auto"],
    answer: "0",
  },
  {
    question: (
      <div>
        <p>If two elements have the same order value, how are they arranged?</p>
      </div>
    ),
    options: [
      "Alphabetically by class name",
      "By their content length",
      "Based on their position in the HTML source code",
      "Randomly",
    ],
    answer: "Based on their position in the HTML source code",
  },
  {
    question: (
      <div>
        <p>
          Which of the following is a valid CSS syntax for the order property?
        </p>
        <CodeBlock language="css" code={`.box1 {\n  order: 2;\n}`} />
      </div>
    ),
    options: ["order = 2;", "setOrder(2);", "order: 2;", "flex-order: 2;"],
    answer: "order: 2;",
  },
  {
    question: (
      <div>
        <p>
          Which of the following align-self values will stretch the flex item to
          fill the container?
        </p>
      </div>
    ),
    options: ["stretch", "center", "flex-end", "auto"],
    answer: "stretch",
  },
  {
    question: (
      <div>
        <p>What happens if you apply a negative value to the order property?</p>
      </div>
    ),
    options: [
      "The item will move before items with order 0",
      "The item will be hidden",
      "It throws a CSS error",
      "It is ignored by the browser",
    ],
    answer: "The item will move before items with order 0",
  },
];

const Introductionto_CSS_Flexbox_MCQ_3 = () => {
  return (
    <MCQLogic
      title="Introduction to CSS Flexbox | Part 3 - MCQs"
      questions={questionsData}
    />
  );
};

export default Introductionto_CSS_Flexbox_MCQ_3;
