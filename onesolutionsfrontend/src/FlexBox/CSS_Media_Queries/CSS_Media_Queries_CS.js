import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const CSS_Media_Queries_CS = ({
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
  <h1>CSS Media Queries | Cheat Sheet</h1>

  {/* MEDIA QUERY */}

  <section>
    <h2>1. Media Query</h2>

    <p>
      Media queries are used to create <b>responsive layouts</b> by applying
      CSS based on device type and screen size.
    </p>

    <CodeBlock
      language="css"
      code={`@media media-type and (media-feature) {
  /* CSS rules */
}`}
    />
  </section>

  {/* MEDIA TYPES */}

  <section>
    <h2>1.1 Media Types</h2>

    <p>Media types define the category of device:</p>

    <ul>
      <li><b>screen</b> → Mobiles, laptops, tablets</li>
      <li><b>print</b> → Printers</li>
      <li><b>tv</b> → Televisions</li>
      <li><b>all</b> → All devices (default)</li>
    </ul>

    <div className="Quick-Tip-container">
      <div className="icon-note">
        <h6>
          <i className="bi bi-lightbulb"></i>Pro Tip:
        </h6>
      </div>
      <p>If media type is not specified, it defaults to <b>all</b>.</p>
    </div>
  </section>

  {/* MEDIA FEATURES */}

  <section>
    <h2>1.2 Media Features</h2>

    <p>
      Media features allow applying styles based on specific conditions.
    </p>

    <ul>
      <li>width, min-width, max-width</li>
      <li>height, min-height, max-height</li>
      <li>orientation</li>
    </ul>

    <h3>1.2.1 Width</h3>

    <CodeBlock
      language="css"
      code={`@media (max-width: 768px) {
  body {
    background-color: lightblue;
  }
}`}
    />

    <h3>1.2.2 Orientation</h3>

    <ul>
      <li><b>landscape</b> → width &gt; height</li>
      <li><b>portrait</b> → height &gt; width</li>
    </ul>

    <CodeBlock
      language="css"
      code={`@media (orientation: landscape) {
  body {
    background-color: yellow;
  }
}`}
    />
  </section>

  {/* MULTIPLE MEDIA FEATURES */}

  <section>
    <h2>2. Combining Media Features</h2>

    <h3>2.1 Logical Operators</h3>

    <h4>AND Operator</h4>

    <p>Used to combine multiple conditions.</p>

    <CodeBlock
      language="css"
      code={`@media screen and (min-width: 600px) and (max-width: 900px) {
  body {
    background-color: lightgreen;
  }
}`}
    />

    <h4>NOT Operator</h4>

    <p>Negates the media query.</p>

    <CodeBlock
      language="css"
      code={`@media not screen and (min-width: 600px) {
  body {
    background-color: red;
  }
}`}
    />

    <div className="Quick-Tip-container">
      <div className="icon-note">
        <h6>
          <i className="bi bi-lightbulb"></i>Pro Tip:
        </h6>
      </div>
      <p>
        When using <b>not</b>, you must specify a media type.
      </p>
    </div>

    <h4>Comma ( , ) Operator</h4>

    <p>Used to combine multiple media queries.</p>

    <CodeBlock
      language="css"
      code={`@media (max-width: 600px), (orientation: portrait) {
  body {
    background-color: pink;
  }
}`}
    />
  </section>

  {/* INTERVIEW QUESTIONS */}

  <section>
    <h2>3. Interview Points</h2>

    <ul>
      <li>Media queries make websites responsive</li>
      <li>Used to adapt UI for mobile, tablet, desktop</li>
      <li>Based on width, height, orientation, etc.</li>
      <li>Written using <b>@media</b> rule</li>
    </ul>
  </section>


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

export default CSS_Media_Queries_CS;
