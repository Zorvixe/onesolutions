import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What does this HTML create?</p>
        <CodeBlock
          language="html"
          code={`<a href="https://ccbp.in">Visit CCBP</a>`}
        />
      </div>
    ),
    options: ["A paragraph", "A heading", "A clickable hyperlink", "An image"],
    answer: "A clickable hyperlink",
  },
  {
    question: (
      <div>
        <p>Where will this link open?</p>
        <CodeBlock
          language="html"
          code={`<a href="about.html" target="_blank">About Us</a>`}
        />
      </div>
    ),
    options: ["Same tab", "New tab", "Same page section", "Downloads a file"],
    answer: "New tab",
  },
  {
    question: (
      <div>
        <p>Clicking this link will scroll to which section?</p>
        <CodeBlock
          language="html"
          code={`<a href="#contactSection">Contact</a>`}
        />
        <CodeBlock
          language="html"
          code={`<div id="contactSection">Contact Form Here</div>`}
        />
      </div>
    ),
    options: [
      "Top of page",
      "Contact section on same page",
      "New page",
      "No action",
    ],
    answer: "Contact section on same page",
  },
  {
    question: (
      <div>
        <p>What happens when this image is clicked?</p>
        <CodeBlock
          language="html"
          code={`<a href="gallery.html">
  <img src="tajmahal.jpg" alt="Taj Mahal">
</a>`}
        />
      </div>
    ),
    options: [
      "Image enlarges",
      "Goes to gallery.html",
      "Image downloads",
      "No action",
    ],
    answer: "Goes to gallery.html",
  },
  {
    question: (
      <div>
        <p>What does this element do in the content?</p>
        <CodeBlock language="html" code={`Line one<br>Line two`} />
      </div>
    ),
    options: [
      "Adds bold text",
      "Creates a new paragraph",
      "Breaks to next line",
      "Adds space",
    ],
    answer: "Breaks to next line",
  },
  {
    question: (
      <div>
        <p>What will this insert between sections?</p>
        <CodeBlock language="html" code={`<hr>`} />
      </div>
    ),
    options: ["Vertical line", "Horizontal line", "Blank space", "Dotted line"],
    answer: "Horizontal line",
  },
  {
    question: (
      <div>
        <p>Which attribute defines the destination of a hyperlink?</p>
        <CodeBlock
          language="html"
          code={`<a href="https://example.com">Example</a>`}
        />
      </div>
    ),
    options: ["src", "target", "href", "link"],
    answer: "href",
  },
  {
    question: "What is the purpose of an HTML a (anchor) element?",
    options: [
      "To create a paragraph.",
      "To create a heading.",
      "To create a hyperlink.",
      "To create an image.",
    ],
    answer: "To create a hyperlink.",
  },
  {
    question:
      "HTML hyperlinks can be used to navigate within the same document.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    question:
      "Which HTML element is used to insert a horizontal line to separate content?",
    options: ["<br>", "<hr>", "<div>", "<p>"],
    answer: "<hr>",
  },
];

const HTML_HyperLinks_MCQ = () => {
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic title="HTML Hyperlinks - MCQs" questions={randomQuestions} />
  );
};

export default HTML_HyperLinks_MCQ;
