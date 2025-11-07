import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What will be the height of the div?</p>
        <CodeBlock language="css" code={`.box { height: 200px; }`} />
        <CodeBlock language="html" code={`<div class="box">Content</div>`} />
      </div>
    ),
    options: ["200px", "100px", "Auto", "Full screen"],
    answer: "200px",
  },
  {
    question: (
      <div>
        <p>What width will this element have?</p>
        <CodeBlock language="css" code={`.card { width: 300px; }`} />
        <CodeBlock language="html" code={`<div class="card">Card</div>`} />
      </div>
    ),
    options: ["300px", "100%", "Auto", "500px"],
    answer: "300px",
  },
  {
    question: (
      <div>
        <p>Will a background image appear?</p>
        <CodeBlock
          language="css"
          code={`.hero { background-image: url('bg.jpg'); }`}
        />
        <CodeBlock
          language="html"
          code={`<div class="hero">Hero Section</div>`}
        />
      </div>
    ),
    options: [
      "Yes, if the URL is valid",
      "No, URL is invalid",
      "Only if height is set",
      "Never",
    ],
    answer: "Yes, if the URL is valid",
  },
  {
    question: (
      <div>
        <p>What does this CSS do to the container?</p>
        <CodeBlock language="css" code={`.full { height: 100vh; }`} />
        <CodeBlock
          language="html"
          code={`<div class="full">Full Height</div>`}
        />
      </div>
    ),
    options: [
      "Makes it 100% of viewport height",
      "Makes it 100px tall",
      "Makes it full width",
      "No effect",
    ],
    answer: "Makes it 100% of viewport height",
  },
  {
    question: (
      <div>
        <p>What width will the sidebar have?</p>
        <CodeBlock language="css" code={`.sidebar { width: 25vw; }`} />
        <CodeBlock language="html" code={`<div class="sidebar">Menu</div>`} />
      </div>
    ),
    options: [
      "25% of viewport width",
      "25 pixels",
      "25% of parent",
      "Full width",
    ],
    answer: "25% of viewport width",
  },
  {
    question: (
      <div>
        <p>Why might the background image not show fully?</p>
        <CodeBlock
          language="css"
          code={`.banner { background-image: url('photo.jpg'); }`}
        />
        <CodeBlock
          language="html"
          code={`<div class="banner">Short text</div>`}
        />
      </div>
    ),
    options: [
      "It takes height of content if no height is set",
      "Image URL is wrong",
      "background-image doesn't work",
      "Need width property",
    ],
    answer: "It takes height of content if no height is set",
  },
  {
    question: (
      <div>
        <p>What size will this box be?</p>
        <CodeBlock
          language="css"
          code={`.screen { 
  width: 50vw; 
  height: 50vh; 
}`}
        />
        <CodeBlock
          language="html"
          code={`<div class="screen">Centered Box</div>`}
        />
      </div>
    ),
    options: [
      "50% of viewport width and 50% of viewport height",
      "50 pixels wide and tall",
      "50% of parent element",
      "Full screen",
    ],
    answer: "50% of viewport width and 50% of viewport height",
  },

  {
    question: "Which CSS Property specifies the height of an HTML element?",
    options: ["height", "width", "color", "background-color"],
    answer: "height",
  },
  {
    question: "Which CSS Property specifies the width of an HTML element?",
    options: ["width", "height", "margin", "padding"],
    answer: "width",
  },
  {
    question:
      "Which CSS Property specifies the background image of an HTML element?",
    options: ["background", "bg-image", "color", "background-image"],
    answer: "background-image",
  },
];

const Introductionto_Css_BoxModel_MCQ_1 = () => {
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic
      title="Introduction to CSS BoxModel - MCQs"
      questions={randomQuestions}
    />
  );
};

export default Introductionto_Css_BoxModel_MCQ_1;
