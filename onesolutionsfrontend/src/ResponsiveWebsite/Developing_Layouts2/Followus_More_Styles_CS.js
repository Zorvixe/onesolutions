import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Followus_More_Styles_CS = ({
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
      id: "fontawesome_kit",
      section: "Font Awesome Icons",
      question: "Where should you place the Font Awesome Kit script?",
      options: [
        "In the <body>",
        "In the <head>",
        "Before closing </body>",
        "Anywhere",
      ],
      answer: "In the <head>",
      explanation:
        "The Font Awesome kit script should be added inside the <head> tag for optimal loading and performance.",
    },
    {
      id: "social_icons_class",
      section: "Follow Us Section",
      question: "What does the 'fab' class stand for in Font Awesome?",
      options: [
        "Font Awesome Brand",
        "Fixed Absolute Button",
        "Flex Align Bottom",
        "Font Awesome Basic",
      ],
      answer: "Font Awesome Brand",
      explanation:
        "'fab' is used for brand icons (Facebook, Twitter, Instagram, etc.), while 'fas' is for solid, 'far' for regular.",
    },
    {
      id: "circular_icons",
      section: "Follow Us Styling",
      question: "To make social icons perfectly circular, what must be true?",
      options: [
        "height = width + border-radius: 50%",
        "Only border-radius: 50%",
        "width: 100% and padding",
        "Use class 'rounded-circle' only",
      ],
      answer: "height = width + border-radius: 50%",
      explanation:
        "For a perfect circle, the element must have equal height & width, and border-radius: 50%. Bootstrap’s 'rounded-circle' does exactly this.",
    },
    {
      id: "section_links",
      section: "Linking to Sections",
      question:
        "How do you create a smooth link to a section on the same page?",
      options: [
        'href="#section-id"',
        'href="/section-id"',
        'href="section-id.html"',
        'onclick="scrollTo(section-id)"',
      ],
      answer: 'href="#section-id"',
      explanation:
        'Using href="#contact-us" with an id on the target section creates an anchor link that jumps (or scrolls smoothly if CSS is added).',
    },
    {
      id: "fixed_top",
      section: "Bootstrap Position",
      question: "What does the class 'fixed-top' do?",
      options: [
        "Pins element to top of viewport (always visible)",
        "Pins element to top of parent",
        "Makes element sticky after scrolling",
        "Fixes element only on mobile",
      ],
      answer: "Pins element to top of viewport (always visible)",
      explanation:
        "fixed-top removes the element from flow and sticks it to the top of the screen, even when scrolling.",
    },
    {
      id: "fixed_bottom",
      section: "Bootstrap Position",
      question:
        "Which class creates a footer that stays at the bottom while scrolling?",
      options: [
        "fixed-bottom",
        "sticky-bottom",
        "position-bottom",
        "footer-fixed",
      ],
      answer: "fixed-bottom",
      explanation:
        "fixed-bottom works just like fixed-top but pins the element to the bottom of the viewport.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Follow Us & More Styling | Cheat Sheet</h1>

      {/* 1. Adding Icons */}
      <section>
        <h2>1. Adding Icons</h2>
        <p>
          There are a limited number of Icon choices in Bootstrap icons. Since
          we don’t have the desired icons in Bootstrap Icons, we use Font
          Awesome Icons.
        </p>
        <h3>1.1 Font Awesome Icons</h3>
        <p>
          To use the Font Awesome Icons, you need to add the below Font Awesome
          Icons Kit Code in the HTML <code>head</code> element.
        </p>
        <CodeBlock
          language="html"
          code={`<script src="https://kit.fontawesome.com/your-kit-code.js" crossorigin="anonymous"></script>`}
        />
      </section>

      {/* 2. Follow Us Section */}
      <section>
        <h2>2. Follow Us Section</h2>
        <CodeBlock
          language="html"
          code={`<section class="follow-us p-3 text-center">
  <h2>Follow Us</h2>
  <a href="#" class="fab fa-facebook-f mx-2"></a>
  <a href="#" class="fab fa-twitter mx-2"></a>
  <a href="#" class="fab fa-instagram mx-2"></a>
</section>`}
        />
        <p>
          <b>Note: </b> Use <code>border-radius</code> to create circular icons.
          Ensure height = width for perfect circles.
        </p>
      </section>

      {/* 3. Adding Links to Sections */}
      <section>
        <h2>3. Adding Links to the Sections</h2>
        <p>
          Add an <code>id</code> to the target section and use it in the{" "}
          <code>href</code> of nav items:
        </p>
        <CodeBlock
          language="html"
          code={`<!-- Section -->
<section id="contact-us">
  <h2>Contact Us</h2>
</section>

<!-- Nav Link -->
<a href="#contact-us">Contact</a>`}
        />
      </section>

      {/* 4. Bootstrap Position Utilities */}
      <section>
        <h2>4. Bootstrap Position Utilities</h2>

        <h3>4.1 Fixed Top</h3>
        <p>
          Use <code>fixed-top</code> to pin an element to the top of the
          viewport:
        </p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar fixed-top navbar-light bg-light">
  Fixed Top Navbar
</nav>`}
        />

        <h3>4.2 Fixed Bottom</h3>
        <p>
          Use <code>fixed-bottom</code> to pin an element to the bottom of the
          viewport:
        </p>
        <CodeBlock
          language="html"
          code={`<footer class="footer fixed-bottom bg-dark text-white p-3 text-center">
  Fixed Bottom Footer
</footer>`}
        />
      </section>

      {/* MCQs - CLEAN, CONSISTENT & EDUCATIONAL */}
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

export default Followus_More_Styles_CS;
