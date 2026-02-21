import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Commojs_Module_Readig_Material_CS = ({
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
      <h1>Common JS Module Exports | Cheat Sheet</h1>

      <section>
        <h2>1. Default Exports</h2>
        <p>With Default Exports, we can import the module with any name.</p>

        <h3>1.1 Exporting a variable while defining </h3>
        <p>
          <b>Example</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`// sample.js
  module.exports = let value = 5;`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`root@123# node index.js
          /index.js:3
          module.exports = let value = 5;
                               ^
          
          SyntaxError: Unexpected identifier
              at wrapSafe (internal/modules/cjs/loader.js:1053:16)
              ...`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            We cannot export boolean, number, string, null, undefined, objects,
            or arrays while defining.
          </p>
        </div>

        <h3>1.2 Exporting a variable after defining </h3>
        <p>
          We can export boolean, number, string, null, undefined, objects, and
          arrays after defining.
        </p>
        <b>Example</b>

        <CodeBlock
          language="javascript"
          code={`// sample.js
  let value = 5;
  module.exports = value;`}
        />

        <CodeBlock
          language="javascript"
          code={`// index.js
  const value = require("./sample.js");
  console.log(value);`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`root@123# node index.js
          5`}
        />

        <h3>1.3 Exporting a value or an expression</h3>
        <p>We can export a value or an expression directly.</p>
        <p>
          <b>Example</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`// sample.js
  module.exports = 5 * 3;`}
        />

        <CodeBlock
          language="javascript"
          code={`const result = require("./sample.js");
  console.log(result);`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`root@123# node index.js
          15`}
        />

        <h3>1.4 Exporting a function while defining</h3>
        <p>
          <b>Example</b>
        </p>

        <CodeBlock
          language="javascript"
          code={`// sample.js
  module.exports = function (num1, num2) {
    return num1 + num2;
  };`}
        />

        <CodeBlock
          language="javascript"
          code={`const sum = require("./sample.js");
  console.log(sum(2, 6));`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`root@123# node index.js
          8`}
        />

        <h3>1.5 Exporting a function after defining</h3>
        <p>
          <b>Example</b>
        </p>

        <CodeBlock
          language="javascript"
          code={`// sample.js
  function sum(num1, num2) {
    return num1 + num2;
  }
  module.exports = sum;`}
        />
        <CodeBlock
          language="javascript"
          code={`const sum = require("./sample.js");
          console.log(sum(2, 6));`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`root@123# node index.js
          8`}
        />

        <h3>1.6 Exporting a class while defining</h3>
        <p>
          <b>Example</b>
        </p>

        <CodeBlock
          language="javascript"
          code={`// sample.js
  module.exports = class StudentDetails {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  };`}
        />

        <CodeBlock
          language="javascript"
          code={`const StudentDetails = require("./sample.js");
  const student = new StudentDetails("Ram", 15);
  console.log(student.name);`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`root@123# node index.js
          StudentDetails { name: 'Ram', age: 15 }
          Ram`}
        />

        <h3>1.7 Exporting a class after defining</h3>
        <p>
          <b>Example</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`// sample.js
  class StudentDetails {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  }
  module.exports = StudentDetails;`}
        />
        <CodeBlock
          language="javascript"
          code={`// sample.js
          const StudentDetails = require("./sample.js");
          
          const studentDetails = new StudentDetails("Ram", 15);
          
          console.log(studentDetails);
          
          console.log(studentDetails.name);`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`root@123# node index.js
          StudentDetails { name: 'Ram', age: 15 }
          Ram`}
        />
      </section>

      {/* NAMED EXPORTS */}

      <section>
        <h2>2. Named Exports</h2>

        <h3>2.1 Exporting multiple variables while defining</h3>
        <p>
          <b>Example</b>
        </p>

        <CodeBlock
          language="javascript"
          code={`// sample.js
  exports.value = let value = 5;`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p> Cannot export primitive values while defining. </p>
        </div>

        <h3>2.2 Exporting multiple variables after defining </h3>
        <p>
          <b>Example</b>
        </p>

        <CodeBlock
          language="javascript"
          code={`// sample.js
  let value = 5;
  let studentName = "Rahul";
  
  exports.value = value;
  exports.studentName = studentName;`}
        />

        <CodeBlock
          language="javascript"
          code={`const { value, studentName } = require("./sample");
  console.log(value);
  console.log(studentName);`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`root@123# node index.js
          5
          Rahul`}
        />

        <h3>2.3 Exporting multiple values and expressions</h3>
        <p>
          <b>Example</b>
        </p>

        <CodeBlock
          language="javascript"
          code={`// sample.js
  let value = 2;
  
  exports.sum = 2 + 3;
  exports.sub = 3 - value;`}
        />
        <CodeBlock
          language="javascript"
          code={`const { sum, sub } = require("./sample");

          console.log(sum);
          
          console.log(sub);`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`root@123# node index.js
          5
          1`}
        />

        <h3>2.4 Exporting multiple functions while defining</h3>
        <p>
          <b>Example</b>
        </p>

        <CodeBlock
          language="javascript"
          code={`//sample.js

          exports.sum = function (num1, num2) {
            return num1 + num2;
          };
          
          exports.sub = function sub(num1, num2) {
            return num1 - num2;
          };`}
        />
        <CodeBlock
          language="javascript"
          code={`
          const { sum, sub } = require("./sample");
          
          console.log(sum(2, 6));
          
          console.log(sub(8, 3));`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`root@123# node index.js
          8
          5`}
        />

        <h3>2.5 Exporting multiple functions after defining</h3>
        <p>
          <b>Example</b>
        </p>

        <CodeBlock
          language="javascript"
          code={`//sample.js

          function sum(num1, num2) {
            return num1 + num2;
          }
          
          exports.sum = sum;
          
          function sub(num1, num2) {
            return num1 - num2;
          }
          
          exports.sub = sub;`}
        />

        <CodeBlock
          language="javascript"
          code={`
          const { sum, sub } = require("./sample");
          
          console.log(sum(2, 6));
          
          console.log(sub(8, 3));`}
        />
        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`root@123# node index.js
          8
          5`}
        />

        <h3>2.6 Exporting multiple classes while defining</h3>
        <p>
          <b>Example</b>
        </p>

        <CodeBlock
          language="javascript"
          code={`// sample.js
  exports.StudentDetails = class {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  };
  
  exports.CarDetails = class {
    constructor(name, speed) {
      this.name = name;
      this.speed = speed;
    }
  };`}
        />

        <CodeBlock
          language="javascript"
          code={`const { StudentDetails, CarDetails } = require("./sample");
  
  const student = new StudentDetails("Ram", 15);
  const car = new CarDetails("Alto", "60kmph");
  
  console.log(student.name);
  console.log(car.name);`}
        />

        <h3>2.7 Exporting multiple classes after defining</h3>
        <p>
          <b>Example</b>
        </p>

        <CodeBlock
          language="javascript"
          code={`// sample.js
  class StudentDetails {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  }
  exports.StudentDetails = StudentDetails;
  
  class CarDetails {
    constructor(name, speed) {
      this.name = name;
      this.speed = speed;
    }
  }
  exports.CarDetails = CarDetails;`}
        />

        <CodeBlock
          language="javascript"
          code={`
          const { studentDetails, carDetails } = require("./sample.js");
          
          const newStudentDetails = new studentDetails("Ram", 15);
          console.log(newStudentDetails);
          console.log(newStudentDetails.name);
          
          const newCarDetails = new carDetails("Alto", "60kmph");
          console.log(newCarDetails);
          console.log(newCarDetails.name);`}
        />

        <p>
          <b>Output:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`root@123# node index.js
          StudentDetails { name: 'Ram', age: 15 }
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

export default Commojs_Module_Readig_Material_CS;
