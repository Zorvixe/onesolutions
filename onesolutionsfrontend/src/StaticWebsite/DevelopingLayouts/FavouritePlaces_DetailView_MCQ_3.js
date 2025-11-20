import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // 10 Code Block Questions
  {
    question: (
      <div>
        <p>What does this Bootstrap code create?</p>
        <CodeBlock
          language="html"
          code={`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="image1.jpg" class="d-block w-100" alt="Image 1">
    </div>
    <div class="carousel-item">
      <img src="image2.jpg" class="d-block w-100" alt="Image 2">
    </div>
  </div>
</div>`}
        />
      </div>
    ),
    options: [
      "A static image",
      "An image slideshow with indicators",
      "A video embed",
      "A heading",
    ],
    answer: "An image slideshow with indicators",
  },
  {
    question: (
      <div>
        <p>How do you change images in this Carousel?</p>
        <CodeBlock
          language="html"
          code={`<div class="carousel-item">
  <img src="new-image.jpg" class="d-block w-100" alt="New Image">
</div>`}
        />
      </div>
    ),
    options: [
      "Change the class name",
      "Change the src attribute value",
      "Add padding",
      "Change video ID",
    ],
    answer: "Change the src attribute value",
  },
  {
    question: (
      <div>
        <p>What does this Bootstrap embed code do?</p>
        <CodeBlock
          language="html"
          code={`<div class="ratio ratio-16x9">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID?rel=0" allowfullscreen></iframe>
</div>`}
        />
      </div>
    ),
    options: [
      "Displays a slideshow",
      "Embeds a YouTube video",
      "Adds a background image",
      "Creates a card",
    ],
    answer: "Embeds a YouTube video",
  },
  {
    question: (
      <div>
        <p>How do you embed a different YouTube video here?</p>
        <CodeBlock
          language="html"
          code={`<iframe src="https://www.youtube.com/embed/NEW_VIDEO_ID?rel=0" allowfullscreen></iframe>`}
        />
      </div>
    ),
    options: [
      "Change the src to a image URL",
      "Change the VIDEO_ID in the src",
      "Add margin",
      "Change to carousel",
    ],
    answer: "Change the VIDEO_ID in the src",
  },
  {
    question: (
      <div>
        <p>In the step-by-step process, what is added first?</p>
        <CodeBlock
          language="css"
          code={`.top-section { background-image: url('bg.jpg'); }`}
        />
        <CodeBlock
          language="html"
          code={`<div class="top-section"><h1>Heading</h1></div>`}
        />
      </div>
    ),
    options: [
      "Carousel",
      "YouTube embed",
      "Background image and heading",
      "Card text",
    ],
    answer: "Background image and heading",
  },
  {
    question: (
      <div>
        <p>What is the purpose of this in the detailed view?</p>
        <CodeBlock
          language="html"
          code={`<div class="detailed-view-card-container"></div>`}
        />
      </div>
    ),
    options: [
      "Add video ID",
      "Add a container for carousel or embed",
      "Change image src",
      "Add description",
    ],
    answer: "Add a container for carousel or embed",
  },
  {
    question: (
      <div>
        <p>What does this step involve?</p>
        <CodeBlock
          language="css"
          code={`.content { padding: 20px; margin: 10px; }`}
        />
        <CodeBlock
          language="html"
          code={`<div class="content"><h2>Heading</h2><p>Description</p></div>`}
        />
      </div>
    ),
    options: [
      "Add background image",
      "Add padding and margin to position content",
      "Embed video",
      "Change video ID",
    ],
    answer: "Add padding and margin to position content",
  },
  {
    question: (
      <div>
        <p>How is the YouTube video ID placed in this embed?</p>
        <CodeBlock
          language="html"
          code={`<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0" allowfullscreen></iframe>`}
        />
      </div>
    ),
    options: [
      "Before embed/",
      "Between embed/ and ?rel=0",
      "After ?rel=0",
      "In alt attribute",
    ],
    answer: "Between embed/ and ?rel=0",
  },
  {
    question: (
      <div>
        <p>What happens if a character is missed in the video ID here?</p>
        <CodeBlock
          language="html"
          code={`<iframe src="https://www.youtube.com/embed/WRONG_ID?rel=0" allowfullscreen></iframe>`}
        />
      </div>
    ),
    options: [
      "Video loads fine",
      "Video won't load",
      "Shows carousel",
      "Adds image",
    ],
    answer: "Video won't load",
  },
  {
    question: (
      <div>
        <p>In the process, how do you replace Carousel with video?</p>
        <CodeBlock
          language="html"
          code={`<div class="ratio ratio-16x9">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID?rel=0" allowfullscreen></iframe>
</div>`}
        />
      </div>
    ),
    options: [
      "Follow same steps but use embed code",
      "Change src to image",
      "Add margin only",
      "Use indicators",
    ],
    answer: "Follow same steps but use embed code",
  },

  // 5 Normal (Non-CodeBlock) Questions
  {
    question: "Bootstrap Carousel is used to create image slideshows.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    question: "The Youtube Video ID is the part of the URL after v=.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    question:
      "In the step by step process to develop Favourite Place Detailed View, what is the first step?",
    options: [
      "Add the Bootstrap Carousel Code",
      "Add the Background Image and Heading",
      "Add a Detailed View Card Text Container",
      "Add padding and margin",
    ],
    answer: "Add the Background Image and Heading",
  },
  {
    question: "To add different images in the Carousel, what do you change?",
    options: [
      "The video ID",
      "The image URL in the src attribute",
      "The padding",
      "The margin",
    ],
    answer: "The image URL in the src attribute",
  },
  {
    question:
      "To add different Youtube videos, what do you change in the embed code?",
    options: [
      "The image src",
      "The Video ID in the src attribute",
      "The carousel indicators",
      "The heading",
    ],
    answer: "The Video ID in the src attribute",
  },
];

const FavouritePlaces_DetailedView_MCQ_3 = ({
  subtopicId,
  goalName,
  courseName,
  onComplete
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } = useAuth();

  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  // Check if subtopic is already completed
  useEffect(() => {
    if (subtopicId && completedContent.includes(subtopicId)) {
      setIsCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleCompletion = async () => {
    if (isLoading || isCompleted) return;

    try {
      setIsLoading(true);

      // Validate that we have the required parameters
      if (!subtopicId) {
        console.error("❌ Subtopic ID is required");
        alert("Error: Subtopic ID is missing");
        return;
      }

      console.log("🎯 Marking subtopic complete:", {
        subtopicId,
        goalName,
        courseName
      });

      const result = await markSubtopicComplete(
        subtopicId,
        goalName || "Goal 1",
        courseName || "Static Website: HTML CSS & Bootstrap"
      );

      if (result.success) {
        await loadProgressSummary();
        setIsCompleted(true);
        console.log("✅ MCQ successfully marked as completed");

        // Call the parent completion handler if provided
        if (onComplete) {
          onComplete();
        }
      } else {
        console.error("❌ Failed to mark MCQ complete:", result.message);
        alert(`Failed to mark as complete: ${result.message}`);
      }
    } catch (error) {
      console.error("❌ Failed to mark MCQ complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MCQLogic
      title="Favourite Place Detailed View Page - MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      isLoading={isLoading}
      onComplete={handleCompletion}
      subtopicId={subtopicId}
      goalName={goalName}
      courseName={courseName}
    />
  );
};

export default FavouritePlaces_DetailedView_MCQ_3;
