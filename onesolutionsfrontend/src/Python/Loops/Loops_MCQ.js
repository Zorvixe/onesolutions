import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // 1
  {
    question: (
      <div>
        <p>
          User enters: <b>3</b>. What will be printed?
        </p>
        <CodeBlock
          language="python"
          code={`num = int(input())\nwhile num < 6:\n    print(num + 1)\n    num += 1`}
        />
      </div>
    ),
    options: ["4\n5\n6", "3\n4\n5", "4\n5", "Infinite loop"],
    answer: "4\n5\n6",
  },

  // 2
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`i = 10\nwhile i > 7:\n    print(i)\n    i -= 1`}
        />
      </div>
    ),
    options: ["10\n9\n8", "10\n9\n8\n7", "9\n8\n7", "Infinite loop"],
    answer: "10\n9\n8",
  },

  // 3
  {
    question: (
      <div>
        <p>How many times does "Hello" print?</p>
        <CodeBlock
          language="python"
          code={`count = 1\nwhile count <= 5:\n    print("Hello")\n    count += 1`}
        />
      </div>
    ),
    options: [
      "Hello\nHello\nHello\nHello\nHello",
      "Hello\nHello\nHello\nHello",
      "Hello\nHello\nHello",
      "Infinite Hello",
    ],
    answer: "Hello\nHello\nHello\nHello\nHello",
  },

  // 4
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`x = 0\nwhile x < 10:\n    x += 3\n    print(x)`}
        />
      </div>
    ),
    options: ["3\n6\n9", "0\n3\n6\n9", "3\n6\n9\n12", "Infinite loop"],
    answer: "3\n6\n9",
  },

  // 5
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`n = 5\nwhile n < 20:\n    print(n)\n    n *= 2`}
        />
      </div>
    ),
    options: ["5\n10", "5\n10\n20", "5\n10\n20\n40", "Infinite loop"],
    answer: "5\n10",
  },

  // 6
  {
    question: (
      <div>
        <p>What happens here?</p>
        <CodeBlock
          language="python"
          code={`count = 1\nwhile count < 5:\n    print(count)`}
        />
      </div>
    ),
    options: [
      "1\n2\n3\n4",
      "1\n2\n3\n4\n5",
      "Infinite loop (prints 1 forever)",
      "NameError",
    ],
    answer: "Infinite loop (prints 1 forever)",
  },

  // 7
  {
    question: (
      <div>
        <p>What error occurs?</p>
        <CodeBlock
          language="python"
          code={`while num < 10:\n    print(num)\n    num += 1`}
        />
      </div>
    ),
    options: [
      "IndentationError",
      "NameError: name 'num' is not defined",
      "Infinite loop",
      "SyntaxError",
    ],
    answer: "NameError: name 'num' is not defined",
  },

  // 8
  {
    question: (
      <div>
        <p>How many numbers are printed?</p>
        <CodeBlock
          language="python"
          code={`i = 2\nwhile i <= 8:\n    print(i)\n    i += 2`}
        />
      </div>
    ),
    options: ["2\n4\n6\n8", "2\n4\n6", "4\n6\n8", "Infinite loop"],
    answer: "2\n4\n6\n8",
  },

  // 9
  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock
          language="python"
          code={`a = 7\nwhile a > 0:\n    print(a)\n    a -= 2`}
        />
      </div>
    ),
    options: ["7\n5\n3\n1", "7\n5\n3", "6\n4\n2\n0", "Infinite loop"],
    answer: "7\n5\n3\n1",
  },

  // 10
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`k = 1\nwhile k <= 4:\n    print("Run")\n    k += 1`}
        />
      </div>
    ),
    options: [
      "Run\nRun\nRun\nRun",
      "Run\nRun\nRun",
      "Run\nRun",
      "Infinite Run",
    ],
    answer: "Run\nRun\nRun\nRun",
  },

  // 11 (normal)
  {
    question: "The while loop keeps running as long as the ______ is True.",
    options: ["print statement", "condition", "variable name", "indentation"],
    answer: "condition",
  },

  // 12 (normal)
  {
    question: "What is the most common reason for an infinite while loop?",
    options: [
      "Forgetting to update the counter variable",
      "Using print() too many times",
      "Wrong indentation",
      "Missing colon",
    ],
    answer: "Forgetting to update the counter variable",
  },

  // 13 (normal)
  {
    question:
      "What error occurs if you use a variable in while condition without initializing it?",
    options: ["SyntaxError", "IndentationError", "NameError", "Infinite loop"],
    answer: "NameError",
  },

  // 14 (normal)
  {
    question: "Which of these is required for a proper while loop?",
    options: [
      "Initialization + Condition + Update",
      "Only condition",
      "Only update",
      "Only print statement",
    ],
    answer: "Initialization + Condition + Update",
  },

  // 15 (normal)
  {
    question: "In a while loop, when should the counter be updated?",
    options: [
      "Before the loop starts",
      "Inside the loop body",
      "After the loop ends",
      "Never",
    ],
    answer: "Inside the loop body",
  },
];

const Loops_MCQ = ({ subtopicId, goalName, courseName, onComplete }) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        alert("Error: Subtopic ID is missing");
        return;
      }
      const result = await markSubtopicComplete(
        subtopicId,
        goalName || "Goal 1",
        courseName || "Course"
      );
      if (result.success) {
        await loadProgressSummary();
        setIsCompleted(true);
        if (onComplete) onComplete();
      } else {
        alert(`Failed to mark as complete: ${result.message}`);
      }
    } catch (err) {
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MCQLogic
      title="Loops - MCQs"
      questions={[...questionsData].sort(() => Math.random() - 0.5)}
      isCompleted={isCompleted}
      isLoading={isLoading}
      onComplete={handleCompletion}
      subtopicId={subtopicId}
      goalName={goalName}
      courseName={courseName}
    />
  );
};

export default Loops_MCQ;
