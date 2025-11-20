import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Introductionto_BootStrap_CS_2 = ({
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

  /* ---------------------------------------------------
      MCQ DATA - Bootstrap Flexbox
  ----------------------------------------------------*/
  const mcqs = [
    {
      id: "flex_container",
      section: "Flexbox Container",
      question: "Which Bootstrap class name defines a Flexbox Container?",
      options: ["flex", "d-flex", "flexbox-container", "flexbox"],
      answer: "d-flex",
      explanation:
        "The class `d-flex` turns an element into a flex container, enabling flexbox layout for its direct children.",
    },
    {
      id: "flex_direction_horizontal",
      section: "Flex Direction",
      question: "Which Bootstrap class name will move the flex items horizontally?",
      options: ["flex-vertical", "flex-horizontal", "flex-column", "flex-row"],
      answer: "flex-row",
      explanation:
        "`flex-row` is the default direction in Bootstrap flexbox and arranges items horizontally from left to right.",
    },
    {
      id: "justify_content_start",
      section: "Justify Content",
      question:
        "Which Bootstrap class aligns the flex items at the start of a Flexbox Container?",
      options: [
        "justify-content-center",
        "justify-content-end",
        "justify-content-start",
        "justify-content-between",
      ],
      answer: "justify-content-start",
      explanation:
        "`justify-content-start` packs flex items toward the start of the main axis (left for row, top for column).",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Introduction to Bootstrap | Cheat Sheet | Part 2</h1>

      {/* ========================================= */}
      {/* 1. Flexbox Container */}
      {/* ========================================= */}
      <section>
        <h2>1. Flexbox Container</h2>
        <p>
          The Bootstrap class <code>d-flex</code> defines a Flexbox Container.
          Direct children of this container become <strong>flex items</strong>.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="d-flex">
  <div>
    <h1>Tourism</h1>
    <p>Plan your trip.</p>
    <button>Get Started</button>
  </div>
</div>`}
        />

        <ul>
          <li>
            The element with <code>class="d-flex"</code> is the Flexbox Container.
          </li>
          <li>
            Only direct children (like the inner <code>div</code>) are flex items.
          </li>
          <li>
            Elements nested deeper (like <code>h1</code>, <code>p</code>,{" "}
            <code>button</code>) are <strong>not</strong> flex items.
          </li>
        </ul>

        <div className="Note-container">
          <h6>Note:</h6>
          <p>
            Wrapping elements in a <code>d-flex</code> container is required to
            use any other Bootstrap flex utilities.
          </p>
        </div>

        <MCQBlock
          mcq={mcqs[0]}
          answers={mcqAnswers}
          onAnswer={handleAnswer}
        />
      </section>

      {/* ========================================= */}
      {/* 2. Flex Direction */}
      {/* ========================================= */}
      <section>
        <h2>2. Flex Direction</h2>
        <p>
          Flex Direction controls the main axis along which flex items are
          placed in the container.
        </p>

        <table style={{ width: "70%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Direction</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>flex-row</code>
              </td>
              <td>Left → Right (default)</td>
            </tr>
            <tr>
              <td>
                <code>flex-column</code>
              </td>
              <td>Top → Bottom</td>
            </tr>
          </tbody>
        </table>

        <h3>2.1 flex-row (Default)</h3>
        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-row">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}
        />

        <h3>2.2 flex-column</h3>
        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-column">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}
        />

        <div className="Note-container">
          <h6>Note:</h6>
          <p>
            <code>flex-row</code> is the default direction — you often only need{" "}
            <code>d-flex</code> for horizontal layout.
          </p>
        </div>

        <MCQBlock
          mcq={mcqs[1]}
          answers={mcqAnswers}
          onAnswer={handleAnswer}
        />
      </section>

      {/* ========================================= */}
      {/* 3. Justify Content */}
      {/* ========================================= */}
      <section>
        <h2>3. Justify Content</h2>
        <p>
          <code>justify-content</code> classes distribute flex items along the{" "}
          <strong>main axis</strong> (horizontal for row, vertical for column).
        </p>

        <table style={{ width: "80%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Class</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>justify-content-start</code>
              </td>
              <td>Items packed to the start (left/top)</td>
            </tr>
            <tr>
              <td>
                <code>justify-content-center</code>
              </td>
              <td>Items centered</td>
            </tr>
            <tr>
              <td>
                <code>justify-content-end</code>
              </td>
              <td>Items packed to the end (right/bottom)</td>
            </tr>
            <tr>
              <td>
                <code>justify-content-between</code>
              </td>
              <td>Equal space between items</td>
            </tr>
          </tbody>
        </table>

        <h3>Examples</h3>
        <CodeBlock
          language="html"
          code={`<!-- Start --><div class="d-flex justify-content-start">...</div>
<!-- Center --><div class="d-flex justify-content-center">...</div>
<!-- End --><div class="d-flex justify-content-end">...</div>
<!-- Space Between --><div class="d-flex justify-content-between">...</div>`}
        />

        <MCQBlock
          mcq={mcqs[2]}
          answers={mcqAnswers}
          onAnswer={handleAnswer}
        />
      </section>

      {/* ========================================= */}
      {/* Continue Button */}
      {/* ========================================= */}
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

/* -----------------------------------------------
      REUSABLE MCQ COMPONENT (Same as Part 1)
------------------------------------------------*/
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

export default Introductionto_BootStrap_CS_2;