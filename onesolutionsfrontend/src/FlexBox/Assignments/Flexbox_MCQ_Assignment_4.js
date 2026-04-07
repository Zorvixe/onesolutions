import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";


const questionsData = [
  // NORMAL (ADVANCED THEORY)

  {
    question: (
      <div>
        <p>Which property defines the main axis direction in Flexbox?</p>
      </div>
    ),
    options: [
      "align-items",
      "justify-content",
      "flex-direction",
      "flex-wrap",
    ],
    answer: "flex-direction",
  },
  {
    question: (
      <div>
        <p>What happens when <b>align-items</b> is used on a single-line flex container?</p>
      </div>
    ),
    options: [
      "Aligns items along main axis",
      "Aligns items along cross axis",
      "Has no effect",
      "Wraps items",
    ],
    answer: "Aligns items along cross axis",
  },
  {
    question: (
      <div>
        <p>Which property works only when there are multiple lines (wrapped items)?</p>
      </div>
    ),
    options: [
      "align-items",
      "justify-content",
      "align-content",
      "flex-grow",
    ],
    answer: "align-content",
  },
  {
    question: (
      <div>
        <p>What is the default value of <b>flex-wrap</b>?</p>
      </div>
    ),
    options: [
      "wrap",
      "nowrap",
      "wrap-reverse",
      "inherit",
    ],
    answer: "nowrap",
  },
  {
    question: (
      <div>
        <p>Which property is shorthand for flex-grow, flex-shrink, and flex-basis?</p>
      </div>
    ),
    options: [
      "flex",
      "flex-box",
      "flex-item",
      "flex-all",
    ],
    answer: "flex",
  },

  // CODE-BASED (TRICKY)

  {
    question: (
      <div>
        <p>What will be the layout direction?</p>
        <CodeBlock
          language="css"
          code={`.container {
  display: flex;
  flex-direction: row-reverse;
}`}
        />
      </div>
    ),
    options: [
      "Left to right",
      "Right to left",
      "Top to bottom",
      "Bottom to top",
    ],
    answer: "Right to left",
  },
  {
    question: (
      <div>
        <p>What is the effect of this code?</p>
        <CodeBlock
          language="css"
          code={`.container {
  display: flex;
  justify-content: flex-end;
}`}
        />
      </div>
    ),
    options: [
      "Align items left",
      "Align items right",
      "Center items",
      "Space between items",
    ],
    answer: "Align items right",
  },
  {
    question: (
      <div>
        <p>What will happen here?</p>
        <CodeBlock
          language="css"
          code={`.container {
  display: flex;
  align-items: stretch;
}`}
        />
      </div>
    ),
    options: [
      "Items shrink",
      "Items stretch to fill container height",
      "Items center vertically",
      "Items overlap",
    ],
    answer: "Items stretch to fill container height",
  },
  {
    question: (
      <div>
        <p>What is the output of this?</p>
        <CodeBlock
          language="css"
          code={`.item {
  flex: 1;
}`}
        />
      </div>
    ),
    options: [
      "flex-grow: 1; flex-shrink: 1; flex-basis: 0",
      "flex-grow: 0; flex-shrink: 1",
      "flex-grow: 1 only",
      "No effect",
    ],
    answer: "flex-grow: 1; flex-shrink: 1; flex-basis: 0",
  },
  {
    question: (
      <div>
        <p>What happens when <b>flex-basis</b> is set?</p>
        <CodeBlock
          language="css"
          code={`.item {
  flex-basis: 200px;
}`}
        />
      </div>
    ),
    options: [
      "Sets initial size before grow/shrink",
      "Fixes final size always",
      "Centers item",
      "Wraps item",
    ],
    answer: "Sets initial size before grow/shrink",
  },
  {
    question: (
      <div>
        <p>What will be the behavior?</p>
        <CodeBlock
          language="css"
          code={`.item {
  flex: 0 0 100px;
}`}
        />
      </div>
    ),
    options: [
      "Item grows and shrinks",
      "Item fixed at 100px",
      "Item stretches",
      "Item disappears",
    ],
    answer: "Item fixed at 100px",
  },
  {
    question: (
      <div>
        <p>What happens here?</p>
        <CodeBlock
          language="css"
          code={`.container {
  display: flex;
  gap: 20px;
}`}
        />
      </div>
    ),
    options: [
      "Adds space between items",
      "Adds margin outside container",
      "Aligns items",
      "Resizes items",
    ],
    answer: "Adds space between items",
  },
  {
    question: (
      <div>
        <p>What is the effect of this?</p>
        <CodeBlock
          language="css"
          code={`.container {
  display: flex;
  flex-wrap: wrap-reverse;
}`}
        />
      </div>
    ),
    options: [
      "Items wrap normally",
      "Items wrap in reverse direction",
      "Items don't wrap",
      "Items align center",
    ],
    answer: "Items wrap in reverse direction",
  },
  {
    question: (
      <div>
        <p>What will this do?</p>
        <CodeBlock
          language="css"
          code={`.item {
  align-self: center;
}`}
        />
      </div>
    ),
    options: [
      "Align all items",
      "Align single item on cross axis",
      "Align main axis",
      "Wrap items",
    ],
    answer: "Align single item on cross axis",
  },
  {
    question: (
      <div>
        <p>What happens when both <b>justify-content</b> and <b>align-items</b> are set to center?</p>
      </div>
    ),
    options: [
      "Items align top-left",
      "Items align center both horizontally and vertically",
      "Items overlap",
      "Items shrink",
    ],
    answer: "Items align center both horizontally and vertically",
  },
];

const  Flexbox_MCQ_Assignment_4 = ({
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
 
  return <MCQLogic title="Flexbox MCQ Assignment 4" questions={randomQuestions}
  isCompleted={isCompleted}
  isLoading={isLoading}
  onComplete={handleCompletion}
  subtopicId={subtopicId}
  goalName={goalName}
  courseName={courseName} />;
};

export default  Flexbox_MCQ_Assignment_4;
