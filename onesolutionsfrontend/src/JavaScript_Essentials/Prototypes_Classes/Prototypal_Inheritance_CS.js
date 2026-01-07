import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Prototypal_Inheritance_CS = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});

  // Check if subtopic is already completed
  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleAnswer = (question, option) => {
    setMcqAnswers((prev) => ({ ...prev, [question]: option }));
  };

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
      <h1>Prototypal Inheritance | Cheat Sheet</h1>

      {/* 1. Built-in Constructor Functions */}
      <section>
        <h2>1. Built-in Constructor Functions</h2>
        <p>
          These are the built-in constructor functions provided by JavaScript.
        </p>
        <ul>
          <li>
            <b>function Array()</b>
          </li>
          <li>
            <b>function Function()</b>
          </li>
          <li>function Promise()</li>
          <li>function Object()</li>
          <li>function String()</li>
          <li>function Number(), etc.</li>
        </ul>
      </section>

      {/* 2. Built-in Array Constructor Function */}
      <section>
        <h2>2. Built-in Array Constructor Function</h2>

        <h3>2.1 Default Properties and Methods</h3>
        <b>Properties:</b>
        <ul>
          <li>constructor</li>
          <li>length</li>
          <li>prototype, etc.</li>
        </ul>
        <b>Methods:</b>
        <ul>
          <li>push()</li>
          <li>pop()</li>
          <li>splice()</li>
          <li>shift(), etc.</li>
        </ul>

        <h3>
          2.2 Creating an Array with the <code>new</code> Operator (Older way of
          writing)
        </h3>
        <p>
          <b>Syntax:</b>{" "}
          <code>let myArray = new Array(item1, item2, ...);</code>
        </p>
        <CodeBlock
          language="javascript"
          code={`let myArray = new Array("a", 2, true);
myArray.push("pen");
console.log(myArray);  // Array (4)["a", 2, true, "pen"]
console.log(myArray.length);  // 4`}
        />
      </section>

      {/* 3. Prototype Property */}
      <section>
        <h2>3. Prototype Property</h2>
        <p>
          The Prototype property will be <b>shared</b> across all the{" "}
          <b>instances</b> of their constructor function.
        </p>

        <h3>3.1 Accessing the Prototype of a Constructor Function</h3>
        <CodeBlock
          language="javascript"
          code={`console.log(Array.prototype);`}
        />

        <h3>3.2 Accessing the shared Prototype of an Instance</h3>
        <CodeBlock
          language="javascript"
          code={`let myArray = new Array("a", 2, true);
console.log(Object.getPrototypeOf(myArray));`}
        />

        <h3>3.3 Prototypal Inheritance</h3>
        <p>
          On calling the <code>new()</code> operator, all the properties and
          methods defined on the <code>prototype</code> will become accessible
          to the instance objects. This process is called{" "}
          <b>Prototypal Inheritance</b>.
        </p>
      </section>

      {/* 4. Built-in Function Constructor Function */}
      <section>
        <h2>4. Built-in Function Constructor Function</h2>

        <h3>4.1 Default Properties and Methods</h3>
        <b>Properties:</b>
        <ul>
          <li>name</li>
          <li>length</li>
          <li>constructor</li>
          <li>prototype, etc.</li>
        </ul>
        <b>Methods:</b>
        <ul>
          <li>apply()</li>
          <li>bind()</li>
          <li>call()</li>
          <li>toString(), etc.</li>
        </ul>

        <h3>
          4.2 Creating a Function with the <code>new</code> Operator (Older way
          of writing)
        </h3>
        <p>
          Syntax:{" "}
          <code>
            let myFunction = new Function("param1, param2, ...", function body);
          </code>
        </p>
        <CodeBlock
          language="javascript"
          code={`let Car = new Function("color, brand", 
  \`this.color = color;   
    this.brand = brand;   
    this.start = function() {     
      console.log("started");  
    };\`
);
console.log(Function.prototype);`}
        />
      </section>

      {/* 5. Instance Specific and Prototype Properties */}
      <section>
        <h2>5. Instance Specific and Prototype Properties</h2>

        <h3>5.1 Prototype Properties/ Methods</h3>
        <p>
          The Prototype Properties/ Methods are the properties or methods common
          across the instance objects.
        </p>
        <b>Examples:</b>
        <ul>
          <li>calculateAge</li>
          <li>displayGreetings</li>
          <li>displayProfileDetails</li>
          <li>calculateIncome</li>
        </ul>

        <h4>5.1.1 Adding a Method to the prototype</h4>
        <CodeBlock
          language="javascript"
          code={`function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
Person.prototype.displayFullName = function() {
  return this.firstName + " " + this.lastName;
};
let person1 = new Person("Virat", "Kohli");
let person2 = new Person("Sachin", "Tendulkar");
console.log(Object.getPrototypeOf(person1) === Object.getPrototypeOf(person2));`}
        />

        <h3>5.2 Instance Specific Properties/ Methods</h3>
        <p>
          The Instance Specific Properties/ Methods are the properties or
          methods specific to the instance object.
        </p>
        <b>Examples:</b>
        <ul>
          <li>gender</li>
          <li>yearOfBirth</li>
          <li>friendsList</li>
          <li>name</li>
        </ul>
        <CodeBlock
          language="javascript"
          code={`function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.displayFullName = function() {
  return this.firstName + " " + this.lastName;
};

let person1 = new Person("Virat", "Kohli");
console.log(Object.getOwnPropertyNames(person1));`}
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

export default Prototypal_Inheritance_CS;
