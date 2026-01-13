import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What kind of relationship is this?</p>
        <CodeBlock
          language="python"
          code={`class Order:\n    def __init__(self):\n        self.products = []`}
        />
      </div>
    ),
    options: ["IS-A", "HAS-A (Composition)", "CAN-DO", "PART-OF"],
    answer: "HAS-A (Composition)",
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`class Product:\n    def show(self):\n        print("Generic Product")\n\nclass ElectronicItem(Product):\n    def show(self):\n        print("TV / Mobile / Laptop")\n\ne = ElectronicItem()\ne.show()`}
        />
      </div>
    ),
    options: ["Generic Product", "TV / Mobile / Laptop", "Both lines", "Error"],
    answer: "TV / Mobile / Laptop",
  },

  {
    question: (
      <div>
        <p>How to call the parent method after overriding?</p>
        <CodeBlock
          language="python"
          code={`class ElectronicItem(Product):\n    def show(self):\n        super().show()\n        print("With Warranty")`}
        />
      </div>
    ),
    options: [
      "Product.show(self)",
      "super().show()",
      "self.show()",
      "parent().show()",
    ],
    answer: "super().show()",
  },

  {
    question: (
      <div>
        <p>What is this called?</p>
        <CodeBlock
          language="python"
          code={`class A:\n    pass\nclass B(A):\n    pass\nclass C(B):\n    pass`}
        />
      </div>
    ),
    options: [
      "Multiple Inheritance",
      "Multi-level Inheritance",
      "Hybrid Inheritance",
      "Single Inheritance",
    ],
    answer: "Multi-level Inheritance",
  },

  {
    question: (
      <div>
        <p>Which line shows method overriding?</p>
        <CodeBlock
          language="python"
          code={`class GroceryItem(Product):\n    def display_details(self):\n        print("Fresh Vegetables")`}
        />
      </div>
    ),
    options: [
      "class GroceryItem(Product):",
      "def display_details(self):",
      'print("Fresh Vegetables")',
      "pass",
    ],
    answer: "def display_details(self):",
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`class Product:\n    def info(self):\n        print("Product Info")\n\nclass TV(Product):\n    def info(self):\n        super().info()\n        print("55 inch 4K")\n\nt = TV()\nt.info()`}
        />
      </div>
    ),
    options: [
      "Product Info\n55 inch 4K",
      "55 inch 4K",
      "Product Info",
      "Error",
    ],
    answer: "Product Info\n55 inch 4K",
  },

  {
    question: (
      <div>
        <p>Which relationship should use composition?</p>
        <CodeBlock
          language="python"
          code={`class Car:\n    def __init__(self):\n        self.engine = Engine()`}
        />
      </div>
    ),
    options: ["Car IS-A Engine", "Car HAS-A Engine", "Engine IS-A Car", "Both"],
    answer: "Car HAS-A Engine",
  },

  {
    question: (
      <div>
        <p>Which one is multi-level inheritance?</p>
        <CodeBlock
          language="python"
          code={`class SmartTV(TV):\n    pass\nclass TV(ElectronicItem):\n    pass\nclass ElectronicItem(Product):\n    pass`}
        />
      </div>
    ),
    options: [
      "Only SmartTV → TV",
      "Product → ElectronicItem → TV → SmartTV",
      "All are separate",
      "Multiple inheritance",
    ],
    answer: "Product → ElectronicItem → TV → SmartTV",
  },

  {
    question: (
      <div>
        <p>What happens when you override a method?</p>
        <CodeBlock
          language="python"
          code={`p = ElectronicItem()\np.display()`}
        />
      </div>
    ),
    options: [
      "Parent method runs",
      "Child method runs (overrides parent)",
      "Both run automatically",
      "Error",
    ],
    answer: "Child method runs (overrides parent)",
  },

  {
    question: (
      <div>
        <p>Correct use of super()?</p>
        <CodeBlock
          language="python"
          code={`class Book(Product):\n    def __init__(self, name, price, author):\n        super().__init__(name, price)\n        self.author = author`}
        />
      </div>
    ),
    options: [
      "Wrong — should be Product.__init__()",
      "Correct — calls parent __init__",
      "Not needed",
      "Causes error",
    ],
    answer: "Correct — calls parent __init__",
  },

  {
    question: "When should you use Inheritance?",
    options: [
      "When one class contains another object",
      "When there is an IS-A relationship (e.g., TV is a Product)",
      "When you want to hide data",
      "When classes are completely different",
    ],
    answer: "When there is an IS-A relationship (e.g., TV is a Product)",
  },

  {
    question: "When should you use Composition?",
    options: [
      "When one class is a type of another",
      "When one class HAS-A another (e.g., Order has Products)",
      "When you want method overriding",
      "Only for built-in classes",
    ],
    answer: "When one class HAS-A another (e.g., Order has Products)",
  },

  {
    question: "What does method overriding allow?",
    options: [
      "Deleting parent method",
      "Changing or extending the behavior in subclass",
      "Making method private",
      "Creating new method name",
    ],
    answer: "Changing or extending the behavior in subclass",
  },

  {
    question: "What is the correct rule: IS-A vs HAS-A?",
    options: [
      "IS-A → Composition, HAS-A → Inheritance",
      "IS-A → Inheritance, HAS-A → Composition",
      "Both mean the same",
      "Python doesn't care",
    ],
    answer: "IS-A → Inheritance, HAS-A → Composition",
  },

  {
    question: "Which keyword calls the parent class method?",
    options: ["parent()", "base()", "super()", "this()"],
    answer: "super()",
  },
];

const Inheritance_Part2_MCQ = ({
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
      title="Inheritance Part 2 | MCQs"
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

export default Inheritance_Part2_MCQ;
