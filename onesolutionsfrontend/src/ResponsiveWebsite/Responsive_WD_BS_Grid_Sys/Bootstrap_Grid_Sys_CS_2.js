import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust the path if needed

const Bootstrap_Grid_Sys_CS_2 = ({ onSubtopicComplete }) => {
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
      <h1>Bootstrap Box Properties & Spacing Utilities</h1>

      {/* 1. CSS Box Properties */}
      <section>
        <h2>1. CSS Box Properties</h2>
        <h3>1.1 Margin</h3>
        <p>
          We can get spacing between two HTML elements with the CSS Box property{" "}
          <code>margin</code>. To get space only on one side, we use Margin Variants:
        </p>
        <ul>
          <li>margin-top</li>
          <li>margin-right</li>
          <li>margin-bottom</li>
          <li>margin-left</li>
        </ul>

        <p>Try changing the Margin Variants in the Code Playground.</p>

        <CodeBlock
          language="css"
          code={`div {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
}`}
        />

        <h3>MCQ</h3>
        {[
          {
            question: "Which CSS property is used to get spacing between elements?",
            options: ["padding", "margin", "border", "spacing"],
            answer: "margin",
          },
        ].map((q, idx) => renderMCQ(q, idx, "css_margin"))}
      </section>

      {/* 2. Bootstrap Spacing Utilities */}
      <section>
        <h2>2. Bootstrap Spacing Utilities</h2>

        {/* 2.1 Margin */}
        <h3>2.1 Margin</h3>
        <p>Bootstrap class names for margin:</p>
        <table>
          <thead>
            <tr>
              <th>CSS Margin Property</th>
              <th>Bootstrap Class Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>margin</td>
              <td>m-*</td>
            </tr>
            <tr>
              <td>margin-top</td>
              <td>mt-*</td>
            </tr>
            <tr>
              <td>margin-right</td>
              <td>mr-*</td>
            </tr>
            <tr>
              <td>margin-bottom</td>
              <td>mb-*</td>
            </tr>
            <tr>
              <td>margin-left</td>
              <td>ml-*</td>
            </tr>
          </tbody>
        </table>

        <h3>2.1.1 Margin Values</h3>
        <table>
          <thead>
            <tr>
              <th>Size</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>1</td>
              <td>0.25 * spacer</td>
            </tr>
            <tr>
              <td>2</td>
              <td>0.5 * spacer</td>
            </tr>
            <tr>
              <td>3</td>
              <td>1 * spacer</td>
            </tr>
            <tr>
              <td>4</td>
              <td>1.5 * spacer</td>
            </tr>
            <tr>
              <td>5</td>
              <td>3 * spacer</td>
            </tr>
          </tbody>
        </table>
        <p>Spacer = 16px by default. Example: <code>mb-3 = 16px</code>, <code>m-5 = 48px</code>.</p>
        <p className="note">
          Note: Avoid using CSS margin-left and margin-right for Bootstrap Grid Columns; it may break the layout.
        </p>

        <h3>MCQ</h3>
        {[
          {
            question: "What Bootstrap class is used for top margin?",
            options: ["mt-*", "mb-*", "m-*", "ml-*"],
            answer: "mt-*",
          },
        ].map((q, idx) => renderMCQ(q, idx, "bs_margin"))}

        {/* 2.2 Padding */}
        <h3>2.2 Padding</h3>
        <p>Bootstrap class names for padding:</p>
        <table>
          <thead>
            <tr>
              <th>CSS Padding Property</th>
              <th>Bootstrap Class Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>padding</td>
              <td>p-*</td>
            </tr>
            <tr>
              <td>padding-top</td>
              <td>pt-*</td>
            </tr>
            <tr>
              <td>padding-right</td>
              <td>pr-*</td>
            </tr>
            <tr>
              <td>padding-bottom</td>
              <td>pb-*</td>
            </tr>
            <tr>
              <td>padding-left</td>
              <td>pl-*</td>
            </tr>
          </tbody>
        </table>

        <h3>2.2.1 Padding Values</h3>
        <table>
          <thead>
            <tr>
              <th>Size</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>1</td>
              <td>0.25 * spacer</td>
            </tr>
            <tr>
              <td>2</td>
              <td>0.5 * spacer</td>
            </tr>
            <tr>
              <td>3</td>
              <td>1 * spacer</td>
            </tr>
            <tr>
              <td>4</td>
              <td>1.5 * spacer</td>
            </tr>
            <tr>
              <td>5</td>
              <td>3 * spacer</td>
            </tr>
          </tbody>
        </table>
        <p>Example: <code>p-1 = 4px</code>, <code>pt-4 = 24px</code>.</p>

        <h3>MCQ</h3>
        {[
          {
            question: "What Bootstrap class is used for left padding?",
            options: ["pl-*", "pr-*", "pt-*", "pb-*"],
            answer: "pl-*",
          },
        ].map((q, idx) => renderMCQ(q, idx, "bs_padding"))}
      </section>

      {/* 3. Bootstrap Background Color Utilities */}
      <section>
        <h2>3. Bootstrap Background Color Utilities</h2>
        <p>Use Bootstrap class names to apply background colors to HTML elements.</p>

        <CodeBlock
          language="html"
          code={`<div class="bg-primary text-white p-2">Primary Background</div>
<div class="bg-success text-white p-2">Success Background</div>`}
        />
        <p className="note">
          Note: In the example, we used <code>p-2</code> for padding.
        </p>

        <h3>MCQ</h3>
        {[
          {
            question: "Which Bootstrap class applies a primary background color?",
            options: ["bg-primary", "text-primary", "p-2", "bg-success"],
            answer: "bg-primary",
          },
        ].map((q, idx) => renderMCQ(q, idx, "bs_bgcolor"))}
      </section>

      {/* 4. Developing Layouts for Five Responsive Breakpoints */}
      <section>
        <h2>4. Developing Layouts for Five Responsive Breakpoints</h2>
        <h3>4.1 Color Palette</h3>
        <p>Bootstrap provides a color palette for each responsive breakpoint.</p>

        <CodeBlock
          language="html"
          code={`<div class="bg-primary">Primary</div>
<div class="bg-secondary">Secondary</div>
<div class="bg-success">Success</div>`}
        />

        <h3>MCQ</h3>
        {[
          {
            question: "Bootstrap provides background color utilities for which elements?",
            options: ["Only text", "Only divs", "All HTML elements", "Only buttons"],
            answer: "All HTML elements",
          },
        ].map((q, idx) => renderMCQ(q, idx, "bs_palette"))}
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

export default Bootstrap_Grid_Sys_CS_2;
