import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const Type_Con_CS_2 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Type Conversion</h1>

      {/* String Slicing */}
      <section>
        <h2>String Slicing</h2>
        <p>Obtaining a part of a string is called string slicing.</p>
        <p>
          Start from the <code>start_index</code> and stops at <code>end_index</code> (end_index is not included in the slice).
        </p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`text = "Hello"\nslice = text[1:4]\nprint(slice)`} />
        <h3>Output</h3>
        <OutputBlock output={"ell"} />
        <h3>Slicing to End</h3>
        <p>If end index is not specified, slicing stops at the end of the string.</p>
        <CodeBlock language="python" code={`text = "Hello"\nslice = text[1:]\nprint(slice)`} />
        <h3>Output</h3>
        <OutputBlock output={"ello"} />
        <h3>Slicing from Start</h3>
        <p>If start index is not specified, slicing starts from the index 0.</p>
        <CodeBlock language="python" code={`text = "Hello"\nslice = text[:3]\nprint(slice)`} />
        <h3>Output</h3>
        <OutputBlock output={"Hel"} />
      </section>

      {/* Checking Data Type */}
      <section>
        <h2>Checking Data Type</h2>
        <p>Check the datatype of the variable or value using <code>type()</code></p>
        <h3>Printing Data Type</h3>
        <CodeBlock language="python" code={`x = 10\nprint(type(x))`} />
        <h3>Output</h3>
        <OutputBlock output={"<class 'int'>"} />
      </section>

      {/* Type Conversion */}
      <section>
        <h2>Type Conversion</h2>
        <p>Converting the value of one data type to another data type is called Type Conversion or Type Casting.</p>
        <p>We can convert:</p>
        <ul>
          <li>String to Integer</li>
          <li>Integer to Float</li>
          <li>Float to String</li>
          <li>and so on.</li>
        </ul>
        <h3>String to Integer</h3>
        <p><code>int()</code> converts valid data of any type to integer</p>
        <CodeBlock language="python" code={`num = int("123")\nprint(num)`} />
        <h3>Output</h3>
        <OutputBlock output={123} />
        <h3>Invalid Integer Conversion</h3>
        <CodeBlock language="python" code={`num = int("12.3")\nprint(num)`} />
        <h3>Output</h3>
        <OutputBlock output={"ValueError: invalid literal for int() with base 10: '12.3'"} />
        <CodeBlock language="python" code={`num = int("abc")\nprint(num)`} />
        <h3>Output</h3>
        <OutputBlock output={"ValueError: invalid literal for int() with base 10: 'abc'"} />
        <h3>Adding Two Numbers</h3>
        <CodeBlock language="python" code={`num1 = input("Enter first number: ")\nnum2 = input("Enter second number: ")\nsum = int(num1) + int(num2)\nprint("Sum:", sum)`} />
        <h3>Input</h3>
        <OutputBlock output={["5", "3"]} />
        <h3>Output</h3>
        <OutputBlock output={"Sum: 8"} />
        <h3>Integer to String</h3>
        <p><code>str()</code> converts data of any type to a string.</p>
        <CodeBlock language="python" code={`num = 123\ntext = str(num)\nprint(text + " is a number")`} />
       
        <h3>Output</h3>
        <OutputBlock output={"123 is a number"} />
      </section>

      {/* Summary */}
      <section>
        <h2>Summary</h2>
        <ol>
          <li><code>int()</code> - Converts to integer data type</li>
          <li><code>float()</code> - Converts to float data type</li>
          <li><code>str()</code> - Converts to string data type</li>
          <li><code>bool()</code> - Converts to boolean data type</li>
        </ol>
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

export default Type_Con_CS_2;