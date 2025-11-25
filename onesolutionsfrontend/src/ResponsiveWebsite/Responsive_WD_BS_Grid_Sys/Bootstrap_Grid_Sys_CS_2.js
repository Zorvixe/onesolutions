import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Bootstrap_Grid_Sys_CS_2 = ({
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
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------- MCQ DATA (Your Exact Questions) -------------------- */
  const mcqs = [
    {
      id: "css_margin_1",
      section: "CSS Box Properties",
      question: "Which CSS property is used to get spacing between elements?",
      options: ["padding", "margin", "border", "spacing"],
      answer: "margin",
      explanation: "The margin property creates space around elements.",
    },
    {
      id: "bs_margin_1",
      section: "Bootstrap Spacing Utilities",
      question: "What Bootstrap class is used for top margin?",
      options: ["mt-*", "mb-*", "m-*", "ml-*"],
      answer: "mt-*",
      explanation: "mt-* is used for margin-top in Bootstrap.",
    },
    {
      id: "bs_padding_1",
      section: "Bootstrap Spacing Utilities",
      question: "What Bootstrap class is used for left padding?",
      options: ["pl-*", "pr-*", "pt-*", "pb-*"],
      answer: "pl-*",
      explanation: "pl-* applies left padding.",
    },
    {
      id: "bs_bgcolor_1",
      section: "Bootstrap Background Utilities",
      question: "Which Bootstrap class applies a primary background color?",
      options: ["bg-primary", "text-primary", "p-2", "bg-success"],
      answer: "bg-primary",
      explanation: "bg-primary applies the primary color background.",
    },
    {
      id: "bs_palette_1",
      section: "Bootstrap Color Palette",
      question:
        "Bootstrap provides background color utilities for which elements?",
      options: ["Only text", "Only divs", "All HTML elements", "Only buttons"],
      answer: "All HTML elements",
      explanation:
        "Bootstrap background utility classes can be applied to any HTML element.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Bootstrap Grid System | Cheat Sheet | Part 2</h1>

      {/* 1. CSS Box Properties */}
      <section>
        <h2>1. CSS Box Properties</h2>

        <h3>1.1 Margin</h3>
        <p>
          We can get spacing between two HTML elements with the CSS Box property{" "}
          <code>margin</code>.
        </p>
        <p>
          To get space only on one side, we use{" "}
          <strong>Margin Variants:</strong>
        </p>

        <ul>
          <li>margin-top</li>
          <li>margin-right</li>
          <li>margin-bottom</li>
          <li>margin-left</li>
        </ul>

        <p>Try changing the Margin Variants in the Code Playground.</p>

        <CodeBlock
          language="css"
          code={`div {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
}`}
        />

        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 2. Bootstrap Spacing Utilities */}
      <section>
        <h2>2. Bootstrap Spacing Utilities</h2>

        <h3>2.1 Margin</h3>
        <p>Bootstrap class names for margin:</p>

        <table>
          <thead>
            <tr>
              <th>CSS Margin Property</th>
              <th>Bootstrap Class Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>margin</td>
              <td>m-*</td>
            </tr>
            <tr>
              <td>margin-top</td>
              <td>mt-*</td>
            </tr>
            <tr>
              <td>margin-right</td>
              <td>mr-*</td>
            </tr>
            <tr>
              <td>margin-bottom</td>
              <td>mb-*</td>
            </tr>
            <tr>
              <td>margin-left</td>
              <td>ml-*</td>
            </tr>
          </tbody>
        </table>
        <p>
          The asterisk (<code>*</code>) symbol can be any number in the range of
          0 to 5. For example,<code>m-5</code>, <code>mr-2</code>,{" "}
          <code>mb-3</code>, etc.
        </p>

        <h3>2.1.1 Margin Values</h3>

        <table>
          <thead>
            <tr>
              <th>Size</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>1</td>
              <td>0.25 * spacer</td>
            </tr>
            <tr>
              <td>2</td>
              <td>0.5 * spacer</td>
            </tr>
            <tr>
              <td>3</td>
              <td>1 * spacer</td>
            </tr>
            <tr>
              <td>4</td>
              <td>1.5 * spacer</td>
            </tr>
            <tr>
              <td>5</td>
              <td>3 * spacer</td>
            </tr>
          </tbody>
        </table>

        <p>
          The <b>spacer</b> is a variable and has a value of 16 pixels by
          default.
        </p>
        <p>For Example:</p>
        <ul>
          <li>
            <code>mb-3</code> = 1 * 16px = 16px
          </li>
          <li>
            <code>m-5</code> = 3 * 16px = 48px
          </li>
        </ul>
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            Avoid using CSS <b>margin-left</b> and <b>margin-right</b>{" "}
            properties for <b>Bootstrap Grid Columns</b>. It disturbs the
            Bootstrap Grid System and gives unexpected results.
          </p>
        </div>

        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />

        <h3>2.2 Padding</h3>

        <table>
          <thead>
            <tr>
              <th>CSS Padding Property</th>
              <th>Bootstrap Class</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>padding</td>
              <td>p-*</td>
            </tr>
            <tr>
              <td>padding-top</td>
              <td>pt-*</td>
            </tr>
            <tr>
              <td>padding-right</td>
              <td>pr-*</td>
            </tr>
            <tr>
              <td>padding-bottom</td>
              <td>pb-*</td>
            </tr>
            <tr>
              <td>padding-left</td>
              <td>pl-*</td>
            </tr>
          </tbody>
        </table>
        <p>
          The asterisk (<code>*</code>) symbol can be any number in the range of
          0 to 5. For example, <code>p-3</code>, <code>pr-1</code>,{" "}
          <code>pb-5</code>, etc.
        </p>
        <p>
          The<b> spacer</b> is a variable and has a value of 16 pixels by
          default.
        </p>
        <p>For Example:</p>
        <ul>
          <li>
            <code>p-1</code> = 0.25 * 16px = 4px
          </li>
          <li>
            <code>pt-4</code> = 1.5 * 16px = 24px
          </li>
        </ul>

        <MCQBlock mcq={mcqs[2]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 3. Background Utilities */}
      <section>
        <h2>3. Bootstrap Background Color Utilities</h2>
        <p>
          Bootstrap provides a set of predefined utility classes to quickly
          apply background colors to any HTML element.
        </p>{" "}
        <p>
          These classes help you style sections, cards, buttons, and containers
          without writing custom CSS.
        </p>
        <CodeBlock
          language="html"
          code={`<div class="bg-primary text-white p-2">Primary Background</div>
<div class="bg-success text-white p-2">Success Background</div>`}
        />
        <MCQBlock mcq={mcqs[3]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 4. Color Palette */}
      <section>
        <h2>4.Color Palette</h2>
        <p>
          The Bootstrap <b>Color Palette</b> provides a consistent set of colors
          that you can use across backgrounds, borders, buttons, and text. These
          predefined theme colors help you maintain a professional and uniform
          design without needing custom CSS.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="bg-primary">Primary</div>
<div class="bg-secondary">Secondary</div>
<div class="bg-success">Success</div>`}
        />

        <MCQBlock mcq={mcqs[4]} answers={mcqAnswers} onAnswer={handleAnswer} />
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

/* -------------------- INTERNAL MCQ BLOCK (NO IMPORT NEEDED) -------------------- */
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

export default Bootstrap_Grid_Sys_CS_2;
