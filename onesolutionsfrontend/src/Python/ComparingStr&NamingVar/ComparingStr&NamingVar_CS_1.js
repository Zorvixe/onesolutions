import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const ComparingStrAndNamingVar_CS_1 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Comparing Strings & Naming Variables | Cheat Sheet</h1>

      {/* Comparing Strings */}
      <section>
        <h2>Comparing Strings</h2>
        <p>
          Computer internally stores characters as numbers.
        </p>
        <p>
          Every character has a unique Unicode value.
        </p>
      </section>

      {/* Ord */}
      <section>
        <h2>Ord</h2>
        <p>
          To find the Unicode value of a character, we use the <code>ord()</code>.
        </p>
        <p>
          <code>ord(character)</code> gives unicode value of the character.
        </p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`print(ord('A'))\nprint(ord('a'))`} />
        <h3>Output</h3>
        <OutputBlock output={[65, 97]} />
      </section>

      {/* Chr */}
      <section>
        <h2>Chr</h2>
        <p>
          To find the character with the given Unicode value, we use the <code>chr()</code>.
        </p>
        <p>
          <code>chr(unicode)</code> gives character with the unicode value.
        </p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`print(chr(65))\nprint(chr(97))`} />
        <h3>Output</h3>
        <OutputBlock output={["A", "a"]} />
      </section>

      {/* Unicode Ranges */}
      <section>
        <h2>Unicode Ranges</h2>
        <ul>
          <li>{`48 - 57 -> Number Digits (0 - 9)`}</li>
          <li>{`65 - 90 -> Capital Letters (A - Z)`}</li>
          <li>{`97 - 122 -> Small Letters (a - z)`}</li>
          <li>{`Rest -> Special Characters, Other Languages`}</li>
        </ul>
      </section>

      {/* Printing Characters */}
      <section>
        <h2>Printing Characters</h2>
        <p>
          The below code will print the characters from A to Z
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`for i in range(65, 91):\n    print(chr(i), end=' ')`}
        />
        <h3>Output</h3>
        <OutputBlock output={"A B C D E F G H I J K L M N O P Q R S T U V W X Y Z"} />
      </section>

      {/* Comparing Strings */}
      <section>
        <h2>Comparing Strings</h2>
        <p>
          In Python, strings are compared considering unicode.
        </p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`print('A' < 'B')`} />
        <h3>Output</h3>
        <OutputBlock output={true} />
        <p>
          {`As unicode value of A is 65 and B is 66, which internally compares 65 < 66. So the
          output should be True`}
        </p>
      </section>

      {/* Character by Character Comparison */}
      <section>
        <h2>Character by Character Comparison</h2>
        <p>
          In Python, String Comparison is done character by character.
        </p>
        <h3>Code</h3>
        <CodeBlock language="python" code={`print("apple" < "banana")`} />
        <h3>Output</h3>
        <OutputBlock output={true} />
        <h3>Code</h3>
        <CodeBlock language="python" code={`print("zoo" < "zip")`} />
        <h3>Output</h3>
        <OutputBlock output={false} />
      </section>

      {/* Best Practices */}
      <section>
        <h2>Best Practices</h2>

        <h3>Naming Variables Rule #1</h3>
        <p>Use only the below characters</p>
        <ul>
          <li>Capital Letters (A – Z)</li>
          <li>Small Letters (a – z)</li>
          <li>Digits (0 – 9)</li>
          <li>Underscore(_)</li>
        </ul>
        <p>Examples: age, total_bill</p>

        <h3>Naming Variables Rule #2</h3>
        <p>Below characters cannot be used</p>
        <ul>
          <li>Blanks ( )</li>
          <li>Commas (,)</li>
          <li>Special Characters (~ ! @ # $ % ^ . ?, etc.)</li>
        </ul>

        <h3>Naming Variables Rule #3</h3>
        <p>Variable name must begin with</p>
        <ul>
          <li>Capital Letters (A – Z)</li>
          <li>Small Letters (a – z)</li>
          <li>Underscore(_)</li>
        </ul>

        <h3>Naming Variables Rule #4</h3>
        <p>Cannot use Keywords, which are reserved for special meaning</p>
        <ul>
          <li><code>int</code></li>
          <li><code>str</code></li>
          <li><code>print</code> etc.,</li>
        </ul>
      </section>

      {/* Keywords */}
      <section>
        <h2>Keywords</h2>
        <p>
          Words which are reserved for special meaning
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`import keyword\nprint(keyword.kwlist)`}
        />
        <h3>Output</h3>
        <OutputBlock
          output={[
            "'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield'",
          ]}
        />
      </section>

      {/* Case Styles */}
      <section>
        <h2>Case Styles</h2>
        <ul>
          <li>Camel case: totalBill</li>
          <li>Pascal case: TotalBill</li>
          <li>Snake case: total_bill</li>
        </ul>
        <p>Snake case is preferred for naming the variables in Python.</p>
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

export default ComparingStrAndNamingVar_CS_1;