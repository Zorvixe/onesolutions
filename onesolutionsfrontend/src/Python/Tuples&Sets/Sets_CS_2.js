import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const Sets_CS_2 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Sets | Cheat Sheet</h1>

      {/* Sets */}
      <section>
        <h2>Sets</h2>
        <p>
          Unordered collection of items.
        </p>
        <p>
          Every set element is
        </p>
        <ul>
          <li>Unique (no duplicates)</li>
          <li>Must be immutable</li>
        </ul>
      </section>

      {/* Creating a Set */}
      <section>
        <h2>Creating a Set</h2>
        <p>
          Created by enclosing elements within {`curly`} brackets.
        </p>
        <p>
          Each item is separated by a comma.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_set = {1, 2, 3}\nprint(my_set)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[1, 2, 3]} />
        <p>
          Need not be in the same order as defined.
        </p>
      </section>

      {/* No Duplicate Items */}
      <section>
        <h2>No Duplicate Items</h2>
        <p>
          Sets contain unique elements
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_set = {1, 2, 2, 3}\nprint(my_set)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[1, 2, 3]} />
      </section>

      {/* Immutable Items */}
      <section>
        <h2>Immutable Items</h2>
        <p>
          Set items must be immutable.
        </p>
        <p>
          As List is mutable, Set cannot have list as an item.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_set = {1, (2, 3), [4, 5]}\nprint(my_set)`}
        />
        <h3>Output</h3>
        <OutputBlock output={"TypeError: unhashable type: 'list'"} />
      </section>

      {/* Creating Empty Set */}
      <section>
        <h2>Creating Empty Set</h2>
        <p>
          We use <code>set()</code> to create an empty set.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_set = set()\nprint(my_set)`}
        />
        <h3>Output</h3>
        <OutputBlock output={`set()`} />
      </section>

      {/* Converting to Set */}
      <section>
        <h2>Converting to Set</h2>
        <p>
          <code>set(sequence)</code> takes any sequence as argument and converts to set,
          avoiding duplicates
        </p>
        <h3>List to Set</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = [1, 2, 2, 3]\nmy_set = set(my_list)\nprint(my_set)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[1, 2, 3]} />
        <h3>String to Set</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_string = "hello"\nmy_set = set(my_string)\nprint(my_set)`}
        />
        <h3>Output</h3>
        <OutputBlock output={["h", "e", "l", "o"]} />
        <h3>Tuple to Set</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_tuple = (1, 2, 2, 3)\nmy_set = set(my_tuple)\nprint(my_set)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[1, 2, 3]} />
      </section>

      {/* Accessing Items */}
      <section>
        <h2>Accessing Items</h2>
        <p>
          As sets are unordered, we cannot access or change an item of a set using
        </p>
        <ul>
          <li>Indexing</li>
          <li>Slicing</li>
        </ul>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_set = {1, 2, 3}\nprint(my_set[0])`}
        />
        <h3>Output</h3>
        <OutputBlock output={"TypeError: 'set' object is not subscriptable"} />
      </section>

      {/* Adding Items */}
      <section>
        <h2>Adding Items</h2>
        <p>
          <code>set.add(value)</code> adds the item to the set, if the item is not present
          already.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_set = {1, 2}\nmy_set.add(3)\nprint(my_set)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[1, 2, 3]} />
      </section>

      {/* Adding Multiple Items */}
      <section>
        <h2>Adding Multiple Items</h2>
        <p>
          <code>set.update(sequence)</code> adds multiple items to the set, and duplicates
          are avoided.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_set = {1, 2}\nmy_set.update([2, 3, 4])\nprint(my_set)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[1, 2, 3, 4]} />
      </section>

      {/* Removing Specific Item */}
      <section>
        <h2>Removing Specific Item</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_set = {1, 2, 3}\nmy_set.discard(2)\nprint(my_set)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[1, 3]} />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_set = {1, 2, 3}\nmy_set.remove(2)\nprint(my_set)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[1, 3]} />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_set = {1, 2, 3}\nmy_set.remove(4)\nprint(my_set)`}
        />
        <h3>Output</h3>
        <OutputBlock output={"KeyError: 4"} />
      </section>

      {/* Operations on Sets */}
      <section>
        <h2>Operations on Sets</h2>
        <p>
          You can perform the following operations on Sets
        </p>
        <ul>
          <li><code>clear()</code></li>
          <li><code>len()</code></li>
          <li>Iterating</li>
          <li>Membership Check</li>
        </ul>
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

export default Sets_CS_2;