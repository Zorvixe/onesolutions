import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 10 CodeBlock Questions ==========

  {
    question: (
      <div>
        <p>What will this class do?</p>
        <CodeBlock
          language="html"
          code={`<button class="btn btn-success">Submit</button>`}
        />
      </div>
    ),
    options: [
      "Creates a red button",
      "Creates a green button",
      "Creates a blue button",
      "Creates a yellow button",
    ],
    answer: "Creates a green button",
  },
  {
    question: (
      <div>
        <p>What does this flex class do?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex justify-content-between">
  <div>A</div>
  <div>B</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Centers items",
      "Adds equal space between items",
      "Stacks items vertically",
      "Aligns to left",
    ],
    answer: "Adds equal space between items",
  },
  {
    question: (
      <div>
        <p>What happens with this class?</p>
        <CodeBlock
          language="html"
          code={`<p class="text-center">Hello</p>`}
        />
      </div>
    ),
    options: [
      "Aligns text left",
      "Aligns text right",
      "Centers text",
      "Makes text bold",
    ],
    answer: "Centers text",
  },
  {
    question: (
      <div>
        <p>What does this class do?</p>
        <CodeBlock
          language="html"
          code={`<div class="bg-warning">Alert</div>`}
        />
      </div>
    ),
    options: ["Red background", "Yellow background", "Green background", "Blue background"],
    answer: "Yellow background",
  },
  {
    question: (
      <div>
        <p>What will happen here?</p>
        <CodeBlock
          language="html"
          code={`<p class="text-capitalize">hello world</p>`}
        />
      </div>
    ),
    options: [
      "HELLO WORLD",
      "Hello World",
      "hello world",
      "HeLLo WoRLd",
    ],
    answer: "Hello World",
  },
  {
    question: (
      <div>
        <p>What does this flex direction do?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-row">
  <div>1</div>
  <div>2</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Vertical layout",
      "Horizontal layout",
      "Center alignment",
      "Spacing only",
    ],
    answer: "Horizontal layout",
  },
  {
    question: (
      <div>
        <p>What is the effect of this class?</p>
        <CodeBlock
          language="html"
          code={`<div class="text-white bg-dark">Text</div>`}
        />
      </div>
    ),
    options: [
      "Black text on white background",
      "White text on dark background",
      "Blue text",
      "Green background",
    ],
    answer: "White text on dark background",
  },
  {
    question: (
      <div>
        <p>What happens when using this class?</p>
        <CodeBlock
          language="html"
          code={`<button class="btn btn-outline-primary">Click</button>`}
        />
      </div>
    ),
    options: [
      "Solid blue button",
      "Outlined blue button",
      "Red button",
      "No button style",
    ],
    answer: "Outlined blue button",
  },
  {
    question: (
      <div>
        <p>What does this do?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex align-items-start" style="height:150px;">
  <div>Item</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Aligns item at bottom",
      "Aligns item at top",
      "Centers item",
      "Spreads items",
    ],
    answer: "Aligns item at top",
  },
  {
    question: (
      <div>
        <p>What does this class do?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex justify-content-end">
  <div>Box</div>
</div>`}
        />
      </div>
    ),
    options: [
      "Align left",
      "Align center",
      "Align right",
      "Add spacing",
    ],
    answer: "Align right",
  },

  // ========== 5 Normal Questions ==========

  {
    question: "Which Bootstrap class makes text lowercase?",
    options: ["text-uppercase", "text-capitalize", "text-lowercase", "text-small"],
    answer: "text-lowercase",
  },
  {
    question: "Which class creates a dark background?",
    options: ["bg-light", "bg-dark", "bg-primary", "bg-white"],
    answer: "bg-dark",
  },
  {
    question: "Which flex class aligns items horizontally in center?",
    options: [
      "align-items-center",
      "justify-content-center",
      "flex-center",
      "text-center",
    ],
    answer: "justify-content-center",
  },
  {
    question: "Which class is used to create a flex container?",
    options: ["flex", "d-flex", "flexbox", "container"],
    answer: "d-flex",
  },
  {
    question: "Which Bootstrap class gives a danger (error) color?",
    options: ["text-danger", "bg-success", "btn-primary", "text-info"],
    answer: "text-danger",
  },
];

const Static_MCQ_Assignment3 = ({
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
      title= "Static MCQ Assignment 3"
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

export default Static_MCQ_Assignment3;
