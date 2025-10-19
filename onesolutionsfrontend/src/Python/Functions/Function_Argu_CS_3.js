import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const FunctionArgu_CS_3 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Function Arguments | Cheat Sheet</h1>

      {/* Function Arguments */}
      <section>
        <h2>Function Arguments</h2>
        <p>
          A function can have more than one argument.
        </p>
      </section>

      {/* Keyword Arguments */}
      <section>
        <h2>Keyword Arguments</h2>
        <p>
          Passing values by their names.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def greet(name, greeting):\n    print(f"{greeting}, {name}!")\ngreet(greeting="Hello", name="Alice")`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={["Hello, Alice!"]} />
      </section>

      {/* Possible Mistakes - Keyword Arguments */}
      <section>
        <h2>Possible Mistakes - Keyword Arguments</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def greet(name, greeting):\n    print(f"{greeting}, {name}!")\ngreet(name="Bob", greeting="Hi", extra="Error")`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={["TypeError: greet() got an unexpected keyword argument 'extra'"]} />
      </section>

      {/* Positional Arguments */}
      <section>
        <h2>Positional Arguments</h2>
        <p>
          Values can be passed without using argument names.
        </p>
        <p>
          These values get assigned according to their position.
        </p>
        <p>
          Order of the arguments matters here.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def add(a, b):\n    print(a + b)\nadd(5, 3)`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={8} />
      </section>

      {/* Possible Mistakes - Positional Arguments */}
      <section>
        <h2>Possible Mistakes - Positional Arguments</h2>
        <h3>Mistake - 1</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def add(a, b):\n    print(a + b)\nadd(5)`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={["TypeError: add() missing 1 required positional argument: 'b'"]} />
        <h3>Mistake - 2</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def greet(name, age):\n    print(f"{name} is {age} years old")\ngreet(25, "Bob")`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={["25 is Bob years old"]} />
      </section>

      {/* Default Values */}
      <section>
        <h2>Default Values</h2>
        <h3>Example - 1</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def greet(name, greeting="Hello"):\n    print(f"{greeting}, {name}!")\ngreet("Alice")`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={["Hello, Alice!"]} />
        <h3>Example - 2</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def add(a, b=10):\n    print(a + b)\nadd(5)`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={15} />
        <h3>Example - 3</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def greet(name, greeting="Hello"):\n    print(f"{greeting}, {name}!")\ngreet("Bob", "Hi")`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={["Hi, Bob!"]} />
        <h3>Example - 4</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def power(base, exp=2):\n    print(base ** exp)\npower(3)`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={9} />
        <h3>Example - 5</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def power(base, exp=2):\n    print(base ** exp)\npower(2, 3)`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={8} />
      </section>

      {/* Non-default Arguments Cannot Follow Default Arguments */}
      <section>
        <h2>Non-default arguments cannot follow default arguments</h2>
        <h3>Example - 6</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def my_function(a=10, b):\n    print(a + b)`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={["SyntaxError: non-default argument follows default argument"]} />
      </section>

      {/* Passing Immutable Objects */}
      <section>
        <h2>Passing Immutable Objects</h2>
        <p>
          Even though variable names are same, they are referring to two different objects.
        </p>
        <p>
          Changing the value of the variable inside the function will not affect the
          variable outside.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def modify(x):\n    x = 20\n    print(f"Inside: {x}")\nnum = 10\nmodify(num)\nprint(f"Outside: {num}")`}
        />
        <h3>Input</h3>
        <OutputBlock output={[]} />
        <h3>Output</h3>
        <OutputBlock output={["Inside: 20", "Outside: 10"]} />
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

export default FunctionArgu_CS_3;