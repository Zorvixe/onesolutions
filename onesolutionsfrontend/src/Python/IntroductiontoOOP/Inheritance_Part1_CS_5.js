import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Inheritance_Part1_CS_5 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Inheritance | Cheat Sheet</h1>

      {/* Products */}
      <section>
        <h2>Products</h2>
        <p>Let's model an e-commerce site having different products like Electronics, Kids Wear, Grocery, etc.</p>
      </section>

      {/* Electronic Item */}
      <section>
        <h2>Electronic Item</h2>
        <p>Few attributes & methods for an Electronic product:</p>
        <CodeBlock
          language="python"
          code={`class ElectronicItem:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def display_info(self):
        return f"{self.name}: {self.price}"`}
        />
      </section>

      {/* Grocery Item */}
      <section>
        <h2>Grocery Item</h2>
        <p>Attributes & methods for a Grocery item:</p>
        <CodeBlock
          language="python"
          code={`class GroceryItem:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def display_info(self):
        return f"{self.name}: {self.price}"`}
        />
      </section>

      {/* Common vs Specific */}
      <section>
        <h2>Common & Specific Attributes</h2>
        <p>
          All products (Electronics, Kids Wear, Grocery) have common attributes & methods. 
          Each product also has specific attributes & methods of its own.
        </p>
        <p>ElectronicItem & GroceryItem can inherit common attributes from a base Product class.</p>
      </section>

      {/* Advantages */}
      <section>
        <h2>Advantages of Modeling Classes</h2>
        <ul>
          <li>Reusability</li>
          <li>Clear Separation</li>
          <li>More Organized</li>
        </ul>
      </section>

      {/* Inheritance */}
      <section>
        <h2>Inheritance</h2>
        <p>
          Inheritance allows a class to inherit attributes and methods from another class. 
          Product is the Super/Base/Parent class and ElectronicItem is Sub/Derived/Child class.
        </p>
      </section>

      {/* Super Class */}
      <section>
        <h2>Super Class</h2>
        <CodeBlock
          language="python"
          code={`class Product:
    def __init__(self, name, price, deal_price, ratings):
        self.name = name
        self.price = price
        self.deal_price = deal_price
        self.ratings = ratings

    def display_product(self):
        return f"Product: {self.name}\\nPrice: {self.price}\\nDeal Price: {self.deal_price}\\nYou Saved: {self.price - self.deal_price}\\nRatings: {self.ratings}"`}
        />
        <OutputBlock output={[
          "Product: Shoes",
          "Price: 500",
          "Deal Price: 250",
          "You Saved: 250",
          "Ratings: 3.5"
        ]}/>
      </section>

      {/* Sub Class */}
      <section>
        <h2>Sub Class</h2>
        <p>The subclass automatically inherits all attributes & methods from its superclass.</p>
        <CodeBlock
          language="python"
          code={`class ElectronicItem(Product):
    def set_warranty(self, months):
        self.warranty_in_months = months

tv = ElectronicItem("TV", 45000, 40000, 3.5)
tv.set_warranty(24)
print(tv.display_product())`}
        />
        <OutputBlock output={[
          "Product: TV",
          "Price: 45000",
          "Deal Price: 40000",
          "You Saved: 5000",
          "Ratings: 3.5"
        ]}/>
      </section>

      {/* Super Class Method in Sub Class */}
      <section>
        <h2>Calling Super Class Method</h2>
        <p>Methods defined in the superclass can be called from the subclass:</p>
        <CodeBlock
          language="python"
          code={`print(tv.display_product())
print("Warranty", tv.warranty_in_months, "months")`}
        />
        <OutputBlock output={[
          "Product: TV",
          "Price: 45000",
          "Deal Price: 40000",
          "You Saved: 5000",
          "Ratings: 3.5",
          "Warranty 24 months"
        ]}/>
      </section>

      {/* Continue Button */}
      <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted}
        >
          {isSubtopicCompleted ? "Completed" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Inheritance_Part1_CS_5;
