import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ===================== CODE BLOCK QUESTIONS (10) =====================

  {
    question: (
      <div>
        <p>What does this factory function return?</p>
        <CodeBlock
          language="javascript"
          code={`function createUser(name, age) {
  return {
    name,
    age,
  };
}

const user1 = createUser("Alex", 25);
console.log(user1);`}
        />
      </div>
    ),
    options: ["A function", "A new object", "An array", "undefined"],
    answer: "A new object",
  },

  {
    question: (
      <div>
        <p>What is the naming convention used here?</p>
        <CodeBlock
          language="javascript"
          code={`function createCar() {
  return { brand: "BMW" };
}`}
        />
      </div>
    ),
    options: ["PascalCase", "camelCase", "snake_case", "kebab-case"],
    answer: "camelCase",
  },

  {
    question: (
      <div>
        <p>What happens when this constructor function is called?</p>
        <CodeBlock
          language="javascript"
          code={`function Person(name) {
  this.name = name;
}

const p1 = new Person("John");`}
        />
      </div>
    ),
    options: [
      "Returns undefined",
      "Creates an instance object",
      "Throws error",
      "Returns a function",
    ],
    answer: "Creates an instance object",
  },

  {
    question: (
      <div>
        <p>
          What does <b>this</b> refer to here?
        </p>
        <CodeBlock
          language="javascript"
          code={`function Book(title) {
  this.title = title;
}

const book1 = new Book("JS Guide");`}
        />
      </div>
    ),
    options: [
      "Window object",
      "Function itself",
      "Instance object",
      "Global scope",
    ],
    answer: "Instance object",
  },

  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="javascript"
          code={`function demo(a, b, c) {}
console.log(demo.length);`}
        />
      </div>
    ),
    options: ["0", "1", "2", "3"],
    answer: "3",
  },

  {
    question: (
      <div>
        <p>
          What does the <b>name</b> property return?
        </p>
        <CodeBlock
          language="javascript"
          code={`function sampleTest() {}
console.log(sampleTest.name);`}
        />
      </div>
    ),
    options: ["sampleTest", "undefined", "function", "Error"],
    answer: "sampleTest",
  },

  {
    question: (
      <div>
        <p>What type is a function in JavaScript?</p>
        <CodeBlock
          language="javascript"
          code={`function test() {}
console.log(typeof test);`}
        />
      </div>
    ),
    options: ["object", "function", "string", "undefined"],
    answer: "function",
  },

  {
    question: (
      <div>
        <p>What date does this represent?</p>
        <CodeBlock
          language="javascript"
          code={`const d = new Date(2024, 0, 1);
console.log(d.getMonth());`}
        />
      </div>
    ),
    options: ["0 (January)", "1 (February)", "12 (December)", "Error"],
    answer: "0 (January)",
  },

  {
    question: (
      <div>
        <p>What happens here due to auto-correction?</p>
        <CodeBlock
          language="javascript"
          code={`const d = new Date(2024, 0, 35);
console.log(d.getDate());`}
        />
      </div>
    ),
    options: ["35", "31", "4", "Error"],
    answer: "4",
  },

  {
    question: (
      <div>
        <p>What will this log?</p>
        <CodeBlock
          language="javascript"
          code={`const obj = {
  value: 10,
  show: function () {
    console.log(this.value);
  },
};

obj.show();`}
        />
      </div>
    ),
    options: ["undefined", "window", "10", "Error"],
    answer: "10",
  },

  // ===================== NORMAL QUESTIONS (5) =====================

  {
    question: "Which function explicitly returns an object?",
    options: [
      "Arrow Function",
      "Constructor Function",
      "Factory Function",
      "Callback Function",
    ],
    answer: "Factory Function",
  },

  {
    question: "Which operator is required to call a constructor function?",
    options: ["this", "new", "return", "instanceof"],
    answer: "new",
  },

  {
    question: "Which of the following values is immutable?",
    options: ["Object", "Array", "String", "Function"],
    answer: "String",
  },

  {
    question: "In arrow functions, what does <b>this</b> refer to?",
    options: [
      "Window object",
      "Calling object",
      "Instance object",
      "Lexical context",
    ],
    answer: "Lexical context",
  },

  {
    question:
      "Which variable declaration allows reassignment but not redeclaration in the same scope?",
    options: ["var", "let", "const", "function"],
    answer: "let",
  },
];

const JS_Essential_MCQ_Assignment_2 = ({
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
      title="JS Essential Assignment | Part 2 - MCQs"
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
export default JS_Essential_MCQ_Assignment_2;
