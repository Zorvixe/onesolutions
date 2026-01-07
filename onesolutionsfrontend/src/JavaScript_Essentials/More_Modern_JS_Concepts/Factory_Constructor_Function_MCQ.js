import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ===================== CODE BLOCK QUESTIONS (10) =====================

  {
    question: (
      <div>
        <p>What type of function is this?</p>
        <CodeBlock
          language="javascript"
          code={`function createUser(name, age) {
    return {
      name,
      age,
    };
  }`}
        />
      </div>
    ),
    options: [
      "Constructor Function",
      "Factory Function",
      "Arrow Function",
      "Callback Function",
    ],
    answer: "Factory Function",
  },

  {
    question: (
      <div>
        <p>Why is this function called a factory function?</p>
        <CodeBlock
          language="javascript"
          code={`function createCar(color) {
    return { color };
  }
  
  const car1 = createCar("red");
  const car2 = createCar("blue");`}
        />
      </div>
    ),
    options: [
      "Uses new keyword",
      "Returns the same object",
      "Returns a new object for every call",
      "Uses prototype",
    ],
    answer: "Returns a new object for every call",
  },

  {
    question: (
      <div>
        <p>What type of function is this?</p>
        <CodeBlock
          language="javascript"
          code={`function Car(brand, color) {
    this.brand = brand;
    this.color = color;
  }
  
  const car1 = new Car("BMW", "Black");`}
        />
      </div>
    ),
    options: [
      "Factory Function",
      "Constructor Function",
      "Arrow Function",
      "Anonymous Function",
    ],
    answer: "Constructor Function",
  },

  {
    question: (
      <div>
        <p>
          What does the <b>new</b> operator do here?
        </p>
        <CodeBlock
          language="javascript"
          code={`function User(name) {
    this.name = name;
  }
  
  const user1 = new User("Alex");`}
        />
      </div>
    ),
    options: [
      "Creates an empty object and assigns it to this",
      "Returns undefined",
      "Calls function twice",
      "Stops execution",
    ],
    answer: "Creates an empty object and assigns it to this",
  },

  {
    question: (
      <div>
        <p>
          What is <b>car1</b> in this example?
        </p>
        <CodeBlock
          language="javascript"
          code={`function Car() {}
  const car1 = new Car();`}
        />
      </div>
    ),
    options: ["Constructor", "Prototype", "Instance", "Method"],
    answer: "Instance",
  },

  {
    question: (
      <div>
        <p>What will this output?</p>
        <CodeBlock
          language="javascript"
          code={`function greet(name, age) {}
  console.log(greet.length);`}
        />
      </div>
    ),
    options: ["0", "1", "2", "undefined"],
    answer: "2",
  },

  {
    question: (
      <div>
        <p>What does this log?</p>
        <CodeBlock
          language="javascript"
          code={`function testFunction() {}
  console.log(testFunction.name);`}
        />
      </div>
    ),
    options: ["undefined", "testFunction", "function", "null"],
    answer: "testFunction",
  },

  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="javascript"
          code={`const today = new Date();
  console.log(typeof today);`}
        />
      </div>
    ),
    options: ["string", "number", "object", "function"],
    answer: "object",
  },

  {
    question: (
      <div>
        <p>What does this code create?</p>
        <CodeBlock language="javascript" code={`const date = new Date(0);`} />
      </div>
    ),
    options: [
      "Current date",
      "Date after 1 second",
      "Date at Jan 1, 1970 UTC",
      "Invalid date",
    ],
    answer: "Date at Jan 1, 1970 UTC",
  },

  {
    question: (
      <div>
        <p>What happens due to Date auto-correction?</p>
        <CodeBlock
          language="javascript"
          code={`const date = new Date(2024, 0, 33);
  console.log(date.getDate());`}
        />
      </div>
    ),
    options: ["33", "31", "2", "Error"],
    answer: "2",
  },

  // ===================== NORMAL QUESTIONS (5) =====================

  {
    question: "Which naming convention is used for Factory Functions?",
    options: ["PascalCase", "camelCase", "snake_case", "UPPERCASE"],
    answer: "camelCase",
  },

  {
    question: "Which naming convention is used for Constructor Functions?",
    options: ["camelCase", "kebab-case", "PascalCase", "lowercase"],
    answer: "PascalCase",
  },

  {
    question:
      "Which function property returns the constructor that created an object?",
    options: ["prototype", "constructor", "name", "length"],
    answer: "constructor",
  },

  {
    question: "Which built-in constructor is used to work with date and time?",
    options: ["Time()", "Moment()", "Date()", "Clock()"],
    answer: "Date()",
  },

  {
    question: "Which Date method returns the month (0–11)?",
    options: ["getDate()", "getMonth()", "getDay()", "getFullYear()"],
    answer: "getMonth()",
  },
];

const Factory_Constructor_Function_MCQ = ({
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
      title="Factory Constructor Function - MCQs"
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
export default Factory_Constructor_Function_MCQ;
