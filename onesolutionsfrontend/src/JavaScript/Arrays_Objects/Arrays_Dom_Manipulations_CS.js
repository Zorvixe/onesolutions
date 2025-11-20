import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const Arrays_Dom_Manipulations_CS = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});

  // Check if subtopic is already completed
  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleAnswer = (question, option) => {
    setMcqAnswers((prev) => ({ ...prev, [question]: option }));
  };

  const handleContinue = async () => {
    if (isLoading || isSubtopicCompleted) return;

    try {
      setIsLoading(true);
      const result = await markSubtopicComplete(
        subtopicId,
        goalName,
        courseName
      );

      if (result.success) {
        await loadProgressSummary();
        setIsSubtopicCompleted(true);
        console.log("✅ Cheat sheet marked as completed");
      } else {
        console.error(
          "❌ Failed to mark cheat sheet complete:",
          result.message
        );
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      console.error("❌ Failed to mark cheat sheet complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="intro-container">
      <h1>Arrays & More DOM Manipulations | Cheat Sheet</h1>

      {/* Data Structures */}
      <section>
        <h2>1. Data Structures</h2>
        <p>
          Data Structures allow us to store and organize data efficiently. This
          makes it easier to access and perform operations on the data smoothly.
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
        <CodeBlock
          language="javascript"
          code={`let numbers = [1, 2, 3, 4];\nconsole.log(numbers);`}
        />
        <h3>Output</h3>
        <OutputBlock output={"[1, 2, 3, 4]"} />
      </section>

      {/* Accessing an Array Item */}
      <section>
        <h3>2.2 Accessing an Array Item</h3>
        <h3>Code</h3>
        <CodeBlock
          language="javascript"
          code={`let numbers = [1, 2, 3, 4];
console.log(numbers[0]);// 1\nconsole.log(numbers[3]);  // 4`}
        />
        <h3>Output</h3>
        <OutputBlock output={["1", "4"]} />
      </section>

      {/* Modifying an Array Item */}
      <section>
        <h3>2.3 Modifying an Array Item</h3>
        <h3>Code</h3>
        <CodeBlock
          language="javascript"
          code={`let numbers = [1, 2, 3, 4]; 
numbers[1] = 20;\nconsole.log(numbers);`}
        />
        <h3>Output</h3>
        <OutputBlock output={"[1, 20, 3, 4]"} />
      </section>

      {/* Array Length */}
      <section>
        <h3>2.4 Finding Array Length</h3>
        <p>
          The <code>array.length</code> is used to find the number of items in
          the array.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="javascript"
          code={`let numbers = [1, 2, 3, 4];
let lengthOfArray = myArray.length;
console.log(lengthOfArray);  // 4`}
        />
        <h3>Output</h3>
        <OutputBlock output={4} />
      </section>

      {/* Array Methods */}
      <section>
        <h3>2.5 Array Methods</h3>

        {/* push() */}
        <h4>2.5.1 push()</h4>
        <p>
          The <code>push()</code> method adds new items to the end of the array.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="javascript"
          code={`let numbers = [1, 2, 3, 4];
numbers.push(true);\nconsole.log(numbers);`}
        />
        <h3>Output</h3>
        <OutputBlock output={"[1, 2, 3, 4, true]"} />

        {/* pop() */}
        <h4>2.5.2 pop()</h4>
        <p>Removes the last item from an array and returns it.</p>
        <h3>Code</h3>
        <CodeBlock
          language="javascript"
          code={`let numbers = [1, 2, 3, 4, true];
let last = numbers.pop();\nconsole.log(last);\nconsole.log(numbers);`}
        />
        <h3>Output</h3>
        <OutputBlock output={["true", "[1, 2, 3, 4]"]} />
      </section>

      {/* Functions */}
      <section>
        <h2>3. Functions</h2>

        {/* Function Declaration */}
        <h3>3.1 Function Declaration</h3>
        <p>
          A function declaration is a way to define a named function using the
          function keyword.
          <p>
            It is <code>hoisted</code>, so it can be called <b>before</b> it is
            defined.
          </p>
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="javascript"
          code={`function greet(name) {\n  return "Hello " + name;\n}\nconsole.log(greet("Alice"));`}
        />
        <h3>Output</h3>
        <OutputBlock output={"Hello Alice"} />

        {/* Function Expression */}
        <h3>3.2 Function Expression</h3>
        <p>
          A function expression is a function that is assigned to a variable.
        </p>
        <p>
          It can be anonymous and is <code>not hoisted</code>, so it can be
          called only <b>after</b>
          it is defined.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="javascript"
          code={`let greetExpr = function(name) {\n  return "Hi " + name;\n};\nconsole.log(greetExpr("Bob"));`}
        />
        <h3>Output</h3>
        <OutputBlock output={"Hi Bob"} />
      </section>

      {/* More DOM Manipulations */}
      <section>
        <h2>4. More DOM Manipulations</h2>

        {/* createElement */}
        <h3>4.1 Creating an HTML Element - createElement()</h3>
        <p>Used to create a new HTML element using JavaScript.</p>
        <h3>Code</h3>
        <CodeBlock
          language="javascript"
          code={`let h1Element = document.createElement("h1");
h1Element.textContent = "Web Technologies";
console.log(h1Element);  // <h1>Web Technologies</h1>`}
        />
        <h3>Output</h3>

        {/* appendChild */}
        <h3>4.2 Appending to an HTML Element - appendChild()</h3>
        <p>
          Used to add (append) a child element to a parent element in the DOM.
        </p>
        <b>Appending to Document Body Object:</b>
        <CodeBlock
          language="javascript"
          code={`document.body.appendChild(h1Element);`}
        />
        <b>Appending to Existing Container Element:</b>

        <CodeBlock
          language="javascript"
          code={`let containerElement = document.getElementById("myContainer");
containerElement.appendChild(h1Element);`}
        />

        {/* Event Listeners */}
        <h3>4.3 Adding Event Listeners Dynamically</h3>
        <p>
          Used to attach an event (like click, mouseover, etc.) to an element
          using JavaScript, even after the element is created dynamically.
        </p>
        <CodeBlock
          language="javascript"
          code={`let btnElement = document.createElement("button");
btnElement.textContent = "Change Heading";
document.getElementById("myContainer").appendChild(btnElement);

btnElement.onclick = function(){
  console.log("click event triggered");
};`}
        />

        {/* classList.add */}
        <h3>4.4 Providing Class Names Dynamically - classList.add()</h3>
        <p>
          Used to add a <code>CSS</code> class to an element — helps apply
          styles dynamically.
        </p>
        <CodeBlock
          language="javascript"
          code={`btnElement.onclick = function(){
h1Element.textContent = "4.0 Technologies";
h1Element.classList.add("heading");

console.log(h1Element);
};`}
        />
        <CodeBlock
          language="css"
          code={`.heading {
color: blue;
font-family: "Caveat";
font-size: 40px;
text-decoration: underline;
}`}
        />

        {/* classList.remove */}
        <h3>4.5 Removing Class Names Dynamically - classList.remove()</h3>
        <p>
          Used to remove a <code>CSS</code> class from an element.
        </p>
        <CodeBlock
          language="javascript"
          code={`let removeStylesBtnElement = document.createElement("button");
removeStylesBtnElement.textContent = "Remove Styles";

document.getElementById("myContainer").appendChild(removeStylesBtnElement);

removeStylesBtnElement.onclick = function(){
h1Element.classList.remove("heading");
};`}
        />
      </section>

      {/* Continue Button */}
      <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted || isLoading}
        >
          {isLoading
            ? "Marking..."
            : isSubtopicCompleted
            ? "✓ Completed"
            : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Arrays_Dom_Manipulations_CS;
