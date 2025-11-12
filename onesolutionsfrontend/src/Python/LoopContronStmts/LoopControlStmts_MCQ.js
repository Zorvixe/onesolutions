import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ✅ QUESTION 1 - Break
  {
    question: "What does the break statement do?",
    options: [
      "Skips only one iteration",
      "Exits the loop completely",
      "Repeats the loop again",
      "Stops execution of entire program",
    ],
    answer: "Exits the loop completely",
  },

  // ✅ QUESTION 2 - Continue
  {
    question: "What does the continue statement do?",
    options: [
      "Stops the loop",
      "Skips current iteration",
      "Ends entire program",
      "Restarts system",
    ],
    answer: "Skips current iteration",
  },

  // ✅ QUESTION 3 - Pass
  {
    question: "What does the pass statement do?",
    options: [
      "Terminates loop",
      "Skips to next iteration",
      "Does nothing",
      "Raises an error",
    ],
    answer: "Does nothing",
  },

  // ✅ CODE QUESTION 4 - Break Output
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`
for i in range(5):
    if i == 3:
        break
    print(i)
          `}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">
        0{"\n"}1{"\n"}2
      </span>,
      <span className="mcq-option-text">
        0{"\n"}1{"\n"}2{"\n"}3
      </span>,
      "3",
      "Error",
    ],
    answer: (
      <span className="mcq-option-text">
        0{"\n"}1{"\n"}2
      </span>
    ),
  },

  // ✅ CODE QUESTION 5 - Continue Output
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`
for i in range(5):
    if i == 3:
        continue
    print(i)
          `}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">
        0{"\n"}1{"\n"}2{"\n"}4
      </span>,
      <span className="mcq-option-text">
        0{"\n"}1{"\n"}2{"\n"}3{"\n"}4
      </span>,
      "3",
      "Error",
    ],
    answer: (
      <span className="mcq-option-text">
        0{"\n"}1{"\n"}2{"\n"}4
      </span>
    ),
  },

  // ✅ CODE QUESTION 6 - Nested Break Output
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`
for i in range(3):
    for j in range(2):
        print("i=", i, "j=", j)
    if i == 1:
        break
          `}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">
        i=0, j=0{"\n"}
        i=0, j=1{"\n"}
        i=1, j=0{"\n"}
        i=1, j=1
      </span>,
      <span className="mcq-option-text">
        i=0, j=0{"\n"}
        i=1, j=0
      </span>,
      "Stops at i=0",
      "Error",
    ],
    answer: (
      <span className="mcq-option-text">
        i=0, j=0{"\n"}
        i=0, j=1{"\n"}
        i=1, j=0{"\n"}
        i=1, j=1
      </span>
    ),
  },

  // ✅ CODE QUESTION 7 - Pass Output
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`
for i in range(3):
    pass
print("Done")
          `}
        />
      </div>
    ),
    options: ["Done", "0 1 2 Done", "Error", "None"],
    answer: "Done",
  },
];

const LoopControlStmts_MCQ = ({ subtopicId, goalName, courseName }) => {
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
  return (
    <MCQLogic
      title="Loop Control Statements | MCQs"
      questions={questionsData}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
      
    />
  );
};

export default LoopControlStmts_MCQ;
