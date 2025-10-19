import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Bootstrap_Navbar_CS = ({ onSubtopicComplete }) => {
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
      <h1>Bootstrap Components – Navbar</h1>

      {/* 1. Bootstrap Components */}
      <section>
        <h2>1. Bootstrap Components</h2>
        <h3>1.1 Navbar</h3>
        <p>
          A Navbar is a navigation header placed at the top of the page. With Bootstrap, a
          Navbar can extend or collapse depending on the device size.
        </p>

        <h3>1.1.1 HTML Nav element</h3>
        <p>
          The HTML <code>nav</code> element is a container element similar to <code>div</code>.
          It is used to add a Navbar to your website.
        </p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <!-- Navbar content -->
</nav>`}
        />

        <h3>1.1.2 Nav Items inside Navbar</h3>
        <CodeBlock
          language="html"
          code={`<ul class="navbar-nav">
  <li class="nav-item">Home</li>
  <li class="nav-item">About</li>
</ul>`}
        />

        <h3>1.1.3 Nav link</h3>
        <CodeBlock
          language="html"
          code={`<a class="nav-link" href="#">Home</a>`}
        />

        <h3>MCQ</h3>
        {[
          {
            question: "Which HTML element is used as a container for a Navbar?",
            options: ["div", "nav", "header", "section"],
            answer: "nav",
          },
        ].map((q, idx) => renderMCQ(q, idx, "navbar_element"))}
      </section>

      {/* 2. HTML Elements */}
      <section>
        <h2>2. HTML Elements</h2>
        <p>HTML elements can be divided into two categories:</p>
        <ul>
          <li>Block-level Elements</li>
          <li>Inline Elements</li>
        </ul>

        <h3>2.1 Block-level Elements</h3>
        <p>
          Block-level elements always start in a new line and take up the full width of their parent.
          Example: <code>h1</code>, <code>p</code>, <code>div</code>
        </p>

        <h3>2.2 Inline Elements</h3>
        <p>
          Inline elements do not start in a new line and take only as much width as necessary.
          Example: <code>button</code>, <code>img</code>, <code>a</code>
        </p>

        <h3>MCQ</h3>
        {[
          {
            question: "Which of these is a block-level element?",
            options: ["div", "img", "a", "span"],
            answer: "div",
          },
        ].map((q, idx) => renderMCQ(q, idx, "html_elements"))}
      </section>

      {/* 3. CSS Box properties */}
      <section>
        <h2>3. CSS Box Properties</h2>
        <h3>3.1 Margin</h3>
        <p>
          CSS margin can align block-level elements horizontally. The <code>auto</code> value
          centers the element inside its container.
        </p>

        <h3>3.1.1 Auto Value</h3>
        <CodeBlock
          language="css"
          code={`div {
  margin: 0 auto; /* centers element horizontally */
}`}
        />

        <h3>3.1.2 Auto Value with Margin Variants</h3>
        <p>Using <code>margin-left: auto</code> aligns an element to the right.</p>
        <p>Using <code>margin-right: auto</code> aligns an element to the left.</p>

        <CodeBlock
          language="css"
          code={`div.left-align {
  margin-right: auto;
}

div.right-align {
  margin-left: auto;
}`}
        />

        <h3>MCQ</h3>
        {[
          {
            question: "What does 'margin: 0 auto;' do?",
            options: [
              "Aligns element to left",
              "Aligns element to right",
              "Centers element horizontally",
              "Aligns element to top",
            ],
            answer: "Centers element horizontally",
          },
        ].map((q, idx) => renderMCQ(q, idx, "css_margin_auto"))}
      </section>

      {/* 4. Bootstrap Utilities */}
      <section>
        <h2>4. Bootstrap Utilities</h2>
        <h3>4.1 Margin</h3>
        <p>
          Bootstrap also provides <code>m-auto</code>, <code>ml-auto</code>, <code>mr-auto</code>
          for auto margins.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="m-auto">Centered using Bootstrap</div>`}
        />

        <h3>MCQ</h3>
        {[
          {
            question: "Which Bootstrap class centers an element horizontally?",
            options: ["m-0", "m-auto", "ml-5", "mr-5"],
            answer: "m-auto",
          },
        ].map((q, idx) => renderMCQ(q, idx, "bs_margin_auto"))}
      </section>

      {/* 5. Step by Step Process to build a Navbar */}
      <section>
        <h2>5. Step by Step Process to build a Navbar</h2>
        <ol>
          <li>Adding Bootstrap Navbar Component</li>
          <li>Adding Logo</li>
          <li>Aligning Nav Items</li>
          <li>Changing Navbar Background color</li>
        </ol>

        <CodeBlock
          language="html"
          code={`<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="#">Logo</a>
  <ul class="navbar-nav ml-auto">
    <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="#">About</a></li>
  </ul>
</nav>`}
        />
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

export default Bootstrap_Navbar_CS;
