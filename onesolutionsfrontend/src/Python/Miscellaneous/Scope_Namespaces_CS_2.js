import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Scope_Namespaces_CS_2 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Scope & Namespaces</h1>

      {/* Objects */}
      <section>
        <h2>Object</h2>
        <p>
          In general, anything that can be assigned to a variable in Python is referred to as an <b>object</b>.
        </p>
        <p>Strings, Integers, Floats, Lists, Functions, Modules, etc. are all objects.</p>
      </section>

      {/* Identity of an Object */}
      <section>
        <h2>Identity of an Object</h2>
        <p>
          Every object created in Python is given a unique identifier (id). This unique id can be different each time you run the program.
        </p>
        <p>
          The id relates to the location where the object is stored in memory.
        </p>
      </section>

      {/* Name of an Object */}
      <section>
        <h2>Name of an Object</h2>
        <p>
          Name or Identifier is simply a name given to an object.
        </p>
      </section>

      {/* Namespaces */}
      <section>
        <h2>Namespaces</h2>
        <p>
          A <b>namespace</b> is a collection of currently defined names along with the objects they reference. Namespaces ensure that names are unique and don’t conflict.
        </p>
        <p>
          Namespaces allow the same name to refer to different things in different contexts.
        </p>
      </section>

      {/* Types of Namespaces */}
      <section>
        <h2>Types of Namespaces</h2>
        <p>Different namespaces created during execution:</p>
        <ul>
          <li><b>Built-in:</b> Exists while program is running, provides built-in functions like <b>id()</b> and <b>print()</b>.</li>
          <li><b>Global:</b> Names defined directly in a module (outside functions), exists until program ends.</li>
          <li><b>Local:</b> Created when a function is called, lasts until function returns.</li>
        </ul>
      </section>

      {/* Scope */}
      <section>
        <h2>Scope of a Name</h2>
        <p>
          The <b>scope</b> of a name is the region of a program where that name has meaning. Python searches from inside out: Local → Global → Built-in.
        </p>
      </section>

      {/* Global Variables */}
      <section>
        <h2>Global Variables</h2>
        <p>
          A variable defined outside all functions is a <b>global variable</b>. Its name is part of the Global Namespace.
        </p>
        <CodeBlock language="python" code={`x = 10\nprint(x)`} />
      </section>

      {/* Local Variables */}
      <section>
        <h2>Local Variables</h2>
        <p>
          A variable defined inside a function is a <b>local variable</b>. It is part of the Local Namespace, created when function is called and destroyed when it returns.
        </p>
        <CodeBlock language="python" code={`def func():\n  x = 5\n  print(x)\nfunc()`} />
      </section>

      {/* Modifying Global Variables */}
      <section>
        <h2>Modifying Global Variables</h2>
        <p>
          Use the <b>global</b> keyword to modify global variables inside a function.
        </p>
        <CodeBlock language="python" code={`x = 10\n\ndef modify():\n  global x\n  x += 5\nmodify()\nprint(x)`} />
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

export default Scope_Namespaces_CS_2;
