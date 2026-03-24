import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Flexbox_On_Demand_Session_CS= ({
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
< div className="intro-container">
  <h1>On-Demand Session | Cheat Sheet</h1>

  {/* DISPLAY */}

  <section>
    <h2>1. Display Property</h2>

    <p>
      The <b>display</b> property is used to control the visibility and layout
      of elements.
    </p>

    <h3>display: none</h3>

    <p>
      The value <b>none</b> is used to completely <b>hide an element</b> from
      the page.
    </p>

    <ul>
      <li>The element is removed from the layout</li>
      <li>It does not occupy any space</li>
    </ul>

    <CodeBlock
      language="css"
      code={`.image2 {
  display: none;
}`}
    />

    <div className="Quick-Tip-container">
      <div className="icon-note">
        <h6>
          <i className="bi bi-lightbulb"></i>Pro Tip:
        </h6>
      </div>
      <p>
        <b>display: none</b> removes the element completely, whereas{" "}
        <b>visibility: hidden</b> hides it but still keeps its space.
      </p>
    </div>
  </section>

  {/* LAYOUT */}

  <section>
    <h2>2. Fixed Header, Footer & Sidebar Layout</h2>

    <p>
      A common layout structure includes:
    </p>

    <ul>
      <li><b>Navbar (Header)</b> → Fixed at top</li>
      <li><b>Sidebar</b> → Fixed on left/right</li>
      <li><b>Content Area</b> → Scrollable section</li>
      <li><b>Footer</b> → Fixed at bottom</li>
    </ul>

    <h3>Basic Structure</h3>

    <CodeBlock
      language="html"
      code={`<div class="page-container">
  <nav class="page-navbar">Navbar</nav>

  <div class="page-body">
    <div class="sidebar">Sidebar</div>

    <div class="content">
      Main Content
    </div>
  </div>
</div>`}
    />

    <h3>CSS Example</h3>

    <CodeBlock
      language="css"
      code={`.page-navbar {
  position: fixed;
  top: 0;
  width: 100%;
}

.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  width: 200px;
}

.content {
  margin-left: 200px;
  margin-top: 60px;
}`}
    />

    <div className="Quick-Tip-container">
      <div className="icon-note">
        <h6>
          <i className="bi bi-lightbulb"></i>Pro Tip:
        </h6>
      </div>
      <p>
        Always add <b>margin or padding</b> to content to avoid overlap with
        fixed navbar and sidebar.
      </p>
    </div>
  </section>

  {/* SUMMARY */}

  <section>
    <h2>3. Summary</h2>

    <table
      border="1"
      cellPadding="6"
      style={{ borderCollapse: "collapse", width: "100%" }}
    >
      <thead>
        <tr>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>
            Concept
          </th>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>
            Description
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td style={{ padding: "10px" }}>display: none</td>
          <td style={{ padding: "10px" }}>
            Hides element completely and removes it from layout
          </td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>Fixed Layout</td>
          <td style={{ padding: "10px" }}>
            Used for navbar, sidebar, footer positioning
          </td>
        </tr>
      </tbody>
    </table>
  </section>



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

export default Flexbox_On_Demand_Session_CS;
