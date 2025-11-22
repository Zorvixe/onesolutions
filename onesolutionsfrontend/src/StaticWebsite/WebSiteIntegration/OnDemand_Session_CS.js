import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const OnDemand_Session_CS = ({
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
      MCQ DATA - On-Demand Session Essentials
  ----------------------------------------------------*/
  const mcqs = [
    {
      id: "image_hosting",
      section: "Image Hosting",
      question:
        "Which free service is recommended in CCBP for hosting images and getting direct URLs?",
      options: ["Imgur", "Cloudinary", "Google Drive", "Dropbox"],
      answer: "Cloudinary",
      explanation:
        "Cloudinary is officially used in NxtWatch & CCBP projects. Just upload → copy direct link → use in <img src='...'>",
    },
    {
      id: "cloudinary_link",
      section: "Image Hosting",
      question: "How do you get a direct image URL from Cloudinary?",
      options: [
        "Right-click → Copy image address",
        "Click 'Share' → Copy link",
        "Upload → Copy the URL shown after upload",
        "Use their API",
      ],
      answer: "Upload → Copy the URL shown after upload",
      explanation:
        "After uploading, Cloudinary gives you a clean URL like: https://res.cloudinary.com/.../image.jpg",
    },
    {
      id: "vscode_download",
      section: "VS Code Setup",
      question: "Where should you download Visual Studio Code from?",
      options: [
        "Microsoft Store",
        "code.visualstudio.com",
        "GitHub",
        "Any APK site",
      ],
      answer: "code.visualstudio.com",
      explanation:
        "Always download VS Code from the official site: https://code.visualstudio.com/",
    },
    {
      id: "link_element",
      section: "Linking CSS",
      question: "Which HTML tag is used to link an external CSS file?",
      options: ["<style>", "<script>", "<link>", "<css>"],
      answer: "<link>",
      explanation:
        "<link rel='stylesheet' href='styles.css'> is the correct way to connect CSS.",
    },
    {
      id: "link_placement",
      section: "Linking CSS",
      question: "Where should the <link> tag be placed in HTML?",
      options: [
        "Inside <body>",
        "Inside <head>",
        "Before <html>",
        "After </body>",
      ],
      answer: "Inside <head>",
      explanation:
        "External stylesheets must be linked inside the <head> section for proper loading and performance.",
    },
    {
      id: "link_attributes",
      section: "Linking CSS",
      question: "What are the two required attributes for linking a CSS file?",
      options: [
        "src and type",
        "href and rel",
        "link and stylesheet",
        "path and css",
      ],
      answer: "href and rel",
      explanation:
        "<link rel='stylesheet' href='styles.css'> — 'rel' tells it's a stylesheet, 'href' is the path.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>On-Demand Session | Complete Cheat Sheet</h1>

      {/* 1. How to Get Image URLs (Cloudinary) */}

      <section>
        <h2>1. Getting URLs for Your Images</h2>

        <p>
          You can get URLs for your images using <b>Cloudinary</b>. Cloudinary
          allows you to upload images easily and provides a direct image URL
          that you can use in your HTML, CSS, or projects.
        </p>

        <p>
          <b>Cloudinary Website URL:</b>
          <code>https://cloudinary.com/</code>
        </p>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            To Sign Up, copy the Cloudinary Website URL and open it in a new
            tab.
          </p>
        </div>
        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 2. Install Visual Studio Code */}

      <section>
        <h2>2. Install Visual Studio Code (Official Editor)</h2>

        <h3>Download Link</h3>
        <p>
          Always download from the official site:
          <br />
          <a
            href="https://code.visualstudio.com/"
            target="_blank"
            rel="noopener"
          >
            https://code.visualstudio.com/
          </a>
        </p>

        <h3>Recommended Extensions (Install These!)</h3>
        <ul>
          <li>Live Server</li>
          <li>Prettier - Code formatter</li>
          <li>Auto Rename Tag</li>
          <li>Bracket Pair Colorizer</li>
          <li>ES7+ React/Redux Snippets</li>
        </ul>

        <MCQBlock mcq={mcqs[2]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 3. Link HTML & CSS Files Correctly */}

      <section>
        <h2>3. How to Link CSS File in HTML</h2>

        <h3>Correct Syntax (Must Remember!)</h3>
        <CodeBlock
          language="html"
          code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Website</title>
  
  <!-- This links your CSS file -->
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <!-- Your content -->
</body>
</html>`}
        />

        <h3>Common Mistakes to Avoid</h3>
        <table
          style={{
            width: "100%",
            margin: "16px 0",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Wrong</th>
              <th>Correct</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>&lt;link href="styles.css"&gt;</code>
              </td>
              <td>
                <code>&lt;link rel="stylesheet" href="styles.css"&gt;</code>
              </td>
            </tr>
            <tr>
              <td>
                Placing <code>&lt;link&gt;</code> in <code>&lt;body&gt;</code>
              </td>
              <td>
                Must be in <code>&lt;head&gt;</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>&lt;style src="styles.css"&gt;</code>
              </td>
              <td>
                Use <code>&lt;link&gt;</code>, not <code>&lt;style&gt;</code>
              </td>
            </tr>
          </tbody>
        </table>

        <MCQBlock mcq={mcqs[3]} answers={mcqAnswers} onAnswer={handleAnswer} />
        <MCQBlock mcq={mcqs[4]} answers={mcqAnswers} onAnswer={handleAnswer} />
        <MCQBlock mcq={mcqs[5]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* Final Tips */}

      <div className="Note-container">
        <div className="icon-note">
          <h6>
            <i class="bi bi-journal-text"></i>Note
          </h6>
        </div>
        <p>
          You need to add the HTML <b>link</b> element in the HTML <b>head</b>{" "}
          element.
        </p>
      </div>

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

/* 
      REUSABLE MCQ COMPONENT (Same as all previous sheets)
*/
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

export default OnDemand_Session_CS;
