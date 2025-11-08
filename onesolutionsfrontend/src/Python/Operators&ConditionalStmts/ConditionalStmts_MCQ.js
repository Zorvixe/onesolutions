import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>User enters: <code>18</code><br />What is printed?</p>
        <CodeBlock
          language="python"
          code={`age = int(input())\nif age >= 18:\n    print("Welcome! You can vote.")\nelse:\n    print("Sorry, too young.")`}
        />
      </div>
    ),
    options: [
      "Welcome! You can vote.",
      "Sorry, too young.",
      "Error",
      "Nothing",
    ],
    answer: "Welcome! You can vote.",
  },
  {
    question: (
      <div>
        <p>User enters: <code>15</code><br />What is output?</p>
        <CodeBlock
          language="python"
          code={`score = int(input())\nif score >= 60:\n    print("You passed!")\nelse:\n    print("Try again next time.")`}
        />
      </div>
    ),
    options: [
      "You passed!",
      "Try again next time.",
      "Error",
      "60",
    ],
    answer: "Try again next time.",
  },
  {
    question: (
      <div>
        <p>What error does this code cause?</p>
        <CodeBlock
          language="python"
          code={`if 10 > 5:\nprint("Hello")\n    print("World")`}
        />
      </div>
    ),
    options: [
      "No error",
      "IndentationError: unexpected indent",
      "SyntaxError",
      "NameError",
    ],
    answer: "IndentationError: unexpected indent",
  },
  {
    question: (
      <div>
        <p>What happens when this runs?</p>
        <CodeBlock
          language="python"
          code={`else:\n    print("This is wrong")`}
        />
      </div>
    ),
    options: [
      "Prints the message",
      "SyntaxError: invalid syntax",
      "No output",
      "NameError",
    ],
    answer: "SyntaxError: invalid syntax",
  },
  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock
          language="python"
          code={`temperature = 35\nif temperature > 30:\n    print("It's a hot day!")\n    print("Stay hydrated.")`}
        />
      </div>
    ),
    options: [
      "It's a hot day!\nStay hydrated.",
      "Nothing",
      "Error",
      "35",
    ],
    answer: "It's a hot day!\nStay hydrated.",
  },
  {
    question: (
      <div>
        <p>User enters: <code>25</code><br />What is output?</p>
        <CodeBlock
          language="python"
          code={`num = int(input())\nif num % 2 == 0:\n    print("Even number")\nelse:\n    print("Odd number")`}
        />
      </div>
    ),
    options: ["Even number", "Odd number", "Error", "25"],
    answer: "Odd number",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`marks = 92\nif marks >= 90:\n    print("Grade A")\n    print("Excellent!")`}
        />
      </div>
    ),
    options: [
      "Grade A\nExcellent!",
      "Grade A",
      "Excellent!",
      "Nothing",
    ],
    answer: "Grade A\nExcellent!",
  },
  {
    question: "What is a conditional block in Python?",
    options: [
      "Code that always runs",
      "Code that runs only if condition is True",
      "Code inside a loop",
      "Code with comments",
    ],
    answer: "Code that runs only if condition is True",
  },
  {
    question: "How many spaces are recommended for indentation in Python?",
    options: ["2", "4", "6", "8"],
    answer: "4",
  },
  {
    question: "Can 'else' be used without 'if' in Python?",
    options: ["Yes", "No", "Only in loops", "Only in functions"],
    answer: "No",
  },
];

const ConditionalStmts_MCQ = () => {
  const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic
      title="Conditional Statements - MCQs"
      questions={shuffledQuestions}
    />
  );
};

export default ConditionalStmts_MCQ;