import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Introductionto_Responsive_WD_CS = ({
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
      id: "bootstrap_columns",
      section: "Bootstrap Grid System",
      question: "How many columns does the Bootstrap Grid System use?",
      options: ["6", "8", "12", "24"],
      answer: "12",
      explanation:
        "Bootstrap grid system is based on 12 equal-width columns for responsive layouts.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Introduction to Responsive Web Design | Cheat Sheet</h1>

      {/* 1. BOOTSTRAP GRID SYSTEM */}
      <section>
        <h2>1. Bootstrap Grid System</h2>

        <p>
          Bootstrap Grid System is a collection of reusable code snippets to
          create responsive layouts. It is made up of <b>containers</b>,{" "}
          <b>rows</b>, and
          <b>columns</b>.
        </p>

        <p>
          It uses a <b>12-column layout system</b>. We can create up to 12
          columns across the page.
        </p>

        <h3>1.1 Container</h3>

        <p>The purpose of a container is to hold rows and columns.</p>

        <CodeBlock language="html" code={`<div class="container"></div>`} />

        <p>
          Here, the container is a <code>div</code> element with the Bootstrap
          class name <code>container</code>.
        </p>

        <h3>1.2 Row</h3>

        <p>The purpose of a row is to wrap all the columns.</p>

        <CodeBlock
          language="html"
          code={`<div class="container">
  <div class="row"></div>
</div>`}
        />

        <p>
          Here, the row is a <code>div</code> element with the Bootstrap class
          name <code>row</code>.
        </p>

        <h3>1.3 Column</h3>

        <p>We place columns inside a row and the content inside a column. </p>
        <p>
          We can specify the number of columns our content should occupy on any
          device.The number of columns we specify should be a number in the
          range of <code>1</code> to <code>12</code>.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="container">
  <div class="row">
    <div class="col-12">
      I'm your content inside the grid!
    </div>
  </div>
</div>`}
        />
        <p>
          Here, the column is a <code>div</code> element with the Bootstrap
          class name <code>col-12</code>.{" "}
        </p>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            If Bootstrap class name is <b>col-12</b>, it occupies the entire
            width available inside the row.
          </p>
        </div>

        {/* MCQ Block Placeholder */}
        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>
      <section>
        <h2>2. Creating Multiple Column Layouts</h2>

        <p>
          The layout shown in the Code Playground below is a{" "}
          <b>Two Column Layout</b>. You can use Bootstrap’s Grid System to
          easily create different column structures like:
        </p>

        <ul>
          <li>One Column Layout</li>
          <li>Two Column Layout</li>
          <li>Three Column Layout</li>
          <li>Four or More Columns</li>
        </ul>

        <p>
          Try creating different column combinations by adjusting the
          <code>col-*</code> class values inside the <code>row</code> element.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="container">
  <div class="row">
    <div class="col-6 bg-light">Column 1</div>
    <div class="col-6 bg-secondary text-white">Column 2</div>
  </div>
</div>`}
        />

        <p>
          You can modify the <code>col-*</code> class names to build layouts
          like:
        </p>

        <CodeBlock
          language="html"
          code={`<!-- One Column Layout -->
<div class="row">
  <div class="col-12">Full Width Column</div>
</div>

<!-- Three Column Layout -->
<div class="row">
  <div class="col-4">Column 1</div>
  <div class="col-4">Column 2</div>
  <div class="col-4">Column 3</div>
</div>`}
        />

        {/* MCQ Block Placeholder */}
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

export default Introductionto_Responsive_WD_CS;
