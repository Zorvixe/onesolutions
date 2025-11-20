import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // 10 Code Block Questions
  {
    question: (
      <div>
        <p>What will this HTML display?</p>
        <CodeBlock language="html" code={`<img src="mountain.jpg">`} />
      </div>
    ),
    options: ["A paragraph", "A heading", "An image", "A button"],
    answer: "An image",
  },
  {
    question: (
      <div>
        <p>Which attribute is used to specify the image path?</p>
        <CodeBlock language="html" code={`<img src="beach.jpg" alt="Beach">`} />
      </div>
    ),
    options: ["href", "src", "link", "path"],
    answer: "src",
  },
  {
    question: (
      <div>
        <p>What happens if we write this?</p>
        <CodeBlock language="html" code={`<img src="photo.jpg"></img>`} />
      </div>
    ),
    options: [
      "Works fine",
      "Invalid - img has no closing tag",
      "Shows broken image",
      "Displays twice",
    ],
    answer: "Invalid - img has no closing tag",
  },
  {
    question: (
      <div>
        <p>What does this CSS do to the image?</p>
        <CodeBlock
          language="css"
          code={`img { width: 300px; height: 200px; }`}
        />
        <CodeBlock language="html" code={`<img src="lake.jpg">`} />
      </div>
    ),
    options: [
      "No change",
      "Sets image size to 300x200 pixels",
      "Adds border",
      "Centers the image",
    ],
    answer: "Sets image size to 300x200 pixels",
  },
  {
    question: (
      <div>
        <p>How much space will be around this image?</p>
        <CodeBlock language="css" code={`.pic { margin: 20px; }`} />
        <CodeBlock language="html" code={`<img src="tree.jpg" class="pic">`} />
      </div>
    ),
    options: [
      "20px inside the image",
      "20px outside around the image",
      "20px border",
      "No space",
    ],
    answer: "20px outside around the image",
  },
  {
    question: (
      <div>
        <p>Which margin property adds space only at the bottom?</p>
        <CodeBlock language="css" code={`img { margin-bottom: 30px; }`} />
      </div>
    ),
    options: ["margin-top", "margin-left", "margin-bottom", "margin-right"],
    answer: "margin-bottom",
  },
  {
    question: (
      <div>
        <p>What will this combination do?</p>
        <CodeBlock
          language="html"
          code={`<img src="sunset.jpg" width="400" height="300" style="margin: 15px;">`}
        />
      </div>
    ),
    options: [
      "Image with inline size and margin",
      "Image with only margin",
      "Image with only size",
      "Error",
    ],
    answer: "Image with inline size and margin",
  },
  {
    question: (
      <div>
        <p>What happens if src is missing?</p>
        <CodeBlock language="html" code={`<img width="200" height="150">`} />
      </div>
    ),
    options: [
      "Shows blank image",
      "Shows broken image icon",
      "Image is hidden",
      "Error in browser",
    ],
    answer: "Shows broken image icon",
  },
  {
    question: (
      <div>
        <p>How is the image sized here?</p>
        <CodeBlock
          language="html"
          code={`<img src="city.jpg" width="500" height="300">`}
        />
      </div>
    ),
    options: [
      "Using CSS",
      "Using HTML width and height attributes",
      "Using class",
      "Auto-sized",
    ],
    answer: "Using HTML width and height attributes",
  },
  {
    question: (
      <div>
        <p>Which side will have 25px margin?</p>
        <CodeBlock language="css" code={`.frame { margin-left: 25px; }`} />
        <CodeBlock
          language="html"
          code={`<img src="park.jpg" class="frame">`}
        />
      </div>
    ),
    options: ["Top", "Right", "Bottom", "Left"],
    answer: "Left",
  },

  // 5 Normal (Non-CodeBlock) Questions
  {
    question: "Which HTML element defines an image?",
    options: ["p", "h1", "img", "div"],
    answer: "img",
  },
  {
    question:
      "The image element in HTML is a void element and does not have a closing tag",
    options: ["True", "False"],
    answer: "True",
  },
  {
    question: "Identify the CSS property used to add space between elements.",
    options: ["border-width", "space", "margin", "padding"],
    answer: "margin",
  },
  {
    question: "Which attribute is required to display an image from a URL?",
    options: ["alt", "src", "href", "class"],
    answer: "src",
  },
  {
    question: "Which of the following is a void element?",
    options: ["<div>", "<p>", "<img>", "<span>"],
    answer: "<img>",
  },
];
const FavouritePlaces_Section_MCQ_1 = ({
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
      title="Favourite Places Section - MCQs"
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

export default FavouritePlaces_Section_MCQ_1;
