import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>Which keyword is used to declare a variable in JavaScript?</p>
        <CodeBlock language="javascript" code={`let message;`} />
      </div>
    ),
    options: ["var", "let", "const", "int"],
    answer: "let",
  },
  {
    question: (
      <div>
        <p>What will be the output of the following code?</p>
        <CodeBlock
          language="javascript"
          code={`let message;\nconsole.log(message);`}
        />
      </div>
    ),
    options: ["null", "undefined", "error", "0"],
    answer: "undefined",
  },
  {
    question: (
      <div>
        <p>Which method is used to select an element with a specific ID?</p>
        <CodeBlock
          language="javascript"
          code={`const heading = document.getElementById("headingElement");`}
        />
      </div>
    ),
    options: [
      "document.querySelectorAll()",
      "document.getElementsByClassName()",
      "document.getElementById()",
      "document.selectById()",
    ],
    answer: "document.getElementById()",
  },
  {
    question: (
      <div>
        <p>
          Which property is used to modify the text content of an element?
        </p>
        <CodeBlock
          language="javascript"
          code={`document.getElementById("headingElement").textContent = "New Heading";`}
        />
      </div>
    ),
    options: ["innerValue", "textValue", "textContent", "contentText"],
    answer: "textContent",
  },
  {
    question: (
      <div>
        <p>
          Which style property will change the background color of an element?
        </p>
        <CodeBlock
          language="javascript"
          code={`document.getElementById("headingElement").style.backgroundColor = "blue";`}
        />
      </div>
    ),
    options: [
      "backgroundcolor",
      "background_color",
      "backgroundColor",
      "bgColor",
    ],
    answer: "backgroundColor",
  },
  {
    question: (
      <div>
        <p>Which event occurs when the user clicks on an HTML element?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="changeHeading()">Click Me</button>`}
        />
      </div>
    ),
    options: ["onmouseover", "onclick", "onpress", "onhover"],
    answer: "onclick",
  },
  {
    question: (
      <div>
        <p>
          Which of the following code correctly changes the heading color when
          the button is clicked?
        </p>
        <CodeBlock
          language="html"
          code={`<h1 id="headingElement">Web Tech</h1>\n<button onclick="changeHeading()">Change</button>`}
        />
        <CodeBlock
          language="javascript"
          code={`function changeHeading() {\n  document.getElementById("headingElement").style.color = "red";\n}`}
        />
      </div>
    ),
    options: [
      "Uses document.querySelectorAll()",
      "Uses document.getElementById() correctly",
      "Missing style property",
      "Invalid function syntax",
    ],
    answer: "Uses document.getElementById() correctly",
  },
  {
    question: (
      <div>
        <p>What does the DOM represent in a browser?</p>
      </div>
    ),
    options: [
      "A static text version of the HTML",
      "A tree structure representing HTML elements as objects",
      "A server-side database",
      "A CSS style manager",
    ],
    answer: "A tree structure representing HTML elements as objects",
  },
  {
    question: (
      <div>
        <p>
          Which of the following is the correct way to access the document
          object?
        </p>
      </div>
    ),
    options: ["window.html", "browser.document", "document", "HTML.document"],
    answer: "document",
  },
  {
    question: (
      <div>
        <p>What is true about JavaScript Events?</p>
      </div>
    ),
    options: [
      "They are used to style HTML elements only",
      "They occur when users or the browser interact with elements",
      "They are used to define variables in JavaScript",
      "They cannot trigger functions",
    ],
    answer: "They occur when users or the browser interact with elements",
  },
];

const Dom_Event_Fundamentals_MCQ = () => {
  return <MCQLogic title = "Dom Event Fundamentals - MCQs" questions = {questionsData} />;
};
export default Dom_Event_Fundamentals_MCQ;