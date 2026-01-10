import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print(ord('Z'))`} />
      </div>
    ),
    options: ["90", "122", "65", "97"],
    answer: "90",
  },

  {
    question: (
      <div>
        <p>What character is printed?</p>
        <CodeBlock language="python" code={`print(chr(48))`} />
      </div>
    ),
    options: ["A", "0", "a", "Error"],
    answer: "0",
  },

  {
    question: (
      <div>
        <p>What does this comparison return?</p>
        <CodeBlock language="python" code={`print("cat" < "dog")`} />
      </div>
    ),
    options: ["True", "False", "Error", "None"],
    answer: "True",
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print("ABC" < "ABD")`} />
      </div>
    ),
    options: ["True", "False", "Error", "Same"],
    answer: "True",
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock language="python" code={`print(ord('m'))`} />
      </div>
    ),
    options: ["77", "109", "97", "122"],
    answer: "109",
  },

  {
    question: (
      <div>
        <p>What character corresponds to Unicode 122?</p>
        <CodeBlock language="python" code={`print(chr(122))`} />
      </div>
    ),
    options: ["Z", "z", "9", "a"],
    answer: "z",
  },

  {
    question: (
      <div>
        <p>What is the result?</p>
        <CodeBlock language="python" code={`print("hello" < "Hello")`} />
      </div>
    ),
    options: ["True", "False", "Error", "Same"],
    answer: "False",
  },

  {
    question: (
      <div>
        <p>What gets printed?</p>
        <CodeBlock
          language="python"
          code={`for i in range(65, 71):\n    print(chr(i), end=" ")`}
        />
      </div>
    ),
    options: [
      "65 66 67 68 69 70",
      "A B C D E F ",
      "a b c d e f",
      "Error",
    ],
    answer: "A B C D E F ",
  },

  {
    question: (
      <div>
        <p>Which comparison is correct according to Unicode?</p>
        <CodeBlock language="python" code={`print("ant" < "antelope")`} />
      </div>
    ),
    options: ["True", "False", "Error", "Equal"],
    answer: "True",
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print("zoo" > "apple")`} />
      </div>
    ),
    options: ["True", "False", "Error", "None"],
    answer: "True",
  },

  // ---------- NORMAL QUESTIONS ----------

  {
    question: "Which is a valid variable name in Python?",
    options: ["2name", "my_name", "my-name", "my name"],
    answer: "my_name",
  },

  {
    question: "Which of these CANNOT be used as a variable name?",
    options: ["totalMarks", "break", "_score", "player2"],
    answer: "break",
  },

  {
    question: "What is the preferred naming style for variables in Python?",
    options: ["camelCase", "PascalCase", "snake_case", "ALLCAPS"],
    answer: "snake_case",
  },

  {
    question: "Which character is allowed at the beginning of a variable name?",
    options: ["digit (like 9)", "underscore (_)", "hyphen (-)", "space"],
    answer: "underscore (_)",
  },

  {
    question: "Why can't we use 'for' as a variable name?",
    options: [
      "It is too short",
      "It is a Python keyword",
      "It contains special character",
      "It starts with lowercase",
    ],
    answer: "It is a Python keyword",
  },
];


const ComparingStrAndNamingVar_MCQ = ({
  subtopicId,
  goalName,
  courseName,
  onComplete,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (subtopicId && completedContent.includes(subtopicId)) {
      setIsCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleCompletion = async () => {
    if (isLoading || isCompleted) return;

    try {
      setIsLoading(true);
      const result = await markSubtopicComplete(
        subtopicId,
        goalName || "Goal 1",
        courseName || "Static Website: HTML CSS & Bootstrap"
      );

      if (result.success) {
        await loadProgressSummary();
        setIsCompleted(true);
        if (onComplete) onComplete();
      } else {
        alert(result.message);
      }
    } catch {
      alert("Failed to mark as complete");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MCQLogic
      title="Comparing Strings & Naming Variables | MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      isLoading={isLoading}
      onComplete={handleCompletion}
      subtopicId={subtopicId}
      goalName={goalName}
      courseName={courseName}
    />
  );
};

export default ComparingStrAndNamingVar_MCQ;
