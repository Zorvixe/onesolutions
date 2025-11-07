import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const Seq_OF_Instruction_CS_3 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Sequence of Instructions | Cheat Sheet</h1>

      {/* Program */}
      <section>
        <h2>Program</h2>
        <p>A program is a sequence of instructions given to a computer.</p>
      </section>

      {/* Defining a Variable */}
      <section>
        <h2>Defining a Variable</h2>
        <p>A variable gets created when you assign a value to it for the first time.</p>
        <CodeBlock language="python" code={`age = 10`} />
      </section>

      {/* Printing Value in a Variable */}
      <section>
        <h2>Printing Value in a Variable</h2>
        <h3>Code</h3>
        <CodeBlock language="python" code={`age = 10\nprint(age)`} />
        <h3>Output</h3>
        <OutputBlock output={10} />
      </section>

      {/* Variable name in quotes */}
      <section>
        <h2>Variable name enclosed in quotes will print variable rather than the value in it.</h2>
        <p>If you intend to print value, do not enclose the variable in quotes.</p>
        <CodeBlock language="python" code={`age = 10\nprint("age")`} />
        <h3>Output</h3>
        <OutputBlock output={"age"} />
      </section>

      {/* Order of Instructions */}
      <section>
        <h2>Order of Instructions</h2>
        <p>Python executes the code line-by-line.</p>
        <CodeBlock language="python" code={`print(age)\nage = 10`} />
        <h3>Output</h3>
        <OutputBlock output={"NameError: name 'age' is not defined"} />
        <p>Variable age is not created by the time we tried to print.</p>
      </section>

      {/* Spacing in Python */}
      <section>
        <h2>Spacing in Python</h2>
        <p>Having spaces at the beginning of line causes errors.</p>
        <CodeBlock language="python" code={`  print(age)`} />
        <h3>Output</h3>
        <OutputBlock output={"IndentationError: unexpected indent"} />
      </section>

      {/* Variable Assignment */}
      <section>
        <h2>Variable Assignment</h2>
        <p>Values in the variables can be changed.</p>
        <CodeBlock language="python" code={`age = 10\nprint(age)\nage = 20\nprint(age)`} />
        <h3>Output</h3>
        <OutputBlock output={[10, 20]} />
      </section>

      {/* Examples of Variable Assignment */}
      <section>
        <h2>Examples of Variable Assignment</h2>
        <h3>Example 1</h3>
        <CodeBlock language="python" code={`name = "John"\nprint(name)\nname = "Jane"\nprint(name)`} />
        <h3>Output</h3>
        <OutputBlock output={["John", "Jane"]} />
        <h3>Example 2</h3>
        <CodeBlock language="python" code={`count = 5\nprint(count)\ncount += 1\nprint(count)`} />
        <h3>Output</h3>
        <OutputBlock output={[5, 6]} />
      </section>

      {/* Expression */}
      <section>
        <h2>Expression</h2>
        <p>An expression is a valid combination of values, variables and operators.</p>
        <h3>Examples</h3>
        <ul>
          <li>a * b</li>
          <li>a + 2</li>
          <li>5 * 2 + 3 * 4</li>
        </ul>
      </section>

      {/* BODMAS */}
      <section>
        <h2>BODMAS</h2>
        <p>The standard order of evaluating an expression</p>
        <ul>
          <li>Brackets (B)</li>
          <li>Orders (O)</li>
          <li>Division (D)</li>
          <li>Multiplication (M)</li>
          <li>Addition (A)</li>
          <li>Subtraction (S)</li>
        </ul>
        <h3>Step by Step Explanation</h3>
        <CodeBlock language="python" code={`print(5 * 2 + 3 * 4)`} />
        <h3>Output</h3>
        <OutputBlock output={22} />
        <p>Step 1: 5 * 2 = 10</p>
        <p>Step 2: 3 * 4 = 12</p>
        <p>Step 3: 10 + 12 = 22</p>
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

export default Seq_OF_Instruction_CS_3;