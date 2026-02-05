import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Miscellaneous_Python_Library_CheeatSheet = ({
  subtopicId,
  goalName,
  courseName,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check completion status
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
    } catch {
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="intro-container">
      <h1>Python Inheritance & Libraries | Cheat Sheet</h1>

      {/* 1. Why Inheritance */}
      <section>
        <h2>1. Why Inheritance?</h2>
        <p>
          Inheritance helps model real-world relationships by allowing a new
          class to reuse properties and methods of an existing class.
        </p>
        <p>In an e-commerce application:</p>
        <ul>
          <li>
            <b>Common attributes:</b> name, price (shared by all products)
          </li>
          <li>
            <b>Specific attributes:</b> warranty for electronics, expiry date for
            groceries
          </li>
          <li>Reduces code duplication</li>
          <li>Makes the system easy to extend</li>
        </ul>
      </section>

      {/* 2. Base Class */}
      <section>
        <h2>2. Base / Parent Class</h2>
        <p>
          The base class contains common attributes and behavior that all child
          classes can inherit.
        </p>

        <CodeBlock
          language="python"
          code={`class Product:
    def __init__(self, name, price, deal_price, ratings):
        self.name = name
        self.price = price
        self.deal_price = deal_price
        self.ratings = ratings

    def display_product(self):
        return f"""Product:{self.name}
Price: ₹{self.price}
Deal Price: ₹{self.deal_price}
You Save: ₹{self.price - self.deal_price}
Ratings:{self.ratings}"""`}
        />
      </section>

      {/* 3. Child Classes */}
      <section>
        <h2>3. Child Classes (Inheritance)</h2>
        <p>
          Child classes inherit from the parent class and can add new attributes
          or override existing methods.
        </p>

        <CodeBlock
          language="python"
          code={`class ElectronicItem(Product):  # Inherits from Product
    def set_warranty(self, months):
        self.warranty_months = months

    def display_product(self):  # Method overriding
        base_info = super().display_product()
        return f"{base_info}\\nWarranty:{self.warranty_months} months"

class GroceryItem(Product):
    def set_expiry(self, date):
        self.expiry_date = date

# Usage
tv = ElectronicItem("Smart TV", 45000, 40000, 4.2)
tv.set_warranty(24)
print(tv.display_product())`}
        />
      </section>

      {/* 4. Multi-Level Inheritance */}
      <section>
        <h2>4. Multi-Level Inheritance</h2>
        <p>
          Multi-level inheritance occurs when a class inherits from another child
          class, forming a chain.
        </p>

        <CodeBlock
          language="python"
          code={`class SpecialElectronic(ElectronicItem):
    def display_special_offer(self):
        print("Special offer: 10% extra discount!")`}
        />
      </section>

      {/* Composition */}
      <section>
        <h2>5. Composition (HAS-A Relationship)</h2>
        <p>
          Composition represents a relationship where one class <b>contains</b>{" "}
          another class rather than inheriting from it.
        </p>

        <CodeBlock
          language="python"
          code={`class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

class Order:
    def __init__(self, order_id):
        self.order_id = order_id
        self.products = []  # HAS-A relationship

    def add_product(self, product):
        self.products.append(product)

    def total_amount(self):
        return sum(product.price for product in self.products)

# Usage
order1 = Order("ORD001")
order1.add_product(Product("Laptop", 50000))
order1.add_product(Product("Mouse", 500))
print(order1.total_amount())`}
        />
      </section>

      {/* Python Standard Library */}
      <section>
        <h2>6. Python Standard Library</h2>
        <p>
          Python provides a rich standard library that supports mathematics,
          randomness, and date-time operations.
        </p>

        <CodeBlock
          language="python"
          code={`import math
print(math.sqrt(25))

import random
print(random.randint(1, 10))

from datetime import datetime
today = datetime.now()
print(today.strftime("%d-%m-%Y"))`}
        />
      </section>

      {/* Functional Programming */}
      <section>
        <h2>7. Functional Programming Tools</h2>
        <p>
          Python supports functional programming using <b>map</b>,{" "}
          <b>filter</b>, and <b>reduce</b>.
        </p>

        <CodeBlock
          language="python"
          code={`numbers = [1, 2, 3]

squared = list(map(lambda x: x**2, numbers))
even = list(filter(lambda x: x % 2 == 0, numbers))

from functools import reduce
total = reduce(lambda x, y: x + y, numbers)`}
        />
      </section>

      {/* Scope */}
      <section>
        <h2>8. Scope & Namespaces</h2>
        <p>
          Scope defines where a variable is accessible. Python supports local,
          global, and built-in scopes.
        </p>

        <CodeBlock
          language="python"
          code={`x = 10  # Global variable

def my_function():
    y = 5  # Local variable
    print(x + y)

def modify_global():
    global x
    x += 5

my_function()
modify_global()
print(x)`}
        />
      </section>

      {/* Error Handling */}
      <section>
        <h2>9. Error Handling</h2>
        <p>
          Error handling prevents program crashes and allows graceful recovery
          using try-except blocks.
        </p>

        <CodeBlock
          language="python"
          code={`try:
    num = int(input("Enter number: "))
    result = 10 / num
    print(result)
except ValueError:
    print("Invalid number")
except ZeroDivisionError:
    print("Cannot divide by zero")
finally:
    print("Execution completed")`}
        />
      </section>

      {/* Date & Time */}
      <section>
        <h2>10. Date & Time Operations</h2>
        <p>
          Python’s datetime module allows date formatting, arithmetic, and time
          difference calculations.
        </p>

        <CodeBlock
          language="python"
          code={`from datetime import datetime, timedelta

now = datetime.now()
next_week = now + timedelta(days=7)

print(now)
print(next_week)
print((next_week - now).days)`}
        />
      </section>

      {/* Comprehensive Example */}
      <section>
        <h2>11. Comprehensive E-Commerce Example</h2>
        <p>
          This example combines inheritance, composition, and data management
          into a simple e-commerce workflow.
        </p>

        <CodeBlock
          language="python"
          code={`class ECommerceSystem:
    def __init__(self):
        self.products = []
        self.carts = {}

    def add_product(self, name, price, category):
        product = {
            "name": name,
            "price": price,
            "category": category,
            "id": len(self.products) + 1
        }
        self.products.append(product)
        return product

    def create_cart(self, user_id):
        self.carts[user_id] = Cart()
        return self.carts[user_id]

    def checkout(self, user_id):
        cart = self.carts.get(user_id)
        if cart and cart.items:
            total = cart.total_price()
            return f"Order placed! Total: ₹{total}"
        return "Cart is empty"`}
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

export default Miscellaneous_Python_Library_CheeatSheet;
