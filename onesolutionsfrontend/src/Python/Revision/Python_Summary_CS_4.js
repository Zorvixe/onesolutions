import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Python_Summary_CS4 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
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
        Python Summary Cheat Sheet - 4
      </h1>

      {/* Scopes & Namespaces */}
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
          Scopes & Namespaces
        </h2>

        {/* Blue Background */}
        <div
          style={{
            background: "#e8f4fc",
            padding: "1.5rem",
            borderRadius: "10px",
            marginTop: "1.5rem",
          }}
        >
          <h3>Object</h3>
          <p>
            In general, anything that can be assigned to a variable in Python is
            referred to as an object. Strings, Integers, Floats, Lists,
            Functions, Modules etc. are all objects.
          </p>

          <h3>Namespaces</h3>
          <p>
            A namespace is a collection of currently defined names along with
            information about the object that the name references. It ensures
            that names are unique and won’t lead to any conflict.
          </p>

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

          <CodeBlock
            language="python"
            code={`# Output is:
Namespace - 1
Hello
140639382368176
Namespace - 2
Hey
140639382570608`}
          />

          <h3>Types of Namespaces</h3>

          <ul>
            <li>
              <strong>Built-in Namespace:</strong> Created when we start
              executing a Python program and exists as long as the program is
              running. Built-in functions like <code>id()</code>,{" "}
              <code>print()</code> are always available.
            </li>
            <li>
              <strong>Global Namespace:</strong> Includes all names defined
              directly in a module (outside of all functions).
            </li>
            <li>
              <strong>Local Namespace:</strong> Created when a function is
              called and lasts until the function returns.
            </li>
          </ul>

          <h3>Scope of a Name</h3>
          <p>
            In Python, the scope of a name refers to where it can be used. The
            name is searched for in the local, global, and built-in namespaces
            in that order.
          </p>

          <h3>Global Variables</h3>

          <CodeBlock
            language="python"
            code={`x = "Global Variable"
print(x)  # Global Variable

def foo():
    print(x)  # Global Variable

foo()`}
          />

          <h3>Local Variables</h3>

          <CodeBlock
            language="python"
            code={`def foo():
    x = "Local Variable"
    print(x)  # Local Variable

foo()
print(x)  # NameError`}
          />

          <h3>Local Variables & Global Variables</h3>

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

          <CodeBlock
            language="python"
            code={`# Output is:
Global Variable
Local Variable
Global Variable`}
          />

          <h3>Modifying Global Variables</h3>
          <p>
            <code>global</code> keyword is used to define a name to refer to the
            value in Global Namespace.
          </p>

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

          <CodeBlock
            language="python"
            code={`# Output is:
Global Variable
Global Change
Global Change`}
          />
        </div>
      </section>

      {/* Python Standard Library */}
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
          Python Standard Library
        </h2>

        {/* Blue Background */}
        <div
          style={{
            background: "#e8f4fc",
            padding: "1.5rem",
            borderRadius: "10px",
            marginTop: "1.5rem",
          }}
        >
          <p>
            The collection of predefined utilities is referred as the Python
            Standard Library. All these functionalities are organized into
            different modules.
          </p>

          <h3>Module</h3>
          <p>
            In Python context, any file containing Python code is called a
            module.
          </p>

          <h3>Package</h3>
          <p>
            These modules are further organized into folders known as packages.
          </p>

          <h3>Importing Module</h3>
          <p>
            To use a functionality defined in a module we need to import that
            module in our program.
          </p>

          <CodeBlock language="python" code={`import module_name`} />

          <h3>Importing from a Module</h3>
          <p>We can import just a specific definition from a module.</p>

          <CodeBlock
            language="python"
            code={`from math import factorial
print(factorial(5))  # 120`}
          />

          <h3>Aliasing Imports</h3>
          <p>
            We can also import a specific definition from a module and alias it.
          </p>

          <CodeBlock
            language="python"
            code={`from math import factorial as fact
print(fact(5))  # 120`}
          />

          <h3>Random Module</h3>
          <p>Randomness is useful whenever uncertainty is required.</p>
          <p>Example: Rolling a dice, flipping a coin, etc.</p>
          <p>
            <code>random</code> module provides us utilities to create
            randomness.
          </p>

          <h4>Randint</h4>
          <p>
            <code>randint()</code> is a function in random module which returns
            a random integer in the given interval.
          </p>

          <CodeBlock
            language="python"
            code={`import random
random_integer = random.randint(1, 10)
print(random_integer)  # 8`}
          />

          <h4>Choice</h4>
          <p>
            <code>choice()</code> is a function in random module which returns a
            random element from the sequence.
          </p>

          <CodeBlock
            language="python"
            code={`import random
random_ele = random.choice(["A", "B", "C"])
print(random_ele)  # B`}
          />
        </div>
      </section>

      {/* Classes */}
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
          Classes
        </h2>

        {/* Blue Background Content */}
        <div
          style={{
            background: "#e8f4fc",
            padding: "1.5rem",
            borderRadius: "10px",
            marginTop: "1.5rem",
          }}
        >
          <p>
            <b>Classes:</b> Classes can be used to bundle related attributes and
            methods. To create a class, use the keyword <code>class</code>.
          </p>

          <CodeBlock
            language="python"
            code={`class className:
    attributes
    methods`}
          />

          <p>
            <b>Self:</b> <code>self</code> passed to method contains the object,
            which is an instance of class.
          </p>

          <p>
            <b>Special Method:</b> In Python, a special method{" "}
            <code>__init__</code> is used to assign values to attributes.
          </p>

          <CodeBlock
            language="python"
            code={`class Mobile:
    def __init__(self, model):
        self.model = model`}
          />

          <p>
            <b>Instance of Class:</b> Syntax for creating an instance of class
            looks similar to a function call. An instance of class is an Object.
          </p>

          <CodeBlock
            language="python"
            code={`mobile_obj = Mobile("iPhone 12 Pro")`}
          />

          <p>
            <b>Class Object:</b> An object is simply a collection of attributes
            and methods that act on those data.
          </p>

          <CodeBlock
            language="python"
            code={`class Mobile:
    def __init__(self, model):
        self.model = model
    def make_call(self, number):
        return "calling..{}".format(number)`}
          />

          <p>
            <b>Attributes of an Object:</b> Attributes can be set or accessed
            using <code>.</code> (dot) character.
          </p>

          <CodeBlock
            language="python"
            code={`obj = Mobile("iPhone 12 Pro")
print(obj.model)  # iPhone 12 Pro`}
          />

          <p>
            <b>Accessing in Other Methods:</b> We can also access and update
            attributes in other methods.
          </p>

          <CodeBlock
            language="python"
            code={`class Mobile:
    def __init__(self, model):
        self.model = model
    def get_model(self):
        print(self.model)

obj_1 = Mobile("iPhone 12 Pro")
obj_1.get_model()  # iPhone 12 Pro`}
          />

          <p>
            <b>Updating Attributes:</b> Recommended to update attributes through
            methods.
          </p>

          <CodeBlock
            language="python"
            code={`class Mobile:
    def __init__(self, model):
        self.model = model
    def update_model(self, model):
        self.model = model

obj_1 = Mobile("iPhone 12")
obj_1.update_model("iPhone 12 Pro")
print(obj_1.model)  # iPhone 12 Pro`}
          />

          <p>
            <b>Instance Attributes:</b> Attributes whose value can differ for
            each instance of class.
          </p>

          <CodeBlock
            language="python"
            code={`class Cart:
    def __init__(self):
        self.items = {'book': 3}
    def display_items(self):
        print(self.items)

a = Cart()
a.display_items()  # {'book': 3}`}
          />

          <p>
            <b>Class Attributes:</b> Attributes whose values stay common for all
            the objects are modelled as Class Attributes.
          </p>

          <CodeBlock
            language="python"
            code={`class Cart:
    flat_discount = 0
    min_bill = 100

print(Cart.min_bill)  # 100`}
          />

          <p>
            <b>Updating Class Attribute:</b>
          </p>

          <CodeBlock
            language="python"
            code={`class Cart:
    flat_discount = 0
    min_bill = 100
    def print_min_bill(self):
        print(Cart.min_bill)

a = Cart()
b = Cart()
Cart.min_bill = 200
b.print_min_bill()  # 200`}
          />

          <p>
            <b>Methods:</b> Broadly, methods can be categorized as: Instance
            Methods, Class Methods, Static Methods
          </p>

          <h4>Instance Methods:</h4>
          <p>
            Instance methods can access all attributes of the instance and have{" "}
            <code>self</code> as a parameter.
          </p>

          <CodeBlock
            language="python"
            code={`class Cart:
    def __init__(self):
        self.items = {}
    def add_item(self, item_name, quantity):
        self.items[item_name] = quantity
    def display_items(self):
        print(self.items)

a = Cart()
a.add_item("book", 3)
a.display_items()  # {'book': 3}`}
          />

          <h4>Class Methods:</h4>
          <p>
            Methods that need access to class attributes but not instance
            attributes. Use <code>cls</code> as parameter and{" "}
            <code>@classmethod</code> decorator.
          </p>

          <CodeBlock
            language="python"
            code={`class Cart:
    flat_discount = 0
    @classmethod
    def update_flat_discount(cls, new_flat_discount):
        cls.flat_discount = new_flat_discount

Cart.update_flat_discount(25)
print(Cart.flat_discount)  # 25`}
          />

          <h4>Static Methods:</h4>
          <p>
            Static methods are utility functions that belong to the class. Use{" "}
            <code>@staticmethod</code> decorator.
          </p>

          <CodeBlock
            language="python"
            code={`class Cart:
    @staticmethod
    def greet():
        print("Have a Great Shopping")

Cart.greet()  # Have a Great Shopping`}
          />

          <h4>Method Comparison:</h4>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1rem",
            }}
          >
            <thead>
              <tr style={{ background: "#3498db", color: "white" }}>
                <th>Instance Methods</th>
                <th>Class Methods</th>
                <th>Static Methods</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>self as parameter</td>
                <td>cls as parameter</td>
                <td>No cls or self as parameters</td>
              </tr>
              <tr>
                <td>No decorator required</td>
                <td>Need decorator @classmethod</td>
                <td>Need decorator @staticmethod</td>
              </tr>
              <tr>
                <td>Accessed through object(instance)</td>
                <td>Accessed through class</td>
                <td>Accessed through class</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* OOPS Concepts */}
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
          OOPS (Object-Oriented Programming System)
        </h2>

        {/* Blue Background Content */}
        <div
          style={{
            background: "#e8f4fc",
            padding: "1.5rem",
            borderRadius: "10px",
            marginTop: "1.5rem",
          }}
        >
          <p>
            <b>OOPS:</b> Object-Oriented Programming System is a way of
            designing and developing software that is easy to change.
          </p>

          <p>
            <b>Bundling Data:</b> While modeling real-life objects with object
            oriented programming, we ensure to bundle related information
            together to clearly separate information of different objects.
          </p>

          <p>
            <b>Encapsulation:</b> Bundling of related properties and actions
            together is called Encapsulation. Classes can be used to bundle
            related attributes and methods.
          </p>

          <p>
            <b>Inheritance:</b> Inheritance is a mechanism by which a class
            inherits attributes and methods from another class. Prefer modeling
            with inheritance when the classes have an IS-A relationship.
          </p>

          <CodeBlock
            language="python"
            code={`class Product:
    def __init__(self, name):
        self.name = name

    def display_product_details(self):
        print("Product: {}".format(self.name))  # Product: TV
       
class ElectronicItem(Product):
    pass

e = ElectronicItem("TV")
e.display_product_details()`}
          />

          <p>
            <b>Super Class & Sub Class:</b> Superclass cannot access the methods
            and attributes of the subclass. The subclass automatically inherits
            all the attributes & methods from its superclass.
          </p>

          <CodeBlock
            language="python"
            code={`class Product:
    def __init__(self, name):
        self.name = name
    def display_product_details(self):
        print("Product: {}".format(self.name))  # Product: TV

class ElectronicItem(Product):
    def set_warranty(self, warranty_in_months):
        self.warranty_in_months = warranty_in_months

e = ElectronicItem("TV")
e.display_product_details()`}
          />

          <p>
            <b>Calling Super Class Method:</b> We can call methods defined in
            the superclass from the methods in the subclass.
          </p>

          <CodeBlock
            language="python"
            code={`class Product:
    def __init__(self, name):
        self.name = name
    def display_product_details(self):
        print("Product: {}".format(self.name))  # Product: TV

class ElectronicItem(Product):
    def set_warranty(self, warranty_in_months):
        self.warranty_in_months = warranty_in_months
    def display_electronic_product_details(self):
        self.display_product_details()

e = ElectronicItem("TV")
e.display_electronic_product_details()`}
          />

          <p>
            <b>Composition:</b> Modeling instances of one class as attributes of
            another class is called Composition. Prefer modeling with
            inheritance when the classes have an HAS-A relationship.
          </p>

          <CodeBlock
            language="python"
            code={`class Product:
    def __init__(self, name, deal_price):
        self.name = name
        self.deal_price = deal_price
    def display_product_details(self):
        print("Product: {}".format(self.name))
    def get_deal_price(self):
        return self.deal_price

class GroceryItem(Product):
    pass

class Order:
    def __init__(self):
        self.items_in_cart = []
    def add_item(self, product, quantity):
        self.items_in_cart.append((product, quantity))
    def display_order_details(self):
        for product, quantity in self.items_in_cart:
            product.display_product_details()

milk = GroceryItem("Milk", 50)
order = Order()
order.add_item(milk, 2)
order.display_order_details()`}
          />

          <p>
            <b>Overriding Methods:</b> Sometimes, we require a method in the
            instances of a sub class to behave differently from the method in
            instance of a superclass
          </p>

          <CodeBlock
            language="python"
            code={`class Product:
    def __init__(self, name):
        self.name = name
    def display_product_details(self):
        print("Superclass Method")

class ElectronicItem(Product):
    def display_product_details(self):  # same name as superclass
        print("Subclass Method")
 
e = ElectronicItem("Laptop")
e.display_product_details()  # Subclass Method`}
          />

          <p>
            <b>Accessing Super Class’s Method:</b> super() allows us to call
            methods of the superclass (Product) from the subclass. Instead of
            writing and methods to access and modify warranty we can override
            __init__.
          </p>

          <CodeBlock
            language="python"
            code={`class Product:
    def __init__(self, name):
        self.name = name
    def display_product_details(self):
        print("Product: {}".format(self.name))

class ElectronicItem(Product):
    def display_product_details(self):
        super().display_product_details()
        print("Warranty {} months".format(self.warranty_in_months))
    def set_warranty(self, warranty_in_months):
        self.warranty_in_months = warranty_in_months

e = ElectronicItem("Laptop")
e.set_warranty(10)
e.display_product_details()`}
          />

          <p>
            <b>MultiLevel Inheritance:</b> IWe can also inherit from a subclass.
            This is called MultiLevel Inheritance.
          </p>

          <CodeBlock
            language="python"
            code={`class Product:
    pass

class ElectronicItem(Product):
    pass

class Laptop(ElectronicItem):
    pass`}
          />

          <p>
            <b>Inheritance vs Composition:</b>
          </p>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1rem",
            }}
          >
            <thead>
              <tr style={{ background: "#3498db", color: "white" }}>
                <th>Inheritance</th>
                <th>Composition</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Car is a vehicle</td>
                <td>Car has a Tyre</td>
              </tr>
              <tr>
                <td>Truck is a vehicle</td>
                <td>Order has a product</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Errors & Exceptions */}
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
            color: "#e74c3c",
            borderBottom: "4px solid #e67e22",
            paddingBottom: "0.5rem",
          }}
        >
          Errors & Exceptions
        </h2>

        <div
          style={{
            background: "#f0f8ff",
            padding: "1.5rem",
            borderRadius: "10px",
            marginTop: "1.5rem",
          }}
        >
          <p>
            <b>Errors & Exceptions:</b> There are two major kinds of errors:
            <ul>
              <li>Syntax Errors</li>
              <li>Exceptions</li>
            </ul>
          </p>

          <p>
            <b>Syntax Errors:</b> Syntax errors are parsing errors which occur
            when the code is not adhering to Python Syntax.
          </p>
          <CodeBlock
            language="python"
            code={`if True print("Hello") # SyntaxError: invalid syntax`}
          />
          <p>
            When there is a syntax error, the program will not execute even if
            that part of code is not used.
          </p>

          <p>
            <b>Exceptions:</b> Errors detected during execution are called
            exceptions.
          </p>
          <p>
            Division Example: Input given by the user is not within expected
            values.
          </p>
          <CodeBlock
            language="python"
            code={`def divide(a, b):  
    return  a / b  

divide(5, 0)
# Output is:
# ZeroDivisionError: division by zero`}
          />

          <p>
            <b>Raising Exceptions:</b>
          </p>
          <CodeBlock
            language="python"
            code={`raise ValueError("Unexpected Value!!") # ValueError:Unexpected Value

def divide(x, y):
    if y == 0:
        raise ValueError("Cannot divide by zero")
    return x / y

print(divide(10, 0))  # ValueError: Cannot divide by zero`}
          />

          <p>
            <b>Handling Exceptions:</b> Exceptions can be handled with
            try-except block. Whenever an exception occurs at some line in try
            block, the execution stops at that line and jumps to except block.
          </p>
          <CodeBlock
            language="python"
            code={`try:
 # Write code that
 # might cause exceptions.
except:
 # The code to be run when
 # there is an exception.

def divide(x, y):
    try:
        result = x / y
    except TypeError:
        return "Invalid input"
    return result

print(divide(10, 5))   # 2.0
print(divide(10, "a")) # Invalid input`}
          />

          <p>
            <b>Handling Specific Exceptions:</b> We can specifically mention the
            name of exception to catch all exceptions of that specific type.
          </p>
          <CodeBlock
            language="python"
            code={`try:  
    result = 5/0
    print(result)  
except ZeroDivisionError:  
    print("Denominator can't be 0")  
except:  
    print("Unhandled Exception")
# Output is:
# Denominator can't be 0`}
          />

          <p>
            <b>Handling Multiple Exceptions:</b> We can write multiple exception
            blocks to handle different types of exceptions differently.
          </p>
          <CodeBlock
            language="python"
            code={`try:  
    result = 12/"a"
    print(result)  
except ZeroDivisionError:  
    print("Denominator can't be 0")  
except ValueError:  
    print("Input should be an integer")  
except:  
    print("Something went wrong")
# Output is:
# Denominator can't be 0`}
          />
        </div>
      </section>

      {/* Working With Dates & Times */}
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
            color: "#2c3e50",
            borderBottom: "4px solid #3498db",
            paddingBottom: "0.5rem",
          }}
        >
          Working With Dates & Times
        </h2>

        <div
          style={{
            background: "#f0f8ff",
            padding: "1.5rem",
            borderRadius: "10px",
            marginTop: "1.5rem",
          }}
        >
          <p>
            <b>Datetime:</b> Python has a built-in datetime module which
            provides convenient objects to work with dates and times.
          </p>
          <CodeBlock language="python" code={`import datetime`} />

          <p>
            <b>Datetime classes:</b> Commonly used classes in the datetime
            module are:
          </p>
          <ul>
            <li>date class</li>
            <li>time class</li>
            <li>datetime class</li>
            <li>timedelta class</li>
          </ul>

          <p>
            <b>Representing Date:</b> A date object can be used to represent any
            valid date (year, month and day).
          </p>
          <CodeBlock
            language="python"
            code={`import datetime

date_object = datetime.date(2022, 12, 17)
print(date_object) # 2022-12-17`}
          />

          <p>
            <b>Attributes of Date Object:</b>
          </p>
          <CodeBlock
            language="python"
            code={`from datetime import date

date_object = date(2019, 4, 13)
print(date_object.year)  # 2019
print(date_object.month) # 4
print(date_object.day)   # 13`}
          />

          <p>
            <b>Today’s Date:</b> Class method today() returns a date object with
            today’s date.
          </p>
          <CodeBlock
            language="python"
            code={`import datetime

date_object = datetime.date.today()
print(date_object) # 2022-12-17`}
          />

          <p>
            <b>Representing Time:</b> A time object can be used to represent any
            valid time (hours, minutes and seconds).
          </p>
          <CodeBlock
            language="python"
            code={`from datetime import time

time_object = time(11, 34, 56)
print(time_object) # 11:34:56`}
          />

          <p>
            <b>Attributes of Time Object:</b>
          </p>
          <CodeBlock
            language="python"
            code={`from datetime import time

time_object = time(11, 34, 56)
print(time_object.hour)   # 11
print(time_object.minute) # 34
print(time_object.second) # 56`}
          />

          <p>
            <b>Datetime:</b> The datetime class represents a valid date and time
            together.
          </p>
          <CodeBlock
            language="python"
            code={`from datetime import datetime

date_time_obj = datetime(2018, 11, 28, 10, 15, 26)
print(date_time_obj.year)   # 2018
print(date_time_obj.month)  # 11
print(date_time_obj.hour)   # 10
print(date_time_obj.minute) # 15`}
          />

          <p>
            <b>Timedelta:</b> Timedelta object represents duration.
          </p>
          <CodeBlock
            language="python"
            code={`from datetime import timedelta

delta = timedelta(days=365, hours=4)
print(delta) # 365 days, 4:00:00`}
          />

          <p>
            <b>Calculating Time Difference:</b>
          </p>
          <CodeBlock
            language="python"
            code={`import datetime

dt1 = datetime.datetime(2021, 2, 5)
dt2 = datetime.datetime(2022, 1, 1)
duration = dt2 - dt1
print(duration)        # 330 days, 0:00:00
print(type(duration))  # <class 'datetime.timedelta'>`}
          />

          <p>
            <b>Formatting Datetime:</b> The datetime classes have
            strftime(format) method to format the datetime into any required
            format.
          </p>
          <CodeBlock
            language="python"
            code={`from datetime import datetime

now = datetime.now()
formatted_datetime_1 = now.strftime("%d %b %Y %I:%M:%S %p")
print(formatted_datetime_1) # 05 Feb 2021 09:26:50 AM

formatted_datetime_2 = now.strftime("%d/%m/%Y, %H:%M:%S")
print(formatted_datetime_2) # 05/02/2021, 09:26:50`}
          />

          <p>
            <b>Parsing Datetime:</b> The class method strptime() creates a
            datetime object from a given string representing date and time.
          </p>
          <CodeBlock
            language="python"
            code={`from datetime import datetime

date_string = "28 November, 2018"
print(date_string) # 28 November, 2018

date_object = datetime.strptime(date_string, "%d %B, %Y")
print(date_object) # 2018-11-28 00:00:00`}
          />
        </div>
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
