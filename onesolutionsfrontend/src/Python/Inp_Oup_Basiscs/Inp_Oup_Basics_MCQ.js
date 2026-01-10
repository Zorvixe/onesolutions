import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print("Hello " + "Alice")`} />
      </div>
    ),
    options: ["Hello Alice", "Hello + Alice", "HelloAlice", "Error"],
    answer: "Hello Alice",
  },
  {
    question: (
      <div>
        <p>What error will this produce?</p>
        <CodeBlock language="python" code={`print("Age: " + 25)`} />
      </div>
    ),
    options: [
      "TypeError: can only concatenate str (not 'int') to str",
      "NameError",
      "SyntaxError",
      "No error",
    ],
    answer: "TypeError: can only concatenate str (not 'int') to str",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock language="python" code={`print("Hi " * 3)`} />
      </div>
    ),
    options: ["Hi Hi Hi ", "HiHiHi", "Hi Hi Hi", "Error"],
    answer: "Hi Hi Hi ",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print("Python" * 2)`} />
      </div>
    ),
    options: ["Python Python", "PythonPython", "Python2", "Error"],
    answer: "PythonPython",
  },
  {
    question: (
      <div>
        <p>How many characters are in "Hello"?</p>
        <CodeBlock language="python" code={`print(len("Hello"))`} />
      </div>
    ),
    options: ["4", "5", "6", "7"],
    answer: "5",
  },
  {
    question: (
      <div>
        <p>
          User types: <b>Alice</b> What is printed?
        </p>
        <CodeBlock
          language="python"
          code={`name = input()\nprint("Hello " + name)`}
        />
      </div>
    ),
    options: ["Hello Alice", "Alice", "Hello", "Error"],
    answer: "Hello Alice",
  },
  {
    question: (
      <div>
        <p>
          User enters: <b>10</b> What is the output?
        </p>
        <CodeBlock
          language="python"
          code={`age = input()\nprint("You are " + age)`}
        />
      </div>
    ),
    options: ["You are 10", "You are10", "Error", "10"],
    answer: "You are 10",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock language="python" code={`print("***" * 5)`} />
      </div>
    ),
    options: ["***************", "***5", "15", "Error"],
    answer: "***************",
  },
  {
    question: (
      <div>
        <p>
          User types: <b>Bob</b> What is printed?
        </p>
        <CodeBlock
          language="python"
          code={`name = input()\nprint("Welcome, " + name + "!")`}
        />
      </div>
    ),
    options: ["Welcome, Bob!", "Welcome, Bob", "Bob!", "Error"],
    answer: "Welcome, Bob!",
  },
  {
    question: (
      <div>
        <p>What character is at index 0?</p>
        <CodeBlock language="python" code={`text = "Python"\nprint(text[0])`} />
      </div>
    ),
    options: ["P", "y", "n", "o"],
    answer: "P",
  },

  {
    question: "What is joining two strings called?",
    options: [
      "String addition",
      "String concatenation",
      "String merging",
      "String repeat",
    ],
    answer: "String concatenation",
  },
  {
    question: "Which function is used to take input from the user?",
    options: ["print()", "input()", "len()", "str()"],
    answer: "input()",
  },
  {
    question: "What does input() always return?",
    options: ["Integer", "Float", "String", "Boolean"],
    answer: "String",
  },
  {
    question: "Which operator is used to repeat a string multiple times?",
    options: ["+", "*", "/", "-"],
    answer: "*",
  },
  {
    question: "What function returns the number of characters in a string?",
    options: ["length()", "size()", "len()", "count()"],
    answer: "len()",
  },
];
const Inp_Oup_Basics_MCQ = ({
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
      title="Inputs and Outputs Basics - MCQs"
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

export default Inp_Oup_Basics_MCQ;
