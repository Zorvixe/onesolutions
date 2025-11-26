import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock } from "../../CodeOutputBlocks";

const CSS_Gradience_CS = ({ subtopicId, goalName, courseName, subtopic }) => {
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
      id: "linear_gradient",
      section: "CSS Gradients",
      question:
        "What is the correct syntax for a linear gradient from top to bottom?",
      options: [
        "linear-gradient(to bottom, red, blue)",
        "linear-gradient(bottom, red, blue)",
        "linear-gradient(red to blue)",
        "gradient(to bottom, red, blue)",
      ],
      answer: "linear-gradient(to bottom, red, blue)",
      explanation:
        "The correct function is linear-gradient(), and direction keywords like 'to bottom' come first.",
    },

    {
      id: "radial_gradient",
      section: "Radial Gradient",
      question: "Which keyword creates a circular radial gradient?",
      options: ["circle", "ellipse", "round", "radial"],
      answer: "circle",
      explanation:
        "Use radial-gradient(circle, ...) for perfect circles. Without 'circle', it defaults to ellipse.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>CSS Gradience | Cheat Sheet</h1>

      {/* 1. Bootstrap Components */}
      <section>
        <h2>1. Bootstrap Components</h2>
        <h3>1.1 Modal</h3>
        <p>
          Try changing the content and styles of the Modal Header, Body, and
          Footer.
        </p>
        <CodeBlock
          language="html"
          code={`<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`}
        />
      </section>

      {/* 2. Gradients */}
      <section>
        <h2>2. Gradients</h2>
        <p>
          A <code>gradient</code> is a smooth transition between two or more
          colors. In CSS, gradients are used as background images to create
          visually appealing transitions without using actual image files.
        </p>
        <p>
          A special type of Background Image formed by the transition between
          two or more colors.
        </p>
        <p>There are mainly two types of gradients:</p>
        <ul>
          <li>Linear Gradient</li>
          <li>Radial Gradient</li>
        </ul>

        <h3>2.1 Linear Gradient</h3>
        <p>
          A <code>linear gradient</code> creates a smooth transition between
          colors along a straight line — horizontally, vertically, or
          diagonally.
        </p>

        <p>
          <strong>Basic linear gradient using two colors:</strong>
        </p>
        <CodeBlock
          language="css"
          code={`background: linear-gradient(to bottom, #ff7e5f, #feb47b);`}
        />
        <p>
          The above code creates a gradient that smoothly transitions from{" "}
          <strong>#ff7e5f</strong> (top) to <strong>#feb47b</strong> (bottom).
        </p>
        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
        <h4>2.1.1 Changing Direction</h4>
        <p>
          You can control the direction of the gradient using keywords like
          <strong> to top</strong>, <strong>to bottom</strong>,{" "}
          <strong>to left</strong>, and <strong>to right</strong>.
        </p>

        <table border="1" style={{ borderCollapse: "collapse", width: "70%" }}>
          <thead>
            <tr>
              <th>Direction</th>
              <th>Color Flow</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>to top</code>
              </td>
              <td>Bottom → Top</td>
            </tr>
            <tr>
              <td>
                <code>to bottom</code>
              </td>
              <td>Top → Bottom (default)</td>
            </tr>
            <tr>
              <td>
                <code>to left</code>
              </td>
              <td>Right → Left</td>
            </tr>
            <tr>
              <td>
                <code>to right</code>
              </td>
              <td>Left → Right</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>Example:</strong>
        </p>
        <CodeBlock
          language="html"
          code={`<div class="linear-gradient-background"></div>`}
        />

        <CodeBlock
          language="css"
          code={`.linear-gradient-background {
  height: 100vh;
  background-image: linear-gradient(#2196f3, #f44336);
}`}
        />
        <p>
          This example creates a gradient flowing from <strong>#2196f3</strong>{" "}
          on the left to <strong>#f44336</strong> on the right.
        </p>

        <h4>2.1.2 More than Two Colors</h4>
        <p>
          You can add more than two colors in a linear gradient to create
          complex or multicolor effects.
        </p>
        <CodeBlock
          language="html"
          code={`<div class="linear-gradient-background"></div>`}
        />

        <CodeBlock
          language="css"
          code={`.linear-gradient-background {
background: linear-gradient(to right, red, orange, yellow, green, blue);;
}`}
        />
        <p>
          The above example creates a rainbow-like gradient transitioning from
          red to blue horizontally.
        </p>

        <h3>2.2 Radial Gradient</h3>
        <p>
          A <code>radial gradient</code> creates a color transition radiating
          outward from a center point in a circular or elliptical shape.
        </p>

        <p>
          <strong>Example:</strong>
        </p>

        <CodeBlock
          language="html"
          code={`<div class="radial-gradient-background"></div>`}
        />

        <CodeBlock
          language="css"
          code={`.radial-gradient-background {
background: radial-gradient(circle, #ff7e5f, #feb47b);
}`}
        />
        <p>
          This creates a circular gradient that starts with{" "}
          <strong>#ff7e5f</strong> at the center and fades out to{" "}
          <strong>#feb47b</strong> at the edges.
        </p>
        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />

        <h4>2.2.1 More than Two Colors</h4>
        <p>
          You can include multiple colors in a radial gradient for more vibrant
          effects.
        </p>
        <CodeBlock
          language="css"
          code={`background: radial-gradient(circle, red, yellow, green, blue);`}
        />
        <CodeBlock
          language="html"
          code={`<div class="radial-gradient-background"></div>`}
        />

        <CodeBlock
          language="css"
          code={`.radial-gradient-background {
background: radial-gradient(circle, red, yellow, green, blue);
}`}
        />
        <p>
          This example creates a colorful circular gradient starting from red in
          the center and transitioning outward to blue.
        </p>
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

export default CSS_Gradience_CS;
