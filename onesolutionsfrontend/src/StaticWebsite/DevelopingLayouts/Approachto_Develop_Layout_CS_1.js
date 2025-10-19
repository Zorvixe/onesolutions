import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Approachto_Develop_Layout_CS_1 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});

  const handleAnswer = (question, option) => {
    setMcqAnswers((prev) => ({ ...prev, [question]: option }));
  };

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  const renderMCQ = (q, idx, namePrefix) => (
    <div key={idx} style={{ marginBottom: "10px" }}>
      <p>{q.question}</p>
      {q.options.map((option) => (
        <div key={option}>
          <label>
            <input
              type="radio"
              name={`${namePrefix}_${idx}`}
              checked={mcqAnswers[q.question] === option}
              onChange={() => handleAnswer(q.question, option)}
            />{" "}
            {option}
          </label>
        </div>
      ))}
      {mcqAnswers[q.question] && (
        <p
          style={{
            fontWeight: "bold",
            color:
              mcqAnswers[q.question] === q.answer ? "green" : "red",
          }}
        >
          {mcqAnswers[q.question] === q.answer
            ? "✅ Correct"
            : `❌ Wrong. Correct answer: ${q.answer}`}
        </p>
      )}
    </div>
  );

  return (
    <div className="intro-container">
      <h1>Diwali Page Cheat Sheet – HTML & CSS</h1>

      {/* =========================== */}
      {/* 1. HTML Image vs CSS Background Image */}
      {/* =========================== */}
      <section>
        <h2>1. HTML Image vs CSS Background Image</h2>
        <p>Ways to add images in website:</p>
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

        <h3>MCQ</h3>
        {[
          {
            question: "The HTML image element is used to add images that are part of the content.",
            options: ["True", "False"],
            answer: "True",
          },
        ].map((q, idx) => renderMCQ(q, idx, "htmlimagevsbg"))}
      </section>

      {/* =========================== */}
      {/* 2. CSS Margin vs CSS Padding */}
      {/* =========================== */}
      <section>
        <h2>2. CSS Margin vs CSS Padding</h2>

        <h3>When to use CSS Padding:</h3>
        <ul>
          <li>To specify the space around the content of an HTML element.</li>
          <li>To add space between content and border of an HTML element.</li>
        </ul>

        <h3>When to use CSS Margin:</h3>
        <ul>
          <li>To specify the space around an HTML element.</li>
          <li>To add space between HTML elements.</li>
        </ul>

        <CodeBlock
          language="html"
          code={`<button>Button</button>`}
        />
        <CodeBlock
          language="css"
          code={`button {
  margin: 10px;
  padding: 5px;
}`}
        />

        <h3>MCQ</h3>
        {[
          {
            question: "The margin is the space present outside the border of an HTML element.",
            options: ["True", "False"],
            answer: "True",
          },
        ].map((q, idx) => renderMCQ(q, idx, "marginvspadding"))}
      </section>

      {/* =========================== */}
      {/* 3. Step by Step Process to Develop a Diwali Page */}
      {/* =========================== */}
      <section>
        <h2>3. Step by Step Process to Develop a Diwali Page</h2>
        <p>Divide the page into two sections:</p>
        <ul>
          <li>Top Section</li>
          <li>Bottom Section</li>
        </ul>

        <h3>3.1 Top Section</h3>
        <ol>
          <li>Add a background image</li>
          <li>Specify height of the background image</li>
          <li>Specify background size</li>
          <li>Add heading: set color, font, size, width, padding</li>
        </ol>

        <h3>3.2 Bottom Section</h3>
        <ol>
          <li>Add container: background color, padding</li>
          <li>Add card items: image, name, price, text color, font size & weight, padding, alignment</li>
          <li>Align cards: margin, flexbox, flex-direction, justify-content</li>
          <li>Add button: Bootstrap classes, text alignment</li>
        </ol>
      </section>

      {/* =========================== */}
      {/* 4. Resources Used */}
      {/* =========================== */}
      <section>
        <h2>4. Resources Used</h2>
        <p>Background image URL:</p>
        <CodeBlock
          language="text"
          code={`https://d2clawv67efefq.cloudfront.net/ccbp-static-website/diwali-bg.png`}
        />

        <p>Card item images:</p>
        <ul>
          <li>https://d2clawv67efefq.cloudfront.net/ccbp-static-website/lamp-img.png</li>
          <li>https://d2clawv67efefq.cloudfront.net/ccbp-static-website/diya-img.png</li>
          <li>https://d2clawv67efefq.cloudfront.net/ccbp-static-website/firework-img.png</li>
          <li>https://d2clawv67efefq.cloudfront.net/ccbp-static-website/firecracker-img.png</li>
        </ul>

        <p>Colors used:</p>
        <ul>
          <li>white</li>
          <li>#e6f6ff</li>
          <li>#616e7c</li>
          <li>#323f4b</li>
        </ul>
      </section>

      {/* Continue Button */}
      <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted}
        >
          {isSubtopicCompleted ? "Completed" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Approachto_Develop_Layout_CS_1;
