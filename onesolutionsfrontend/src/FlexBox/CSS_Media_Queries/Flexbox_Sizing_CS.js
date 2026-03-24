import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Flexbox_Sizing_CS = ({
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
  <h1>Flexbox Sizing | Cheat Sheet</h1>

  {/* FLEXBOX SIZING */}

  <section>
    <h2>1. Flexbox Sizing Properties</h2>

    <p>
      Flex items can <b>grow</b> or <b>shrink</b> based on the available
      space inside a flex container.
    </p>

    <ul>
      <li>flex-grow</li>
      <li>flex-shrink</li>
    </ul>
  </section>

  {/* FLEX GROW */}

  <section>
    <h2>1.1 Flex Grow</h2>

    <p>
      The <b>flex-grow</b> property defines how much a flex item should
      <b> expand</b> relative to other items.
    </p>

    <h3>Values</h3>

    <ul>
      <li><b>0</b> → Default (no growth)</li>
      <li><b>Positive values</b> → Item grows based on ratio</li>
    </ul>

    <CodeBlock
      language="css"
      code={`.box1 {
  flex-grow: 1;
}

.box2 {
  flex-grow: 2;
}`}
    />

    <div className="Quick-Tip-container">
      <div className="icon-note">
        <h6>
          <i className="bi bi-lightbulb"></i>Pro Tip:
        </h6>
      </div>
      <p>
        Items grow proportionally. Example: flex-grow 2 takes double space
        compared to flex-grow 1.
      </p>
    </div>
  </section>

  {/* FLEX SHRINK */}

  <section>
    <h2>1.2 Flex Shrink</h2>

    <p>
      The <b>flex-shrink</b> property defines how much a flex item should
      <b> shrink</b> when there is not enough space.
    </p>

    <h3>Values</h3>

    <ul>
      <li><b>1</b> → Default (shrinks normally)</li>
      <li><b>0</b> → Prevents shrinking</li>
      <li><b>Positive values</b> → Shrinks based on ratio</li>
    </ul>

    <CodeBlock
      language="css"
      code={`.box1 {
  flex-shrink: 1;
}

.box2 {
  flex-shrink: 0;
}`}
    />

    <div className="Quick-Tip-container">
      <div className="icon-note">
        <h6>
          <i className="bi bi-lightbulb"></i>Pro Tip:
        </h6>
      </div>
      <p>
        Use <b>flex-shrink: 0</b> to prevent items from shrinking when space
        is limited.
      </p>
    </div>
  </section>

  {/* SUMMARY */}

  <section>
    <h2>2. Summary</h2>

    <table
      border="1"
      cellPadding="6"
      style={{ borderCollapse: "collapse", width: "100%" }}
    >
      <thead>
        <tr>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>
            Property
          </th>
          <th style={{ background: "#7fb3c8", padding: "10px" }}>
            Description
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td style={{ padding: "10px" }}>flex-grow</td>
          <td style={{ padding: "10px" }}>
            Controls how items expand when space is available
          </td>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>flex-shrink</td>
          <td style={{ padding: "10px" }}>
            Controls how items shrink when space is limited
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

export default Flexbox_Sizing_CS;
