import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; 

const Workingwith_Lists_CS =  ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Working with Lists</h1>

      {/* Object */}
      <section>
        <h2>Object</h2>
        <p>
          In Python, anything that can be assigned to a variable is an object. Strings, Integers, Floats, Lists etc. are all objects.
        </p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`"A"\n1.25\n[1, 2, 3]`} />
      </section>

      {/* Identity of an Object */}
      <section>
        <h2>Identity of an Object</h2>
        <p>
          Every object has a unique identifier (id) which represents its memory location.
        </p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`a = [1, 2, 3]\nprint(id(a))`} />
        <h3>Output</h3>
        <OutputBlock output={"12345678  # Example id, changes each run"} />
      </section>

      {/* Modifying Lists - 1 */}
      <section>
        <h2>Modifying Lists - 1</h2>
        <p>
          Assigning an existing list to another variable makes both refer to the same object.
        </p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`list_a = [1, 2, 3]\nlist_b = list_a\nlist_b.append(4)\nprint(list_a)`} />
        <h3>Output</h3>
        <OutputBlock output={"[1, 2, 3, 4]"} />
      </section>

      {/* Modifying Lists - 2 */}
      <section>
        <h2>Modifying Lists - 2</h2>
        <p>
          Both variables share the same reference; modifying one affects the other.
        </p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`list_a = [10, 20]\nlist_b = list_a\nlist_b[0] = 99\nprint(list_a)`} />
        <h3>Output</h3>
        <OutputBlock output={"[99, 20]"} />
      </section>

      {/* Modifying Lists - 3 */}
      <section>
        <h2>Modifying Lists - 3</h2>
        <p>
          Assigning a new list creates a new object; the original list remains unchanged.
        </p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`list_a = [1, 2, 3]\nlist_b = list_a\nlist_b = [4, 5, 6]\nprint(list_a)`} />
        <h3>Output</h3>
        <OutputBlock output={"[1, 2, 3]"} />
      </section>

      {/* Modifying Lists - 4 */}
      <section>
        <h2>Modifying Lists - 4</h2>
        <p>Reassigning creates a new reference to a new object.</p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`list_a = [10, 20]\nlist_b = list_a\nlist_b = [100, 200]\nprint(id(list_a) == id(list_b))`} />
        <h3>Output</h3>
        <OutputBlock output={"False"} />
      </section>

      {/* Modifying Lists - 5 */}
      <section>
        <h2>Modifying Lists - 5</h2>
        <p>
          Compound assignment (like +=) updates the existing list rather than creating a new object.
        </p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`list_a = [1, 2]\nlist_b = list_a\nlist_b += [3, 4]\nprint(list_a)`} />
        <h3>Output</h3>
        <OutputBlock output={"[1, 2, 3, 4]"} />
      </section>

      {/* Modifying Lists - 6 */}
      <section>
        <h2>Modifying Lists - 6</h2>
        <p>
          Updating mutable objects inside a list affects the list values.
        </p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`x = [1, 2]\ny = [x, [3, 4]]\nx[0] = 99\nprint(y)`} />
        <h3>Output</h3>
        <OutputBlock output={"[[99, 2], [3, 4]]"} />
      </section>

      {/* Modifying Lists - 7 */}
      <section>
        <h2>Modifying Lists - 7</h2>
        <p>
          Updating immutable objects does not affect the list values since the reference changes.
        </p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`x = 10\ny = [x, 20]\nx = 99\nprint(y)`} />
        <h3>Output</h3>
        <OutputBlock output={"[10, 20]"} />
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

export default Workingwith_Lists_CS
