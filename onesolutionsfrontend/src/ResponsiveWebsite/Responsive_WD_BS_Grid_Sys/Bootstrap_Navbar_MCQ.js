import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>Which HTML element is used as a container for a Navbar?</p>
      </div>
    ),
    options: ["div", "nav", "header", "section"],
    answer: "nav",
  },
  {
    question: (
      <div>
        <p>Which of these is a block-level element?</p>
      </div>
    ),
    options: ["div", "img", "a", "span"],
    answer: "div",
  },
  {
    question: (
      <div>
        <p>What does 'margin: 0 auto;' do?</p>
      </div>
    ),
    options: [
      "Aligns element to left",
      "Aligns element to right",
      "Centers element horizontally",
      "Aligns element to top",
    ],
    answer: "Centers element horizontally",
  },
  {
    question: (
      <div>
        <p>How does this Navbar align its items?</p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Logo</a>
    <ul class="navbar-nav ms-auto">
      <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
      <li class="nav-item"><a class="nav-link" href="#">About</a></li>
    </ul>
  </div>
</nav>`}
        />
      </div>
    ),
    options: [
      "Items aligned to left",
      "Items aligned to right",
      "Items centered",
      "No alignment",
    ],
    answer: "Items aligned to right",
  },
  {
    question: (
      <div>
        <p>What background color does this Navbar have?</p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar navbar-expand-lg bg-primary">
  <!-- Navbar content -->
</nav>`}
        />
      </div>
    ),
    options: ["White", "Blue", "Gray", "Transparent"],
    answer: "Blue",
  },
  {
    question: (
      <div>
        <p>Which class centers this div horizontally?</p>
        <CodeBlock
          language="html"
          code={`<div class="m-auto" style="width: 50%;">Centered Content</div>`}
        />
      </div>
    ),
    options: ["m-0", "m-auto", "ml-auto", "mr-auto"],
    answer: "m-auto",
  },
  {
    question: (
      <div>
        <p>What does this CSS do to the element?</p>
        <CodeBlock
          language="css"
          code={`.block-element {
  margin: 0 auto;
  width: 300px;
}`}
        />
      </div>
    ),
    options: [
      "Aligns to left",
      "Aligns to right",
      "Centers horizontally",
      "Adds top margin",
    ],
    answer: "Centers horizontally",
  },
  {
    question: (
      <div>
        <p>Which Bootstrap class aligns this nav to the left?</p>
        <CodeBlock
          language="html"
          code={`<ul class="navbar-nav mr-auto">
  <!-- Nav items -->
</ul>`}
        />
      </div>
    ),
    options: ["ms-auto", "me-auto", "ml-auto", "mr-auto"],
    answer: "mr-auto",
  },
  {
    question: (
      <div>
        <p>What type of element is 'a' (anchor)?</p>
        <CodeBlock language="html" code={`<a href="#">Link</a>`} />
      </div>
    ),
    options: ["Block-level", "Inline", "Table", "List"],
    answer: "Inline",
  },
  {
    question: (
      <div>
        <p>How is the logo added in this Navbar?</p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar">
  <a class="navbar-brand" href="#">
    <img src="logo.png" alt="Logo">
  </a>
  <!-- Other items -->
</nav>`}
        />
      </div>
    ),
    options: [
      "Using navbar-logo class",
      "Inside navbar-brand",
      "Directly in nav",
      "With brand-img class",
    ],
    answer: "Inside navbar-brand",
  },
];

const Bootstrap_Navbar_MCQ = () => {
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic title="Bootstrap Navbar - MCQs" questions={randomQuestions} />
  );
};

export default Bootstrap_Navbar_MCQ;
