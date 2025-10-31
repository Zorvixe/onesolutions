import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>
          Which method is used to remove a specific key-value pair from Local
          Storage?
        </p>
      </div>
    ),
    options: [
      "localStorage.clear()",
      "localStorage.removeItem()",
      "localStorage.delete()",
      "localStorage.reset()",
    ],
    answer: "localStorage.removeItem()",
  },
  {
    question: (
      <div>
        <p>What argument does the removeItem() method require?</p>
      </div>
    ),
    options: ["Value", "Key", "Index", "Object"],
    answer: "Key",
  },
  {
    question: (
      <div>
        <p>
          What will happen if we pass a key that doesn’t exist in localStorage
          to removeItem()?
        </p>
      </div>
    ),
    options: [
      "It will throw an error",
      "It will create an empty key",
      "It will simply do nothing",
      "It will clear all data",
    ],
    answer: "It will simply do nothing",
  },
  {
    question: (
      <div>
        <p>Which of the following is true about Local Storage?</p>
      </div>
    ),
    options: [
      "Data persists even after closing the browser",
      "Data is deleted when the tab is closed",
      "Data is stored temporarily in RAM",
      "It stores data only for a single session",
    ],
    answer: "Data persists even after closing the browser",
  },
  {
    question: (
      <div>
        <p>
          What is the correct syntax to remove a key named <b>"todoList"</b>{" "}
          from Local Storage?
        </p>
        <CodeBlock
          language="javascript"
          code={`localStorage.removeItem("todoList");`}
        />
      </div>
    ),
    options: [
      'localStorage.removeItem("todoList");',
      'localStorage.deleteItem("todoList");',
      'localStorage.clear("todoList");',
      'localStorage.remove("todoList");',
    ],
    answer: 'localStorage.removeItem("todoList");',
  },
  {
    question: (
      <div>
        <p>Which method should be used to clear all data from Local Storage?</p>
        <CodeBlock language="javascript" code={`localStorage.clear();`} />
      </div>
    ),
    options: [
      "localStorage.removeItem()",
      "localStorage.clear()",
      "localStorage.reset()",
      "localStorage.deleteAll()",
    ],
    answer: "localStorage.clear()",
  },
  {
    question: (
      <div>
        <p>
          What is the output of the following code if the key “user” does not
          exist?
        </p>
        <CodeBlock
          language="javascript"
          code={`localStorage.removeItem("user");`}
        />
      </div>
    ),
    options: [
      "Throws ReferenceError",
      "Removes all keys",
      "Does nothing",
      "Prints undefined",
    ],
    answer: "Does nothing",
  },
  {
    question: (
      <div>
        <p>
          Which of the following best describes the purpose of removeItem() in a
          Todos App?
        </p>
      </div>
    ),
    options: [
      "To add new todos to local storage",
      "To remove completed or deleted todos from local storage",
      "To update todo status in local storage",
      "To reload todos from the server",
    ],
    answer: "To remove completed or deleted todos from local storage",
  },
  {
    question: (
      <div>
        <p>Identify the output when executing the code below:</p>
        <CodeBlock
          language="javascript"
          code={`localStorage.setItem("task", "Read");\nlocalStorage.removeItem("task");\nconsole.log(localStorage.getItem("task"));`}
        />
      </div>
    ),
    options: ["null", "undefined", "task", "Error"],
    answer: "null",
  },
  {
    question: (
      <div>
        <p>
          Which key-value pair will remain after executing the following code?
        </p>
        <CodeBlock
          language="javascript"
          code={`localStorage.setItem("task1", "Read");\nlocalStorage.setItem("task2", "Write");\nlocalStorage.removeItem("task1");`}
        />
      </div>
    ),
    options: [
      '{ task1: "Read" }',
      '{ task2: "Write" }',
      '{ task1: "Read", task2: "Write" }',
      "No data remains",
    ],
    answer: '{ task2: "Write" }',
  },
];

const Todos_Application_MCQ_6 = () => {
  return (
    <MCQLogic title="Todos Application 6 - MCQs" questions={questionsData} />
  );
};

export default Todos_Application_MCQ_6;
