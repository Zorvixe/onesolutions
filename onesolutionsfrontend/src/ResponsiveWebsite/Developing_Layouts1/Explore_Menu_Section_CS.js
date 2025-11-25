import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Explore_Menu_Section_CS = ({
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
        console.log("Cheat sheet marked as completed");
      } else {
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------- MCQ DATA -------------------- */
  const mcqs = [
    {
      id: "percentage_unit",
      section: "CSS Percentage Units",
      question: "What does width: 50% mean for a child element?",
      options: [
        "50% of the viewport width",
        "50% of the parent's width",
        "50px fixed width",
        "50% of the height",
      ],
      answer: "50% of the parent's width",
      explanation:
        "Percentage values in CSS are always relative to the parent element's corresponding dimension.",
    },
    {
      id: "bootstrap_width",
      section: "Bootstrap Sizing",
      question: "Which Bootstrap class makes an element take full width?",
      options: ["w-100", "w-full", "width-100", "full-width"],
      answer: "w-100",
      explanation:
        "w-100 applies width: 100% — perfect for full-width buttons, cards, or containers.",
    },
    {
      id: "bootstrap_icons",
      section: "Bootstrap Icons",
      question: "Where do you officially get Bootstrap Icons from?",
      options: [
        "https://icons.getbootstrap.com",
        "https://fontawesome.com",
        "https://iconbootstrap.com",
        "CDN only, no official site",
      ],
      answer: "https://icons.getbootstrap.com",
      explanation:
        "The official Bootstrap Icons library is hosted at https://icons.getbootstrap.com — free and open-source.",
    },
    {
      id: "svg_fill",
      section: "Bootstrap Icons",
      question:
        "Which SVG attribute lets icons inherit the current text color?",
      options: ["color", "fill", "stroke", "inherit-color"],
      answer: "fill",
      explanation:
        'Using fill="currentColor" makes the icon automatically match the parent\'s color (e.g., text-white, text-primary).',
    },
    {
      id: "shadow_class",
      section: "Bootstrap Shadows",
      question: "Which class removes all shadow from an element?",
      options: ["shadow-none", "no-shadow", "shadow-0", "shadow-off"],
      answer: "shadow-none",
      explanation:
        "shadow-none explicitly removes any box-shadow, useful when overriding default card shadows.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Explore Menu Section | Cheat Sheet</h1>

      {/* 1. CSS Units */}
      <section>
        <h2>1. CSS Units</h2>
        <h3>1.1 Percentage</h3>
        <p>
          To define the size of a child element relative to its parent, we can
          use percentages.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="parent" style="width: 400px; background-color: #f0f0f0;">
  <div class="child" style="width: 50%; background-color: #007bff; color: white;">
    50% Width
  </div>
</div>`}
        />

        <CodeBlock
          language="css"
          code={`.parent {
  height: 100px;
}

.child {
  height: 100%;
}`}
        />
      </section>

      {/* 2. Bootstrap Sizing Utilities */}
      <section>
        <h2>2. Bootstrap Sizing Utilities</h2>
        <h3>2.1 Percentage Width</h3>
        <p>
          You can use the below Bootstrap class names to specify the width of an
          HTML element in percentage.
        </p>
        <table>
          <thead>
            <tr>
              <th>CSS Property & Value</th>
              <th>Bootstrap Class Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>width: 25%</td>
              <td>w-25</td>
            </tr>
            <tr>
              <td>width: 50%</td>
              <td>w-50</td>
            </tr>
            <tr>
              <td>width: 75%</td>
              <td>w-75</td>
            </tr>
            <tr>
              <td>width: 100%</td>
              <td>w-100</td>
            </tr>
          </tbody>
        </table>
        <p>
          <b>Note: </b> Height adjusts automatically when width changes.
        </p>
      </section>

      {/* 3. Bootstrap Icons */}
      <section>
        <h2>3. Bootstrap Icons</h2>
        <h3>3.1 How to add the Bootstrap Icons</h3>
        <p>Follow the steps below to add Bootstrap Icons to your project:</p>

        <ul>
          <li>
            Go to
            <a
              href="https://icons.getbootstrap.com"
              target="_blank"
              rel="noopener"
            >
              https://icons.getbootstrap.com
            </a>
            in your web browser. You will find many icons available.
          </li>
          <li>
            Click on the icon you need. For example, to use the icon in this
            section, click on
            <strong>arrow-right-short</strong>.
          </li>
          <li>
            Copy the HTML code provided for the icon and paste it into your HTML
            file.
          </li>
          <li>
            Adjust the HTML attributes such as <strong>width</strong>,{" "}
            <strong>height</strong>, and <strong>fill</strong> of the{" "}
            <strong>&lt;svg&gt;</strong> element as needed.
          </li>
        </ul>

        <CodeBlock
          language="html"
          code={`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8.146 12.354a.5.5 0 0 1 0-.708L10.793 9H1.5a.5.5 0 0 1 0-1h9.293L8.146 4.354a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708 0z"/>
</svg>`}
        />
        <p className="note">
          The <code>svg</code> element is an inline HTML element that can be
          used for icons.
        </p>
      </section>

      {/* 4. Bootstrap Utilities */}
      <section>
        <h2>4. Bootstrap Utilities</h2>
        <h3>4.1 Shadow</h3>
        <p>Bootstrap class names to apply shadow to elements:</p>
        <ul>
          <li>shadow-none</li>
          <li>shadow-sm</li>
          <li>shadow</li>
          <li>shadow-lg</li>
        </ul>

        <CodeBlock
          language="html"
          code={`<div class="shadow p-3 mb-3 bg-light rounded">Default Shadow</div>
<div class="shadow-lg p-3 mb-3 bg-light rounded">Large Shadow</div>`}
        />
      </section>

      {/* MCQs - CLEAN & CONSISTENT */}
      <section>
        <h3>MCQs</h3>
        {mcqs.map((mcq) => (
          <MCQBlock
            key={mcq.id}
            mcq={mcq}
            answers={mcqAnswers}
            onAnswer={handleAnswer}
          />
        ))}
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
            ? "Completed"
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

export default Explore_Menu_Section_CS;
