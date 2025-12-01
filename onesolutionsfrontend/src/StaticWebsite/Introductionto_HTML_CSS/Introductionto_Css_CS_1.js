import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Introductionto_Css_CS_1 = ({
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
        MCQ DATA (FIXED)
  */
  const mcqs = [
    {
      id: "container_element",
      section: "HTML Container Element",
      question: "Which HTML element is used as a container?",
      options: [`<span>`, `<div>`, `<section>`],
      answer: `<div>`,
      explanation: "<div> is the most commonly used block-level container.",
    },
    {
      id: "css_property",
      section: "CSS Properties",
      question: "Which of the following is a CSS Property?",
      options: [`text-align`, `.h-center`, `center`],
      answer: `text-align`,
      explanation:
        "`text-align` is a valid CSS property. `.h-center` is a class name.",
    },
    {
      id: "text_align_value",
      section: "CSS Text Align",
      question:
        "Which of the following is a valid value for the CSS property text-align?",
      options: [`text-align`, `.h-right`, `right`],
      answer: `right`,
      explanation: "`right` is a valid value for the CSS text-align property.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Introduction to CSS | Cheat Sheet</h1>

      {/* 1. Container Element */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>1. HTML Container Element</h2>
        <p>
          The HTML <code>div</code> element defines a container.
        </p>

        <CodeBlock
          language="html"
          code={`<div>
  <h1>Explore Paradise</h1>
  <p>Discover the world's most beautiful destinations and create unforgettable memories</p>
  <button>Explore Places</button>
</div>`}
        />

        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 2. CSS Properties */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>2. CSS Properties</h2>

        <b>Syntax: </b>
        <CodeBlock
          language="css"
          code={`selector {
  property1: value1;
  property2: value2;
}`}
        />
        <p>Below is a CSS class containing a simple property.</p>
        <CodeBlock
          language="css"
          code={`.h-center {
  text-align: center;
}`}
        />

        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 3. Text Align */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>3. CSS Text Align</h2>
        <p>
          The CSS <code>text-align</code> property specifies the horizontal
          alignment of the text in an HTML element.
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
              <td>center</td>
              <td>Aligns text to the center</td>
            </tr>
            <tr>
              <td>left</td>
              <td>Aligns text to the left</td>
            </tr>
            <tr>
              <td>right</td>
              <td>Aligns text to the right</td>
            </tr>
          </tbody>
        </table>

        <h3>Example Code</h3>
        <CodeBlock
          language="css"
          code={`.h-right {
  text-align: right;
}`}
        />

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
            ? "✓ Completed"
            : "Continue"}
        </button>
      </div>
    </div>
  );
};

/* 
   REUSABLE MCQ BLOCK COMPONENT
 */
const MCQBlock = ({ mcq, answers, onAnswer }) => {
  const userAnswer = answers[mcq.id];
  const isCorrect = userAnswer === mcq.answer;

  return (
    <div className="mcq-container" style={{ marginTop: "1.5rem" }}>
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

export default Introductionto_Css_CS_1;
