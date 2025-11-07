import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const ForLoop_CS_2 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>For Loop | Cheat Sheet</h1>

      {/* For Loop */}
      <section>
        <h2>For Loop</h2>
        <p>The <code>for</code> statement iterates over each item of a sequence.</p>
      </section>

      {/* Examples of Sequences */}
      <section>
        <h2>Examples of Sequences</h2>
        <ul>
          <li>Sequence of Characters (string)</li>
          <li>Sequence of numbers, etc.</li>
        </ul>
      </section>

      {/* For Syntax */}
      <section>
        <h2>For Syntax</h2>
        <h3>Code</h3>
        <CodeBlock language="python" code={`for item in "hello":\n    print(item)`} />
        <h3>Output</h3>
        <OutputBlock output={["h", "e", "l", "l", "o"]} />
      </section>

      {/* Range */}
      <section>
        <h2>Range</h2>
        <p>Generates a sequence of integers starting from 0. Syntax: <code>range(n)</code>. Stops before <code>n</code> (n is not included).</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`for i in range(4):\n    print(i)`} />
        <h3>Output</h3>
        <OutputBlock output={[0, 1, 2, 3]} />
      </section>

      {/* Range with Start and End */}
      <section>
        <h2>Range with Start and End</h2>
        <p>Generates a sequence of numbers starting from <code>start</code>. Syntax: <code>range(start, end)</code>. Stops before <code>end</code> (end is not included).</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`for i in range(2, 5):\n    print(i)`} />
        <h3>Output</h3>
        <OutputBlock output={[2, 3, 4]} />
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

export default ForLoop_CS_2;