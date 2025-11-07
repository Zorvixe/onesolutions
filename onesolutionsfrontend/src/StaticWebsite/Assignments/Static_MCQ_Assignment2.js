import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 7 CodeBlock Questions (covering all Bootstrap subtopics) ==========
  {
    question: (
      <div>
        <p>What Bootstrap class creates a primary button?</p>
        <CodeBlock
          language="html"
          code={`<button class="btn btn-primary">Primary</button>`}
        />
      </div>
    ),
    options: [
      "btn btn-success",
      "btn btn-primary",
      "btn btn-danger",
      "btn btn-light",
    ],
    answer: "btn btn-primary",
  },
  {
    question: (
      <div>
        <p>What does this flexbox code do?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex justify-content-center">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Aligns items to the left",
      "Centers items horizontally",
      "Makes vertical column",
      "Adds space between",
    ],
    answer: "Centers items horizontally",
  },
  {
    question: (
      <div>
        <p>Which class makes an outline button?</p>
        <CodeBlock
          language="html"
          code={`<button class="btn btn-outline-warning">Warning</button>`}
        />
      </div>
    ),
    options: [
      "btn btn-warning",
      "btn-outline btn-warning",
      "btn btn-outline-warning",
      "outline-warning",
    ],
    answer: "btn btn-outline-warning",
  },
  {
    question: (
      <div>
        <p>What background color does this apply?</p>
        <CodeBlock
          language="html"
          code={`<div class="bg-success text-white">Success Message</div>`}
        />
      </div>
    ),
    options: ["Red", "Green", "Blue", "Yellow"],
    answer: "Green",
  },
  {
    question: (
      <div>
        <p>How to make text uppercase?</p>
        <CodeBlock
          language="html"
          code={`<p class="text-uppercase">hello world</p>`}
        />
      </div>
    ),
    options: [
      "text-lowercase",
      "text-capitalize",
      "text-uppercase",
      "text-bold",
    ],
    answer: "text-uppercase",
  },
  {
    question: (
      <div>
        <p>What is required for multiple carousels?</p>
        <CodeBlock
          language="html"
          code={`<div id="carousel1" class="carousel slide">...</div>
<div id="carousel2" class="carousel slide">...</div>`}
        />
      </div>
    ),
    options: [
      "Same id",
      "Unique id for each",
      "No id needed",
      "Only one carousel allowed",
    ],
    answer: "Unique id for each",
  },
  {
    question: (
      <div>
        <p>What does this YouTube embed show?</p>
        <CodeBlock
          language="html"
          code={`<div class="embed-responsive embed-responsive-16by9">
  <iframe src="https://www.youtube.com/embed/ABC123"></iframe>
</div>`}
        />
      </div>
    ),
    options: [
      "Square video",
      "16:9 widescreen video",
      "Full screen only",
      "No video",
    ],
    answer: "16:9 widescreen video",
  },

  // ========== 3 Classic MCQs from Bootstrap subtopics ==========
  {
    question: "Which class defines a flex container in Bootstrap?",
    options: ["flex", "d-flex", "container-flex", "flexbox"],
    answer: "d-flex",
  },
  {
    question:
      "To create an outline button, replace 'btn' with 'btn-outline' in the class name.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    question: "Which class aligns flex items vertically in the center?",
    options: [
      "justify-content-center",
      "align-items-center",
      "flex-column justify-content-center",
      "text-center",
    ],
    answer: "flex-column justify-content-center",
  },
];

const Static_MCQ_Assignment2 = () => {
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic
      title="Bootstrap All Subtopics - Assignment MCQs"
      questions={randomQuestions}
    />
  );
};

export default Static_MCQ_Assignment2;
