import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Nested_con_CS_1 = ({ subtopicId, goalName, courseName, subtopic }) => {
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
      <h1>Nested Conditional Statements | Cheat Sheet</h1>

      {/* Nested Conditional Statements */}
      <section>
        <h2>Nested Conditional Statements</h2>
        <p>
          The conditional block inside another <code>if/else</code> conditional
          block is called a <b>nested conditional block</b>.
        </p>
        <p>
          In the below example, <b>Block 2</b> is a nested conditional block and{" "}
          <b>Condition B</b> is called a nested conditional statement.
        </p>
        <img
          src="/assets/img/Nested_Conditional_Block.png"
          alt="Nested Condition Diagram"
          style={{ width: "80%", height: "400px" }}
        />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`matches_won = int(input())\ngoals = int(input())\nif matches_won > 8:    # Block 1\n    if goals > 20:        # Block 2\n        print("Hurray")\n    print("Winner")`}
        />
        <h3>Input</h3>
        <OutputBlock output={"10\n22"} />
        <h3>Output</h3>
        <OutputBlock output={"Hurray\nWinner"} />
        <h3>Input</h3>
        <OutputBlock output={"10\n18"} />
        <h3>Output</h3>
        <OutputBlock output={"Winner"} />
      </section>

      {/* Nested Condition in Else Block */}
      <section>
        <h2>Nested Condition in Else Block</h2>
        <p>We can also write nested conditions in the Else statement.</p>
        <p>In the below example, Block 2 is a nested conditional block.</p>
        <img
          src="/assets/img/Nested_Condition_else_Block.png"
          alt="Nested Else Diagram"
          style={{ width: "50%", height: "400px" }}
        />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`a = 3\nb = 2\nc = 1\n\nis_a_greatest = (a > b) and (a > c)\nif is_a_greatest:\n    print(a)\nelse:\n    is_b_greatest = (b > c)\n    if is_b_greatest:\n        print(b)\n    else:\n        print(c)`}
        />
        <h3>Output</h3>
        <OutputBlock output={"3"} />
      </section>

      {/* Elif Statement */}
      <section>
        <h2>Elif Statement</h2>
        <p>
          Use the <code>elif</code> statement to have multiple conditional
          statements between <code>if</code> and <code>else</code>.
        </p>
        <p>
          The <code>elif</code> statement is optional.
        </p>

        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`x = 15\nif x < 10:\n    print("x is less than 10")\nelif x < 20:\n    print("x is between 10 and 20")\nelif x < 30:\n    print("x is between 20 and 30")\nelse:\n    print("x is greater than or equal to 30")`}
        />
        <h3>Output</h3>
        <OutputBlock output={"x is between 10 and 20"} />
      </section>

      {/* Multiple Elif Statements */}
      <section>
        <h2>Multiple Elif Statements</h2>
        <p>
          We can add any number of <code>elif</code> statements after the{" "}
          <code>if</code> conditional block.
        </p>
        <p>
          Python executes only the first <code>elif</code> condition that is{" "}
          <b>True</b>. If multiple conditions are true, only the first one runs.
        </p>

        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`score = 85\nif score >= 90:\n    print("Excellent")\nelif score >= 75:\n    print("Very Good")\nelif score >= 50:\n    print("Good")\nelse:\n    print("Needs Improvement")`}
        />
        <h3>Output</h3>
        <OutputBlock output={"Very Good"} />
      </section>

      {/* Execution of Elif Statement */}
      <section>
        <h2>Execution of Elif Statement</h2>
        <p>
          Python executes the <code>elif</code> block whose expression evaluates
          to True. If multiple <code>elif</code> conditions are True, then only
          the first one will be executed.
        </p>
      </section>

      {/* Optional Else Statement */}
      <section>
        <h2>Optional Else Statement</h2>
        <p>
          The <code>else</code> statement is not compulsory after{" "}
          <code>if</code> - <code>elif</code> statements.
        </p>

        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`number = 5\nis_divisible_by_10 = (number % 10 == 0)\nis_divisible_by_5 = (number % 5 == 0)\nif is_divisible_by_10:\n    print("Divisible by 10")\nelif is_divisible_by_5:\n    print("Divisible by 5")\nelse:\n    print("Not Divisible by 10 or 5")`}
        />
        <h3>Output</h3>
        <OutputBlock output={"Divisible by 5"} />
      </section>

      {/* Possible Mistake */}
      <section>
        <h2>Possible Mistake</h2>
        <p>
          You cannot write an <code>elif</code> statement after an{" "}
          <code>else</code> statement.
        </p>
        <img
          src="/assets/img/Possible_Elif_mistakes.png"
          alt="Error Diagram"
          style={{ width: "50%", height: "400px" }}
        />
        <h3>Wrong Code</h3>
        <CodeBlock
          language="python"
          code={`x = 5\nif x > 10:\n    print("Greater")\nelse:\n    print("Smaller")\nelif x == 5:\n    print("Equal")`}
        />
        <h3>Output</h3>
        <OutputBlock output={"SyntaxError: invalid syntax"} />
      </section>

      {/* Continue Button */}
      <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted}
        >
          {isSubtopicCompleted ? "Completed" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Nested_con_CS_1;
