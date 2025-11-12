import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ✅ NORMAL QUESTION 1
  {
    question: "What does ord('A') return?",
    options: ["65", "97", "48", "122"],
    answer: "65",
  },

  // ✅ NORMAL QUESTION 2
  {
    question: "Which of the following is a valid variable name?",
    options: ["total bill", "total_bill", "total-bill", "total@bill"],
    answer: "total_bill",
  },

  // ✅ NORMAL QUESTION 3
  {
    question: "Which function converts Unicode value to character?",
    options: ["unicode()", "ord()", "chr()", "charVal()"],
    answer: "chr()",
  },

  // ✅ CODE QUESTION 1
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print(ord('a'))`} />
      </div>
    ),
    options: ["65", "90", "97", "122"],
    answer: "97",
  },

  // ✅ CODE QUESTION 2
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock language="python" code={`print(chr(65))`} />
      </div>
    ),
    options: ["a", "A", "65", "Error"],
    answer: "A",
  },

  // ✅ CODE QUESTION 3
  {
    question: (
      <div>
        <p>What does this print?</p>
        <CodeBlock language="python" code={`print("A" < "B")`} />
      </div>
    ),
    options: ["True", "False", "Error", "None"],
    answer: "True",
  },

  // ✅ CODE QUESTION 4
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`
for ch in "AB":
    print(ord(ch))
          `}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">65{"\n"}66</span>,
      "6566",
      "65 66 in single line",
      "Error",
    ],
    answer: <span className="mcq-option-text">65{"\n"}66</span>,
  },

  // ✅ CODE QUESTION 5
  {
    question: (
      <div>
        <p>What does this print?</p>
        <CodeBlock
          language="python"
          code={`
s = "Hello"
print(s.lower())
          `}
        />
      </div>
    ),
    options: ["hello", "HELLO", "Hello", "error"],
    answer: "hello",
  },

  // ✅ CODE QUESTION 6
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`
print("apple" < "banana")
          `}
        />
      </div>
    ),
    options: ["True", "False", "Error", "None"],
    answer: "True",
  },

  // ✅ CODE QUESTION 7
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`
name = "python"
print(name.upper())
          `}
        />
      </div>
    ),
    options: ["PYTHON", "python", "Python", "Error"],
    answer: "PYTHON",
  },
];

const ComparingStrAndNamingVar_MCQ = ({ subtopicId, goalName, courseName }) => {
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
      title="Comparing Strings & Naming Variables | MCQs"
      questions={shuffledQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default ComparingStrAndNamingVar_MCQ;
