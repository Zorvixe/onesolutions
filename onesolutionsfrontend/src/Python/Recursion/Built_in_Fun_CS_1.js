import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const BuiltInFun_CS_1 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Built-in Functions | Cheat Sheet</h1>

      {/* Passing Mutable Objects */}
      <section>
        <h2>Passing Mutable Objects</h2>
        <p>
          The same object in the memory is referred by both <code>list_a</code> and
          <code>list_x</code>
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def modify_list(list_x):\n    list_x.append(4)\n    print(f"Inside: {list_x}")\nlist_a = [1, 2, 3]\nmodify_list(list_a)\nprint(f"Outside: {list_a}")`}
        />
        <h3>Output</h3>
        <OutputBlock output={["Inside: [1, 2, 3, 4]", "Outside: [1, 2, 3, 4]"]} />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def modify_list(list_x):\n    list_x = [5, 6, 7]\n    print(f"Inside: {list_x}")\nlist_a = [1, 2, 3]\nmodify_list(list_a)\nprint(f"Outside: {list_a}")`}
        />
        <h3>Output</h3>
        <OutputBlock output={["Inside: [5, 6, 7]", "Outside: [1, 2, 3]"]} />
      </section>

      {/* Default Arguments Behavior */}
      <section>
        <h2>Default Arguments Behavior</h2>
        <p>
          Default args are evaluated only once when the function is defined, not each time
          the function is called.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def append_list(value, my_list=[]):\n    my_list.append(value)\n    return my_list\na = append_list(1)\nb = append_list(2)\nprint(a)\nprint(b)`}
        />
        <h3>Output</h3>
        <OutputBlock output={["[1]", "[1, 2]"]} />
      </section>

      {/* Built-in Functions */}
      <section>
        <h2>Built-in Functions</h2>
        <p>
          Built-in functions are readily available for reuse.
        </p>
        <p>
          We are already using functions which are pre-defined in Python
        </p>
        <ul>
          <li><code>print()</code></li>
          <li><code>int()</code></li>
          <li><code>str()</code></li>
          <li><code>len()</code></li>
        </ul>
      </section>

      {/* Finding Minimum */}
      <section>
        <h2>Finding Minimum</h2>
        <p>
          <code>min()</code> returns the smallest item in a sequence or smallest of two or
          more arguments.
        </p>
        <h3>Example - 1</h3>
        <h3>Code</h3>
        <CodeBlock language="python" code={`print(min(5, 2, 8, 1))`} />
        <h3>Output</h3>
        <OutputBlock output={1} />
        <h3>Example - 2</h3>
        <h3>Code</h3>
        <CodeBlock language="python" code={`numbers = [10, 5, 8, 3]\nprint(min(numbers))`} />
        <h3>Output</h3>
        <OutputBlock output={3} />
      </section>

      {/* Minimum of Strings */}
      <section>
        <h2>Minimum of Strings</h2>
        <p>
          <code>min(str_1, str_2)</code>
        </p>
        <p>
          Strings are compared character by character using unicode values.
        </p>
        <p>
          P - 80 (unicode)
        </p>
        <p>
          J - 74 (unicode)
        </p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`print(min("Python", "Java"))`} />
        <h3>Output</h3>
        <OutputBlock output={"Java"} />
      </section>

      {/* Finding Maximum */}
      <section>
        <h2>Finding Maximum</h2>
        <p>
          <code>max()</code> returns the largest item in a sequence or largest of two or
          more arguments.
        </p>
        <h3>Example - 1</h3>
        <h3>Code</h3>
        <CodeBlock language="python" code={`print(max(5, 2, 8, 1))`} />
        <h3>Ouput</h3>
        <OutputBlock output={8} />
        <h3>Example - 2</h3>
        <h3>Code</h3>
        <CodeBlock language="python" code={`numbers = [10, 5, 8, 3]\nprint(max(numbers))`} />
        <h3>Output</h3>
        <OutputBlock output={10} />
      </section>

      {/* Finding Sum */}
      <section>
        <h2>Finding Sum</h2>
        <p>
          <code>sum(sequence)</code> returns sum of items in a sequence.
        </p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`numbers = [1, 2, 3, 4]\nprint(sum(numbers))`} />
        <h3>Output</h3>
        <OutputBlock output={10} />
      </section>

      {/* Ordering List Items */}
      <section>
        <h2>Ordering List Items</h2>
        <p>
          <code>sorted(sequence)</code> returns a new sequence with all the items in the
          given sequence ordered in increasing order.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`numbers = [3, 1, 4, 2]\nprint(sorted(numbers))`}
        />
        <h3>Output</h3>
        <OutputBlock output={[1, 2, 3, 4]} />
      </section>

      {/* Ordering List Items - Reverse */}
      <section>
        <h2>Ordering List Items - Reverse</h2>
        <p>
          <code>sorted(sequence, reverse=True)</code> returns a new sequence with all the
          items in the given sequence ordered in decreasing order.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`numbers = [3, 1, 4, 2]\nprint(sorted(numbers, reverse=True))`}
        />
        <h3>Output</h3>
        <OutputBlock output={[4, 3, 2, 1]} />
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

export default BuiltInFun_CS_1;