import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const ListMethods = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>List Methods | Cheat Sheet</h1>

      {/* List Methods */}
      <section>
        <h2>List Methods</h2>
        <p>
          Python provides list methods that allow us to work with lists.
        </p>
        <p>
          Let’s learn few among them
        </p>
        <ul>
          <li><code>append()</code></li>
          <li><code>extend()</code></li>
          <li><code>insert()</code></li>
          <li><code>pop()</code></li>
          <li><code>clear()</code></li>
          <li><code>remove()</code></li>
          <li><code>sort()</code></li>
          <li><code>index()</code></li>
        </ul>
      </section>

      {/* Append */}
      <section>
        <h2>Append</h2>
        <p>
          <code>list.append(value)</code> Adds an element to the end of the list.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = [1, 2, 3]\nmy_list.append(4)\nprint(my_list)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[1, 2, 3, 4]} />
      </section>

      {/* Extend */}
      <section>
        <h2>Extend</h2>
        <p>
          <code>list_a.extend(list_b)</code> Adds all the elements of a sequence to the end
          of the list.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`list_a = [1, 2]\nlist_b = [3, 4]\nlist_a.extend(list_b)\nprint(list_a)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[1, 2, 3, 4]} />
      </section>

      {/* Insert */}
      <section>
        <h2>Insert</h2>
        <p>
          <code>list.insert(index, value)</code> Element is inserted to the list at
          specified index.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = [1, 2, 4]\nmy_list.insert(2, 3)\nprint(my_list)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[1, 2, 3, 4]} />
      </section>

      {/* Pop */}
      <section>
        <h2>Pop</h2>
        <p>
          <code>list.pop()</code> Removes last element.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = [1, 2, 3]\nmy_list.pop()\nprint(my_list)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[1, 2]} />
      </section>

      {/* Remove */}
      <section>
        <h2>Remove</h2>
        <p>
          <code>list.remove(value)</code> Removes the first matching element from the list.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = [1, 2, 2, 3]\nmy_list.remove(2)\nprint(my_list)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[1, 2, 3]} />
      </section>

      {/* Clear */}
      <section>
        <h2>Clear</h2>
        <p>
          <code>list.clear()</code> Removes all the items from the list.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = [1, 2, 3]\nmy_list.clear()\nprint(my_list)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[]} />
      </section>

      {/* Index */}
      <section>
        <h2>Index</h2>
        <p>
          <code>list.index(value)</code> Returns the index at the first occurrence of the
          specified value.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = [1, 2, 3, 2]\nprint(my_list.index(2))`}
        />
        <h3>Output</h3>
        <OutputBlock output={1} />
      </section>

      {/* Count */}
      <section>
        <h2>Count</h2>
        <p>
          <code>list.count(value)</code> Returns the number of elements with the specified
          value.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = [1, 2, 2, 3]\nprint(my_list.count(2))`}
        />
        <h3>Output</h3>
        <OutputBlock output={2} />
      </section>

      {/* Sort */}
      <section>
        <h2>Sort</h2>
        <p>
          <code>list.sort()</code> Sorts the list.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = [3, 1, 4, 2]\nmy_list.sort()\nprint(my_list)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[1, 2, 3, 4]} />
      </section>

      {/* Sort & Sorted */}
      <section>
        <h2>Sort & Sorted</h2>
        <p>
          <code>sort()</code> Modifies the list
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = [3, 1, 4, 2]\nmy_list.sort()\nprint(my_list)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[1, 2, 3, 4]} />
        <p>
          <code>sorted()</code> Creates a new sorted list
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = [3, 1, 4, 2]\nnew_list = sorted(my_list)\nprint(new_list)\nprint(my_list)`}
        />
        <h3>Output</h3>
        <OutputBlock output={`[1, 2, 3, 4], [3, 1, 4, 2]`} />
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

export default ListMethods;