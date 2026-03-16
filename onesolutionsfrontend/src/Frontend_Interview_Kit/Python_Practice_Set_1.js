import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CodeBlock, OutputBlock } from "../CodeOutputBlocks";
const Python_Practice_Set_1 = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
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
      <h2>Python Practice Set - 1</h2>
      <h2>Practice the popular interview questions in Python using NxtMock.</h2>

    <section>
      <h3>1. What is a Dictionary?</h3>
      <p>A dictionary in Python is an unordered collection of data stored as key-value pairs. Keys are unique and used to access values. They are defined within curly braces <code>{"{}"}</code>, with items separated by commas and key-value pairs connected by a colon. Dictionary is mutable, it basically allows addition, removal, or modification of elements.</p>
      <h3>2. What is a list?</h3>
      <p>A list in Python is an ordered collection of items, and these items can be of different data types. You can basically define a list by enclosing the items in square brackets <code>{"[]"}</code>, separated by commas. It is mutable, which means the items can be added, removed, or changed.</p>
      <h3>3. What is a Tuple?</h3>
      <p>A Tuple in Python is an ordered collection of items, which can be of different data types. Tuples are immutable, which means once a tuple is created,you can't change its items . You can create a tuple by enclosing items in paranthesis <code>{"()"}</code>, separated by commas.</p>
      <h3>4. What is a Set?</h3>
      <p>A set in Python is an unordered collection of unique items. Sets are mutable, which means items can be added or removed. However, unlike lists, sets don't support indexing or slicing. You can define a Set by enclosing items in curly brackets <code>{"{}"}</code>, separated by commas.</p>
      <h3>5. What is an Object in Python?</h3>
      <p>In Python, an object is anything that can be stored in a variable, Example strings, integers, floats, lists, and more.</p>
      <h3>6. What is a String?</h3>
      <p>A string in python is a sequence of char enclosed by single or double quotes in general. strings are immutable, which means you cannot change the content of a string after it has been created." A string in Python is a sequence of characters. It is immutable which its contents can't be changed after creation. You can define a string by enclosing characters in quotes, either single <code>{"(' ')"}</code> or double (" ")</p>
      <h3>7. What is Negative Indexing?</h3>
      <p>Negative indexing in Python allows accessing elements from the end of a list, tuple, or string, when you dont know their length. The index of <code>-1</code> refers to the last item, <code>-2</code> to the second last, and so on and so forth.</p>
      <h3>8. What is a Recursion?</h3>
      <p>Recursion is a programming technique where a function calls itself. This process continues until a base condition is met. It is generally used when a problem can be broken down into smaller, similar problems, like fibonnaci series, etc</p>
      <h3>9. What are the differences between List and Tuple?</h3>
      <p>In Python, both lists and tuples are ordered collections of elements. The key differences are: Lists are mutable, which means you can modify the items in a list, where on the other hand tuples are immutable, which means you cannot modify the items in a tuple. Lists are defined using square <code>brackets[]</code>, where as tuples use <code>parentheses()</code>. optional: Lists have several built-in methods for modification like <code>append(), extend(), insert(), remove()</code>, etc. As tuples are immutable, they do not have these methods. Tuples can be used as dictionary keys, while lists cannot.</p>
      <h3>10. Explain a few List Methods?</h3>
      <p>List has several methods in Python. Some of them are: append: Adds a given item to the end of the list count: Returns the number of times, the given item appears in the list remove: Removes the first occurance of the given item index: Returns the index of the first occurrence of given item. Raises ValueError if not found. (optional)</p>
      <h3>11. What are Data Types in Python?</h3>
      <p>Data types are labels we assign to variables in programming, signifying what kind of values they can hold.<br/>
       <b>For example,</b> in Python, 'int' is a data type for integers, 'float' for decimal numbers, 'str' for text, and 'bool' for true/false.</p>
       <h3>12. What are the Data Structures in Python?</h3>
       <p>Data Structures allow us to store and organize data efficiently. This will allow us to easily access and perform operations on the data. Some of the commonly used built-in data structures in Python are, List Tuple Set Dictionary</p>
       <h3>13. What are Functions in Python?</h3>
       <p>Functions in Python are reusable blocks of code that perform a specific action. They help break down complex programs into smaller, manageable parts. You define them with the 'def' keyword. A simple function might look like this: </p>
         <CodeBlock
  language="python"
  code={`def greet(name):
    return "Hello, " + name`}
/>
<p>Here 'greet' is the function name, 'name' is the input parameter, and it returns a greeting. You would call it with greet('John'), and it would return 'Hello, John'.</p>
       <h3>14. Is Python case-sensitive?</h3>
       <p>Yes, Python is case-sensitive, which means it treats uppercase and lowercase letters as different.<br/> <b>For example,</b> if you name a variable "result" in your code, and later write "Result", Python won't recognize it as the same thing. So, always use the same case when referring to the same thing in Python.</p>
       <h3>15. What is a Software?</h3>
       <p>Software is a set of instructions that tells a hardware how to perform tasks. It can be applications like simple calculator, games, or operating systems like Windows, etc. Software interacts with hardware, enabling users to perform actions like writing documents or browsing the web.</p>
       <h3>16. What are the differences between the mutable and immutable data types?</h3>
       <p>Immutable data types cannot be changed after creation, are suitable for dictionary keys, and reduce potential errors. Examples include int, float, str, and tuple. Mutable data types can be modified after creation. Examples include list, dict, and set. They are efficient but require careful execution to prevent errors.</p>
       <h3>17. What is a Lambda function and what is the main purpose of it?</h3>
       <p>A Lambda function in Python is a small, anonymous function that can take any number of arguments but can only have one expression. Its main purpose is to create a function for short, temporary operations without formally defining it using the 'def' keyword.</p>
       <h3>18. What are generators in Python and what are their uses?</h3>
       <p>A Python generator is a function that returns an iterable set of items, one at a time. It is created using yield instead of return. Instead of returning a single value, it produces a stream of values. It is ideal for producing large sequences without storing them entirely in memory and for reading large files in chunks, rather than loading everything at once.</p>
       <h3>19. What are Decorators in python?</h3>
       <p>In Python, decorators are a way to modify or extend the behavior of functions without changing their code. Decorators let us add extra things to functions and treat them just like any other object, like numbers or strings. Using decorators we can pass functions as arguments, return them from other functions, or even change them.</p>
       <h3>20. What is the difference between Shallow Copy and Deep Copy?</h3>
       <p>A shallow copy duplicates the outer object but references inner objects, making it partly dependent on the original. In contrast, a deep copy replicates both outer and inner objects, ensuring total independence from the original.</p>
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

export default Python_Practice_Set_1
