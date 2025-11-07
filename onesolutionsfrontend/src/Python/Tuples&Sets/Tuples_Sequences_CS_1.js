// C:\Users\Akhila\OneDrive\Desktop\website\website\src\Python\Tuples&Sets\Tuples_Sequences_CS_1.js
import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const Tuples_Sequences_CS_1 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Tuples & Sequences | Cheat Sheet</h1>

      <section>
        <h2>None</h2>
        <p>None is an object of its own datatype (NoneType). Used to define no value or nothing.</p>
      </section>

      <section>
        <h2>Function Without Return</h2>
        <p>When a function does not have a return statement, assigning it to a variable gives None.</p>
        <CodeBlock language="python" code={`def func():\n    print("Hello")\n\nx = func()\nprint(x)`} />
        <OutputBlock output={["Hello", "None"]} />
      </section>

      <section>
        <h2>Tuple</h2>
        <p>Holds an ordered sequence of items. Tuples are immutable, whereas lists are mutable.</p>
        <CodeBlock language="python" code={`my_tuple = (1, 2, 3, 4)`} />
      </section>

      <section>
        <h2>Creating a Tuple</h2>
        <p>Created using parentheses (). Each item is separated by a comma.</p>
        <CodeBlock language="python" code={`t = (10, 20, 30)`} />
      </section>

      <section>
        <h2>Tuple with Single Item</h2>
        <CodeBlock language="python" code={`single = (5,)`} />
      </section>

      <section>
        <h2>Accessing Tuple Elements</h2>
        <CodeBlock language="python" code={`my_tuple[0]  # Output: 1\nmy_tuple[-1] # Output: 4`} />
      </section>

      <section>
        <h2>Tuples are Immutable</h2>
        <CodeBlock language="python" code={`my_tuple[0] = 100  # Error`} />
      </section>

      <section>
        <h2>Operations on Tuples</h2>
        <ul>
          <li>len()</li>
          <li>Iteration</li>
          <li>Slicing</li>
          <li>Extended Slicing</li>
          <li>Converting to Tuple: <CodeBlock language="python" code={`tuple([1,2,3])  # Output: (1,2,3)`} /></li>
        </ul>
      </section>

      <section>
        <h2>Membership Check</h2>
        <p>Check if an element is part of a sequence using <code>in</code> or <code>not in</code>.</p>
        <CodeBlock language="python" code={`3 in my_tuple  # True\n5 not in my_tuple  # True`} />
      </section>

      <section>
        <h2>Packing & Unpacking</h2>
        <p>Values of any sequence can be assigned directly to variables. Number of variables must match sequence length.</p>
        <CodeBlock language="python" code={`a, b, c = (1, 2, 3)\nprint(a, b, c)`} />
        <OutputBlock output={[1, 2, 3]} />
      </section>

      <section>
        <h2>Errors in Unpacking</h2>
        <CodeBlock language="python" code={`a, b = (1, 2, 3)  # Error`} />
      </section>

      <section>
        <h2>Tuple Packing</h2>
        <p>Values separated by commas are packed into a tuple. Parentheses are optional.</p>
        <CodeBlock language="python" code={`t = 1, 2, 3\nprint(t)  # Output: (1,2,3)`} />
      </section>

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

export default Tuples_Sequences_CS_1;
