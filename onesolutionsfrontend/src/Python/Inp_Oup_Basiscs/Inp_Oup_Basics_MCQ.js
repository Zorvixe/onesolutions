import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is the output of this code?</p>
        <CodeBlock
          language="python"
          code={`greeting = "Hello "\nname = "Alice"\nprint(greeting + name)`}
        />
      </div>
    ),
    options: ["Hello Alice", "Hello + Alice", "HelloAlice", "Error"],
    answer: "Hello Alice",
  },
  {
    question: (
      <div>
        <p>What error does this produce?</p>
        <CodeBlock
          language="python"
          code={`print("Age: " + 25)`}
        />
      </div>
    ),
    options: [
      "TypeError: can only concatenate str (not 'int') to str",
      "ValueError",
      "NameError",
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
    options: ["Hi Hi Hi ", "HiHiHi", "3", "Error"],
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
    options: ["PythonPython", "Python Python", "Python2", "Error"],
    answer: "PythonPython",
  },
  {
    question: (
      <div>
        <p>How many characters are in the string <code>"Hello"</code>?</p>
        <CodeBlock
          language="python"
          code={`print(len("Hello"))`}
        />
      </div>
    ),
    options: ["4", "5", "6", "Error"],
    answer: "5",
  },
  {
    question: (
      <div>
        <p>User enters: <code>Alice</code><br />What is printed?</p>
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
    question: (
      <div>
        <p>What character is printed?</p>
        <CodeBlock
          language="python"
          code={`text = "Hello"\nprint(text[0])`}
        />
      </div>
    ),
    options: ["H", "e", "o", "l"],
    answer: "H",
  },
  {
    question: (
      <div>
        <p>What character is at index 4?</p>
        <CodeBlock
          language="python"
          code={`word = "Python"\nprint(word[4])`}
        />
      </div>
    ),
    options: ["P", "o", "n", "h"],
    answer: "o",
  },
  {
    question: (
      <div>
        <p>What error occurs here?</p>
        <CodeBlock
          language="python"
          code={`msg = "Hi"\nprint(msg[5])`}
        />
      </div>
    ),
    options: [
      "IndexError: string index out of range",
      "TypeError",
      "NameError",
      "No error",
    ],
    answer: "IndexError: string index out of range",
  },
  {
    question: "What is joining two strings called?",
    options: ["String addition", "String concatenation", "String merging", "String linking"],
    answer: "String concatenation",
  },
  {
    question: "Which operator is used to repeat a string?",
    options: ["+", "*", "-", "/"],
    answer: "*",
  },
  {
    question: "What function is used to get input from the user?",
    options: ["print()", "input()", "len()", "type()"],
    answer: "input()",
  },
  {
    question: "What data type does input() always return?",
    options: ["Integer", "Float", "String", "Boolean"],
    answer: "String",
  },
  {
    question: "What is the first index of any string in Python?",
    options: ["1", "0", "-1", "None"],
    answer: "0",
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