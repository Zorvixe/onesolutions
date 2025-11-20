import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>Which selector targets this paragraph?</p>
        <CodeBlock
          language="html"
          code={`<p class="highlight">Important text</p>`}
        />
        <CodeBlock language="css" code={`.highlight { color: red; }`} />
      </div>
    ),
    options: ["#highlight", ".highlight", "p", "highlight"],
    answer: ".highlight",
  },
  {
    question: (
      <div>
        <p>Which selector selects this heading?</p>
        <CodeBlock language="html" code={`<h1 id="main-title">Welcome</h1>`} />
      </div>
    ),
    options: ["#main-title", ".main-title", "h1", "*main-title"],
    answer: "#main-title",
  },
  {
    question: (
      <div>
        <p>What color will the span be?</p>
        <CodeBlock
          language="html"
          code={`<div style="color: blue;">
  <span>Inherited color?</span>
</div>`}
        />
      </div>
    ),
    options: ["Black (default)", "Blue (inherited)", "No color", "Red"],
    answer: "Blue (inherited)",
  },
  {
    question: (
      <div>
        <p>Will the child div have a red border?</p>
        <CodeBlock
          language="html"
          code={`<div style="border: 2px solid red;">
  <div>Child div</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Yes, border is inherited",
      "No, border is not inherited",
      "Only if border-inherit is used",
      "Only on hover",
    ],
    answer: "No, border is not inherited",
  },
  {
    question: (
      <div>
        <p>Which selector styles all paragraph tags?</p>
        <CodeBlock
          language="css"
          code={`p {
  font-size: 18px;
}`}
        />
      </div>
    ),
    options: [
      "Type selector",
      "Class selector",
      "ID selector",
      "Universal selector",
    ],
    answer: "Type selector",
  },
  {
    question: (
      <div>
        <p>
          What happens when a parent has <code>font-weight: bold;</code>?
        </p>
        <CodeBlock
          language="html"
          code={`<section style="font-weight: bold;">
  <p>This text is bold</p>
  <span>So is this</span>
</section>`}
        />
      </div>
    ),
    options: [
      "Only p is bold",
      "Only span is bold",
      "Both are bold (inherited)",
      "Neither is bold",
    ],
    answer: "Both are bold (inherited)",
  },
  {
    question: (
      <div>
        <p>Can multiple elements share the same class?</p>
        <CodeBlock
          language="html"
          code={`<p class="alert">Error!</p>
<p class="alert">Warning!</p>`}
        />
      </div>
    ),
    options: [
      "No, classes must be unique",
      "Yes",
      "Only two elements",
      "Only in Bootstrap",
    ],
    answer: "Yes",
  },
  {
    question: (
      <div>
        <p>What does this selector target?</p>
        <CodeBlock
          language="css"
          code={`#unique-box { background: yellow; }`}
        />
        <CodeBlock language="html" code={`<div id="unique-box">Box</div>`} />
      </div>
    ),
    options: [
      "All divs",
      "Only this one div (by ID)",
      "Only classes named unique-box",
      "No element",
    ],
    answer: "Only this one div (by ID)",
  },
  {
    question: (
      <div>
        <p>Will the child inherit the background color?</p>
        <CodeBlock
          language="html"
          code={`<div style="background-color: lightgray;">
  <p>Gray background?</p>
</div>`}
        />
      </div>
    ),
    options: [
      "Yes, background is inherited",
      "No, background is not inherited",
      "Only if inherit keyword is used",
      "Only on mobile",
    ],
    answer: "No, background is not inherited",
  },
  {
    question: (
      <div>
        <p>Which selector uses a dot?</p>
        <CodeBlock language="css" code={`.card-title { font-size: 20px; }`} />
      </div>
    ),
    options: [
      "ID selector",
      "Class selector",
      "Type selector",
      "Universal selector",
    ],
    answer: "Class selector",
  },

  {
    question: "Which CSS selector is used to style an element by its class?",
    options: [".className", "#idName", "p", "*"],
    answer: ".className",
  },
  {
    question: "Which CSS property is inherited by child elements by default?",
    options: ["margin", "padding", "font-family", "width"],
    answer: "font-family",
  },
  {
    question: "What symbol is used for an ID selector in CSS?",
    options: ["#", ".", "*", ":"],
    answer: "#",
  },
  {
    question: "Which of the following is an inherited property?",
    options: ["border", "margin", "text-align", "height"],
    answer: "text-align",
  },
  {
    question: "How many elements can have the same ID in an HTML document?",
    options: ["Zero", "One", "Two", "Unlimited"],
    answer: "One",
  },
];

const Css_Selector_Inheritance_MCQ = ({
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
      title="CSS Selectors & Inheritance - MCQs"
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

export default Css_Selector_Inheritance_MCQ;
