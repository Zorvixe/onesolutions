import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is a CSS gradient primarily used for?</p>
      </div>
    ),
    options: [
      "Creating text effects",
      "Smooth color transitions as background images",
      "Adding borders",
      "Changing font colors",
    ],
    answer: "Smooth color transitions as background images",
  },
  {
    question: (
      <div>
        <p>Which gradient type creates a transition along a straight line?</p>
      </div>
    ),
    options: [
      "Radial gradient",
      "Linear gradient",
      "Circular gradient",
      "Diagonal gradient",
    ],
    answer: "Linear gradient",
  },
  {
    question: (
      <div>
        <p>Which direction keyword makes a gradient flow from right to left?</p>
      </div>
    ),
    options: ["to left", "to right", "to top", "to bottom"],
    answer: "to left",
  },
  {
    question: (
      <div>
        <p>What direction does this gradient flow?</p>
        <CodeBlock
          language="css"
          code={`.gradient {
  background: linear-gradient(to right, #ff7e5f, #feb47b);
}`}
        />
        <CodeBlock
          language="html"
          code={`<div class="gradient" style="height: 100px;"></div>`}
        />
      </div>
    ),
    options: [
      "Top to bottom",
      "Left to right",
      "Right to left",
      "Center outward",
    ],
    answer: "Left to right",
  },
  {
    question: (
      <div>
        <p>What type of gradient does this create?</p>
        <CodeBlock
          language="css"
          code={`.radial-example {
  background: radial-gradient(circle, #ff7e5f, #feb47b);
}`}
        />
      </div>
    ),
    options: [
      "Straight line transition",
      "Circular transition from center outward",
      "Diagonal transition",
      "Vertical transition",
    ],
    answer: "Circular transition from center outward",
  },
  {
    question: (
      <div>
        <p>How many colors are used in this rainbow gradient?</p>
        <CodeBlock
          language="css"
          code={`.rainbow {
  background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
}`}
        />
      </div>
    ),
    options: ["2", "3", "7", "8"],
    answer: "7",
  },
  {
    question: (
      <div>
        <p>What will this Food Munch banner look like?</p>
        <CodeBlock
          language="html"
          code={`<section class="container py-5" style="
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  ">
    <h1 class="text-center">Welcome to Food Munch</h1>
  </section>`}
        />
      </div>
    ),
    options: [
      "Solid purple background",
      "Diagonal gradient from blue to purple",
      "Radial gradient from center",
      "Horizontal red to blue gradient",
    ],
    answer: "Diagonal gradient from blue to purple",
  },
  {
    question: (
      <div>
        <p>Which gradient starts from the center and radiates outward?</p>
        <CodeBlock
          language="css"
          code={`.center-glow {
  background: radial-gradient(circle at center, #ff6b6b, transparent);
}`}
        />
      </div>
    ),
    options: ["Linear", "Radial", "Angular", "Conic"],
    answer: "Radial",
  },
  {
    question: (
      <div>
        <p>Default direction of a linear gradient (without 'to' keyword)?</p>
        <CodeBlock
          language="css"
          code={`.default-gradient {
  background: linear-gradient(#6a11cb, #2575fc);
}`}
        />
      </div>
    ),
    options: [
      "Left to right",
      "Right to left",
      "Top to bottom",
      "Bottom to top",
    ],
    answer: "Top to bottom",
  },
  {
    question: (
      <div>
        <p>Best way to create a Thank You modal with gradient background?</p>
        <CodeBlock
          language="html"
          code={`<!-- Modal -->
<div class="modal fade" id="thankYouModal">
  <div class="modal-dialog">
    <div class="modal-content" style="
      background: linear-gradient(45deg, #ff9a9e 0%, #fecfef 100%);
    ">
      <div class="modal-header">
        <h5 class="modal-title">Thank You!</h5>
      </div>
      <div class="modal-body">
        <p>Your order has been placed successfully!</p>
      </div>
    </div>
  </div>
</div>`}
        />
      </div>
    ),
    options: [
      "Use Bootstrap bg-primary",
      "Apply linear-gradient to modal-content",
      "Use radial-gradient on modal-dialog",
      "Add gradient to modal-body only",
    ],
    answer: "Apply linear-gradient to modal-content",
  },
];

const CSS_Gradience_MCQ = () => {
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic
      title="CSS Gradients - Linear, Radial & Food Munch Examples MCQs"
      questions={randomQuestions}
    />
  );
};

export default CSS_Gradience_MCQ;
