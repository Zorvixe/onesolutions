import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const More_Modern_JS_Concepts_CS = ({
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
      <h1>More Modern JS Concepts | Cheat Sheet</h1>

      {/* 1. Spread Operator */}
      <section>
        <h2>1. Spread Operator</h2>
        <p>
          The <b>Spread Operator</b> is used to unpack an iterable (like an
          array or object) into individual elements.
        </p>

        <h3>1.1 Spread Operator with Arrays</h3>
        <CodeBlock
          language="javascript"
          code={`let arr1 = [2, 3];
let arr2 = [1, ...arr1, 4];
console.log(arr2);`}
        />
        <OutputBlock output={"[1, 2, 3, 4]"} />

        <h4>1.1.1 Creating a Copy</h4>
        <CodeBlock
          language="javascript"
          code={`let arr1 = [2, 3];
let arr2 = [...arr1];
console.log(arr2);`}
        />
        <OutputBlock output={"[2, 3]"} />

        <h4>1.1.2 Concatenation</h4>
        <CodeBlock
          language="javascript"
          code={`let arr1 = [2, 3];
let arr2 = [4, 5];
let arr3 = [...arr1, ...arr2];
console.log(arr3);`}
        />
        <OutputBlock output={"[2, 3, 4, 5]"} />

        <h3>1.2 Spread Operator with Objects</h3>
        <CodeBlock
          language="javascript"
          code={`let person = { name: "Rahul", age: 27 };
let personDetails = { ...person, city: "Hyderabad" };
console.log(personDetails);`}
        />
        <OutputBlock output={`{name: "Rahul", age: 27, city: "Hyderabad"}`} />

        <h4>1.2.1 Creating a Copy</h4>
        <CodeBlock
          language="javascript"
          code={`let person = { name: "Rahul", age: 27 };
let personDetails = { ...person };
console.log(personDetails);`}
        />
        <OutputBlock output={`{name: "Rahul", age: 27}`} />

        <h4>1.2.2 Concatenation</h4>
        <CodeBlock
          language="javascript"
          code={`let person = { name: "Rahul", age: 27 };
let address = { city: "Hyderabad", pincode: 500001 };
let personDetails = { ...person, ...address };
console.log(personDetails);`}
        />
        <OutputBlock
          output={`{name: "Rahul", age: 27, city: "Hyderabad", pincode: 500001}`}
        />

        <h3>1.3 Spread Operator with Function Calls</h3>
        <p>
          The Spread Operator syntax can be used to pass an array of arguments
          to the function. Extra values will be ignored if we pass more
          arguments than the function parameters.
        </p>
        <CodeBlock
          language="javascript"
          code={`function add(a, b, c) {
  return a + b + c;
}
let numbers = [1, 2, 3, 4, 5];
console.log(add(...numbers));`}
        />
        <OutputBlock output={"6"} />
      </section>

      {/* 2. Rest Parameter */}
      <section>
        <h2>2. Rest Parameter</h2>
        <p>
          The <b>Rest Parameter</b> syntax allows us to pack multiple values
          into an array.
        </p>
        <CodeBlock
          language="javascript"
          code={`function numbers(...args) {
  console.log(args);
}
numbers(1, 2, 3);`}
        />
        <OutputBlock output={"[1, 2, 3]"} />

        <h3>2.1 Destructuring Arrays and Objects with Rest Parameter Syntax</h3>

        <h4>2.1.1 Arrays</h4>
        <CodeBlock
          language="javascript"
          code={`let [a, b, ...rest] = [1, 2, 3, 4, 5];
console.log(a);
console.log(b);
console.log(rest);`}
        />
        <OutputBlock output={["1", "2", "[3, 4, 5]"]} />

        <h4>2.1.2 Objects</h4>
        <CodeBlock
          language="javascript"
          code={`let { firstName, ...rest } = {
  firstName: "Rahul",
  lastName: "Attuluri",
  age: 27
};
console.log(firstName);
console.log(rest);`}
        />
        <OutputBlock output={["Rahul", "{lastName: 'Attuluri', age: 27}"]} />

        <p>
          <b>Note:</b> The Rest parameter should always be the last parameter in
          a function definition.
        </p>

        <CodeBlock
          language="javascript"
          code={`function numbers(a, b, ...rest) {
  console.log(a);
  console.log(b);
  console.log(rest);
}
numbers(1, 2, 3, 4, 5);`}
        />
        <OutputBlock output={["1", "2", "[3, 4, 5]"]} />

        <p>Invalid Example:</p>
        <CodeBlock
          language="javascript"
          code={`function numbers(a, ...rest, b) {
  console.log(a);
  console.log(rest);
  console.log(b);
}
numbers(1, 2, 3, 4, 5);`}
        />
        <OutputBlock
          output={
            "Uncaught SyntaxError: Rest parameter must be last formal parameter"
          }
        />
      </section>

      {/* 3. Default Parameters */}
      <section>
        <h2>3. Functions</h2>
        <h3>3.1 Default Parameters</h3>
        <p>
          The <b>Default Parameters</b> allow us to provide default values to
          function parameters if no value is passed.
        </p>
        <CodeBlock
          language="javascript"
          code={`function numbers(a = 2, b = 5) {
  console.log(a);
  console.log(b);
}
numbers(3);`}
        />
        <OutputBlock output={["3", "5"]} />
      </section>

      {/* 4. Template Literals */}
      <section>
        <h2>4. Template Literals (Template Strings)</h2>
        <p>Template Literals are enclosed by backticks</p>
        <p> They and are used to: </p>
        <ul>
          <li>Embed variables or expressions in strings</li>
          <li>Write multiline strings</li>
        </ul>

        <p>
          Variables or expressions can be embedded using a dollar sign with
          curly braces <code>${"{ }"}</code> syntax.
        </p>

        <CodeBlock
          language="javascript"
          code={`let firstName = "Rahul";
console.log(\`Hello \${firstName}!\`);`}
        />
        <OutputBlock output={"Hello Rahul!"} />
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

export default More_Modern_JS_Concepts_CS;
