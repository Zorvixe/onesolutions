import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Python_FullSummary2_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Python Summary Cheat Sheet - 2</h1>

      {/* Loops */}
      <section>
        <h2>Loops</h2>
        <p>Loops allow us to execute a block of code several times.</p>

        <h3>While Loop</h3>
        <p>Executes a block of code as long as the condition is True.</p>
        <CodeBlock language="python" code={`a = 1\nwhile a < 3:\n    a = a + 1\n    print(a)`} />
        <OutputBlock output={`2\n3`} />

        <h3>For Loop</h3>
        <p>Iterates over each item of a sequence.</p>
        <p>Syntax:</p>
        <CodeBlock language="python" code={`for each_item in sequence:\n    block of code`} />

        <h4>Using range(n)</h4>
        <p>Generates a sequence of integers starting from 0 and stops before n.</p>
        <CodeBlock language="python" code={`for number in range(3):\n    print(number)`} />
        <OutputBlock output={`0\n1\n2`} />

        <h4>Range with Start and End</h4>
        <p>Generates numbers from start to end-1.</p>
        <CodeBlock language="python" code={`for number in range(5, 8):\n    print(number)`} />
        <OutputBlock output={`5\n6\n7`} />
      </section>

      {/* Lists */}
      <section>
        <h2>Lists - Working with Lists</h2>
        <p>List is the most versatile Python data structure. Holds an ordered sequence of items.</p>

        <h3>Accessing List Items</h3>
        <CodeBlock language="python" code={`list_a = [5, "Six", 2, 8.2]\nprint(list_a[1])`} />
        <OutputBlock output={`Six`} />

        <h3>Iterating Over a List</h3>
        <CodeBlock language="python" code={`list_a = [5, "Six", 8.2]\nfor item in list_a:\n    print(item)`} />
        <OutputBlock output={`5\nSix\n8.2`} />

        <h3>List Concatenation</h3>
        <CodeBlock language="python" code={`list_a = [1, 2]\nlist_b = ["a", "b"]\nlist_c = list_a + list_b\nprint(list_c)`} />
        <OutputBlock output={`[1, 2, 'a', 'b']`} />

        <h3>List Slicing</h3>
        <CodeBlock language="python" code={`list_a = [5, "Six", 2]\nlist_b = list_a[:2]\nprint(list_b)`} />
        <OutputBlock output={`[5, 'Six']`} />

        <h3>Extended Slicing</h3>
        <CodeBlock language="python" code={`list_a = ["R", "B", "G", "O", "W"]\nlist_b = list_a[0:5:3]\nprint(list_b)`} />
        <OutputBlock output={`['R', 'O']`} />

        <h3>Reversing a List</h3>
        <CodeBlock language="python" code={`list_a = [5, 4, 3, 2, 1]\nlist_b = list_a[::-1]\nprint(list_b)`} />
        <OutputBlock output={`[1, 2, 3, 4, 5]`} />

        <h3>Slicing with Negative Index</h3>
        <CodeBlock language="python" code={`list_a = [5, 4, 3, 2, 1]\nlist_b = list_a[-3:-1]\nprint(list_b)`} />
        <OutputBlock output={`[3, 2]`} />

        <h3>Negative Step Size</h3>
        <CodeBlock language="python" code={`list_a = [5, 4, 3, 2, 1]\nlist_b = list_a[4:2:-1]\nprint(list_b)`} />
        <OutputBlock output={`[1, 2]`} />

        <h3>Membership Check in Lists</h3>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr><th>Name</th><th>Usage</th></tr>
          </thead>
          <tbody>
            <tr><td>in</td><td>Determine if a value is present in a sequence</td></tr>
            <tr><td>not in</td><td>Determine if a value is not present in a sequence</td></tr>
          </tbody>
        </table>

        <h3>Nested Lists</h3>
        <p>List as an item of another list.</p>
        <CodeBlock language="python" code={`list_a = [5, "Six", [8, 6], 8.2]\nprint(list_a[2])`} />
        <OutputBlock output={`[8, 6]`} />
        <CodeBlock language="python" code={`print(list_a[2][0])`} />
        <OutputBlock output={`8`} />

        <h3>List Methods</h3>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr><th>Name</th><th>Syntax</th><th>Usage</th></tr>
          </thead>
          <tbody>
            <tr><td>append()</td><td>list.append(value)</td><td>Adds an element to the end</td></tr>
            <tr><td>extend()</td><td>list_a.extend(list_b)</td><td>Adds all elements of another sequence</td></tr>
            <tr><td>insert()</td><td>list.insert(index, value)</td><td>Insert element at a specified index</td></tr>
            <tr><td>pop()</td><td>list.pop()</td><td>Removes last element</td></tr>
            <tr><td>remove()</td><td>list.remove(value)</td><td>Removes first matching element</td></tr>
            <tr><td>clear()</td><td>list.clear()</td><td>Removes all items</td></tr>
            <tr><td>index()</td><td>list.index(value)</td><td>Returns first occurrence index</td></tr>
            <tr><td>count()</td><td>list.count(value)</td><td>Returns number of elements with the value</td></tr>
            <tr><td>sort()</td><td>list.sort()</td><td>Sorts the list</td></tr>
            <tr><td>copy()</td><td>list.copy()</td><td>Returns a new list, original not modified</td></tr>
          </tbody>
        </table>
      </section>

      {/* Functions */}
      <section>
        <h2>Functions</h2>
        <p>Block of reusable code to perform a specific action.</p>

        <h3>Defining a Function</h3>
        <CodeBlock language="python" code={`def function_name():\n    reusable code`} />

        <h3>Calling a Function</h3>
        <CodeBlock language="python" code={`def function_name():\n    reusable code\n\nfunction_name()`} />

        <h3>Function with Arguments</h3>
        <CodeBlock language="python" code={`def sum_of_two_number(a, b):\n    print(a + b)\n\nsum_of_two_number(2, 3)`} />
        <OutputBlock output={`5`} />

        <h3>Returning a Value</h3>
        <CodeBlock language="python" code={`def sum_of_two_number(a, b):\n    total = a + b\n    return total\n\nresult = sum_of_two_number(2, 3)\nprint(result)`} />
        <OutputBlock output={`5`} />

        <h3>Keyword Arguments</h3>
        <CodeBlock language="python" code={`def greet(arg_1, arg_2):\n    print(arg_1 + " " + arg_2)\n\ngreet(arg_1="Good Morning", arg_2="Ram")`} />
        <OutputBlock output={`Good Morning Ram`} />

        <h3>Positional Arguments</h3>
        <CodeBlock language="python" code={`def greet(arg_1, arg_2):\n    print(arg_1 + " " + arg_2)\n\ngreeting = input()  # Good Morning\nname = input()      # Ram\ngreet(greeting, name)`} />
        <OutputBlock output={`Good Morning Ram`} />

        <h3>Default Values</h3>
        <CodeBlock language="python" code={`def greet(arg_1="Hi", arg_2="Ram"):\n    print(arg_1 + " " + arg_2)\n\ngreeting = input()  # Hello\nname = input()      # Teja\ngreet()`} />
        <OutputBlock output={`Hi Ram`} />

        <h3>Arbitrary Function Arguments</h3>
        <CodeBlock language="python" code={`def more_args(*args):\n    print(args)\n\nmore_args(1, 2, 3, 4)`} />
        <OutputBlock output={`(1, 2, 3, 4)`} />

        <h3>Unpacking as Arguments</h3>
        <CodeBlock language="python" code={`def greet(arg1="Hi", arg2="Ram"):\n    print(arg1 + " " + arg2)\n\ndata = ["Hello", "Teja"]\ngreet(*data)`} />
        <OutputBlock output={`Hello Teja`} />

        <h3>Multiple Keyword Arguments</h3>
        <CodeBlock language="python" code={`def more_args(**kwargs):\n    print(kwargs)\n\nmore_args(a=1, b=2)`} />
        <OutputBlock output={`{'a': 1, 'b': 2}`} />

        <h3>Function Call Stack</h3>
        <CodeBlock language="python" code={`def function_1():\n    pass\n\ndef function_2():\n    function_1()`} />

        <h3>Recursion</h3>
        <CodeBlock language="python" code={`def function_1():\n    block of code\n    function_1()`} />

        <h3>Passing Immutable Objects</h3>
        <CodeBlock language="python" code={`def increment(a):\n    a += 1\n\na = int(input())  # 5\nincrement(a)\nprint(a)`} />
        <OutputBlock output={`5`} />

        <h3>Passing Mutable Objects</h3>
        <CodeBlock language="python" code={`def add_item(list_x):\n    list_x += [3]\n\nlist_a = [1,2]\nadd_item(list_a)\nprint(list_a)`} />
        <OutputBlock output={`[1, 2, 3]`} />

        <h3>Mutable Default Argument</h3>
        <CodeBlock language="python" code={`def add_item(list_x=[]):\n    list_x += [3]\n    print(list_x)\n\nadd_item()\nadd_item([1,2])\nadd_item()`} />
        <OutputBlock output={`[3]\n[1, 2, 3]\n[3, 3]`} />
      </section>

      {/* Nested Loops */}
      <section>
        <h2>Nested Loops</h2>
        <p>An inner loop within the repeating block of an outer loop.</p>

        <h3>Syntax</h3>
        <CodeBlock language="python" code={`for item in sequence_A:\n    Block_1\n    for item in sequence_B:\n        Block_2`} />

        <h3>While in For</h3>
        <CodeBlock language="python" code={`for item in sequence:\n    Block_1\n    while Condition:\n        Block_2`} />

        <h3>For in While</h3>
        <CodeBlock language="python" code={`while Condition:\n    Block_1\n    for item in sequence:\n        Block_2`} />
      </section>

      {/* Loop Control Statements */}
      <section>
        <h2>Loop Control Statements</h2>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr><th>Name</th><th>Usage</th></tr>
          </thead>
          <tbody>
            <tr><td>Break</td><td>Exits a loop early</td></tr>
            <tr><td>Continue</td><td>Skips remaining statements in current iteration</td></tr>
            <tr><td>Pass</td><td>Syntactic placeholder; does nothing</td></tr>
            <tr><td>Break (in nested loop)</td><td>Stops execution of inner loop</td></tr>
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

export default Python_FullSummary2_CS;
