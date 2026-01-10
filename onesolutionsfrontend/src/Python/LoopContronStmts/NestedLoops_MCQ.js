import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="python"
          code={`for i in range(3):\n    for j in range(2):\n        print(i, j)`}
        />
      </div>
    ),
    options: [
      "0 0\n0 1\n1 0\n1 1\n2 0\n2 1",
      "0 1\n1 0\n2 1",
      "0 0\n1 1\n2 2",
      "Error",
    ],
    answer: "0 0\n0 1\n1 0\n1 1\n2 0\n2 1",
  },

  {
    question: (
      <div>
        <p>How many lines will be printed?</p>
        <CodeBlock
          language="python"
          code={`for a in range(2):\n    for b in range(3):\n        print("Hi")`}
        />
      </div>
    ),
    options: ["2", "3", "5", "6"],
    answer: "6",
  },

  {
    question: (
      <div>
        <p>What is the last printed pair?</p>
        <CodeBlock
          language="python"
          code={`for x in range(2):\n    for y in range(3):\n        print(x, y)`}
        />
      </div>
    ),
    options: ["1 2", "2 1", "1 1", "0 2"],
    answer: "1 2",
  },

  {
    question: (
      <div>
        <p>What is the complete output?</p>
        <CodeBlock
          language="python"
          code={`i = 0\nwhile i < 2:\n    j = 0\n    while j < 3:\n        print("i=", i, "j=", j)\n        j += 1\n    i += 1`}
        />
      </div>
    ),
    options: [
      "i= 0 j= 0\ni= 0 j= 1\ni= 0 j= 2\ni= 1 j= 0\ni= 1 j= 1\ni= 1 j= 2",
      "i= 0 only",
      "Infinite loop",
      "Error",
    ],
    answer: "i= 0 j= 0\ni= 0 j= 1\ni= 0 j= 2\ni= 1 j= 0\ni= 1 j= 1\ni= 1 j= 2",
  },

  {
    question: (
      <div>
        <p>How many times does \"*\" print?</p>
        <CodeBlock
          language="python"
          code={`for p in range(4):\n    for q in range(2):\n        print("*", end="")\n    print()`}
        />
      </div>
    ),
    options: ["4", "6", "8", "10"],
    answer: "8",
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`outer = 0\nwhile outer < 3:\n    inner = 0\n    while inner < 2:\n        print(outer, inner)\n        inner += 1\n    outer += 1`}
        />
      </div>
    ),
    options: [
      "0 0\n0 1\n1 0\n1 1\n2 0\n2 1",
      "0 1\n1 0\n2 1",
      "0 0\n1 1\n2 2",
      "Infinite",
    ],
    answer: "0 0\n0 1\n1 0\n1 1\n2 0\n2 1",
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`for i in range(2):\n    count = 0\n    while count < 3:\n        print("i=", i, "count=", count)\n        count += 1`}
        />
      </div>
    ),
    options: [
      "i= 0 count= 0\ni= 0 count= 1\ni= 0 count= 2\ni= 1 count= 0\ni= 1 count= 1\ni= 1 count= 2",
      "i= 0 only",
      "Infinite loop",
      "Error",
    ],
    answer:
      "i= 0 count= 0\ni= 0 count= 1\ni= 0 count= 2\ni= 1 count= 0\ni= 1 count= 1\ni= 1 count= 2",
  },

  {
    question: (
      <div>
        <p>How many total iterations?</p>
        <CodeBlock
          language="python"
          code={`i = 0\nwhile i < 3:\n    j = 0\n    while j < 4:\n        j += 1\n    i += 1\nprint("Done")`}
        />
      </div>
    ),
    options: ["3", "4", "12", "7"],
    answer: "12",
  },

  {
    question: (
      <div>
        <p>What is the output pattern?</p>
        <CodeBlock
          language="python"
          code={`for a in range(3):\n    for b in range(a+1):\n        print(b, end=" ")\n    print()`}
        />
      </div>
    ),
    options: [
      "0\n0 1\n0 1 2",
      "0 1 2\n0 1 2\n0 1 2",
      "1\n1 2\n1 2 3",
      "Nothing",
    ],
    answer: "0\n0 1\n0 1 2",
  },

  {
    question: (
      <div>
        <p>How many times \"Run\" prints?</p>
        <CodeBlock
          language="python"
          code={`x = 0\nwhile x < 2:\n    y = 0\n    while y < 5:\n        print("Run")\n        y += 1\n    x += 1`}
        />
      </div>
    ),
    options: ["2", "5", "7", "10"],
    answer: "10",
  },

  {
    question: "In a nested loop, which loop is called the outer loop?",
    options: [
      "The one that runs faster",
      "The loop that contains another loop",
      "The inner most loop",
      "The loop with smaller range",
    ],
    answer: "The loop that contains another loop",
  },

  {
    question:
      "How many times does the inner loop execute for each iteration of the outer loop?",
    options: ["Once", "Never", "Completely (all its iterations)", "Only half"],
    answer: "Completely (all its iterations)",
  },

  {
    question: "In nested loops, the inner loop finishes before:",
    options: [
      "The outer loop starts",
      "The outer loop moves to next iteration",
      "The program ends",
      "The condition becomes False",
    ],
    answer: "The outer loop moves to next iteration",
  },

  {
    question: "Which of these is an example of nested loops?",
    options: [
      "Two separate for loops",
      "A while inside a for",
      "Two print statements",
      "A single while loop",
    ],
    answer: "A while inside a for",
  },

  {
    question:
      "Total executions = outer iterations × inner iterations. This is true for:",
    options: [
      "Single loop",
      "Nested loops",
      "Only for loops",
      "Only while loops",
    ],
    answer: "Nested loops",
  },
];

const NestedLoops_MCQ = ({ subtopicId, goalName, courseName, onComplete }) => {
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

      const result = await markSubtopicComplete(
        subtopicId,
        goalName || "Goal 1",
        courseName || "Static Website: HTML CSS & Bootstrap"
      );

      if (result.success) {
        await loadProgressSummary();
        setIsCompleted(true);
        if (onComplete) onComplete();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MCQLogic
      title="Nested Loops - MCQs"
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

export default NestedLoops_MCQ;
