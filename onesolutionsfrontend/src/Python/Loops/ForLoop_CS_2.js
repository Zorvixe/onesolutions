import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const ForLoop_CS_2 = ({ subtopicId, goalName, courseName, subtopic }) => {
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
      <h1>For Loop | Cheat Sheet</h1>

      {/* For Loop */}
      <section>
        <h2>For Loop</h2>
        <p>
          The <code>for</code> statement iterates over each item of a sequence.
        </p>
        <img
          src="/assets/img/For_Loop.png"
          alt="Error Diagram"
          style={{ width: "70%", height: "300px" }}
        />
      </section>

      {/* Examples of Sequences */}
      <section>
        <h2>Examples of Sequences</h2>
        <ul>
          <li>Sequence of Characters (string)</li>
          <li>Sequence of numbers, etc.</li>
        </ul>
      </section>

      {/* For Syntax */}
      <section>
        <h2>For Syntax</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`for item in "hello":\n    print(item)`}
        />
        <h3>Output</h3>
        <OutputBlock output={["h", "e", "l", "l", "o"]} />
      </section>

      {/* Range */}
      <section>
        <h2>Range</h2>
        <p>Generates a sequence of integers starting from 0.</p>
        <p>
          <b> Syntax: </b>
          <code>range(n)</code>.
        </p>
        <p>
          {" "}
          Stops before <code>n</code> (n is not included).
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`for i in range(4):\n    print(i)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[0, 1, 2, 3]} />
      </section>

      {/* Range with Start and End */}
      <section>
        <h2>Range with Start and End</h2>
        <p>
          Generates a sequence of numbers starting from <code>start</code>.
          Syntax: <code>range(start, end)</code>. Stops before <code>end</code>{" "}
          (end is not included).
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`for i in range(2, 5):\n    print(i)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[2, 3, 4]} />
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

export default ForLoop_CS_2;
