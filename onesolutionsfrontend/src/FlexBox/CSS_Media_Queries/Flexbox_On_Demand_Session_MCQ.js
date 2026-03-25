import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";


const questionsData = [
  // NORMAL QUESTIONS

  {
    question: (
      <div>
        <p>What does the <code>display</code> property control?</p>
      </div>
    ),
    options: [
      "Color of element",
      "Visibility and layout of elements",
      "Font size",
      "Animation speed",
    ],
    answer: "Visibility and layout of elements",
  },
  {
    question: (
      <div>
        <p>What does <code>display: none</code> do?</p>
      </div>
    ),
    options: [
      "Hides element but keeps space",
      "Removes element completely from layout",
      "Changes element color",
      "Makes element transparent",
    ],
    answer: "Removes element completely from layout",
  },
  {
    question: (
      <div>
        <p>Which property hides an element but still keeps its space?</p>
      </div>
    ),
    options: [
      "display: none",
      "visibility: hidden",
      "opacity: 0",
      "overflow: hidden",
    ],
    answer: "visibility: hidden",
  },
  {
    question: (
      <div>
        <p>Which layout element is usually fixed at the top?</p>
      </div>
    ),
    options: ["Footer", "Sidebar", "Navbar", "Content"],
    answer: "Navbar",
  },
  {
    question: (
      <div>
        <p>Which property is commonly used to fix elements in position?</p>
      </div>
    ),
    options: ["display", "position", "margin", "padding"],
    answer: "position",
  },

  // CODE-BASED QUESTIONS

  {
    question: (
      <div>
        <p>What will this code do?</p>
        <CodeBlock
          language="css"
          code={`.image2 {
  display: none;
}`}
        />
      </div>
    ),
    options: [
      "Hide element but keep space",
      "Remove element completely",
      "Make element transparent",
      "Resize element",
    ],
    answer: "Remove element completely",
  },
  {
    question: (
      <div>
        <p>What does this code achieve?</p>
        <CodeBlock
          language="css"
          code={`.navbar {
  position: fixed;
  top: 0;
  width: 100%;
}`}
        />
      </div>
    ),
    options: [
      "Navbar scrolls normally",
      "Navbar fixed at bottom",
      "Navbar fixed at top",
      "Navbar hidden",
    ],
    answer: "Navbar fixed at top",
  },
  {
    question: (
      <div>
        <p>What is the purpose of this sidebar CSS?</p>
        <CodeBlock
          language="css"
          code={`.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  width: 200px;
}`}
        />
      </div>
    ),
    options: [
      "Sidebar scrolls with content",
      "Sidebar fixed on left side",
      "Sidebar hidden",
      "Sidebar at bottom",
    ],
    answer: "Sidebar fixed on left side",
  },
  {
    question: (
      <div>
        <p>Why is this margin used?</p>
        <CodeBlock
          language="css"
          code={`.content {
  margin-left: 200px;
  margin-top: 60px;
}`}
        />
      </div>
    ),
    options: [
      "To center content",
      "To avoid overlap with fixed elements",
      "To hide content",
      "To increase font size",
    ],
    answer: "To avoid overlap with fixed elements",
  },
  {
    question: (
      <div>
        <p>What happens if margin is not added to content in fixed layout?</p>
      </div>
    ),
    options: [
      "Content disappears",
      "Content overlaps navbar/sidebar",
      "Content becomes fixed",
      "Nothing happens",
    ],
    answer: "Content overlaps navbar/sidebar",
  },
  {
    question: (
      <div>
        <p>What does this HTML structure represent?</p>
        <CodeBlock
          language="html"
          code={`<div class="page-container">
  <nav class="page-navbar">Navbar</nav>
  <div class="page-body">
    <div class="sidebar">Sidebar</div>
    <div class="content">Main Content</div>
  </div>
</div>`}
        />
      </div>
    ),
    options: [
      "Login form",
      "Dashboard layout",
      "Image gallery",
      "Animation layout",
    ],
    answer: "Dashboard layout",
  },
  {
    question: (
      <div>
        <p>Which property ensures the navbar stays visible during scroll?</p>
      </div>
    ),
    options: [
      "display: block",
      "position: fixed",
      "overflow: hidden",
      "float: left",
    ],
    answer: "position: fixed",
  },
  {
    question: (
      <div>
        <p>What will happen if <code>top: 0</code> is removed from fixed navbar?</p>
      </div>
    ),
    options: [
      "Navbar disappears",
      "Navbar may not stick to top",
      "Navbar moves to bottom",
      "No change",
    ],
    answer: "Navbar may not stick to top",
  },
  {
    question: (
      <div>
        <p>Which property is responsible for spacing inside elements?</p>
      </div>
    ),
    options: [
      "margin",
      "padding",
      "border",
      "display",
    ],
    answer: "padding",
  },
  {
    question: (
      <div>
        <p>What is the role of <code>width: 100%</code> in navbar?</p>
      </div>
    ),
    options: [
      "Reduce size",
      "Take full horizontal space",
      "Hide navbar",
      "Fix position",
    ],
    answer: "Take full horizontal space",
  },
];

const  Flexbox_On_Demand_Session_MCQ = ({
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
 
  return <MCQLogic title="On demand session" questions={randomQuestions}
  isCompleted={isCompleted}
  isLoading={isLoading}
  onComplete={handleCompletion}
  subtopicId={subtopicId}
  goalName={goalName}
  courseName={courseName} />;
};

export default  Flexbox_On_Demand_Session_MCQ;
