import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>Which HTML input element uses a placeholder to guide users?</p>
        <CodeBlock
          language="html"
          code={`<input type="email" placeholder="Enter your email address" />`}
        />
      </div>
    ),
    options: [
      "Displays hint text when input is empty",
      "Sets default text permanently",
      "Changes text color inside the input",
      "Hides input text",
    ],
    answer: "Displays hint text when input is empty",
  },
  {
    question: (
      <div>
        <p>What will the following JavaScript code do when executed?</p>
        <CodeBlock
          language="javascript"
          code={`alert("New task has been added successfully!");`}
        />
      </div>
    ),
    options: [
      "Displays a popup alert message",
      "Logs the message to console",
      "Sends a notification to the server",
      "Shows a confirmation dialog with Yes/No",
    ],
    answer: "Displays a popup alert message",
  },
  {
    question: (
      <div>
        <p>What is logged to the console when the checkbox is checked?</p>
        <CodeBlock
          language="javascript"
          code={`let completed = document.getElementById("doneCheck").checked;\nconsole.log(completed);`}
        />
      </div>
    ),
    options: ["true", "false", "'checked'", "'true'"],
    answer: "true",
  },
  {
    question: (
      <div>
        <p>Which method removes a child node from the DOM?</p>
        <CodeBlock
          language="javascript"
          code={`const ul = document.getElementById("taskList");\nconst li = document.getElementById("task1");\nul.removeChild(li);`}
        />
      </div>
    ),
    options: [
      "removeNode()",
      "deleteChild()",
      "removeChild()",
      "clearElement()",
    ],
    answer: "removeChild()",
  },
  {
    question: (
      <div>
        <p>
          What is the effect of using <code>classList.toggle()</code> on an
          element?
        </p>
        <CodeBlock
          language="javascript"
          code={`document.getElementById("taskText").classList.toggle("highlighted");`}
        />
      </div>
    ),
    options: [
      "Adds a class and never removes it",
      "Toggles between adding and removing the class",
      "Removes all classes from element",
      "Creates a new CSS class",
    ],
    answer: "Toggles between adding and removing the class",
  },
  {
    question: (
      <div>
        <p>
          Which of the following statements correctly replaces{" "}
          <code>classList.add()</code> and <code>classList.remove()</code>?
        </p>
        <CodeBlock
          language="javascript"
          code={`// Instead of\nbox.classList.add("visible");\nbox.classList.remove("visible");\n\n// Use\nbox.classList.toggle("visible");`}
        />
      </div>
    ),
    options: [
      "classList.alternate()",
      "classList.toggle()",
      "classList.replace()",
      "classList.change()",
    ],
    answer: "classList.toggle()",
  },
  {
    question: (
      <div>
        <p>Which HTML code shows a popup when clicked?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="alert('Task completed!')">Complete Task</button>`}
        />
      </div>
    ),
    options: [
      "<button alert()>Complete Task</button>",
      "<button onclick='alert(`Task completed!`)' >Complete Task</button>",
      "<button message='Task completed!'></button>",
      "<button onalert='Task completed!'>Complete</button>",
    ],
    answer:
      "<button onclick='alert(`Task completed!`)' >Complete Task</button>",
  },
  {
    question: "What does the alert() function return after the user clicks OK?",
    options: ["true", "undefined", "null", "The message string itself"],
    answer: "undefined",
  },
  {
    question: "Which property checks if a checkbox input is selected?",
    options: ["checked", "value", "selected", "status"],
    answer: "checked",
  },
  {
    question: "Which DOM method removes a child element from its parent?",
    options: [
      "removeChild()",
      "deleteElement()",
      "removeNode()",
      "clearNode()",
    ],
    answer: "removeChild()",
  },
];

const Todos_Application_MCQ_2 = () => {
  return (
    <MCQLogic title="Todos Application 2 - MCQs" questions={questionsData} />
  );
};

export default Todos_Application_MCQ_2;
