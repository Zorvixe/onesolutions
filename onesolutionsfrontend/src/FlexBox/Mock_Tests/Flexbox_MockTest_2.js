import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";


const questionsData = [
  // NORMAL QUESTIONS (TRICKY)

  {
    question: (
      <div>
        <p>Which property controls spacing between flex items without using margin?</p>
      </div>
    ),
    options: ["padding", "margin", "gap", "spacing"],
    answer: "gap",
  },
  {
    question: (
      <div>
        <p>In Flexbox, what does the main axis depend on?</p>
      </div>
    ),
    options: [
      "justify-content",
      "flex-direction",
      "align-items",
      "flex-wrap",
    ],
    answer: "flex-direction",
  },
  {
    question: (
      <div>
        <p>Which media query approach is better for performance?</p>
      </div>
    ),
    options: [
      "Desktop-first",
      "Mobile-first",
      "Tablet-first",
      "Print-first",
    ],
    answer: "Mobile-first",
  },
  {
    question: (
      <div>
        <p>Which property overrides alignment for a single flex item?</p>
      </div>
    ),
    options: [
      "align-items",
      "justify-content",
      "align-self",
      "flex-grow",
    ],
    answer: "align-self",
  },
  {
    question: (
      <div>
        <p>Which media feature is used to detect device orientation?</p>
      </div>
    ),
    options: ["width", "height", "orientation", "display"],
    answer: "orientation",
  },

  // CODE-BASED QUESTIONS (ADVANCED)

  {
    question: (
      <div>
        <p>What will be the background color at 550px width?</p>
        <CodeBlock
          language="css"
          code={`body { background: white; }

@media (max-width: 768px) {
  body { background: blue; }
}

@media (max-width: 600px) {
  body { background: red; }
}`}
        />
      </div>
    ),
    options: ["white", "blue", "red", "both"],
    answer: "red",
  },
  {
    question: (
      <div>
        <p>What will be applied at 850px width?</p>
        <CodeBlock
          language="css"
          code={`@media (min-width: 600px) {
  .box { color: green; }
}

@media (min-width: 900px) {
  .box { color: yellow; }
}`}
        />
      </div>
    ),
    options: ["green", "yellow", "both", "none"],
    answer: "green",
  },
  {
    question: (
      <div>
        <p>What happens in this flex layout?</p>
        <CodeBlock
          language="css"
          code={`.container {
  display: flex;
  flex-direction: row;
}

@media (max-width: 600px) {
  .container {
    flex-direction: column-reverse;
  }
}`}
        />
      </div>
    ),
    options: [
      "Items stay same",
      "Items stack vertically in reverse on small screens",
      "Items disappear",
      "Items align center",
    ],
    answer: "Items stack vertically in reverse on small screens",
  },
  {
    question: (
      <div>
        <p>Which rule applies at 650px width?</p>
        <CodeBlock
          language="css"
          code={`@media (max-width: 800px) {
  .box { color: blue; }
}

@media (max-width: 600px) {
  .box { color: red; }
}`}
        />
      </div>
    ),
    options: ["blue", "red", "both", "none"],
    answer: "blue",
  },
  {
    question: (
      <div>
        <p>What happens if order is reversed?</p>
        <CodeBlock
          language="css"
          code={`@media (max-width: 600px) {
  .box { color: red; }
}

@media (max-width: 800px) {
  .box { color: blue; }
}`}
        />
      </div>
    ),
    options: [
      "Red always applies",
      "Blue overrides red",
      "Both apply equally",
      "Error",
    ],
    answer: "Blue overrides red",
  },
  {
    question: (
      <div>
        <p>What is the result of this flex sizing?</p>
        <CodeBlock
          language="css"
          code={`.item1 { flex-grow: 1; }
.item2 { flex-grow: 3; }`}
        />
      </div>
    ),
    options: [
      "Equal space",
      "item2 takes 3x space of item1",
      "item1 takes more space",
      "No growth",
    ],
    answer: "item2 takes 3x space of item1",
  },
  {
    question: (
      <div>
        <p>What will happen at 400px width?</p>
        <CodeBlock
          language="css"
          code={`.item { flex-grow: 1; }

@media (max-width: 500px) {
  .item { flex-grow: 0; }
}`}
        />
      </div>
    ),
    options: [
      "Items grow",
      "Items stop growing",
      "Items shrink only",
      "No change",
    ],
    answer: "Items stop growing",
  },
  {
    question: (
      <div>
        <p>What does this media query mean?</p>
        <CodeBlock
          language="css"
          code={`@media screen and (min-width: 600px) and (max-width: 900px) {
  body { background: green; }
}`}
        />
      </div>
    ),
    options: [
      "Applies below 600px",
      "Applies between 600px and 900px",
      "Applies above 900px",
      "Applies to all screens",
    ],
    answer: "Applies between 600px and 900px",
  },
  {
    question: (
      <div>
        <p>What happens when using comma (,) in media queries?</p>
      </div>
    ),
    options: [
      "AND condition",
      "OR condition",
      "NOT condition",
      "ERROR",
    ],
    answer: "OR condition",
  },
  {
    question: (
      <div>
        <p>What is the purpose of combining flexbox with media queries?</p>
      </div>
    ),
    options: [
      "Animation",
      "Responsive adaptive layouts",
      "Hide elements",
      "Increase speed",
    ],
    answer: "Responsive adaptive layouts",
  },
];

const  Flexbox_MockTest_2 = ({
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
 
  return <MCQLogic title=" Flexbox MockTest 2" questions={randomQuestions}
  isCompleted={isCompleted}
  isLoading={isLoading}
  onComplete={handleCompletion}
  subtopicId={subtopicId}
  goalName={goalName}
  courseName={courseName} />;
};

export default   Flexbox_MockTest_2;
