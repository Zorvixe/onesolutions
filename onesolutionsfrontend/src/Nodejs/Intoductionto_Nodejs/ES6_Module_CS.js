import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const ES6_Module_CS = ({ subtopicId, goalName, courseName, subtopic }) => {
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
      <h1>ES6 Module Exports | Cheat Sheet</h1>

      <section>
        <h2>1. Default Exports</h2>
        <p>With Default Exports, we can import modules with any name.</p>

        <h3>1.1 Exporting a variable while defining </h3>
        <p>
          We cannot export boolean, number, string, null, undefined, objects,
          and arrays while defining.
        </p>

        <p>
          <b>Example:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`// sample.mjs
        export default let value = 5;`}
        />

        <CodeBlock
          language="javascript"
          code={`// index.mjs
        import value from "./sample.mjs";
        console.log(value);`}
        />

        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="bash"
          code={`root@123# node index.mjs
(node:31964) ExperimentalWarning: The ESM module loader is experimental.
file:///index.mjs:1
export default let value = 5;
               ^^^
SyntaxError: Unexpected strict mode reserved word`}
        />

        <h3>1.2 Exporting a variable after defining </h3>
        <p>
          We can export boolean, number, string, null, undefined, objects, and
          arrays after defining.
        </p>
        <p>
          <b>Example:</b>
        </p>

        <CodeBlock
          language="javascript"
          code={`// sample.mjs
        let a = 5;
        export default a;`}
        />

        <CodeBlock
          language="javascript"
          code={`// index.mjs
        import a from "./sample.mjs";
        console.log(a);`}
        />
        <p>
          <b>Output:</b>
        </p>

        <CodeBlock language="bash" code={`5`} />

        <h3>1.3 Exporting a value or an expression</h3>
        <p>We can export a value or an expression directly.</p>
        <p>
          <b>Example:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`// sample.mjs
        export default 5 * 3;`}
        />

        <CodeBlock
          language="javascript"
          code={`// index.mjs
        import result from "./sample.mjs";
        console.log(result);`}
        />

        <p>
          <b>Output:</b>
        </p>
        <CodeBlock language="bash" code={`15`} />

        <h3>1.4 Exporting a function while defining</h3>
        <p>We can export a function while defining.</p>
        <p>
          <b>Example:</b>
        </p>

        <CodeBlock
          language="javascript"
          code={`// sample.mjs
        export default function (num1, num2) {
            return num1 + num2;
        }`}
        />

        <CodeBlock
          language="javascript"
          code={`// index.mjs
        import sum from "./sample.mjs";
        console.log(sum(2, 6));`}
        />
        <p>
          <b>Output:</b>
        </p>

        <CodeBlock language="bash" code={`8`} />

        <h3>1.5 Exporting a function after defining</h3>
        <p>We can export a function after defining.</p>
        <p>
          <b>Example:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`// sample.mjs
        function sum(num1, num2) {
            return num1 + num2;
        }
        export default sum;`}
        />

        <CodeBlock
          language="javascript"
          code={`// index.mjs
        import sum from "./sample.mjs";
        console.log(sum(2, 6));`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock language="bash" code={`8`} />

        <h3>1.6 Exporting a class while defining</h3>
        <p>We can export a class while defining.</p>
        <p>
          <b>Example:</b>
        </p>

        <CodeBlock
          language="javascript"
          code={`// sample.mjs
        export default class StudentDetails {
            constructor(name, age) {
            this.name = name;
            this.age = age;
            }
        }`}
        />

        <CodeBlock
          language="javascript"
          code={`// index.mjs
        import StudentDetails from "./sample.mjs";
        
        const student = new StudentDetails("Ram", 15);
        console.log(student);
        console.log(student.name);`}
        />

        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="bash"
          code={`StudentDetails { name: 'Ram', age: 15 }
        Ram`}
        />

        <h3>1.7 Exporting a class after defining</h3>
        <p>We can export a class after defining.</p>
        <p>
          <b>Example:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`// sample.mjs
        class StudentDetails {
            constructor(name, age) {
            this.name = name;
            this.age = age;
            }
        }
        export default StudentDetails;`}
        />

        <CodeBlock
          language="javascript"
          code={`// index.mjs
        import StudentDetails from "./sample.mjs";
        
        const student = new StudentDetails("Ram", 15);
        console.log(student);
        console.log(student.name);`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="bash"
          code={`StudentDetails { name: 'Ram', age: 15 }
        Ram`}
        />
      </section>

      <section>
        <h2>2. Named Exports</h2>

        <h3>2.1 Exporting multiple variables while defining</h3>
        <p>
          We can export boolean, number, string, null, undefined, objects, and
          arrays while defining.
        </p>
        <p>
          <b>Example:</b>
        </p>

        <CodeBlock
          language="javascript"
          code={`// sample.mjs
        export let value = 5;
        export let studentName = "Rahul";`}
        />

        <CodeBlock
          language="javascript"
          code={`// index.mjs
        import { value, studentName } from "./sample.mjs";
        
        console.log(value);
        console.log(studentName);`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="bash"
          code={`5
        Rahul`}
        />

        <h3>2.2 Exporting multiple variables after defining</h3>
        <p>
          We can export multiple variables after defining in an Object format.
        </p>
        <p>
          <b>Example:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`// sample.mjs
        let value = 5;
        const studentName = "Rahul";
        
        export { value, studentName };`}
        />

        <CodeBlock
          language="javascript"
          code={`// index.mjs
        import { value, studentName } from "./sample.mjs";
        
        console.log(value);
        console.log(studentName);`}
        />
        <p>
          <b>Output:</b>
        </p>

        <CodeBlock
          language="bash"
          code={`5
        Rahul`}
        />

        <h3>2.3 Exporting multiple functions while defining</h3>
        <p>We can export multiple functions while defining.</p>
        <p>
          <b>Example:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`// sample.mjs
        export function sum(a, b) {
            return a + b;
        }
        
        export function sub(a, b) {
            return a - b;
        }`}
        />

        <CodeBlock
          language="javascript"
          code={`// index.mjs
        import { sum, sub } from "./sample.mjs";
        
        console.log(sum(4, 2));
        console.log(sub(4, 2));`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="bash"
          code={`6
        2`}
        />

        <h3>2.4 Exporting multiple functions after defining</h3>
        <p>We can export multiple functions after defining.</p>
        <p>
          <b>Example:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`// sample.mjs
        function sum(a, b) {
            return a + b;
        }
        
        function sub(a, b) {
            return a - b;
        }
        
        export { sum, sub };`}
        />

        <CodeBlock
          language="javascript"
          code={`// index.mjs
        import { sum, sub } from "./sample.mjs";
        
        console.log(sum(4, 2));
        console.log(sub(4, 2));`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="bash"
          code={`6
        2`}
        />

        <h3>2.5 Exporting multiple classes while defining</h3>
        <p>We can export multiple classes while defining.</p>
        <p>
          <b>Example:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`// sample.mjs
        export class StudentDetails {
            constructor(name, age) {
            this.name = name;
            this.age = age;
            }
        }
        
        export class CarDetails {
            constructor(name, speed) {
            this.name = name;
            this.speed = speed;
            }
        }`}
        />

        <CodeBlock
          language="javascript"
          code={`// index.mjs
        import { StudentDetails, CarDetails } from "./sample.mjs";
        
        const student = new StudentDetails("Ram", 15);
        console.log(student);
        console.log(student.name);
        
        const car = new CarDetails("Alto", "60kmph");
        console.log(car);
        console.log(car.name);`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="bash"
          code={`StudentDetails { name: 'Ram', age: 15 }
        Ram
        CarDetails { name: 'Alto', speed: '60kmph' }
        Alto`}
        />

        <h3>2.6 Exporting multiple classes after defining</h3>
        <p>We can export multiple classes after defining.</p>
        <p>
          <b>Example:</b>
        </p>

        <CodeBlock
          language="javascript"
          code={`// sample.mjs
        class StudentDetails {
            constructor(name, age) {
            this.name = name;
            this.age = age;
            }
        }
        
        class CarDetails {
            constructor(name, speed) {
            this.name = name;
            this.speed = speed;
            }
        }
        
        export { StudentDetails, CarDetails };`}
        />

        <CodeBlock
          language="javascript"
          code={`// index.mjs
        import { StudentDetails, CarDetails } from "./sample.mjs";
        
        const student = new StudentDetails("Ram", 15);
        console.log(student);
        console.log(student.name);
        
        const car = new CarDetails("Alto", "60kmph");
        console.log(car);
        console.log(car.name);`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="bash"
          code={`StudentDetails { name: 'Ram', age: 15 }
        Ram
        CarDetails { name: 'Alto', speed: '60kmph' }
        Alto`}
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

export default ES6_Module_CS;
