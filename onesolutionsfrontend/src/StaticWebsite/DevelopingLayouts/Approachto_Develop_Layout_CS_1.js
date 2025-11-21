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

  /*   MCQ DATA */
  const mcqs = [
    {
      id: "img_vs_bg_when_img",
      section: "HTML Image vs CSS Background",
      question:
        "The HTML image element is used to add images that are part of the content.",
      options: ["True", "False"],
      answer: "True",
      explanation:
        "The <img> tag is used for images that are meaningful to the content. It is semantic, supports alt text for accessibility, and is the correct choice when the image is part of the page content.",
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
      answer:
        "When the image is purely decorative or you need to overlay text/HTML elements (e.g., hero banner)",
      explanation:
        "Background images are ideal for design elements, overlays, and when you don't need semantic meaning or alt text.",
    },
    {
      id: "padding_bg",
      section: "Margin vs Padding",
      question:
        "Which property allows the element's background color to fill the space?",
      options: ["Margin", "Padding", "Both", "Neither"],
      answer: "Padding",
      explanation:
        "Background color/border applies to content + padding area. Margin is completely outside and transparent.",
    },
    {
      id: "margin_collapse",
      question:
        "Vertical margins between sibling elements can collapse (only the larger one applies).",
      options: ["True", "False"],
      answer: "True",
      explanation:
        "This is called margin collapse — a key difference from padding, which never collapses.",
    },
    {
      id: "bg_size_cover",
      question:
        "Which background-size value is best for hero sections to avoid empty space?",
      options: ["contain", "100% 100%", "cover", "auto"],
      answer: "cover",
      explanation:
        "`background-size: cover` scales the image to cover the entire container while maintaining aspect ratio, cropping if necessary.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Approach to Develop Layout | Cheat Sheet</h1>

      {/* 1. HTML <img> vs CSS Background Image */}

      <section>
        <h2>1. HTML Image vs CSS Background Image</h2>

        <p>Ways to add images in a website:</p>
        <ul>
          <li>HTML Image</li>
          <li>CSS Background Image</li>
        </ul>
        <h3>When to use HTML Image:</h3>
        <ul>
          <li>When there are no content or HTML elements over the Image.</li>
          <li>When Image is a part of the content on a page.</li>
        </ul>

        <h3>When to use CSS Background Image:</h3>
        <ul>
          <li>When Image is not a part of the content on a page.</li>
          <li>When there are content or HTML elements over the Image.</li>
        </ul>

        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ========================================= */}
      {/* 2. Margin vs Padding */}
      {/* ========================================= */}
      <section>
        <h2>2. CSS Margin vs Padding (Box Model)</h2>

        <img
          src="/assets/img/CSS_box_model.png"
          alt="CSS Box Model Diagram - Content → Padding → Border → Margin"
          style={{
            maxWidth: "400px",
            width: "100%",
            display: "block",
            margin: "20px auto",
            borderRadius: "8px",
          }}
        />

        <p>
          Every HTML element is a box:{" "}
          <strong>Content → Padding → Border → Margin</strong>
        </p>
        <h3>When to use CSS Padding:</h3>
        <ul>
          <li>
            To specify the space around the four sides of the content of an HTML
            element.
          </li>
          <li>
            To add the space between the content and border of an HTML element.
          </li>
        </ul>

        <h3>When to use CSS Margin:</h3>
        <ul>
          <li>
            To specify the space around the four sides of an HTML element.
          </li>
          <li>To add the space between HTML elements.</li>
        </ul>

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
      </section>

      {/* 3. Background Properties for Hero */}

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
      <section>
        <h2>4. Step by Step Process to develop a Diwali Page</h2>

        <p>Let's divide the Diwali Page into two Sections.</p>

        <ol>
          <li>Top Section</li>
          <li>Bottom Section</li>
        </ol>

        <p>
          Go through the previous Cheat Sheets and use the suitable CSS Property
          and Value pairs
        </p>

        <h3>4.1 Top Section</h3>
        <p>Follow the steps to develop a top Section of the Diwali Page</p>

        <ul>
          <b>Step-1: Adding a background image to the Top Section</b>

          <ul>
            <li>Add the background image</li>
            <li>Specify the height of the background image</li>
            <li>
              Specify the background size to the image and whether to occupy up
              to the specified width and height or not
            </li>
          </ul>

          <b>Step-2: Adding a Top Section heading</b>
          <ul>
            <li>Add the Top Section heading</li>
            <li>Specify the color of the text</li>
            <li>Specify the font family of the text</li>
            <li>Specify the size of the text</li>
            <li>Specify the width of the text (heading box)</li>
            <li>Specify the padding of the text (heading box)</li>
          </ul>
        </ul>
        <h3>4.2 Bottom Section</h3>

        <p>Follow the steps to develop a Bottom Section of the Diwali Page</p>
        <ul>
          <b>Step-1: Adding a Bottom Section Container</b>

          <ul>
            <li>Add the background color</li>
            <li>Specify the padding to the Bottom Section Container</li>
          </ul>
          <b>Step-2: Adding the card item</b>

          <ul>
            <li>Add the background color</li>

            <li>
              Add the image
              <ul>
                <li>Specify the width and height of the image</li>
              </ul>
            </li>

            <li>
              Add the name of the card item
              <ul>
                <li>Specify the color of the text</li>
                <li>Specify the size of the text</li>
              </ul>
            </li>

            <li>
              Add the price of the card item
              <ul>
                <li>Specify the color of the text</li>
                <li>Specify the size of the text</li>
                <li>Specify the font weight of the text</li>
              </ul>
            </li>

            <li>Specify padding to the card item</li>
            <li>Specify the text alignment of the card item</li>
          </ul>
          <b>Step-3: Aligning the card items</b>
          <ul>
            <li>Specify margin to the card items</li>

            <li>
              Align the pair of two cards side by side using Flexbox properties
              <ul>
                <li>Wrap two cards with the HTML container element</li>
                <li>Define it as a Flexbox Container</li>
                <li>Specify the Flex Direction to it</li>
                <li>Specify the Justify Content to it</li>
              </ul>
            </li>
          </ul>
          <b>Step-4: Adding the button</b>

          <ul>
            <li>Add the button</li>
            <li>Add the button bootstrap class names to it</li>
            <li>Specify the text alignment of the Bottom Section Container</li>
          </ul>
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
