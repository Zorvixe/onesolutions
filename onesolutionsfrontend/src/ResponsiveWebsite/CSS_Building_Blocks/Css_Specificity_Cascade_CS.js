import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Css_Specificity_Cascade_CS = ({
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
      <h1>CSS Specificity & Cascade | Cheet Sheet</h1>

      {/* 1. Specificity */}
      <section>
        <h2>1. Specificity</h2>
        <p>
          Specificity is how browsers decide which CSS property values are the
          most relevant to an HTML element and, therefore, will be applied.
        </p>
        <p>
          The following list of CSS Selectors is in the lowest to highest order
          by specificity.
        </p>
        <ul>
          <li>Type (tag name) Selector</li>
          <li>Class Selector</li>
          <li>ID Selector</li>
        </ul>

        <h3>1.1 Type Selector & Class Selector</h3>
        <p>
          A Class Selector is <b>more specific</b> compared to Type (tag name)
          Selector as it selects only the HTML elements that have a{" "}
          <b>specific class attribute value</b> in the HTML document.
        </p>
        <CodeBlock
          language="html"
          code={`<p class="paragraph">This text will be red due to higher specificity of class selector.</p>`}
        />
        <CodeBlock
          language="css"
          code={`p {
  color: blue;
}
.paragraph {
  color: red;
}`}
        />

        <p>
          <b>Note: </b> Only the overlapping properties are overwritten, not the
          entire rule.
        </p>

        <h3>1.2 Class Selector & ID Selector</h3>
        <p>
          An ID Selector is more specific when compared to a Class Selector as
          we provide a unique ID within the HTML document and it selects only a
          <b>single</b> HTML Element.
        </p>
        <CodeBlock
          language="html"
          code={`<p id="uniqueParagraph" class="paragraph">This text will be red due to ID selector specificity.</p>`}
        />
        <CodeBlock
          language="css"
          code={`.paragraph {
  color: blue;
}
#uniqueParagraph {
  color: red;
}`}
        />
      </section>

      {/* 2. Inline Styles */}
      <section>
        <h2>2. Inline Styles</h2>
        <p>
          The Inline styles are applied <b>directly</b> to an HTML element. They
          use the HTML <code>style</code> attribute, with CSS property values
          defined within it.
        </p>
        <p>
          <b>Syntax: </b>
        </p>
        <CodeBlock
          language="html"
          code={`<tag style = "property1: value1; property2: value2; ...">Content</tag>`}
        />
        <CodeBlock
          language="html"
          code={`<p style="color: red; font-weight: bold;">This text is red and bold due to inline style.</p>`}
        />
        <p className="note">
          Note: Inline styles are not reusable and reduce readability.
        </p>
      </section>

      {/* 3. CSS Cascade */}
      <section>
        <h2>3. CSS Cascade</h2>
        <p>
          The source order of CSS Rulesets matters. When two CSS Rulesets have
          equal specificity, the one that comes last in the CSS is applied.
        </p>
        <CodeBlock
          language="css"
          code={`p {
  color: blue;
}
p {
  color: red;
}`}
        />
        <p className="note">
          Here, the paragraph text will be red because the second rule comes
          later.
        </p>

        <h3>3.1 The !important Exception</h3>
        <p>
          It is a special piece of CSS used to make a particular CSS property
          and value the <b>most specific</b> thing, irrespective of source order
          and specificity.
        </p>
        <CodeBlock
          language="css"
          code={`p {
  color: blue !important;
}
p {
  color: red;
}`}
        />
        <p className="note">
          Use <code>!important</code> sparingly, only to override external
          libraries like Bootstrap.
        </p>
      </section>

      {/* MCQs */}
      <section>
        <h3>MCQs</h3>
        {[
          {
            question: "Which selector has the highest specificity?",
            options: [
              "Type Selector",
              "Class Selector",
              "ID Selector",
              "Inline Style",
            ],
            answer: "Inline Style",
          },
          {
            question:
              "When two rules have equal specificity, which one is applied?",
            options: ["The first rule", "The last rule", "Both", "Neither"],
            answer: "The last rule",
          },
          {
            question:
              "Which property overrides all other selectors except another !important?",
            options: [
              "ID Selector",
              "Class Selector",
              "Inline Style",
              "!important property",
            ],
            answer: "!important property",
          },
        ].map((q, idx) => renderMCQ(q, idx, "css_specificity_cascade"))}
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

export default Css_Specificity_Cascade_CS;
