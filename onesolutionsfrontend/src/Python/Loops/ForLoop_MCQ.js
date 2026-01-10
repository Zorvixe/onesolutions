import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // =======================
  // 1–10 : CODEBLOCK MCQs
  // =======================

  {
    question: (
      <div>
        <p>What will be the exact output?</p>
        <CodeBlock
          language="python"
          code={`for i in range(4):\n    print(i)`}
        />
      </div>
    ),
    options: ["0\n1\n2\n3\n4", "0\n1\n2\n3", "1\n2\n3\n4", "Nothing prints"],
    answer: "0\n1\n2\n3",
  },

  {
    question: (
      <div>
        <p>What prints one character per line?</p>
        <CodeBlock
          language="python"
          code={`for ch in "CODE":\n    print(ch)`}
        />
      </div>
    ),
    options: ["CODE", "C O D E", "C\nO\nD\nE", "Error"],
    answer: "C\nO\nD\nE",
  },

  {
    question: (
      <div>
        <p>Predict the output:</p>
        <CodeBlock
          language="python"
          code={`for num in range(3, 7):\n    print(num)`}
        />
      </div>
    ),
    options: ["3\n4\n5\n6\n7", "3\n4\n5\n6", "4\n5\n6\n7", "0\n1\n2\n3"],
    answer: "3\n4\n5\n6",
  },

  {
    question: (
      <div>
        <p>How many times will "Hi" be printed?</p>
        <CodeBlock
          language="python"
          code={`for i in range(5):\n    print("Hi")`}
        />
      </div>
    ),
    options: ["Hi\nHi\nHi\nHi\nHi", "Hi Hi Hi Hi Hi", "Hi\nHi\nHi\nHi", "5"],
    answer: "Hi\nHi\nHi\nHi\nHi",
  },

  {
    question: (
      <div>
        <p>What numbers will be printed?</p>
        <CodeBlock
          language="python"
          code={`for x in range(2, 10, 3):\n    print(x)`}
        />
      </div>
    ),
    options: ["2\n5\n8", "2\n5\n8\n11", "3\n6\n9", "2\n4\n6\n8"],
    answer: "2\n5\n8",
  },

  {
    question: (
      <div>
        <p>Observe the output:</p>
        <CodeBlock
          language="python"
          code={`text = "HELLO"\nfor letter in text:\n    print(letter)`}
        />
      </div>
    ),
    options: ["HELLO", "H E L L O", "H\nE\nL\nL\nO", "Error"],
    answer: "H\nE\nL\nL\nO",
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`for i in range(1, 6):\n    print(i * 3)`}
        />
      </div>
    ),
    options: [
      "3\n6\n9\n12\n15",
      "1\n2\n3\n4\n5",
      "0\n3\n6\n9\n12",
      "3\n6\n9\n12",
    ],
    answer: "3\n6\n9\n12\n15",
  },

  {
    question: (
      <div>
        <p>How many numbers are generated?</p>
        <CodeBlock
          language="python"
          code={`for n in range(8):\n    print(n)`}
        />
      </div>
    ),
    options: [
      "8 numbers (0 to 7)",
      "9 numbers (0 to 8)",
      "7 numbers (1 to 7)",
      "Infinite",
    ],
    answer: "8 numbers (0 to 7)",
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`for i in range(10, 5, -1):\n    print(i)`}
        />
      </div>
    ),
    options: [
      "10\n9\n8\n7\n6",
      "10\n9\n8\n7\n6\n5",
      "9\n8\n7\n6\n5",
      "Nothing",
    ],
    answer: "10\n9\n8\n7\n6",
  },

  {
    question: (
      <div>
        <p>What characters appear?</p>
        <CodeBlock
          language="python"
          code={`name = "PYTHON"\nfor c in name:\n    print(c)`}
        />
      </div>
    ),
    options: ["PYTHON", "P Y T H O N", "P\nY\nT\nH\nO\nN", "Error"],
    answer: "P\nY\nT\nH\nO\nN",
  },

  // =======================
  // 11–15 : NORMAL MCQs
  // =======================

  {
    question: "What does range(5) generate?",
    options: [
      "0, 1, 2, 3, 4, 5",
      "1, 2, 3, 4, 5",
      "0, 1, 2, 3, 4",
      "5 numbers starting from 1",
    ],
    answer: "0, 1, 2, 3, 4",
  },

  {
    question: "In range(start, end), the end value is:",
    options: [
      "Included",
      "Not included",
      "Sometimes included",
      "Only included if step is 1",
    ],
    answer: "Not included",
  },

  {
    question: "Which of these correctly prints numbers from 5 to 9?",
    options: ["range(5, 10)", "range(5, 9)", "range(10)", "range(9, 5)"],
    answer: "range(5, 10)",
  },

  {
    question: "What kind of sequence does a for loop iterate over?",
    options: [
      "Only numbers",
      "Only strings",
      "Any sequence (string, range, etc.)",
      "Only lists",
    ],
    answer: "Any sequence (string, range, etc.)",
  },

  {
    question: 'How do you loop through each character of the string "ABC"?',
    options: [
      'for i in "ABC":',
      'for i in range("ABC"):',
      'for i in len("ABC"):',
      'for i in list("ABC"):',
    ],
    answer: 'for i in "ABC":',
  },
];

const ForLoop_MCQ = ({ subtopicId, goalName, courseName, onComplete }) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (subtopicId && completedContent.includes(subtopicId)) {
      setIsCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleCompletion = async () => {
    if (isLoading || isCompleted) return;

    try {
      setIsLoading(true);

      if (!subtopicId) {
        console.error("❌ Subtopic ID is required");
        alert("Error: Subtopic ID is missing");
        return;
      }

      const result = await markSubtopicComplete(
        subtopicId,
        goalName || "Goal 1",
        courseName || "Static Website: HTML CSS & Bootstrap"
      );

      if (result.success) {
        await loadProgressSummary();
        setIsCompleted(true);
        if (onComplete) onComplete();
      } else {
        alert(`Failed to mark as complete: ${result.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MCQLogic
      title="For Loop - MCQs"
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

export default ForLoop_MCQ;
