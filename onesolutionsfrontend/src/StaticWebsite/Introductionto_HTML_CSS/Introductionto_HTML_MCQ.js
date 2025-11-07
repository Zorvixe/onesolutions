import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: "What is the correct basic structure of an HTML document?",
    options: [
      "<html></html>",
      "<!DOCTYPE html><html><head><title></title></head><body></body></html>",
      "<head><title></title></head><body></body>",
      "<!DOCTYPE html><head><body></body></head></html>",
    ],
    answer:
      "<!DOCTYPE html><html><head><title></title></head><body></body></html>",
  },
  {
    question: "The HTML h1 element is known as the ______ element.",
    options: ["paragraph", "button", "main heading", "input"],
    answer: "main heading",
  },
  {
    question:
      "Which of the following is the start tag of an HTML paragraph element?",
    options: ["<paragraph>", "<p>", "<para>", "<pg>"],
    answer: "<p>",
  },
  {
    question:
      "Which of the following is the start tag of an HTML button element?",
    options: ["<btn>", "<button>", "<input type='button'>", "<click>"],
    answer: "<button>",
  },
  {
    question:
      "Which HTML tag is used to define the main heading of a web page?",
    options: ["<p>", "<h1>", "<h6>", "<heading>"],
    answer: "<h1>",
  },
  {
    question: "Which HTML element is used to define a paragraph?",
    options: ["<para>", "<pg>", "<p>", "<paragraph>"],
    answer: "<p>",
  },
  {
    question: (
      <div>
        <p>What will this HTML code display?</p>
        <CodeBlock language="html" code={`<h1>Welcome to My Page</h1>`} />
      </div>
    ),
    options: [
      "A small heading saying 'Welcome to My Page'",
      "A large heading saying 'Welcome to My Page'",
      "No output",
      "An error message",
    ],
    answer: "A large heading saying 'Welcome to My Page'",
  },
  {
    question: (
      <div>
        <p>What will this HTML code display?</p>
        <CodeBlock language="html" code={`<p>This is a paragraph.</p>`} />
      </div>
    ),
    options: [
      "Displays a main heading",
      "Displays a paragraph saying 'This is a paragraph.'",
      "Shows a blank screen",
      "Throws an HTML error",
    ],
    answer: "Displays a paragraph saying 'This is a paragraph.'",
  },
  {
    question: (
      <div>
        <p>What does this HTML code create?</p>
        <CodeBlock language="html" code={`<button>Click Me</button>`} />
      </div>
    ),
    options: [
      "A text link saying 'Click Me'",
      "A clickable button labeled 'Click Me'",
      "A paragraph",
      "A heading",
    ],
    answer: "A clickable button labeled 'Click Me'",
  },
  {
    question: (
      <div>
        <p>
          What is the purpose of the <code>&lt;!DOCTYPE html&gt;</code>{" "}
          declaration?
        </p>
        <CodeBlock language="html" code={`<!DOCTYPE html>`} />
      </div>
    ),
    options: [
      "Defines the body of the HTML document",
      "Tells the browser which HTML version is used",
      "Declares a comment section",
      "Creates a new HTML tag",
    ],
    answer: "Tells the browser which HTML version is used",
  },
];

const Introductionto_HTML_MCQ = () => {
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic title="Introduction to HTML - MCQs" questions={randomQuestions} />
  );
};

export default Introductionto_HTML_MCQ;
