import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Primitive_Types_Conditionals_CS = ({ onSubtopicComplete }) => {
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
      <h1>Primitive Types & Conditionals | Cheat Sheet</h1>

      {/* 1. JavaScript Values */}
      <section>
        <h2>1. JavaScript Values</h2>
        <p>Values in JavaScript are of two categories:</p>
        <ul>
          <li>Primitive Types</li>
          <li>Reference Types</li>
        </ul>

        <h3>1.1 Primitive Types</h3>
        <ul>
          <li>
            <strong>Number:</strong> All numbers are of Number type.
          </li>
          <li>
            <strong>Boolean:</strong> Boolean values are either true or false.
          </li>
          <li>
            <strong>String:</strong> Stream of characters enclosed in '', "", or ``.
          </li>
          <li>
            <strong>Undefined:</strong> Value not assigned to a variable. JS uses
            <code>undefined</code>.
          </li>
        </ul>

        <h3>1.2 Operators</h3>
        <h4>1.2.1 typeof()</h4>
        <p>Used to find the type of a value:</p>
        <CodeBlock language="javascript" code={`let name = "Alice";\nconsole.log(typeof name); // "string"`} />

        <p className="note">
          Try changing the values in the code playground and check output in the console.
        </p>
      </section>

      {/* 2. Converting String to Number */}
      <section>
        <h2>2. Converting String to a Number</h2>
        <p>
          Combining a number and string results in a string. Use <code>parseInt()</code> to convert string to integer.
        </p>
        <CodeBlock language="javascript" code={`let str = "123";\nlet num = parseInt(str);\nconsole.log(num); // 123`} />
      </section>

      {/* 3. Conditional Statements */}
      <section>
        <h2>3. Conditional Statements</h2>
        <p>
          Execute a block of code only when a specific condition is true.
        </p>

        <h3>If...Else Statement</h3>
        <CodeBlock language="javascript" code={`let age = 18;\nif(age >= 18) {\n  console.log("Adult");\n} else {\n  console.log("Minor");\n}`} />

        <p className="note">
          Try changing the values in the playground to see different outputs.
        </p>
      </section>

      {/* MCQs */}
      <section>
        <h3>MCQs</h3>
        {[
          {
            question: "Which of the following is a primitive type in JavaScript?",
            options: ["Array", "Object", "Number", "Function"],
            answer: "Number",
          },
          {
            question: "What does typeof(true) return?",
            options: ["boolean", "string", "number", "undefined"],
            answer: "boolean",
          },
          {
            question: "Which statement executes a block only if condition is false?",
            options: ["if", "else", "switch", "for"],
            answer: "else",
          },
        ].map((q, idx) => renderMCQ(q, idx, "primitive_conditionals"))}
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

export default Primitive_Types_Conditionals_CS;
