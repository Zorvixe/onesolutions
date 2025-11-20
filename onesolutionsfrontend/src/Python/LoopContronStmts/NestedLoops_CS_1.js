import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const NestedLoops_CS_1 = ({ subtopicId, goalName, courseName, subtopic }) => {
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
      <h1>Nested Loops | Cheat Sheet</h1>

      {/* Nested Loops */}
      <section>
        <h2>Nested Loops</h2>
        <p>
          An inner loop within the repeating block of an outer loop is called a
          Nested Loop.
        </p>
        <p>
          The <b>Inner Loop</b> will be executed one time for each iteration of
          the <b>Outer Loop</b>.
        </p>
        <img
          src="/assets/img/Nested_Loop.png"
          alt="Error Diagram"
          style={{ width: "90%", height: "350px" }}
        />
      </section>

      {/* Nested Repeating Block */}
      <section>
        <h2>Nested Repeating Block</h2>
        <p>
          The one highlighted in the blue dotted line is the repeating block of
          the inner loop.
        </p>
        <img
          src="/assets/img/Nested_Repeating.png"
          alt="Error Diagram"
          style={{ width: "90%", height: "350px" }}
        />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`for i in range(3):\n    for j in range(2):\n        print(f"i={i}, j={j}")`}
        />
        <h3>Output</h3>
        <OutputBlock
          output={[
            "i=0, j=0",
            "i=0, j=1",
            "i=1, j=0",
            "i=1, j=1",
            "i=2, j=0",
            "i=2, j=1",
          ]}
        />
        <p>
          In the above example, the below line is the repeating block of the
          nested loop:
        </p>
        <CodeBlock language="python" code={`        print(f"i={i}, j={j}")`} />
      </section>

      {/* Examples - Nested Loops */}
      <section>
        <h2>Examples - Nested Loops</h2>
        <h3>Example - 1: While loop inside a For loop</h3>
        <img
          src="/assets/img/Nested_Loop_Ex1.png"
          alt="Error Diagram"
          style={{ width: "50%", height: "350px" }}
        />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`for i in range(2):\n    count = 0\n    while count < 2:\n        print(f"i={i}, count={count}")\n        count += 1`}
        />
        <h3>Output</h3>
        <OutputBlock
          output={[
            "i=0, count=0",
            "i=0, count=1",
            "i=1, count=0",
            "i=1, count=1",
          ]}
        />

        <h3>Example - 2: While loop inside a while loop</h3>
        <img
          src="/assets/img/Nested_Loop_Ex2.png"
          alt="Error Diagram"
          style={{ width: "50%", height: "350px" }}
        />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`outer = 0\nwhile outer < 2:\n    inner = 0\n    while inner < 2:\n        print(f"outer={outer}, inner={inner}")\n        inner += 1\n    outer += 1`}
        />
        <h3>Output</h3>
        <OutputBlock
          output={[
            "outer=0, inner=0",
            "outer=0, inner=1",
            "outer=1, inner=0",
            "outer=1, inner=1",
          ]}
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

export default NestedLoops_CS_1;
