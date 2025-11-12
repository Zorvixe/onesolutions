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
          code={`city = "Tokyo"\nprint(city[2:5])`}
        />
      </div>
    ),
    options: ["Tok", "kyo", "oky", "yo"],
    answer: "kyo",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`fruit = "Banana"\nprint(fruit[1:])`}
        />
      </div>
    ),
    options: ["B", "anana", "Banana", "anan"],
    answer: "anana",
  },
  {
    question: (
      <div>
        <p>What is the result?</p>
        <CodeBlock
          language="python"
          code={`game = "Cricket"\nprint(game[:4])`}
        />
      </div>
    ),
    options: ["Cric", "rick", "Crick", "et"],
    answer: "Cric",
  },
  {
    question: (
      <div>
        <p>
          What is the data type of <code>score</code>?
        </p>
        <CodeBlock language="python" code={`score = 95\nprint(type(score))`} />
      </div>
    ),
    options: ["String", "Integer", "Float", "Boolean"],
    answer: "Integer",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`price = int("450")\nprint(price + 50)`}
        />
      </div>
    ),
    options: ["45050", "500", "450 + 50", "Error"],
    answer: "500",
  },
  {
    question: (
      <div>
        <p>
          User enters: <code>12</code> and <code>8</code>
          <br />
          What is output?
        </p>
        <CodeBlock
          language="python"
          code={`x = int(input())\ny = int(input())\nprint("Total:", x + y)`}
        />
      </div>
    ),
    options: ["Total: 128", "Total: 20", "Total: 12 8", "Error"],
    answer: "Total: 20",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`marks = 89\nresult = str(marks)\nprint("You scored " + result)`}
        />
      </div>
    ),
    options: ["You scored 89", "You scored marks", "89", "Error"],
    answer: "You scored 89",
  },
  {
    question: "Which function is used to convert a number to a string?",
    options: ["int()", "float()", "str()", "bool()"],
    answer: "str()",
  },
  {
    question: "What does int() function return if given a valid number string?",
    options: ["String", "Float", "Integer", "Error"],
    answer: "Integer",
  },
  {
    question: "Which of these is used to get a part of a string?",
    options: [
      "String cutting",
      "String slicing",
      "String splitting",
      "String trimming",
    ],
    answer: "String slicing",
  },
];

const Type_Con_MCQ = ({ subtopicId, goalName, courseName }) => {
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
  const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic
      title="Type Conversion & String Slicing - MCQs"
      questions={shuffledQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default Type_Con_MCQ;
