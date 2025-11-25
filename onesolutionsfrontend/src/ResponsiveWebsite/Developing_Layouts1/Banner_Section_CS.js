import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock } from "../../CodeOutputBlocks";

const Banner_Section_CS = ({ subtopicId, goalName, courseName, subtopic }) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});

  // Check if subtopic is already completed
  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleAnswer = (question, option) => {
    setMcqAnswers((prev) => ({ ...prev, [question]: option }));
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
        console.log("✅ Cheat sheet marked as completed");
      } else {
        console.error(
          "❌ Failed to mark cheat sheet complete:",
          result.message
        );
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      console.error("❌ Failed to mark cheat sheet complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const mcqs = [
    {
      id: "navbar_toggler",
      section: "Bootstrap Navbar",
      question: "What is the purpose of the navbar-toggler button?",
      options: [
        "To change navbar color",
        "To show/hide the menu on small screens",
        "To make the navbar sticky",
        "To add a logo",
      ],
      answer: "To show/hide the menu on small screens",
      explanation:
        "The toggler button appears on mobile devices and collapses/expands the navigation links.",
    },
    {
      id: "container_vs_fluid",
      section: "Bootstrap Containers",
      question:
        "What is the main difference between container and container-fluid?",
      options: [
        "container has fixed width, container-fluid is full width",
        "container is for images only",
        "container-fluid has padding, container does not",
        "They are exactly the same",
      ],
      answer: "container has fixed width, container-fluid is full width",
      explanation:
        "container has max-width at each breakpoint; container-fluid always spans 100% of the viewport width.",
    },
    {
      id: "container_breakpoint",
      section: "Container Breakpoints",
      question: "At what screen size does .container become 1140px wide?",
      options: ["≥576px", "≥768px", "≥992px", "≥1200px"],
      answer: "≥1200px",
      explanation:
        "Extra Large (xl) breakpoint starts at 1200px → container max-width becomes 1140px.",
    },
    {
      id: "bg_transparent",
      section: "CSS Colors",
      question:
        "Which Bootstrap class makes an element's background fully transparent?",
      options: ["bg-none", "bg-transparent", "transparent-bg", "bg-clear"],
      answer: "bg-transparent",
      explanation:
        "bg-transparent applies background-color: transparent; to any element.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Banner Section | Cheat Sheet</h1>

      {/* 1. Bootstrap Navbar */}
      <section>
        <h2>1. Bootstrap Navbar</h2>
        <p>
          The Navbar is a navigation header at the top of the page. It can
          extend or collapse depending on device size.
        </p>
        <p>
          Below is a Bootstrap Navbar example without a list-based approach:
        </p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Brand</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <div class="navbar-nav">
      <a class="nav-link active" href="#">Home</a>
      <a class="nav-link" href="#">About</a>
      <a class="nav-link" href="#">Contact</a>
    </div>
  </div>
</nav>`}
        />
      </section>

      {/* 2. Bootstrap Containers */}
      <section>
        <h2>2. Bootstrap Containers</h2>

        <h3>2.1 Container</h3>
        <p>
          The Bootstrap class name <code>container</code> provides us default
          left and right spacings starting from smaller devices for a better
          user experience. It has one fixed width for each breakpoint in
          Bootstrap (extra small, small, medium, large, and extra large).
        </p>
        <table border="1" style={{ borderCollapse: "collapse", width: "70%" }}>
          <thead>
            <tr>
              <th>Device</th>
              <th>Width</th>
              <th>Container Max Width</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Extra small</td>
              <td>&lt; 576px</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>Small</td>
              <td>&gt;= 576px</td>
              <td>540px</td>
            </tr>
            <tr>
              <td>Medium</td>
              <td>&gt;= 768px</td>
              <td>720px</td>
            </tr>
            <tr>
              <td>Large</td>
              <td>&gt;= 992px</td>
              <td>960px</td>
            </tr>
            <tr>
              <td>Extra large</td>
              <td>&gt;= 1200px</td>
              <td>1140px</td>
            </tr>
          </tbody>
        </table>

        <CodeBlock
          language="html"
          code={`<div class="container">
  <p>Content inside a fixed-width container.</p>
</div>`}
        />

        <h3>2.2 Fluid Container</h3>
        <p>
          The Bootstrap class name <code>container-fluid</code> is a full width
          container, spanning the entire width of the viewport.
        </p>
        <p>
          If we don’t need left and right spacings, we can use the Bootstrap
          class name <b>container-fluid</b> instead of container.
        </p>
        <CodeBlock
          language="html"
          code={`<div class="container-fluid">
  <p>Content inside a full-width container.</p>
</div>`}
        />
      </section>

      {/* 3. CSS Colors */}
      <section>
        <h2>3. CSS Colors</h2>
        <h3>3.1 Transparent</h3>
        <p>
          The CSS <code>transparent</code> keyword represents a fully
          transparent color. This makes the background behind the colored HTML
          element completely visible.
        </p>
        <CodeBlock
          language="css"
          code={`div {
  background-color: transparent;
}`}
        />
        <p>
          Bootstrap provides <code>bg-transparent</code> class to make any
          element's background transparent.
        </p>
        <CodeBlock
          language="html"
          code={`<div class="bg-transparent p-2">
  Transparent Background
</div>`}
        />
        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />
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

export default Banner_Section_CS;
