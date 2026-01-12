import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const String_Methods_CS = ({ subtopicId, goalName, courseName, subtopic }) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  // Check if subtopic is already completed
  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);


  const handleContinue = async () => {
    if (isLoading || isSubtopicCompleted) return;

    try {
      setIsLoading(true);
      const result = await markSubtopicComplete(
        subtopicId,
        goalName,
        courseName
      );

      if (result.success) {
        await loadProgressSummary();
        setIsSubtopicCompleted(true);
        console.log("✅ Cheat sheet marked as completed");
      } else {
        console.error(
          "❌ Failed to mark cheat sheet complete:",
          result.message
        );
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      console.error("❌ Failed to mark cheat sheet complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="intro-container">
      <h1>String Methods | Cheat Sheet</h1>

      {/* Extended Slicing */}
      <section>
        <h2>Extended Slicing</h2>
        <p>Extended slicing is an extension of basic slicing in Python.</p>{" "}
        <p>
          {" "}
          Along with <code>start_index</code> and <code>end_index</code>, we
          provide <code>step</code>, which determines the increment between each
          index for slicing.
        </p>
        <p>
          <b>Syntax:</b> <code>variable[start_index:end_index:step]</code>
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`secret_message = "-R-a-v-i-"
print(secret_message[1:8:2])`}
        />
        <img
          src="/assets/img/extended_slicing.png"
          alt="Error Diagram"
          style={{ width: "70%", height: "400px" }}
        />
        <h3>Output</h3>
        <OutputBlock output={["Ravi"]} />
        <CodeBlock
          language="python"
          code={`text = "PythonProgramming"\nprint(text[0:6:2])\nprint(text[::-1])`}
        />
        <h3>Output</h3>
        <OutputBlock output={["Pto", "gnimmargorPnohtyP"]} />
      </section>

      {/* String Methods Intro */}
      <section>
        <h2>String Methods</h2>
        <p>
          Python has a set of built-in string methods that simplify common text
          operations:
        </p>
        <ul>
          <li>
            <code>isdigit()</code>
          </li>
          <li>
            <code>strip()</code>
          </li>
          <li>
            <code>lower()</code>
          </li>
          <li>
            <code>upper()</code>
          </li>
          <li>
            <code>startswith()</code>
          </li>
          <li>
            <code>endswith()</code>
          </li>
          <li>
            <code>replace()</code> and more...
          </li>
        </ul>
      </section>

      {/* isdigit() */}
      <section>
        <h2>isdigit()</h2>
        <p>
          <b>Syntax: </b>
          <code>str_var.isdigit()</code>
        </p>
        <p>
          Returns <code>True</code> if all characters in the string are digits,
          otherwise <code>False</code>.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`a = "12345"\nprint(a.isdigit())\n\nb = "12a45"\nprint(b.isdigit())`}
        />
        <h3>Output</h3>
        <OutputBlock output={["True", "False"]} />
      </section>

      {/* strip() */}
      <section>
        <h2>strip()</h2>
        <p>
          <b>Syntax: </b>
          <code>str_var.strip()</code>
        </p>
        <p>Removes all leading and trailing spaces from a string.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`text = "   hello   "\nprint(text.strip())`}
        />
        <h3>Output</h3>
        <OutputBlock output={"hello"} />
      </section>

      {/* strip(chars) */}
      <section>
        <h2>strip - Specific characters</h2>
        <p>
          <b>Syntax: </b>
          <code>str_var.strip(chars)</code>
        </p>
        <p>We can also specify specific characters to remove.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`text = "###Hello###"\nprint(text.strip('#'))`}
        />
        <h3>Output</h3>
        <OutputBlock output={"Hello"} />
      </section>

      {/* strip multiple */}
      <section>
        <h2>strip() - Multiple Characters</h2>

        <p>
          Removes all spaces, commas, and full stops that lead or trail the
          string.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`text = "   ...Hello World,,,   "\nprint(text.strip(' ,.'))`}
        />
        <h3>Output</h3>
        <OutputBlock output={"Hello World"} />
      </section>

      {/* replace() */}
      <section>
        <h2>replace()</h2>
        <p>
          <b>Syntax: </b>
          <code>str_var.replace(old,new)</code>
        </p>
        <p>
          Gives a new string after replacing all the occurrences of the{" "}
          <b>old </b>
          substring with the <b>new</b> substring.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`text = "I like cats"\nprint(text.replace("cats", "dogs"))`}
        />
        <h3>Output</h3>
        <OutputBlock output={"I like dogs"} />
      </section>

      {/* startswith() */}
      <section>
        <h2>startswith()</h2>
        <p>
          <b>Syntax: </b>
          <code>str_var.startswith(value)</code>
        </p>
        <p>
          Returns <code>True</code> if the string starts with the specified
          value, otherwise <code>False</code>.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`text = "Python"\nprint(text.startswith("Py"))`}
        />
        <h3>Output</h3>
        <OutputBlock output={"True"} />
      </section>

      {/* endswith() */}
      <section>
        <h2>endswith()</h2>
        <p>
          <b>Syntax: </b>
          <code>str_var.endswith(value)</code>
        </p>
        <p>
          Returns <code>True</code> if the string ends with the specified value,
          otherwise <code>False</code>.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`text = "Python"\nprint(text.endswith("on"))`}
        />
        <h3>Output</h3>
        <OutputBlock output={"True"} />
      </section>

      {/* upper() */}
      <section>
        <h2>upper()</h2>
        <p>
          <b>Syntax: </b>
          <code>str_var.upper()</code>
        </p>
        <p>
          Gives a new string by converting each character of the given string to
          uppercase.{" "}
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`text = "hello"\nprint(text.upper())`}
        />
        <h3>Output</h3>
        <OutputBlock output={"HELLO"} />
      </section>

      {/* lower() */}
      <section>
        <h2>lower()</h2>
        <p>
          <b>Syntax: </b>
          <code>str_var.lower()</code>
        </p>
        <p>
          Gives a new string by converting each character of the given string to
          lowercase.{" "}
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`text = "PYTHON"\nprint(text.lower())`}
        />
        <h3>Output</h3>
        <OutputBlock output={"python"} />
      </section>

      {/* Note */}
      <section>
        <h2>Note</h2>
        <p>
          The <code>upper()</code> and <code>lower()</code> methods affect only
          alphabetic characters. They have no effect on digits or special
          characters.
        </p>
        <CodeBlock
          language="python"
          code={`text = "123@Hello!"\nprint(text.upper())\nprint(text.lower())`}
        />
        <OutputBlock output={["123@HELLO!", "123@hello!"]} />
      </section>

      {/* Continue Button */}
      <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted || isLoading}
        >
          {isLoading
            ? "Marking..."
            : isSubtopicCompleted
            ? "✓ Completed"
            : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default String_Methods_CS;
