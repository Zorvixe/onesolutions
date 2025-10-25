import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust the path if needed

const DOM_Event_Fundamentals_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});

  const handleAnswer = (question, option) => {
    setMcqAnswers((prev) => ({ ...prev, [question]: option }));
  };

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  const renderMCQ = (q, idx, namePrefix) => (
    <div key={idx} style={{ marginBottom: "10px" }}>
      <p>{q.question}</p>
      {q.options.map((option) => (
        <div key={option}>
          <label>
            <input
              type="radio"
              name={`${namePrefix}_${idx}`}
              checked={mcqAnswers[q.question] === option}
              onChange={() => handleAnswer(q.question, option)}
            />{" "}
            {option}
          </label>
        </div>
      ))}
      {mcqAnswers[q.question] && (
        <p
          style={{
            fontWeight: "bold",
            color: mcqAnswers[q.question] === q.answer ? "green" : "red",
          }}
        >
          {mcqAnswers[q.question] === q.answer
            ? "✅ Correct"
            : `❌ Wrong. Correct answer: ${q.answer}`}
        </p>
      )}
    </div>
  );

  return (
    <div className="intro-container">
      <h1>DOM and Event Fundamentals</h1>

      {/* 1. Variables Section */}
      <section>
        <h2>1. JavaScript Variables</h2>

        <h3>1.1 Variable Declaration</h3>
        <p>
          Variables are like containers for storing values. We can create a
          variable using the <code>let</code> keyword.
        </p>
        <CodeBlock
          language="javascript"
          code={`let message; // declaring a variable`}
        />

        <h3>1.2 Assigning a Value to the Variable</h3>
        <p>
          We can put data into a variable using an assignment operator (
          <code> = </code> ).
        </p>
        <CodeBlock
          language="javascript"
          code={`let message = "Hello World!";
console.log(message);`}
        />

        <p className="note">
          <b>Note:</b> Printing a variable without assigning a value gives{" "}
          <code>undefined</code>.
        </p>

        <CodeBlock
          language="html"
          code={`<button onclick="runCode()">Run Code</button>
<script>
  function runCode() {
    let x = 10;
    let y = 20;
    console.log("Sum =", x + y);
  }
</script>`}
        />
      </section>

      {/* 2. DOM Section */}
      <section>
        <h2>2. Document Object Model (DOM)</h2>
        <p>
          The DOM is the structured representation of the HTML document created
          by the browser. It allows JavaScript to manipulate, structure, and
          style your website.
        </p>
        <h4>Example HTML:</h4>
        <CodeBlock
          language="html"
          code={`<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Web Technologies</h1>
    <button>Change Heading</button>
  </body>
</html>`}
        />
        <h4>2.1 Document Object</h4>
        <p>
          It is the entry point of the DOM. For accessing any HTML Element, you
          should always start with accessing the document object first.
        </p>
        <h4>2.2 DOM Tree Representation</h4>
        <p>
          The DOM tree represents an HTML document as nodes. Each node is
          referred to as an Object.
        </p>
        {/* DOM Tree Diagram */}
        <div className="dom-tree-diagram">
          <img
            src="/assets/img/dom_tree_img.png"
            alt="DOM Tree"
            style={{ width: "400px", height: "400px" }}
          />

          {/* <ul>
            <li>
              <div className="node root">Document</div>
              <ul>
                <li>
                  <div className="node html">&lt;html&gt;</div>
                  <ul>
                    <li>
                      <div className="node head">&lt;head&gt;</div>
                      <ul>
                        <li>
                          <div className="node text">
                            &lt;title&gt;My Page&lt;/title&gt;
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div className="node body">&lt;body&gt;</div>
                      <ul>
                        <li>
                          <div className="node h1">
                            &lt;h1&gt;Web Technologies&lt;/h1&gt;
                          </div>
                        </li>
                        <li>
                          <div className="node button">
                            &lt;button&gt;Change Heading&lt;/button&gt;
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul> */}
        </div>
        {/* Scoped CSS */}
        {/* <style>
          {`
          .dom-tree-diagram {
            display: flex;
            justify-content: center;
            font-family: "Poppins", sans-serif;
            margin-top: 1rem;
          }

          .dom-tree-diagram ul {
            position: relative;
            padding-top: 20px;
            list-style-type: none;
            text-align: center;
          }

          .dom-tree-diagram ul ul::before {
            content: "";
            position: absolute;
            top: 0;
            left: 50%;
            border-left: 2px solid #1e90ff;
            height: 20px;
          }

          .dom-tree-diagram li {
            display: inline-block;
            vertical-align: top;
            text-align: center;
            position: relative;
            padding: 20px 5px 0 5px;
          }

          .dom-tree-diagram li::before,
          .dom-tree-diagram li::after {
            content: "";
            position: absolute;
            top: 0;
            border-top: 2px solid #1e90ff;
            width: 50%;
            height: 20px;
          }

          .dom-tree-diagram li::before {
            right: 50%;
          }

          .dom-tree-diagram li::after {
            left: 50%;
          }

          .dom-tree-diagram li:only-child::before,
          .dom-tree-diagram li:only-child::after {
            display: none;
          }

          .dom-tree-diagram li:first-child::before,
          .dom-tree-diagram li:last-child::after {
            border: none;
          }

          .node {
            display: inline-block;
            color: #fff;
            padding: 10px 14px;
            border-radius: 8px;
            min-width: 120px;
            font-size: 14px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          }

          .node.root {
            background-color: #555;
          }

          .node.html {
            background-color: #a020f0;
          }

          .node.head,
          .node.body {
            background-color: #1e90ff;
          }

          .node.h1,
          .node.button {
            background-color: #4caf50;
          }

          .node.text {
            background-color: #ffa726;
          }

          @media (max-width: 600px) {
            .node {
              font-size: 12px;
              min-width: 90px;
              padding: 8px;
            }
          }
          `}
        </style> */}
        <h3>2.3 Methods</h3>
        <h4>2.3.1 getElementById</h4>
        <p>
          The <code>getElementById()</code> method helps to select the HTML
          Element with a specific ID.
        </p>
        <CodeBlock
          language="javascript"
          code={`console.log(document.getElementById("headingElement"))`}
        />
        <h3>2.4 Properties</h3>
        <h4>2.4.1 textContent</h4>
        <p>
          To manipulate the text within the HTML Element, we use{" "}
          <code>textContent</code> Property.
        </p>
        <h4>2.4.2 style</h4>
        <p>
          The <code>style</code> property is used to get or set a specific style
          of an HTML Element using different CSS properties.
        </p>
        <p>
          Use Camel Case naming convention (starting letter of each word should
          be in the upper case except for the first word) for naming the Style
          Object Properties.
        </p>
        <p>
          For example,<code> color, fontFamily, backgroundColor, etc.</code>
        </p>
        <h3>2.5 Events</h3>
        <p>
          Events are the actions by which the user or browser interacts with the
          HTML Elements. Actions can be anything like clicking a button,
          pressing keyboard keys, scrolling the page, etc.
        </p>
        <h4>2.5.1 onclick Event</h4>
        <p>
          The <code>onclick</code> event occurs when the user clicks on an HTML
          Element. We will give the name of the function as a value for the HTML
          <code>onclick</code> attribute.
        </p>
        <CodeBlock
          language="javascript"
          code={`<body>
<h1 id="headingElement">Web Technologies</h1>
<button onclick="manipulateStyles()">Change Heading</button>
</body>`}
        />
        <CodeBlock
          language="javascript"
          code={`function manipulateStyles() {
document.getElementById("headingElement").textContent = "4.O Technologies";
document.getElementById("headingElement").style.color = "blue";
}`}
        />
      </section>

      {/* MCQ Section */}
      <section>
        <h3>MCQs</h3>
        {[
          {
            question: "Which object is the root of the DOM?",
            options: ["window", "document", "element", "body"],
            answer: "document",
          },
          {
            question: "Which DOM method is used to access an element by ID?",
            options: [
              "getElementByClass",
              "getElementById",
              "querySelectorAll",
              "getTagName",
            ],
            answer: "getElementById",
          },
          {
            question: "Which event occurs when a user clicks on an element?",
            options: ["onhover", "onpress", "onclick", "onload"],
            answer: "onclick",
          },
        ].map((q, idx) => renderMCQ(q, idx, "dom_event_fundamentals"))}
      </section>

      {/* Continue Button */}
      <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted}
        >
          {isSubtopicCompleted ? "Completed" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default DOM_Event_Fundamentals_CS;
