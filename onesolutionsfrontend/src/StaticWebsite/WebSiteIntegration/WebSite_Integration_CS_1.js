import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const WebSite_Integration_CS_1 = ({
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
        alert("Failed to mark as complete.");
      }
    } catch (error) {
      alert("Error marking as complete.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------------------------------------------
      UPDATED MCQs — HTML Attributes + Integration Only
  ----------------------------------------------------*/
  const mcqs = [
    {
      id: "html_id_attr",
      section: "HTML Attributes",
      question:
        "Which HTML attribute is used to uniquely identify elements within an HTML document?",
      options: ["id", "src", "class", "all of the above"],
      answer: "id",
      explanation:
        "The id attribute is used to uniquely identify an HTML element. Each id must be unique on the page.",
    },
    {
      id: "id_prefix",
      section: "HTML id Attribute",
      question:
        "What prefix must the id of each container section have when using the CCBP UI Kit?",
      options: ["page", "container", "section", "view"],
      answer: "section",
      explanation:
        "The display() function works only when section IDs start with the prefix 'section'.",
    },
    {
      id: "onclick_rule",
      section: "HTML onclick Attribute",
      question:
        "Which of the following is the correct HTML onclick syntax when using display()?",
      options: [
        `onclick="display(section3)"`,
        `onclick="display('section3')"`,
        `onclick='display("section3")'`,
        `onclick=display('section3')`,
      ],
      answer: `onclick="display('section3')"`,
      explanation:
        "onclick should be inside double quotes, and the argument inside display() should be in single quotes.",
    },
    {
      id: "integration_step",
      section: "Website Integration",
      question:
        "To display Favourite Places Section when we click a button in Home Section, which step must be done?",
      options: [
        "Add onclick to Home Section button",
        "Remove all ids",
        "Use <script> inside <head>",
        "Rename all sections to random names",
      ],
      answer: "Add onclick to Home Section button",
      explanation:
        "To navigate between sections, you must use onclick with display('sectionName').",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Website Integration | Cheat Sheet</h1>

      {/* ========================================= */}
      {/* 1. UI Kit Overview */}
      {/* ========================================= */}
      <section>
        <h2>1. UI Kit</h2>
        <p>
          CCBP UI Kit is a collection of reusable code snippets for CCBP
          training.
        </p>

        <h3>1.1 Adding CCBP UI Kit Script</h3>
        <CodeBlock
          language="html"
          code={`<!-- Add just before closing </body> -->
<script src="https://cdn.ccbp.in/ui-kit/v1.0/ccbp-ui-kit.js"></script>`}
        />
      </section>

      {/* ========================================= */}
      {/* 3. HTML Attributes */}
      {/* ========================================= */}
      <section>
        <h2>3. HTML Attributes</h2>

        <h3>3.1 The HTML id Attribute</h3>
        <p>
          The HTML <code>id</code> attribute specifies a unique id for an HTML
          element. The value of the <code>id</code> attribute must be unique
          within the HTML document.
        </p>

        <CodeBlock
          language="html"
          code={`<div id="section1">Section 1</div>`}
        />

        <h5>Warning</h5>
        <p>
          The CCBP UI kit works only if the value of the HTML id attribute of
          the container <code>section</code> has the prefix as section.
        </p>
        <p>
          So, the <code></code> which we specify for any <code>section</code>{" "}
          should always contain its prefix as section if you are using CCBP UI
          Kit.
        </p>

        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />

        <h3>3.2 The HTML onclick Attribute</h3>
        <p>
          The <code>onclick</code> event occurs when the user clicks an element.
        </p>

        <CodeBlock
          language="html"
          code={`<button class="btn btn-primary" onclick="display('section3')">
  Go to Section 3
</button>`}
        />

        <div className="Note-container">
          <p>
            Use double quotes for <code>onclick</code> and single quotes inside{" "}
            <code>display()</code>.
          </p>
        </div>

        <MCQBlock mcq={mcqs[2]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ========================================= */}
      {/* 4. Website Integration */}
      {/* ========================================= */}
      <section>
        <h2>4. Website Integration</h2>

        <h3>4.1 Home ↔ Favourite Places Sections</h3>

        <ul>
          <li>
            Step-1: All section ids must start with <code>section</code>
          </li>
          <li>Step-2: Add HTML of Home Section + CSS</li>
          <li>Step-3: Add HTML of Favourite Places Section + CSS</li>
          <li>
            Step-4: Add an <code>onclick</code> attribute to the Home button
          </li>
        </ul>

        <CodeBlock
          language="html"
          code={`<button onclick="display('sectionFavouritePlaces')">
  Explore Places
</button>`}
        />

        <h3>To go back to Home from Favourite Places:</h3>
        <ul>
          <li>Step-5: Add a button in Favourite Places Section</li>
          <li>Step-6: Add onclick attribute to show Home Section</li>
        </ul>

        <CodeBlock
          language="html"
          code={`<button onclick="display('sectionHome')">
  Back to Home
</button>`}
        />

        <MCQBlock mcq={mcqs[3]} answers={mcqAnswers} onAnswer={handleAnswer} />

        <h3>4.2 Favourite Places ↔ Detailed View</h3>
        <ul>
          <li>Step-1: Add Detailed View HTML to Display Utility</li>
          <li>Step-2: Add CSS styles</li>
          <li>
            Step-3: Add <code>onclick</code> to Taj Mahal Card inside Favourite
            Places
          </li>
          <li>Step-4: Add Back button inside Detailed View</li>
          <li>
            Step-5: Add <code>onclick</code> to go to Favourite Places
          </li>
        </ul>
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

/* ---------------------------------------------------
      REUSABLE MCQ COMPONENT
----------------------------------------------------*/
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

export default WebSite_Integration_CS_1;
