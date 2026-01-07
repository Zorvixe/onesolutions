import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const JS_Classes_CS = ({ subtopicId, goalName, courseName, subtopic }) => {
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
      <h1>JS Classes | Cheat Sheet</h1>

      {/* 1. Class */}
      <section>
        <h2>1. Class</h2>
        <p>
          The <code>class</code> is a special type of function used for creating
          multiple objects.
        </p>

        <h3>1.1 Constructor Method</h3>
        <p>
          The <b>constructor</b> method is a special method of a class for
          creating and initializing an object of that class.
        </p>

        <b>Syntax:</b>
        <CodeBlock
          language="javascript"
          code={`class MyClass {
  constructor(property1, property2) {
    this.property1 = property1;
    this.property2 = property2;
  }
  method1() { ... }
  method2() { ... }
}`}
        />

        <h4>1.1.1 Creating a Single Object</h4>
        <b>Syntax:</b>
        <CodeBlock
          language="javascript"
          code={`class MyClass {
  constructor(property1, property2) {
    this.property1 = property1;
    this.property2 = property2;
  }
  method1() { ... }
  method2() { ... }
}
let myObject = new MyClass(property1, property2);`}
        />

        <b>Example :</b>
        <CodeBlock
          language="javascript"
          code={`class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  displayFullName() {
    return this.firstName + " " + this.lastName;
  }
}
let person1 = new Person("Virat", "Kohli");
console.log(person1);  // Person {...}`}
        />

        <h4>1.1.2 Creating Multiple Objects</h4>
        <CodeBlock
          language="javascript"
          code={`class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
let person1 = new Person("Virat", "Kohli");
let person2 = new Person("Sachin", "Tendulkar");
console.log(person1);  // Person {...}
console.log(person2);  // Person {...}`}
        />

        <h3>1.2 Prototype property of a Class</h3>
        <CodeBlock
          language="javascript"
          code={`class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  displayFullName() {
    return this.firstName + " " + this.lastName;
  }
}
let person1 = new Person("Virat", "Kohli");
console.log(Person.prototype);  // Person {...}`}
        />

        <h3>1.3 Prototype of an Instance</h3>
        <p>
          The Instance Prototype refers to the prototype object of the
          constructor function.
        </p>
        <CodeBlock
          language="javascript"
          code={`class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  displayFullName() {
    return this.firstName + " " + this.lastName;
  }
}
let person1 = new Person("Virat", "Kohli");
console.log(Object.getPrototypeOf(person1));  // Person {...}`}
        />
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>The Type of a class is a function</p>
        </div>
      </section>

      {/* 2. Inheritance in JS Classes */}
      <section>
        <h2>2. Inheritance in JS Classes</h2>
        <p>
          The <b>Inheritance</b> is a mechanism by which a class inherits
          methods and properties from another class.
        </p>

        <h3>2.1 Extends</h3>
        <p>
          The <code>extends</code> keyword is used to inherit the methods and
          properties of the superclass.
        </p>

        <h3>2.2 Super</h3>
        <p>
          Calling <code>super()</code> makes sure that{" "}
          <b>SuperClass constructor() </b>
          gets called and initializes the instance.
        </p>

        <b>Syntax :</b>
        <CodeBlock
          language="javascript"
          code={`class SuperClass {
}
class SubClass extends SuperClass{
  constructor(property1, property2){
    super(property1);
    this.property2 = property2;
  }
  method1() {  }
}
let myObject = new SubClass(property1, property2);`}
        />

        <p>
          Here, <b>SubClass</b> inherits methods and properties from a{" "}
          <b>SuperClass</b>.
        </p>

        <h3>2.3 Method Overriding</h3>
        <p>
          Here the constructor method is overridden. If we write the{" "}
          <code>SuperClass</code>
          methods in <code>SubClass</code>, it is called method overriding.
        </p>

        <b>Syntax :</b>
        <CodeBlock
          language="javascript"
          code={`class SuperClass {
}
class SubClass extends SuperClass{
  constructor(property1, property2){
    super(property1);
    this.property2 = property2;
  }
}
let myObject = new SubClass(property1, property2);`}
        />

        <b>Example :</b>
        <CodeBlock
          language="javascript"
          code={`class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    return \`\${this.name} is eating\`;
  }
  makeSound() {
    return \`\${this.name} is shouting\`;
  }
}
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  sniff() {
    return \`\${this.name} is sniffing\`;
  }
}
class Cat extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  knead() {
    return \`\${this.name} is kneading\`;
  }
}
let animal1 = new Animal("gorilla");
let someDog = new Dog("someDog", "German Shepherd");
let persianCat = new Cat("someCat", "Persian Cat");
console.log(animal1);  // Animal {...}
console.log(animal1.eat());  // gorilla is eating
console.log(someDog);  // Dog {...}
console.log(someDog.eat());  // someDog is eating 
console.log(someDog.sniff());  // someDog is sniffing
console.log(persianCat);  // Cat {...}
console.log(persianCat.knead());  // someCat is kneading
console.log(persianCat.eat());  // someCat is eating
console.log(persianCat.makeSound());  // someCat is shouting`}
        />
      </section>

      {/* 3. this in classes */}
      <section>
        <h2>3. this in Classes</h2>

        <h3>3.1 Super Class</h3>
        <p>
          In class, <code>this</code> refers to the instance object.
        </p>
        <CodeBlock
          language="javascript"
          code={`class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    return this;
  }
  makeSound() {
    return \`\${this.name} is shouting!\`;
  }
}
let animal1 = new Animal("dog");
console.log(animal1.eat());  // Animal {...}`}
        />
        <p>
          Here <code>this</code> refers to the <code>animal1</code> .
        </p>

        <h3>3.2 Sub Class</h3>
        <CodeBlock
          language="javascript"
          code={`class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    return \`\${this.name} is eating\`;
  }
}
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  sniff() {
    return this;
  }
}
let dog1 = new Dog("Tommy", "German Shepherd");
console.log(dog1.sniff());  // Dog {...}`}
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

export default JS_Classes_CS;
