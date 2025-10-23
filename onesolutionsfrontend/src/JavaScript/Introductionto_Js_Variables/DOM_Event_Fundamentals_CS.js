import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust the path if needed

const Arrays_Dom_Manipulations_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Arrays & More DOM Manipulations</h1>

      {/* 1. Data Structures */}
      <section>
        <h2>1. Data Structures</h2>
        <p>
          Data Structures allow us to store and organize data efficiently. This
          makes it easier to access and perform operations on the data.
        </p>
        <p>Built-in JavaScript Data Structures:</p>
        <ul>
          <li>Arrays</li>
          <li>Objects</li>
          <li>Maps</li>
          <li>Sets</li>
        </ul>
      </section>

      {/* 2. Arrays */}
      <section>
        <h2>2. Array</h2>
        <p>An Array holds an ordered sequence of items.</p>

        <h3>2.1 Creating an Array</h3>
        <CodeBlock
          language="javascript"
          code={`let myArray = [5, "six", 2, 8.2];
console.log(myArray); // [5, "six", 2, 8.2]`}
        />

        <h3>2.2 Accessing an Array Item</h3>
        <CodeBlock
          language="javascript"
          code={`let myArray = [5, "six", 2, 8.2];
console.log(myArray[0]); // 5
console.log(myArray[1]); // six`}
        />

        <h3>2.3 Modifying an Array Item</h3>
        <CodeBlock
          language="javascript"
          code={`let myArray = [5, "six", 2, 8.2];
myArray[1] = 6;
console.log(myArray); // [5, 6, 2, 8.2]`}
        />

        <h3>2.4 Finding Array Length</h3>
        <CodeBlock
          language="javascript"
          code={`let myArray = [5, "six", 2, 8.2];
let lengthOfArray = myArray.length;
console.log(lengthOfArray); // 4`}
        />

        <h3>2.5 Array Methods</h3>

        <h4>2.5.1 push()</h4>
        <CodeBlock
          language="javascript"
          code={`let myArray = [5, "six", 2, 8.2];
myArray.push(true);
console.log(myArray); // [5, "six", 2, 8.2, true]`}
        />

        <h4>2.5.2 pop()</h4>
        <CodeBlock
          language="javascript"
          code={`let myArray = [5, "six", 2, 8.2];
let lastItem = myArray.pop();
console.log(myArray); // [5, "six", 2]
console.log(lastItem); // 8.2`}
        />
      </section>

      {/* 3. Functions */}
      <section>
        <h2>3. Functions</h2>

        <h3>3.1 Function Declaration</h3>
        <CodeBlock
          language="javascript"
          code={`function showMessage() {
  console.log("Hello");
}
showMessage();`}
        />

        <h3>3.2 Function Expression</h3>
        <CodeBlock
          language="javascript"
          code={`let showMessage = function() {
  console.log("Hello");
};
showMessage();`}
        />
      </section>

      {/* 4. More DOM Manipulations */}
      <section>
        <h2>4. More DOM Manipulations</h2>

        <h3>4.1 Creating an HTML Element - createElement()</h3>
        <CodeBlock
          language="javascript"
          code={`let h1Element = document.createElement("h1");
h1Element.textContent = "Web Technologies";
console.log(h1Element); // <h1>Web Technologies</h1>`}
        />

        <h3>4.2 Appending to an HTML Element - appendChild()</h3>
        <CodeBlock
          language="javascript"
          code={`// Appending to document body
document.body.appendChild(h1Element);

// Appending to existing container
let containerElement = document.getElementById("myContainer");
containerElement.appendChild(h1Element);`}
        />

        <h3>4.3 Adding Event Listeners Dynamically</h3>
        <CodeBlock
          language="javascript"
          code={`let btnElement = document.createElement("button");
btnElement.textContent = "Change Heading";
document.getElementById("myContainer").appendChild(btnElement);

btnElement.onclick = function() {
  console.log("click event triggered");
};`}
        />

        <h3>4.4 Providing Class Names Dynamically - classList.add()</h3>
        <CodeBlock
          language="javascript"
          code={`btnElement.onclick = function() {
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

        <h3>4.5 Removing Class Names Dynamically - classList.remove()</h3>
        <CodeBlock
          language="javascript"
          code={`let removeStylesBtnElement = document.createElement("button");
removeStylesBtnElement.textContent = "Remove Styles";
document.getElementById("myContainer").appendChild(removeStylesBtnElement);

removeStylesBtnElement.onclick = function() {
  h1Element.classList.remove("heading");
};`}
        />
      </section>

      {/* Continue Button */}
      <div className="view-continue" style={{ marginTop: "20px" }}>
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
