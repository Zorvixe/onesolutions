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
        console.error("Failed to mark cheat sheet complete:", result.message);
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      console.error("Failed to mark cheat sheet complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------- MCQ DATA -------------------- */
  const mcqs = [
    {
      id: "class_selector",
      section: "CSS Selectors",
      question: "Which CSS selector is used to style an element by its class?",
      options: [".className", "#idName", "p", "*"],
      answer: ".className",
      explanation:
        "Class selectors start with a dot (.) followed by the class name.",
    },
    {
      id: "inherited_property",
      section: "CSS Inheritance",
      question: "Which CSS property is inherited by child elements by default?",
      options: ["margin", "padding", "font-family", "width"],
      answer: "font-family",
      explanation:
        "Text-related properties like font-family, color, text-align, etc., are inherited from parent to child elements.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>CSS Selectors & Inheritance | Cheat Sheet</h1>

      {/* 1. CSS Selectors */}
      <section>
        <h2>1. CSS Selectors</h2>
        <p>
          CSS Selectors are used to select HTML elements that we want to style.
        </p>
        <p>The different types of CSS Selectors are:</p>
        <ul>
          <li>
            Simple Selectors
            <ul>
              <li>
                <b>Class Selector</b>
              </li>
              <li>
                <b>ID Selector</b>
              </li>
              <li>
                <b>Type (tag name) Selector</b>
              </li>
              <li>Attribute Selector</li>
              <li>Universal Selector</li>
              <li>Pseudo-class</li>
            </ul>
          </li>

          <li>Compound Selectors</li>

          <li>Complex Selectors and many more.</li>
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
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            There can be <b>more than one</b> HTML element with the same class
            name in the HTML document.
          </p>
        </div>

        <h3>1.2 ID Selector</h3>
        <p>
          The CSS ID selector selects an HTML element based on its ID attribute
          value. It consists of a hash (<code>#</code>), followed by the ID of
          the HTML element.
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

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            Note There should be only <b>one</b> HTML element with a given ID in
            the entire HTML document. The HTML <b>id</b> attribute value doesn't
            need to have the prefix <b>section</b> as CCBP UI Kit is not used.
          </p>
        </div>

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
        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
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
        <p>From the above Code Snippet, we can say:</p>
        <ul>
          <li>
            The HTML <code>div</code> element is the parent element of the HTML
            <code>h1</code> and <code>p</code> elements.
          </li>
          <li>
            The HTML <code>p</code> element is the parent element of the HTML
            <code>a</code> element.
          </li>
        </ul>

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
        <p>From the above Code Snippet, we can say:</p>
        <ul>
          <li>
            The HTML <code>h1</code> and <code>p</code> elements are the child
            elements of the HTML
            <code>div</code> element.
          </li>
          <li>
            The HTML <code>a</code> element is the child element of the HTML
            <code>p</code> element.
          </li>
        </ul>

        <h3>CSS properties can be categorized into two types:</h3>
        <ul>
          <li>Inherited properties</li>
          <li>Non-inherited properties</li>
        </ul>

        <h3>2.1.3 Inherited Properties</h3>
        <p>
          If the CSS properties applied to the parent element are inherited by
          the child elements, then they are called <b>Inherited properties</b>.
        </p>

        <p>Some of the CSS Inherited Properties are:</p>
        <ul>
          <li>Text related Properties</li>
          <ul>
            <li>
              <code>font-family</code>
            </li>
            <li>
              <code>font-style</code>
            </li>
            <li>
              <code>font-weight</code>
            </li>
            <li>
              <code>text-align</code>
            </li>
          </ul>

          <li>List related Properties</li>
          <ul>
            <li>
              <code>list-style-type</code>
            </li>
          </ul>
          <li>
            <code>color</code> property and many more.
          </li>
        </ul>

        <h3>2.1.4 Non-inherited Properties</h3>
        <p>
          If the CSS properties applied to the parent element{" "}
          <b>are not inherited</b>
          by the child elements, then they are called Non-inherited properties.
        </p>

        <p>Some of the CSS Non-inherited properties are:</p>
        <ul>
          <li>CSS Box Properties</li>
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

          <li>CSS Background Properties</li>
          <ul>
            <li>background-image</li>
            <li>background-color</li>
            <li>background-size</li>
          </ul>
          <li>text-decorationand many more.</li>
        </ul>

        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />
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

export default Css_Selector_Inheritance_CS;
