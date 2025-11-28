import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock } from "../../CodeOutputBlocks";

const Introductionto_OOP_CS_2 = ({
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
      <h1>Introduction to OOPs | Part 2 | Cheat Sheet</h1>

      {/* Similar Objects */}
      <section>
        <h2>Describing Similar Objects</h2>
        <p>
          Sometimes, objects are very similar and only their property values
          differ. For example:
        </p>

        <CodeBlock
          language="text"
          code={`Object 3: MobileProperties
camera: 13 MP
storage: 16 GB
battery life: 21 Hrs
ram: 3 GB

Object 4: MobileProperties
camera: 64 MP
storage: 128 GB
battery life: 24 Hrs
ram: 6 GB`}
        />

        <p>
          When objects have the same set of properties, we can create a{" "}
          <b>template</b>
          to describe multiple objects of the same type.
        </p>
      </section>

      {/* Mobile Template */}
      <section>
        <h2>Mobile Template</h2>
        <p>Template for similar objects:</p>

        <CodeBlock
          language="text"
          code={`Model: 
Camera: 
Storage: 
Does it have Face Unlock? Yes | No`}
        />

        <p>Filled example:</p>
        <CodeBlock
          language="text"
          code={`Model: iPhone 12 Pro
Camera: 64 MP
Storage: 128 GB
Does it have Face Unlock? Yes`}
        />
      </section>

      {/* Bundling Data */}
      <section>
        <h2>Bundling Data (Encapsulation)</h2>
        <p>
          Grouping related properties and actions together is called{" "}
          <b>Encapsulation</b>. Classes can be used to bundle data and methods
          for similar objects.
        </p>
      </section>

      {/* Defining a Class */}
      <section>
        <h2>Defining a Class</h2>
        <p>
          Use the <code>class</code> keyword. The <code>__init__</code> method
          assigns values to properties.
        </p>

        <CodeBlock
          language="python"
          code={`class Mobile:
    def __init__(self, model, camera):
        self.model = model
        self.camera = camera`}
        />

        <p>
          Properties (attributes) are the data inside the class, and actions
          (methods) define behavior.
        </p>

        <CodeBlock
          language="python"
          code={`class Mobile:
    def __init__(self, model, camera):
        self.model = model
        self.camera = camera

    def make_call(self, number):
        print("calling..")`}
        />
      </section>

      {/* Using a Class */}
      <section>
        <h2>Using a Class</h2>
        <p>
          A class is a blueprint. Instances of a class are objects with actual
          values.
        </p>

        <CodeBlock
          language="python"
          code={`mobile_obj = Mobile("iPhone 12 Pro", "12 MP")
print(mobile_obj)`}
        />

        <p>Method with arguments:</p>
        <CodeBlock
          language="python"
          code={`class Mobile:
    def __init__(self, model, camera):
        self.model = model
        self.camera = camera

    def make_call(self, number):
        print("calling..{}".format(number))

mobile_obj = Mobile("iPhone 12 Pro", "12 MP")
mobile_obj.make_call(9876543210)`}
        />
        <p>Output:</p>
        <CodeBlock language="text" code={`calling..9876543210`} />
      </section>

      {/* Multiple Instances */}
      <section>
        <h2>Multiple Instances</h2>
        <CodeBlock
          language="python"
          code={`mobile_obj1 = Mobile("iPhone 12 Pro", "12 MP")
mobile_obj2 = Mobile("Galaxy M51", "64 MP")
print(id(mobile_obj1))
print(id(mobile_obj2))`}
        />
        <p>Each object has a unique identity.</p>
      </section>

      {/* Type of Object */}
      <section>
        <h2>Type of Object</h2>
        <CodeBlock
          language="python"
          code={`obj_1 = Mobile("iPhone 12 Pro", "12 MP")
print(type(obj_1))`}
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

export default Introductionto_OOP_CS_2;
