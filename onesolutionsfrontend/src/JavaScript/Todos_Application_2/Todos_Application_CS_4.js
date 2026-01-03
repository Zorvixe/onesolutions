import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust import path as needed

const Todos_Applications_CS_4 = ({
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
      <h1>Todos Application | Part 4 | Cheat Sheet</h1>

      {/* 1. JSON Introduction */}
      <section>
        <h2>1. JavaScript Object Notation (JSON)</h2>
        <p>JSON is a data representation format used for:</p>
        <ul>
          <li>Storing data (Client/Server)</li>
          <li>Exchanging data between Client and Server</li>
        </ul>
      </section>

      {/* 1.1 Supported Types */}
      <section>
        <h3>1.1 Supported Types</h3>
        <ul>
          <li>Number</li>
          <li>String</li>
          <li>Boolean</li>
          <li>Array</li>
          <li>Object</li>
          <li>Null</li>
        </ul>
      </section>

      {/* 1.2 JS Object vs JSON Object */}
      <section>
        <h3>1.2 JS Object vs JSON Object</h3>
        <p>
          In JSON, all keys in an object must be enclosed with double quotes,
          while in JS this is not necessary.
        </p>

        <h4>JS:</h4>
        <CodeBlock
          language="javascript"
          code={`let profile = {
  name: "Rahul",
  age: 29,
  designation: "Web Developer"
};`}
        />

        <h4>JSON:</h4>
        <CodeBlock
          language="javascript"
          code={`let profile = {
  "name": "Rahul",
  "age": 29,
  "designation": "Web Developer"
};`}
        />
      </section>

      {/* 1.3 JSON Methods */}
      <section>
        <h3>1.3 JSON Methods</h3>

        <h4>1.3.1 JSON.stringify()</h4>
        <p>It converts the given value into JSON string.</p>
        <p>
          <b>Syntax:</b>{" "}
          <code className="highlight-code">JSON.stringify(value)</code>
        </p>

        <h4>1.3.2 JSON.parse()</h4>
        <p>It parses a JSON string and returns a JS object.</p>
        <p>
          <b>Syntax:</b>{" "}
          <code className="highlight-code">JSON.parse(string)</code>
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

export default Todos_Applications_CS_4;
