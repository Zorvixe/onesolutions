import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Python_Summary_CS4 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Python Summary Cheat Sheet - 4</h1>

      {/* Scopes & Namespaces */}
      <section>
        <h2>Scopes & Namespaces</h2>
        <p>
          <strong>Object:</strong> Anything that can be assigned to a variable in Python is an object.
        </p>
        <p>
          <strong>Namespaces:</strong> Collection of currently defined names along with information about the object that the name references.
        </p>
        <CodeBlock language="python" code={`def greet_1():\n    a = "Hello"\n    print(a)\n    print(id(a))\n\ndef greet_2():\n    a = "Hey"\n    print(a)\n    print(id(a))\n\nprint("Namespace - 1")\ngreet_1()\nprint("Namespace - 2")\ngreet_2()`} />
        <OutputBlock output={`Namespace - 1\nHello\n140639382368176\nNamespace - 2\nHey\n140639382570608`} />

        <h3>Types of Namespaces</h3>
        <ul>
          <li><strong>Built-in Namespace:</strong> Available from the start of Python execution.</li>
          <li><strong>Global Namespace:</strong> Names defined directly in a module.</li>
          <li><strong>Local Namespace:</strong> Created when a function is called and destroyed when function returns.</li>
        </ul>

        <h3>Scope of a Name</h3>
        <p>Names are searched in <strong>local → global → built-in</strong> order.</p>
        <CodeBlock language="python" code={`x = "Global Variable"\nprint(x)\n\ndef foo():\n    print(x)\n\nfoo()`} />
        <OutputBlock output={`Global Variable\nGlobal Variable`} />

        <h3>Local Variables</h3>
        <CodeBlock language="python" code={`def foo():\n   x = "Local Variable"\n   print(x)\n\nfoo()\nprint(x)`} />
        <OutputBlock output={`Local Variable\nNameError: name 'x' is not defined`} />

        <h3>Local vs Global Variables</h3>
        <CodeBlock language="python" code={`x = "Global Variable"\n\ndef foo():\n    x = "Local Variable"\n    print(x)\n\nprint(x)\nfoo()\nprint(x)`} />
        <OutputBlock output={`Global Variable\nLocal Variable\nGlobal Variable`} />

        <h3>Modifying Global Variables</h3>
        <CodeBlock language="python" code={`x = "Global Variable"\n\ndef foo():\n    global x\n    x = "Global Change"\n    print(x)\n\nprint(x)\nfoo()\nprint(x)`} />
        <OutputBlock output={`Global Variable\nGlobal Change\nGlobal Change`} />
      </section>

      {/* Python Standard Library */}
      <section>
        <h2>Python Standard Library</h2>
        <p>Collection of predefined utilities organized into modules and packages.</p>
        <ul>
          <li><strong>Module:</strong> Any file containing Python code.</li>
          <li><strong>Package:</strong> Folder containing multiple modules.</li>
        </ul>

        <h3>Importing Modules</h3>
        <CodeBlock language="python" code={`import module_name`} />

        <h3>Import Specific Function</h3>
        <CodeBlock language="python" code={`from math import factorial\nprint(factorial(5))`} />
        <OutputBlock output={`120`} />

        <h3>Aliasing Imports</h3>
        <CodeBlock language="python" code={`from math import factorial as fact\nprint(fact(5))`} />
        <OutputBlock output={`120`} />

        <h3>Random Module</h3>
        <CodeBlock language="python" code={`import random\nrandom_integer = random.randint(1, 10)\nprint(random_integer)`} />
        <OutputBlock output={`8`} />
        <CodeBlock language="python" code={`random_ele = random.choice(["A","B","C"])\nprint(random_ele)`} />
        <OutputBlock output={`B`} />
      </section>

      {/* Classes */}
      <section>
        <h2>Classes</h2>
        <p>Classes bundle attributes and methods. <strong>self</strong> refers to the instance.</p>
        <CodeBlock language="python" code={`class Mobile:\n    def __init__(self, model):\n        self.model = model\n\nmobile_obj = Mobile("iPhone 12 Pro")\nprint(mobile_obj.model)`} />
        <OutputBlock output={`iPhone 12 Pro`} />

        <h3>Updating Attributes</h3>
        <CodeBlock language="python" code={`class Mobile:\n    def __init__(self, model):\n        self.model = model\n    def update_model(self, model):\n        self.model = model\n\nobj_1 = Mobile("iPhone 12")\nobj_1.update_model("iPhone 12 Pro")\nprint(obj_1.model)`} />
        <OutputBlock output={`iPhone 12 Pro`} />

        <h3>Instance & Class Attributes</h3>
        <CodeBlock language="python" code={`class Cart:\n    flat_discount = 0\n    min_bill = 100\n\nprint(Cart.min_bill)`} />
        <OutputBlock output={`100`} />
        <CodeBlock language="python" code={`Cart.min_bill = 200\na = Cart()\na.flat_discount = 50\nprint(Cart.min_bill)`} />
        <OutputBlock output={`200`} />

        <h3>Methods</h3>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Instance Methods</th>
              <th>Class Methods</th>
              <th>Static Methods</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>self as parameter, no decorator, accessed via object</td>
              <td>cls as parameter, @classmethod, accessed via class</td>
              <td>No self/cls, @staticmethod, accessed via class</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* OOPS Concepts */}
      <section>
        <h2>OOPS</h2>
        <ul>
          <li><strong>Encapsulation:</strong> Bundle related attributes and methods.</li>
          <li><strong>Inheritance:</strong> IS-A relationship between classes.</li>
          <li><strong>Composition:</strong> HAS-A relationship between classes.</li>
        </ul>
        <CodeBlock language="python" code={`class Product:\n    def __init__(self, name):\n        self.name = name\n    def display_product_details(self):\n        print("Product: {}".format(self.name))\n\nclass ElectronicItem(Product):\n    pass\n\ne = ElectronicItem("TV")\ne.display_product_details()`} />
        <OutputBlock output={`Product: TV`} />
      </section>

      {/* Errors & Exceptions */}
      <section>
        <h2>Errors & Exceptions</h2>
        <ul>
          <li>Syntax Errors: Parsing errors that prevent execution.</li>
          <li>Exceptions: Errors during execution.</li>
        </ul>
        <CodeBlock language="python" code={`def divide(a, b):\n    return a / b\n\ndivide(5, 0)`} />
        <OutputBlock output={`ZeroDivisionError: division by zero`} />

        <h3>Handling Exceptions</h3>
        <CodeBlock language="python" code={`try:\n    result = 10/0\nexcept ZeroDivisionError:\n    print("Denominator can't be 0")`} />
        <OutputBlock output={`Denominator can't be 0`} />
      </section>

      {/* Working With Dates & Times */}
      <section>
        <h2>Working With Dates & Times</h2>
        <CodeBlock language="python" code={`import datetime\n\ndate_object = datetime.date(2022, 12, 17)\nprint(date_object)`} />
        <OutputBlock output={`2022-12-17`} />

        <CodeBlock language="python" code={`from datetime import datetime\nnow = datetime.now()\nformatted_datetime = now.strftime("%d %b %Y %I:%M:%S %p")\nprint(formatted_datetime)`} />
        <OutputBlock output={`05 Feb 2021 09:26:50 AM`} />

        <CodeBlock language="python" code={`date_string = "28 November, 2018"\ndate_object = datetime.strptime(date_string, "%d %B, %Y")\nprint(date_object)`} />
        <OutputBlock output={`2018-11-28 00:00:00`} />
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

export default Python_Summary_CS4;
