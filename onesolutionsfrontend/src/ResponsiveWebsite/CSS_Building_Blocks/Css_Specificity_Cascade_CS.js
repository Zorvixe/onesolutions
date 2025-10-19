import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Css_Specificity_Cascade_CS = ({ onSubtopicComplete }) => {
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
      <h1>CSS Specificity & Cascade</h1>

      {/* 1. Specificity */}
      <section>
        <h2>1. Specificity</h2>
        <p>
          Specificity determines which CSS property values are applied when multiple rules target the same element.
        </p>
        <ul>
          <li>Type (tag name) Selector</li>
          <li>Class Selector</li>
          <li>ID Selector</li>
        </ul>

        <h3>1.1 Type Selector & Class Selector</h3>
        <p>
          Class Selectors are more specific than Type Selectors.
        </p>
        <CodeBlock
          language="css"
          code={`p {
  color: blue;
}
.paragraph {
  color: red;
}`}
        />
        <CodeBlock
          language="html"
          code={`<p class="paragraph">This text will be red due to higher specificity of class selector.</p>`}
        />
        <p className="note">Note: Only the overlapping properties are overwritten, not the entire rule.</p>

        <h3>1.2 Class Selector & ID Selector</h3>
        <p>
          ID Selectors are more specific than Class Selectors and select only one element.
        </p>
        <CodeBlock
          language="css"
          code={`.paragraph {
  color: blue;
}
#uniqueParagraph {
  color: red;
}`}
        />
        <CodeBlock
          language="html"
          code={`<p id="uniqueParagraph" class="paragraph">This text will be red due to ID selector specificity.</p>`}
        />
      </section>

      {/* 2. Inline Styles */}
      <section>
        <h2>2. Inline Styles</h2>
        <p>
          Inline styles are applied directly to an HTML element using the <code>style</code> attribute. They have the highest specificity.
        </p>
        <CodeBlock
          language="html"
          code={`<p style="color: red; font-weight: bold;">This text is red and bold due to inline style.</p>`}
        />
        <p className="note">
          Note: Inline styles are not reusable and reduce readability.
        </p>
      </section>

      {/* 3. CSS Cascade */}
      <section>
        <h2>3. CSS Cascade</h2>
        <p>
          When two CSS rules have equal specificity, the last rule in the CSS file is applied.
        </p>
        <CodeBlock
          language="css"
          code={`p {
  color: blue;
}
p {
  color: red;
}`}
        />
        <p className="note">Here, the paragraph text will be red because the second rule comes later.</p>

        <h3>3.1 The !important Exception</h3>
        <p>
          <code>!important</code> makes a CSS property override others regardless of specificity or source order.
        </p>
        <CodeBlock
          language="css"
          code={`p {
  color: blue !important;
}
p {
  color: red;
}`}
        />
        <p className="note">
          Use <code>!important</code> sparingly, only to override external libraries like Bootstrap.
        </p>
      </section>

      {/* MCQs */}
      <section>
        <h3>MCQs</h3>
        {[
          {
            question: "Which selector has the highest specificity?",
            options: ["Type Selector", "Class Selector", "ID Selector", "Inline Style"],
            answer: "Inline Style",
          },
          {
            question: "When two rules have equal specificity, which one is applied?",
            options: ["The first rule", "The last rule", "Both", "Neither"],
            answer: "The last rule",
          },
          {
            question: "Which property overrides all other selectors except another !important?",
            options: ["ID Selector", "Class Selector", "Inline Style", "!important property"],
            answer: "!important property",
          },
        ].map((q, idx) => renderMCQ(q, idx, "css_specificity_cascade"))}
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

export default Css_Specificity_Cascade_CS;
