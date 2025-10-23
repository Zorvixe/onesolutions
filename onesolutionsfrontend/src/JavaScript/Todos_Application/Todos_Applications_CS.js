import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust import path as needed

const Todos_Applications_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Todos Application | Cheat Sheet</h1>

      {/* 1. HTML Input Element */}
      <section>
        <h2>1. HTML Input Element</h2>

        <h3>1.1 Checkbox</h3>
        <p>
          The HTML input element can be used to create a Checkbox. To define a
          Checkbox, specify the <b>type</b> attribute as <code>checkbox</code>{" "}
          for an input element.
        </p>
        <CodeBlock language="html" code={`<input type="checkbox" />`} />

        <h3>1.2 The HTML Label Element</h3>
        <p>
          The HTML <code>&lt;label&gt;</code> element defines a Label.
        </p>
        <CodeBlock
          language="html"
          code={`<label for="myCheckbox">Graduated</label>`}
        />

        <h4>1.2.1 The HTML for Attribute</h4>
        <p>
          The <b>for</b> attribute associates the HTML label element with an
          input element.
        </p>
        <CodeBlock
          language="html"
          code={`<input type="checkbox" id="myCheckbox" />
<label for="myCheckbox">Graduated</label>`}
        />
      </section>

      {/* 2. DOM Manipulations */}
      <section>
        <h2>2. DOM Manipulations</h2>

        <h3>2.1 The htmlFor Property</h3>
        <p>
          We can use <code>htmlFor</code> property to add the HTML{" "}
          <code>for</code> attribute to a label element.
        </p>
        <CodeBlock
          language="javascript"
          code={`let labelElement = document.createElement("label");
labelElement.htmlFor = "myCheckbox";`}
        />

        <h3>2.2 The setAttribute() Method</h3>
        <p>
          We can use <code>setAttribute()</code> method to set any HTML
          attribute name and its value. If the attribute exists, it updates; if
          not, it adds a new one.
        </p>

        <p>
          <b>Syntax:</b> <code>Element.setAttribute(name, value);</code>
        </p>

        <CodeBlock
          language="javascript"
          code={`let labelElement = document.createElement("label");
labelElement.setAttribute("for", "myCheckbox");`}
        />

        <p>
          Try out creating the HTML label element dynamically in the below Code
          Playground.
        </p>

        <CodeBlock
          language="html"
          code={`<!DOCTYPE html>
<html>
  <head></head>
  <body> </body>
</html>`}
        />
      </section>

      {/* 3. Loops */}
      <section>
        <h2>3. Loops</h2>
        <p>Loops allow us to execute a block of code several times.</p>
        <ul>
          <li>for...of Loop</li>
          <li>for...in Loop</li>
          <li>for Loop</li>
          <li>while Loop and many more.</li>
        </ul>

        <h3>3.1 The for...of Loop</h3>
        <CodeBlock
          language="javascript"
          code={`let myArray = [1, 2, 3, 4];
for (let eachItem of myArray) {
   console.log(eachItem);
}`}
        />

        <p>The HTML Code for creating a Todo Item:</p>

        <CodeBlock
          language="html"
          code={`<li class="todo-item-container d-flex flex-row">
  <input type="checkbox" id="checkboxInput" class="checkbox-input" />
  <div class="d-flex flex-row label-container">
    <label for="checkboxInput" class="checkbox-label">
      Learn HTML
    </label>
    <div class="delete-icon-container">
      <i class="far fa-trash-alt delete-icon"></i>
    </div>
  </div>
</li>`}
        />
      </section>

      {/* 4. CSS Box Properties */}
      <section>
        <h2>4. CSS Box Properties</h2>

        <h3>4.1 Border</h3>
        <p>
          The CSS <b>border</b> property is a shorthand for:
        </p>
        <ul>
          <li>border-width</li>
          <li>border-style (required)</li>
          <li>border-color</li>
        </ul>

        <p>For example:</p>
        <CodeBlock
          language="css"
          code={`.button {
  border-style: dashed;
  border-width: 2px;
  border-color: #e4e7eb;
}`}
        />

        <p>
          Instead of writing the properties individually, we can combine them
          using the shorthand property <b>border</b>.
        </p>
        <p>
          <b>Syntax:</b>{" "}
          <code>border: border-width border-style border-color;</code>
        </p>

        <CodeBlock
          language="css"
          code={`.button {
  border: 2px dashed #e4e7eb;
}`}
        />

        <p>
          To specify the border on one side of an element, use:
          <ul>
            <li>border-top</li>
            <li>border-bottom</li>
            <li>border-right</li>
            <li>border-left</li>
          </ul>
        </p>

        <CodeBlock
          language="css"
          code={`.button {
  border-top: 1px dotted #e4e7eb;
}`}
        />

        <p>
          If no border is required, we can use <code>border: none;</code>.
        </p>

        <CodeBlock
          language="css"
          code={`.button {
  border: none;
}`}
        />

        <p>
          Example: if border is not required on top side, use{" "}
          <code>border-top: none;</code>.
        </p>

        <CodeBlock
          language="css"
          code={`.button {
  border-top: none;
}`}
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

export default Todos_Applications_CS;
