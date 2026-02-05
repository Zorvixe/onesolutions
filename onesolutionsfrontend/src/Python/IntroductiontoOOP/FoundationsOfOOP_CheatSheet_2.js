import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const FoundationsOfOOP_CheatSheet_2 = ({
  subtopicId,
  goalName,
  courseName,
}) => {
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
      <h1>Foundations of Object-Oriented Programming | Cheat Sheet 2</h1>

      {/* 1. What is Software */}

      {/* Part 2 */}
      <section>
        <h2>Practical Implementation</h2>
      </section>

      {/* Attributes & Methods */}
      <section>
        <h2>1. Attributes and Methods</h2>
        <p>
          <b>Attributes</b>: Data or properties of an object.
        </p>
        <p>
          <b>Methods</b>: Functions that define behavior.
        </p>

        <CodeBlock
          language="python"
          code={`class Car:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

    def display_info(self):
        return f"{self.brand} {self.model}"

    def update_model(self, new_model):
        self.model = new_model

car1 = Car("Toyota", "Corolla")
print(car1.display_info())
car1.update_model("Camry")
print(car1.model)`}
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

export default FoundationsOfOOP_CheatSheet_2;
