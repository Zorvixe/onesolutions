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

  /*MCQ DATA*/
  const mcqs = [
    {
      id: "reusability_css",
      section: "Reusability of CSS Rulesets",
      question:
        "Can we write a CSS ruleset once and reuse it across multiple HTML elements?",
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
      question:
        "Bootstrap is a collection of reusable code snippets written in?",
      options: ["HTML, CSS, JavaScript", "Only CSS", "Python"],
      answer: "HTML, CSS, JavaScript",
      explanation:
        "Bootstrap contains ready-to-use components styled using HTML, CSS, and JS.",
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
      <h1>Introduction to Bootstrap | Cheat Sheet</h1>

      {/* 
             1. REUSABLE CSS RULESETS
      */}
      <section>
        <h2>1. Reusability of CSS Rulesets</h2>
        <p>
          If we want the same style for multiple HTML elements, we can write the
          CSS ruleset once and reuse it using class names.
        </p>
        <CodeBlock
          language="css"
          code={`.button {
  width: 138px;
  height: 36px;
  border-width: 0px;
  border-radius: 10px;
}`}
        />

        <CodeBlock
          language="html"
          code={`<button class="button">Explore Places</button>
<button class="button">Visit Now</button>`}
        />

        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/*   2. MULTIPLE CLASS NAMES */}
      <section>
        <h2>2. Multiple Class Names</h2>

        <p>
          We can provide multiple class names separated by space as a value to
          the HTML class attribute.
        </p>
        <b>Syntax:</b>
        <CodeBlock
          language="html"
          code={`<tag class = "name1 name2 name3 name4 ...">Content</tag>`}
        />
        <p>
          HTML attribute value: <code>name1 name2 name3</code>
        </p>
        <p>
          class names: <code>name1</code>, <code>name2</code>,{" "}
          <code>name3</code>, and <code>name4</code>
        </p>

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

        <CodeBlock
          language="html"
          code={`<button class="button button-green">Explore Places</button>`}
        />

        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/*   3. BOOTSTRAP INTRO */}
      <section>
        <h2>3. Bootstrap</h2>
        <p>
          Bootstrap is a large collection of predefined reusable code snippets
          like Buttons, Cards, Carousels, etc., written using HTML, CSS, and
          JavaScript.
        </p>

        <h3>3.1 How to use Bootstrap?</h3>

        <p>
          To use the Code Snippets provided by Bootstrap, we need to add the
          below piece of code within the HTML <code>head</code> element. We call
          it <b>BootstrapCDN</b>.
        </p>

        <CodeBlock
          language="html"
          code={`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>`}
        />

        <MCQBlock mcq={mcqs[2]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/*  4. BOOTSTRAP BUTTONS */}
      <section>
        <h2>3.2 Predefined Styles in Bootstrap</h2>

        {/* 3.2.1 Buttons */}
        <h3>3.2.1 Buttons</h3>
        <p>
          The Bootstrap class name <code>btn</code> is used to style the HTML{" "}
          <code>button</code> element.
        </p>

        <CodeBlock
          language="html"
          code={`<button class="btn btn-primary">Explore Places</button>
<button class="btn btn-secondary">Explore Places</button>
<button class="btn btn-success">Explore Places</button>
<button class="btn btn-danger">Explore Places</button>
<button class="btn btn-warning">Explore Places</button>
<button class="btn btn-info">Explore Places</button>`}
        />

        <p>
          Bootstrap provides us with different types of buttons. One of them is{" "}
          <b>outline buttons</b>, which don't have a background color.
        </p>
        <p>
          To add outline buttons in our HTML document, replace <code>btn</code>{" "}
          with <code>btn-outline</code>.
        </p>

        <CodeBlock
          language="html"
          code={`<button class="btn btn-outline-primary">Explore Places</button>
<button class="btn btn-outline-secondary">Explore Places</button>
<button class="btn btn-outline-success">Explore Places</button>
<button class="btn btn-outline-danger">Explore Places</button>
<button class="btn btn-outline-warning">Explore Places</button>
<button class="btn btn-outline-info">Explore Places</button>
<button class="btn btn-outline-light">Explore Places</button>`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            By default, the Bootstrap class name <b>btn</b> has no background
            color.
          </p>
        </div>

        {/* 3.2.2 Text Colors */}
        <h3>3.2.2 Text Colors</h3>
        <p>
          To apply different colors to text, Bootstrap provides the following
          class names:
        </p>

        <CodeBlock
          language="html"
          code={`<p class="text-primary">Explore Paradise</p>
<p class="text-secondary">Explore Paradise</p>
<p class="text-success">Explore Paradise</p>
<p class="text-danger">Explore Paradise</p>
<p class="text-warning">Explore Paradise</p>
<p class="text-info">Explore Paradise</p>
<p class="text-light">Explore Paradise</p>`}
        />

        {/* 3.2.3 Text Transform */}
        <h3>3.2.3 Text Transform</h3>
        <p>
          To apply different cases like uppercase or lowercase to the text,
          Bootstrap has the following class names:
        </p>

        <CodeBlock
          language="html"
          code={`<p class="text-uppercase">Discover the world's most beautiful destinations and create unforgettable memories</p>
<p class="text-capitalize">Discover the world's most beautiful destinations and create unforgettable memories</p>
<p class="text-lowercase">Discover the world's most beautiful destinations and create unforgettable memories</p>`}
        />

        {/* 3.2.4 Background Colors */}
        <h3>3.2.4 Background Colors</h3>
        <p>
          To apply different background colors to an HTML element, use these
          class names:
        </p>

        <CodeBlock
          language="html"
          code={`<div class="bg-primary"><p>Explore Paradise</p></div>
<div class="bg-secondary"><p>Explore Paradise</p></div>
<div class="bg-success"><p>Explore Paradise</p></div>
<div class="bg-danger"><p>Explore Paradise</p></div>
<div class="bg-warning"><p>Explore Paradise</p></div>
<div class="bg-info"><p>Explore Paradise</p></div>
<div class="bg-light"><p>Explore Paradise</p></div>`}
        />

        <h3>Using Predefined Bootstrap Classes</h3>
        <p>Bootstrap provides many utilities such as:</p>
        <ul>
          <li>card</li>
          <li>carousel</li>
          <li>alert</li>
          <li>alert-success</li>
          <li>alert-link</li>
          <li>bg-danger</li>
          <li>card-body</li>
          <li>and many more...</li>
        </ul>

        <div className="Warning-container">
          <div>
            <h5>
              <i class="bi bi-exclamation-triangle"></i>Warning
            </h5>
          </div>
          <p>
            Using predefined Bootstrap class names as selectors in your own CSS
            may give unexpected results.
          </p>
        </div>

        <h4>Do's</h4>

        <CodeBlock
          language="css"
          code={`.button {
  border-radius: 5px;
  height: 50px;
  width: 138px;
  background-color: blue;
  color: white;
}`}
        />

        <CodeBlock
          language="html"
          code={`<button class="button">Explore Places</button>`}
        />

        <h4>Don’ts</h4>

        <CodeBlock
          language="css"
          code={`.btn {
  border-radius: 5px;
  height: 50px;
  width: 138px;
  background-color: blue;
  color: white;
}`}
        />

        <CodeBlock
          language="html"
          code={`<button class="btn">Explore Places</button>`}
        />

        {/* MCQ */}
        <MCQBlock mcq={mcqs[3]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/*  WARNING */}
      <section>
        <div className="Warning-container">
          <div>
            <h5>
              <i class="bi bi-exclamation-triangle"></i>Warning
            </h5>
          </div>
          <p>
            Using Bootstrap class names as selectors inside your CSS may cause
            unexpected conflicts.
          </p>
        </div>
      </section>

      {/*    CONTINUE BUTTON */}
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

/*  REUSABLE MCQ COMPONENT */
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
