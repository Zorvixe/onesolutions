import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

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

  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleAnswer = (questionId, option) => {
    setMcqAnswers((prev) => ({ ...prev, [questionId]: option }));
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
        console.log("Cheat sheet marked as completed");
      } else {
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------- MCQ DATA -------------------- */
  const mcqs = [
    {
      id: "highest_specificity",
      section: "Specificity Hierarchy",
      question: "Which has the HIGHEST specificity?",
      options: [
        "Type selector (p)",
        "Class selector (.text)",
        "ID selector (#header)",
        "Inline style",
      ],
      answer: "Inline style",
      explanation:
        "Inline styles have the highest specificity, beating even ID selectors and !important in normal cases.",
    },
    {
      id: "cascade_order",
      section: "CSS Cascade",
      question: "When two rules have the same specificity, which one wins?",
      options: [
        "The first one",
        "The last one in the CSS file",
        "Both apply",
        "Neither applies",
      ],
      answer: "The last one in the CSS file",
      explanation:
        "This is the 'Cascade' — later rules with equal specificity override earlier ones.",
    },
    {
      id: "important_override",
      section: "!important Rule",
      question: "What overrides EVERYTHING except another !important?",
      options: [
        "ID selector",
        "Inline style",
        "!important declaration",
        "Universal selector",
      ],
      answer: "!important declaration",
      explanation:
        "!important gives a property the highest possible priority (except when another !important appears later).",
    },
  ];

  return (
    <div className="intro-container">
      <h1>CSS Specificity & Cascade | Cheat Sheet</h1>

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

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            It doesn't overwrite the entire CSS Ruleset but only overwrites the
            CSS properties that are the same.
          </p>
        </div>

        <h3>1.2 Class Selector & ID Selector</h3>
        <p>
          An ID Selector is more specific when compared to a Class Selector as
          we provide a unique ID within the HTML document and it selects only a
          <b> single</b> HTML Element.
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
        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
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
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            Inline Styles have the highest specificity. They overwrite any other
            styles specified using CSS Selectors.
          </p>
          <p>Using Inline Styles is not recommended because</p>
          <ul>
            <li>Inline Styles are not reusable.</li>
            <li>Writing HTML and CSS separately increases code readability.</li>
          </ul>
        </div>
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
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            The styles that apply to the HTML Elements are not determined by the
            <b>order the classes</b> defined in the HTML <b>class</b> attribute,
            but instead the order in which they appear in the CSS.
          </p>
        </div>
        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />

        <h3>3.1 The !important Exception</h3>
        <p>
          It is a special piece of CSS used to make a particular CSS property
          and value the <code>most specific thing</code>, irrespective of source
          order and specificity.
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
        <p>
          The only way to override a <code>!important</code> property value is
          to include another <code>!important</code> property value. The added
          property value should either come later in the order or should be of
          higher specificity.
        </p>
        <MCQBlock mcq={mcqs[2]} answers={mcqAnswers} onAnswer={handleAnswer} />
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
            ? "Completed"
            : "Continue"}
        </button>
      </div>
    </div>
  );
};

/* -------------------- REUSABLE MCQ BLOCK -------------------- */
const MCQBlock = ({ mcq, answers, onAnswer }) => {
  const userAnswer = answers[mcq.id];
  const isCorrect = userAnswer === mcq.answer;

  return (
    <div className="mcq-container">
      <h3 className="mcq-title">Quiz: {mcq.section}</h3>
      <p className="mcq-question">{mcq.question}</p>

      {mcq.options.map((option) => {
        const active = userAnswer === option;
        const correct = active && isCorrect;
        const wrong = active && !isCorrect;

        return (
          <label
            key={option}
            className={`mcq-option ${
              correct ? "selected-correct" : wrong ? "selected-wrong" : ""
            }`}
          >
            <input
              type="radio"
              name={mcq.id}
              checked={active}
              onChange={() => onAnswer(mcq.id, option)}
              style={{ marginRight: "8px" }}
            />
            <code>{option}</code>
          </label>
        );
      })}

      {userAnswer && (
        <div className={`mcq-result ${isCorrect ? "correct" : "wrong"}`}>
          {isCorrect ? "Correct!" : `Wrong. Correct answer: ${mcq.answer}`}
          <p>
            <strong>Explanation:</strong> {mcq.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default Css_Specificity_Cascade_CS;
