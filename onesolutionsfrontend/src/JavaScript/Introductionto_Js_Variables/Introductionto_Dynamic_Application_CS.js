import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const Introductionto_Dynamic_Application = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Introduction to Dynamic Applications</h1>

      {/* Introduction */}
      <section>
        <h2>What are Dynamic Applications?</h2>
        <p>
          Dynamic applications allow web pages to interact with users, update
          content instantly, and respond to events without reloading the page.
          This is achieved using <strong>JavaScript</strong>.
        </p>
        <p className="note">
          Note: JavaScript makes your static pages interactive and dynamic.
        </p>
      </section>

      {/* Dynamic Web Page */}
      <section>
        <h2>1. What is a Dynamic Web Page?</h2>
        <ul>
          <li>Updates content without refreshing the page.</li>
          <li>Responds to user input instantly.</li>
          <li>Improves user experience and interactivity.</li>
        </ul>
      </section>

      {/* Adding JavaScript */}
      <section>
        <h2>2. Adding JavaScript to HTML</h2>
        <CodeBlock
          language="html"
          code={`<script>
  function showMessage() {
    document.getElementById("demo").innerHTML = "Hello, Dynamic World!";
  }
</script>

<button onclick="showMessage()">Click Me</button>
<p id="demo"></p>`}
        />
      </section>

      {/* Event Handling */}
      <section>
        <h2>3. Event Handling</h2>
        <ul>
          <li>
            Events like <code>onclick</code>, <code>onmouseover</code>,{" "}
            <code>onchange</code> make elements interactive.
          </li>
          <li>JavaScript functions run when these events are triggered.</li>
        </ul>
        <CodeBlock
          language="html"
          code={`<button onclick="alert('Button Clicked!')">Click Me</button>`}
        />
      </section>

      {/* DOM Manipulation */}
      <section>
        <h2>4. DOM Manipulation</h2>
        <p>
          The <strong>DOM (Document Object Model)</strong> allows you to
          dynamically access and update the content and structure of your web
          page.
        </p>
        <CodeBlock
          language="javascript"
          code={`document.getElementById("demo").innerHTML = "Dynamic Content Updated!";`}
        />
      </section>

      {/* Real-time Interactivity Example */}
      <section>
        <h2>5. Real-time Interactivity Example</h2>
        <CodeBlock
          language="html"
          code={`<input type="text" id="nameInput" placeholder="Enter your name">
<button onclick="greetUser()">Greet</button>
<p id="greeting"></p>

<script>
  function greetUser() {
    const name = document.getElementById("nameInput").value;
    document.getElementById("greeting").innerHTML = "Hello, " + name + "!";
  }
</script>`}
        />
      </section>

      {/* Key Points */}
      <section>
        <h2>6. Key Points</h2>
        <ul>
          <li>JavaScript enables real-time updates and dynamic content.</li>
          <li>Event handling is essential for interactivity.</li>
          <li>
            DOM manipulation allows modification of HTML elements directly.
          </li>
        </ul>
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

export default Introductionto_Dynamic_Application;
