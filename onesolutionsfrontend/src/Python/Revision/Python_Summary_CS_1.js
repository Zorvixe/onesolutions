import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Python_FullSummary_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Python Full Summary Cheat Sheet</h1>

      {/* Data Types */}
      <section>
        <h2>Data Types in Python</h2>
        <p>
          In programming languages, every value or data has an associated type known as <b>data type</b>. Some commonly used data types:
        </p>
        <ul>
          <li><b>String:</b> A stream of characters enclosed within quotes.<br />"Hello World!", 1234</li>
          <li><b>Integer:</b> Numbers without fractional parts.<br />...-3, -2, -1, 0, 1, 2, 3,...</li>
          <li><b>Float:</b> Numbers with decimal points.<br />24.3, 345.210, -321.86</li>
          <li><b>Boolean:</b> Values with two possibilities: True or False.<br />True, False</li>
        </ul>
      </section>

      {/* Conditional Statements */}
      <section>
        <h2>Conditional Statements</h2>
        <p>Conditional statements allow executing a block of code only when a specific condition is <b>True</b>.</p>

        <h3>If Statement</h3>
        <p>If a condition is True, the block runs:</p>
        <CodeBlock language="python" code={`if True:\n    print("If Block")\n    print("Inside If")`} />
        <OutputBlock output={`If Block\nInside If`} />

        <h3>If-Else Statement</h3>
        <p>If the condition is False, the else block executes:</p>
        <CodeBlock language="python" code={`a = int(input())  # -1\nif a > 0:\n    print("Positive")\nelse:\n    print("Not Positive")`} />
        <OutputBlock output={`Not Positive`} />

        <h3>Nested Conditions</h3>
        <p>A conditional block inside another if/else block:</p>
        <CodeBlock language="python" code={`if ConditionA:\n    if ConditionB:\n        block of code\nelse:\n    block of code`} />

        <h3>Elif Statement</h3>
        <p>Use <b>elif</b> for multiple conditional checks:</p>
        <CodeBlock language="python" code={`if ConditionA:\n    block of code\nelif ConditionB:\n    block of code\nelse:\n    block of code`} />

        <h3>Indentation</h3>
        <ul>
          <li>Spaces in front of a block are called indentation.</li>
          <li>Indentation defines the block scope.</li>
          <li>Standard practice: 4 spaces.</li>
        </ul>
      </section>

      {/* Strings */}
      <section>
        <h2>Strings - Working with Strings</h2>

        <h3>Concatenation</h3>
        <CodeBlock language="python" code={`a = "Hello" + " " + "World"\nprint(a)`} />
        <OutputBlock output={`Hello World`} />

        <h3>Repetition</h3>
        <CodeBlock language="python" code={`a = "$" * 10\nprint(a)`} />
        <OutputBlock output={`$$$$$$$$$$`} />

        <h3>Length</h3>
        <CodeBlock language="python" code={`username = input()  # Ravi\nlength = len(username)\nprint(length)`} />
        <OutputBlock output={`4`} />

        <h3>Indexing & Slicing</h3>
        <CodeBlock language="python" code={`username = "Ravi"\nfirst_letter = username[0]\nprint(first_letter)\n\nmessage = "Hi Ravi"\npart = message[3:7]\nprint(part)\npart = message[3:]\nprint(part)\npart = message[:2]\nprint(part)\nprint(message[::-1])\nb = "Hello, World!"\nprint(b[-5:-2])`} />
        <OutputBlock output={`R\nRavi\nRavi\nHi\nivaR iH\norl`} />

        <h3>Membership Check</h3>
        <CodeBlock language="python" code={`language = "Python"\nresult = "P" in language\nprint(result)\nresult = "P" not in language\nprint(result)`} />
        <OutputBlock output={`True\nFalse`} />
      </section>

      {/* Calculations */}
      <section>
        <h2>Calculations in Python</h2>
        <CodeBlock language="python" code={`# Addition\nprint(2 + 5)\nprint(1 + 1.5)\n# Subtraction\nprint(5 - 2)\n# Multiplication\nprint(2 * 5)\nprint(5 * 0.5)\n# Division\nprint(80 / 5)\n# Modulus\nprint(7 % 2)\n# Exponent\nprint(7 ** 2)\n# Floor Division\nprint(13 // 5)`} />
        <OutputBlock output={`7\n2.5\n3\n10\n2.5\n16.0\n1\n49\n2`} />
      </section>

      {/* Input & Output */}
      <section>
        <h2>Input and Output Basics</h2>
        <CodeBlock language="python" code={`# Take Input\nusername = input()  # Ajay\n# Print Output\nprint(username)\n# Comments\n# This is a comment`} />
        <OutputBlock output={`Ajay`} />
      </section>

      {/* String Methods */}
      <section>
        <h2>String Methods</h2>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Syntax</th>
              <th>Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>isdigit()</td><td>str.isdigit()</td><td>Gives True if all characters are digits, else False</td></tr>
            <tr><td>strip()</td><td>str.strip()</td><td>Removes leading and trailing spaces</td></tr>
            <tr><td>strip(separator)</td><td>str.strip(separator)</td><td>Removes specific separator</td></tr>
            <tr><td>replace()</td><td>str.replace(old, new)</td><td>Replaces all occurrences of old substring with new substring</td></tr>
            <tr><td>startswith()</td><td>str.startswith(value)</td><td>Gives True if string starts with the specified value</td></tr>
            <tr><td>endswith()</td><td>str.endswith(value)</td><td>Gives True if string ends with the specified value</td></tr>
            <tr><td>upper()</td><td>str.upper()</td><td>Converts all characters to uppercase</td></tr>
            <tr><td>lower()</td><td>str.lower()</td><td>Converts all characters to lowercase</td></tr>
            <tr><td>split()</td><td>str.split()</td><td>Splits string into a list of words using whitespace</td></tr>
            <tr><td>split(separator, maxsplit)</td><td>str.split(separator, maxsplit)</td><td>Splits string using the specified separator</td></tr>
            <tr><td>join()</td><td>str.join(iterable)</td><td>Joins all items in an iterable into a single string</td></tr>
          </tbody>
        </table>

        <h3>String Formatting</h3>
        <p><b>Add Placeholders:</b> Add `{}` where values need to be inserted.</p>
        <CodeBlock language="python" code={`name = "Raju"\nage = 10\nmsg = "Hi {}. You are {} years old."\nprint(msg.format(name, age))`} />
        <OutputBlock output={`Hi Raju. You are 10 years old.`} />

        <p><b>Numbering Placeholders:</b> Use numbers inside `{}` to order arguments.</p>
        <CodeBlock language="python" code={`name = input()  # Raju\nage = int(input())  # 10\nmsg = "Hi {1}. You are {0} years old."\nprint(msg.format(name, age))`} />
        <OutputBlock output={`Hi 10. You are Raju years old.`} />

        <p><b>Naming Placeholders:</b> Use keywords to specify values.</p>
        <CodeBlock language="python" code={`name = input()  # Raju\nage = int(input())  # 10\nmsg = "Hi {name}. You are {age} years old."\nprint(msg.format(age=age, name=name))`} />
        <OutputBlock output={`Hi Raju. You are 10 years old.`} />
      </section>

      {/* Relational & Logical Operators */}
      <section>
        <h2>Relational & Logical Operators</h2>
        <h3>Relational Operators</h3>
        <CodeBlock language="python" code={`print(2 > 1)\nprint(5 < 10)\nprint(3 == 4)\nprint(2 != 1)\nprint(2 <= 1)\nprint(2 >= 1)`} />
        <OutputBlock output={`True\nTrue\nFalse\nTrue\nFalse\nTrue`} />

        <h3>Logical Operators</h3>
        <CodeBlock language="python" code={`print((5 < 10) and (1 < 2))\nprint((5 < 10) or (2 < 2))\nprint(not (2 < 3))`} />
        <OutputBlock output={`True\nTrue\nFalse`} />

        <h3>Truth Tables</h3>
        <p><b>A and B</b></p>
        <table border="1">
          <tbody>
            <tr><th>A</th><th>B</th><th>A and B</th></tr>
            <tr><td>True</td><td>True</td><td>True</td></tr>
            <tr><td>True</td><td>False</td><td>False</td></tr>
            <tr><td>False</td><td>False</td><td>False</td></tr>
            <tr><td>False</td><td>True</td><td>False</td></tr>
          </tbody>
        </table>
        <p><b>A or B</b></p>
        <table border="1">
          <tbody>
            <tr><th>A</th><th>B</th><th>A or B</th></tr>
            <tr><td>True</td><td>True</td><td>True</td></tr>
            <tr><td>True</td><td>False</td><td>True</td></tr>
            <tr><td>False</td><td>False</td><td>False</td></tr>
            <tr><td>False</td><td>True</td><td>True</td></tr>
          </tbody>
        </table>
        <p><b>Not A</b></p>
        <table border="1">
          <tbody>
            <tr><th>A</th><th>Not A</th></tr>
            <tr><td>True</td><td>False</td></tr>
            <tr><td>False</td><td>True</td></tr>
          </tbody>
        </table>
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

export default Python_FullSummary_CS;
