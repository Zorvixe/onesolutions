import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const InputOutputBasics = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Inputs and Outputs Basics</h1>

      {/* Working with Strings */}
      <section>
        <h2>Working with Strings</h2>
      </section>

      {/* String Concatenation */}
      <section>
        <h2>String Concatenation</h2>
        <p>Joining strings together is called string concatenation.</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`greeting = "Hello"\nname = "Alice"\nresult = greeting + " " + name\nprint(result)`} />
        <h3>Output</h3>
        <OutputBlock output={"Hello Alice"} />
      </section>

      {/* Concatenation Errors */}
      <section>
        <h2>Concatenation Errors</h2>
        <p>String Concatenation is possible only with strings.</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`greeting = "Hello"\nnumber = 10\nresult = greeting + number\nprint(result)`} />
        <h3>Output</h3>
        <OutputBlock output={"TypeError: can only concatenate str (not 'int') to str"} />
      </section>

      {/* String Repetition */}
      <section>
        <h2>String Repetition</h2>
        <p>* operator is used for repeating strings any number of times as required.</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`text = "Hi "\nresult = text * 3\nprint(result)`} />
        <h3>Output</h3>
        <OutputBlock output={"Hi Hi Hi "} />
        <h3>Code</h3>
        <CodeBlock language="python" code={`text = "Python"\nresult = text * 2\nprint(result)`} />
        <h3>Output</h3>
        <OutputBlock output={"PythonPython"} />
      </section>

      {/* Length of String */}
      <section>
        <h2>Length of String</h2>
        <p>len() returns the number of characters in a given string.</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`text = "Hello"\nlength = len(text)\nprint(length)`} />
        <h3>Output</h3>
        <OutputBlock output={5} />
      </section>

      {/* Take Input From User */}
      <section>
        <h2>Take Input From User</h2>
        <p>input() allows flexibility to take the input from the user. input() reads a line of input as a string.</p>
        <h3>Example - 1</h3>
        <CodeBlock language="python" code={`name = input("Enter your name: ")\nprint("Hello", name)`} />
        <h3>Input</h3>
        <OutputBlock output={"Alice"} />
        <h3>Output</h3>
        <OutputBlock output={"Hello Alice"} />
        <h3>Example - 2</h3>
        <CodeBlock language="python" code={`age = input("Enter your age: ")\nmessage = "You are " + age\nprint(message)`} />
        <h3>Input</h3>
        <OutputBlock output={"10"} />
        <h3>Output</h3>
        <OutputBlock output={"You are 10"} />
        <p>
          <b>Note:</b> Even though you can't directly combine strings and integers, the code works because input() returns a string. input() converts user-entered data (including numbers, booleans, etc.) to string. You will learn more about this in further sessions. In this case, "10" becomes a string, allowing it to concatenate and be part of the final message.
        </p>
      </section>

      {/* String Indexing */}
      <section>
        <h2>String Indexing</h2>
        <p>We can access an individual character in a string using their positions (which start from 0). These positions are also called as index.</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`text = "Hello"\nprint(text[0])\nprint(text[4])`} />
        <h3>Output</h3>
        <OutputBlock output={["H", "o"]} />
      </section>

      {/* IndexError */}
      <section>
        <h2>IndexError</h2>
        <p>Attempting to use an index that is too large will result in an error:</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`text = "Hello"\nprint(text[5])`} />
        <h3>Output</h3>
        <OutputBlock output={"IndexError: string index out of range"} />
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

export default InputOutputBasics;