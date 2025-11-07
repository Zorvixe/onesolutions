import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>Where should this CCBP UI Kit script be placed?</p>
        <CodeBlock
          language="html"
          code={`<script src="https://cdn.ccbp.in/ui-kit/v1.0/ui-kit.min.js"></script>`}
        />
      </div>
    ),
    options: [
      "Inside the head tag",
      "Before the closing body tag",
      "At the top of HTML file",
      "Inside a div element",
    ],
    answer: "Before the closing body tag",
  },
  {
    question: (
      <div>
        <p>What is required for this section ID when using CCBP UI Kit?</p>
        <CodeBlock
          language="html"
          code={`<div id="sectionHome">Home Content</div>`}
        />
      </div>
    ),
    options: [
      "Can be any name",
      "Must start with 'section'",
      "Must be 'home'",
      "No id needed",
    ],
    answer: "Must start with 'section'",
  },
  {
    question: (
      <div>
        <p>What will happen when this button is clicked?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="display('sectionFavouritePlaces')">Go to Favourite Places</button>`}
        />
      </div>
    ),
    options: [
      "Nothing happens",
      "Shows the section with id sectionFavouritePlaces",
      "Reloads the page",
      "Hides current section only",
    ],
    answer: "Shows the section with id sectionFavouritePlaces",
  },
  {
    question: (
      <div>
        <p>Why remove fixed height from this container?</p>
        <CodeBlock
          language="css"
          code={`.favourite-places-bg-container { height: 100vh; }`}
        />
        <CodeBlock
          language="html"
          code={`<!-- Remove fixed height to take content height -->`}
        />
      </div>
    ),
    options: [
      "To make it disappear",
      "To let background take full content height",
      "To center it",
      "To apply flexbox",
    ],
    answer: "To let background take full content height",
  },
  {
    question: (
      <div>
        <p>What is the correct onclick syntax for CCBP UI Kit?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="display('sectionDetailedView')">View Details</button>`}
        />
      </div>
    ),
    options: [
      "onclick=display(sectionDetailedView)",
      "onclick='display(sectionDetailedView)'",
      "onclick=\"display('sectionDetailedView')\"",
      "onclick=show('sectionDetailedView')",
    ],
    answer: "onclick=\"display('sectionDetailedView')\"",
  },
  {
    question: (
      <div>
        <p>In the integration process, what must be done first?</p>
        <CodeBlock language="html" code={`<!-- Step-1 -->`} />
      </div>
    ),
    options: [
      "Add onclick",
      "Change section container ids to start with 'section'",
      "Add CSS",
      "Add buttons",
    ],
    answer: "Change section container ids to start with 'section'",
  },
  {
    question: (
      <div>
        <p>Which section should this button return to?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="display('sectionHome')">Back to Home</button>`}
        />
      </div>
    ),
    options: [
      "Favourite Places",
      "Detailed View",
      "Home Section",
      "No section",
    ],
    answer: "Home Section",
  },
  {
    question: "Where should the CCBP UI Kit Script Code be placed?",
    options: [
      "Inside the head tag",
      "Before the closing body tag",
      "At the top of HTML file",
      "Inside a div element",
    ],
    answer: "Before the closing body tag",
  },
  {
    question:
      "Which HTML attribute is used to uniquely identify elements within an HTML document?",
    options: ["id", "src", "class", "all of the above"],
    answer: "id",
  },
  {
    question:
      "In CCBP UI Kit integration, what is the final step to go back from Detailed View to Favourite Places?",
    options: [
      "Add CSS",
      "Add onclick to Taj Mahal Card",
      "Add button in Detailed View with correct display()",
      "Change background color",
    ],
    answer: "Add button in Detailed View with correct display()",
  },
];

const Website_Integration_MCQ_1 = () => {
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic title="Website Integration - MCQs" questions={randomQuestions} />
  );
};

export default Website_Integration_MCQ_1;
