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
          code={`class Car:\n    def __init__(self, brand, model):\n        self.brand = brand\n        self.model = model\n\nmy_car = Car("Toyota", "Corolla")\nprint(my_car.brand)`}
        />
      </div>
    ),
    options: ["Toyota", "Corolla", "Car", "Error"],
    answer: "Toyota",
  },

  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="python"
          code={`class Car:\n    def __init__(self, brand, model):\n        self.brand = brand\n        self.model = model\n    \n    def full_name(self):\n        return f"{self.brand} {self.model}"\n\nc = Car("Tesla", "Model 3")\nprint(c.full_name())`}
        />
      </div>
    ),
    options: ["Tesla", "Model 3", "Tesla Model 3", "Error"],
    answer: "Tesla Model 3",
  },

  {
    question: (
      <div>
        <p>How do you correctly access the model?</p>
        <CodeBlock
          language="python"
          code={`class Car:\n    def __init__(self):\n        self.model = "Civic"\n\ncar = Car()\nprint(car.model)`}
        />
      </div>
    ),
    options: ["car.model", "Car.model", "model.car", "self.model"],
    answer: "car.model",
  },

  {
    question: (
      <div>
        <p>What is the recommended way to update an attribute?</p>
        <CodeBlock
          language="python"
          code={`class Car:\n    def __init__(self):\n        self.model = "Civic"\n    \n    def update_model(self, new_model):\n        self.model = new_model\n\nc = Car()\nc.update_model("City")\nprint(c.model)`}
        />
      </div>
    ),
    options: ["City", "Civic", "Error", "None"],
    answer: "City",
  },

  {
    question: (
      <div>
        <p>Which line calls a method on the cart object?</p>
        <CodeBlock language="python" code={`cart.add_item("Mouse", 500, 2)`} />
      </div>
    ),
    options: [
      "Correct way to call method on object",
      "Wrong — should use Cart.add_item()",
      "Wrong — should use add_item(cart, ...)",
      "Error",
    ],
    answer: "Correct way to call method on object",
  },

  {
    question: (
      <div>
        <p>What is printed after updating quantity?</p>
        <CodeBlock
          language="python"
          code={`# Assume cart has:\n# Laptop: 50000 × 1\n# Mouse: 500 × 2\ncart.update_quantity("Mouse", 1)\nprint(cart.total_price())`}
        />
      </div>
    ),
    options: ["51000", "50500", "50000", "51500"],
    answer: "50500",
  },

  {
    question: (
      <div>
        <p>How do you access attributes inside another method?</p>
        <CodeBlock
          language="python"
          code={`def info(self):\n    print(self.brand)`}
        />
      </div>
    ),
    options: [
      "Using self.brand",
      "Using brand directly",
      "Using Car.brand",
      "Using global brand",
    ],
    answer: "Using self.brand",
  },

  {
    question: (
      <div>
        <p>What does this method do?</p>
        <CodeBlock
          language="python"
          code={`def show_items(self):\n    print(self.items)`}
        />
      </div>
    ),
    options: [
      "Displays all items in the cart",
      "Adds an item",
      "Removes an item",
      "Calculates total",
    ],
    answer: "Displays all items in the cart",
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`class Phone:\n    def __init__(self):\n        self.brand = "Samsung"\n    \n    def change_brand(self):\n        self.brand = "OnePlus"\n\np = Phone()\np.change_brand()\nprint(p.brand)`}
        />
      </div>
    ),
    options: ["Samsung", "OnePlus", "Phone", "Error"],
    answer: "OnePlus",
  },

  {
    question: (
      <div>
        <p>Which one is the correct way to remove an item?</p>
        <CodeBlock language="python" code={`cart.remove_item("Laptop")`} />
      </div>
    ),
    options: [
      "Correct object-oriented way",
      'Wrong — should be remove_item(cart, "Laptop")',
      'Wrong — should be cart["Laptop"].remove()',
      "Error",
    ],
    answer: "Correct object-oriented way",
  },

  {
    question: "How do you access an object's attribute in Python?",
    options: [
      "Using square brackets [ ]",
      "Using dot notation .",
      "Using parentheses ( )",
      "Using colon :",
    ],
    answer: "Using dot notation .",
  },

  {
    question:
      "Why is it recommended to update attributes using methods instead of directly?",
    options: [
      "It's faster",
      "It keeps the code cleaner and allows adding logic later",
      "Direct update is not allowed",
      "Methods are required by Python",
    ],
    answer: "It keeps the code cleaner and allows adding logic later",
  },

  {
    question: "What does 'self' refer to inside a method?",
    options: [
      "The class itself",
      "The current object",
      "All objects",
      "Nothing",
    ],
    answer: "The current object",
  },

  {
    question: "In object-oriented programming, an object contains:",
    options: [
      "Only data",
      "Only methods",
      "Both data (attributes) and behavior (methods)",
      "Only the class name",
    ],
    answer: "Both data (attributes) and behavior (methods)",
  },

  {
    question:
      "Which of these is a valid way to model real-world behavior in a class?",
    options: [
      "Storing everything in global variables",
      "Adding methods like add_item(), remove_item(), total_price()",
      "Using only print statements",
      "Writing everything in __init__",
    ],
    answer: "Adding methods like add_item(), remove_item(), total_price()",
  },
];

const Classes_Object_MCQ = ({
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
      title="Classes Object | MCQs"
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

export default Classes_Object_MCQ;
