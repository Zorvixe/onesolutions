import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust the path if needed

const Introductionto_BootStrap_CS_2 = ({ onSubtopicComplete }) => {
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
      <h1>Bootstrap Cheat Sheet – Flexbox Properties</h1>

      {/* =========================== */}
      {/* 1. Flexbox Container */}
      {/* =========================== */}
      <section>
        <h2>1. Flexbox Container</h2>
        <p>
          The Bootstrap class name <code>d-flex</code> defines a Flexbox Container.
          The direct HTML elements inside this container are called flex items.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="d-flex">
  <div>Flex Item 1</div>
  <div>Flex Item 2</div>
</div>`}
        />

        <ul>
          <li>
            The container element with <code>class="d-flex"</code> is a Flexbox Container.
          </li>
          <li>
            Direct child div elements are flex items.
          </li>
          <li>
            Other elements like heading, paragraph, or button outside are not flex items.
          </li>
        </ul>

        <p className="note">
          📝 Wrapping HTML elements in the Flexbox Container is mandatory to apply other flex properties.
        </p>

        <h3>MCQ</h3>
        {[
          {
            question: "Which Bootstrap class name defines a Flexbox Container?",
            options: ["flex", "d-flex", "flexbox-container", "flexbox"],
            answer: "d-flex",
          },
        ].map((q, idx) => renderMCQ(q, idx, "flexcontainer"))}
      </section>

      {/* =========================== */}
      {/* 2. Flex Direction */}
      {/* =========================== */}
      <section>
        <h2>2. Flex Direction</h2>
        <p>
          The Flex Direction specifies the direction of the flex items in the Flexbox Container.
        </p>

        <table>
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Direction</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>flex-row</td>
              <td>Horizontal</td>
            </tr>
            <tr>
              <td>flex-column</td>
              <td>Vertical</td>
            </tr>
          </tbody>
        </table>

        <h3>2.1 flex-row</h3>
        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-row">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}
        />

        <h3>2.2 flex-column</h3>
        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-column">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}
        />

        <p className="note">
          📝 By default, <code>flex-row</code> is applied when using <code>d-flex</code>.
        </p>

        <h3>MCQ</h3>
        {[
          {
            question:
              "Which Bootstrap class name will move the flex items horizontally?",
            options: ["flex-vertical", "flex-horizontal", "flex-column", "flex-row"],
            answer: "flex-row",
          },
        ].map((q, idx) => renderMCQ(q, idx, "flexdirection"))}
      </section>

      {/* =========================== */}
      {/* 3. Justify Content */}
      {/* =========================== */}
      <section>
        <h2>3. Justify Content</h2>
        <p>
          The <strong>justify-content</strong> classes align flex items along the
          Flex Direction in a Flexbox Container.
        </p>

        <ul>
          <li><code>justify-content-start</code> – align at the start.</li>
          <li><code>justify-content-center</code> – align at the center.</li>
          <li><code>justify-content-end</code> – align at the end.</li>
          <li><code>justify-content-between</code> – space between items.</li>
        </ul>

        <h3>justify-content-start</h3>
        <CodeBlock
          language="html"
          code={`<div class="d-flex justify-content-start">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}
        />

        <h3>justify-content-center</h3>
        <CodeBlock
          language="html"
          code={`<div class="d-flex justify-content-center">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}
        />

        <h3>justify-content-end</h3>
        <CodeBlock
          language="html"
          code={`<div class="d-flex justify-content-end">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}
        />

        <h3>justify-content-between</h3>
        <CodeBlock
          language="html"
          code={`<div class="d-flex justify-content-between">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}
        />

        <h3>MCQ</h3>
        {[
          {
            question:
              "Which Bootstrap class aligns the flex items at the start of a Flexbox Container?",
            options: [
              "justify-content-center",
              "justify-content-end",
              "justify-content-start",
              "justify-content-between",
            ],
            answer: "justify-content-start",
          },
        ].map((q, idx) => renderMCQ(q, idx, "justifycontent"))}
      </section>

      {/* =========================== */}
      {/* Continue Button */}
      {/* =========================== */}
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

export default Introductionto_BootStrap_CS_2;
