import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path if needed

const Nested_con_CS_1 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Nested Conditional Statements | Cheat Sheet</h1>

      {/* Intro */}
      <section>
        <h2>Nested Conditional Statements</h2>
        <p>
          The conditional block inside another <code>if/else</code> block is called a{" "}
          <b>nested conditional block</b>.
        </p>
        <p>
          In the below example, <b>Block 2</b> is nested and <b>Condition B</b> is
          called a nested conditional statement.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`x = 10\nif x > 5:   # Block 1\n    if x % 2 == 0:   # Block 2\n        print("x is greater than 5 and even")`}
        />
        <h3>Output</h3>
        <OutputBlock output={"x is greater than 5 and even"} />
      </section>

      {/* Nested in Else */}
      <section>
        <h2>Nested Condition in Else Block</h2>
        <p>
          We can also write nested conditions inside the <code>else</code> block.
          In the below example, <b>Block 2</b> is inside <code>else</code>.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`x = 3\nif x > 5:\n    print("x is greater than 5")\nelse:   # Block 1\n    if x % 2 != 0:   # Block 2\n        print("x is less than or equal to 5 and odd")`}
        />
        <h3>Output</h3>
        <OutputBlock output={"x is less than or equal to 5 and odd"} />
      </section>

      {/* Elif */}
      <section>
        <h2>Elif Statement</h2>
        <p>
          Use the <code>elif</code> statement to add multiple conditions between{" "}
          <code>if</code> and <code>else</code>.
        </p>
        <p>The <code>elif</code> statement is optional.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`x = 15\nif x < 10:\n    print("x is less than 10")\nelif x < 20:\n    print("x is between 10 and 20")\nelif x < 30:\n    print("x is between 20 and 30")\nelse:\n    print("x is greater than or equal to 30")`}
        />
        <h3>Output</h3>
        <OutputBlock output={"x is between 10 and 20"} />
      </section>

      {/* Possible Mistake */}
      <section>
        <h2>Possible Mistake</h2>
        <p>
          ❌ You cannot write an <code>elif</code> statement after an{" "}
          <code>else</code> statement.
        </p>
        <h3>Wrong Code</h3>
        <CodeBlock
          language="python"
          code={`x = 5\nif x > 10:\n    print("Greater")\nelse:\n    print("Smaller")\nelif x == 5:\n    print("Equal")`}
        />
        <h3>Output</h3>
        <OutputBlock output={"SyntaxError: invalid syntax"} />
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

export default Nested_con_CS_1;
