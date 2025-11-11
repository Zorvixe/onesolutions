import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const List_MCQ = ({ onComplete }) => {
  const questions = [
    // 1
    {
      question:
        "Which of the following is NOT a built-in Python data structure?",
      options: [
        { id: 1, text: <span className="mcq-option-text">List</span> },
        { id: 2, text: <span className="mcq-option-text">Tuple</span> },
        { id: 3, text: <span className="mcq-option-text">Matrix</span> },
        { id: 4, text: <span className="mcq-option-text">Set</span> },
      ],
      answer: 3,
    },

    // 2
    {
      question: "How do you create a list in Python?",
      code: `a = [1, 2, 3, 4]
print(a)`,
      options: [
        { id: 1, text: <span className="mcq-option-text">(1, 2, 3, 4)</span> },
        {
          id: 2,
          text: <span className="mcq-option-text">{`{1, 2, 3, 4}`}</span>,
        },
        { id: 3, text: <span className="mcq-option-text">[1, 2, 3, 4]</span> },
        { id: 4, text: <span className="mcq-option-text">"1 2 3 4"</span> },
      ],
      answer: 3,
    },

    // 3
    {
      question: "What is the output?",
      code: `a = [[1, 2], [3, 4]]
print(a)`,
      options: [
        {
          id: 1,
          text: <span className="mcq-option-text">[[1, 2], [3, 4]]</span>,
        },
        {
          id: 2,
          text: <span className="mcq-option-text">[1, 2, 3, 4]</span>,
        },
        {
          id: 3,
          text: <span className="mcq-option-text">[[1], [2], [3], [4]]</span>,
        },
        {
          id: 4,
          text: <span className="mcq-option-text">Error</span>,
        },
      ],
      answer: 1,
    },

    // 4
    {
      question: "What will len([10, 20, 30, 40]) return?",
      options: [
        { id: 1, text: <span className="mcq-option-text">3</span> },
        { id: 2, text: <span className="mcq-option-text">4</span> },
        { id: 3, text: <span className="mcq-option-text">5</span> },
        { id: 4, text: <span className="mcq-option-text">Error</span> },
      ],
      answer: 2,
    },

    // 5
    {
      question: "What is the output?",
      code: `a = [10, 20, 30, 40]
print(a[0])
print(a[3])`,
      options: [
        {
          id: 1,
          text: <span className="mcq-option-text">10{`\n`}40</span>,
        },
        {
          id: 2,
          text: <span className="mcq-option-text">20{`\n`}30</span>,
        },
        {
          id: 3,
          text: <span className="mcq-option-text">IndexError</span>,
        },
        {
          id: 4,
          text: <span className="mcq-option-text">40{`\n`}10</span>,
        },
      ],
      answer: 1,
    },

    // 6
    {
      question: "What will be the output of:",
      code: `for i in [1, 2, 3]:
    print(i)`,
      options: [
        {
          id: 1,
          text: (
            <span className="mcq-option-text">
              1{`\n`}2{`\n`}3
            </span>
          ),
        },
        {
          id: 2,
          text: <span className="mcq-option-text">[1,2,3]</span>,
        },
        {
          id: 3,
          text: <span className="mcq-option-text">1 2 3</span>,
        },
        {
          id: 4,
          text: <span className="mcq-option-text">Error</span>,
        },
      ],
      answer: 1,
    },

    // 7
    {
      question: "What is list concatenation?",
      options: [
        {
          id: 1,
          text: (
            <span className="mcq-option-text">Joining two lists using +</span>
          ),
        },
        {
          id: 2,
          text: <span className="mcq-option-text">Multiplying lists</span>,
        },
        {
          id: 3,
          text: (
            <span className="mcq-option-text">Adding numbers inside list</span>
          ),
        },
        {
          id: 4,
          text: <span className="mcq-option-text">Sorting lists</span>,
        },
      ],
      answer: 1,
    },

    // 8
    {
      question: "What is the output?",
      code: `a = [1, 2]
b = [3, 4]
c = a + b
print(c)`,
      options: [
        {
          id: 1,
          text: <span className="mcq-option-text">[1, 2, 3, 4]</span>,
        },
        {
          id: 2,
          text: <span className="mcq-option-text">[1, 2][3, 4]</span>,
        },
        {
          id: 3,
          text: <span className="mcq-option-text">[1, [3, 4]]</span>,
        },
        {
          id: 4,
          text: <span className="mcq-option-text">Error</span>,
        },
      ],
      answer: 1,
    },

    // 9
    {
      question: "Which statement is TRUE?",
      options: [
        {
          id: 1,
          text: <span className="mcq-option-text">Lists are mutable</span>,
        },
        {
          id: 2,
          text: <span className="mcq-option-text">Strings are mutable</span>,
        },
        {
          id: 3,
          text: (
            <span className="mcq-option-text">Lists cannot be changed</span>
          ),
        },
        {
          id: 4,
          text: (
            <span className="mcq-option-text">
              Strings and lists are both immutable
            </span>
          ),
        },
      ],
      answer: 1,
    },

    // 10
    {
      question: "What happens here?",
      code: `s = "hello"
s[0] = 'H'`,
      options: [
        {
          id: 1,
          text: (
            <span className="mcq-option-text">
              It changes the first character
            </span>
          ),
        },
        {
          id: 2,
          text: <span className="mcq-option-text">Returns 'Hello'</span>,
        },
        {
          id: 3,
          text: <span className="mcq-option-text">TypeError</span>,
        },
        {
          id: 4,
          text: <span className="mcq-option-text">No output</span>,
        },
      ],
      answer: 3,
    },
  ];

  return (
    <MCQLogic
      title="List | MCQs"
      questions={questions}
      onComplete={onComplete}
    />
  );
};

export default List_MCQ;
