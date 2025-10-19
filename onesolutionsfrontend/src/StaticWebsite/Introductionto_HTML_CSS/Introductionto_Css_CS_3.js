import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Introductionto_Css_CS_3 = ({ onSubtopicComplete }) => {
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
      <h1>CSS Cheat Sheet – Font & Text Decoration</h1>

      {/* 1. Font Family */}
      <section>
        <h2>1. Font Family</h2>
        <p>
          The CSS <code>font-family</code> property specifies the font for an element.
        </p>
        <ul>
          <li>To use font families, you need to import their style sheets into your CSS file.</li>
          <li>There shouldn't be any spelling mistakes in the values.</li>
          <li>There must be quotations around the value of the <code>font-family</code> property.</li>
        </ul>

        <CodeBlock
          language="css"
          code={`h1 {
  font-family: "Roboto";
}

p {
  font-family: "Times New Roman";
}`}
        />

        <h3>MCQ</h3>
        {[{
          question: "Which of the following is a valid value of the CSS property font-family?",
          options: ["blue", '"Roboto"', "red", "center"],
          answer: '"Roboto"',
        }].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`font_family_${idx}`}
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

      {/* 2. Font Size */}
      <section>
        <h2>2. Font Size</h2>
        <p>
          The CSS <code>font-size</code> property specifies the size of the font.
        </p>
        <ul>
          <li>You must add <code>px</code> after the number.</li>
          <li>No space between the number and px.</li>
          <li>No quotes required around the value.</li>
        </ul>

        <CodeBlock
          language="css"
          code={`p {
  font-size: 20px;
}`}
        />

        <h3>MCQ</h3>
        {[{
          question: "Fill in the blank with an appropriate value for the CSS property font-size.",
          options: ["center", "blue", '"Roboto"', "20px"],
          answer: "20px",
        }].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`font_size_${idx}`}
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

      {/* 3. Font Style */}
      <section>
        <h2>3. Font Style</h2>
        <p>
          The CSS <code>font-style</code> property specifies the font style for text.
        </p>
        <ul>
          <li>Valid values: <code>normal</code>, <code>italic</code>, <code>oblique</code>.</li>
          <li>No quotes required.</li>
        </ul>

        <CodeBlock
          language="css"
          code={`p {
  font-style: italic;
}`}
        />

        <h3>MCQ</h3>
        {[{
          question: "Fill in the blank with an appropriate value for the CSS property font-style.",
          options: ["20px", "italic", "blue", '"Roboto"'],
          answer: "italic",
        }].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`font_style_${idx}`}
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

      {/* 4. Font Weight */}
      <section>
        <h2>4. Font Weight</h2>
        <p>
          The CSS <code>font-weight</code> property specifies how thick or thin characters should be displayed.
        </p>
        <ul>
          <li>Valid values: <code>normal</code>, <code>bold</code>, <code>bolder</code>, <code>lighter</code>, 100–900.</li>
          <li>No quotes required.</li>
        </ul>

        <CodeBlock
          language="css"
          code={`h1 {
  font-weight: bold;
}

p {
  font-weight: 600;
}`}
        />

        <h3>MCQ</h3>
        {[{
          question: "The CSS _______ property specifies how thick or thin characters in text should be displayed.",
          options: ["font-style", "font-family", "font-size", "font-weight"],
          answer: "font-weight",
        }].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`font_weight_${idx}`}
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

      {/* 5. Text Decoration */}
      <section>
        <h2>5. Text Decoration</h2>
        <p>
          The CSS <code>text-decoration</code> property specifies the decoration added to the text.
        </p>
        <ul>
          <li>Values: <code>underline</code>, <code>line-through</code>, <code>overline</code>.</li>
          <li>No quotes required.</li>
        </ul>

        <CodeBlock
          language="css"
          code={`h1 {
  text-decoration: underline;
}

p {
  text-decoration: line-through;
}`}
        />

        <h3>MCQ</h3>
        {[{
          question: "Fill in the blank with an appropriate value for the CSS property text-decoration.",
          options: ["bold", "underline", '"Roboto"', "20px"],
          answer: "underline",
        }].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`text_decoration_${idx}`}
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

export default Introductionto_Css_CS_3;
