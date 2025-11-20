import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 10 CodeBlock Questions ==========
  {
    question: (
      <div>
        <p>What does this CSS rule do?</p>
        <CodeBlock
          language="css"
          code={`.box {
  padding: 20px;
  margin: 15px;
  border: 5px solid blue;
}`}
        />
        <CodeBlock language="html" code={`<div class="box">Content</div>`} />
      </div>
    ),
    options: [
      "Adds space inside the border",
      "Adds space outside the element",
      "Both A and B",
      "Changes text color",
    ],
    answer: "Both A and B",
  },
  {
    question: (
      <div>
        <p>What will be the total width of this element?</p>
        <CodeBlock
          language="css"
          code={`.card {
  width: 300px;
  padding: 20px;
  border: 10px solid black;
  margin: 30px;
}`}
        />
      </div>
    ),
    options: ["300px", "340px", "380px", "400px"],
    answer: "380px", // 300 + 20×2 + 10×2 = 380px
  },
  {
    question: (
      <div>
        <p>Which property controls space between content and border?</p>
        <CodeBlock
          language="css"
          code={`.btn {
  padding: 15px 30px;
}`}
        />
      </div>
    ),
    options: ["margin", "border", "padding", "gap"],
    answer: "padding",
  },
  {
    question: (
      <div>
        <p>What happens if you forget border-style?</p>
        <CodeBlock
          language="css"
          code={`.warning {
  border-width: 4px;
  border-color: red;
}`}
        />
      </div>
    ),
    options: [
      "Red border appears",
      "No border visible",
      "Dashed border",
      "Only on button",
    ],
    answer: "No border visible",
  },
  {
    question: (
      <div>
        <p>What is the final height of this element?</p>
        <CodeBlock
          language="css"
          code={`.hero {
  height: 200px;
  padding-top: 50px;
  padding-bottom: 50px;
  border-top: 10px solid gold;
  border-bottom: 10px solid gold;
}`}
        />
      </div>
    ),
    options: ["200px", "300px", "320px", "270px"],
    answer: "320px", // 200 + 50×2 + 10×2 = 320px
  },
  {
    question: (
      <div>
        <p>Which creates rounded corners?</p>
        <CodeBlock
          language="css"
          code={`.pill {
  border-radius: 50px;
}`}
        />
      </div>
    ),
    options: ["border-style", "border-radius", "border-width", "border-color"],
    answer: "border-radius",
  },
  {
    question: (
      <div>
        <p>What does this shorthand do?</p>
        <CodeBlock
          language="css"
          code={`.card {
  border: 2px dashed #25b1cc;
}`}
        />
      </div>
    ),
    options: [
      "Sets width, style, color",
      "Only color",
      "Only style",
      "Removes border",
    ],
    answer: "Sets width, style, color",
  },
  {
    question: (
      <div>
        <p>How much space is added inside this element on all sides?</p>
        <CodeBlock
          language="css"
          code={`.container {
  padding: 25px;
}`}
        />
      </div>
    ),
    options: ["25px on left only", "25px on all sides", "25px on top only", "No padding"],
    answer: "25px on all sides",
  },
  {
    question: (
      <div>
        <p>What is the total outer width of this element (including margin)?</p>
        <CodeBlock
          language="css"
          code={`.item {
  width: 200px;
  padding: 10px;
  border: 5px solid;
  margin: 20px;
}`}
        />
      </div>
    ),
    options: ["200px", "230px", "250px", "270px"],
    answer: "270px", // 200 + 10×2 + 5×2 + 20×2 = 270px
  },
  {
    question: (
      <div>
        <p>Which of these will create a fully rounded button?</p>
        <CodeBlock
          language="css"
          code={`.btn {
  padding: 10px 20px;
  border-radius: 999px;
}`}
        />
      </div>
    ),
    options: [
      "border-radius: 50%",
      "border-radius: 999px",
      "border-radius: 10px",
      "No rounded corners",
    ],
    answer: "border-radius: 999px",
  },

  // ========== 5 Normal (Non-CodeBlock) Questions ==========
  {
    question: "Which CSS property adds space between elements?",
    options: ["padding", "margin", "border", "gap"],
    answer: "margin",
  },
  {
    question:
      "The CSS Box Model consists of: content, padding, border, and margin.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    question:
      "What is the correct order in the box model from inside to outside?",
    options: [
      "Margin → Border → Padding → Content",
      "Content → Padding → Border → Margin",
      "Border → Padding → Content → Margin",
      "Padding → Content → Border → Margin",
    ],
    answer: "Content → Padding → Border → Margin",
  },
  {
    question: "Which CSS property is used to create space inside an element's border?",
    options: ["margin", "padding", "border-spacing", "gap"],
    answer: "padding",
  },
  {
    question: "What happens to the border if only `border-color` is set without `border-style`?",
    options: [
      "Border is visible",
      "Border is invisible",
      "Border becomes dotted",
      "Border becomes thick",
    ],
    answer: "Border is invisible",
  },
];
const Static_MCQ_Assignment1 = ({
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
    <MCQLogic title="Static MCQ Assignment 1"  questions={randomQuestions}
    isCompleted={isCompleted}
    isLoading={isLoading}
    onComplete={handleCompletion}
    subtopicId={subtopicId}
    goalName={goalName}
    courseName={courseName}/>
  );
};

export default Static_MCQ_Assignment1;
