import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const Arrays_Dom_Manipulations_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Arrays & More DOM Manipulations | Cheat Sheet</h1>

      {/* Data Structures */}
      <section>
        <h2>1. Data Structures</h2>
        <p>
          Data Structures allow us to store and organize data efficiently. This makes it easier to access and perform operations on the data smoothly.
        </p>
        <p>In JavaScript, we have built-in Data Structures like:</p>
        <ul>
          <li>Arrays</li>
          <li>Objects</li>
          <li>Maps</li>
          <li>Sets</li>
        </ul>
      </section>

      {/* Arrays */}
      <section>
        <h2>2. Array</h2>
        <p>An Array holds an ordered sequence of items.</p>
      </section>

      {/* Creating an Array */}
      <section>
        <h3>2.1 Creating an Array</h3>
        <h3>Code</h3>
        <CodeBlock language="javascript" code={`let numbers = [1, 2, 3, 4];\nconsole.log(numbers);`} />
        <h3>Output</h3>
        <OutputBlock output={"[1, 2, 3, 4]"} />
      </section>

      {/* Accessing an Array Item */}
      <section>
        <h3>2.2 Accessing an Array Item</h3>
        <h3>Code</h3>
        <CodeBlock language="javascript" code={`console.log(numbers[0]);  // 1\nconsole.log(numbers[3]);  // 4`} />
        <h3>Output</h3>
        <OutputBlock output={["1", "4"]} />
      </section>

      {/* Modifying an Array Item */}
      <section>
        <h3>2.3 Modifying an Array Item</h3>
        <h3>Code</h3>
        <CodeBlock language="javascript" code={`numbers[1] = 20;\nconsole.log(numbers);`} />
        <h3>Output</h3>
        <OutputBlock output={"[1, 20, 3, 4]"} />
      </section>

      {/* Array Length */}
      <section>
        <h3>2.4 Finding Array Length</h3>
        <p>The <code>array.length</code> property returns the number of items in the array.</p>
        <h3>Code</h3>
        <CodeBlock language="javascript" code={`console.log(numbers.length);`} />
        <h3>Output</h3>
        <OutputBlock output={4} />
      </section>

      {/* Array Methods */}
      <section>
        <h3>2.5 Array Methods</h3>

        {/* push() */}
        <h4>2.5.1 push()</h4>
        <p>Adds new items to the end of the array.</p>
        <h3>Code</h3>
        <CodeBlock language="javascript" code={`numbers.push(5);\nconsole.log(numbers);`} />
        <h3>Output</h3>
        <OutputBlock output={"[1, 20, 3, 4, 5]"} />

        {/* pop() */}
        <h4>2.5.2 pop()</h4>
        <p>Removes the last item from an array and returns it.</p>
        <h3>Code</h3>
        <CodeBlock language="javascript" code={`let last = numbers.pop();\nconsole.log(last);\nconsole.log(numbers);`} />
        <h3>Output</h3>
        <OutputBlock output={["5", "[1, 20, 3, 4]"]} />
      </section>

      {/* Functions */}
      <section>
        <h2>3. Functions</h2>

        {/* Function Declaration */}
        <h3>3.1 Function Declaration</h3>
        <h3>Code</h3>
        <CodeBlock language="javascript" code={`function greet(name) {\n  return "Hello " + name;\n}\nconsole.log(greet("Alice"));`} />
        <h3>Output</h3>
        <OutputBlock output={"Hello Alice"} />

        {/* Function Expression */}
        <h3>3.2 Function Expression</h3>
        <h3>Code</h3>
        <CodeBlock language="javascript" code={`let greetExpr = function(name) {\n  return "Hi " + name;\n};\nconsole.log(greetExpr("Bob"));`} />
        <h3>Output</h3>
        <OutputBlock output={"Hi Bob"} />
      </section>

      {/* More DOM Manipulations */}
      <section>
        <h2>4. More DOM Manipulations</h2>

        {/* createElement */}
        <h3>4.1 Creating an HTML Element - createElement()</h3>
        <h3>Code</h3>
        <CodeBlock language="javascript" code={`let p = document.createElement("p");\np.textContent = "Hello World";\ndocument.body.appendChild(p);`} />
        <h3>Output</h3>
        <OutputBlock output={"Paragraph added to document body"} />

        {/* appendChild */}
        <h3>4.2 Appending to an HTML Element - appendChild()</h3>
        <p>Appending to an existing container element:</p>
        <h3>Code</h3>
        <CodeBlock language="javascript" code={`let container = document.getElementById("container");\nlet span = document.createElement("span");\nspan.textContent = "Dynamic Text";\ncontainer.appendChild(span);`} />
        <h3>Output</h3>
        <OutputBlock output={"Span added inside container"} />

        {/* Event Listeners */}
        <h3>4.3 Adding Event Listeners Dynamically</h3>
        <h3>Code</h3>
        <CodeBlock language="javascript" code={`let btn = document.getElementById("myBtn");\nbtn.addEventListener("click", () => {\n  alert("Button clicked!");\n});`} />
        <h3>Output</h3>
        <OutputBlock output={"Alert appears when button clicked"} />

        {/* classList.add */}
        <h3>4.4 Providing Class Names Dynamically - classList.add()</h3>
        <h3>Code</h3>
        <CodeBlock language="javascript" code={`let box = document.getElementById("box");\nbox.classList.add("active");`} />
        <h3>Output</h3>
        <OutputBlock output={"Class 'active' added to box"} />

        {/* classList.remove */}
        <h3>4.5 Removing Class Names Dynamically - classList.remove()</h3>
        <h3>Code</h3>
        <CodeBlock language="javascript" code={`box.classList.remove("active");`} />
        <h3>Output</h3>
        <OutputBlock output={"Class 'active' removed from box"} />
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

export default Arrays_Dom_Manipulations_CS;
