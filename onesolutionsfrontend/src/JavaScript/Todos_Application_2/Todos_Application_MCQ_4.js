import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What will be the output of the following code?</p>
        <CodeBlock
          language="javascript"
          code={`let user = { name: "Rahul", age: 25 };\nconsole.log(JSON.stringify(user));`}
        />
      </div>
    ),
    options: [
      `"{ name: Rahul, age: 25 }"`,
      `'{"name":"Rahul","age":25}'`,
      `"{'name':'Rahul','age':25}"`,
      `undefined`,
    ],
    answer: `'{"name":"Rahul","age":25}'`,
  },
  {
    question: (
      <div>
        <p>What does the following code do?</p>
        <CodeBlock
          language="javascript"
          code={`let data = '{"city":"Delhi","population":19000000}';\nlet obj = JSON.parse(data);\nconsole.log(obj.city);`}
        />
      </div>
    ),
    options: [
      "Throws an error",
      "Prints undefined",
      "Prints Delhi",
      "Prints the JSON string",
    ],
    answer: "Prints Delhi",
  },
  {
    question: (
      <div>
        <p>
          Which JSON method will convert a JavaScript array into a JSON string?
        </p>
        <CodeBlock
          language="javascript"
          code={`let fruits = ["apple", "banana", "mango"];\nlet jsonData = JSON.stringify(fruits);\nconsole.log(jsonData);`}
        />
      </div>
    ),
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.encode()",
    ],
    answer: "JSON.stringify()",
  },
  {
    question: (
      <div>
        <p>What will be logged to the console?</p>
        <CodeBlock
          language="javascript"
          code={`let person = '{"name":"Sita","active":true}';\nlet obj = JSON.parse(person);\nconsole.log(obj.active);`}
        />
      </div>
    ),
    options: ["true", "false", "'true'", "undefined"],
    answer: "true",
  },
  {
    question: (
      <div>
        <p>Identify the correct way to represent an object in JSON format.</p>
        <CodeBlock
          language="json"
          code={`{\n  "id": 101,\n  "product": "Laptop",\n  "available": true\n}`}
        />
      </div>
    ),
    options: [
      `{ id: 101, product: "Laptop", available: true }`,
      `{"id": 101, "product": "Laptop", "available": true}`,
      `{ 'id': 101, 'product': 'Laptop', 'available': true }`,
      `{id:101,"product":"Laptop","available":true}`,
    ],
    answer: `{"id": 101, "product": "Laptop", "available": true}`,
  },
  {
    question: (
      <div>
        <p>What happens when you call JSON.stringify() on a number?</p>
        <CodeBlock
          language="javascript"
          code={`let num = 50;\nconsole.log(JSON.stringify(num));`}
        />
      </div>
    ),
    options: ["50", "'50'", "undefined", "Error"],
    answer: "'50'",
  },
  {
    question: (
      <div>
        <p>What will the following code output?</p>
        <CodeBlock
          language="javascript"
          code={`let obj = { a: null, b: "hello" };\nconsole.log(JSON.stringify(obj));`}
        />
      </div>
    ),
    options: [
      `'{"a":null,"b":"hello"}'`,
      `'{"a":"null","b":"hello"}'`,
      `"a:null,b:hello"`,
      `undefined`,
    ],
    answer: `'{"a":null,"b":"hello"}'`,
  },
  {
    question: "Which of the following types is NOT supported in JSON?",
    options: ["String", "Number", "Function", "Boolean"],
    answer: "Function",
  },
  {
    question: "In JSON, keys in objects must be enclosed with what?",
    options: ["Single quotes", "Backticks", "Double quotes", "No quotes"],
    answer: "Double quotes",
  },
  {
    question:
      "Which method converts a JSON string back into a JavaScript object?",
    options: [
      "JSON.convert()",
      "JSON.stringify()",
      "JSON.decode()",
      "JSON.parse()",
    ],
    answer: "JSON.parse()",
  },
];

const Todos_Application_MCQ_4 = () => {
  return (
    <MCQLogic title="Todos Application 4 - MCQs" questions={questionsData} />
  );
};

export default Todos_Application_MCQ_4;
