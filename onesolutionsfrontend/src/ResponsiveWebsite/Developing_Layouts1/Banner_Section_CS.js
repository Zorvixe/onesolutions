import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock } from "../../CodeOutputBlocks";

const Banner_Section_CS = ({ subtopicId, goalName, courseName, subtopic }) => {
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
      <h1>Banner Section | Cheat Sheet</h1>

      {/* 1. Bootstrap Navbar */}
      <section>
        <h2>1. Bootstrap Navbar</h2>
        <p>
          The Navbar is a navigation header at the top of the page. It can
          extend or collapse depending on device size.
        </p>
        <p>
          Below is a Bootstrap Navbar example without a list-based approach:
        </p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Brand</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <div class="navbar-nav">
      <a class="nav-link active" href="#">Home</a>
      <a class="nav-link" href="#">About</a>
      <a class="nav-link" href="#">Contact</a>
    </div>
  </div>
</nav>`}
        />
      </section>

      {/* 2. Bootstrap Containers */}
      <section>
        <h2>2. Bootstrap Containers</h2>

        <h3>2.1 Container</h3>
        <p>
          The Bootstrap class name <code>container</code> provides us default
          left and right spacings starting from smaller devices for a better
          user experience. It has one fixed width for each breakpoint in
          Bootstrap (extra small, small, medium, large, and extra large).
        </p>
        <table border="1" style={{ borderCollapse: "collapse", width: "70%" }}>
          <thead>
            <tr>
              <th>Device</th>
              <th>Width</th>
              <th>Container Max Width</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Extra small</td>
              <td>&lt; 576px</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>Small</td>
              <td>&gt;= 576px</td>
              <td>540px</td>
            </tr>
            <tr>
              <td>Medium</td>
              <td>&gt;= 768px</td>
              <td>720px</td>
            </tr>
            <tr>
              <td>Large</td>
              <td>&gt;= 992px</td>
              <td>960px</td>
            </tr>
            <tr>
              <td>Extra large</td>
              <td>&gt;= 1200px</td>
              <td>1140px</td>
            </tr>
          </tbody>
        </table>

        <CodeBlock
          language="html"
          code={`<div class="container">
  <p>Content inside a fixed-width container.</p>
</div>`}
        />

        <h3>2.2 Fluid Container</h3>
        <p>
          The Bootstrap class name <code>container-fluid</code> is a full width
          container, spanning the entire width of the viewport.
        </p>
        <p>
          If we don’t need left and right spacings, we can use the Bootstrap
          class name <b>container-fluid</b> instead of container.
        </p>
        <CodeBlock
          language="html"
          code={`<div class="container-fluid">
  <p>Content inside a full-width container.</p>
</div>`}
        />
      </section>

      {/* 3. CSS Colors */}
      <section>
        <h2>3. CSS Colors</h2>
        <h3>3.1 Transparent</h3>
        <p>
          The CSS <code>transparent</code> keyword represents a fully
          transparent color. This makes the background behind the colored HTML
          element completely visible.
        </p>
        <CodeBlock
          language="css"
          code={`div {
  background-color: transparent;
}`}
        />
        <p>
          Bootstrap provides <code>bg-transparent</code> class to make any
          element's background transparent.
        </p>
        <CodeBlock
          language="html"
          code={`<div class="bg-transparent p-2">
  Transparent Background
</div>`}
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

export default Banner_Section_CS;
