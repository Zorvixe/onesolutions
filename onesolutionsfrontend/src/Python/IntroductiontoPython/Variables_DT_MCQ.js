import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`name = "Python"\nprint(type(name))`}
        />
      </div>
    ),
    options: ["String", "Integer", "Float", "Boolean"],
    answer: "String",
  },
  {
    question: (
      <div>
        <p>
          What data type is <code>age</code>?
        </p>
        <CodeBlock language="python" code={`age = 21\nprint(type(age))`} />
      </div>
    ),
    options: ["String", "Integer", "Float", "Boolean"],
    answer: "Integer",
  },
  {
    question: (
      <div>
        <p>
          What is the type of <code>price</code>?
        </p>
        <CodeBlock
          language="python"
          code={`price = 599.99\nprint(type(price))`}
        />
      </div>
    ),
    options: ["String", "Integer", "Float", "Boolean"],
    answer: "Float",
  },
  {
    question: (
      <div>
        <p>What will this print?</p>
        <CodeBlock
          language="python"
          code={`is_valid = True\nprint(type(is_valid))`}
        />
      </div>
    ),
    options: ["String", "Integer", "Float", "Boolean"],
    answer: "Boolean",
  },
  {
    question: (
      <div>
        <p>Identify the data types:</p>
        <CodeBlock
          language="python"
          code={`a = "100"\nb = 100\nprint(type(a))\nprint(type(b))`}
        />
      </div>
    ),
    options: [
      "String and Integer",
      "Integer and String",
      "Integer and Integer",
      "String and String",
    ],
    answer: "String and Integer",
  },
  {
    question: (
      <div>
        <p>
          What are the types of <code>x</code> and <code>y</code>?
        </p>
        <CodeBlock
          language="python"
          code={`x = False\ny = 3.14\nprint(type(x))\nprint(type(y))`}
        />
      </div>
    ),
    options: [
      "Boolean and Float",
      "Float and Boolean",
      "Integer and Float",
      "Boolean and Integer",
    ],
    answer: "Boolean and Float",
  },
  {
    question: (
      <div>
        <p>Which variable holds a String value?</p>
        <CodeBlock
          language="python"
          code={`email = "abc@xyz.com"\ncount = 50\nactive = True`}
        />
      </div>
    ),
    options: ["email", "count", "active", "None"],
    answer: "email",
  },
  {
    question: "Which of these is a correct Boolean value in Python?",
    options: ["true", "FALSE", "True", "bool"],
    answer: "True",
  },
  {
    question: "How do you assign the string 'Hello' to a variable?",
    options: [
      "greeting = Hello",
      "greeting = 'Hello'",
      'greeting = "Hello',
      "greeting = (Hello)",
    ],
    answer: "greeting = 'Hello'",
  },
  {
    question: "What is the '=' symbol called in Python?",
    options: ["Equal to", "Assignment Operator", "Comparison", "Value Setter"],
    answer: "Assignment Operator",
  },
];

const Variables_DT_MCQ = () => {
  // Fixed: Use a different variable name to avoid ReferenceError
  const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic
      title="Variables and Data Types - MCQs"
      questions={shuffledQuestions}
    />
  );
};

export default Variables_DT_MCQ;
