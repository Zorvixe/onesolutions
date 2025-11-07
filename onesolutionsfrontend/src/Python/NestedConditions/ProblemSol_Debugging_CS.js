import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path if needed

const ProblemSol_Debugging_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Problem Solving, Debugging & More Arithmetic Operators | Cheat Sheet</h1>

      {/* Introduction */}
      <section>
        <h2>Problem Solving</h2>
        <p>
          Problem solving in programming involves understanding the problem, breaking it into steps,
          and writing code to solve it step by step.
        </p>
        <p>
          When conditions are involved, we use <code>if</code>, <code>elif</code>, and <code>else</code> statements to
          make decisions in the program.
        </p>
      </section>

      {/* Example 1 */}
      <section>
        <h2>Example 1: Check if Number is Even or Odd</h2>
        <p>
          A number is <b>even</b> if it’s divisible by 2, otherwise it’s <b>odd</b>.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`num = 7\nif num % 2 == 0:\n    print("Even Number")\nelse:\n    print("Odd Number")`}
        />
        <h3>Output</h3>
        <OutputBlock output={"Odd Number"} />
      </section>

      {/* Example 2 */}
      <section>
        <h2>Example 2: Find the Largest of Three Numbers</h2>
        <p>
          We can use <code>if</code> and <code>elif</code> statements to compare multiple values and
          find the largest number.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`a = 10\nb = 25\nc = 15\nif a > b and a > c:\n    print("a is largest")\nelif b > a and b > c:\n    print("b is largest")\nelse:\n    print("c is largest")`}
        />
        <h3>Output</h3>
        <OutputBlock output={"b is largest"} />
      </section>

      {/* More Arithmetic Operators */}
      <section>
        <h2>More Arithmetic Operators</h2>

        {/* Modulus */}
        <h3>Modulus Operator (%)</h3>
        <p>
          To find the remainder, we use the <b>modulus</b> operator <code>%</code>.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`a = 10\nb = 3\nprint(a % b)`}
        />
        <h3>Output</h3>
        <OutputBlock output={1} />

        {/* Exponent */}
        <h3>Exponent Operator (**)</h3>
        <p>
          To calculate <code>a</code> to the power of <code>b</code>, we use the <b>exponent</b> operator <code>**</code>.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`a = 2\nb = 3\nprint(a ** b)`}
        />
        <h3>Output</h3>
        <OutputBlock output={8} />

        {/* Square */}
        <h3>Square of a Number</h3>
        <p>
          We can find the square of a number using the exponent operator by keeping the exponent as <code>2</code>.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`num = 5\nprint(num ** 2)`}
        />
        <h3>Output</h3>
        <OutputBlock output={25} />

        {/* Square Root */}
        <h3>Square Root of a Number</h3>
        <p>
          We can find the square root of a number using the exponent operator by keeping the exponent as <code>0.5</code>.
        </p>
        <p>
          Any number raised to the power of <code>0.5</code> gives the square root of that number.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`num = 16\nprint(num ** 0.5)`}
        />
        <h3>Output</h3>
        <OutputBlock output={4.0} />
      </section>

      {/* Debugging */}
      <section>
        <h2>Debugging</h2>
        <p>
          Debugging is the process of finding and fixing errors in the code. Common errors in conditional
          statements include missing colons, wrong indentation, or using <code>=</code> instead of <code>==</code>.
        </p>
      </section>

      {/* Common Mistakes */}
      <section>
        <h2>Common Mistake Example</h2>
        <p>❌ Using assignment operator instead of comparison operator in <code>if</code> condition.</p>
        <h3>Wrong Code</h3>
        <CodeBlock
          language="python"
          code={`num = 10\nif num = 10:\n    print("Number is 10")`}
        />
        <h3>Output</h3>
        <OutputBlock output={"SyntaxError: invalid syntax"} />

        <p>✅ Correct Code:</p>
        <CodeBlock
          language="python"
          code={`num = 10\nif num == 10:\n    print("Number is 10")`}
        />
        <OutputBlock output={"Number is 10"} />
      </section>

      {/* Debugging Tip */}
      <section>
        <h2>Debugging Tip</h2>
        <ul>
          <li>✅ Always check your colons (<code>:</code>) after <code>if</code>, <code>elif</code>, and <code>else</code>.</li>
          <li>✅ Check indentation carefully. Python is indentation-sensitive.</li>
          <li>✅ Use <code>==</code> for comparison, not <code>=</code>.</li>
          <li>✅ Use print statements to check the flow of your code.</li>
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

export default ProblemSol_Debugging_CS;
