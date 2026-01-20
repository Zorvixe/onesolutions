import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const React_Cpart4_CS = ({ subtopicId, goalName, courseName, subtopic }) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if subtopic is already completed
  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

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
      <h1>React Context | Part 4 | Cheat Sheet</h1>

      <section>
        <h2>1. Deploying the Ecommerce Application Code</h2>
        <p>
          Run the below command in your IDE to publish the Ecommerce Application
          Code.
        </p>

        <CodeBlock
          code={`oneSolution publish RJSIV4YSTX domain.oneSolution.tech`}
        />

        <p>
          Here the <b>domain</b> is the domain name to be published.
        </p>

        <div className="Quick-Tip-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-lightbulb"></i>Pro Tip:
            </h6>
          </div>
          <p>
            To look good in your resume, use your name and <b>nxttrendz</b> as
            the domain name in the domain URL.
            <br />
            Example: <code>rahulnxttrendz.oneSolution.tech</code>
          </p>
        </div>

        <div className="Warning-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-exclamation-triangle-fill"></i> Warning
            </h6>
          </div>
          <p>
            An error will be thrown if you try to publish with an already
            existing URL.
          </p>
        </div>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            A maximum of only <b>15 characters</b> is allowed in the domain
            name.
          </p>
        </div>
      </section>

      <section>
        <h2>2. Ecommerce Application - Final Code</h2>
        <p>
          Run the below command in your IDE to download the final code of the
          Ecommerce Application.
        </p>

        <CodeBlock code={`oneSolution start RJSIVPP7N7`} />
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

export default React_Cpart4_CS;
