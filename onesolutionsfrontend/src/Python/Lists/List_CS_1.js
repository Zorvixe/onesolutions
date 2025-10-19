import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; 


const List_CS_1 =({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Data Structures | List</h1>

      {/* Introduction */}
      <section>
        <h2>Introduction</h2>
        <p>
          Data Structures allow us to store and organize data efficiently, so that we can easily access and perform operations on it.
        </p>
        <p>Python has four built-in data structures:</p>
        <ul>
          <li>List</li>
          <li>Tuple</li>
          <li>Set</li>
          <li>Dictionary</li>
        </ul>
      </section>

      {/* List */}
      <section>
        <h2>List</h2>
        <p>List is the most versatile Python data structure. Holds an ordered sequence of items.</p>
      </section>

      {/* Creating a List */}
      <section>
        <h2>Creating a List</h2>
        <p>Created by enclosing elements within square brackets []. Each item is separated by a comma.</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`my_list = [1, 2, 3, 4]\nprint(my_list)`} />
        <h3>Output</h3>
        <OutputBlock output={"[1, 2, 3, 4]"} />
      </section>

      {/* Creating a List of Lists */}
      <section>
        <h2>Creating a List of Lists</h2>
        <h3>Code</h3>
        <CodeBlock language="python" code={`matrix = [[1, 2], [3, 4]]\nprint(matrix)`} />
        <h3>Output</h3>
        <OutputBlock output={"[[1, 2], [3, 4]]"} />
      </section>

      {/* Length of a List */}
      <section>
        <h2>Length of a List</h2>
        <h3>Code</h3>
        <CodeBlock language="python" code={`my_list = [1, 2, 3, 4]\nprint(len(my_list))`} />
        <h3>Output</h3>
        <OutputBlock output={4} />
      </section>

      {/* Accessing List Items */}
      <section>
        <h2>Accessing List Items</h2>
        <p>To access elements of a list, we use indexing.</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`my_list = [10, 20, 30, 40]\nprint(my_list[0])  # First item\nprint(my_list[-1]) # Last item`} />
        <h3>Output</h3>
        <OutputBlock output={["10", "40"]} />
      </section>

      {/* Iterating Over a List */}
      <section>
        <h2>Iterating Over a List</h2>
        <h3>Code</h3>
        <CodeBlock language="python" code={`my_list = [1, 2, 3]\nfor item in my_list:\n    print(item)`} />
        <h3>Output</h3>
        <OutputBlock output={["1", "2", "3"]} />
      </section>

      {/* List Concatenation */}
      <section>
        <h2>List Concatenation</h2>
        <p>Similar to strings, the + operator concatenates lists.</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`list1 = [1, 2]\nlist2 = [3, 4]\nprint(list1 + list2)`} />
        <h3>Output</h3>
        <OutputBlock output={"[1, 2, 3, 4]"} />
      </section>

      {/* Adding Items to List */}
      <section>
        <h2>Adding Items to List</h2>
        <h3>Code</h3>
        <CodeBlock language="python" code={`my_list = [1, 2, 3]\nmy_list.append(4)\nmy_list.insert(1, 10)\nprint(my_list)`} />
        <h3>Output</h3>
        <OutputBlock output={"[1, 10, 2, 3, 4]"} />
      </section>

      {/* Repetition */}
      <section>
        <h2>Repetition</h2>
        <p>* operator repeats lists.</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`my_list = [1, 2]\nprint(my_list * 2)`} />
        <h3>Output</h3>
        <OutputBlock output={"[1, 2, 1, 2]"} />
      </section>

      {/* List Slicing */}
      <section>
        <h2>List Slicing</h2>
        <p>Obtaining a part of a list is called list slicing.</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`my_list = [10, 20, 30, 40]\nprint(my_list[1:3])`} />
        <h3>Output</h3>
        <OutputBlock output={"[20, 30]"} />
      </section>

      {/* Extended Slicing */}
      <section>
        <h2>Extended Slicing</h2>
        <p>We can extract alternate items using a step.</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`my_list = [1, 2, 3, 4, 5]\nprint(my_list[::2])`} />
        <h3>Output</h3>
        <OutputBlock output={"[1, 3, 5]"} />
      </section>

      {/* Converting to List */}
      <section>
        <h2>Converting to List</h2>
        <p>list(sequence) takes a sequence and converts it into a list.</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`text = "hello"\nprint(list(text))`} />
        <h3>Output</h3>
        <OutputBlock output={"['h', 'e', 'l', 'l', 'o']"} />
      </section>

      {/* Lists are Mutable */}
      <section>
        <h2>Lists are Mutable</h2>
        <p>Lists can be modified. Items at any position can be updated.</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`my_list = [1, 2, 3]\nmy_list[0] = 100\nprint(my_list)`} />
        <h3>Output</h3>
        <OutputBlock output={"[100, 2, 3]"} />
      </section>

      {/* Strings are Immutable */}
      <section>
        <h2>Strings are Immutable</h2>
        <p>Strings cannot be modified once created.</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`s = "hello"\ns[0] = "H"`} />
        <h3>Output</h3>
        <OutputBlock output={"TypeError: 'str' object does not support item assignment"} />
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
export default List_CS_1;
