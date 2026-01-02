import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Python_Summary_CS_3 = ({ onSubtopicComplete }) => {
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
        Python Summary Cheat Sheet - 3
      </h1>

      {/* Built-in Functions */}
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
          Built - In - Functions
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
              marginBottom: "1.5rem",
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
                  print()
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Function prints the message to the screen or any other
                  standard output device.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  int()
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Converts valid data of any type to integer.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  str()
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Converts data of any type to a string.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  id()
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  To find the id of a object.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  round(number, digits(optional))
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Rounds the float value to the given number of decimal digits.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  bool()
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Converts to boolean data type.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  ord(character)
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Gives unicode value of the character.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  chr(unicode)
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Gives character with the unicode value.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  list(sequence)
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Takes a sequence and converts it into list.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  tuple(sequence)
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Takes a sequence and converts it into tuple.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  set(sequence)
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Takes any sequence as argument and converts to set, avoiding
                  duplicates.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  dict(sequence)
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Takes any number of key-value pairs and converts to
                  dictionary.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  float()
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Converts to float data type.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  type()
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Check the datatype of the variable or value using.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  min()
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Returns the smallest item in a sequence or the smallest of two
                  or more arguments.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  max()
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Returns the largest item in a sequence or the largest of two
                  or more arguments.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  sum(sequence)
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Returns the sum of items in a sequence.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  sorted(sequence)
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Returns a new sequence with all the items in the given
                  sequence ordered in increasing order.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  sorted(sequence, reverse=True)
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Returns a new sequence with all the items in the given
                  sequence ordered in decreasing order.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  len(sequence)
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Returns the length of the sequence.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  map()
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Applies a given function to each item of a sequence (list,
                  tuple etc.) and returns a sequence of the results.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  filter()
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Method filters the given sequence with the help of a function
                  that tests each element in the sequence to be true or not.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  reduce()
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Receives two arguments, a function and an iterable. However,
                  it doesn't return another iterable, instead, it returns a
                  single value.
                </td>
              </tr>
            </tbody>
          </table>

          <p>
            <b>Floating Point Approximation:</b> Float values are stored
            approximately.
          </p>

          <CodeBlock
            language="python"
            code={`print(0.1 + 0.2) # 0.30000000000000004`}
          />

          <p>
            <b>Floating Point Errors:</b> Sometimes, floating point
            approximation gives unexpected results.
          </p>

          <CodeBlock
            language="python"
            code={`print((0.1 + 0.2) == 0.3) # False`}
          />

          <p>
            <b>Different compound assignment operators are:</b> +=, -=, *=, /=,
            %=
          </p>

          <CodeBlock
            language="python"
            code={`a = 10
a += 1
print(a) # 11

a = 10
a -= 2
print(a) # 8

a = 10
a /= 2
print(a) # 5.0

a = 10
a %= 2
print(a) # 0`}
          />

          <p>
            <b>Single And Double Quotes:</b> A string is a sequence of
            characters enclosed within quotes.
          </p>

          <CodeBlock
            language="python"
            code={`sport = 'Cricket'
sport = "Cricket"`}
          />

          <p>
            <b>Escape Characters:</b> Escape Characters are a sequence of
            characters in a string that is interpreted differently by the
            computer. We use escape characters to insert characters that are
            illegal in a string.
          </p>

          <CodeBlock
            language="python"
            code={`print("Hello\nWorld")

# Output is:
Hello
World`}
          />

          <p>
            We got a new line by adding <b>\\n</b> escape character.
          </p>

          <table
            style={{
              width: "50%",
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
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>\n</td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  New Line
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>\t</td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Tab Space
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>\\</td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Backslash
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>\'</td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Single Quote
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>\"</td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Double Quote
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Sets */}
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
          Set Methods, Operations and Comparisons
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
            <b>Set Methods:</b>
          </p>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "1.5rem",
            }}
          >
            <thead>
              <tr style={{ background: "#d6eaf8" }}>
                <th style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Name
                </th>
                <th style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Syntax
                </th>
                <th style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Usage
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  add()
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  set.add(value)
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Adds the item to the set, if the item is not present already.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  update()
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  set.update(sequence)
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Adds multiple items to the set, and duplicates are avoided.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  discard()
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  set.discard(value)
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Takes a single value and removes if present.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  remove()
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  set_a.remove(value)
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Takes a value and removes it if it is present or raises an
                  error.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  clear()
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  set.clear()
                </td>
                <td style={{ border: "1px solid #bbb", padding: "8px" }}>
                  Removes all the items in the set.
                </td>
              </tr>
            </tbody>
          </table>

          <p>
            <b>Set Operations:</b>
          </p>

          <p>
            <b>Union:</b> Union of two sets is a set containing all elements of
            both sets.
          </p>

          <p>
            <b>Syntax:</b> set_a | set_b (or) set_a.union(sequence)
          </p>

          <CodeBlock
            language="python"
            code={`set_a = {4, 2, 8}
set_b = {1, 2}
union = set_a | set_b
print(union) # {1, 2, 4, 8}`}
          />

          <p>
            <b>Intersection:</b> The intersection of two sets is a set
            containing common elements of both sets.
          </p>

          <p>
            <b>Syntax:</b> set_a & set_b (or) set_a.intersection(sequence)
          </p>

          <CodeBlock
            language="python"
            code={`set_a = {4, 2, 8}
set_b = {1, 2}
intersection = set_a & set_b
print(intersection) # {2}`}
          />

          <p>
            <b>Difference:</b> The difference of two sets is a set containing
            all the elements in the first set but not the second.
          </p>

          <p>
            <b>Syntax:</b> set_a - set_b (or) set_a.difference(sequence)
          </p>

          <CodeBlock
            language="python"
            code={`set_a = {4, 2, 8}
set_b = {1, 2}
diff = set_a - set_b
print(diff) # {8, 4}`}
          />

          <p>
            <b>Symmetric Difference:</b> Symmetric difference of two sets is a
            set containing all elements which are not common to both sets.
          </p>

          <p>
            <b>Syntax:</b> set_a ^ set_b (or)
            set_a.symmetric_difference(sequence)
          </p>

          <CodeBlock
            language="python"
            code={`set_a = {4, 2, 8}
set_b = {1, 2}
symmetric_diff = set_a ^ set_b
print(symmetric_diff) # {8, 1, 4}`}
          />

          <p>
            <b>Set Comparisons:</b> Set comparisons are used to validate whether
            one set fully exists within another.
          </p>

          <p>
            <b>issubset():</b> set2.issubset(set1) Returns True if all elements
            of the second set are in the first set. Else, False.
          </p>

          <p>
            <b>issuperset():</b> set1.issuperset(set2) Returns True if all
            elements of second set are in first set. Else, False.
          </p>

          <p>
            <b>isdisjoint():</b> set1.isdisjoint(set2) Returns True when they
            have no common elements. Else, False.
          </p>
        </div>
      </section>

      {/* Tuples */}
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
          Tuples
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
            <b>Tuple:</b> Holds an ordered sequence of items. Tuple is an
            immutable object, whereas a list is a mutable object.
          </p>

          <CodeBlock language="python" code={`tuple_a = (5, "Six", 2, 8.2)`} />

          <p>
            <b>Accessing Tuple Elements:</b> Accessing Tuple elements is also
            similar to string and list accessing and slicing.
          </p>

          <CodeBlock
            language="python"
            code={`tuple_a = (5, "Six", 2, 8.2)
print(tuple_a[1]) # Six`}
          />

          <p>
            <b>Tuple Slicing:</b> The slice operator allows you to specify where
            to begin slicing, where to stop slicing, and what step to take.
            Tuple slicing creates a new tuple from an old one.
          </p>

          <CodeBlock
            language="python"
            code={`tuple = ('a','b','c','d','e','f','g','h','i','j')

print(tuple[0:2])      # ('a', 'b')
print(tuple[-1:-3:-2]) # ('j',)
print(tuple[1:7:2])    # ('b', 'd', 'f')`}
          />

          <p>
            <b>Membership Check:</b> Check if the given data element is part of
            a sequence or not. Membership Operators <b>in</b> and <b>not in</b>.
          </p>

          <CodeBlock
            language="python"
            code={`tuple_a = (1, 2, 3, 4)
is_part = 5 in tuple_a
print(is_part) # False`}
          />

          <CodeBlock
            language="python"
            code={`tuple_a = (1, 2, 3, 4)
is_part = 5 not in tuple_a
print(is_part) # True`}
          />

          <p>
            <b>Tuple Packing:</b> () brackets are optional while creating
            tuples. In Tuple Packing, values separated by commas will be packed
            into a tuple.
          </p>

          <CodeBlock
            language="python"
            code={`a = 1, 2, 3
print(type(a))
print(a)

# Output:
# <class 'tuple'>
# (1, 2, 3)`}
          />

          <p>
            <b>Unpacking:</b> Values of any sequence can be directly assigned to
            variables. Number of variables in the left should match the length
            of the sequence.
          </p>

          <CodeBlock
            language="python"
            code={`tuple_a = ('R', 'e', 'd')
(s_1, s_2, s_3) = tuple_a
print(s_1, s_2, s_3) # R e d`}
          />
        </div>
      </section>

      {/* Dictionaries */}
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
          Dictionaries
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
            <b>Dictionaries:</b> Unordered collection of items. Every dictionary
            item is a Key-value pair.
          </p>

          <p>
            <b>Creating a Dictionary:</b> Created by enclosing items within{" "}
            {"{ }"} (curly) brackets. Each item in the dictionary has a
            key-value pair.
          </p>

          <CodeBlock
            language="python"
            code={`dict_a = {
  "name": "Teja",
  "age": 15
}`}
          />

          <p>
            <b>Immutable Keys:</b> Keys must be of an immutable type and must be
            unique. Values can be of any data type and can repeat.
          </p>

          <p>
            <b>Accessing Items:</b> To access the items in dictionary, we use
            square brackets <b>[ ]</b> along with the key to obtain its value.
          </p>

          <CodeBlock
            language="python"
            code={`dict_a = {
  'name': 'Teja',
  'age': 15
}

print(dict_a['name']) # Teja`}
          />

          <p>
            <b>Accessing Items - Get:</b> The <b>get()</b> method returns{" "}
            <b>None</b> if the key is not found.
          </p>

          <CodeBlock
            language="python"
            code={`dict_a = {
  'name': 'Teja',
  'age': 15
}

print(dict_a.get('name')) # Teja
print(dict_a.get('city')) # None`}
          />

          <p>
            <b>Membership Check:</b> Checks if the given key exists.
          </p>

          <CodeBlock
            language="python"
            code={`dict_a = {
  'name': 'Teja',
  'age': 15
}

result = 'name' in dict_a
print(result) # True`}
          />

          <p>
            <b>Adding a Key-Value Pair:</b>
          </p>

          <CodeBlock
            language="python"
            code={`dict_a = {'name': 'Teja', 'age': 15}

dict_a['city'] = 'Goa'
print(dict_a)
# {'name': 'Teja', 'age': 15, 'city': 'Goa'}`}
          />

          <p>
            <b>Modifying an Existing Item:</b> As dictionaries are mutable, we
            can modify the values of the keys.
          </p>

          <CodeBlock
            language="python"
            code={`dict_a = {
  'name': 'Teja',
  'age': 15
}

dict_a['age'] = 24
print(dict_a)
# {'name': 'Teja', 'age': 24'}`}
          />

          <p>
            <b>Deleting an Existing Item:</b> We can also use the <b>del</b>{" "}
            keyword to remove individual items or the entire dictionary itself.
          </p>

          <CodeBlock
            language="python"
            code={`dict_a = {
  'name': 'Teja',
  'age': 15
}

del dict_a['age']
print(dict_a)
# {'name': 'Teja'}`}
          />
        </div>
      </section>

      {/* Sets Summary */}
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
          Sets
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
            <b>Sets:</b> Unordered collection of items. Every set element is{" "}
            <b>Unique</b> (no duplicates) and <b>Must be immutable</b>.
          </p>

          <p>
            <b>No Duplicate Items:</b> Sets contain unique elements.
          </p>

          <CodeBlock
            language="python"
            code={`set_a = {"a", "b", "c", "a"}
print(set_a)
# {'b', 'a', 'c'}`}
          />

          <p>
            <b>Immutable Items:</b> Set items must be immutable. As List is
            mutable, Set cannot have list as an item.
          </p>

          <CodeBlock
            language="python"
            code={`set_a = {"a", ["c", "a"]}
print(set_a)
# TypeError: unhashable type: 'list'`}
          />
        </div>
      </section>

      {/* Dictionary Views & Methods */}
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
          Dictionary Views & Methods
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
          <h3 style={{ color: "#2c3e50" }}>Dictionary Views</h3>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1rem",
            }}
          >
            <thead>
              <tr>
                <th>View</th>
                <th>Syntax</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>keys</td>
                <td>dict.keys()</td>
                <td>Returns dictionary Keys.</td>
              </tr>
              <tr>
                <td>values</td>
                <td>dict.values()</td>
                <td>Returns dictionary Values.</td>
              </tr>
              <tr>
                <td>items</td>
                <td>dict.items()</td>
                <td>Returns dictionary items (key-value) pairs.</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ color: "#2c3e50", marginTop: "2rem" }}>
            Dictionary Methods
          </h3>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1rem",
            }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Syntax</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>copy()</td>
                <td>dict.copy()</td>
                <td>Returns copy of a dictionary.</td>
              </tr>
              <tr>
                <td>update()</td>
                <td>dict.update(iterable)</td>
                <td>Inserts the specified items to the dictionary.</td>
              </tr>
              <tr>
                <td>clear()</td>
                <td>dict.clear()</td>
                <td>Removes all the elements from a dictionary.</td>
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

export default Python_Summary_CS_3;
