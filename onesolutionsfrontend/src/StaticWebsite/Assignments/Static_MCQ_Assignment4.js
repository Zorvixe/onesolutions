import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 7 CodeBlock Questions – Website Integration (All Subtopics) ==========
  {
    question: (
      <div>
        <p>What happens when you click this button?</p>
        <CodeBlock language="html" code={`<button class="btn btn-primary" onclick="display('sectionHome')">
  Go Home
</button>`} />
      </div>
    ),
    options: ["Page reloads", "Shows section with id='sectionHome'", "Opens link", "Nothing happens"],
    answer: "Shows section with id='sectionHome'",
  },
  {
    question: (
      <div>
        <p>Why does this image link work?</p>
        <CodeBlock language="html" code={`<a href="https://www.ccbp.in/" target="_blank">
  <img src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/learn-technologies-img.png" />
</a>`} />
      </div>
    ),
    options: ["Because img is inside anchor", "Because of target='_blank'", "Because of alt text", "Only text can be links"],
    answer: "Because img is inside anchor",
  },
  {
    question: (
      <div>
        <p>What does this CCBP UI Kit setup do?</p>
        <CodeBlock language="html" code={`<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <div id="sectionAbout">About</div>
    <script type="text/javascript" src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/js/ccbp-ui-kit.js"></script>
  </body>
</html>`} />
      </div>
    ),
    options: ["Enables display('sectionAbout')", "Adds Bootstrap", "Loads jQuery", "Breaks the page"],
    answer: "Enables display('sectionAbout')",
  },
  {
    question: (
      <div>
        <p>Which section will be shown?</p>
        <CodeBlock language="html" code={`<button onclick="display('sectionGallery')">Gallery</button>
<button onclick="display('sectionContact')">Contact</button>`} />
      </div>
    ),
    options: ["Both at once", "Only the first one", "Depends on which button clicked", "None"],
    answer: "Depends on which button clicked",
  },
  {
    question: (
      <div>
        <p>What is required for CCBP UI Kit to work?</p>
        <CodeBlock language="html" code={`<div id="sectionHome" class="section">
  <h1>Welcome</h1>
</div>`} />
      </div>
    ),
    options: ["id must start with 'section'", "class must be 'container'", "Must use Bootstrap", "No requirement"],
    answer: "id must start with 'section'",
  },
  {
    question: (
      <div>
        <p>How to open a link in new tab?</p>
        <CodeBlock language="html" code={`<a href="https://cloudinary.com/" target="_blank" rel="noopener">
  Upload Image
</a>`} />
      </div>
    ),
    options: ["target='_blank'", "rel='noopener'", "Both are needed", "Only href"],
    answer: "Both are needed",
  },
  {
    question: (
      <div>
        <p>Where should CCBP UI Kit script be placed?</p>
        <CodeBlock language="html" code={`<body>
  <!-- content -->
  <script src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/js/ccbp-ui-kit.js"></script>
</body>`} />
      </div>
    ),
    options: ["In head", "Before body", "Just before closing body tag", "Anywhere"],
    answer: "Just before closing body tag",
  },

  // ========== 3 Classic MCQs – Website Integration ==========
  {
    question: "The display() function is provided by which script?",
    options: ["Bootstrap", "jQuery", "CCBP UI Kit", "Custom JS file"],
    answer: "CCBP UI Kit",
  },
  {
    question: "To navigate within the same page, use #sectionName in href and matching id on the section.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    question: "Which attribute makes a link open in a new tab safely?",
    options: ["target='_blank'", "rel='noopener'", "Both target='_blank' and rel='noopener'", "href='_blank'"],
    answer: "Both target='_blank' and rel='noopener'",
  },
];

const Static_MCQ_Assignment4 = () => {
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic
      title="Static MCQ Assignment 4"
      questions={randomQuestions}
    />
  );
};

export default Static_MCQ_Assignment4;