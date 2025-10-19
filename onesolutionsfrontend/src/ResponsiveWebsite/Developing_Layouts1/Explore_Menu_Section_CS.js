import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Explore_Menu_Section_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>CSS Units, Bootstrap Sizing & Icons</h1>

      {/* 1. CSS Units */}
      <section>
        <h2>1. CSS Units</h2>
        <h3>1.1 Percentage</h3>
        <p>
          To define the size of a child element relative to its parent, we can use
          percentages.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="parent" style="width: 400px; background-color: #f0f0f0;">
  <div class="child" style="width: 50%; background-color: #007bff; color: white;">
    50% Width
  </div>
</div>`}
        />

        <CodeBlock
          language="css"
          code={`.parent {
  height: 100px;
}

.child {
  height: 100%;
}`}
        />
      </section>

      {/* 2. Bootstrap Sizing Utilities */}
      <section>
        <h2>2. Bootstrap Sizing Utilities</h2>
        <h3>2.1 Percentage Width</h3>
        <p>Bootstrap class names to set width in percentages:</p>
        <table>
          <thead>
            <tr>
              <th>CSS Property & Value</th>
              <th>Bootstrap Class Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>width: 25%</td>
              <td>w-25</td>
            </tr>
            <tr>
              <td>width: 50%</td>
              <td>w-50</td>
            </tr>
            <tr>
              <td>width: 75%</td>
              <td>w-75</td>
            </tr>
            <tr>
              <td>width: 100%</td>
              <td>w-100</td>
            </tr>
          </tbody>
        </table>
        <p>Note: Height adjusts automatically when width changes.</p>
      </section>

      {/* 3. Bootstrap Icons */}
      <section>
        <h2>3. Bootstrap Icons</h2>
        <p>
          Go to <a href="https://icons.getbootstrap.com" target="_blank" rel="noopener noreferrer">Bootstrap Icons</a> to pick any icon.  
          Example below uses the <code>arrow-right-short</code> icon.
        </p>

        <CodeBlock
          language="html"
          code={`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8.146 12.354a.5.5 0 0 1 0-.708L10.793 9H1.5a.5.5 0 0 1 0-1h9.293L8.146 4.354a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708 0z"/>
</svg>`}
        />
        <p className="note">The <code>svg</code> element is an inline HTML element that can be used for icons.</p>
      </section>

      {/* 4. Bootstrap Utilities */}
      <section>
        <h2>4. Bootstrap Utilities</h2>
        <h3>4.1 Shadow</h3>
        <p>Bootstrap class names to apply shadow to elements:</p>
        <ul>
          <li>shadow-none</li>
          <li>shadow-sm</li>
          <li>shadow</li>
          <li>shadow-lg</li>
        </ul>

        <CodeBlock
          language="html"
          code={`<div class="shadow p-3 mb-3 bg-light rounded">Default Shadow</div>
<div class="shadow-lg p-3 mb-3 bg-light rounded">Large Shadow</div>`}
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

export default Explore_Menu_Section_CS;
