import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Why_Chooseus_Section_CS = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary } = useAuth();
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

 

  const handleContinue = async () => {
    try {
      await markSubtopicComplete(subtopicId, goalName, courseName);
      await loadProgressSummary();
      setIsSubtopicCompleted(true);
    } catch (error) {
      console.error("Failed to mark subtopic complete:", error);
    }
  };

  return (
    <div className="intro-container">
      <h1>Why Choose us Sectio | Cheat Sheet</h1>

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
        <p>
          The asterisk <code>*</code> symbol can be any number in the range of 0
          to 5. For example, <b>p-3, pr-1, pb-5,</b> etc.
        </p>

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
          Spacer = 16px by default. Examples: <code>p-1 = 4px</code>,{" "}
          <code>pt-4 = 24px</code>.
        </p>
      </section>

      {/* 2. HTML Elements */}
      <section>
        <h2>2. HTML Elements</h2>

        <h3>2.1 HTML Span Element</h3>
        <p>
          The <code>span</code> element is a generic inline container element
          which is mainly used for styling text in HTML Elements.
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
