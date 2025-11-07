import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>
          What is the default Bootstrap spacer value used in padding/margin
          utilities?
        </p>
      </div>
    ),
    options: ["10px", "16px", "20px", "1rem"],
    answer: "16px",
  },
  {
    question: (
      <div>
        <p>Which class adds 24px padding on all sides?</p>
      </div>
    ),
    options: ["p-2", "p-3", "p-4", "p-5"],
    answer: "p-4",
  },
  {
    question: (
      <div>
        <p>
          What type of HTML element is <code>&lt;span&gt;</code>?
        </p>
      </div>
    ),
    options: ["Block-level", "Inline", "Table", "List"],
    answer: "Inline",
  },
  {
    question: (
      <div>
        <p>
          How much padding does <code>pt-3</code> add?
        </p>
        <CodeBlock
          language="html"
          code={`<div class="pt-3">Top padding applied</div>`}
        />
      </div>
    ),
    options: ["4px", "8px", "16px", "24px"],
    answer: "16px",
  },
  {
    question: (
      <div>
        <p>Which class adds padding only to the left side?</p>
        <CodeBlock
          language="html"
          code={`<div class="pl-5">Left padding 48px</div>`}
        />
      </div>
    ),
    options: ["pr-5", "pl-5", "pt-5", "pb-5"],
    answer: "pl-5",
  },
  {
    question: (
      <div>
        <p>What will this spacing combination do?</p>
        <CodeBlock
          language="html"
          code={`<section class="py-5 px-4 bg-light">
  <div class="text-center">
    <h2>Why Choose Us</h2>
  </div>
</section>`}
        />
      </div>
    ),
    options: [
      "Padding only top and bottom",
      "Padding all sides",
      "Vertical and horizontal padding (py + px)",
      "No padding",
    ],
    answer: "Vertical and horizontal padding (py + px)",
  },
  {
    question: (
      <div>
        <p>
          Why use <code>&lt;span&gt;</code> for styling this text?
        </p>
        <CodeBlock
          language="html"
          code={`<p>We are <span class="text-primary fw-bold">trusted</span> by 1000+ clients.</p>`}
        />
      </div>
    ),
    options: [
      "Because span is block-level",
      "To style part of text inline without breaking flow",
      "Span adds automatic padding",
      "Only span accepts classes",
    ],
    answer: "To style part of text inline without breaking flow",
  },
  {
    question: (
      <div>
        <p>Which class adds 48px padding to the bottom?</p>
        <CodeBlock
          language="html"
          code={`<div class="pb-5">Large bottom space</div>`}
        />
      </div>
    ),
    options: ["pb-3", "pb-4", "pb-5", "p-5"],
    answer: "pb-5",
  },
  {
    question: (
      <div>
        <p>Best way to add inner spacing to a card-like section?</p>
        <CodeBlock
          language="html"
          code={`<div class="bg-white shadow p-4 rounded">
  <h3>Premium Quality</h3>
  <p>We deliver excellence.</p>
</div>`}
        />
      </div>
    ),
    options: [
      "Use margin instead",
      "Use p-4 (or p-*) for inner padding",
      "Use container class",
      "No padding needed",
    ],
    answer: "Use p-4 (or p-*) for inner padding",
  },
  {
    question: (
      <div>
        <p>
          How much total padding does <code>p-0</code> add?
        </p>
        <CodeBlock
          language="html"
          code={`<div class="p-0">No inner spacing</div>`}
        />
      </div>
    ),
    options: ["0px", "4px", "8px", "16px"],
    answer: "0px",
  },
];

const Why_Chooseus_Section_MCQ = () => {
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic
      title="Why Choose Us Section - Padding & Span Element MCQs"
      questions={randomQuestions}
    />
  );
};

export default Why_Chooseus_Section_MCQ;
