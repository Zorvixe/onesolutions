import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // 10 Code Block Questions
  {
    question: (
      <div>
        <p>When would you use this for an image?</p>
        <CodeBlock
          language="html"
          code={`<img src="festival.jpg" alt="Festival">`}
        />
      </div>
    ),
    options: [
      "When image is background",
      "When content overlaps image",
      "When image is part of content",
      "When no height is needed",
    ],
    answer: "When image is part of content",
  },
  {
    question: (
      <div>
        <p>Which approach is used here for the background?</p>
        <CodeBlock
          language="css"
          code={`.top-section { background-image: url('diwali-bg.jpg'); height: 400px; background-size: cover; }`}
        />
        <CodeBlock language="html" code={`<div class="top-section"></div>`} />
      </div>
    ),
    options: [
      "HTML img element",
      "CSS background image",
      "Inline image",
      "No image",
    ],
    answer: "CSS background image",
  },
  {
    question: (
      <div>
        <p>What does this CSS add to the element?</p>
        <CodeBlock language="css" code={`.card { padding: 20px; }`} />
        <CodeBlock language="html" code={`<div class="card">Content</div>`} />
      </div>
    ),
    options: [
      "Space outside border",
      "Space between elements",
      "Space around content inside border",
      "Border thickness",
    ],
    answer: "Space around content inside border",
  },
  {
    question: (
      <div>
        <p>What is the purpose of this margin?</p>
        <CodeBlock language="css" code={`.item { margin: 10px; }`} />
        <CodeBlock
          language="html"
          code={`<div class="container"><div class="item"></div><div class="item"></div></div>`}
        />
      </div>
    ),
    options: [
      "Space inside item",
      "Space between items",
      "Background color",
      "Text alignment",
    ],
    answer: "Space between items",
  },
  {
    question: (
      <div>
        <p>Which image URL is for the diya in the Diwali page cards?</p>
        <CodeBlock
          language="html"
          code={`<img src="https://d2clawv67efefq.cloudfront.net/ccbp-static-website/diya-img.png" alt="Diya">`}
        />
      </div>
    ),
    options: [
      "Lamp image",
      "Diya image",
      "Firework image",
      "Firecracker image",
    ],
    answer: "Diya image",
  },
  {
    question: (
      <div>
        <p>What color is applied to this container in the bottom section?</p>
        <CodeBlock
          language="css"
          code={`.bottom-section { background-color: #e6f6ff; padding: 20px; }`}
        />
        <CodeBlock
          language="html"
          code={`<div class="bottom-section">Cards here</div>`}
        />
      </div>
    ),
    options: ["White", "#e6f6ff", "#616e7c", "#323f4b"],
    answer: "#e6f6ff",
  },
  {
    question: (
      <div>
        <p>In the Diwali page top section, what does this do?</p>
        <CodeBlock
          language="css"
          code={`.heading { color: white; font-size: 40px; padding: 100px; }`}
        />
        <CodeBlock
          language="html"
          code={`<h1 class="heading">Happy Diwali</h1>`}
        />
      </div>
    ),
    options: [
      "Adds background image",
      "Sets heading style over background",
      "Aligns cards",
      "Adds button",
    ],
    answer: "Sets heading style over background",
  },
  {
    question: (
      <div>
        <p>What is being aligned here in the bottom section?</p>
        <CodeBlock
          language="css"
          code={`.cards-container { display: flex; flex-direction: row; justify-content: space-between; }`}
        />
        <CodeBlock
          language="html"
          code={`<div class="cards-container"><div class="card"></div><div class="card"></div></div>`}
        />
      </div>
    ),
    options: [
      "Headings",
      "Buttons",
      "Card items with flexbox",
      "Background images",
    ],
    answer: "Card items with flexbox",
  },
  {
    question: (
      <div>
        <p>Which URL is used for the firecracker image?</p>
        <CodeBlock
          language="html"
          code={`<img src="https://d2clawv67efefq.cloudfront.net/ccbp-static-website/firecracker-img.png" alt="Firecracker">`}
        />
      </div>
    ),
    options: [
      "Diya image",
      "Lamp image",
      "Firework image",
      "Firecracker image",
    ],
    answer: "Firecracker image",
  },
  {
    question: (
      <div>
        <p>What does this CSS do in the card items?</p>
        <CodeBlock
          language="css"
          code={`.card-text { color: #616e7c; font-size: 18px; font-weight: bold; padding: 10px; text-align: center; }`}
        />
        <CodeBlock
          language="html"
          code={`<p class="card-text">Price: $10</p>`}
        />
      </div>
    ),
    options: [
      "Sets background color",
      "Adds margin between cards",
      "Styles text in cards",
      "Adds image",
    ],
    answer: "Styles text in cards",
  },

  // 5 Normal (Non-CodeBlock) Questions
  {
    question:
      "The HTML image element is used to add images that are part of the content.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    question:
      "The margin is the space present outside the border of an HTML element.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    question:
      "In the step-by-step process for the Diwali page, what is done first in the top section?",
    options: [
      "Add heading",
      "Add a background image",
      "Specify background size",
      "Set color",
    ],
    answer: "Add a background image",
  },
  {
    question:
      "When should you use CSS background image instead of HTML image?",
    options: [
      "When image is part of content",
      "When no content overlaps",
      "When content or elements are over the image",
      "When image has no height",
    ],
    answer: "When content or elements are over the image",
  },
  {
    question:
      "Which color is used for the text in the Diwali page resources?",
    options: ["White", "#e6f6ff", "#616e7c", "#323f4b"],
    answer: "#616e7c",
  },
];

const Approachto_Develop_Layout_MCQ_2 = ({
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
      title="Approach to Develop Layout - MCQs"
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

export default Approachto_Develop_Layout_MCQ_2;
