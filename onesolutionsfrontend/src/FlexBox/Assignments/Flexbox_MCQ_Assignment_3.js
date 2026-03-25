import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";


const questionsData = [
  // NORMAL (HARD THEORY)

  {
    question: (
      <div>
        <p>Which media query condition has higher priority when both match?</p>
      </div>
    ),
    options: [
      "First declared",
      "Last declared",
      "Smaller width",
      "Larger width",
    ],
    answer: "Last declared",
  },
  {
    question: (
      <div>
        <p>What happens if multiple media queries match the same element?</p>
      </div>
    ),
    options: [
      "Only first applies",
      "Only last applies",
      "All matching styles apply (cascade rules)",
      "None apply",
    ],
    answer: "All matching styles apply (cascade rules)",
  },
  {
    question: (
      <div>
        <p>Which of the following is NOT a valid media feature?</p>
      </div>
    ),
    options: [
      "min-width",
      "orientation",
      "device-type",
      "max-height",
    ],
    answer: "device-type",
  },
  {
    question: (
      <div>
        <p>Why is mobile-first design recommended with media queries?</p>
      </div>
    ),
    options: [
      "Better animations",
      "Improves performance and scalability",
      "Reduces CSS size",
      "Avoids flexbox",
    ],
    answer: "Improves performance and scalability",
  },
  {
    question: (
      <div>
        <p>Which approach uses <code>min-width</code> queries?</p>
      </div>
    ),
    options: [
      "Desktop-first",
      "Mobile-first",
      "Print-first",
      "Flex-first",
    ],
    answer: "Mobile-first",
  },

  // CODE-BASED (HARD)

  {
    question: (
      <div>
        <p>What will be the background color at 500px width?</p>
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
    options: ["white", "blue", "red", "none"],
    answer: "red",
  },
  {
    question: (
      <div>
        <p>What will be applied at 800px width?</p>
        <CodeBlock
          language="css"
          code={`@media (min-width: 600px) {
  body { background: green; }
}

@media (min-width: 900px) {
  body { background: yellow; }
}`}
        />
      </div>
    ),
    options: ["green", "yellow", "none", "both"],
    answer: "green",
  },
  {
    question: (
      <div>
        <p>What does this media query mean?</p>
        <CodeBlock
          language="css"
          code={`@media not screen and (max-width: 600px) {
  body { background: black; }
}`}
        />
      </div>
    ),
    options: [
      "Applies to small screens",
      "Excludes screen devices",
      "Applies only to mobile",
      "Applies to all devices",
    ],
    answer: "Excludes screen devices",
  },
  {
    question: (
      <div>
        <p>What happens when both conditions are true?</p>
        <CodeBlock
          language="css"
          code={`@media (max-width: 800px), (orientation: portrait) {
  body { background: pink; }
}`}
        />
      </div>
    ),
    options: [
      "Error occurs",
      "Only first applies",
      "Style applies (OR condition)",
      "Ignored",
    ],
    answer: "Style applies (OR condition)",
  },
  {
    question: (
      <div>
        <p>What will be the layout at 500px width?</p>
        <CodeBlock
          language="css"
          code={`.container {
  display: flex;
  flex-direction: row;
}

@media (max-width: 600px) {
  .container {
    flex-direction: column;
  }
}`}
        />
      </div>
    ),
    options: [
      "Row layout",
      "Column layout",
      "Hidden layout",
      "Grid layout",
    ],
    answer: "Column layout",
  },
  {
    question: (
      <div>
        <p>Which rule applies at 700px width?</p>
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
      "Red always wins",
      "Blue overrides red",
      "Both apply equally",
      "Error occurs",
    ],
    answer: "Blue overrides red",
  },
  {
    question: (
      <div>
        <p>What is the result of this flex + media query?</p>
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
      "Items grow on small screens",
      "Items stop growing on small screens",
      "Items shrink only",
      "No change",
    ],
    answer: "Items stop growing on small screens",
  },
  {
    question: (
      <div>
        <p>What will happen at 400px width?</p>
        <CodeBlock
          language="css"
          code={`@media (min-width: 300px) and (max-width: 500px) {
  body { background: orange; }
}`}
        />
      </div>
    ),
    options: ["orange", "no change", "error", "white"],
    answer: "orange",
  },
  {
    question: (
      <div>
        <p>Which concept is demonstrated here?</p>
        <CodeBlock
          language="css"
          code={`@media (max-width: 600px) {
  .container {
    flex-direction: column;
  }
}

@media (min-width: 601px) {
  .container {
    flex-direction: row;
  }
}`}
        />
      </div>
    ),
    options: [
      "Fixed layout",
      "Responsive design switching layouts",
      "Animation",
      "Grid system",
    ],
    answer: "Responsive design switching layouts",
  },
];

const  Flexbox_MCQ_Assignment_3 = ({
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
 
  return <MCQLogic title="Flexbox MCQ Assignment 3" questions={randomQuestions}
  isCompleted={isCompleted}
  isLoading={isLoading}
  onComplete={handleCompletion}
  subtopicId={subtopicId}
  goalName={goalName}
  courseName={courseName} />;
};

export default  Flexbox_MCQ_Assignment_3;
