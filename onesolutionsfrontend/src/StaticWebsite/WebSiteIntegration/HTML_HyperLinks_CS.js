import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const HTML_HyperLinks_CS = ({ onSubtopicComplete }) => {
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
      <h1>HTML Hyperlinks & Void Elements Cheat Sheet</h1>

      {/* =========================== */}
      {/* 1. HTML Anchor Element */}
      {/* =========================== */}
      <section>
        <h2>1. HTML Anchor Element</h2>
        <p>The <code>a</code> element defines a hyperlink to navigate to other web resources or a specific element within the HTML document.</p>

        <h3>Syntax</h3>
        <CodeBlock
          language="html"
          code={`<a href="https://www.example.com">Visit Example</a>`}
        />

        <h3>1.1 HTML href Attribute</h3>
        <p>Specifies the URL or path where the link goes.</p>
        <CodeBlock
          language="html"
          code={`<a href="https://www.example.com">Visit Example</a>`}
        />

        <h3>1.2 HTML target Attribute</h3>
        <p>Specifies where to open the linked web resource.</p>
        <CodeBlock
          language="html"
          code={`<a href="https://www.example.com" target="_blank">Open in new tab</a>`}
        />

        <h3>MCQ</h3>
        {[
          {
            question: "What is the purpose of an HTML a (anchor) element?",
            options: [
              "To create a paragraph.",
              "To create a heading.",
              "To create a hyperlink.",
              "To create an image."
            ],
            answer: "To create a hyperlink.",
          },
        ].map((q, idx) => renderMCQ(q, idx, "anchor"))}
      </section>

      {/* =========================== */}
      {/* 2. Navigate within same HTML document */}
      {/* =========================== */}
      <section>
        <h2>2. Navigate within the same HTML document</h2>
        <p>Add an HTML <code>id</code> attribute to the section you want to navigate to and use <code>#idValue</code> in the link's <code>href</code>.</p>

        <CodeBlock
          language="html"
          code={`<a href="#section1">Go to Section 1</a>
<section id="section1">Section 1 Content</section>`}
        />

        <h3>MCQ</h3>
        {[
          {
            question: "HTML hyperlinks can be used to navigate within the same document.",
            options: ["True", "False"],
            answer: "True",
          },
        ].map((q, idx) => renderMCQ(q, idx, "navigate"))}
      </section>

      {/* =========================== */}
      {/* 3. HTML Image Element as Link */}
      {/* =========================== */}
      <section>
        <h2>3. HTML Image Element as Link</h2>
        <CodeBlock
          language="html"
          code={`<a href="https://www.example.com">
  <img src="image.jpg" alt="Example Image">
</a>`}
        />
      </section>

      {/* =========================== */}
      {/* 4. Most commonly used HTML Void Elements */}
      {/* =========================== */}
      <section>
        <h2>4. HTML Void Elements</h2>

        <h3>4.1 HTML Line Break (<code>br</code>)</h3>
        <p>Breaks the text and continues on the next line.</p>
        <CodeBlock
          language="html"
          code={`Hello<br>World`}
        />

        <h3>4.2 HTML Horizontal Rule (<code>hr</code>)</h3>
        <p>Inserts a horizontal line to separate content.</p>
        <CodeBlock
          language="html"
          code={`<hr>`}
        />

        <h3>MCQ</h3>
        {[
          {
            question: "Which HTML element is used to insert a horizontal line to separate content?",
            options: ["<br>", "<hr>", "<div>", "<p>"],
            answer: "<hr>",
          },
        ].map((q, idx) => renderMCQ(q, idx, "voidelements"))}
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

export default HTML_HyperLinks_CS;
