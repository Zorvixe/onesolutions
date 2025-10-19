import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const Functions_CS_2 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Functions | Cheat Sheet</h1>

      {/* Functions */}
      <section>
        <h2>Functions</h2>
        <p>
          Block of reusable code to perform a specific action.
        </p>
      </section>

      {/* Reusing Code */}
      <section>
        <h2>Reusing Code</h2>
        <p>
          Using an existing code without writing it every time we need.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def greet():\n    print("Hello")\ngreet()\ngreet()`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={["Hello", "Hello"]} />
      </section>

      {/* Defining a Function */}
      <section>
        <h2>Defining a Function</h2>
        <p>
          Function is uniquely identified by the function_name
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def say_hello():\n    print("Hello, World!")`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={[]} />
      </section>

      {/* Calling a Function */}
      <section>
        <h2>Calling a Function</h2>
        <p>
          The functional block of code is executed only when the function is called.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def greet():\n    print("Hi there")\ngreet()`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={["Hi there"]} />
      </section>

      {/* Defining & Calling a Function */}
      <section>
        <h2>Defining & Calling a Function</h2>
        <p>
          A function should be defined before it is called.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def add(a, b):\n    return a + b\nresult = add(3, 4)\nprint(result)`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={7} />
      </section>

      {/* Printing a Message */}
      <section>
        <h2>Printing a Message</h2>
        <p>
          Consider the following scenario, we want to create a function, that prints a
          custom message, based on some variable that is defined outside the function. In
          the below code snippet, we want to access the value in the variable name at line 2
          in place of the ?.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`name = "Alice"\ndef print_message():\n    print("Hello, ?")\nprint_message()`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Desired Output</h3>
        <OutputBlock output={["Hello, Alice"]} />
        <p>
          We use the concept of Function Arguments for these types of scenarios.
        </p>
      </section>

      {/* Function With Arguments */}
      <section>
        <h2>Function With Arguments</h2>
        <p>
          We can pass values to a function using an Argument.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def greet(name):\n    print(f"Hello, {name}")\ngreet("Bob")`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={["Hello, Bob"]} />
      </section>

      {/* Variables Inside a Function */}
      <section>
        <h2>Variables Inside a Function</h2>
        <p>
          A variable created inside a function can only be used in it.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def my_function():\n    x = 10\n    print(x)\nmy_function()\nprint(x)`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={["10", "NameError: name 'x' is not defined"]} />
      </section>

      {/* Returning a Value */}
      <section>
        <h2>Returning a Value</h2>
        <p>
          To return a value from the function use return keyword.
        </p>
        <p>
          Exits from the function when return statement is executed.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def add(a, b):\n    return a + b\nresult = add(5, 3)\nprint(result)`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={8} />
      </section>

      {/* Code After Return */}
      <section>
        <h2>Code written after return statement will not be executed</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def example():\n    return 10\n    print("This won't print")\nresult = example()\nprint(result)`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={10} />
      </section>

      {/* Built-in Functions */}
      <section>
        <h2>Built-in Functions</h2>
        <p>
          We are already using functions which are pre-defined in Python.
        </p>
        <p>
          Built-in functions are readily available for reuse
        </p>
        <ul>
          <li><code>print()</code></li>
          <li><code>int()</code></li>
          <li><code>str()</code></li>
          <li><code>len()</code></li>
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

export default Functions_CS_2;