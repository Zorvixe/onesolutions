import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 10 Code Block Questions ==========
  {
    question: (
      <div>
        <p>What layout will this grid create on medium screens?</p>
        <CodeBlock
          language="html"
          code={`<div class="container">
          <div class="row">
            <div class="col-12 col-md-6">Left</div>
            <div class="col-12 col-md-6">Right</div>
          </div>
        </div>`}
        />
      </div>
    ),
    options: [
      "Stacked on mobile, side-by-side on tablet+",
      "Side-by-side on all devices",
      "Left full width always",
      "Right disappears on mobile",
    ],
    answer: "Stacked on mobile, side-by-side on tablet+",
  },
  {
    question: (
      <div>
        <p>
          What does <b>ms-auto</b> do in this navbar?
        </p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar navbar-expand-lg bg-light">
          <a class="navbar-brand" href="#">Logo</a>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="#">Sign In</a></li>
          </ul>
        </nav>`}
        />
      </div>
    ),
    options: [
      "Pushes nav items to the right",
      "Centers nav items",
      "Pushes to left",
      "No effect",
    ],
    answer: "Pushes nav items to the right",
  },
  {
    question: (
      <div>
        <p>
          What spacing does <b>p-3</b> add?
        </p>
        <CodeBlock
          language="html"
          code={`<div class="card p-3">
          <h5>Card Title</h5>
          <p>Content with 16px inner spacing</p>
        </div>`}
        />
      </div>
    ),
    options: ["8px", "16px", "24px", "48px"],
    answer: "16px",
  },
  {
    question: (
      <div>
        <p>How is this image made responsive?</p>
        <CodeBlock
          language="html"
          code={`<img src="food.jpg" class="img-fluid rounded" alt="Delicious">`}
        />
      </div>
    ),
    options: [
      "Using img-responsive",
      "Using img-fluid",
      "Using w-100",
      "Both 2 and 3",
    ],
    answer: "Both 2 and 3",
  },
  {
    question: (
      <div>
        <p>What happens to this column on large screens?</p>
        <CodeBlock
          language="html"
          code={`<div class="col-6 col-lg-3">Item</div>`}
        />
      </div>
    ),
    options: ["50% width", "25% width", "33.33% width", "Full width"],
    answer: "25% width",
  },
  {
    question: (
      <div>
        <p>
          Why use <b>mx-auto</b> here?
        </p>
        <CodeBlock
          language="html"
          code={`<div class="card mx-auto" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Centered Card</h5>
          </div>
        </div>`}
        />
      </div>
    ),
    options: [
      "To center the card horizontally",
      "To add margin top/bottom",
      "To make it full width",
      "No effect",
    ],
    answer: "To center the card horizontally",
  },
  {
    question: (
      <div>
        <p>What visual order on mobile vs desktop?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-column flex-md-row">
          <div class="order-2 order-md-1 p-2">First on Desktop</div>
          <div class="order-1 order-md-2 p-2">First on Mobile</div>
        </div>`}
        />
      </div>
    ),
    options: ["Same order everywhere", "Reversed on mobile", "Random", "Error"],
    answer: "Reversed on mobile",
  },
  {
    question: (
      <div>
        <p>
          What does <b>d-none d-lg-block</b> do?
        </p>
        <CodeBlock
          language="html"
          code={`<div class="d-none d-lg-block">
          Only visible on large screens
        </div>`}
        />
      </div>
    ),
    options: [
      "Hidden on mobile/tablet, visible on desktop",
      "Visible only on mobile",
      "Always hidden",
      "Visible everywhere",
    ],
    answer: "Hidden on mobile/tablet, visible on desktop",
  },
  {
    question: (
      <div>
        <p>
          What width does <b>w-75</b> apply?
        </p>
        <CodeBlock
          language="html"
          code={`<div class="w-75 bg-primary text-white p-3">
          75% Width Block
        </div>`}
        />
      </div>
    ),
    options: ["50%", "75%", "100%", "25%"],
    answer: "75%",
  },
  {
    question: (
      <div>
        <p>Which class creates a pill-shaped button?</p>
        <CodeBlock
          language="html"
          code={`<button class="btn btn-primary rounded-pill">Pill Button</button>`}
        />
      </div>
    ),
    options: ["rounded", "rounded-circle", "rounded-pill", "pill"],
    answer: "rounded-pill",
  },

  {
    question: "How many columns does Bootstrap Grid use by default?",
    options: ["6", "10", "12", "16"],
    answer: "12",
  },
  {
    question: "Bootstrap follows which design approach?",
    options: ["Desktop First", "Mobile First", "Tablet First", "TV First"],
    answer: "Mobile First",
  },
  {
    question: "What is the spacer value in Bootstrap spacing?",
    options: ["10px", "16px", "20px", "8px"],
    answer: "16px",
  },
  {
    question: "Which class makes text white?",
    options: ["text-white", "text-light", "text-bright", "text-pale"],
    answer: "text-white",
  },
  {
    question: "Which class is used for responsive images?",
    options: ["img-responsive", "img-fluid", "img-full", "img-auto"],
    answer: "img-fluid",
  },
];

const Responsive_MCQ_Assignments_1 = ({
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
      title="Responsive MCQ Assignments 1"
      showScore={true}
      allowReview={true}
      questions={randomQuestions}
    isCompleted={isCompleted}
    isLoading={isLoading}
    onComplete={handleCompletion}
    subtopicId={subtopicId}
    goalName={goalName}
    courseName={courseName}/>
  );
};

export default Responsive_MCQ_Assignments_1;
