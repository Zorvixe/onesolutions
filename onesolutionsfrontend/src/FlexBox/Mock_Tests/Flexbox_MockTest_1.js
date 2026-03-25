import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";


const questionsData = [
  // NORMAL QUESTIONS

  {
    question: (
      <div>
        <p>Which property is used to create a flex container?</p>
      </div>
    ),
    options: [
      "display: grid",
      "display: flex",
      "display: block",
      "display: inline",
    ],
    answer: "display: flex",
  },
  {
    question: (
      <div>
        <p>Which media feature is commonly used for responsive design?</p>
      </div>
    ),
    options: ["height", "width", "color", "border"],
    answer: "width",
  },
  {
    question: (
      <div>
        <p>What does <code>justify-content</code> control?</p>
      </div>
    ),
    options: [
      "Vertical alignment",
      "Horizontal alignment (main axis)",
      "Font size",
      "Element visibility",
    ],
    answer: "Horizontal alignment (main axis)",
  },
  {
    question: (
      <div>
        <p>What does <code>@media</code> rule do?</p>
      </div>
    ),
    options: [
      "Adds animation",
      "Applies styles based on conditions",
      "Defines variables",
      "Handles events",
    ],
    answer: "Applies styles based on conditions",
  },
  {
    question: (
      <div>
        <p>Which property stacks flex items vertically?</p>
      </div>
    ),
    options: [
      "justify-content",
      "align-items",
      "flex-direction: column",
      "flex-wrap",
    ],
    answer: "flex-direction: column",
  },

  // CODE-BASED QUESTIONS

  {
    question: (
      <div>
        <p>What will this code do?</p>
        <CodeBlock
          language="css"
          code={`.container {
  display: flex;
  justify-content: center;
}`}
        />
      </div>
    ),
    options: [
      "Align items vertically",
      "Align items horizontally center",
      "Wrap items",
      "Hide items",
    ],
    answer: "Align items horizontally center",
  },
  {
    question: (
      <div>
        <p>What happens here?</p>
        <CodeBlock
          language="css"
          code={`.container {
  display: flex;
  align-items: center;
}`}
        />
      </div>
    ),
    options: [
      "Horizontal center",
      "Vertical center",
      "Items wrap",
      "Items shrink",
    ],
    answer: "Vertical center",
  },
  {
    question: (
      <div>
        <p>What will this media query do?</p>
        <CodeBlock
          language="css"
          code={`@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}`}
        />
      </div>
    ),
    options: [
      "Applies on large screens",
      "Stacks items vertically on small screens",
      "Hides items",
      "Centers items",
    ],
    answer: "Stacks items vertically on small screens",
  },
  {
    question: (
      <div>
        <p>What is the result of this?</p>
        <CodeBlock
          language="css"
          code={`.container {
  display: flex;
  flex-wrap: wrap;
}`}
        />
      </div>
    ),
    options: [
      "Items stay in one line",
      "Items wrap to next line",
      "Items disappear",
      "Items overlap",
    ],
    answer: "Items wrap to next line",
  },
  {
    question: (
      <div>
        <p>What does this media query apply to?</p>
        <CodeBlock
          language="css"
          code={`@media (min-width: 1024px) {
  body {
    background: blue;
  }
}`}
        />
      </div>
    ),
    options: [
      "Mobile devices",
      "Small screens",
      "Large screens",
      "Printers",
    ],
    answer: "Large screens",
  },
  {
    question: (
      <div>
        <p>What happens here?</p>
        <CodeBlock
          language="css"
          code={`.item {
  flex-grow: 1;
}`}
        />
      </div>
    ),
    options: [
      "Item shrinks",
      "Item grows to fill space",
      "Item hides",
      "Item aligns center",
    ],
    answer: "Item grows to fill space",
  },
  {
    question: (
      <div>
        <p>What will this do?</p>
        <CodeBlock
          language="css"
          code={`@media (orientation: portrait) {
  .container {
    flex-direction: column;
  }
}`}
        />
      </div>
    ),
    options: [
      "Applies in landscape",
      "Applies in portrait and stacks items vertically",
      "Hides elements",
      "Centers items",
    ],
    answer: "Applies in portrait and stacks items vertically",
  },
  {
    question: (
      <div>
        <p>What is the effect of this?</p>
        <CodeBlock
          language="css"
          code={`.container {
  display: flex;
  justify-content: space-between;
}`}
        />
      </div>
    ),
    options: [
      "Items center",
      "Equal space between items",
      "Items overlap",
      "Items shrink",
    ],
    answer: "Equal space between items",
  },
  {
    question: (
      <div>
        <p>What happens when all items have <code>flex-grow: 1</code>?</p>
      </div>
    ),
    options: [
      "One item grows more",
      "All items take equal space",
      "Items shrink",
      "Items overlap",
    ],
    answer: "All items take equal space",
  },
  {
    question: (
      <div>
        <p>What is the main purpose of combining Flexbox with Media Queries?</p>
      </div>
    ),
    options: [
      "To animate elements",
      "To create responsive layouts",
      "To hide elements",
      "To increase font size",
    ],
    answer: "To create responsive layouts",
  },
];

const  Flexbox_MockTest_1 = ({
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
 
  return <MCQLogic title=" Flexbox MockTest 1" questions={randomQuestions}
  isCompleted={isCompleted}
  isLoading={isLoading}
  onComplete={handleCompletion}
  subtopicId={subtopicId}
  goalName={goalName}
  courseName={courseName} />;
};

export default   Flexbox_MockTest_1;
