// src/Python/Loops/ForLoop_MCQ.js
import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>Observe the code carefully and select the correct output:</p>
        <CodeBlock language="python" code={`for i in range(3):\n    print(i)`} />
      </div>
    ),
    options: [
      "0 1 2 3", // Normal
      "Nothing prints", // Normal
      <span className="mcq-option-text">0{'\n'}1{'\n'}2</span>, // Line-by-line
      <span className="mcq-option-text">1{'\n'}2{'\n'}3</span>, // Line-by-line
    ],
    answer: <span className="mcq-option-text">0{'\n'}1{'\n'}2</span>,
  },

  {
    question: (
      <div>
        <p>What will appear on the screen when this runs?</p>
        <CodeBlock language="python" code={`for ch in "hi":\n    print(ch)`} />
      </div>
    ),
    options: [
      "hi", // Normal
      "Error", // Normal
      <span className="mcq-option-text">h{'\n'}i</span>,
      <span className="mcq-option-text">h i</span>,
    ],
    answer: <span className="mcq-option-text">h{'\n'}i</span>,
  },

  {
    question: (
      <div>
        <p>Predict the exact printed numbers:</p>
        <CodeBlock language="python" code={`for i in range(1, 5):\n    print(i * 2)`} />
      </div>
    ),
    options: [
      "2 4 6 8", // Normal
      <span className="mcq-option-text">2{'\n'}4{'\n'}6{'\n'}8</span>,
      <span className="mcq-option-text">0{'\n'}2{'\n'}4{'\n'}6</span>,
      "1 2 3 4",
    ],
    answer: <span className="mcq-option-text">2{'\n'}4{'\n'}6{'\n'}8</span>,
  },

  {
    question: (
      <div>
        <p>Analyze this reverse loop output:</p>
        <CodeBlock language="python" code={`for i in range(5, 0, -1):\n    print(i)`} />
      </div>
    ),
    options: [
      "Loop doesn't run", // Normal
      <span className="mcq-option-text">5{'\n'}4{'\n'}3{'\n'}2{'\n'}1</span>,
      <span className="mcq-option-text">5{'\n'}4{'\n'}3{'\n'}2{'\n'}1{'\n'}0</span>,
      <span className="mcq-option-text">1{'\n'}2{'\n'}3{'\n'}4{'\n'}5</span>,
    ],
    answer: <span className="mcq-option-text">5{'\n'}4{'\n'}3{'\n'}2{'\n'}1</span>,
  },

  {
    question: (
      <div>
        <p>Check this step-down loop carefully:</p>
        <CodeBlock language="python" code={`for x in range(10, 0, -2):\n    print(x)`} />
      </div>
    ),
    options: [
      "9 7 5 3 1", // Normal
      <span className="mcq-option-text">10{'\n'}8{'\n'}6{'\n'}4{'\n'}2</span>,
      <span className="mcq-option-text">10{'\n'}8{'\n'}6{'\n'}4{'\n'}2{'\n'}0</span>,
      <span className="mcq-option-text">8{'\n'}6{'\n'}4{'\n'}2</span>,
    ],
    answer: <span className="mcq-option-text">10{'\n'}8{'\n'}6{'\n'}4{'\n'}2</span>,
  },

  {
    question: (
      <div>
        <p>What characters will print one per line?</p>
        <CodeBlock language="python" code={`word = "PYTHON"\nfor letter in word:\n    print(letter)`} />
      </div>
    ),
    options: [
      "PYTHON", // Normal
      "python", // Normal
      <span className="mcq-option-text">P{'\n'}Y{'\n'}T{'\n'}H{'\n'}O{'\n'}N</span>,
      <span className="mcq-option-text">P Y T H O N</span>,
    ],
    answer: <span className="mcq-option-text">P{'\n'}Y{'\n'}T{'\n'}H{'\n'}O{'\n'}N</span>,
  },

  {
    question: (
      <div>
        <p>How many times will "Hello" appear?</p>
        <CodeBlock language="python" code={`for i in range(3):\n    print("Hello")`} />
      </div>
    ),
    options: [
      "Hello Hello Hello", // Normal
      "3", // Normal
      <span className="mcq-option-text">Hello{'\n'}Hello{'\n'}Hello</span>,
      "Hello",
    ],
    answer: <span className="mcq-option-text">Hello{'\n'}Hello{'\n'}Hello</span>,
  },

  {
    question: "How many values are in range(10)?",
    options: ["10", "11", "9", "Infinite"],
    answer: "10",
  },

  {
    question: "What is range(2, 8, 2) equivalent to?",
    options: [
      "[2, 4, 6, 8]",
      "[2, 4, 6]",
      "range(8, 2, -2)",
      "range(4)",
    ],
    answer: "[2, 4, 6]",
  },

  {
    question: "Which loop will print numbers from 1 to 5?",
    options: [
      "range(5)",
      "range(1, 6)",
      "range(1, 5)",
      "range(6)",
    ],
    answer: "range(1, 6)",
  },
];

const ForLoop_MCQ = () => {
  const shuffled = [...questionsData].sort(() => Math.random() - 0.5);
  return <MCQLogic title="For Loop - Master MCQs" questions={shuffled} />;
};

export default ForLoop_MCQ;