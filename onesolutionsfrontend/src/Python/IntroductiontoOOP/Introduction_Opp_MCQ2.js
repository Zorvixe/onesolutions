import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`class Mobile:
    def __init__(self, brand, color):
        self.brand = brand
        self.color = color

phone1 = Mobile("Samsung", "Black")
phone2 = Mobile("Apple", "Silver")
print(phone1.brand)`}
        />
      </div>
    ),
    options: ["Samsung", "Apple", "Black", "Error"],
    answer: "Samsung",
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`class Car:
    def __init__(self):
        print("Car created!")

c1 = Car()
c2 = Car()`}
        />
      </div>
    ),
    options: [
      <span>
        Car created!
        <br />
        Car created!
      </span>,
      "Car created!",
      "Nothing",
      "Error",
    ],
    answer: (
      <span>
        Car created!
        <br />
        Car created!
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>Which line creates an object from the class?</p>
        <CodeBlock
          language="python"
          code={`class Student:
    def __init__(self, name):
        self.name = name

s1 = Student("Rahul")
s2 = Student("Priya")`}
        />
      </div>
    ),
    options: [
      "class Student:",
      "def __init__(self, name):",
      's1 = Student("Rahul")',
      "self.name = name",
    ],
    answer: 's1 = Student("Rahul")',
  },

  {
    question: (
      <div>
        <p>How many objects are created here?</p>
        <CodeBlock
          language="python"
          code={`class Book:
    def __init__(self, title):
        self.title = title

b1 = Book("Python")
b2 = Book("Java")
b3 = Book("C++")`}
        />
      </div>
    ),
    options: ["1", "2", "3", "0"],
    answer: "3",
  },

  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock
          language="python"
          code={`class Dog:
    def __init__(self, name):
        self.name = name

d1 = Dog("Buddy")
d2 = Dog("Max")
print(d2.name)`}
        />
      </div>
    ),
    options: ["Buddy", "Max", "Dog", "Error"],
    answer: "Max",
  },

  {
    question: (
      <div>
        <p>Do both objects share the same data?</p>
        <CodeBlock
          language="python"
          code={`class Person:
    def __init__(self, name):
        self.name = name

p1 = Person("Amit")
p2 = Person("Neha")
print(p1.name, p2.name)`}
        />
      </div>
    ),
    options: [
      <span>Amit Amit</span>,
      <span>Neha Neha</span>,
      <span>Amit Neha</span>,
      "Error",
    ],
    answer: <span>Amit Neha</span>,
  },

  {
    question: (
      <div>
        <p>What keyword defines a class?</p>
        <CodeBlock
          language="python"
          code={`_____ Mobile:
    def __init__(self, brand):
        self.brand = brand`}
        />
      </div>
    ),
    options: ["def", "class", "object", "new"],
    answer: "class",
  },

  {
    question: (
      <div>
        <p>Which method runs automatically when object is created?</p>
        <CodeBlock
          language="python"
          code={`class Cat:
    def _____(self):
        print("Meow!")`}
        />
      </div>
    ),
    options: ["start()", "create()", "__init__()", "run()"],
    answer: "__init__()",
  },

  {
    question: (
      <div>
        <p>
          What is the type of <code>p1</code>?
        </p>
        <CodeBlock
          language="python"
          code={`class Person:
    pass

p1 = Person()
print(type(p1))`}
        />
      </div>
    ),
    options: ["<class 'str'>", "<class 'Person'>", "<class 'object'>", "Error"],
    answer: "<class 'Person'>",
  },

  {
    question: (
      <div>
        <p>Are these two objects the same or different?</p>
        <CodeBlock
          language="python"
          code={`class Laptop:
    def __init__(self, model):
        self.model = model

l1 = Laptop("Dell")
l2 = Laptop("HP")`}
        />
      </div>
    ),
    options: [
      "Same object",
      "Different objects with same structure",
      "Only one object exists",
      "Error",
    ],
    answer: "Different objects with same structure",
  },

  {
    question: "What is a class in Python?",
    options: [
      "An actual object with values",
      "A template/blueprint to create similar objects",
      "A function",
      "A variable",
    ],
    answer: "A template/blueprint to create similar objects",
  },

  {
    question: "What is an object in OOP?",
    options: [
      "The class definition",
      "An instance of a class with real values",
      "A method",
      "A keyword",
    ],
    answer: "An instance of a class with real values",
  },

  {
    question: "What is encapsulation?",
    options: [
      "Hiding data from user",
      "Grouping related data and behavior together",
      "Inheriting from parent",
      "Overriding methods",
    ],
    answer: "Grouping related data and behavior together",
  },

  {
    question: "Why do we use classes for similar objects?",
    options: [
      "To write the same code again and again",
      "To create a reusable template",
      "Because Python doesn't allow variables",
      "To make code slower",
    ],
    answer: "To create a reusable template",
  },

  {
    question: "Each object created from a class has:",
    options: [
      "The same values as others",
      "Its own copy of the data (attributes)",
      "No data at all",
      "Only methods",
    ],
    answer: "Its own copy of the data (attributes)",
  },
];

const Introduction_Opp_MCQ2 = ({
  subtopicId,
  goalName,
  courseName,
  onComplete
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } = useAuth();

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
        courseName
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
      title="Introduction to OOPs Part 2 | MCQs"
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

export default Introduction_Opp_MCQ2;
