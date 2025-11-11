import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is a nested conditional statement?</p>
      </div>
    ),
    options: [
      "An if inside another if or else block",
      "Multiple if statements in a row",
      "Using and/or operators",
      "A loop inside an if",
    ],
    answer: "An if inside another if or else block",
  },
  {
    question: (
      <div>
        <p>
          Which block executes first when multiple <code>elif</code> conditions
          are True?
        </p>
      </div>
    ),
    options: [
      "The last one",
      "All of them",
      "Only the first matching one",
      "Random one",
    ],
    answer: "Only the first matching one",
  },
  {
    question: (
      <div>
        <p>
          Is the <code>else</code> statement compulsory after <code>elif</code>?
        </p>
      </div>
    ),
    options: [
      "Yes, always required",
      "No, it's optional",
      "Only in nested blocks",
      "Only in functions",
    ],
    answer: "No, it's optional",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="python"
          code={`age = 10
score = 22

if age >= 10:
    print("Hurray")
    if score > 20:
        print("Winner")`}
        />
      </div>
    ),
    options: ["Hurray", "Hurray\nWinner", "Winner", "No output"],
    answer: "Hurray\nWinner",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="python"
          code={`age = 10
score = 18

if age >= 10:
    print("Hurray")
    if score > 20:
        print("Winner")
else:
    print("Try again")`}
        />
      </div>
    ),
    options: ["Hurray", "Hurray\nWinner", "Try again", "No output"],
    answer: "Hurray",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="python"
          code={`x = 15
if x > 10:
    if x < 20:
        print("x is between 10 and 20")
    else:
        print("x is 20 or more")
elif x == 10:
    print("x is 10")`}
        />
      </div>
    ),
    options: [
      "x is 10",
      "x is between 10 and 20",
      "x is 20 or more",
      "Nothing",
    ],
    answer: "x is between 10 and 20",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="python"
          code={`marks = 85
if marks >= 90:
    print("Excellent")
elif marks >= 80:
    print("Very Good")
elif marks >= 70:
    print("Good")
else:
    print("Average")`}
        />
      </div>
    ),
    options: ["Excellent", "Very Good", "Good", "Average"],
    answer: "Very Good",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="python"
          code={`num = 15
if num % 3 == 0:
    print("Divisible by 3")
elif num % 5 == 0:
    print("Divisible by 5")`}
        />
      </div>
    ),
    options: ["Divisible by 3", "Divisible by 5", "Both messages", "No output"],
    answer: "Divisible by 3",
  },
  {
    question: (
      <div>
        <p>Why does this code give a SyntaxError?</p>
        <CodeBlock
          language="python"
          code={`x = 5
if x > 10:
    print("Big")
else:
    print("Small")
elif x == 5:
    print("Five")`}
        />
      </div>
    ),
    options: [
      "elif after else is not allowed",
      "Missing colon",
      "Wrong indentation",
      "x not defined",
    ],
    answer: "elif after else is not allowed",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="python"
          code={`a = 3
if a < 5:
    print(a)
else:
    if a > 10:
        print("Large")
    else:
        print("Medium")`}
        />
      </div>
    ),
    options: ["3", "Medium", "Large", "Nothing"],
    answer: "3",
  },
];

const Nested_con_MCQ = () => {
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic
      title="Nested Conditional Statements in Python - MCQs"
      questions={randomQuestions}
    />
  );
};

export default Nested_con_MCQ;
