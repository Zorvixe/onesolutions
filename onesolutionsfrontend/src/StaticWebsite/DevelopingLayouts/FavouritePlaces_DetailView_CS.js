import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust the path if needed

const FavouritePlaces_DetailView_CS = ({ onSubtopicComplete }) => {
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
      <h1>Favourite Place Detailed View Page – Cheat Sheet</h1>

      {/* =========================== */}
      {/* 1. Bootstrap Carousel */}
      {/* =========================== */}
      <section>
        <h2>1. Bootstrap Components</h2>
        <h3>1.1 Carousel</h3>
        <p>
          The Carousel is a slideshow for cycling through images, text, etc.
          Slides will change every few seconds.
        </p>
        <p>
          To add the Carousel to our Favourite Place Detailed View Section
          Page, we used Bootstrap Carousel Component with Indicators.
        </p>
        <p>
          You can add different images in the Carousel by changing the image
          URL in the value of the HTML <code>src</code> attribute.
        </p>

        <CodeBlock
          language="html"
          code={`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="IMAGE_URL_1" class="d-block w-100" alt="..." />
    </div>
    <div class="carousel-item">
      <img src="IMAGE_URL_2" class="d-block w-100" alt="..." />
    </div>
    <div class="carousel-item">
      <img src="IMAGE_URL_3" class="d-block w-100" alt="..." />
    </div>
  </div>
</div>`}
        />

        <h3>MCQ</h3>
        {[
          {
            question: "Bootstrap Carousel is used to create image slideshows.",
            options: ["True", "False"],
            answer: "True",
          },
        ].map((q, idx) => renderMCQ(q, idx, "carouselmcq"))}
      </section>

      {/* =========================== */}
      {/* 2. Bootstrap Utilities - Embed */}
      {/* =========================== */}
      <section>
        <h2>2. Bootstrap Utilities</h2>
        <h3>2.1 Embed</h3>
        <p>
          The given code snippet is the Youtube embed code provided by
          Bootstrap. You can add different Youtube videos by changing the
          Video ID in the value of the HTML <code>src</code> attribute.
        </p>
        <p>
          The Video ID is in between{" "}
          <code>https://www.youtube.com/embed/</code> and <code>?rel=0</code>.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="ratio ratio-16x9">
  <iframe src="https://www.youtube.com/embed/49HTIoCccDY?rel=0" title="YouTube video" allowfullscreen></iframe>
</div>`}
        />

        <h3>2.1.1 How to get the Youtube Video ID:</h3>
        <ol>
          <li>Open YouTube and search for your video.</li>
          <li>Click on the video to open it.</li>
          <li>
            Copy the Video ID after <code>v=</code> in the URL.
          </li>
          <li>
            Paste the Video ID after <code>embed/</code> and before{" "}
            <code>?rel=0</code>.
          </li>
        </ol>

        <h3>MCQ</h3>
        {[
          {
            question: "The Youtube Video ID is the part of the URL after v=.",
            options: ["True", "False"],
            answer: "True",
          },
        ].map((q, idx) => renderMCQ(q, idx, "embedmcq"))}
      </section>

      {/* =========================== */}
      {/* 3. Step by Step Process */}
      {/* =========================== */}
      <section>
        <h2>3. Step by Step Process to Develop Favourite Place Detailed View</h2>
        <ol>
          <li>Add the Background Image and Heading</li>
          <li>Add a Detailed View Card Container</li>
          <li>Add the Bootstrap Carousel Code</li>
          <li>
            Add the <code>src</code> attributes for the HTML{" "}
            <code>img</code> element in the Carousel
          </li>
          <li>Add a Detailed View Card Text Container</li>
          <li>Add a Heading and Description inside the Card</li>
          <li>Add padding and margin to position the content properly</li>
          <li>
            Follow the same steps and replace Carousel with Youtube Embed to
            add video.
          </li>
        </ol>
      </section>

      {/* =========================== */}
      {/* 4. Note */}
      {/* =========================== */}
      <section>
        <h2>4. Note</h2>
        <p>
          Be careful while pasting the video ID. The video ID must be exactly
          between <code>https://www.youtube.com/embed/</code> and{" "}
          <code>?rel=0</code>. If any character is missed, the video won't
          load.
        </p>
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

export default FavouritePlaces_DetailView_CS;
