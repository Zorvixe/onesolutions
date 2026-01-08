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
          A <b>Layout</b> is a pattern to structure the information and arrange
          the elements on the website.
        </p>
      </section>

      {/* 1.1 Methods to Design a Layout */}
      <section>
        <h3>1.1 Methods to Design a Layout</h3>
        <p>
          Mainly, there are two methods that help design the webpage layout.
        </p>
        <ul>
          <li>
            <b>Flexbox</b> (stable)
          </li>
          <li>
            <b>CSS Grid</b> (Advanced & Fast growing but not stable)
          </li>
        </ul>
      </section>

      {/* 1.1.1 Flexbox */}
      <section>
        <h3>1.1.1 Flexbox</h3>
        <p>
          <b>Flexbox</b> is a layout method that helps to arrange the HTML
          elements in rows (horizontally) or columns (vertically).
        </p>
      </section>

      {/* 2. Flexbox Layout with CSS Properties */}
      <section>
        <h2>2. Flexbox Layout with CSS Properties</h2>
        <p>
          To achieve flexbox layout CSS provides many properties, these are a
          few among them.
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
          <li>order and many more...</li>
        </ul>
      </section>

      {/* 2.1 Display */}
      <section>
        <h3>2.1 Display</h3>
        <p>
          To achieve different Layouts, we can use CSS property{" "}
          <code>display</code>.
        </p>
        <p>Display property can have the following values:</p>
        <ul>
          <li>
            <code>flex</code>
          </li>
          <li>
            <code>inline-flex</code>
          </li>
          <li>
            <code>grid</code>
          </li>
          <li>
            <code>none</code> and many more...
          </li>
        </ul>
        <p>
          Providing display property with the value <code>flex</code> converts
          the element into a <b>Flex Container</b>. All HTML elements that are
          direct children of Flex Container are called <b>Flex Items</b>.
        </p>
      </section>

      {/* 2.2 Flex Direction */}
      <section>
        <h3>2.2 Flex Direction</h3>
        <p>
          The <code>flex-direction</code> specifies the direction of the flex
          items in the Flexbox Container.
        </p>

        <p>
          When working with Flexbox layout, we need to think in terms of two
          axes.
        </p>

        <ul>
          <li>
            <b>Main Axis</b> – It is specified by the{" "}
            <code>flex-direction</code> property.
          </li>
          <li>
            <b>Cross Axis</b> – It runs perpendicular to the main axis.
          </li>
        </ul>

        <p>Flex Direction property can have the following values:</p>

        <ul>
          <li>
            <code>row</code> – Direction of the flex items is horizontal.
          </li>
          <li>
            <code>column</code> – Direction of the flex items is vertical.
          </li>
        </ul>
      </section>

      {/* 2.3 Justify Content */}
      <section>
        <h3>2.3 Justify Content</h3>
        <p>
          The <code>justify-content</code> property specifies the alignment of
          flex items along the main axis.
        </p>

        <p>Justify Content property can have the following values:</p>

        <ul>
          <li>
            <code>flex-start</code> (default) – All the elements will arrange to
            the start of the container.
          </li>
          <li>
            <code>center</code> – All the elements will arrange to the center of
            the container.
          </li>
          <li>
            <code>flex-end</code> – All the elements will arrange to the end of
            the container.
          </li>
          <li>
            <code>space-between</code> – Left over space will be arranged in
            between the flex items.
          </li>
          <li>
            <code>space-around</code> – Every flex item will get space around
            them.
          </li>
        </ul>
      </section>

      {/* 2.4 Align Items */}
      <section>
  <h3>2.4 Align Items</h3>
  <p>
    The <code>align-items</code> property specifies the alignment of flex items
    along the cross axis.
  </p>

  <p>
    Align Items property can have the following values:
  </p>

  <ul>
    <li>
      <code>stretch</code> (default) – Will stretch its available height.
    </li>
    <li>
      <code>flex-start</code> – Will be at the starting of the flex container.
    </li>
    <li>
      <code>center</code> – Will be at the center of the available height.
    </li>
    <li>
      <code>flex-end</code> – Will be at the ending point of the available
      height.
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
