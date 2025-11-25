import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Healthy_Delivary_Payments_CS = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});

  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleAnswer = (questionId, option) => {
    setMcqAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleContinue = async () => {
    if (isLoading || isSubtopicCompleted) return;

    try {
      setIsLoading(true);
      const result = await markSubtopicComplete(
        subtopicId,
        goalName,
        courseName
      );

      if (result.success) {
        await loadProgressSummary();
        setIsSubtopicCompleted(true);
        console.log("Cheat sheet marked as completed");
      } else {
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------- MCQ DATA -------------------- */
  const mcqs = [
    {
      id: "flex_order",
      section: "Bootstrap Flex Order",
      question: "What does the class 'order-3' do in a flex container?",
      options: [
        "Makes the item appear third visually",
        "Sets the flex-grow to 3",
        "Adds 3rem margin",
        "Changes z-index to 3",
      ],
      answer: "Makes the item appear third visually",
      explanation:
        "order-* classes change the visual order of flex items without changing the HTML source order.",
    },
    {
      id: "responsive_order",
      section: "Bootstrap Flex Order",
      question: "How do you change order only on large screens?",
      options: ["order-lg-1", "lg-order-1", "order-1-lg", "flex-order-lg-1"],
      answer: "order-lg-1",
      explanation:
        "Bootstrap uses breakpoint prefixes like order-md-*, order-lg-*, order-xl-* for responsive ordering.",
    },
    {
      id: "display_none",
      section: "Bootstrap Display Utilities",
      question: "Which class hides an element on all screen sizes?",
      options: ["d-hide", "d-none", "visible-none", "d-invisible"],
      answer: "d-none",
      explanation:
        "d-none applies display: none !important; — completely hides the element everywhere.",
    },
    {
      id: "responsive_display",
      section: "Bootstrap Display Utilities",
      question: "How do you show an element only on medium and larger screens?",
      options: [
        "d-md-block",
        "d-block d-md-none",
        "d-none d-md-block",
        "visible-md-up",
      ],
      answer: "d-none d-md-block",
      explanation:
        "The pattern d-none d-{breakpoint}-block hides by default and shows from that breakpoint upward.",
    },
    {
      id: "food_sections",
      section: "Food Munch Sections",
      question:
        "Which of these is a real section class used in the Food Munch website?",
      options: [
        "healthy-food",
        "food-delivery",
        "payment-options",
        "customer-thanks",
      ],
      answer: "healthy-food",
      explanation:
        "The cheat sheet shows actual section classes: .healthy-food, .delivery-payment, and .thank-you.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Healthy Delivery & Payments | Cheat Sheet</h1>

      {/* 1. Bootstrap Flex Utilities */}
      <section>
        <h2>1. Bootstrap Flex Utilities</h2>
        <h3>1.1 Order</h3>
        <p>
          The <code>order</code> classes change the visual order of flex items
          inside a flex container. Numbers can be 0–12. They are responsive:
        </p>
        <ul>
          <li>order-1, order-2, order-3, …</li>
          <li>order-md-2, order-lg-3, etc.</li>
        </ul>

        <CodeBlock
          language="html"
          code={`<div class="d-flex">
  <div class="order-2">Second</div>
  <div class="order-1">First</div>
  <div class="order-3">Third</div>
</div>`}
        />
      </section>

      {/* 2. Bootstrap Display Utilities */}
      <section>
        <h2>2. Bootstrap Display Utilities</h2>
        <p>
          Show or hide HTML elements responsively using <code>d-*-none</code>,{" "}
          <code>d-*-block</code>, and <code>d-*-inline</code> classes.
        </p>
        <ul>
          <li>Hide: d-none, d-sm-none, d-md-none, …</li>
          <li>Show: d-block, d-md-inline, d-lg-block, …</li>
        </ul>

        <CodeBlock
          language="html"
          code={`<div class="d-none d-md-block">Visible on md and up</div>
<div class="d-block d-md-none">Visible on sm and below</div>`}
        />
      </section>

      {/* 3. Sections in Food Munch Website */}
      <section>
        <h2>3. Sections in Food Munch Website</h2>

        <h3>3.1 Healthy Food Section</h3>
        <CodeBlock
          language="html"
          code={`<section class="healthy-food p-3">
  <h2>Healthy Food Options</h2>
  <p>Fresh salads, juices, and organic meals.</p>
</section>`}
        />

        <h3>3.2 Delivery & Payment Section</h3>
        <CodeBlock
          language="html"
          code={`<section class="delivery-payment p-3">
  <h2>Delivery & Payment</h2>
  <p>Fast delivery and multiple payment options available.</p>
</section>`}
        />

        <h3>3.3 Thanking Customers Section</h3>
        <CodeBlock
          language="html"
          code={`<section class="thank-you p-3">
  <h2>Thank You!</h2>
  <p>We appreciate your order and hope you enjoy your meal.</p>
</section>`}
        />
      </section>

      {/* MCQs - CLEAN, CONSISTENT & EDUCATIONAL */}
      <section>
        <h3>MCQs</h3>
        {mcqs.map((mcq) => (
          <MCQBlock
            key={mcq.id}
            mcq={mcq}
            answers={mcqAnswers}
            onAnswer={handleAnswer}
          />
        ))}
      </section>

      {/* Continue Button */}
      <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted || isLoading}
        >
          {isLoading
            ? "Marking..."
            : isSubtopicCompleted
            ? "Completed"
            : "Continue"}
        </button>
      </div>
    </div>
  );
};

/* -------------------- REUSABLE MCQ BLOCK -------------------- */
const MCQBlock = ({ mcq, answers, onAnswer }) => {
  const userAnswer = answers[mcq.id];
  const isCorrect = userAnswer === mcq.answer;

  return (
    <div className="mcq-container">
      <h3 className="mcq-title">Quiz: {mcq.section}</h3>
      <p className="mcq-question">{mcq.question}</p>

      {mcq.options.map((option) => {
        const active = userAnswer === option;
        const correct = active && isCorrect;
        const wrong = active && !isCorrect;

        return (
          <label
            key={option}
            className={`mcq-option ${
              correct ? "selected-correct" : wrong ? "selected-wrong" : ""
            }`}
          >
            <input
              type="radio"
              name={mcq.id}
              checked={active}
              onChange={() => onAnswer(mcq.id, option)}
              style={{ marginRight: "8px" }}
            />
            <code>{option}</code>
          </label>
        );
      })}

      {userAnswer && (
        <div className={`mcq-result ${isCorrect ? "correct" : "wrong"}`}>
          {isCorrect ? "Correct!" : `Wrong. Correct answer: ${mcq.answer}`}
          <p>
            <strong>Explanation:</strong> {mcq.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default Healthy_Delivary_Payments_CS;
