import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust import path

const Callbacks_Schedulers_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Callbacks & Schedulers | Cheat Sheet</h1>

      {/* 1. Callback function */}
      <section>
        <h2>1. Callback function</h2>
        <p>
          A Callback is a function that is passed as an argument to another
          function.
        </p>

        <h3>1.1 Passing a function as an argument</h3>

        <CodeBlock
          language="javascript"
          code={`function displayGreeting(displayName) {
  console.log("Hello");
  displayName();
  console.log("Good Morning!");
}
displayGreeting(function() {
  console.log("Rahul");
});`}
        />

        <h3>1.2 Passing a function name as an argument</h3>

        <CodeBlock
          language="javascript"
          code={`function displayGreeting(displayName) {
  console.log("Hello");
  displayName();
  console.log("Good Morning!");
}
function displayRahul() {
  console.log("Rahul");
}
displayGreeting(displayRahul);`}
        />

        <h3>1.3 Passing a function expression as an argument</h3>

        <CodeBlock
          language="javascript"
          code={`function displayGreeting(displayName) {
  console.log("Hello");
  displayName();
  console.log("Good Morning!");
}
let displayRam = function() {
  console.log("Ram");
};
displayGreeting(displayRam);`}
        />
      </section>

      {/* 2. Schedulers */}
      <section>
        <h2>2. Schedulers</h2>
        <p>
          The Schedulers are used to schedule the execution of a callback
          function.
        </p>
        <p>There are different scheduler methods:</p>
        <ul>
          <li>setInterval()</li>
          <li>clearInterval()</li>
          <li>setTimeout()</li>
          <li>clearTimeout()</li>
        </ul>

        <h3>2.1 setInterval()</h3>
        <p>
          The <code>setInterval()</code> method allows us to run a function at
          the specified interval of time repeatedly.
        </p>
        <p>
          <b>Syntax:</b> <code>setInterval(function, delay)</code>;
        </p>
        <p>
          <b>function</b> - a callback function that is called repeatedly at the
          specified interval of time (delay).
        </p>
        <p>
          <b>delay</b> - time in milliseconds. (1 second = 1000 milliseconds)
        </p>

        <CodeBlock
          language="javascript"
          code={`let counter = 0;
setInterval(function() {
  console.log(counter);
  counter = counter + 1;
}, 1000);`}
        />

        <p>
          In the <b>setInterval()</b> method, the callback function repeatedly
          executes until the browser tab is closed or the scheduler is
          cancelled.
        </p>
        <p>
          When we call the <b>setInterval()</b> method, it returns a unique id.
          This unique id is used to cancel the callback function execution.
        </p>

        <h3>2.2 clearInterval()</h3>
        <p>
          The <code>clearInterval()</code> method cancels a schedule previously
          set up by calling <b>setInterval()</b>.
        </p>
        <p>
          To execute <code>clearInterval()</code>, we need to pass the uniqueId
          returned by <b>setInterval()</b> as an argument.
        </p>
        <p>
          <b>Syntax:</b> <code>clearInterval(uniqueId)</code>;
        </p>

        <CodeBlock
          language="javascript"
          code={`let counter = 0;
let uniqueId = setInterval(function() {
  console.log(counter);
  counter = counter + 1;
}, 1000);
clearInterval(uniqueId);`}
        />

        <h3>2.3 setTimeout()</h3>
        <p>
          The <code>setTimeout()</code> method executes a function after the
          specified time.
        </p>
        <p>
          <b>Syntax:</b> setTimeout(function, delay);
        </p>
        <p>
          <b>function</b> - a callback function that is called after the
          specified time (delay).
        </p>
        <p>
          <b>delay</b> - time in milliseconds.
        </p>

        <CodeBlock
          language="javascript"
          code={`let counter = 0;
setTimeout(function() {
  console.log(counter);
  counter = counter + 1;
}, 1000);`}
        />

        <h3>2.4 clearTimeout()</h3>
        <p>
          We can cancel the <code>setTimeout()</code> before it executes the
          callback function using <code>clearTimeout()</code>.
        </p>
        <p>
          To execute <code>clearTimeout()</code>, we need to pass the uniqueId
          returned by <code>setTimeout()</code> as an argument.
        </p>
        <p>
          <b>Syntax:</b> clearTimeout(uniqueId);
        </p>

        <CodeBlock
          language="javascript"
          code={`let counter = 0;
let uniqueId = setTimeout(function() {
  console.log(counter);
  counter = counter + 1;
}, 1000);
clearTimeout(uniqueId);`}
        />

        <p>
          Try out the <code>setInterval()</code>, <code>clearInterval()</code>,{" "}
          <code>setTimeout()</code>, and <code>clearTimeout()</code> methods in
          the below Code Playground console.
        </p>
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

export default Callbacks_Schedulers_CS;
