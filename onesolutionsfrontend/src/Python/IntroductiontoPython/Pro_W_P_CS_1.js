import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
import "./Pro_W_P_CS_1.css";

const Pro_W_P_CS_1 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Intro to Programming with Python</h1>

      <section>
        <h2>Software</h2>
        <p>Software is a set of instructions to the hardware.</p>
      </section>

      <section>
        <h2>Programming</h2>
        <p>Programming means writing the instructions to create a software.</p>
      </section>

      <section>
        <h2>Code</h2>
        <p>The instructions that we write to create software is called <b>Code</b>.</p>
      </section>

      <section>
        <h2>Syntax</h2>
        <p>
          Similar to Grammar rules in English, Hindi, each programming language has a unique set of rules. These rules are called the <b>Syntax</b> of a Programming Language.
        </p>
      </section>

      <section>
        <h2>Why Python?</h2>
        <p>
          Python is an easy to learn, powerful programming language. With Python, it is possible to create programs with minimal amount of code.
        </p>
        <p>Look at the code in Java and Python used for printing the message "Hello World"</p>

        <h3>Java</h3>
        <CodeBlock
          language="java"
          code={`class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`}
        />

        <h3>Python</h3>
        <CodeBlock
          language="python"
          code={`print("Hello World")`}
        />
      </section>

      <section>
        <h2>Applications of Python</h2>
        <p>Python is a versatile language which has applications in almost every field:</p>
        <ul>
          <li>Artificial intelligence (AI)</li>
          <li>Machine Learning (ML)</li>
          <li>Big Data</li>
          <li>Smart Devices / Internet of Things (IoT)</li>
          <li>Cyber Security</li>
          <li>Game Development</li>
          <li>Backend Development</li>
        </ul>
      </section>

      <section>
        <h2>Career Opportunities</h2>
        <p>Python developers have plenty of opportunities across the world:</p>
        <ul>
          <li>DevOps Engineer</li>
          <li>Software Developer</li>
          <li>Data Analyst</li>
          <li>Data Scientist</li>
          <li>Machine Learning (ML) Engineer</li>
          <li>AI Scientist</li>
        </ul>
      </section>

      <section>
        <h2>Hello World Program in Python</h2>
        <h3>Code</h3>
        <CodeBlock language="python" code={`print("Hello World")`} />
        <h3>Output</h3>
        <OutputBlock output={`Hello World`} />
      </section>

      <section>
        <h2>Possible Mistakes</h2>
        <p>Possible mistakes you may make while writing Python code to display the message "Hello World":</p>
        <ul>
          <li>
            Spelling Mistake in <code>print</code>
            <CodeBlock language="python" code={`pint("Hello World")`} />
          </li>
          <li>
            Uppercase 'P' in Print
            <CodeBlock language="python" code={`Print("Hello World")`} />
          </li>
          <li>
            Missing quotes
            <CodeBlock language="python" code={`print(Hello World)`} />
          </li>
          <li>
            Missing parentheses
            <CodeBlock language="python" code={`print("Hello World"`} />
          </li>
        </ul>
      </section>

      <section>
        <h2>Printing Without Quotes</h2>
        <p>If we want to print the numerical result of <b>2 + 5</b>, we do not add quotes.</p>
        <CodeBlock language="python" code={`print(2+5)`} />
        <p><b>Output:</b></p>
        <OutputBlock output={`7`} />

        <p>If we want to print the exact message "2 + 5", then we add the quotes.</p>
        <CodeBlock language="python" code={`print("2+5")`} />
        <p><b>Output:</b></p>
        <OutputBlock output={`2 + 5`} />
      </section>

      <section>
        <h2>Calculations with Python</h2>

        {/* Addition */}
        <h3>Addition</h3>
        <p>Addition is denoted by <button>+</button> sign.</p>
        <p>It gives the sum of two numbers.</p>
        <CodeBlock language="python" code={`print("2+5")\nprint(1 + 1.5)`} />
        <p><b>Output:</b></p>
        <OutputBlock output={["7", "2.5"]} />

        {/* Subtraction */}
        <h3>Subtraction</h3>
        <p>Subtraction is denoted by <button>-</button> sign.</p>
        <p>It gives the difference between two numbers.</p>
        <CodeBlock language="python" code={`print(10 - 3)\nprint(5 - 2.5)`} />
        <p><b>Output:</b></p>
        <OutputBlock output={["7", "2.5"]} />

        {/* Multiplication */}
        <h3>Multiplication</h3>
        <p>Multiplication is denoted by <button>*</button> sign.</p>
        <CodeBlock language="python" code={`print(2 * 3)\nprint(1.5 * 4)`} />
        <p><b>Output:</b></p>
        <OutputBlock output={["6", "6.0"]} />

        {/* Division */}
        <h3>Division</h3>
        <p>Division is denoted by <button>/</button> sign.</p>
        <CodeBlock language="python" code={`print(10 / 2)\nprint(5 / 2)`} />
        <p><b>Output:</b></p>
        <OutputBlock output={["5.0", "2.5"]} />
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

export default Pro_W_P_CS_1;