import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // 10 Code Block Questions
  {
    question: (
      <div>
        <p>What will be the height of the div?</p>
        <CodeBlock language="css" code={`.box { height: 200px; }`} />
        <CodeBlock language="html" code={`<div class="box">Content</div>`} />
      </div>
    ),
    options: ["200px", "100px", "Auto", "Full screen"],
    answer: "200px",
  },
  {
    question: (
      <div>
        <p>What width will this element have?</p>
        <CodeBlock language="css" code={`.card { width: 300px; }`} />
        <CodeBlock language="html" code={`<div class="card">Card</div>`} />
      </div>
    ),
    options: ["300px", "100%", "Auto", "500px"],
    answer: "300px",
  },
  {
    question: (
      <div>
        <p>Will a background image appear?</p>
        <CodeBlock
          language="css"
          code={`.hero { background-image: url('bg.jpg'); }`}
        />
        <CodeBlock
          language="html"
          code={`<div class="hero">Hero Section</div>`}
        />
      </div>
    ),
    options: [
      "Yes, if the URL is valid",
      "No, URL is invalid",
      "Only if height is set",
      "Never",
    ],
    answer: "Yes, if the URL is valid",
  },
  {
    question: (
      <div>
        <p>What does this CSS do to the container?</p>
        <CodeBlock language="css" code={`.full { height: 100vh; }`} />
        <CodeBlock
          language="html"
          code={`<div class="full">Full Height</div>`}
        />
      </div>
    ),
    options: [
      "Makes it 100% of viewport height",
      "Makes it 100px tall",
      "Makes it full width",
      "No effect",
    ],
    answer: "Makes it 100% of viewport height",
  },
  {
    question: (
      <div>
        <p>What width will the sidebar have?</p>
        <CodeBlock language="css" code={`.sidebar { width: 25vw; }`} />
        <CodeBlock language="html" code={`<div class="sidebar">Menu</div>`} />
      </div>
    ),
    options: [
      "25% of viewport width",
      "25 pixels",
      "25% of parent",
      "Full width",
    ],
    answer: "25% of viewport width",
  },
  {
    question: (
      <div>
        <p>Why might the background image not show fully?</p>
        <CodeBlock
          language="css"
          code={`.banner { background-image: url('photo.jpg'); }`}
        />
        <CodeBlock
          language="html"
          code={`<div class="banner">Short text</div>`}
        />
      </div>
    ),
    options: [
      "It takes height of content if no height is set",
      "Image URL is wrong",
      "background-image doesn't work",
      "Need width property",
    ],
    answer: "It takes height of content if no height is set",
  },
  {
    question: (
      <div>
        <p>What size will this box be?</p>
        <CodeBlock
          language="css"
          code={`.screen { 
  width: 50vw; 
  height: 50vh; 
}`}
        />
        <CodeBlock
          language="html"
          code={`<div class="screen">Centered Box</div>`}
        />
      </div>
    ),
    options: [
      "50% of viewport width and 50% of viewport height",
      "50 pixels wide and tall",
      "50% of parent element",
      "Full screen",
    ],
    answer: "50% of viewport width and 50% of viewport height",
  },
  {
    question: (
      <div>
        <p>What height will this section have?</p>
        <CodeBlock language="css" code={`.section { height: 80vh; }`} />
        <CodeBlock
          language="html"
          code={`<section class="section">Section</section>`}
        />
      </div>
    ),
    options: [
      "80% of viewport height",
      "80 pixels",
      "80% of parent",
      "Full height",
    ],
    answer: "80% of viewport height",
  },
  {
    question: (
      <div>
        <p>What width will the image container have?</p>
        <CodeBlock language="css" code={`.img-box { width: 100vw; }`} />
        <CodeBlock
          language="html"
          code={`<div class="img-box">Image</div>`}
        />
      </div>
    ),
    options: [
      "Full viewport width",
      "100 pixels",
      "100% of parent",
      "Auto",
    ],
    answer: "Full viewport width",
  },
  {
    question: (
      <div>
        <p>Will the background image be visible?</p>
        <CodeBlock
          language="css"
          code={`.empty { background-image: url('pattern.png'); height: 150px; }`}
        />
        <CodeBlock
          language="html"
          code={`<div class="empty"></div>`}
        />
      </div>
    ),
    options: [
      "Yes, because height is set",
      "No, because no content",
      "Only if width is set",
      "Never",
    ],
    answer: "Yes, because height is set",
  },

  // 5 Normal (Non-CodeBlock) Questions
  {
    question: "Which CSS Property specifies the height of an HTML element?",
    options: ["height", "width", "color", "background-color"],
    answer: "height",
  },
  {
    question: "Which CSS Property specifies the width of an HTML element?",
    options: ["width", "height", "margin", "padding"],
    answer: "width",
  },
  {
    question:
      "Which CSS Property specifies the background image of an HTML element?",
    options: ["background", "bg-image", "color", "background-image"],
    answer: "background-image",
  },
  {
    question: "Which CSS unit equals 1% of the height of the viewport?",
    options: ["px", "vh", "vw", "h"],
    answer: "vh",
  },
  {
    question: "Which CSS unit equals 1% of the width of the viewport?",
    options: ["vh", "vw", "px", "w"],
    answer: "vw",
  },
];

const Introductionto_Css_BoxModel_MCQ_1 = ({
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
      title="Introduction to CSS BoxModel - MCQs"
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

export default Introductionto_Css_BoxModel_MCQ_1;
