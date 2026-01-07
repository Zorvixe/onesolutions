import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ===================== CODE BLOCK QUESTIONS (10) =====================

  {
    question: (
      <div>
        <p>What is the type of a JavaScript class?</p>
        <CodeBlock
          language="javascript"
          code={`class Person {}
  console.log(typeof Person);`}
        />
      </div>
    ),
    options: ["object", "class", "function", "undefined"],
    answer: "function",
  },

  {
    question: (
      <div>
        <p>Which method is used to initialize class properties?</p>
        <CodeBlock
          language="javascript"
          code={`class Car {
    constructor(color) {
      this.color = color;
    }
  }`}
        />
      </div>
    ),
    options: ["init()", "constructor()", "create()", "build()"],
    answer: "constructor()",
  },

  {
    question: (
      <div>
        <p>What does this code create?</p>
        <CodeBlock
          language="javascript"
          code={`class User {
    constructor(name) {
      this.name = name;
    }
  }
  
  const user1 = new User("Alex");`}
        />
      </div>
    ),
    options: ["A class", "A function", "An instance object", "A prototype"],
    answer: "An instance object",
  },

  {
    question: (
      <div>
        <p>
          Where is <b>greet()</b> stored?
        </p>
        <CodeBlock
          language="javascript"
          code={`class Person {
    greet() {
      return "Hello";
    }
  }`}
        />
      </div>
    ),
    options: [
      "Inside instance",
      "Inside constructor",
      "Inside prototype",
      "Inside class body only",
    ],
    answer: "Inside prototype",
  },

  {
    question: (
      <div>
        <p>How do you access the prototype of a class?</p>
        <CodeBlock
          language="javascript"
          code={`class Animal {}
  console.log(Animal.prototype);`}
        />
      </div>
    ),
    options: [
      "Animal.__proto__",
      "Animal()",
      "Animal.prototype",
      "prototype()",
    ],
    answer: "Animal.prototype",
  },

  {
    question: (
      <div>
        <p>What does this access?</p>
        <CodeBlock
          language="javascript"
          code={`class Animal {}
  const dog = new Animal();
  console.log(dog.__proto__);`}
        />
      </div>
    ),
    options: ["Constructor", "Instance", "Instance prototype", "Class body"],
    answer: "Instance prototype",
  },

  {
    question: (
      <div>
        <p>Which keyword enables inheritance here?</p>
        <CodeBlock
          language="javascript"
          code={`class Animal {}
  class Dog extends Animal {}`}
        />
      </div>
    ),
    options: ["super", "this", "extends", "inherit"],
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
          code={`class Animal {
    constructor(name) {
      this.name = name;
    }
  }
  
  class Dog extends Animal {
    constructor(name) {
      super(name);
    }
  }`}
        />
      </div>
    ),
    options: [
      "To stop execution",
      "To call subclass constructor",
      "To initialize superclass constructor",
      "To create prototype",
    ],
    answer: "To initialize superclass constructor",
  },

  {
    question: (
      <div>
        <p>What concept is shown here?</p>
        <CodeBlock
          language="javascript"
          code={`class Animal {
    speak() {
      return "Sound";
    }
  }
  
  class Dog extends Animal {
    speak() {
      return "Bark";
    }
  }`}
        />
      </div>
    ),
    options: [
      "Encapsulation",
      "Abstraction",
      "Method Overriding",
      "Polymorphism",
    ],
    answer: "Method Overriding",
  },

  {
    question: (
      <div>
        <p>
          What does <b>this</b> refer to here?
        </p>
        <CodeBlock
          language="javascript"
          code={`class Animal {
    constructor() {
      this.type = "Animal";
    }
  }
  
  const animal1 = new Animal();`}
        />
      </div>
    ),
    options: ["Class", "Prototype", "Constructor", "Instance object"],
    answer: "Instance object",
  },

  // ===================== NORMAL QUESTIONS (5) =====================

  {
    question: "What is a class in JavaScript?",
    options: [
      "A data type",
      "A loop",
      "A special type of function",
      "A variable",
    ],
    answer: "A special type of function",
  },

  {
    question: "Which method runs automatically when an object is created?",
    options: ["init()", "constructor()", "start()", "build()"],
    answer: "constructor()",
  },

  {
    question: "Which keyword is used to inherit another class?",
    options: ["super", "this", "extends", "new"],
    answer: "extends",
  },

  {
    question: "What does super() ensure?",
    options: [
      "Subclass constructor is skipped",
      "Superclass constructor is called",
      "Prototype is removed",
      "Instance is deleted",
    ],
    answer: "Superclass constructor is called",
  },

  {
    question: "In a class, what does this refer to?",
    options: [
      "Window object",
      "Class definition",
      "Instance object",
      "Prototype",
    ],
    answer: "Instance object",
  },
];

const JS_Classes_MCQ = ({ subtopicId, goalName, courseName, onComplete }) => {
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
      title="JS Classes - MCQs"
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
export default JS_Classes_MCQ;
