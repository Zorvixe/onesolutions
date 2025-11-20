import React, { useState } from "react";
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

const Pro_W_P_MCQ = ({ subtopicId, goalName, courseName }) => {
  const { markSubtopicComplete, loadProgressSummary } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCompletion = async () => {
    try {
      await markSubtopicComplete(subtopicId, goalName, courseName);
      await loadProgressSummary();
      setIsCompleted(true);
    } catch (error) {
      console.error("❌ Failed to mark subtopic complete:", error);
    }
  };
  // Fixed: renamed the shuffled array so it doesn't shadow the outer constant
  const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic
      title="Programming with Python - MCQs"
      questions={shuffledQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default Pro_W_P_MCQ;
