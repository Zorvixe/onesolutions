
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CodeBlock } from "../CodeOutputBlocks";

const JavaScript_Practice_Set_1 = ({
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
      <h2> Practice Set - 1</h2>
      <h2>Practice the popular interview questions in JavaScript using ZorMock.</h2>

    <section>
    <h3>1. What are variables?</h3>
    <p>Variables are like containers for storing values such as numbers, strings, or boolean values.</p>
    <h3>2. What are the ways to define a variable in JavaScript?</h3>
   <ul><li>
    <p><b>var:</b> Used to declare a variable in a function scope or globally if declared outside a function. It is the older way of defining variables in JavaScript.</p>
  </li>
  <li>
    <p><b>let:</b> Used to declare block-scoped variables (inside loops or conditional blocks). The value of a <code>let</code> variable can be changed.</p>
  </li>
  <li>
    <p><b>const:</b> Also block-scoped and used to declare variables with a fixed value. Once assigned, the value of a <code>const</code> variable cannot be reassigned.</p>
  </li>
  </ul>
  <h3>3. What are the differences between let and const variables in JavaScript?</h3>

  <ul><li>
    <p><b>let:</b> It is used to declare block-scoped variables whose values can be changed or reassigned later in the program.</p>
  </li>
  <li>
    <p><b>const:</b> It is also block-scoped but used for variables whose values cannot be reassigned once they are initialized.</p>
  </li>
  </ul>
  <p>In simple terms, use <b>let</b> when the value may change and <code>const</code> when the value should remain fixed.</p>
      <h3>4. What are the differences between var and let?</h3>
      <ul>
  <li>
    <p><b>Scope:</b> <code>let</code> and <code>const</code> have block scope, while <code>var</code> has function scope.</p>
  </li>
  <li>
    <p><b>Reassignment:</b> <code>let</code> and <code>var</code> allow reassignment of values, but <code>const</code> does not allow reassignment after initialization.</p>
  </li>
  <li>
    <p><b>Initialization:</b> <code>const</code> must be initialized at the time of declaration, whereas <code>let</code> and <code>var</code> can be declared without an initial value.</p>
  </li>
</ul>
     <h3>5. What are global variables?</h3>
     <p><p>
      Global variables are variables that are declared outside of any function or block. They can be accessed and used from any part of the program. These variables are useful when a value needs to be shared across multiple functions.
      </p><CodeBlock
        language="javascript"
        code={`let message = "Hello"; // global variable

      function greet() {
        console.log(message); // accessing global variable
      }

      greet();`}
      /></p>
          <h3>6. What are global and local variables?</h3>
          <p><ul>
        <li>
          <p><b>Global Variables:</b> These variables are declared outside of any function or block and can be accessed from anywhere in the program. They are useful when a value needs to be shared across multiple functions.</p>
        </li>

        <li>
          <p><b>Local Variables:</b> These variables are declared inside a function or block and can be accessed only within that specific function or block. They help in organizing code and preventing unintended changes to values outside their scope.</p>
        </li>
      </ul>
      <CodeBlock
        language="javascript"
        code={`let globalVar = "I am global";

      function showMessage() {
        let localVar = "I am local";
        console.log(globalVar); // accessible
        console.log(localVar);  // accessible
      }

      showMessage();
      // console.log(localVar); // not accessible here`}
      /></p>
          <h3>7. Explain data types in JavaScript</h3>

      <p>In JavaScript, data types are mainly divided into two categories: <code>primitive</code> and <code>object</code> (reference) types.
      </p>
      <ul>
        <li>
          <p><b>Primitive Data Types: </b> Primitive data types are the most basic data types that are immutable and cannot be changed.</p>
          <ul>
            <li><p><b>String:</b> Represents text values.</p></li>
            <li><p><b>Number:</b> Represents numeric values.</p></li>
            <li><p><b>Boolean:</b> Represents logical values such as true or false.</p></li>
            <li><p><b>Null:</b> Represents an intentional empty value.</p></li>
            <li><p><b>Undefined:</b> Represents a variable that has been declared but not assigned a value.</p></li>
          </ul>
        </li>

        <li>
          <p><b>Object (Reference) Data Types:</b></p>
          <ul>
            <li><p><b>Object:</b> Used to store collections of key-value pairs.</p></li>
            <li><p><b>Array:</b> Used to store a sequence or list of values.</p></li>
            <li><p><b>Function:</b> Represents reusable blocks of code.</p></li>
          </ul>
        </li>
      </ul>

      <p>These data types help in storing and managing different kinds of data effectively in JavaScript programs.
      </p>
      <h3>8. Explain about undefined in JS?</h3>
      <p>In JavaScript, undefined represents the absence of a value. It usually indicates that a variable has been declared but has not been assigned a value yet. Additionally, if you try to access a non existent property of an object or a non existent element of an array, JavaScript returns undefined.</p>
      <h3>9. What are the differences between null and undefined values?</h3>
      <ul>
        <li>
          <p><b>null:</b> It represents an intentional absence of any object value. It is assigned by the programmer when a variable should contain no value.</p>
        </li>

        <li>
          <p><b>undefined:</b> It is a primitive data type that indicates a variable has been declared but not assigned a value, or a function does not return anything.</p>
        </li>
      </ul>

      <p>In simple terms, <b>null</b> is assigned intentionally, while <b>undefined</b> occurs automatically when a value is not set.</p>
      <h3>10. What are the Datastructures in JavaScript?</h3>
      <p>Data Structures allow us to store and organize data efficiently. In JavaScript, we have built in Data Structures like, Arrays Objects Maps Sets</p>
      <h3>11. Do you know different status codes in JavaScript?</h3>

    <p>When working with web requests (such as using fetch or AJAX) in JavaScript, we often handle HTTP status codes returned by the server.
    </p>
    <ul>
      <li><p><b>400 – Bad Request:</b> The server cannot process the request due to invalid input.</p></li>
      <li><p><b>401 – Unauthorized:</b> Authentication is required or has failed.</p></li>
      <li><p><b>403 – Forbidden:</b> The server understands the request but refuses to allow access.</p></li>
      <li><p><b>404 – Not Found:</b> The requested resource could not be found on the server.</p></li>
      <li><p><b>500 – Internal Server Error:</b> A general error occurred on the server.</p></li>
      <li><p><b>501 – Not Implemented:</b> The server does not support the requested functionality.</p></li>
      <li><p><b>502 – Bad Gateway:</b> The server received an invalid response from another server.</p></li>
      <li><p><b>503 – Service Unavailable:</b> The server is currently unavailable, often due to maintenance or overload.</p></li>
    </ul>
    <h3>12. How do you debug errors in JavaScript?</h3>
    <p>Using developer tools to set breakpoints, pausing execution for value inspection and code flow tracking. Modern browsers have debugging tools allowing line-by-line code stepping, network request monitoring, element attribute inspection, and performance analysis.</p>
    
    <h3>13. What is setTimeout() and what is the syntax of setTimeout()?</h3>

    <p>
    <b>setTimeout()</b> is a built-in JavaScript method that is used to execute a function after a specified delay. The delay is given in milliseconds.
    </p>

    <p>
    It is commonly used to create time-based actions such as showing messages, animations, or delayed execution of code.
    </p>

<p><b>Syntax:</b>
<CodeBlock
  language="javascript"
  code={`setTimeout(functionName, delay);

// example
setTimeout(() => {
  console.log("Hello after 2 seconds");
}, 2000);`}
 /></p>
     <h3>14. In how many ways can we write JavaScript code in HTML?</h3>

    <p>JavaScript code can be added to an HTML document in three different ways.</p>
    <ul>
      <li>
        <p><b>Inline JavaScript:</b> JavaScript code is written directly inside HTML elements using event attributes such as <b>onclick</b>.</p>
      </li>
      <li>
        <p><b>Internal JavaScript:</b> JavaScript code is written inside <code>&lt;script&gt;</code> tags within the HTML file, usually in the <code>&lt;head&gt;</code> or <code>&lt;body&gt;</code> section.</p>
      </li>
      <li>
        <p><b>External JavaScript:</b> JavaScript code is written in a separate <code>.js</code> file and linked to the HTML document using the <code>src</code> attribute of the <code>&lt;script&gt;</code> tag.</p>
      </li>
    </ul>
    
    <h3>15. How much do you rate yourself in javascript?</h3>
    <p>I'd rate myself 8 out of 10 in JavaScript, based on 8 months of deepening my understanding of essential concepts including array methods and asynchronous operations using promises, DOM manipulation techniques, and working with local storage. I've learned to dynamically fetch and display data through API integrations. I have applied these skills in real-world scenarios through projects like to-do list, Wikipedia searches etc</p>
    <h3>16. What are "async" and "await" functions in javascript, when will you use these functions?</h3>
    <p>In JavaScript, <code>"async"</code> and <code>"await"</code> facilitate easier handling of asynchronous operations, allowing for more readable code. The "async" keyword defines asynchronous functions, which return promises. The "await" keyword is used within "async" functions to wait for a promise to resolve or reject. We can use "async" during network requests or when operations are dependent on the outcomes of previous asynchronous tasks.</p>
    <h3>17. Where should we use "await" function?</h3>
    <p>The <code>"await"</code> keyword in JavaScript is used within an <code>"async"</code> function</p>
    <h3>18. What is an array, and how it allocates the space in the memory?</h3>
    <p>An array is a data structure holding multiple values under a single name, identified by indexes. In JavaScript, it uses dynamic memory allocation, adjusting size as needed during runtime and storing elements contiguously.</p>
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

export default JavaScript_Practice_Set_1
