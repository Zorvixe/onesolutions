import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const List_CS_1 = ({ subtopicId, goalName, courseName, subtopic }) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if subtopic is already completed
  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

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
      <h1>List | Cheat Sheet</h1>
      <h2>Data Structures</h2>
      <p>
        Data Structures allow us to store and organize data efficiently.{" "}
      </p>{" "}
      <p>This enables easy access and operations on the data.</p>
      <p>In Python, there are four built-in data structures:</p>
      <ul>
        <li>List</li>
        <li>Tuple</li>
        <li>Set</li>
        <li>Dictionary</li>
      </ul>
      {/* List */}
      <section>
        <h2>List</h2>
        <p>List is the most versatile Python data structure.</p>{" "}
        <p> It holds an ordered sequence of items.</p>
      </section>
      {/* Creating a List */}
      <section>
        <h2>Creating a List</h2>
        <p>
          A list is created by enclosing elements within <b>[square]</b>{" "}
          brackets.{" "}
        </p>{" "}
        <p>Each item is separated by a comma.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`a = 2\nlist_a = [5, "Six", a, 8.2]\nprint(type(list_a))\nprint(list_a)`}
        />
        <h3>Output</h3>
        <OutputBlock output={`<class 'list'>\n[5, 'Six', 2, 8.2]`} />
      </section>
      {/* Creating a List of Lists */}
      <section>
        <h2>Creating a List of Lists</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`a = 2\nlist_a = [5, "Six", a, 8.2]\nlist_b = [1, list_a]\nprint(list_b)`}
        />
        <h3>Output</h3>
        <OutputBlock output={`[1, [5, 'Six', 2, 8.2]]`} />
      </section>
      {/* Length of a List */}
      <section>
        <h2>Length of a List</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`a = 2\nlist_a = [5, "Six", a, 8.2]\nprint(len(list_a))`}
        />
        <h3>Output</h3>
        <OutputBlock output={`4`} />
      </section>
      {/* Accessing List Items */}
      <section>
        <h2>Accessing List Items</h2>
        <p>To access elements of a list, we use indexing.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`a = 2\nlist_a = [5, "Six", a, 8.2]\nprint(list_a[1])`}
        />
        <h3>Output</h3>
        <OutputBlock output={`Six`} />
      </section>
      {/* Iterating Over a List */}
      <section>
        <h2>Iterating Over a List</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`a = 2\nlist_a = [5, "Six", a, 8.2]\nfor item in list_a:\n    print(item)`}
        />
        <h3>Output</h3>
        <OutputBlock output={`5\nSix\n2\n8.2`} />
      </section>
      {/* List Concatenation */}
      <section>
        <h2>List Concatenation</h2>
        <p>
          Similar to strings, the <code>+</code> operator concatenates lists.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`list_a = [1, 2, 3]\nlist_b = ["a", "b", "c"]\nlist_c = list_a + list_b\nprint(list_c)`}
        />
        <h3>Output</h3>
        <OutputBlock output={`[1, 2, 3, 'a', 'b', 'c']`} />
      </section>
      {/* Adding Items to List */}
      <section>
        <h2>Adding Items to a List</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`list_a = []\nprint(list_a)\nfor i in range(1,4):\n    list_a += [i]\nprint(list_a)`}
        />
        <h3>Output</h3>
        <OutputBlock output={`[]\n[1, 2, 3]`} />
      </section>
      {/* Repetition */}
      <section>
        <h2>Repetition</h2>
        <p>
          The <code>*</code> operator repeats lists.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`list_a = [1, 2]\nlist_b = list_a * 3\nprint(list_b)`}
        />
        <h3>Output</h3>
        <OutputBlock output={`[1, 2, 1, 2, 1, 2]`} />
      </section>
      {/* List Slicing */}
      <section>
        <h2>List Slicing</h2>
        <p>Obtaining a part of a list is called list slicing.</p>
        <img
          src="/assets/img/List_Slicing.png"
          alt="Error Diagram"
          style={{ width: "80%", height: "280px" }}
        />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`list_a = [5, "Six", 2, 8.2]\nlist_b = list_a[:2]\nprint(list_b)`}
        />
        <h3>Output</h3>
        <OutputBlock output={`[5, 'Six']`} />
      </section>
      {/* Extended Slicing */}
      <section>
        <h2>Extended Slicing</h2>
        <p>
          Similar to string slicing, we can extract alternate items using a
          step.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`list_a = ["R", "B", "G", "O", "W"]\nlist_b = list_a[0:5:3]\nprint(list_b)`}
        />
        <h3>Output</h3>
        <OutputBlock output={`['R', 'O']`} />
      </section>
      {/* Converting to List */}
      <section>
        <h2>Converting to List</h2>
        <p>
          The <code>list(sequence)</code> function takes a sequence and converts
          it into a list.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`color = "Red"\nlist_a = list(color)\nprint(list_a)`}
        />
        <h3>Output</h3>
        <OutputBlock output={`['R', 'e', 'd']`} />

        <CodeBlock
          language="python"
          code={`list_a = list(range(4))\nprint(list_a)`}
        />
        <h3>Output</h3>
        <OutputBlock output={`[0, 1, 2, 3]`} />
      </section>
      {/* Lists are Mutable */}
      <section>
        <h2>Lists are Mutable</h2>
        <p>Lists can be modified.</p>{" "}
        <p> items at any position can be updated.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`list_a = [1, 2, 3, 5]\nprint(list_a)\nlist_a[3] = 4\nprint(list_a)`}
        />
        <h3>Output</h3>
        <OutputBlock output={`[1, 2, 3, 5]\n[1, 2, 3, 4]`} />
      </section>
      {/* Strings are Immutable */}
      <section>
        <h2>Strings are Immutable</h2>
        <p>Strings cannot be modified after creation.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`message = "sea you soon"\nmessage[2] = "e"\nprint(message)`}
        />
        <h3>Output</h3>
        <OutputBlock
          output={`TypeError: 'str' object does not support item assignment`}
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

export default List_CS_1;
