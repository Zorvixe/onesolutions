import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Box_Sizing_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Box Sizing | Cheat Sheet</h1>

      {/* 1. Introduction */}
      <section>
        <h2>1. Box Sizing</h2>
        <p>
          Every HTML element on a web page is represented as a rectangular box.
        </p>
        <p>
          By default, in the CSS box model, the <code>width</code> and{" "}
          <code>height</code> you set to an element are applied only to the
          element's <b>content</b>.
        </p>
      </section>

      {/* 2. Box-sizing Property */}
      <section>
        <h2>2. The box-sizing Property</h2>
        <p>
          The <b>box-sizing</b> CSS property defines how the total width and
          height of an element are calculated.
        </p>

        <p>Box-sizing property can take the following values:</p>
        <ul>
          <li>
            <b>content-box</b> (default)
          </li>
          <li>
            <b>border-box</b>
          </li>
        </ul>
      </section>

      {/* 2.1 Content Box */}
      <section>
        <h3>2.1 Content Box</h3>
        <p>
          In this model, the <b>width</b> and <b>height</b> properties include
          only the <b>content</b> — not the padding, border, or margin.
        </p>
      </section>

      {/* 2.2 Border Box */}
      <section>
        <h3>2.2 Border Box</h3>
        <p>
          In this model, the <b>width</b> and <b>height</b> include{" "}
          <b>content</b>, <b>padding</b>, and <b>border</b>, but do not include{" "}
          <b>margin</b>.
        </p>

        <p>
          <b>Note:</b> Bootstrap uses <b>box-sizing: border-box;</b> for all
          elements. It is considered best practice to use this setting when
          developing layouts.
        </p>
      </section>

      {/* 3. Universal Selector */}
      <section>
        <h2>3. Universal Selector (*)</h2>
        <p>
          The <b>Universal Selector (*)</b> selects all the HTML elements within
          the document.
        </p>

        <h3>Syntax:</h3>
        <CodeBlock
          language="css"
          code={`* {
  property1: value1;
  property2: value2;
}`}
        />

        <p>
          <b>Note:</b> Styles applied using a universal selector will have the{" "}
          <b>lowest specificity</b>.
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

export default Box_Sizing_CS;
