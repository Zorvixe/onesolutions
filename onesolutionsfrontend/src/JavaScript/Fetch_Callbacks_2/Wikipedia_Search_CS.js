import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Wikipedia_Search_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Wikipedia Search Application | Cheat Sheet</h1>

      {/* 1. HTML Input Element */}
      <section>
        <h2>1. HTML Input Element</h2>

        <h3>1.1 Search</h3>
        <p>
          The HTML <code>&lt;input&gt;</code> element with <code>type="search"</code> 
          is designed for the user to enter search queries.
        </p>
        <CodeBlock
          language="html"
          code={`<input type="search" />`}
        />
      </section>

      {/* 2. Bootstrap Components */}
      <section>
        <h2>2. Bootstrap Components</h2>

        <h3>2.1 Spinner</h3>
        <p>
          Spinners can be used to show the loading state of the page.
        </p>
        <CodeBlock
          language="html"
          code={`<div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>`}
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

export default Wikipedia_Search_CS;
