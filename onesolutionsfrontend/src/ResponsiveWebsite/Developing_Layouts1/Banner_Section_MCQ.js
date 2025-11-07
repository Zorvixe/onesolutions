import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>
          What is the purpose of the Bootstrap <code>container</code> class?
        </p>
      </div>
    ),
    options: [
      "Makes content full width",
      "Adds fixed max-width with left/right spacing",
      "Centers text only",
      "Adds background color",
    ],
    answer: "Adds fixed max-width with left/right spacing",
  },
  {
    question: (
      <div>
        <p>Which class creates a full-width container with no side spacing?</p>
      </div>
    ),
    options: [
      "container",
      "container-fluid",
      "container-full",
      "container-wide",
    ],
    answer: "container-fluid",
  },
  {
    question: (
      <div>
        <p>
          What does the <code>bg-transparent</code> class do?
        </p>
      </div>
    ),
    options: [
      "Makes text invisible",
      "Removes background color completely",
      "Adds white background",
      "Makes element disappear",
    ],
    answer: "Removes background color completely",
  },
  {
    question: (
      <div>
        <p>
          What max-width does <code>container</code> have on Large devices (
          {">="}992px)?
        </p>
      </div>
    ),
    options: ["720px", "960px", "1140px", "100%"],
    answer: "960px",
  },
  {
    question: (
      <div>
        <p>
          Which container should be used inside a Navbar for proper alignment?
        </p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar navbar-expand-lg bg-dark navbar-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Logo</a>
    <!-- nav items -->
  </div>
</nav>`}
        />
      </div>
    ),
    options: [
      "container only",
      "container-fluid only",
      "Either works the same",
      "No container needed",
    ],
    answer: "container-fluid only",
  },
  {
    question: (
      <div>
        <p>What will this banner background look like?</p>
        <CodeBlock
          language="html"
          code={`<section class="bg-primary text-white py-5">
  <div class="container">
    <h1>Welcome</h1>
  </div>
</section>`}
        />
      </div>
    ),
    options: [
      "Transparent background",
      "Blue background with padding",
      "No background",
      "White background",
    ],
    answer: "Blue background with padding",
  },
  {
    question: (
      <div>
        <p>
          Why use <code>container-fluid</code> in this hero section?
        </p>
        <CodeBlock
          language="html"
          code={`<div class="bg-image vh-100">
  <div class="container-fluid h-100 d-flex align-items-center">
    <div class="container">
      <h1>Full Width Banner</h1>
    </div>
  </div>
</div>`}
        />
      </div>
    ),
    options: [
      "To add side margins",
      "To make outer div full width",
      "To center text",
      "To reduce width",
    ],
    answer: "To make outer div full width",
  },
  {
    question: (
      <div>
        <p>Which class makes this overlay transparent?</p>
        <CodeBlock
          language="html"
          code={`<div class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>`}
        />
        <CodeBlock language="html" code={`<!-- Alternative -->`} />
        <CodeBlock
          language="html"
          code={`<div class="bg-transparent">No overlay</div>`}
        />
      </div>
    ),
    options: ["bg-dark", "opacity-50", "bg-transparent", "position-absolute"],
    answer: "bg-transparent",
  },
  {
    question: (
      <div>
        <p>
          What happens on Extra small devices (&lt; 576px) with{" "}
          <code>container</code>?
        </p>
      </div>
    ),
    options: [
      "Fixed width of 540px",
      "Full width (100%)",
      "Width of 720px",
      "No width applied",
    ],
    answer: "Full width (100%)",
  },
  {
    question: (
      <div>
        <p>Best practice for a full-width banner with centered content?</p>
        <CodeBlock
          language="html"
          code={`<section class="bg-light py-5">
  <div class="container-fluid bg-primary text-white">
    <div class="container text-center">
      <h1>Centered in Full Width</h1>
    </div>
  </div>
</section>`}
        />
      </div>
    ),
    options: [
      "Use container everywhere",
      "Use container-fluid outer + container inner",
      "Use only container-fluid",
      "No container needed",
    ],
    answer: "Use container-fluid outer + container inner",
  },
];

const Banner_Section_MCQ = () => {
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic
      title="Banner Section - Navbar, Containers & Transparent Background MCQs"
      questions={randomQuestions}
    />
  );
};

export default Banner_Section_MCQ;
