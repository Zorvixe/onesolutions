import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 10 Code Block Questions ==========
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print(17 % 5)`} />
      </div>
    ),
    options: ["2", "3", "0", "5"],
    answer: "2",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock language="python" code={`print(4 ** 3)`} />
      </div>
    ),
    options: ["12", "16", "64", "7"],
    answer: "64",
  },
  {
    question: (
      <div>
        <p>What is the square of 7?</p>
        <CodeBlock language="python" code={`print(7 ** 2)`} />
      </div>
    ),
    options: ["14", "9", "49", "5"],
    answer: "49",
  },
  {
    question: (
      <div>
        <p>What is the square root of 36?</p>
        <CodeBlock language="python" code={`print(36 ** 0.5)`} />
      </div>
    ),
    options: ["6", "18", "3", "72"],
    answer: "6",
  },
  {
    question: (
      <div>
        <p>
          User enters: <b>28</b> What is printed?
        </p>
        <CodeBlock
          language="python"
          code={`num = int(input())\nif num % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")`}
        />
      </div>
    ),
    options: ["Even", "Odd", "Error", "28"],
    answer: "Even",
  },
  {
    question: (
      <div>
        <p>
          User enters: <b>11</b> What is the output?
        </p>
        <CodeBlock
          language="python"
          code={`num = int(input())\nif num % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")`}
        />
      </div>
    ),
    options: ["Even", "Odd", "Error", "11"],
    answer: "Odd",
  },
  {
    question: (
      <div>
        <p>What is the largest number here?</p>
        <CodeBlock
          language="python"
          code={`a = 40\nb = 50\nc = 30\nif a > b:\n    if a > c:\n        print("a is largest")\n    else:\n        print("c is largest")\nelse:\n    if b > c:\n        print("b is largest")\n    else:\n        print("c is largest")`}
        />
      </div>
    ),
    options: ["a is largest", "b is largest", "c is largest", "Error"],
    answer: "b is largest",
  },
  {
    question: (
      <div>
        <p>What error does this code produce?</p>
        <CodeBlock
          language="python"
          code={`if 15 == 15:\n    print("Yes")\nelse:\n    print("No")`}
        />
      </div>
    ),
    options: ["No error", "SyntaxError", "IndentationError", "ValueError"],
    answer: "No error",
  },
  {
    question: (
      <div>
        <p>What is the remainder?</p>
        <CodeBlock language="python" code={`print(20 % 3)`} />
      </div>
    ),
    options: ["2", "6", "0", "20"],
    answer: "2",
  },
  {
    question: (
      <div>
        <p>What is the power result?</p>
        <CodeBlock language="python" code={`print(5 ** 3)`} />
      </div>
    ),
    options: ["15", "125", "8", "25"],
    answer: "125",
  },

  // ========== 5 Normal (Non-CodeBlock) Questions ==========
  {
    question:
      "Which operator is used to find the remainder of a division in Python?",
    options: ["//", "/", "%", "**"],
    answer: "%",
  },
  {
    question:
      "Which operator is used to calculate a to the power of b in Python?",
    options: ["^", "**", "pow", "%"],
    answer: "**",
  },
  {
    question:
      "How can you find the square of a number 'n' using the exponent operator?",
    options: ["n % 2", "n ** 2", "n ** 0.5", "n // 2"],
    answer: "n ** 2",
  },
  {
    question: "What is the correct about debugging in Python?",
    options: [
      "It means writing code faster",
      "It is used to find and fix errors in code",
      "It is used to print output",
      "It is a type of loop",
    ],
    answer: "It is used to find and fix errors in code",
  },
  {
    question: "What common mistake often causes errors in if statements?",
    options: [
      "Spelling mistake in print",
      "Forgetting to use colons (:) after if",
      "Using print statements",
      "Using too many comments",
    ],
    answer: "Forgetting to use colons (:) after if",
  },
];

const ProblemSol_Debugging_MCQ = ({
  subtopicId,
  goalName,
  courseName,
  onComplete,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

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
        courseName,
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
      title="Problem Solving Debugging - MCQs"
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

export default ProblemSol_Debugging_MCQ;
