import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 10 CodeBlock Questions ==========
  {
    question: (
      <div>
        <p>What happens when you place more than 12 columns in a single row?</p>
      </div>
    ),
    options: [
      "The page breaks",
      "Extra columns wrap to a new line",
      "Columns shrink automatically",
      "Bootstrap shows an error",
    ],
    answer: "Extra columns wrap to a new line",
  },
  {
    question: (
      <div>
        <p>Which Bootstrap prefix is used for medium devices (≥768px)?</p>
      </div>
    ),
    options: ["col-sm-", "col-md-", "col-lg-", "col-xl-"],
    answer: "col-md-",
  },
  {
    question: (
      <div>
        <p>Bootstrap follows which design approach?</p>
      </div>
    ),
    options: [
      "Desktop First",
      "Mobile First",
      "Tablet First",
      "Large Screen First",
    ],
    answer: "Mobile First",
  },
  {
    question: (
      <div>
        <p>What will happen in this row?</p>
        <CodeBlock
          language="html"
          code={`<div class="row">
  <div class="col-4">One</div>
  <div class="col-4">Two</div>
  <div class="col-6">Three</div>
</div>`}
        />
      </div>
    ),
    options: [
      "All three stay in one line",
      "Third column wraps to next line",
      "Columns overlap",
      "Error in layout",
    ],
    answer: "Third column wraps to next line",
  },
  {
    question: (
      <div>
        <p>How many columns are used here and what happens?</p>
        <CodeBlock
          language="html"
          code={`<div class="row">
  <div class="col-6">A</div>
  <div class="col-4">B</div>
  <div class="col-6">C</div>
  <div class="col-4">D</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Total 12, all in one row",
      "Total 20, so C and D wrap to next line",
      "Only first two show",
      "Layout breaks completely",
    ],
    answer: "Total 20, so C and D wrap to next line",
  },
  {
    question: (
      <div>
        <p>Which class applies to Extra small devices (less than 576px)?</p>
        <CodeBlock
          language="html"
          code={`<div class="col-12">Full on mobile</div>
<div class="col-sm-6">Half on small and up</div>`}
        />
      </div>
    ),
    options: ["col-", "col-sm-", "col-md-", "col-lg-"],
    answer: "col-",
  },
  {
    question: (
      <div>
        <p>What does this class mean?</p>
        <CodeBlock
          language="html"
          code={`<div class="col-lg-8">Content</div>`}
        />
      </div>
    ),
    options: [
      "8 columns on all devices",
      "8 columns only on large devices (≥992px) and up",
      "8 columns only on mobile",
      "8 columns starting from small devices",
    ],
    answer: "8 columns only on large devices (≥992px) and up",
  },
  {
    question: (
      <div>
        <p>
          Correct the layout: We want 3 equal columns on medium and larger
          screens
        </p>
        <CodeBlock
          language="html"
          code={`<!-- Option A -->
<div class="row">
  <div class="col-4">1</div>
  <div class="col-4">2</div>
  <div class="col-4">3</div>
</div>

<!-- Option B -->
<div class="row">
  <div class="col-md-4">1</div>
  <div class="col-md-4">2</div>
  <div class="col-md-4">3</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Option A – col-4 works everywhere",
      "Option B – col-md-4 for medium and up",
      "Both are wrong",
      "Both correct but different behavior",
    ],
    answer: "Option B – col-md-4 for medium and up",
  },
  {
    question: (
      <div>
        <p>What layout do you get on small phones?</p>
        <CodeBlock
          language="html"
          code={`<div class="row">
  <div class="col-12 col-md-6">Left</div>
  <div class="col-12 col-md-6">Right</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Two side-by-side columns",
      "Two full-width stacked columns",
      "One column disappears",
      "Layout breaks",
    ],
    answer: "Two full-width stacked columns",
  },
  {
    question: (
      <div>
        <p>Which prefix targets screens ≥1200px?</p>
        <CodeBlock
          language="html"
          code={`<div class="col-xl-3">25% on XL</div>`}
        />
      </div>
    ),
    options: ["col-lg-", "col-xl-", "col-xxl-", "col-md-"],
    answer: "col-xl-",
  },

  // ========== 5 Normal (Non-CodeBlock) Questions ==========
  {
    question: "What happens when the sum of columns in a row exceeds 12?",
    options: [
      "Columns disappear",
      "They automatically shrink",
      "Extra columns wrap to the next line",
      "Bootstrap throws an error",
    ],
    answer: "Extra columns wrap to the next line",
  },
  {
    question: "Which class prefix is used for large devices (≥992px)?",
    options: ["col-md-", "col-lg-", "col-xl-", "col-sm-"],
    answer: "col-lg-",
  },
  {
    question:
      "In Bootstrap's mobile-first approach, what should you design first?",
    options: [
      "Desktop layout",
      "Tablet layout",
      "Mobile layout",
      "Extra large layout",
    ],
    answer: "Mobile layout",
  },
  {
    question:
      "Which class applies styles starting from small devices (≥576px) and up?",
    options: ["col-", "col-sm-", "col-xs-", "col-mobile-"],
    answer: "col-sm-",
  },
  {
    question:
      "How do you make a column take 6 columns on medium screens and full width on mobile?",
    options: [
      "col-6 col-md-12",
      "col-12 col-md-6",
      "col-md-6 col-12",
      "col-6 col-12",
    ],
    answer: "col-12 col-md-6",
  },
];

const Bootstrap_Grid_Sys_MCQ_1 = ({
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
      title="Bootstrap Grid System - Part 1 | MCQs"
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

export default Bootstrap_Grid_Sys_MCQ_1;
