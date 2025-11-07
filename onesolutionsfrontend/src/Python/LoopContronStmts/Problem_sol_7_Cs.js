import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path if needed

const Problem_sol_7_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Problem Solving - Part 7 | Cheat Sheet</h1>

      {/* Introduction */}
      <section>
        <h2>Compound Assignment Operators</h2>
        <p>
          Compound assignment operators combine an operation with assignment. 
          They simplify code by performing the operation and assignment in one step.
        </p>
        <p>
          Common operators: <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code>, <code>%=</code>
        </p>
      </section>

      {/* Example: a += 1 */}
      <section>
        <h2>a += 1</h2>
        <p>
          This is equivalent to <code>a = a + 1</code>.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`a = 5\na += 1\nprint(a)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[6]} />
      </section>

      {/* Example: row += ... */}
      <section>
        <h2>Using += with strings</h2>
        <p>
          You can append strings using <code>+=</code> operator.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`row = "Hello "\nrow += "World"\nprint(row)`}
        />
        <h3>Output</h3>
        <OutputBlock output={["Hello World"]} />
      </section>

      {/* Example: row += left_spaces * " " + "5 " + middle_spaces * " " + str(i + 4) + " " */}
      <section>
        <h2>Compound assignment in pattern generation</h2>
        <p>
          You can use <code>+=</code> to add complex patterns to strings in loops.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`row = ""\nn = 3\nleft_spaces = 2\nmiddle_spaces = 1\ni = 1\nrow += left_spaces * " " + "5 " + middle_spaces * " " + str(i + 4) + " "\nprint(row)`}
        />
        <h3>Output</h3>
        <OutputBlock output={["  5  5 "]} />
      </section>

      {/* Example: num += 1 */}
      <section>
        <h2>Using += with numbers</h2>
        <p>
          Incrementing numbers in loops can be done using <code>+=</code>.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`num = 1\nnum += 1\nprint(num)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[2]} />
      </section>

      {/* Notes */}
      <section>
        <h2>Notes</h2>
        <ul>
          <li><code>a += b</code> is equivalent to <code>a = a + b</code></li>
          <li>Similarly: <code>a -= b</code>, <code>a *= b</code>, <code>a /= b</code>, <code>a %= b</code></li>
          <li>Compound operators work with strings, numbers, and other iterable types.</li>
          <li>They help simplify code in loops and pattern generation.</li>
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

export default Problem_sol_7_CS;
