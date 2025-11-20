import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Approachto_Develop_Layout_CS_1 = ({
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
      id: "img_vs_bg_when_img",
      section: "HTML Image vs CSS Background",
      question: "When should you primarily use the <img> tag?",
      options: [
        "For decorative images or when overlaying text",
        "When the image is part of the page content (e.g., product photo, logo, article illustration)",
        "Only when the image needs to repeat",
        "When you want to hide the image from screen readers",
      ],
      answer: "When the image is part of the page content (e.g., product photo, logo, article illustration)",
      explanation:
        "<img> is semantic HTML, supports alt text for accessibility/SEO, and is the correct choice for meaningful content images.",
    },
    {
      id: "img_vs_bg_when_bg",
      question: "When is CSS background-image the better choice?",
      options: [
        "For product photos in an e-commerce site",
        "When the image is purely decorative or you need to overlay text/HTML elements (e.g., hero banner)",
        "When you need alt text for accessibility",
        "For user-uploaded avatars",
      ],
      answer: "When the image is purely decorative or you need to overlay text/HTML elements (e.g., hero banner)",
      explanation:
        "Background images are ideal for design elements, overlays, and when you don't need semantic meaning or alt text.",
    },
    {
      id: "padding_bg",
      section: "Margin vs Padding",
      question: "Which property allows the element's background color to fill the space?",
      options: ["Margin", "Padding", "Both", "Neither"],
      answer: "Padding",
      explanation:
        "Background color/border applies to content + padding area. Margin is completely outside and transparent.",
    },
    {
      id: "margin_collapse",
      question: "Vertical margins between sibling elements can collapse (only the larger one applies).",
      options: ["True", "False"],
      answer: "True",
      explanation:
        "This is called margin collapse — a key difference from padding, which never collapses.",
    },
    {
      id: "bg_size_cover",
      question: "Which background-size value is best for hero sections to avoid empty space?",
      options: ["contain", "100% 100%", "cover", "auto"],
      answer: "cover",
      explanation:
        "`background-size: cover` scales the image to cover the entire container while maintaining aspect ratio, cropping if necessary.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Approach to Develop Layout | Cheat Sheet</h1>

      {/* ========================================= */}
      {/* 1. HTML <img> vs CSS Background Image */}
      {/* ========================================= */}
      <section>
        <h2>1. HTML &lt;img&gt; vs CSS Background Image</h2>
        <p>There are two main ways to display images on a webpage:</p>

        <table style={{ width: "100%", borderCollapse: "collapse", margin: "20px 0" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Method</th>
              <th style={{ textAlign: "left" }}>Use When...</th>
              <th style={{ textAlign: "left" }}>Key Advantages</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>&lt;img&gt; tag</strong></td>
              <td>
                • Image is part of the content<br />
                • Needs alt text (accessibility/SEO)<br />
                • Product photos, logos, articles images, icons with meaning
              </td>
              <td>Semantic, accessible, SEO-friendly, supports alt/srcset</td>
            </tr>
            <tr>
              <td><strong>background-image</strong></td>
              <td>
                • Purely decorative<br />
                • Text/HTML overlay needed (hero sections)<br />
                • Patterns, gradients, design elements
              </td>
              <td>Easy overlays, positioning control, multiple backgrounds possible</td>
            </tr>
          </tbody>
        </table>

        <div className="Note-container">
          <h6>Best Practices:</h6>
          <ul>
            <li>Always add meaningful <code>alt</code> text to &lt;img&gt; (or alt="" for decorative).</li>
            <li>Use background-image for hero banners with headings.</li>
            <li>Avoid using &lt;img&gt; just for styling — it's not semantic.</li>
          </ul>
        </div>

        <CodeBlock
          language="html"
          code={`<!-- HTML Image (Content) -->
<img src="product.jpg" alt="Red sneakers on white background" />

<!-- CSS Background (Decorative/Overlay) -->
<div class="hero" style="background-image: url('hero.jpg')">
  <h1>Welcome to Diwali Sale!</h1>
</div>`}
        />

        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ========================================= */}
      {/* 2. Margin vs Padding */}
      {/* ========================================= */}
      <section>
        <h2>2. CSS Margin vs Padding (Box Model)</h2>

        <img
          src="/assets/img/CSS_box_model.png"
          alt="CSS Box Model Diagram - Content → Padding → Border → Margin"
          style={{ maxWidth: "400px", width: "100%", display: "block", margin: "20px auto", borderRadius: "8px" }}
        />

        <p>Every HTML element is a box: <strong>Content → Padding → Border → Margin</strong></p>

        <table style={{ width: "100%", borderCollapse: "collapse", margin: "20px 0" }}>
          <thead>
            <tr>
              <th></th>
              <th>Padding</th>
              <th>Margin</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Location</strong></td>
              <td>Inside the border</td>
              <td>Outside the border</td>
            </tr>
            <tr>
              <td><strong>Background color fills</strong></td>
              <td>Yes (content + padding)</td>
              <td>No (transparent)</td>
            </tr>
            <tr>
              <td><strong>Can collapse (vertical)</strong></td>
              <td>No</td>
              <td>Yes (larger margin wins)</td>
            </tr>
            <tr>
              <td><strong>Use case</strong></td>
              <td>Space inside element (e.g., button padding)</td>
              <td>Space between elements</td>
            </tr>
          </tbody>
        </table>

        <CodeBlock
          language="css"
          code={`.button {
  background-color: #8cc63f;
  color: white;
  padding: 12px 24px;  /* space inside */
  margin: 10px;        /* space outside */
  border: none;
  border-radius: 8px;
}`}
        />

        <MCQBlock mcq={mcqs[2]} answers={mcqAnswers} onAnswer={handleAnswer} />
        <MCQBlock mcq={mcqs[3]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ========================================= */}
      {/* 3. Background Properties for Hero */}
      {/* ========================================= */}
      <section>
        <h2>3. Background Properties (For Top Section / Hero)</h2>

        <CodeBlock
          language="css"
          code={`.hero-section {
  background-image: url('diwali-bg.png');
  background-size: cover;        /* Best for hero - fills container */
  background-position: center;   /* Centers the image */
  background-repeat: no-repeat;
  height: 80vh;                   /* or specific px */
  color: white;
  text-align: center;
  padding-top: 100px;
}`}
        />

        <MCQBlock mcq={mcqs[4]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ========================================= */}
      {/* 4. Step by Step - Diwali Page Layout */}
      {/* ========================================= */}
      <section>
        <h2>4. Step-by-Step Process: Diwali Page Layout</h2>

        <h3>Overall Strategy</h3>
        <p>Divide page into logical sections:</p>
        <ol>
          <li><strong>Hero/Top Section</strong> → Background image + heading</li>
          <li><strong>Products/Bottom Section</strong> → Cards with flexbox</li>
        </ol>

        <h3>Top Section (Hero)</h3>
        <ol>
          <li>Add background-image via CSS</li>
          <li>Set <code>background-size: cover</code></li>
          <li>Set height (e.g., 80vh or 500px)</li>
          <li>Add heading with white color, large font, padding for positioning</li>
        </ol>

        <h3>Bottom Section (Cards)</h3>
        <ol>
          <li>Create container with background color & padding</li>
          <li>Use Bootstrap cards or custom divs for items</li>
          <li>Apply <code>d-flex flex-wrap justify-content-center</code> for alignment</li>
          <li>Add margin/padding for spacing</li>
          <li>Use Bootstrap button classes (btn btn-warning etc.)</li>
        </ol>
      </section>

      {/* ========================================= */}
      {/* 5. Resources Used in Diwali Page */}
      {/* ========================================= */}
      <section>
        <h2>5. Resources Used</h2>

        <p><strong>Background Image (Hero):</strong></p>
        <CodeBlock
          language="text"
          code="https://d2clawv67efefq.cloudfront.net/ccbp-static-website/diwali-bg.png"
        />

        <p><strong>Card Images:</strong></p>
        <ul>
          <li>Lamp: https://d2clawv67efefq.cloudfront.net/ccbp-static-website/lamp-img.png</li>
          <li>Diya: https://d2clawv67efefq.cloudfront.net/ccbp-static-website/diya-img.png</li>
          <li>Firework: https://d2clawv67efefq.cloudfront.net/ccbp-static-website/firework-img.png</li>
          <li>Firecracker: https://d2clawv67efefq.cloudfront.net/ccbp-static-website/firecracker-img.png</li>
        </ul>

        <p><strong>Colors Used:</strong></p>
        <ul>
          <li>Text: white, #616e7c, #323f4b</li>
          <li>Background: #e6f6ff (card area)</li>
          <li>Buttons: #fd7e14 or Bootstrap warning</li>
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

export default Approachto_Develop_Layout_CS_1;