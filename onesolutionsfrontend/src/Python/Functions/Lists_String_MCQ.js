import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`text = "apple banana cherry"
print(text.split())`}
        />
      </div>
    ),
    options: [
      `["apple banana cherry"]`,
      `["apple", "banana", "cherry"]`,
      `["apple,banana,cherry"]`,
      "Error",
    ],
    answer: `["apple", "banana", "cherry"]`,
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`words = ["Python", "is", "fun"]
print("-".join(words))`}
        />
      </div>
    ),
    options: ["Python-is-fun", "Python is fun", "Python,is,fun", "Error"],
    answer: "Python-is-fun",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`s = "hello,world,python"
print(s.split(",")[1])`}
        />
      </div>
    ),
    options: ["hello", "world", "python", "Error"],
    answer: "world",
  },
  {
    question: (
      <div>
        <p>What does this print?</p>
        <CodeBlock
          language="python"
          code={`nums = [10, 20, 30, 40, 50]
print(nums[-2])`}
        />
      </div>
    ),
    options: ["40", "50", "10", "30"],
    answer: "40",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`data = [1, 2, 3, 4, 5]
print(data[::-1])`}
        />
      </div>
    ),
    options: ["[5, 4, 3, 2, 1]", "[1, 2, 3, 4, 5]", "[5, 1]", "Error"],
    answer: "[5, 4, 3, 2, 1]",
  },
  {
    question: (
      <div>
        <p>What slice is returned?</p>
        <CodeBlock
          language="python"
          code={`letters = ["a", "b", "c", "d", "e", "f"]
print(letters[1:5])`}
        />
      </div>
    ),
    options: [
      `["b", "c", "d", "e"]`,
      `["a", "b", "c", "d"]`,
      `["c", "d", "e", "f"]`,
      "Error",
    ],
    answer: `["b", "c", "d", "e"]`,
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`name = "madam"
print(name == name[::-1])`}
        />
      </div>
    ),
    options: ["True", "False", "Error", "None"],
    answer: "True",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`values = [100, 200, 300]
print(" | ".join(map(str, values)))`}
        />
      </div>
    ),
    options: ["100 | 200 | 300", "100200300", "[100, 200, 300]", "Error"],
    answer: "100 | 200 | 300",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`lst = [1, 2, 3, 4, 5, 6]
print(lst[-4:-1])`}
        />
      </div>
    ),
    options: ["[3, 4, 5]", "[2, 3, 4]", "[4, 5, 6]", "Error"],
    answer: "[3, 4, 5]",
  },
  {
    question: (
      <div>
        <p>What does this code print?</p>
        <CodeBlock
          language="python"
          code={`phrase = "I love Python"
words = phrase.split()
print("\\n".join(words[::-1]))`}
        />
      </div>
    ),
    options: ["Python\nlove\nI", "I\nlove\nPython", "I love Python", "Error"],
    answer: "Python\nlove\nI",
  },
  {
    question:
      "What is the default separator when no argument is passed to str.split()?",
    options: ["Comma (,)", "Any whitespace", "Newline (\\n)", "No separator"],
    answer: "Any whitespace",
  },
  {
    question:
      "Which method is used to combine a list of strings into one string with a separator?",
    options: ["str.combine()", "str.join()", "list.concat()", "str.merge()"],
    answer: "str.join()",
  },
  {
    question: "In Python, what does lst[-1] return for any non-empty list lst?",
    options: ["The first element", "The last element", "IndexError", "None"],
    answer: "The last element",
  },
  {
    question: "How do you reverse a list or string using slicing?",
    options: ["lst[:]", "lst[::-1]", "lst[-1:0]", "lst.reverse()"],
    answer: "lst[::-1]",
  },
  {
    question: "What is the result of 'hello'.split()?",
    options: [
      '["hello"]',
      '["h", "e", "l", "l", "o"]',
      '["hello"]',
      '["hello"]',
    ],
    answer: '["hello"]',
  },
];

const Lists_String_MCQ = ({ subtopicId, goalName, courseName, onComplete }) => {
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
      title="Lists and Strings | MCQs"
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

export default Lists_String_MCQ;
