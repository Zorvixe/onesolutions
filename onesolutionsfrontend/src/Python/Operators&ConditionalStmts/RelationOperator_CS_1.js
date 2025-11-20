import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const RelationOperator_CS_1 = ({
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
      <h1>Relational Operators | Cheat Sheet</h1>

      {/* Relational Operators */}
      <section>
        <h2>Relational Operators</h2>
        <p>
          Relational Operators are used to compare values. Gives{" "}
          <code>True</code> or <code>False</code> as the result of a comparison.
        </p>
        <table>
          <thead>
            <tr>
              <th>Operator</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>&gt;</code>
              </td>
              <td>Is greater than</td>
            </tr>
            <tr>
              <td>
                <code>&lt;</code>
              </td>
              <td>Is less than</td>
            </tr>
            <tr>
              <td>
                <code>==</code>
              </td>
              <td>Is equal to</td>
            </tr>
            <tr>
              <td>
                <code>&lt;=</code>
              </td>
              <td>Is less than or equal to</td>
            </tr>
            <tr>
              <td>
                <code>&gt;=</code>
              </td>
              <td>Is greater than or equal to</td>
            </tr>
            <tr>
              <td>
                <code>!=</code>
              </td>
              <td>Is not equal to</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Code Examples */}
      <section>
        <h2>Code</h2>
        <CodeBlock
          language="python"
          code={`a = 5\nb = 3\nprint(a > b)\nprint(a < b)\nprint(a == b)\nprint(a <= b)\nprint(a >= b)\nprint(a != b)`}
        />
        <h3>Output</h3>
        <OutputBlock
          output={["True", "False", "False", "False", "True", "True"]}
        />
      </section>

      {/* Possible Mistakes */}
      <section>
        <h2>Possible Mistakes</h2>
        <h3>Mistake - 1</h3>
        <CodeBlock language="python" code={`a = 5\nb = 3\nprint(a = b)`} />
        <h3>Output</h3>
        <OutputBlock output={"SyntaxError: invalid syntax"} />
        <h3>Mistake - 2</h3>
        <CodeBlock language="python" code={`a = 5\nb = 3\nprint(a ==b)`} />
        <h3>Output</h3>
        <OutputBlock output={"SyntaxError: invalid syntax"} />
        <p>
          Space between relational operators <code>==</code>, <code>&gt;=</code>
          , <code>&lt;=</code>, <code>!=</code> is not valid in Python.
        </p>
      </section>

      {/* Comparing Numbers */}
      <section>
        <h2>Comparing Numbers</h2>
        <CodeBlock
          language="python"
          code={`x = 10\ny = 7\nprint(x > y)\nprint(x < y)`}
        />
        <h3>Output</h3>
        <OutputBlock output={["True", "False"]} />
      </section>

      {/* Comparing Integers and Floats */}
      <section>
        <h2>Comparing Integers and Floats</h2>
        <CodeBlock
          language="python"
          code={`a = 5\nb = 5.0\nprint(a == b)\nprint(a != b)`}
        />
        <h3>Output</h3>
        <OutputBlock output={["True", "False"]} />
      </section>

      {/* Comparing Strings */}
      <section>
        <h2>Comparing Strings</h2>
        <CodeBlock
          language="python"
          code={`str1 = "apple"\nstr2 = "banana"\nprint(str1 < str2)\nprint(str1 > str2)`}
        />
        <h3>Output</h3>
        <OutputBlock output={["True", "False"]} />
      </section>

      {/* Case Sensitive */}
      <section>
        <h2>Case Sensitive</h2>
        <CodeBlock
          language="python"
          code={`X = "Apple"\nx = "apple"\nprint(X == x)`}
        />
        <h3>Output</h3>
        <OutputBlock output={"False"} />
        <p>
          Python is case sensitive. It means <code>X</code> (Capital letter) and{" "}
          <code>x</code> (small letter) are not the same in Python.
        </p>
      </section>

      {/* Strings and Equality Operator */}
      <section>
        <h2>Strings and Equality Operator</h2>
        <CodeBlock
          language="python"
          code={`str1 = "hello"\nstr2 = "hello"\nprint(str1 == str2)`}
        />
        <h3>Output</h3>
        <OutputBlock output={"True"} />
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

export default RelationOperator_CS_1;
