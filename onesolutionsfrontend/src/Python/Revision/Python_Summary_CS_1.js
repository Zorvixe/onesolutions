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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              background: "#e8f4fc",
              padding: "1.5rem",
              borderRadius: "10px",
            }}
          >
            <h3 style={{ color: "#1a5276" }}>String</h3>
            <CodeBlock
              language="python"
              code={`"Hello World!"\n'CCBP'\n"""Multi-line"""`}
            />
            <p>Stream of characters in quotes</p>
          </div>
          <div
            style={{
              background: "#e8f4fc",
              padding: "1.5rem",
              borderRadius: "10px",
            }}
          >
            <h3 style={{ color: "#1a5276" }}>Integer</h3>
            <CodeBlock language="python" code={`-5, 0, 42, 1000`} />
            <p>Whole numbers (no decimal)</p>
          </div>
          <div
            style={{
              background: "#e8f4fc",
              padding: "1.5rem",
              borderRadius: "10px",
            }}
          >
            <h3 style={{ color: "#1a5276" }}>Float</h3>
            <CodeBlock language="python" code={`3.14, -0.001, 2.5e3`} />
            <p>Numbers with decimal point</p>
          </div>
          <div
            style={{
              background: "#e8f4fc",
              padding: "1.5rem",
              borderRadius: "10px",
            }}
          >
            <h3 style={{ color: "#1a5276" }}>Boolean</h3>
            <CodeBlock language="python" code={`True\nFalse`} />
            <p>Only two values: True or False</p>
          </div>
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
            borderBottom: "4px solid #27ae60",
            paddingBottom: "0.5rem",
          }}
        >
          Conditional Statements
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
          }}
        >
          <div>
            <h3>if Statement</h3>
            <CodeBlock
              language="python"
              code={`if True:\n    print("If Block")\n    print("Inside If")\n# Output:\n# If Block\n# Inside If`}
            />
          </div>
          <div>
            <h3>if-else</h3>
            <CodeBlock
              language="python"
              code={`a = -1\nif a > 0:\n    print("Positive")\nelse:\n    print("Not Positive")\n# Output: Not Positive`}
            />
          </div>
          <div>
            <h3>elif</h3>
            <CodeBlock
              language="python"
              code={`score = 85\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelse:\n    print("C")`}
            />
          </div>
          <div>
            <h3>Nested if</h3>
            <CodeBlock
              language="python"
              code={`age = 20\ncitizen = True\nif age >= 18:\n    if citizen:\n        print("Can vote")\n    else:\n        print("Not citizen")\nelse:\n    print("Too young")`}
            />
          </div>
        </div>
        <div
          style={{
            background: "#fff3cd",
            padding: "1rem",
            borderRadius: "8px",
            marginTop: "1rem",
          }}
        >
          <strong>Indentation:</strong> Use <strong>4 spaces</strong> — defines
          code blocks
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
            borderBottom: "4px solid #9b59b6",
            paddingBottom: "0.5rem",
          }}
        >
          Working with Strings
        </h2>
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
                <CodeBlock language="python" code={`"Hello, World!"[-5:-2]`} />
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
            borderBottom: "4px solid #e67e22",
            paddingBottom: "0.5rem",
          }}
        >
          Calculations in Python
        </h2>
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
            borderBottom: "4px solid #c0392b",
            paddingBottom: "0.5rem",
          }}
        >
          Input & Output
        </h2>
        <CodeBlock
          language="python"
          code={`# Input (always string)\nname = input()        # "Ravi"\nage = int(input())    # "25" → 25\n\n# Output\nprint(name)           # Ravi\nprint("Hello", name)\n\n# Comment\n# This is a comment\nx = 10  # inline comment`}
        />
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
            borderBottom: "4px solid #8e44ad",
            paddingBottom: "0.5rem",
          }}
        >
          String Methods
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#8e44ad", color: "white" }}>
              <th>Method</th>
              <th>Usage</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>.isdigit()</code>
              </td>
              <td>Check digits</td>
              <td>
                <code>"123".isdigit() → True</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>.strip()</code>
              </td>
              <td>Remove spaces</td>
              <td>
                <code>" hi ".strip() → "hi"</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>.replace()</code>
              </td>
              <td>Replace text</td>
              <td>
                <code>"Hi Ravi".replace("Ravi", "Raj")</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>.startswith()</code>
              </td>
              <td>Check start</td>
              <td>
                <code>"Python".startswith("Py") → True</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>.upper() / .lower()</code>
              </td>
              <td>Case change</td>
              <td>
                <code>"hello".upper() → "HELLO"</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>.split()</code>
              </td>
              <td>Split to list</td>
              <td>
                <code>"a,b,c".split(",") → ['a','b','c']</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>.join()</code>
              </td>
              <td>Join list</td>
              <td>
                <code>",".join(['a','b']) → "a,b"</code>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* String Formatting */}
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
            borderBottom: "4px solid #16a085",
            paddingBottom: "0.5rem",
          }}
        >
          String Formatting
        </h2>
        <CodeBlock
          language="python"
          code={`name = "Raju"\nage = 10\n\n# Positional\n"Hi {}. You are {} old.".format(name, age)\n\n# Indexed\n"Hi {1}. Age: {0}".format(name, age)\n\n# Named (BEST)\n"Hi {name}. You are {age} years old.".format(name=name, age=age)`}
        />
      </section>

      {/* Operators */}
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
            borderBottom: "4px solid #f39c12",
            paddingBottom: "0.5rem",
          }}
        >
          Relational & Logical Operators
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
          }}
        >
          <div>
            <h3>Relational</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f39c12", color: "white" }}>
                  <th>Op</th>
                  <th>Name</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>&gt;</td>
                  <td>Greater</td>
                  <td>5 &gt; 3 → True</td>
                </tr>
                <tr>
                  <td>&lt;</td>
                  <td>Less</td>
                  <td>2 &lt; 10 → True</td>
                </tr>
                <tr>
                  <td>==</td>
                  <td>Equal</td>
                  <td>5 == 5 → True</td>
                </tr>
                <tr>
                  <td>!=</td>
                  <td>Not equal</td>
                  <td>5 != 3 → True</td>
                </tr>
                <tr>
                  <td>&gt;=</td>
                  <td>Greater or equal</td>
                  <td>5 &gt;= 5 → True</td>
                </tr>
                <tr>
                  <td>&lt;=</td>
                  <td>Less or equal</td>
                  <td>3 &lt;= 5 → True</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3>Logical</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f39c12", color: "white" }}>
                  <th>Op</th>
                  <th>Example</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>and</td>
                  <td>True and False</td>
                  <td>False</td>
                </tr>
                <tr>
                  <td>or</td>
                  <td>True or False</td>
                  <td>True</td>
                </tr>
                <tr>
                  <td>not</td>
                  <td>not True</td>
                  <td>False</td>
                </tr>
              </tbody>
            </table>
          </div>
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
