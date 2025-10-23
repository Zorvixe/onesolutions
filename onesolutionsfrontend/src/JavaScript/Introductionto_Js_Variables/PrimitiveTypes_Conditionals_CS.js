import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const PrimitiveTypes_Conditionals_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Primitive Types & Conditionals | Cheat Sheet</h1>

      {/* 1. JavaScript Values */}
      <section>
        <h2>1. JavaScript Values</h2>
        <p>Basically, in JavaScript, values are of two categories:</p>
        <ul>
          <li>Primitive Types</li>
          <li>Reference Types</li>
        </ul>

        <h3>1.1 Primitive Types</h3>
        <ul>
          <li>Number</li>
          <li>Boolean</li>
          <li>String</li>
          <li>Undefined, etc.</li>
        </ul>

        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Primitive Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Number</td>
              <td>All the numbers are of Number type.</td>
            </tr>
            <tr>
              <td>Boolean</td>
              <td>Boolean values are either true or false.</td>
            </tr>
            <tr>
              <td>String</td>
              <td>
                String is a stream of characters. It should be enclosed with
                Single quotes, Double quotes, or Backticks.
              </td>
            </tr>
            <tr>
              <td>Undefined</td>
              <td>
                If a value is not assigned to the variable, it takes{" "}
                <code>undefined</code> as its value.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 1.2 Operators */}
      <section>
        <h3>1.2 Operators</h3>
        <h4>1.2.1 typeof()</h4>
        <p>
          The <code>typeof()</code> operator is used to find the type of value.
        </p>

        <CodeBlock
          language="javascript"
          code={`let a = 900;\nlet b = 9.2;\nconsole.log(typeof(a));  // number\nconsole.log(typeof(b));  // number`}
        />

        <p>
          Try out changing different values in the below Code Playground and
          check the output in the console.
        </p>
      </section>

      {/* 2. Converting String to Number */}
      <section>
        <h2>2. Converting String to a Number</h2>
        <p>
          In JavaScript, when we combine a number and a string, it results in a
          string.
        </p>
        <p>
          The <code>parseInt()</code> function accepts a string and converts it
          into an integer.
        </p>

        <CodeBlock
          language="javascript"
          code={`let a = '20';\nconsole.log(typeof(a));  // string\n\nlet b = parseInt(a);\nconsole.log(typeof(b));  // number`}
        />
      </section>

      {/* 3. Conditional Statements */}
      <section>
        <h2>3. Conditional Statements</h2>
        <p>
          Conditional Statements allow you to execute a block of code only when
          a specific condition is true.
        </p>

        <h3>If...Else Statement:</h3>
        <p>Syntax:</p>

        <CodeBlock
          language="javascript"
          code={`if (conditionA) {\n  Block1;\n} else if (conditionB) {\n  Block2;\n} else {\n  Block3;\n}`}
        />

        <p>
          Try out changing the conditions or values in the below Code Playground
          and check the output.
        </p>
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

export default PrimitiveTypes_Conditionals_CS;
