import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Introductionto_Css_BoxModel_CS_2 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});

  const handleAnswer = (question, option) => {
    setMcqAnswers((prev) => ({ ...prev, [question]: option }));
  };

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>CSS Cheat Sheet – Box Properties & Colors</h1>

      {/* 1. Border Width */}
      <section>
        <h2>1. Border Width</h2>
        <p>
          The CSS <code>border-width</code> property specifies the width of the border for all four sides of an HTML element.
        </p>
        <CodeBlock
          language="css"
          code={`div {
  border-width: 0px; /* removes the border */
  border-style: solid; /* mandatory to see the border */
}`}
        />
        <h3>MCQ</h3>
        {[{
          question: "Which CSS Property can be used to set the border thickness of an HTML element?",
          options: ["height", "border-width", "width", "border"],
          answer: "border-width",
        }].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`borderwidth_${idx}`}
                    checked={mcqAnswers[q.question] === option}
                    onChange={() => handleAnswer(q.question, option)}
                  />{" "}
                  {option}
                </label>
              </div>
            ))}
            {mcqAnswers[q.question] && (
              <p style={{ fontWeight: "bold", color: mcqAnswers[q.question] === q.answer ? "green" : "red" }}>
                {mcqAnswers[q.question] === q.answer ? "✅ Correct" : `❌ Wrong. Correct answer: ${q.answer}`}
              </p>
            )}
          </div>
        ))}
      </section>

      {/* 2. Border Radius */}
      <section>
        <h2>2. Border Radius</h2>
        <p>
          The CSS <code>border-radius</code> property specifies the roundness of the corners of an HTML element.
        </p>
        <CodeBlock
          language="css"
          code={`div {
  border-bottom-left-radius: 10px;
  background-color: lightblue;
}`}
        />
        <h3>MCQ</h3>
        {[{
          question: "Which CSS Property is used to round the bottom left corner of an HTML element?",
          options: ["left-bottom-border-radius", "border-bottom-left-radius", "border-bottom-top-radius", "border-bottom-right-radius"],
          answer: "border-bottom-left-radius",
        }].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`borderradius_${idx}`}
                    checked={mcqAnswers[q.question] === option}
                    onChange={() => handleAnswer(q.question, option)}
                  />{" "}
                  {option}
                </label>
              </div>
            ))}
            {mcqAnswers[q.question] && (
              <p style={{ fontWeight: "bold", color: mcqAnswers[q.question] === q.answer ? "green" : "red" }}>
                {mcqAnswers[q.question] === q.answer ? "✅ Correct" : `❌ Wrong. Correct answer: ${q.answer}`}
              </p>
            )}
          </div>
        ))}
      </section>

      {/* 3. Border Color */}
      <section>
        <h2>3. Border Color</h2>
        <p>
          The CSS <code>border-color</code> property specifies the color of the border for all four sides of an HTML element.
        </p>
        <CodeBlock
          language="css"
          code={`div {
  border: 2px solid red; /* border-style mandatory */
}`}
        />
        <h3>MCQ</h3>
        {[{
          question: "Which CSS Property specifies the color for all the four borders of an HTML element?",
          options: ["border-color", "border-width", "color", "background-color"],
          answer: "border-color",
        }].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`bordercolor_${idx}`}
                    checked={mcqAnswers[q.question] === option}
                    onChange={() => handleAnswer(q.question, option)}
                  />{" "}
                  {option}
                </label>
              </div>
            ))}
            {mcqAnswers[q.question] && (
              <p style={{ fontWeight: "bold", color: mcqAnswers[q.question] === q.answer ? "green" : "red" }}>
                {mcqAnswers[q.question] === q.answer ? "✅ Correct" : `❌ Wrong. Correct answer: ${q.answer}`}
              </p>
            )}
          </div>
        ))}
      </section>

      {/* 4. Border Style */}
      <section>
        <h2>4. Border Style</h2>
        <p>
          The CSS <code>border-style</code> property specifies the style of the border for all four sides of an HTML element.
        </p>
        <CodeBlock
          language="css"
          code={`div {
  border-style: dashed; /* values: dotted, dashed, solid, none */
}`}
        />
        <h3>MCQ</h3>
        {[{
          question: "Which CSS Property specifies the style for all the four borders of an HTML element?",
          options: ["border-color", "border", "style", "border-style"],
          answer: "border-style",
        }].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`borderstyle_${idx}`}
                    checked={mcqAnswers[q.question] === option}
                    onChange={() => handleAnswer(q.question, option)}
                  />{" "}
                  {option}
                </label>
              </div>
            ))}
            {mcqAnswers[q.question] && (
              <p style={{ fontWeight: "bold", color: mcqAnswers[q.question] === q.answer ? "green" : "red" }}>
                {mcqAnswers[q.question] === q.answer ? "✅ Correct" : `❌ Wrong. Correct answer: ${q.answer}`}
              </p>
            )}
          </div>
        ))}
      </section>

      {/* 5. Padding */}
      <section>
        <h2>5. Padding</h2>
        <p>
          The CSS <code>padding</code> property specifies the space around the content of an HTML element.
        </p>
        <CodeBlock
          language="css"
          code={`div {
  padding: 20px;
  background-color: lightyellow;
}`}
        />
        <h3>MCQ</h3>
        {[{
          question: "Which of the following statements is true regarding the CSS Box Model?",
          options: [
            "Padding is the border surrounding the content of an HTML element.",
            "Padding is the background surrounding the content of an HTML element.",
            "Padding is the space surrounding the content of an HTML element.",
            "Padding is the border color of the content of an HTML element."
          ],
          answer: "Padding is the space surrounding the content of an HTML element.",
        }].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`padding_${idx}`}
                    checked={mcqAnswers[q.question] === option}
                    onChange={() => handleAnswer(q.question, option)}
                  />{" "}
                  {option}
                </label>
              </div>
            ))}
            {mcqAnswers[q.question] && (
              <p style={{ fontWeight: "bold", color: mcqAnswers[q.question] === q.answer ? "green" : "red" }}>
                {mcqAnswers[q.question] === q.answer ? "✅ Correct" : `❌ Wrong. Correct answer: ${q.answer}`}
              </p>
            )}
          </div>
        ))}
      </section>

      {/* 6. CSS Colors – Hex Code */}
      <section>
        <h2>6. CSS Colors – Hex Code</h2>
        <p>
          CSS colors can be represented using color names, hex codes, RGB, HSL, and more. Hex codes allow for a wide variety of colors.
        </p>
        <ul>
          <li>orange – <code>#ffa500</code></li>
          <li>red – <code>#ff0000</code></li>
          <li>blue – <code>#0000ff</code></li>
          <li>green – <code>#008000</code></li>
        </ul>
        <CodeBlock
          language="css"
          code={`div {
  color: #ff0000; /* red text using hex code */
  background-color: #008000; /* green background */
}`}
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

export default Introductionto_Css_BoxModel_CS_2;
