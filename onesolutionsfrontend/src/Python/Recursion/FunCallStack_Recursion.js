import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const FunCallStackRecursion = ({
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
      <h1>Function Call Stack & Recursion | Cheat Sheet</h1>

      {/* Stack */}
      <section>
        <h2>Stack</h2>
        <p>
          Stack is a data structure that stores items in an Last-In/First-Out
          manner.
        </p>
      </section>

      {/* Calling a Function */}
      <section>
        <h2>Calling a Function</h2>
        <p>
          Calling <code>function_1()</code> inside <code>function_2()</code>
        </p>
        <img
          src="/assets/img/Calling_a_Function.png"
          alt="Error Diagram"
          style={{ width: "50%", height: "300px" }}
        />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def get_largest_sqr(numbers):\n    return max([x * x for x in numbers])\nresult = get_largest_sqr([1, 2, 3, 4])\nprint(result)`}
        />
        <h3>Output</h3>
        <OutputBlock output={16} />
      </section>

      {/* Sum of Squares of List Items */}
      <section>
        <h2>Sum of Squares of List Items</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def sum_squares(numbers):\n    total = 0\n    for num in numbers:\n        total += num * num\n    return total\nresult = sum_squares([1, 2, 3])\nprint(result)`}
        />
        <h3>Output</h3>
        <OutputBlock output={14} />
      </section>

      {/* Function Call Stack */}
      <section>
        <h2>Function Call Stack</h2>
        <p>Function Call Stack keeps track of function calls in progress</p>
      </section>

      {/* Recursion */}
      <section>
        <h2>Recursion</h2>
        <p>A function calling itself is called a Recursion</p>
      </section>

      {/* Multiply N Numbers */}
      <section>
        <h2>Multiply N Numbers</h2>
        <p>
          Let's understand recursion with a simple example of multiplying N
          numbers
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def multiply_n(numbers):\n    if len(numbers) == 0:\n        return 1\n    return numbers[0] * multiply_n(numbers[1:])\nresult = multiply_n([2, 3, 4])\nprint(result)`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={24} />
      </section>

      {/* Base Case */}
      <section>
        <h2>Base Case</h2>
        <p>A recursive function terminates when base condition is met</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def factorial(n):\n    if n == 0 or n == 1:\n        return 1\n    return n * factorial(n - 1)\nresult = factorial(4)\nprint(result)`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={24} />
      </section>

      {/* Without Base Case */}
      <section>
        <h2>Without Base Case</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def infinite_recursion(n):\n    return n * infinite_recursion(n - 1)\nresult = infinite_recursion(5)`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock
          output={["RecursionError: maximum recursion depth exceeded"]}
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

export default FunCallStackRecursion;
