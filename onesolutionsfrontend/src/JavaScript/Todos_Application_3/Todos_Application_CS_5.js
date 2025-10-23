import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Todos_Application_CS_5 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Todos Application | Part 5 | Cheat Sheet</h1>

      {/* 1. Array Methods */}
      <section>
        <h2>1. Array Methods</h2>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Method</th>
              <th>Functionality</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>includes, indexOf, lastIndexOf, find, findIndex()</code></td>
              <td>Finding Elements</td>
            </tr>
            <tr>
              <td><code>push, unshift, splice</code></td>
              <td>Adding Elements</td>
            </tr>
            <tr>
              <td><code>pop, shift, splice</code></td>
              <td>Removing Elements</td>
            </tr>
            <tr>
              <td><code>concat, slice</code></td>
              <td>Combining & Slicing Arrays</td>
            </tr>
            <tr>
              <td><code>join</code></td>
              <td>Joining Array Elements</td>
            </tr>
            <tr>
              <td><code>sort</code></td>
              <td>Sorting Array Elements</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 1.1 splice() */}
      <section>
        <h3>1.1 splice()</h3>
        <p>The splice() method changes the contents of an array. Using splice() we can:</p>
        <ul>
          <li>Remove existing items</li>
          <li>Replace existing items</li>
          <li>Add new items</li>
        </ul>

        <h4>1.1.1 Removing existing items</h4>
        <p>Syntax: <code>arr.splice(Start, Delete Count)</code></p>
        <CodeBlock
          language="javascript"
          code={`let myArray = [5, "six", 2, 8.2];
myArray.splice(2, 2);
console.log(myArray);  // [5, "six"]

let deletedItems = myArray.splice(2, 2);
console.log(deletedItems);  // [2, 8.2]`}
        />

        <h4>1.1.2 Adding new items</h4>
        <p>Syntax: <code>arr.splice(Start, Delete Count, Item1, Item2 ...)</code></p>
        <CodeBlock
          language="javascript"
          code={`let myArray = [5, "six", 2, 8.2];
myArray.splice(2, 0, "one", false);
console.log(myArray);  // [5, "six", "one", false, 2, 8.2]`}
        />

        <h4>1.1.3 Replacing existing items</h4>
        <p>Syntax: <code>arr.splice(Start, Delete Count, Item1, Item2 ...)</code></p>
        <CodeBlock
          language="javascript"
          code={`let myArray = [5, "six", 2, 8.2];
myArray.splice(2, 1, true);
console.log(myArray);  // [5, "six", true, 8.2]`}
        />
      </section>

      {/* 1.2 findIndex() */}
      <section>
        <h3>1.2 findIndex()</h3>
        <p>The <code>findIndex()</code> method returns the first item's index that satisfies the provided testing function. Returns -1 if not found.</p>
        <p>Syntax: <code>arr.findIndex(Testing Function)</code></p>
        <CodeBlock
          language="javascript"
          code={`let myArray = [5, 12, 8, 130, 44];
let itemIndex = myArray.findIndex(function(eachItem) {
  console.log(eachItem);
});`}
        />
      </section>

      {/* 1.3 includes() */}
      <section>
        <h3>1.3 includes()</h3>
        <p>The <code>includes()</code> method returns true if the provided item exists in the array. Otherwise, false.</p>
        <p>Syntax: <code>arr.includes(item)</code></p>
      </section>

      {/* 1.4 indexOf() */}
      <section>
        <h3>1.4 indexOf()</h3>
        <p>Returns the first index of an item, or -1 if not found.</p>
        <p>Syntax: <code>arr.indexOf(item)</code></p>
      </section>

      {/* 1.5 lastIndexOf() */}
      <section>
        <h3>1.5 lastIndexOf()</h3>
        <p>Returns the last index of an item, or -1 if not found.</p>
        <p>Syntax: <code>arr.lastIndexOf(item)</code></p>
      </section>

      {/* 1.6 find() */}
      <section>
        <h3>1.6 find()</h3>
        <p>Returns the first item's value that satisfies the testing function. Returns undefined if not found.</p>
        <p>Syntax: <code>arr.find(Testing Function)</code></p>
      </section>

      {/* 1.7 unshift() */}
      <section>
        <h3>1.7 unshift()</h3>
        <p>Adds one or more items to the beginning of an array. Returns new array length.</p>
        <p>Syntax: <code>arr.unshift(item1, item2, ...)</code></p>
      </section>

      {/* 1.8 shift() */}
      <section>
        <h3>1.8 shift()</h3>
        <p>Removes the first item from an array and returns it.</p>
        <p>Syntax: <code>arr.shift()</code></p>
      </section>

      {/* 1.9 concat() */}
      <section>
        <h3>1.9 concat()</h3>
        <p>Merges two or more arrays and returns a new array.</p>
        <p>Syntax: <code>let newArray = arr1.concat(arr2)</code></p>
      </section>

      {/* 1.10 slice() */}
      <section>
        <h3>1.10 slice()</h3>
        <p>Returns a portion between start and end index (end not included) as a new array.</p>
        <p>Syntax: <code>arr.slice(startIndex, endIndex)</code></p>
      </section>

      {/* 1.11 join() */}
      <section>
        <h3>1.11 join()</h3>
        <p>Creates a new string by concatenating all items separated by commas or a given separator.</p>
        <p>Syntax: <code>arr.join(separator)</code></p>
      </section>

      {/* 1.12 sort() */}
      <section>
        <h3>1.12 sort()</h3>
        <p>Sorts array items in ascending order by default.</p>
        <p>Syntax: <code>arr.sort()</code></p>
      </section>

      {/* Continue Button */}
      <div className="view-continue" style={{ marginTop: "20px" }}>
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

export default Todos_Application_CS_5;
