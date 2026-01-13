import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What kind of error is this?</p>
        <CodeBlock
          language="python"
          code={`print("Hello"\n# Missing closing parenthesis`}
        />
      </div>
    ),
    options: ["Runtime Exception", "Syntax Error", "Logic Error", "NameError"],
    answer: "Syntax Error",
  },

  {
    question: (
      <div>
        <p>What exception will this raise?</p>
        <CodeBlock language="python" code={`x = 10 / 0`} />
      </div>
    ),
    options: ["ValueError", "ZeroDivisionError", "TypeError", "SyntaxError"],
    answer: "ZeroDivisionError",
  },

  {
    question: (
      <div>
        <p>How do you manually raise an exception?</p>
        <CodeBlock
          language="python"
          code={`age = -5\nif age < 0:\n    raise ValueError("Age cannot be negative")`}
        />
      </div>
    ),
    options: [
      "throw ValueError(...)",
      "raise ValueError(...)",
      "error ValueError(...)",
      "ValueError(...) alone",
    ],
    answer: "raise ValueError(...)",
  },

  {
    question: (
      <div>
        <p>What will be printed if user enters "abc"?</p>
        <CodeBlock
          language="python"
          code={`try:\n    num = int(input("Enter number: "))\n    print("You entered:", num)\nexcept ValueError:\n    print("That's not a valid number!")`}
        />
      </div>
    ),
    options: [
      "You entered: abc",
      "That's not a valid number!",
      "Error in except block",
      "Program crashes",
    ],
    answer: "That's not a valid number!",
  },

  {
    question: (
      <div>
        <p>Which block catches the error here?</p>
        <CodeBlock
          language="python"
          code={`try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")\nexcept ValueError:\n    print("Invalid value")`}
        />
      </div>
    ),
    options: [
      "except ValueError:",
      "except ZeroDivisionError:",
      "Both",
      "None",
    ],
    answer: "except ZeroDivisionError:",
  },

  {
    question: (
      <div>
        <p>Can you have multiple except blocks?</p>
        <CodeBlock
          language="python"
          code={`try:\n    x = int(input())\n    y = 10 / x\nexcept ValueError:\n    print("Not a number")\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")`}
        />
      </div>
    ),
    options: ["No", "Yes", "Only one allowed", "Only with else"],
    answer: "Yes",
  },

  {
    question: (
      <div>
        <p>What happens without any try-except?</p>
        <CodeBlock
          language="python"
          code={`numbers = [1, 2, 3]\nprint(numbers[10])`}
        />
      </div>
    ),
    options: [
      "Prints nothing",
      "Program continues",
      "Program crashes with IndexError",
      "Python fixes it automatically",
    ],
    answer: "Program crashes with IndexError",
  },

  {
    question: (
      <div>
        <p>How to catch only file-related errors?</p>
        <CodeBlock
          language="python"
          code={`try:\n    f = open("missing.txt")\nexcept FileNotFoundError:\n    print("File not found")`}
        />
      </div>
    ),
    options: [
      "except Error:",
      "except FileNotFoundError:",
      "except:",
      "catch FileError:",
    ],
    answer: "except FileNotFoundError:",
  },

  {
    question: (
      <div>
        <p>Where should you raise exceptions?</p>
        <CodeBlock
          language="python"
          code={`def withdraw(amount):\n    if amount > balance:\n        raise ValueError("Insufficient funds")`}
        />
      </div>
    ),
    options: [
      "In end-user apps",
      "In reusable library or module code",
      "Never raise",
      "Only in main()",
    ],
    answer: "In reusable library or module code",
  },

  {
    question: (
      <div>
        <p>Where should you handle exceptions?</p>
        <CodeBlock
          language="python"
          code={`try:\n    age = int(input("Age: "))\nexcept ValueError:\n    print("Please enter a number")`}
        />
      </div>
    ),
    options: [
      "In library functions",
      "In end-user applications",
      "Never handle",
      "Only in classes",
    ],
    answer: "In end-user applications",
  },

  {
    question: "What is the difference between Syntax Error and Exception?",
    options: [
      "Both happen at runtime",
      "Syntax Error happens before execution, Exception during execution",
      "No difference",
      "Exceptions are warnings",
    ],
    answer: "Syntax Error happens before execution, Exception during execution",
  },

  {
    question: "What keyword is used to raise an exception manually?",
    options: ["throw", "error", "raise", "exception"],
    answer: "raise",
  },

  {
    question: "Why do we handle exceptions in applications?",
    options: [
      "To make code faster",
      "To prevent program from crashing",
      "To hide all errors",
      "Exceptions cannot be handled",
    ],
    answer: "To prevent program from crashing",
  },

  {
    question: "Which of these is a built-in exception?",
    options: [
      "MathError",
      "ConnectionError",
      "CustomError",
      "All are built-in",
    ],
    answer: "ConnectionError",
  },

  {
    question: "Best practice: When writing a reusable function, you should:",
    options: [
      "Handle all exceptions inside",
      "Raise exceptions for invalid input",
      "Use print() for errors",
      "Return None on error",
    ],
    answer: "Raise exceptions for invalid input",
  },
];

const Errors_Exceptions_MCQ = ({
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
      title="Errors Exceptions | MCQs"
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

export default Errors_Exceptions_MCQ;
