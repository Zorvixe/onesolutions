import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const InputEle_MathFunctions_CS = ({ onSubtopicComplete }) => {
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
    <div key={idx} className="mcq-question">
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
          className={`mcq-feedback ${
            mcqAnswers[q.question] === q.answer ? "correct" : "wrong"
          }`}
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
      <h1>Input Element and Math Functions | Cheat Sheet</h1>

      {/* 1. Math Functions */}
      <section>
        <h2>1. Math Functions</h2>

        <h3>1.1 Math.random()</h3>
        <p>
          Returns a random float number between 0 (inclusive) and 1 (exclusive).
        </p>
        <CodeBlock language="javascript" code={`console.log(Math.random()); // e.g., 0.123456`} />

        <h3>1.2 Math.ceil()</h3>
        <p>Rounds a number up to the next largest integer.</p>
        <CodeBlock language="javascript" code={`console.log(Math.ceil(4.3)); // 5`} />

        <p className="note">
          Try running the code multiple times and observe different outputs.
        </p>
      </section>

      {/* 2. HTML Elements */}
      <section>
        <h2>2. HTML Elements</h2>
        <h3>2.1 HTML Input Element</h3>
        <p>Used to accept data from the user. Different types include:</p>
        <ul>
          <li>Text</li>
          <li>Password</li>
          <li>Radio</li>
          <li>Date</li>
          <li>Checkbox</li>
        </ul>

        <h4>2.1.1 Text Input</h4>
        <CodeBlock language="html" code={`<input type="text" placeholder="Enter text"/>`} />
        <p className="note">Default type for the input element is text.</p>

        <h4>2.1.2 Password Input</h4>
        <CodeBlock language="html" code={`<input type="password" placeholder="Enter password"/>`} />
        <p>Provides secure entry for passwords.</p>
      </section>

      {/* 3. DOM Properties */}
      <section>
        <h2>3. DOM Properties</h2>
        <h3>3.1 value</h3>
        <p>Used to get or set the value of an input element:</p>
        <CodeBlock language="javascript" code={`const inputValue = document.getElementById('myInput').value;`} />
        <p className="note">
          Try different input values and check the output in the console.
        </p>
      </section>

      {/* 4. Comparison Operators */}
      <section>
        <h2>4. Comparison Operator</h2>
        <h3>4.1 Loose equal vs Strict equal (== vs ===)</h3>
        <p>
          <strong>Loose equal (==)</strong>: Compares values only, ignores types.<br />
          <strong>Strict equal (===)</strong>: Compares values and types.
        </p>
        <CodeBlock language="javascript" code={`console.log(5 == "5"); // true\nconsole.log(5 === "5"); // false`} />
        <p className="note">
          Try different inputs to see the difference between == and ===.
        </p>
      </section>

      {/* MCQs */}
      <section>
        <h3>MCQs</h3>
        {[
          {
            question: "Which function returns a random number between 0 and 1?",
            options: ["Math.ceil()", "Math.random()", "Math.floor()", "Math.round()"],
            answer: "Math.random()",
          },
          {
            question: "Which input type is used for password entry?",
            options: ["text", "password", "checkbox", "radio"],
            answer: "password",
          },
          {
            question: "What is the result of 5 === '5'?",
            options: ["true", "false", "undefined", "NaN"],
            answer: "false",
          },
        ].map((q, idx) => renderMCQ(q, idx, "input_math"))}
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

export default InputEle_MathFunctions_CS;
