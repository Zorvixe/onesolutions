import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock
          language="python"
          code={`class Product:\n    def __init__(self, name, price):\n        self.name = name\n        self.price = price\n\np = Product("Shoes", 500)\nprint(p.name)`}
        />
      </div>
    ),
    options: ["Shoes", "500", "Product", "Error"],
    answer: "Shoes",
  },

  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="python"
          code={`class Product:\n    def __init__(self, name, price):\n        self.name = name\n        self.price = price\n\np = Product("Shoes", 500)\nprint(p.price)`}
        />
      </div>
    ),
    options: ["Shoes", "500", "name", "Error"],
    answer: "500",
  },

  {
    question: (
      <div>
        <p>What does this method do?</p>
        <CodeBlock
          language="python"
          code={`class Product:\n    def apply_discount(self):\n        self.price = self.price - 50\n\np = Product("Bag", 500)\np.apply_discount()\nprint(p.price)`}
        />
      </div>
    ),
    options: ["550", "450", "500", "Error"],
    answer: "450",
  },

  {
    question: (
      <div>
        <p>How do you correctly call a method?</p>
        <CodeBlock
          language="python"
          code={`p = Product("Watch", 1000)\np.apply_discount()`}
        />
      </div>
    ),
    options: [
      "Product.apply_discount()",
      "p.apply_discount() → Correct",
      "apply_discount(p)",
      "self.apply_discount()",
    ],
    answer: "p.apply_discount() → Correct",
  },

  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock
          language="python"
          code={`class Product:\n    def __init__(self, name):\n        self.name = name\n    \n    def show(self):\n        print("Product:", self.name)\n\np = Product("Shoes")\np.show()`}
        />
      </div>
    ),
    options: [<span>Product: Shoes</span>, "Shoes", "self.name", "Error"],
    answer: <div>Product: Shoes</div>,
  },

  {
    question: (
      <div>
        <p>Which line defines an attribute?</p>
        <CodeBlock
          language="python"
          code={`class Product:\n    def __init__(self):\n        self.rating = 4.5`}
        />
      </div>
    ),
    options: [
      "def __init__(self):",
      "self.rating = 4.5 → Correct",
      "class Product:",
      "print(rating)",
    ],
    answer: "self.rating = 4.5 → Correct",
  },

  {
    question: (
      <div>
        <p>
          What is the role of <b>self</b> in this method?
        </p>
        <CodeBlock
          language="python"
          code={`def get_price(self):\n    return self.price`}
        />
      </div>
    ),
    options: [
      "Refers to the class",
      "Refers to the current object → Correct",
      "Refers to all objects",
      "Not needed",
    ],
    answer: "Refers to the current object → Correct",
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`class Product:\n    def __init__(self, name, price, rating):\n        self.name = name\n        self.price = price\n        self.rating = rating\n    \n    def info(self):\n        print(f"Product: {self.name}, Price: {self.price}, Rating: {self.rating}")\n\np = Product("Shoes", 450, 4.5)\np.info()`}
        />
      </div>
    ),
    options: [
      <span>Product: Shoes, Price: 450, Rating: 4.5</span>,
      "Shoes 450 4.5",
      "Error",
      "None",
    ],
    answer: <span>Product: Shoes, Price: 450, Rating: 4.5</span>,
  },

  {
    question: (
      <div>
        <p>Which of these is a method?</p>
        <CodeBlock
          language="python"
          code={`def apply_discount(self):\n    self.price -= 50`}
        />
      </div>
    ),
    options: ["self.price", "apply_discount → Method", "class Product", "self"],
    answer: "apply_discount → Method",
  },

  {
    question: (
      <div>
        <p>Can a method change an object's attribute?</p>
        <CodeBlock
          language="python"
          code={`class Product:\n    def set_price(self, new_price):\n        self.price = new_price\n\np = Product("Book", 300)\np.set_price(250)\nprint(p.price)`}
        />
      </div>
    ),
    options: ["300", "250", "Error", "None"],
    answer: "250",
  },

  {
    question: "What are attributes in a class?",
    options: [
      "Functions that do actions",
      "Data/variables that store object state",
      "Loops inside class",
      "Imported modules",
    ],
    answer: "Data/variables that store object state",
  },

  {
    question: "What are methods in a class?",
    options: [
      "Variables that hold values",
      "Functions defined inside a class that define behavior",
      "Class names",
      "Comments",
    ],
    answer: "Functions defined inside a class that define behavior",
  },

  {
    question: "How do you define an instance attribute in __init__?",
    options: [
      "price = 500",
      "self.price = 500 → Correct",
      "Product.price = 500",
      "def price = 500",
    ],
    answer: "self.price = 500 → Correct",
  },

  {
    question: "What does this combination represent?",
    options: [
      "Only data, no actions",
      "Only methods, no data",
      "Data (attributes) + Behavior (methods) together → Encapsulation",
      "Separate functions and variables",
    ],
    answer: "Data (attributes) + Behavior (methods) together → Encapsulation",
  },

  {
    question: "Why do we use 'self' in methods?",
    options: [
      "It's optional",
      "To refer to the current object and access its attributes/methods",
      "To refer to the class",
      "To create new objects",
    ],
    answer: "To refer to the current object and access its attributes/methods",
  },
];

const Attributes_Methods_MCQ = ({
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
      title="Attribute Methods | MCQs"
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

export default Attributes_Methods_MCQ;
