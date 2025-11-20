import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 10 Code Block Questions ==========
  {
    question: (
      <div>
        <p>
          User enters: <code>12</code> and <code>25</code>
          <br />
          What is the output?
        </p>
        <CodeBlock
          language="python"
          code={`age = int(input())\nscore = int(input())\n\nif age >= 10:\n    print("Allowed")\n    if score > 20:\n        print("Champion")`}
        />
      </div>
    ),
    options: ["Allowed", "Allowed\nChampion", "Champion", "Nothing"],
    answer: "Allowed\nChampion",
  },
  {
    question: (
      <div>
        <p>
          User enters: <code>8</code> and <code>30</code>
          <br />
          What is printed?
        </p>
        <CodeBlock
          language="python"
          code={`age = int(input())\nscore = int(input())\n\nif age >= 10:\n    print("Allowed")\n    if score > 20:\n        print("Champion")\nelse:\n    print("Not eligible")`}
        />
      </div>
    ),
    options: ["Allowed", "Champion", "Not eligible", "Allowed\nChampion"],
    answer: "Not eligible",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`marks = 78\nif marks >= 90:\n    print("A+")\nelif marks >= 80:\n    print("A")\nelif marks >= 70:\n    print("B")\nelif marks >= 60:\n    print("C")\nelse:\n    print("Fail")`}
        />
      </div>
    ),
    options: ["A+", "A", "B", "C"],
    answer: "B",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`num = 25\nif num > 20:\n    if num < 30:\n        print("In range")\n    else:\n        print("Too high")\nelse:\n    print("Too low")`}
        />
      </div>
    ),
    options: ["In range", "Too high", "Too low", "Nothing"],
    answer: "In range",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`x = 45\nif x % 5 == 0:\n    print("Multiple of 5")\nelif x % 3 == 0:\n    print("Multiple of 3")`}
        />
      </div>
    ),
    options: ["Multiple of 5", "Multiple of 3", "Both", "Nothing"],
    answer: "Multiple of 5",
  },
  {
    question: (
      <div>
        <p>Why does this code give an error?</p>
        <CodeBlock
          language="python"
          code={`value = 10\nif value > 5:\n    print("Big")\nelse:\n    print("Small")\nelif value == 10:\n    print("Ten")`}
        />
      </div>
    ),
    options: [
      "Missing colon",
      "Wrong indentation",
      "elif cannot come after else",
      "value not defined",
    ],
    answer: "elif cannot come after else",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`a = 8\nif a > 5:\n    print("Above 5")\n    if a < 10:\n        print("Below 10")`}
        />
      </div>
    ),
    options: ["Above 5", "Below 10", "Above 5\nBelow 10", "Nothing"],
    answer: "Above 5\nBelow 10",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`temp = 32\nif temp >= 30:\n    print("Hot")\nelif temp >= 20:\n    print("Warm")\nelif temp >= 10:\n    print("Cool")`}
        />
      </div>
    ),
    options: ["Hot", "Warm", "Cool", "Nothing"],
    answer: "Hot",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`n = 7\nif n < 10:\n    print(n)\nelse:\n    if n > 20:\n        print("Big")\n    else:\n        print("Medium")`}
        />
      </div>
    ),
    options: ["7", "Big", "Medium", "Nothing"],
    answer: "7",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`score = 95\nif score >= 90:\n    print("Top")\nelif score >= 80:\n    print("Good")\nelif score >= 70:\n    print("Pass")`}
        />
      </div>
    ),
    options: ["Top", "Good", "Pass", "Nothing"],
    answer: "Top",
  },

  // ========== 5 Normal (Non-CodeBlock) Questions ==========
  {
    question: "What is a nested conditional statement?",
    options: [
      "Multiple if statements one after another",
      "An if statement inside another if or else block",
      "Using and/or in conditions",
      "A loop inside an if",
    ],
    answer: "An if statement inside another if or else block",
  },
  {
    question: "When multiple elif conditions are True, which one executes?",
    options: [
      "All of them",
      "The last one",
      "Only the first matching one",
      "Random one",
    ],
    answer: "Only the first matching one",
  },
  {
    question: "Is the 'else' statement compulsory after elif?",
    options: [
      "Yes, always",
      "No, it's optional",
      "Only in nested if",
      "Only in functions",
    ],
    answer: "No, it's optional",
  },
  {
    question: "Can you write 'elif' after an 'else' statement?",
    options: ["Yes", "No", "Only in nested blocks", "Only once"],
    answer: "No",
  },
  {
    question: "Where can nested conditions be placed?",
    options: [
      "Only inside if block",
      "Only inside else block",
      "Inside both if and else blocks",
      "Only at the top level",
    ],
    answer: "Inside both if and else blocks",
  },
];

const Nested_con_MCQ = ({
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
      title="Nested Conditional Statements in Python - MCQs"
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

export default Nested_con_MCQ;
