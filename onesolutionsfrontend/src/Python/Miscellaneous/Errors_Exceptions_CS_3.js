import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Errors_Exceptions_CS_3 = ({
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
      <h1>Errors & Exceptions | Cheat Sheet</h1>

      <section>
        <h2>Errors & Exceptions</h2>

        <p>There are two major kinds of errors:</p>

        <ul>
          <li>Syntax Errors</li>
          <li>Exceptions</li>
        </ul>

        <h3>Syntax Errors</h3>
        <p>
          Syntax errors are parsing errors which occur when the code is not
          adhering to <b>Python Syntax</b>.
        </p>

        <b>Code</b>
        <CodeBlock language="python" code={`if True print("Hello")`} />
        <OutputBlock output={["SyntaxError: invalid syntax"]} />

        <p>
          When there is a syntax error, the program will <b>not</b> execute even
          if that part of code is not used.
        </p>

        <b>Code</b>
        <CodeBlock
          language="python"
          code={`print("Hello")

def greet():
    print("World"`}
        />
        <OutputBlock output={["SyntaxError: unexpected EOF while parsing"]} />

        <p>
          Notice that in the above code, the syntax error is inside the{" "}
          <code>greet</code>
          function, which is not used in rest of the code.
        </p>

        <h3>Exceptions</h3>

        <p>
          Even when a statement or expression is <b>syntactically correct</b>,
          it may cause an <b>error</b> when an attempt is made to execute it.
        </p>

        <p>
          Errors detected during execution are called <b>exceptions</b>.
        </p>

        <h4>Example Scenario</h4>

        <p>We wrote a program to download a Video over the Internet.</p>

        <ul>
          <li>Internet is disconnected during the download</li>
          <li>We do not have space left on the device to download the video</li>
        </ul>

        <h4>Example 1</h4>
        <p>Division Example</p>
        <p>Input given by the user is not within expected values.</p>

        <b>Code</b>
        <CodeBlock
          language="python"
          code={`def divide(a, b):
    return a / b

divide(5, 0)`}
        />
        <OutputBlock output={["ZeroDivisionError: division by zero"]} />

        <h4>Example 2</h4>
        <p>Input given by the user is not within expected values.</p>

        <b>Code</b>
        <CodeBlock
          language="python"
          code={`def divide(a, b):
    return a / b

divide("5", "10")`}
        />
        <OutputBlock
          output={[
            "TypeError: unsupported operand type(s) for /: 'str' and 'str'",
          ]}
        />

        <h4>Example 3</h4>
        <p>
          Consider the following code, which is used to update the quantity of
          items in store.
        </p>

        <b>Code</b>
        <CodeBlock
          language="python"
          code={`class Store:
    def __init__(self):
        self.items = {
            "milk": 20,
            "bread": 30,
        }

    def add_item(self, name, quantity):
        self.items[name] += quantity

s = Store()
s.add_item('biscuits', 10)`}
        />
        <OutputBlock output={["KeyError: 'biscuits'"]} />

        <h3>Working With Exceptions</h3>

        <p>
          What happens when your code runs into an exception during execution?
        </p>

        <p>The application/program crashes.</p>

        <h4>End-User Applications</h4>
        <p>
          When you develop applications that are directly used by end-users, you
          need to <code>handle different possible exceptions</code> in your code
          so that the application will not crash.
        </p>

        <h4>Reusable Modules</h4>
        <p>
          When you develop modules that are used by other developers, you should
          <code>raise exceptions</code> for different scenarios so that other
          developers can handle them.
        </p>

        <h4>Money Transfer App Scenario</h4>
        <p>
          Let’s consider we are creating an app that allows users to transfer
          money between them.
        </p>
        <img
          src="/assets/img/Money_Transfer.png"
          alt="software"
          style={{ width: "90%", height: "450px" }}
        />
        <h3>Bank Account Class</h3>
        <h4>Example 1</h4>
        <img
          src="/assets/img/Bank_Account_1.png"
          alt="software"
          style={{ width: "90%", height: "450px" }}
        />

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
        <OutputBlock
          output={[
            "User 1 Balance: 250/-",
            "User 2 Balance: 100/-",
            "Transferring 50/- from User 1 to User 2",
            "User 1 Balance: 200/-",
            "User 2 Balance: 150/-",
          ]}
        />
        <h4>Example 2</h4>
        <img
          src="/assets/img/Bank_Account_2.png"
          alt="software"
          style={{ width: "90%", height: "450px" }}
        />

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
user_1.deposit(25)
user_2.deposit(100)

print("User 1 Balance: {}/-".format(user_1.get_balance()))
print("User 2 Balance: {}/-".format(user_2.get_balance()))
transfer_amount(user_1, user_2, 50)
print("Transferring 50/- from User 1 to User 2")
print("User 1 Balance: {}/-".format(user_1.get_balance()))
print("User 2 Balance: {}/-".format(user_2.get_balance()))`}
        />
        <OutputBlock
          output={[
            "User 1 Balance: 25/-",
            "User 2 Balance: 100/-",
            "Insufficient Funds",
            "Transferring 50/- from User 1 to User 2",
            "User 1 Balance: 25/-",
            "User 2 Balance: 150/-",
          ]}
        />

        <h3>Raising Exceptions</h3>
        <p>
          When your code enters an unexpected state, <b>raise</b> an exception
          to communicate it.
        </p>
        <img
          src="/assets/img/Raising_Exception.png"
          alt="software"
          style={{ width: "90%", height: "450px" }}
        />

        <h3>Built-in Exceptions</h3>
        <p>
          Different <code>exception classes</code> which are raised in different
          scenarios.
        </p>
        <img
          src="/assets/img/Built_in_Exceptions.png"
          alt="software"
          style={{ width: "90%", height: "450px" }}
        />

        <p>
          You can use the built-in exception classes with <b>raise</b> keyword
          to raise an <b>exception</b> in the program.
        </p>

        <b>Code</b>
        <p>
          We can pass message as <b>argument</b> .
        </p>
        <CodeBlock
          language="python"
          code={`raise ValueError("Unexpected Value!!")`}
        />
        <OutputBlock output={["ValueError: Unexpected Value!!"]} />
        <h3>Bank Account Class</h3>
        <h4>Example 1</h4>
        <img
          src="/assets/img/Bank_Account_3.png"
          alt="software"
          style={{ width: "90%", height: "450px" }}
        />

        <CodeBlock
          language="python"
          code={`class BankAccount:
class BankAccount:
def __init__(self, account_number):
    self.account_number = str(account_number)
    self.balance = 0

def get_balance(self):
    return self.balance

def withdraw(self, amount):
    if self.balance >= amount:
        self.balance -= amount
    else:
        raise ValueError("Insufficient Funds")

def deposit(self, amount):
    self.balance += amount


def transfer_amount(acc_1, acc_2, amount):
acc_1.withdraw(amount)
acc_2.deposit(amount)


user_1 = BankAccount("001")
user_2 = BankAccount("002")
user_1.deposit(25)
user_2.deposit(100)

print("User 1 Balance: {}/-".format(user_1.get_balance()))
print("User 2 Balance: {}/-".format(user_2.get_balance()))
transfer_amount(user_1, user_2, 50)
print("Transferring 50/- from User 1 to User 2")
print("User 1 Balance: {}/-".format(user_1.get_balance()))
print("User 2 Balance: {}/-".format(user_2.get_balance()))`}
        />
        <OutputBlock
          output={[
            "User 1 Balance: 25/-",
            "User 2 Balance: 100/-",
            "",
            "ValueError: Insufficient Fund",
          ]}
        />

        <h3>Handling Exceptions</h3>
        <p>
          Python provides a way to <code>catch</code> the exceptions that were
          raised so that they can be properly handled.
        </p>
        <ul>
          <li>
            Exceptions can be handled with <code>try-except</code> block.
          </li>

          <li>
            Whenever an exception occurs at some line in try block, the
            execution stops at that line and jumps to except block.
          </li>
        </ul>

        <CodeBlock
          language="python"
          code={`try:
    # Write code that
    # might cause exceptions.
except:
    # The code to be run when
    # there is an exception.`}
        />
        <h3>Transfer Amount</h3>
        <h4>Example 1</h4>
        <img
          src="/assets/img/Transfer_Amount.png"
          alt="software"
          style={{ width: "90%", height: "450px" }}
        />

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
          raise ValueError("Insufficient Funds")

  def deposit(self, amount):
      self.balance += amount


def transfer_amount(acc_1, acc_2, amount):
  try:
      acc_1.withdraw(amount)
      acc_2.deposit(amount)
      return True
  except:
      return False


user_1 = BankAccount("001")
user_2 = BankAccount("002")
user_1.deposit(25)
user_2.deposit(100)

print("User 1 Balance: {}/-".format(user_1.get_balance()))
print("User 2 Balance: {}/-".format(user_2.get_balance()))
print(transfer_amount(user_1, user_2, 50))
print("Transferring 50/- from User 1 to User 2")
print("User 1 Balance: {}/-".format(user_1.get_balance()))
print("User 2 Balance: {}/-".format(user_2.get_balance()))`}
        />
        <OutputBlock
          output={[
            "User 1 Balance: 25/-",
            "User 2 Balance: 100/-",
            "",
            "ValueError: Insufficient Fund",
          ]}
        />

        <h3>Summary</h3>

        <h4>Reusable Modules</h4>
        <p>
          While developing reusable modules, we need to raise Exceptions to stop
          our code from being used in a bad way.
        </p>

        <h4>End-User Applications</h4>
        <p>
          While developing end-user applications, we need to handle Exceptions
          so that application will not crash when used.
        </p>

        <h2>Handling Specific Exceptions</h2>

        <p>
          We can specifically mention the <code>name of exception</code> to
          catch all exceptions of that specific type.
        </p>

        <b>Syntax</b>
        <section>
          <CodeBlock
            language="python"
            code={`try:
    # Write code that
    # might cause exceptions.
except Exception:
    # The code to be run when
    # there is an exception.`}
          />

          <h3>Example 1</h3>

          <CodeBlock
            language="python"
            code={`try:
    a = int(input())
    b = int(input())
    c = a / b
    print(c)
except ZeroDivisionError:
    print("Denominator can't be 0")
except:
    print("Unhandled Exception")`}
          />

          <h4>Input</h4>
          <OutputBlock output={["5", "0"]} />

          <h4>Output</h4>
          <OutputBlock output={["Denominator can't be 0"]} />

          <h3>Example 2</h3>

          <CodeBlock
            language="python"
            code={`try:
    a = int(input())
    b = int(input())
    c = a / b
    print(c)
except ZeroDivisionError:
    print("Denominator can't be 0")
except:
    print("Unhandled Exception")`}
          />

          <h4>Input</h4>
          <OutputBlock output={["12", "a"]} />

          <h4>Output</h4>
          <OutputBlock output={["Unhandled Exception"]} />
          <p>
            We can also access the handled exception in an <b>object</b>.
          </p>
          <h3>Accessing the Exception Object</h3>

          <CodeBlock
            language="python"
            code={`try:
    # Write code that
    # might cause exceptions.
except Exception as e:
    # The code to be run when
    # there is an exception.`}
          />

          <h4>Handling Multiple Exceptions</h4>
          <p>
            We can write <code>multiple exception blocks</code> to handle
            different types of exceptions differently.
          </p>

          <CodeBlock
            language="python"
            code={`try:
    # Write code that
    # might cause exceptions.
except Exception1:
    # The code to be run when
    # there is an exception.
except Exception2:
    # The code to be run when
    # there is an exception.`}
          />

          <h3>Example 1</h3>

          <CodeBlock
            language="python"
            code={`try:
    a = int(input())
    b = int(input())
    c = a / b
    print(c)
except ZeroDivisionError:
    print("Denominator can't be 0")
except ValueError:
    print("Input should be an integer")
except:
    print("Something went wrong")`}
          />

          <h4>Input</h4>
          <OutputBlock output={["5", "0"]} />

          <h4>Output</h4>
          <OutputBlock output={["Denominator can't be 0"]} />

          <h3>Example 2</h3>

          <CodeBlock
            language="python"
            code={`try:
    a = int(input())
    b = int(input())
    c = a / b
    print(c)
except ZeroDivisionError:
    print("Denominator can't be 0")
except ValueError:
    print("Input should be an integer")
except:
    print("Something went wrong")`}
          />

          <h4>Input</h4>
          <OutputBlock output={["12", "a"]} />

          <h4>Output</h4>
          <OutputBlock output={["Input should be an integer"]} />
        </section>
      </section>

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

export default Errors_Exceptions_CS_3;
