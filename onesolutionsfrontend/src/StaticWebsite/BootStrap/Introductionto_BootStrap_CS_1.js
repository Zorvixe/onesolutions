import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Introductionto_BootStrap_CS_1 = ({
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
      MCQ DATA
  ----------------------------------------------------*/
  const mcqs = [
    {
      id: "reusability_css",
      section: "Reusability of CSS Rulesets",
      question: "Can we write a CSS ruleset once and reuse it across multiple HTML elements?",
      options: ["Yes", "No"],
      answer: "Yes",
      explanation:
        "CSS class selectors allow a single ruleset to be reused by multiple elements.",
    },
    {
      id: "multiple_classes",
      section: "Multiple Class Names",
      question: "Which is the correct way to assign multiple class names?",
      options: [
        `<div class="name1 name2 name3">`,
        `<div class="name1,name2,name3">`,
        `<div class="name1;name2;name3">`,
        `<div class="name1|name2|name3">`,
      ],
      answer: `<div class="name1 name2 name3">`,
      explanation:
        "Multiple class names must be separated by spaces inside the class attribute.",
    },
    {
      id: "bootstrap_definition",
      section: "Bootstrap Introduction",
      question: "Bootstrap is a collection of reusable code snippets written in?",
      options: ["HTML, CSS, JavaScript", "Only CSS", "Python"],
      answer: "HTML, CSS, JavaScript",
      explanation: "Bootstrap contains ready-to-use components styled using HTML, CSS, and JS.",
    },
    {
      id: "bootstrap_btn_class",
      section: "Bootstrap Buttons",
      question: "Which class styles a button in Bootstrap?",
      options: ["button", "btn", "class-btn", "button-style"],
      answer: "btn",
      explanation:
        "Bootstrap uses the `btn` class with variations like `btn-primary`, `btn-success`.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Introduction to Bootstrap - Cheat Sheet</h1>

      {/* -----------------------------------------
             1. REUSABLE CSS RULESETS
      ------------------------------------------*/}
      <section>
        <h2>1. Reusability of CSS Rulesets</h2>
        <p>
          If we want the same style for multiple HTML elements, we can write the CSS ruleset once
          and reuse it using class names.
        </p>

        <CodeBlock
          language="html"
          code={`<button class="button">Get Started</button>
<button class="button">Visit Now</button>`}
        />

        <CodeBlock
          language="css"
          code={`.button {
  width: 138px;
  height: 36px;
  border-width: 0px;
  border-radius: 10px;
}`}
        />

        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* -----------------------------------------
             2. MULTIPLE CLASS NAMES
      ------------------------------------------*/}
      <section>
        <h2>2. Multiple Class Names</h2>

        <p>Multiple class names can be given by separating them using a space.</p>

        <CodeBlock
          language="html"
          code={`<button class="button button-green">Get Started</button>`}
        />

        <CodeBlock
          language="css"
          code={`.button {
  width: 138px;
  height: 36px;
  border-width: 0px;
  border-radius: 10px;
}
.button-green {
  background-color: #8cc63f;
}`}
        />

        <ul>
          <li>HTML attribute value: name1 name2 name3</li>
          <li>Class names: name1, name2, name3</li>
        </ul>

        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* -----------------------------------------
             3. BOOTSTRAP INTRO
      ------------------------------------------*/}
      <section>
        <h2>3. Bootstrap</h2>
        <p>
          Bootstrap is a large collection of predefined reusable code snippets like Buttons,
          Cards, Carousels, etc., written using HTML, CSS, and JavaScript.
        </p>

        <h3>3.1 How to use Bootstrap?</h3>

        <p>Add the BootstrapCDN links inside the &lt;head&gt; element.</p>

        <CodeBlock
          language="html"
          code={`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>`}
        />

        <MCQBlock mcq={mcqs[2]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* -----------------------------------------
             4. BOOTSTRAP BUTTONS
      ------------------------------------------*/}
      <section>
        <h2>3.2 Predefined Styles in Bootstrap</h2>

        <h3>3.2.1 Buttons</h3>
        <p>
          The Bootstrap class <code>btn</code> is used to style button elements.
        </p>

        <CodeBlock
          language="html"
          code={`<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-success">Success Button</button>`}
        />

        <p>
          Bootstrap provides us with different types of buttons. One of them is outline buttons, which don't have a background color..
          
        </p>
        <p>To add the outline buttons in our HTML document, just replace btn in the above class names with the btn-outline.</p>

        <CodeBlock
          language="html"
          code={`<button class="btn btn-outline-primary">Outline Button</button>`}
        />

        <div className="Note-container">
          <h6>Note:</h6>
          <p>By default, Bootstrap class name <b>btn</b> has no background color.</p>
        </div>

        <MCQBlock mcq={mcqs[3]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* -----------------------------------------
             WARNING
      ------------------------------------------*/}
      <section>
        <h5>Warning</h5>
        <p className="warning">
          Using Bootstrap class names as selectors inside your CSS may cause unexpected conflicts.
        </p>
      </section>

      {/* -----------------------------------------
             CONTINUE BUTTON
      ------------------------------------------*/}
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
      REUSABLE MCQ COMPONENT
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

export default Introductionto_BootStrap_CS_1;
