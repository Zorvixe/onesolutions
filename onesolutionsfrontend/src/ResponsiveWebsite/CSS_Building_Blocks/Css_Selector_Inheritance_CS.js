import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Css_Selector_Inheritance_CS = ({
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
      <h1>CSS Selectors & Inheritance | Cheat Sheet</h1>

      {/* 1. CSS Selectors */}
      <section>
        <h2>1. CSS Selectors</h2>
        <p>
          CSS Selectors are used to select HTML elements that we want to style.
          The different types include:
        </p>
        <ul>
          <li>Simple Selectors</li>
          <li>Class Selector</li>
          <li>ID Selector</li>
          <li>Type (tag name) Selector</li>
          <li>Attribute Selector</li>
          <li>Universal Selector</li>
          <li>Pseudo-class</li>
          <li>Compound Selectors</li>
          <li>Complex Selectors</li>
        </ul>

        <h3>1.1 Class Selector</h3>
        <p>
          The CSS Class Selector selects all the HTML elements that have a given
          CSS class selector as their class attribute value. It consists of a
          dot (<code>.</code>), followed by the class name of the HTML element.
        </p>
        <CodeBlock
          language="html"
          code={`<p class="paragraph">This text is blue and 16px in size.</p>`}
        />
        <CodeBlock
          language="css"
          code={`.paragraph {
  color: blue;
  font-size: 16px;
}`}
        />
        <p>
          Here, the CSS class selector is <code>.paragraph</code>. So, it
          selects all the HTML elements that have an HTML attribute name{" "}
          <b>class</b>, and it's value <code>paragraph</code>.
        </p>

        <p>
          <b>Note: </b> There can be more than one HTML element with the same
          class name in the HTML document.
        </p>

        <h3>1.2 ID Selector</h3>
        <p>
          The CSS ID selector selects an HTML element based on its ID attribute
          value. It consists of a hash <code>#</code>, followed by the ID of the
          HTML element.
        </p>
        <CodeBlock
          language="html"
          code={`<p id="populationParagraph">Population Data</p>`}
        />
        <CodeBlock
          language="css"
          code={`#populationParagraph {
  font-weight: bold;
}`}
        />
        <p>
          Here, the CSS ID selector is <code>#populationParagraph</code>. So, it
          selects the HTML element that has an HTML attribute name{" "}
          <code>id</code> and it's value <code>populationParagraph</code>.
        </p>

        <p>
          <b>Note: </b> IDs must be unique within an HTML document.
        </p>

        <h3>1.3 Type (tag name) Selector</h3>
        <p>
          The CSS Type Selector selects all the HTML elements based on their tag
          names <b>h1, p, div, etc.</b>
        </p>
        <CodeBlock
          language="html"
          code={`<p>This paragraph will be green.</p>`}
        />
        <CodeBlock
          language="css"
          code={`p {
  color: green;
}`}
        />
      </section>

      {/* 2. Fundamental Concepts of CSS */}
      <section>
        <h2>2. Most Fundamental Concepts of CSS</h2>
        <p>
          In CSS, the styles that are applied to HTML elements depend on three
          fundamental concepts.
        </p>
        <ul>
          <li>
            <b>Inheritance</b>
          </li>
          <li>Specificity</li>
          <li>Cascade</li>
        </ul>

        <h3>2.1 CSS Inheritance</h3>
        <p>
          The mechanism through which the value of certain CSS properties is
          passed on from parent elements to child elements is called
          <b> Inheritance</b>.
        </p>

        <h4>2.1.1 Parent Element</h4>
        <p>
          If the HTML elements are placed inside the other HTML element, then
          the outer HTML element is called the parent element of the HTML
          elements inside it.
        </p>
        <CodeBlock
          language="html"
          code={`<div>
  <h1>Title</h1>
  <p>Paragraph</p>
</div>`}
        />
        <p>
          The <code>div</code> is the parent of <code>h1</code> and{" "}
          <code>p</code>.
        </p>

        <h4>2.1.2 Child Element</h4>
        <p>
          An HTML element that is directly inside the parent element is called
          the child element of that parent element.
        </p>
        <CodeBlock
          language="html"
          code={`<p>
  <a href="#">Link</a>
</p>`}
        />
        <p>
          The <code>a</code> element is a child of <code>p</code>.
        </p>

        <h3>CSS properties can be categorized into two types:</h3>
        <ul>
          <li>Inherited properties</li>
          <li>Non-inherited properties</li>
        </ul>

        <h3>2.1.3 Inherited Properties</h3>
        <p>
          If the CSS properties applied to the parent element are inherited by
          the child elements, then they are called{" "}
          <strong>Inherited properties</strong>.
        </p>

        <p>Some of the CSS Inherited Properties are:</p>

        <h4>Text related Properties</h4>
        <ul>
          <li>font-family</li>
          <li>font-style</li>
          <li>font-weight</li>
          <li>text-align</li>
        </ul>

        <h4>List related Properties</h4>
        <ul>
          <li>list-style-type</li>
          <li>color property and many more.</li>
        </ul>

        <h3>2.1.4 Non-inherited Properties</h3>
        <p>
          If the CSS properties applied to the parent element are not inherited
          by the child elements, then they are called{" "}
          <strong>Non-inherited properties</strong>.
        </p>

        <p>Some of the CSS Non-inherited properties are:</p>

        <h4>CSS Box Properties</h4>
        <ul>
          <li>width</li>
          <li>height</li>
          <li>margin</li>
          <li>padding</li>
          <li>border-style</li>
          <li>border-width</li>
          <li>border-color</li>
          <li>border-radius</li>
        </ul>

        <h4>CSS Background Properties</h4>
        <ul>
          <li>background-image</li>
          <li>background-color</li>
          <li>background-size</li>
        </ul>

        <h3>MCQ</h3>
        {[
          {
            question:
              "Which CSS selector is used to style an element by its class?",
            options: [".className", "#idName", "p", "*"],
            answer: ".className",
          },
          {
            question:
              "Which CSS property is inherited by child elements by default?",
            options: ["margin", "padding", "font-family", "width"],
            answer: "font-family",
          },
        ].map((q, idx) => renderMCQ(q, idx, "css_selectors_inheritance"))}
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

export default Css_Selector_Inheritance_CS;
