import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What happens to the Execution Context when a web page is reloaded?</p>
        <CodeBlock
          language="javascript"
          code={`// Reloading the page\nlocation.reload();`}
        />
      </div>
    ),
    options: [
      "Execution Context continues from the last state",
      "Execution Context is destroyed and recreated",
      "Execution Context is paused",
      "Execution Context becomes global only",
    ],
    answer: "Execution Context is destroyed and recreated",
  },
  {
    question: (
      <div>
        <p>Which method is used to store data in Local Storage?</p>
        <CodeBlock
          language="javascript"
          code={`localStorage.setItem("username", "Rahul");`}
        />
      </div>
    ),
    options: [
      "localStorage.storeData()",
      "localStorage.addItem()",
      "localStorage.setItem()",
      "localStorage.saveData()",
    ],
    answer: "localStorage.setItem()",
  },
  {
    question: (
      <div>
        <p>What will this code output to the console?</p>
        <CodeBlock
          language="javascript"
          code={`localStorage.setItem("city", "Delhi");\nconsole.log(localStorage.getItem("city"));`}
        />
      </div>
    ),
    options: ["undefined", "'Delhi'", "null", "'city'"],
    answer: "'Delhi'",
  },
  {
    question: (
      <div>
        <p>What happens when you store a number in Local Storage?</p>
        <CodeBlock
          language="javascript"
          code={`localStorage.setItem("score", 100);\nconsole.log(localStorage.getItem("score"));`}
        />
      </div>
    ),
    options: ["100", "'100'", "undefined", "NaN"],
    answer: "'100'",
  },
  {
    question: (
      <div>
        <p>Which code retrieves and displays a saved gender value from Local Storage?</p>
        <CodeBlock
          language="javascript"
          code={`let gender = localStorage.getItem("gender");\nconsole.log(gender);`}
        />
      </div>
    ),
    options: [
      "localStorage.show('gender')",
      "localStorage.getItem('gender')",
      "storage.retrieve('gender')",
      "localStorage.access('gender')",
    ],
    answer: "localStorage.getItem('gender')",
  },
  {
    question: (
      <div>
        <p>What is the result of clearing all stored data from Local Storage?</p>
        <CodeBlock
          language="javascript"
          code={`localStorage.clear();\nconsole.log(localStorage.length);`}
        />
      </div>
    ),
    options: ["0", "undefined", "null", "All items remain unchanged"],
    answer: "0",
  },
  {
    question: (
      <div>
        <p>How can you remove a specific key from Local Storage?</p>
        <CodeBlock
          language="javascript"
          code={`localStorage.removeItem("fullName");`}
        />
      </div>
    ),
    options: [
      "localStorage.deleteItem('fullName')",
      "localStorage.clearItem('fullName')",
      "localStorage.removeItem('fullName')",
      "localStorage.pop('fullName')",
    ],
    answer: "localStorage.removeItem('fullName')",
  },
  {
    question: "Which of the following correctly defines the Execution Context?",
    options: [
      "It is the environment where JavaScript code executes",
      "It is a storage location for cookies",
      "It is used to design web layouts",
      "It stores user session data",
    ],
    answer: "It is the environment where JavaScript code executes",
  },
  {
    question: "When should you use the value null in JavaScript?",
    options: [
      "When you want to assign a temporary string",
      "When you intentionally want a variable with no value",
      "When a variable type is undefined",
      "When you want to clear Local Storage",
    ],
    answer: "When you intentionally want a variable with no value",
  },
  {
    question: "Which HTML element is used for multiline text input?",
    options: ["<input>", "<textarea>", "<text>", "<multiline>"],
    answer: "<textarea>",
  },
];

const Todos_Application_MCQ_3 = () => {
  return (
    <MCQLogic title="Todos Application 3 - MCQs" questions={questionsData} />
  );
};

export default Todos_Application_MCQ_3;
