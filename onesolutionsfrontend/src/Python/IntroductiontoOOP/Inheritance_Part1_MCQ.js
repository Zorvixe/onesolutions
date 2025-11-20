import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is the parent class here?</p>
        <CodeBlock
          language="python"
          code={`class ElectronicItem(Product):\n    pass`}
        />
      </div>
    ),
    options: ["ElectronicItem", "Product", "Both", "None"],
    answer: "Product",
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`class Product:\n    def __init__(self, name, price):\n        self.name = name\n        self.price = price\n    \n    def info(self):\n        print(f"Product: {self.name}")\n        print(f"Price: {self.price}")\n\nclass ElectronicItem(Product):\n    pass\n\ne = ElectronicItem("TV", 45000)\ne.info()`}
        />
      </div>
    ),
    options: [
      <span>
        Product: TV
        <br />
        Price: 45000
      </span>,
      "Error",
      "Nothing",
      "ElectronicItem: TV",
    ],
    answer: (
      <span>
        Product: TV
        <br />
        Price: 45000
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>How do you correctly define inheritance?</p>
        <CodeBlock
          language="python"
          code={`class GroceryItem(_____) :\n    pass`}
        />
      </div>
    ),
    options: ["Product", "ElectronicItem", "object", "GroceryItem"],
    answer: "Product",
  },

  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock
          language="python"
          code={`class Product:\n    def discount(self):\n        print("You Saved: 250")\n\nclass KidsWear(Product):\n    pass\n\nk = KidsWear()\nk.discount()`}
        />
      </div>
    ),
    options: [
      <span>You Saved: 250</span>,
      "Error",
      "Nothing",
      "discount not found",
    ],
    answer: <span>You Saved: 250</span>,
  },

  {
    question: (
      <div>
        <p>How to call parent class __init__ from subclass?</p>
        <CodeBlock
          language="python"
          code={`class ElectronicItem(Product):\n    def __init__(self, name, price, warranty):\n        super().__init__(name, price)\n        self.warranty = warranty`}
        />
      </div>
    ),
    options: [
      "Product.__init__(self, name, price)",
      "super().__init__(name, price) Correct",
      "self.__init__(name, price)",
      "base().__init__(name, price)",
    ],
    answer: "super().__init__(name, price) Correct",
  },

  {
    question: (
      <div>
        <p>What happens if subclass has no __init__?</p>
        <CodeBlock
          language="python"
          code={`class Product:\n    def __init__(self):\n        print("Product init called")\n\nclass Laptop(Product):\n    pass\n\nl = Laptop()`}
        />
      </div>
    ),
    options: [
      "Error",
      <span>Product init called</span>,
      "Nothing printed",
      "Laptop init called",
    ],
    answer: <span>Product init called</span>,
  },

  {
    question: (
      <div>
        <p>Which class is the child/subclass?</p>
        <CodeBlock
          language="python"
          code={`class TV(ElectronicItem):\n    pass`}
        />
      </div>
    ),
    options: ["ElectronicItem", "TV", "Product", "object"],
    answer: "TV",
  },

  {
    question: (
      <div>
        <p>What is printed after adding warranty?</p>
        <CodeBlock
          language="python"
          code={`class Product:\n    def info(self):\n        print("Product: TV")\n        print("Price: 45000")\n\nclass ElectronicItem(Product):\n    def info(self):\n        super().info()\n        print("Warranty 24 months")\n\ne = ElectronicItem()\ne.info()`}
        />
      </div>
    ),
    options: [
      <span>
        Product: TV
        <br />
        Price: 45000
        <br />
        Warranty 24 months
      </span>,
      "Warranty 24 months",
      "Error",
      "Only Product info",
    ],
    answer: (
      <span>
        Product: TV
        <br />
        Price: 45000
        <br />
        Warranty 24 months
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>Can a subclass use parent methods directly?</p>
        <CodeBlock
          language="python"
          code={`class Product:\n    def deal_price(self):\n        print("Deal Price: 40000")\n\nclass Mobile(Product):\n    pass\n\nm = Mobile()\nm.deal_price()`}
        />
      </div>
    ),
    options: ["Yes", "No", "Only if redefined", "Error"],
    answer: "Yes",
  },

  {
    question: (
      <div>
        <p>What is the correct syntax for inheritance?</p>
        <CodeBlock language="python" code={`class Shoes(_____) :\n    pass`} />
      </div>
    ),
    options: ["KidsWear", "Product", "ElectronicItem", "GroceryItem"],
    answer: "Product",
  },

  {
    question: "What is the main benefit of inheritance?",
    options: [
      "Makes code slower",
      "Code reusability and better organization",
      "Hides all methods",
      "Creates more bugs",
    ],
    answer: "Code reusability and better organization",
  },

  {
    question: "Which keyword helps call parent class methods in Python?",
    options: ["parent()", "base()", "super()", "inherit()"],
    answer: "super()",
  },

  {
    question: "In inheritance, the class that gives features is called:",
    options: [
      "Child class",
      "Subclass",
      "Parent / Superclass",
      "Derived class",
    ],
    answer: "Parent / Superclass",
  },

  {
    question: "A subclass automatically gets:",
    options: [
      "Nothing from parent",
      "Only attributes",
      "Only methods",
      "All attributes and methods from parent class",
    ],
    answer: "All attributes and methods from parent class",
  },

  {
    question: "Why do we use inheritance in e-commerce product modeling?",
    options: [
      "To repeat same code in every class",
      "To share common features (name, price, discount) in one place",
      "Because Python requires it",
      "To make classes smaller",
    ],
    answer: "To share common features (name, price, discount) in one place",
  },
];

const Inheritance_Part1_MCQ = ({
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
      title="Inheritance Part 1 | MCQs"
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
export default Inheritance_Part1_MCQ;
