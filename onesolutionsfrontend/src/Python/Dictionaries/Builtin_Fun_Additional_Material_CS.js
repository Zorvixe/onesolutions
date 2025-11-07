import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Builtin_Fun_Additional_Material_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Python Built-in Functions & List Methods | Cheat Sheet</h1>

      {/* Built-in Functions */}
      <section>
        <h2>1. Built-in Functions</h2>

        {/* abs() */}
        <h3>1.1 abs()</h3>
        <p>Returns the absolute value of a number.</p>
        <CodeBlock language="python" code={`print(abs(-3))  # Output: 3`} />

        {/* all() */}
        <h3>1.2 all()</h3>
        <p>
          Returns <b>True</b> if all elements in the sequence are true (or empty), else <b>False</b>.
        </p>
        <CodeBlock language="python" code={`print(all([True, True, False]))  # Output: False`} />

        {/* any() */}
        <h3>1.3 any()</h3>
        <p>
          Returns <b>True</b> if any element in the sequence is true, else <b>False</b>.
        </p>
        <CodeBlock language="python" code={`print(any([False, False, True]))  # Output: True`} />

        {/* reversed() */}
        <h3>1.4 reversed()</h3>
        <p>Returns an iterator that iterates over the sequence in reverse order.</p>
        <CodeBlock language="python" code={`for i in reversed([1,2,3]):\n    print(i)`} />

        {/* enumerate() */}
        <h3>1.5 enumerate()</h3>
        <p>Adds a counter to each item in a sequence and returns it as tuples.</p>
        <CodeBlock language="python" code={`items = ['a','b','c']\nfor index, value in enumerate(items):\n    print(index, value)`} />
      </section>

      {/* List Methods */}
      <section>
        <h2>2. List Methods</h2>

        {/* copy() */}
        <h3>2.1 copy()</h3>
        <p>Returns a shallow copy of the list. Modifying the copy does not affect the original list.</p>
        <CodeBlock language="python" code={`list_a = [1,2,3]\nlist_b = list_a.copy()\nlist_b.append(4)\nprint(list_a)  # Output: [1,2,3]\nprint(list_b)  # Output: [1,2,3,4]`} />

        {/* reverse() */}
        <h3>2.2 reverse()</h3>
        <p>Reverses the elements of the list in place. Does not return a new list.</p>
        <CodeBlock language="python" code={`nums = [1,2,3,4]\nnums.reverse()\nprint(nums)  # Output: [4,3,2,1]`} />
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

export default Builtin_Fun_Additional_Material_CS
