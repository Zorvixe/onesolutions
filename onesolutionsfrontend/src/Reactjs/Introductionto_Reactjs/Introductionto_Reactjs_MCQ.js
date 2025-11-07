import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is React primarily used for?</p>
      </div>
    ),
    options: [
      "Building mobile applications only",
      "Building user interfaces for web applications",
      "Managing databases",
      "Creating operating systems",
    ],
    answer: "Building user interfaces for web applications",
  },
  {
    question: (
      <div>
        <p>Which of the following is a correct JSX syntax?</p>
        <CodeBlock
          language="javascript"
          code={`const element = <h1>Hello World!</h1>;`}
        />
      </div>
    ),
    options: [
      "const element = React.create('h1', 'Hello World!');",
      "const element = <h1>Hello World!</h1>;",
      "const element = <h1>('Hello World!');",
      "const element = createElement('h1', 'Hello World!');",
    ],
    answer: "const element = <h1>Hello World!</h1>;",
  },
  {
    question: (
      <div>
        <p>What is the correct way to create a React component?</p>
        <CodeBlock
          language="javascript"
          code={`const Welcome = () => <h1>Hello, User!</h1>;`}
        />
      </div>
    ),
    options: [
      "function Welcome { return <h1>Hello</h1>; }",
      "const Welcome = <h1>Hello</h1>;",
      "const Welcome = () => <h1>Hello, User!</h1>;",
      "Welcome = function() <h1>Hello</h1>;",
    ],
    answer: "const Welcome = () => <h1>Hello, User!</h1>;",
  },
  {
    question: (
      <div>
        <p>Which statement is true about JSX?</p>
      </div>
    ),
    options: [
      "JSX is a template engine used only for Node.js",
      "JSX is a syntax extension for JavaScript used with React",
      "JSX is used for database connections",
      "JSX is a styling framework",
    ],
    answer: "JSX is a syntax extension for JavaScript used with React",
  },
  {
    question: (
      <div>
        <p>Which function is used to render a React element to the DOM?</p>
        <CodeBlock
          language="javascript"
          code={`ReactDOM.render(<App />, document.getElementById('root'));`}
        />
      </div>
    ),
    options: [
      "React.mount()",
      "ReactDOM.display()",
      "ReactDOM.render()",
      "render.React()",
    ],
    answer: "ReactDOM.render()",
  },
  {
    question: (
      <div>
        <p>What should be the starting letter of a React component name?</p>
      </div>
    ),
    options: ["Lowercase", "Uppercase", "Number", "Symbol"],
    answer: "Uppercase",
  },
  {
    question: (
      <div>
        <p>
          What will happen if a React component name starts with a lowercase
          letter?
        </p>
      </div>
    ),
    options: [
      "React will treat it as an HTML tag",
      "React will throw an error",
      "It will render normally",
      "It will convert to uppercase automatically",
    ],
    answer: "React will treat it as an HTML tag",
  },
  {
    question: (
      <div>
        <p>
          Which file is typically used as the entry point of a React
          application?
        </p>
      </div>
    ),
    options: ["index.html", "App.js", "index.js", "Main.jsx"],
    answer: "index.js",
  },
  {
    question: (
      <div>
        <p>Which library must be imported to use JSX in React?</p>
        <CodeBlock language="javascript" code={`import React from "react";`} />
      </div>
    ),
    options: [
      "import JSX from 'react';",
      "import React from 'react';",
      "import DOM from 'react';",
      "import ReactJS from 'jsx';",
    ],
    answer: "import React from 'react';",
  },
  {
    question: (
      <div>
        <p>Which of the following best describes React components?</p>
      </div>
    ),
    options: [
      "Functions or classes that return JSX elements",
      "Files used for CSS styling",
      "JavaScript loops",
      "HTML templates only",
    ],
    answer: "Functions or classes that return JSX elements",
  },
];

const Introductionto_Reactjs_MCQ = () => {
  return (
    <MCQLogic
      title="Introduction to React JS - MCQs"
      questions={questionsData}
    />
  );
};

export default Introductionto_Reactjs_MCQ;
