import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Why_Chooseus_Section_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Bootstrap Spacing Utilities & HTML Elements</h1>

      {/* 1. Bootstrap Spacing Utilities */}
      <section>
        <h2>1. Bootstrap Spacing Utilities</h2>

        <h3>1.1 Padding</h3>
        <p>Bootstrap class names for padding:</p>
        <table>
          <thead>
            <tr>
              <th>CSS Padding Property</th>
              <th>Bootstrap Class Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>padding</td>
              <td>p-*</td>
            </tr>
            <tr>
              <td>padding-top</td>
              <td>pt-*</td>
            </tr>
            <tr>
              <td>padding-right</td>
              <td>pr-*</td>
            </tr>
            <tr>
              <td>padding-bottom</td>
              <td>pb-*</td>
            </tr>
            <tr>
              <td>padding-left</td>
              <td>pl-*</td>
            </tr>
          </tbody>
        </table>

        <h3>1.1.1 Padding Values</h3>
        <table>
          <thead>
            <tr>
              <th>Size</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>1</td>
              <td>0.25 * spacer</td>
            </tr>
            <tr>
              <td>2</td>
              <td>0.5 * spacer</td>
            </tr>
            <tr>
              <td>3</td>
              <td>1 * spacer</td>
            </tr>
            <tr>
              <td>4</td>
              <td>1.5 * spacer</td>
            </tr>
            <tr>
              <td>5</td>
              <td>3 * spacer</td>
            </tr>
          </tbody>
        </table>
        <p>
          Spacer = 16px by default. Examples: <code>p-1 = 4px</code>, <code>pt-4 = 24px</code>.
        </p>
      </section>

      {/* 2. HTML Elements */}
      <section>
        <h2>2. HTML Elements</h2>

        <h3>2.1 HTML Span Element</h3>
        <p>
          The <code>span</code> element is a generic inline container mainly used to style text.
        </p>

        <CodeBlock
          language="html"
          code={`<p>This is a <span class="text-primary">highlighted</span> word.</p>`}
        />

        <CodeBlock
          language="css"
          code={`.text-primary {
  color: blue;
  font-weight: bold;
}`}
        />
      </section>

      {/* Continue Button */}
      <div className="view-continue">
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

export default Why_Chooseus_Section_CS;
