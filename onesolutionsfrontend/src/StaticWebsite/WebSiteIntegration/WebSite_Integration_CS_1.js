import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock } from "../../CodeOutputBlocks"; 

const WebSite_Integration_CS_1 = ({
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

  const renderMCQ = (q, idx, namePrefix) => (
    <div key={idx} style={{ marginBottom: "10px" }}>
      <p>{q.question}</p>
      {q.options.map((option) => (
        <div key={option}>
          <label>
            <input
              type="radio"
              name={`${namePrefix}_${idx}`}
              checked={mcqAnswers[q.question] === option}
              onChange={() => handleAnswer(q.question, option)}
            />{" "}
            {option}
          </label>
        </div>
      ))}
      {mcqAnswers[q.question] && (
        <p
          style={{
            fontWeight: "bold",
            color: mcqAnswers[q.question] === q.answer ? "green" : "red",
          }}
        >
          {mcqAnswers[q.question] === q.answer
            ? "✅ Correct"
            : `❌ Wrong. Correct answer: ${q.answer}`}
        </p>
      )}
    </div>
  );

  return (
    <div className="intro-container">
      <h1>WebSite Integration | Cheat Sheet</h1>

      {/* =========================== */}
      {/* 1. CCBP UI Kit */}
      {/* =========================== */}
      <section>
        <h2>1. UI Kit</h2>
        <p>
          UI Kit is a collection of reusable code snippets similar to Bootstrap,
          specially designed for CCBP training.
        </p>

        <h3>1.1 Adding UI Kit to the Web Page</h3>
        <p>
          The script code should be placed just before the closing{" "}
          <code>&lt;/body&gt;</code> tag.
        </p>

        <CodeBlock
          language="html"
          code={`<!-- CCBP UI Kit Script -->
<script src="path/to/ccbp-ui-kit.js"></script>`}
        />

        <h3>1.2 Display Utility</h3>
        <p>
          Display Utility is a reusable snippet to show or hide section
          containers based on user actions.
        </p>

        <h3>MCQ</h3>
        {[
          {
            question: "Where should the CCBP UI Kit Script Code be placed?",
            options: [
              "Inside the head tag",
              "Before the closing body tag",
              "At the top of HTML file",
              "Inside a div element",
            ],
            answer: "Before the closing body tag",
          },
        ].map((q, idx) => renderMCQ(q, idx, "ccbpui"))}
      </section>

      {/* =========================== */}
      {/* 2. Website Sections */}
      {/* =========================== */}
      <section>
        <h2>2. Sections in Tourism Website</h2>

        <h3>2.1 Home Section</h3>
        <CodeBlock language="html" code={`<!-- Home Section HTML -->`} />
        <CodeBlock language="css" code={`/* Home Section CSS */`} />
        <CodeBlock language="javascript" code={`// JS for Home Section`} />

        <h3>2.2 Favourite Places Section</h3>
        <CodeBlock
          language="html"
          code={`<!-- Favourite Places Section HTML -->`}
        />
        <CodeBlock language="css" code={`/* Favourite Places Section CSS */`} />
        <CodeBlock
          language="javascript"
          code={`// JS for Favourite Places Section`}
        />

        <p className="note">
          📝 To occupy the entire content height, remove the fixed height of
          <code>favourite-places-bg-container</code>. Background will take
          content height.
        </p>

        <h3>2.3 Detailed View Section</h3>
        <CodeBlock
          language="html"
          code={`<!-- Detailed View Section HTML -->`}
        />
        <CodeBlock language="css" code={`/* Detailed View Section CSS */`} />
        <CodeBlock
          language="javascript"
          code={`// JS for Detailed View Section`}
        />
      </section>

      {/* =========================== */}
      {/* 3. HTML Attributes */}
      {/* =========================== */}
      <section>
        <h2>3. HTML Attributes</h2>

        <h3>3.1 id Attribute</h3>
        <p>
          The <code>id</code> attribute specifies a unique id for an HTML
          element. Value must be unique within the HTML document.
        </p>
        <p className="note">
          📝 When using CCBP UI Kit, the id must start with prefix{" "}
          <code>section</code>.
        </p>

        <h3>3.2 onclick Attribute</h3>
        <p>
          The <code>onclick</code> event occurs when the user clicks an element.
          Value should be in double quotes, and the <code>display()</code>{" "}
          argument in single quotes.
        </p>

        <h3>MCQ</h3>
        {[
          {
            question:
              "Which HTML attribute is used to uniquely identify elements within an HTML document?",
            options: ["id", "src", "class", "all of the above"],
            answer: "id",
          },
        ].map((q, idx) => renderMCQ(q, idx, "htmlattr"))}
      </section>

      {/* =========================== */}
      {/* 4. Website Integration */}
      {/* =========================== */}
      <section>
        <h2>4. Website Integration</h2>

        <h3>4.1 Integration of Home & Favourite Places Sections</h3>
        <ul>
          <li>
            Step-1: Change section container ids (must start with{" "}
            <code>section</code>).
          </li>
          <li>Step-2: Add Home Section HTML & CSS to Display Utility.</li>
          <li>
            Step-3: Add Favourite Places Section HTML & CSS to Display Utility.
          </li>
          <li>
            Step-4: Add <code>onclick</code> to Home Section button.
          </li>
          <li>
            Step-5: Add button in Favourite Places Section to go back to Home
            Section.
          </li>
        </ul>

        <h3>4.2 Integration of Favourite Places & Detailed View Sections</h3>
        <ul>
          <li>Step-1: Add Detailed View Section HTML to Display Utility.</li>
          <li>Step-2: Add corresponding CSS styles.</li>
          <li>
            Step-3: Add <code>onclick</code> to Taj Mahal Card.
          </li>
          <li>
            Step-4: Add button in Detailed View Section to go back to Favourite
            Places Section.
          </li>
        </ul>
      </section>

      {/* =========================== */}
      {/* Continue Button */}
      {/* =========================== */}
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

export default WebSite_Integration_CS_1;
