import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const JS_Promises_CS_2 = ({
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
      <h1>JS Promises | Part 2 | Cheat Sheet</h1>

      {/* 1. Asynchronous JS code style */}
      <section>
        <h2>1. Asynchronous JS Code Style</h2>
        <p>
          There are two main types of asynchronous code style you'll come across
          in JavaScript:
        </p>
        <ul>
          <li>
            <p>Callback based</p>{" "}
            <p>
              {" "}
              <b>Example:</b> <code>setTimeout()</code>,{" "}
              <code>setInterval()</code>{" "}
            </p>
          </li>
          <li>
            <p>Promise based</p>
            <p>
              <b>Example:</b> <code>fetch()</code>
            </p>
          </li>
        </ul>
      </section>

      {/* 2. Creating your own Promises */}
      <section>
        <h2>2. Creating Your Own Promises</h2>
        <p>
          Promises are the new style of async code that you'll see used in
          modern JavaScript.
        </p>

        <p>
          <b>Syntax:</b>
        </p>
        <CodeBlock
          code={`const myPromise = new Promise((resolveFunction, rejectFunction) => {
  // Async task
});`}
          language="javascript"
        />
        <p>In the above syntax:</p>

        <ul>
          <li>
            The Promise constructor takes a function (an executor) that will be
            executed immediately and passes in two functions: resolve, which
            must be called when the Promise is resolved (passing a result), and
            reject when it is rejected (passing an error).
          </li>
          <li>
            The executor is to be executed by the constructor, during the
            process of constructing the new Promise object.
          </li>
          <li>resolveFunction is called on promise fulfilled.</li>
          <li>rejectFunction is called on promise rejection.</li>
        </ul>

        <p>
          <b>Example:</b>
        </p>
        <CodeBlock
          code={`const myPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};
console.log(myPromise());`}
          language="javascript"
        />
      </section>

      {/* 2.1 Accessing Arguments from Resolve */}
      <section>
        <h3>2.1 Accessing Arguments from Resolve</h3>
        <p>
          When <code>resolve()</code> is executed, the callback inside{" "}
          <code>then()</code> will be executed.
        </p>
        <CodeBlock
          code={`const myPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise Resolved");
    }, 1000);
  });
};

myPromise().then((fromResolve) => {
  console.log(fromResolve); // Promise Resolved
});`}
          language="javascript"
        />
      </section>

      {/* 2.2 Accessing Arguments from Reject */}
      <section>
        <h3>2.2 Accessing Arguments from Reject</h3>
        <p>
          When <code>reject()</code> is executed, the callback inside{" "}
          <code>catch()</code> will be executed.
        </p>
        <CodeBlock
          code={`const myPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Promise Rejected");
    }, 2000);
  });
};

myPromise()
  .then((fromResolve) => {
    console.log(fromResolve);
  })
  .catch((fromReject) => {
    console.log(fromReject); // Promise Rejected
  });`}
          language="javascript"
        />
      </section>

      {/* 3. Async/Await */}
      <section>
        <h2>3. Async/Await</h2>
        <ol>
          <li>
            The Async/Await is a <b>modern way</b> to consume promises.
          </li>
          <li>
            The <b>Await</b> ensures processing completes before the next
            statement executes.
          </li>
        </ol>

        <p>
          <b>Syntax:</b>
        </p>
        <CodeBlock
          code={`const myPromise = async () => {
  let promiseObj1 = fetch(url1);
  let response1 = await promiseObj1;

  let promiseObj2 = fetch(url2);
  let response2 = await promiseObj2;
};

myPromise();`}
          language="javascript"
        />

        <ul>
          <li>
            Use <code>async</code> keyword before the function only if it is
            performing async operations.
          </li>
          <li>
            Should use <b>await</b> inside an <b>async</b> function only.
          </li>
        </ul>
      </section>

      {/* 3.1 Fetch with Async and Await */}
      <section>
        <h3>3.1 Fetch with Async and Await</h3>

        <p>
          <b>Example :</b>
        </p>
        <CodeBlock
          code={`const url = "https://apis.ccbp.in/jokes/random";

const doNetworkCall = async () => {
  const response = await fetch(url);
  const jsonData = await response.json();
  console.log(jsonData);
};

doNetworkCall();`}
          language="javascript"
        />
      </section>

      {/* 3.2 Error Handling */}
      <section>
        <h3>3.2 Error Handling with Async and Await</h3>
        <p>
          <b>Example :</b>
        </p>

        <CodeBlock
          code={`const url = "https://a.ccbp.in/jokes/random";

const doNetworkCall = async () => {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData);
  } catch (error) {
    console.log(error);
  }
};

doNetworkCall();`}
          language="javascript"
        />
      </section>

      {/* 3.3 Async Function always returns Promise */}
      <section>
        <h3>3.3 Async Function Always Returns Promise</h3>
        <p>
          <b>Example :</b>
        </p>
        <CodeBlock
          code={`const url = "https://apis.ccbp.in/jokes/random";

const doNetworkCall = async () => {
  const response = await fetch(url);
  const jsonData = await response.json();
  console.log(jsonData);
};

const asyncPromise = doNetworkCall();
console.log(asyncPromise);`}
          language="javascript"
        />
      </section>

      {/* 4. String Manipulations */}
      <section>
        <h2>4. String Manipulations</h2>
        <p>
          There are methods and properties available to all strings in
          JavaScript.
        </p>

        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>String Methods</th>
              <th>Functionality</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>toUpperCase(), toLowerCase()</td>
              <td>Converts from one case to another</td>
            </tr>
            <tr>
              <td>includes(), startsWith(), endsWith()</td>
              <td>Checks a part of the string</td>
            </tr>
            <tr>
              <td>split()</td>
              <td>Splits a string</td>
            </tr>
            <tr>
              <td>toString()</td>
              <td>Converts number to string</td>
            </tr>
            <tr>
              <td>trim(), replace()</td>
              <td>Updates a string</td>
            </tr>
            <tr>
              <td>concat(), slice(), substring()</td>
              <td>Combines & slices strings</td>
            </tr>
            <tr>
              <td>indexOf()</td>
              <td>Finds an index</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Examples 4.1 - 4.14 */}
      <section>
        <h3>4.1 trim()</h3>
        <p>
          The <code>trim( )</code> method removes whitespace from both ends of a
          string.
        </p>
        <p>
          <b>Syntax: </b> <code>string.trim()</code>
        </p>
        <CodeBlock
          code={`const greeting = "   Hello world!  ";
console.log(greeting);
console.log(greeting.trim());`}
          language="javascript"
        />

        <h3>4.2 slice()</h3>
        <p>
          The <code>slice()</code> method extracts a section of a string and
          returns it as a new string, without modifying the original string.
        </p>
        <p>
          <b>Syntax: </b> <code>string.slice(start, end)</code>
        </p>
        <CodeBlock
          code={`const text = "The quick brown fox";
console.log(text.slice(0, 3)); // The
console.log(text.slice(2, 3)); // e`}
          language="javascript"
        />

        <h3>4.3 toUpperCase()</h3>
        <p>
          The <code>toUpperCase()</code> method converts a string to upper case
          letters.
        </p>
        <p>
          <b>Syntax: </b> <code>string.toUpperCase()</code>
        </p>
        <CodeBlock
          code={`const text = "The quick brown fox";
console.log(text.toUpperCase()); // THE QUICK BROWN FOX`}
          language="javascript"
        />

        <h3>4.4 toLowerCase()</h3>
        <p>
          The <code>toLowerCase()</code> method converts a string to lower case
          letters.
        </p>
        <p>
          <b>Syntax: </b> <code>string.toLowerCase()</code>
        </p>
        <CodeBlock
          code={`const text = "Learn JavaScript";
console.log(text.toLowerCase()); // learn javascript`}
          language="javascript"
        />

        <h3>4.5 split()</h3>
        <p>
          The <code>split()</code> method is used to split a string into an
          array of substrings and returns the new array.
        </p>
        <p>
          <b>Syntax: </b> <code>string.split(separator, limit)</code>
        </p>
        <CodeBlock
          code={`const str = "He-is-a-good-boy";
const words = str.split("-");
console.log(words); // ["He", "is", "a", "good", "boy"]`}
          language="javascript"
        />

        <h3>4.6 replace()</h3>
        <p>
          The <code>replace()</code> method searches a string for a specified
          value, or a regular expression, and returns a new string where the
          specified value is replaced.
        </p>
        <p>
          <b>Syntax: </b> <code>string.replace(specifiedvalue, newvalue)</code>
        </p>
        <CodeBlock
          code={`const str = "Football is a popular sport. Many countries play Football.";
const words = str.replace("Football", "Soccer");
console.log(words); // Soccer is a popular sport...`}
          language="javascript"
        />

        <h3>4.7 includes()</h3>
        <p>
          The <code>includes()</code> method determines whether a string
          contains the characters of a specified string.
        </p>
        <p>
          It returns <code>true</code> if the string contains the value,
          otherwise it returns
          <code>false</code>.
        </p>
        <p>
          <b>Syntax: </b> <code>string.includes(searchvalue, start)</code>
        </p>
        <CodeBlock
          code={`const str = "Learn 4.0 Technologies";
const word = str.includes("Tech");
const number = str.includes("5.0");
console.log(word); // true
console.log(number); // false`}
          language="javascript"
        />

        <h3>4.8 concat()</h3>
        <p>
          The <code>concat()</code> method is used to join two or more strings.
        </p>
        <p>
          <b>Syntax: </b>{" "}
          <code>string.concat(string1, string2, ..., stringX)</code>
        </p>
        <CodeBlock
          code={`const str1 = "Hello";
const str2 = "World";
console.log(str1.concat(str2)); // HelloWorld
console.log(str1.concat(" Pavan", ". Have a nice day."));`}
          language="javascript"
        />

        <h3>4.9 indexOf()</h3>
        <p>
          The <code>trim( )</code> method returns the position of the first
          occurrence of a specified value in a string.
        </p>
        <p>
          <b>Syntax: </b> <code>string.indexOf(searchvalue, start)</code>
        </p>
        <CodeBlock
          code={`const str = "Building Global Startups";
console.log(str.indexOf("Global")); // 9
console.log(str.indexOf("up")); // 21`}
          language="javascript"
        />

        <h3>4.10 startsWith()</h3>
        <p>
          The <code>startsWith()</code> method determines whether a string
          begins with the characters of a specified string, returning true or
          false as appropriate.
        </p>
        <p>
          <b>Syntax: </b> <code>string.startsWith(searchvalue, start)</code>
        </p>
        <CodeBlock
          code={`const str = "World-class Products";
console.log(str.startsWith("rld")); // false
console.log(str.startsWith("World")); // true`}
          language="javascript"
        />

        <h3>4.11 endsWith()</h3>
        <p>
          The <code>endsWith()</code> method determines whether a string ends
          with the characters of a specified string, returning true or false as
          appropriate.
        </p>
        <p>
          <b>Syntax: </b> <code>string.endsWith(searchvalue, length)</code>
        </p>
        <CodeBlock
          code={`const str = "How are you?";
console.log(str.endsWith("you?")); // true
console.log(str.endsWith("re")); // false`}
          language="javascript"
        />

        <h3>4.12 toString()</h3>
        <p>
          The <code>toString()</code> method returns the value of a string
          object.
        </p>
        <p>
          <b>Syntax: </b> <code>string.toString()</code>
        </p>
        <CodeBlock
          code={`const number = 46;
const newNumber = number.toString();
console.log(newNumber); // "46"
console.log(typeof newNumber); // string`}
          language="javascript"
        />

        <h3>4.13 substring()</h3>
        <p>
          The <code>substring()</code> method returns the part of the string
          between the start and end indexes, or to the end of the string.
        </p>
        <p>
          <b>Syntax: </b> <code>string.substring(start, end)</code>
        </p>
        <CodeBlock
          code={`const str = "I am learning JavaScript";
console.log(str.substring(2, 9)); // am lear
console.log(str.substring(6)); // earning JavaScript`}
          language="javascript"
        />

        <h3>4.14 length</h3>
        <p>
          The <code>length</code> property returns the length of a string
          (number of characters).
        </p>
        <p>
          <b>Syntax: </b> <code>string.length</code>
        </p>
        <CodeBlock
          code={`const str = "Upgrade to CCBP Tech 4.0 Intensive";
console.log(str.length); // 34`}
          language="javascript"
        />
      </section>

      <p>
        <i>
          Try out different string manipulations in the JavaScript Code
          Playground.
        </i>
      </p>

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

export default JS_Promises_CS_2;
