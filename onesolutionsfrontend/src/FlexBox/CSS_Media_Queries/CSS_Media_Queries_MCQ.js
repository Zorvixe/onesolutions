import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";
const questionsData = [
  // NORMAL QUESTIONS

  {
    question: (
      <div>
        <p>What is the main purpose of CSS media queries?</p>
      </div>
    ),
    options: [
      "To style animations",
      "To create responsive layouts",
      "To define variables",
      "To add JavaScript logic",
    ],
    answer: "To create responsive layouts",
  },
  {
    question: (
      <div>
        <p>Which media type is used for mobile, tablet, and desktop screens?</p>
      </div>
    ),
    options: ["print", "tv", "screen", "all"],
    answer: "screen",
  },
  {
    question: (
      <div>
        <p>If no media type is specified, what is the default media type?</p>
      </div>
    ),
    options: ["screen", "print", "all", "tv"],
    answer: "all",
  },
  {
    question: (
      <div>
        <p>Which media feature is used to check device screen width?</p>
      </div>
    ),
    options: ["orientation", "width", "resolution", "display"],
    answer: "width",
  },
  {
    question: (
      <div>
        <p>Which orientation means height is greater than width?</p>
      </div>
    ),
    options: ["landscape", "portrait", "square", "auto"],
    answer: "portrait",
  },

  // CODE-BASED QUESTIONS

  {
    question: (
      <div>
        <p>What will this media query do?</p>
        <CodeBlock
          language="css"
          code={`@media (max-width: 768px) {
  body {
    background-color: lightblue;
  }
}`}
        />
      </div>
    ),
    options: [
      "Applies style for screens larger than 768px",
      "Applies style for screens smaller than or equal to 768px",
      "Applies style only for print",
      "Applies style only for tablets",
    ],
    answer: "Applies style for screens smaller than or equal to 768px",
  },
  {
    question: (
      <div>
        <p>What does this media query target?</p>
        <CodeBlock
          language="css"
          code={`@media (orientation: landscape) {
  body {
    background-color: yellow;
  }
}`}
        />
      </div>
    ),
    options: [
      "Devices with height greater than width",
      "Devices with width greater than height",
      "Only mobile devices",
      "Only desktop devices",
    ],
    answer: "Devices with width greater than height",
  },
  {
    question: (
      <div>
        <p>What does this media query mean?</p>
        <CodeBlock
          language="css"
          code={`@media screen and (min-width: 600px) and (max-width: 900px) {
  body {
    background-color: lightgreen;
  }
}`}
        />
      </div>
    ),
    options: [
      "Applies for width below 600px",
      "Applies for width between 600px and 900px",
      "Applies only for print devices",
      "Applies for width above 900px",
    ],
    answer: "Applies for width between 600px and 900px",
  },
  {
    question: (
      <div>
        <p>What is the purpose of <code>not</code> in this query?</p>
        <CodeBlock
          language="css"
          code={`@media not screen and (min-width: 600px) {
  body {
    background-color: red;
  }
}`}
        />
      </div>
    ),
    options: [
      "Applies only to screen devices",
      "Excludes screen devices",
      "Applies to all devices",
      "Applies only to mobile devices",
    ],
    answer: "Excludes screen devices",
  },
  {
    question: (
      <div>
        <p>What does this media query do?</p>
        <CodeBlock
          language="css"
          code={`@media (max-width: 600px), (orientation: portrait) {
  body {
    background-color: pink;
  }
}`}
        />
      </div>
    ),
    options: [
      "Both conditions must be true",
      "Only applies when width is 600px",
      "Applies if either condition is true",
      "Applies only to desktop",
    ],
    answer: "Applies if either condition is true",
  },
  {
    question: (
      <div>
        <p>Which media query is correct for devices smaller than 500px?</p>
      </div>
    ),
    options: [
      "@media (min-width: 500px)",
      "@media (max-width: 500px)",
      "@media (width > 500px)",
      "@media (height: 500px)",
    ],
    answer: "@media (max-width: 500px)",
  },
  {
    question: (
      <div>
        <p>What will this media query apply to?</p>
        <CodeBlock
          language="css"
          code={`@media print {
  body {
    color: black;
  }
}`}
        />
      </div>
    ),
    options: [
      "Mobile screens",
      "Desktop screens",
      "Printed documents",
      "Televisions",
    ],
    answer: "Printed documents",
  },
  {
    question: (
      <div>
        <p>Which operator is used to combine multiple conditions?</p>
      </div>
    ),
    options: ["and", "or", "not", ","],
    answer: "and",
  },
  {
    question: (
      <div>
        <p>Which operator acts like OR in media queries?</p>
      </div>
    ),
    options: ["and", "not", ",", "all"],
    answer: ",",
  },
  {
    question: (
      <div>
        <p>What does this media query check?</p>
        <CodeBlock
          language="css"
          code={`@media (min-height: 700px) {
  body {
    background-color: orange;
  }
}`}
        />
      </div>
    ),
    options: [
      "Minimum width of device",
      "Maximum height of device",
      "Minimum height of device",
      "Orientation of device",
    ],
    answer: "Minimum height of device",
  },
];

const CSS_Media_Queries_MCQ = ({
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
 
  return <MCQLogic title="CSS Media Queries" questions={randomQuestions}
  isCompleted={isCompleted}
  isLoading={isLoading}
  onComplete={handleCompletion}
  subtopicId={subtopicId}
  goalName={goalName}
  courseName={courseName} />;
};

export default CSS_Media_Queries_MCQ;
