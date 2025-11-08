import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`print("Hello " + "Alice")`}
        />
      </div>
    ),
    options: ["Hello Alice", "Hello + Alice", "HelloAlice", "Error"],
    answer: "Hello Alice",
  },
  {
    question: (
      <div>
        <p>What error will this produce?</p>
        <CodeBlock
          language="python"
          code={`print("Age: " + 25)`}
        />
      </div>
    ),
    options: [
      "TypeError: can only concatenate str (not 'int') to str",
      "NameError",
      "SyntaxError",
      "No error",
    ],
    answer: "TypeError: can only concatenate str (not 'int') to str",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`print("Hi " * 3)`}
        />
      </div>
    ),
    options: ["Hi Hi Hi ", "HiHiHi", "Hi Hi Hi", "Error"],
    answer: "Hi Hi Hi ",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`print("Python" * 2)`}
        />
      </div>
    ),
    options: ["Python Python", "PythonPython", "Python2", "Error"],
    answer: "PythonPython",
  },
  {
    question: (
      <div>
        <p>How many characters are in "Hello"?</p>
        <CodeBlock
          language="python"
          code={`print(len("Hello"))`}
        />
      </div>
    ),
    options: ["4", "5", "6", "7"],
    answer: "5",
  },
  {
    question: (
      <div>
        <p>User types: <code>Alice</code><br />What is printed?</p>
        <CodeBlock
          language="python"
          code={`name = input()\nprint("Hello " + name)`}
        />
      </div>
    ),
    options: ["Hello Alice", "Alice", "Hello", "Error"],
    answer: "Hello Alice",
  },
  {
    question: (
      <div>
        <p>User enters: <code>10</code><br />What is the output?</p>
        <CodeBlock
          language="python"
          code={`age = input()\nprint("You are " + age)`}
        />
      </div>
    ),
    options: ["You are 10", "You are10", "Error", "10"],
    answer: "You are 10",
  },
  {
    question: "What is joining two strings called?",
    options: ["String addition", "String concatenation", "String merging", "String repeat"],
    answer: "String concatenation",
  },
  {
    question: "Which function is used to take input from the user?",
    options: ["print()", "input()", "len()", "str()"],
    answer: "input()",
  },
  {
    question: "What does input() always return?",
    options: ["Integer", "Float", "String", "Boolean"],
    answer: "String",
  },
];

const Inp_Oup_Basics_MCQ = () => {
  const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic
      title="Inputs and Outputs Basics - MCQs"
      questions={shuffledQuestions}
    />
  );
};

export default Inp_Oup_Basics_MCQ;