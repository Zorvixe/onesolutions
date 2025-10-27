import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const Objects_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Objects | Cheat Sheet</h1>

      {/* Object */}
      <section>
        <h2>Object</h2>
        <p>
          An <strong>Object</strong> is a collection of properties.{" "}
        </p>
        <p>A property is an association between a name (or key) and a value.</p>
        <p>
          <b>Example: </b> A person has name, age, city, etc.
        </p>
        <table className="cheat-table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>firstName</td>
              <td>Rahul</td>
            </tr>
            <tr>
              <td>lastName</td>
              <td>Attuluri</td>
            </tr>
            <tr>
              <td>age</td>
              <td>28</td>
            </tr>
            <tr>
              <td>city</td>
              <td>Delhi</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Creating an Object */}
      <section>
        <h2>1. Creating an Object</h2>
        <p>
          We can add properties into <code>{`{}`}</code> as{" "}
          <code>key: value</code> pairs.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="javascript"
          code={`let person = {
firstName: "Rahul",
lastName: "Attuluri",
age: 28,
};

console.log(person);  // Object {firstName: "Rahul", lastName: "Attuluri", age: 28}`}
        />
      </section>

      {/* Identifiers */}
      <section>
        <h2>1.1 Identifiers</h2>
        <p>Rules for valid identifiers:</p>
        <ul>
          <li>
            Can contain alphanumeric characters, <code>_</code> and{" "}
            <code>$</code>.
          </li>
          <li>Cannot start with a number.</li>
        </ul>
        <h3>Valid Identifiers</h3>
        <CodeBlock
          language="javascript"
          code={`const name = "John";\nconst $price = 100;\nconst _id = 1;`}
        />

        <h3>Invalid Identifiers</h3>
        <CodeBlock
          language="javascript"
          code={`const 1name = "John";  // Error\nconst first-name = "John";  // Error`}
        />
        <p>To use an invalid identifier as a key, specify it in quotes:</p>
        <CodeBlock
          language="javascript"
          code={`const obj = {\n  "first-name": "John"\n};`}
        />
      </section>

      {/* Accessing Object Properties */}
      <section>
        <h2>2. Accessing Object Properties</h2>

        <h3>2.1 Dot Notation</h3>
        <p>Use dot notation when key is a valid identifier.</p>
        <CodeBlock
          language="javascript"
          code={`console.log(person.firstName);  // Rahul`}
        />
        <CodeBlock
          language="javascript"
          code={`let person = {
  firstName: "Rahul",
  lastName: "Attuluri",
  age: 28,
  "1": "value1",
  "my choice": "value2",
  };

console.log(person.firstName);  // Rahul`}
        />
        <h3>2.2 Bracket Notation</h3>
        <CodeBlock
          language="javascript"
          code={`console.log(person["lastName"]);  // Attuluri`}
        />
        <CodeBlock
          language="javascript"
          code={`let person = {
  firstName: "Rahul",
  lastName: "Attuluri",
  age: 28,
  "1": "value1",
  "my choice": "value2",
  };

console.log(person["firstName"]);  // Rahul`}
        />

        <h3>2.3 Accessing Non-existent Properties</h3>
        <CodeBlock
          language="javascript"
          code={`console.log(person.gender);  // undefined`}
        />
        <CodeBlock
          language="javascript"
          code={`let person = {
  firstName: "Rahul",
  lastName: "Attuluri",
  age: 28,
  "1": "value1",
  "my choice": "value2",
  };

console.log(person.gender);  // undefined`}
        />

        <h3>2.4 Variable as a Key</h3>
        <CodeBlock
          language="javascript"
          code={`let person = {
  firstName: "Rahul",
  lastName: "Attuluri",
  age: 28,
  };

let a = "firstName";

console.log(person[a]);  // Rahul

console.log(person.a);  // undefined`}
        />

        <h3>2.5 Object Destructuring</h3>
        <p>
          To unpack properties from Objects, we use Object Destructuring. The
          variable name should match with the key of an object.
        </p>
        <CodeBlock
          language="javascript"
          code={`let person = {
  firstName: "Rahul",
  lastName: "Attuluri",
  age: 28,
  };

let { gender, age } = person;

console.log(gender);  // undefined

console.log(age);  // 28`}
        />
      </section>

      {/* Modifying Objects */}
      <section>
        <h2>3. Modifying Objects</h2>

        <h3>3.1 Modifying Object Property</h3>
        <p>Dot Notation:</p>
        <CodeBlock language="javascript" code={`person.age = 30;`} />
        <CodeBlock
          language="javascript"
          code={`let person = {
  firstName: "Rahul",
  lastName: "Attuluri",
  age: 28,
  };

person.firstName = "Abhi";

console.log(person.firstName);  // Abhi`}
        />
        <p>Bracket Notation:</p>
        <CodeBlock language="javascript" code={`person["city"] = "Mumbai";`} />
        <CodeBlock
          language="javascript"
          code={`let person = {
  firstName: "Rahul",
  lastName: "Attuluri",
  age: 28,
  };

person["firstName"] = "Abhi";

console.log(person["firstName"]);  // Abhi`}
        />
        <h3>3.2 Adding Object Property</h3>
        <p>Dot Notation:</p>
        <CodeBlock language="javascript" code={`person.country = "India";`} />
        <CodeBlock
          language="javascript"
          code={`et person = {
  firstName: "Rahul",
  lastName: "Attuluri",
  age: 28,
  };

person.gender = "Male";

console.log(person);  // Object {firstName: "Rahul", lastName: "Attuluri", age: 28, gender: "Male"}`}
        />
        <p>Bracket Notation:</p>
        <CodeBlock
          language="javascript"
          code={`person["profession"] = "Engineer";`}
        />
        <CodeBlock
          language="javascript"
          code={`let person = {
  firstName: "Rahul",
  lastName: "Attuluri",
  age: 28,
  };

person["gender"] = "Male";

console.log(person);  // Object {firstName: "Rahul", lastName: "Attuluri", age: 28, gender: "Male"}`}
        />
      </section>

      {/* Property Value */}
      <section>
        <h2>4. Property Value</h2>
        <p>The value of an object property can be:</p>
        <ul>
          <li>Function</li>
          <li>Array</li>
          <li>Object</li>
        </ul>

        <h3>4.1 Function as a Value (Method)</h3>
        <CodeBlock
          language="javascript"
          code={`let person = {
  firstName: "Rahul",
  lastName: "Attuluri",
  age: 28,
  run: function () {
  console.log("Start Running.");
  },
};

person.run();  // Start Running.`}
        />
        <h4>Methods:</h4>
        <p>
          A JavaScript method is a property containing a function definition.
        </p>
        <p>
          For example, in <code>document.createElement();</code>, the document
          is an Object, <b>createElement</b> is a key and{" "}
          <code>createElement()</code> is a Method.
        </p>
        <h3>4.2 Array as a Value</h3>
        <CodeBlock
          language="javascript"
          code={`let person = {
  firstName: "Rahul",
  lastName: "Attuluri",
  age: 28,
  habits: ["Playing Chess", "Singing"],
  };

console.log(person.habits);  // ["Playing Chess", "Singing"]

console.log(person.habits[0]);  // Playing Chess

console.log(person["habits"][1]);`}
        />

        <h3>4.3 Object as a Value</h3>
        <CodeBlock
          language="javascript"
          code={`let person = {
  firstName: "Rahul",
  lastName: "Attuluri",
  age: 28,
  habits: ["Playing Chess", "Singing", "Dancing"],
    car: {
      name: "Audi",
      model: "A6",
      color: "White",
      },
   };

console.log(person.car.name);  // Audi

console.log(person.car["model"]);  // A6`}
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

export default Objects_CS;
