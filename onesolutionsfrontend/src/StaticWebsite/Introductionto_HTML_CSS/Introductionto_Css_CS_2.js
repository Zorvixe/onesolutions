import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock } from "../../CodeOutputBlocks";

const Introductionto_Css_CS_2 = ({
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
    } catch (error) {
      alert("Error marking as complete.");
    } finally {
      setIsLoading(false);
    }
  };

  /* 
      MCQ DATA (Follows Required Format)
  */
  const mcqs = [
    {
      id: "text_color_property",
      section: "CSS Text Color",
      question:
        "With CSS property to apply grey color to an HTML heading element.",
      options: [`color`, `text-color`, `text-align`, `all of the above`],
      answer: `color`,
      explanation: "`color` is the correct CSS property to color text.",
    },
    {
      id: "background_color_property",
      section: "CSS Background Color",
      question:
        "Which CSS property applies background color to an HTML element?",
      options: [
        `background-color`,
        `color`,
        `text-align`,
        `all of these options`,
      ],
      answer: `background-color`,
      explanation:
        "`background-color` is the correct property to apply background color.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Introduction to CSS | Part 2 | Cheat Sheet</h1>

      {/* ---------- TEXT COLOR ---------- */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>CSS Text Properties</h2>

        <h3>1. Color</h3>
        <p>
          The CSS <code>color</code> property sets the color of the text.
        </p>

        <h3>Sample Colors</h3>
        <CodeBlock
          language="css"
          code={`h1 {
  color: grey;
}
p {
  color: blue;
span {
  color: red;
}
.main-heading {
  color: blue;
}
.paragraph {
  color: grey;
}`}
        />

        {/* First MCQ */}
        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ---------- BACKGROUND COLOR ---------- */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>CSS Background Properties</h2>

        <h3>2. Background Color</h3>
        <p>
          The <code>background-color</code> property sets the background color
          of an HTML element.
        </p>

        <h3>Code Example</h3>
        <CodeBlock
          language="css"
          code={`div.container {
  background-color: lightblue;
}
.card {
  background-color: lightblue;
}`}
        />

        {/* Second MCQ */}
        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />
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

export default Introductionto_Css_CS_2;
