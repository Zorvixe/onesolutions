import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 10 CodeBlock Questions (Bootstrap Grid System) ==========
  {
    question: (
      <div>
        <p>How many columns does the Bootstrap Grid System use?</p>
      </div>
    ),
    options: ["6", "8", "12", "24"],
    answer: "12",
  },
  {
    question: (
      <div>
        <p>Which Bootstrap class is used to define columns?</p>
      </div>
    ),
    options: ["row", "container", "col-*", "grid"],
    answer: "col-*",
  },
  {
    question: (
      <div>
        <p>
          What is the purpose of the <code>container</code> class?
        </p>
      </div>
    ),
    options: [
      "To create columns",
      "To hold rows and columns",
      "To add background color",
      "To make text bold",
    ],
    answer: "To hold rows and columns",
  },
  {
    question: (
      <div>
        <p>What will this column do?</p>
        <CodeBlock
          language="html"
          code={`<div class="col-12">Full Width Content</div>`}
        />
      </div>
    ),
    options: [
      "Takes half the width",
      "Takes full width of the row",
      "Takes only 1 column",
      "No effect",
    ],
    answer: "Takes full width of the row",
  },
  {
    question: (
      <div>
        <p>Where should columns be placed?</p>
        <CodeBlock
          language="html"
          code={`<div class="container">
  <div class="row">
    <!-- Columns go here -->
  </div>
</div>`}
        />
      </div>
    ),
    options: [
      "Directly inside body",
      "Inside a container, outside a row",
      "Inside a row",
      "Inside another column",
    ],
    answer: "Inside a row",
  },
  {
    question: (
      <div>
        <p>What does this structure create?</p>
        <CodeBlock
          language="html"
          code={`<div class="container">
  <div class="row">
    <div class="col-6">Left</div>
    <div class="col-6">Right</div>
  </div>
</div>`}
        />
      </div>
    ),
    options: [
      "One full-width column",
      "Two equal columns side by side",
      "Two stacked columns",
      "Four small columns",
    ],
    answer: "Two equal columns side by side",
  },
  {
    question: (
      <div>
        <p>Which class creates a row that wraps columns?</p>
        <CodeBlock
          language="html"
          code={`<div class="row">
  <div class="col-4">33%</div>
  <div class="col-8">67%</div>
</div>`}
        />
      </div>
    ),
    options: ["container", "row", "col-12", "grid"],
    answer: "row",
  },
  {
    question: (
      <div>
        <p>What is the correct basic grid structure?</p>
        <CodeBlock
          language="html"
          code={`<!-- Option A -->
<div class="container"> <div class="row"> <div class="col-12">Content</div> </div> </div>

<!-- Option B -->
<div class="row"> <div class="container"> <div class="col-12">Content</div> </div> </div>

<!-- Option C -->
<div class="col-12"> <div class="row"> <div class="container">Content</div> </div> </div>`}
        />
      </div>
    ),
    options: ["Option A", "Option B", "Option C", "None are correct"],
    answer: "Option A",
  },
  {
    question: (
      <div>
        <p>How many columns should you specify in total per row?</p>
        <CodeBlock
          language="html"
          code={`<div class="row">
  <div class="col-3">25%</div>
  <div class="col-9">75%</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Exactly 12 columns required",
      "Maximum 10 columns",
      "Any number is fine",
      "Must be less than 12",
    ],
    answer: "Exactly 12 columns required",
  },
  {
    question: (
      <div>
        <p>Can a column use more than 12 as its number?</p>
        <CodeBlock
          language="html"
          code={`<div class="col-15">This is wrong</div>`}
        />
      </div>
    ),
    options: [
      "Yes, it will wrap",
      "No, maximum is 12",
      "Yes, it makes it wider",
      "Only on large screens",
    ],
    answer: "No, maximum is 12",
  },

  // ========== 5 Normal (Non-CodeBlock) Questions ==========
  {
    question: "What is the purpose of the `row` class in Bootstrap?",
    options: [
      "To hold the container",
      "To wrap and align columns",
      "To add padding",
      "To create a grid",
    ],
    answer: "To wrap and align columns",
  },
  {
    question: "Which class represents a full-width column in Bootstrap?",
    options: ["col-6", "col-8", "col-12", "col-full"],
    answer: "col-12",
  },
  {
    question: "How many columns are in a three equal-column layout?",
    options: ["col-3 each", "col-4 each", "col-6 each", "col-12 each"],
    answer: "col-4 each",
  },
  {
    question: "What happens if the sum of column numbers exceeds 12?",
    options: [
      "Extra columns are ignored",
      "They wrap to the next line",
      "Page breaks",
      "Error occurs",
    ],
    answer: "They wrap to the next line",
  },
  {
    question: "Which of the following is a valid column class in Bootstrap?",
    options: ["col-10", "col-13", "col-0", "col-full"],
    answer: "col-10",
  },
];

const Introductionto_Responsive_WD_MCQ = ({
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
      title="Introduction to Responsive Web Design - Bootstrap Grid MCQs"
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

export default Introductionto_Responsive_WD_MCQ;
