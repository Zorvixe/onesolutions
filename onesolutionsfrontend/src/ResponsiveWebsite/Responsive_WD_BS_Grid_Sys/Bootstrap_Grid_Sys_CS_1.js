import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Bootstrap_Grid_Sys_CS_1 = ({ onSubtopicComplete }) => {
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

      {/* 1. Column Wrapping */}
      <section>
        <h2>1. Column Wrapping</h2>
        <p>
          When we place more than 12 grid columns in a single row, the extra columns
          wrap to a new line.
        </p>
        <p>Try combinations like:</p>
        <ul>
          <li>col-4, col-4, col-6</li>
          <li>col-6, col-4, col-6, col-4</li>
        </ul>

        <CodeBlock
          language="html"
          code={`<div class="row">
  <div class="col-4">Col 1</div>
  <div class="col-4">Col 2</div>
  <div class="col-6">Col 3 (wraps)</div>
</div>`}
        />
      </section>

      {/* 2. Layout at different Breakpoints */}
      <section>
        <h2>2. Layout at Different Breakpoints</h2>
        <p>
          Bootstrap provides column class prefixes for 5 responsive tiers:
        </p>
        <table>
          <thead>
            <tr>
              <th>Device</th>
              <th>Width</th>
              <th>Class Prefix</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Extra small</td>
              <td>&lt;576px</td>
              <td>col-</td>
            </tr>
            <tr>
              <td>Small</td>
              <td>&gt;=576px</td>
              <td>col-sm-</td>
            </tr>
            <tr>
              <td>Medium</td>
              <td>&gt;=768px</td>
              <td>col-md-</td>
            </tr>
            <tr>
              <td>Large</td>
              <td>&gt;=992px</td>
              <td>col-lg-</td>
            </tr>
            <tr>
              <td>Extra Large</td>
              <td>&gt;=1200px</td>
              <td>col-xl-</td>
            </tr>
          </tbody>
        </table>

        <CodeBlock
          language="html"
          code={`<div class="row">
  <div class="col-12 col-md-6 col-lg-4">Column</div>
  <div class="col-12 col-md-6 col-lg-8">Column</div>
</div>`}
        />

        <div className="note">
          Note :  Bootstrap follows a <strong>Mobile First Approach</strong>. Design the mobile layout first; larger devices adopt it automatically.
        </div>

        <h3>MCQ</h3>
        {[
          {
            question:
              "Which Bootstrap prefix is used for medium devices (>=768px)?",
            options: ["col-sm-", "col-md-", "col-lg-", "col-xl-"],
            answer: "col-md-",
          },
        ].map((q, idx) => renderMCQ(q, idx, "breakpoints"))}
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

export default Bootstrap_Grid_Sys_CS_1;
