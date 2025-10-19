import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; 

const Problem_sol_6_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>End Keyword | Cheat Sheet</h1>

      {/* Introduction */}
      <section>
        <h2>End Keyword</h2>
        <p>
          In Python, the <code>end</code> keyword is used in the <code>print()</code> statement to specify 
          what should be printed at the end of the output.
        </p>
        <p>
          By default, <code>print()</code> moves the cursor to the next line after printing.
          Using the <code>end</code> keyword, we can print the outputs on a single line.
        </p>
      </section>

      {/* Example 1 - Default Behavior */}
      <section>
        <h2>Default Behavior of print()</h2>
        <p>
          By default, every <code>print()</code> statement ends with a new line.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`print("Hello")\nprint("World")`}
        />
        <h3>Output</h3>
        <OutputBlock output={["Hello", "World"]} />
      </section>

      {/* Example 2 - Using end keyword */}
      <section>
        <h2>Using end keyword</h2>
        <p>
          We can specify a character or string to be printed at the end of the output instead of the default newline.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`print("Hello", end=" ")\nprint("World")`}
        />
        <h3>Output</h3>
        <OutputBlock output={["Hello World"]} />
      </section>

      {/* Example 3 - end with a character */}
      <section>
        <h2>Using end with a character</h2>
        <p>
          Here, <code>*</code> is printed with <code>abc</code> at the end of each iteration, all on the same line.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`for i in range(3):\n    print("abc", end="*")`}
        />
        <h3>Output</h3>
        <OutputBlock output={["abc*abc*abc*"]} />
      </section>

      {/* print() statement */}
      <section>
        <h2>print() Statement</h2>
        <p>
          By default, each time you call <code>print()</code>, it takes the cursor to a new line. 
          That means the next time you print something, it will start on a new line.
        </p>
        <p>
          A <code>print()</code> statement without any value indicates that the next output should be printed in the next line.
        </p>
      </section>

      {/* Problem Solving Example */}
      <section>
        <h2>Problem Solving Example</h2>
        <p>
          In the below code, the outer loop iterates N times and the inner loop also iterates N times.
          In the inner loop, we print a star <code>(*)</code> with a space as a separator between stars 
          on the same line using <code>end=" "</code>.
        </p>
        <p>
          After printing N stars in the inner loop, the inner loop terminates, and <code>print()</code> 
          moves the cursor to the next line.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`n = 5\nfor i in range(n):\n    for j in range(n):\n        print("*", end=" ")\n    print()`}
        />
        <h3>Output</h3>
        <OutputBlock
          output={[
            "* * * * * ",
            "* * * * * ",
            "* * * * * ",
            "* * * * * ",
            "* * * * * ",
          ]}
        />
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
export default Problem_sol_6_CS
