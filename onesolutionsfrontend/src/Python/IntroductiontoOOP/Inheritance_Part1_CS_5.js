import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Inheritance_Part1_CS_5 = ({
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
      <h1>Inheritance | Cheat Sheet</h1>

      {/* Products */}
      <section>
        <h2>Products</h2>
        <p>
          Let's model an e-commerce site having different products like
          Electronics, Kids Wear, Grocery, etc.
        </p>
      </section>

      {/* Electronic Item */}
      <section>
        <h2>Electronic Item</h2>
        <p>Few attributes & methods for an Electronic product:</p>
        <img
          src="/assets/img/Electronic_Item.png"
          alt="software"
          style={{ width: "85%", height: "400px" }}
        />
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
        <img
          src="/assets/img/Grocerys_Item.png"
          alt="software"
          style={{ width: "85%", height: "400px" }}
        />
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
        <h2>Common Attributes & Methods</h2>
        <p>
          All these products Electronics, Kids Wear, Grocery etc.. have few
          common attributes & methods.
        </p>
        <img
          src="/assets/img/Electronic_Grocerys.png"
          alt="software"
          style={{ width: "85%", height: "450px" }}
        />
        <h2>Specific Attributes & Methods</h2>
        <p>Also, each product has specific attributes & methods of its own.</p>
        <img
          src="/assets/img/Specific_Attribute.png"
          alt="software"
          style={{ width: "85%", height: "450px" }}
        />
        <h2>Electronic & Grocery Items</h2>
        <p>
          Electronic Item & Grocery Item will have all attributes & methods
          which are common to all products.
        </p>
        <p>Lets Separate the common attributes & methods as Product</p>
        <img
          src="/assets/img/prod_Ele_Gro.jpg"
          alt="software"
          style={{ width: "95%", height: "450px" }}
        />
        <h2>Modelling Classes</h2>

        <img
          src="/assets/img/prod_Ele_Gro_2.jpg"
          alt="software"
          style={{ width: "95%", height: "450px" }}
        />
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
          Inheritance is a mechanism by which a class inherits attributes and
          methods from another class.
        </p>
        <p>
          With Inheritance, we can have <code>ElectronicItem</code> inherit the
          attributes & methods from <code>Product</code> instead of defining
          them again.
        </p>
        <p>
          Product is Super/Base/Parent Class and ElectronicItem is
          Sub/Derived/Child Class.
        </p>
        <img
          src="/assets/img/Ele_Gro_Pro.jpg"
          alt="software"
          style={{ width: "95%", height: "450px" }}
        />
      </section>

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
        self.you_save = price - deal_price

    def display_product_details(self):
        print("Product: {}".format(self.name))
        print("Price: {}".format(self.price))
        print("Deal Price: {}".format(self.deal_price))
        print("You Saved: {}".format(self.you_save))
        print("Ratings: {}".format(self.ratings))

p = Product("Shoes",500, 250, 3.5)
p.display_product_details()`}
        />

        <OutputBlock
          output={[
            "Product: Shoes",
            "Price: 500",
            "Deal Price: 250",
            "You Saved: 250",
            "Ratings: 3.5",
          ]}
        />

        <h2>Sub Class</h2>
        <p>
          The subclass automatically inherits all the attributes & methods from
          its superclass.
        </p>

        <h3>Example 1</h3>
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

class ElectronicItem(Product):
    pass

class GroceryItem(Product):
    pass

e = ElectronicItem("TV",45000, 40000, 3.5)
e.display_product_details()`}
        />

        <OutputBlock
          output={[
            "Product: TV",
            "Price: 45000",
            "Deal Price: 40000",
            "You Saved: 5000",
            "Ratings: 3.5",
          ]}
        />

        <h3>Example 2</h3>
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

class ElectronicItem(Product):
    pass

class GroceryItem(Product):
    pass

e = GroceryItem("milk", 25, 20, 3)
e.display_product_details()`}
        />

        <OutputBlock
          output={[
            "Product: milk",
            "Price: 25",
            "Deal Price: 20",
            "You Saved: 5",
            "Ratings: 3",
          ]}
        />

        <h3>Example 3</h3>
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

class ElectronicItem(Product):
    def set_warranty(self, warranty_in_months):
        self.warranty_in_months = warranty_in_months

    def get_warranty(self):
        return self.warranty_in_months

e = ElectronicItem("TV",45000, 40000, 3.5)
e.set_warranty(24)
print(e.get_warranty())`}
        />

        <OutputBlock output={["24"]} />

        <h2>Super Class & Sub Class</h2>
        <p>
          Superclass cannot access the methods and attributes of the subclass.
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

class ElectronicItem(Product):
    def set_warranty(self, warranty_in_months):
        self.warranty_in_months = warranty_in_months

    def get_warranty(self):
        return self.warranty_in_months

p = Product("TV",45000, 40000, 3.5)
p.set_warranty(24)`}
        />

        <OutputBlock
          output={[
            "AttributeError: 'Product' object has no attribute 'set_warranty'",
          ]}
        />

        <h2>Sub Class Method</h2>

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

class ElectronicItem(Product):
    def set_warranty(self, warranty_in_months):
        self.warranty_in_months = warranty_in_months

    def get_warranty(self):
        return self.warranty_in_months

e = ElectronicItem("TV",45000, 40000, 3.5)
e.set_warranty(24)
e.display_product_details()`}
        />

        <OutputBlock
          output={[
            "Product: TV",
            "Price: 45000",
            "Deal Price: 40000",
            "You Saved: 5000",
            "Ratings: 3.5",
          ]}
        />

        <h2>Calling Super Class Method</h2>
        <p>
          We can call methods defined in superclass from the methods in the
          subclass.
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

class ElectronicItem(Product):
    def set_warranty(self, warranty_in_months):
        self.warranty_in_months = warranty_in_months

    def get_warranty(self):
        return self.warranty_in_months

    def display_electronic_product_details(self):
        self.display_product_details()
        print("Warranty {} months".format(self.warranty_in_months))

e = ElectronicItem("TV",45000, 40000, 3.5)
e.set_warranty(24)
e.display_electronic_product_details()`}
        />

        <OutputBlock
          output={[
            "Product: TV",
            "Price: 45000",
            "Deal Price: 40000",
            "You Saved: 5000",
            "Ratings: 3.5",
            "Warranty 24 months",
          ]}
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

export default Inheritance_Part1_CS_5;
