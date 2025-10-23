import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const On_Demand_Session_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>On-Demand Session | Cheat Sheet</h1>

      {/* 1. Most Commonly Made Mistakes */}
      <section>
        <h2>1. Most Commonly Made Mistakes</h2>

        <h3>1.1 JS Properties and Methods Should Be in Camel Case</h3>
        <p>
          Most JS properties and methods are in <b>Camel case</b> (first letter
          lowercase, subsequent words start with uppercase).
        </p>

        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Mistake</th>
              <th>Correct Syntax</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>document.CreateElement()</td>
              <td>C in Uppercase</td>
              <td>document.createElement()</td>
            </tr>
            <tr>
              <td>document.getElementbyId()</td>
              <td>b in Lowercase</td>
              <td>document.getElementById()</td>
            </tr>
            <tr>
              <td>element.textcontent</td>
              <td>c in Lowercase</td>
              <td>element.textContent</td>
            </tr>
            <tr>
              <td>element.classlist.add()</td>
              <td>l in Lowercase</td>
              <td>element.classList.add()</td>
            </tr>
          </tbody>
        </table>

        <h3>1.2 The ID Should Be the Same in HTML and JS</h3>

        <h4>1.2.1 Mistake</h4>
        <CodeBlock
          language="html"
          code={`<h1 id="heading">Shopping List</h1>`}
        />
        <CodeBlock
          language="javascript"
          code={`let headingEl = document.getElementById("listHeading");
headingEl.textContent = "Items Needed";`}
        />
        <p>
          The HTML element's text content doesn't change because the ID used in
          HTML and JS are different. IDs must match exactly.
        </p>

        <h4>Correct</h4>
        <CodeBlock
          language="html"
          code={`<h1 id="heading">Shopping List</h1>`}
        />
        <CodeBlock
          language="javascript"
          code={`let headingEl = document.getElementById("heading");
headingEl.textContent = "Items Needed";`}
        />

        <h4>1.2.2 Mistake (Extra Space)</h4>
        <CodeBlock
          language="html"
          code={`<h1 id="listHeading ">Shopping List</h1>`}
        />
        <CodeBlock
          language="javascript"
          code={`let headingEl = document.getElementById("listHeading");
headingEl.textContent = "Items Needed";`}
        />
        <p>There shouldn't be extra spaces in IDs in HTML and JS.</p>

        <h4>Correct</h4>
        <CodeBlock
          language="html"
          code={`<h1 id="listHeading">Shopping List</h1>`}
        />
        <CodeBlock
          language="javascript"
          code={`let headingEl = document.getElementById("listHeading");
headingEl.textContent = "Items Needed";`}
        />

        <h3>1.3 Function Name Must Match Declaration and Call</h3>
        <h4>1.3.1 Mistake</h4>
        <CodeBlock
          language="javascript"
          code={`function greeting() {
  let message = "Hello Rahul";
  console.log(message);
}
greet();`}
        />
        <p>
          Error occurs because function call name doesn't match the declaration.
        </p>

        <h4>Correct</h4>
        <CodeBlock
          language="javascript"
          code={`function greeting() {
  let message = "Hello Rahul";
  console.log(message);
}
greeting();`}
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

export default On_Demand_Session_CS;
