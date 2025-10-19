import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Attributes_Methods_CS_4 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Attributes & Methods | Cheat Sheet</h1>

      {/* Attributes */}
      <section>
        <h2>Attributes</h2>
        <p>Attributes represent the data or properties associated with an object.</p>
        <h3>Example Code</h3>
        <CodeBlock
          language="python"
          code={`class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

product1 = Product("Shoes", 500)
print(product1.name)
print(product1.price)`}
        />
        <h3>Output</h3>
        <OutputBlock output={["Shoes", 500]} />
      </section>

      {/* Methods */}
      <section>
        <h2>Methods</h2>
        <p>Methods are functions defined inside a class that describe the behavior of an object.</p>
        <h3>Example Code</h3>
        <CodeBlock
          language="python"
          code={`class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def apply_discount(self, discount):
        self.price -= discount
        return self.price

product1 = Product("Shoes", 500)
print(product1.apply_discount(50))`}
        />
        <h3>Output</h3>
        <OutputBlock output={[450]} />
      </section>

      {/* Combining Attributes & Methods */}
      <section>
        <h2>Combining Attributes & Methods</h2>
        <p>Attributes store the data, and methods operate on the data within the object.</p>
        <h3>Example Code</h3>
        <CodeBlock
          language="python"
          code={`class Product:
    def __init__(self, name, price, rating):
        self.name = name
        self.price = price
        self.rating = rating

    def apply_discount(self, discount):
        self.price -= discount

    def show_product(self):
        return f"Product: {self.name}, Price: {self.price}, Rating: {self.rating}"

product1 = Product("Shoes", 500, 4.5)
product1.apply_discount(50)
print(product1.show_product())`}
        />
        <h3>Output</h3>
        <OutputBlock output={["Product: Shoes, Price: 450, Rating: 4.5"]} />
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

export default Attributes_Methods_CS_4;
