import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 10 CODE BLOCK QUESTIONS ====================

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print(round(7.890, 2))`} />
      </div>
    ),
    options: ["7.89", "7.9", "7.8", "7.890"],
    answer: "7.89",
  },

  {
    question: (
      <div>
        <p>What will this actually print?</p>
        <CodeBlock language="python" code={`print(0.1 + 0.1 + 0.1)`} />
      </div>
    ),
    options: ["0.3", "0.30000000000000004", "0.3333333333333333", "Error"],
    answer: "0.30000000000000004",
  },

  {
    question: (
      <div>
        <p>How to fix the floating point error?</p>
        <CodeBlock language="python" code={`x = 0.1 + 0.2\nprint(round(x, 1))`} />
      </div>
    ),
    options: ["0.30000000000000004", "0.3", "0.4", "Error"],
    answer: "0.3",
  },

  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock language="python" code={`print(round(4.567))`} />
      </div>
    ),
    options: ["4", "5", "4.567", "4.6"],
    answer: "5",
  },

  {
    question: (
      <div>
        <p>What does this output?</p>
        <CodeBlock language="python" code={`# This program calculates total\nresult = 25 + 35\nprint(result)`} />
      </div>
    ),
    options: ["60", "# This program calculates total", "25 + 35", "Error"],
    answer: "60",
  },

  {
    question: (
      <div>
        <p>What is the correct way to show only 2 decimal places?</p>
        <CodeBlock language="python"	di code={`value = 3.14159\nprint(round(value, 2))`} />
      </div>
    ),
    options: ["3.14", "3.14159", "3.1", "3.142"],
    answer: "3.14",
  },

  {
    question: (
      <div>
        <p>Why do we sometimes see weird decimals like 0.30000000000000004?</p>
        <CodeBlock language="python" code={`print(0.1 + 0.2)`} />
      </div>
    ),
    options: [
      "Because of floating point approximation",
      "Because of a bug in Python",
      "Because we used wrong variable name",
      "Because print() is broken",
    ],
    answer: "Because of floating point approximation",
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`num = 8.675\nprint(round(num, 2))`} />
      </div>
    ),
    options: ["8.67", "8.68", "8.7", "8.675"],
    answer: "8.68",
  },

  {
    question: (
      <div>
        <p>Comment is ignored — what prints?</p>
        <CodeBlock language="python" code={`price = 99.99  # cost of item\nprint(price)`} />
      </div>
    ),
    options: ["99.99", "# cost of item", "price", "Error"],
    answer: "99.99",
  },

  {
    question: (
      <div>
        <p>What is the clean output?</p>
        <CodeBlock language="python" code={`total = 19.999999999\nprint(round(total, 2))`} />
      </div>
    ),
    options: ["19.999999999", "20.0", "19.99", "20"],
    answer: "20.0",
  },

  // ==================== 5 NORMAL QUESTIONS ====================

  {
    question: "What is the default number of decimal places if we write round(5.678)?",
    options: ["1", "2", "0", "None"],
    answer: "0",
  },

  {
    question: "Which symbol starts a comment in Python?",
    options: ["//", "#", "!--", "/*"],
    answer: "#",
  },

  {
    question: "Why should we use round() when dealing with money or decimal calculations?",
    options: [
      "To avoid floating point approximation errors",
      "To make numbers bigger",
      "To convert to string",
      "To slow down the program",
    ],
    answer: "To avoid floating point approximation errors",
  },

  {
    question: "What does round(6.5) return in Python?",
    options: ["6", "7", "6.5", "Error"],
    answer: "6",
  },

  {
    question: "Comments in Python are used for:",
    options: [
      "Explaining code and debugging",
      "Running faster",
      "Storing data",
      "Printing output",
    ],
    answer: "Explaining code and debugging",
  },
];

const Problem_sol_Debugging_4_MCQ = ({
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
    <MCQLogic title="Round & Debugging | MCQs" questions={randomQuestions}
    isCompleted={isCompleted}
    isLoading={isLoading}
    onComplete={handleCompletion}
    subtopicId={subtopicId}
    goalName={goalName}
    courseName={courseName}/>
  );
};

export default Problem_sol_Debugging_4_MCQ;
