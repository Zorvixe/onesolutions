import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const LoopControlStmts_CS_2 = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
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
      <h1>Loop Control Statements | Cheat Sheet</h1>

      {/* Introduction */}
      <section>
        <h2>Loop Control Statements</h2>
        <p>Control statements alter the sequential execution of a program.</p>
      </section>

      {/* Examples */}
      <section>
        <h2>Examples</h2>
        <ul>
          <li>
            <b>if-elif-else</b>
          </li>
          <li>
            <b>while, for</b>
          </li>
          <li>
            <b>break, continue</b>
          </li>
        </ul>
      </section>

      {/* Break */}
      <section>
        <h2>Break</h2>
        <p>Break statement makes the program exit a loop early.</p>
        <img
          src="/assets/img/Break.png"
          alt="Error Diagram"
          style={{ width: "50%", height: "350px" }}
        />
      </section>

      {/* Using Break */}
      <section>
        <h2>Using Break</h2>
        <p>
          Generally, break is used to exit a loop when a condition is satisfied.
        </p>
        <img
          src="/assets/img/Using_Break.png"
          alt="Error Diagram"
          style={{ width: "50%", height: "350px" }}
        />
        <p>
          In the below example, when the variable <code>i</code> value equals to
          3 the break statement gets executed and stops the execution of the
          loop further.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`for i in range(5):\n    if i == 3:\n        break\n    print(i)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[0, 1, 2]} />
      </section>

      {/* Break in Nested Loop */}
      <section>
        <h2>Break in Nested Loop</h2>
        <p>Break in inner loop stops the execution of the inner loop.</p>
        <img
          src="/assets/img/Break_Nested_Loop.png"
          alt="Error Diagram"
          style={{ width: "50%", height: "350px" }}
        />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`for i in range(3):\n    for j in range(3):\n        if j == 2:\n            break\n        print(f"i={i}, j={j}")`}
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
      </section>

      {/* Continue */}
      <section>
        <h2>Continue</h2>
        <p>
          Continue makes the program skip the remaining statements in the
          current iteration and begin the next iteration.
        </p>
        <img
          src="/assets/img/Continue.png"
          alt="Error Diagram"
          style={{ width: "50%", height: "350px" }}
        />
      </section>

      {/* Using Continue */}
      <section>
        <h2>Using Continue</h2>
        <p>
          Generally, continue is used to skip the remaining statements in the
          current iteration when a condition is satisfied.
        </p>
        <img
          src="/assets/img/Using_Continue.png"
          alt="Error Diagram"
          style={{ width: "50%", height: "350px" }}
        />
        <p>
          In the below example, when the variable <code>i</code> value equals to
          3 the next statements in the loop body are skipped.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`for i in range(5):\n    if i == 3:\n        continue\n    print(i)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[0, 1, 2, 4]} />
      </section>

      {/* Pass */}
      <section>
        <h2>Pass</h2>
        <p>
          Pass statement is used as a syntactic placeholder. When it is
          executed, nothing happens.
        </p>

        <p>
          Generally used when we have to test the code before writing the
          complete code.
        </p>
        <img
          src="/assets/img/Pass.png"
          alt="Error Diagram"
          style={{ width: "50%", height: "350px" }}
        />
      </section>

      {/* Empty Loops */}
      <section>
        <h2>Empty Loops</h2>
        <p>
          We can use pass statements to test code written so far, before writing
          loop logic.
        </p>

        <h3>Code</h3>
        <CodeBlock language="python" code={`for i in range(3):\n    pass`} />
        <h3>Output</h3>
        <OutputBlock output={[]} />
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

export default LoopControlStmts_CS_2;
