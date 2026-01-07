import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ===================== CODE BLOCK QUESTIONS (10) =====================

  {
    question: (
      <div>
        <p>Which built-in constructor is used here?</p>
        <CodeBlock language="javascript" code={`const arr = [];`} />
      </div>
    ),
    options: ["Object()", "Array()", "Function()", "Number()"],
    answer: "Array()",
  },

  {
    question: (
      <div>
        <p>What does this return?</p>
        <CodeBlock
          language="javascript"
          code={`const arr = [1, 2, 3];
  console.log(arr.constructor);`}
        />
      </div>
    ),
    options: ["Object()", "Array()", "Function()", "undefined"],
    answer: "Array()",
  },

  {
    question: (
      <div>
        <p>Which property gives access to shared methods?</p>
        <CodeBlock
          language="javascript"
          code={`function Person() {}
  console.log(Person.prototype);`}
        />
      </div>
    ),
    options: ["constructor", "length", "prototype", "name"],
    answer: "prototype",
  },

  {
    question: (
      <div>
        <p>How do you access the shared prototype from an instance?</p>
        <CodeBlock
          language="javascript"
          code={`function Car() {}
  const car1 = new Car();
  console.log(car1.__proto__);`}
        />
      </div>
    ),
    options: ["Car()", "car1()", "prototype", "__proto__"],
    answer: "__proto__",
  },

  {
    question: (
      <div>
        <p>Which concept allows this method access?</p>
        <CodeBlock
          language="javascript"
          code={`function User(name) {
    this.name = name;
  }
  
  User.prototype.greet = function () {
    return "Hello";
  };
  
  const user1 = new User("Alex");
  user1.greet();`}
        />
      </div>
    ),
    options: [
      "Encapsulation",
      "Inheritance",
      "Prototypal Inheritance",
      "Polymorphism",
    ],
    answer: "Prototypal Inheritance",
  },

  {
    question: (
      <div>
        <p>
          Where is <b>calculateAge</b> stored?
        </p>
        <CodeBlock
          language="javascript"
          code={`function Person(year) {
    this.year = year;
  }
  
  Person.prototype.calculateAge = function () {};`}
        />
      </div>
    ),
    options: [
      "Inside instance",
      "Inside constructor",
      "Inside prototype",
      "Inside function body",
    ],
    answer: "Inside prototype",
  },

  {
    question: (
      <div>
        <p>Which property is instance specific?</p>
        <CodeBlock
          language="javascript"
          code={`function User(name) {
    this.name = name;
  }
  
  User.prototype.sayHi = function () {};`}
        />
      </div>
    ),
    options: ["sayHi", "prototype", "constructor", "name"],
    answer: "name",
  },

  {
    question: (
      <div>
        <p>What does this create?</p>
        <CodeBlock
          language="javascript"
          code={`const nums = new Array(1, 2, 3);`}
        />
      </div>
    ),
    options: ["Object", "Function", "Array instance", "Prototype"],
    answer: "Array instance",
  },

  {
    question: (
      <div>
        <p>Which built-in constructor is used here?</p>
        <CodeBlock
          language="javascript"
          code={`const sum = new Function("a", "b", "return a + b");`}
        />
      </div>
    ),
    options: ["Object()", "Function()", "Array()", "Promise()"],
    answer: "Function()",
  },

  {
    question: (
      <div>
        <p>Which method belongs to Function prototype?</p>
        <CodeBlock
          language="javascript"
          code={`function test() {}
  test.call(null);`}
        />
      </div>
    ),
    options: ["push()", "call()", "splice()", "shift()"],
    answer: "call()",
  },

  // ===================== NORMAL QUESTIONS (5) =====================

  {
    question: "Which property is shared across all instances?",
    options: [
      "Instance property",
      "Local variable",
      "Prototype property",
      "Private property",
    ],
    answer: "Prototype property",
  },

  {
    question: "Which keyword enables prototypal inheritance?",
    options: ["this", "function", "new", "prototype"],
    answer: "new",
  },

  {
    question: "Which constructor provides push() and pop() methods?",
    options: ["Object()", "Function()", "Array()", "Number()"],
    answer: "Array()",
  },

  {
    question: "Which are prototype methods?",
    options: [
      "name, age",
      "gender, yearOfBirth",
      "calculateAge, displayGreetings",
      "friendsList, name",
    ],
    answer: "calculateAge, displayGreetings",
  },

  {
    question: "Which are instance specific properties?",
    options: ["calculateIncome", "displayProfileDetails", "name", "prototype"],
    answer: "name",
  },
];

const Prototypal_Inheritance_MCQ = ({
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
      title="Prototypal Inheritance - MCQs"
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
export default Prototypal_Inheritance_MCQ;
