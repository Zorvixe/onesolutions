import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const Introductionto_HTML_CS_1 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  // State for all MCQs
  const [mcqAnswers, setMcqAnswers] = useState({});

  const handleAnswer = (question, option) => {
    setMcqAnswers(prev => ({ ...prev, [question]: option }));
  };

  return (
    <div className="intro-container">
      <h1>HTML Cheat Sheet</h1>

      {/* 1. Basic Structure */}
      <section>
        <h2>Basic Structure</h2>
        <p>The basic structure of any HTML document is as follows:</p>
        <h3>Code</h3>
        <CodeBlock
          language="html"
          code={`<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <!-- Content goes here -->
  </body>
</html>`}
        />

        <h3>MCQs</h3>
        {[
          {
            question: "What is the correct basic structure of an HTML document?",
            options: [
              "<html></html>",
              "<!DOCTYPE html><html><head><title></title></head><body></body></html>",
              "<head><title></title></head><body></body>"
            ],
            answer: "<!DOCTYPE html><html><head><title></title></head><body></body></html>",
          },
        ].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option} style={{ margin: "4px 0" }}>
                <label>
                  <input
                    type="radio"
                    name={`basic_${idx}`}
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

      {/* 2. Heading Element */}
      <section>
        <h2>Heading Element</h2>
        <p>The HTML <code>&lt;h1&gt;</code> element defines a main heading.</p>

        <h3>MCQs</h3>
        {[
          {
            question: "The HTML h1 element is known as the ______ element.",
            options: ["paragraph", "button", "main heading"],
            answer: "main heading",
          }
        ].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option} style={{ margin: "4px 0" }}>
                <label>
                  <input
                    type="radio"
                    name={`heading_${idx}`}
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

      {/* 3. Paragraph Element */}
      <section>
        <h2>Paragraph Element</h2>
        <p>The HTML <code>&lt;p&gt;</code> element defines a paragraph.</p>

        <h3>MCQs</h3>
        {[
          {
            question: "Which of the following is the start tag of an HTML paragraph element?",
            options: ["<paragraph>", "<p>", "<para>"],
            answer: "<p>",
          }
        ].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option} style={{ margin: "4px 0" }}>
                <label>
                  <input
                    type="radio"
                    name={`paragraph_${idx}`}
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

      {/* 4. Button Element */}
      <section>
        <h2>Button Element</h2>
        <p>The HTML <code>&lt;button&gt;</code> element defines a button.</p>

        <h3>MCQs</h3>
        {[
          {
            question: "Which of the following is the start tag of an HTML button element?",
            options: ["<btn>", "<button>", '<input type="button">'],
            answer: "<button>",
          }
        ].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map(option => (
              <div key={option} style={{ margin: "4px 0" }}>
                <label>
                  <input
                    type="radio"
                    name={`button_${idx}`}
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

export default Introductionto_HTML_CS_1;
