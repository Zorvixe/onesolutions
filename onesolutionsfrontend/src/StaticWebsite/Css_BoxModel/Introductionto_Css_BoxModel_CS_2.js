import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Introductionto_Css_BoxModel_CS_2 = ({
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
      } else {
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      alert("Error marking as complete.");
    } finally {
      setIsLoading(false);
    }
  };

  /* -----------------------------
      MCQ DATA
  ------------------------------*/
  const mcqs = [
    {
      id: "border_width",
      section: "Border Width",
      question: "Which CSS property can be used to set the border thickness of an HTML element?",
      options: ["height", "border-width", "width", "border"],
      answer: "border-width",
      explanation: "The border-width property controls the thickness of the border. border-style must be specified for the border to be visible.",
    },
    {
      id: "border_radius",
      section: "Border Radius",
      question: "Which CSS property is used to round the bottom left corner of an HTML element?",
      options: [
        "left-bottom-border-radius",
        "border-bottom-left-radius",
        "border-bottom-top-radius",
        "border-bottom-right-radius",
      ],
      answer: "border-bottom-left-radius",
      explanation: "border-bottom-left-radius rounds only the bottom-left corner. You can also use the shorthand border-radius with four values.",
    },
    {
      id: "border_color",
      section: "Border Color",
      question: "Which CSS property specifies the color for all the four borders of an HTML element?",
      options: ["border-color", "border-width", "color", "background-color"],
      answer: "border-color",
      explanation: "border-color sets the color of the border on all four sides.",
    },
    {
      id: "border_style",
      section: "Border Style",
      question: "Which CSS property specifies the style for all the four borders of an HTML element?",
      options: ["border-color", "border", "style", "border-style"],
      answer: "border-style",
      explanation: "border-style is required to make the border visible (values: solid, dashed, dotted, none, etc.).",
    },
    {
      id: "padding",
      section: "Padding",
      question: "Which of the following statements is true regarding the CSS Box Model?",
      options: [
        "Padding is the border surrounding the content of an HTML element.",
        "Padding is the background surrounding the content of an HTML element.",
        "Padding is the space surrounding the content of an HTML element.",
        "Padding is the border color of the content of an HTML element.",
      ],
      answer: "Padding is the space surrounding the content of an HTML element.",
      explanation: "Padding creates inner spacing between the content and the border.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Introducion to CSS Box Model | Part 2 - MCQs</h1>

      {/* ----------- BORDER WIDTH ----------- */}
      <section>
        <h2>1. Border Width</h2>
        <p>
          The CSS <code>border-width</code> property specifies the width of the
          border for all four sides of an HTML element.
        </p>

        <CodeBlock
          language="css"
          code={`div {
  border-width: 0px; /* removes the border */
  border-style: solid; /* mandatory to see the border */
}`}
        />

        <p>
          The CSS Property and value pair <code>border-width: 0px;</code>{" "}
          removes the border of an HTML element.
        </p>
         <p>
          <h5>Warning:</h5>
         Specifying the CSS <b>border-style</b> property for an HTML element is
          mandatory. Otherwise, the CSS properties like <b>border-color</b>,
          <b>border-width</b> will not appear in the browser. The HTML <code>button</code> element
          is an exception as it appears with a border in the browser by default.</p>
          
        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ----------- BORDER RADIUS ----------- */}
      <section>
        <h2>2. Border Radius</h2>
        <p>
          The CSS <code>border-radius</code> property specifies the roundness of
          the corners of an HTML element.
        </p>

        <p>
          <b>Quick Tip: </b>
          Specifying the background color for an HTML element makes the border
          radius more visible.
        </p>

        <CodeBlock
          language="css"
          code={`div {
  border-bottom-left-radius: 10px;
  background-color: lightblue;
}`}
        />

        <p>
          You can use the below CSS properties to round a specific corner of an
          HTML element.
        </p>

        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Property</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>border-top-left-radius</td>
              <td>Defines the rounding of the top-left corner of an element.</td>
            </tr>
            <tr>
              <td>border-top-right-radius</td>
              <td>Defines the rounding of the top-right corner of an element.</td>
            </tr>
            <tr>
              <td>border-bottom-left-radius</td>
              <td>Defines the rounding of the bottom-left corner of an element.</td>
            </tr>
            <tr>
              <td>border-bottom-right-radius</td>
              <td>Defines the rounding of the bottom-right corner of an element.</td>
            </tr>
          </tbody>
        </table>

        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ----------- BORDER COLOR ----------- */}
      <section>
        <h2>3. Border Color</h2>
        <p>
          The CSS <code>border-color</code> property specifies the color of the
          border for all four sides of an HTML element.
        </p>

        <CodeBlock
          language="css"
          code={`div {
  border: 2px solid red; /* border-style mandatory */
}`}
        />

        <p>
          <h5>Warning: </h5>Specifying the CSS <code>border-style</code> property
          for an HTML element is mandatory. Otherwise, the CSS properties like{" "}
          <code>border-color</code> and <code>border-width</code> will not appear
          in the browser. The HTML button element is an exception.
        </p>

        <MCQBlock mcq={mcqs[2]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ----------- BORDER STYLE ----------- */}
      <section>
        <h2>4. Border Style</h2>
        <p>
          The CSS <code>border-style</code> property specifies the style of the
          border for all four sides of an HTML element.
        </p>

        <CodeBlock
          language="css"
          code={`div {
  border-style: dashed; /* values: dotted, dashed, solid, none */
}`}
        />

        <p>You can use one of the below values of the CSS border-style property.</p>

        <table border="1" style={{ borderCollapse: "collapse", width: "70%" }}>
          <thead>
            <tr>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>dotted</td><td>Specifies a dotted border.</td></tr>
            <tr><td>dashed</td><td>Specifies a dashed border.</td></tr>
            <tr><td>solid</td><td>Specifies a solid border.</td></tr>
            <tr><td>none (default)</td><td>No border is displayed (default value).</td></tr>
          </tbody>
        </table>

        <MCQBlock mcq={mcqs[3]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ----------- PADDING ----------- */}
      <section>
        <h2>5. Padding</h2>
        <p>
          The CSS <code>padding</code> property specifies the space around the
          content of an HTML element.
        </p>

        <CodeBlock
          language="css"
          code={`div {
  padding: 20px;
  background-color: lightyellow;
}`}
        />

        <MCQBlock mcq={mcqs[4]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ----------- CSS COLORS – HEX CODE ----------- */}
      <section>
        <h2>6. CSS Colors – Hex Code</h2>
        <p>
          CSS colors can be represented using color names, hex codes, RGB, HSL,
          and more. Hex codes allow for a wide variety of colors.
        </p>

        <p>
          Since few colors have the Color names, Hex Codes make a good
          alternative to pick a wide variety of colors.
        </p>

        <table border="1" style={{ borderCollapse: "collapse", width: "70%" }}>
          <thead>
            <tr>
              <th>Color Name</th>
              <th>Hex Code</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>orange</td><td>#ffa500</td></tr>
            <tr><td>red</td><td>#ff0000</td></tr>
            <tr><td>blue</td><td>#0000ff</td></tr>
            <tr><td>green</td><td>#008000</td></tr>
            <tr><td>-</td><td>#012d36</td></tr>
            <tr><td>-</td><td>#432711</td></tr>
            <tr><td>-</td><td>#25b1cc</td></tr>
          </tbody>
        </table>

        <CodeBlock
          language="css"
          code={`div {
  color: #ff0000; /* red text using hex code */
  background-color: #008000; /* green background */
}`}
        />

        <h3>How to pick a color using Hex Code</h3>
        <p>
          The color picker lets you pick a color among the approximately
          16,777,216 colors available.
        </p>
        <p>One of the simplest ways to access a color picker is:</p>
        <p>Type color picker in the Google Search bar and search it.</p>

        <h3>Color Picker</h3>
        <img
          src="/assets/img/color_picker.png"
          alt="Color Picker"
          style={{ width: "90%", height: "300px" }}
        />
      </section>

      {/* ----------- CONTINUE BUTTON ----------- */}
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

/* ----------------------------
    REUSABLE MCQ COMPONENT
-----------------------------*/
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
          {isCorrect ? "Correct!" : `Wrong. Correct: ${mcq.answer}`}
          <p>
            <strong>Explanation:</strong> {mcq.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default Introductionto_Css_BoxModel_CS_2;