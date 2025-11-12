import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ✅ NORMAL QUESTION 1
  {
    question: "What does a += b do?",
    options: [
      "Adds b to a and stores result in a",
      "Subtracts b from a",
      "Multiplies a and b",
      "Divides a by b",
    ],
    answer: "Adds b to a and stores result in a",
  },

  // ✅ NORMAL QUESTION 2
  {
    question: "Which compound operator is used for multiplication?",
    options: ["+=", "-=", "*=", "/="],
    answer: "*=",
  },

  // ✅ NORMAL QUESTION 3
  {
    question: "Which operator can be used to append strings?",
    options: ["+=", "-=", "/=", "%="],
    answer: "+=",
  },

  // ✅ CODE QUESTION 1
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`
a = 5
a += 1
print(a)
          `}
        />
      </div>
    ),
    options: ["5", "6", "7", "Error"],
    answer: "6",
  },

  // ✅ CODE QUESTION 2
  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock
          language="python"
          code={`
msg = "Hello"
msg += " World"
print(msg)
          `}
        />
      </div>
    ),
    options: ["Hello", "World", "Hello World", "HelloWorld"],
    answer: "Hello World",
  },

  // ✅ CODE QUESTION 3
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`
x = 5
x *= 2
print(x)
          `}
        />
      </div>
    ),
    options: ["5", "7", "10", "2"],
    answer: "10",
  },

  // ✅ CODE QUESTION 4
  {
    question: (
      <div>
        <p>What happens here?</p>
        <CodeBlock
          language="python"
          code={`
count = 10
count -= 3
print(count)
          `}
        />
      </div>
    ),
    options: ["13", "3", "7", "Error"],
    answer: "7",
  },

  // ✅ CODE QUESTION 5
  {
    question: (
      <div>
        <p>What does this output?</p>
        <CodeBlock
          language="python"
          code={`
s = ""
for i in range(2):
    s += "5 "
print(s)
          `}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">5 5 </span>,
      "55",
      "5",
      "Error",
    ],
    answer: <span className="mcq-option-text">5 5 </span>,
  },

  // ✅ CODE QUESTION 6
  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock
          language="python"
          code={`
n = 1
for i in range(2):
    n += 1
print(n)
          `}
        />
      </div>
    ),
    options: ["1", "2", "3", "4"],
    answer: "3",
  },

  // ✅ CODE QUESTION 7
  {
    question: (
      <div>
        <p>What does this output?</p>
        <CodeBlock
          language="python"
          code={`
value = 8
value %= 3
print(value)
          `}
        />
      </div>
    ),
    options: ["8", "3", "2", "1"],
    answer: "2",
  },
];

const Problem_sol_7_MCQ = ({ subtopicId, goalName, courseName }) => {
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

  const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5);
  return (
    <MCQLogic
      title="Problem Solving - Part 7 | MCQs"
      questions={shuffledQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default Problem_sol_7_MCQ;
