import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: "What is the type of the value None in Python?",
    options: ["str", "int", "NoneType", "null"],
    answer: "NoneType",
  },
  {
    question:
      "What value does a function return by default if no return statement is used?",
    options: ["0", "False", "None", "''"],
    answer: "None",
  },
  {
    question: "How do you create a tuple with exactly one element?",
    options: ["(5)", "[5]", "(5,)", "{5}"],
    answer: "(5,)",
  },
  {
    question: "Which of the following is true about tuples?",
    options: [
      "Tuples are mutable",
      "Tuples are immutable",
      "Tuples can be modified using append()",
      "Tuples support item assignment",
    ],
    answer: "Tuples are immutable",
  },
  {
    question: "What happens when you try to modify an element of a tuple?",
    options: [
      "It works like a list",
      "TypeError: 'tuple' object does not support item assignment",
      "ValueError",
      "No error, but nothing changes",
    ],
    answer: "TypeError: 'tuple' object does not support item assignment",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`t = (10, 20, 30, 40)
  print(t[1])`}
        />
      </div>
    ),
    options: ["10", "20", "30", "40"],
    answer: "20",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`colors = ("red", "green", "blue")
  print(len(colors))`}
        />
      </div>
    ),
    options: ["2", "3", "4", "Error"],
    answer: "3",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`t = (1, 2, 3)
  a, b, c = t
  print(b)`}
        />
      </div>
    ),
    options: ["1", "2", "3", "Error"],
    answer: "2",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`word = "hello"
  t = tuple(word)
  print("\\n".join(t))`}
        />
      </div>
    ),
    options: [
      <span>
        h<br />e<br />l<br />l<br />o
      </span>,
      "hello",
      "[h, e, l, l, o]",
      "Error",
    ],
    answer: (
      <span>
        h<br />e<br />l<br />l<br />o
      </span>
    ),
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`nums = [10, 20, 30]
  t = tuple(nums)
  print(t)`}
        />
      </div>
    ),
    options: ["[10, 20, 30]", "(10, 20, 30)", "10 20 30", "Error"],
    answer: "(10, 20, 30)",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`t = (5, 10, 15)
  print(10 in t)`}
        />
      </div>
    ),
    options: ["True", "False", "Error", "None"],
    answer: "True",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`a = (1, 2)
  b = (3, 4)
  c = a + b
  print(c)`}
        />
      </div>
    ),
    options: ["(1, 2, 3, 4)", "(4, 3, 2, 1)", "[1, 2, 3, 4]", "Error"],
    answer: "(1, 2, 3, 4)",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`t = ("Hi",)
  print(t * 3)`}
        />
      </div>
    ),
    options: ['("Hi", "Hi", "Hi")', '("Hi",)', '"HiHiHi"', "Error"],
    answer: '("Hi", "Hi", "Hi")',
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`def demo():
      print("Hello")
  
  result = demo()
  print(result)`}
        />
      </div>
    ),
    options: [
      <span>
        Hello
        <br />
        None
      </span>,
      "Hello",
      "None",
      "Error",
    ],
    answer: (
      <span>
        Hello
        <br />
        None
      </span>
    ),
  },
  {
    question: (
      <div>
        <p>What will happen?</p>
        <CodeBlock language="python" code={`x, y = (10, 20, 30)`} />
      </div>
    ),
    options: [
      "x = 10, y = 20",
      "ValueError: too many values to unpack",
      "ValueError: not enough values to unpack",
      "No error",
    ],
    answer: "ValueError: too many values to unpack",
  },
];

const Tuples_Sequences_MCQ = ({
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
      title="Tuples Sequences | MCQs"
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

export default Tuples_Sequences_MCQ;
