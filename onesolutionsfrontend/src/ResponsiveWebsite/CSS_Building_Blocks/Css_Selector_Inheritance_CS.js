import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Css_Selector_Inheritance_CS = ({ onSubtopicComplete }) => {
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
      <h1>CSS Selectors & Inheritance</h1>

      {/* 1. CSS Selectors */}
      <section>
        <h2>1. CSS Selectors</h2>
        <p>
          CSS Selectors are used to select HTML elements that we want to style. The different types include:
        </p>
        <ul>
          <li>Simple Selectors</li>
          <li>Class Selector</li>
          <li>ID Selector</li>
          <li>Type (tag name) Selector</li>
          <li>Attribute Selector</li>
          <li>Universal Selector</li>
          <li>Pseudo-class</li>
          <li>Compound Selectors</li>
          <li>Complex Selectors</li>
        </ul>

        <h3>1.1 Class Selector</h3>
        <p>
          The CSS Class Selector selects all HTML elements with a given class attribute. It is prefixed with a <code>.</code>.
        </p>
        <CodeBlock
          language="css"
          code={`.paragraph {
  color: blue;
  font-size: 16px;
}`}
        />
        <CodeBlock
          language="html"
          code={`<p class="paragraph">This text is blue and 16px in size.</p>`}
        />
        <p className="note">Note: Multiple elements can share the same class name.</p>

        <h3>1.2 ID Selector</h3>
        <p>
          The CSS ID Selector selects a single HTML element by its <code>id</code> attribute. It is prefixed with a <code>#</code>.
        </p>
        <CodeBlock
          language="css"
          code={`#populationParagraph {
  font-weight: bold;
}`}
        />
        <CodeBlock
          language="html"
          code={`<p id="populationParagraph">Population Data</p>`}
        />
        <p className="note">Note: IDs must be unique within an HTML document.</p>

        <h3>1.3 Type (tag name) Selector</h3>
        <p>The CSS Type Selector selects all elements of a given tag name.</p>
        <CodeBlock
          language="css"
          code={`p {
  color: green;
}`}
        />
        <CodeBlock
          language="html"
          code={`<p>This paragraph will be green.</p>`}
        />
      </section>

      {/* 2. Fundamental Concepts of CSS */}
      <section>
        <h2>2. Most Fundamental Concepts of CSS</h2>
        <p>
          Styles applied to HTML elements depend on three fundamental concepts:
        </p>
        <ul>
          <li>Inheritance</li>
          <li>Specificity</li>
          <li>Cascade</li>
        </ul>

        <h3>2.1 CSS Inheritance</h3>
        <p>
          Inheritance is the mechanism where certain CSS property values are passed from parent elements to child elements.
        </p>

        <h4>2.1.1 Parent Element</h4>
        <CodeBlock
          language="html"
          code={`<div>
  <h1>Title</h1>
  <p>Paragraph</p>
</div>`}
        />
        <p>The <code>div</code> is the parent of <code>h1</code> and <code>p</code>.</p>

        <h4>2.1.2 Child Element</h4>
        <p>A child element is directly inside a parent element.</p>
        <CodeBlock
          language="html"
          code={`<p>
  <a href="#">Link</a>
</p>`}
        />
        <p>The <code>a</code> element is a child of <code>p</code>.</p>

        <h4>2.1.3 Inherited Properties</h4>
        <p>
          Properties that are passed from parent to child include:
        </p>
        <ul>
          <li>Text-related: <code>font-family</code>, <code>font-style</code>, <code>font-weight</code>, <code>text-align</code></li>
          <li>List-related: <code>list-style-type</code>, <code>color</code></li>
        </ul>

        <h4>2.1.4 Non-inherited Properties</h4>
        <p>
          Properties not inherited by default include:
        </p>
        <ul>
          <li>Box Properties: <code>width</code>, <code>height</code>, <code>margin</code>, <code>padding</code>, <code>border</code></li>
          <li>Background Properties: <code>background-color</code>, <code>background-image</code></li>
          <li>Text decoration, etc.</li>
        </ul>

        <h3>MCQ</h3>
        {[
          {
            question: "Which CSS selector is used to style an element by its class?",
            options: [".className", "#idName", "p", "*"],
            answer: ".className",
          },
          {
            question: "Which CSS property is inherited by child elements by default?",
            options: ["margin", "padding", "font-family", "width"],
            answer: "font-family",
          },
        ].map((q, idx) => renderMCQ(q, idx, "css_selectors_inheritance"))}
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

export default Css_Selector_Inheritance_CS;
