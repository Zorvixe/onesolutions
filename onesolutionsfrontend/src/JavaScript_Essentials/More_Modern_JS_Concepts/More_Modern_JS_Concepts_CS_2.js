import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const More_Modern_JS_Concepts_CS_2 = ({
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
      <h1>More Modern JS Concepts Part 2 | Cheat Sheet</h1>

      {/* 1. Operators */}
      <section>
        <h2>1. Operators</h2>

        {/* 1.1 Ternary Operator */}
        <h3>1.1 Ternary Operator</h3>
        <p>
          A Ternary Operator can be used to replace <code>if...else</code>{" "}
          statements in some situations.
        </p>

        <p>
          <b>Syntax:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`condition ? expressionIfTrue : expressionIfFalse`}
        />

        <h3>Code</h3>
        <CodeBlock
          language="javascript"
          code={`let speed = 70;
let message = speed >= 100 ? "Too Fast" : "OK";
console.log(message);  // OK`}
        />
        <h3>Output</h3>
        <OutputBlock output={"OK"} />
      </section>

      {/* 2. Conditional Statements */}
      <section>
        <h2>2. Conditional Statements</h2>

        {/* 2.1 Switch Statement */}
        <h3>2.1 Switch Statement</h3>
        <p>
          A <code>Switch</code> statement is a conditional statement like{" "}
          <code>if...else</code> statement used in decision making.
        </p>

        <p>
          <b>Syntax:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`switch (expression) {
  case value1:
    /* Statements executed when the result of expression matches value1 */
    break;
  case value2:
    /* Statements executed when the result of expression matches value2 */
    break;
  ...
  case valueN:
    /* Statements executed when the result of expression matches valueN */
    break;
}`}
        />

        <h3>Example</h3>
        <CodeBlock
          language="javascript"
          code={`let day = 1;
          switch (day) {
            case 0:
              console.log("Sunday");
              break;
            case 1:
              console.log("Monday");  // Monday
              break;
            case 2:
              console.log("Tuesday");
              break;
            case 3:
              console.log("Wednesday");
              break;
            case 4:
              console.log("Thursday");
              break;
            case 5:
              console.log("Friday");
              break;
            case 6:
              console.log("Saturday");
              break;
            default:
              console.log("Invalid");
              break;
          }`}
        />
        <h3>Output</h3>
        <OutputBlock output={"Monday"} />

        {/* Missing break */}
        <h3>2.1.1 What happens if we forgot a break?</h3>
        <p>
          If there is no <code>break</code> statement, then the execution
          continues with the next case until the break statement is met.
        </p>

        <h3>Code</h3>
        <CodeBlock
          language="javascript"
          code={`let day = 4;
          switch (day) {
            case 0:
              console.log("Sunday");
              break;
            case 1:
              console.log("Monday");
              break;
            case 2:
              console.log("Tuesday");
              break;
            case 3:
              console.log("Wednesday");
              break;
            case 4:
              console.log("Thursday");*
            case 5:
              console.log("Friday");
            case 6:
              console.log("Saturday");*
            default:
              console.log("Invalid");*
          }`}
        />
      </section>

      {/* 3. Defining Functions */}
      <section>
        <h2>3. Defining Functions</h2>
        <p>There are multiple ways to define a function:</p>
        <ul>
          <li>Function Declaration</li>
          <li>Function Expression</li>
          <li>Arrow Functions</li>
          <li>Function Constructor, etc.</li>
        </ul>
      </section>

      {/* 3.1 Arrow Functions */}
      <section>
        <h3>3.1 Arrow Functions</h3>
        <p>
          An Arrow function is a simple and concise syntax for defining
          functions.
        </p>
        <p> It is an alternative to a function expression.</p>

        <p>
          <b>Syntax:</b>
        </p>
        <CodeBlock
          language="javascript"
          code={`let sum = (param1, param2, …) => {
  // statement(s)
};
sum();`}
        />

        <h3>Example</h3>
        <CodeBlock
          language="javascript"
          code={`let sum = (a, b) => {
  let result = a + b;
  return result;
};
console.log(sum(4, 3));`}
        />
        <h3>Output</h3>
        <OutputBlock output={7} />

        {/* Simple Expressions */}
        <h3>3.1.1 Simple Expressions</h3>
        <p>
          In arrow functions, the <code>return</code> statement and curly braces
          are not required for simple expressions.
        </p>
        <CodeBlock
          language="javascript"
          code={`let sum = (a, b) => a + b;
console.log(sum(4, 3));  // 7`}
        />
        <OutputBlock output={7} />

        {/* One parameter */}
        <h3>3.1.2 One parameter</h3>
        <p>
          If there is only one parameter, then parentheses are not required.
        </p>
        <CodeBlock
          language="javascript"
          code={`let greet = name => \`Hi \${name}!\`;
console.log(greet("Rahul"));  // Hi Rahul!`}
        />
        <OutputBlock output={"Hi Rahul!"} />

        {/* No parameters */}
        <h3>3.1.3 No parameters</h3>
        <p>
          If there are no parameters, parentheses will be empty, but they should
          be present.
        </p>
        <CodeBlock
          language="javascript"
          code={`let sayHi = () => "Hello!";
console.log(sayHi());  // Hello!`}
        />
        <OutputBlock output={"Hello!"} />

        {/* Returning Objects */}
        <h3>3.1.4 Returning Objects</h3>
        <CodeBlock
          language="javascript"
          code={`let createUser = name => {
  return {
    firstName: name
  };
};
console.log(createUser("Rahul"));  // Object {firstName: "Rahul"}`}
        />
        <OutputBlock output={`Object {firstName: "Rahul"}`} />

        <h4>Simple Expression</h4>
        <CodeBlock
          language="javascript"
          code={`let createUser = name => { firstName: "Rahul" };
console.log(createUser());  // undefined`}
        />
        <p>
          JavaScript considers the two curly braces as a code block, but not as
          an object syntax.
        </p>
        <p>
          So, wrap the object with parentheses to distinguish with a code block.
        </p>
        <CodeBlock
          language="javascript"
          code={`let createUser = name => ({ firstName: "Rahul" });
console.log(createUser());  // Object {firstName: "Rahul"}`}
        />
        <OutputBlock output={`Object {firstName: "Rahul"}`} />
      </section>

      <p>
        Try out the Ternary Operator, Switch Statements, and Arrow Functions in
        the JavaScript Code Playground.
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

export default More_Modern_JS_Concepts_CS_2;
