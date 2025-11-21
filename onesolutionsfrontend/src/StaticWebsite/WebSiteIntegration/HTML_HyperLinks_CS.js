import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const HTML_HyperLinks_CS = ({ subtopicId, goalName, courseName, subtopic }) => {
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
      MCQ DATA - HTML Hyperlinks & Void Elements
  ----------------------------------------------------*/
  const mcqs = [
    {
      id: "anchor_purpose",
      section: "HTML Anchor Element",
      question: "What is the correct HTML element for creating a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<nav>"],
      answer: "<a>",
      explanation: "The <a> (anchor) tag defines a hyperlink. The 'href' is an attribute, not an element.",
    },
    {
      id: "href_meaning",
      section: "href Attribute",
      question: "What does 'href' stand for in <a href='...'>?",
      options: [
        "Hyperlink Reference",
        "Hypertext Reference",
        "Home Reference",
        "Hyper Reference",
      ],
      answer: "Hypertext Reference",
      explanation: "'href' means Hypertext REFerence — it specifies the destination URL.",
    },
    {
      id: "target_blank",
      section: "target Attribute",
      question: "Which value of 'target' opens the link in a new browser tab?",
      options: ["_self", "_blank", "_parent", "_top"],
      answer: "_blank",
      explanation: "target='_blank' opens the link in a new tab/window. Always pair it with rel='noopener' for security!",
    },
    {
      id: "internal_link",
      section: "Internal Navigation",
      question: "How do you link to an element with id='contact' on the same page?",
      options: [
        "<a href='contact'>",
        "<a href='#contact'>",
        "<a href='/contact'>",
        "<a href='contact.html'>",
      ],
      answer: "<a href='#contact'>",
      explanation: "The # symbol tells the browser to scroll to an element with that id on the current page.",
    },
    {
      id: "image_link",
      section: "Image as Link",
      question: "Which of these makes an image clickable?",
      options: [
        "<img href='...'>",
        "<a><img src='...'></a>",
        "<link><img></link>",
        "<div onclick='...'><img></div>",
      ],
      answer: "<a><img src='...'></a>",
      explanation: "Wrap the <img> tag inside an <a> tag to make the image a clickable link.",
    },
    {
      id: "void_br",
      section: "Void Elements",
      question: "Which void element creates a line break?",
      options: ["<hr>", "<br>", "<break>", "<lb>"],
      answer: "<br>",
      explanation: "<br> inserts a line break. It's a void element — no closing tag needed.",
    },
    {
      id: "void_hr",
      section: "Void Elements",
      question: "Which void element draws a horizontal line?",
      options: ["<line>", "<divider>", "<hr>", "<separator>"],
      answer: "<hr>",
      explanation: "<hr> creates a thematic break (horizontal rule) between sections.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>HTML Hyperlinks & Void Elements | Cheat Sheet</h1>

      {/* ========================================= */}
      {/* 1. HTML Anchor (<a>) Element */}
      {/* ========================================= */}
      <section>
        <h2>1. HTML Anchor Element (&lt;a&gt;)</h2>
        <p>
          The <code>&lt;a&gt;</code> tag creates a <strong>hyperlink</strong> to another webpage, file, or location.
        </p>

        <h3>Basic Syntax</h3>
        <CodeBlock
          language="html"
          code={`<a href="https://www.google.com">Visit Google</a>`}
        />

        <h3>Key Attributes</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", margin: "16px 0" }}>
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>href</code></td>
              <td>URL</td>
              <td>Destination link (required)</td>
            </tr>
            <tr>
              <td><code>target</code></td>
              <td><code>_blank</code>, <code>_self</code></td>
              <td>Where to open the link</td>
            </tr>
            <tr>
              <td><code>rel</code></td>
              <td><code>noopener</code></td>
              <td>Security when using <code>_blank</code></td>
            </tr>
          </tbody>
        </table>

        <div className="Note-container">
          <h6>Security Best Practice:</h6>
          <p>
            Always add <code>rel="noopener"</code> when using <code>target="_blank"</code>:
          </p>
          <CodeBlock
            language="html"
            code={`<a href="https://example.com" target="_blank" rel="noopener">
  Open in new tab (secure)
</a>`}
          />
        </div>

        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />
        <MCQBlock mcq={mcqs[2]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ========================================= */}
      {/* 2. Internal Navigation (Same Page Links) */}
      {/* ========================================= */}
      <section>
        <h2>2. Navigate Within the Same Page</h2>
        <p>Use the <code>#id</code> syntax to jump to a section on the current page.</p>

        <CodeBlock
          language="html"
          code={`<!-- Navigation Link -->
<a href="#about">Go to About Section</a>

<!-- Target Section -->
<section id="about">
  <h2>About Us</h2>
  <p>This is the about section...</p>
</section>`}
        />

        <MCQBlock mcq={mcqs[3]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ========================================= */}
      {/* 3. Image as a Clickable Link */}
      {/* ========================================= */}
      <section>
        <h2>3. Make an Image Clickable</h2>
        <p>Simply wrap the <code>&lt;img&gt;</code> inside an <code>&lt;a&gt;</code> tag.</p>

        <CodeBlock
          language="html"
          code={`<a href="https://www.tajmahal.gov.in" target="_blank" rel="noopener">
  <img 
    src="https://d2clawv67efefq.cloudfront.net/ccbp-static-website/tajmahal-img.png" 
    alt="Taj Mahal - Click to visit official site"
    class="img-link"
  />
</a>`}
        />

        <MCQBlock mcq={mcqs[4]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ========================================= */}
      {/* 4. Common Void Elements */}
      {/* ========================================= */}
      <section>
        <h2>4. Important Void Elements</h2>
        <p>Void elements have no content or closing tag — they are self-closing.</p>

        <h3>&lt;br&gt; — Line Break</h3>
        <CodeBlock language="html" code={`First line<br>Second line`} />

        <h3>&lt;hr&gt; — Horizontal Rule (Divider)</h3>
        <CodeBlock language="html" code={`Section 1<hr>Section 2`} />

        <table style={{ margin: "16px 0", width: "100%" }}>
          <thead>
            <tr>
              <th>Element</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>&lt;br&gt;</code></td>
              <td>Line break (new line)</td>
            </tr>
            <tr>
              <td><code>&lt;hr&gt;</code></td>
              <td>Thematic break (section divider)</td>
            </tr>
          </tbody>
        </table>

        <MCQBlock mcq={mcqs[5]} answers={mcqAnswers} onAnswer={handleAnswer} />
        <MCQBlock mcq={mcqs[6]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ========================================= */}
      {/* Continue Button */}
      {/* ========================================= */}
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

/* -----------------------------------------------
      REUSABLE MCQ COMPONENT (Same as all previous sheets)
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

export default HTML_HyperLinks_CS;