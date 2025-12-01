import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock } from "../../CodeOutputBlocks";

const Introductionto_Css_BoxModel_CS_1 = ({
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
      id: "height_property",
      section: "CSS Height",
      question: `Which CSS property specifies the height of an HTML element?`,
      options: [`height`, `width`, `color`, `background-color`],
      answer: `height`,
      explanation: `The CSS height property sets the height of an element.`,
    },
    {
      id: "width_property",
      section: "CSS Width",
      question: `Which CSS property specifies the width of an HTML element?`,
      options: [`width`, `height`, `margin`, `padding`],
      answer: `width`,
      explanation: `The CSS width property sets the width of an element.`,
    },
    {
      id: "background_image_property",
      section: "CSS Background Image",
      question: `Which CSS property specifies the background image of an HTML element?`,
      options: [`background`, `bg-image`, `color`, `background-image`],
      answer: `background-image`,
      explanation: `The background-image property specifies the image used for an element's background.`,
    },
    {
      id: "viewport_units",
      section: "Viewport Units",
      question: `Which CSS unit equals 1% of the height of the viewport?`,
      options: [`px`, `vh`, `vw`, `h`],
      answer: `vh`,
      explanation: `1vh equals 1% of the height of the viewport (browser window).`,
    },
  ];

  return (
    <div className="intro-container">
      <h1>Introducion to CSS Box Model | Cheat Sheet</h1>

      {/* ----------- HEIGHT ----------- */}
      <section>
        <h2>1. Height</h2>
        <p>
          The CSS <code>height</code> property specifies the height of an HTML
          element.
        </p>

        <CodeBlock language="css" code={`.card {  height: 200px; }`} />

        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ----------- WIDTH ----------- */}
      <section>
        <h2>2. Width</h2>
        <p>
          The CSS <code>width</code> property specifies the width of an HTML
          element.
        </p>

        <CodeBlock language="css" code={`.card {  width: 250px; }`} />

        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ----------- BACKGROUND IMAGE ----------- */}
      <section>
        <h2>3. CSS Background Properties</h2>

        <h3>3.1 Background Image</h3>
        <p>
          The CSS <code>background-image</code> property specifies the
          background image of an HTML element.
        </p>

        <CodeBlock
          language="css"
          code={`.card {
  background-image: url("https://d2clawv67efefq.cloudfront.net/ccbp-static-website/ocean.jpg");
}`}
        />

        <table
          border="1"
          style={{
            borderCollapse: "collapse",
            width: "50%",
            margin: "1rem 0",
          }}
        >
          <thead>
            <tr>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>url(URL)</td>
              <td>The URL to the image.</td>
            </tr>
          </tbody>
        </table>

        <div className="Warning-container">
          <div>
            <h5>
              <i class="bi bi-exclamation-triangle"></i>Warning
            </h5>
          </div>
          <ul style={{ marginLeft: "1.5rem" }}>
            <li>
              If height is not specified, the background image takes the height
              of the content.
            </li>
            <li>The URL must be valid for the image to display.</li>
          </ul>
        </div>

        <MCQBlock mcq={mcqs[2]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ----------- BACKGROUND SIZE ----------- */}
      <section>
        <h3>3.2 Background Size</h3>
        <p>
          The CSS <code>background-size</code> property specifies the size of
          the background image of an HTML element.
        </p>

        <CodeBlock language="css" code={`.card {  background-size: cover; }`} />

        <table
          border="1"
          style={{
            borderCollapse: "collapse",
            width: "100%",
            margin: "1rem 0",
          }}
        >
          <thead>
            <tr>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>cover</td>
              <td>
                Scales the image to the smallest size while maintaining the same
                aspect ratio (width/height) and covers the entire width and
                height even if the image is cropped.
              </td>
            </tr>
          </tbody>
        </table>
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            <strong>Aspect Ratio</strong> = width / height of an image.
          </p>
        </div>
      </section>

      {/* ----------- VIEWPORT UNITS ----------- */}
      <section>
        <h2>4. Viewport Units</h2>
        <p>
          The browser's <code>viewport</code> is the area of the window in which
          web content can be seen.
        </p>
        <h3>4.1 Viewport Height</h3>
        <p>
          The CSS Viewport Height <code>vh</code> Unit equals to 1% of the
          height of the Viewport (browser window size).
        </p>
        <CodeBlock language="css" code={`.card {  height: 50vh; }`} />
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            The height <b>100vh</b> sets an HTML element to the entire height of
            the viewport (browser window size).
          </p>
        </div>
        <h3>4.2 Viewport Width</h3>
        The CSS Viewport Width <code>vw</code> Unit equals to 1% of the width of
        the Viewport (browser window size).
        <CodeBlock language="css" code={`.card {  width: 100vw; }`} />
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            The width <b>100vw</b> sets an HTML element to the entire width of
            the Viewport (browser window size).
          </p>
        </div>
        <MCQBlock mcq={mcqs[3]} answers={mcqAnswers} onAnswer={handleAnswer} />
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
            ? "✓ Completed"
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

export default Introductionto_Css_BoxModel_CS_1;
