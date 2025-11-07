import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const LogicalOperators_CS_2 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted("True");
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Logical Operators | Cheat Sheet</h1>

      {/* Logical Operators */}
      <section>
        <h2>Logical Operators</h2>
        <p>The logical operators are used to perform logical operations on Boolean values. Gives True or False as the result.</p>
        <p>Following are the logical operators:</p>
        <ul>
          <li>and</li>
          <li>or</li>
          <li>not</li>
        </ul>
      </section>

      {/* Logical AND Operator */}
      <section>
        <h2>Logical AND Operator</h2>
        <p>Gives True if both the booleans are True else, it gives False</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`print(True and True)\nprint(True and False)\nprint(False and True)\nprint(False and False)`} />
        <h3>Output</h3>
        <OutputBlock output={["True, False, False, False"]} />
        <h3>Examples of Logical AND</h3>
        <CodeBlock language="python" code={`a = 5 > 3\nb = 10 == 10\nprint(a and b)`} />
        <h3>Step by Step Explanation</h3>
        <p>{"5 > 3 is True, 10 == 10 is True, so True and True is True"}</p>

        <h3>Output</h3>
        <OutputBlock output={"True"} />
      </section>

      {/* Logical OR Operator */}
      <section>
        <h2>Logical OR Operator</h2>
        <p>Gives True if any one of the booleans is True else, it gives False</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`print(True or True)\nprint(True or False)\nprint(False or True)\nprint(False or False)`} />
        <h3>Output</h3>
        <OutputBlock output={["True, True, True, False"]} />
        <h3>Examples of Logical OR</h3>
        <CodeBlock language="python" code={`a = 5 > 3\nb = 10 != 10\nprint(a or b)`} />
        <h3>Step by Step Explanation</h3>
        <p>{"5 > 3 is True, 10 != 10 is False, so True or False is True"}</p>
        <h3>Output</h3>
        <OutputBlock output={"True"} />
      </section>

      {/* Logical NOT Operator */}
      <section>
        <h2>Logical NOT Operator</h2>
        <p>Gives the opposite value of the given boolean.</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`print(not True)\nprint(not False)`} />
        <h3>Output</h3>
        <OutputBlock output={["False, True"]} />
        <h3>Examples of Logical NOT</h3>
        <CodeBlock language="python" code={`a = 5 > 3\nprint(not a)`} />
        <h3>Step by Step Explanation</h3>
        <p>{"5 > 3 is True, so not True is False"}</p>
        <h3>Output</h3>
        <OutputBlock output={"False"} />
      </section>

      {/* Summary */}
      <section>
        <h2>Summary</h2>
        <p>Logical AND Operator gives True if all the booleans are True.</p>
        <p>Logical OR Operator gives True if any of the booleans are True.</p>
        <p>Logical NOT Operator gives the opposite value</p>
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

export default LogicalOperators_CS_2;