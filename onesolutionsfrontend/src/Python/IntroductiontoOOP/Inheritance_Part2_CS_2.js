import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock } from "../../CodeOutputBlocks";

const Inheritance_Part2_CS_2 = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if subtopic is already completed
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
        console.log("✅ Cheat sheet marked as completed");
      } else {
        console.error(
          "❌ Failed to mark cheat sheet complete:",
          result.message
        );
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      console.error("❌ Failed to mark cheat sheet complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="intro-container">
      <h1>Inheritance - Part 2 | Cheat Sheet</h1>

      {/* Composition */}
      <section>
        <h2>Composition</h2>
        <p>
          Modelling instances of one class as attributes of another class is
          called <b>Composition</b>.
        </p>
        <p>Example: Order has Product instances as attributes.</p>
        <CodeBlock
          language="python"
          code={`class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

class Order:
    def __init__(self, order_id, products):
        self.order_id = order_id
        self.products = products  # List of Product instances

    def display_order(self):
        print(f"Order ID: {self.order_id}")
        for product in self.products:
            print(f"Product: {product.name}, Price: {product.price}")`}
        />
      </section>

      {/* Overriding Methods */}
      <section>
        <h2>Overriding Methods</h2>
        <p>
          Sometimes a method in a subclass needs to behave differently from the
          method in the superclass.
        </p>
        <CodeBlock
          language="python"
          code={`class Product:
    def display_product_details(self):
        print("Generic Product Details")

class ElectronicItem(Product):
    def display_product_details(self):
        print("Electronic Item Details")  # Overrides Product method`}
        />
      </section>

      {/* Accessing Superclass Methods */}
      <section>
        <h2>Accessing Superclass Methods</h2>
        <p>
          <code>super()</code> allows calling methods of the superclass from a
          subclass.
        </p>
        <CodeBlock
          language="python"
          code={`class ElectronicItem(Product):
    def __init__(self, name, price, warranty):
        super().__init__(name, price)
        self.warranty = warranty

    def display_product_details(self):
        super().display_product_details()
        print(f"Warranty: {self.warranty} months")`}
        />
      </section>

      {/* Multi-Level Inheritance */}
      <section>
        <h2>Multi-Level Inheritance</h2>
        <p>
          We can inherit from a subclass. This is called{" "}
          <b>Multi-Level Inheritance</b>.
        </p>
        <CodeBlock
          language="python"
          code={`class SpecialElectronic(ElectronicItem):
    def display_special_offer(self):
        print("Special Offer for this electronic item!")`}
        />
      </section>

      {/* Inheritance vs Composition */}
      <section>
        <h2>Inheritance vs Composition</h2>
        <ul>
          <li>
            <b>Use Inheritance:</b> When classes have an IS-A relationship.
          </li>
          <li>
            <b>Use Composition:</b> When classes have a HAS-A relationship.
          </li>
        </ul>
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

export default Inheritance_Part2_CS_2;
