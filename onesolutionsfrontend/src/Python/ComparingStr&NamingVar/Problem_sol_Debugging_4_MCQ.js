import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ✅ NORMAL QUESTION 1
  {
    question: "What does round(3.145, 2) return?",
    options: ["3.14", "3.15", "3.1", "3.145"],
    answer: "3.15",
  },

  // ✅ NORMAL QUESTION 2
  {
    question: "Which symbol is used for comments in Python?",
    options: ["//", "#", "/* */", "--"],
    answer: "#",
  },

  // ✅ NORMAL QUESTION 3
  {
    question: "Floating point values are stored as ______.",
    options: ["exact values", "approximate values", "integers", "characters"],
    answer: "approximate values",
  },

  // ✅ CODE QUESTION 1
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print(round(3.14159, 2))`} />
      </div>
    ),
    options: ["3.14", "3.15", "3.141", "3.1"],
    answer: "3.14",
  },

  // ✅ CODE QUESTION 2
  {
    question: (
      <div>
        <p>What will this print?</p>
        <CodeBlock
          language="python"
          code={`
x = 0.1 + 0.2
print(x)
          `}
        />
      </div>
    ),
    options: ["0.3", "0.30000000000000004", "0.12", "Error"],
    answer: "0.30000000000000004",
  },

  // ✅ CODE QUESTION 3
  {
    question: (
      <div>
        <p>What does this output?</p>
        <CodeBlock
          language="python"
          code={`
x = 0.1 + 0.2
print(round(x, 1))
          `}
        />
      </div>
    ),
    options: ["0.3", "0.1", "0.2", "0.4"],
    answer: "0.3",
  },

  // ✅ CODE QUESTION 4
  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock
          language="python"
          code={`
# This is a comment
value = 10
print(value)
          `}
        />
      </div>
    ),
    options: ["10", "# This is a comment", "value", "Error"],
    answer: "10",
  },

  // ✅ CODE QUESTION 5
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="python"
          code={`
num = 5.567
print(round(num))
          `}
        />
      </div>
    ),
    options: ["5", "6", "5.567", "5.6"],
    answer: "6",
  },

  // ✅ CODE QUESTION 6
  {
    question: (
      <div>
        <p>What does this print?</p>
        <CodeBlock
          language="python"
          code={`
a = 2.345
print(round(a, 1))
          `}
        />
      </div>
    ),
    options: ["2.3", "2.4", "2.34", "2"],
    answer: "2.3",
  },

  // ✅ CODE QUESTION 7
  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock
          language="python"
          code={`
# Adding numbers
x = 10
y = 20
print(x + y)
          `}
        />
      </div>
    ),
    options: ["10", "20", "30", "Error"],
    answer: "30",
  },
];

const Problem_sol_Debugging_4_MCQ = ({ subtopicId, goalName, courseName }) => {
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
    <MCQLogic title="Round & Debugging | MCQs" questions={shuffledQuestions} isCompleted={isCompleted}
    onComplete={handleCompletion}/>
  );
};

export default Problem_sol_Debugging_4_MCQ;
