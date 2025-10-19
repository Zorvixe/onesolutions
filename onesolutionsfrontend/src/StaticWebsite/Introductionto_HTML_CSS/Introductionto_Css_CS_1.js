import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const Introductionto_Css_CS_1 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});

  const handleAnswer = (question, option) => {
    setMcqAnswers(prev => ({ ...prev, [question]: option }));
  };

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>CSS Cheat Sheet</h1>

      {/* 1. HTML Elements - Container */}
      <section>
        <h2>HTML Elements</h2>
        <h3>1. Container Element</h3>
        <p>The HTML <code>&lt;div&gt;</code> element defines a container.</p>

        <h3>Code</h3>
        <CodeBlock
          language="html"
          code={`<div>
  <h1>Tourism</h1>
  <p>Plan your trip wherever you want to go</p>
  <button>Get Started</button>
</div>`}
        />

        <h3>MCQs</h3>
        {[{
          question: "Which HTML element is used as a container?",
          options: ["<span>", "<div>", "<section>"],
          answer: "<div>"
        }].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option} style={{ margin: "4px 0" }}>
                <label>
                  <input
                    type="radio"
                    name={`container_${idx}`}
                    checked={mcqAnswers[q.question] === option}
                    onChange={() => handleAnswer(q.question, option)}
                  />{" "}
                  <code>{option}</code>
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

      {/* 2. CSS Properties - Syntax */}
      <section>
        <h2>CSS Properties</h2>
        <h3>2. Syntax</h3>
        <p>Refer to the given CSS code and choose which of the following is a CSS Property.</p>

        <h3>Code</h3>
        <CodeBlock
          language="css"
          code={`.h-center {
  text-align: center;
}`}
        />

        <h3>MCQs</h3>
        {[{
          question: "Which of the following is a CSS Property?",
          options: ["text-align", ".h-center", "center"],
          answer: "text-align"
        }].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option} style={{ margin: "4px 0" }}>
                <label>
                  <input
                    type="radio"
                    name={`css_property_${idx}`}
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

      {/* 3. CSS Text Align */}
      <section>
        <h2>Text Align</h2>
        <h3>3. Text Align</h3>
        <p>The CSS <code>text-align</code> property specifies the horizontal alignment of the text in an HTML element.</p>
        <p>
          Value | Description<br/>
          center | Aligns the text to the center<br/>
          left   | Aligns the text to the left<br/>
          right  | Aligns the text to the right
        </p>

        <h3>Code</h3>
        <CodeBlock
          language="css"
          code={`.h-right {
  text-align: right;
}`}
        />

        <h3>MCQs</h3>
        {[{
          question: "Refer to the given CSS code and choose which of the following is a value for the CSS Property text-align",
          options: ["text-align", ".h-right", "right"],
          answer: "right"
        }].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option} style={{ margin: "4px 0" }}>
                <label>
                  <input
                    type="radio"
                    name={`text_align_${idx}`}
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

export default Introductionto_Css_CS_1;
