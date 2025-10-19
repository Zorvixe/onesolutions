import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust the path if needed

const Introductionto_Responsive_WD_CS = ({ onSubtopicComplete }) => {
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
      <h1>Bootstrap Grid System – Responsive Web Design</h1>

      {/* 1. Bootstrap Grid System */}
      <section>
        <h2>1. Bootstrap Grid System</h2>
        <p>
          Bootstrap Grid System is a collection of reusable code snippets to create
          responsive layouts. It is made up of <strong>containers</strong>,{" "}
          <strong>rows</strong>, and <strong>columns</strong>.
        </p>
        <p>
          It uses a <strong>12-column system</strong> for layouting. We can create up to
          12 columns across the page.
        </p>

        <h3>MCQ</h3>
        {[
          {
            question: "How many columns does the Bootstrap Grid System use?",
            options: ["6", "8", "12", "24"],
            answer: "12",
          },
        ].map((q, idx) => renderMCQ(q, idx, "grid_system"))}
      </section>

      {/* 1.1 Container */}
      <section>
        <h2>1.1 Container</h2>
        <p>The purpose of a container is to hold rows and columns.</p>
        <p>
          Here, the container is a <code>div</code> element with the Bootstrap class name{" "}
          <code>container</code>.
        </p>
        <CodeBlock
          language="html"
          code={`<div class="container">
  <!-- rows and columns go here -->
</div>`}
        />
      </section>

      {/* 1.2 Row */}
      <section>
        <h2>1.2 Row</h2>
        <p>The purpose of a row is to wrap all the columns.</p>
        <p>
          Here, the row is a <code>div</code> element with the Bootstrap class name{" "}
          <code>row</code>.
        </p>
        <CodeBlock
          language="html"
          code={`<div class="container">
  <div class="row">
    <!-- columns go here -->
  </div>
</div>`}
        />
      </section>

      {/* 1.3 Column */}
      <section>
        <h2>1.3 Column</h2>
        <p>
          We should place the columns inside a row and the content inside a column. We can
          specify the number of columns our content should occupy in any device.
        </p>
        <p>
          The number of columns we specify should be a number in the range of{" "}
          <strong>1 to 12</strong>.
        </p>
        <p>
          Here, the column is a <code>div</code> element with the Bootstrap class name{" "}
          <code>col-12</code>.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="container">
  <div class="row">
    <div class="col-12">
      Content
    </div>
  </div>
</div>`}
        />

        <p className="note">
          📝 If Bootstrap class name is <code>col-12</code>, it occupies the entire width
          available inside the row.
        </p>
        <p>
          The class names <code>col-*</code> indicate the number of columns you want to use
          out of the possible 12 per row. Example: <code>col-1</code>, <code>col-5</code>,
          etc.
        </p>
      </section>

      {/* 2. Creating Multiple Column Layouts */}
      <section>
        <h2>2. Creating Multiple Column Layouts</h2>
        <p>
          The layout in the example below is a <strong>Two Column Layout</strong>. Similarly,
          you can try out other layouts like One Column, Three Column, etc.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="container">
  <div class="row">
    <div class="col-6">
      Column 1
    </div>
    <div class="col-6">
      Column 2
    </div>
  </div>
</div>`}
        />

        <h3>MCQ</h3>
        {[
          {
            question: "Which Bootstrap class is used to define columns?",
            options: ["row", "container", "col-*", "grid"],
            answer: "col-*",
          },
        ].map((q, idx) => renderMCQ(q, idx, "columns"))}
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

export default Introductionto_Responsive_WD_CS;
