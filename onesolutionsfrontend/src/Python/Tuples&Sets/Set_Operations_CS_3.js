import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const SetOperations_CS_3 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Set Operations | Cheat Sheet</h1>

      {/* Set Operations */}
      <section>
        <h2>Set Operations</h2>
        <p>
          Set objects also support mathematical operations like union, intersection,
          difference, and symmetric difference.
        </p>
      </section>

      {/* Union */}
      <section>
        <h2>Union</h2>
        <p>
          Union of two sets is a set containing all elements of both sets.
        </p>
        <p>
          <code>set_a | set_b</code>
        </p>
        <p>
          or
        </p>
        <p>
          <code>set_a.union(sequence)</code>
        </p>
        <p>
          <code>union()</code> converts sequence to a set, and performs the union.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`set_a = {1, 2, 3}\nset_b = {3, 4, 5}\nresult = set_a | set_b\nprint(result)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[1, 2, 3, 4, 5]} />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`set_a = {1, 2}\nresult = set_a.union([2, 3, 4])\nprint(result)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[1, 2, 3, 4]} />
      </section>

      {/* Intersection */}
      <section>
        <h2>Intersection</h2>
        <p>
          Intersection of two sets is a set containing common elements of both sets.
        </p>
        <p>
          <code>set_a & set_b</code>
        </p>
        <p>
          or
        </p>
        <p>
          <code>set_a.intersection(sequence)</code>
        </p>
        <p>
          <code>intersection()</code> converts sequence to a set, and performs the
          intersection.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`set_a = {1, 2, 3}\nset_b = {2, 3, 4}\nresult = set_a & set_b\nprint(result)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[2, 3]} />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`set_a = {1, 2, 3}\nresult = set_a.intersection([2, 3, 5])\nprint(result)`}
        />
        <h3>Output</h3>
       <OutputBlock output={[2, 3]} />
      </section>

      {/* Difference */}
      <section>
        <h2>Difference</h2>
        <p>
          Difference of two sets is a set containing all the elements in the first set but
          not second.
        </p>
        <p>
          <code>set_a - set_b</code>
        </p>
        <p>
          or
        </p>
        <p>
          <code>set_a.difference(sequence)</code>
        </p>
        <p>
          <code>difference()</code> converts sequence to a set.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`set_a = {1, 2, 3}\nset_b = {2, 3, 4}\nresult = set_a - set_b\nprint(result)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[`1`]} />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`set_a = {1, 2, 3}\nresult = set_a.difference([2, 4])\nprint(result)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[`1, 3`]} />
      </section>

      {/* Symmetric Difference */}
      <section>
        <h2>Symmetric Difference</h2>
        <p>
          Symmetric difference of two sets is a set containing all elements which are not
          common to both sets.
        </p>
        <p>
          <code>set_a ^ set_b</code>
        </p>
        <p>
          or
        </p>
        <p>
          <code>set_a.symmetric_difference(sequence)</code>
        </p>
        <p>
          <code>symmetric_difference()</code> converts sequence to a set.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`set_a = {1, 2, 3}\nset_b = {2, 3, 4}\nresult = set_a ^ set_b\nprint(result)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[`1, 4`]} />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`set_a = {1, 2, 3}\nresult = set_a.symmetric_difference([2, 4, 5])\nprint(result)`}
        />
        <h3>Output</h3>
        <OutputBlock output={[`1, 3, 4, 5`]} />
      </section>

      {/* Set Comparisons */}
      <section>
        <h2>Set Comparisons</h2>
        <p>
          Set comparisons are used to validate whether one set fully exists within another
        </p>
        <h3>Subset</h3>
        <p>
          <code>set2.issubset(set1)</code> Returns True if all elements of second set are
          in first set. Else, False
        </p>
        <h4>Example - 1</h4>
        <h4>Code</h4>
        <CodeBlock
          language="python"
          code={`set1 = {1, 2, 3, 4}\nset2 = {2, 3}\nprint(set2.issubset(set1))`}
        />
        <h4>Output</h4>
        <OutputBlock output={true} />
        <h4>Example - 2</h4>
        <h4>Code</h4>
        <CodeBlock
          language="python"
          code={`set1 = {1, 2, 3}\nset2 = {2, 4}\nprint(set2.issubset(set1))`}
        />
        <h4>Output</h4>
        <OutputBlock output={false} />
        <h3>SuperSet</h3>
        <p>
          <code>set1.issuperset(set2)</code> Returns True if all elements of second set
          are in first set. Else, False
        </p>
        <h4>Example - 1</h4>
        <h4>Code</h4>
        <CodeBlock
          language="python"
          code={`set1 = {1, 2, 3, 4}\nset2 = {2, 3}\nprint(set1.issuperset(set2))`}
        />
        <h4>Output</h4>
        <OutputBlock output={true} />
        <h4>Example - 2</h4>
        <h4>Code</h4>
        <CodeBlock
          language="python"
          code={`set1 = {1, 2, 3}\nset2 = {2, 4}\nprint(set1.issuperset(set2))`}
        />
        <h4>Output</h4>
        <OutputBlock output={false} />
        <h3>Disjoint Sets</h3>
        <p>
          <code>set1.isdisjoint(set2)</code> Returns True when they have no common
          elements. Else, False
        </p>
        <h4>Code</h4>
        <CodeBlock
          language="python"
          code={`set1 = {1, 2, 3}\nset2 = {4, 5, 6}\nprint(set1.isdisjoint(set2))`}
        />
        <h4>Output</h4>
        <OutputBlock output={true} />
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

export default SetOperations_CS_3;