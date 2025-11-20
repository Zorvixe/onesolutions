import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const NestedListStringFormatting_CS_1 = ({
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
      <h1>Nested Lists & String Formatting | Cheat Sheet</h1>

      {/* Nested Lists */}
      <section>
        <h2>Nested Lists</h2>
        <p>A list as an item of another list.</p>
      </section>

      {/* Accessing Nested List */}
      <section>
        <h2>Accessing Nested List</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`nested_list = [1, [2, 3], 4]\nprint(nested_list)`}
        />
        <h3>Output</h3>
        <OutputBlock output={JSON.stringify([1, [2, 3], 4])} />
      </section>

      {/* Accessing Items of Nested List */}
      <section>
        <h2>Accessing Items of Nested List</h2>
        <h3>Example - 1</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`nested_list = [1, [2, 3], 4]\nprint(nested_list[1])`}
        />
        <h3>Output</h3>
        <OutputBlock output={JSON.stringify([2, 3])} />
        <h3>Example - 2</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`nested_list = [1, [2, 3], 4]\nprint(nested_list[1][0])`}
        />
        <h3>Output</h3>
        <OutputBlock output={JSON.stringify(2)} />
      </section>

      {/* String Formatting */}
      <section>
        <h2>String Formatting</h2>
        <p>Code</p>
        <p>String formatting simplifies this concatenation.</p>
        <p>
          It increases the readability of code and type conversion is not
          required.
        </p>
      </section>

      {/* Add Placeholders */}
      <section>
        <h2>Add Placeholders</h2>
        <p>Add placeholders {} where the string needs to be formatted.</p>
        <p>Inserts values inside the string’s placeholder {}</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`name = "Alice"\nage = 25\nprint(f"My name is {name} and I am {age}.")`}
        />
        <h3>Output</h3>
        <OutputBlock output={"My name is Alice and I am 25."} />
      </section>

      {/* Number of Placeholders */}
      <section>
        <h2>Number of Placeholders</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`a = 10\nb = 20\nprint(f"{a} + {b} = {a + b}")`}
        />
        <h3>Output</h3>
        <OutputBlock output={"10 + 20 = 30"} />
      </section>

      {/* Numbering Placeholders */}
      <section>
        <h2>Numbering Placeholders</h2>
        <p>
          Numbering placeholders, will fill values according to the position of
          arguments.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`print(f"{0} {1}".format("Hello", "World"))`}
        />
        <h3>Input</h3>
        <OutputBlock output={JSON.stringify([])} />{" "}
        {/* Clarified as empty array */}
        <h3>Output</h3>
        <OutputBlock output={"Hello World"} />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`print(f"{1} {0}".format("World", "Hello"))`}
        />
        <h3>Input</h3>
        <OutputBlock output={JSON.stringify([])} />{" "}
        {/* Clarified as empty array */}
        <h3>Output</h3>
        <OutputBlock output={"Hello World"} />
      </section>

      {/* Naming Placeholder */}
      <section>
        <h2>Naming Placeholder</h2>
        <p>
          Naming placeholders will fill values according to the keyword
          arguments.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`print(f"{name} is {age}".format(name="Bob", age=30))`}
        />
        <h3>Input</h3>
        <OutputBlock output={JSON.stringify([])} />{" "}
        {/* Clarified as empty array */}
        <h3>Output</h3>
        <OutputBlock output={"Bob is 30"} />
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

export default NestedListStringFormatting_CS_1;
