import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Callbacks_Schedulers_CS = ({
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
      <h1>Callbacks & Schedulers | Cheat Sheet</h1>

      {/* 1. Callback function */}
      <section>
        <h2>1. Callback function</h2>
        <p>
          A Callback is a function that is passed as an argument to another
          function.
        </p>

        <h3>1.1 Passing a function as an argument</h3>

        <CodeBlock
          language="javascript"
          code={`function displayGreeting(displayName) {
  console.log("Hello");
  displayName();
  console.log("Good Morning!");
}
displayGreeting(function() {
  console.log("Rahul");
});`}
        />

        <h3>1.2 Passing a function name as an argument</h3>

        <CodeBlock
          language="javascript"
          code={`function displayGreeting(displayName) {
  console.log("Hello");
  displayName();
  console.log("Good Morning!");
}
function displayRahul() {
  console.log("Rahul");
}
displayGreeting(displayRahul);`}
        />

        <h3>1.3 Passing a function expression as an argument</h3>

        <CodeBlock
          language="javascript"
          code={`function displayGreeting(displayName) {
  console.log("Hello");
  displayName();
  console.log("Good Morning!");
}
let displayRam = function() {
  console.log("Ram");
};
displayGreeting(displayRam);`}
        />
      </section>

      {/* 2. Schedulers */}
      <section>
        <h2>2. Schedulers</h2>
        <p>
          The Schedulers are used to schedule the execution of a callback
          function.
        </p>
        <p>There are different scheduler methods:</p>
        <ul>
          <li>setInterval()</li>
          <li>clearInterval()</li>
          <li>setTimeout()</li>
          <li>clearTimeout()</li>
        </ul>

        <h3>2.1 setInterval()</h3>
        <p>
          The <code>setInterval()</code> method allows us to run a function at
          the specified interval of time repeatedly.
        </p>
        <p>
          <b>Syntax:</b> <code>setInterval(function, delay)</code>;
        </p>
        <p>
          <b>function</b> - a callback function that is called repeatedly at the
          specified interval of time (delay).
        </p>
        <p>
          <b>delay</b> - time in milliseconds. (1 second = 1000 milliseconds)
        </p>

        <CodeBlock
          language="javascript"
          code={`let counter = 0;
setInterval(function() {
  console.log(counter);
  counter = counter + 1;
}, 1000);`}
        />

        <p>
          In the <b>setInterval()</b> method, the callback function repeatedly
          executes until the browser tab is closed or the scheduler is
          cancelled.
        </p>
        <p>
          When we call the <b>setInterval()</b> method, it returns a unique id.
          This unique id is used to cancel the callback function execution.
        </p>

        <h3>2.2 clearInterval()</h3>
        <p>
          The <code>clearInterval()</code> method cancels a schedule previously
          set up by calling <b>setInterval()</b>.
        </p>
        <p>
          To execute <code>clearInterval()</code>, we need to pass the uniqueId
          returned by <b>setInterval()</b> as an argument.
        </p>
        <p>
          <b>Syntax:</b> <code>clearInterval(uniqueId)</code>;
        </p>

        <CodeBlock
          language="javascript"
          code={`let counter = 0;
let uniqueId = setInterval(function() {
  console.log(counter);
  counter = counter + 1;
}, 1000);
clearInterval(uniqueId);`}
        />

        <h3>2.3 setTimeout()</h3>
        <p>
          The <code>setTimeout()</code> method executes a function after the
          specified time.
        </p>
        <p>
          <b>Syntax:</b> <code>setTimeout(function, delay);</code>
        </p>
        <p>
          <b>function</b> - a callback function that is called after the
          specified time (delay).
        </p>
        <p>
          <b>delay</b> - time in milliseconds.
        </p>

        <CodeBlock
          language="javascript"
          code={`let counter = 0;
setTimeout(function() {
  console.log(counter);
  counter = counter + 1;
}, 1000);`}
        />

        <h3>2.4 clearTimeout()</h3>
        <p>
          We can cancel the <code>setTimeout()</code> before it executes the
          callback function using <code>clearTimeout()</code> method.
        </p>
        <p>
          To execute <code>clearTimeout()</code>, we need to pass the uniqueId
          returned by <code>setTimeout()</code> as an argument.
        </p>
        <p>
          <b>Syntax:</b> <code>clearTimeout(uniqueId);</code>
        </p>

        <CodeBlock
          language="javascript"
          code={`let counter = 0;
let uniqueId = setTimeout(function() {
  console.log(counter);
  counter = counter + 1;
}, 1000);
clearTimeout(uniqueId);`}
        />

        <p>
          Try out the <code>setInterval()</code>, <code>clearInterval()</code>,{" "}
          <code>setTimeout()</code>, and <code>clearTimeout()</code> methods.
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

export default Callbacks_Schedulers_CS;
