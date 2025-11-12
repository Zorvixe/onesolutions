import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print(10 > 5 and 20 == 20)`} />
      </div>
    ),
    options: ["True", "False", "Error", "20"],
    answer: "True",
  },
  {
    question: (
      <div>
        <p>What will this print?</p>
        <CodeBlock language="python" code={`print(15 < 10 and 30 > 25)`} />
      </div>
    ),
    options: ["True", "False", "15", "Error"],
    answer: "False",
  },
  {
    question: (
      <div>
        <p>What is the result?</p>
        <CodeBlock language="python" code={`print(7 == 7 or 8 != 8)`} />
      </div>
    ),
    options: ["True", "False", "7", "Error"],
    answer: "True",
  },
  {
    question: (
      <div>
        <p>What does this output?</p>
        <CodeBlock language="python" code={`print(40 < 30 or 50 > 60)`} />
      </div>
    ),
    options: ["True", "False", "Error", "50"],
    answer: "False",
  },
  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock language="python" code={`print(not (9 > 4))`} />
      </div>
    ),
    options: ["True", "False", "9", "Error"],
    answer: "False",
  },
  {
    question: (
      <div>
        <p>What is the output here?</p>
        <CodeBlock language="python" code={`print(not (2 == 3))`} />
      </div>
    ),
    options: ["True", "False", "2", "Error"],
    answer: "True",
  },
  {
    question: (
      <div>
        <p>What will be the result?</p>
        <CodeBlock
          language="python"
          code={`print(100 >= 100 and 200 <= 199)`}
        />
      </div>
    ),
    options: ["True", "False", "Error", "100"],
    answer: "False",
  },
  {
    question: "Which logical operator returns True if both operands are True?",
    options: ["or", "not", "and", "none"],
    answer: "and",
  },
  {
    question: "Which operator gives True if at least one operand is True?",
    options: ["and", "or", "not", "xor"],
    answer: "or",
  },
  {
    question: "What does the 'not' operator do?",
    options: [
      "Returns True if both are True",
      "Returns the opposite boolean value",
      "Returns True if any is True",
      "Combines two booleans",
    ],
    answer: "Returns the opposite boolean value",
  },
];

const LogicalOperators_MCQ = ({ subtopicId, goalName, courseName }) => {
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
      title="Logical Operators - MCQs"
      questions={shuffledQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default LogicalOperators_MCQ;
