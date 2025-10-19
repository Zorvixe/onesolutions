import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust the path if needed

const Introductionto_BootStrap_CS_1 = ({ onSubtopicComplete }) => {
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
            color:
              mcqAnswers[q.question] === q.answer ? "green" : "red",
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
      <h1>Bootstrap Cheat Sheet – Introduction</h1>

      {/* 1. Reusability of CSS Rulesets */}
      <section>
        <h2>1. Reusability of CSS Rulesets</h2>
        <p>
          If we want the same style for multiple HTML elements, we can write the CSS Ruleset once and use it for different HTML elements.
        </p>

        <CodeBlock
          language="css"
          code={`h1, p, button {
  color: blue;
  font-family: Arial;
}`}
        />
        <CodeBlock
          language="html"
          code={`<h1>Heading</h1>
<p>Paragraph text</p>
<button>Click Me</button>`}
        />

        <h3>MCQ</h3>
        {[
          {
            question:
              "Can we write the CSS Ruleset once and use it for multiple HTML elements?",
            options: ["Yes", "No"],
            answer: "Yes",
          },
        ].map((q, idx) => renderMCQ(q, idx, "reusability"))}
      </section>

      {/* 2. Multiple Class Names */}
      <section>
        <h2>2. Multiple Class Names as an HTML Attribute Value</h2>
        <p>
          We can provide multiple class names separated by space as a value to the HTML <code>class</code> attribute.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="name1 name2 name3">Content</div>`}
        />

        <ul>
          <li>HTML attribute value: name1 name2 name3</li>
          <li>class names: name1, name2, name3</li>
        </ul>

        <h3>MCQ</h3>
        {[
          {
            question:
              "What is the correct syntax to provide multiple class names as a value to the HTML class attribute?",
            options: [
              `<div class="name1 name2 name3">Content</div>`,
              `<div class="name1,name2,name3">Content</div>`,
              `<div class="name1;name2;name3">Content</div>`,
              `<div class="name1|name2|name3">Content</div>`,
            ],
            answer: `<div class="name1 name2 name3">Content</div>`,
          },
        ].map((q, idx) => renderMCQ(q, idx, "multipleclass"))}
      </section>

      {/* 3. Bootstrap Introduction */}
      <section>
        <h2>3. Bootstrap</h2>
        <p>
          Bootstrap is a large collection of predefined reusable Code Snippets written in HTML, CSS, and JavaScript.
        </p>

        <h3>3.1 How to use Bootstrap?</h3>
        <p>
          To use Bootstrap, we add the Bootstrap CDN inside the <code>&lt;head&gt;</code> element of our HTML.
        </p>

        <CodeBlock
          language="html"
          code={`<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>`}
        />

        <h3>MCQ</h3>
        {[
          {
            question:
              "What is a wide range of predefined reusable code snippets written in HTML, CSS, and JavaScript called?",
            options: ["Bootstrap", "CSS Ruleset", "attributes"],
            answer: "Bootstrap",
          },
        ].map((q, idx) => renderMCQ(q, idx, "bootstrapintro"))}
      </section>

      {/* 4. Bootstrap Buttons */}
      <section>
        <h2>3.2 Predefined Styles in Bootstrap</h2>
        <h3>3.2.1 Button</h3>
        <p>
          The Bootstrap class name <code>btn</code> is used to style the HTML <code>button</code> element.
        </p>

        <CodeBlock
          language="html"
          code={`<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-success">Success Button</button>`}
        />

        <p>
          To create outline buttons, replace <code>btn</code> with <code>btn-outline</code>.
        </p>

        <CodeBlock
          language="html"
          code={`<button class="btn btn-outline-primary">Outline Button</button>`}
        />

        <p className="note">
          📝 By default, Bootstrap class name <code>btn</code> has no background color.
        </p>

        <h3>MCQ</h3>
        {[
          {
            question:
              "Which Bootstrap class name is used to style the HTML button element?",
            options: ["button", "btn", "class", "style"],
            answer: "btn",
          },
        ].map((q, idx) => renderMCQ(q, idx, "bootstrapbutton"))}
      </section>

      {/* 5. Bootstrap Text Colors */}
      <section>
        <h3>3.2.2 Text Colors</h3>
        <p>To apply different colors to text, Bootstrap provides class names like:</p>

        <CodeBlock
          language="html"
          code={`<p class="text-primary">Primary Text</p>
<p class="text-danger">Danger Text</p>
<p class="text-success">Success Text</p>`}
        />
      </section>

      {/* 6. Bootstrap Text Transform */}
      <section>
        <h3>3.2.3 Text Transform</h3>
        <p>Bootstrap provides class names to transform text:</p>

        <CodeBlock
          language="html"
          code={`<p class="text-uppercase">Uppercase</p>
<p class="text-lowercase">Lowercase</p>
<p class="text-capitalize">Capitalize</p>`}
        />
      </section>

      {/* 7. Bootstrap Background Colors */}
      <section>
        <h3>3.2.4 Background Colors</h3>
        <p>Bootstrap provides class names to change background color:</p>

        <CodeBlock
          language="html"
          code={`<div class="bg-primary text-white p-3">Primary Background</div>
<div class="bg-danger text-white p-3">Danger Background</div>`}
        />
      </section>

      {/* 8. Warning */}
      <section>
        <h2>Warning</h2>
        <p className="warning">
          ⚠️ Using predefined Bootstrap class names as a selector in our own CSS may give unexpected results.
        </p>
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

export default Introductionto_BootStrap_CS_1;
