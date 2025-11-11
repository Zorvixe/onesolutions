// /src/Python/Loops/Loops_MCQ.js
import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 7 CODEBLOCK QUESTIONS ====================

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`count = 5\nwhile count < 8:\n    print(count)\n    count += 1`}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">
        5{"\n"}6{"\n"}7
      </span>,
      <span className="mcq-option-text">
        6{"\n"}7{"\n"}8
      </span>,
      <span className="mcq-option-text">
        5{"\n"}6{"\n"}7{"\n"}8
      </span>,
      <span className="mcq-option-text">Error</span>,
    ],
    answer: (
      <span className="mcq-option-text">
        5{"\n"}6{"\n"}7
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>Output?</p>
        <CodeBlock
          language="python"
          code={`count = 1\nwhile count <= 3:\n    print("Hi")\n    count += 1`}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">
        Hi{"\n"}Hi{"\n"}Hi
      </span>,
      <span className="mcq-option-text">Hi</span>,
      <span className="mcq-option-text">Hi{"\n"}Hi</span>,
      <span className="mcq-option-text">Infinite Hi</span>,
    ],
    answer: (
      <span className="mcq-option-text">
        Hi{"\n"}Hi{"\n"}Hi
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What gets printed?</p>
        <CodeBlock
          language="python"
          code={`i = 3\nwhile i >= 0:\n    print(i)\n    i -= 1`}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">
        3{"\n"}2{"\n"}1{"\n"}0
      </span>,
      <span className="mcq-option-text">
        3{"\n"}2{"\n"}1
      </span>,
      <span className="mcq-option-text">
        2{"\n"}1{"\n"}0
      </span>,
      <span className="mcq-option-text">Infinite loop</span>,
    ],
    answer: (
      <span className="mcq-option-text">
        3{"\n"}2{"\n"}1{"\n"}0
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What is output?</p>
        <CodeBlock
          language="python"
          code={`x = 0\nwhile x < 5:\n    x += 2\n    print(x)`}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">2{"\n"}4</span>,
      <span className="mcq-option-text">
        1{"\n"}3{"\n"}5
      </span>,
      <span className="mcq-option-text">
        0{"\n"}2{"\n"}4{"\n"}6
      </span>,
      <span className="mcq-option-text">
        2{"\n"}4{"\n"}6
      </span>,
    ],
    answer: <span className="mcq-option-text">2{"\n"}4</span>,
  },

  {
    question: (
      <div>
        <p>Output?</p>
        <CodeBlock
          language="python"
          code={`n = 2\nwhile n < 10:\n    print(n)\n    n *= 2`}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">
        2{"\n"}4{"\n"}8
      </span>,
      <span className="mcq-option-text">
        2{"\n"}4{"\n"}8{"\n"}16
      </span>,
      <span className="mcq-option-text">
        4{"\n"}8{"\n"}16
      </span>,
      <span className="mcq-option-text">2{"\n"}4</span>,
    ],
    answer: (
      <span className="mcq-option-text">
        2{"\n"}4{"\n"}8
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>Result?</p>
        <CodeBlock
          language="python"
          code={`num = 1\nwhile num < 3:\n    print(num)\nnum += 1`}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">1{"\n"}2</span>,
      <span className="mcq-option-text">
        1{"\n"}2{"\n"}3
      </span>,
      <span className="mcq-option-text">Infinite loop</span>,
      <span className="mcq-option-text">Error</span>,
    ],
    answer: <span className="mcq-option-text">Infinite loop</span>,
  },

  {
    question: (
      <div>
        <p>What prints?</p>
        <CodeBlock
          language="python"
          code={`count = 0\nwhile count < 3:\n    print("Loop")\n    count += 1`}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">
        Loop{"\n"}Loop{"\n"}Loop
      </span>,
      <span className="mcq-option-text">Loop</span>,
      <span className="mcq-option-text">Loop{"\n"}Loop</span>,
      <span className="mcq-option-text">Infinite Loop</span>,
    ],
    answer: (
      <span className="mcq-option-text">
        Loop{"\n"}Loop{"\n"}Loop
      </span>
    ),
  },

  // ==================== 3 NORMAL QUESTIONS ====================

  {
    question: "The while loop runs as long as the ______ is True.",
    options: [
      <span className="mcq-option-text">condition</span>,
      <span className="mcq-option-text">output</span>,
      <span className="mcq-option-text">function</span>,
      <span className="mcq-option-text">range</span>,
    ],
    answer: <span className="mcq-option-text">condition</span>,
  },

  {
    question: "Which mistake causes an infinite loop?",
    options: [
      <span className="mcq-option-text">Not updating counter</span>,
      <span className="mcq-option-text">Using print()</span>,
      <span className="mcq-option-text">Using range()</span>,
      <span className="mcq-option-text">Using comments</span>,
    ],
    answer: <span className="mcq-option-text">Not updating counter</span>,
  },

  {
    question: "What happens if initialization is missing?",
    options: [
      <span className="mcq-option-text">NameError</span>,
      <span className="mcq-option-text">SyntaxError</span>,
      <span className="mcq-option-text">IndentationError</span>,
      <span className="mcq-option-text">Program stops</span>,
    ],
    answer: <span className="mcq-option-text">NameError</span>,
  },
];

const Loops_MCQ = () => {
  const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5);
  return <MCQLogic title="Loops - MCQs" questions={shuffledQuestions} />;
};

export default Loops_MCQ;
