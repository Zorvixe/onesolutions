import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Introductionto_Css_BoxModel_CS_1 = ({ onSubtopicComplete }) => {
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
      <h1>CSS Cheat Sheet – Box Properties & Viewport</h1>

      {/* 1. Height */}
      <section>
        <h2>1. Height</h2>
        <p>
          The CSS <code>height</code> property specifies the height of an HTML element.
        </p>

        <CodeBlock
          language="css"
          code={`div {
  height: 200px;
  background-color: lightblue;
}`}
        />

        <h3>MCQ</h3>
        {[{
          question: "Which CSS Property specifies the height of an HTML element?",
          options: ["height", "width", "color", "background-color"],
          answer: "height",
        }].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`height_${idx}`}
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

      {/* 2. Width */}
      <section>
        <h2>2. Width</h2>
        <p>
          The CSS <code>width</code> property specifies the width of an HTML element.
        </p>

        <CodeBlock
          language="css"
          code={`div {
  width: 400px;
  background-color: pink;
}`}
        />

        <h3>MCQ</h3>
        {[{
          question: "Which CSS Property specifies the width of an HTML element?",
          options: ["width", "height", "margin", "padding"],
          answer: "width",
        }].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`width_${idx}`}
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

      {/* 3. Background Image */}
      <section>
        <h2>3. Background Image</h2>
        <p>
          The CSS <code>background-image</code> property sets the background image of an HTML element.
        </p>
        <ul>
          <li>The background image takes the height of the content if no height is set.</li>
          <li>The URL must be valid to display the image.</li>
        </ul>

        <CodeBlock
          language="css"
          code={`div {
  height: 300px;
  background-image: url("banner.jpg");
  background-size: cover;
}`}
        />

        <h3>MCQ</h3>
        {[{
          question: "Which CSS Property specifies the background image of an HTML element?",
          options: ["background", "bg-image", "color", "background-image"],
          answer: "background-image",
        }].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`bgimage_${idx}`}
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

      {/* 4. Viewport Units */}
      <section>
        <h2>4. Viewport Units</h2>
        <p>
          The browser's viewport is the area of the window where the web content is visible.
        </p>
        <ul>
          <li><code>1vh</code> = 1% of viewport height</li>
          <li><code>1vw</code> = 1% of viewport width</li>
        </ul>

        <CodeBlock
          language="css"
          code={`section {
  height: 100vh;
  width: 100vw;
  background-color: lightgreen;
}`}
        />

        <h3>MCQ</h3>
        {[{
          question: "Which CSS unit equals 1% of the height of the viewport?",
          options: ["px", "vh", "vw", "h"],
          answer: "vh",
        }].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`viewport_${idx}`}
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

export default Introductionto_Css_BoxModel_CS_1;
