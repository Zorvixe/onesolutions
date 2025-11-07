import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Errors_Exceptions_CS_3 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Errors & Exceptions | Cheat Sheet</h1>

      {/* Types of Errors */}
      <section>
        <h2>Types of Errors</h2>
        <p>There are two major kinds of errors in Python:</p>
        <ul>
          <li><b>Syntax Errors:</b> Parsing errors due to incorrect Python syntax.</li>
          <li><b>Exceptions:</b> Errors detected during execution.</li>
        </ul>
      </section>

      {/* Syntax Errors */}
      <section>
        <h2>Syntax Errors</h2>
        <p>
          Syntax errors prevent the program from executing, even if the code with the error is not used.
        </p>
        <CodeBlock language="python" code={`def greet()\n    print("Hello")`} />
      </section>

      {/* Exceptions */}
      <section>
        <h2>Exceptions</h2>
        <p>
          Exceptions occur during execution even if the code is syntactically correct.
        </p>
        <p>Example scenarios:</p>
        <ul>
          <li>Internet disconnected while downloading a video.</li>
          <li>Insufficient storage space to download a file.</li>
        </ul>
        <CodeBlock language="python" code={`x = 5 / 0  # Raises ZeroDivisionError`} />
      </section>

      {/* Working With Exceptions */}
      <section>
        <h2>Working With Exceptions</h2>
        <p>
          Without handling, exceptions crash the program. Proper handling ensures robustness in:
        </p>
        <ul>
          <li>End-user applications</li>
          <li>Reusable modules</li>
        </ul>
      </section>

      {/* Raising Exceptions */}
      <section>
        <h2>Raising Exceptions</h2>
        <p>
          Raise exceptions to communicate unexpected states in your code.
        </p>
        <CodeBlock language="python" code={`raise ValueError("Invalid input")`} />
      </section>

      {/* Handling Exceptions */}
      <section>
        <h2>Handling Exceptions</h2>
        <p>
          Use <b>try-except</b> blocks to handle exceptions.
        </p>
        <CodeBlock language="python" code={`try:\n    x = int(input("Enter number: "))\nexcept ValueError as e:\n    print("Invalid input", e)`} />
      </section>

      {/* Handling Specific Exceptions */}
      <section>
        <h2>Handling Specific Exceptions</h2>
        <p>You can catch specific exceptions by naming them:</p>
        <CodeBlock language="python" code={`try:\n    x = 5 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")`} />
      </section>

      {/* Handling Multiple Exceptions */}
      <section>
        <h2>Handling Multiple Exceptions</h2>
        <p>Multiple <b>except</b> blocks can handle different types of exceptions:</p>
        <CodeBlock language="python" code={`try:\n    x = int(input())\n    y = 10 / x\nexcept ValueError:\n    print("Invalid input")\nexcept ZeroDivisionError:\n    print("Division by zero")`} />
      </section>

      {/* Summary */}
      <section>
        <h2>Summary</h2>
        <ul>
          <li>Raise exceptions in reusable modules to prevent misuse.</li>
          <li>Handle exceptions in end-user applications to avoid crashes.</li>
          <li>Catch specific exceptions using their class names.</li>
          <li>Use multiple except blocks to handle different exceptions differently.</li>
        </ul>
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

export default Errors_Exceptions_CS_3;
