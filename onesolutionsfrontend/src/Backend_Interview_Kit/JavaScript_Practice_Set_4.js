import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CodeBlock } from "../CodeOutputBlocks";

const JavaScript_Practice_Set_4 = ({
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
      <h2> Practice Set - 4</h2>
      <h2>Practice the popular interview questions in JavaScript using ZorMock.</h2>

    <section>
    <h3>1. Explain about reduce method?</h3>
    <p>The <code>reduce method</code> is used to combine all items in an array into a single result by calling a provided function, called reducer, on each item in the array. reducer takes two arguments: the accumulator and the current item. The accumulator stores the result of the previous operation, and the reducer updates it based on current item in each iteration. The final value of the accumulator, after iterating over all the elements, is the result of the reduce method.</p>
    <h3>2. Explain about filter method?</h3>
    <p>The <code>filter method</code> is used to create a new array with item that meet a specific condition. It takes a function as an argument, which is called on every array item. If the function returns true, the item is included in the new array. Lets say you want to keep only even numbers in numbers array, use filter with a function that checks if a number is divisible by 2. This creates a new array with only even numbers, leaving the original array unchanged.</p>
    <h3>3. What is the difference between normal function and arrow function in JavaScript?</h3>
    <p>In JavaScript, normal functions have their own <code>'this'</code> context and can be named or anonymous. Arrow functions have a more concise syntax, don't bind their own <code>'this'</code>, using the one from their parent scope.</p>
    <h3>4. What is a closure in JavaScript?</h3>
    <p>A <code>closure</code> in JavaScript is a function that has access to its own scope, the outer function's scope, and the global scope. It retains access to variables from its parent function even after the parent has finished execution.</p>
    <h3>5. Is Javascript Synchronous or Asynchronous?</h3>
    <p>JavaScript is <code>single-threaded</code> and <code>synchronous</code> by default, but it can support asynchronous behavior through features like callbacks, promises, and async/await. These allow non-blocking operations like fetching data, timers, and event listeners.</p>
    <h3>6. What is event capturing in JavaScript?</h3>
    <p><code>Event capturing</code> is the process in JavaScript where an event is first captured by the outermost element and then propogates down to the target element.</p>
    <h3>7. What is event bubbling in JavaScript?</h3>
    <p><code>Event bubbling</code> is the process in JavaScript where an event is initiated at the target element and then propogates up to its parent elements.</p>
    <h3>8. What are the string methods in Javascript?</h3>
    <p><code>String methods</code> in JavaScript are functions that perform operations on strings. Some commonly used string methods include "toUpperCase" and "toLowerCase" for changing case and "concat" to concatenate strings etc</p>
    <h3>9. What is the difference between lexical scope and functional scope?</h3>
    <p><code>Lexical scope</code> is determined by the variable's location in the code. Variables are accessible within the block they are defined. Functional scope, mainly used in JavaScript before ES6, allows variables to be accessible throughout the function they're declared, regardless of blocks.</p>
    <h3>10. What is SSL in javascript?</h3>
    <p><code>SSL</code> isn't just for JavaScript. It's a secure communication protocol that encrypts data , ensuring safe data transfer between client and server. In the context of JavaScript, SSL is typically associated with making secure HTTP requests.</p>
    <h3>11. What is Prototype?</h3>
    <p>A <code>prototype</code> is a <code>blueprint</code> of an object. Every object in JavaScript has a prototype, which is used to inherit properties and methods.</p>
    <h3>12. What is built-in JavaScript ?</h3>
    <p>Built-in JavaScript refers to <code>pre-defined</code> objects, methods, and properties in JavaScript. Developers can utilize these without the need for additional libraries or frameworks. Examples include Date, Math, Array, and String objects.</p>
    <h3>13. How to convert an object into an array?</h3>
    <p>In JavaScript, you can convert an object into an array using the <code>"Object.entries"</code> method.</p>
    <h3>14. What is the difference between a function declaration and a function expression?</h3>
    <p><code>Function declarations</code> and <code>function expressions</code> are two ways to define functions in JavaScript. Function declarations are hoisted, allowing them to be called before they're defined. Function expressions are not fully hoisted and can be anonymous, meaning they must be defined before they're called.</p>
    <h3>15. Are the function expressions hoisted?</h3>
    <p><code>No</code>, function expressions in JavaScript are not hoisted, which means they cannot be used before they are defined.</p>
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

export default JavaScript_Practice_Set_4
