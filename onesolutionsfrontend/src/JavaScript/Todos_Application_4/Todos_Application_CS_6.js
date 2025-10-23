import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust import path as needed

const Todos_Application_CS_6 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Todos Application | Part 6 | Cheat Sheet</h1>

      {/* 1. Local Storage */}
      <section>
        <h2>1. Local Storage</h2>

        <h3>1.1 The removeItem() Method</h3>
        <p>
          The <code>removeItem()</code> method removes the specified storage
          object item based on the key.
        </p>

        <p>
          <b>Syntax:</b> <code>localStorage.removeItem(key)</code>
        </p>

        <p>
          <b>Key</b> - Name of the key to be removed
        </p>

        <CodeBlock language="javascript" code={`localStorage.removeItem("todoList");`} />
      </section>

      {/* Practice Note */}
      <section>
        <p>
          Try out persisting the todo checked status and removing a todo from
          local storage in the below Code Playground.
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

export default Todos_Application_CS_6;
