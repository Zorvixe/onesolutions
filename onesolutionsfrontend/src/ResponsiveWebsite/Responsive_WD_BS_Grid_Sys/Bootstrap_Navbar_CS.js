import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Bootstrap_Navbar_CS = ({
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
      id: "navbar_element",
      section: "Navbar Container",
      question: "Which HTML element is used as a container for a Navbar?",
      options: ["div", "nav", "header", "section"],
      answer: "nav",
      explanation:
        "The <nav> element is specifically designed for navigation sections, making it the appropriate container for a Navbar.",
    },
    {
      id: "block_level_element",
      section: "Block-level Elements",
      question: "Which of these is a block-level element?",
      options: ["div", "img", "a", "span"],
      answer: "div",
      explanation:
        "The <div> element is a block-level element that starts on a new line and takes up the full width available.",
    },
    {
      id: "css_margin_auto",
      section: "CSS Margin Auto",
      question: "What does 'margin: 0 auto;' do?",
      options: [
        "Aligns element to left",
        "Aligns element to right",
        "Centers element horizontally",
        "Aligns element to top",
      ],
      answer: "Centers element horizontally",
      explanation:
        "The 'margin: 0 auto;' declaration sets the top and bottom margins to 0 and the left and right margins to auto, which centers the element horizontally within its parent.",
    },
    {
      id: "bs_margin_auto",
      section: "Bootstrap Margin Auto",
      question: "Which Bootstrap class centers an element horizontally?",
      options: ["m-0", "m-auto", "ml-5", "mr-5"],
      answer: "m-auto",
      explanation:
        "The 'm-auto' class in Bootstrap applies auto margins, which centers the element horizontally.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Bootstrap Navbar | Cheat Sheet</h1>

      {/* 1. Bootstrap Components */}
      <section>
        <h2>1. Bootstrap Components</h2>
        <h3>1.1 Navbar</h3>
        <p>
          A Navbar is a navigation header placed at the top of the page. With
          Bootstrap, a Navbar can extend or collapse depending on the device
          size.
        </p>

        <h3>1.1.1 HTML Nav element</h3>
        <p>
          The HTML <code>nav</code> element is a container element similar to
          the HTML <code>div</code>
          element. We use the HTML <code>nav</code> element to add a Navbar to
          our website.
        </p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar navbar-expand-lg navbar-light bg-light"></nav>`}
        />

        <h3>1.1.2 Nav Items inside Navbar</h3>
        <CodeBlock
          language="html"
          code={`<ul class="navbar-nav">
  <li class="nav-item">Home</li>
  <li class="nav-item">About</li>
</ul>`}
        />

        <h3>1.1.3 Nav link</h3>
        <CodeBlock
          language="html"
          code={`<a class="nav-link" href="#">Home</a>`}
        />

        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 2. HTML Elements */}
      <section>
        <h2>2. HTML Elements</h2>
        <p>HTML elements can be divided into two categories:</p>
        <ul>
          <li>Block-level Elements</li>
          <li>Inline Elements</li>
        </ul>

        <h3>2.1 Block-level Elements</h3>
        <p>
          These elements always start in a new line and take up the{" "}
          <b>full width </b>
          available. So, an HTML Block-level element occupies the entire
          horizontal space of its parent element.
        </p>
        <p>
          {" "}
          <b>Example: </b> <code>h1</code>, <code>p</code>, <code>div</code>
        </p>
        <CodeBlock
          language="html"
          code={`<h1 class="heading">The seven wonders of the world</h1>
<p class="paragraph">The Taj Mahal is one of the seven wonders of the world</p>`}
        />

        <h3>2.2 Inline Elements</h3>
        <p>
          Inline elements do not start in a new line and take only as much width
          as necessary.{" "}
        </p>
        <p>
          Example: <code>button</code>, <code>img</code>, <code>a</code>
        </p>
        <CodeBlock
          language="html"
          code={`<img
  src="https://d2clawv67efefq.cloudfront.net/ccbp-static-website/mysore-palace2-img.png"
  class="image"
/>
<img
  src="https://d2clawv67efefq.cloudfront.net/ccbp-static-website/varanasi1-img.png"
  class="image"
/>`}
        />

        <CodeBlock
          language="html"
          code={`<p class="paragraph">
  The <a class="link-text" href="https://en.wikipedia.org/wiki/Taj_Mahal">Taj Mahal</a>
  is one of the seven wonders of the world.
</p>`}
        />

        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 3. CSS Box properties */}
      <section>
        <h2>3. CSS Box Properties</h2>
        <h3>3.1 Margin</h3>
        <p>
          We can align HTML Block-level elements horizontally using CSS{" "}
          <code>margin</code>
          property.
        </p>
        <p>
          Apart from values that are specified in pixels, it also accepts{" "}
          <code>auto</code> keyword as a value.
        </p>
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            If we specify the CSS <b>text-align</b> property to the HTML
            Block-level element, it aligns the text or HTML Inline elements
            inside it.
          </p>
        </div>

        <h3>3.1.1 Auto Value</h3>
        <p>
          The child element will be horizontally centred inside the HTML
          container element.
        </p>
        <CodeBlock
          language="css"
          code={`div {
  margin: 0 auto; /* centers element horizontally */
}`}
        />

        <h3>3.1.2 Auto Value with Margin Variants</h3>
        <p>
          Using <code>auto</code> as a value for the CSS <b>margin-right</b>{" "}
          property takes up all the available space, and the element gets
          aligned to the left.
        </p>
        <p>
          Using <code>auto</code> as a value for the CSS <b>margin-left</b>{" "}
          property takes up all the available space, and the element gets
          aligned to the right.
        </p>

        <CodeBlock
          language="css"
          code={`div.left-align {
  margin-right: auto;
}

div.right-align {
  margin-left: auto;
}`}
        />

        <MCQBlock mcq={mcqs[2]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 4. Bootstrap Utilities */}
      <section>
        <h2>4. Bootstrap Utilities</h2>
        <h3>4.1 Margin</h3>
        <p>
          Bootstrap also provides <code>m-auto</code>, <code>ml-auto</code>,{" "}
          <code>mr-auto</code>
          for auto margins.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="m-auto">Centered using Bootstrap</div>`}
        />

        <MCQBlock mcq={mcqs[3]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 5. Step by Step Process to build a Navbar */}
      <section>
        <h2>5. Step by Step Process to build a Navbar</h2>
        <ul>
          <li>
            <b>Step-1: </b>Adding Bootstrap Navbar Component
          </li>
          <li>
            <b>Step-2: </b>Adding Logo
          </li>
          <li>
            <b>Step-3: </b>Aligning Nav Items
          </li>
          <li>
            <b>Step-4: </b>Changing Navbar Background color
          </li>
        </ul>

        <CodeBlock
          language="html"
          code={`<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="#">Logo</a>
  <ul class="navbar-nav ml-auto">
    <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="#">About</a></li>
  </ul>
</nav>`}
        />
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

export default Bootstrap_Navbar_CS;
