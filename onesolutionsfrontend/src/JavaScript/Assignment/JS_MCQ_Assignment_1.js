import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // 1
  {
    question: "Which of the following best describes JavaScript?",
    options: [
      "A markup language used for creating web pages",
      "A server-side scripting language",
      "A programming language used to make web pages interactive",
      "A database management language",
    ],
    answer: "A programming language used to make web pages interactive",
  },
  // 2
  {
    question: (
      <div>
        <p>
          Which of the following correctly displays a message in the browser
          console?
        </p>
        <CodeBlock language="javascript" code={`console.log("Hello World");`} />
      </div>
    ),
    options: [
      `print("Hello World");`,
      `console.write("Hello World");`,
      `echo("Hello World");`,
      `console.log("Hello World");`,
    ],
    answer: `console.log("Hello World");`,
  },
  // 3
  {
    question: (
      <div>
        <p>What is the correct way to declare a variable in JavaScript?</p>
      </div>
    ),
    options: [
      "variable name = 'John';",
      "v name = 'John';",
      "let name = 'John';",
      "string name = 'John';",
    ],
    answer: "let name = 'John';",
  },
  // 4
  {
    question: (
      <div>
        <p>What will be the output of the following code?</p>
        <CodeBlock
          language="javascript"
          code={`let a = 5;\nlet b = "5";\nconsole.log(a == b);\nconsole.log(a === b);`}
        />
      </div>
    ),
    options: ["true true", "false false", "true false", "false true"],
    answer: "true false",
  },
  // 5
  {
    question: (
      <div>
        <p>How can you create an array in JavaScript?</p>
        <CodeBlock
          language="javascript"
          code={`let colors = ["red", "green", "blue"];`}
        />
      </div>
    ),
    options: [
      `let colors = ("red", "green", "blue");`,
      `let colors = ["red", "green", "blue"];`,
      `let colors = {"red", "green", "blue"};`,
      `let colors = <"red", "green", "blue">;`,
    ],
    answer: `let colors = ["red", "green", "blue"];`,
  },
  // 6
  {
    question: (
      <div>
        <p>What will be the output of the following code?</p>
        <CodeBlock
          language="javascript"
          code={`let fruits = ["apple", "banana"];\nfruits.push("mango");\nconsole.log(fruits.length);`}
        />
      </div>
    ),
    options: ["2", "3", "4", "undefined"],
    answer: "3",
  },
  // 7
  {
    question: (
      <div>
        <p>
          How can you access the value of <code>age</code> in the following
          object?
        </p>
        <CodeBlock
          language="javascript"
          code={`let person = { name: "Rahul", age: 25 };\n// Access age`}
        />
      </div>
    ),
    options: ["person['age']", "person(age)", "person->age", "get.person.age"],
    answer: "person['age']",
  },
  // 8
  {
    question: (
      <div>
        <p>What will be the output of this code snippet?</p>
        <CodeBlock
          language="javascript"
          code={`let arr = [10, 20, 30];\narr.pop();\nconsole.log(arr);`}
        />
      </div>
    ),
    options: ["[10, 20]", "[20, 30]", "[10, 30]", "[30]"],
    answer: "[10, 20]",
  },
  // 9
  {
    question:
      "Which keyword allows reassigning the variable value in JavaScript?",
    options: ["const", "var", "define", "final"],
    answer: "var",
  },
  // 10
  {
    question: (
      <div>
        <p>What is the correct way to define an object in JavaScript?</p>
        <CodeBlock
          language="javascript"
          code={`let student = {\n  name: "Anita",\n  roll: 24,\n  grade: "A"\n};`}
        />
      </div>
    ),
    options: [
      `let student = ["Anita", 24, "A"];`,
      `let student = (name: "Anita", roll: 24, grade: "A");`,
      `let student = { name: "Anita", roll: 24, grade: "A" };`,
      `let student = <name: "Anita", roll: 24, grade: "A">;`,
    ],
    answer: `let student = { name: "Anita", roll: 24, grade: "A" };`,
  },
];

const JS_MCQ_Assignment_1 = () => {
  return <MCQLogic title="JS Assignment 1 - MCQs" questions={questionsData} />;
};

export default JS_MCQ_Assignment_1;
