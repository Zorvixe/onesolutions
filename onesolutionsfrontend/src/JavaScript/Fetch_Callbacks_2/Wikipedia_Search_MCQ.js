import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ---------- 1 ----------
  {
    question: (
      <div>
        <p>Which HTML element is used for entering search queries?</p>
      </div>
    ),
    options: [
      "<input type='text'>",
      "<input type='search'>",
      "<input type='query'>",
      "<input type='button'>",
    ],
    answer: "<input type='search'>",
  },

  // ---------- 2 ----------
  {
    question: (
      <div>
        <p>
          What is the purpose of the <code>&lt;input type='search'&gt;</code>{" "}
          element?
        </p>
      </div>
    ),
    options: [
      "To enter password data",
      "To select multiple options",
      "To enter search text queries",
      "To upload files",
    ],
    answer: "To enter search text queries",
  },

  // ---------- 3 ----------
  {
    question: (
      <div>
        <p>Which attribute specifies the input field type in HTML?</p>
      </div>
    ),
    options: ["name", "id", "type", "placeholder"],
    answer: "type",
  },

  // ---------- 4 ----------
  {
    question: (
      <div>
        <p>What is the correct syntax for creating a search input field?</p>
        <CodeBlock
          language="html"
          code={`<input type="search" placeholder="Search Wikipedia" />`}
        />
      </div>
    ),
    options: [
      `<input search="text">`,
      `<input type="search" placeholder="Search Wikipedia" />`,
      `<search input="text">`,
      `<input query="search">`,
    ],
    answer: `<input type="search" placeholder="Search Wikipedia" />`,
  },

  // ---------- 5 ----------
  {
    question: (
      <div>
        <p>
          Which Bootstrap component is commonly used to indicate a loading
          state?
        </p>
      </div>
    ),
    options: ["Spinner", "Button", "Badge", "Alert"],
    answer: "Spinner",
  },

  // ---------- 6 ----------
  {
    question: (
      <div>
        <p>Which Bootstrap class creates a basic loading spinner?</p>
        <CodeBlock
          language="html"
          code={`<div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`}
        />
      </div>
    ),
    options: [
      "spinner-loading",
      "spinner-border",
      "loading-spinner",
      "bootstrap-spinner",
    ],
    answer: "spinner-border",
  },

  // ---------- 7 ----------
  {
    question: (
      <div>
        <p>
          What does the <code>role="status"</code> attribute in Bootstrap
          spinner indicate?
        </p>
      </div>
    ),
    options: [
      "Specifies color of spinner",
      "Provides accessibility information",
      "Starts spinner animation",
      "Stops spinner animation",
    ],
    answer: "Provides accessibility information",
  },

  // ---------- 8 ----------
  {
    question: (
      <div>
        <p>
          Which Bootstrap utility class hides elements visually but keeps them
          accessible for screen readers?
        </p>
      </div>
    ),
    options: ["d-none", "visually-hidden", "invisible", "hide-element"],
    answer: "visually-hidden",
  },

  // ---------- 9 ----------
  {
    question: (
      <div>
        <p>
          When building a Wikipedia Search app, what can you use to show that
          data is being fetched?
        </p>
      </div>
    ),
    options: [
      "A spinner loader",
      "A static image",
      "A search icon",
      "A heading tag",
    ],
    answer: "A spinner loader",
  },

  // ---------- 10 ----------
  {
    question: (
      <div>
        <p>
          Which of the following correctly shows a Bootstrap spinner centered in
          a container?
        </p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`}
        />
      </div>
    ),
    options: [
      "spinner-center",
      "d-flex justify-content-center",
      "spinner-middle",
      "center-spinner",
    ],
    answer: "d-flex justify-content-center",
  },
];

const Wikipedia_Search_MCQ = ({
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
  return <MCQLogic title="Wikipedia Search - MCQs" questions={randomQuestions}
  isCompleted={isCompleted}
  isLoading={isLoading}
  onComplete={handleCompletion}
  subtopicId={subtopicId}
  goalName={goalName}
  courseName={courseName} />;
};
export default Wikipedia_Search_MCQ;
