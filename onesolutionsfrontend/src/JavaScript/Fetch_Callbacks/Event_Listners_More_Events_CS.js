import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust import path if needed

const Event_Listeners_More_Events_CS = ({
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
      <h1>Event Listeners and More Events | Cheat Sheet</h1>

      {/* 1. Event Listeners */}
      <section>
        <h2>1. Event Listeners</h2>
        <p>
          JavaScript offers three ways to add an Event Listener to a DOM
          element.
        </p>
        <ul>
          <li>Inline event listeners</li>
          <li>onevent listeners</li>
          <li>addEventListener()</li>
        </ul>

        <h3>1.1 Inline event listeners</h3>

        <CodeBlock
          language="html"
          code={`<button onclick="greeting()">Greet</button>`}
        />

        <CodeBlock
          language="javascript"
          code={`function greeting() {
  console.log("Hi Rahul");
}`}
        />

        <h3>1.2 onevent listeners</h3>

        <CodeBlock
          language="html"
          code={`<button id="greetBtn">Greet</button>`}
        />

        <CodeBlock
          language="javascript"
          code={`let greetBtnEl = document.getElementById("greetBtn");
greetBtnEl.onclick = function() {
  console.log("Hi Rahul");
};`}
        />

        <h3>1.3 addEventListener()</h3>
        <p>It is a modern approach to add an event listener.</p>
        <p>
          <b>Syntax:</b> <code>element.addEventListener(event, function);</code>
        </p>
        <ul>
          <li>
            <b>element</b> - HTML element
          </li>
          <li>
            <b>event</b> - event name
          </li>
          <li>
            <b>function</b> - Callback function
          </li>
        </ul>

        <CodeBlock
          language="html"
          code={`<button id="greetBtn">Greet</button>`}
        />

        <CodeBlock
          language="javascript"
          code={`let greetBtn = document.getElementById("greetBtn");
greetBtn.addEventListener("click", function() {
  console.log("Hi Rahul");
});`}
        />
      </section>

      {/* 2. Operators */}
      <section>
        <h2>2. Operators</h2>

        <h3>2.1 Comparison Operators</h3>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Operator</th>
              <th>Usage</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Equal ( == )</td>
              <td>a == b</td>
              <td>returns true if both a and b values are equal.</td>
            </tr>
            <tr>
              <td>Not equal ( != )</td>
              <td>a != b</td>
              <td>returns true if both a and b values are not equal.</td>
            </tr>
            <tr>
              <td>Strict equal ( === )</td>
              <td>a === b</td>
              <td>
                returns true if both a and b values are equal and of the same
                type.
              </td>
            </tr>
            <tr>
              <td>Strict not equal ( !== )</td>
              <td>a !== b</td>
              <td>
                returns true if either a and b values are not equal or of a
                different type.
              </td>
            </tr>
            <tr>
              <td>Greater than ( &gt; )</td>
              <td>a &gt; b</td>
              <td>returns true if a value is greater than b value.</td>
            </tr>
            <tr>
              <td>Greater than or equal ( &gt;= )</td>
              <td>a &gt;= b</td>
              <td>
                returns true if a value is greater than or equal to b value.
              </td>
            </tr>
            <tr>
              <td>Less than ( &lt; )</td>
              <td>a &lt; b</td>
              <td>returns true if a value is less than b value.</td>
            </tr>
            <tr>
              <td>Less than or equal ( &lt;= )</td>
              <td>a &lt;= b</td>
              <td>returns true if a value is less than or equal to b value.</td>
            </tr>
          </tbody>
        </table>

        <h3>2.2 Logical Operators</h3>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Operator</th>
              <th>Usage</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AND ( && )</td>
              <td>a && b</td>
              <td>returns true if both a and b values are true.</td>
            </tr>
            <tr>
              <td>OR ( || )</td>
              <td>a || b</td>
              <td>returns true if either a or b value is true.</td>
            </tr>
            <tr>
              <td>NOT ( ! )</td>
              <td>!a</td>
              <td>returns true if a value is not true.</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 3. More Events */}
      <section>
        <h2>3. More Events</h2>
        <p>
          Events are the actions by which the user or browser interact with HTML
          elements.
        </p>
        <p>There are different types of events.</p>
        <ul>
          <li>
            <b>Keyboard Events</b>
          </li>
          <li>Mouse Events</li>
          <li>Touch Events, and many more.</li>
        </ul>

        <h3>3.1 Keyboard Events</h3>
        <p>Keyboard Event is the user interaction with the keyboard.</p>
        <p>The keyboard events are</p>
        <ul>
          <li>keydown</li>
          <li>keyup</li>
        </ul>

        <h4>3.1.1 Keydown event</h4>
        <p>
          The <code>keydown event</code> occurs when a key on the keyboard is
          pressed.
        </p>
        <p>
          <b>Syntax:</b>{" "}
          <code>element.addEventListener("keydown", function);</code>
        </p>

        <CodeBlock
          language="javascript"
          code={`let inputEl = document.createElement("input");
function printKeydown() {
  console.log("key pressed");
}
inputEl.addEventListener("keydown", printKeydown);
document.body.appendChild(inputEl);`}
        />

        <h4>3.1.2 Keyup event</h4>
        <p>The keyup event occurs when a key on the keyboard is released.</p>
        <p>
          <b>Syntax:</b>{" "}
          <code>element.addEventListener("keyup", function);</code>
        </p>
      </section>

      {/* 3.2 Event Object */}
      <section>
        <h3>3.2 Event Object</h3>
        <p>
          Whenever an event happens, the browser creates an <code>event</code>{" "}
          object.
        </p>
        <p>It consists of information about the event that has happened.</p>
        <p>It consists of many properties and methods.</p>
        <ul>
          <li>type</li>
          <li>target</li>
          <li>key</li>
          <li>timeStamp</li>
          <li>stopPropagation, and many more.</li>
        </ul>

        <h4>3.2.1 Properties & Methods</h4>
        <p>
          For any event, event-specific properties and methods will be present.
        </p>
        <p>
          For Example, the <code>keydown</code> event has <code>key</code>{" "}
          property, whereas the <code>onclick</code> event doesn't have it.
        </p>

        <h4>event.type</h4>
        <p>
          The <code>event.type</code> property contains the type of event
          occurred like click, keydown, etc.
        </p>

        <CodeBlock
          language="javascript"
          code={`let inputEl = document.createElement("input");
function printKeydown(event) {
  console.log(event.type);  // keydown
}
inputEl.addEventListener("keydown", printKeydown);
document.body.appendChild(inputEl);`}
        />

        <h4>event.target</h4>
        <p>
          The <code>event.target</code> property contains the HTML element that
          triggered the event.
        </p>

        <CodeBlock
          language="javascript"
          code={`let inputElement = document.createElement("input");
function printKeydown(event) {
  console.log(event.target);  // <input></input>
}
inputElement.addEventListener("keydown", printKeydown);
document.body.appendChild(inputElement);`}
        />

        <h4>event.key</h4>
        <p>
          The <code>event.key</code> property contains the value of the key
          pressed by the user.
        </p>

        <CodeBlock
          language="javascript"
          code={`let inputElement = document.createElement("input");
function printKeydown(event) {
  console.log(event.key);
}
inputElement.addEventListener("keydown", printKeydown);
document.body.appendChild(inputElement);`}
        />

        <h4>Keyboard key and event.key value</h4>
        <table className="cheatsheet-table">
          <thead>
            <tr>
              <th>Keyboard key</th>
              <th>event.key value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Enter</td>
              <td>Enter</td>
            </tr>
            <tr>
              <td>a</td>
              <td>a</td>
            </tr>
            <tr>
              <td>A</td>
              <td>A</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>*</td>
              <td>*</td>
            </tr>
            <tr>
              <td>&lt;</td>
              <td>&lt;</td>
            </tr>
          </tbody>
        </table>

        <p>
          Try out the keyboard events and the event object in the below Code
          Playground.
        </p>
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

export default Event_Listeners_More_Events_CS;
