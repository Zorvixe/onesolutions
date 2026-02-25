import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Attributes_Methods_CS_4 = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      <h1>Attributes & Methods | Cheat Sheet</h1>

      {/* Shopping Cart Example */}
      <section>
        <h2>Shopping Cart Example</h2>
        <ul>
          <li>Users can add different items to their shopping cart and checkout.</li>
          <li>The total value of the cart should be more than a minimum amount (Rs. 100/-) for the checkout.</li>
          <li>During Offer Sales, all users get a flat discount on their cart and the minimum cart value will be Rs. 200/-.</li>
        </ul>
      </section>

      {/* Attributes */}
      <section>
        <h2>Attributes</h2>
        <p>Broadly, attributes can be categorized as:</p>
        <ul>
          <li>Instance Attributes</li>
          <li>Class Attributes</li>
        </ul>

        <h3>Instance Attributes</h3>
        <p>
          Attributes whose value can differ for each instance of class. Example:
          Items in Cart
        </p>

        <h3>Class Attributes</h3>
        <p>
          Attributes whose values stay common for all objects. Example: Minimum
          Cart Bill, Flat Discount
        </p>

        <h3>Accessing Instance Attributes</h3>
        <CodeBlock
          language="python"
          code={`class Cart:
    flat_discount = 0
    min_bill = 100
    def __init__(self):
        self.items = {}

    def add_item(self, item_name, quantity):
        self.items[item_name] = quantity

    def display_items(self):
        print(items)

a = Cart()
a.display_items()`}
        />
        <OutputBlock output={["NameError: name 'items' is not defined"]} />

        <p>
          Instance attributes can only be accessed using the instance of class.
        </p>

        <h3>Using self</h3>
        <CodeBlock
          language="python"
          code={`class Cart:
    flat_discount = 0
    min_bill = 100
    def __init__(self):
        self.items = {}

    def add_item(self, item_name, quantity):
        self.items[item_name] = quantity

    def display_items(self):
        print(self.items)

a = Cart()
a.add_item("book", 3)
a.display_items()`}
        />
        <OutputBlock output={["{'book': 3}"]} />

        <h3>Accessing Class Attributes</h3>
        <p>Example:</p>
        <CodeBlock
          language="python"
          code={`class Cart:
    flat_discount = 0
    min_bill = 100

print(Cart.min_bill)`}
        />
        <OutputBlock output={["100"]} />

        <h3>Updating Class Attributes</h3>
        <CodeBlock
          language="python"
          code={`class Cart:
    flat_discount = 0
    min_bill = 100

    def print_min_bill(self):
        print(Cart.min_bill)

a = Cart()
b = Cart()
Cart.min_bill = 200
print(a.print_min_bill())
print(b.print_min_bill())`}
        />
        <OutputBlock output={["200", "200"]} />
      </section>

      {/* Methods */}
      <section>
        <h2>Methods</h2>
        <p>Broadly, methods can be categorized as:</p>
        <ul>
          <li>Instance Methods</li>
          <li>Class Methods</li>
          <li>Static Methods</li>
        </ul>

        <h3>Instance Methods</h3>
        <p>
          Instance methods can access all attributes of the instance and have{" "}
          <code>self</code> as parameter.
        </p>
        <CodeBlock
          language="python"
          code={`class Cart:
    def __init__(self):
        self.items = {}

    def add_item(self, item_name, quantity):
        self.items[item_name] = quantity

    def display_items(self):
        print(self.items)

a = Cart()
a.add_item("book", 3)
a.display_items()`}
        />
        <OutputBlock output={["{'book': 3}"]} />

        <h3>Class Methods</h3>
        <p>
          Methods that access class attributes but not instance attributes. Use{" "}
          <code>cls</code> as parameter and decorate with{" "}
          <code>@classmethod</code>.
        </p>
        <CodeBlock
          language="python"
          code={`class Cart:
    flat_discount = 0
    min_bill = 100

    @classmethod
    def update_flat_discount(cls, new_flat_discount):
        cls.flat_discount = new_flat_discount

Cart.update_flat_discount(25)
print(Cart.flat_discount)`}
        />
        <OutputBlock output={["25"]} />

        <h3>Static Methods</h3>
        <p>
          Methods that don’t need access to instance or class attributes.
          Decorate with <code>@staticmethod</code>.
        </p>
        <CodeBlock
          language="python"
          code={`class Cart:
    @staticmethod
    def greet():
        print("Have a Great Shopping")

Cart.greet()`}
        />
        <OutputBlock output={["Have a Great Shopping"]} />

        <h3>Overview of Methods</h3>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Instance Methods</th>
              <th>Class Methods</th>
              <th>Static Methods</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>self as parameter</td>
              <td>cls as parameter</td>
              <td>No cls or self as parameters</td>
            </tr>
            <tr>
              <td>No decorator required</td>
              <td>Need decorator @classmethod</td>
              <td>Need decorator @staticmethod</td>
            </tr>
            <tr>
              <td>Accessed through object (instance)</td>
              <td>Accessed through class</td>
              <td>Accessed through class</td>
            </tr>
          </tbody>
        </table>
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

export default Attributes_Methods_CS_4;
