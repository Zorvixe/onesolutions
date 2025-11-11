import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ✅ NORMAL QUESTION 1
  {
    question: "Which of the following is a built-in Python data structure?",
    options: ["Tree", "Graph", "List", "Binary Heap"],
    answer: "List",
  },

  // ✅ NORMAL QUESTION 2
  {
    question: "How are list items enclosed?",
    options: ["{}", "()", "[]", "<>"],
    answer: "[]",
  },

  // ✅ NORMAL QUESTION 3
  {
    question: "Lists are ______.",
    options: ["Immutable", "Mutable", "Unordered", "Fixed size"],
    answer: "Mutable",
  },

  // ✅ CODE QUESTION 1 — Creating List
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print([1, 2, 3, 4])`} />
      </div>
    ),
    options: ["[1, 2, 3, 4]", "[1,2,3,4,5]", "[1;2;3;4]", "(1, 2, 3, 4)"],
    answer: "[1, 2, 3, 4]",
  },

  // ✅ CODE QUESTION 2 — List of Lists
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock language="python" code={`print([[1, 2], [3, 4]])`} />
      </div>
    ),
    options: ["[[1, 2], [3, 4]]", "[1, 2, 3, 4]", "{1:2,3:4}", "Error"],
    answer: "[[1, 2], [3, 4]]",
  },

  // ✅ CODE QUESTION 3 — Length of List
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`nums = [10, 20, 30, 40]\nprint(len(nums))`}
        />
      </div>
    ),
    options: ["3", "4", "5", "Error"],
    answer: "4",
  },

  // ✅ CODE QUESTION 4 — Accessing elements
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`
nums = [10, 20, 30, 40]
print(nums[0])
print(nums[3])
          `}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">10{"\n"}40</span>,
      "10 40",
      "40 10",
      "Error",
    ],
    answer: <span className="mcq-option-text">10{"\n"}40</span>,
  },

  // ✅ CODE QUESTION 5 — Iterating over list
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`
for i in [1, 2, 3]:
    print(i)
          `}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">
        1{"\n"}2{"\n"}3
      </span>,
      "[1, 2, 3]",
      "123",
      "Error",
    ],
    answer: (
      <span className="mcq-option-text">
        1{"\n"}2{"\n"}3
      </span>
    ),
  },

  // ✅ CODE QUESTION 6 — List concatenation
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`
a = [1, 2]
b = [3, 4]
print(a + b)
          `}
        />
      </div>
    ),
    options: ["[1, 2, 3, 4]", "[1, 2][3, 4]", "Error", "(1, 2, 3, 4)"],
    answer: "[1, 2, 3, 4]",
  },

  // ✅ CODE QUESTION 7 — * repetition
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`
print([1, 2] * 2)
          `}
        />
      </div>
    ),
    options: ["[1, 2, 1, 2]", "[1, 2] * 2", "[2, 1, 2, 1]", "Error"],
    answer: "[1, 2, 1, 2]",
  },

  // ✅ CODE QUESTION 8 — List slicing
  {
    question: (
      <div>
        <p>What is the output of slicing?</p>
        <CodeBlock
          language="python"
          code={`
nums = [10, 20, 30, 40, 50]
print(nums[1:3])
          `}
        />
      </div>
    ),
    options: ["[20, 30]", "[10, 30]", "[20, 30, 40]", "Error"],
    answer: "[20, 30]",
  },

  // ✅ CODE QUESTION 9 — Extended slicing
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`
nums = [1, 2, 3, 4, 5]
print(nums[0:5:2])
          `}
        />
      </div>
    ),
    options: ["[1, 3, 5]", "[2, 4]", "[1, 2, 3, 4, 5]", "Error"],
    answer: "[1, 3, 5]",
  },

  // ✅ CODE QUESTION 10 — Mutability vs immutability
  {
    question: (
      <div>
        <p>What will happen?</p>
        <CodeBlock
          language="python"
          code={`
s = "Hello"
s[0] = 'h'
          `}
        />
      </div>
    ),
    options: ["TypeError", "hHello", "hello", "No output"],
    answer: "TypeError",
  },
];

const List_MCQ = () => {
  const shuffled = [...questionsData].sort(() => Math.random() - 0.5);

  return <MCQLogic title="List | MCQs" questions={shuffled} />;
};

export default List_MCQ;
