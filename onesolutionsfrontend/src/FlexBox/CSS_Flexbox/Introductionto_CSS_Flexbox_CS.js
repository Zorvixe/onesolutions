import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Introductionto_CSS_Flexbox_CS = ({
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
      <h1>Introduction to CSS Flexbox | Cheat Sheet</h1>

      {/* 1. Layout */}
      <section>
        <h2>1. Layout</h2>
        <p>
          A <b>Layout</b> defines how elements are arranged and structured on a
          webpage. It helps organize content for better readability and design.
        </p>
      </section>

      {/* 1.1 Methods to Design a Layout */}
      <section>
        <h3>1.1 Methods to Design a Layout</h3>
        <p>There are two major methods to design a webpage layout:</p>
        <ul>
          <li>
            <b>Flexbox</b> (stable)
          </li>
          <li>
            <b>CSS Grid</b> (advanced & fast-growing but not yet fully stable)
          </li>
        </ul>
      </section>

      {/* 1.1.1 Flexbox */}
      <section>
        <h3>1.1.1 Flexbox</h3>
        <p>
          <b>Flexbox</b> is a CSS layout method used to arrange elements in rows
          or columns. It makes alignment, spacing, and distribution of elements
          much easier and more flexible.
        </p>
      </section>

      {/* 2. Flexbox Layout with CSS Properties */}
      <section>
        <h2>2. Flexbox Layout with CSS Properties</h2>
        <p>
          CSS provides several properties to achieve a Flexbox layout. Some of
          the most important ones are:
        </p>
        <ul>
          <li>display</li>
          <li>flex-direction</li>
          <li>justify-content</li>
          <li>align-items</li>
          <li>flex-wrap</li>
          <li>flex-flow</li>
          <li>align-content</li>
          <li>align-self</li>
          <li>flex-grow</li>
          <li>flex-basis</li>
          <li>flex-shrink</li>
          <li>order</li>
        </ul>
      </section>

      {/* 2.1 Display */}
      <section>
        <h3>2.1 Display</h3>
        <p>
          The <b>display</b> property defines how an element should be displayed
          on the webpage.
        </p>
        <p>It can take the following values:</p>
        <ul>
          <li>flex</li>
          <li>inline-flex</li>
          <li>grid</li>
          <li>none</li>
        </ul>
        <p>
          When <code>display: flex;</code> is applied to an element, it becomes
          a <b>Flex Container</b>. All its direct children become{" "}
          <b>Flex Items</b>.
        </p>
      </section>

      {/* 2.2 Flex Direction */}
      <section>
        <h3>2.2 Flex Direction</h3>
        <p>
          The <b>flex-direction</b> property defines the direction in which the
          flex items are placed inside a flex container.
        </p>
        <p>
          When using Flexbox, think in terms of two axes:
          <ul>
            <li>
              <b>Main Axis</b> – defined by <code>flex-direction</code>.
            </li>
            <li>
              <b>Cross Axis</b> – perpendicular to the main axis.
            </li>
          </ul>
        </p>
        <p>The possible values are:</p>
        <ul>
          <li>
            <b>row</b> – items are placed horizontally.
          </li>
          <li>
            <b>column</b> – items are placed vertically.
          </li>
        </ul>
      </section>

      {/* 2.3 Justify Content */}
      <section>
        <h3>2.3 Justify Content</h3>
        <p>
          The <b>justify-content</b> property aligns flex items along the{" "}
          <code>main axis</code> of the container.
        </p>
        <p>It can take the following values:</p>
        <ul>
          <li>
            <b>flex-start</b> (default) – items align at the start.
          </li>
          <li>
            <b>center</b> – items align at the center.
          </li>
          <li>
            <b>flex-end</b> – items align at the end.
          </li>
          <li>
            <b>space-between</b> – equal space between items.
          </li>
          <li>
            <b>space-around</b> – equal space around each item.
          </li>
        </ul>
      </section>

      {/* 2.4 Align Items */}
      <section>
        <h3>2.4 Align Items</h3>
        <p>
          The <b>align-items</b> property aligns flex items along the{" "}
          <code>cross axis</code> (perpendicular to the main axis).
        </p>
        <p>It can take the following values:</p>
        <ul>
          <li>
            <b>stretch</b> (default) – items stretch to fill available height.
          </li>
          <li>
            <b>flex-start</b> – items align to the start.
          </li>
          <li>
            <b>center</b> – items align to the center.
          </li>
          <li>
            <b>flex-end</b> – items align to the end.
          </li>
        </ul>
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

export default Introductionto_CSS_Flexbox_CS;
