import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Todos_Applications_3_CS = ({
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
      <h1>Todos Application | Part 3 | Cheat Sheet</h1>

      {/* 1. Execution Context */}
      <section>
        <h2>1. Execution Context</h2>
        <p>
          The environment in which JavaScript code runs is called{" "}
          <b>Execution Context</b>.
        </p>
        <p>
          It contains all the <b>variables</b>, <b>objects</b>, and{" "}
          <b>functions</b>.
        </p>
        <p>
          The Execution Context is destroyed and recreated whenever we reload an
          Application.
        </p>
      </section>

      {/* 2. Storage Mechanisms */}
      <section>
        <h2>2. Storage Mechanisms</h2>

        <h3>2.1 Client-Side Data Storage</h3>
        <p>
          Client-Side Data Storage refers to storing data on the{" "}
          <b>client's machine</b>.
        </p>
        <ul>
          <li>Local Storage</li>
          <li>Session Storage</li>
          <li>Cookies</li>
          <li>IndexedDB</li>
          <li>and many more.</li>
        </ul>

        <h3>2.2 Server-Side Data Storage</h3>
        <p>
          Server-Side Data Storage means storing data on the <b>server</b>.
        </p>
      </section>

      {/* 3. Local Storage */}
      <section>
        <h2>3. Local Storage</h2>
        <p>
          It allows web applications to store data locally within the user's
          browser.
        </p>
        <p>
          It is a <b>Storage Object</b> where data is stored as{" "}
          <b>key-value pairs</b>.
        </p>
        <p>
          Both <b>key</b> and <b>value</b> must be strings. If the type is
          different, they will automatically be converted to strings.
        </p>

        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>fullName</td>
              <td>Rahul Attuluri</td>
            </tr>
            <tr>
              <td>gender</td>
              <td>Male</td>
            </tr>
            <tr>
              <td>city</td>
              <td>Delhi</td>
            </tr>
          </tbody>
        </table>

        <p>
          To access and work with Local Storage, we can use the following
          methods:
        </p>
        <ul>
          <li>setItem()</li>
          <li>getItem()</li>
          <li>clear()</li>
          <li>removeItem()</li>
        </ul>

        <h3>3.1 The setItem() Method</h3>
        <p>
          The <b>setItem()</b> method is used to store data in Local Storage.
        </p>
        <p>
          <b>Syntax:</b> <code>localStorage.setItem("Key", "Value");</code>
        </p>

        <h3>3.2 The getItem() Method</h3>
        <p>
          The <b>getItem()</b> method is used to retrieve data from Local
          Storage.
        </p>
        <p>
          <b>Syntax:</b> <code>localStorage.getItem("Key");</code>
        </p>
      </section>

      {/* 4. Values */}
      <section>
        <h2>4. Values</h2>

        <h3>4.1 null</h3>
        <p>
          We use <b>null</b> when we intentionally want a variable but don’t
          need to assign it a value.
        </p>

        <CodeBlock
          language="javascript"
          code={`let selectedColor = null;
console.log(selectedColor);  // null
console.log(typeof(selectedColor));  // object`}
        />
      </section>

      {/* 5. HTML Elements */}
      <section>
        <h2>5. HTML Elements</h2>

        <h3>5.1 The textarea Element</h3>
        <p>
          The HTML <code>&lt;textarea&gt;</code> element is used for multiline
          text input.
        </p>

        <CodeBlock
          language="html"
          code={`<textarea rows="8" cols="55"></textarea>`}
        />
        <ul>
          <li>
            The HTML <b>rows</b> attribute specifies the number of lines.
          </li>
          <li>
            The HTML <b>cols</b> attribute specifies the number of characters
            per each line.
          </li>
        </ul>
        <p>
          Try out the HTML textarea element, setItem() and getItem() methods in
          the below Code Playground.
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

export default Todos_Applications_3_CS;
