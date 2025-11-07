import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";
// import "./Pro_W_P_MCQ.css";


const questionsData = [
  {
    question: "Python is which type of language?",
    options: ["Compiled", "Interpreted", "Assembly", "Machine"],
    answer: "Interpreted",
  },
  {
    question: "Who developed Python?",
    options: [
      "Dennis Ritchie",
      "James Gosling",
      "Guido van Rossum",
      "Bjarne Stroustrup",
    ],
    answer: "Guido van Rossum",
  },
  {
    question: "Which keyword is used to define a function in Python?",
    options: ["func", "define", "def", "function"],
    answer: "def",
  },
  {
    question: (
      <div>
        <p>What will be the output of the following code?</p>
        <CodeBlock language="python" code={`x = 3 ** 2\nprint(x)`} />
      </div>
    ),
    options: ["6", "9", "8", "5"],
    answer: "9",
  },
  {
    question: <p>What is the correct file extension for Python files?</p>,
    options: [".pyth", ".pt", ".py", ".pyt"],
    answer: ".py",
  },
  {
    question: "Which data type is immutable in Python?",
    options: ["List", "Dictionary", "Tuple", "Set"],
    answer: "Tuple",
  },
  {
    question: "Which operator is used for floor division?",
    options: ["/", "//", "%", "**"],
    answer: "//",
  },
  {
    question: (
      <div>
        <p>Which method adds an item to the end of a list?</p>
        <CodeBlock
          language="python"
          code={`my_list = [1, 2]\nmy_list.append(3)\nprint(my_list)`}
        />
      </div>
    ),
    options: ["append()", "insert()", "extend()", "add()"],
    answer: "append()",
  },
  {
    question: (
      <div>
        <p>What does this code print?</p>
        <CodeBlock language="python" code={`a = 10\nb = 3\nprint(a // b)`} />
      </div>
    ),
    options: ["3.3", "3", "4", "Error"],
    answer: "3",
  },
  {
    question: "What is the correct way to start a Python class?",
    options: [
      "class MyClass:",
      "MyClass class:",
      "def class MyClass:",
      "class: MyClass",
    ],
    answer: "class MyClass:",
  },
];

const Pro_W_P_MCQ = () => {
  return <MCQLogic title = "Programming with Python - MCQs" questions = {questionsData} />;
};
export default Pro_W_P_MCQ;