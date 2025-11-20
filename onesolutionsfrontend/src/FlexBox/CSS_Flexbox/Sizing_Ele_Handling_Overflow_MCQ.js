import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";
const questionsData = [
  {
    question: (
      <div>
        <p>What do we call an element's natural, default size in CSS?</p>
      </div>
    ),
    options: [
      "Intrinsic Size",
      "Extrinsic Size",
      "Natural Property",
      "Default Width",
    ],
    answer: "Intrinsic Size",
  },
  {
    question: (
      <div>
        <p>
          When a specific size is manually set for an element, it is known as?
        </p>
      </div>
    ),
    options: [
      "Intrinsic Size",
      "Extrinsic Size",
      "Inherited Size",
      "Fixed Width",
    ],
    answer: "Extrinsic Size",
  },
  {
    question: (
      <div>
        <p>
          Which CSS property controls what happens when content overflows an
          element's box?
        </p>
      </div>
    ),
    options: ["display", "overflow", "visibility", "clip"],
    answer: "overflow",
  },
  {
    question: (
      <div>
        <p>
          What is the default value of the <code>overflow</code> property?
        </p>
      </div>
    ),
    options: ["hidden", "auto", "visible", "scroll"],
    answer: "visible",
  },
  {
    question: (
      <div>
        <p>
          Which overflow value hides overflowing content without scrollbars?
        </p>
      </div>
    ),
    options: ["scroll", "auto", "visible", "hidden"],
    answer: "hidden",
  },
  {
    question: (
      <div>
        <p>
          The <code>overflow-x</code> property handles overflow in which
          direction?
        </p>
      </div>
    ),
    options: ["Vertical", "Horizontal", "Both", "None"],
    answer: "Horizontal",
  },
  {
    question: (
      <div>
        <p>
          Which CSS properties are used to set the minimum size of an element?
        </p>
      </div>
    ),
    options: [
      "min-size and max-size",
      "min-height and min-width",
      "min-length and min-breadth",
      "limit-height and limit-width",
    ],
    answer: "min-height and min-width",
  },
  {
    question: (
      <div>
        <p>Which properties restrict the maximum dimensions of an element?</p>
      </div>
    ),
    options: [
      "max-height and max-width",
      "min-height and min-width",
      "height and width",
      "overflow-x and overflow-y",
    ],
    answer: "max-height and max-width",
  },
  {
    question: (
      <div>
        <p>
          If content exceeds the maximum size, how can it be observed
          visually?
        </p>
      </div>
    ),
    options: [
      "By using the overflow property",
      "By increasing padding",
      "By setting position to relative",
      "By changing z-index",
    ],
    answer: "By using the overflow property",
  },
  {
    question: (
      <div>
        <p>Which meta tag ensures proper page scaling on mobile devices?</p>
        <CodeBlock
          language="html"
          code={`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`}
        />
      </div>
    ),
    options: [
      "<meta name='mobile' />",
      "<meta name='scale' />",
      "<meta name='viewport' />",
      "<meta content='viewport' />",
    ],
    answer: "<meta name='viewport' />",
  },
];
const Sizing_Ele_Handling_Overflow_MCQ = ({
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
      title="Sizing Elements and Handling Overflow"
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

export default Sizing_Ele_Handling_Overflow_MCQ;
