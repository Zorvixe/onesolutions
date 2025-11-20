import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Sizing_Ele_Handling_Overflow_CS = ({
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
      <h1>Sizing Elements and Handling Overflow | Cheat Sheet</h1>

      {/* 1. Sizing Elements */}
      <section>
        <h2>1. Sizing Elements</h2>

        <h3>1.1 Intrinsic Size</h3>
        <p>
          Some elements have a natural size set by default. We call this{" "}
          <b>Intrinsic Size</b>.
        </p>

        <h3>1.2 Extrinsic Size</h3>
        <p>
          If we set a specific size to an element, we call it{" "}
          <b>Extrinsic Size</b>.
        </p>

        <p>
          In the example above, specific sizes were given to the image and
          paragraph elements.
        </p>
      </section>

      {/* 2. Handling Overflow */}
      <section>
        <h2>2. Handling Overflow</h2>

        <h3>2.1 CSS Overflow Property</h3>
        <p>
          Content overflow can be handled using the CSS <b>overflow</b>{" "}
          property.
        </p>

        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>visible (default)</td>
              <td>
                Content overflows outside the box. CSS tries to avoid data loss.
              </td>
            </tr>
            <tr>
              <td>hidden</td>
              <td>
                The overflow is clipped, and the rest of the content is
                invisible.
              </td>
            </tr>
            <tr>
              <td>scroll</td>
              <td>
                The overflow is clipped, and a scrollbar is added to see the
                rest of the content.
              </td>
            </tr>
            <tr>
              <td>auto</td>
              <td>
                Similar to scroll, but adds scrollbars only when necessary.
              </td>
            </tr>
          </tbody>
        </table>

        <h3>2.2 overflow-x & overflow-y</h3>
        <p>
          These are similar to the overflow property but handle one direction
          only:
        </p>
        <ul>
          <li>
            <b>overflow-x</b> – Handles overflow in the horizontal direction.
          </li>
          <li>
            <b>overflow-y</b> – Handles overflow in the vertical direction.
          </li>
        </ul>
      </section>

      {/* 3. Min & Max Sizes */}
      <section>
        <h2>3. Min & Max Sizes</h2>

        <h3>3.1 Min Size</h3>
        <p>
          The <code>min-height</code> and <code>min-width</code> CSS properties
          can be used to define the minimum sizes of an element.
        </p>

        <h3>3.2 Max Size</h3>
        <p>
          The <code>max-height</code> and <code>max-width</code> CSS properties
          can be used to restrict the sizes of an element.
        </p>

        <h3>3.3 Min & Max Sizes with Overflow</h3>
        <p>
          If content exceeds the maximum size, the overflow can be observed
          visually.
        </p>
      </section>

      {/* 4. A Note on Meta Element */}
      <section>
        <h2>4. A Note on Meta Element</h2>
        <p>
          The <code>meta</code> element is used to provide additional important
          information about HTML document.
        </p>

        <ul>
          <li>
            <b>Name</b> – Specifies the type of meta element. The value{" "}
            <b>viewport</b> tells the browser how to control the page’s
            dimensions and scaling.
          </li>
          <li>
            <b>Content</b> – Specifies the actual meta content.
          </li>
        </ul>
        <p>
          <b>Note:</b>{" "}
          <code>
            On mobile devices, including the viewport meta element is good
            practice to ensure proper scaling.
          </code>
        </p>
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

export default Sizing_Ele_Handling_Overflow_CS;
