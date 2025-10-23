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
        <p>Example: A person has name, age, city, etc.</p>
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
          Properties can be added inside <code>{`{}`}</code> as key: value
          pairs.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="javascript"
          code={`const person = {\n  firstName: "Rahul",\n  lastName: "Attuluri",\n  age: 28,\n  city: "Delhi"\n};`}
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

        <h3>2.2 Bracket Notation</h3>
        <CodeBlock
          language="javascript"
          code={`console.log(person["lastName"]);  // Attuluri`}
        />

        <h3>2.3 Accessing Non-existent Properties</h3>
        <CodeBlock
          language="javascript"
          code={`console.log(person.gender);  // undefined`}
        />

        <h3>2.4 Variable as a Key</h3>
        <CodeBlock
          language="javascript"
          code={`const key = "city";\nconsole.log(person[key]);  // Delhi`}
        />

        <h3>2.5 Object Destructuring</h3>
        <CodeBlock
          language="javascript"
          code={`const { firstName, age } = person;\nconsole.log(firstName); // Rahul\nconsole.log(age);       // 28`}
        />
      </section>

      {/* Modifying Objects */}
      <section>
        <h2>3. Modifying Objects</h2>

        <h3>3.1 Modifying Object Property</h3>
        <p>Dot Notation:</p>
        <CodeBlock language="javascript" code={`person.age = 30;`} />
        <p>Bracket Notation:</p>
        <CodeBlock language="javascript" code={`person["city"] = "Mumbai";`} />

        <h3>3.2 Adding Object Property</h3>
        <p>Dot Notation:</p>
        <CodeBlock language="javascript" code={`person.country = "India";`} />
        <p>Bracket Notation:</p>
        <CodeBlock
          language="javascript"
          code={`person["profession"] = "Engineer";`}
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
          code={`const person = {\n  firstName: "Rahul",\n  greet: function() {\n    console.log("Hello " + this.firstName);\n  }\n};\nperson.greet();  // Hello Rahul`}
        />

        <h3>4.2 Array as a Value</h3>
        <CodeBlock
          language="javascript"
          code={`const person = {\n  firstName: "Rahul",\n  hobbies: ["Reading", "Coding"]\n};\nconsole.log(person.hobbies[0]); // Reading`}
        />

        <h3>4.3 Object as a Value</h3>
        <CodeBlock
          language="javascript"
          code={`const person = {\n  firstName: "Rahul",\n  address: {\n    city: "Delhi",\n    pin: 110001\n  }\n};\nconsole.log(person.address.city); // Delhi`}
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
