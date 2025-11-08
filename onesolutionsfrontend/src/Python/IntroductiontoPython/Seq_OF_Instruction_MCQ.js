import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What will be the output of this code?</p>
        <CodeBlock
          language="python"
          code={`age = 10\nprint(age)`}
        />
      </div>
    ),
    options: ["age", "10", "Error", "None"],
    answer: "10",
  },
  {
    question: (
      <div>
        <p>What is the result?</p>
        <CodeBlock
          language="python"
          code={`print("age")`}
        />
      </div>
    ),
    options: ["age", "10", "Error", "None"],
    answer: "age",
  },
  {
    question: (
      <div>
        <p>What happens when this code runs?</p>
        <CodeBlock
          language="python"
          code={`print(age)\nage = 10`}
        />
      </div>
    ),
    options: ["10", "age", "NameError", "IndentationError"],
    answer: "NameError",
  },
  {
    question: (
      <div>
        <p>What error does this produce?</p>
        <CodeBlock
          language="python"
          code={` age = 10\nprint(age)`}
        />
      </div>
    ),
    options: ["NameError", "IndentationError", "No Error", "SyntaxError"],
    answer: "IndentationError",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`age = 10\nage = 20\nprint(age)`}
        />
      </div>
    ),
    options: ["10", "20", "Error", "30"],
    answer: "20",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`name = "John"\nprint(name)\nname = "Jane"\nprint(name)`}
        />
      </div>
    ),
    options: ["John Jane", "Jane John", "John\nJane", "Error"],
    answer: "John\nJane",
  },
  {
    question: (
      <div>
        <p>What is the result of this expression?</p>
        <CodeBlock
          language="python"
          code={`a = 5\nb = 2\nprint(a + b * 3)`}
        />
      </div>
    ),
    options: ["11", "21", "9", "Error"],
    answer: "11",
  },
  {
    question: "What is a program in Python?",
    options: ["A single instruction", "Sequence of instructions", "A variable", "An expression"],
    answer: "Sequence of instructions",
  },
  {
    question: "How is a variable defined in Python?",
    options: ["Using def keyword", "By assigning a value", "With var keyword", "Automatically"],
    answer: "By assigning a value",
  },
  {
    question: "What does BODMAS stand for in expression evaluation?",
    options: ["Brackets Orders Division Multiplication Addition Subtraction", "Basic Operations Division Multiplication Addition Subtraction", "Brackets Operations Division Math Addition Subtraction", "None of the above"],
    answer: "Brackets Orders Division Multiplication Addition Subtraction",
  },
];

const Seq_OF_Instruction_MCQ = () => {
  const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic
      title="Sequence of Instructions - MCQs"
      questions={shuffledQuestions}
    />
  );
};

export default Seq_OF_Instruction_MCQ;