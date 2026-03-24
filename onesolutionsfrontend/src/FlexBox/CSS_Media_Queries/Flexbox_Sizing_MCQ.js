import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";
const questionsData = [
  // NORMAL QUESTIONS

  {
    question: (
      <div>
        <p>What does the <code>flex-grow</code> property control?</p>
      </div>
    ),
    options: [
      "Item shrinking",
      "Item expansion",
      "Item alignment",
      "Item visibility",
    ],
    answer: "Item expansion",
  },
  {
    question: (
      <div>
        <p>What is the default value of <code>flex-grow</code>?</p>
      </div>
    ),
    options: ["0", "1", "auto", "none"],
    answer: "0",
  },
  {
    question: (
      <div>
        <p>What does the <code>flex-shrink</code> property control?</p>
      </div>
    ),
    options: [
      "Item expansion",
      "Item shrinking",
      "Item color",
      "Item order",
    ],
    answer: "Item shrinking",
  },
  {
    question: (
      <div>
        <p>What is the default value of <code>flex-shrink</code>?</p>
      </div>
    ),
    options: ["0", "1", "2", "auto"],
    answer: "1",
  },
  {
    question: (
      <div>
        <p>Which value prevents a flex item from shrinking?</p>
      </div>
    ),
    options: ["flex-shrink: 1", "flex-shrink: 2", "flex-shrink: 0", "flex-shrink: auto"],
    answer: "flex-shrink: 0",
  },

  // CODE-BASED QUESTIONS

  {
    question: (
      <div>
        <p>What will happen in this case?</p>
        <CodeBlock
          language="css"
          code={`.box1 { flex-grow: 1; }
.box2 { flex-grow: 2; }`}
        />
      </div>
    ),
    options: [
      "Both boxes take equal space",
      "box1 takes more space",
      "box2 takes double space compared to box1",
      "No space distribution happens",
    ],
    answer: "box2 takes double space compared to box1",
  },
  {
    question: (
      <div>
        <p>What does this code do?</p>
        <CodeBlock
          language="css"
          code={`.item {
  flex-grow: 0;
}`}
        />
      </div>
    ),
    options: [
      "Item grows automatically",
      "Item does not grow",
      "Item shrinks",
      "Item disappears",
    ],
    answer: "Item does not grow",
  },
  {
    question: (
      <div>
        <p>What is the result of this code?</p>
        <CodeBlock
          language="css"
          code={`.item {
  flex-shrink: 0;
}`}
        />
      </div>
    ),
    options: [
      "Item shrinks faster",
      "Item does not shrink",
      "Item grows",
      "Item aligns center",
    ],
    answer: "Item does not shrink",
  },
  {
    question: (
      <div>
        <p>What will happen when space is limited?</p>
        <CodeBlock
          language="css"
          code={`.box1 { flex-shrink: 1; }
.box2 { flex-shrink: 2; }`}
        />
      </div>
    ),
    options: [
      "Both shrink equally",
      "box1 shrinks more",
      "box2 shrinks more",
      "No shrinking happens",
    ],
    answer: "box2 shrinks more",
  },
  {
    question: (
      <div>
        <p>Which property is used to control item shrinking?</p>
      </div>
    ),
    options: [
      "flex-grow",
      "flex-shrink",
      "flex-basis",
      "align-items",
    ],
    answer: "flex-shrink",
  },
  {
    question: (
      <div>
        <p>What does this combination do?</p>
        <CodeBlock
          language="css"
          code={`.item {
  flex-grow: 1;
  flex-shrink: 1;
}`}
        />
      </div>
    ),
    options: [
      "Item only grows",
      "Item only shrinks",
      "Item both grows and shrinks",
      "Item stays fixed",
    ],
    answer: "Item both grows and shrinks",
  },
  {
    question: (
      <div>
        <p>What happens here?</p>
        <CodeBlock
          language="css"
          code={`.item {
  flex-grow: 3;
}`}
        />
      </div>
    ),
    options: [
      "Item shrinks 3 times",
      "Item grows more compared to items with smaller values",
      "Item disappears",
      "Item aligns center",
    ],
    answer: "Item grows more compared to items with smaller values",
  },
  {
    question: (
      <div>
        <p>Which property helps distribute extra space among flex items?</p>
      </div>
    ),
    options: [
      "flex-shrink",
      "flex-grow",
      "justify-content",
      "align-items",
    ],
    answer: "flex-grow",
  },
  {
    question: (
      <div>
        <p>What will happen in this scenario?</p>
        <CodeBlock
          language="css"
          code={`.box1 { flex-grow: 1; }
.box2 { flex-grow: 1; }
.box3 { flex-grow: 1; }`}
        />
      </div>
    ),
    options: [
      "All boxes take equal space",
      "box1 takes more space",
      "box3 takes more space",
      "No growth happens",
    ],
    answer: "All boxes take equal space",
  },
  {
    question: (
      <div>
        <p>What happens when all items have <code>flex-grow: 0</code>?</p>
      </div>
    ),
    options: [
      "All items grow equally",
      "No item grows",
      "Items shrink",
      "Items overflow",
    ],
    answer: "No item grows",
  },
];

const Flexbox_Sizing_MCQ = ({
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
 
  return <MCQLogic title="Flexbox Sizing" questions={randomQuestions}
  isCompleted={isCompleted}
  isLoading={isLoading}
  onComplete={handleCompletion}
  subtopicId={subtopicId}
  goalName={goalName}
  courseName={courseName} />;
};

export default  Flexbox_Sizing_MCQ;
