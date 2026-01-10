import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`age = 10\nprint(age)`} />
      </div>
    ),
    options: ["age", "10", "Error", "None"],
    answer: "10",
  },
  {
    question: (
      <div>
        <p>What is the result?</p>
        <CodeBlock language="python" code={`print("age")`} />
      </div>
    ),
    options: ["age", "10", "Error", "None"],
    answer: "age",
  },
  {
    question: (
      <div>
        <p>What happens when this code runs?</p>
        <CodeBlock language="python" code={`print(age)\nage = 10`} />
      </div>
    ),
    options: ["10", "age", "NameError", "IndentationError"],
    answer: "NameError",
  },
  {
    question: (
      <div>
        <p>What error does this produce?</p>
        <CodeBlock language="python" code={` age = 10\nprint(age)`} />
      </div>
    ),
    options: ["NameError", "IndentationError", "No Error", "SyntaxError"],
    answer: "IndentationError",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock language="python" code={`age = 10\nage = 20\nprint(age)`} />
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
        <CodeBlock language="python" code={`a = 5\nb = 2\nprint(a + b * 3)`} />
      </div>
    ),
    options: ["11", "21", "9", "Error"],
    answer: "11",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print(4 * (5 + 3))`} />
      </div>
    ),
    options: ["24", "32", "20", "Error"],
    answer: "32",
  },
  {
    question: (
      <div>
        <p>What will this print?</p>
        <CodeBlock language="python" code={`print(10 - 2 / 2)`} />
      </div>
    ),
    options: ["9.0", "4.0", "5.0", "Error"],
    answer: "9.0",
  },
  {
    question: (
      <div>
        <p>What error occurs here?</p>
        <CodeBlock language="python" code={`print("Hello")\n print("World")`} />
      </div>
    ),
    options: ["NameError", "IndentationError", "No Error", "SyntaxError"],
    answer: "IndentationError",
  },

  {
    question: "What is a program in Python?",
    options: [
      "A single instruction",
      "Sequence of instructions",
      "A variable",
      "An expression",
    ],
    answer: "Sequence of instructions",
  },
  {
    question: "How is a variable defined in Python?",
    options: [
      "Using def keyword",
      "By assigning a value",
      "With var keyword",
      "Automatically",
    ],
    answer: "By assigning a value",
  },
  {
    question: "What does BODMAS stand for in expression evaluation?",
    options: [
      "Brackets Orders Division Multiplication Addition Subtraction",
      "Basic Operations Division Multiplication Addition Subtraction",
      "Brackets Operations Division Math Addition Subtraction",
      "None of the above",
    ],
    answer: "Brackets Orders Division Multiplication Addition Subtraction",
  },
  {
    question: "What symbol is used for assignment in Python?",
    options: ["==", "=", "->", ":="],
    answer: "=",
  },
  {
    question: "Can variables hold different values over time?",
    options: ["No", "Yes", "Only once", "Only strings"],
    answer: "Yes",
  },
];

const Seq_OF_Instruction_MCQ = ({
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

  // Check if subtopic is already completed
  useEffect(() => {
    if (subtopicId && completedContent.includes(subtopicId)) {
      setIsCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleCompletion = async () => {
    if (isLoading || isCompleted) return;

    try {
      setIsLoading(true);

      // Validate that we have the required parameters
      if (!subtopicId) {
        console.error("❌ Subtopic ID is required");
        alert("Error: Subtopic ID is missing");
        return;
      }

      console.log("🎯 Marking subtopic complete:", {
        subtopicId,
        goalName,
        courseName,
      });

      const result = await markSubtopicComplete(
        subtopicId,
        goalName || "Goal 1",
        courseName || "Static Website: HTML CSS & Bootstrap"
      );

      if (result.success) {
        await loadProgressSummary();
        setIsCompleted(true);
        console.log("✅ MCQ successfully marked as completed");

        // Call the parent completion handler if provided
        if (onComplete) {
          onComplete();
        }
      } else {
        console.error("❌ Failed to mark MCQ complete:", result.message);
        alert(`Failed to mark as complete: ${result.message}`);
      }
    } catch (error) {
      console.error("❌ Failed to mark MCQ complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MCQLogic
      title="Sequence of Instructions - MCQs"
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

export default Seq_OF_Instruction_MCQ;
