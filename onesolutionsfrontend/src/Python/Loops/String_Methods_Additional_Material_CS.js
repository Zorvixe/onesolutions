import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // ✅ adjust path if needed


const String_Methods_Additional_Material_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>More String Methods | Cheat Sheet</h1>

      {/* Classification Methods */}
      <section>
        <h2>1. Classification Methods</h2>
        <p>These methods check characteristics of characters in a string.</p>

        {/* isalpha() */}
        <h3>1.1 isalpha()</h3>
        <p><b>Syntax:</b> <code>str_var.isalpha()</code></p>
        <p>Returns <code>True</code> if all characters are alphabetic, otherwise <code>False</code>.</p>
        <h4>Code</h4>
        <CodeBlock language="python" code={`print("Hello".isalpha())\nprint("Hello123".isalpha())`} />
        <h4>Output</h4>
        <OutputBlock output={["True", "False"]} />

        {/* isdecimal() */}
        <h3>1.2 isdecimal()</h3>
        <p><b>Syntax:</b> <code>str_var.isdecimal()</code></p>
        <p>Returns <code>True</code> if all characters are decimal digits, otherwise <code>False</code>.</p>
        <CodeBlock language="python" code={`print("123".isdecimal())\nprint("12a".isdecimal())`} />
        <OutputBlock output={["True", "False"]} />

        {/* islower() */}
        <h3>1.3 islower()</h3>
        <p><b>Syntax:</b> <code>str_var.islower()</code></p>
        <p>Returns <code>True</code> if all alphabetic characters are lowercase (and there's at least one alphabetic char).</p>
        <CodeBlock language="python" code={`print("hello".islower())\nprint("Hello".islower())`} />
        <OutputBlock output={["True", "False"]} />

        {/* isupper() */}
        <h3>1.4 isupper()</h3>
        <p><b>Syntax:</b> <code>str_var.isupper()</code></p>
        <p>Returns <code>True</code> if all alphabetic characters are uppercase (and there's at least one alphabetic char).</p>
        <CodeBlock language="python" code={`print("HELLO".isupper())\nprint("Hello".isupper())`} />
        <OutputBlock output={["True", "False"]} />

        {/* isalnum() */}
        <h3>1.5 isalnum()</h3>
        <p><b>Syntax:</b> <code>str_var.isalnum()</code></p>
        <p>Returns <code>True</code> if the string is non-empty and all characters are alphanumeric (letters or digits).</p>
        <CodeBlock language="python" code={`print("Hello123".isalnum())\nprint("Hello 123".isalnum())`} />
        <OutputBlock output={["True", "False"]} />
      </section>

      {/* Case Conversion Methods */}
      <section>
        <h2>2. Case Conversion Methods</h2>

        {/* capitalize() */}
        <h3>2.1 capitalize()</h3>
        <p><b>Syntax:</b> <code>str_var.capitalize()</code></p>
        <p>Returns a new string with the first character capitalized and the rest lowercased.</p>
        <CodeBlock language="python" code={`print("hello WORLD".capitalize())`} />
        <OutputBlock output={["Hello world"]} />

        {/* title() */}
        <h3>2.2 title()</h3>
        <p><b>Syntax:</b> <code>str_var.title()</code></p>
        <p>Returns a new string with the first character of every word capitalized.</p>
        <CodeBlock language="python" code={`print("hello world".title())\nprint("python 3.11".title())`} />
        <OutputBlock output={["Hello World", "Python 3.11"]} />

        {/* swapcase() */}
        <h3>2.3 swapcase()</h3>
        <p><b>Syntax:</b> <code>str_var.swapcase()</code></p>
        <p>Returns a new string with uppercase characters converted to lowercase and vice-versa.</p>
        <CodeBlock language="python" code={`print("Hello World".swapcase())`} />
        <OutputBlock output={["hELLO wORLD"]} />
      </section>

      {/* Counting & Searching Methods */}
      <section>
        <h2>3. Counting & Searching Methods</h2>

        {/* count() */}
        <h3>3.1 count()</h3>
        <p><b>Syntax:</b> <code>str_var.count(sub[, start[, end]])</code></p>
        <p>Returns the number of (possibly overlapping) occurrences of <code>sub</code> in the string. Optional <code>start</code> and <code>end</code> restrict the search range.</p>
        <CodeBlock language="python" code={`print("banana".count("a"))\nprint("banana".count("a", 2, 5))`} />
        <OutputBlock output={["3", "2"]} />

        {/* index() */}
        <h3>3.2 index()</h3>
        <p><b>Syntax:</b> <code>str_var.index(sub[, start[, end]])</code></p>
        <p>Returns the index of the first occurrence of <code>sub</code>. Raises <code>ValueError</code> if not found.</p>
        <CodeBlock language="python" code={`print("banana".index("a"))\n# "banana".index("z") -> ValueError`} />
        <OutputBlock output={["1"]} />

        {/* rindex() */}
        <h3>3.3 rindex()</h3>
        <p><b>Syntax:</b> <code>str_var.rindex(sub[, start[, end]])</code></p>
        <p>Returns the index of the last occurrence of <code>sub</code>. Raises <code>ValueError</code> if not found.</p>
        <CodeBlock language="python" code={`print("banana".rindex("a"))`} />
        <OutputBlock output={["5"]} />

        {/* find() */}
        <h3>3.4 find()</h3>
        <p><b>Syntax:</b> <code>str_var.find(sub[, start[, end]])</code></p>
        <p>Returns the index of the first occurrence of <code>sub</code>. Returns <code>-1</code> if not found (doesn't raise).</p>
        <CodeBlock language="python" code={`print("banana".find("a"))\nprint("banana".find("z"))`} />
        <OutputBlock output={["1", "-1"]} />

        {/* rfind() */}
        <h3>3.5 rfind()</h3>
        <p><b>Syntax:</b> <code>str_var.rfind(sub[, start[, end]])</code></p>
        <p>Returns the index of the last occurrence of <code>sub</code>. Returns <code>-1</code> if not found.</p>
        <CodeBlock language="python" code={`print("banana".rfind("a"))\nprint("banana".rfind("z"))`} />
        <OutputBlock output={["5", "-1"]} />
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

export default String_Methods_Additional_Material_CS;
