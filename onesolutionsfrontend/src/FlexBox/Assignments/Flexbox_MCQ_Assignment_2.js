import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";


const questionsData = [
  // NORMAL QUESTIONS

  {
    question: (
      <div>
        <p>Which property is used to make a layout responsive?</p>
      </div>
    ),
    options: [
      "display",
      "flex",
      "media queries",
      "position",
    ],
    answer: "media queries",
  },
  {
    question: (
      <div>
        <p>Which combination is best for responsive design?</p>
      </div>
    ),
    options: [
      "Flexbox + Media Queries",
      "Grid only",
      "Float only",
      "Position only",
    ],
    answer: "Flexbox + Media Queries",
  },
  {
    question: (
      <div>
        <p>Which media feature is most commonly used for responsiveness?</p>
      </div>
    ),
    options: ["height", "width", "color", "font-size"],
    answer: "width",
  },
  {
    question: (
      <div>
        <p>What does <code>flex-direction: column</code> do in mobile layout?</p>
      </div>
    ),
    options: [
      "Items stay horizontal",
      "Items stack vertically",
      "Items disappear",
      "Items overlap",
    ],
    answer: "Items stack vertically",
  },
  {
    question: (
      <div>
        <p>What is the purpose of <code>@media</code> rule?</p>
      </div>
    ),
    options: [
      "Add animation",
      "Apply styles based on screen size",
      "Define variables",
      "Handle events",
    ],
    answer: "Apply styles based on screen size",
  },

  // CODE-BASED QUESTIONS

  {
    question: (
      <div>
        <p>What will this code do?</p>
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
      "Applies on desktop",
      "Stacks items vertically on small screens",
      "Hides items",
      "Centers items",
    ],
    answer: "Stacks items vertically on small screens",
  },
  {
    question: (
      <div>
        <p>What happens here?</p>
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
      "Vertical alignment",
      "Horizontal center alignment",
      "Wrap items",
      "Hide items",
    ],
    answer: "Horizontal center alignment",
  },
  {
    question: (
      <div>
        <p>What will this media query apply to?</p>
        <CodeBlock
          language="css"
          code={`@media (min-width: 1024px) {
  .container {
    flex-direction: row;
  }
}`}
        />
      </div>
    ),
    options: [
      "Mobile devices",
      "Tablets only",
      "Large screens",
      "Printers",
    ],
    answer: "Large screens",
  },
  {
    question: (
      <div>
        <p>What is the result of this?</p>
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
          code={`@media (max-width: 600px) {
  .item {
    flex: 100%;
  }
}`}
        />
      </div>
    ),
    options: [
      "Items stay same",
      "Each item takes full width on small screens",
      "Items shrink",
      "Items overlap",
    ],
    answer: "Each item takes full width on small screens",
  },
  {
    question: (
      <div>
        <p>What happens in this layout?</p>
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
      "Items hide",
      "Items overlap",
    ],
    answer: "Items wrap to next line",
  },
  {
    question: (
      <div>
        <p>What is the effect of this media query?</p>
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
        <p>What does this combination achieve?</p>
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
      "Items centered",
      "Equal space between items",
      "Items overlap",
      "Items shrink",
    ],
    answer: "Equal space between items",
  },
  {
    question: (
      <div>
        <p>What happens when using this media query?</p>
        <CodeBlock
          language="css"
          code={`@media (max-width: 480px) {
  .container {
    flex-direction: column;
    align-items: center;
  }
}`}
        />
      </div>
    ),
    options: [
      "Items align left",
      "Items stack vertically and center align",
      "Items hide",
      "Items overlap",
    ],
    answer: "Items stack vertically and center align",
  },
  {
    question: (
      <div>
        <p>What is the purpose of combining flexbox with media queries?</p>
      </div>
    ),
    options: [
      "To animate elements",
      "To make layouts responsive and adaptive",
      "To increase loading speed",
      "To hide elements",
    ],
    answer: "To make layouts responsive and adaptive",
  },
];

const  Flexbox_MCQ_Assignment_2 = ({
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
 
  return <MCQLogic title="Flexbox MCQ Assignment 2" questions={randomQuestions}
  isCompleted={isCompleted}
  isLoading={isLoading}
  onComplete={handleCompletion}
  subtopicId={subtopicId}
  goalName={goalName}
  courseName={courseName} />;
};

export default  Flexbox_MCQ_Assignment_2;
