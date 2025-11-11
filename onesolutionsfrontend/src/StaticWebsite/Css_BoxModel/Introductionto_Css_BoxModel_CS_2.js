import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Introductionto_Css_BoxModel_CS_2 = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary } = useAuth();
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});

  const handleAnswer = (question, option) => {
    setMcqAnswers((prev) => ({ ...prev, [question]: option }));
  };

  const handleContinue = async () => {
    try {
      await markSubtopicComplete(subtopicId, goalName, courseName);
      await loadProgressSummary();
      setIsSubtopicCompleted(true);
    } catch (error) {
      console.error("Failed to mark subtopic complete:", error);
    }
  };

  return (
    <div className="intro-container">
      <h1>CSS Cheat Sheet – Box Properties & Colors</h1>

      {/* 1. Border Width */}
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
          <b>Note: </b>
          Specifying the CSS border-style property for an HTML element is
          mandatory. Otherwise, the CSS properties like border-color,
          border-width will not appear in the browser. The HTML button element
          is an exception as it appears with a border in the browser by default.
        </p>
        <h3>MCQ</h3>
        {[
          {
            question:
              "Which CSS Property can be used to set the border thickness of an HTML element?",
            options: ["height", "border-width", "width", "border"],
            answer: "border-width",
          },
        ].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map((option) => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`borderwidth_${idx}`}
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
        ))}
      </section>

      {/* 2. Border Radius */}
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
              <td>
                Defines the rounding of the top-left corner of an element.
              </td>
            </tr>
            <tr>
              <td>border-top-right-radius</td>
              <td>
                Defines the rounding of the top-right corner of an element.
              </td>
            </tr>
            <tr>
              <td>border-bottom-left-radius</td>
              <td>
                Defines the rounding of the bottom-left corner of an element.
              </td>
            </tr>
            <tr>
              <td>border-bottom-right-radius</td>
              <td>
                Defines the rounding of the bottom-right corner of an element.
              </td>
            </tr>
          </tbody>
        </table>

        <h3>MCQ</h3>
        {[
          {
            question:
              "Which CSS Property is used to round the bottom left corner of an HTML element?",
            options: [
              "left-bottom-border-radius",
              "border-bottom-left-radius",
              "border-bottom-top-radius",
              "border-bottom-right-radius",
            ],
            answer: "border-bottom-left-radius",
          },
        ].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map((option) => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`borderradius_${idx}`}
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
        ))}
      </section>

      {/* 3. Border Color */}
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
          <b>Warning: </b>Specifying the CSS <code>border-style</code> property
          for an HTML element is mandatory. Otherwise, the CSS properties like{" "}
          <code>border-color</code>
          <code>border-width</code> will not appear in the browser. The HTML
          button element is an exception as it appears with a border in the
          browser by default.
        </p>
        <h3>MCQ</h3>
        {[
          {
            question:
              "Which CSS Property specifies the color for all the four borders of an HTML element?",
            options: [
              "border-color",
              "border-width",
              "color",
              "background-color",
            ],
            answer: "border-color",
          },
        ].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map((option) => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`bordercolor_${idx}`}
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
        ))}
      </section>

      {/* 4. Border Style */}
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
        <p>
          You can use one of the below values of the CSS border-style property.
        </p>
        <table border="1" style={{ borderCollapse: "collapse", width: "70%" }}>
          <thead>
            <tr>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>dotted</td>
              <td>Specifies a dotted border.</td>
            </tr>
            <tr>
              <td>dashed</td>
              <td>Specifies a dashed border.</td>
            </tr>
            <tr>
              <td>solid</td>
              <td>Specifies a solid border.</td>
            </tr>
            <tr>
              <td>none (default)</td>
              <td>No border is displayed (default value).</td>
            </tr>
          </tbody>
        </table>

        <h3>MCQ</h3>
        {[
          {
            question:
              "Which CSS Property specifies the style for all the four borders of an HTML element?",
            options: ["border-color", "border", "style", "border-style"],
            answer: "border-style",
          },
        ].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map((option) => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`borderstyle_${idx}`}
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
        ))}
      </section>

      {/* 5. Padding */}
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
        <h3>MCQ</h3>
        {[
          {
            question:
              "Which of the following statements is true regarding the CSS Box Model?",
            options: [
              "Padding is the border surrounding the content of an HTML element.",
              "Padding is the background surrounding the content of an HTML element.",
              "Padding is the space surrounding the content of an HTML element.",
              "Padding is the border color of the content of an HTML element.",
            ],
            answer:
              "Padding is the space surrounding the content of an HTML element.",
          },
        ].map((q, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <p>{q.question}</p>
            {q.options.map((option) => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`padding_${idx}`}
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
        ))}
      </section>

      {/* 6. CSS Colors – Hex Code */}
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
            <tr>
              <td>orange</td>
              <td>#ffa500</td>
            </tr>
            <tr>
              <td>red</td>
              <td>#ff0000</td>
            </tr>
            <tr>
              <td>blue</td>
              <td>#0000ff</td>
            </tr>
            <tr>
              <td>green</td>
              <td>#008000</td>
            </tr>
            <tr>
              <td>-</td>
              <td>#012d36</td>
            </tr>
            <tr>
              <td>-</td>
              <td>#432711</td>
            </tr>
            <tr>
              <td>-</td>
              <td>#25b1cc</td>
            </tr>
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
          alt="DOM Tree"
          style={{ width: "90%", height: "300px" }}
        />
      </section>

      {/* Continue Button */}
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

export default Introductionto_Css_BoxModel_CS_2;
