import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What does the following code output?</p>
        <CodeBlock language="javascript" code={`console.log(Math.random());`} />
      </div>
    ),
    options: [
      "A random float value between 0 and 1",
      "A random integer between 0 and 100",
      "Always 0",
      "Always 1",
    ],
    answer: "A random float value between 0 and 1",
  },

  {
    question: (
      <div>
        <p>What will the following code print in the console?</p>
        <CodeBlock
          language="javascript"
          code={`console.log(Math.ceil(4.2));`}
        />
      </div>
    ),
    options: ["4", "5", "3", "Error"],
    answer: "5",
  },

  {
    question: (
      <div>
        <p>Which HTML element is used to create a text input field?</p>
        <CodeBlock language="html" code={`<input type="text" />`} />
      </div>
    ),
    options: [
      "<textbox>",
      "<input type='text'>",
      "<input type='password'>",
      "<textinput>",
    ],
    answer: "<input type='text'>",
  },

  {
    question: (
      <div>
        <p>Which HTML element allows secure entry for passwords?</p>
        <CodeBlock language="html" code={`<input type="password" />`} />
      </div>
    ),
    options: [
      "<input type='text'>",
      "<password>",
      "<input type='password'>",
      "<secureinput>",
    ],
    answer: "<input type='password'>",
  },

  {
    question: (
      <div>
        <p>What will the following code display in the console?</p>
        <CodeBlock
          language="html"
          code={`<input id="user" type="text" value="Prathibha">\n<script>\n  console.log(document.getElementById("user").value);\n</script>`}
        />
      </div>
    ),
    options: ["user", "undefined", "Prathibha", "null"],
    answer: "Prathibha",
  },

  {
    question: "Which HTML attribute specifies the type of an input element?",
    options: ["class", "type", "id", "value"],
    answer: "type",
  },

  {
    question:
      "Which JavaScript property is used to get the value of an input element?",
    options: ["innerHTML", "value", "textContent", "data"],
    answer: "value",
  },

  {
    question:
      "What does the strict equality operator (===) check in JavaScript?",
    options: [
      "Only the value",
      "Only the type",
      "Both value and type",
      "Neither value nor type",
    ],
    answer: "Both value and type",
  },

  {
    question:
      "Which comparison operator compares values without checking types?",
    options: ["==", "===", "!=", "!=="],
    answer: "==",
  },
];

const InputEle_MathFunctions_MCQ = () => {
  return <MCQLogic title="Input Element MathFunctions - MCQs" questions={questionsData} />;
};
export default InputEle_MathFunctions_MCQ;
