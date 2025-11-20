import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Todos_Application_CS_5 = ({
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
              <td>includes, indexOf, lastIndexOf, find, findIndex()</td>
              <td>Finding Elements</td>
            </tr>
            <tr>
              <td>push, unshift, splice</td>
              <td>Adding Elements</td>
            </tr>
            <tr>
              <td>pop, shift, splice</td>
              <td>Removing Elements</td>
            </tr>
            <tr>
              <td>concat, slice</td>
              <td>Combining & Slicing Arrays</td>
            </tr>
            <tr>
              <td>join</td>
              <td>Joining Array Elements</td>
            </tr>
            <tr>
              <td>sort</td>
              <td>Sorting Array Elements</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 1.1 splice() */}
      <section>
        <h3>1.1 splice()</h3>
        <p>
          The <code>splice()</code> method changes the contents of an array.
        </p>
        <p>
          Using <b>splice()</b> method, we can:
        </p>
        <ul>
          <li>Remove existing items</li>
          <li>Replace existing items</li>
          <li>Add new items</li>
        </ul>

        <h4>1.1.1 Removing existing items</h4>
        <p>
          <b>Syntax:</b> <code>arr.splice(Start, Delete Count)</code>
        </p>
        <ul>
          <li>Start: Starting Index</li>
          <li>
            Delete Count: Number of items to be removed, starting from the given
            index
          </li>
        </ul>
        <CodeBlock
          language="javascript"
          code={`let myArray = [5, "six", 2, 8.2];
myArray.splice(2, 2);
console.log(myArray);  // [5, "six"]

let deletedItems = myArray.splice(2, 2);
console.log(deletedItems);  // [2, 8.2]`}
        />
        <p>
          The <code>splice()</code> method returns an array containing the
          deleted items.
        </p>

        <h4>1.1.2 Adding new items</h4>
        <p>
          <b>Syntax:</b>{" "}
          <code>arr.splice(Start, Delete Count, Item1, Item2 ...)</code>
        </p>
        <p>
          Here the <code>Item1, Item2 ... </code>are the items to be added,
          starting from the given index.
        </p>
        <CodeBlock
          language="javascript"
          code={`let myArray = [5, "six", 2, 8.2];
myArray.splice(2, 0, "one", false);
console.log(myArray);  // [5, "six", "one", false, 2, 8.2]`}
        />

        <h4>1.1.3 Replacing existing items</h4>
        <p>
          <b>Syntax:</b>{" "}
          <code>arr.splice(Start, Delete Count, Item1, Item2 ...)</code>
        </p>
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
        <p>
          The <code>findIndex()</code> method returns the first item's index
          that satisfies the provided testing function. <b>returns -1</b> if not
          found.
        </p>
        <p>
          <b>Syntax:</b> <code>arr.findIndex(Testing Function)</code>
        </p>
        <p>
          Here Testing Function is a function to execute on each value in the
          array.
        </p>
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
        <p>
          The <code>includes()</code> method returns <b>true</b> if the provided
          item exists in the array. If no item is found, it returns <b>false</b>
          .
        </p>
        <p>
          <b>Syntax:</b> <code>arr.includes(item)</code>
        </p>
      </section>

      {/* 1.4 indexOf() */}
      <section>
        <h3>1.4 indexOf()</h3>
        <p>
          The <code>indexOf()</code> method returns the first index at which a
          given item can be found in the array. If no item is found, it returns{" "}
          <b>-1</b>.
        </p>
        <p>
          <b>Syntax:</b> <code>arr.indexOf(item)</code>
        </p>
      </section>

      {/* 1.5 lastIndexOf() */}
      <section>
        <h3>1.5 lastIndexOf()</h3>
        <p>
          The<code>lastIndexOf()</code> method returns the last index at which a
          given item can be found in the array. If no item is found, it returns
          <b>-1</b>
        </p>
        <p>
          <b>Syntax:</b> <code>arr.lastIndexOf(item)</code>
        </p>
      </section>

      {/* 1.6 find() */}
      <section>
        <h3>1.6 find()</h3>
        <p>
          The <code>find()</code> method returns the first item's value that
          satisfies the provided testing function. If no item is found, it
          returns <b>undefined</b>.
        </p>
        <p>
          <b>Syntax:</b> <code>arr.find(Testing Function)</code>
        </p>
      </section>

      {/* 1.7 unshift() */}
      <section>
        <h3>1.7 unshift()</h3>
        <p>
          The <code>unshift()</code> method adds one or more items to the
          beginning of an array and returns the new array length.
        </p>
        <p>
          <b>Syntax:</b> <code>arr.unshift(item1, item2, ...)</code>
        </p>
      </section>

      {/* 1.8 shift() */}
      <section>
        <h3>1.8 shift()</h3>
        <p>
          The <code>shift()</code> method removes the first item from an array
          and returns that removed item.
        </p>
        <p>
          <b>Syntax:</b> <code>arr.shift()</code>
        </p>
      </section>

      {/* 1.9 concat() */}
      <section>
        <h3>1.9 concat()</h3>
        <p>
          The <code>concat()</code> method can be used to merge two or more
          arrays.
        </p>
        <p>
          This method does not change the existing arrays but instead returns a
          new array.
        </p>
        <p>
          <b>Syntax:</b> <code>let newArray = arr1.concat(arr2)</code>
        </p>
      </section>

      {/* 1.10 slice() */}
      <section>
        <h3>1.10 slice()</h3>
        <p>
          The <code>slice()</code> method returns a portion between the
          specified start index and end index(end index not included) of an
          array into a new array.
        </p>
        <p>
          <b>Syntax:</b> <code>arr.slice(startIndex, endIndex)</code>
        </p>
      </section>

      {/* 1.11 join() */}
      <section>
        <h3>1.11 join()</h3>
        <p>
          The <code>join()</code> method creates and returns a new string by
          concatenating all of the items in an array, separated by commas or a
          specified separator string.
        </p>
        <p>
          If the array has only one item, then it will be returned without using
          the specified separator.
        </p>
        <p>
          <b>Syntax:</b> <code>arr.join(separator)</code>
        </p>
      </section>

      {/* 1.12 sort() */}
      <section>
        <h3>1.12 sort()</h3>
        <p>
          The <code>sort()</code> method sorts the items of an array and returns
          the sorted array. The default sort order is ascending.
        </p>
        <p>
          <b>Syntax:</b> <code>arr.sort()</code>
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

export default Todos_Application_CS_5;
