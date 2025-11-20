import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const More_Modern_JS_Concepts_CS_3 = ({
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
      <h1>More Modern JS Concepts | Part 3 | Cheat Sheet</h1>

      {/* 1. this */}
      <section>
        <h2>1. this</h2>
        <p>
          The <code>this</code> is determined in three ways.
        </p>
        <ul>
          <li>
            In Object methods, it refers to the object that is executing the
            current function.
          </li>
          <li>
            In Regular functions, it refers to the <code>window</code> object.
          </li>
          <li>
            In Arrow functions, it refers to the context in which the code is
            defined.
          </li>
        </ul>

        <h3>
          1.1 <code>this</code> in Object Methods
        </h3>
        <CodeBlock
          language="javascript"
          code={`let car = {
  color: "blue",
  brand: "Audi",
  start: function() {
    console.log(this);  // Object { color: "blue", brand: "Audi", start: ƒ() }
  }
};
car.start();`}
        />
        <p>
          In the above example, <code>this</code> refers to the <code>car</code>{" "}
          object as it's executing the method <code>stat</code>.
        </p>
        <h3>
          1.2 <code>this</code> in Regular Functions
        </h3>
        <CodeBlock
          language="javascript"
          code={`function start() {
  console.log(this);  // Window { }
}
start();`}
        />
        <p>In the above example, this refers to the window object.</p>
        <h3>
          1.3 <code>this</code> in Arrow Functions
        </h3>
        <p>
          In Arrow functions, <code>this</code> depends on two aspects:
        </p>
        <ul>
          <li>When the code is defined</li>
          <li>Context</li>
        </ul>
        <p>
          Arrow function inherits <code>this</code> from the context in which
          the code is defined.
        </p>

        <h4>1.3.1 Object Methods</h4>
        <CodeBlock
          language="javascript"
          code={`let car = {
  color: "blue",
  brand: "Audi",
  start: () => {
    console.log(this);  // Window { }
  }
};
car.start();`}
        />

        <h4>Arrow Functions with Callbacks</h4>
        <CodeBlock
          language="javascript"
          code={`let car = {
  color: "blue",
  brand: "Audi",
  start: function() {
    setTimeout(() => {
      console.log(this);  // Object { color: "blue", brand: "Audi", start: ƒ() }
    }, 1000);
  }
};
car.start();`}
        />

        <h3>
          1.4 <code>this</code> in Constructor Functions
        </h3>
        <p>
          In Constructor Function, <code>this</code> refers to the instance
          object.
        </p>
        <CodeBlock
          language="javascript"
          code={`function Car(color, brand) {
  this.color = color;
  this.brand = brand;
  this.start = function() {
    console.log(this);  // Car { }
  };
}
let car1 = new Car("blue", "Audi");
car1.start();`}
        />
        <p>
          In the above example,<code>this</code> refers to the object{" "}
          <code>car1</code>.
        </p>

        <h4>1.4.1 Arrow Functions</h4>
        <CodeBlock
          language="javascript"
          code={`function Car(color, brand) {
  this.color = color;
  this.brand = brand;
  this.start = () => {
    console.log(this);  // Car { }
  };
}
let car1 = new Car("blue", "Audi");
car1.start();`}
        />

        <p>
          Try out the <code>this</code> in different functions like Object
          Methods, Arrow Functions, and Constructor Functions etc. in the
          JavaScript Code Playground.
        </p>
      </section>

      {/* 2. Immutable and Mutable Values */}
      <section>
        <h2>2. Immutable and Mutable Values</h2>

        <h3>2.1 Immutable</h3>
        <p>All the primitive type values are immutable.</p>
        <ul>
          <li>Number</li>
          <li>String</li>
          <li>Boolean</li>
          <li>Symbol</li>
          <li>Undefined, etc.</li>
        </ul>
        <CodeBlock
          language="javascript"
          code={`let x = 5;
let y = x;
y = 10;
console.log(x);  // 5
console.log(y);  // 10`}
        />

        <h3>2.2 Mutable</h3>
        <p>All the Objects are mutable.</p>
        <ul>
          <li>Object</li>
          <li>Array</li>
          <li>Function</li>
        </ul>
        <CodeBlock
          language="javascript"
          code={`let x = { value: 5 };
let y = x;
let z = { value: 20 };
y.value = 10;
console.log(x);  // Object { value: 10 }
console.log(y);  // Object { value: 10 }
y = z;`}
        />
      </section>

      {/* 3. Declaring Variables */}
      <section>
        <h2>3. Declaring Variables</h2>
        <p>In JavaScript, a variable can be declared in 3 ways.</p>
        <ul>
          <li>
            Using <code>let</code>
          </li>
          <li>
            Using <code>const</code>
          </li>
          <li>
            Using <code>var</code>
          </li>
        </ul>

        <h3>3.1 let</h3>
        <p>
          While declaring variables using <code>let</code>,
        </p>
        <ul>
          <li>Initialization is not mandatory</li>
          <li>Variables can be reassigned</li>
        </ul>
        <CodeBlock
          language="javascript"
          code={`let x;
x = 10;
console.log(x);  // 10
x = 15;
console.log(x);  // 15`}
        />

        <h3>3.2 const</h3>
        <p>
          While declaring variables using <code>const</code>,
        </p>
        <ul>
          <li>Initialization is mandatory</li>
          <li>Once a value is initialized, then it can't be reassigned</li>
        </ul>

        <p>Without Initialization:</p>
        <CodeBlock
          language="javascript"
          code={`const x;
x = 7;  // SyntaxError {"Const declarations require an initialization value (1:21)"}`}
        />

        <p>Reassignment:</p>
        <CodeBlock
          language="javascript"
          code={`const x = 7;
x = 9;  // TypeError {"Assignment to constant variable."}`}
        />

        <h4>3.2.1 Mutating Object properties</h4>
        <CodeBlock
          language="javascript"
          code={`const car = { color : "blue", brand : "Audi"};
car.color = "red";
console.log(car.color);  // red`}
        />

        <p>But objects can't be reassigned.</p>
        <CodeBlock
          language="javascript"
          code={`const car = { color : "blue", brand : "Audi"};
car.color = "red";
car = {};  // TypeError {"Assignment to constant variable."}`}
        />

        <p>
          Try out the Mutable and Immutable values and declare the variables
          using const in the JavaScript Code Playground.
        </p>
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

export default More_Modern_JS_Concepts_CS_3;
