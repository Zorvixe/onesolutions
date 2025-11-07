import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const ConditionalStmts_CS_3 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Conditional Statements | Cheat Sheet</h1>

      {/* Block of Code */}
      <section>
        <h2>Block of Code</h2>
        <p>A sequence of instructions are called block of code. Python executes code in a sequence.</p>
      </section>

      {/* Condition */}
      <section>
        <h2>Condition</h2>
        <p>An expression that results in either <code>True</code> or <code>False</code></p>
        <h3>Examples</h3>
        <ul>
          <li>2 &lt; 3</li> {/* Escaped < as &lt; */}
          <li>a == b</li> {/* Kept as text; == is fine here but could use &eq; if needed */}
          <li>True</li> {/* Kept as text; could use "True" for consistency */}
        </ul>
      </section>

      {/* Conditional Statement */}
      <section>
        <h2>Conditional Statement</h2>
        <p>
          Conditional Statement allows you to execute a block of code only when a specific condition is <code>True</code>
        </p>
      </section>

      {/* Conditional Block */}
      <section>
        <h2>Conditional Block</h2>
        <p>
          Block of code which executes only if a condition is <code>True</code> is called Conditional Block.
        </p>
      </section>

      {/* Indentation */}
      <section>
        <h2>Indentation</h2>
        <p>
          Space(s) in front of the conditional block is called indentation. Indentation(spacing) is used to identify Conditional Block. Standard practice is to use four spaces for indentation.
        </p>
      </section>

      {/* Possible Mistakes */}
      <section>
        <h2>Possible Mistakes</h2>
        <p>Each statement inside a conditional block should have the same indentation (spacing).</p>
        <h3>Wrong Code</h3>
        <CodeBlock language="python" code={`if True:\n  print("This is correct")\n   print("This is wrong")`} />
        <h3>Output</h3>
        <OutputBlock output={"IndentationError: unexpected indent"} />
        <h3>Correct Code</h3>
        <CodeBlock language="python" code={`if True:\n    print("This is correct")\n    print("This is also correct")`} />
      </section>

      {/* If-Else Syntax */}
      <section>
        <h2>If-Else Syntax</h2>
        <p>
          When If-Else conditional statement is used, Else block of code executes if the condition is <code>False</code>
        </p>
      </section>

      {/* Using If-Else */}
      <section>
        <h2>Using If-Else</h2>
        <h3>Code</h3>
        <CodeBlock language="python" code={`age = int(input("Enter your age: "))\nif age >= 18:\n    print("You are an adult")\nelse:\n    print("You are a minor")`} />
        <h3>Input</h3>
        <OutputBlock output={["20"]} />
        <h3>Output</h3>
        <OutputBlock output={"You are an adult"} />
      </section>

      {/* Possible Mistakes in If-Else */}
      <section>
        <h2>Possible Mistakes in If-Else</h2>
        <p>Else can only be used along with if condition. It is written below if conditional block</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`else:\n    print("This is wrong")`} />
        <h3>Output</h3>
        <OutputBlock output={"SyntaxError: invalid syntax"} />
        <p><b>Warning:</b>  No code is allowed in between if conditional block and else statement.</p>
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

export default ConditionalStmts_CS_3;