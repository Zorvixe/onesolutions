import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is a callback function in JavaScript?</p>
      </div>
    ),
    options: [
      "A function that returns another function",
      "A function passed as an argument to another function",
      "A function that executes immediately after declaration",
      "A function used only in loops",
    ],
    answer: "A function passed as an argument to another function",
  },
  {
    question: (
      <div>
        <p>
          Which of the following demonstrates passing a function as an argument?
        </p>
        <CodeBlock
          language="javascript"
          code={`function greet(name) {\n  console.log("Hello " + name);\n}\n\nfunction user(callback) {\n  callback("Rahul");\n}\n\nuser(greet);`}
        />
      </div>
    ),
    options: [
      "Passing variable as argument",
      "Passing function as argument",
      "Returning function value",
      "Nested function declaration",
    ],
    answer: "Passing function as argument",
  },
  {
    question: (
      <div>
        <p>What will happen in the code below?</p>
        <CodeBlock
          language="javascript"
          code={`setInterval(() => {\n  console.log("Running...");\n}, 2000);`}
        />
      </div>
    ),
    options: [
      "Logs 'Running...' once after 2 seconds",
      "Logs 'Running...' repeatedly every 2 seconds",
      "Throws an error due to missing clearInterval",
      "Runs infinitely without delay",
    ],
    answer: "Logs 'Running...' repeatedly every 2 seconds",
  },
  {
    question: (
      <div>
        <p>How can you stop the repeated execution started by setInterval()?</p>
        <CodeBlock
          language="javascript"
          code={`let id = setInterval(() => {\n  console.log("Running...");\n}, 1000);\n\nclearInterval(id);`}
        />
      </div>
    ),
    options: [
      "Using stopInterval()",
      "Using cancelInterval()",
      "Using clearInterval(id)",
      "Using clearTimeout(id)",
    ],
    answer: "Using clearInterval(id)",
  },
  {
    question: (
      <div>
        <p>What will the following code output after 3 seconds?</p>
        <CodeBlock
          language="javascript"
          code={`setTimeout(() => {\n  console.log("Executed after delay");\n}, 3000);`}
        />
      </div>
    ),
    options: [
      "Immediately prints message",
      "Prints message after 3 seconds",
      "Throws timeout error",
      "Never executes",
    ],
    answer: "Prints message after 3 seconds",
  },
  {
    question: (
      <div>
        <p>Which method can cancel a setTimeout() before it executes?</p>
        <CodeBlock
          language="javascript"
          code={`let timer = setTimeout(() => {\n  console.log("This won't run");\n}, 5000);\n\nclearTimeout(timer);`}
        />
      </div>
    ),
    options: [
      "cancelTimeout(timer)",
      "stopTimeout(timer)",
      "clearTimeout(timer)",
      "resetTimeout(timer)",
    ],
    answer: "clearTimeout(timer)",
  },
  {
    question: (
      <div>
        <p>What does the following code do?</p>
        <CodeBlock
          language="javascript"
          code={`function display(callback) {\n  console.log("Before callback");\n  callback();\n  console.log("After callback");\n}\n\ndisplay(() => console.log("Inside callback"));`}
        />
      </div>
    ),
    options: [
      "Runs callback before main function",
      "Runs callback inside another function",
      "Ignores callback execution",
      "Throws syntax error",
    ],
    answer: "Runs callback inside another function",
  },
  {
    question: "What does the setInterval() method return when called?",
    options: [
      "A boolean value",
      "A function reference",
      "A unique interval ID",
      "Nothing",
    ],
    answer: "A unique interval ID",
  },
  {
    question: "What happens if clearTimeout() is called with an invalid ID?",
    options: [
      "Throws an error",
      "Does nothing",
      "Restarts the timeout",
      "Removes all scheduled tasks",
    ],
    answer: "Does nothing",
  },
  {
    question:
      "Which scheduler method repeatedly executes a callback at a fixed interval?",
    options: [
      "setTimeout()",
      "setInterval()",
      "clearTimeout()",
      "cancelInterval()",
    ],
    answer: "setInterval()",
  },
];

const Callbacks_Schedulers_MCQ = () => {
  return (
    <MCQLogic title="Callbacks & Schedulers - MCQs" questions={questionsData} />
  );
};

export default Callbacks_Schedulers_MCQ;
