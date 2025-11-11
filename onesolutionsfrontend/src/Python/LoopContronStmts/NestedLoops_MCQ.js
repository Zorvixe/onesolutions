import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ✅ NORMAL QUESTION 1
  {
    question: "What is a nested loop?",
    options: [
      "A loop that runs only once",
      "A loop inside another loop",
      "A loop that never ends",
      "A loop that has no condition",
    ],
    answer: "A loop inside another loop",
  },

  // ✅ NORMAL QUESTION 2
  {
    question: "Which loop runs more times in a nested loop?",
    options: ["Outer loop", "Inner loop", "Both run equal", "None run"],
    answer: "Inner loop",
  },

  // ✅ NORMAL QUESTION 3
  {
    question: "In a nested loop, inner loop executes ______",
    options: [
      "Once only",
      "One time per outer loop iteration",
      "Only when outer loop ends",
      "Random times",
    ],
    answer: "One time per outer loop iteration",
  },

  // ✅ CODE QUESTION 1
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`
for i in range(2):
    for j in range(2):
        print(i, j)
          `}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">
        0 0{"\n"}0 1{"\n"}1 0{"\n"}1 1
      </span>,
      "0 1 2",
      "1 1 1 1",
      "Error",
    ],
    answer: (
      <span className="mcq-option-text">
        0 0{"\n"}0 1{"\n"}1 0{"\n"}1 1
      </span>
    ),
  },

  // ✅ CODE QUESTION 2
  {
    question: (
      <div>
        <p>How many total print statements execute?</p>
        <CodeBlock
          language="python"
          code={`
for i in range(3):
    for j in range(2):
        print("hello")
          `}
        />
      </div>
    ),
    options: ["2", "3", "6", "5"],
    answer: "6",
  },

  // ✅ CODE QUESTION 3
  {
    question: (
      <div>
        <p>Which values of i and j will be printed last?</p>
        <CodeBlock
          language="python"
          code={`
for i in range(2):
    for j in range(3):
        print(i, j)
          `}
        />
      </div>
    ),
    options: ["2 3", "1 2", "0 2", "1 1"],
    answer: "1 2",
  },

  // ✅ CODE QUESTION 4
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`
i = 0
while i < 2:
    j = 0
    while j < 2:
        print("i=", i, "j=", j)
        j += 1
    i += 1
          `}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">
        i= 0 j= 0{"\n"}
        i= 0 j= 1{"\n"}
        i= 1 j= 0{"\n"}
        i= 1 j= 1
      </span>,
      "Infinite loop",
      "i=0 only",
      "Error",
    ],
    answer: (
      <span className="mcq-option-text">
        i= 0 j= 0{"\n"}
        i= 0 j= 1{"\n"}
        i= 1 j= 0{"\n"}
        i= 1 j= 1
      </span>
    ),
  },

  // ✅ CODE QUESTION 5
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`
for i in range(3):
    for j in range(i):
        print(j)
          `}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">
        0{"\n"}0{"\n"}1
      </span>,
      <span className="mcq-option-text">
        1{"\n"}2{"\n"}3
      </span>,
      "0 1 2 3",
      "No output",
    ],
    answer: (
      <span className="mcq-option-text">
        0{"\n"}0{"\n"}1
      </span>
    ),
  },

  // ✅ CODE QUESTION 6
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`
for outer in range(2):
    count = 0
    while count < 2:
        print("outer=", outer, "count=", count)
        count += 1
          `}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">
        outer= 0 count= 0{"\n"}
        outer= 0 count= 1{"\n"}
        outer= 1 count= 0{"\n"}
        outer= 1 count= 1
      </span>,
      "outer= 0 only",
      "outer= 1 only",
      "Infinite loop",
    ],
    answer: (
      <span className="mcq-option-text">
        outer= 0 count= 0{"\n"}
        outer= 0 count= 1{"\n"}
        outer= 1 count= 0{"\n"}
        outer= 1 count= 1
      </span>
    ),
  },

  // ✅ CODE QUESTION 7
  {
    question: (
      <div>
        <p>How many times does this print?</p>
        <CodeBlock
          language="python"
          code={`
i = 0
while i < 3:
    j = 0
    while j < 3:
        print("*")
        j += 1
    i += 1
          `}
        />
      </div>
    ),
    options: ["3", "6", "9", "12"],
    answer: "9",
  },
];

const NestedLoops_MCQ = () => {
  const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5);
  return <MCQLogic title="Nested Loops - MCQs" questions={shuffledQuestions} />;
};

export default NestedLoops_MCQ;
