import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const FavouritePlaces_DetailView_CS = ({
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
      id: "carousel_purpose",
      section: "Bootstrap Carousel",
      question: "What is the main purpose of Bootstrap Carousel?",
      options: [
        "To display static images",
        "To create an automated slideshow",
        "To show only one image at a time without sliding",
        "To embed YouTube videos",
      ],
      answer: "To create an automated slideshow",
      explanation:
        "Bootstrap Carousel is a slideshow component for cycling through images, text, or custom content with smooth transitions and controls.",
    },
    {
      id: "carousel_auto",
      section: "Bootstrap Carousel",
      question: "Which attribute makes the carousel start sliding automatically?",
      options: ["data-ride", "data-bs-ride", "data-slide", "autoplay"],
      answer: "data-bs-ride",
      explanation:
        "In Bootstrap 5, data-bs-ride=\"carousel\" makes the carousel start cycling automatically when the page loads.",
    },
    {
      id: "youtube_id",
      section: "YouTube Responsive Embed",
      question: "Where is the YouTube Video ID located in the watch URL?",
      options: [
        "After embed/",
        "After v=",
        "After ?rel=0",
        "In the video title",
      ],
      answer: "After v=",
      explanation:
        "Example: https://www.youtube.com/watch?v=49HTIoCccDY → Video ID is 49HTIoCccDY",
    },
    {
      id: "responsive_embed",
      section: "YouTube Responsive Embed",
      question: "Which Bootstrap class makes the iframe responsive?",
      options: ["embed-responsive", "ratio ratio-16x9", "w-100", "iframe-fluid"],
      answer: "ratio ratio-16x9",
      explanation:
        "Bootstrap 5 uses the .ratio and .ratio-16x9 classes to create responsive embeds that maintain aspect ratio on all devices.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Favourite Place Detailed View Page | Cheat Sheet</h1>

      {/* ========================================= */}
      {/* 1. Bootstrap Carousel */}
      {/* ========================================= */}
      <section>
        <h2>1. Bootstrap Carousel (Slideshow)</h2>
        <p>
          The Carousel component creates an automated slideshow for images or custom content.
          We use it in the detailed view page to showcase multiple photos of the favourite place.
        </p>

        <CodeBlock
          language="html"
          code={`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>

  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="IMAGE_URL_1" class="d-block w-100" alt="First slide" />
    </div>
    <div class="carousel-item">
      <img src="IMAGE_URL_2" class="d-block w-100" alt="Second slide" />
    </div>
    <div class="carousel-item">
      <img src="IMAGE_URL_3" class="d-block w-100" alt="Third slide" />
    </div>
  </div>

  <!-- Optional: Previous / Next Controls -->
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`}
        />

        <div className="Note-container">
          <h6>Important Attributes:</h6>
          <ul>
            <li><code>data-bs-ride="carousel"</code> → auto-starts the slideshow</li>
            <li><code>.carousel-indicators</code> → dots at bottom</li>
            <li><code>.carousel-item active</code> → first slide must have "active"</li>
            <li><code>d-block w-100</code> → makes image responsive</li>
          </ul>
        </div>

        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ========================================= */}
      {/* 2. Responsive YouTube Embed */}
      {/* ========================================= */}
      <section>
        <h2>2. Responsive YouTube Video Embed</h2>
        <p>
          To embed a YouTube video responsively (maintains aspect ratio on all devices),
          wrap the <code>&lt;iframe&gt;</code> in Bootstrap's <code>.ratio</code> utility.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="ratio ratio-16x9">
  <iframe 
    src="https://www.youtube.com/embed/VIDEO_ID_HERE?rel=0" 
    title="YouTube video" 
    allowfullscreen>
  </iframe>
</div>`}
        />

        <div className="Note-container">
          <h6>How to get the Video ID:</h6>
          <ol>
            <li>Open the video on YouTube</li>
            <li>Look at the URL: <code>https://www.youtube.com/watch?v=49HTIoCccDY</code></li>
            <li>The part after <code>v=</code> is the Video ID → <code>49HTIoCccDY</code></li>
            <li>Paste it after <code>/embed/</code></li>
          </ol>
        </div>

        <MCQBlock mcq={mcqs[2]} answers={mcqAnswers} onAnswer={handleAnswer} />
        <MCQBlock mcq={mcqs[3]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* ========================================= */}
      {/* 3. Step by Step Implementation */}
      {/* ========================================= */}
      <section>
        <h2>3. Implementation Steps (Favourite Place Detailed View)</h2>
        <ol>
          <li>Add background image and main heading</li>
          <li>Create the card container with proper padding/margin</li>
          <li>Paste the Bootstrap Carousel code</li>
          <li>Replace IMAGE_URL_1, IMAGE_URL_2, etc. with actual image links</li>
          <li>Add text container (heading + description)</li>
          <li>Add YouTube embed section below carousel</li>
          <li>Replace VIDEO_ID_HERE with actual YouTube video ID</li>
          <li>Style with padding, margins, text colors for beautiful look</li>
        </ol>
      </section>

     
      {/* Note */}
     
      <div className="Note-container">
        <h6>Pro Tip:</h6>
        <p>
          Always test the Video ID carefully. Even one wrong character will prevent the video from loading.
          Recommended: <code>?rel=0</code> hides related videos from other channels at the end.
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
            ? "✓ Completed"
            : "Continue"}
        </button>
      </div>
    </div>
  );
};

/*
      REUSABLE MCQ COMPONENT (Consistent with previous cheat sheets)
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

export default FavouritePlaces_DetailView_CS;