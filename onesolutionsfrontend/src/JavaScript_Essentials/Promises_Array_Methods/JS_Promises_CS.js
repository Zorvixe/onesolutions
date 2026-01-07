import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const JS_Promises_CS = ({ subtopicId, goalName, courseName, subtopic }) => {
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
      <h1>JS Promises | Cheat Sheet</h1>

      {/* 1. Synchronous Execution */}
      <section>
        <h2>1. Synchronous Execution</h2>
        <p>
          JavaScript executes code line by line. This behavior is called{" "}
          <b>synchronous execution</b>. In JS, <code>alert()</code> works
          synchronously.
        </p>

        <b>Example :</b>
        <CodeBlock
          language="javascript"
          code={`alert("First Line");
alert("Second Line");
alert("Third Line");`}
        />
      </section>

      {/* 2. Asynchronous Execution */}
      <section>
        <h2>2. Asynchronous Execution</h2>
        <p>
          In asynchronous execution, the next line doesn’t wait for the previous
          line to finish.
        </p>

        <h3>Example :</h3>
        <CodeBlock
          language="javascript"
          code={`const url = "https://apis.ccbp.in/jokes/random";
fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((jsonData) => {
    // statement-1
    console.log(jsonData); 
    // Object{ value:"The computer tired when it got home because it had a hard drive" }
  });
// statement-2
console.log("fetching done"); // fetching done`}
        />
        <p>
          In the above example, the second statement won’t wait until the first
          one finishes. The <code>fetch()</code> method works asynchronously.
        </p>
      </section>

      {/* 3. JS Promises */}
      <section>
        <h2>3. JS Promises</h2>
        <ol>
          <li>
            Promise is a way to handle <b>Asynchronous</b> operations.
          </li>
          <li>
            A promise is an object that represents a result of operation that
            will be returned at some point in the future.
          </li>
        </ol>
        <p>
          A <b>Promise</b> is an object that represents the result of an
          asynchronous operation that will be available in the future.
        </p>

        <h3>Example :</h3>
        <CodeBlock
          language="javascript"
          code={`const url = "https://apis.ccbp.in/jokes/random";
let responseObject = fetch(url);
console.log(responseObject); // Promise{ [[PromiseStatus]]:pending, [[PromiseValue]]:undefined }
console.log("fetching done"); // fetching done`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>A promise will be in any one of the three states:</p>
          <ul>
            <li>
              <b>Pending :</b> Neither fulfilled nor rejected
            </li>
            <li>
              <b>Fulfilled :</b> Operation completed successfully
            </li>
            <li>
              <b>Rejected :</b> Operation failed
            </li>
          </ul>
        </div>
      </section>

      {/* 3.1 Resolved State */}
      <section>
        <h3>3.1 Resolved State</h3>
        <p>When a Promise is resolved, the result is a value.</p>
        <CodeBlock
          language="javascript"
          code={`const url = "https://apis.ccbp.in/jokes/random";
let responsePromise = fetch(url);
responsePromise.then((response) => {
  console.log(response); // Response{ … }
});`}
        />
      </section>

      {/* 3.2 Rejected State */}
      <section>
        <h3>3.2 Rejected State</h3>
        <p>
          Fetching a resource can be failed for various reasons like:
          <ul>
            <li>URL is spelled incorrectly</li>
            <li>Server is taking too long to respond</li>
            <li>Network failure error, etc.</li>
          </ul>
        </p>
        <CodeBlock
          language="javascript"
          code={`const url = "https://a.ccbp.in/random";
let responsePromise = fetch(url);
responsePromise.then((response) => {
  return response;
});
responsePromise.catch((error) => {
  console.log(error); // TypeError{ "Failed to fetch" }
});`}
        />
      </section>

      {/* 3.3 Promise Chaining */}
      <section>
        <h3>3.3 Promise Chaining</h3>
        <p>
          Combining multiple <code>.then()</code> or <code>.catch()</code> calls
          on a single Promise is called <b>Promise Chaining</b>.
        </p>

        <h4>Syntax :</h4>
        <CodeBlock
          language="javascript"
          code={`const url = "INCORRECT_RESOURCE_URL";
let responsePromise = fetch(url);
responsePromise
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });`}
        />
      </section>

      {/* 3.3.1 OnSuccess Callback returns Promise */}
      <section>
        <h3>3.3.1 OnSuccess Callback returns Promise</h3>
        <p>Here, log the response in JSON format.</p>
        <CodeBlock
          language="javascript"
          code={`const url = "RESOURCE_URL";
let responsePromise = fetch(url);
responsePromise.then((response) => {
  console.log(response.json());
});`}
        />
      </section>

      {/* 3.3.2 Chaining OnSuccess Callback again */}
      <section>
        <h3>3.3.2 Chaining OnSuccess Callback again</h3>
        <CodeBlock
          language="javascript"
          code={`const url = "https://apis.ccbp.in/jokes/random";
let responsePromise = fetch(url);
responsePromise
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });`}
        />
      </section>

      {/* 3.4 Fetch with Error Handling */}
      <section>
        <h3>3.4 Fetch with Error Handling</h3>
        <p>
          Check the behavior of the code with both valid and invalid URLs to
          understand how <code>fetch()</code> handles errors.
        </p>
        <CodeBlock
          language="javascript"
          code={`const url = "https://apis.ccbp.in/jokes/random";
let responsePromise = fetch(url);

responsePromise
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data); // Object { value: "They call it the PS4 because there are only 4 games worth playing!"
  })
  .catch((error) => {
    console.log(error);
  });`}
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

export default JS_Promises_CS;
