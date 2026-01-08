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
          code={`const numbers = new Array(1, 2, 3);`}
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
          code={`function Student(name) {
  this.name = name;
}

console.log(Student.prototype);`}
        />
      </div>
    ),
    options: ["constructor", "length", "prototype", "__proto__"],
    answer: "prototype",
  },

  {
    question: (
      <div>
        <p>Which property allows an instance to access shared methods?</p>
        <CodeBlock
          language="javascript"
          code={`function Employee() {}
const emp1 = new Employee();

console.log(emp1.__proto__);`}
        />
      </div>
    ),
    options: ["prototype", "constructor", "__proto__", "length"],
    answer: "__proto__",
  },

  {
    question: (
      <div>
        <p>
          What concept allows <b>user1</b> to access methods defined on
          the prototype?
        </p>
        <CodeBlock
          language="javascript"
          code={`function User() {}
User.prototype.sayHello = function () {
  return "Hello";
};

const user1 = new User();
user1.sayHello();`}
        />
      </div>
    ),
    options: [
      "Encapsulation",
      "Inheritance",
      "Prototypal Inheritance",
      "Abstraction",
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
Person.prototype.country = "India";

const p1 = new Person();
const p2 = new Person();`}
        />
      </div>
    ),
    options: ["country", "p1", "p2", "constructor"],
    answer: "country",
  },

  {
    question: (
      <div>
        <p>What does this class constructor do?</p>
        <CodeBlock
          language="javascript"
          code={`class Animal {
  constructor(type) {
    this.type = type;
  }
}

const animal1 = new Animal("Dog");`}
        />
      </div>
    ),
    options: [
      "Creates prototype methods",
      "Initializes the object",
      "Inherits another class",
      "Overrides methods",
    ],
    answer: "Initializes the object",
  },

  {
    question: (
      <div>
        <p>Which keyword is used to inherit another class?</p>
        <CodeBlock
          language="javascript"
          code={`class Vehicle {}
class Car extends Vehicle {}`}
        />
      </div>
    ),
    options: ["super", "extends", "this", "prototype"],
    answer: "extends",
  },

  {
    question: (
      <div>
        <p>
          Why is <b>super()</b> used here?
        </p>
        <CodeBlock
          language="javascript"
          code={`class Parent {
  constructor(name) {
    this.name = name;
  }
}

class Child extends Parent {
  constructor(name) {
    super(name);
  }
}`}
        />
      </div>
    ),
    options: [
      "To create a new object",
      "To call parent constructor",
      "To override methods",
      "To bind this",
    ],
    answer: "To call parent constructor",
  },

  {
    question: (
      <div>
        <p>What happens in method overriding?</p>
        <CodeBlock
          language="javascript"
          code={`class A {
  greet() {
    return "Hello";
  }
}

class B extends A {
  greet() {
    return "Hi";
  }
}`}
        />
      </div>
    ),
    options: [
      "Both methods run",
      "Parent method is hidden",
      "Error occurs",
      "Prototype is removed",
    ],
    answer: "Parent method is hidden",
  },

  {
    question: (
      <div>
        <p>
          In a class, what does <b>this</b> refer to?
        </p>
        <CodeBlock
          language="javascript"
          code={`class User {
  constructor(name) {
    this.name = name;
  }
}

const user1 = new User("Ravi");`}
        />
      </div>
    ),
    options: ["Class", "Prototype", "Instance object", "Constructor function"],
    answer: "Instance object",
  },

  // ===================== NORMAL QUESTIONS (5) =====================

  {
    question: "Which of the following is a built-in constructor function?",
    options: ["MapData()", "Array()", "FetchData()", "CreateObject()"],
    answer: "Array()",
  },

  {
    question: "Which properties are common across all instances?",
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
    question: "Which keyword ensures the parent class constructor is executed?",
    options: ["extends", "this", "super", "prototype"],
    answer: "super",
  },

  {
    question: "Which methods belong to the Function constructor?",
    options: [
      "push(), pop()",
      "apply(), call(), bind()",
      "map(), filter()",
      "slice(), splice()",
    ],
    answer: "apply(), call(), bind()",
  },
];

const JS_Essential_MCQ_Assignment_3 = ({
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
      title="JS Essential Assignment | Part 3 - MCQs"
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
export default JS_Essential_MCQ_Assignment_3;
