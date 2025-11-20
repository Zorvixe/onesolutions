import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Introductionto_HTML_CS_1 = ({
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

  // MCQ Data
  const mcqs = [
    {
      id: "basic_structure",
      section: "Basic Structure",
      question: "What is the correct basic structure of an HTML document?",
      options: [
        "<html></html>",
        "<!DOCTYPE html><html><head><title></title></head><body></body></html>",
        "<head><title></title></head><body></body>",
      ],
      answer:
        "<!DOCTYPE html><html><head><title></title></head><body></body></html>",
      explanation:
        "The DOCTYPE declaration is required in HTML5, followed by the complete <html> structure.",
    },
    {
      id: "h1_role",
      section: "Heading Element",
      question: "The HTML <h1> element is known as the ______ element.",
      options: ["paragraph", "button", "main heading"],
      answer: "main heading",
      explanation:
        "<h1> should be used for the most important heading on the page.",
    },
    {
      id: "paragraph_tag",
      section: "Paragraph Element",
      question: "Which is the correct start tag for a paragraph?",
      options: ["<paragraph>", "<p>", "<para>"],
      answer: "<p>",
      explanation: "The official tag for paragraphs in HTML is <p>.",
    },
    {
      id: "button_tag",
      section: "Button Element",
      question: "Which is the correct start tag for a native HTML button?",
      options: ["<btn>", "<button>", '<input type="button">'],
      answer: "<button>",
      explanation:
        "<button> is used for semantic, accessible buttons. <input> is mainly used in forms.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Introduction to HTML | Cheat Sheet</h1>

      {/* 1. Basic Structure */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>1. Basic HTML Structure</h2>
        <p>
          Every HTML document begins with a required structure that tells the
          browser it is an HTML5 page.
        </p>

        <h3>Example Code</h3>
        <CodeBlock
          language="html"
          code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Page</title>
</head>
<body>
  <h1>Welcome!</h1>
  <p>Hello, world!</p>
</body>
</html>`}
        />

        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 2. Heading */}
      <section>
        <h2>Heading Element</h2>

        <p>
          HTML provides heading tags from <code>&lt;h1&gt;</code> to{" "}
          <code>&lt;h6&gt;</code> to structure page titles and sections.
        </p>

        <CodeBlock
          language="HTML"
          code={`<h1>Hello Welcome to Static Website</h1>`}
        />

        <h3>Output</h3>
        <OutputBlock output={["Hello Welcome to Static Website"]} />

        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 3. Paragraph */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>
          3. Paragraph Element (<code>&lt;p&gt;</code>)
        </h2>
        <p>The &lt;p&gt; tag defines blocks of text with automatic margins.</p>

        <CodeBlock
          language="html"
          code={`<p>
  This is a paragraph. It can contain <strong>bold</strong> or 
  <em>italic</em> text.
</p>`}
        />

        <h3>Output</h3>
        <OutputBlock
          output={[
            <p key="para" style={{ margin: "1em 0" }}>
              This is a paragraph. It can contain <strong>bold</strong> or{" "}
              <em>italic</em> text.
            </p>,
          ]}
        />

        <MCQBlock mcq={mcqs[2]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 4. Button */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>
          4. Button Element (<code>&lt;button&gt;</code>)
        </h2>
        <p>
          The <code>&lt;button&gt;</code> element is used for clickable actions
          and is more semantic than divs or anchors.
        </p>

        <CodeBlock language="html" code={`<button>Submit</button>`} />

        <h3>Output</h3>
        <OutputBlock
          output={[
            <div key="btns">
              <button
                style={{ margin: "0.5em", padding: "0.5em 1em" }}
                type="button"
              >
                Submit
              </button>
            </div>,
          ]}
        />

        <MCQBlock mcq={mcqs[3]} answers={mcqAnswers} onAnswer={handleAnswer} />
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

/* 
   REUSABLE MCQ BLOCK COMPONENT
*/
const MCQBlock = ({ mcq, answers, onAnswer }) => {
  const userAnswer = answers[mcq.id];
  const isCorrect = userAnswer === mcq.answer;

  return (
    <div className="mcq-container">
      <h3 className="mcq-title">Quiz: {mcq.section}</h3>
      <p className="mcq-question">{mcq.question}</p>

      <div>
        {mcq.options.map((option) => {
          let optionClass = "mcq-option";

          if (userAnswer === option) {
            optionClass += isCorrect ? " selected-correct" : " selected-wrong";
          }

          return (
            <label key={option} className={optionClass}>
              <input
                type="radio"
                name={mcq.id}
                checked={userAnswer === option}
                onChange={() => onAnswer(mcq.id, option)}
                style={{ marginRight: "8px" }}
              />
              <code>{option}</code>
            </label>
          );
        })}
      </div>

      {userAnswer && (
        <div className={`mcq-result ${isCorrect ? "correct" : "wrong"}`}>
          {isCorrect ? "Correct!" : `Wrong. Correct: ${mcq.answer}`}
          <p className="mcq-explanation">
            <strong>Explanation:</strong> {mcq.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default Introductionto_HTML_CS_1;
