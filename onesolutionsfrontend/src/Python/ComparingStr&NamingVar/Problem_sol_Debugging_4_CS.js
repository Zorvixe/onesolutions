import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // adjust path as needed

const Debugging_CS_4 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Round & Debugging | Cheat Sheet</h1>

      {/* Rounding Numbers */}
      <section>
        <h2>Rounding Numbers</h2>
        <p>
          The <code>round(number, digits(optional))</code> function rounds a float value to the given number of decimal digits.
        </p>
        <p>
          <strong>digits</strong> defines the number of decimal digits to round to. When not specified, the default is <code>0</code>.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`x = 3.14159\nprint(round(x, 2))`}
        />
        <h3>Output</h3>
        <OutputBlock output={[3.14]} />
      </section>

      {/* Floating Point Approximation */}
      <section>
        <h2>Floating Point Approximation</h2>
        <p>Float values are stored approximately, which can lead to small errors.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`x = 0.1 + 0.2\nprint(x)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[0.30000000000000004]} />
      </section>

      {/* Using round() to Fix Errors */}
      <section>
        <h2>Fixing Floating Point Errors with round()</h2>
        <p>To avoid unexpected floating point results, use <code>round()</code>.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`x = 0.1 + 0.2\nprint(round(x, 2))`}
        />
        <h3>Output</h3>
        <OutputBlock output={[0.3]} />
      </section>

      {/* Comments */}
      <section>
        <h2>Comments</h2>
        <p>
          Comments start with a hash <code>#</code>. They can be on their own line or next to code statements.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`# This is a comment\nx = 10  # Comment after a statement\nprint(x)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[10]} />
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

export default Debugging_CS_4;
