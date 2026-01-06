import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Factory_Constructor_Function_CS = ({
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
      <h1>Factory and Constructor Functions | Cheat Sheet</h1>

      {/* 1. Factory Function */}
      <section>
        <h2>1. Factory Function</h2>
        <p>
          A Factory function is any function that returns a new object for every
          function call.
        </p>
        <p>
          The Function name should follow the <b>camelCase</b> naming
          convention.
        </p>

        <b>Syntax:</b>
        <CodeBlock
          language="javascript"
          code={`function functionName(parameter1, parameter2, ...) {
      return {
        property1: parameter1,
        property2: parameter2,
        ...
      };
    }
    let myObject = functionName(arg1, arg2, ...);`}
        />

        <b>Example: </b>
        <CodeBlock
          language="javascript"
          code={`function createCar(color, brand) {
        return {
          color: color,
          brand: brand,
          start: function() {
            console.log("started");
          }
        };
      }
      
      let car1 = createCar("blue", "Audi");
      let car2 = createCar("red", "Tata");
      let car3 = createCar("green", "BMW");
      
      console.log(car1);  // Object { color: "blue", brand: "Audi", start: ƒ() }
      console.log(car2);  // Object { color: "red", brand: "Tata", start: ƒ() }
      console.log(car3);  // Object { color: "green", brand: "BMW", start: ƒ() } `}
        />

        <h4>1.1 Shorthand Notations</h4>
        <CodeBlock
          language="javascript"
          code={`function createCar(color, brand) {
        return {
          color,
          brand,
          start() {
            console.log("started");
          }
        };
      }
      
      let car1 = createCar("blue", "Audi");
      let car2 = createCar("red", "Tata");
      let car3 = createCar("green", "BMW");
      
      console.log(car1);  // Object { color: "blue", brand: "Audi", start: ƒ() }
      console.log(car2);  // Object { color: "red", brand: "Tata", start: ƒ() }
      console.log(car3);  // Object { color: "green", brand: "BMW", start: ƒ() }`}
        />
      </section>

      {/* 2. Constructor Function */}
      <section>
        <h2>2. Constructor Function</h2>
        <p>
          A regular function that returns a new object on calling with the{" "}
          <code>new</code> operator. The created new object is called an{" "}
          <b>Instance</b>.
        </p>
        <p>
          The Function name should follow the <b>PascalCase</b> naming
          convention.
        </p>

        <b>Syntax:</b>
        <CodeBlock
          language="javascript"
          code={`function FunctionName(parameter1, parameter2, ...) {
      this.property1 = parameter1;
      this.property2 = parameter2;
      ...
    }
    let myObject = new FunctionName(arg1, arg2, ...);`}
        />

        <h3>2.1 The new Operator</h3>
        <p>
          When a function is called with the <code>new</code> operator, it does
          the following steps:
        </p>
        <ul>
          <li>
            Creates an empty object and assigns it to <code>this</code>
          </li>
          <li>
            Return <code>this</code>
          </li>
        </ul>

        <CodeBlock
          language="javascript"
          code={`function Car(color, brand) {
        this.color = color;
        this.brand = brand;
        this.start = function() {
          console.log("started");
        };
      }
      
      let car1 = new Car("blue", "Audi");
      console.log(car1);  // Car { }`}
        />

        <p>
          Here, <br />
          <code>car1</code> is instance <br />
          <code>car1.start()</code> is instance method <br />
          <code>car1.color</code>, <code>car1.brand</code> are instance
          properties
        </p>

        <h3>2.2 Factory vs Constructor Functions</h3>
        <table border="1" style={{ borderCollapse: "collapse", width: "80%" }}>
          <thead>
            <tr>
              <th>Factory Functions</th>
              <th>Constructor Functions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Follows camelCase notation</td>
              <td>Follows PascalCase notation</td>
            </tr>
            <tr>
              <td>Doesn't need new operator for function calling</td>
              <td>Needs new operator for function calling</td>
            </tr>
            <tr>
              <td>Explicitly need to return the object</td>
              <td>Created object returns implicitly</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 3. JS Functions */}
      <section>
        <h2>3. JS Functions</h2>
        <p>
          Similar to Objects, <b>Functions</b> also have properties and methods.
        </p>

        <h3>3.1 Default Properties</h3>
        <ul>
          <li>name</li>
          <li>length</li>
          <li>constructor</li>
          <li>prototype, etc.</li>
        </ul>

        <h3>3.2 Default Methods</h3>
        <ul>
          <li>apply()</li>
          <li>bind()</li>
          <li>call()</li>
          <li>toString(), etc.</li>
        </ul>

        <h3>3.3 Function Properties</h3>

        <h4>3.3.1 The name Property</h4>
        <p>This property returns the name of the function.</p>
        <CodeBlock
          language="javascript"
          code={`function Car(color, brand) {
      this.color = color;
      this.brand = brand;
      this.start = function() {
        console.log("started");
      };
    }
    console.log(Car.name);  // Car`}
        />

        <h4>3.3.2 The length Property</h4>
        <p>
          This property returns the number of parameters passed to the function.
        </p>
        <CodeBlock
          language="javascript"
          code={`function Car(color, brand) {
      this.color = color;
      this.brand = brand;
      this.start = function() {
        console.log("started");
      };
    }
    console.log(Car.length);  // 2`}
        />

        <h4>
          3.3.3 The <code>typeof</code> function
        </h4>
        <CodeBlock
          language="javascript"
          code={`function Car(color, brand) {
      this.color = color;
      this.brand = brand;
      this.start = function() {
        console.log("started");
      };
    }
    console.log(typeof(Car));  // function`}
        />
      </section>

      {/* 4. The Constructor Property */}
      <section>
        <h2>4. The Constructor Property</h2>
        <p>
          Every object in JavaScript has a <b>constructor</b> property.
        </p>
        <p>
          The constructor property refers to the constructor function that is
          used to create the object.
        </p>
        <CodeBlock
          language="javascript"
          code={`function Car(color, brand) {
      this.color = color;
      this.brand = brand;
      this.start = function() {
        console.log("started");
      };
    }
    let car1 = new Car("blue", "Audi");
    console.log(car1.constructor);  // f Car(color, brand) {}`}
        />
      </section>

      {/* 5. Built-in Constructor Function */}
      <section>
        <h2>5. Built-in Constructor Functions</h2>
        <p>
          These are the Constructor functions provided by JavaScript:
          <ul>
            <li>
              <b>function Date()</b>
            </li>
            <li>function Error()</li>
            <li>function Promise()</li>
            <li>function Object()</li>
            <li>function String()</li>
            <li>function Number(), etc.</li>
          </ul>
        </p>

        <p>
          In JavaScript, date and time are represented by the Date object. The
          Date object provides the date and time information and also provides
          various methods.
        </p>

        <h3>5.1 Creating Date Objects</h3>
        <p>There are four ways to create a date object.</p>
        <ul>
          <li>new Date()</li>
          <li>new Date(milliseconds)</li>
          <li>new Date(date string)</li>
          <li>
            new Date(year, month, day, hours, minutes, seconds, milliseconds)
          </li>
        </ul>

        <h4>5.1.1 new Date()</h4>
        <p>
          You can create a date object without passing any arguments to the{" "}
          <code>new Date()</code> constructor function.
        </p>
        <p>For example,</p>
        <CodeBlock
          language="javascript"
          code={`let now = new Date();

    console.log(now);  // Tue Feb 02 2021 19:10:29 GMT+0530 (India Standard Time) { }
    console.log(typeof(now));  // object`}
        />

        <p>
          Here, <code>new Date()</code> creates a new date object with the
          current date and local time.
        </p>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <ul>
            <li>
              Coordinated Universal Time (UTC) - It is the global standard time
              defined by the World Time Standard. (This time is historically
              known as Greenwich Mean Time, as UTC lies along the meridian that
              includes London and nearby Greenwich in the United Kingdom.)
            </li>
            <li>Local Time - The user's device provides the local time.</li>
          </ul>
        </div>

        <h4>5.1.2 new Date(milliseconds)</h4>
        <p>
          The <code>Date</code> object contains a number that represents
          milliseconds since 1 January 1970 UTC.
        </p>
        <p>
          The <code>new Date(milliseconds)</code> creates a new date object by
          adding the milliseconds to zero time.
        </p>
        <CodeBlock
          language="javascript"
          code={`let time1 = new Date(0);
    console.log(time1);  // Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)

    let time2 = new Date(100000000000);
    console.log(time2);  // Sat Mar 03 1973 15:16:40 GMT+0530 (India Standard Time)`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>1000 milliseconds is equal to 1 second..</p>
        </div>

        <h4>5.1.3 new Date(date string)</h4>
        <p>
          The <code>new Date(date string)</code> creates a new date object from
          a date string.
        </p>
        <b>
          Syntax: <code>new Date(datestring);</code>
        </b>
        <CodeBlock
          language="javascript"
          code={`let date = new Date("2021-01-28");
    console.log(date);  // Thu Jan 28 2021 05:30:00 GMT+0530 (India Standard Time)`}
        />

        <h4>
          5.1.4 new Date(year, month, day, hours, minutes, seconds,
          milliseconds)
        </h4>
        <CodeBlock
          language="javascript"
          code={`let time1 = new Date(2021, 1, 20, 4, 12, 11, 0);
    console.log(time1);  // Sat Feb 20 2021 04:12:11 GMT+0530 (India Standard Time)`}
        />
        <p>Note: Months are counted from 0-11. January = 0, December = 11.</p>
        <p>
          Warning: Passing only 1 argument is treated as milliseconds. Pass at
          least 2 arguments for year/month format.
        </p>

        <h4>5.2 AutoCorrection in Date Object</h4>
        <CodeBlock
          language="javascript"
          code={`let date = new Date(2008, 0, 33); // Jan does not have 33 days
    console.log(date);  // Sat Feb 02 2008 00:00:00 GMT+0530 (India Standard Time)`}
        />
        <p>
          Explanation: 33 days are auto-corrected to 31 (Jan) + 2 days in Feb.
        </p>

        <h4>5.3 Instance Methods</h4>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Method</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>now()</td>
              <td>
                Returns the numeric value corresponding to the current time
                (milliseconds since Jan 1, 1970)
              </td>
            </tr>
            <tr>
              <td>getFullYear()</td>
              <td>Gets the year according to local time</td>
            </tr>
            <tr>
              <td>getMonth()</td>
              <td>Gets the month from 0-11 according to local time</td>
            </tr>
            <tr>
              <td>getDate()</td>
              <td>Gets the day of the month (1–31) according to local time</td>
            </tr>
            <tr>
              <td>getDay()</td>
              <td>Gets the day of the week (0-6) according to local time</td>
            </tr>
            <tr>
              <td>getHours()</td>
              <td>Gets the hour from 0-23 according to local time</td>
            </tr>
            <tr>
              <td>getMinutes()</td>
              <td>Gets the minute from 0-59 according to local time</td>
            </tr>
            <tr>
              <td>getUTCDate()</td>
              <td>
                Gets the day of the month (1–31) according to universal time
              </td>
            </tr>
            <tr>
              <td>setFullYear()</td>
              <td>Sets the full year according to local time</td>
            </tr>
            <tr>
              <td>setMonth()</td>
              <td>Sets the month according to local time</td>
            </tr>
            <tr>
              <td>setDate()</td>
              <td>Sets the day of the month according to local time</td>
            </tr>
            <tr>
              <td>setUTCDate()</td>
              <td>Sets the day of the month according to universal time</td>
            </tr>
          </tbody>
        </table>

        <CodeBlock
          language="javascript"
          code={`let date1 = new Date(1947, 7, 15, 1, 3, 15, 0);
    console.log(date1.getFullYear());  // 1947
    console.log(date1.getMonth());     // 7

    // Setting Date Values
    let date2 = new Date(1947, 7, 15);
    date2.setYear(2021);
    date2.setDate(1);
    console.log(date2);  // Sun Aug 01 2021 00:00:00 GMT+0530 (India Standard Time)`}
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

export default Factory_Constructor_Function_CS;
