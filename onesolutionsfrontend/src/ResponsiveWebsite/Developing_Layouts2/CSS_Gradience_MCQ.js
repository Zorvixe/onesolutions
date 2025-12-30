import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 10 Code Block Questions ==========
  {
    question: (
      <div>
        <p>What direction does this gradient flow?</p>
        <CodeBlock
          language="css"
          code={`.gradient {
  background: linear-gradient(to right, #ff7e5f, #feb47b);
}`}
        />
        <CodeBlock
          language="html"
          code={`<div class="gradient" style="height: 100px;"></div>`}
        />
      </div>
    ),
    options: [
      "Top to bottom",
      "Left to right",
      "Right to left",
      "Center outward",
    ],
    answer: "Left to right",
  },
  {
    question: (
      <div>
        <p>What type of gradient does this create?</p>
        <CodeBlock
          language="css"
          code={`.radial-example {
  background: radial-gradient(circle, #ff7e5f, #feb47b);
}`}
        />
      </div>
    ),
    options: [
      "Straight line transition",
      "Circular transition from center outward",
      "Diagonal transition",
      "Vertical transition",
    ],
    answer: "Circular transition from center outward",
  },
  {
    question: (
      <div>
        <p>How many colors are used in this rainbow gradient?</p>
        <CodeBlock
          language="css"
          code={`.rainbow {
  background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
}`}
        />
      </div>
    ),
    options: ["2", "3", "7", "8"],
    answer: "7",
  },
  {
    question: (
      <div>
        <p>What will this Food Munch banner look like?</p>
        <CodeBlock
          language="html"
          code={`<section class="container py-5" style="
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  ">
    <h1 class="text-center">Welcome to Food Munch</h1>
  </section>`}
        />
      </div>
    ),
    options: [
      "Solid purple background",
      "Diagonal gradient from blue to purple",
      "Radial gradient from center",
      "Horizontal red to blue gradient",
    ],
    answer: "Diagonal gradient from blue to purple",
    // 135deg = top-left to bottom-right
  },
  {
    question: (
      <div>
        <p>Which gradient starts from the center and radiates outward?</p>
        <CodeBlock
          language="css"
          code={`.center-glow {
  background: radial-gradient(circle at center, #ff6b6b, transparent);
}`}
        />
      </div>
    ),
    options: ["Linear", "Radial", "Angular", "Conic"],
    answer: "Radial",
  },
  {
    question: (
      <div>
        <p>Default direction of a linear gradient (without 'to' keyword)?</p>
        <CodeBlock
          language="css"
          code={`.default-gradient {
  background: linear-gradient(#6a11cb, #2575fc);
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
    answer: "Top to bottom",
  },
  {
    question: (
      <div>
        <p>Best way to create a Thank You modal with gradient background?</p>
        <CodeBlock
          language="html"
          code={`<!-- Modal -->
<div class="modal fade" id="thankYouModal">
  <div class="modal-dialog">
    <div class="modal-content" style="
      background: linear-gradient(45deg, #ff9a9e 0%, #fecfef 100%);
    ">
      <div class="modal-header">
        <h5 class="modal-title">Thank You!</h5>
      </div>
      <div class="modal-body">
        <p>Your order has been placed successfully!</p>
      </div>
    </div>
  </div>
</div>`}
        />
      </div>
    ),
    options: [
      "Use Bootstrap bg-primary",
      "Apply linear-gradient to modal-content",
      "Use radial-gradient on modal-dialog",
      "Add gradient to modal-body only",
    ],
    answer: "Apply linear-gradient to modal-content",
  },
  {
    question: (
      <div>
        <p>What direction does this gradient use?</p>
        <CodeBlock
          language="css"
          code={`.diagonal {
  background: linear-gradient(to bottom right, #4facfe, #00f2fe);
}`}
        />
      </div>
    ),
    options: [
      "Top to bottom",
      "Left to right",
      "Top-left to bottom-right",
      "Center to edge",
    ],
    answer: "Top-left to bottom-right",
  },
  {
    question: (
      <div>
        <p>How many colors in this radial gradient?</p>
        <CodeBlock
          language="css"
          code={`.multi-radial {
  background: radial-gradient(circle, red, yellow, green, blue);
}`}
        />
      </div>
    ),
    options: ["2", "3", "4", "5"],
    answer: "4",
  },
  {
    question: (
      <div>
        <p>
          What shape does <code>circle</code> create in radial-gradient?
        </p>
        <CodeBlock
          language="css"
          code={`.circle-radial {
  background: radial-gradient(circle, #ffd89b, #19547b);
}`}
        />
      </div>
    ),
    options: ["Ellipse", "Perfect circle", "Square", "Rectangle"],
    answer: "Perfect circle",
  },

  // ========== 5 Normal (Non-CodeBlock) Questions ==========
  {
    question: "What is a CSS gradient primarily used for?",
    options: [
      "Creating text effects",
      "Smooth color transitions as background images",
      "Adding borders",
      "Changing font colors",
    ],
    answer: "Smooth color transitions as background images",
  },
  {
    question: "Which gradient type creates a transition along a straight line?",
    options: [
      "Radial gradient",
      "Linear gradient",
      "Circular gradient",
      "Diagonal gradient",
    ],
    answer: "Linear gradient",
  },
  {
    question:
      "Which direction keyword makes a gradient flow from right to left?",
    options: ["to left", "to right", "to top", "to bottom"],
    answer: "to left",
  },
  {
    question:
      "What is the default direction of a linear gradient without keywords?",
    options: [
      "Left to right",
      "Right to left",
      "Top to bottom",
      "Bottom to top",
    ],
    answer: "Top to bottom",
  },
  {
    question: "Which keyword defines the shape of a radial gradient?",
    options: ["to circle", "circle", "shape: circle", "radial-shape"],
    answer: "circle",
  },
];

const CSS_Gradience_MCQ = ({
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
      title="CSS Gradients - MCQs"
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

export default CSS_Gradience_MCQ;
