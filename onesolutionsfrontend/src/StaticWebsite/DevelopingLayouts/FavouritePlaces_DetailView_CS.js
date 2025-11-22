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
      question:
        "Which attribute makes the carousel start sliding automatically?",
      options: ["data-ride", "data-bs-ride", "data-slide", "autoplay"],
      answer: "data-bs-ride",
      explanation:
        'In Bootstrap 5, data-bs-ride="carousel" makes the carousel start cycling automatically when the page loads.',
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
      options: [
        "embed-responsive",
        "ratio ratio-16x9",
        "w-100",
        "iframe-fluid",
      ],
      answer: "ratio ratio-16x9",
      explanation:
        "Bootstrap 5 uses the .ratio and .ratio-16x9 classes to create responsive embeds that maintain aspect ratio on all devices.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Favourite Place Detailed View Page | Cheat Sheet</h1>

      {/* 1. Bootstrap Carousel */}

      <section>
        <h2>1. Bootstrap Carousel (Slideshow)</h2>
        <p>
          The Carousel is a slideshow for cycling through images, text, etc.
          Slides will change every few seconds.
        </p>
        <p>
          The Carousel component creates an automated slideshow for images or
          custom content. We use it in the detailed view page to showcase
          multiple photos of the favourite place.
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
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            <b>data-bs-ride="carousel"</b> → auto-starts the slideshow
          </p>
          <p>
            <b>carousel-indicators</b> → dots at bottom
          </p>
          <p>
            <b>carousel-item active</b> → first slide must have
          </p>
          <p>
            <b>d-block w-100</b> → makes image responsive
          </p>
        </div>

        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 2. Responsive YouTube Embed */}

      <section>
        <h2>2. Bootstrap Utilities</h2>
        <h3>2.1 Embed</h3>

        <p>
          The code below is the YouTube embed code provided by Bootstrap. You
          can add any YouTube video by changing the <b>Video ID</b> in the{" "}
          <code>src</code> attribute.
        </p>

        <p>
          The Video ID is the part that appears between
          <code>https://www.youtube.com/embed/</code> and <code>?rel=0</code>.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="embed-responsive embed-responsive-16by9">
  <iframe
    class="embed-responsive-item"
    src="https://www.youtube.com/embed/49HTIoCccDY?rel=0"
    allowfullscreen
  ></iframe>
</div>`}
        />

        <h3>2.1.1 How to add a YouTube Video?</h3>

        <p>
          <b>Step 1:</b> Open YouTube
        </p>
        <p>
          On desktop, open <b>youtube.com</b> in your browser. On mobile, open
          the YouTube app.
        </p>

        <p>
          <b>Step 2:</b> Search for the video
        </p>
        <p>Type the video name into the search bar and tap the Search icon.</p>

        <p>
          <b>Step 3:</b> Select the video
        </p>
        <p>Scroll through the results and click the video you want.</p>

        <p>
          <b>Step 4:</b> Copy the Video ID
        </p>
        <p>
          On desktop, copy the value after <b>v=</b>. If there is an <b>&</b>,
          copy only the part before it.
        </p>

        <p>
          Example:
          <br />
          From the URL:
          <br />
          <code>
            https://www.youtube.com/watch?v=49HTIoCccDY&feature=youtu.be
          </code>
          <br />
          The Video ID is: <b>49HTIoCccDY</b>
        </p>

        <p>
          On mobile, tap <b>Share → Messages</b>, then copy the ID that appears
          after the last <b>/</b>.
        </p>

        <p>
          <b>Step 5:</b> Paste the Video ID
        </p>
        <p>
          Insert the Video ID between <b>embed/</b> and <b>?rel=0</b> in the
          <code>src</code> attribute.
        </p>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            Be careful while pasting the video ID. The video ID must be in
            between the<b> https://www.youtube.com/embed/ </b>and <b>?rel=0</b>.
            You won't get the video if any character is missed in the value of
            the HTML src attribute.
          </p>
        </div>

        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 3. Step by Step Implementation */}

      {/* <section>
        <h2>3. Implementation Steps (Favourite Place Detailed View)</h2>
        <ol>
          <li>Add background image and main heading</li>
          <li>Create the card container with proper padding/margin</li>
          <li>Paste the Bootstrap Carousel code</li>
          <li>
            Replace IMAGE_URL_1, IMAGE_URL_2, etc. with actual image links
          </li>
          <li>Add text container (heading + description)</li>
          <li>Add YouTube embed section below carousel</li>
          <li>Replace VIDEO_ID_HERE with actual YouTube video ID</li>
          <li>Style with padding, margins, text colors for beautiful look</li>
        </ol>
      </section> */}
      <section>
        <h2>
          3. Step by Step Process to Develop a Favourite Place Detailed View
          Section Page
        </h2>

        <ul>
          <b>Step-1:</b>
          <p>Add the Background Image and Heading.</p>
        </ul>

        <ul>
          <b>Step-2:</b>
          <p> Add a Detailed View Card.</p>
          <li>Add a Detailed View Card Container.</li>
          <li>Add the Bootstrap Carousel Code.</li>
          <li>
            Add the HTML <code>src</code> attributes for the{" "}
            <code>&lt;img&gt;</code> elements in the Carousel.
          </li>
          <li>Add a Detailed View Card Text Container.</li>
          <li>Add a Detailed View Card Heading.</li>
          <li>Add a Detailed View Card Description.</li>
          <li>Add padding to the Card Text Container.</li>
          <li>Add margin to the Card Container.</li>
        </ul>

        <p>
          Follow the same steps again and replace the Bootstrap Carousel Code
          with the Bootstrap YouTube Embed Code to add a YouTube video to the
          Favourite Place Detailed View Section Page.
        </p>
      </section>

      {/* Note */}

      <div className="Note-container">
        <h6>Pro Tip</h6>
        <p>
          Always test the Video ID carefully. Even one wrong character will
          prevent the video from loading. Recommended: <b>?rel=0</b> hides
          related videos from other channels at the end.
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
