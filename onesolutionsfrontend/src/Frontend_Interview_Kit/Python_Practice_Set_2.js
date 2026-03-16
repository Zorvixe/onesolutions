import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Python_Practice_Set_2 =  ({
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
      <h2>Python Practice Set - 2</h2>
      <h2>Practice the popular interview questions in Python using NxtMock.</h2>

    <section>
      <h3>1. What are conditional statements in Python?</h3>
      <p>The Conditional Statements allow you to execute a block of code based on certain conditions.<br/> The conditional statements in Python are:<br/> 1. `if` statement <br/>2. `if ... else` statement<br/> 3.` if...elif...else` statement</p>
      <h3>2. What is the use of while loop?</h3>
      <p>While loop is used to execute a block of code several times as long as the condition is True. It's useful for tasks requiring continuous checks, like iterating through sequences until a specific condition is met, etc.</p>
      <h3>3. What is the use of for loop?</h3>
      <p>A for loop in Python is used to iterate over a sequence, such as a list, tuple, dictionary, string, or set. It's used when you want to execute a particular block of code for a specific number of times or for each item in a sequence.</p>
      <h3>4. How to reverse a List in Python?</h3>
      <p>Two common ways to reverse a list in python are: The first way is to use the <code>reverse()</code> method, which modifies the original list by reversing its order. The second way is list slicing with a negative step <code>-1</code>, which returns a new reversed list without modifying the original list.</p>
      <h3>5. What are Loops?</h3>
      <p>Loops allow us to execute a block of code several times. Different types of loops in Python are: While Loop, For Loop, and do-while</p>
      <h3>6. What is List Slicing?</h3>
      <p>List slicing is used to obtain parts of a list by specifying a range of indices. It uses the given <code>syntax `list[start:end:step]`</code> where start indicates the beginning index of the slice, end is the last index but isn't included in the slice, and step defines the increment between indices. By default, start is set to 0, end is set to the length of string, and step is set to 1.</p>
      <h3>7. What is String Slicing?</h3>
      <p>String slicing is used to obtain parts of a string by specifying a range of indices. It uses the given <code>syntax `string[start:end:step]`</code> where start indicates the beginning index of the slice, end is the last index but isn't included in the slice, and step defines the increment between indices. By default, start is set to 0, end is set to the length of string, and step is set to 1.</p>
      <h3>8. What are Modules in Python?</h3>
      <p>In Python, a module is a file with Python code that groups related code for better readability and reusability. It can contain functions, classes, and variables that you can import into other scripts. Python provides standard modules like <code>'math'</code> and <code>'datetime'</code>. You can also create your own modules for reusing code across different programs.</p>
      <h3>9. What are Namespaces?</h3>
      <p>In Python, a namespace is a system ensuring all names in a program are unique and conflict-free. Namespaces are like dictionaries, where keys are names and values are objects. It prevents naming conflicts, especially in large applications, by allowing the same name to refer to different objects in different namespaces such as a variable named <code>"word"</code> being defined both outside and inside a function.</p>
      <h3>10. What are the features of Python?</h3>
      <p>Some of the key features of Python are:<br/> 1. <b>Readability</b>: easy-to-understand syntax similar to English, making it beginner-friendly.<br/> 2. <b>Dynamic Typing</b>: Automatic type assignment to variables, simplifying coding.<br/> 3. <b>Standard Library</b>: A robust collection of built-in modules for diverse tasks, minimizing extra coding.<br/> 4. <b>Frameworks and Tools</b>: Large ecosystem including Django for web, pandas for data analysis, enhancing Python's application reach.<br/> 5. <b>Multiparadigm</b>: Supports procedural, object-oriented, and functional programming, offering versatility.</p>
      <h3>11. Is Python a dynamically typed programming language?</h3>
      <p>Yes, Python is a dynamically typed programming language. This means that you don't need to declare the variable type when creating it. Python determines the type automatically when a value is assigned, and this type can be changed by assigning a value of a different type.</p>
      <h3>12. What is Python and what are its applications?</h3>
      <p>Python is an <code>easy-to-understand</code>, <code>high-level language</code>. It supports different programming styles like object-oriented, procedural, where there are step-by-step instructions, and functional, where focused on functions. Its versatility enables applications in diverse fields including AI, machine learning, big data, IoT, cybersecurity, game development, and backend web development, etc</p>
      <h3>13. What are range() and xrange() functions?</h3>
      <p>In Python, <code>range</code> function is used to generate a sequence of numbers, often used in loops. It takes three arguments: <code>start, stop,</code> and <code>step</code>, determining the sequence's beginning, end, and increment.<br/> In older Python 2, <code>xrange()</code> was similar but more memory efficient for big ranges.<br/> However, in Python 3, <code>range()</code> does the same and <code>xrange()</code> is no longer used.</p>
      <h3>14. How to reverse a string?</h3>
      <p>To reverse a string in Python, use slicing with the step parameter as <code>-1</code>.</p>
      <h3>15. What is a Scope?</h3>
      <p>Scope in Python refers to the region where a variable is accessible. There are two main types: local and global scope. <br/><code>Local</code> scope means a variable is accessible only in its function.<br/> <code>Global</code> scope means a variable can be accessed anywhere in the code.</p>
      <h3>16. What is numpy and pandas?</h3>
      <p>NumPy and Pandas are essential Python libraries widely used in data analysis and scientific computing. NumPy specializes in offering mathematical operations on multi-dimensional arrays and matrices, benefiting from a robust community and extensive documentation. On top of NumPy, Pandas provides functionalities for data manipulation and analysis, offering data structures for efficient data handling, cleaning, and transformation. Understanding these libraries is foundational in Python programming for data sciences.</p>
      <h3>17. How much do you rate yourself in python?</h3>
      <p>I'd rate myself 6 out of 10 in Python. I have grasped fundamental concepts such as variables, data types, and data structures, including lists, tuples, sets, and dictionaries, along with a few concepts from object-oriented programming (OOP). I have improved my problem-solving skills through consistent practice and solving numerous problems. Currently, I am focusing on further developing these skills by working with various libraries such as Pandas and NumPy.</p>
      <h3>18. What is a Tree data structure?</h3>
      <p>A tree data structure is a non-linear data structure that is used to represent <code>hierarchical relationships</code>. It starts with a root node and branches out into child nodes, forming a tree-like structure. Each node can have zero or more child nodes, and it is used to represent hierarchical relationships and organize data efficiently.</p>
      <h3>19. What are data structures?</h3>
      <p>Data structures are essential tools to organize and manage data effectively in computer programs. These structures allow for efficient data storage, access, and manipulation. Common data structures include arrays, sets, dictionaries.</p>
      <h3>20. What is the binary search algorithm and how does it work?</h3>
      <p>Binary search is an efficient algorithm used to find a <code>specific value</code> in a sorted list or array. It works by repeatedly dividing the search range in half and comparing the middle element to the target value. If they match, the search is successful. If not, it narrows down the search to the appropriate half. This process continues until the target is found or the search range is empty, making it a highly effective way to locate items in sorted data sets.</p>
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

export default Python_Practice_Set_2
