import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 10 Code Block Questions ==========
  {
    question: (
      <div>
        <p>
          How much padding does <b>pt-3</b> add?
        </p>
        <CodeBlock
          language="html"
          code={`<div class="pt-3">Top padding applied</div>`}
        />
      </div>
    ),
    options: ["4px", "8px", "16px", "24px"],
    answer: "16px", // 1 * 16px = 16px
  },
  {
    question: (
      <div>
        <p>Which class adds padding only to the left side?</p>
        <CodeBlock
          language="html"
          code={`<div class="pl-5">Left padding 48px</div>`}
        />
      </div>
    ),
    options: ["pr-5", "pl-5", "pt-5", "pb-5"],
    answer: "pl-5", // 3 * 16px = 48px
  },
  {
    question: (
      <div>
        <p>What will this spacing combination do?</p>
        <CodeBlock
          language="html"
          code={`<section class="py-5 px-4 bg-light">
  <div class="text-center">
    <h2>Why Choose Us</h2>
  </div>
</section>`}
        />
      </div>
    ),
    options: [
      "Padding only top and bottom",
      "Padding all sides",
      "Vertical and horizontal padding (py + px)",
      "No padding",
    ],
    answer: "Vertical and horizontal padding (py + px)",
    // py-5 = 48px top/bottom, px-4 = 24px left/right
  },
  {
    question: (
      <div>
        <p>
          Why use <code>&lt;span&gt;</code> for styling this text?
        </p>
        <CodeBlock
          language="html"
          code={`<p>We are <span class="text-primary fw-bold">trusted</span> by 1000+ clients.</p>`}
        />
      </div>
    ),
    options: [
      "Because span is block-level",
      "To style part of text inline without breaking flow",
      "Span adds automatic padding",
      "Only span accepts classes",
    ],
    answer: "To style part of text inline without breaking flow",
  },
  {
    question: (
      <div>
        <p>Which class adds 48px padding to the bottom?</p>
        <CodeBlock
          language="html"
          code={`<div class="pb-5">Large bottom space</div>`}
        />
      </div>
    ),
    options: ["pb-3", "pb-4", "pb-5", "p-5"],
    answer: "pb-5", // 3 * 16px = 48px
  },
  {
    question: (
      <div>
        <p>Best way to add inner spacing to a card-like section?</p>
        <CodeBlock
          language="html"
          code={`<div class="bg-white shadow p-4 rounded">
  <h3>Premium Quality</h3>
  <p>We deliver excellence.</p>
</div>`}
        />
      </div>
    ),
    options: [
      "Use margin instead",
      "Use p-4 (or p-*) for inner padding",
      "Use container class",
      "No padding needed",
    ],
    answer: "Use p-4 (or p-*) for inner padding",
  },
  {
    question: (
      <div>
        <p>
          How much total padding does <code>p-0</code> add?
        </p>
        <CodeBlock
          language="html"
          code={`<div class="p-0">No inner spacing</div>`}
        />
      </div>
    ),
    options: ["0px", "4px", "8px", "16px"],
    answer: "0px",
  },
  {
    question: (
      <div>
        <p>
          What padding does <code>p-2</code> apply?
        </p>
        <CodeBlock
          language="html"
          code={`<button class="p-2 btn btn-outline-primary">Click Me</button>`}
        />
      </div>
    ),
    options: ["4px", "8px", "16px", "24px"],
    answer: "8px", // 0.5 * 16px = 8px
  },
  {
    question: (
      <div>
        <p>Which class adds 24px padding on top and bottom?</p>
        <CodeBlock
          language="html"
          code={`<section class="py-4">
  <h2>Section Title</h2>
</section>`}
        />
      </div>
    ),
    options: ["py-3", "py-4", "pt-4 pb-4", "Both 2 and 3"],
    answer: "Both 2 and 3",
    // py-4 = 1.5rem = 24px top/bottom
  },
  {
    question: (
      <div>
        <p>
          Can <code>&lt;span&gt;</code> be used inside a heading?
        </p>
        <CodeBlock
          language="html"
          code={`<h1>Welcome to <span class="text-success">FoodMunch</span></h1>`}
        />
      </div>
    ),
    options: [
      "No, span is not allowed in headings",
      "Yes, to style part of the heading inline",
      "Only if span has display: block",
      "Only in Bootstrap cards",
    ],
    answer: "Yes, to style part of the heading inline",
  },

  // ========== 5 Normal (Non-CodeBlock) Questions ==========
  {
    question:
      "What is the default Bootstrap spacer value used in padding/margin utilities?",
    options: ["10px", "16px", "20px", "1rem"],
    answer: "16px",
  },
  {
    question: "Which class adds 24px padding on all sides?",
    options: ["p-2", "p-3", "p-4", "p-5"],
    answer: "p-4", // 1.5 * 16px = 24px
  },
  {
    question: "What type of HTML element is `<span>`?",
    options: ["Block-level", "Inline", "Table", "List"],
    answer: "Inline",
  },
  {
    question: "Which Bootstrap class removes all padding?",
    options: ["p-none", "p-0", "no-padding", "p-reset"],
    answer: "p-0",
  },
  {
    question: "What does `px-3` add in Bootstrap?",
    options: [
      "16px left and right",
      "16px top and bottom",
      "16px all sides",
      "No effect",
    ],
    answer: "16px left and right", // 1 * 16px horizontal
  },
];

const Why_Chooseus_Section_MCQ = ({
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
      title="Why Choose Us Section - MCQs"
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

export default Why_Chooseus_Section_MCQ;
