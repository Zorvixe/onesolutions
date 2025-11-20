import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: "What does LIFO stand for in the context of a stack?",
    options: [
      "Last-In/First-Out",
      "First-In/First-Out",
      "Large-In/First-Out",
      "Last-In/Full-Out",
    ],
    answer: "Last-In/First-Out",
  },
  {
    question:
      "What error do you get in Python when recursion exceeds the maximum depth?",
    options: [
      "StackOverflowError",
      "RecursionError: maximum recursion depth exceeded",
      "InfiniteLoopError",
      "MemoryError",
    ],
    answer: "RecursionError: maximum recursion depth exceeded",
  },
  {
    question:
      "Which data structure is used internally to manage function calls in Python?",
    options: ["Queue", "List", "Call Stack", "Dictionary"],
    answer: "Call Stack",
  },
  {
    question: "A recursive function must always have:",
    options: ["Multiple returns", "A base case", "A loop", "Global variables"],
    answer: "A base case",
  },
  {
    question: "What is recursion?",
    options: [
      "A loop that runs forever",
      "A function calling itself",
      "A function calling another function",
      "Copying a function",
    ],
    answer: "A function calling itself",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`def a():
    return 10

def b():
    return a() + 5

print(b())`}
        />
      </div>
    ),
    options: ["10", "15", "5", "Error"],
    answer: "15",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`def countdown(n):
    if n <= 0:
        print("Done")
        return
    print(n)
    countdown(n - 1)

countdown(3)`}
        />
      </div>
    ),
    options: [
      <span>
        3<br />2<br />1<br />
        Done
      </span>,
      <span>
        Done
        <br />3<br />2<br />1
      </span>,
      <span>
        1<br />2<br />3<br />
        Done
      </span>,
      "Error",
    ],
    answer: (
      <span>
        3<br />2<br />1<br />
        Done
      </span>
    ),
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`def factorial(n):
    if n == 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))`}
        />
      </div>
    ),
    options: ["120", "60", "25", "5"],
    answer: "120",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`def rec_sum(n):
    if n == 0:
        return 0
    return n + rec_sum(n - 1)

print(rec_sum(4))`}
        />
      </div>
    ),
    options: ["10", "6", "4", "0"],
    answer: "10",
  },
  {
    question: (
      <div>
        <p>What happens when this runs?</p>
        <CodeBlock
          language="python"
          code={`def loop():
    return loop()

loop()`}
        />
      </div>
    ),
    options: [
      "Returns None",
      "Runs forever without error",
      "RecursionError: maximum recursion depth exceeded",
      "MemoryError",
    ],
    answer: "RecursionError: maximum recursion depth exceeded",
  },
  {
    question: (
      <div>
        <p>What is the final result?</p>
        <CodeBlock
          language="python"
          code={`def mystery(x):
    if x <= 0:
        return 0
    return mystery(x - 1) + 5

print(mystery(3))`}
        />
      </div>
    ),
    options: ["15", "10", "5", "0"],
    answer: "15",
  },
  {
    question: (
      <div>
        <p>How many recursive calls are made when computing factorial(4)?</p>
        <CodeBlock
          language="python"
          code={`def factorial(n):
    if n == 1:
        return 1
    return n * factorial(n - 1)

factorial(4)`}
        />
      </div>
    ),
    options: ["3", "4", "5", "1"],
    answer: "3",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`def power(base, exp):
    if exp == 0:
        return 1
    return base * power(base, exp - 1)

print(power(2, 5))`}
        />
      </div>
    ),
    options: ["32", "10", "25", "16"],
    answer: "32",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

print(fib(6))`}
        />
      </div>
    ),
    options: ["8", "13", "5", "6"],
    answer: "8",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`def outer():
    def inner():
        return "Hello"
    return inner()

print(outer())`}
        />
      </div>
    ),
    options: ["Hello", "inner", "outer", "Error"],
    answer: "Hello",
  },
];

const FunCallStack_Recursion_MCQ = ({
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
      title="Function Call Stack & Recursion | MCQs"
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

export default FunCallStack_Recursion_MCQ;
