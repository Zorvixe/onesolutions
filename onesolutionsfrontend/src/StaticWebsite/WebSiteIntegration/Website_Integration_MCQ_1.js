import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // 10 Code Block Questions

  {
    question: (
      <div>
        <p>Is this section correctly defined for UI Kit?</p>
        <CodeBlock
          language="html"
          code={`<div id="section-1" data-section data-default></div>`}
        />
      </div>
    ),
    options: ["Yes", "No", "Missing id", "Missing data-section"],
    answer: "Yes",
  },
  {
    question: (
      <div>
        <p>What happens when this button is clicked?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="display('section-2')">Go</button>`}
        />
      </div>
    ),
    options: [
      "Reload page",
      "Show section-2",
      "Hide all sections",
      "Nothing happens",
    ],
    answer: "Show section-2",
  },
  {
    question: (
      <div>
        <p>Is this onclick syntax correct?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="display(section-2)">Click</button>`}
        />
      </div>
    ),
    options: ["Yes", "No", "Only for CSS", "Only for JS"],
    answer: "No",
  },
  {
    question: (
      <div>
        <p>What is missing for UI Kit to work properly?</p>
        <CodeBlock
          language="html"
          code={`<div id="home"></div>`}
        />
      </div>
    ),
    options: [
      "section prefix in id",
      "onclick",
      "href",
      "class",
    ],
    answer: "section prefix in id",
  },
  {
    question: (
      <div>
        <p>Which attribute makes this a default section?</p>
        <CodeBlock
          language="html"
          code={`<div id="section-1" data-section data-default></div>`}
        />
      </div>
    ),
    options: ["data-section", "data-default", "id", "class"],
    answer: "data-default",
  },
  {
    question: (
      <div>
        <p>Is this id valid for UI Kit?</p>
        <CodeBlock
          language="html"
          code={`<div id="page-1" data-section></div>`}
        />
      </div>
    ),
    options: ["Yes", "No", "Only for CSS", "Only for JS"],
    answer: "No",
  },
  {
    question: (
      <div>
        <p>What will this link do?</p>
        <CodeBlock
          language="html"
          code={`<a href="https://example.com" target="_blank">Visit</a>`}
        />
      </div>
    ),
    options: [
      "Open in same tab",
      "Open in new tab",
      "Reload page",
      "Nothing",
    ],
    answer: "Open in new tab",
  },
  {
    question: (
      <div>
        <p>Which section will be shown?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="display('section-3')">Next</button>`}
        />
      </div>
    ),
    options: [
      "section-1",
      "section-2",
      "section-3",
      "None",
    ],
    answer: "section-3",
  },
  {
    question: (
      <div>
        <p>Is this correct way to go back to Home?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="display('section-1')">Back</button>`}
        />
      </div>
    ),
    options: ["Yes", "No", "Only for CSS", "Only for images"],
    answer: "Yes",
  },
  {
    question: (
      <div>
        <p>Where should UI Kit script be placed?</p>
        <CodeBlock
          language="html"
          code={`<script src="script.js"></script>`}
        />
      </div>
    ),
    options: [
      "Inside head",
      "Before </body>",
      "Inside div",
      "Anywhere",
    ],
    answer: "Before </body>",
  },

  // 5 Normal Questions

  {
    question:
      "Which HTML attribute is used to uniquely identify elements?",
    options: ["id", "class", "src", "href"],
    answer: "id",
  },
  {
    question:
      "Which is the correct onclick syntax for display function?",
    options: [
      "onclick=\"display(section-3)\"",
      "onclick=\"display('section-3')\"",
      "onclick='display(\"section-3\")'",
      "onclick=display('section-3')",
    ],
    answer: "onclick=\"display('section-3')\"",
  },
  {
    question:
      "To display Favourite Places from Home, what should you add?",
    options: [
      "Add onclick to Home button",
      "Remove ids",
      "Add script in head",
      "Rename sections",
    ],
    answer: "Add onclick to Home button",
  },
  {
    question:
      "What is required for UI Kit section ids?",
    options: [
      "Must start with section",
      "Must be random",
      "Must be numeric",
      "Must be uppercase",
    ],
    answer: "Must start with section",
  },
  {
    question:
      "To go back from Detailed View to Favourite Places, what is needed?",
    options: [
      "Add button with onclick",
      "Remove section",
      "Reload page",
      "Add image",
    ],
    answer: "Add button with onclick",
  },
];

const Website_Integration_MCQ_1 = ({
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
      title="Website Integration - MCQs"
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

export default Website_Integration_MCQ_1;
