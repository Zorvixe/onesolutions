import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>
          What is the purpose of the HTML <code>&lt;select&gt;</code> element?
        </p>
        <CodeBlock
          language="html"
          code={`<select>\n  <option>Option 1</option>\n  <option>Option 2</option>\n</select>`}
        />
      </div>
    ),
    options: [
      "To create a drop-down list",
      "To create a text input field",
      "To display a checkbox group",
      "To create a navigation bar",
    ],
    answer: "To create a drop-down list",
  },
  {
    question: (
      <div>
        <p>Which HTML element defines a single option in a drop-down list?</p>
        <CodeBlock
          language="html"
          code={`<select>\n  <option value="html">HTML</option>\n  <option value="css">CSS</option>\n</select>`}
        />
      </div>
    ),
    options: ["<input>", "<option>", "<list>", "<dropdown>"],
    answer: "<option>",
  },
  {
    question: (
      <div>
        <p>
          What is the purpose of the <code>value</code> attribute in the{" "}
          <code>&lt;option&gt;</code> element?
        </p>
        <CodeBlock
          language="html"
          code={`<option value="js">JavaScript</option>`}
        />
      </div>
    ),
    options: [
      "It displays the text label of the option",
      "It specifies the value sent to the server when selected",
      "It changes the color of the drop-down",
      "It defines the option’s tooltip text",
    ],
    answer: "It specifies the value sent to the server when selected",
  },
  {
    question: (
      <div>
        <p>Which input type allows selecting only one option from a group?</p>
        <CodeBlock
          language="html"
          code={`<input type="radio" name="gender" value="male" /> Male\n<input type="radio" name="gender" value="female" /> Female`}
        />
      </div>
    ),
    options: ["checkbox", "radio", "text", "select"],
    answer: "radio",
  },
  {
    question: (
      <div>
        <p>
          What is the use of the <code>name</code> attribute in an input
          element?
        </p>
        <CodeBlock
          language="html"
          code={`<input type="radio" name="gender" value="male" />`}
        />
      </div>
    ),
    options: [
      "It defines the label of the radio button",
      "It groups radio buttons together",
      "It changes the color of the button",
      "It displays placeholder text",
    ],
    answer: "It groups radio buttons together",
  },
  {
    question: (
      <div>
        <p>
          What happens when multiple radio buttons share the same name
          attribute?
        </p>
      </div>
    ),
    options: [
      "They work independently",
      "All buttons can be selected together",
      "They form a radio group where only one can be selected",
      "It causes a validation error",
    ],
    answer: "They form a radio group where only one can be selected",
  },
  {
    question: (
      <div>
        <p>What is a Boolean attribute in HTML?</p>
      </div>
    ),
    options: [
      "An attribute that accepts only numbers",
      "An attribute whose presence means true and absence means false",
      "An attribute that holds multiple values",
      "An attribute used for loops",
    ],
    answer: "An attribute whose presence means true and absence means false",
  },
  {
    question: (
      <div>
        <p>Which Boolean attribute pre-selects an option when a page loads?</p>
        <CodeBlock
          language="html"
          code={`<option value="html" selected>HTML</option>`}
        />
      </div>
    ),
    options: ["checked", "default", "selected", "active"],
    answer: "selected",
  },
  {
    question: (
      <div>
        <p>
          Which attribute pre-selects or checks an input element by default?
        </p>
        <CodeBlock
          language="html"
          code={`<input type="checkbox" checked /> Remember me`}
        />
      </div>
    ),
    options: ["active", "checked", "selected", "default"],
    answer: "checked",
  },
  {
    question: (
      <div>
        <p>
          What does the presence of the <code>checked</code> attribute indicate?
        </p>
      </div>
    ),
    options: [
      "The checkbox or radio button is checked by default",
      "The form will reset automatically",
      "The input is read-only",
      "It changes the input type to checkbox",
    ],
    answer: "The checkbox or radio button is checked by default",
  },
];

const Forms_MCQ_2 = () => {
  return <MCQLogic title="Forms Part-2 - MCQs" questions={questionsData} />;
};

export default Forms_MCQ_2;
