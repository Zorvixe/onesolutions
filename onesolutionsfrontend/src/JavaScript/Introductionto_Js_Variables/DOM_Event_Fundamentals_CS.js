import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

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
    <div key={idx} className="mcq-question">
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
          className={`mcq-feedback ${
            mcqAnswers[q.question] === q.answer ? "correct" : "wrong"
          }`}
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
      <h1>DOM and Event Fundamentals | Cheat Sheet</h1>

      {/* 1. JavaScript Variables */}
      <section>
        <h2>1. JavaScript Variables</h2>
        <h3>1.1 Variable Declaration</h3>
        <p>
          Variables are like containers for storing values. We can create a
          variable using the <code>let</code> keyword.
        </p>
        <CodeBlock language="javascript" code={`let name;\nlet age = 25;`} />

        <h3>1.2 Assigning a Value to a Variable</h3>
        <p>
          We can put data into a variable using an assignment operator
          <code>=</code>.
        </p>
        <CodeBlock language="javascript" code={`let message = "Hello World";`} />

        <p className="note">
          Note: Printing a variable without assigning a value will output{" "}
          <code>undefined</code>.
        </p>
      </section>

      {/* 2. Document Object Model */}
      <section>
        <h2>2. Document Object Model (DOM)</h2>
        <p>
          The DOM is the structured representation of the HTML document
          created by the browser. It allows JavaScript to manipulate, structure,
          and style your website.
        </p>

        <h3>2.1 Document Object</h3>
        <p>
          It is the entry point of the DOM. To access any HTML element, always
          start with the <code>document</code> object.
        </p>

        <h3>2.2 HTML DOM Tree</h3>
        <p>The DOM tree represents an HTML document as nodes (Objects).</p>

        <h3>2.3 Methods</h3>
        <h4>2.3.1 getElementById</h4>
        <p>
          The <code>getElementById()</code> method selects an HTML element with
          a specific ID.
        </p>
        <CodeBlock language="javascript" code={`const el = document.getElementById('myId');`} />

        <h3>2.4 Properties</h3>
        <h4>2.4.1 textContent</h4>
        <p>Used to get or set the text inside an HTML element.</p>

        <h4>2.4.2 style</h4>
        <p>
          Used to set or get CSS properties. Use camelCase naming for properties
          (e.g., <code>backgroundColor</code>, <code>fontFamily</code>).
        </p>

        <h3>2.5 Events</h3>
        <h4>2.5.1 onclick Event</h4>
        <p>
          The <code>onclick</code> event occurs when a user clicks on an HTML
          element.
        </p>
        <CodeBlock
          language="html"
          code={`<button onclick="sayHello()">Click Me</button>`}
        />
        <CodeBlock
          language="javascript"
          code={`function sayHello() {
  alert("Hello!");
}`}
        />

        <h3>MCQs</h3>
        {[
          {
            question: "Which object is the entry point to the DOM?",
            options: ["window", "document", "element", "node"],
            answer: "document",
          },
          {
            question: "Which event occurs when the user clicks an element?",
            options: ["onmouseover", "onclick", "onchange", "onsubmit"],
            answer: "onclick",
          },
        ].map((q, idx) => renderMCQ(q, idx, "dom_events"))}
      </section>

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
