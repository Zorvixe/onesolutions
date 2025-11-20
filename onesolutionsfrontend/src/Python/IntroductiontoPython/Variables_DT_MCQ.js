import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
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
    options: [
      "<class 'str'>",
      "<class 'int'>",
      "<class 'float'>",
      "<class 'bool'>",
    ],
    answer: "<class 'str'>",
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
    options: [
      "<class 'str'>",
      "<class 'int'>",
      "<class 'float'>",
      "<class 'bool'>",
    ],
    answer: "<class 'int'>",
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
    options: [
      "<class 'str'>",
      "<class 'int'>",
      "<class 'float'>",
      "<class 'bool'>",
    ],
    answer: "<class 'float'>",
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
    options: [
      "<class 'str'>",
      "<class 'int'>",
      "<class 'float'>",
      "<class 'bool'>",
    ],
    answer: "<class 'bool'>",
  },
  {
    question: (
      <div>
        <p>
          Identify the data types of <code>a</code> and <code>b</code>:
        </p>
        <CodeBlock
          language="python"
          code={`a = "100"\nb = 100\nprint(type(a))\nprint(type(b))`}
        />
      </div>
    ),
    options: [
      "<class 'str'> and <class 'int'>",
      "<class 'int'> and <class 'str'>",
      "<class 'int'> and <class 'int'>",
      "<class 'str'> and <class 'str'>",
    ],
    answer: "<class 'str'> and <class 'int'>",
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
      "<class 'bool'> and <class 'float'>",
      "<class 'float'> and <class 'bool'>",
      "<class 'int'> and <class 'float'>",
      "<class 'bool'> and <class 'int'>",
    ],
    answer: "<class 'bool'> and <class 'float'>",
  },
  {
    question: (
      <div>
        <p>Which line contains a Float value?</p>
        <CodeBlock
          language="python"
          code={`score = 95\nprice = 199.99\ntemperature = -5.5\nname = "Alex"`}
        />
      </div>
    ),
    options: [
      "score = 95",
      "price = 199.99",
      "temperature = -5.5",
      "Both 2 and 3",
    ],
    answer: "Both 2 and 3",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="python"
          code={`message = 'Welcome to Python!'\nprint(type(message))`}
        />
      </div>
    ),
    options: ["<class 'str'>", "<class 'int'>", "<class 'float'>", "String"],
    answer: "<class 'str'>",
  },
  {
    question: (
      <div>
        <p>Which of these creates a Boolean variable?</p>
        <CodeBlock
          language="python"
          code={`is_active = True\nstatus = "True"\nflag = False`}
        />
      </div>
    ),
    options: ["Only line 1", "Only line 2", "Lines 1 and 3", "All three lines"],
    answer: "Lines 1 and 3",
  },
  {
    question: (
      <div>
        <p>
          What is the data type of <code>quantity</code>?
        </p>
        <CodeBlock
          language="python"
          code={`quantity = "50"\nprint(type(quantity))`}
        />
      </div>
    ),
    options: ["Integer", "String", "Float", "Boolean"],
    answer: "String",
    // Because it's in quotes
  },

  {
    question: "Which of these is a correct Boolean value in Python?",
    options: ["true", "FALSE", "True", "Bool"],
    answer: "True",
  },
  {
    question:
      "How do you assign the string 'Hello' to a variable named greeting?",
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
    options: [
      "Equal to operator",
      "Assignment Operator",
      "Comparison operator",
      "Equality sign",
    ],
    answer: "Assignment Operator",
  },
  {
    question: "Which of the following is NOT a valid String in Python?",
    options: ['"Python123"', "'hello@123'", "no_quotes", '"True"'],
    answer: "no_quotes",
  },
  {
    question: "Which data type is used for decimal numbers like 3.14 or 99.99?",
    options: ["Integer", "String", "Float", "Boolean"],
    answer: "Float",
  },
];

const Variables_DT_MCQ = ({ subtopicId, goalName, courseName }) => {
  const { markSubtopicComplete, loadProgressSummary } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCompletion = async () => {
    try {
      await markSubtopicComplete(subtopicId, goalName, courseName);
      await loadProgressSummary();
      setIsCompleted(true);
    } catch (error) {
      console.error("❌ Failed to mark subtopic complete:", error);
    }
  };
  // Fixed: Use a different variable name to avoid ReferenceError
  const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic
      title="Variables and Data Types - MCQs"
      questions={shuffledQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default Variables_DT_MCQ;
