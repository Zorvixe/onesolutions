import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust the path if needed

const DOM_Event_Fundamentals_CS = ({
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
  const renderMCQ = (q, idx, namePrefix) => (
    <div key={idx} style={{ marginBottom: "10px" }}>
      <p>{q.question}</p>
      {q.options.map((option) => (
        <div key={option}>
          <label>
            <input
              type="radio"
              name={`${namePrefix}_${idx}`}
              checked={mcqAnswers[q.question] === option}
              onChange={() => handleAnswer(q.question, option)}
            />{" "}
            {option}
          </label>
        </div>
      ))}
      {mcqAnswers[q.question] && (
        <p
          style={{
            fontWeight: "bold",
            color: mcqAnswers[q.question] === q.answer ? "green" : "red",
          }}
        >
          {mcqAnswers[q.question] === q.answer
            ? "✅ Correct"
            : `❌ Wrong. Correct answer: ${q.answer}`}
        </p>
      )}
    </div>
  );

  return (
    <div className="intro-container">
      <h1>DOM and Event Fundamentals | Cheat Sheet</h1>

      {/* 1. Variables Section */}
      <section>
        <h2>1. JavaScript Variables</h2>

        <h3>1.1 Variable Declaration</h3>
        <p>
          Variables are like containers for storing values. We can create a
          variable using the <code>let</code> keyword.
        </p>
        <CodeBlock
          language="javascript"
          code={`let message; // declaring a variable`}
        />

        <h3>1.2 Assigning a Value to the Variable</h3>
        <p>
          We can put data into a variable using an assignment operator (
          <code> = </code> ).
        </p>
        <CodeBlock
          language="javascript"
          code={`let message = "Hello World!";
console.log(message);`}
        />

        <p className="note">
          <b>Note:</b> Printing a variable without assigning a value gives{" "}
          <code>undefined</code>.
        </p>

        <CodeBlock
          language="html"
          code={`<button onclick="runCode()">Run Code</button>
<script>
  function runCode() {
    let x = 10;
    let y = 20;
    console.log("Sum =", x + y);
  }
</script>`}
        />
      </section>

      {/* 2. DOM Section */}
      <section>
        <h2>2. Document Object Model (DOM)</h2>
        <p>
          The DOM is the structured representation of the HTML document created
          by the browser. It allows JavaScript to manipulate, structure, and
          style your website.
        </p>
        <h4>Example HTML:</h4>
        <CodeBlock
          language="html"
          code={`<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Web Technologies</h1>
    <button>Change Heading</button>
  </body>
</html>`}
        />
        <h4>2.1 Document Object</h4>
        <p>
          It is the entry point of the DOM. For accessing any HTML Element, you
          should always start with accessing the document object first.
        </p>
        <h4>2.2 DOM Tree Representation</h4>
        <p>
          The DOM tree represents an HTML document as nodes. Each node is
          referred to as an Object.
        </p>
        {/* DOM Tree Diagram */}
        <div className="dom-tree-diagram">
          <img
            src="/assets/img/dom_tree_img.png"
            alt="DOM Tree"
            style={{ width: "400px", height: "400px" }}
          />
        </div>

        <h3>2.3 Methods</h3>
        <h4>2.3.1 getElementById</h4>
        <p>
          The <code>getElementById()</code> method helps to select the HTML
          Element with a specific ID.
        </p>
        <CodeBlock
          language="javascript"
          code={`console.log(document.getElementById("headingElement"))`}
        />
        <h3>2.4 Properties</h3>
        <h4>2.4.1 textContent</h4>
        <p>
          To manipulate the text within the HTML Element, we use{" "}
          <code>textContent</code> Property.
        </p>
        <h4>2.4.2 style</h4>
        <p>
          The <code>style</code> property is used to get or set a specific style
          of an HTML Element using different CSS properties.
        </p>
        <p>
          Use Camel Case naming convention (starting letter of each word should
          be in the upper case except for the first word) for naming the Style
          Object Properties.
        </p>
        <p>
          For example,<code> color, fontFamily, backgroundColor, etc.</code>
        </p>
        <h3>2.5 Events</h3>
        <p>
          Events are the actions by which the user or browser interacts with the
          HTML Elements. Actions can be anything like clicking a button,
          pressing keyboard keys, scrolling the page, etc.
        </p>
        <h4>2.5.1 onclick Event</h4>
        <p>
          The <code>onclick</code> event occurs when the user clicks on an HTML
          Element. We will give the name of the function as a value for the HTML
          <code>onclick</code> attribute.
        </p>
        <CodeBlock
          language="javascript"
          code={`<body>
<h1 id="headingElement">Web Technologies</h1>
<button onclick="manipulateStyles()">Change Heading</button>
</body>`}
        />
        <CodeBlock
          language="javascript"
          code={`function manipulateStyles() {
document.getElementById("headingElement").textContent = "4.O Technologies";
document.getElementById("headingElement").style.color = "blue";
}`}
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

export default DOM_Event_Fundamentals_CS;
