import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const More_JS_Conceptes_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>More JS Concepts | Cheat Sheet</h1>

      {/* 1. Scoping */}
      <section>
        <h2>1. Scoping</h2>
        <p>
          The scope is the region of the code where a variable can be accessed.
        </p>
        <p>In JavaScript there are two types of scope:</p>
        <ul>
          <li>Block scope</li>
          <li>Global scope</li>
        </ul>
      </section>

      {/* 1.1 Block Scope */}
      <section>
        <h3>1.1 Block Scope</h3>
        <p>
          If a variable is declared with const or let within a curly brace ({}),
          then it is said to be defined in the <b>Block Scope</b>.
        </p>
        <ul>
          <li>if..else</li>
          <li>function (){}</li>
          <li>switch </li>
          <li>for..of, etc.</li>
        </ul>
        <b>Example: </b>
        <CodeBlock
          language="javascript"
          code={`let age = 27;
if (age > 18) {
  let x = 0;
  console.log(x); // 0
}
console.log(x); // ReferenceError: x is not defined`}
        />
      </section>

      {/* 1.2 Global Scope */}
      <section>
        <h3>1.2 Global Scope</h3>
        <p>
          If a variable is declared outside all functions and curly braces ({}),
          then it is said to be defined in the <b>Global Scope</b>.
        </p>
        <p>
          When a variable declared with <code>let</code> or <code>const</code>{" "}
          is accessed, Javascript searches for the variable in the block scopes
          first followed by global scopes.
        </p>
        <CodeBlock
          language="javascript"
          code={`const x = 30;
function myFunction() {
  if (x > 18) {
    console.log(x); // 30
  }
}
myFunction();`}
        />
      </section>

      {/* 2. Hoisting */}
      <section>
        <h2>2. Hoisting</h2>
        <h3>2.1 Function Declarations</h3>
        <p>
          Hoisting is a JavaScript mechanism where <b>function declarations</b>{" "}
          are moved to the top of their scope before code execution.
        </p>
        <CodeBlock
          language="javascript"
          code={`let x = 15;
let y = 10;
let result = add(x, y);
console.log(result); // 25

function add(a, b) {
  return a + b;
}`}
        />

        <h3>2.2 Function Expressions</h3>
        <p>
          Function expressions in JavaScript are <b>not hoisted</b>.
        </p>
        <CodeBlock
          language="javascript"
          code={`myFunction();
let myFunction = function () {
  let x = 5;
  console.log(x); // ReferenceError
};`}
        />

        <h3>2.3 Arrow Functions</h3>
        <p>
          Arrow Functions in JavaScript are <b>not hoisted</b>.
        </p>
        <CodeBlock
          language="javascript"
          code={`myFunction();
let myFunction = () => {
  let x = 5;
  console.log(x); // ReferenceError
};`}
        />
      </section>

      {/* 3. More Array Methods */}
      <section>
        <h2>3. More Array Methods</h2>
        <p>
          The <code>map()</code>, <code>forEach()</code>, <code>filter()</code>{" "}
          and <code>reverse()</code> are some of the most commonly used array
          methods in JavaScript.
        </p>
      </section>

      {/* 3.1 map() */}
      <section>
        <h3>3.1 Map()</h3>
        <ol>
          <li>
            The <code>map()</code> method creates a new array with the results
            of calling a function for every array element.{" "}
          </li>
          <li>
            The <code>map()</code> method calls the provided function once for
            each element in an array, in order.{" "}
          </li>
        </ol>{" "}
        <p>
          {" "}
          <b> Syntax:</b>{" "}
          <code>array.map(callback(currentValue, index, arr))</code>
        </p>
        <CodeBlock
          language="javascript"
          code={`const numbers = [1, 2, 3, 4];
const result = numbers.map((number) => number * number);
console.log(result); // [1, 4, 9, 16]`}
        />
        <ul>
          <li>
            Here the callback is a function that is called for every element of
            array.
          </li>
          <li>
            <b>currentValue</b> is the value of the current element and index is
            the array <b>index</b> of the current element. Here index and arr
            are optional arguments.
          </li>
        </ul>
      </section>

      {/* 3.2 forEach() */}
      <section>
        <h3>3.2 forEach()</h3>
        <p>
          Executes a provided function once for each array element. Always
          returns undefined.{" "}
        </p>
        <p>
          <b> Syntax:</b>{" "}
          <code>array.forEach(callback(currentValue, index, arr))</code>
        </p>
        <p>
          <CodeBlock
            language="javascript"
            code={`let fruits = ["apple", "orange", "cherry"];
fruits.forEach((fruit) => console.log(fruit));`}
          />
        </p>
      </section>

      {/* 3.3 filter() */}
      <section>
        <h3>3.3 filter()</h3>
        <p>
          Creates a new array with elements that pass the test function. Returns
          an empty array if no elements pass.
        </p>
        <p>
          <b> Syntax:</b>{" "}
          <code>array.filter(function(currentValue, index, arr))</code>
        </p>
        <CodeBlock
          language="javascript"
          code={`const numbers = [1, -2, 3, -4];
const positiveNumbers = numbers.filter((number) => number > 0);
console.log(positiveNumbers); // [1, 3]`}
        />
      </section>

      {/* 3.4 reduce() */}
      <section>
        <h3>3.4 reduce()</h3>
        <p>
          Executes a reducer function on each element resulting in a single
          output value.
        </p>
        <p>
          <b> Syntax:</b>
          <code>
            array.reduce(function(accumulator, currentValue, index, arr),
            initialValue)
          </code>
        </p>
        <CodeBlock
          language="javascript"
          code={`const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
console.log(array1.reduce(reducer)); // 10`}
        />
      </section>

      {/* 3.5 every() */}
      <section>
        <h3>3.5 every()</h3>
        <p>Tests whether all elements pass a test. Returns Boolean. </p>
        <p>
          <b> Syntax:</b>{" "}
          <code>array.every(function(currentValue, index, arr))</code>
        </p>
        <CodeBlock
          language="javascript"
          code={`let array1 = [32, 33, 16, 20];
const result = array1.every((array1) => array1 < 40);
console.log(result); // true`}
        />
      </section>

      {/* 3.6 some() */}
      <section>
        <h3>3.6 some()</h3>
        <p>
          Tests whether at least one element passes a test. Returns Boolean.{" "}
        </p>
        <p>
          <b> Syntax:</b>
          <code>array.some(function(currentValue, index, arr))</code>
        </p>
        <CodeBlock
          language="javascript"
          code={`const myAwesomeArray = ["a", "b", "c", "d", "e"];
const result = myAwesomeArray.some((alphabet) => alphabet === "d");
console.log(result); // true`}
        />
      </section>

      {/* 3.7 reverse() */}
      <section>
        <h3>3.7 reverse()</h3>
        <p>
          Reverses the order of elements in an array. First becomes last, last
          becomes first.{" "}
        </p>
        <p>
          <b> Syntax:</b> <code>array.reverse()</code>
        </p>
        <CodeBlock
          language="javascript"
          code={`const myArray = ["iBHubs", "CyberEye", "ProYuga"];
const reversedArray = myArray.reverse();
console.log(reversedArray); // ["ProYuga", "CyberEye", "iBHubs"]`}
        />
      </section>

      {/* 3.8 flat() */}
      <section>
        <h3>3.8 flat()</h3>
        <p>
          Creates a new array with all sub-array elements concatenated
          recursively up to a specified depth.
        </p>
        <p>
          <b> Syntax:</b> <code>let newArray = arr.flat([depth])</code>
        </p>
        <CodeBlock
          language="javascript"
          code={`const arr1 = [0, 1, 2, [3, 4]];
const arr2 = [0, 1, 2, [[[3, 4]]]];
console.log(arr1.flat()); // [0, 1, 2, 3, 4]
console.log(arr2.flat(2)); // [0, 1, 2, [3, 4]]`}
        />
      </section>

      {/* 4. Mutable & Immutable methods */}
      <section>
        <h2>4. Mutable & Immutable Methods</h2>
        <p>
          Mutable methods will change the original array and Immutable methods
          won't change the original array.
        </p>
        <table>
          <thead>
            <tr>
              <th>Mutable Methods</th>
              <th>Immutable Methods</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>shift()</td>
              <td>map()</td>
            </tr>
            <tr>
              <td>unshift()</td>
              <td>filter()</td>
            </tr>
            <tr>
              <td>push()</td>
              <td>reduce()</td>
            </tr>
            <tr>
              <td>pop()</td>
              <td>forEach()</td>
            </tr>
            <tr>
              <td>sort()</td>
              <td>slice()</td>
            </tr>
            <tr>
              <td>reverse()</td>
              <td>join()</td>
            </tr>
            <tr>
              <td>splice(), etc.</td>
              <td>some(), etc.</td>
            </tr>
          </tbody>
        </table>
        <p>
          <i>
            Try out Mutable and Immutable methods in the JavaScript Code
            Playground.
          </i>
        </p>
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

export default More_JS_Conceptes_CS;
