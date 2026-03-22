import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Python_Practice_Set_4 = ({
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
      <h2>Python Practice Set - 4</h2>
      <h2>Practice the popular interview questions in Python using ZorMock.</h2>

    <section>
      <h3>1. Are Tuples mutable?</h3>
      <p>No, Tuples are immutable. This means that once a tuple is created, you can't change its items.</p>
      <h3>2. What are the numeric data types in Python?</h3>
      <p>Some of the numeric data types in Python are:<br/><ul>
        <li>int (for integers)</li>
        <li>float (for numbers with decimal points)</li>
        <li>complex (for numbers with real and imaginary component)</li>
        </ul></p>
      <h3>3. What is type conversion or type casting?</h3>
      <p>Type conversion, or type casting, is the process of converting one data type to another.<br/>
       Python supports two types of type conversion:<br/>
        <ul>
          <li>Implicit conversion in Python auto-converts data types during operations, like arithmetic, etc.</li>
          <li>Explicit conversion is manually done by programmers using specific functions like int, float etc.</li>
          </ul></p>
      <h3>4. Why Python stands out as a programming language?</h3>
      <p>Python stands out for its simple syntax, readability, and ease of learning, making it great for beginners. Its robust standard library and numerous packages facilitate diverse applications, from web development to data science.</p>
      <h3>5. What is the naming convention of class in python?</h3>
      <p>In Python, class names typically follow the Pascal convention. This means that the first letter of each word is capitalized and there are no underscores between words.<br/> For example, a class named <code>"CarModel"</code> followed this naming convention.</p>
      <h3>6. What is numpy?</h3>
      <p>NumPy is a powerful Python library for numerical computations. It provides support for large, multi-dimensional arrays, along with a comprehensive collection of mathematical functions specifically designed for these arrays. NumPy is widely used in scientific computing, engineering, and data analysis.</p>
      <h3>7. What is pandas?</h3>
      <p>Pandas is a powerful Python library for data manipulation and analysis. It offers data structures like Series and DataFrame to handle one-dimensional and multi-dimensional data, enabling tasks such as cleaning, transforming, and analyzing data efficiently.</p>
      <h3>8. What is generator?</h3>
      <p>A Python generator is a special function that returns an iterable set of items, one at a time. Created using <code>'yield'</code> instead of <code>'return'</code>, it saves memory as it produces items only when required, perfect for large data sets.</p>
      <h3>9. What is a decorator?</h3>
      <p>A <code>decorator</code> in Python is a function that wraps around another function or class, enabling the modification of its behavior. It provides a way to add functionality or alter inputs and outputs.</p>
      <h3>10. How do we use Asterisk in Python?</h3>
      <p>In Python, the asterisk <code>{"*"}</code> can be used for arithmetic multiplication and list repetition. Additionally, it can unpack elements from an iterable into positional arguments in a function call.</p>
      <h3>11. How can you convert a list to a set in Python?</h3>
      <p>Use the <code>set()</code> function in Python to convert a list to a set, which will remove duplicate elements and create a new set.</p>
      <h3>12. What is the use of sleep function?</h3>
      <p>The sleep function introduces a pause or delay in program execution, allowing it to temporarily stop for a specified period of time. It is used for timing events, controlling code flow, or simulating real-time behavior.</p>
      <h3>13. What are the prerequisites for binary search?</h3>
      <p>The prerequisites for binary search are a sorted array and a target element.</p>
      <h3>14. Explain the approach of binary search.</h3>
      <p>Binary search finds a target in a sorted array by comparing it to the middle element. If they match, the target is found. Otherwise, the search continues in the lower half if the target is less than the middle element or upper half if the target is greater, narrowing the range until the target is found or the range is empty.</p>
      <h3>15. What is the difference between a tuple and a dictionary?</h3>
      <p>A tuple is an ordered, immutable collection where elements are accessed via index. A dictionary is an unordered, mutable collection where items are accessed using keys.</p>
      <h3>16. Why do we use tuples, and what is their purpose?</h3>
      <p>Tuples are used to store ordered collections of items that should remain unchangeable. This immutability is useful in various scenarios, where data should not be changed, such as when using them as dictionary keys and storing constants.</p>
      <h3>17. What is OOPs?</h3>
      <p>Object-Oriented Programming (OOP) is a method for designing and developing software where the components and their interactions resemble real-life objects and relationships. Using OOP concepts correctly leads to organized systems that are easy to use and extend.</p>
      <h3>18. How do you define a class in Python?</h3>
      <p>In Python, a class is defined using the class keyword, followed by its name and a colon. Inside the class, attributes and methods can be declared to define its properties and behaviors.</p>
      <h3>19. What is a Dictionary?</h3>
      <p>A <code>dictionary</code> in Python is an unordered collection where data is stored as key-value pairs.</p>
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

export default Python_Practice_Set_4
