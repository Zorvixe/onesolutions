import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const FavouritePlaces_Section_CS_1 = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary } = useAuth();
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});

  const handleAnswer = (question, option) => {
    setMcqAnswers((prev) => ({ ...prev, [question]: option }));
  };

  const handleContinue = async () => {
    try {
      await markSubtopicComplete(subtopicId, goalName, courseName);
      await loadProgressSummary();
      setIsSubtopicCompleted(true);
    } catch (error) {
      console.error("Failed to mark subtopic complete:", error);
    }
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
            color: mcqAnswers[q.question] === q.answer ? "green" : "red",
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
      <h1>Favourite Places Section Cheat Sheet</h1>

      {/* =========================== */}
      {/* 1. HTML Image Element */}
      {/* =========================== */}
      <section>
        <h2>1. HTML Element</h2>
        <h3>1.1 Image Element</h3>
        <p>
          The HTML <code>img</code> element defines an image.
        </p>
        <p>Syntax:</p>
        <CodeBlock language="html" code={`<img src="IMAGE_URL"/>`} />
        <h3>1.2 src Attribute</h3>
        <p>
          The <code>src</code> attribute specifies the URL of the image.
        </p>
        <CodeBlock
          language="html"
          code={`<img src="https://d2clawv67efefq.cloudfront.net/ccbp-static-website/tajmahal-img.png"/>`}
        />
        <h3>1.3 How to get the path (URL) of an Image?</h3>
        <p>
          One of the ways to get the path (URL) of an image from the internet:
        </p>

        <ul>
          <li>
            Open the Google Image search page: Go to{" "}
            <a href="https://images.google.com/" target="_blank">
              https://images.google.com/
            </a>{" "}
            in your web browser. This will open the Google search page for
            images.
          </li>
          <li>
            Enter an image you want to search for: Type a word or phrase into
            the text box in the middle of the page.
          </li>
          <li>
            Click the Search icon: It's to the right of the text box. Doing so
            will search Google for images related to your search.
          </li>
          <li>
            Find your image: Scroll through the results until you find one which
            matches your needs.
          </li>
          <li>
            Open the image in a new tab: Click{" "}
            <strong>Open image in new tab</strong>.
          </li>
          <li>
            Copy the image's URL: Copy the entire URL of the image from the
            address bar of the web browser.
          </li>
          <li>
            Paste this URL in the HTML <strong>src</strong> attribute of an{" "}
            <strong>&lt;img&gt;</strong> element.
          </li>
        </ul>

        <h3>1.4 Applying Height and Width</h3>
        <p>
          We can provide multiple HTML Attributes to the HTML <code>img</code>{" "}
          element. The HTML <code>src</code> and class Attributes are provided
          in the HTML
          <code>img</code> element given below.
        </p>
        <CodeBlock
          language="css"
          code={`.image {
  width: 80px;
  height: 100px;
}`}
        />
        <CodeBlock
          language="html"
          code={`<img src="https://d2clawv67efefq.cloudfront.net/ccbp-static-website/tajmahal-img.png" class="image"/>`}
        />
        <h3>MCQ</h3>
        {[
          {
            question: "Which HTML element defines an image?",
            options: ["p", "h1", "img", "div"],
            answer: "img",
          },
        ].map((q, idx) => renderMCQ(q, idx, "imgmcq"))}
      </section>

      {/* =========================== */}
      {/* 2. Void Elements */}
      {/* =========================== */}
      <section>
        <h2>2. Void Elements</h2>
        <p>
          The HTML elements that only have a start tag and do not contain
          content or end tag are called as <b>Void Elements</b>.
        </p>
        <p>
          <b>Syntax: </b>
        </p>
        <CodeBlock language="html" code={`<tag/>`} />
        <CodeBlock
          language="html"
          code={`<img src="https://d2clawv67efefq.cloudfront.net/ccbp-static-website/tajmahal-img.png"/>`}
        />
        <h3>MCQ</h3>
        {[
          {
            question:
              "The image element in HTML is a void element and does not have a closing tag",
            options: ["True", "False"],
            answer: "True",
          },
        ].map((q, idx) => renderMCQ(q, idx, "voidmcq"))}
      </section>

      {/* =========================== */}
      {/* 3. CSS Box Model */}
      {/* =========================== */}
      <section>
        <h2>3. CSS Box Model Properties</h2>
        <h3>3.1 Margin</h3>
        <p>
          The CSS <code>margin</code> property specifies the space around the
          four sides of an HTML element.
        </p>
        <CodeBlock
          language="css"
          code={`.card-container {
  margin: 10px;
}`}
        />
        <p>
          You can use the below CSS properties to apply a margin on the specific
          side of an HTML element,
        </p>
        <ul>
          <li>margin-top</li>
          <li>margin-right</li>
          <li>margin-bottom</li>
          <li>margin-left</li>
        </ul>
        <h3>MCQ</h3>
        {[
          {
            question:
              "Identify the CSS property used to add space between elements.",
            options: ["border-width", "space", "margin"],
            answer: "margin",
          },
        ].map((q, idx) => renderMCQ(q, idx, "boxmodelmcq"))}
      </section>

      {/* =========================== */}
      {/* Continue Button */}
      {/* =========================== */}
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

export default FavouritePlaces_Section_CS_1;
