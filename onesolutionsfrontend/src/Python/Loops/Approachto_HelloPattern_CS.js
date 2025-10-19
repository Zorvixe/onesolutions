import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; 

const Approachto_HollowPattern_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Hollow Right-Angled Triangle Pattern | Cheat Sheet</h1>

      {/* Pattern Overview */}
      <section>
        <h2>Pattern Overview</h2>
        <p>
          We want to print a hollow right-angled triangle of size <strong>N = 7</strong>.
        </p>
        <ul>
          <li>Use <code>* </code> (star followed by space) for stars</li>
          <li>Use <code>  </code> (double space) for empty spaces</li>
          <li>Pattern has 3 parts: First line, Middle lines (hollow), Last line</li>
        </ul>
      </section>

      

      {/* Part 1: First Line */}
      <section>
        <h2>Part 1: First Line</h2>
        <p>Row 1: 6 spaces + 1 star</p>
        <CodeBlock language="python" code={`i = 0\nprint('  '*(N-1) + '* ')`} />
        <OutputBlock output={["      * "]} />
      </section>

      {/* Part 2: Middle Lines */}
      <section>
        <h2>Part 2: Middle Lines (Row 2 to 6)</h2>
        <p>Each row has decreasing spaces, first star, hollow spaces, second star.</p>
        <CodeBlock language="python" code={`for i in range(1, N-1):
    print('  '*(N-i-1) + '* ' + '  '*(i-1) + '* ')`} />
        <OutputBlock output={[
          "     * *",
          "    *   *",
          "   *     *",
          "  *       *",
          " *         *"
        ]} />
      </section>

      {/* Part 3: Last Line */}
      <section>
        <h2>Part 3: Last Line</h2>
        <p>Row 7: full stars, no spaces</p>
        <CodeBlock language="python" code={`print('* ' * N)`} />
        <OutputBlock output={["* * * * * * *"]} />
      </section>

      {/* Full Python Code */}
      <section>
        <h2>Full Python Code</h2>
        <CodeBlock language="python" code={`N = 7
for i in range(N):
    if i == 0:
        print('  '*(N-1) + '* ')
    elif i == N-1:
        print('* ' * N)
    else:
        print('  '*(N-i-1) + '* ' + '  '*(i-1) + '* ')`} />
        <OutputBlock output={[
          "      * ",
          "     * *",
          "    *   *",
          "   *     *",
          "  *       *",
          " *         *",
          "* * * * * * *"
        ]} />
      </section>

      {/* Tips */}
      <section>
        <h2>Tips to Remember</h2>
        <ul>
          <li>Use <code>* </code> for stars and <code>  </code> for spaces.</li>
          <li>First and last lines are special cases.</li>
          <li>Hollow spaces increase by 1 each row.</li>
          <li>Use <code>N-i-1</code> for leading spaces.</li>
          <li>Check indentation carefully.</li>
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

export default Approachto_HollowPattern_CS;
