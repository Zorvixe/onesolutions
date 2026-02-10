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
          Inheritance is used when multiple classes share common properties and
          behavior. Instead of writing the same code again, we create a parent
          class and reuse it in child classes.
        </p>
        <p>This makes programs easier to maintain, extend, and understand.</p>
        <ul>
          <li>Common attributes: name, price</li>
          <li>Specific attributes: warranty, expiry date</li>
          <li>Reduces code duplication</li>
          <li>Makes systems easy to extend</li>
        </ul>
      </section>

      {/* 2. Base Class */}
      <section>
        <h2>2. Base / Parent Class</h2>
        <p>
          A parent (base) class contains common attributes and methods that are
          shared by multiple child classes.
        </p>
        <p>
          In this example, the <b>Product</b> class stores general product
          details like price and ratings.
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
          Child classes inherit properties and methods from the parent class.
          They can also add new features or override existing behavior.
        </p>
        <p>
          Here, electronic and grocery products reuse product details but add
          their own specific information.
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
          Multi-level inheritance occurs when a class is derived from another
          child class, forming a chain of inheritance.
        </p>
        <p>Each level adds more functionality to the existing class.</p>

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
          Composition represents a <b>HAS-A</b> relationship where one class
          contains objects of another class.
        </p>
        <p>
          This approach is more flexible than inheritance and promotes better
          design.
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
          Python provides built-in modules that help perform common tasks
          without writing extra code.
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
          Python supports functional programming concepts such as map, filter,
          and reduce to process data efficiently.
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
          Error handling allows programs to manage runtime errors without
          crashing and improves user experience.
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
          Python provides powerful tools to work with dates and time, including
          formatting and date calculations.
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
          This example combines multiple concepts like classes, inheritance,
          collections, and methods into a real-world application.
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
