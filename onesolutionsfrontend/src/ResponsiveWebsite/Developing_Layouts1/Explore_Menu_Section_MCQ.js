import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== CodeBlock Questions ==========

  {
    question: (
      <div>
        <p>What does width: 50% mean for a child element?</p>
        <CodeBlock
          language="css"
          code={`.child {
  width: 50%;
}`}
        />
      </div>
    ),
    options: [
      "50% of the viewport width",
      "50% of the parent's width",
      "50px fixed width",
      "50% of the height",
    ],
    answer: "50% of the parent's width",
  },

  {
    question: (
      <div>
        <p>Which Bootstrap class makes an element full width?</p>
        <CodeBlock
          language="html"
          code={`<div class="w-100">Full Width</div>`}
        />
      </div>
    ),
    options: ["w-100", "w-full", "width-100", "full-width"],
    answer: "w-100",
  },

  {
    question: (
      <div>
        <p>What does this class do?</p>
        <CodeBlock
          language="html"
          code={`<div class="w-50">Box</div>`}
        />
      </div>
    ),
    options: [
      "50px width",
      "50% width of parent",
      "Half height",
      "Auto width",
    ],
    answer: "50% width of parent",
  },

  {
    question: (
      <div>
        <p>Which attribute allows Bootstrap icons to inherit text color?</p>
        <CodeBlock
          language="html"
          code={`<svg fill="currentColor" class="text-primary"></svg>`}
        />
      </div>
    ),
    options: ["color", "fill", "stroke", "inherit-color"],
    answer: "fill",
  },

  {
    question: (
      <div>
        <p>Which HTML element is used for Bootstrap Icons?</p>
        <CodeBlock
          language="html"
          code={`<svg width="16" height="16"></svg>`}
        />
      </div>
    ),
    options: ["<icon>", "<i>", "<img>", "<svg>"],
    answer: "<svg>",
  },

  {
    question: (
      <div>
        <p>How do you resize a Bootstrap Icon?</p>
        <CodeBlock
          language="html"
          code={`<svg width="32" height="32"></svg>`}
        />
      </div>
    ),
    options: [
      "Use font-size",
      "Change width and height",
      "Use class icon-large",
      "Use zoom",
    ],
    answer: "Change width and height",
  },

  {
    question: (
      <div>
        <p>Which class removes shadow from an element?</p>
        <CodeBlock
          language="html"
          code={`<div class="shadow-none">No Shadow</div>`}
        />
      </div>
    ),
    options: ["shadow-none", "shadow-0", "no-shadow", "shadow-off"],
    answer: "shadow-none",
  },

  {
    question: (
      <div>
        <p>What does this class apply?</p>
        <CodeBlock
          language="html"
          code={`<div class="shadow-lg">Box</div>`}
        />
      </div>
    ),
    options: [
      "No shadow",
      "Small shadow",
      "Medium shadow",
      "Large shadow",
    ],
    answer: "Large shadow",
  },

  {
    question: (
      <div>
        <p>What happens when width is changed for an image?</p>
        <CodeBlock
          language="html"
          code={`<img src="img.png" class="w-50" />`}
        />
      </div>
    ),
    options: [
      "Height stays same",
      "Height adjusts automatically",
      "Image breaks",
      "Width ignored",
    ],
    answer: "Height adjusts automatically",
  },

  {
    question: (
      <div>
        <p>Where do you get Bootstrap Icons from?</p>
        <CodeBlock
          language="html"
          code={`https://icons.getbootstrap.com`}
        />
      </div>
    ),
    options: [
      "getbootstrap.com",
      "icons.getbootstrap.com",
      "fontawesome.com",
      "bootstrapicons.io",
    ],
    answer: "icons.getbootstrap.com",
  },

  // ========== Normal Questions ==========

  {
    question: "Which Bootstrap class sets width to 75%?",
    options: ["w-25", "w-50", "w-75", "w-100"],
    answer: "w-75",
  },

  {
    question: "Which Bootstrap class sets width to 25%?",
    options: ["w-25", "w-50", "w-75", "w-100"],
    answer: "w-25",
  },

  {
    question: "How do you add Bootstrap Icons to HTML?",
    options: [
      "Use CSS file",
      "Copy-paste SVG code",
      "Use <i> tag",
      "Use CDN only",
    ],
    answer: "Copy-paste SVG code",
  },

  {
    question: "What does shadow class do?",
    options: [
      "Removes border",
      "Adds box shadow",
      "Adds padding",
      "Changes color",
    ],
    answer: "Adds box shadow",
  },

  {
    question: "Which class applies small shadow?",
    options: ["shadow-sm", "shadow-lg", "shadow-none", "shadow-xl"],
    answer: "shadow-sm",
  },
];

const Explore_Menu_Section_MCQ = ({
  subtopicId,
  goalName,
  courseName,
  onComplete,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

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
        courseName,
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
      title="Explore Menu Section - MCQs"
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

export default Explore_Menu_Section_MCQ;
