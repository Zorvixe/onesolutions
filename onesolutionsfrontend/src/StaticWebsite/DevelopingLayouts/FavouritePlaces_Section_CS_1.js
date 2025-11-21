import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const FavouritePlaces_Section_CS_1 = ({
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

  /* MCQ DATA */
  const mcqs = [
    {
      id: "img_element",
      section: "HTML Image Element",
      question: "Which HTML element is used to display an image?",
      options: ["<picture>", "<image>", "<img>", "<src>"],
      answer: "<img>",
      explanation:
        "The <img> tag is the correct and standard way to embed images in HTML.",
    },
    {
      id: "src_attribute",
      section: "HTML Image Element",
      question: "What does the 'src' attribute in <img> stand for?",
      options: ["source", "style reference", "screen resolution", "size ratio"],
      answer: "source",
      explanation:
        "'src' stands for 'source' — it specifies the path/URL to the image file.",
    },
    {
      id: "void_element",
      section: "Void Elements",
      question: "Is the <img> tag a void element?",
      options: ["Yes", "No"],
      answer: "Yes",
      explanation:
        "Void elements (like <img>, <br>, <hr>, <input>) have no closing tag and no content. They are self-closing: <img />",
    },
    {
      id: "margin_purpose",
      section: "CSS Box Model - Margin",
      question: "What is the main purpose of the CSS 'margin' property?",
      options: [
        "To add space inside the border",
        "To add space outside the border (between elements)",
        "To change the background color",
        "To add rounded corners",
      ],
      answer: "To add space outside the border (between elements)",
      explanation:
        "Margin creates space outside the element. It affects layout and spacing between elements.",
    },
    // {
    //   id: "margin_shorthand",
    //   section: "CSS Box Model - Margin",
    //   question: "Which of these correctly applies 20px margin on all sides?",
    //   options: [
    //     "margin: 20px 20px 20px 20px;",
    //     "margin: 20px;",
    //     "margin-all: 20px;",
    //     "padding: 20px;",
    //   ],
    //   answer: "margin: 20px;",
    //   explanation:
    //     "margin: 20px; is shorthand for top, right, bottom, left — all sides get 20px.",
    // },
  ];

  return (
    <div className="intro-container">
      <h1>Favourite Places Section | Cheat Sheet</h1>

      {/* 1. HTML <img> Element */}

      <section>
        <h2>1. HTML Image Element </h2>
        <p>
          The <code>&lt;img&gt;</code> tag is used to embed images in an HTML
          document.
        </p>

        <h3>Syntax:</h3>
        <CodeBlock
          language="html"
          code={`<img src="image-url.jpg" alt="Description of image" />`}
        />

        <h3>Important Attributes</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            margin: "16px 0",
          }}
        >
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>src</code>
              </td>
              <td>Specifies the path/URL to the image</td>
            </tr>
            <tr>
              <td>
                <code>alt</code>
              </td>
              <td>
                Alternative text for accessibility & SEO (very important!)
              </td>
            </tr>
            <tr>
              <td>
                <code>width</code> / <code>height</code>
              </td>
              <td>Sets image dimensions (use CSS instead when possible)</td>
            </tr>
          </tbody>
        </table>

        <h3>Example from Project</h3>
        <CodeBlock
          language="html"
          code={`<img 
  src="https://d2clawv67efefq.cloudfront.net/ccbp-static-website/tajmahal-img.png" 
  alt="Taj Mahal at sunset" 
  class="place-image"
/>`}
        />
        <h3>1.3 How to get the path (URL) of an Image?</h3>

        <p>
          One of the ways to get the path (URL) of an image from the internet:
        </p>

        <ul>
          <li>
            Open the Google Image search page: Go to
            <a href=" https://images.google.com/ " target="_blank">
              https://images.google.com/
            </a>
            in your Web browser. This will open the Google search page for
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

          <li>Open the image in a new tab: Click the Open image in new tab.</li>

          <li>
            Copy the image's URL: Copy the entire URL of the image from the
            address bar of the Web browser.
          </li>

          <li>
            Paste this URL in the HTML <code>src</code> Attribute of an HTML{" "}
            <code>img</code> element.
          </li>
        </ul>

        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />
        <h3>1.4 How to apply Height and Width to an Image?</h3>

        <p>
          We can provide multiple HTML attributes to the{" "}
          <code>&lt;img&gt;</code> element. In the example below, the{" "}
          <code>src</code> and <code>class</code> attributes are applied to the
          image.
        </p>

        <CodeBlock
          language="html"
          code={`<img
  src="https://d2clawv67efefq.cloudfront.net/ccbp-static-website/tajmahal-img.png"
  class="image"
/>`}
        />
        <CodeBlock
          language="css"
          code={`.image {
    width: 80px;
    height: 100px;
  }`}
        />
      </section>

      {/* 2. Void Elements */}

      <section>
        <h2>2. Void Elements (Self-Closing Tags)</h2>
        <p>
          The HTML elements that only have a <b>start tag</b> and do not contain
          content or end tag are called as <code>Void Elements</code>.
        </p>

        <h3>Common Void Elements</h3>
        <ul>
          <li>
            <b>&lt;img /&gt;</b>
          </li>
          <li>
            <b>&lt;br /&gt;</b> (line break)
          </li>
          <li>
            <b>&lt;hr /&gt;</b> (horizontal rule)
          </li>
          <li>
            <b>&lt;input /&gt;</b>
          </li>
          <li>
            <b>&lt;meta /&gt;</b>, <b>&lt;link /&gt;</b>
          </li>
        </ul>

        <CodeBlock
          language="html"
          code={`<img src="https://d2clawv67efefq.cloudfront.net/ccbp-static-website/tajmahal-img.png"/>`}
        />

        <div className="Note-container">
          <h6>Note:</h6>
          <p>
            Always write void elements with a trailing slash:{" "}
            <b>&lt;img /&gt;</b> — it's valid HTML5 and future-proof.
          </p>
        </div>

        <MCQBlock mcq={mcqs[3]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 3. CSS Box Model - Margin */}

      <section>
        <h2>3. CSS Box Model: Margin</h2>
        <p>
          The CSS margin property specifies the space around the four sides of
          an HTML element.
        </p>
        <p>
          Every HTML element is a box with four layers:{" "}
          <strong>Content → Padding → Border → Margin</strong>
        </p>

        <h3>Margin = Space OUTSIDE the element</h3>
        <ul>
          <li>
            Controls spacing <strong>between</strong> elements
          </li>
          <li>
            Background color does <strong>not</strong> extend into margin
          </li>
          <li>Can be set individually or using shorthand</li>
        </ul>

        <CodeBlock
          language="css"
          code={`.card {
  margin: 20px;                    /* All sides */
  margin: 10px 20px;               /* top/bottom | left/right */
  margin: 10px 15px 20px 5px;      /* top | right | bottom | left (clockwise) */
  margin-top: 30px;                /* Specific side */
}`}
        />
        <p>
          You can use the below CSS properties to apply a margin on a specific
          side of an HTML element:
        </p>

        <table border="1" style={{ borderCollapse: "collapse", width: "70%" }}>
          <thead>
            <tr>
              <th>Property</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>margin-top</td>
              <td>Applies margin to the top of the element.</td>
            </tr>

            <tr>
              <td>margin-right</td>
              <td>Applies margin to the right side of the element.</td>
            </tr>

            <tr>
              <td>margin-bottom</td>
              <td>Applies margin to the bottom of the element.</td>
            </tr>

            <tr>
              <td>margin-left</td>
              <td>Applies margin to the left side of the element.</td>
            </tr>
          </tbody>
        </table>

        <div className="Note-container">
          <h6>Pro Tip</h6>
          <p>
            Use <b>margin: 0 auto;</b> + fixed <b>width</b> to horizontally
            center a block element.
          </p>
        </div>

        <MCQBlock mcq={mcqs[3]} answers={mcqAnswers} onAnswer={handleAnswer} />
        {/* <MCQBlock mcq={mcqs[4]} answers={mcqAnswers} onAnswer={handleAnswer} /> */}
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

/*   REUSABLE MCQ COMPONENT (Same as all previous cheat sheets) */
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

export default FavouritePlaces_Section_CS_1;
