import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const NestedLoops_CS_1 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Nested Loops | Cheat Sheet</h1>

      {/* Nested Loops */}
      <section>
        <h2>Nested Loops</h2>
        <p>
          An inner loop within the repeating block of an outer loop is called a Nested Loop.
        </p>
        <p>
          The Inner Loop will be executed one time for each iteration of the Outer Loop.
        </p>
      </section>

      {/* Nested Repeating Block */}
      <section>
        <h2>Nested Repeating Block</h2>
        <p>
          The one highlighted in the blue dotted line is the repeating block of the inner
          loop.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`for i in range(3):\n    for j in range(2):\n        print(f"i={i}, j={j}")`}
        />
        <h3>Output</h3>
        <OutputBlock
          output={[
            "i=0, j=0",
            "i=0, j=1",
            "i=1, j=0",
            "i=1, j=1",
            "i=2, j=0",
            "i=2, j=1",
          ]}
        />
        <p>
          In the above example, the below line is the repeating block of the nested loop:
        </p>
        <CodeBlock
          language="python"
          code={`        print(f"i={i}, j={j}")`}
        />
      </section>

      {/* Examples - Nested Loops */}
      <section>
        <h2>Examples - Nested Loops</h2>
        <h3>Example - 1: While loop inside a For loop</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`for i in range(2):\n    count = 0\n    while count < 2:\n        print(f"i={i}, count={count}")\n        count += 1`}
        />
        <h3>Output</h3>
        <OutputBlock
          output={[
            "i=0, count=0",
            "i=0, count=1",
            "i=1, count=0",
            "i=1, count=1",
          ]}
        />

        <h3>Example - 2: While loop inside a while loop</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`outer = 0\nwhile outer < 2:\n    inner = 0\n    while inner < 2:\n        print(f"outer={outer}, inner={inner}")\n        inner += 1\n    outer += 1`}
        />
        <h3>Output</h3>
        <OutputBlock
          output={[
            "outer=0, inner=0",
            "outer=0, inner=1",
            "outer=1, inner=0",
            "outer=1, inner=1",
          ]}
        />
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

export default NestedLoops_CS_1;