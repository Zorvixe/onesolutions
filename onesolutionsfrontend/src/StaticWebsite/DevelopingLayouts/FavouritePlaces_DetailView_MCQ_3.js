import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What does this Bootstrap code create?</p>
        <CodeBlock
          language="html"
          code={`<div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="image1.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="image2.jpg" class="d-block w-100" alt="...">
    </div>
  </div>
</div>`}
        />
      </div>
    ),
    options: [
      "Static images",
      "Slideshow cycling through images",
      "YouTube video",
      "Text description",
    ],
    answer: "Slideshow cycling through images",
  },
  {
    question: (
      <div>
        <p>How can you add another image to this carousel?</p>
        <CodeBlock
          language="html"
          code={`<div class="carousel-inner">
  <div class="carousel-item active">
    <img src="img1.jpg" alt="...">
  </div>
  <div class="carousel-item">
    <img src="img2.jpg" alt="...">
  </div>
</div>`}
        />
      </div>
    ),
    options: [
      "Change class to carousel-slide",
      "Add another <div class='carousel-item'> with new src",
      "Update heading",
      "Replace with iframe",
    ],
    answer: "Add another <div class='carousel-item'> with new src",
  },
  {
    question: (
      <div>
        <p>What happens to the slides in this carousel?</p>
        <CodeBlock
          language="html"
          code={`<div class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active"><img src="slide1.jpg"></div>
    <div class="carousel-item"><img src="slide2.jpg"></div>
    <div class="carousel-item"><img src="slide3.jpg"></div>
  </div>
</div>`}
        />
      </div>
    ),
    options: [
      "They stay static",
      "They change every few seconds",
      "They play as video",
      "They require manual click",
    ],
    answer: "They change every few seconds",
  },
  {
    question: (
      <div>
        <p>Which class is essential for the carousel container?</p>
        <CodeBlock
          language="html"
          code={`<div class="carousel slide" id="myCarousel">
  <div class="carousel-inner">
    ...
  </div>
</div>`}
        />
      </div>
    ),
    options: ["carousel-inner", "carousel slide", "d-block", "w-100"],
    answer: "carousel slide",
  },
  {
    question: (
      <div>
        <p>What does changing the src in this iframe do?</p>
        <CodeBlock
          language="html"
          code={`<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0" frameborder="0" allowfullscreen></iframe>`}
        />
      </div>
    ),
    options: [
      "Changes the video",
      "Adds a new image",
      "Updates the heading",
      "Applies padding",
    ],
    answer: "Changes the video",
  },
  {
    question: (
      <div>
        <p>Where is the video ID in this embed code?</p>
        <CodeBlock
          language="html"
          code={`<iframe src="https://www.youtube.com/embed/VIDEO_ID?rel=0"></iframe>`}
        />
      </div>
    ),
    options: ["Before https", "After /embed/", "After ?rel=0", "Anywhere"],
    answer: "After /embed/",
  },
  {
    question: (
      <div>
        <p>In the process, what replaces the carousel for a video section?</p>
        <CodeBlock
          language="html"
          code={`<!-- Replace this with YouTube embed -->
<div class="carousel slide">...</div>`}
        />
      </div>
    ),
    options: [
      "Add new images",
      "Update src attributes",
      "Use iframe with YouTube embed code",
      "Apply margin",
    ],
    answer: "Use iframe with YouTube embed code",
  },
  {
    question: "Which Bootstrap class is used to create a carousel?",
    options: ["carousel", "slide-show", "carousel-inner", "carousel slide"],
    answer: "carousel slide",
  },
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
  {
    question:
      "In the step-by-step process, what is done after adding the Bootstrap Carousel Code?",
    options: [
      "Add background image",
      "Update image URLs in the src attribute",
      "Replace with YouTube embed",
      "Apply padding only",
    ],
    answer: "Update image URLs in the src attribute",
  },
];

const FavouritePlaces_Section_MCQ_3 = ({
  subtopicId,
  goalName,
  courseName,
}) => {
  const { markSubtopicComplete, loadProgressSummary } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  const handleCompletion = async () => {
    try {
      await markSubtopicComplete(subtopicId, goalName, courseName);
      await loadProgressSummary();
      setIsCompleted(true);
    } catch (error) {
      console.error("❌ Failed to mark subtopic complete:", error);
    }
  };

  return (
    <MCQLogic
      title="Favourite Places Detailed View – Bootstrap Components - MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default FavouritePlaces_Section_MCQ_3;
