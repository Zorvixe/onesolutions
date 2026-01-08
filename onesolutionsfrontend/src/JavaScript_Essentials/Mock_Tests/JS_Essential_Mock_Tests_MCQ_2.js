import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ===================== CODE BLOCK QUESTIONS (10) =====================

  {
    question: (
      <div>
        <p>Which built-in constructor is used to create this array?</p>
        <CodeBlock
          language="javascript"
          code={`const values = new Array(5, 10, 15);`}
        />
      </div>
    ),
    options: ["Object", "Function", "Array", "Number"],
    answer: "Array",
  },

  {
    question: (
      <div>
        <p>Which property gives access to the prototype of this constructor?</p>
        <CodeBlock
          language="javascript"
          code={`function Person() {}
console.log(Person.prototype);`}
        />
      </div>
    ),
    options: ["length", "constructor", "prototype", "__proto__"],
    answer: "prototype",
  },

  {
    question: (
      <div>
        <p>Which property connects an instance to its constructor prototype?</p>
        <CodeBlock
          language="javascript"
          code={`function Employee() {}
const emp = new Employee();
console.log(emp.__proto__);`}
        />
      </div>
    ),
    options: ["prototype", "__proto__", "constructor", "length"],
    answer: "__proto__",
  },

  {
    question: (
      <div>
        <p>What concept allows access to prototype methods?</p>
        <CodeBlock
          language="javascript"
          code={`function User() {}
User.prototype.login = function () {
  return "Logged In";
};

const u1 = new User();
u1.login();`}
        />
      </div>
    ),
    options: [
      "Encapsulation",
      "Abstraction",
      "Prototypal Inheritance",
      "Polymorphism",
    ],
    answer: "Prototypal Inheritance",
  },

  {
    question: (
      <div>
        <p>Which property is shared across all instances?</p>
        <CodeBlock
          language="javascript"
          code={`function Person() {}
Person.prototype.city = "Hyderabad";

const p1 = new Person();
const p2 = new Person();`}
        />
      </div>
    ),
    options: ["city", "p1", "p2", "name"],
    answer: "city",
  },

  {
    question: (
      <div>
        <p>What does this class constructor do?</p>
        <CodeBlock
          language="javascript"
          code={`class Student {
  constructor(name) {
    this.name = name;
  }
}

const s1 = new Student("Anil");`}
        />
      </div>
    ),
    options: [
      "Creates prototype",
      "Initializes object",
      "Overrides method",
      "Inherits class",
    ],
    answer: "Initializes object",
  },

  {
    question: (
      <div>
        <p>Which keyword is used for inheritance in classes?</p>
        <CodeBlock
          language="javascript"
          code={`class Animal {}
class Dog extends Animal {}` }
        />
      </div>
    ),
    options: ["super", "this", "extends", "prototype"],
    answer: "extends",
  },

  {
    question: (
      <div>
        <p>Why is <b>super()</b> called here?</p>
        <CodeBlock
          language="javascript"
          code={`class Parent {
  constructor(id) {
    this.id = id;
  }
}

class Child extends Parent {
  constructor(id) {
    super(id);
  }
}`}
        />
      </div>
    ),
    options: [
      "Creates new object",
      "Calls parent constructor",
      "Overrides method",
      "Binds prototype",
    ],
    answer: "Calls parent constructor",
  },

  {
    question: (
      <div>
        <p>How does this code execute?</p>
        <CodeBlock
          language="javascript"
          code={`console.log("Hello");
console.log("World");`}
        />
      </div>
    ),
    options: [
      "Asynchronously",
      "Synchronously",
      "Promise based",
      "Callback based",
    ],
    answer: "Synchronously",
  },

  {
    question: (
      <div>
        <p>What does map() return?</p>
        <CodeBlock
          language="javascript"
          code={`const nums = [2, 4, 6];
const result = nums.map(n => n * 2);`}
        />
      </div>
    ),
    options: [
      "Modified array",
      "New array",
      "Single value",
      "undefined",
    ],
    answer: "New array",
  },

  // ===================== NORMAL QUESTIONS (5) =====================

  {
    question: "Which of the following is a built-in constructor function?",
    options: ["createData()", "Array()", "fetchData()", "buildObject()"],
    answer: "Array()",
  },

  {
    question: "Which properties are shared across all instances?",
    options: [
      "Instance properties",
      "Local properties",
      "Prototype properties",
      "Private properties",
    ],
    answer: "Prototype properties",
  },

  {
    question: "What is the type of a JavaScript class?",
    options: ["object", "class", "function", "constructor"],
    answer: "function",
  },

  {
    question: "Which promise state represents failure?",
    options: ["Pending", "Fulfilled", "Rejected", "Resolved"],
    answer: "Rejected",
  },

  {
    question: "Which array method always returns undefined?",
    options: ["map()", "filter()", "forEach()", "reduce()"],
    answer: "forEach()",
  },
];

const JS_Essential_Mock_Tests_MCQ_2 = ({
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
      title="JS Essential Mock Test | Part 2 - MCQs"
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
export default JS_Essential_Mock_Tests_MCQ_2;
