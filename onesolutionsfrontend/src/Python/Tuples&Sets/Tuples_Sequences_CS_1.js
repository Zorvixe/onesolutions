import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Tuples_Sequences_CS_1 = ({
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
      <h1>Tuples and Sequences | Cheat Sheet</h1>

      <section>
        <h2>None</h2>
        <p>
          <code>None</code> is an object which is a datatype of its own (
          <b>NoneType</b>).
        </p>
        <p>Used to define no value or nothing.</p>
        <CodeBlock
          language="python"
          code={`var = None\nprint(var)\nprint(type(var))`}
        />
        <OutputBlock output={["None", "<class 'NoneType'>"]} />
      </section>

      <section>
        <h2>Function Without Return</h2>
        <p>
          Functions assigned to a variable, when function does not have a{" "}
          <code>return</code> statement, the variable will get the value{" "}
          <b>None</b>.
        </p>
        <CodeBlock
          language="python"
          code={`def increment(a):\n    a += 1\n    a = 5\n\na = 5\nresult = increment(a)\nprint(result)`}
        />
        <OutputBlock output={["None"]} />
      </section>

      <section>
        <h2>Function That Returns Nothing</h2>
        <p>
          When a function returns no value, the default value will be{" "}
          <code>None</code>.
        </p>

        <h3>Example 1</h3>
        <CodeBlock
          language="python"
          code={`def increment(a):\n    a += 1\n    return\n\na = 5\nresult = increment(a)\nprint(result)`}
        />
        <OutputBlock output={["None"]} />

        <h3>Example 2</h3>
        <CodeBlock
          language="python"
          code={`def increment(a):\n    a += 1\n    return None\n\na = 5\nresult = increment(a)\nprint(result)`}
        />
        <OutputBlock output={["None"]} />

        <h3>Example 3</h3>
        <CodeBlock
          language="python"
          code={`result = print("Hi")\nprint(result)`}
        />
        <OutputBlock output={["Hi", "None"]} />
      </section>

      <section>
        <h2>Tuple</h2>
        <p>
          A <b>Tuple</b> holds an ordered sequence of items.
        </p>{" "}
        <p>
          Tuple is <b>immutable</b>, whereas a list is <b>mutable</b>.
        </p>
        <CodeBlock
          language="python"
          code={`a = 2\ntuple_a = (5, "Six", a, 8.2)`}
        />
      </section>

      <section>
        <h2>Creating a Tuple</h2>
        <p>
          Created by enclosing elements within round brackets <code>()</code>.
        </p>
        <p>Each item is separated by a comma.</p>
        <CodeBlock
          language="python"
          code={`a = 2\ntuple_a = (5, "Six", a, 8.2)\nprint(type(tuple_a))\nprint(tuple_a)`}
        />
        <OutputBlock output={["<class 'tuple'>", "(5, 'Six', 2, 8.2)"]} />
      </section>

      <section>
        <h2>Tuple with a Single Item</h2>
        <CodeBlock
          language="python"
          code={`a = (1,)\nprint(type(a))\nprint(a)`}
        />
        <OutputBlock output={["<class 'tuple'>", "(1,)"]} />
      </section>

      <section>
        <h2>Accessing Tuple Elements</h2>
        <p>
          Accessing Tuple elements is similar to String or List indexing and
          slicing.
        </p>
        <CodeBlock
          language="python"
          code={`a = 2\ntuple_a = (5, "Six", a, 8.2)\nprint(tuple_a[1])`}
        />
        <OutputBlock output={["Six"]} />
      </section>

      <section>
        <h2>Tuples are Immutable</h2>
        <p>Tuples do not support modification.</p>
        <CodeBlock
          language="python"
          code={`tuple_a = (1, 2, 3, 5)\ntuple_a[3] = 4\nprint(tuple_a)`}
        />
        <OutputBlock
          output={[
            "TypeError: 'tuple' object does not support item assignment",
          ]}
        />
      </section>

      <section>
        <h2>Operations on Tuples</h2>
        <ul>
          <li>len()</li>
          <li>Iterating</li>
          <li>Slicing</li>
          <li>Extended Slicing</li>
        </ul>

        <h3>Converting to Tuple</h3>
        <p>
          <code>tuple(sequence)</code> converts a sequence into a tuple.
        </p>

        <h4>String to Tuple</h4>
        <CodeBlock
          language="python"
          code={`color = "Red"\ntuple_a = tuple(color)\nprint(tuple_a)`}
        />
        <OutputBlock output={["('R', 'e', 'd')"]} />

        <h4>List to Tuple</h4>
        <CodeBlock
          language="python"
          code={`list_a = [1, 2, 3]\ntuple_a = tuple(list_a)\nprint(tuple_a)`}
        />
        <OutputBlock output={["(1, 2, 3)"]} />

        <h4>Sequence to Tuple</h4>
        <CodeBlock
          language="python"
          code={`tuple_a = tuple(range(4))\nprint(tuple_a)`}
        />
        <OutputBlock output={["(0, 1, 2, 3)"]} />
      </section>

      <section>
        <h2>Membership Check</h2>
        <p>
          Checks if a given element is part of a sequence using <code>in</code>{" "}
          or <code>not in</code>.
        </p>

        <h3>Example 1</h3>
        <CodeBlock
          language="python"
          code={`tuple_a = (1, 2, 3, 4)\nis_part = 5 in tuple_a\nprint(is_part)`}
        />
        <OutputBlock output={["False"]} />

        <h3>Example 2</h3>
        <CodeBlock
          language="python"
          code={`tuple_a = (1, 2, 3, 4)\nis_part = 1 not in tuple_a\nprint(is_part)`}
        />
        <OutputBlock output={["False"]} />

        <h3>List Membership</h3>
        <CodeBlock
          language="python"
          code={`list_a = [1, 2, 3, 4]\nis_part = 1 in list_a\nprint(is_part)`}
        />
        <OutputBlock output={["True"]} />

        <h3>String Membership</h3>
        <CodeBlock
          language="python"
          code={`word = 'Python'\nis_part = 'th' in word\nprint(is_part)`}
        />
        <OutputBlock output={["True"]} />
      </section>

      <section>
        <h2>Packing & Unpacking</h2>
        <h3>Unpacking</h3>
        <p>Values of any sequence can be directly assigned to variables.</p>
        <p>
          Number of variables on the left must match the length of the sequence.
        </p>
        <CodeBlock
          language="python"
          code={`tuple_a = ('R', 'e', 'd')\n(s_1, s_2, s_3) = tuple_a\nprint(s_1)\nprint(s_2)\nprint(s_3)`}
        />
        <OutputBlock output={["R", "e", "d"]} />

        <h3>Errors in Unpacking</h3>
        <CodeBlock
          language="python"
          code={`tuple_a = ('R', 'e', 'd')\ns_1, s_2 = tuple_a\nprint(s_1)\nprint(s_2)`}
        />
        <OutputBlock
          output={["ValueError: too many values to unpack (expected 2)"]}
        />

        <CodeBlock
          language="python"
          code={`tuple_a = ('R', 'e', 'd')\ns_1, s_2, s_3, s_4 = tuple_a\nprint(s_1)`}
        />
        <OutputBlock
          output={[
            "ValueError: not enough values to unpack (expected 4, got 3)",
          ]}
        />
      </section>

      <section>
        <h2>Tuple Packing</h2>
        <p>
          Parentheses <code>()</code> are optional while creating tuples. Values
          separated by commas will be packed into a tuple.
        </p>

        <CodeBlock
          language="python"
          code={`a = 1, 2, 3\nprint(type(a))\nprint(a)`}
        />
        <OutputBlock output={["<class 'tuple'>", "(1, 2, 3)"]} />

        <CodeBlock
          language="python"
          code={`a = 1,\nprint(type(a))\nprint(a)`}
        />
        <OutputBlock output={["<class 'tuple'>", "(1,)"]} />

        <CodeBlock
          language="python"
          code={`a, = 1,\nprint(type(a))\nprint(a)`}
        />
        <OutputBlock output={["<class 'int'>", "1"]} />
      </section>

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

export default Tuples_Sequences_CS_1;
