import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ===================== CODE BLOCK QUESTIONS (10) =====================

  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="javascript"
          code={`const age = 20;
  const result = age >= 18 ? "Adult" : "Minor";
  console.log(result);`}
        />
      </div>
    ),
    options: ["Adult", "Minor", "true", "false"],
    answer: "Adult",
  },

  {
    question: (
      <div>
        <p>Which operator is used here?</p>
        <CodeBlock
          language="javascript"
          code={`const result = isLoggedIn ? "Welcome" : "Login";`}
        />
      </div>
    ),
    options: [
      "Logical operator",
      "Comparison operator",
      "Ternary operator",
      "Assignment operator",
    ],
    answer: "Ternary operator",
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="javascript"
          code={`let day = 2;
  switch (day) {
    case 1:
      console.log("Monday");
      break;
    case 2:
      console.log("Tuesday");
      break;
    default:
      console.log("Invalid");
  }`}
        />
      </div>
    ),
    options: ["Monday", "Tuesday", "Invalid", "Nothing"],
    answer: "Tuesday",
  },

  {
    question: (
      <div>
        <p>
          What happens if <b>break</b> is missing?
        </p>
        <CodeBlock
          language="javascript"
          code={`let num = 1;
  switch (num) {
    case 1:
      console.log("One");
    case 2:
      console.log("Two");
  }`}
        />
      </div>
    ),
    options: [
      "Only One is printed",
      "Only Two is printed",
      "One and Two are printed",
      "Error",
    ],
    answer: "One and Two are printed",
  },

  {
    question: (
      <div>
        <p>Which type of function is this?</p>
        <CodeBlock
          language="javascript"
          code={`const add = (a, b) => a + b;`}
        />
      </div>
    ),
    options: [
      "Function declaration",
      "Function expression",
      "Arrow function",
      "Constructor function",
    ],
    answer: "Arrow function",
  },

  {
    question: (
      <div>
        <p>What is special about this arrow function?</p>
        <CodeBlock language="javascript" code={`const square = x => x * x;`} />
      </div>
    ),
    options: [
      "Uses default parameter",
      "No return statement needed",
      "Uses switch statement",
      "Invalid syntax",
    ],
    answer: "No return statement needed",
  },

  {
    question: (
      <div>
        <p>Why are parentheses not required here?</p>
        <CodeBlock
          language="javascript"
          code={`const greet = name => "Hello " + name;`}
        />
      </div>
    ),
    options: [
      "Because it is a ternary operator",
      "Because there is only one parameter",
      "Because it is invalid",
      "Because return is missing",
    ],
    answer: "Because there is only one parameter",
  },

  {
    question: (
      <div>
        <p>Which arrow function syntax is correct for no parameters?</p>
        <CodeBlock language="javascript" code={`const sayHi = () => "Hi";`} />
      </div>
    ),
    options: [
      "const sayHi = => 'Hi';",
      "const sayHi = () => 'Hi';",
      "const sayHi = ( ) => ;",
      "const sayHi => 'Hi';",
    ],
    answer: "const sayHi = () => 'Hi';",
  },

  {
    question: (
      <div>
        <p>What will this function return?</p>
        <CodeBlock
          language="javascript"
          code={`const getUser = () => ({ name: "Alex", age: 25 });`}
        />
      </div>
    ),
    options: ["undefined", "Error", "{ name: 'Alex', age: 25 }", "Alex"],
    answer: "{ name: 'Alex', age: 25 }",
  },

  {
    question: (
      <div>
        <p>Why are parentheses used here?</p>
        <CodeBlock
          language="javascript"
          code={`const getData = () => ({ value: 10 });`}
        />
      </div>
    ),
    options: [
      "To return multiple values",
      "To distinguish object from code block",
      "To avoid syntax error in switch",
      "To use ternary operator",
    ],
    answer: "To distinguish object from code block",
  },

  // ===================== NORMAL QUESTIONS (5) =====================

  {
    question: "What does a ternary operator replace in many cases?",
    options: [
      "for loop",
      "switch statement",
      "if...else statement",
      "function declaration",
    ],
    answer: "if...else statement",
  },

  {
    question: "Which keyword stops execution inside a switch case?",
    options: ["stop", "exit", "break", "return"],
    answer: "break",
  },

  {
    question: "Arrow functions are an alternative to which type of function?",
    options: [
      "Function declaration",
      "Function expression",
      "Constructor function",
      "Switch function",
    ],
    answer: "Function expression",
  },

  {
    question: "In arrow functions, when can curly braces be omitted?",
    options: [
      "When returning objects",
      "When there are multiple statements",
      "For simple expressions",
      "Never",
    ],
    answer: "For simple expressions",
  },

  {
    question:
      "What happens if parentheses are not used while returning an object in an arrow function?",
    options: [
      "Object is returned",
      "Syntax error",
      "JavaScript treats it as a code block",
      "Nothing happens",
    ],
    answer: "JavaScript treats it as a code block",
  },
];
const More_Modern_JS_Concepts_MCQ_2 = ({
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
      title="More Modern JS Concepts | Part 2 - MCQs"
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
export default More_Modern_JS_Concepts_MCQ_2;
