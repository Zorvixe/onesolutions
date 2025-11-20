import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Approachto_HollowPattern_CS = ({
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
      <h1>Approach to Hello Pattern | Cheat Sheet</h1>

      {/* Pattern Overview */}
      <section>
        <h2>Pattern Overview</h2>
        <p>
          We want to print a hollow right-angled triangle of size{" "}
          <strong>N = 7</strong>.
        </p>
        <ul>
          <li>
            Use <code>* </code> (star followed by space) for stars
          </li>
          <li>
            Use <code> </code> (double space) for empty spaces
          </li>
          <li>
            Pattern has 3 parts: First line, Middle lines (hollow), Last line
          </li>
        </ul>
      </section>

      {/* Part 1: First Line */}
      <section>
        <h2>Part 1: First Line</h2>
        <p>Row 1: 6 spaces + 1 star</p>
        <CodeBlock language="python" code={`i = 0\nprint('  '*(N-1) + '* ')`} />
        <OutputBlock output={["      * "]} />
      </section>

      {/* Part 2: Middle Lines */}
      <section>
        <h2>Part 2: Middle Lines (Row 2 to 6)</h2>
        <p>
          Each row has decreasing spaces, first star, hollow spaces, second
          star.
        </p>
        <CodeBlock
          language="python"
          code={`for i in range(1, N-1):
    print('  '*(N-i-1) + '* ' + '  '*(i-1) + '* ')`}
        />
        <OutputBlock
          output={[
            "     * *",
            "    *   *",
            "   *     *",
            "  *       *",
            " *         *",
          ]}
        />
      </section>

      {/* Part 3: Last Line */}
      <section>
        <h2>Part 3: Last Line</h2>
        <p>Row 7: full stars, no spaces</p>
        <CodeBlock language="python" code={`print('* ' * N)`} />
        <OutputBlock output={["* * * * * * *"]} />
      </section>

      {/* Full Python Code */}
      <section>
        <h2>Full Python Code</h2>
        <CodeBlock
          language="python"
          code={`N = 7
for i in range(N):
    if i == 0:
        print('  '*(N-1) + '* ')
    elif i == N-1:
        print('* ' * N)
    else:
        print('  '*(N-i-1) + '* ' + '  '*(i-1) + '* ')`}
        />
        <OutputBlock
          output={[
            "      * ",
            "     * *",
            "    *   *",
            "   *     *",
            "  *       *",
            " *         *",
            "* * * * * * *",
          ]}
        />
      </section>

      {/* Tips */}
      <section>
        <h2>Tips to Remember</h2>
        <ul>
          <li>
            Use <code>* </code> for stars and <code> </code> for spaces.
          </li>
          <li>First and last lines are special cases.</li>
          <li>Hollow spaces increase by 1 each row.</li>
          <li>
            Use <code>N-i-1</code> for leading spaces.
          </li>
          <li>Check indentation carefully.</li>
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

export default Approachto_HollowPattern_CS;
