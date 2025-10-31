import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What are HTML Forms mainly used for?</p>
      </div>
    ),
    options: [
      "To display animations on a webpage",
      "To collect data from the user",
      "To create navigation menus",
      "To link CSS and JavaScript files",
    ],
    answer: "To collect data from the user",
  },
  {
    question: (
      <div>
        <p>Which of the following is a common type of HTML form?</p>
      </div>
    ),
    options: [
      "Login / Sign in Form",
      "Image Gallery",
      "Video Player",
      "Navigation Bar",
    ],
    answer: "Login / Sign in Form",
  },
  {
    question: (
      <div>
        <p>
          Which HTML element acts as a container for input elements like text
          fields and checkboxes?
        </p>
        <CodeBlock
          language="html"
          code={`<form>\n  <input type="text" />\n  <input type="submit" />\n</form>`}
        />
      </div>
    ),
    options: ["<input>", "<form>", "<label>", "<fieldset>"],
    answer: "<form>",
  },
  {
    question: (
      <div>
        <p>
          What event is triggered when you press Enter or click a button inside
          a form?
        </p>
      </div>
    ),
    options: ["click", "submit", "focus", "change"],
    answer: "submit",
  },
  {
    question: (
      <div>
        <p>
          What does the <code>preventDefault()</code> method do in a form event?
        </p>
        <CodeBlock
          language="javascript"
          code={`form.addEventListener("submit", function(event) {\n  event.preventDefault();\n  console.log("Form submission prevented!");\n});`}
        />
      </div>
    ),
    options: [
      "Submits the form twice",
      "Prevents the form’s default submit action",
      "Resets all form inputs",
      "Stops event propagation",
    ],
    answer: "Prevents the form’s default submit action",
  },
  {
    question: (
      <div>
        <p>
          Which of the following is <b>not</b> an example of an event type?
        </p>
      </div>
    ),
    options: ["Keyboard Events", "Form Events", "Touch Events", "CSS Events"],
    answer: "CSS Events",
  },
  {
    question: (
      <div>
        <p>Which of the following are examples of Form Events?</p>
      </div>
    ),
    options: [
      "blur, focus, change",
      "click, hover, drag",
      "resize, scroll, load",
      "copy, paste, cut",
    ],
    answer: "blur, focus, change",
  },
  {
    question: (
      <div>
        <p>
          When does the <code>blur</code> event trigger?
        </p>
        <CodeBlock
          language="javascript"
          code={`input.addEventListener("blur", function() {\n  console.log("Input lost focus");\n});`}
        />
      </div>
    ),
    options: [
      "When an element gains focus",
      "When an element loses focus",
      "When the page loads",
      "When the form is submitted",
    ],
    answer: "When an element loses focus",
  },
  {
    question: (
      <div>
        <p>
          Which JavaScript method would you use to stop a form from refreshing
          the page after submission?
        </p>
      </div>
    ),
    options: [
      "stopSubmit()",
      "cancelForm()",
      "preventDefault()",
      "blockSubmit()",
    ],
    answer: "preventDefault()",
  },
  {
    question: (
      <div>
        <p>
          What type of event occurs within a form when the input field changes?
        </p>
      </div>
    ),
    options: ["blur", "change", "submit", "reset"],
    answer: "change",
  },
];

const Forms_MCQ_1 = () => {
  return <MCQLogic title="Forms - MCQs" questions={questionsData} />;
};

export default Forms_MCQ_1;
