import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const OnDemand_Session_CS = ({ onSubtopicComplete }) => {
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
      <h1>On-Demand Session Cheat Sheet</h1>

      {/* =========================== */}
      {/* 1. Getting URLs for Your Images */}
      {/* =========================== */}
      <section>
        <h2>1. Getting URLs for Your Images</h2>
        <p>
          You can get the URLs to your images using <strong>Cloudinary</strong>. 
          Cloudinary lets you easily upload images and provides the image URLs.
        </p>
        <p>
          Cloudinary Website: <a href="https://cloudinary.com/" target="_blank" rel="noopener noreferrer">https://cloudinary.com/</a>
        </p>
        <p className="note">Note: To Sign up, copy the Cloudinary URL and open in a new tab.</p>
      </section>

      {/* =========================== */}
      {/* 2. Install Visual Studio Code */}
      {/* =========================== */}
      <section>
        <h2>2. Install Visual Studio Code</h2>
        <ul>
          <li>Windows Operating System</li>
          <li>Ubuntu/Linux Operating System (Watch only for 2 minutes)</li>
          <li>Mac Operating System (Watch only for 2 minutes 30 seconds)</li>
        </ul>
      </section>

      {/* =========================== */}
      {/* 3. Linking HTML and CSS Files */}
      {/* =========================== */}
      <section>
        <h2>3. Linking HTML and CSS Files</h2>
        <p>
          Use the HTML <code>link</code> element to link HTML and CSS files. It is a void element.
        </p>
        <h3>Syntax</h3>
        <CodeBlock
          language="html"
          code={`<head>
  <link rel="stylesheet" href="styles.css">
</head>`}
        />
        <p className="note">Note: Add the <code>link</code> element inside the HTML <code>head</code> element.</p>

        <h3>MCQ</h3>
        {[
          {
            question: "Which HTML element is used to link the HTML and CSS files?",
            options: ["<link>", "<script>", "<a>", "<style>"],
            answer: "<link>",
          },
        ].map((q, idx) => renderMCQ(q, idx, "linkhtmlcss"))}
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

export default OnDemand_Session_CS;
