import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const FoundationsOfOOP_CheatSheet = ({ subtopicId, goalName, courseName }) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if already completed
  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleContinue = async () => {
    if (isLoading || isSubtopicCompleted) return;

    try {
      setIsLoading(true);
      const result = await markSubtopicComplete(
        subtopicId,
        goalName,
        courseName
      );

      if (result.success) {
        await loadProgressSummary();
        setIsSubtopicCompleted(true);
      } else {
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="intro-container">
      <h1>Foundations of Object-Oriented Programming | Cheat Sheet</h1>

      {/* 1. What is Software */}
      <section>
        <h2>1. What is Software?</h2>
        <ul>
          <li>
            <b>Software</b>: An easily changeable tool that performs specific
            tasks.
          </li>
          <li>
            <b>Key Property</b>: <b>Softness</b> – ease of understanding,
            changing, fixing bugs, and adding features.
          </li>
          <li>
            <b>Unlike coding problems</b>: Software development involves working
            on the <b>same codebase</b> for a long time.
          </li>
          <li>
            <b>Crucial Aspects</b>: Code readability and maintainability.
          </li>
        </ul>
      </section>

      {/* 2. Why OOP */}
      <section>
        <h2>2. Why OOP?</h2>
        <p>
          Object-Oriented Programming models software after{" "}
          <b>real-life objects</b> and their interactions.
        </p>
        <p>Proper usage of OOP helps build:</p>
        <ul>
          <li>Well-organized systems</li>
          <li>Extendable systems</li>
          <li>Maintainable code</li>
        </ul>
      </section>

      {/* 3. Describing Real-Life Objects */}
      <section>
        <h2>3. Describing Real-Life Objects</h2>

        <h3>Bad Example (Unorganized)</h3>
        <CodeBlock
          language="text"
          code={`Car: Red color, can drive, has 4 wheels, brand is Toyota, can stop`}
        />

        <h3>Good Example (Organized)</h3>
        <CodeBlock
          language="text"
          code={`Object: Car
What it is: A vehicle
What it has: 4 wheels, Red color, Brand Toyota (ATTRIBUTES)
What it can do: Drive, Stop (METHODS)`}
        />
      </section>

      {/* 4. Creating Templates */}
      <section>
        <h2>4. Creating Templates for Similar Objects</h2>
        <p>
          When objects have the <b>same properties</b> but different values:
        </p>

        <h3>Similar Mobile Objects</h3>
        <CodeBlock
          language="text"
          code={`Object 1:
- Camera: 13 MP
- Storage: 16 GB
- Battery: 21 hours
- RAM: 3 GB

Object 2:
- Camera: 64 MP
- Storage: 128 GB
- Battery: 24 hours
- RAM: 6 GB`}
        />

        <p>
          <b>Solution</b>: Create a <b>template / blueprint</b> called a{" "}
          <b>Class</b>.
        </p>
      </section>

      {/* 5. Encapsulation & Classes */}
      <section>
        <h2>5. Encapsulation & Classes</h2>
        <p>
          <b>Encapsulation</b> means grouping related properties and actions
          together.
        </p>

        <h3>Defining a Class</h3>
        <CodeBlock
          language="python"
          code={`class Mobile:
    def __init__(self, model, camera):
        self.model = model      # Attribute
        self.camera = camera    # Attribute

    def make_call(self, number):  # Method
        print(f"Calling {number}...")`}
        />
      </section>

      {/* 6. Creating Objects */}
      <section>
        <h2>6. Creating Objects from Classes</h2>
        <CodeBlock
          language="python"
          code={`# Creating objects (instances)
mobile1 = Mobile("iPhone 12 Pro", "12 MP")
mobile2 = Mobile("Galaxy M51", "64 MP")

# Each object has unique identity
print(id(mobile1))
print(id(mobile2))

# Using methods
mobile1.make_call(9876543210)`}
        />
      </section>

      {/* Shopping Cart */}
      <section>
        <h2>2. Real-World Example: Shopping Cart</h2>
        <CodeBlock
          language="python"
          code={`class Cart:
    def __init__(self):
        self.items = {}

    def add_item(self, item, price, quantity=1):
        if item in self.items:
            self.items[item]["quantity"] += quantity
        else:
            self.items[item] = {"price": price, "quantity": quantity}

    def remove_item(self, item):
        if item in self.items:
            del self.items[item]

    def update_quantity(self, item, quantity):
        if item in self.items:
            self.items[item]["quantity"] = quantity

    def total_price(self):
        total = 0
        for item in self.items.values():
            total += item["price"] * item["quantity"]
        return total

cart = Cart()
cart.add_item("Laptop", 50000, 1)
cart.add_item("Mouse", 500, 2)
print(cart.total_price())`}
        />
      </section>

      {/* Continue Button */}
      <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted || isLoading}
        >
          {isLoading
            ? "Marking..."
            : isSubtopicCompleted
              ? "✓ Completed"
              : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default FoundationsOfOOP_CheatSheet;
