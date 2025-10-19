import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust the path if needed

const WebSite_Integration_CS_2 = ({ onSubtopicComplete }) => {
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
      <h1>Detailed View Sections & HTML Lists Cheat Sheet</h1>

      {/* =========================== */}
      {/* 1. Detailed View Section */}
      {/* =========================== */}
      <section>
        <h2>1. Detailed View Section</h2>
        <p>These are detailed views for different places.</p>

        <h3>1.1 Golden Temple Detailed View</h3>
        <CodeBlock language="html" code={`<!-- Golden Temple HTML -->`} />
        <CodeBlock language="css" code={`/* Golden Temple CSS */`} />
        <CodeBlock language="javascript" code={`// Golden Temple JS`} />

        <h3>1.2 Mysore Palace Detailed View</h3>
        <CodeBlock language="html" code={`<!-- Mysore Palace HTML -->`} />
        <CodeBlock language="css" code={`/* Mysore Palace CSS */`} />
        <CodeBlock language="javascript" code={`// Mysore Palace JS`} />

        <h3>1.3 Varanasi Temple Detailed View</h3>
        <CodeBlock language="html" code={`<!-- Varanasi Temple HTML -->`} />
        <CodeBlock language="css" code={`/* Varanasi Temple CSS */`} />
        <CodeBlock language="javascript" code={`// Varanasi Temple JS`} />

        <p className="note">
          📝 IDs of the Carousels must be unique in the HTML document for controls to work.
        </p>
      </section>

      {/* =========================== */}
      {/* 2. Website Integration */}
      {/* =========================== */}
      <section>
        <h2>2. Integration with Favourite Places Section</h2>
        <p>
          To display Detailed View Section when clicking a card:
        </p>
        <ol>
          <li>Add Section Container with unique id.</li>
          <li>Add Detailed View HTML.</li>
          <li>Add <code>onclick</code> to the card.</li>
          <li>Add a button in Detailed View Section to go back.</li>
          <li>Add <code>onclick</code> to the button.</li>
        </ol>

        <p className="note">
          Note: When using multiple Carousels, each must have a unique id.
        </p>
      </section>

      {/* =========================== */}
      {/* 3. HTML Lists */}
      {/* =========================== */}
      <section>
        <h2>3. HTML Lists</h2>
        <p>HTML lists group related information. Two main types:</p>
        <ul>
          <li>Unordered List (<code>&lt;ul&gt;</code>)</li>
          <li>Ordered List (<code>&lt;ol&gt;</code>)</li>
        </ul>

        <h3>3.1 Unordered List</h3>
        <p>Collection of items with no order:</p>
        <CodeBlock language="html" code={`<ul>
  <li>Painting</li>
  <li>Reading Books</li>
  <li>Playing Guitar</li>
</ul>`} />
        <p>Style with <code>list-style-type</code>:</p>
        <CodeBlock language="css" code={`ul { list-style-type: disc; } /* circle, square, none */`} />

        <h3>3.2 Ordered List</h3>
        <p>Collection of items with sequence:</p>
        <CodeBlock language="html" code={`<ol>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ol>`} />
        <p>Style with <code>list-style-type</code>:</p>
        <CodeBlock language="css" code={`ol { list-style-type: decimal; } /* upper-alpha, lower-alpha, upper-roman, lower-roman, none */`} />

        <h3>MCQs</h3>
        {[
          {
            question: "Which HTML tag is used to start an unordered list in HTML?",
            options: ["<ul>", "<ol>", "<li>", "<list>"],
            answer: "<ul>",
          },
          {
            question: "Which HTML tag is used to start an ordered list in HTML?",
            options: ["<ul>", "<ol>", "<li>", "<list>"],
            answer: "<ol>",
          },
        ].map((q, idx) => renderMCQ(q, idx, "htmllist"))}
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

export default WebSite_Integration_CS_2;
