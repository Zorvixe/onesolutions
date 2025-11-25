import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Why_Chooseus_Section_CS = ({
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
      id: "padding_class",
      section: "Bootstrap Spacing",
      question:
        "Which Bootstrap class adds padding to all sides of an element?",
      options: ["m-3", "p-3", "pad-3", "space-3"],
      answer: "p-3",
      explanation:
        "The 'p-' prefix in Bootstrap stands for padding. p-3 applies padding on all four sides.",
    },
    {
      id: "padding_top",
      section: "Bootstrap Spacing",
      question: "How do you add padding only to the top of an element?",
      options: ["pt-*", "mt-*", "py-*", "top-padding-*"],
      answer: "pt-*",
      explanation:
        "pt- stands for padding-top. Example: pt-4 adds 1.5rem (24px) padding to the top.",
    },
    {
      id: "spacer_value",
      section: "Bootstrap Spacing Values",
      question:
        "What is the default Bootstrap spacer value (used in p-1, p-2, etc.)?",
      options: ["10px", "16px", "20px", "1rem"],
      answer: "16px",
      explanation:
        "Bootstrap uses a base spacer of 1rem (usually 16px). p-1 = 0.25rem (4px), p-3 = 1rem (16px), p-5 = 3rem (48px).",
    },
    {
      id: "span_element",
      section: "HTML Span",
      question: "What type of HTML element is <span> by default?",
      options: ["Block-level", "Inline", "Inline-block", "Flex"],
      answer: "Inline",
      explanation:
        "<span> is an inline element — it does not start on a new line and only takes up as much width as its content.",
    },
    {
      id: "span_usage",
      section: "HTML Span",
      question: "What is the most common use of the <span> element?",
      options: [
        "To create a new section",
        "To style a portion of text differently",
        "To group block elements",
        "To make elements responsive",
      ],
      answer: "To style a portion of text differently",
      explanation:
        "span is perfect for applying styles (color, font-weight, background, etc.) to specific words or phrases inside a paragraph.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Why Choose us Section | Cheat Sheet</h1>

      {/* 1. Bootstrap Spacing Utilities */}
      <section>
        <h2>1. Bootstrap Spacing Utilities</h2>

        <h3>1.1 Padding</h3>
        <p>Bootstrap class names for padding:</p>
        <table>
          <thead>
            <tr>
              <th>CSS Padding Property</th>
              <th>Bootstrap Class Name</th>
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
          The asterisk <code>*</code> symbol can be any number in the range of 0
          to 5. For example, <b>p-3, pr-1, pb-5,</b> etc.
        </p>

        <h3>1.1.1 Padding Values</h3>
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
              <td>0.25 × spacer</td>
            </tr>
            <tr>
              <td>2</td>
              <td>0.5 × spacer</td>
            </tr>
            <tr>
              <td>3</td>
              <td>1 × spacer</td>
            </tr>
            <tr>
              <td>4</td>
              <td>1.5 × spacer</td>
            </tr>
            <tr>
              <td>5</td>
              <td>3 × spacer</td>
            </tr>
          </tbody>
        </table>
        <p>
          Spacer = 16px by default. Examples: <code>p-1 = 4px</code>,{" "}
          <code>pt-4 = 24px</code>.
        </p>
      </section>

      {/* 2. HTML Elements */}
      <section>
        <h2>2. HTML Elements</h2>

        <h3>2.1 HTML Span Element</h3>
        <p>
          The <code>span</code> element is a generic inline container element
          which is mainly used for styling text in HTML Elements.
        </p>

        <CodeBlock
          language="html"
          code={`<p>This is a <span class="text-primary">highlighted</span> word.</p>`}
        />

        <CodeBlock
          language="css"
          code={`.text-primary {
  color: blue;
  font-weight: bold;
}`}
        />
      </section>

      {/* MCQs - CLEAN, CONSISTENT, AND EDUCATIONAL */}
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

export default Why_Chooseus_Section_CS;
