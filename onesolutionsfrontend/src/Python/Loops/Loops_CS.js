import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Loops_CS = ({ subtopicId, goalName, courseName, subtopic }) => {
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
      <h1>Loops | Cheat Sheet</h1>

      {/* Intro */}
      <section>
        <h2>Loops</h2>
        <p>
          So far, Python executes code in sequence and each block runs once.
          Loops allow us to execute a block of code multiple times.
        </p>
      </section>

      {/* While Loop */}
      <section>
        <h2>While Loop</h2>
        <p>
          A <b>while loop</b> executes a block of code as long as the condition
          is <code>True</code>.
        </p>
        <img
          src="/assets/img/While_loop.png"
          alt="Error Diagram"
          style={{ width: "80%", height: "400px" }}
        />
      </section>

      {/* While Loop Example */}
      <section>
        <h2>While Loop Example</h2>
        <p>
          The following code snippet prints the next three consecutive numbers
          after a given number.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`num = int(input("Enter a number: "))\ncount = 0\nwhile count < 3:\n    num += 1\n    print(num)\n    count += 1`}
        />
        <h3>Input</h3>
        <OutputBlock output={["5"]} />
        <h3>Output</h3>
        <OutputBlock output={["6", "7", "8"]} />
      </section>

      {/* Possible Mistakes */}
      <section>
        <h2>Possible Mistakes</h2>

        <h3>1. Missing Initialization</h3>
        <CodeBlock
          language="python"
          code={`while count < 3:\n    print(count)\n    count += 1`}
        />
        <h3>Output</h3>
        <OutputBlock output={"NameError: name 'count' is not defined"} />

        <h3>2. Incorrect Termination Condition</h3>
        <CodeBlock
          language="python"
          code={`count = 0\nwhile count < 3:\n    print("Infinite loop")`}
        />
        <h3>Output</h3>
        <OutputBlock output={"Runs into an infinite loop"} />

        <h3>3. Not Updating Counter Variable</h3>
        <CodeBlock
          language="python"
          code={`count = 0\nwhile count < 3:\n    print(count)`}
        />
        <h3>Output</h3>
        <OutputBlock output={"Runs into an infinite loop"} />
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

export default Loops_CS;
