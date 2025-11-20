import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Forms_CS_2 = ({
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
      <h1>Forms | Part-2 | Cheat Sheet</h1>

      {/* 1. HTML Select Element */}
      <section>
        <h2>1. HTML Select Element</h2>
        <p>The HTML <code>select</code> element is used to create a drop-down list.</p>
        <CodeBlock
          language="html"
          code={`<select></select>`}
        />

        <h3>1.1 HTML Option Element</h3>
        <p>The <code>option</code> element creates a menu option for the drop-down list. Its text content is used as a label.</p>
        <CodeBlock
          language="html"
          code={`<select>
  <option>Active</option>
</select>`}
        />

        <h4>1.1.1 The value Attribute</h4>
        <p>Every <code>option</code> element should contain the <code>value</code> attribute.</p>
        <CodeBlock
          language="html"
          code={`<option value="Active">Active</option>`}
        />
      </section>

      {/* 2. HTML Input Element */}
      <section>
        <h2>2. HTML Input Element</h2>

        <h3>2.1 Radio</h3>
        <p>The <code>input type="radio"</code> element is used to select one option among a list.</p>
        <CodeBlock
          language="html"
          code={`<input type="radio" id="genderMale" value="Male" />
<input type="radio" id="genderFemale" value="Female" />`}
        />

        <h4>2.1.1 HTML name attribute</h4>
        <p>The <code>name</code> attribute specifies the name for an input element.</p>
        <CodeBlock
          language="html"
          code={`<input type="radio" value="Male" name="gender" />`}
        />

        <h4>2.1.2 Radio Group</h4>
        <p>All radio buttons with the same <code>name</code> form a radio group. Only one button can be selected in the group.</p>
        <CodeBlock
          language="html"
          code={`<input type="radio" value="Male" name="gender" />
<input type="radio" value="Female" name="gender" />`}
        />
      </section>

      {/* 3. Boolean Attributes */}
      <section>
        <h2>3. Boolean Attributes</h2>
        <p>For boolean attributes, presence represents <code>true</code> and absence represents <code>false</code>.</p>

        <h3>3.1 HTML selected attribute</h3>
        <p>The <code>selected</code> attribute pre-selects an option when the page loads.</p>
        <CodeBlock
          language="html"
          code={`<option value="Active" selected>Active</option>`}
        />

        <h3>3.2 HTML checked attribute</h3>
        <p>The <code>checked</code> attribute pre-selects (checks) an input element when the page loads.</p>
        <CodeBlock
          language="html"
          code={`<input type="radio" id="genderMale" value="Male" name="gender" checked />`}
        />

        <p>Try out the HTML select element, input radio element, and boolean attributes in your Code Playground.</p>
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

export default Forms_CS_2;
