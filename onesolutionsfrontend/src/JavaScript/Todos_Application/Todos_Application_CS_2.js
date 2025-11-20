import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust import path as needed

const Todos_Applications_CS_2 = ({
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
      <h1>Todos Application | Part 2 | Cheat Sheet</h1>

      {/* 1. HTML Input Element */}
      <section>
        <h2>1. HTML Input Element</h2>

        <h3>1.1 Placeholder</h3>
        <p>
          Placeholder is the text that appears in the HTML{" "}
          <code>input element</code> when no value is set. We can specify it
          using the HTML attribute <b>placeholder</b>.
        </p>

        <h4>Example:</h4>
        <CodeBlock
          language="html"
          code={`<input type="text" placeholder="Enter your name" />`}
        />
      </section>

      {/* 2. JavaScript Built-in Functions */}
      <section>
        <h2>2. JavaScript Built-in Functions</h2>

        <h3>2.1 alert()</h3>
        <p>
          The <code>alert()</code> function displays an alert box with a
          specified message and an OK button.
        </p>

        <CodeBlock language="javascript" code={`alert("Enter Valid Text");`} />
      </section>

      {/* 3. DOM Properties */}
      <section>
        <h2>3. DOM Properties</h2>

        <h3>3.1 Checked</h3>
        <p>
          The <code>checked</code> property sets or returns the checked status
          of an HTML checkbox <code>input</code> element as a boolean value.
        </p>

        <CodeBlock
          language="javascript"
          code={`let checkboxElement = document.getElementById(checkboxId);\ncheckboxElement.checked = true;`}
        />
      </section>

      {/* 4. DOM Manipulations */}
      <section>
        <h2>4. DOM Manipulations</h2>

        <h3>4.1 The removeChild() Method</h3>
        <p>
          The <code>removeChild()</code> method removes an HTML child element of
          the specified HTML parent element from the DOM and returns the removed
          HTML child element.
        </p>

        <CodeBlock
          language="javascript"
          code={`function onDeleteTodo(todoId) {\n  let todoElement = document.getElementById(todoId);\n  todoItemsContainer.removeChild(todoElement);\n}`}
        />

        <h3>4.2 The classList.toggle() Method</h3>
        <p>
          The <code>classList.toggle()</code> method is used to toggle between
          adding and removing a class name from an HTML element.
        </p>

        <CodeBlock
          language="javascript"
          code={`function onTodoStatusChange(checkboxId, labelId) {\n  let checkboxElement = document.getElementById(checkboxId);\n  let labelElement = document.getElementById(labelId);\n  labelElement.classList.toggle('checked');\n}`}
        />

        <p>
          We can replace <code>classList.add()</code> and{" "}
          <code>classList.remove()</code> methods with{" "}
          <code>classList.toggle()</code> method.
        </p>
      </section>

      {/* Practice Note */}
      <section>
        <p>
          Try out adding the placeholder to the HTML input elements, deleting
          the HTML child elements, adding alerts and toggling the class names in
          the below Code Playground.
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

export default Todos_Applications_CS_2;
