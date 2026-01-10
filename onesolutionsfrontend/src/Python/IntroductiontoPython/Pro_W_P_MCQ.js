import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock language="python" code={`print("Hello World")`} />
      </div>
    ),
    options: ["Hello World", "HelloWorld", "Error", '"Hello World"'],
    answer: "Hello World",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock language="python" code={`print(2 + 5)`} />
      </div>
    ),
    options: ["2 + 5", "7", "25", "Error"],
    answer: "7",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock language="python" code={`print("2 + 5")`} />
      </div>
    ),
    options: ["7", "2 + 5", "25", "Error"],
    answer: "2 + 5",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock language="python" code={`print(10 - 3)`} />
      </div>
    ),
    options: ["7", "13", "30", "Error"],
    answer: "7",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock language="python" code={`print(3 * 4)`} />
      </div>
    ),
    options: ["12", "7", "34", "Error"],
    answer: "12",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock language="python" code={`print(10 / 2)`} />
      </div>
    ),
    options: ["5.0", "5", "10 / 2", "Error"],
    answer: "5.0",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock language="python" code={`print(15.5 + 4.5)`} />
      </div>
    ),
    options: ["20.0", "20", "15.5 + 4.5", "Error"],
    answer: "20.0",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock language="python" code={`print(8 - 5.5)`} />
      </div>
    ),
    options: ["2.5", "3", "13.5", "Error"],
    answer: "2.5",
  },
  {
    question: (
      <div>
        <p>Which code will cause an error?</p>
        <CodeBlock language="python" code={`Print("Hello")`} />
      </div>
    ),
    options: [
      "print is written with capital P",
      "Missing quotes",
      "Missing parentheses",
      "No error",
    ],
    answer: "print is written with capital P",
  },
  {
    question: (
      <div>
        <p>Which code will NOT print "Hello World" correctly?</p>
        <CodeBlock language="python" code={`print(Hello World)`} />
      </div>
    ),
    options: [
      "Missing quotes around text",
      "Missing parentheses",
      "Spelling mistake in print",
      "No error",
    ],
    answer: "Missing quotes around text",
  },

  {
    question:
      "What is the correct way to write 'Hello World' program in Python?",
    options: [
      'print("Hello World")',
      'Print("Hello World")',
      "print Hello World",
      'echo("Hello World")',
    ],
    answer: 'print("Hello World")',
  },
  {
    question: "Which symbol is used for multiplication in Python?",
    options: ["x", "*", "·", "×"],
    answer: "*",
  },
  {
    question: "Which symbol is used for division in Python?",
    options: ["÷", "/", ":", "\\"],
    answer: "/",
  },
  {
    question: "Why do we use quotes around text in print()?",
    options: [
      "To perform calculation",
      "To print the text exactly as written",
      "To make it bold",
      "Quotes are optional",
    ],
    answer: "To print the text exactly as written",
  },
  {
    question:
      "Which of the following is NOT a real-world application of Python?",
    options: [
      "Artificial Intelligence",
      "Game Development",
      "Designing car engines",
      "Web Backend Development",
    ],
    answer: "Designing car engines",
  },
];

const Pro_W_P_MCQ = ({ subtopicId, goalName, courseName, onComplete }) => {
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
      title="Programming with Python - MCQs"
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
export default Pro_W_P_MCQ;
