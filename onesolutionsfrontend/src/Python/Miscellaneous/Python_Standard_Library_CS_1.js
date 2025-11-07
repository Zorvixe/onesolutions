import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Python_Standard_Library_CS_1 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Python Standard Library</h1>

      {/* Built-in Functions */}
      <section>
        <h2>Built-in Functions</h2>
        <p>Built-in functions are readily available for reuse. Some of the built-in functions are:</p>
        <ul>
          <li><b>print()</b></li>
          <li><b>max()</b></li>
          <li><b>min()</b></li>
          <li><b>len()</b> and many more...</li>
        </ul>
      </section>

      {/* Standard Library */}
      <section>
        <h2>Standard Library</h2>
        <p>
          Python provides several useful values (constants), classes, and functions.
          This collection of predefined utilities is referred to as the <b>Python Standard Library</b>.
        </p>
        <p>
          These functionalities are organized into different modules. In Python context, 
          any file containing Python code is called a <b>module</b>. Modules are further organized into folders known as <b>packages</b>.
        </p>
        <p>Different modules include:</p>
        <ul>
          <li>collections</li>
          <li>random</li>
          <li>datetime</li>
          <li>math</li>
          <li>and many more...</li>
        </ul>
      </section>

      {/* Working with Standard Library */}
      <section>
        <h2>Working with Standard Library</h2>
        <p>To use a functionality defined in a module, we need to <b>import</b> that module in our program.</p>

        <h3>Math Module</h3>
        <p>The <b>math</b> module provides access to common math functions and constants.</p>
        <CodeBlock language="python" code={`import math\nprint(math.pi)`} />

        <h3>Importing Module</h3>
        <CodeBlock language="python" code={`import math as m\nprint(m.sqrt(16))`} />

        <h3>Importing from a Module</h3>
        <CodeBlock language="python" code={`from math import sqrt\nprint(sqrt(25))`} />

        <h3>Aliasing Imports</h3>
        <CodeBlock language="python" code={`from math import sqrt as sq\nprint(sq(36))`} />

        <h3>Random Module</h3>
        <p>The <b>random</b> module provides utilities to generate randomness, useful for dice rolls, coin flips, etc.</p>

        <h4>randint()</h4>
        <CodeBlock language="python" code={`import random\nprint(random.randint(1, 6))`} />

        <h4>choice()</h4>
        <CodeBlock language="python" code={`import random\nitems = [1,2,3,4,5]\nprint(random.choice(items))`} />
      </section>

      {/* Map, Filter and Reduce */}
      <section>
        <h2>Map, Filter and Reduce</h2>
        <p>These functions simplify working with sequences like lists and tuples.</p>

        <h3>Map</h3>
        <CodeBlock language="python" code={`nums = [1,2,3]\nsquared = list(map(lambda x: x**2, nums))\nprint(squared)`} />

        <h3>Filter</h3>
        <CodeBlock language="python" code={`nums = [1,2,3,4,5]\neven_nums = list(filter(lambda x: x%2==0, nums))\nprint(even_nums)`} />

        <h3>Reduce</h3>
        <CodeBlock language="python" code={`from functools import reduce\nnums = [1,2,3,4]\nsum_all = reduce(lambda x,y: x+y, nums)\nprint(sum_all)`} />

        <p>
          To know more about Python Standard Library, go through the official documentation: <br/>
          <a href="https://docs.python.org/3/library/" target="_blank" rel="noopener noreferrer">
            Python Standard Library Docs
          </a>
        </p>
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

export default Python_Standard_Library_CS_1;
