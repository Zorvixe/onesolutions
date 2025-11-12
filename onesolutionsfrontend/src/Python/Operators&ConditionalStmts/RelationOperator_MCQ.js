import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print(25 > 20)`} />
      </div>
    ),
    options: ["True", "False", "Error", "25"],
    answer: "True",
  },
  {
    question: (
      <div>
        <p>What will this print?</p>
        <CodeBlock language="python" code={`print(15 < 10)`} />
      </div>
    ),
    options: ["True", "False", "15", "Error"],
    answer: "False",
  },
  {
    question: (
      <div>
        <p>Is this comparison correct?</p>
        <CodeBlock language="python" code={`print(8.5 >= 8.5)`} />
      </div>
    ),
    options: ["True", "False", "8.5", "Error"],
    answer: "True",
  },
  {
    question: (
      <div>
        <p>What is the result?</p>
        <CodeBlock language="python" code={`print(100 != 99)`} />
      </div>
    ),
    options: ["True", "False", "1", "Error"],
    answer: "True",
  },
  {
    question: (
      <div>
        <p>What does this code output?</p>
        <CodeBlock language="python" code={`print("apple" == "Apple")`} />
      </div>
    ),
    options: ["True", "False", "apple", "Error"],
    answer: "False",
  },
  {
    question: (
      <div>
        <p>What error occurs here?</p>
        <CodeBlock language="python" code={`print(10 = = 10)`} />
      </div>
    ),
    options: [
      "No error",
      "SyntaxError: invalid syntax",
      "TypeError",
      "NameError",
    ],
    answer: "SyntaxError: invalid syntax",
  },
  {
    question: (
      <div>
        <p>Compare integer and float — what is output?</p>
        <CodeBlock language="python" code={`print(50 == 50.0)`} />
      </div>
    ),
    options: ["True", "False", "50.0", "Error"],
    answer: "True",
  },
  {
    question: "Which operator checks if two values are NOT equal?",
    options: ["==", "!=", "<>", "!=="],
    answer: "!=",
  },
  {
    question: "What does >= mean in Python?",
    options: [
      "Greater than",
      "Less than or equal to",
      "Greater than or equal to",
      "Not equal to",
    ],
    answer: "Greater than or equal to",
  },
  {
    question: "Are string comparisons in Python case sensitive?",
    options: ["Yes", "No", "Only in functions", "Only with numbers"],
    answer: "Yes",
  },
];

const RelationOperator_MCQ = ({ subtopicId, goalName, courseName }) => {
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
      title="Relational Operators - MCQs"
      questions={shuffledQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default RelationOperator_MCQ;
