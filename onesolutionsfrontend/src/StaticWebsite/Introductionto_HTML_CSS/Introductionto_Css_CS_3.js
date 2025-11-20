import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock } from "../../CodeOutputBlocks";

const Introductionto_Css_CS_3 = ({
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

  // Check completion
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
    } catch (err) {
      alert("Error marking as complete.");
    } finally {
      setIsLoading(false);
    }
  };

  /* 
      MCQ DATA (Same structure as Introductionto_Css_CS_2)
 */
  const mcqs = [
    {
      id: "font_family_property",
      section: "CSS Font Family",
      question:
        "Which of the following is a valid value of the CSS property font-family?",
      options: [`blue`, `"Roboto"`, `red`, `center`],
      answer: `"Roboto"`,
      explanation: `Font family names must be written inside quotes.`,
    },
    {
      id: "font_size_property",
      section: "CSS Font Size",
      question:
        "Which of the following is a correct value for the font-size property?",
      options: [`center`, `blue`, `"Roboto"`, `20px`],
      answer: `20px`,
      explanation: `Font-size must include a number followed by px.`,
    },
    {
      id: "font_style_property",
      section: "CSS Font Style",
      question:
        "Which of the following is a valid value for the CSS property font-style?",
      options: [`20px`, `italic`, `blue`, `"Roboto"`],
      answer: `italic`,
      explanation: `Valid font-style values include normal, italic, oblique.`,
    },
    {
      id: "font_weight_property",
      section: "CSS Font Weight",
      question:
        "The CSS _______ property specifies how thick or thin text characters should be displayed.",
      options: [`font-style`, `font-family`, `font-size`, `font-weight`],
      answer: `font-weight`,
      explanation: `Font-weight controls boldness.`,
    },
    {
      id: "text_decoration_property",
      section: "CSS Text Decoration",
      question: "Which value is valid for text-decoration?",
      options: [`bold`, `underline`, `"Roboto"`, `20px`],
      answer: `underline`,
      explanation: `underline, line-through, and overline are valid values.`,
    },
  ];

  return (
    <div className="intro-container">
      <h1>Introduction to CSS | Part 3 | Cheat Sheet</h1>

      {/* -------------- FONT FAMILY -------------- */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>1. Font Family</h2>
        <p>
          The <code>font-family</code> property specifies the typeface applied
          to text.
        </p>

        <CodeBlock
          language="css"
          code={`h1 {
  font-family: "Roboto";
}

p {
  font-family: "Times New Roman";
}`}
        />
        <p>You can use one of the below values of the font-family property,</p>
        <h3>Values</h3>
        <img
          src="/assets/img/font_families.png"
          alt="DOM Tree"
          style={{ width: "50%", height: "350px" }}
        />
        <div className="Note-container">
          <h6>Note:</h6>
          <p>
            <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
              <li>
                To use <b>font families</b>, you need to import their style
                sheets into your CSS file.
              </li>
              <li>
                There shouldn't be any spelling mistakes in the values of the{" "}
                <b>font-family</b> property.
              </li>
              <li>
                There must be quotations around the value of the{" "}
                <b>font-family</b> property.
              </li>
            </ul>
          </p>
        </div>

        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* -------------- FONT SIZE -------------- */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>2. Font Size</h2>
        <p>
          The <code>font-size</code> property sets the size of the text.
        </p>

        <CodeBlock
          language="css"
          code={`p {
  font-size: 20px;
}`}
        />
        <div className="Note-container">
          <h6>Note:</h6>
          <p>
            <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
              <li>
                You must add <b>px</b> after the number in the value of the{" "}
                <b>font-size</b> property.
              </li>
              <li>
                There shouldn't be any space between the number and <b>px</b>.
              </li>
              <li>
                There shouldn't be any quotations around the value of the{" "}
                <b>font-size</b> property.
              </li>
            </ul>
          </p>
        </div>

        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* -------------- FONT STYLE -------------- */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>3. Font Style</h2>
        <p>
          The <code>font-style</code> property specifies the font style for
          text.
        </p>
        <p>You can use one of the below values of the font-style property,</p>

        <table
          border="1"
          style={{ borderCollapse: "collapse", width: "70%", margin: "1rem 0" }}
        >
          <thead>
            <tr>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>normal</td>
              <td>Displays text normally</td>
            </tr>
            <tr>
              <td>italic</td>
              <td>Displays text in italic style</td>
            </tr>
            <tr>
              <td>oblique</td>
              <td>Displays text in an oblique (slanted) style</td>
            </tr>
          </tbody>
        </table>

        <h3>Example Code</h3>
        <CodeBlock
          language="css"
          code={`.text-italic {
  font-style: italic;
}`}
        />
        <div className="Note-container">
          <h6>Note:</h6>
          <p>
            <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
              <li>
                There shouldn't be any spelling mistakes in the values of the{" "}
                <b>font-style</b> property.
              </li>
              <li>
                There shouldn't be any quotations around the value of the{" "}
                <b>font-style</b> property.
              </li>
            </ul>
          </p>
        </div>

        <MCQBlock mcq={mcqs[2]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* -------------- FONT WEIGHT -------------- */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>4. Font Weight</h2>
        <p>
          The CSS font-weight property specifies how thick or thin characters in
          text should be displayed.
        </p>

        <CodeBlock
          language="css"
          code={`h1 {
  font-weight: bold;
}

p {
  font-weight: 600;
}`}
        />
        <p>You can use one of the below values of the font-weight property,</p>
        <table
          border="1"
          style={{ borderCollapse: "collapse", width: "70%", margin: "1rem 0" }}
        >
          <thead>
            <tr>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>normal</td>
              <td>Normal font weight (equivalent to 400)</td>
            </tr>
            <tr>
              <td>bold</td>
              <td>Bold text (equivalent to 700)</td>
            </tr>
            <tr>
              <td>bolder</td>
              <td>Bolder than the parent element</td>
            </tr>
            <tr>
              <td>lighter</td>
              <td>Lighter than the parent element</td>
            </tr>

            <tr>
              <td>100</td>
              <td>Thin</td>
            </tr>
            <tr>
              <td>200</td>
              <td>Extra Light</td>
            </tr>
            <tr>
              <td>300</td>
              <td>Light</td>
            </tr>
            <tr>
              <td>400</td>
              <td>Normal</td>
            </tr>
            <tr>
              <td>500</td>
              <td>Medium</td>
            </tr>
            <tr>
              <td>600</td>
              <td>Semi Bold</td>
            </tr>
            <tr>
              <td>700</td>
              <td>Bold</td>
            </tr>
            <tr>
              <td>800</td>
              <td>Extra Bold</td>
            </tr>
            <tr>
              <td>900</td>
              <td>Black (Heaviest)</td>
            </tr>
          </tbody>
        </table>
        <div className="Note-container">
          <h6>Note:</h6>
          <p>
            <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
              <li>
                There shouldn't be any spelling mistakes in the values of the{" "}
                <b>font-weight</b> property.
              </li>
              <li>
                There shouldn't be any quotations around the value of the{" "}
                <b>font-weight</b> property.
              </li>
              <li>
                The numerical values given to the <b>font-weight</b> property
                must be in the range from <b>100 to 900</b> and should be the{" "}
                <b>multiples of 100</b>.
              </li>
            </ul>
          </p>
        </div>

        <MCQBlock mcq={mcqs[3]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* -------------- TEXT DECORATION -------------- */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>5. Text Decoration</h2>
        <p>
          The <code>text-decoration</code> property specifies the decoration
          added to the text.
        </p>

        <h3>Example Code</h3>
        <CodeBlock
          language="css"
          code={`.main-heading {
  text-decoration: underline;
}

.paragraph {
  text-decoration: overline;
}`}
        />

        <p>
          You can use one of the below values of the{" "}
          <code>text-decoration</code> property:
        </p>

        <table
          border="1"
          style={{ borderCollapse: "collapse", width: "70%", margin: "1rem 0" }}
        >
          <thead>
            <tr>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>underline</td>
              <td>Underline the text</td>
            </tr>
            <tr>
              <td>line-through</td>
              <td>Strike through the text</td>
            </tr>
            <tr>
              <td>overline</td>
              <td>Overline the text</td>
            </tr>
          </tbody>
        </table>

        <div className="Note-container">
          <h6>Note:</h6>
          <p>
            <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
              <li>
                There shouldn't be any spelling mistakes in the values of the{" "}
                <b>text-decoration</b> property.
              </li>
              <li>
                There shouldn't be any quotations around the value of the{" "}
                <b>text-decoration</b> property.
              </li>
              <li>
                Ensure that <b>text-decoration</b> and <b>line-through</b> are
                properly hyphenated.
              </li>
            </ul>
          </p>
        </div>

        <MCQBlock mcq={mcqs[4]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* CONTINUE BUTTON */}
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

/* ------------------------------------
    REUSABLE MCQ BLOCK COMPONENT
------------------------------------ */
const MCQBlock = ({ mcq, answers, onAnswer }) => {
  const userAnswer = answers[mcq.id];
  const isCorrect = userAnswer === mcq.answer;

  return (
    <div className="mcq-container">
      <h3>Quiz: {mcq.section}</h3>
      <p>{mcq.question}</p>

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

export default Introductionto_Css_CS_3;
