import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Miscellaneous_Python_Library_CheeatSheet = ({
  subtopicId,
  goalName,
  courseName,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check completion status
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
      } else {
        alert("Failed to mark as complete. Please try again.");
      }
    } catch {
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="intro-container">
      <h1>Python Standard Library  | Cheat Sheet</h1>

      {/* Python Standard Library */}
      <section>
        <h2>1.Python Standard Library</h2>
          <h3>Built-in Functions</h3>
          <p>Built-in functions are readily available for reuse.</p>
          <ul>
            <li>print()</li>
            <li>max()</li>
            <li>min()</li>
            <li>len()</li>
          </ul>
        </section>

        <section>
          <h2>Python Standard Library</h2>
          <p>
            A collection of predefined constants, classes and functions provided by
            Python.
          </p>

          <ul>
            <li>Organized into <b>modules</b></li>
            <li>Modules are grouped into <b>packages</b></li>
          </ul>

          <p><b>Examples of modules:</b></p>
          <ul>
            <li>math</li>
            <li>random</li>
            <li>datetime</li>
            <li>collections</li>
          </ul>
          <img
          src="/assets/img/math.png"
          alt="software"
          style={{ width: "100%", height: "400px" }}
        />

          <h3>Importing a Module</h3>
          <CodeBlock language="python" code={`import module_name`} />
        </section>

        <section>
          <h2>Math Module</h2>

          <CodeBlock
            language="python"
            code={`import math
        print(math.factorial(5))
        print(math.pi)`}
          />

          <h3>Aliasing</h3>
          <CodeBlock
            language="python"
            code={`import math as m
        print(m.factorial(5))`}
          />

          <h3>Import Specific Function</h3>
          <CodeBlock
            language="python"
            code={`from math import factorial
        print(factorial(5))`}
          />

          <h3>Alias Specific Function</h3>
          <CodeBlock
            language="python"
            code={`from math import factorial as fact
        print(fact(5))`}
          />
        </section>

        <section>
          <h2>Random Module</h2>

          <h3>randint()</h3>
          <p>Returns a random integer in a given range.</p>

          <CodeBlock
            language="python"
            code={`import random
        print(random.randint(1, 10))`}
          />

          <h3>choice()</h3>
          <p>Returns a random element from a sequence.</p>

          <CodeBlock
            language="python"
            code={`import random
        print(random.choice(["A","B","C"]))`}
          />
        </section>

        <section>
          <h2>map()</h2>
          <p>Applies a function to every element of a sequence.</p>

          <CodeBlock
            language="python"
            code={`def square(n):
            return n*n

        numbers = [1,2,3,4]
        print(list(map(square, numbers)))`}
          />

          <CodeBlock
            language="python"
            code={`numbers = list(map(int, input().split()))`}
          />
        </section>

        <section>
          <h2>filter()</h2>
          <p>Filters elements based on True/False condition.</p>

          <CodeBlock
            language="python"
            code={`def is_positive(n):
            return n > 0

        nums = [1, -2, 3, -4]
        print(list(filter(is_positive, nums)))`}
          />
        </section>

        <section>
          <h2>reduce()</h2>
          <p>Performs cumulative operation on a sequence.</p>

          <CodeBlock
            language="python"
            code={`from functools import reduce

        def sum_of_num(a, b):
            return a + b

        nums = [1,2,3,4]
        print(reduce(sum_of_num, nums))`}
          />
        </section>

      <section>
          <h2>2.Scope & Namespaces</h2>
          <h3>Object</h3>
          <p>
            Anything that can be assigned to a variable in Python is called an object.
          </p>
          <ul>
            <li>int, float, string</li>
            <li>list, function, module</li>
          </ul>
        </section>

        <section>
          <h2>Identity of an Object</h2>
          <ul>
            <li>Every object has a unique id</li>
            <li>Represents memory location</li>
            <li>Use <b>id()</b> to get identity</li>
          </ul>
        </section>

        <section>
          <h2>Name of an Object</h2>
          <p>Name (identifier) is the reference given to an object.</p>
        </section>

        <section>
          <h2>Namespace</h2>
          <p>
            A namespace is a collection of names and the objects they reference.
          </p>
          <img
          src="/assets/img/namespace.png"
          alt="software"
          style={{ width: "90%", height: "400px" }}
        />

          <ul>
            <li>Avoids naming conflicts</li>
            <li>Same name can exist in different namespaces</li>
          </ul>
        </section>

        <section>
          <h2>Types of Namespaces</h2>
          <ul>
            <li><b>Built-in</b></li>
            <li><b>Global</b></li>
            <li><b>Local</b></li>
          </ul>
        </section>

        <section>
          <h3>Built-in Namespace</h3>
          <p>Created when the program starts.</p>
          <p>Contains functions like <b>print(), id(), len()</b></p>
        </section>

        <section>
          <h3>Global Namespace</h3>
          <p>
            Created when a module loads.  
            Contains variables defined outside functions.
          </p>
          <img
          src="/assets/img/global.png"
          alt="software"
          style={{ width: "90%", height: "400px" }}
        />
        </section>

        <section>
          <h3>Local Namespace</h3>
          <p>
            Created when a function is called.  
            Exists until the function ends.
          </p>
          <img
          src="/assets/img/local.png"
          alt="software"
          style={{ width: "90%", height: "400px" }}
        />
        </section>

        <section>
          <h2>Scope of a Name</h2>
          <p>Region where a name is accessible.</p>
          <p><b>Search Order → Local → Global → Built-in</b></p>
          <img
          src="/assets/img/scope-name.png"
          alt="software"
          style={{ width: "100%", height: "400px" }}
        />
        </section>

        <section>
          <h2>Global Variable</h2>

          <CodeBlock
            language="python"
            code={`x = "Global"

        def foo():
            print(x)

        foo()`}
          />
        </section>

        <section>
          <h2>Local Variable</h2>

          <CodeBlock
            language="python"
            code={`def foo():
            x = "Local"
            print(x)

        foo()
        print(x)   # Error`}
          />
        </section>

        <section>
          <h2>Local vs Global</h2>

          <CodeBlock
            language="python"
            code={`x = "Global"

        def foo():
            x = "Local"
            print(x)

        print(x)
        foo()
        print(x)`}
          />
        </section>

        <section>
          <h2>Modifying Global Variable</h2>

          <CodeBlock
            language="python"
            code={`x = "Global"

        def foo():
            global x
            x = "Changed"

        foo()
        print(x)`}
          />
        </section>

        <section>
          <h2>Local Import</h2>

          <CodeBlock
            language="python"
            code={`def foo():
            import math
            print(math.pi)

        foo()
        print(math.pi)   # Error`}
          />
        </section>




     <section>
        <h2>3.Errors & Exceptions</h2>
        <h3>Types of Errors</h3>
        <p>There are two major kinds of errors in Python:</p>
        <ul>
          <li><b>Syntax Errors:</b> Parsing errors due to incorrect Python syntax.</li>
          <li><b>Exceptions:</b> Errors detected during execution.</li>
        </ul>
      </section>

      {/* Syntax Errors */}
      <section>
        <h2>Syntax Errors</h2>
        <p>
          Syntax errors prevent the program from executing, even if the code with the error is not used.
        </p>
        <CodeBlock language="python" code={`def greet()\n    print("Hello")`} />
      </section>

      {/* Exceptions */}
      <section>
        <h2>Exceptions</h2>
        <p>
          Exceptions occur during execution even if the code is syntactically correct.
        </p>
        <p>Example scenarios:</p>
        <ul>
          <li>Internet disconnected while downloading a video.</li>
          <li>Insufficient storage space to download a file.</li>
        </ul>
        <CodeBlock language="python" code={`x = 5 / 0  # Raises ZeroDivisionError`} />
      </section>

      {/* Working With Exceptions */}
      <section>
        <h2>Working With Exceptions</h2>
        <p>
          Without handling, exceptions crash the program. Proper handling ensures robustness in:
        </p>
        <ul>
          <li>End-user applications</li>
          <li>Reusable modules</li>
        </ul>
        <CodeBlock
            language="python"
            code={`class BankAccount:
            def __init__(self, account_number):
                self.account_number = str(account_number)
                self.balance = 0
        
            def get_balance(self):
                return self.balance
        
            def withdraw(self, amount):
                if self.balance >= amount:
                    self.balance -= amount
                else:
                    print("Insufficient Funds")
        
            def deposit(self, amount):
                self.balance += amount
        
        
        def transfer_amount(acc_1, acc_2, amount):
            acc_1.withdraw(amount)
            acc_2.deposit(amount)
        
        
        user_1 = BankAccount("001")
        user_2 = BankAccount("002")
        user_1.deposit(250)
        user_2.deposit(100)
        
        print("User 1 Balance: {}/-".format(user_1.get_balance()))
        print("User 2 Balance: {}/-".format(user_2.get_balance()))
        transfer_amount(user_1, user_2, 50)
        print("Transferring 50/- from User 1 to User 2")
        print("User 1 Balance: {}/-".format(user_1.get_balance()))
        print("User 2 Balance: {}/-".format(user_2.get_balance()))`}
          />

        <p>Money Transfer App Scenario</p>
  
         <img
          src="/assets/img/bank-trans.png"
          alt="software"
          style={{ width: "100%", height: "400px" }}
        />
      </section>

      {/* Raising Exceptions */}
      <section>
        <h2>Raising Exceptions</h2>
        <p>
          Raise exceptions to communicate unexpected states in your code.
        </p>
        <img
          src="/assets/img/rising-ex.png"
          alt="software"
          style={{ width: "100%", height: "360px" }}
        />
        <CodeBlock language="python" code={`raise ValueError("Invalid input")`} />
      </section>

      {/* Handling Exceptions */}
      <section>
        <h2>Handling Exceptions</h2>
        <p>
          Use <b>try-except</b> blocks to handle exceptions.
        </p>
        <CodeBlock language="python" code={`try:\n    x = int(input("Enter number: "))\nexcept ValueError as e:\n    print("Invalid input", e)`} />
      </section>

      {/* Handling Specific Exceptions */}
      <section>
        <h2>Handling Specific Exceptions</h2>
        <p>You can catch specific exceptions by naming them:</p>
        <CodeBlock language="python" code={`try:\n    x = 5 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")`} />
      </section>

      {/* Handling Multiple Exceptions */}
      <section>
        <h2>Handling Multiple Exceptions</h2>
        <p>Multiple <b>except</b> blocks can handle different types of exceptions:</p>
        <CodeBlock language="python" code={`try:\n    x = int(input())\n    y = 10 / x\nexcept ValueError:\n    print("Invalid input")\nexcept ZeroDivisionError:\n    print("Division by zero")`} />
      </section>

     

{/* Datetime Module */}
      <section>
      <h1>4.Working With Dates & Times</h1>
        <h2>Datetime Module</h2>
        <p>
          Python provides the built-in <b>datetime</b> module for working with
          dates and times.
        </p>
        <p>Commonly used classes in datetime:</p>
        <ul>
          <li>date</li>
          <li>time</li>
          <li>datetime</li>
          <li>timedelta</li>
        </ul>
      </section>

      {/* Working with date class */}
      <section>
        <h2>Working with date class</h2>
        <p>Creating a date object:</p>
        <CodeBlock
          language="python"
          code={`from datetime import date\nmy_date = date(2025, 10, 14)\nprint(my_date)`}
        />

        <p>
          Today's date using <code>today()</code>:
        </p>
        <CodeBlock
          language="python"
          code={`today = date.today()\nprint(today)`}
        />

        <p>Date attributes:</p>
        <CodeBlock
          language="python"
          code={`print(today.year)\nprint(today.month)\nprint(today.day)`}
        />
      </section>

{/* Working with time class */}
        <section>
          <h2>Working with time class</h2>
          <p>Creating a time object:</p>
          <CodeBlock
            language="python"
            code={`from datetime import time\nmy_time = time(14, 30, 45)\nprint(my_time)`}
          />

          <p>Time attributes:</p>
          <CodeBlock
            language="python"
            code={`print(my_time.hour)\nprint(my_time.minute)\nprint(my_time.second)`}
          />
        </section>

{/* Working with datetime class */}
      <section>
        <h2>Working with datetime class</h2>
        <p>Creating a datetime object:</p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime\ndt = datetime(2025, 10, 14, 14, 30, 0)\nprint(dt)`}
        />

        <p>Current date and time:</p>
        <CodeBlock
          language="python"
          code={`now = datetime.now()\nprint(now)`}
        />

        <p>Datetime attributes:</p>
        <CodeBlock
          language="python"
          code={`print(now.year)\nprint(now.month)\nprint(now.day)\nprint(now.hour)\nprint(now.minute)\nprint(now.second)`}
        />
      </section>

      {/* Formatting datetime */}
      <section>
        <h2>Formatting Datetime</h2>
        <p>
          Use <code>strftime(format)</code> to format datetime:
        </p>
        <CodeBlock
          language="python"
          code={`formatted = now.strftime("%d-%m-%Y %H:%M:%S")\nprint(formatted)`}
        />

        <p>Common format specifiers:</p>
        <ul>
          <li>%Y - Year with century</li>
          <li>%m - Month (01-12)</li>
          <li>%d - Day of month (01-31)</li>
          <li>%H - Hour (24-hour)</li>
          <li>%M - Minute (00-59)</li>
          <li>%S - Second (00-59)</li>
          <li>%b/%B - Month name short/full</li>
          <li>%a/%A - Weekday short/full</li>
          <li>%p - AM/PM</li>
        </ul>
      </section>

      {/* Parsing datetime */}
      <section>
        <h2>Parsing Datetime</h2>
        <p>
          Create a datetime object from a string using <code>strptime()</code>:
        </p>
        <CodeBlock
          language="python"
          code={`dt_str = "14-10-2025 14:30:00"\ndt_obj = datetime.strptime(dt_str, "%d-%m-%Y %H:%M:%S")\nprint(dt_obj)`}
        />
      </section>

      {/* Working with timedelta */}
      <section>
        <h2>Working with timedelta</h2>
        <p>Timedelta represents duration or difference between dates:</p>
        <CodeBlock
          language="python"
          code={`from datetime import timedelta\ndelta = timedelta(days=5, hours=3)\nprint(delta)`}
        />

        <p>Calculate new date/time:</p>
        <CodeBlock
          language="python"
          code={`future_date = today + timedelta(days=10)\nprint(future_date)`}
        />

        <p>Time difference between two dates:</p>
        <CodeBlock
          language="python"
          code={`diff = datetime(2025,10,20) - datetime(2025,10,14)\nprint(diff.days, "days")`}
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

export default Miscellaneous_Python_Library_CheeatSheet;
