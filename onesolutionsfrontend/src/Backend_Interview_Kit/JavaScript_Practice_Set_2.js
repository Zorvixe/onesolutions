
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CodeBlock } from "../CodeOutputBlocks";

const JavaScript_Practice_Set_2 = ({
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
      <h2> Practice Set - 2</h2>
      <h2>Practice the popular interview questions in JavaScript using ZorMock.</h2>

    <section>
    <h3>1. What are the different operators in JavaScript?</h3>
    <p>Operators in JavaScript are used to perform operations on values and variables. They are mainly categorized into the following types:</p>
      <ul>
      <li><p><b>Arithmetic Operators</b></p></li>
      <li><p><b>Assignment Operators</b></p></li>
      <li><p><b>Comparison Operators</b></p></li>
      <li><p><b>Logical Operators</b></p></li>
      <li><p><b>String Operators</b></p></li>
      <li><p><b>Conditional (Ternary) Operator</b></p></li>
      <li><p><b>Type Operators</b></p></li>
    </ul>
    <h3>2. What is the difference between loose equal to and strict equal to?</h3>
       <ul>
        <li>
          <p><b>Loose Equal (==):</b> It compares two values after converting their data types if necessary. This is called type coercion.</p>
        </li>
        <li>
          <p><b>Strict Equal (===):</b> It compares both value and data type without performing any type conversion.</p>
        </li>
      </ul>
      <p>In simple terms, <b>==</b> checks only values (after conversion), while <code>===</code> checks both value and type.</p>
        <h3>3. What does the logical OR operator do?</h3>
        <p>It's used to evaluate one or more conditions and is commonly used in conditional statements or expressions. It is used to check if at least one of the conditions among a set of conditions is true. If one of them is true, it returns true. If all are false, it returns false.</p>
        <h3>4. Why does comparing two similar objects return false in JavaScript?</h3>
        <p>In JavaScript, comparing two objects is based on their references (memory locations). This means that even if two objects have the same properties and values, the comparison will return false if they don't have the same reference (memory location).</p>
        <h3>5. What are the conditional statements in JavaScript?</h3>
        <p>Conditional statements are used to execute different blocks of code based on specific conditions.
        </p>
        <ul>
          <li><p><b>if statement</b></p></li>
          <li><p><b>if…else statement</b></p></li>
          <li><p><b>if…else if…else statement</b></p></li>
          <li><p><b>switch statement</b></p></li>
        </ul>
        <h3>6. What is a Switch case?</h3>
        <p>The switch statement is one of the <code>conditional statements</code> in JavaScript. It checks a variable or expression against multiple cases and executes the block of code that matches the case. A default case is executed if none of the cases match.</p>
        <h3>7. Explain break and continue statements?</h3>
        <p>In JavaScript, break and continue are control statements used in loops. <code>break</code> is used to terminate the loop. <code>continue</code> is used to skip the current iteration in the loop and proceeds with the next iterations in loop. break can also be used in switch statements to terminate the switch block when a matching case is found.</p>
        <h3>8. What is meant by a DOM Manipulation?</h3>
        <p>DOM manipulation refers to the process of <code>accessing and modifying</code> the DOM using JavaScript. With DOM Manipulation, you can dynamically change the structure, content, or style of an HTML document. It includes accessing elements, modifying content, adding/removing elements, changing attributes, changing styles, etc.</p>
        <h3>9. What are the differences between Primitive Type and Reference Type?</h3>
        <p>The two main differences between primitive types and reference types are: Mutability Primitive types are immutable, meaning their values cannot be changed. Reference types are mutable, meaning their values can be changed. Comparison When comparing two primitive types using the strict equality operator, the comparison returns true if both the values are same. otherwise, it returns false.</p>
        <h3>10. What are the differences between if-else and switch statements?</h3>
         <ul>
          <li>
            <p><b>Condition Checking:</b> <b>if-else</b> evaluates conditions one by one and executes the first block whose condition is true. <code>switch</code> compares a single expression against multiple case values and executes the matching case.</p>
          </li>
          <li>
            <p><b>Flexibility:</b> <b>if-else</b> can handle complex logical expressions and ranges of values. <code>switch</code> is mainly used for simple value-based comparisons.</p>
          </li>
          <li>
            <p><b>Structure:</b> <b>if-else</b> uses conditional blocks, while <code>switch</code> uses clearly defined <code>case</code> statements, making it cleaner when checking multiple distinct values.</p>
          </li>
        </ul>
        <h3>11. What is the difference between the Spread Operator and Rest Parameter?</h3>
        <ul>
          <li>
            <p><b>Spread Operator (...):</b> It is used to expand or unpack elements of an iterable such as an array or object into individual elements. It is commonly used while copying arrays, merging arrays, or passing multiple values.</p>
          </li>
          <li>
            <p><b>Rest Parameter (...):</b> It is used in function parameters to collect multiple arguments into a single array. It is useful when a function needs to handle a variable number of arguments.</p>
          </li>
        </ul>
        <p>In simple terms, the spread operator <b>spreads</b> elements, while the rest parameter <b>collects</b> elements.
        </p>
        <h3>12. What are the JavaScript DOM properties?</h3>
         <p>DOM properties allow JavaScript to access and modify the content, structure, and styling of HTML elements on a webpage.
        </p>
        <ul>
          <li>
            <p><b>id:</b> Gets or sets the <b>id</b> attribute of an HTML element.</p>
          </li>
          <li>
            <p><b>textContent:</b> Gets or sets the text content inside an element.</p>
          </li>
          <li>
            <p><b>className:</b> Gets or sets the <b>class</b> attribute of an element.</p>
          </li>
          <li>
            <p><b>value:</b> Gets or sets the value of form elements such as <b>input</b>, <b>select</b>, and <b>textarea</b>.</p>
          </li>
        </ul>
        <h3>13. Explain scopes in JavaScript.</h3>
        <p>Scopes in JavaScript refer to the contexts where <code>variables are accessible</code> and <code>usable</code>. There are two main types of scopes. For Block Scope the variables declared with 'let' or 'const' inside a block (enclosed within curly braces) are block-scoped. They are only accessible within that block. For Global Scope Variables declared outside of all blocks and functions exist in the global scope, allowing access from any part of the code.</p>
        <h3>14. What is the scope of a 'let' variable when declared at the top of the file or inside a function?</h3>
        <p>In JavaScript, the scope of a <code>'let'</code> variable can differ based on its place of declaration. When declared at the top of a file, outside any function, it has a global scope, which means it can be accessed anywhere in that file. When declared inside a function, it has a function scope, which means it can only be accessed within that function.</p>
        <h3>15. What are the date and time functions in JavaScript?</h3>

          <p>
          In JavaScript, date and time operations are handled using the <b>Date</b> object. It provides methods to create, retrieve, and modify date and time values.
          </p>

          <ul>
            <li>
              <p><b>Date():</b> Used to create a new Date object representing the current date and time.</p>
            </li>

            <li>
              <p><b>getFullYear():</b> Returns the year from a Date object.</p>
            </li>

            <li>
              <p><b>getMonth():</b> Returns the month (0–11) from a Date object.</p>
            </li>

            <li>
              <p><b>getDate():</b> Returns the day of the month (1–31).</p>
            </li>

            <li>
              <p><b>getHours():</b> Returns the hour (0–23).</p>
            </li>

            <li>
              <p><b>getMinutes():</b> Returns the minutes (0–59).</p>
            </li>

            <li>
              <p><b>setFullYear():</b> Sets the year of a Date object.</p>
            </li>

            <li>
              <p><b>setMonth():</b> Sets the month of a Date object.</p>
            </li>

            <li>
              <p><b>setDate():</b> Sets the day of the month.</p>
            </li>
          </ul>
          <h3>16. What is hoisting in JavaScript?</h3>
          <p>Hoisting is a JavaScript mechanism that moves variables and function declarations to the top of their scope before code execution begins.</p>
          <h3>17. What are promises in JavaScript?</h3>
          <p>A Promise is a way to handle asynchronous operations. It represents the result of an operation that will be returned at some point in the future. A promise can be in one of three states: Pending, Fulfilled, or Rejected.</p>
          
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

export default JavaScript_Practice_Set_2
