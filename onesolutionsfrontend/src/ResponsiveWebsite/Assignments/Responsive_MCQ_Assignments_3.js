import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 10 Code Block Questions ==========
  {
    question: (
      <div>
        <p>What layout does this create?</p>
        <CodeBlock
          language="html"
          code={`<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
  <div style="background: #ff6b6b; padding: 1rem;">1</div>
  <div style="background: #4ecdc4; padding: 1rem;">2</div>
  <div style="background: #45b7d1; padding: 1rem;">3</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Stacked vertically",
      "Three equal columns with 1rem gap",
      "One full-width column",
      "Overlapping items",
    ],
    answer: "Three equal columns with 1rem gap",
  },
  {
    question: (
      <div>
        <p>Where is the badge positioned?</p>
        <CodeBlock
          language="html"
          code={`<div style="position: relative; width: 120px; height: 120px; background: #f0f0f0;">
  <span style="position: absolute; top: 0; right: 0; background: red; color: white; padding: 4px 8px; border-radius: 50%;">
    3
  </span>
  <img src="item.jpg" style="width: 100%; height: 100%; object-fit: cover;">
</div>`}
        />
      </div>
    ),
    options: [
      "Top-left corner",
      "Top-right corner",
      "Center",
      "Outside the container",
    ],
    answer: "Top-right corner",
  },
  {
    question: (
      <div>
        <p>How many columns does this grid have on wide screens?</p>
        <CodeBlock
          language="html"
          code={`<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
  <div style="background: #ffd93d; padding: 1rem;">Card 1</div>
  <div style="background: #ff6b6b; padding: 1rem;">Card 2</div>
  <div style="background: #4ecdc4; padding: 1rem;">Card 3</div>
  <div style="background: #45b7d1; padding: 1rem;">Card 4</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Always 4",
      "1 to 4 depending on screen width",
      "Always 2",
      "Always 1",
    ],
    answer: "1 to 4 depending on screen width",
  },
  {
    question: (
      <div>
        <p>What happens to the header when scrolling?</p>
        <CodeBlock
          language="html"
          code={`<header style="position: sticky; top: 0; background: white; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 1000;">
  Sticky Header
</header>
<div style="height: 2000px; background: linear-gradient(white, #f0f0f0); padding: 1rem;">
  Long content...
</div>`}
        />
      </div>
    ),
    options: [
      "Disappears immediately",
      "Stays at top while scrolling",
      "Moves with content",
      "Only visible on mobile",
    ],
    answer: "Stays at top while scrolling",
  },
  {
    question: (
      <div>
        <p>Which item spans 2 columns?</p>
        <CodeBlock
          language="html"
          code={`<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
  <div style="background: #ffe66d; padding: 1rem;">A</div>
  <div style="background: #ff6b6b; padding: 1rem; grid-column: span 2;">B (wide)</div>
  <div style="background: #4ecdc4; padding: 1rem;">C</div>
</div>`}
        />
      </div>
    ),
    options: ["Item A", "Item B", "Item C", "None"],
    answer: "Item B",
  },
  {
    question: (
      <div>
        <p>Is the image cropped or stretched?</p>
        <CodeBlock
          language="html"
          code={`<div style="width: 300px; height: 200px; background: #eee;">
  <img src="food.jpg" style="width: 100%; height: 100%; object-fit: cover;" alt="Food">
</div>`}
        />
      </div>
    ),
    options: [
      "Stretched to fit",
      "Cropped to fill container",
      "Full image visible (may have letterbox)",
      "No effect",
    ],
    answer: "Cropped to fill container",
  },
  {
    question: (
      <div>
        <p>What happens on hover?</p>
        <CodeBlock
          language="html"
          code={`<div style="width: 200px; height: 200px; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: box-shadow 0.3s ease, transform 0.3s ease;"
     onmouseover="this.style.boxShadow='0 10px 20px rgba(0,0,0,0.2)'; this.style.transform='translateY(-4px)';"
     onmouseout="this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'; this.style.transform='translateY(0)';">
  Hover Card
</div>`}
        />
      </div>
    ),
    options: [
      "No change",
      "Lifts up with bigger shadow",
      "Becomes transparent",
      "Rotates",
    ],
    answer: "Lifts up with bigger shadow",
  },
  {
    question: (
      <div>
        <p>Where is the modal centered?</p>
        <CodeBlock
          language="html"
          code={`<div style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: grid; place-items: center; z-index: 1050;">
  <div style="background: white; padding: 2rem; border-radius: 8px; width: 90%; max-width: 500px;">
    <h3>Thank You!</h3>
    <p>Your order is confirmed.</p>
  </div>
</div>`}
        />
      </div>
    ),
    options: [
      "Top-left",
      "Center of screen",
      "Bottom-right",
      "Only on desktop",
    ],
    answer: "Center of screen",
  },
  {
    question: (
      <div>
        <p>How many implicit rows are created?</p>
        <CodeBlock
          language="html"
          code={`<div style="display: grid; grid-template-columns: repeat(2, 1fr); grid-auto-rows: 150px; gap: 1rem;">
  <div style="background: #a8e6cf;">1</div>
  <div style="background: #ffd3b6;">2</div>
  <div style="background: #ffaaa5;">3</div>
  <div style="background: #dcedc1;">4</div>
  <div style="background: #c7ceea;">5</div>
</div>`}
        />
      </div>
    ),
    options: ["2 rows", "3 rows", "5 rows", "1 row"],
    answer: "3 rows",
    // 2 columns → items 3,4,5 create 2 more rows → total 3
  },
  {
    question: (
      <div>
        <p>Which item appears on top?</p>
        <CodeBlock
          language="html"
          code={`<div style="position: relative; width: 200px; height: 200px;">
  <div style="position: absolute; top: 20px; left: 20px; width: 100px; height: 100px; background: red; z-index: 10;">Red</div>
  <div style="position: absolute; top: 40px; left: 40px; width: 100px; height: 100px; background: blue; z-index: 5;">Blue</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Blue (later in HTML)",
      "Red (higher z-index)",
      "They overlap equally",
      "No overlap",
    ],
    answer: "Red (higher z-index)",
  },

  // ========== 5 Normal (Non-CodeBlock) Questions ==========
  {
    question: "Which property controls spacing between grid items?",
    options: ["margin", "padding", "gap", "space"],
    answer: "gap",
  },
  {
    question: "How to make a flex item not shrink?",
    options: ["flex-shrink: 0", "flex: 1", "flex-grow: 0", "width: fixed"],
    answer: "flex-shrink: 0",
  },
  {
    question: "When is <code>position: absolute</code> positioned relative to?",
    options: ["Nearest positioned ancestor", "Parent div", "Body", "Viewport"],
    answer: "Nearest positioned ancestor",
  },
  {
    question: "What does <code>z-index: 999</code> do?",
    options: [
      "Controls stacking order",
      "Controls opacity",
      "Controls size",
      "Invalid",
    ],
    answer: "Controls stacking order",
  },
  {
    question: "What does <code>object-fit: cover</code> do?",
    options: [
      "Crops image to fill container",
      "Stretches image",
      "Shows full image",
      "Adds border",
    ],
    answer: "Crops image to fill container",
  },
];

const Responsive_MCQ_Assignments_3 = ({
  subtopicId,
  goalName,
  courseName,
  onComplete
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } = useAuth();

  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5).slice(0, 30);

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
      title="Responsive MCQ Assignments 3"
      showScore={true}
      allowReview={true}
      timeLimit={1800} // 30 minutes
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

export default Responsive_MCQ_Assignments_3;
