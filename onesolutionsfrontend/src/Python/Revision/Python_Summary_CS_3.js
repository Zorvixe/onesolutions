import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Python_Summary_CS_3 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Python Built-in Functions, Sets, Tuples, Dictionaries Cheat Sheet</h1>

      {/* Built-in Functions */}
      <section>
        <h2>Built-in Functions</h2>
        <p>Common Python built-in functions and their usage:</p>

        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr><th>Name</th><th>Usage</th></tr>
          </thead>
          <tbody>
            <tr><td>print()</td><td>Function prints the message to the screen or any standard output device.</td></tr>
            <tr><td>int()</td><td>Converts valid data of any type to integer.</td></tr>
            <tr><td>str()</td><td>Converts data of any type to string.</td></tr>
            <tr><td>id()</td><td>Returns the id of an object.</td></tr>
            <tr><td>round(number, digits(optional))</td><td>Rounds the float value to given decimal digits.</td></tr>
            <tr><td>bool()</td><td>Converts to boolean type.</td></tr>
            <tr><td>ord(character)</td><td>Returns unicode value of the character.</td></tr>
            <tr><td>chr(unicode)</td><td>Returns character with the unicode value.</td></tr>
            <tr><td>list(sequence)</td><td>Converts a sequence into list.</td></tr>
            <tr><td>tuple(sequence)</td><td>Converts a sequence into tuple.</td></tr>
            <tr><td>set(sequence)</td><td>Converts sequence to set, avoiding duplicates.</td></tr>
            <tr><td>dict(sequence)</td><td>Converts key-value pairs into dictionary.</td></tr>
            <tr><td>float()</td><td>Converts to float type.</td></tr>
            <tr><td>type()</td><td>Check the datatype of variable or value.</td></tr>
            <tr><td>min()</td><td>Returns smallest item in a sequence or arguments.</td></tr>
            <tr><td>max()</td><td>Returns largest item in a sequence or arguments.</td></tr>
            <tr><td>sum(sequence)</td><td>Returns sum of items in a sequence.</td></tr>
            <tr><td>sorted(sequence)</td><td>Returns sequence sorted in increasing order.</td></tr>
            <tr><td>sorted(sequence, reverse=True)</td><td>Returns sequence sorted in decreasing order.</td></tr>
            <tr><td>len(sequence)</td><td>Returns length of sequence.</td></tr>
            <tr><td>map()</td><td>Applies function to each item in sequence and returns results.</td></tr>
            <tr><td>filter()</td><td>Filters sequence elements based on function returning True or False.</td></tr>
            <tr><td>reduce()</td><td>Receives function and iterable, returns single value (not iterable).</td></tr>
          </tbody>
        </table>

        <h3>Floating Point Approximation</h3>
        <p>Float values are stored approximately:</p>
        <CodeBlock language="python" code={`print(0.1 + 0.2)`} />
        <OutputBlock output={`0.30000000000000004`} />

        <h3>Floating Point Errors</h3>
        <CodeBlock language="python" code={`print((0.1 + 0.2) == 0.3)`} />
        <OutputBlock output={`False`} />

        <h3>Compound Assignment Operators</h3>
        <p>Examples:</p>
        <CodeBlock language="python" code={`a = 10\na += 1\nprint(a)  # 11\na -= 2\nprint(a)  # 8\na /= 2\nprint(a)  # 5.0\na %= 2\nprint(a)  # 0`} />

        <h3>Strings: Single and Double Quotes</h3>
        <p>Strings are sequences enclosed in quotes:</p>
        <CodeBlock language="python" code={`sport = 'Cricket'\nsport = "Cricket"`} />

        <h3>Escape Characters</h3>
        <p>Used to insert special characters in strings:</p>
        <CodeBlock language="python" code={`print("Hello\\nWorld")`} />
        <OutputBlock output={`Hello\nWorld`} />

        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr><th>Name</th><th>Usage</th></tr>
          </thead>
          <tbody>
            <tr><td>\\n</td><td>New Line</td></tr>
            <tr><td>\\t</td><td>Tab Space</td></tr>
            <tr><td>\\\\</td><td>Backslash</td></tr>
            <tr><td>\\'</td><td>Single Quote</td></tr>
            <tr><td>\\"</td><td>Double Quote</td></tr>
          </tbody>
        </table>
      </section>

      {/* Sets */}
      <section>
        <h2>Set Methods, Operations and Comparisons</h2>

        <h3>Set Methods</h3>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead><tr><th>Name</th><th>Syntax</th><th>Usage</th></tr></thead>
          <tbody>
            <tr><td>add()</td><td>set.add(value)</td><td>Adds the item if not already present</td></tr>
            <tr><td>update()</td><td>set.update(sequence)</td><td>Adds multiple items, avoiding duplicates</td></tr>
            <tr><td>discard()</td><td>set.discard(value)</td><td>Removes item if present</td></tr>
            <tr><td>remove()</td><td>set.remove(value)</td><td>Removes item or raises error if not found</td></tr>
            <tr><td>clear()</td><td>set.clear()</td><td>Removes all items</td></tr>
          </tbody>
        </table>

        <h3>Set Operations</h3>
        <p>Union:</p>
        <CodeBlock language="python" code={`set_a = {4, 2, 8}\nset_b = {1, 2}\nunion = set_a | set_b\nprint(union)`} />
        <OutputBlock output={`{1, 2, 4, 8}`} />

        <p>Intersection:</p>
        <CodeBlock language="python" code={`intersection = set_a & set_b\nprint(intersection)`} />
        <OutputBlock output={`{2}`} />

        <p>Difference:</p>
        <CodeBlock language="python" code={`diff = set_a - set_b\nprint(diff)`} />
        <OutputBlock output={`{8, 4}`} />

        <p>Symmetric Difference:</p>
        <CodeBlock language="python" code={`symmetric_diff = set_a ^ set_b\nprint(symmetric_diff)`} />
        <OutputBlock output={`{8, 1, 4}`} />

        <h3>Set Comparisons</h3>
        <ul>
          <li>issubset(): True if all elements of second set are in first set.</li>
          <li>issuperset(): True if all elements of second set are in first set.</li>
          <li>isdisjoint(): True if sets have no common elements.</li>
        </ul>
      </section>

      {/* Tuples */}
      <section>
        <h2>Tuples</h2>
        <p>Tuple: Ordered, immutable sequence of items.</p>

        <h3>Accessing Tuple Elements</h3>
        <CodeBlock language="python" code={`tuple_a = (5, "Six", 2, 8.2)\nprint(tuple_a[1])`} />
        <OutputBlock output={`Six`} />

        <h3>Tuple Slicing</h3>
        <CodeBlock language="python" code={`tuple= ('a','b','c','d','e','f','g','h','i','j')\nprint(tuple[0:2])\nprint(tuple[-1:-3:-2])\nprint(tuple[1:7:2])`} />
        <OutputBlock output={`('a', 'b')\n('j',)\n('b', 'd', 'f')`} />

        <h3>Membership Check</h3>
        <CodeBlock language="python" code={`tuple_a = (1,2,3,4)\nis_part = 5 in tuple_a\nprint(is_part)\nis_part = 5 not in tuple_a\nprint(is_part)`} />
        <OutputBlock output={`False\nTrue`} />

        <h3>Tuple Packing & Unpacking</h3>
        <CodeBlock language="python" code={`a = 1, 2, 3\nprint(type(a))\nprint(a)\n\ntuple_a = ('R','e','d')\n(s_1, s_2, s_3) = tuple_a\nprint(s_1, s_2, s_3)`} />
        <OutputBlock output={`<class 'tuple'>\n(1, 2, 3)\nR e d`} />
      </section>

      {/* Dictionaries */}
      <section>
        <h2>Dictionaries</h2>
        <p>Unordered collection of key-value pairs. Keys must be immutable and unique.</p>

        <h3>Creating a Dictionary</h3>
        <CodeBlock language="python" code={`dict_a = {\n  "name": "Teja",\n  "age": 15\n}`} />

        <h3>Accessing Items</h3>
        <CodeBlock language="python" code={`print(dict_a['name'])\nprint(dict_a.get('name'))\nprint(dict_a.get('city'))`} />
        <OutputBlock output={`Teja\nTeja\nNone`} />

        <h3>Membership Check</h3>
        <CodeBlock language="python" code={`result = 'name' in dict_a\nprint(result)`} />
        <OutputBlock output={`True`} />

        <h3>Adding/Modifying/Deleting Items</h3>
        <CodeBlock language="python" code={`dict_a['city'] = 'Goa'\ndict_a['age'] = 24\ndel dict_a['age']\nprint(dict_a)`} />
        <OutputBlock output={`{'name': 'Teja', 'city': 'Goa'}`} />
      </section>

      {/* Sets Summary */}
      <section>
        <h2>Sets Summary</h2>
        <p>Unordered, unique, immutable items.</p>
        <CodeBlock language="python" code={`set_a = {"a","b","c","a"}\nprint(set_a)`} />
        <OutputBlock output={`{'b', 'a', 'c'}`} />

        <p>Immutable Items Example (error):</p>
        <CodeBlock language="python" code={`set_a = {"a", ["c", "a"]}\nprint(set_a)`} />
      </section>

      {/* Dictionary Views & Methods */}
      <section>
        <h2>Dictionary Views & Methods</h2>

        <h3>Views</h3>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead><tr><th>View</th><th>Syntax</th><th>Usage</th></tr></thead>
          <tbody>
            <tr><td>keys</td><td>dict.keys()</td><td>Returns dictionary keys</td></tr>
            <tr><td>values</td><td>dict.values()</td><td>Returns dictionary values</td></tr>
            <tr><td>items</td><td>dict.items()</td><td>Returns dictionary key-value pairs</td></tr>
          </tbody>
        </table>

        <h3>Dictionary Methods</h3>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead><tr><th>Name</th><th>Syntax</th><th>Usage</th></tr></thead>
          <tbody>
            <tr><td>copy</td><td>dict.copy()</td><td>Returns a copy of dictionary</td></tr>
            <tr><td>update</td><td>dict.update(iterable)</td><td>Inserts specified items to dictionary</td></tr>
            <tr><td>clear</td><td>dict.clear()</td><td>Removes all elements from dictionary</td></tr>
          </tbody>
        </table>
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

export default Python_Summary_CS_3;
