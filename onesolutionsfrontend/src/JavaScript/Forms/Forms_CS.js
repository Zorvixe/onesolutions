import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Forms_CS = ({
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

export default Forms_CS;
