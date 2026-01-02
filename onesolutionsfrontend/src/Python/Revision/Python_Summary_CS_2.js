import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Python_FullSummary2_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div
      className="intro-container"
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.8",
        background: "#f8f9fa",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1a5276",
          fontSize: "30px",
          marginBottom: "0.5rem",
          fontWeight: "bold",
        }}
      >
        Python Summary Cheat Sheet - 2
      </h1>
      {/* Loops */}

      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "4px solid #3498db",
            paddingBottom: "0.5rem",
          }}
        >
          Loops
        </h2>

        {/* Blue Background Content */}
        <div
          style={{
            background: "#e8f4fc",
            padding: "1.5rem",
            borderRadius: "10px",
            marginTop: "1.5rem",
          }}
        >
          <p>
            <b>Loops:</b> Loops allow us to execute a block of code several
            times.
          </p>

          <p>
            <b>While Loop:</b> Allows us to execute a block of code several
            times as long as the condition is True.
          </p>

          <CodeBlock
            language="python"
            code={`a = 1
while a < 3:  
    a = a + 1  
    print(a)  

# Output is:
2
3`}
          />

          <p>
            <b>For Loop:</b> for statement iterates over each item of a
            sequence.
          </p>

          <p>
            <b>Syntax:</b>
          </p>

          <CodeBlock
            language="python"
            code={`for each_item in sequence:
    block of code`}
          />

          <p>
            <b>Range:</b> Generates a sequence of integers starting from 0.
            Stops before n (n is not included).
          </p>

          <p>
            <b>Syntax:</b> range(n)
          </p>

          <CodeBlock
            language="python"
            code={`for number in range(3):  
    print(number)

# Output is:
0
1
2`}
          />

          <p>
            <b>Range with Start and End:</b> Generates a sequence of numbers
            starting from the start. Stops before the end (the end is not
            included).
          </p>

          <p>
            <b>Syntax:</b> range(start, end)
          </p>

          <CodeBlock
            language="python"
            code={`for number in range(5, 8):  
    print(number)

# Output is:
5
6
7`}
          />
        </div>
      </section>

      {/* Lists */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "4px solid #3498db",
            paddingBottom: "0.5rem",
          }}
        >
          Lists – Working with Lists
        </h2>

        {/* Blue Background Content */}
        <div
          style={{
            background: "#e8f4fc",
            padding: "1.5rem",
            borderRadius: "10px",
            marginTop: "1.5rem",
          }}
        >
          <p>
            <b>List:</b> List is the most versatile python data structure. Holds
            an ordered sequence of items.
          </p>

          <p>
            <b>Accessing List Items:</b> To access elements of a list, we use
            Indexing.
          </p>

          <CodeBlock
            language="python"
            code={`list_a = [5, "Six", 2, 8.2]
print(list_a[1])  # Six`}
          />

          <p>
            <b>Iterating Over a List:</b>
          </p>

          <CodeBlock
            language="python"
            code={`list_a = [5, "Six", 8.2]
for item in list_a:
    print(item)

# Output is:
5
Six
8.2`}
          />

          <p>
            <b>List Concatenation:</b> Similar to strings, + operator
            concatenates lists.
          </p>

          <CodeBlock
            language="python"
            code={`list_a = [1, 2]
list_b = ["a", "b"]
list_c = list_a + list_b
print(list_c)  # [1, 2, 'a', 'b']`}
          />

          <p>
            <b>List Slicing:</b> Obtaining a part of a list is called List
            Slicing.
          </p>

          <CodeBlock
            language="python"
            code={`list_a = [5, "Six", 2]
list_b = list_a[:2]
print(list_b)  # [5, 'Six']`}
          />

          <p>
            <b>Extended Slicing:</b> Similar to string extended slicing, we can
            extract alternate items using the step.
          </p>

          <CodeBlock
            language="python"
            code={`list_a = ["R", "B", "G", "O", "W"]
list_b = list_a[0:5:3]
print(list_b)  # ['R', 'O']`}
          />

          <p>
            <b>Reversing a List:</b> -1 for step will reverse the order of items
            in the list.
          </p>

          <CodeBlock
            language="python"
            code={`list_a = [5, 4, 3, 2, 1]
list_b = list_a[::-1]
print(list_b)  # [1, 2, 3, 4, 5]`}
          />

          <p>
            <b>Slicing With Negative Index:</b> You can also specify negative
            indices while slicing a List.
          </p>

          <CodeBlock
            language="python"
            code={`list_a = [5, 4, 3, 2, 1]
list_b = list_a[-3:-1]
print(list_b)  # [3, 2]`}
          />

          <p>
            <b>Negative Step Size:</b> Negative Step determines the decrement
            between each index for slicing. The start index should be greater
            than the end index in this case.
          </p>

          <CodeBlock
            language="python"
            code={`list_a = [5, 4, 3, 2, 1]
list_b = list_a[4:2:-1]
print(list_b)  # [1, 2]`}
          />

          <p>
            <b>Membership check-in lists:</b>
          </p>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1rem",
            }}
          >
            <thead>
              <tr style={{ background: "#3498db", color: "white" }}>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Name
                </th>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Usage
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>in</td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  By using the in operator, one can determine if a value is
                  present in a sequence or not.
                </td>
              </tr>
              <tr>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  not in
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  By using the not in operator, one can determine if a value is
                  not present in a sequence or not.
                </td>
              </tr>
            </tbody>
          </table>

          <p style={{ marginTop: "1.5rem" }}>
            <b>Nested Lists:</b> A list as an item of another list.
          </p>

          <p>
            <b>Accessing Nested List:</b>
          </p>

          <CodeBlock
            language="python"
            code={`list_a = [5, "Six", [8, 6], 8.2]
print(list_a[2])  # [8, 6]`}
          />

          <p>
            <b>Accessing Items of Nested List:</b>
          </p>

          <CodeBlock
            language="python"
            code={`list_a = [5, "Six", [8, 6], 8.2]
print(list_a[2][0])  # 8`}
          />
        </div>
      </section>
      {/* List Methods */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "4px solid #3498db",
            paddingBottom: "0.5rem",
          }}
        >
          List Methods
        </h2>

        {/* Blue Background Content */}
        <div
          style={{
            background: "#e8f4fc",
            padding: "1.5rem",
            borderRadius: "10px",
            marginTop: "1.5rem",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ background: "#3498db", color: "white" }}>
                <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                  Name
                </th>
                <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                  Syntax
                </th>
                <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                  Usage
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  append()
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  list.append(value)
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Adds an element to the end of the list.
                </td>
              </tr>

              <tr>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  extend()
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  list_a.extend(list_b)
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Adds all the elements of a sequence to the end of the list.
                </td>
              </tr>

              <tr>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  insert()
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  list.insert(index, value)
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Inserts an element into the list at the specified index.
                </td>
              </tr>

              <tr>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  pop()
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  list.pop()
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Removes the last element from the list.
                </td>
              </tr>

              <tr>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  remove()
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  list.remove(value)
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Removes the first matching element from the list.
                </td>
              </tr>

              <tr>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  clear()
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  list.clear()
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Removes all the items from the list.
                </td>
              </tr>

              <tr>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  index()
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  list.index(value)
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Returns the index of the first occurrence of the specified
                  value.
                </td>
              </tr>

              <tr>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  count()
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  list.count(value)
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Returns the number of elements with the specified value.
                </td>
              </tr>

              <tr>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  sort()
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  list.sort()
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Sorts the list.
                </td>
              </tr>

              <tr>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  copy()
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  list.copy()
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Returns a new list. It does not modify the original list.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Functions */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "4px solid #3498db",
            paddingBottom: "0.5rem",
          }}
        >
          Functions
        </h2>

        {/* Blue Background Content */}
        <div
          style={{
            background: "#e8f4fc",
            padding: "1.5rem",
            borderRadius: "10px",
            marginTop: "1.5rem",
          }}
        >
          <p>
            <b>Functions:</b> Block of reusable code to perform a specific
            action.
          </p>

          <p>
            <b>Defining a Function:</b> Function is uniquely identified by the
            function_name.
          </p>

          <CodeBlock
            language="python"
            code={`def function_name():
    reusable code`}
          />

          <p>
            <b>Calling a Function:</b> The functional block of code is executed
            only when the function is called.
          </p>

          <CodeBlock
            language="python"
            code={`def function_name():
    reusable code

function_name()`}
          />

          <CodeBlock
            language="python"
            code={`def sum_of_two_number(a, b):
    print(a + b)  # 5

sum_of_two_number(2, 3)`}
          />

          <p>
            <b>Function With Arguments:</b> We can pass values to a function
            using an Argument.
          </p>

          <CodeBlock
            language="python"
            code={`def function_name(args):
    reusable code

function_name(args)`}
          />

          <p>
            <b>Returning a Value:</b> To return a value from the function use
            return keyword. Exits from the function when return statement is
            executed.
          </p>

          <CodeBlock
            language="python"
            code={`def function_name(args):
    block of code
    return msg

function_name(args)`}
          />

          <CodeBlock
            language="python"
            code={`def sum_of_two_number(a, b):
    total = a + b
    return total

result = sum_of_two_number(2, 3)
print(result)  # 5`}
          />

          <p>
            <b>Function Arguments:</b> A function can have more than one
            argument.
          </p>

          <CodeBlock
            language="python"
            code={`def function_name(arg_1, arg_2):
    reusable code

function_name(arg_1, arg_2)`}
          />

          <p>
            <b>Keyword Arguments:</b> Passing values by their names.
          </p>

          <CodeBlock
            language="python"
            code={`def greet(arg_1, arg_2):
    print(arg_1 + " " + arg_2)  # Good Morning Ram

greet(arg_1="Good Morning", arg_2="Ram")`}
          />

          <p>
            <b>Positional Arguments:</b> Values can be passed without using
            argument names. These values get assigned according to their
            position. Order of the arguments matters here.
          </p>

          <CodeBlock
            language="python"
            code={`def greet(arg_1, arg_2):
    print(arg_1 + " " + arg_2)  # Good Morning Ram

greeting = input()  # Good Morning
name = input()  # Ram
greet(greeting, name)`}
          />

          <p>
            <b>Default Values:</b>
          </p>

          <CodeBlock
            language="python"
            code={`def greet(arg_1="Hi", arg_2="Ram"):
    print(arg_1 + " " + arg_2)  # Hi Ram

greeting = input()  # Hello
name = input()  # Teja
greet()`}
          />

          <p>
            <b>Arbitrary Function Arguments:</b> We can define a function to
            receive any number of arguments.
          </p>

          <p>
            <b>Variable Length Arguments:</b> Variable length arguments are
            packed as tuple.
          </p>

          <CodeBlock
            language="python"
            code={`def more_args(*args):
    print(args)  # (1, 2, 3, 4)

more_args(1, 2, 3, 4)`}
          />

          <p>
            <b>Unpacking as Arguments:</b> If we already have the data required
            to pass to a function as a sequence, we can unpack it with * while
            passing.
          </p>

          <CodeBlock
            language="python"
            code={`def greet(arg1="Hi", arg2="Ram"):
    print(arg1 + " " + arg2)  # Hello Teja

data = ["Hello", "Teja"]
greet(*data)`}
          />

          <p>
            <b>Multiple Keyword Arguments:</b> We can define a function to
            receive any number of keyword arguments. Variable length kwargs are
            packed as dictionary.
          </p>

          <CodeBlock
            language="python"
            code={`def more_args(**kwargs):
    print(kwargs)  # {'a': 1, 'b': 2}

more_args(a=1, b=2)`}
          />

          <p>
            <b>Function Call Stack:</b> Stack is a data structure that stores
            items in an Last-In/First-Out manner. Function Call Stack keeps
            track of function calls in progress.
          </p>

          <CodeBlock
            language="python"
            code={`def function_1():
    pass

def function_2():
    function_1()`}
          />

          <p>
            <b>Recursion:</b> A function calling itself is called a Recursion.
          </p>

          <CodeBlock
            language="python"
            code={`def function_1():
    block of code
    function_1()`}
          />

          <p>
            <b>Passing Immutable Objects:</b>
          </p>

          <CodeBlock
            language="python"
            code={`def increment(a):
    a += 1

a = int(input())  # 5
increment(a)
print(a)  # 5`}
          />

          <p>
            Even though variable names are same, they are referring to two
            different objects. Changing the value of the variable inside the
            function will not affect the variable outside.
          </p>

          <p>
            <b>Passing Mutable Objects:</b>
          </p>

          <CodeBlock
            language="python"
            code={`def add_item(list_x):
    list_x += [3]

list_a = [1, 2]
add_item(list_a)
print(list_a)  # [1, 2, 3]`}
          />

          <p>
            The same object in the memory is referred by both list_a and list_x
          </p>

          <CodeBlock
            language="python"
            code={`def add_item(list_x=[]):
    list_x += [3]
    print(list_x)

add_item()
add_item([1, 2])
add_item()

# Output is:
# [3]
# [1, 2, 3]
# [3, 3]`}
          />

          <p>
            Default args are evaluated only once when the function is defined,
            not each time the function is called.
          </p>
        </div>
      </section>

      {/* Nested Loops */}
      <section>
        <h2>Nested Loops</h2>
        <p>An inner loop within the repeating block of an outer loop.</p>

        <h3>Syntax</h3>
        <CodeBlock
          language="python"
          code={`for item in sequence_A:\n    Block_1\n    for item in sequence_B:\n        Block_2`}
        />

        <h3>While in For</h3>
        <CodeBlock
          language="python"
          code={`for item in sequence:\n    Block_1\n    while Condition:\n        Block_2`}
        />

        <h3>For in While</h3>
        <CodeBlock
          language="python"
          code={`while Condition:\n    Block_1\n    for item in sequence:\n        Block_2`}
        />
      </section>

      {/* Nested Loops */}

      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "4px solid #3498db",
            paddingBottom: "0.5rem",
          }}
        >
          Nested Loops
        </h2>

        {/* Blue Background Content */}
        <div
          style={{
            background: "#e8f4fc",
            padding: "1.5rem",
            borderRadius: "10px",
            marginTop: "1.5rem",
          }}
        >
          <p>
            <b>Nested Loops:</b> An inner loop within the repeating block of an
            outer loop is called a Nested Loop. The Inner Loop will be executed
            one time for each iteration of the Outer Loop.
          </p>

          <p>
            <b>Syntax:</b>
          </p>

          <CodeBlock
            language="python"
            code={`for item in sequence A:
    Block 1
    for item in sequence B:
        Block 2`}
          />

          <p>
            <b>Syntax of while in for loop:</b>
          </p>

          <CodeBlock
            language="python"
            code={`for item in sequence:
    Block 1
    while Condition:
        Block 2`}
          />

          <p>
            <b>Syntax of for in while loop:</b>
          </p>

          <CodeBlock
            language="python"
            code={`while Condition:
    Block 1
    for item in sequence:
        Block 2`}
          />

          <p>
            <b>Loop Control Statements:</b>
          </p>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1rem",
            }}
          >
            <thead>
              <tr style={{ background: "#d6eaf8" }}>
                <th style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Name
                </th>
                <th style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Usage
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Break
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  break statement makes the program exit a loop early.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Continue
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  continue is used to skip the remaining statements in the
                  current iteration when a condition is satisfied.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Pass
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  pass statement is used as a syntactic placeholder. When it is
                  executed, nothing happens.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Break (In Nested Loop)
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  break in the inner loop stops the execution of the inner loop.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
