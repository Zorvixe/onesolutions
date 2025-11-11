import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>
          What do Bootstrap <code>order-*</code> classes do?
        </p>
      </div>
    ),
    options: [
      "Change element size",
      "Change visual order of flex items",
      "Hide elements",
      "Add spacing",
    ],
    answer: "Change visual order of flex items",
  },
  {
    question: (
      <div>
        <p>Which class hides an element on medium screens and above?</p>
      </div>
    ),
    options: ["d-md-none", "d-none d-md-block", "d-md-hide", "d-hidden-md"],
    answer: "d-md-none",
  },
  {
    question: (
      <div>
        <p>How do you make an element visible only on large screens?</p>
      </div>
    ),
    options: ["d-lg-block", "d-none d-lg-block", "d-lg-visible", "visible-lg"],
    answer: "d-none d-lg-block",
  },
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
      "First → Second → Third",
      "Second → Third → First",
      "First → Third → Second",
      "Third → First → Second",
    ],
    answer: "First → Second → Third",
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
];

const Healthy_Delivary_Payments_MCQ = ({ subtopicId, goalName, courseName }) => {
  const { markSubtopicComplete, loadProgressSummary } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  const handleCompletion = async () => {
    try {
      await markSubtopicComplete(subtopicId, goalName, courseName);
      await loadProgressSummary();
      setIsCompleted(true);
    } catch (error) {
      console.error("❌ Failed to mark subtopic complete:", error);
    }
  };

  return (
    <MCQLogic
      title="Healthy, Delivery & Payment Sections - Flex Order & Display Utilities MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default Healthy_Delivary_Payments_MCQ;
