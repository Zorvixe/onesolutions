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
      <h1>Introduction to BootStrap | Cheat Sheet | Part 2</h1>

      {/* =========================== */}
      {/* 1. Flexbox Container */}
      {/* =========================== */}
      <section>
        <h2>1. Flexbox Container</h2>
        <p>
          The Bootstrap class name <code>d-flex</code> defines a Flexbox
          Container. The direct HTML elements inside this container are called{" "}
          <b>flex items</b>.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="d-flex">
<div>
  <h1>Tourism</h1>
  <p>Plan your trip.</p>
  <button>Get Started</button>
</div>
</div>`}
        />

        <ul>
          <li>
            The container element with <code>class="d-flex"</code> is a Flexbox
            Container.
          </li>
          <li>
            The HTML container element div in Flexbox Container is a flex item.
            Because it is directly inside the Flexbox Container.
          </li>
          <li>
            The HTML main heading, paragraph, and button elements are not flex
            items. Because these elements are not directly inside the Flexbox
            Container.
          </li>
        </ul>

        <p>
          <b>Note: </b>Wrapping HTML elements in the Flexbox Container is
          mandatory to apply other flex properties.
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
          The Flex Direction specifies the direction of the flex items in the
          Flexbox Container.
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
        <p>
          The Bootstrap class name <code>flex-row</code> is used to move the
          flex items <b>horizontally</b> in the Flexbox Container.
        </p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-row">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}
        />

        <h3>2.2 flex-column</h3>
        <p>
          The Bootstrap class name <code>flex-column</code> is used to move the
          flex items <b>vertically</b> in the Flexbox Container.
        </p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-column">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}
        />

        <p>
          <b>Note: </b>The Bootstrap class name <code>flex-row</code> is the
          default Flex Direction for the Flexbox Container. So, once{" "}
          <code>d-flex</code> is specified, all the flex items in the Flexbox
          Container display horizontally.
        </p>

        <h3>MCQ</h3>
        {[
          {
            question:
              "Which Bootstrap class name will move the flex items horizontally?",
            options: [
              "flex-vertical",
              "flex-horizontal",
              "flex-column",
              "flex-row",
            ],
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
          The <strong>justify-content</strong> classes align flex items along
          the Flex Direction in a Flexbox Container.
        </p>
        <table border="1" style={{ borderCollapse: "collapse", width: "70%" }}>
          <thead>
            <tr>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>justify-content-start</td>
              <td>Aligns items at the start of the container.</td>
            </tr>
            <tr>
              <td>justify-content-center</td>
              <td>Aligns items at the center of the container.</td>
            </tr>
            <tr>
              <td>justify-content-end</td>
              <td>Aligns items at the end of the container.</td>
            </tr>
            <tr>
              <td>justify-content-between</td>
              <td>Places equal space between items.</td>
            </tr>
          </tbody>
        </table>
        <h3>3.1 justify-content-start</h3>
        <p>
          The Bootstrap class name <code>justify-content-start</code> is used to
          align the flex items at the start of the Flexbox Container either
          horizontally or vertically based on the Flex Direction.
        </p>
        <table border="1" style={{ borderCollapse: "collapse", width: "70%" }}>
          <thead>
            <tr>
              <th>Flex Direction</th>
              <th>Alignment of flex items in a Flexbox Container</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>flex-row</td>
              <td>Aligns flex items horizontally to the left.</td>
            </tr>
            <tr>
              <td>flex-column</td>
              <td>Aligns flex items vertically to the top.</td>
            </tr>
          </tbody>
        </table>
        <CodeBlock
          language="html"
          code={`<div class="d-flex justify-content-start">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}
        />
        <h3>3.2 justify-content-center</h3>
        <p>
          The Bootstrap class name <code>justify-content-center</code> is used
          to align the flex items at the center of the Flexbox Container either
          horizontally or vertically based on the Flex Direction.
        </p>
        <table border="1" style={{ borderCollapse: "collapse", width: "70%" }}>
          <thead>
            <tr>
              <th>Flex Direction</th>
              <th>Alignment of flex items in a Flexbox Container</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>flex-row</td>
              <td>Aligns flex items horizontally to the center.</td>
            </tr>
            <tr>
              <td>flex-column</td>
              <td>Aligns flex items vertically to the center.</td>
            </tr>
          </tbody>
        </table>
        <CodeBlock
          language="html"
          code={`<div class="d-flex justify-content-center">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}
        />
        <h3>3.3 justify-content-end</h3>
        <p>
          {" "}
          The Bootstrap class name <code>justify-content-end</code> is used to
          align the flex items at the end of the Flexbox Container either
          horizontally or vertically based on the Flex Direction.
        </p>
        <table border="1" style={{ borderCollapse: "collapse", width: "70%" }}>
          <thead>
            <tr>
              <th>Flex Direction</th>
              <th>Alignment of flex items in a Flexbox Container</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>flex-row</td>
              <td>Aligns flex items horizontally to the right.</td>
            </tr>
            <tr>
              <td>flex-column</td>
              <td>Aligns flex items vertically to the bottom.</td>
            </tr>
          </tbody>
        </table>

        <CodeBlock
          language="html"
          code={`<div class="d-flex justify-content-end">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}
        />
        <h3>3.4 justify-content-between</h3>
        <p>
          The Bootstrap class name <code>justify-content-between</code> is used
          to distribute flex items with equal space between them inside the
          Flexbox Container, with the first item placed at the start and the
          last item at the end, based on the Flex Direction.
        </p>
        <table border="1" style={{ borderCollapse: "collapse", width: "70%" }}>
          <thead>
            <tr>
              <th>Flex Direction</th>
              <th>Alignment of flex items in a Flexbox Container</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>flex-row</td>
              <td>
                Distributes flex items horizontally with space between them.
              </td>
            </tr>
            <tr>
              <td>flex-column</td>
              <td>
                Distributes flex items vertically with space between them.
              </td>
            </tr>
          </tbody>
        </table>

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
