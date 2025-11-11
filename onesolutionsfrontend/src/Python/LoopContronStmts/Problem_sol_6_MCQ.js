import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ✅ NORMAL QUESTION 1
  {
    question: "What is the purpose of the end keyword in print()?",
    options: [
      "To add a newline after each print",
      "To specify what should be printed at the end",
      "To stop printing",
      "To print only numbers",
    ],
    answer: "To specify what should be printed at the end",
  },

  // ✅ NORMAL QUESTION 2
  {
    question: "What is the default value of end in print()?",
    options: ["space", "\\t", "newline", "None"],
    answer: "newline",
  },

  // ✅ NORMAL QUESTION 3
  {
    question:
      "Which of the following allows printing multiple values in the same line?",
    options: ['end=""', 'end="\\n"', "end=None", "end=newline"],
    answer: 'end=""',
  },

  // ✅ CODE QUESTION 1
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`
print("Hello")
print("World")
          `}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">Hello{"\n"}World</span>,
      "Hello World",
      "HelloWorld",
      "Error",
    ],
    answer: <span className="mcq-option-text">Hello{"\n"}World</span>,
  },

  // ✅ CODE QUESTION 2
  {
    question: (
      <div>
        <p>What is the output of this?</p>
        <CodeBlock
          language="python"
          code={`
print("Hello", end=" ")
print("World")
          `}
        />
      </div>
    ),
    options: ["HelloWorld", "Hello  World", "Hello World", "Hello-World"],
    answer: "Hello World",
  },

  // ✅ CODE QUESTION 3
  {
    question: (
      <div>
        <p>What does this print?</p>
        <CodeBlock
          language="python"
          code={`
for i in range(3):
    print("abc", end="*")
          `}
        />
      </div>
    ),
    options: [
      "abc abc abc",
      <span className="mcq-option-text">abc*abc*abc*</span>,
      "abc*abc*abc",
      "Error",
    ],
    answer: <span className="mcq-option-text">abc*abc*abc*</span>,
  },

  // ✅ CODE QUESTION 4
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`
for i in range(2):
    for j in range(2):
        print("*", end=" ")
    print()
          `}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">* * {"\n"}* *</span>,
      "* * * *",
      "* *",
      "Error",
    ],
    answer: <span className="mcq-option-text">* * {"\n"}* *</span>,
  },

  // ✅ CODE QUESTION 5
  {
    question: (
      <div>
        <p>What is the behavior of this code?</p>
        <CodeBlock
          language="python"
          code={`
print("A", end="-")
print("B", end="-")
print("C")
          `}
        />
      </div>
    ),
    options: [
      "A B C",
      "A-B-C",
      <span className="mcq-option-text">A-B-C</span>,
      "A-B C",
    ],
    answer: <span className="mcq-option-text">A-B-C</span>,
  },

  // ✅ CODE QUESTION 6
  {
    question: (
      <div>
        <p>What will this code output?</p>
        <CodeBlock
          language="python"
          code={`
for i in range(3):
    print(i, end="")
          `}
        />
      </div>
    ),
    options: ["0 1 2", "0 1 2 ", "012", "0 12"],
    answer: "012",
  },

  // ✅ CODE QUESTION 7
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`
for i in range(2):
    for j in range(3):
        print("*", end=" ")
    print()
          `}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">* * * {"\n"}* * *</span>,
      "* * * * * *",
      "* {'\n'} *",
      "Error",
    ],
    answer: <span className="mcq-option-text">* * * {"\n"}* * *</span>,
  },
];

const Problem_sol_6_MCQ = () => {
  const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5);
  return <MCQLogic title="End Keyword - MCQs" questions={shuffledQuestions} />;
};

export default Problem_sol_6_MCQ;
