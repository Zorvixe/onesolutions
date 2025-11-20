import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // 10 Code Block Questions
  {
    question: (
      <div>
        <p>What type of list is this?</p>
        <CodeBlock
          language="html"
          code={`<ul>
  <li>Golden Temple</li>
  <li>Mysore Palace</li>
  <li>Varanasi</li>
</ul>`}
        />
      </div>
    ),
    options: [
      "Ordered list",
      "Unordered list",
      "Definition list",
      "Navigation list",
    ],
    answer: "Unordered list",
  },
  {
    question: (
      <div>
        <p>What HTML tag starts this list?</p>
        <CodeBlock
          language="html"
          code={`<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>`}
        />
      </div>
    ),
    options: ["<ol>", "<ul>", "<li>", "<list>"],
    answer: "<ul>",
  },
  {
    question: (
      <div>
        <p>What will this list display as?</p>
        <CodeBlock
          language="html"
          code={`<ul>
  <li>First</li>
  <li>Second</li>
</ul>`}
        />
      </div>
    ),
    options: [
      "Numbered items",
      "Items with bullets",
      "Items with Roman numerals",
      "No markers",
    ],
    answer: "Items with bullets",
  },
  {
    question: (
      <div>
        <p>What type of list is this?</p>
        <CodeBlock
          language="html"
          code={`<ol>
  <li>Step 1</li>
  <li>Step 2</li>
</ol>`}
        />
      </div>
    ),
    options: [
      "Unordered list",
      "Ordered list",
      "Bullet list",
      "Description list",
    ],
    answer: "Ordered list",
  },
  {
    question: (
      <div>
        <p>What HTML tag starts this list?</p>
        <CodeBlock
          language="html"
          code={`<ol>
  <li>First</li>
  <li>Second</li>
</ol>`}
        />
      </div>
    ),
    options: ["<ul>", "<ol>", "<li>", "<list>"],
    answer: "<ol>",
  },
  {
    question: (
      <div>
        <p>What will this CSS do to the unordered list?</p>
        <CodeBlock
          language="css"
          code={`ul { list-style-type: square; }`}
        />
        <CodeBlock
          language="html"
          code={`<ul><li>Item</li></ul>`}
        />
      </div>
    ),
    options: [
      "Remove bullets",
      "Use square bullets",
      "Number the items",
      "Use circles",
    ],
    answer: "Use square bullets",
  },
  {
    question: (
      <div>
        <p>What marker will this ordered list use?</p>
        <CodeBlock
          language="css"
          code={`ol { list-style-type: upper-roman; }`}
        />
        <CodeBlock
          language="html"
          code={`<ol><li>Item</li></ol>`}
        />
      </div>
    ),
    options: [
      "Numbers (1, 2, 3)",
      "Lowercase letters",
      "Uppercase Roman numerals (I, II, III)",
      "Bullets",
    ],
    answer: "Uppercase Roman numerals (I, II, III)",
  },
  {
    question: (
      <div>
        <p>Which tag is used for each item in this list?</p>
        <CodeBlock
          language="html"
          code={`<ul>
  <li>Golden Temple</li>
</ul>`}
        />
      </div>
    ),
    options: ["<ul>", "<ol>", "<li>", "<item>"],
    answer: "<li>",
  },
  {
    question: (
      <div>
        <p>What does this CSS remove from the list?</p>
        <CodeBlock
          language="css"
          code={`ul { list-style-type: none; }`}
        />
        <CodeBlock
          language="html"
          code={`<ul><li>Item</li></ul>`}
        />
      </div>
    ),
    options: [
      "The list items",
      "The bullets/markers",
      "The ordering",
      "The spacing",
    ],
    answer: "The bullets/markers",
  },
  {
    question: (
      <div>
        <p>What is the default marker for this list?</p>
        <CodeBlock
          language="html"
          code={`<ol>
  <li>First</li>
  <li>Second</li>
</ol>`}
        />
      </div>
    ),
    options: [
      "Bullets",
      "Numbers (1, 2, 3)",
      "Letters",
      "Roman numerals",
    ],
    answer: "Numbers (1, 2, 3)",
  },

  // 5 Normal (Non-CodeBlock) Questions
  {
    question: "Which HTML tag is used to start an unordered list in HTML?",
    options: ["<ul>", "<ol>", "<li>", "<list>"],
    answer: "<ul>",
  },
  {
    question: "Which HTML tag is used to start an ordered list in HTML?",
    options: ["<ul>", "<ol>", "<li>", "<list>"],
    answer: "<ol>",
  },
  {
    question: "What is the purpose of the `<li>` tag in HTML lists?",
    options: [
      "To start the list",
      "To define each list item",
      "To style the list",
      "To end the list",
    ],
    answer: "To define each list item",
  },
  {
    question: "What is the default `list-style-type` for `<ul>`?",
    options: ["disc", "square", "circle", "none"],
    answer: "disc",
  },
  {
    question: "What is the default `list-style-type` for `<ol>`?",
    options: ["decimal", "lower-alpha", "upper-roman", "none"],
    answer: "decimal",
  },
];

const Website_Integration_MCQ_2 = ({
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
      title="Website Integration Part 2 - MCQs"
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

export default Website_Integration_MCQ_2;
