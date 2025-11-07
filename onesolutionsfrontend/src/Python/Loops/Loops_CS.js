import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Loops_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Loops | Cheat Sheet</h1>

      {/* Intro */}
      <section>
        <h2>Loops</h2>
        <p>
          So far, Python executes code in sequence and each block runs once.
          Loops allow us to execute a block of code multiple times.
        </p>
      </section>

      {/* While Loop */}
      <section>
        <h2>While Loop</h2>
        <p>
          A <b>while loop</b> executes a block of code as long as the condition is{" "}
          <code>True</code>.
        </p>
      </section>

      {/* While Loop Example */}
      <section>
        <h2>While Loop Example</h2>
        <p>
          The following code snippet prints the next three consecutive numbers after a
          given number.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`num = int(input("Enter a number: "))\ncount = 0\nwhile count < 3:\n    num += 1\n    print(num)\n    count += 1`}
        />
        <h3>Input</h3>
        <OutputBlock output={["5"]} />
        <h3>Output</h3>
        <OutputBlock output={["6", "7", "8"]} />
      </section>

      {/* Possible Mistakes */}
      <section>
        <h2>Possible Mistakes</h2>

        <h3>1. Missing Initialization</h3>
        <CodeBlock
          language="python"
          code={`while count < 3:\n    print(count)\n    count += 1`}
        />
        <h3>Output</h3>
        <OutputBlock output={"NameError: name 'count' is not defined"} />

        <h3>2. Incorrect Termination Condition</h3>
        <CodeBlock
          language="python"
          code={`count = 0\nwhile count < 3:\n    print("Infinite loop")`}
        />
        <h3>Output</h3>
        <OutputBlock output={"Runs into an infinite loop"} />

        <h3>3. Not Updating Counter Variable</h3>
        <CodeBlock
          language="python"
          code={`count = 0\nwhile count < 3:\n    print(count)`}
        />
        <h3>Output</h3>
        <OutputBlock output={"Runs into an infinite loop"} />
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

export default Loops_CS;
