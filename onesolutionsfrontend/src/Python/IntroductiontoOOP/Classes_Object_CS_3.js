import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Classes_Object_CS_3 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Classes and Objects | Cheat Sheet</h1>

      {/* Attributes of an Object */}
      <section>
        <h2>Attributes of an Object</h2>
        <p>
          Attributes can be set or accessed using <b>.</b> (dot) character.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`class Car:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

car1 = Car("Toyota", "Corolla")
print(car1.brand)
print(car1.model)`}
        />
        <h3>Output</h3>
        <OutputBlock output={["Toyota", "Corolla"]} />
      </section>

      {/* Accessing in Other Methods */}
      <section>
        <h2>Accessing in Other Methods</h2>
        <p>We can also access and update properties in other methods.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`class Car:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

    def display_info(self):
        return f"{self.brand} {self.model}"

car1 = Car("Tesla", "Model 3")
print(car1.display_info())`}
        />
        <h3>Output</h3>
        <OutputBlock output="Tesla Model 3" />
      </section>

      {/* Updating Attributes */}
      <section>
        <h2>Updating Attributes</h2>
        <p>It is recommended to update attributes through methods.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`class Car:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

    def update_model(self, new_model):
        self.model = new_model

car1 = Car("Honda", "Civic")
print(car1.model)
car1.update_model("City")
print(car1.model)`}
        />
        <h3>Output</h3>
        <OutputBlock output={["Civic", "City"]} />
      </section>

      {/* Modeling Class */}
      <section>
        <h2>Modeling Class</h2>
        <p>Let’s model the scenario of shopping cart of an e-commerce site.</p>
        <p>The features a cart should have:</p>
        <ul>
          <li>can add an item</li>
          <li>can remove an item from cart</li>
          <li>update quantity of an item</li>
          <li>to show list of items in cart</li>
          <li>to show total price for the items in the cart</li>
        </ul>

        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`class Cart:
    def __init__(self):
        self.items = {}

    def add_item(self, item, price, qty=1):
        if item in self.items:
            self.items[item]["qty"] += qty
        else:
            self.items[item] = {"price": price, "qty": qty}

    def remove_item(self, item):
        if item in self.items:
            del self.items[item]

    def update_quantity(self, item, qty):
        if item in self.items:
            self.items[item]["qty"] = qty

    def show_items(self):
        return self.items

    def total_price(self):
        return sum(v["price"] * v["qty"] for v in self.items.values())

cart = Cart()
cart.add_item("Laptop", 50000, 1)
cart.add_item("Mouse", 500, 2)
print(cart.show_items())
print(cart.total_price())
cart.update_quantity("Mouse", 1)
print(cart.show_items())
print(cart.total_price())`}
        />

        <h3>Output</h3>
        <OutputBlock
          output={[
            `{'Laptop': {'price': 50000, 'qty': 1}, 'Mouse': {'price': 500, 'qty': 2}}`,
            "51000",
            `{'Laptop': {'price': 50000, 'qty': 1}, 'Mouse': {'price': 500, 'qty': 1}}`,
            "50500",
          ]}
        />
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

export default Classes_Object_CS_3;
