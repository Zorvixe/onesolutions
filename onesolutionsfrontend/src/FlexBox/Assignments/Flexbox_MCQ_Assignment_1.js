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
      "display: block",
      "display: flex",
      "display: inline",
      "display: grid",
    ],
    answer: "display: flex",
  },
  {
    question: (
      <div>
        <p>What is the default flex direction?</p>
      </div>
    ),
    options: ["column", "row", "row-reverse", "column-reverse"],
    answer: "row",
  },
  {
    question: (
      <div>
        <p>Which property aligns items horizontally (main axis)?</p>
      </div>
    ),
    options: [
      "align-items",
      "justify-content",
      "align-content",
      "flex-wrap",
    ],
    answer: "justify-content",
  },
  {
    question: (
      <div>
        <p>Which property aligns items vertically (cross axis)?</p>
      </div>
    ),
    options: [
      "justify-content",
      "align-items",
      "flex-direction",
      "gap",
    ],
    answer: "align-items",
  },
  {
    question: (
      <div>
        <p>What does <code>flex-wrap: wrap</code> do?</p>
      </div>
    ),
    options: [
      "Items shrink",
      "Items move to next line",
      "Items align center",
      "Items disappear",
    ],
    answer: "Items move to next line",
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
}`}
        />
      </div>
    ),
    options: [
      "Creates grid layout",
      "Creates flex container",
      "Hides elements",
      "Centers elements",
    ],
    answer: "Creates flex container",
  },
  {
    question: (
      <div>
        <p>What is the result of this?</p>
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
      "Aligns items vertically center",
      "Aligns items horizontally center",
      "Aligns items left",
      "Aligns items right",
    ],
    answer: "Aligns items horizontally center",
  },
  {
    question: (
      <div>
        <p>What does this code achieve?</p>
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
      "Wrap items",
      "Reverse items",
    ],
    answer: "Vertical center",
  },
  {
    question: (
      <div>
        <p>What happens here?</p>
        <CodeBlock
          language="css"
          code={`.container {
  display: flex;
  flex-direction: column;
}`}
        />
      </div>
    ),
    options: [
      "Items arranged horizontally",
      "Items arranged vertically",
      "Items overlap",
      "Items shrink",
    ],
    answer: "Items arranged vertically",
  },
  {
    question: (
      <div>
        <p>What will this do?</p>
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
      "Items align center",
    ],
    answer: "Items wrap to next line",
  },
  {
    question: (
      <div>
        <p>What is the effect of this code?</p>
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
        <p>What does this do?</p>
        <CodeBlock
          language="css"
          code={`.item {
  flex-shrink: 0;
}`}
        />
      </div>
    ),
    options: [
      "Item shrinks",
      "Item does not shrink",
      "Item grows",
      "Item wraps",
    ],
    answer: "Item does not shrink",
  },
  {
    question: (
      <div>
        <p>What will happen in this layout?</p>
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
      "Items grouped center",
      "Equal space between items",
      "Items overlap",
      "Items shrink",
    ],
    answer: "Equal space between items",
  },
  {
    question: (
      <div>
        <p>What is the purpose of <code>gap</code> in flexbox?</p>
      </div>
    ),
    options: [
      "Align items",
      "Add space between items",
      "Resize items",
      "Hide items",
    ],
    answer: "Add space between items",
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
];

const  Flexbox_MCQ_Assignment_1 = ({
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
 
  return <MCQLogic title="Flexbox MCQ Assignment 1" questions={randomQuestions}
  isCompleted={isCompleted}
  isLoading={isLoading}
  onComplete={handleCompletion}
  subtopicId={subtopicId}
  goalName={goalName}
  courseName={courseName} />;
};

export default  Flexbox_MCQ_Assignment_1;
