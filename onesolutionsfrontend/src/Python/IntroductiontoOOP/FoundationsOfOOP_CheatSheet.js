// /project/workspace/onesolutionsfrontend/src/OOP/FoundationsOfOOP_CheatSheet.js
import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const FoundationsOfOOP_CheatSheet = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Foundations of OOP | Cheat Sheet</h1>

      {/* 1. What is Software? */}
      <section>
        <h2>What is Software?</h2>
        <ul>
          <li>Software = easily changeable tool that performs specific tasks</li>
          <li>Most important property → <b>Softness</b></li>
          <li>Softness means: easy to understand, change, fix bugs, add features</li>
          <li>Unlike school coding problems → real software lives for years in the same codebase</li>
          <li>Key focus: <b>readability</b> + <b>maintainability</b></li>
        </ul>
      </section>

      {/* 2. Why OOP? */}
      <section>
        <h2>Why Use Object-Oriented Programming?</h2>
        <p>OOP models software like real-world objects and their interactions.</p>
        <p>Benefits of good OOP:</p>
        <ul>
          <li>Well-organized systems</li>
          <li>Easily extendable code</li>
          <li>Highly maintainable codebase</li>
        </ul>
      </section>

      {/* 3. Describing Objects – Good vs Bad */}
      <section>
        <h2>Describing Real-Life Objects</h2>
        
        <h3>Bad (Unorganized) Way</h3>
        <CodeBlock
          language="text"
          code={`Car: Red color, can drive, has 4 wheels, brand is Toyota, can stop`}
        />

        <h3>Good (OOP Style) Way</h3>
        <CodeBlock
          language="text"
          code={`Object: Car
What it is:     A vehicle
What it has:    4 wheels, red color, brand Toyota    → Attributes
What it can do: drive, stop                          → Methods`}
        />
      </section>

      {/* 4. Class = Blueprint */}
      <section>
        <h2>Class = Template / Blueprint</h2>
        <p>When many objects have the <b>same structure</b> but <b>different values</b> → use a class.</p>
        
        <h3>Example – Multiple Mobiles</h3>
        <CodeBlock
          language="text"
          code={`Object 1 → Camera: 13MP, RAM: 3GB, Storage: 16GB
Object 2 → Camera: 64MP, RAM: 6GB, Storage: 128GB`}
        />
        <p><b>Solution:</b> Create one <code>Mobile</code> class (blueprint)</p>
      </section>

      {/* 5. Basic Class + Object */}
      <section>
        <h2>Defining a Class & Creating Objects</h2>
        
        <h3>Basic Class Syntax</h3>
        <CodeBlock
          language="python"
          code={`class Mobile:
    def __init__(self, model, camera):
        self.model = model      # attribute
        self.camera = camera    # attribute
    
    def make_call(self, number):   # method
        print(f"Calling {number}...")`}
        />

        <h3>Creating Objects (Instances)</h3>
        <CodeBlock
          language="python"
          code={`mobile1 = Mobile("iPhone 12 Pro", "12 MP")
mobile2 = Mobile("Galaxy M51", "64 MP")

print(id(mobile1))   # different memory address
print(id(mobile2))   # different memory address

mobile1.make_call(9876543210)  # → Calling 9876543210...`}
        />
      </section>

      {/* 6. Attributes vs Methods */}
      <section>
        <h2>Attributes vs Methods – Quick Summary</h2>
        <table border="1" cellPadding="6" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Type</th>
              <th>What is it?</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Attribute</b></td>
              <td>Data / Properties of object</td>
              <td>self.brand, self.model, self.color</td>
            </tr>
            <tr>
              <td><b>Method</b></td>
              <td>Behavior / Actions object can perform</td>
              <td>.drive(), .stop(), .display_info()</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 7. Real-world Example – Shopping Cart */}
      <section>
        <h2>Real-world Example: Shopping Cart</h2>
        <CodeBlock
          language="python"
          code={`class Cart:
    def __init__(self):
        self.items = {}   # empty dictionary

    def add_item(self, item, price, quantity=1):
        if item in self.items:
            self.items[item]["quantity"] += quantity
        else:
            self.items[item] = {"price": price, "quantity": quantity}

    def remove_item(self, item):
        if item in self.items:
            del self.items[item]

    def total_price(self):
        total = 0
        for data in self.items.values():
            total += data["price"] * data["quantity"]
        return total

# Usage
cart = Cart()
cart.add_item("Laptop", 50000, 1)
cart.add_item("Mouse", 500, 2)
print(cart.total_price())   # 51000`}
        />
      </section>

      {/* 8. Quick Recap Table */}
      <section>
        <h2>OOP Core Concepts – One-line Recap</h2>
        <ul>
          <li><b>Class</b> → Blueprint / Template</li>
          <li><b>Object</b> → Instance created from class</li>
          <li><b>Attribute</b> → Data (nouns)</li>
          <li><b>Method</b> → Behavior (verbs)</li>
          <li><b>self</b> → Refers to the current object instance</li>
          <li><b>__init__</b> → Constructor – runs when object is created</li>
          <li><b>Encapsulation</b> → Grouping data + behavior together</li>
        </ul>
      </section>

      {/* Continue Button */}
      <div className="view-continue" style={{ marginTop: "20px" }}>
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

export default FoundationsOfOOP_CheatSheet;