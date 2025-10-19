import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const ListsAndString_CS_1 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Lists and Strings | Cheat Sheet</h1>

      {/* Splitting */}
      <section>
        <h2>Splitting</h2>
        <p>
          <code>str_var.split(separator)</code>
        </p>
        <p>
          Splits a string into a list at every specified separator.
        </p>
        <p>
          If no separator is specified, default separator is whitespace.
        </p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`text = "hello world"\nprint(text.split())`} />
        <h3>Output</h3>
        <OutputBlock output={["hello", "world"]} />
      </section>

      {/* Multiple WhiteSpaces */}
      <section>
        <h2>Multiple WhiteSpaces</h2>
        <p>
          Multiple whitespaces are considered as single when splitting.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`text = "hello   world"\nprint(text.split())`}
        />
        <h3>Output</h3>
        <OutputBlock output={["hello", "world"]} />
      </section>

      {/* New Line and Tab Space */}
      <section>
        <h2>New Line \n and Tab Space \t</h2>
        <p>
          New line <code>\n</code> and tab space <code>\t</code> are also whitespace.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`text = "hello\nworld\tpython"\nprint(text.split())`}
        />
        <h3>Output</h3>
        <OutputBlock output={["hello", "world", "python"]} />
      </section>

      {/* Using Separator */}
      <section>
        <h2>Using Separator</h2>
        <p>
          Breaks up a string at the specified separator.
        </p>
        <h3>Example - 1</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`text = "apple,banana,cherry"\nprint(text.split(','))`}
        />
        <h3>Output</h3>
        <OutputBlock output={["apple", "banana", "cherry"]} />
        <h3>Example - 2</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`text = "one-two-three"\nprint(text.split('-'))`}
        />
        <h3>Output</h3>
        <OutputBlock output={["one", "two", "three"]} />
      </section>

      {/* Space as Separator */}
      <section>
        <h2>Space as Separator</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`text = "hello world python"\nprint(text.split(' '))`}
        />
        <h3>Output</h3>
        <OutputBlock output={["hello", "world", "python"]} />
      </section>

      {/* String as Separator */}
      <section>
        <h2>String as Separator</h2>
        <h3>Example - 1</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`text = "apple|banana|cherry"\nprint(text.split('|'))`}
        />
        <h3>Output</h3>
        <OutputBlock output={["apple", "banana", "cherry"]} />
        <h3>Example - 2</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`text = "one**two**three"\nprint(text.split('**'))`}
        />
        <h3>Output</h3>
        <OutputBlock output={["one", "two", "three"]} />
      </section>

      {/* Joining */}
      <section>
        <h2>Joining</h2>
        <p>
          <code>str.join(sequence)</code>
        </p>
        <p>
          Takes all the items in a sequence of strings and joins them into one string.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = ["hello", "world"]\nprint(" ".join(my_list))`}
        />
        <h3>Output</h3>
        <OutputBlock output={"hello world"} />
      </section>

      {/* Joining Non-String Values */}
      <section>
        <h2>Joining Non-String Values</h2>
        <p>
          Sequence should not contain any non-string values.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = ["hello", 123]\nprint(" ".join(my_list))`}
        />
        <h3>Output</h3>
        <OutputBlock output={"TypeError: sequence item 1: expected str instance, int found"} />
      </section>

      {/* Negative Indexing */}
      <section>
        <h2>Negative Indexing</h2>
        <p>
          Using a negative index returns the nth item from the end of list.
        </p>
        <p>
          Last item in the list can be accessed with index -1
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = [10, 20, 30, 40]\nprint(my_list[-1])\nprint(my_list[-2])`}
        />
        <h3>Output</h3>
        <OutputBlock output={[40, 30]} />
      </section>

      {/* Reversing a List */}
      <section>
        <h2>Reversing a List</h2>
        <p>
          -1 for step will reverse the order of items in the list.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = [1, 2, 3, 4]\nprint(my_list[::-1])`}
        />
        <h3>Output</h3>
        <OutputBlock output={[4, 3, 2, 1]} />
      </section>

      {/* Accessing List Items */}
      <section>
        <h2>Accessing List Items</h2>
        <h3>Example - 1</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = [10, 20, 30]\nprint(my_list[1])`}
        />
        <h3>Output</h3>
        <OutputBlock output={20} />
        <h3>Example - 2</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = [1, 2, [3, 4]]\nprint(my_list[2][0])`}
        />
        <h3>Output</h3>
        <OutputBlock output={3} />
      </section>

      {/* Slicing With Negative Index */}
      <section>
        <h2>Slicing With Negative Index</h2>
        <p>
          You can also specify negative indices while slicing a List.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = [0, 1, 2, 3, 4]\nprint(my_list[-3:-1])`}
        />
        <h3>Output</h3>
        <OutputBlock output={[2, 3]} />
      </section>

      {/* Out of Bounds Index */}
      <section>
        <h2>Out of Bounds Index</h2>
        <p>
          While slicing, Index can go out of bounds.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = [0, 1, 2]\nprint(my_list[1:10])`}
        />
        <h3>Output</h3>
        <OutputBlock output={[1, 2]} />
      </section>

      {/* Negative Step Size */}
      <section>
        <h2>Negative Step Size</h2>
        <p>
          <code>variable[start:end:negative_step]</code>
        </p>
        <p>
          Negative Step determines the decrement between each index for slicing.
        </p>
        <p>
          Start index should be greater than the end index in this case
        </p>
        <p>
          {`start > end`}
        </p>
      </section>

      {/* Negative Step Size Examples */}
      <section>
        <h2>Negative Step Size Examples</h2>
        <h3>Example - 1</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = [0, 1, 2, 3, 4]\nprint(my_list[4:1:-1])`}
        />
        <h3>Output</h3>
        <OutputBlock output={[4, 3, 2]} />
        <h3>Example - 2</h3>
        <p>
          Negative step requires the start to be greater than end.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = [0, 1, 2, 3, 4]\nprint(my_list[3:0:-1])`}
        />
        <h3>Output</h3>
        <OutputBlock output={[3, 2, 1]} />
      </section>

      {/* Reversing a String */}
      <section>
        <h2>Reversing a String</h2>
        <p>
          -1 for step will reverse the order of the characters.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_string = "hello"\nprint(my_string[::-1])`}
        />
        <h3>Output</h3>
        <OutputBlock output={"olleh"} />
      </section>

      {/* Negative Step Size - Strings */}
      <section>
        <h2>Negative Step Size - Strings</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_string = "python"\nprint(my_string[5:1:-1])`}
        />
        <h3>Output</h3>
        <OutputBlock output={"noht"} />
      </section>

      {/* Indexing & Slicing - Strings */}
      <section>
        <h2>Indexing & Slicing - Strings</h2>
        <h3>Example - 1</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_string = "python"\nprint(my_string[2])`}
        />
        <h3>Output</h3>
        <OutputBlock output={"t"} />
        <h3>Example - 2</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_string = "python"\nprint(my_string[1:4])`}
        />
        <h3>Output</h3>
        <OutputBlock output={"yth"} />
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

export default ListsAndString_CS_1;