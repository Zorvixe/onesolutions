import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Variables_DT_CS_2 = ({ subtopicId, goalName, courseName, subtopic }) => {
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
      <h1>Variables and Data Types | Cheat Sheet</h1>

      {/* Variables */}
      <section>
        <h2>Variables</h2>
        <p>
          Variables are like containers for storing values. Values in the
          variables can be changed.
        </p>
      </section>

      {/* Values */}
      <section>
        <h2>Values</h2>
        <p>
          Consider that variables are like containers for storing information.
          In the context of programming, this information is often referred to
          as a <b>value</b>.
        </p>
      </section>

      {/* Data Type */}
      <section>
        <h2>Data Type</h2>
        <p>
          In programming languages, every value or data has an associated type
          known as a <b>data type</b>. Some commonly used data types:
        </p>
        <ul>
          <li>String</li>
          <li>Integer</li>
          <li>Float</li>
          <li>Boolean</li>
        </ul>
        <p>
          This data type determines how the value or data can be used in the
          program. For example, mathematical operations can be done on Integer
          and Float types of data.
        </p>
      </section>

      {/* String */}
      <section>
        <h2>String</h2>
        <p>A String is a stream of characters enclosed within quotes.</p>
        <h3>Stream of Characters</h3>
        <ul>
          <li>Capital Letters (A – Z)</li>
          <li>Small Letters (a – z)</li>
          <li>Digits (0 – 9)</li>
          <li>Special Characters (~ ! @ # $ % ^ . ?,)</li>
          <li>Space</li>
        </ul>
        <h3>Some Examples</h3>
        <code>"Hello World!", "some@example.com", "1234"</code>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            The stream of characters enclosed within quotes (both single quotes
            and double quotes) are considered as strings.
          </p>
        </div>
        <code>"'hello'", '"hello"'</code>
      </section>

      {/* Integer */}
      <section>
        <h2>Integer</h2>
        <p>
          All whole numbers (positive, negative, and zero) without any
          fractional part come under Integers.
        </p>
        <h3>Examples</h3>
        <code>"-3", "-2", "-1", "0", "1", "2", "3"</code>
      </section>

      {/* Float */}
      <section>
        <h2>Float</h2>
        <p>Any number with a decimal point</p>
        <code>"24.3", "345.210", "-321.86"</code>
      </section>

      {/* Boolean */}
      <section>
        <h2>Boolean</h2>
        <p>
          In a general sense, anything that can take one of two possible values
          is considered a Boolean. Examples include data that can take values
          like:
        </p>
        <ul>
          <li>True or False</li>
          <li>Yes or No</li>
          <li>0 or 1</li>
          <li>On or Off, etc.</li>
        </ul>
        <p>
          As per the Python syntax, <b>True</b> and <b>False</b> are considered
          as Boolean values. Notice that both start with a capital letter.
        </p>
      </section>

      {/* Assigning Value to Variable */}
      <section>
        <h2>Assigning Value to Variable</h2>
        <p>
          The following is the syntax for assigning an integer value 10 to a
          variable <code>age</code>:
        </p>
        <CodeBlock language="python" code={`age = 10`} />
        <p>
          Here the equals to <code>=</code> sign is called the{" "}
          <b>Assignment Operator</b> as it is used to assign values to
          variables.
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

export default Variables_DT_CS_2;
