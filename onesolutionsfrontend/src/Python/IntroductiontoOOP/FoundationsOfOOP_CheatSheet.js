import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const FoundationsOfOOP_CheatSheet = ({ subtopicId, goalName, courseName }) => {
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
      <h1>Foundations of Object-Oriented Programming | Cheat Sheet</h1>

      {/* 1. What is Software */}
      <section>
        <h2>1. What is Software?</h2>
        <p>
        Software is an easily changeable tool/product that performs a specific task.
        The ease of making changes to software is called <b>softness</b>.
        </p>
        <img
          src="/assets/img/software.png"
          alt="software"
          style={{ width: "90%", height: "300px" }}
        />

       <p><b>A good software should:</b></p>
        <ul>
          <li>Keep users happy by delivering what they need</li>
          <li>Be easy to understand and modify</li>
          <li>Be easy to fix bugs</li>
          <li>Allow adding new features within scope</li>
        </ul>
       <p>
      <b>Object-Oriented Programming System (OOPS)</b> is a way of approaching,
      designing, and developing software that is easy to change.
    </p>
    <div className="Note-container">
    <div className="icon-note">
      <h6>
        <i class="bi bi-journal-text"></i>Note
      </h6>
    </div>
    <p>
      Building software is different from solving coding problems. In coding
      problems, once the solution is complete, we move to the next problem.
      But in software development, we keep working on the same code for a long
      time to add new features and fix bugs.
    </p>
    <p>
      Therefore, <b>code readability</b> and <b>code maintainability</b> become
      very important.
    </p>

    <p>
      The techniques and concepts in OOP are developed based on developers’
      experience to make code easier to understand and modify.
    </p>
  </div>

  
      </section>

      {/* 2. Why OOP */}
      <section>
        <h2>2. Why OOP?</h2>
        <p>
          Object-Oriented Programming models software after{" "}
          <b>real-life objects</b> and their interactions.
        </p>
        <p>Proper usage of OOP helps build:</p>
        <ul>
          <li>Well-organized systems</li>
          <li>Extendable systems</li>
          <li>Maintainable code</li>
        </ul>
      </section>

      {/* 3. Describing Real-Life Objects */}
      <section>
        <h2>3. Describing Real-Life Objects</h2>
        <p>
    In Object-Oriented Programming, we model software after real-life objects.
    To do this effectively, we should be able to describe them properly.
      </p>
      <p>Let us try describing these real-life objects</p>
      <img
          src="/assets/img/oop.png"
          alt="software"
          style={{ width: "75%", height: "400px" }}
        />
        <ul>
          <li>Object 1 = Car</li>
         <li>Object 2 = DOG</li>
        </ul>
       
       <p>The following description is a bad way of describing, as the information of an object scattered and unorganized</p>
        <CodeBlock
          language="text"
          code={`Object 1 is a car and it has four tyres.
          Object 2 is a dog and it has four legs. 
          Object 1 has four doors. 
          Object 1 can make sound. 
          Object 2, barks.
          Object 1 is in blue color. 
          Object 2 is in brown c`}
        />

        <h3>Good way of describing(Organized)</h3>
        <CodeBlock
          language="text"
          code={`Object 1 is a car and it has four tyres.
          Object 1 has four doors.
          Object 1 can make sound.
          Object 1 is in blue color.
          
          Object 2 is a dog and it has four legs. 
          Object 2, barks. 
          Object 2 is in brown `}
        />
     
     <h3>In the below approach, we further organize the information into</h3>
     <ul>
      <li>What the object is?</li>
      <li>What the object has?</li>
      <li>What the object can do?</li>
      </ul>
      <CodeBlock
          language="text"
          code={`Object 1 is a car
          Object 1 has
            Four tyres
            Four seats
            Four doors
            and so on ...
            
          Object 1 can
            Sound horn
            Move
            Accelerate
            and so on ...
          
          
          Object 2 is a dog
          Object 2 has
            Brown fur
            Four legs
            Two ears
            and so on ...
            
          Object 2 can
            Bark
            Jump
            Run
            and so on ..`}
        />
        <h3>Organized Description Should Have</h3>

        <ul>
          <li>A clear separation of objects</li>
          <li>A clear grouping of what an object has and what it does</li>
        </ul>
      </section>

      {/* 4. Creating Templates */}
      <section>
        <h2>4. Creating Templates for Similar Objects</h2>
        <p>
          When objects have the <b>same properties</b> but different values:
        </p>
        <img
          src="/assets/img/similar-obj.png"
          alt="software"
          style={{ width: "100%", height: "400px" }}
        />

        <h3>Similar Mobile Objects</h3>
        <CodeBlock
            language="text"
            code={`Object 3 is a Mobile
Properties
          camera : 13 MP
          storage : 16 GB
          battery life : 21 Hrs
          ram : 3 GB
          and so on ...
            
  Object 4 is a Mobile
  Properties
        camera : 64 MP
        storage : 128 GB
        battery life : 64 Hrs
        ram : 6 GB
        and so on ...`}
          />

        <p>
          <b>Solution</b>: Create a <b>template / blueprint</b> called a{" "}
          <b>Class</b>.
        </p>
      </section>

      {/* 5.Classes and Objects<*/}
      <section>
        <h2>5.Classes and Objects</h2>
              <h3>Attributes of an Object</h3>
        <p>
          Attributes can be set or accessed using the <b>.</b> (dot) character.
        </p>
        <h3>Defining a Class</h3>
        <CodeBlock
          language="python"
          code={`class Mobile:
    def __init__(self, model, camera):
        self.model = model      # Attribute
        self.camera = camera    # Attribute

    def make_call(self, number):  # Method
        print(f"Calling {number}...")`}
        />
      </section>

      {/* 6. Creating Objects */}
      <section>
        <h2>6. Creating Objects from Classes</h2>
        <CodeBlock
          language="python"
          code={`# Creating objects (instances)
mobile1 = Mobile("iPhone 12 Pro", "12 MP")
mobile2 = Mobile("Galaxy M51", "64 MP")

# Each object has unique identity
print(id(mobile1))
print(id(mobile2))

# Using methods
mobile1.make_call(9876543210)`}
        />
      </section>

      {/* Shopping Cart */}
      <section>
        <h2>Real-World Example: Shopping Cart</h2>
        <p>The features a cart should have</p>
        <ul>
          <li>can add an item</li>
          <li>can remove an item from cart</li>
          <li>update quantity of an item</li>
          <li>to show list of items in cart</li>
          <li>to show total price for the items in the cart</li>
        </ul>
        <CodeBlock
          language="python"
          code={`class Cart:
          def __init__(self):
              self.items = {}
              self.price_details = {"book": 500, "laptop": 30000}
      
          def add_item(self, item_name, quantity):
              self.items[item_name] = quantity
      
          def remove_item(self, item_name):
              del self.items[item_name]
      
          def update_quantity(self, item_name, quantity):
              self.items[item_name] = quantity
      
          def get_cart_items(self):
              cart_items = list(self.items.keys())
              return cart_items
      
          def get_total_price(self):
              total_price = 0
              for item, quantity in self.items.items():
                  total_price += quantity * self.price_details[item]
              return total_price
      
      
      cart_obj = Cart()
      cart_obj.add_item("book", 3)
      cart_obj.add_item("laptop", 1)
      print(cart_obj.get_total_price())
      cart_obj.remove_item("laptop")
      print(cart_obj.get_cart_items())
      cart_obj.update_quantity("book", 2)
      print(cart_obj.get_total_price())`}
        />
          <p><b>Output</b></p>
  <CodeBlock language="text" code={`31500
['book']
1000`} />
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

export default FoundationsOfOOP_CheatSheet;
