import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Bootstrap_Grid_Sys_CS_1 = ({
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

  /* -------------------- MCQ DATA -------------------- */
  const mcqs = [
    {
      id: "col_prefix",
      section: "Bootstrap Grid Prefix",
      question: "Which Bootstrap column prefix is used for medium devices?",
      options: ["col-sm-", "col-md-", "col-lg-", "col-xl-"],
      answer: "col-md-",
      explanation:
        "`col-md-` is used for medium devices (≥768px) in Bootstrap.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Bootstrap Grid System | Cheat Sheet</h1>

      {/* 1. COLUMN WRAPPING */}
      <section>
        <h2>1. Column Wrapping</h2>

        <p>
          When more than <strong>12 columns</strong> are placed in a single row,
          the remaining columns automatically wrap to the next line.
        </p>

        <p>
          Try out the different combinations of Bootstrap class names like
          <code>col-4</code>, <code>col-4</code>, <code>col-6</code>, etc.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="row">
  <div class="col-4">Col 1</div>
  <div class="col-4">Col 2</div>
  <div class="col-6">Col 3 (wraps)</div>
</div>`}
        />
      </section>

      {/* 2. GRID BREAKPOINTS */}
      <section>
        <h2>2. The Layout at different Breakpoints (Grid Breakpoints)</h2>

        <p>
          Bootstrap provides different{" "}
          <b>Bootstrap Grid Column class name prefixes</b>
          for Five Responsive Tiers (Responsive Breakpoints).
        </p>

        <table className="default-table">
          <thead>
            <tr>
              <th>Device</th>
              <th>Width</th>
              <th>Class Prefix</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Extra Small</td>
              <td>&lt;576px</td>
              <td>col-</td>
            </tr>
            <tr>
              <td>Small</td>
              <td>&gt;=576px</td>
              <td>col-sm-</td>
            </tr>
            <tr>
              <td>Medium</td>
              <td>&gt;=768px</td>
              <td>col-md-</td>
            </tr>
            <tr>
              <td>Large</td>
              <td>&gt;=992px</td>
              <td>col-lg-</td>
            </tr>
            <tr>
              <td>Extra Large</td>
              <td>&gt;=1200px</td>
              <td>col-xl-</td>
            </tr>
          </tbody>
        </table>

        <CodeBlock
          language="html"
          code={`<div class="row">
  <div class="col-12 col-md-6 col-lg-4">Column A</div>
  <div class="col-12 col-md-6 col-lg-8">Column B</div>
</div>`}
        />
      </section>
      <section>
        <h3>2.1 Class Names in Combination</h3>
        <p>
          We can use a combination of different Bootstrap class names for each
          Bootstrap Grid Column.
        </p>
        <p>
          Each class controls how many columns the content should occupy at a
          specific breakpoint.
        </p>

        <p>Try using combinations such as:</p>

        <ul>
          <li>
            <code>col-lg-4</code>
          </li>
          <li>
            <code>col-lg-3</code>
          </li>
          <li>
            <code>col-lg-8</code>
          </li>
          <li>
            <code>col-md-6</code> + <code>col-lg-4</code>
          </li>
          <li>
            <code>col-sm-12</code> + <code>col-md-4</code> +{" "}
            <code>col-lg-3</code>
          </li>
        </ul>

        <p>
          These class combinations help control how the grid behaves on small,
          medium, and large screens.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="container">
  <div class="row">
    <div class="col-sm-12 col-md-6 col-lg-4 bg-light">Column A</div>
    <div class="col-sm-12 col-md-6 col-lg-3 bg-info">Column B</div>
    <div class="col-sm-12 col-lg-8 bg-warning">Column C</div>
  </div>
</div>`}
        />
      </section>

      <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />

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

export default Bootstrap_Grid_Sys_CS_1;
