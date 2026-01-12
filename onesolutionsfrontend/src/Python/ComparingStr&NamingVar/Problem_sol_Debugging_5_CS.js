import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Problem_sol_Debugging_5_CS = ({
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
      <h1>Problem Solving & Debugging | Part 5 | Cheat Sheet</h1>

      {/* Floor Division Operator */}
      <section>
        <h2>Floor Division Operator</h2>
        <p>
          To find the <strong>integral part of a quotient</strong>, we use the
          Floor Division Operator <code>//</code>.
        </p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`print(3 // 2)`} />
        <h3>Output</h3>
        <OutputBlock output={[1]} />
      </section>

      {/* Compound Assignment Operators */}
      <section>
        <h2>Compound Assignment Operators</h2>
        <p>
          Different compound assignment operators include: <code>+=</code>,{" "}
          <code>-=</code>, <code>*=</code>, <code>/=</code>, <code>%=</code>.
        </p>
        <p>
          For example, <code>a += 1</code> is equivalent to{" "}
          <code>a = a + 1</code>.
        </p>

        <h3>Code</h3>
        <CodeBlock language="python" code={`a = 10\na -= 2\nprint(a)`} />
        <h3>Output</h3>
        <OutputBlock output={[8]} />

        <h3>Code</h3>
        <CodeBlock language="python" code={`a = 10\na /= 2\nprint(a)`} />
        <h3>Output</h3>
        <OutputBlock output={[5.0]} />

        <h3>Code</h3>
        <CodeBlock language="python" code={`a = 10\na %= 2\nprint(a)`} />
        <h3>Output</h3>
        <OutputBlock output={[0]} />
      </section>

      {/* Escape Characters */}
      <section>
        <h2>Escape Characters</h2>
        <p>
          Escape characters are a sequence of characters in a string that are
          interpreted differently by the computer.
        </p>
        <p>
          We use escape characters to insert characters that are{" "}
          <strong>illegal in a string</strong>.
        </p>

        <h3>Examples</h3>
        <ul>
          <li>
            <code>\n</code> → New Line
          </li>
          <li>
            <code>\t</code> → Tab Space
          </li>
          <li>
            <code>\\</code> → Backslash
          </li>
          <li>
            <code>\'</code> → Single Quote
          </li>
          <li>
            <code>\"</code> → Double Quote
          </li>
        </ul>

        <h3>Code</h3>
        <CodeBlock language="python" code={`print("Hello\\nWorld")`} />
        <h3>Output</h3>
        <OutputBlock output={["Hello", "World"]} />

        <h3>Code</h3>
        <CodeBlock language="python" code={`print('It\\'s Python')`} />
        <h3>Output</h3>
        <OutputBlock output={["It's Python"]} />

        <h3>Code</h3>
        <CodeBlock language="python" code={`print("It's Python")`} />
        <h3>Output</h3>
        <OutputBlock output={["It's Python"]} />
      </section>

      {/* Single & Double Quotes */}
      <section>
        <h2>Single and Double Quotes</h2>
        <p>
          A string is a sequence of characters enclosed within{" "}
          <strong>single</strong> or <strong>double</strong> quotes.
        </p>
        <p>Both are valid and produce the same string.</p>

        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`sport = 'Cricket'\nprint(type(sport))\nsport = "Cricket"\nprint(type(sport))`}
        />
        <h3>Output</h3>
        <OutputBlock output={["<class 'str'>", "<class 'str'>"]} />

        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`is_same = ('Cricket' == "Cricket")\nprint(is_same)`}
        />
        <h3>Output</h3>
        <OutputBlock output={["True"]} />
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

export default Problem_sol_Debugging_5_CS;
