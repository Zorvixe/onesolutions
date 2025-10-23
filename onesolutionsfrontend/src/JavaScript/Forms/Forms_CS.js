import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Forms_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Forms | Cheat Sheet</h1>

      {/* 1. HTML Forms */}
      <section>
        <h2>1. HTML Forms</h2>
        <p>
          HTML Forms are used to collect data from the user.
        </p>
        <p>Forms can be of different kinds:</p>
        <ul>
          <li>Login / Sign in Form</li>
          <li>Registration Form</li>
          <li>Contact Us Form, etc.</li>
        </ul>

        <h3>1.1 HTML Form Element</h3>
        <p>
          The <code>&lt;form&gt;</code> element is a container for input elements like text fields, checkboxes, etc.
        </p>
        <CodeBlock
          language="html"
          code={`<form></form>`}
        />
        <p><strong>Note:</strong> Whenever we click a button or press Enter while editing any input field in the form, the submit event is triggered.</p>
      </section>

      {/* 2. Event Object Methods */}
      <section>
        <h2>2. Event Object Methods</h2>
        <h3>2.1 preventDefault()</h3>
        <p>
          The <code>preventDefault()</code> method prevents the default action.  
          In a form, it prevents the default submit behavior.
        </p>
        <CodeBlock
          language="javascript"
          code={`let myFormEl = document.getElementById("myForm");
myFormEl.addEventListener("submit", function(event) {
  event.preventDefault();
});`}
        />
      </section>

      {/* 3. Event Types */}
      <section>
        <h2>3. Event Types</h2>
        <p>Different types of events:</p>
        <ul>
          <li>Keyboard Events</li>
          <li>Mouse Events</li>
          <li>Touch Events</li>
          <li>Form Events, etc.</li>
        </ul>

        <h3>3.1 Form Events</h3>
        <p>A form event occurs within a form. Examples:</p>
        <ul>
          <li>blur</li>
          <li>focus</li>
          <li>change, etc.</li>
        </ul>

        <h3>3.1.1 Blur Event</h3>
        <p>
          The blur event triggers when an HTML element loses focus.
        </p>
        <CodeBlock
          language="javascript"
          code={`let nameEl = document.getElementById("name");
nameEl.addEventListener("blur", function(event) {
  console.log("blur event triggered");
});`}
        />
        <p>Try out the <code>preventDefault()</code> method and blur event in your Code Playground.</p>
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

export default Forms_CS;
