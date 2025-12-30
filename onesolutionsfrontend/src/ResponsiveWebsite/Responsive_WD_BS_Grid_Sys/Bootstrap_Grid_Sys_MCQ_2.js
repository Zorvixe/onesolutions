import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 10 CodeBlock Questions ==========
  {
    question: (
      <div>
        <p>
          Which CSS property is used to get spacing <strong>between</strong>{" "}
          elements?
        </p>
      </div>
    ),
    options: ["padding", "margin", "border", "spacing"],
    answer: "margin",
  },
  {
    question: (
      <div>
        <p>What Bootstrap class is used for top margin?</p>
      </div>
    ),
    options: ["mt-*", "mb-*", "m-*", "ml-*"],
    answer: "mt-*",
  },
  {
    question: (
      <div>
        <p>What Bootstrap class is used for left padding?</p>
      </div>
    ),
    options: ["pl-*", "pr-*", "pt-*", "pb-*"],
    answer: "pl-*",
  },
  {
    question: (
      <div>
        <p>How much spacing does this class add?</p>
        <CodeBlock
          language="html"
          code={`<div class="mt-3">Top Margin</div>`}
        />
      </div>
    ),
    options: ["4px", "16px", "24px", "48px"],
    answer: "16px", // 1 * 16px = 16px
  },
  {
    question: (
      <div>
        <p>What does this class combination do?</p>
        <CodeBlock
          language="html"
          code={`<div class="p-4 bg-primary text-white">
  Padded Primary Box
</div>`}
        />
      </div>
    ),
    options: [
      "No padding, blue background",
      "24px padding all sides, blue background, white text",
      "Only background color",
      "Only white text",
    ],
    answer: "24px padding all sides, blue background, white text", // p-4 = 1.5rem = 24px
  },
  {
    question: (
      <div>
        <p>Which class adds 48px margin on all sides?</p>
        <CodeBlock language="html" code={`<div class="m-5">Big Margin</div>`} />
      </div>
    ),
    options: ["m-3", "m-4", "m-5", "mt-5"],
    answer: "m-5", // 3 * 16px = 48px
  },
  {
    question: (
      <div>
        <p>What will this button look like?</p>
        <CodeBlock
          language="html"
          code={`<button class="btn bg-success text-white p-3">
  Success Button
</button>`}
        />
      </div>
    ),
    options: [
      "Green background, white text, large padding",
      "Red background, no padding",
      "No background, small text",
      "Gray button with border",
    ],
    answer: "Green background, white text, large padding", // p-3 = 1rem = 16px
  },
  {
    question: (
      <div>
        <p>Which class adds bottom padding of 1.5rem?</p>
        <CodeBlock
          language="html"
          code={`<div class="pb-4">Bottom Padding</div>`}
        />
      </div>
    ),
    options: ["pb-3", "pb-4", "p-4", "mb-4"],
    answer: "pb-4", // 1.5rem = 24px
  },
  {
    question: (
      <div>
        <p>Can background color classes be used on any HTML element?</p>
        <CodeBlock
          language="html"
          code={`<p class="bg-warning">Warning Paragraph</p>
<span class="bg-danger text-white">Alert</span>
<div class="bg-info p-2">Info Box</div>`}
        />
      </div>
    ),
    options: [
      "Only on div elements",
      "Only on buttons",
      "Yes, on all HTML elements",
      "Only on headings",
    ],
    answer: "Yes, on all HTML elements",
  },
  {
    question: (
      <div>
        <p>Which class adds right margin of 0.5rem?</p>
        <CodeBlock
          language="html"
          code={`<button class="mr-2">Button 1</button>
<button>Button 2</button>`}
        />
      </div>
    ),
    options: ["ml-2", "mr-2", "m-2", "mt-2"],
    answer: "mr-2", // 0.5 * 16px = 8px
  },

  // ========== 5 Normal (Non-CodeBlock) Questions ==========
  {
    question:
      "What is the default spacer value in Bootstrap spacing utilities?",
    options: ["10px", "16px", "20px", "1rem"],
    answer: "16px",
  },
  {
    question: "Which Bootstrap class applies a primary background color?",
    options: ["bg-primary", "text-primary", "p-2", "bg-success"],
    answer: "bg-primary",
  },
  {
    question:
      "Bootstrap provides background color utilities for which elements?",
    options: ["Only text", "Only divs", "All HTML elements", "Only buttons"],
    answer: "All HTML elements",
  },
  {
    question: "What does `p-2` add in terms of padding?",
    options: ["8px", "16px", "24px", "32px"],
    answer: "8px", // 0.5 * 16px = 8px
  },
  {
    question:
      "Should you use `margin-left` or `margin-right` on Bootstrap grid columns?",
    options: [
      "Yes, it's fine",
      "No, it may break the layout",
      "Only on mobile",
      "Only with `!important`",
    ],
    answer: "No, it may break the layout",
  },
];

const Bootstrap_Grid_Sys_MCQ_2 = ({
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
      title= "Bootstrap Grid System - Part 2 | MCQs"
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

export default Bootstrap_Grid_Sys_MCQ_2;
