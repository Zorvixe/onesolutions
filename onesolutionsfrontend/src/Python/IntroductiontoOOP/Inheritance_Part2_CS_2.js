import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

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
          called Composition
        </p>

        <CodeBlock
          language="python"
          code={`class Product:
    def __init__(self, name, price, deal_price, ratings):
        self.name = name
        self.price = price
        self.deal_price = deal_price
        self.ratings = ratings
        self.you_save = price - deal_price

    def display_product_details(self):
        print("Product: {}".format(self.name))
        print("Price: {}".format(self.price))
        print("Deal Price: {}".format(self.deal_price))
        print("You Saved: {}".format(self.you_save))
        print("Ratings: {}".format(self.ratings))

    def get_deal_price(self):
        return self.deal_price


class ElectronicItem(Product):
    def set_warranty(self, warranty_in_months):
        self.warranty_in_months = warranty_in_months

    def get_warranty(self):
        return self.warranty_in_months


class GroceryItem(Product):
    pass


class Order:
    def __init__(self, delivery_speed, delivery_address):
        self.items_in_cart = []
        self.delivery_speed = delivery_speed
        self.delivery_address = delivery_address

    def add_item(self, product, quantity):
        self.items_in_cart.append((product, quantity))

    def display_order_details(self):
        for product, quantity in self.items_in_cart:
            product.display_product_details()
            print("Quantity: {}".format(quantity))

    def display_total_bill(self):
        total_bill = 0
        for product, quantity in self.items_in_cart:
            price = product.get_deal_price() * quantity
            total_bill += price
        print("Total Bill: {}".format(total_bill))


milk = GroceryItem("Milk",40, 25, 3.5)
tv = ElectronicItem("TV",45000, 40000, 3.5)

order = Order("Prime Delivery", "Hyderabad")
order.add_item(milk, 2)
order.add_item(tv, 1)

order.display_order_details()
order.display_total_bill()`}
        />

        <OutputBlock
          output={[
            "Product: Milk",
            "Price: 40",
            "Deal Price: 25",
            "You Saved: 15",
            "Ratings: 3.5",
            "Quantity: 2",
            "Product: TV",
            "Price: 45000",
            "Deal Price: 40000",
            "You Saved: 5000",
            "Ratings: 3.5",
            "Quantity: 1",
            "Total Bill: 40050",
          ]}
        />

        <p>
          In the above example, we are modelling Product as attribute of Order
        </p>

        <h2>Overriding Methods</h2>
        <p>
          Sometimes, we require a method in the instances of a sub class to
          behave differently from the method in instance of a superclass.
        </p>

        <CodeBlock
          language="python"
          code={`class Product:
    def __init__(self, name, price, deal_price, ratings):
        self.name = name
        self.price = price
        self.deal_price = deal_price
        self.ratings = ratings
        self.you_save = price - deal_price

    def display_product_details(self):
        print("Product: {}".format(self.name))
        print("Price: {}".format(self.price))
        print("Deal Price: {}".format(self.deal_price))
        print("You Saved: {}".format(self.you_save))
        print("Ratings: {}".format(self.ratings))

    def get_deal_price(self):
        return self.deal_price


class ElectronicItem(Product):
    def display_product_details(self):
        self.display_product_details()
        print("Warranty {} months".format(self.warranty_in_months))

    def set_warranty(self, warranty_in_months):
        self.warranty_in_months = warranty_in_months

    def get_warranty(self):
        return self.warranty_in_months


e = ElectronicItem("Laptop",45000, 40000,3.5)
e.set_warranty(10)
e.display_product_details()`}
        />

        <OutputBlock
          output={["RecursionError: maximum recursion depth exceeded"]}
        />

        <p>
          Because <code>self.display_product_details()</code> in ElectronicItem
          class does not call the method in the superclass.
        </p>

        <h2>Super</h2>
        <h3>Accessing Super Class’s Method</h3>
        <p>
          <code>super()</code> allows us to call methods of the superclass
          (Product) from the subclass.
        </p>

        <p>
          Instead of writing and methods to access and modify warranty we can
          override <code>__init__</code>
        </p>

        <p>Let's add warranty of ElectronicItem.</p>

        <CodeBlock
          language="python"
          code={`class Product:
    def __init__(self, name, price, deal_price, ratings):
        self.name = name
        self.price = price
        self.deal_price = deal_price
        self.ratings = ratings
        self.you_save = price - deal_price

    def display_product_details(self):
        print("Product: {}".format(self.name))
        print("Price: {}".format(self.price))
        print("Deal Price: {}".format(self.deal_price))
        print("You Saved: {}".format(self.you_save))
        print("Ratings: {}".format(self.ratings))

    def get_deal_price(self):
        return self.deal_price


class ElectronicItem(Product):
    def display_product_details(self):
        super().display_product_details()
        print("Warranty {} months".format(self.warranty_in_months))

    def set_warranty(self, warranty_in_months):
        self.warranty_in_months = warranty_in_months

    def get_warranty(self):
        return self.warranty_in_months


e = ElectronicItem("Laptop",45000, 40000,3.5)
e.set_warranty(10)
e.display_product_details()`}
        />

        <OutputBlock
          output={[
            "Product: Laptop",
            "Price: 45000",
            "Deal Price: 40000",
            "You Saved: 5000",
            "Ratings: 3.5",
            "Warranty 10 months",
          ]}
        />
      </section>

      {/* Multi-Level Inheritance */}
      <section>
        <h2>Multi-Level Inheritance</h2>
        <p>
          We can inherit from a subclass. This is called{" "}
          <b>Multi-Level Inheritance</b>.
        </p>
        <p>We can continue such inheritance to any depth in Python.</p>
        <img
          src="/assets/img/Multilevel_Inheritance.png"
          alt="software"
          style={{ width: "75%", height: "400px" }}
        />
        <CodeBlock
          language="python"
          code={`class Product:
    pass

class ElectronicItem(Product):
    pass

class Laptop(ElectronicItem):
    pass`}
        />
      </section>
      <section>
        <h2>Inheritance & Composition</h2>
        <h3>When to use Inheritance?</h3>
        <p>
          Prefer modeling with inheritance when the classes have an <b>IS-A</b>{" "}
          relationship.
        </p>

        <img
          src="/assets/img/Inheritance_Is.jpg"
          alt="software"
          style={{ width: "75%", height: "400px" }}
        />

        <h3>When to use Composition?</h3>
        <p>
          Prefer modeling with composition when the classes have a <b>HAS-A</b>{" "}
          relationship.
        </p>

        <img
          src="/assets/img/Inheritance_has.jpg"
          alt="software"
          style={{ width: "75%", height: "400px" }}
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
