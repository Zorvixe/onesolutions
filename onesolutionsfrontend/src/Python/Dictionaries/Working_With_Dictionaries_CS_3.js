import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const WorkingWithDictionaries = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Working with Dictionaries | Cheat Sheet</h1>

      {/* Dictionary Methods */}
      <section>
        <h2>Dictionary Methods</h2>
        <p>
          Python provides dictionary methods that allow us to work with dictionaries.
        </p>
        <p>
          <code>copy()</code>, <code>get()</code>, <code>update()</code>,
          <code>fromkeys()</code> and more..
        </p>
        <p>Let’s learn a few among them</p>
      </section>

      {/* Referring Same Dictionary Object */}
      <section>
        <h2>Referring Same Dictionary Object</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`original_dict = {"name": "Teja"}\nnew_dict = original_dict\nnew_dict["age"] = 15\nprint(original_dict)`}
        />
        <h3>Output</h3>
        <OutputBlock output={JSON.stringify({"name": "Teja", "age": 15})} />
      </section>

      {/* Copy of Dictionary */}
      <section>
        <h2>Copy of Dictionary</h2>
        <p><code>dict.copy()</code> returns a copy of a dictionary.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`original_dict = {"name": "Teja"}\nnew_dict = original_dict.copy()\nnew_dict["age"] = 15\nprint(original_dict)\nprint(new_dict)`}
        />
        <h3>Output</h3>
        <OutputBlock output={JSON.stringify({"name": "Teja"}) + ", " + JSON.stringify({"name": "Teja", "age": 15})} />
      </section>

      {/* Copy of List */}
      <section>
        <h2>Copy of List</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`original_list = [1, [2, 3]]\nnew_list = original_list.copy()\nnew_list[1][0] = 4\nprint(original_list)\nprint(new_list)`}
        />
        <h3>Output</h3>
        <OutputBlock output={'[1, [4, 3]], [1, [4, 3]]'} />
      </section>

      {/* Operations on Dictionaries */}
      <section>
        <h2>Operations on Dictionaries</h2>
      </section>

      {/* len() */}
      <section>
        <h2>len()</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja", "age": 15}\nprint(len(my_dict))`}
        />
        <h3>Output</h3>
        <OutputBlock output={2} />
      </section>

      {/* clear() */}
      <section>
        <h2>clear()</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja", "age": 15}\nmy_dict.clear()\nprint(my_dict)`}
        />
        <h3>Output</h3>
        <OutputBlock output={JSON.stringify({})} />
      </section>

      {/* Membership Check */}
      <section>
        <h2>Membership Check</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja", "age": 15}\nprint("name" in my_dict)`}
        />
        <h3>Output</h3>
        <OutputBlock output={true} />
      </section>

      {/* Iterating */}
      <section>
        <h2>Iterating</h2>
        <p>Cannot add/remove dictionary keys while iterating the dictionary.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja", "age": 15}\nfor key in my_dict:\n    if key == "name":\n        del my_dict[key]\n    print(key)`}
        />
        <h3>Output</h3>
        <OutputBlock output={"RuntimeError: dictionary changed size during iteration"} />
      </section>

      {/* Arbitrary Function Arguments */}
      <section>
        <h2>Arbitrary Function Arguments</h2>
      </section>

      {/* Passing Multiple Values */}
      <section>
        <h2>Passing Multiple Values</h2>
        <p>We can define a function to receive any number of arguments.</p>
        <p>We have already seen such functions</p>
        <p><code>max(*args)</code> <code>max(1, 2, 3..)</code></p>
        <p><code>min(*args)</code> <code>min(1, 2, 3..)</code></p>
      </section>

      {/* Variable Length Arguments */}
      <section>
        <h2>Variable Length Arguments</h2>
        <p>Variable length arguments are packed as tuple.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def my_function(*args):\n    print(args)\nmy_function(1, 2, 3)`}
        />
        <h3>Output</h3>
        <OutputBlock output={(1, 2, 3)} />
      </section>

      {/* Unpacking as Arguments */}
      <section>
        <h2>Unpacking as Arguments</h2>
        <p>
          If we already have the data required to pass to a function as a sequence, we can
        </p>
        <p>unpack it with * while passing.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def my_function(a, b, c):\n    print(a, b, c)\nmy_list = [1, 2, 3]\nmy_function(*my_list)`}
        />
        <h3>Output</h3>
        <OutputBlock output={"1 2 3"} />
      </section>

      {/* Multiple Keyword Arguments */}
      <section>
        <h2>Multiple Keyword Arguments</h2>
      </section>

      {/* Variable length kwargs */}
      <section>
        <h2>Variable length kwargs</h2>
        <p>We can define a function to receive any number of keyword arguments.</p>
        <p>Variable length kwargs are packed as dictionary.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def my_function(**kwargs):\n    print(kwargs)\nmy_function(name="Teja", age=15)`}
        />
        <h3>Output</h3>
        <OutputBlock output={JSON.stringify({"name": "Teja", "age": 15})} />
      </section>

      {/* Iterating */}
      <section>
        <h2>Iterating</h2>
        <p>kwargs is a dictionary. We can iterate over them like any other dictionary.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def my_function(**kwargs):\n    for key, value in kwargs.items():\n        print(f"{key}: {value}")\nmy_function(name="Teja", age=15)`}
        />
        <h3>Output</h3>
        <OutputBlock output={["name: Teja", "age: 15"]} />
      </section>

      {/* Unpacking as Arguments */}
      <section>
        <h2>Unpacking as Arguments</h2>
        <h3>Code - 1</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def my_function(name, age):\n    print(f"{name} is {age}")\nmy_dict = {"name": "Teja", "age": 15}\nmy_function(**my_dict)`}
        />
        <h3>Output</h3>
        <OutputBlock output={"Teja is 15"} />
        <h3>Code - 2</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`def my_function(name, age):\n    print(f"{name} is {age}")\nmy_dict = {"name": "Teja", "age": 15, "city": "Hyderabad"}\nmy_function(**my_dict)`}
        />
        <h3>Output</h3>
        <OutputBlock output={"Teja is 15"} />
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

export default WorkingWithDictionaries;