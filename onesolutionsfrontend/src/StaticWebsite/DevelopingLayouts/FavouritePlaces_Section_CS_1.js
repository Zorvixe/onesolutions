import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // ✅ adjust the path if needed

const FavouritePlaces_Section_CS_1 = ({ onSubtopicComplete }) => {
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
      <h1>Favourite Places Detailed View – Bootstrap Components</h1>

      {/* =========================== */}
      {/* 1. Bootstrap Components - Carousel */}
      {/* =========================== */}
      <section>
        <h2>1. Bootstrap Components</h2>
        <h3>1.1 Carousel</h3>
        <p>
          The Carousel is a slideshow for cycling through images, text, etc. Slides
          will change every few seconds. You can add multiple images to the Carousel
          by changing the value of the <code>src</code> attribute of the{" "}
          <code>img</code> element.
        </p>

        <CodeBlock
          language="html"
          code={`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="image1.jpg" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="image2.jpg" class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
  </button>
</div>`}
        />

        <ul>
          <li>
            Carousel is created using <code>carousel</code> and{" "}
            <code>carousel-inner</code> classes.
          </li>
          <li>Slides automatically move every few seconds.</li>
          <li>
            You can change the image by updating the <code>src</code> attribute.
          </li>
        </ul>

        <h3>MCQ</h3>
        {[
          {
            question: "Which Bootstrap class is used to create a carousel?",
            options: ["carousel", "slide-show", "carousel-inner", "carousel slide"],
            answer: "carousel",
          },
        ].map((q, idx) => renderMCQ(q, idx, "carousel"))}
      </section>

      {/* =========================== */}
      {/* 2. Bootstrap Utilities - Embed */}
      {/* =========================== */}
      <section>
        <h2>2. Bootstrap Utilities</h2>
        <h3>2.1 Embed (YouTube)</h3>
        <p>
          The given code snippet is the YouTube embed code. You can add different
          YouTube videos by changing the Video ID in the value of the{" "}
          <code>src</code> attribute.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="ratio ratio-16x9">
  <iframe 
    src="https://www.youtube.com/embed/49HTIoCccDY?rel=0" 
    title="YouTube video" 
    allowfullscreen>
  </iframe>
</div>`}
        />

        <p>
          To find the video ID, copy the part after <code>v=</code> in the YouTube
          URL.
        </p>

        <h3>MCQ</h3>
        {[
          {
            question: "Where should the YouTube video ID be placed in the embed URL?",
            options: [
              "After ?rel=0",
              "After https://www.youtube.com/embed/",
              "Before the https",
              "Anywhere in the URL",
            ],
            answer: "After https://www.youtube.com/embed/",
          },
        ].map((q, idx) => renderMCQ(q, idx, "youtube"))}
      </section>

      {/* =========================== */}
      {/* 3. Step by Step Process */}
      {/* =========================== */}
      <section>
        <h2>3. Step by Step Process to Develop Favourite Place Detailed View Section Page</h2>
        <ol>
          <li>Add the Background Image and Heading</li>
          <li>
            Add a Detailed View Card
            <ul>
              <li>Add a Detailed View Card Container</li>
              <li>Add the Bootstrap Carousel Code</li>
              <li>Update image URLs in the <code>src</code> attribute</li>
              <li>Add a Text Container with heading and description</li>
              <li>Apply padding and margin to style the layout</li>
            </ul>
          </li>
          <li>
            Replace the Carousel Code with YouTube Embed Code to add a video section
          </li>
        </ol>
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
