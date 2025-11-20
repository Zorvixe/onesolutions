import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 10 Code Block Questions ==========
  {
    question: (
      <div>
        <p>What will be the visual order of these items on medium screens?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex">
  <div class="order-3 order-md-1">First</div>
  <div class="order-1 order-md-2">Second</div>
  <div class="order-2 order-md-3">Third</div>
</div>`}
        />
      </div>
    ),
    options: [
      "First to Second to Third",
      "Second to Third to First",
      "First to Third to Second",
      "Third to First to Second",
    ],
    answer: "First to Second to Third",
    // On md+: order-md-1 (First), order-md-2 (Second), order-md-3 (Third)
  },
  {
    question: (
      <div>
        <p>Which class shows an element as inline on large screens?</p>
        <CodeBlock
          language="html"
          code={`<span class="d-lg-inline">Inline on LG</span>`}
        />
      </div>
    ),
    options: ["d-inline-lg", "d-lg-inline", "inline-lg", "d-lg-inline-block"],
    answer: "d-lg-inline",
  },
  {
    question: (
      <div>
        <p>How to reverse item order only on small screens?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-sm-row-reverse">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Use order-sm-12 and order-sm-1",
      "Use flex-sm-row-reverse",
      "Use d-sm-flex-reverse",
      "Not possible",
    ],
    answer: "Use flex-sm-row-reverse",
  },
  {
    question: (
      <div>
        <p>Make this image hidden on mobile but visible on tablet and up:</p>
        <CodeBlock
          language="html"
          code={`<img src="promo.jpg" class="d-none d-md-block" alt="Offer">`}
        />
      </div>
    ),
    options: [
      "d-block d-md-none",
      "d-none d-md-block",
      "d-md-visible",
      "visible-md-up",
    ],
    answer: "d-none d-md-block",
  },
  {
    question: (
      <div>
        <p>
          Best way to reorder these cards in Healthy Food section on mobile?
        </p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-column flex-md-row">
  <div class="order-2 order-md-1 p-3">Veggie Salad</div>
  <div class="order-1 order-md-2 p-3">Fresh Juice</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Juice first on mobile, Salad first on desktop",
      "Salad first on mobile, Juice first on desktop",
      "Same order everywhere",
      "Random order",
    ],
    answer: "Juice first on mobile, Salad first on desktop",
    // Mobile: order-1 (Juice), order-2 (Salad)
    // md+: order-md-2 (Juice), order-md-1 (Salad)
  },
  {
    question: (
      <div>
        <p>Hide "Thank you" message on extra small screens:</p>
        <CodeBlock
          language="html"
          code={`<div class="d-none d-sm-block">
  <h2>Thank you for choosing us!</h2>
</div>`}
        />
      </div>
    ),
    options: [
      "Visible on mobile",
      "Hidden on mobile, visible from small screens up",
      "Always hidden",
      "Only visible on large screens",
    ],
    answer: "Hidden on mobile, visible from small screens up",
  },
  {
    question: (
      <div>
        <p>Which classes make payment icons appear only on large screens?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-none d-lg-flex gap-3">
  <img src="visa.png">
  <img src="mastercard.png">
  <img src="paypal.png">
</div>`}
        />
      </div>
    ),
    options: [
      "d-lg-none",
      "d-none d-lg-flex",
      "d-flex d-lg-none",
      "visible-lg",
    ],
    answer: "d-none d-lg-flex",
  },
  {
    question: (
      <div>
        <p>Reorder delivery steps to show "Payment" first on mobile:</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-column">
  <div class="order-2">Delivery</div>
  <div class="order-1">Payment</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Delivery to Payment",
      "Payment to Delivery",
      "Same order",
      "Random",
    ],
    answer: "Payment to Delivery",
  },
  {
    question: (
      <div>
        <p>Show customer review only on desktop (lg and up):</p>
        <CodeBlock
          language="html"
          code={`<blockquote class="d-none d-lg-block">
  "Best food ever!" - Happy Customer
</blockquote>`}
        />
      </div>
    ),
    options: [
      "Visible on all devices",
      "Hidden on mobile/tablet, visible on desktop",
      "Only visible on mobile",
      "Always hidden",
    ],
    answer: "Hidden on mobile/tablet, visible on desktop",
  },
  {
    question: (
      <div>
        <p>Which class hides an element on all screens except extra small?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-block d-sm-none">Only on XS</div>`}
        />
      </div>
    ),
    options: [
      "d-xs-only",
      "d-none d-sm-block",
      "d-block d-sm-none",
      "No direct class",
    ],
    answer: "d-block d-sm-none",
    // Note: This is the correct pattern — no single class for "only-xs"
  },

  // ========== 5 Normal (Non-CodeBlock) Questions ==========
  {
    question: "What do Bootstrap `order-*` classes do?",
    options: [
      "Change element size",
      "Change visual order of flex items",
      "Hide elements",
      "Add spacing",
    ],
    answer: "Change visual order of flex items",
  },
  {
    question: "Which class hides an element on medium screens and above?",
    options: ["d-md-none", "d-none d-md-block", "d-md-hide", "d-hidden-md"],
    answer: "d-md-none",
  },
  {
    question: "How do you make an element visible only on large screens?",
    options: ["d-lg-block", "d-none d-lg-block", "d-lg-visible", "visible-lg"],
    answer: "d-none d-lg-block",
  },
  {
    question: "Which class displays an element as a flex container only on small screens?",
    options: ["d-flex-sm", "d-sm-flex", "flex-sm", "d-flex d-sm-none"],
    answer: "d-sm-flex",
  },
  {
    question: "What is the range of values for `order-*` classes in Bootstrap?",
    options: ["0 to 5", "1 to 12", "0 to 12", "1 to 10"],
    answer: "0 to 12",
  },
];
const Healthy_Delivary_Payments_MCQ = ({
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
      title="Healthy, Delivery & Payment Sections - Flex Order & Display Utilities MCQs"
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

export default Healthy_Delivary_Payments_MCQ;
