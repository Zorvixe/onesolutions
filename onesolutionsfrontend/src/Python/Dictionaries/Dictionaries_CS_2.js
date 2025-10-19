import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks"; // Adjust path as needed

const Dictionaries_CS_2 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Dictionaries | Cheat Sheet</h1>

      {/* Dictionaries */}
      <section>
        <h2>Dictionaries</h2>
        <p>Unordered collection of items.</p>
        <p>Every dictionary item is a Key-value pair.</p>
      </section>

      {/* Creating a Dictionary */}
      <section>
        <h2>Creating a Dictionary</h2>
        <p>Created by enclosing items within {`curly`} brackets</p>
        <p>Each item in dictionary has a key-value pair separated by a comma.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja", "age": 15}\nprint(my_dict)`}
        />
      </section>

      {/* Key-Value Pairs */}
      <section>
        <h2>Key-Value Pairs</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`person = {"name": "Teja", "age": 15}\nprint(person)`}
        />
        <p>In the above dictionary, the</p>
        <ul>
          <li>keys are <code>name</code> and <code>age</code></li>
          <li>values are <code>Teja</code> and <code>15</code></li>
        </ul>
      </section>

      {/* Collection of Key-Value Pairs */}
      <section>
        <h2>Collection of Key-Value Pairs</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja", "age": 15, "city": "Hyderabad"}\nprint(my_dict)`}
        />
        <h3>Output</h3>
        <OutputBlock output={JSON.stringify({"name": "Teja", "age": 15, "city": "Hyderabad"})} />
      </section>

      {/* Immutable Keys */}
      <section>
        <h2>Immutable Keys</h2>
        <p>Keys must be of immutable type and must be unique.</p>
        <p>Values can be of any data type and can repeat.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {(1, 2): "tuple_key", "name": "Teja", [1, 2]: "list_key"}\nprint(my_dict)`}
        />
        <h3>Output</h3>
        <OutputBlock output={"TypeError: unhashable type: 'list'"} />
      </section>

      {/* Creating Empty Dictionary */}
      <section>
        <h2>Creating Empty Dictionary</h2>
        <h3>Code - 1</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {}\nprint(my_dict)`}
        />
        <h3>Output</h3>
        <OutputBlock output={JSON.stringify({})} />
        <h3>Code - 2</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = dict()\nprint(my_dict)`}
        />
        <h3>Output</h3>
        <OutputBlock output={JSON.stringify({})} />
      </section>

      {/* Accessing Items */}
      <section>
        <h2>Accessing Items</h2>
        <p>
          To access the items in dictionary, we use square bracket [] along with the key to
          obtain its value.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja", "age": 15}\nprint(my_dict["name"])`}
        />
        <h3>Output</h3>
        <OutputBlock output={"Teja"} />
      </section>

      {/* Accessing Items - Get */}
      <section>
        <h2>Accessing Items - Get</h2>
        <p>The <code>get()</code> method returns <code>None</code> if the key is not found.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja"}\nprint(my_dict.get("age"))`}
        />
        <h3>Output</h3>
        <OutputBlock output={null} />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja"}\nprint(my_dict.get("name"))`}
        />
        <h3>Output</h3>
        <OutputBlock output={"Teja"} />
      </section>

      {/* KeyError */}
      <section>
        <h2>KeyError</h2>
        <p>
          When we use the square brackets [] to access the key-value, KeyError is raised in
          case a key is not found in the dictionary.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja"}\nprint(my_dict["age"])`}
        />
        <h3>Output</h3>
        <OutputBlock output={"KeyError: 'age'"} />
      </section>

      {/* Quick Tip */}
      <section>
        <h2>Quick Tip</h2>
        <p>
          If we use the square brackets [], KeyError is raised in case a key is not found
          in the dictionary. On the other hand, the <code>get()</code> method returns
          <code>None</code> if the key is not found.
        </p>
      </section>

      {/* Membership Check */}
      <section>
        <h2>Membership Check</h2>
        <p>Checks if the given key exists.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja", "age": 15}\nprint("name" in my_dict)`}
        />
        <h3>Output</h3>
        <OutputBlock output={true} />
      </section>

      {/* Operations on Dictionaries */}
      <section>
        <h2>Operations on Dictionaries</h2>
        <p>We can update a dictionary by</p>
        <ul>
          <li>Adding a key-value pair</li>
          <li>Modifying existing items</li>
          <li>Deleting existing items</li>
        </ul>
      </section>

      {/* Adding a Key-Value Pair */}
      <section>
        <h2>Adding a Key-Value Pair</h2>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja"}\nmy_dict["age"] = 15\nprint(my_dict)`}
        />
        <h3>Output</h3>
        <OutputBlock output={JSON.stringify({"name": "Teja", "age": 15})} />
      </section>

      {/* Modifying an Existing Item */}
      <section>
        <h2>Modifying an Existing Item</h2>
        <p>As dictionaries are mutable, we can modify the values of the keys.</p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja", "age": 15}\nmy_dict["age"] = 16\nprint(my_dict)`}
        />
        <h3>Output</h3>
        <OutputBlock output={JSON.stringify({"name": "Teja", "age": 16})} />
      </section>

      {/* Deleting an Existing Item */}
      <section>
        <h2>Deleting an Existing Item</h2>
        <p>
          We can also use the <code>del</code> keyword to remove individual items or the
          entire dictionary itself.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja", "age": 15}\ndel my_dict["age"]\nprint(my_dict)`}
        />
        <h3>Output</h3>
        <OutputBlock output={JSON.stringify({"name": "Teja"})} />
      </section>

      {/* Dictionary Views */}
      <section>
        <h2>Dictionary Views</h2>
        <p>
          They provide a dynamic view on the dictionary’s entries, which means that when
          the dictionary changes, the view reflects these changes.
        </p>
      </section>

      {/* Dictionary Methods */}
      <section>
        <h2>Dictionary Methods</h2>
        <ul>
          <li><code>dict.keys()</code> returns dictionary Keys</li>
          <li><code>dict.values()</code> returns dictionary Values</li>
          <li><code>dict.items()</code> returns dictionary items(key-value) pairs</li>
        </ul>
        <p>
          The objects returned by <code>keys()</code>, <code>values()</code> &amp;
          <code>items()</code> are View Objects.
        </p>
      </section>

      {/* Getting Keys */}
      <section>
        <h2>Getting Keys</h2>
        <p>
          The <code>keys()</code> method returns a view object of the type <code>dict_keys</code> that holds a list of all keys.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja", "age": 15}\nprint(my_dict.keys())`}
        />
        <h3>Output</h3>
        <OutputBlock output={["name", "age"]} />
      </section>

      {/* Getting Values */}
      <section>
        <h2>Getting Values</h2>
        <p>
          The <code>values()</code> method returns a view object that displays a list of
          all the values in the dictionary.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja", "age": 15}\nprint(my_dict.values())`}
        />
        <h3>Output</h3>
        <OutputBlock output={["Teja", 15]} />
      </section>

      {/* Getting Items */}
      <section>
        <h2>Getting Items</h2>
        <p>
          The <code>items()</code> method returns a view object that displays a list of
          dictionary's (key, value) tuple pairs.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja", "age": 15}\nprint(my_dict.items())`}
        />
        <h3>Output</h3>
        <OutputBlock output={[["name", "Teja"], ["age", 15]]} />
      </section>

      {/* Iterate over Dictionary Views */}
      <section>
        <h2>Iterate over Dictionary Views</h2>
        <h3>Example - 1</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja", "age": 15}\nfor key in my_dict.keys():\n    print(key)`}
        />
        <h3>Output</h3>
        <OutputBlock output={["name", "age"]} />
        <h3>Example - 2</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja", "age": 15}\nfor value in my_dict.values():\n    print(value)`}
        />
        <h3>Output</h3>
        <OutputBlock output={["Teja", 15]} />
        <h3>Example - 3</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja", "age": 15}\nfor key, value in my_dict.items():\n    print(f"{key}: {value}")`}
        />
        <h3>Output</h3>
        <OutputBlock output={["name: Teja", "age: 15"]} />
        <h3>Example - 4</h3>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja", "age": 15}\nmy_dict["city"] = "Hyderabad"\nfor key in my_dict.keys():\n    print(key)`}
        />
        <h3>Output</h3>
        <OutputBlock output={["name", "age", "city"]} />
      </section>

      {/* Dictionary View Objects */}
      <section>
        <h2>Dictionary View Objects</h2>
        <p>
          <code>keys()</code>, <code>values()</code> &amp; <code>items()</code> are called
          Dictionary Views as they provide a dynamic view on the dictionary’s items.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = {"name": "Teja"}\nkeys_view = my_dict.keys()\nmy_dict["age"] = 15\nprint(keys_view)`}
        />
        <h3>Output</h3>
        <OutputBlock output={["name", "age"]} />
      </section>

      {/* Converting to Dictionary */}
      <section>
        <h2>Converting to Dictionary</h2>
        <p>
          <code>dict(sequence)</code> takes any number of key-value pairs and converts to
          dictionary.
        </p>
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_list = [("name", "Teja"), ("age", 15)]\nmy_dict = dict(my_list)\nprint(my_dict)`}
        />
        <h3>Output</h3>
        <OutputBlock output={JSON.stringify({"name": "Teja", "age": 15})} />
        <h3>Code</h3>
        <CodeBlock
          language="python"
          code={`my_dict = dict(name="Teja", age=15)\nprint(my_dict)`}
        />
        <h3>Output</h3>
        <OutputBlock output={JSON.stringify({"name": "Teja", "age": 15})} />
      </section>

      {/* Type of Keys */}
      <section>
        <h2>Type of Keys</h2>
        <p>A dictionary key must be of a type that is immutable.</p>
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

export default Dictionaries_CS_2;