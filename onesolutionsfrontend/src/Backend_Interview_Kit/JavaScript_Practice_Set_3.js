import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CodeBlock } from "../CodeOutputBlocks";

const JavaScript_Practice_Set_3 = ({
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
      <h2> Practice Set - 3</h2>
      <h2>Practice the popular interview questions in JavaScript using NxtMock.</h2>

    <section>
    <h3>1. How do you access the value of an HTML input element in JS?</h3>
    <p>To access the value of an HTML input element, use the value property of the input element's DOM object.</p>
    <h3>2. What is functions hoisting and variables hoisting?</h3>
   <p>Hoisting is JavaScript's process of moving variable and function declarations to the top of their scope before execution. With variable hoisting, only the declaration is hoisted, not the initialization. With function hoisting, both the declaration and definition are hoisted. This allows the use of functions and variables before they're declared.</p>
   <h3>3. What are the different types of events?</h3>
    <p>Some of the most common types of events are: Mouse Events: mousedown, mouseup etc Touch Events: touchstart, touchmove etc Keyboard Events keydown, keypress etc Form Events focus, blur, change, submit etc window events scroll, resize, load etc</p>
    <h3>4. What is a blur event in JavaScript?</h3>
    <p>A <code>blur event</code> in JavaScript occurs when an element such as textbox, button etc loses focus. To add a blur event listener, use either addEventListener with blur and function as arguments or the onblur property with function assigned. The function triggers when the element loses focus, and it's often used in form validations.</p>
    <h3>5. Explain about an event listener in JS?</h3>
    <p>An <code>Event Listener</code> listens for events like click, etc on element and triggers the event handler, which is a function to execute when an event occurs. To add an event listener, use the addEventListener method, providing the event type, such as 'click', and the function to execute when the event occurs.</p>
    <h3>6. What is preventDefault method?</h3>
    <p>The <code>preventDefault()</code> method is used to stop an event's default action. It's used within an event handler and called on the event object passed to the handler.</p>
    <h3>7. What are the most useful JavaScript array methods?</h3>

<ul>
  <li><p><b>push():</b> Adds one or more elements to the end of an array.</p></li>

  <li><p><b>pop():</b> Removes the last element from an array and returns it.</p></li>

  <li><p><b>forEach():</b> Executes a function once for each element in the array. It does not return a new array.</p></li>

  <li><p><b>map():</b> Creates and returns a new array by applying a function to each element.</p></li>

  <li><p><b>filter():</b> Creates and returns a new array containing elements that satisfy a given condition.</p></li>

  <li><p><b>splice():</b> Changes the contents of an array by adding, removing, or replacing elements.</p></li>

  <li><p><b>slice():</b> Returns a new array containing a portion of the original array based on start and end index.</p></li>

  <li><p><b>shift():</b> Removes the first element from an array.</p></li>

  <li><p><b>unshift():</b> Adds one or more elements to the beginning of an array.</p></li>

  <li><p><b>sort():</b> Sorts the elements of an array. By default, it sorts in ascending order.</p></li>
</ul>
      <h3>8. What is the use of the push method in JavaScript?</h3>
      <p>The push method is used to add one or more items to the <code>end of an array</code>. Imagine an array of favorite colors containing red and blue, To add green at the end, use the push method and pass green. Now, the favoriteColors array contains red, blue, and green colors.</p>
      <h3>9. How to sort the numbers in an array?</h3>
      <p>By default, the sort method sorts items as strings. To sort numbers, pass a custom compare function as the argument. This function compares two elements, a and b, and sets their order in the sorted array. It arranges the numbers in ascending order. For example, if numbers array contains 100, 40, 60, using sort method with custom compare function, it becomes 40, 60, 100.</p>
      <h3>10. Explain about the array method slice?</h3>
      <p>The <code>slice method</code> is used to get a part of an array. It returns a new array with items from a specified start index to an end index , without modifying the original array.</p>
      <h3>11. What are the differences between slice and splice?</h3>
      <p>slice is used to take a part of array without changing the original array, while splice is for adding, removing, or replacing items in the original array. slice accepts the start index and end index as optional parameters whole splice accepts start index and number of items to remove as required parameters and items to add/replace as an optional parameter</p>
      <h3>12. What is the use of a map method?</h3>
      <p>The <code>map method</code> is used to generate a <code>new array</code> by calling a provided function on each item of array. It does not modify the original array but instead returns a new array with the changed items. For example, suppose you have an array of numbers and want to create a new array containing the squares of these numbers. use the map method and pass a function that squares its argument. This will result in a new array containing the squared values of the original numbers.</p>
      <h3>13. Why do we use arrow functions?</h3>
      <p><code>Arrow functions</code> offer a concise syntax for defining functions. They inherit "this" from the context in which they are defined.</p>
      <h3>14. What is the difference between Virtual DOM and DOM in JavaScript?</h3>
      <p>The <code>DOM (Document Object Model)</code> represents the structure of a web page, while the Virtual DOM is a copy of the DOM used for efficient updates. Interacting with the DOM can be slower, while the Virtual DOM is faster for changes because it optimizes updates.</p>
      <h3>15. How can you fetch data in JavaScript?</h3>
      <p>Fetching data in JavaScript can be done using the <code>"fetch"</code> API. The <code>"fetch"</code> function returns a Promise that resolves to the <code>"Response"</code> object representing the response to the request. The "response.json" method also returns a Promise that resolves with the result of parsing the body text as JSON.</p>
      <h3>16. What is the difference between 'for' and 'for...in' loops in JavaScript?</h3>
      <p>The <code>"for"</code> loop in JavaScript iterates sequentially over array or string elements, controlled by initialization, condition, and increment. The <code>"for-in"</code> loop iterates over the enumerable properties of an object in an arbitrary order.</p>
      <h3>17. What is an Anonymous function?</h3>
      <p>An <code>anonymous function</code> is a function without a name. These are commonly assigned to a variable or used as a callback function.</p>
      <h3>18. What is fetch method?</h3>
      <p>The <code>fetch method</code> is used to retrieve resources from the Internet. It returns a promise. We need to provide the fetch URL and request configuration options as parameters to the fetch method.</p>
      <h3>19. What is a ternary operator?</h3>
      <p>A <code>ternary operator</code> is a type of conditional operator that takes three operands: a condition to check, a result for true, and a result for false. It's a shorthand way of writing an "if-else" statement.</p>
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

export default JavaScript_Practice_Set_3
