import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Healthy_Delivary_Payments_CS = ({
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
      <h1>Healthy Delivery Payments | Cheat Sheet</h1>

      {/* 1. Bootstrap Flex Utilities */}
      <section>
        <h2>1. Bootstrap Flex Utilities</h2>
        <h3>1.1 Order</h3>
        <p>
          The <code>order</code> classes change the visual order of flex items
          inside a flex container. Numbers can be 0–12. They are responsive:
        </p>
        <ul>
          <li>order-1, order-2, order-3, …</li>
          <li>order-md-2, order-lg-3, etc.</li>
        </ul>

        <CodeBlock
          language="html"
          code={`<div class="d-flex">
  <div class="order-2">Second</div>
  <div class="order-1">First</div>
  <div class="order-3">Third</div>
</div>`}
        />
      </section>

      {/* 2. Bootstrap Display Utilities */}
      <section>
        <h2>2. Bootstrap Display Utilities</h2>
        <p>
          Show or hide HTML elements responsively using <code>d-*-none</code>,{" "}
          <code>d-*-block</code>, and <code>d-*-inline</code> classes.
        </p>
        <ul>
          <li>Hide: d-none, d-sm-none, d-md-none, …</li>
          <li>Show: d-block, d-md-inline, d-lg-block, …</li>
        </ul>

        <CodeBlock
          language="html"
          code={`<div class="d-none d-md-block">Visible on md and up</div>
<div class="d-block d-md-none">Visible on sm and below</div>`}
        />
      </section>

      {/* 3. Sections in Food Munch Website */}
      <section>
        <h2>3. Sections in Food Munch Website</h2>

        <h3>3.1 Healthy Food Section</h3>
        <CodeBlock
          language="html"
          code={`<section class="healthy-food p-3">
  <h2>Healthy Food Options</h2>
  <p>Fresh salads, juices, and organic meals.</p>
</section>`}
        />

        <h3>3.2 Delivery & Payment Section</h3>
        <CodeBlock
          language="html"
          code={`<section class="delivery-payment p-3">
  <h2>Delivery & Payment</h2>
  <p>Fast delivery and multiple payment options available.</p>
</section>`}
        />

        <h3>3.3 Thanking Customers Section</h3>
        <CodeBlock
          language="html"
          code={`<section class="thank-you p-3">
  <h2>Thank You!</h2>
  <p>We appreciate your order and hope you enjoy your meal.</p>
</section>`}
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

export default Healthy_Delivary_Payments_CS;
