import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const Introductionto_Css_CS_2 = ({ onSubtopicComplete }) => {
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
      <h1>CSS Cheat Sheet - Text & Background Properties</h1>

      {/* 1. Text Color */}
      <section>
        <h2>CSS Text Properties</h2>
        <h3>1. Color</h3>
        <p>The CSS <code>color</code> property specifies the color of the text.</p>

        <h3>Sample Colors</h3>
        <CodeBlock
          language="css"
          code={`h1 {
  color: grey;
}

p {
  color: blue;
}

span {
  color: red;
}`}
        />

        <h3>MCQs</h3>
        {[{
          question: "Fill in the blank with CSS property to apply grey color to an HTML heading element.",
          options: ["color", "text-color", "text-align", "all of the above"],
          answer: "color"
        }].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option} style={{ margin: "4px 0" }}>
                <label>
                  <input
                    type="radio"
                    name={`text_color_${idx}`}
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

      {/* 2. Background Color */}
      <section>
        <h2>CSS Background Properties</h2>
        <h3>2. Background Color</h3>
        <p>The CSS <code>background-color</code> property specifies the background color of an HTML element.</p>

        <h3>Code Example</h3>
        <CodeBlock
          language="css"
          code={`div.container {
  background-color: lightblue;
}

section {
  background-color: orange;
}`}
        />

        <h3>MCQs</h3>
        {[{
          question: "Fill in the blank with appropriate CSS property to apply background color to an HTML container element.",
          options: ["background-color", "color", "text-align", "all of these options"],
          answer: "background-color"
        }].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option} style={{ margin: "4px 0" }}>
                <label>
                  <input
                    type="radio"
                    name={`background_color_${idx}`}
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

export default Introductionto_Css_CS_2;
