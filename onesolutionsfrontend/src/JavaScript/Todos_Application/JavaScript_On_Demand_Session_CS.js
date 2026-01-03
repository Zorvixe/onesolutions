import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const JavaScript_On_Demand_Session_CS = ({
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
      <h1>On-Demand Session | Cheat Sheet</h1>

      {/* 1. Most Commonly Made Mistakes */}
      <section>
        <h2>1. Most Commonly Made Mistakes</h2>

        {/* 1.1 Camel Case */}
        <h3>
          1.1 Most of the JS properties and methods should be in Camel Case
        </h3>
        <p>
          Most of the JavaScript properties and methods are written in{" "}
          <b>Camel Case</b> — the starting letter of each word should be in
          uppercase except for the first word.
        </p>

        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Mistake</th>
              <th>Correct Syntax</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>document.CreateElement()</td>
              <td>C in Uppercase</td>
              <td>document.createElement()</td>
            </tr>
            <tr>
              <td>document.getElementbyId()</td>
              <td>b in Lowercase</td>
              <td>document.getElementById()</td>
            </tr>
            <tr>
              <td>element.textcontent</td>
              <td>c in Lowercase</td>
              <td>element.textContent</td>
            </tr>
            <tr>
              <td>element.classlist.add()</td>
              <td>l in Lowercase</td>
              <td>element.classList.add()</td>
            </tr>
          </tbody>
        </table>

        {/* 1.2 ID Consistency */}
        <h3>1.2 The ID should be the same in both HTML and JS</h3>

        <h4>1.2.1 Mistake Example</h4>
        <p>
          In the following example, the HTML element's text content doesn't
          change because the ID used in HTML and JS are different.
        </p>

        <CodeBlock
          language="html"
          code={`<h1 id="heading">Shopping List</h1>`}
        />

        <CodeBlock
          language="javascript"
          code={`let headingEl = document.getElementById("listHeading");
headingEl.textContent = "Items Needed";`}
        />

        <p>To fix it, make sure the ID in HTML and JS are the same.</p>

        <h5>Correct Code:</h5>

        <CodeBlock
          language="html"
          code={`<h1 id="heading">Shopping List</h1>`}
        />

        <CodeBlock
          language="javascript"
          code={`let headingEl = document.getElementById("heading");
headingEl.textContent = "Items Needed";`}
        />

        <h4>1.2.2 Extra Space in ID</h4>
        <p>
          In this example, the HTML element's text content doesn't change
          because there is an extra space at the end of the ID in the HTML code.
        </p>

        <CodeBlock
          language="html"
          code={`<h1 id="listHeading ">Shopping List</h1>`}
        />

        <CodeBlock
          language="javascript"
          code={`let headingEl = document.getElementById("listHeading");
headingEl.textContent = "Items Needed";`}
        />

        <p>
          There shouldn't be any extra spaces in the IDs used in both HTML and
          JS.
        </p>

        <h5>Correct Code:</h5>

        <CodeBlock
          language="html"
          code={`<h1 id="listHeading">Shopping List</h1>`}
        />

        <CodeBlock
          language="javascript"
          code={`let headingEl = document.getElementById("listHeading");
headingEl.textContent = "Items Needed";`}
        />

        {/* 1.3 Function Name Consistency */}
        <h3>
          1.3 The Function name must be the same in both declaration and call
        </h3>

        <h4>1.3.1 Mistake Example</h4>
        <CodeBlock
          language="javascript"
          code={`function greeting() {
  let message = "Hello Rahul";
  console.log(message);
}
greet();`}
        />

        <p>
          As there is no function called <code>greet</code>, we will get an
          error in the above code snippet.
        </p>

        <p>To fix it, use the same function name as in the declaration.</p>

        <h5>Correct Code:</h5>
        <CodeBlock
          language="javascript"
          code={`function greeting() {
  let message = "Hello Rahul";
  console.log(message);
}
greeting();`}
        />

        <p>Try out the above code snippets in the Code Playground!</p>
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

export default JavaScript_On_Demand_Session_CS;
