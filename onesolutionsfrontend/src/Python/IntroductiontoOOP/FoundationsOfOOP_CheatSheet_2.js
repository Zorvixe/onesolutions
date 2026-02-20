import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const FoundationsOfOOP_CheatSheet_2 = ({
  subtopicId,
  goalName,
  courseName,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if already completed
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
    } catch (error) {
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="intro-container">
      <h1>Foundations of Object-Oriented Programming | Cheat Sheet 2</h1>

    

      {/* Part 2 */}
      <section>
        <h2>Practical Implementation</h2>
      </section>

      {/* Attributes & Methods */}
      <section>
        <h2>1. Attributes and Methods</h2>
        <p><b>Shopping Cart Scenario</b></p>
          <ul>
            <li>Users can add items and checkout</li>
            <li>Minimum cart value → Rs.100</li>
            <li>During offers → Flat discount & Min bill → Rs.200</li>
          </ul>
                  
          <h3>Types of Attributes</h3>

        <h4>1. Instance Attributes</h4>
        <p>Value differs for each object.</p>
        <p><b>Example:</b> Items in cart</p>

        <h4>2. Class Attributes</h4>
        <p>Common for all objects.</p>
        <p><b>Examples:</b> Minimum bill, Flat discount</p>

    </section>

              <section>
            <h3>Accessing Instance Attributes</h3>

            <p><b>Using self (Recommended)</b></p>

            <CodeBlock
              language="python"
              code={`class Cart:
              def __init__(self):
                  self.items = {}

              def add_item(self, name, qty):
                  self.items[name] = qty

              def display_items(self):
                  print(self.items)`}
            />

        <div className="Note-container">
            <div className="icon-note">
              <h6>
                <i class="bi bi-journal-text"></i>Note
              </h6>
            </div>
              <p>Instance attributes must be accessed using the object or self.</p>
            </div>
          </section>

          <section>
            <h3>Accessing Class Attributes</h3>

            <CodeBlock
              language="python"
              code={`class Cart:
              flat_discount = 0
              min_bill = 100

          print(Cart.min_bill)`}
            />

            <h4>Updating Class Attribute</h4>

            <CodeBlock
              language="python"
              code={`Cart.min_bill = 200`}
            />
          </section>

          <section>
            <h3>Types of Methods</h3>
            <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
              <thead>
                <tr>
                  <th>Instance Method</th>
                  <th>Class Method</th>
                  <th>Static Method</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Works with instance data</td>
                  <td>Works with class data</td>
                  <td>Utility function</td>
                </tr>
                <tr>
                  <td>self parameter</td>
                  <td>cls parameter</td>
                  <td>No self / cls</td>
                </tr>
                <tr>
                  <td>No decorator</td>
                  <td>@classmethod</td>
                  <td>@staticmethod</td>
                </tr>
                <tr>
                  <td>Called using object</td>
                  <td>Called using class</td>
                  <td>Called using class</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h3>Instance Method</h3>

            <CodeBlock
              language="python"
              code={`class Cart:
              def __init__(self):
                  self.items = {}

              def add_item(self, name, qty):
                  self.items[name] = qty`}
            />
          </section>

          <section>
            <h3>Class Method</h3>

            <CodeBlock
              language="python"
              code={`class Cart:
              flat_discount = 0

              @classmethod
              def update_discount(cls, value):
                  cls.flat_discount = value`}
            />
          </section>

          <section>
            <h3>Static Method</h3>

            <CodeBlock
              language="python"
              code={`class Cart:
              @staticmethod
              def greet():
                  print("Have a Great Shopping")`}
            />
          </section>

          <section>
          <h2>2.Inheritance</h2>

            <h3>Products Example</h3>
            <p>
              E-commerce site has different product types like Electronics, Grocery, Kids
              Wear etc.
            </p>

            <ul>
              <li>All products have some <b>common attributes & methods</b></li>
              <li>Each product has some <b>specific attributes & methods</b></li>
            </ul>

            <p>
              Common features are moved to a <b>Parent Class (Product)</b> and reused by
              child classes.
            </p>

            <h3>Advantages</h3>
            <ul>
              <li>Reusability</li>
              <li>Clear separation</li>
              <li>Well organized code</li>
            </ul>
            </section>

            <section>
            <h3>Definition</h3>
            <p>
              Inheritance is a mechanism where a class acquires the attributes and methods
              of another class.
            </p>

            <ul>
              <li><b>Product → Parent / Super / Base class</b></li>
              <li><b>ElectronicItem → Child / Sub / Derived class</b></li>
            </ul>
            </section>

            <section>
            <h3>Super Class</h3>

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
                  print("Product:", self.name)
                  print("Price:", self.price)
                  print("Deal Price:", self.deal_price)
                  print("You Saved:", self.you_save)
                  print("Ratings:", self.ratings)`}
            />
            </section>

            <section>
            <h3>Sub Class (Child Class)</h3>

            <p>Child class automatically gets all parent properties & methods.</p>

            <CodeBlock
              language="python"
              code={`class ElectronicItem(Product):
              def set_warranty(self, months):
                  self.warranty = months`}
            />
            </section>

            <section>
            <h3>Using Child Class</h3>

            <CodeBlock
              language="python"
              code={`tv = ElectronicItem("TV", 45000, 40000, 3.5)
            tv.set_warranty(24)
            tv.display_product_details()
            print("Warranty", tv.warranty, "months")`}
            />
            </section>

            <section>
            <h3>Important Rule</h3>

            <ul>
              <li>Child class can access parent class methods ✅</li>
              <li>Parent class cannot access child class methods ❌</li>
            </ul>

            <CodeBlock
              language="python"
              code={`p = Product("Shoes", 500, 250, 4)
            p.set_warranty(12)   # ❌ Error`}
            />
            </section>

            <section>
            <h3>Calling Parent Class Method</h3>

            <CodeBlock
              language="python"
              code={`class ElectronicItem(Product):
              def set_warranty(self, months):
                  self.warranty = months

              def display_details(self):
                  super().display_product_details()
                  print("Warranty", self.warranty, "months")`}
            />
            </section>

            <section>
          <h2>3.Inheritance – Part 2</h2>

          <h3>Designing Order with Multiple Products</h3>
          <p>
            To place an order with multiple products, we model <b>Product as an
            attribute of Order</b>.
          </p>
        </section>

        <section>
          <h3>Composition</h3>
          <p>
            Modelling instances of one class as attributes of another class is called
            <b>Composition</b>.
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
                print("Product:", self.name)`}
          />

          <p>
            In this approach, an <b>Order HAS-A Product</b>.
          </p>

          <p><b>Output includes:</b></p>
          <ul>
            <li>Product details</li>
            <li>Quantity</li>
            <li>Total bill</li>
          </ul>
        </section>

        <section>
          <h3>4.Method Overriding</h3>
          <p>
            Sometimes a child class method must behave differently than the parent
            class method. This is called <b>Method Overriding</b>.
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
              return self.warranty_in_months`}
          />

             <div className="Note-container">
                    <div className="icon-note">
                      <h6>
                        <i class="bi bi-journal-text"></i>Note
                      </h6>
                    </div>
            <p>
              Calling <code>self.display_product_details()</code> inside the same child
              method without using <code>super()</code> causes
              <b> RecursionError</b>.
            </p>
          </div>
        </section>

        <section>
          <h3>super()</h3>
          <p>
            <code>super()</code> is used to access the superclass methods from the
            subclass.
          </p>

          <p>
            It is also used to extend the <code>__init__</code> method instead of
            rewriting it.
          </p>

          <CodeBlock
            language="python"
            code={`class ElectronicItem(Product):
            def __init__(self, name, price, deal_price, ratings, warranty):
                super().__init__(name, price, deal_price, ratings)
                self.warranty = warranty`}
          />

          <p><b>Output:</b></p>
          <ul>
            <li>Product details</li>
            <li>Warranty months</li>
          </ul>
        </section>

        <section>
          <h3>5.MultiLevel Inheritance</h3>

          <p>
            A class can inherit from another child class. This is called
            <b> MultiLevel Inheritance</b>.
          </p>

          <img
          src="/assets/img/multi-level.png"
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

          <p>Inheritance can continue to any depth in Python.</p>
        </section>

        <section>
          <h3>Inheritance vs Composition</h3>

          <p><b>When to use Inheritance?</b></p>
          <p>Use when there is an <b>IS-A relationship</b>.</p>

          <p>Example:</p>
          <p>Laptop <b>IS-A</b> ElectronicItem</p>

          <p><b>When to use Composition?</b></p>
          <p>Use when there is a <b>HAS-A relationship</b>.</p>

          <p>Example:</p>
          <p>Order <b>HAS-A</b> Product</p>
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

export default FoundationsOfOOP_CheatSheet_2;
