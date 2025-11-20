import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
const Introductionto_CSS_Flexbox_CS_3 = ({
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
      <h1>Introduction to CSS Flexbox | Part 3 | Cheat Sheet</h1>

      {/* 1. Align Self */}
      <section>
        <h2>1. Align Self</h2>
        <p>
          The <code>align-self</code> property specifies the alignment of
          individual flex items along the cross axis.
        </p>

        <p>Align Self property can have the following values:</p>
        <ul>
          <li>
            <b>flex-start</b>
          </li>
          <li>
            <b>center</b>
          </li>
          <li>
            <b>flex-end</b>
          </li>
          <li>
            <b>stretch</b>
          </li>
          <li>
            <b>auto</b> (default)
          </li>
        </ul>

        <p>
          If the value of <b>align-self</b> is <b>auto</b>, then the{" "}
          <b>align-items</b> value of its flex container gets inherited.
        </p>
      </section>

      {/* 2. Order */}
      <section>
        <h2>2. Order</h2>
        <p>
          The <code>order</code> property specifies the order of flex items in
          the flex container.
        </p>

        <p>Order property has the following values:</p>
        <ul>
          <li>
            <b>0</b> (default)
          </li>
          <li>
            <b>+ve values</b>
          </li>
          <li>
            <b>-ve values</b>
          </li>
        </ul>

        <p>
          <b>Note:</b> If two or more HTML elements have the same order, they
          will be arranged based on their source code.
        </p>
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

export default Introductionto_CSS_Flexbox_CS_3;
