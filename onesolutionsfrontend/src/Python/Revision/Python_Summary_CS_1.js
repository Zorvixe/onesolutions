import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Python_Summary_CS_1 = ({ onSubtopicComplete }) => {
  const [completed, setCompleted] = useState(false);

  const handleContinue = () => {
    setCompleted(true);
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
        Python Summary Cheat Sheet - 1
      </h1>

      {/* Data Types */}
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
          Data Types in Python
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
            In programming languages, every value or data has an associated type
            known as a data type. Some commonly used data types are listed
            below.
          </p>

          <p>
            <b>String:</b> A String is a stream of characters enclosed within
            quotes.
          </p>

          <CodeBlock
            language="python"
            code={`"Hello World!"
'1234'`}
          />

          <p>
            <b>Integer:</b> All the numbers (positive, negative, and zero)
            without any fractional part come under Integers.
          </p>

          <CodeBlock
            language="python"
            code={`... -3, -2, -1, 0, 1, 2, 3 ...`}
          />

          <p>
            <b>Float:</b> Any number with a decimal point.
          </p>

          <CodeBlock
            language="python"
            code={`24.3
345.210
-321.86`}
          />

          <p>
            <b>Boolean:</b> In a general sense, anything that can take one of
            two possible values is considered a Boolean. As per Python syntax,
            <b> True </b> and <b> False </b> are Boolean values.
          </p>

          <CodeBlock
            language="python"
            code={`True
False`}
          />
        </div>
      </section>

      {/* Conditional Statements */}
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
          Conditional Statements
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
            <b>Conditional Statement:</b> Conditional Statement allows you to
            execute a block of code only when a specific condition is True.
          </p>

          <CodeBlock
            language="python"
            code={`if True:
    print("If Block")  
    print("Inside If") 

# Output is:
If Block
Inside If`}
          />

          <p>
            <b>If - Else Statement:</b> When the If - Else conditional statement
            is used, the Else block of code executes if the condition is False.
          </p>

          <CodeBlock
            language="python"
            code={`a = int(input()) # -1
if a > 0:  
    print("Positive")  
else:  
    print("Not Positive")  

# Output is:
Not Positive`}
          />

          <p>
            <b>Nested Conditions:</b> The conditional block inside another
            if/else conditional block is called as a nested conditional block.
          </p>

          <CodeBlock
            language="python"
            code={`if Condition A:
    if Condition B:
        block of code
else:
    block of code

if Condition A:
    block of code
else:
    if Condition B:
        block of code`}
          />

          <p>
            <b>Elif Statement:</b> Use the elif statement to have multiple
            conditional statements between if and else. The elif statement is
            optional.
          </p>

          <CodeBlock
            language="python"
            code={`if Condition A:
    block of code
elif Condition B:
    block of code
else:
    block of code`}
          />

          <p>
            <b>Indentation:</b>
          </p>

          <p>
            1. Space(s) in front of the conditional block is called indentation.
          </p>
          <p>
            2. Indentation(spacing) is used to identify the Conditional Blocks.
          </p>
          <p>3. Standard practice is to use four spaces for indentation.</p>
        </div>
      </section>

      {/* Strings */}

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
          Strings - Working with Strings
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
            <b>String Concatenation:</b> Joining strings together is called
            string concatenation.
          </p>

          <CodeBlock
            language="python"
            code={`a = "Hello" + " " + "World"
print(a) # Hello World`}
          />

          <p>
            <b>String Repetition:</b> <b>*</b> operator is used for repeating
            strings any number of times as required.
          </p>

          <CodeBlock
            language="python"
            code={`a = "$" * 10
print(a) # $$$$$$$$$$`}
          />

          <p>
            <b>Length of String:</b> <b>len()</b> returns the number of
            characters in a given string.
          </p>

          <CodeBlock
            language="python"
            code={`username = input() # Ravi
length = len(username)
print(length) # 4`}
          />

          <p>
            <b>String Indexing:</b> We can access an individual character in a
            string using their positions (which start from 0). These positions
            are also called index.
          </p>

          <CodeBlock
            language="python"
            code={`username = "Ravi"
first_letter = username[0]
print(first_letter) # R`}
          />

          <p>
            <b>String Slicing:</b> Obtaining a part of a string is called string
            slicing. Start from the start_index and stops at the end_index.
            (end_index is not included in the slice).
          </p>

          <CodeBlock
            language="python"
            code={`message = "Hi Ravi"
part = message[3:7]
print(part) # Ravi`}
          />

          <p>
            <b>Slicing to End:</b> If end_index is not specified, slicing stops
            at the end of the string.
          </p>

          <CodeBlock
            language="python"
            code={`message = "Hi Ravi"
part = message[3:]
print(part) # Ravi`}
          />

          <p>
            <b>Slicing from Start:</b> If the start_index is not specified, the
            slicing starts from the index 0.
          </p>

          <CodeBlock
            language="python"
            code={`message = "Hi Ravi"
part = message[:2]
print(part) # Hi`}
          />

          <p>
            <b>Negative Indexing:</b> Use negative indexes to start the slice
            from the end of the string.
          </p>

          <CodeBlock
            language="python"
            code={`b = "Hello, World!"
print(b[-5:-2]) # orl`}
          />

          <p>
            <b>Reversing String:</b> Reverse the given string using the extended
            slice operator.
          </p>

          <CodeBlock
            language="python"
            code={`txt = "Hello World"
txt = txt[::-1]
print(txt) # dlroW olleH`}
          />

          <p>
            <b>Membership check-in strings:</b>
          </p>

          <p>
            <b>in:</b> By using the <b>in</b> operator, one can determine if a
            value is present in a sequence or not.
          </p>

          <CodeBlock
            language="python"
            code={`language = "Python"
result = "P" in language
print(result) # True`}
          />

          <p>
            <b>not in:</b> By using the <b>not in</b> operator, one can
            determine if a value is not present in a sequence or not.
          </p>

          <CodeBlock
            language="python"
            code={`language = "Python"
result = "P" not in language
print(result) # False`}
          />

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "1rem",
            }}
          >
            <thead>
              <tr style={{ background: "#9b59b6", color: "white" }}>
                <th style={{ padding: "1rem" }}>Operation</th>
                <th style={{ padding: "1rem" }}>Code</th>
                <th style={{ padding: "1rem" }}>Output</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Concatenation</td>
                <td>
                  <CodeBlock language="python" code={`"Hello" + " World"`} />
                </td>
                <td>Hello World</td>
              </tr>
              <tr>
                <td>Repetition</td>
                <td>
                  <CodeBlock language="python" code={`"$" * 10`} />
                </td>
                <td>$$$$$$$$$$</td>
              </tr>
              <tr>
                <td>Length</td>
                <td>
                  <CodeBlock language="python" code={`len("Ravi")`} />
                </td>
                <td>4</td>
              </tr>
              <tr>
                <td>Indexing</td>
                <td>
                  <CodeBlock language="python" code={`"Python"[0]`} />
                </td>
                <td>P</td>
              </tr>
              <tr>
                <td>Slicing</td>
                <td>
                  <CodeBlock language="python" code={`"Hi Ravi"[3:7]`} />
                </td>
                <td>Ravi</td>
              </tr>
              <tr>
                <td>From Start</td>
                <td>
                  <CodeBlock language="python" code={`"Hi Ravi"[:2]`} />
                </td>
                <td>Hi</td>
              </tr>
              <tr>
                <td>To End</td>
                <td>
                  <CodeBlock language="python" code={`"Hi Ravi"[3:]`} />
                </td>
                <td>Ravi</td>
              </tr>
              <tr>
                <td>Negative Index</td>
                <td>
                  <CodeBlock
                    language="python"
                    code={`"Hello, World!"[-5:-2]`}
                  />
                </td>
                <td>orl</td>
              </tr>
              <tr>
                <td>Reverse</td>
                <td>
                  <CodeBlock language="python" code={`txt[::-1]`} />
                </td>
                <td>Reversed string</td>
              </tr>
            </tbody>
          </table>
          <div
            style={{
              background: "#d5f4e6",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <strong>Membership:</strong> <code>"P" in "Python"</code> → True |{" "}
            <code>"X" not in "Python"</code> → True
          </div>
        </div>
      </section>

      {/* Calculations */}
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
          Calculations in Python
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
            <b>Addition:</b> Addition is denoted by <b>+</b> sign.
          </p>

          <CodeBlock
            language="python"
            code={`print(2 + 5)  # 7
print(1 + 1.5) # 2.5`}
          />

          <p>
            <b>Subtraction:</b> Subtraction is denoted by <b>-</b> sign.
          </p>

          <CodeBlock language="python" code={`print(5 - 2) # 3`} />

          <p>
            <b>Multiplication:</b> Multiplication is denoted by <b>*</b> sign.
          </p>

          <CodeBlock
            language="python"
            code={`print(2 * 5)  # 10
print(5 * 0.5) # 2.5`}
          />

          <p>
            <b>Division:</b> Division is denoted by <b>/</b> sign.
          </p>

          <CodeBlock language="python" code={`print(80 / 5) # 16.0`} />

          <p>
            <b>Modulus:</b> To find the remainder, we use the Modulus operator{" "}
            <b>%</b>.
          </p>

          <CodeBlock language="python" code={`print(7 % 2) # 1`} />

          <p>
            <b>Exponent:</b> To find a power <b>b</b>, we use Exponent Operator{" "}
            <b>**</b>.
          </p>

          <CodeBlock language="python" code={`print(7 ** 2) # 49`} />

          <p>
            <b>Floor division:</b> To find an integral part of the quotient we
            use Floor Division Operator <b>//</b>.
          </p>

          <CodeBlock language="python" code={`print(13 // 5) # 2`} />
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#e67e22", color: "white" }}>
                <th>Operation</th>
                <th>Operator</th>
                <th>Example</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Addition</td>
                <td>+</td>
                <td>2 + 5</td>
                <td>7</td>
              </tr>
              <tr>
                <td>Subtraction</td>
                <td>-</td>
                <td>5 - 2</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Multiplication</td>
                <td>*</td>
                <td>2 * 5</td>
                <td>10</td>
              </tr>
              <tr>
                <td>Division</td>
                <td>/</td>
                <td>80 / 5</td>
                <td>16.0</td>
              </tr>
              <tr>
                <td>Modulus (Remainder)</td>
                <td>%</td>
                <td>7 % 2</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Exponent</td>
                <td>**</td>
                <td>7 ** 2</td>
                <td>49</td>
              </tr>
              <tr>
                <td>Floor Division</td>
                <td>//</td>
                <td>13 // 5</td>
                <td>2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Input Output */}
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
          Input and Output Basics
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
            <b>Take Input From User:</b> <b>input()</b> allows flexibility to
            take input from the user. Reads a line of input as a string.
          </p>

          <CodeBlock language="python" code={`username = input() # Ajay`} />

          <p>
            <b>Printing the Output:</b> <b>print()</b> function prints the
            message to the screen or any other standard output device.
          </p>

          <CodeBlock language="python" code={`print(username) # Ajay`} />

          <p>
            <b>Comments:</b> Comment starts with a hash <b>#</b>. It can be
            written in its own line next to a statement of code.
          </p>

          <CodeBlock language="python" code={`# This is a comment`} />
        </div>
      </section>

      {/* String Methods */}
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
          String Methods
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
            border="1"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              marginBottom: "1.5rem",
              background: "white",
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
                <td>isdigit()</td>
                <td>str.isdigit()</td>
                <td>
                  Gives True if all the characters are digits. Otherwise, False.
                </td>
              </tr>
              <tr>
                <td>strip()</td>
                <td>str.strip()</td>
                <td>
                  Removes all the leading and trailing spaces from a string.
                </td>
              </tr>
              <tr>
                <td>strip() with separator</td>
                <td>str.strip(separator)</td>
                <td>
                  We can also specify separator(string) that need to be removed.
                </td>
              </tr>
              <tr>
                <td>replace()</td>
                <td>str.replace(old, new)</td>
                <td>
                  Gives a new string after replacing all the occurrences of the
                  old substring with the new substring.
                </td>
              </tr>
              <tr>
                <td>startswith()</td>
                <td>str_var.startswith(value)</td>
                <td>
                  Gives True if the string starts with the specified value.
                  Otherwise, False.
                </td>
              </tr>
              <tr>
                <td>endswith()</td>
                <td>str.endswith(value)</td>
                <td>
                  Gives True if the string ends with the specified value.
                  Otherwise, False.
                </td>
              </tr>
              <tr>
                <td>upper()</td>
                <td>str.upper()</td>
                <td>
                  Gives a new string by converting each character of the given
                  string to uppercase.
                </td>
              </tr>
              <tr>
                <td>lower()</td>
                <td>str.lower()</td>
                <td>
                  Gives a new string by converting each character of the given
                  string to lowercase.
                </td>
              </tr>
              <tr>
                <td>split()</td>
                <td>str.split()</td>
                <td>The split() method splits a string into a list.</td>
              </tr>
              <tr>
                <td>split() with separator</td>
                <td>str.split(separator, maxsplit)</td>
                <td>
                  Specifies the separator to use when splitting the string. By
                  default any whitespace is a separator.
                </td>
              </tr>
              <tr>
                <td>join()</td>
                <td>str.join(iterable)</td>
                <td>
                  The join() method takes all items in an iterable and joins
                  them into one string.
                </td>
              </tr>
            </tbody>
          </table>

          <p>
            <b>String Formatting:</b> String Formatting simplifies the
            concatenation. It increases the readability of code and type
            conversion is not required.
          </p>

          <p>
            <b>Add Placeholders:</b> Add placeholders <b>{}</b> where the string
            needs to be formatted.
          </p>

          <CodeBlock
            language="python"
            code={`name = "Raju"
age = 10
msg = "Hi {}. You are {} years old."
print(msg.format(name, age)) # Hi Raju. You are 10 years old.`}
          />

          <p>
            <b>Numbering Placeholders:</b> Numbering placeholders, will fill
            values according to the position of arguments.
          </p>

          <CodeBlock
            language="python"
            code={`name = input() # Raju
age = int(input()) # 10
msg = "Hi {1}. You are {0} years old."
print(msg.format(name, age)) # Hi 10. You are Raju years old.`}
          />

          <p>
            <b>Naming Placeholder:</b> Naming placeholders will fill values
            according to the keyword arguments.
          </p>

          <CodeBlock
            language="python"
            code={`name = input() # Raju
age = int(input()) # 10
msg = "Hi {name}. You are {age} years old."
print(msg.format(age=age, name=name)) # Hi Raju. You are 10 years old.`}
          />
        </div>
      </section>

      {/* Relational & Logical Operators */}
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
          Relational & Logical Operators
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
            <b>Relational Operators:</b> Relational Operators are used to
            comparing values. Gives True or False as the result of a comparison.
          </p>

          <table
            border="1"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              marginBottom: "1.5rem",
              background: "white",
            }}
          >
            <thead>
              <tr>
                <th>Operator</th>
                <th>Name</th>
                <th>Example</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>&gt;</td>
                <td>Is greater than</td>
                <td>print(2 &gt; 1)</td>
                <td>True</td>
              </tr>
              <tr>
                <td>&lt;</td>
                <td>Is less than</td>
                <td>print(5 &lt; 10)</td>
                <td>True</td>
              </tr>
              <tr>
                <td>==</td>
                <td>Is equal to</td>
                <td>print(3 == 4)</td>
                <td>False</td>
              </tr>
              <tr>
                <td>&lt;=</td>
                <td>Is less than or equal to</td>
                <td>print(2 &lt;= 1)</td>
                <td>False</td>
              </tr>
              <tr>
                <td>&gt;=</td>
                <td>Is greater than or equal to</td>
                <td>print(2 &gt;= 1)</td>
                <td>True</td>
              </tr>
              <tr>
                <td>!=</td>
                <td>Is not equal to</td>
                <td>print(2 != 1)</td>
                <td>True</td>
              </tr>
            </tbody>
          </table>

          <p>
            <b>Logical Operators:</b> Logical operators are used to performing
            logical operations on Boolean values. Gives True or False as a
            result.
          </p>

          <table
            border="1"
            style={{
              borderCollapse: "collapse",
              width: "80%",
              marginBottom: "1.5rem",
              background: "white",
            }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>and</td>
                <td>print((5 &lt; 10) and (1 &lt; 2))</td>
                <td>True</td>
              </tr>
              <tr>
                <td>or</td>
                <td>print((5 &lt; 10) or (2 &lt; 2))</td>
                <td>True</td>
              </tr>
              <tr>
                <td>not</td>
                <td>print(not (2 &lt; 3))</td>
                <td>False</td>
              </tr>
            </tbody>
          </table>

          <p>
            <b>Logical Operators Truth Table:</b>
          </p>

          <table
            border="1"
            style={{
              borderCollapse: "collapse",
              width: "60%",
              marginBottom: "1.5rem",
              background: "white",
            }}
          >
            <thead>
              <tr>
                <th>A</th>
                <th>B</th>
                <th>A and B</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>True</td>
                <td>True</td>
                <td>True</td>
              </tr>
              <tr>
                <td>True</td>
                <td>False</td>
                <td>False</td>
              </tr>
              <tr>
                <td>False</td>
                <td>False</td>
                <td>False</td>
              </tr>
              <tr>
                <td>False</td>
                <td>True</td>
                <td>False</td>
              </tr>
            </tbody>
          </table>

          <table
            border="1"
            style={{
              borderCollapse: "collapse",
              width: "60%",
              marginBottom: "1.5rem",
              background: "white",
            }}
          >
            <thead>
              <tr>
                <th>A</th>
                <th>B</th>
                <th>A or B</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>True</td>
                <td>True</td>
                <td>True</td>
              </tr>
              <tr>
                <td>True</td>
                <td>False</td>
                <td>True</td>
              </tr>
              <tr>
                <td>False</td>
                <td>False</td>
                <td>False</td>
              </tr>
              <tr>
                <td>False</td>
                <td>True</td>
                <td>True</td>
              </tr>
            </tbody>
          </table>

          <table
            border="1"
            style={{
              borderCollapse: "collapse",
              width: "40%",
              background: "white",
            }}
          >
            <thead>
              <tr>
                <th>A</th>
                <th>Not A</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>True</td>
                <td>False</td>
              </tr>
              <tr>
                <td>False</td>
                <td>True</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Continue Button */}
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <button
          onClick={handleContinue}
          disabled={completed}
          style={{
            padding: "1.2rem 3.5rem",
            fontSize: "1.4rem",
            backgroundColor: completed ? "#7f8c8d" : "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "50px",
            cursor: completed ? "not-allowed" : "pointer",
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
            transition: "all 0.4s",
          }}
        >
          {completed ? "Completed" : "Mark as Complete & Continue"}
        </button>
      </div>
    </div>
  );
};

export default Python_Summary_CS_1;
