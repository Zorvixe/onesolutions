import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Todos_Applications_CS = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

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
      } else {
        alert("Failed to mark as complete.");
      }
    } catch (error) {
      alert("Failed to mark as complete.");
    } finally {
      setIsLoading(false);
    }
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
          Checkbox, you need to specify the HTML <code>type</code> attribute
          with the value <code>checkbox</code> for an HTML input element.
        </p>

        <CodeBlock language="html" code={`<input type="checkbox" />`} />

        <h3>1.2 The HTML Label Element</h3>
        <p>
          The HTML <code>label</code> element defines a Label.
        </p>

        <CodeBlock
          language="html"
          code={`<label for="myCheckbox">Graduated</label>`}
        />

        <h3>1.2.1 The HTML for Attribute</h3>
        <p>
          The HTML <code>for</code> attribute associates the HTML label element
          with an HTML input element.
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
          We can use <code>htmlFor</code> property to add HTML <code>for</code>{" "}
          attribute to the HTML label element.
        </p>

        <CodeBlock
          language="javascript"
          code={`let labelElement = document.createElement("label");
labelElement.htmlFor = "myCheckbox";`}
        />

        <h3>2.2 The setAttribute() Method</h3>
        <p>
          We can use <code>setAttribute()</code> method to set any HTML
          attribute name and its corresponding value. If the attribute already
          exists, the value is updated. Otherwise, a new attribute is added with
          the specified name and value.
        </p>

        <p>
          <b>Syntax:</b> <code>Element.setAttribute(name, value);</code>
        </p>

        <CodeBlock
          language="javascript"
          code={`let labelElement = document.createElement("label");
labelElement.setAttribute("for", "myCheckbox");`}
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
      </section>

      {/* Todo Item HTML */}
      <section>
        <h2>The HTML Code for creating a Todo Item:</h2>

        <CodeBlock
          language="html"
          code={`<li class="todo-item-container d-flex flex-row">
  <input
    type="checkbox"
    id="checkboxInput"
    class="checkbox-input"
  />
  <div class="d-flex flex-row label-container">
    <label
      for="checkboxInput"
      class="checkbox-label"
    >
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
          The CSS <code>border</code> property is a shorthand property for:
        </p>
        <ul>
          <li>border-width</li>
          <li>border-style (required)</li>
          <li>border-color</li>
        </ul>

        <CodeBlock
          language="css"
          code={`.button {
  border-style: dashed;
  border-width: 2px;
  border-color: #e4e7eb;
}`}
        />

        <p>
          Instead of writing the CSS properties <code>border-style</code>,{" "}
          <code>border-width</code> and
          <code>border-color</code> individually, we can apply these properties
          at once with a single CSS property called border.
        </p>

        <p>
          <b>Syntax:</b>{" "}
          <code>border: border-width border-style border-color</code>
        </p>

        <CodeBlock
          language="css"
          code={`.button {
  border: 2px dashed #e4e7eb;
}`}
        />

        <p>
          To specify the border on one of the four sides of an HTML element, you
          can use the below CSS properties.
        </p>

        <ul>
          <li>border-top</li>
          <li>border-bottom</li>
          <li>border-right</li>
          <li>border-left</li>
        </ul>

        <CodeBlock
          language="css"
          code={`.button {
  border-top: 1px dotted #e4e7eb;
}`}
        />

        <p>
          If the border is not required, we can apply the <code>none</code> as
          value to the CSS <code>border</code> property.
        </p>

        <CodeBlock
          language="css"
          code={`.button {
  border: none;
}`}
        />

        <p>
          For example, if the border property is not required on the top side of
          an HTML element. You can use,
        </p>

        <CodeBlock
          language="css"
          code={`.button {
  border-top: none;
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

export default Todos_Applications_CS;
