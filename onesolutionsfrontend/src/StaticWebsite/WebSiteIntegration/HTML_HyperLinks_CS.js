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
      explanation:
        "The <a> (anchor) tag defines a hyperlink. The 'href' is an attribute, not an element.",
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
      explanation:
        "'href' means Hypertext REFerence — it specifies the destination URL.",
    },
    {
      id: "target_blank",
      section: "target Attribute",
      question: "Which value of 'target' opens the link in a new browser tab?",
      options: ["_self", "_blank", "_parent", "_top"],
      answer: "_blank",
      explanation:
        "target='_blank' opens the link in a new tab/window. Always pair it with rel='noopener' for security!",
    },
    {
      id: "internal_link",
      section: "Internal Navigation",
      question:
        "How do you link to an element with id='contact' on the same page?",
      options: [
        "<a href='contact'>",
        "<a href='#contact'>",
        "<a href='/contact'>",
        "<a href='contact.html'>",
      ],
      answer: "<a href='#contact'>",
      explanation:
        "The # symbol tells the browser to scroll to an element with that id on the current page.",
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
      explanation:
        "Wrap the <img> tag inside an <a> tag to make the image a clickable link.",
    },
    {
      id: "void_br",
      section: "Void Elements",
      question: "Which void element creates a line break?",
      options: ["<hr>", "<br>", "<break>", "<lb>"],
      answer: "<br>",
      explanation:
        "<br> inserts a line break. It's a void element — no closing tag needed.",
    },
    {
      id: "void_hr",
      section: "Void Elements",
      question: "Which void element draws a horizontal line?",
      options: ["<line>", "<divider>", "<hr>", "<separator>"],
      answer: "<hr>",
      explanation:
        "<hr> creates a thematic break (horizontal rule) between sections.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>HTML Hyperlinks & Void Elements | Cheat Sheet</h1>

      {/* ========================================= */}
      {/* 1. HTML Anchor (<a>) Element */}
      {/* ========================================= */}
      <section>
        <h2>1. HTML Anchor Element</h2>

        <p>
          The HTML <code>&lt;a&gt;</code> element defines a <b>Hyperlink</b>.
        </p>
        <p>
          Hyperlinks are used to navigate to other web resources or a specific
          part of the same HTML document. They are also called <b>links</b>.
        </p>

        <b>Syntax:</b>

        <CodeBlock language="html" code={`<a href="URL">Content</a>`} />

        <h3>1.1 HTML href Attribute</h3>

        <p>
          The HTML <code>href</code> attribute specifies the <b>URL or path</b>{" "}
          of the page where the link navigates to.
        </p>

        <CodeBlock
          language="html"
          code={`<a href="https://onesolutionsekam.in/">Full Stack Development</a>`}
        />

        <h3>1.2 HTML target Attribute</h3>

        <p>
          The HTML <code>target</code> attribute specifies <b>where</b> the
          linked page should open.
        </p>

        <ul>
          <p>
            <b>_self (default): </b>
            Opens the link in the same tab.
          </p>
        </ul>

        <ul>
          <p>
            <b>_blank: </b>
            Opens the link in a new tab.
          </p>
        </ul>

        <ul>
          <p>
            <b>_parent: </b>
            Opens the link in the parent frame.
          </p>
        </ul>

        <ul>
          <p>
            <b>_top: </b>
            Opens the link in the full body of the window.
          </p>
        </ul>
        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ========================================= */}
      {/* 2. Internal Navigation (Same Page Links) */}
      {/* ========================================= */}
      <section>
        <h2>2. Navigate Within the Same Page</h2>
        <p>
          The HTML <code>a</code> element can also be used to navigate to
          different sections within the same HTML document.
        </p>
        <p>
          Add an HTML <code>id</code> attribute to the section that you want to
          navigate to. Provide the hash symbol <code>#</code>, and the value of
          the <code>id</code> attribute of that section as a value to the link's
          HTML <code>href</code> attribute.
        </p>

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
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            While navigating to a particular section within the same HTML
            document, the content of that section doesn't start from the
            starting of a page when
          </p>
          <ul>
            <li>
              It has less content to fill the Viewport height and there are no
              sections after it.
            </li>
            <li>
              The content of that section and the content of the sections after
              it has less content to fill the Viewport height.
            </li>
          </ul>
        </div>

        <MCQBlock mcq={mcqs[3]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ========================================= */}
      {/* 3. Image as a Clickable Link */}
      {/* ========================================= */}
      <section>
        <h2>3. Make an Image Clickable</h2>
        <p>
          Simply wrap the <code>&lt;img&gt;</code> inside an{" "}
          <code>&lt;a&gt;</code> tag.
        </p>

        <CodeBlock
          language="html"
          code={`<a href="https://www.tajmahal.gov.in" target="_blank" rel="noopener">
  <img 
    src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765479623/taj-mahal_le4nar.jpg 
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
        <h2>4. Most Commonly Used HTML Void Elements</h2>

        <h3>4.1 HTML Line Break Element</h3>
        <p>
          The HTML <code>&lt;br /&gt;</code> element is used to break the text
          and move the content to the next line.
        </p>

        <CodeBlock
          language="html"
          code={`<h1 class="heading">Twinkle Twinkle Little Star</h1>
<p>
  Twinkle, twinkle, little star, <br />
  How I wonder what you are! <br />
  Up above the world so high, <br />
  Like a diamond in the sky.
</p>`}
        />
        <MCQBlock mcq={mcqs[5]} answers={mcqAnswers} onAnswer={handleAnswer} />

        <h3>4.2 HTML Horizontal Rule Element</h3>
        <p>
          The HTML <code>&lt;hr /&gt;</code> element inserts a horizontal line
          that helps to visually separate content.
        </p>

        <CodeBlock
          language="html"
          code={`<h1 class="heading">Twinkle Twinkle Little Star</h1>
<hr />
<p>
  Twinkle, twinkle, little star, <br />
  How I wonder what you are! <br />
  Up above the world so high, <br />
  Like a diamond in the sky.
</p>
<hr />`}
        />
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
