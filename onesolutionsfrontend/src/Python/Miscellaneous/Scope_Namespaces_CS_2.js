import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Scope_Namespaces_CS_2 = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});

  // Check if subtopic is already completed
  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleAnswer = (question, option) => {
    setMcqAnswers((prev) => ({ ...prev, [question]: option }));
  };

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
      <h1>Scope & Namespaces | Cheat Sheet</h1>

      {/* Objects */}
      <section>
        <h2>Object</h2>
        <p>
          In general, anything that can be assigned to a variable in Python is
          referred to as an <b>object</b>.
        </p>
        <p>
          Strings, Integers, Floats, Lists, Functions, Modules, etc. are all
          objects.
        </p>
        <img
          src="/assets/img/object.png"
          alt="software"
          style={{ width: "75%", height: "450px" }}
        />
      </section>

      {/* Identity of an Object */}
      <section>
        <h2>Identity of an Object</h2>
        <p>
          Every object created in Python is given a{" "}
          <b>unique identifier (id)</b>. This unique id can be different each
          time you run the program.
        </p>
        <p>
          The id relates to the location where the object is stored in memory.
        </p>
        <img
          src="/assets/img/identify_obj.png"
          alt="software"
          style={{ width: "75%", height: "450px" }}
        />
        <p>
          Every object that you use in a Python Program will be stored in
          Computer Memory
        </p>
        <p>
          The unique id will be related to the location where the object is
          stored in the <b>Computer Memory</b>.
        </p>
      </section>

      {/* Name of an Object */}
      <section>
        <h2>Name of an Object</h2>
        <p>
          <b>Name</b> or <b>Identifier</b> is simply a name given to an object.
        </p>
        <img
          src="/assets/img/name_object.png"
          alt="software"
          style={{ width: "100%", height: "450px" }}
        />
      </section>

      {/* Namespaces */}
      <section>
        <h2>Namespaces</h2>
        <p>
          A <b>namespace</b>is a collection of currently defined names along
          with information about the object that the name references.
        </p>
        <p>
          It ensures that names are <b>unique</b> and won’t lead to any
          conflict.
        </p>
        <img
          src="/assets/img/name_object_1.png"
          alt="software"
          style={{ width: "80%", height: "400px" }}
        />
        <p>
          Namespaces allow us to have the same name referring different things
          in <b>different namespaces</b>.
        </p>
        <img
          src="/assets/img/name_object_2.png"
          alt="software"
          style={{ width: "80%", height: "400px" }}
        />
        <b>code:</b>
        <CodeBlock
          language="python"
          code={`def greet_1():
    a = "Hello"
    print(a)
    print(id(a))

def greet_2():
    a = "Hey"
    print(a)
    print(id(a))

print("Namespace - 1")
greet_1()
print("Namespace - 2")
greet_2()`}
        />
        <OutputBlock
          output={[
            "[1, 4, 9, 16]",
            "Namespace - 1",
            "Hello",
            "140639382368176",
            "Namespace - 2",
            "Hey",
            "14063938257060",
          ]}
        />
      </section>

      {/* Types of Namespaces */}
      <section>
        <h2>Types of Namespaces</h2>

        <p>
          As Python executes a program, it creates namespaces as necessary and
          forgets them when they are no longer needed.
        </p>

        <p>Different namespaces are:</p>
        <ul>
          <li>Built-in</li>
          <li>Global</li>
          <li>Local</li>
        </ul>

        <h3>Built-in Namespace</h3>
        <p>
          Created when we start executing a Python program and exists as long as
          the program is running.
        </p>
        <p>
          This is the reason that built-in functions like <code>id()</code>,
          <code>print()</code> etc. are always available to us from any part of
          the program.
        </p>

        <h3>Global Namespace</h3>
        <p>
          This namespace includes all names defined directly in a module
          (outside of all functions).
        </p>
        <p>
          It is created when the module is loaded, and it lasts until the
          program ends.
        </p>
        <img
          src="/assets/img/global_img.png"
          alt="software"
          style={{ width: "80%", height: "450px" }}
        />

        <h3>Local Namespace</h3>
        <p>Modules can have various functions and classes.</p>
        <p>
          A new local namespace is created when a function is called, which
          lasts until the function returns.
        </p>
        <img
          src="/assets/img/Local_img.png"
          alt="software"
          style={{ width: "80%", height: "450px" }}
        />

        <h3>Scope of a Name</h3>
        <p>
          The scope of a name is the region of a program in which that name has
          meaning.
        </p>
        <p>
          Python searches for a name from the inside out, looking in the local,
          global, and finally the built-in namespaces.
        </p>
        <img
          src="/assets/img/scope_img.png"
          alt="software"
          style={{ width: "70%", height: "450px" }}
        />

        <h3>Global Variables</h3>
        <p>
          In Python, a variable defined outside of all functions is known as a
          global variable.
        </p>
        <p>This variable name will be part of Global Namespace.</p>

        <h4>Example 1</h4>
        <b>Code</b>
        <CodeBlock
          language="python"
          code={`x = "Global Variable"
print(x)

def foo():
    print(x)

foo()`}
        />

        <OutputBlock output={["Global Variable", "Global Variable"]} />

        <h4>Example 2</h4>
        <b>Code</b>
        <CodeBlock
          language="python"
          code={`def foo():
    print(x)

x = "Global Variable"
foo()`}
        />

        <OutputBlock output={["Global Variable"]} />

        <h3>Local Variables</h3>
        <p>
          In Python, a variable defined inside a function is a local variable.
        </p>
        <p>
          This variable name will be part of the Local Namespace which will be
          created when the function is called and lasts until the function
          returns.
        </p>
        <img
          src="/assets/img/local_var.png"
          alt="software"
          style={{ width: "70%", height: "450px" }}
        />

        <b>Code</b>
        <CodeBlock
          language="python"
          code={`def foo():
    x = "Local Variable"
    print(x)

foo()
print(x)`}
        />

        <OutputBlock
          output={["Local Variable", "NameError: name 'x' is not defined"]}
        />

        <p>As, x is not declared before assignment, python throws an error.</p>

        <h3>Local Import</h3>

        <b>Code</b>
        <CodeBlock
          language="python"
          code={`def foo():
    import math
    print(math.pi)

foo()
print(math.pi)`}
        />

        <OutputBlock
          output={[
            "3.141592653589793",
            "NameError: name 'math' is not defined",
          ]}
        />

        <h3>Local Variables & Global Variables</h3>

        <b>Code</b>
        <CodeBlock
          language="python"
          code={`x = "Global Variable"

def foo():
    x = "Local Variable"
    print(x)

print(x)
foo()
print(x)`}
        />

        <OutputBlock
          output={["Global Variable", "Local Variable", "Global Variable"]}
        />

        <h3>Modifying Global Variables</h3>
        <p>
          <code>global</code> keyword is used to define a name to refer to the
          value in Global Namespace.
        </p>

        <b>Code</b>
        <CodeBlock
          language="python"
          code={`x = "Global Variable"

def foo():
    global x
    x = "Global Change"
    print(x)

print(x)
foo()
print(x)`}
        />

        <OutputBlock
          output={["Global Variable", "Global Change", "Global Change"]}
        />
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

export default Scope_Namespaces_CS_2;
