import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const NestedListStringFormatting_CS_1 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Nested Lists & String Formatting | Cheat Sheet</h1>

      {/* Nested Lists */}
      <section>
        <h2>Nested Lists</h2>
        <p>A list as an item of another list.</p>
      </section>

      {/* Accessing Nested List */}
      <section>
        <h2>Accessing Nested List</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`nested_list = [1, [2, 3], 4]\nprint(nested_list)`}
        />
        <h3>Output</h3>
        <OutputBlock output={JSON.stringify([1, [2, 3], 4])} />
      </section>

      {/* Accessing Items of Nested List */}
      <section>
        <h2>Accessing Items of Nested List</h2>
        <h3>Example - 1</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`nested_list = [1, [2, 3], 4]\nprint(nested_list[1])`}
        />
        <h3>Output</h3>
        <OutputBlock output={JSON.stringify([2, 3])} />
        <h3>Example - 2</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`nested_list = [1, [2, 3], 4]\nprint(nested_list[1][0])`}
        />
        <h3>Output</h3>
        <OutputBlock output={JSON.stringify(2)} />
      </section>

      {/* String Formatting */}
      <section>
        <h2>String Formatting</h2>
        <p>Code</p>
        <p>String formatting simplifies this concatenation.</p>
        <p>It increases the readability of code and type conversion is not required.</p>
      </section>

      {/* Add Placeholders */}
      <section>
        <h2>Add Placeholders</h2>
        <p>Add placeholders {} where the string needs to be formatted.</p>
        <p>Inserts values inside the string’s placeholder {}</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`name = "Alice"\nage = 25\nprint(f"My name is {name} and I am {age}.")`}
        />
        <h3>Output</h3>
        <OutputBlock output={"My name is Alice and I am 25."} />
      </section>

      {/* Number of Placeholders */}
      <section>
        <h2>Number of Placeholders</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`a = 10\nb = 20\nprint(f"{a} + {b} = {a + b}")`}
        />
        <h3>Output</h3>
        <OutputBlock output={"10 + 20 = 30"} />
      </section>

      {/* Numbering Placeholders */}
      <section>
        <h2>Numbering Placeholders</h2>
        <p>Numbering placeholders, will fill values according to the position of arguments.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`print(f"{0} {1}".format("Hello", "World"))`}
        />
        <h3>Input</h3>
        <OutputBlock output={JSON.stringify([])} /> {/* Clarified as empty array */}
        <h3>Output</h3>
        <OutputBlock output={"Hello World"} />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`print(f"{1} {0}".format("World", "Hello"))`}
        />
        <h3>Input</h3>
        <OutputBlock output={JSON.stringify([])} /> {/* Clarified as empty array */}
        <h3>Output</h3>
        <OutputBlock output={"Hello World"} />
      </section>

      {/* Naming Placeholder */}
      <section>
        <h2>Naming Placeholder</h2>
        <p>Naming placeholders will fill values according to the keyword arguments.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`print(f"{name} is {age}".format(name="Bob", age=30))`}
        />
        <h3>Input</h3>
        <OutputBlock output={JSON.stringify([])} /> {/* Clarified as empty array */}
        <h3>Output</h3>
        <OutputBlock output={"Bob is 30"} />
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

export default NestedListStringFormatting_CS_1;