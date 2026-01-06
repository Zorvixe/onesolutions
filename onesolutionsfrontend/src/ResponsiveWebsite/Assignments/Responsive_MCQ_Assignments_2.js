import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 10 Code Block Questions ==========
  {
    question: (
      <div>
        <p>What will be the color of the text?</p>
        <CodeBlock
          language="html"
          code={`<style>
  .alert { color: red; }
  p { color: blue; }
</style>
<p class="alert">Warning!</p>`}
        />
      </div>
    ),
    options: ["blue", "red", "black", "green"],
    answer: "red",
    // Class selector (0,1,0) beats type selector (0,0,1)
  },
  {
    question: (
      <div>
        <p>Will this span be blue?</p>
        <CodeBlock
          language="html"
          code={`<div style="color: blue;">
  <span>Text</span>
</div>`}
        />
      </div>
    ),
    options: ["Yes", "No", "Only if span has color", "Only on hover"],
    answer: "Yes",
    // color is inherited from parent
  },
  {
    question: (
      <div>
        <p>Which rule wins for the paragraph?</p>
        <CodeBlock
          language="html"
          code={`<style>
  p { color: green; }
  .text-red { color: red; }
</style>
<p class="text-red">Hello</p>`}
        />
      </div>
    ),
    options: ["green", "red", "black", "blue"],
    answer: "red",
    // Class > Type selector
  },
  {
    question: (
      <div>
        <p>What color will the heading be?</p>
        <CodeBlock
          language="html"
          code={`<style>
  h1 { color: orange; }
  #title { color: purple; }
</style>
<h1 id="title">Food Munch</h1>`}
        />
      </div>
    ),
    options: ["orange", "purple", "black", "red"],
    answer: "purple",
    // ID (0,1,0,0) > Type (0,0,0,1)
  },
  {
    question: (
      <div>
        <p>Will the background be visible on child?</p>
        <CodeBlock
          language="html"
          code={`<div style="background-color: yellow;">
  <p>Paragraph inside</p>
</div>`}
        />
      </div>
    ),
    options: ["Yes", "No", "Only on hover", "Only if p has bg"],
    answer: "No",
    // background-color is NOT inherited
  },
  {
    question: (
      <div>
        <p>What is the final color?</p>
        <CodeBlock
          language="html"
          code={`<style>
  .btn { color: gray !important; }
  .btn-primary { color: blue; }
</style>
<button class="btn btn-primary">Click</button>`}
        />
      </div>
    ),
    options: ["blue", "gray", "black", "white"],
    answer: "gray",
    // !important overrides everything
  },
  {
    question: (
      <div>
        <p>How are items arranged?</p>
        <CodeBlock
          language="html"
          code={`<div style="display: flex; justify-content: center; align-items: center; height: 200px; background: #f0f0f0;">
  <div style="background: coral; padding: 20px;">Centered</div>
</div>`}
        />
      </div>
    ),
    options: ["Top-left", "Center of container", "Bottom-right", "Stretched"],
    answer: "Center of container",
  },
  {
    question: (
      <div>
        <p>What layout does this create?</p>
        <CodeBlock
          language="html"
          code={`<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
  <div style="background: lightblue; padding: 1rem;">1</div>
  <div style="background: lightgreen; padding: 1rem;">2</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Stacked vertically",
      "Two equal columns with gap",
      "One full width",
      "Overlapping",
    ],
    answer: "Two equal columns with gap",
  },
  {
    question: (
      <div>
        <p>Where is the badge positioned?</p>
        <CodeBlock
          language="html"
          code={`<div style="position: relative; width: 100px; height: 100px; background: gray;">
  <span style="position: absolute; top: 0; right: 0; background: red; color: white; padding: 2px 6px;">5</span>
</div>`}
        />
      </div>
    ),
    options: ["Top-left of parent", "Top-right of parent", "Center", "Outside"],
    answer: "Top-right of parent",
    // absolute + relative parent
  },
  {
    question: (
      <div>
        <p>Which item appears first visually?</p>
        <CodeBlock
          language="html"
          code={`<div style="display: flex;">
  <div style="order: 3; background: pink;">A</div>
  <div style="order: 1; background: lightblue;">B</div>
  <div style="order: 2; background: lightgreen;">C</div>
</div>`}
        />
      </div>
    ),
    options: ["A", "B", "C", "Random"],
    answer: "B",
    // order: 1 → 2 → 3
  },

  // ========== 5 Normal (Non-CodeBlock) Questions ==========
  {
    question: "Which selector has the highest specificity?",
    options: ["#header", ".title", "h1", "div p"],
    answer: "#header",
  },
  {
    question: "Which wins if two rules have same specificity?",
    options: [
      "The one written first",
      "The one written last (Cascade)",
      "The one with !important",
      "Browser chooses",
    ],
    answer: "The one written last (Cascade)",
  },
  {
    question: "Which property is inherited?",
    options: ["margin", "color", "border", "padding"],
    answer: "color",
  },
  {
    question: "Default flex direction?",
    options: ["column", "row", "row-reverse", "column-reverse"],
    answer: "row",
  },
  {
    question: "Which is better for complex 2D layouts?",
    options: ["Flexbox", "CSS Grid", "Both same", "Float"],
    answer: "CSS Grid",
  },
];

const Responsive_MCQ_Assignments_2 = ({
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
      title="Responsive MCQ Assignments 2"
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

export default Responsive_MCQ_Assignments_2;
