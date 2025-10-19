import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; 

const Problem_sol_Debugging_5_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Floor Division, Compound Assignment & Escape Characters | Cheat Sheet</h1>

      {/* Floor Division */}
      <section>
        <h2>Floor Division Operator</h2>
        <p>
          To find the integral part of a quotient, we use the Floor Division Operator <code>//</code>.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`a = 7\nb = 3\nprint(a // b)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[2]} />
      </section>

      {/* Compound Assignment Operators */}
      <section>
        <h2>Compound Assignment Operators</h2>
        <p>Different compound assignment operators include <code>+=, -=, *=, /=, %=</code>.</p>
        <p>
          For example, <code>a += 1</code> is similar to <code>a = a + 1</code>.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`a = 5\na += 1\nprint(a)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[6]} />
      </section>

      {/* Examples of Compound Assignment Operators */}
      <section>
        <h2>Examples of Compound Assignment Operators</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`x = 10\nx -= 3\nprint(x)\ny = 4\ny *= 2\nprint(y)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[7, 8]} />
      </section>

      {/* Escape Characters */}
      <section>
        <h2>Escape Characters</h2>
        <p>
          Escape characters are used to insert characters in a string that are otherwise illegal or difficult to type.
        </p>
        <h3>Examples</h3>
        <ul>
          <li><code>\n</code> → New Line</li>
          <li><code>\t</code> → Tab Space</li>
          <li><code>\\</code> → Backslash</li>
          <li><code>\'</code> → Single Quote</li>
          <li><code>\"</code> → Double Quote</li>
        </ul>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`print("Hello\\nWorld")\nprint("Hello\\tWorld")\nprint("She said: \\"Hi\\"")`}
        />
        <h3>Output</h3>
        <OutputBlock output={["Hello", "World", "Hello\tWorld", 'She said: "Hi"']} />
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

export default Problem_sol_Debugging_5_CS
