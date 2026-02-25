import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Python_Standard_Library_CS_1 = ({
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
      <h1>Python Standard Library | Cheat Sheet</h1>

      {/* Built-in Functions */}
      <section>
        <h2>Built-in Functions</h2>
        <p>
          Built-in functions are readily available for reuse.
          <br /> Some of the built-in functions are:
        </p>
        <ul>
          <li>
            <b>print()</b>
          </li>
          <li>
            <b>max()</b>
          </li>
          <li>
            <b>min()</b>
          </li>
          <li>
            <b>len()</b> and many more...
          </li>
        </ul>
      </section>

      {/* Standard Library */}
      <section>
        <h2>Standard Library</h2>
        <p>
          Python provides several useful values (constants), classes, and
          functions.
        </p>
        <p>
          {" "}
          This collection of predefined utilities is referred to as the{" "}
          <b>Python Standard Library</b>.
        </p>

        <p>All these functionalities are organized into different modules.</p>
        <ul>
          <li>
            In Python context, any file containing a Python code is called a
            <b> module</b>
          </li>
          <li>
            These modules are further organized into folders known as{" "}
            <b>packages</b>
          </li>
        </ul>
        <p>Different modules include:</p>
        <ul>
          <li>collections</li>
          <li>random</li>
          <li>datetime</li>
          <li>math</li>
          <li>and many more...</li>
        </ul>
      </section>

      {/* Working with Standard Library */}
      <section>
        <h2>Working with Standard Library</h2>
        <p>
          To use a functionality defined in a module, we need to <b>import</b>{" "}
          that module in our program.
        </p>
        <CodeBlock language="python" code={`import module_name`} />

        <h3>Math Module</h3>
        <p>
          <code>math</code> module provides us to access some common math
          functions and constants.
        </p>
        <img
          src="/assets/img/math_img.png"
          alt="software"
          style={{ width: "75%", height: "400px" }}
        />
        <CodeBlock
          language="python"
          code={`import math
print(math.factorial(5))
print(math.pi)`}
        />
        <OutputBlock output={["120\n3.14159265358979"]} />
        <section>
          <h3>Importing Module</h3>
          <p>Importing a module and giving it a new name (aliasing)</p>

          <CodeBlock
            language="python"
            code={`import math as m1
print(m1.factorial(5))`}
          />

          <OutputBlock output={["120"]} />

          <h3>Importing from a Module</h3>
          <p>We can import just a specific definition from a module.</p>

          <CodeBlock
            language="python"
            code={`from math import factorial
print(factorial(5))`}
          />

          <OutputBlock output={["120"]} />

          <h3>Aliasing Imports</h3>
          <p>
            We can also import a specific definition from a module and alias it
          </p>

          <CodeBlock
            language="python"
            code={`from math import factorial as fact
print(fact(5))`}
          />

          <OutputBlock output={["120"]} />
        </section>

        <h2>Random Module</h2>
        <p>Randomness is useful in whenever uncertainty is required. </p>
        <p>For example: Rolling a dice, flipping a coin, etc., </p>

        <p>
          The <b>random</b> module provides utilities to generate randomness,
          useful for dice rolls, coin flips, etc.
        </p>
        <img
          src="/assets/img/Random.png"
          alt="software"
          style={{ width: "75%", height: "400px" }}
        />

        <h3>Randint</h3>
        <p>
          <code>randint()</code> is a function in random module which returns a
          random integer in the given interval.
        </p>

        <CodeBlock
          language="python"
          code={`import random
random_integer = random.randint(1, 10)
print(random_integer)`}
        />

        <OutputBlock output={["8"]} />

        <h3>Choice</h3>
        <p>
          <code>choice()</code> is a function in random module which returns a
          random element from the sequence.
        </p>

        <CodeBlock
          language="python"
          code={`import random
random_ele = random.choice(["A","B","C"])
print(random_ele)`}
        />

        <OutputBlock output={["B"]} />
      </section>

      <section>
        <h2>Map, Filter and Reduce</h2>
        <p>We worked with different sequences (list, tuples, etc.)</p>
        <p>
          To simplify working with sequences we can use <code>map()</code>,{" "}
          <code>filter()</code> and
          <code>reduce()</code> functions.
        </p>

        <h2>Map</h2>
        <p>
          <code>map()</code> applies a given function to each item of a sequence
          (list, tuple etc.) and returns a sequence of the results.
        </p>
        <img
          src="/assets/img/map_img.png"
          alt="software"
          style={{ width: "75%", height: "400px" }}
        />

        <h3>Example - 1</h3>

        <CodeBlock
          language="python"
          code={`def square(n):
    return n * n

numbers = [1, 2, 3, 4]
result = map(square, numbers)
numbers_square = list(result)
print(numbers_square)`}
        />

        <OutputBlock output={["[1, 4, 9, 16]"]} />

        <h3>Example - 2</h3>

        <CodeBlock
          language="python"
          code={`numbers = list(map(int, input().split()))
print(numbers)`}
        />

        <h4>Input</h4>
        <OutputBlock output={["1 2 3 4"]} />

        <h4>Output</h4>
        <OutputBlock output={["[1, 2, 3, 4]"]} />

        <h2>Filter</h2>
        <p>
          <code>filter()</code> method filters the elements of a given sequence
          based on the result of given function.
        </p>
        <p>The function should return True/False</p>
        <img
          src="/assets/img/filter.png"
          alt="software"
          style={{ width: "75%", height: "400px" }}
        />

        <CodeBlock
          language="python"
          code={`def is_positive_number(num):
    return num > 0

list_a = [1, -2, 3, -4]
positive_nums = filter(is_positive_number, list_a)
print(list(positive_nums))`}
        />

        <OutputBlock output={["[1, 3]"]} />

        <h2>Reduce</h2>
        <p>
          <code>reduce()</code> function is defined in the functools module.
        </p>
        <img
          src="/assets/img/reduce_img.png"
          alt="software"
          style={{ width: "75%", height: "450px" }}
        />

        <CodeBlock
          language="python"
          code={`from functools import reduce

def sum_of_num(a, b):
    return a + b

list_a = [1, 2, 3, 4]
sum_of_list = reduce(sum_of_num, list_a)
print(sum_of_list)`}
        />

        <OutputBlock output={["10"]} />
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

export default Python_Standard_Library_CS_1;
