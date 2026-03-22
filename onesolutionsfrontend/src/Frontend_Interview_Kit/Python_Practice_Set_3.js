import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Python_Practice_Set_3 = ({
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
      <h2>Python Practice Set - 3</h2>
      <h2>Practice the popular interview questions in Python using ZorMock.</h2>

    <section>
      <h3>1. What is a Package in Python?</h3>
      <p>A package in Python is a directory containing Python files, or related modules. It helps to organize your code and avoid name clashes.<br/> It contains an <code>__init__.py</code> file, to treat the directory as a package in Python.<br/> Some of the packages are: <code>numpy, pandas,</code> etc</p>
      <h3>2. How to Handle Exceptions in Python?</h3>
      <p>In Python, exceptions are handled using <code>"try"</code> and <code>"except"</code> blocks. Code that might cause an error goes in the "try" block. If an error occurs, the "except" block runs. You can also specify the error type to handle, like ValueError, by specifying it after "except".</p>
      <h3>3. How to create a do-while loop in python?</h3>
      <p>A <code>"do-while"</code> loop runs code at least once, then keeps running it while a condition is true. Python doesn't have a built-in "do-while" loop, but you can mimic it using a "while" loop with condition as "True". Within this loop, add your code, then an "if" statement to break the loop if a condition isn't met.</p>
      <h3>4. What is Inheritance?</h3>
      <p>Inheritance, a key concept in OOPS, is a mechanism by which a class inherits attributes and methods from another class. The class whose attributes and methods are inherited is known as the Super Class/ Base Class/ Parent Class. And the class that inherits the attributes and methods from the parent class is the Sub <code>Class/Derived</code> <code>Class/Child</code> Class.</p>
      <h3>5. What is OOPs?</h3>
      <p>Object-Oriented Programming is a way of approaching, designing and developing software, that uses <code>"objects"</code>. An object represents a real-world entity like a person or a car, and has attributes and behaviors. OOP helps in creating well-structured, reusable code, making it easier to develop and maintain software.</p>
      <h3>6. What is Encapsulation?</h3>
      <p>Encapsulation, a key concept in OOPs, is the practice of hiding data details and providing a clear interface for object interaction. It bundles the data and the methods that use the data within one unit, a class. This restricts direct access to data, increasing security and integrity.</p>
      <h3>7. What is __init__ / constructor in Python?</h3>
      <p>In Python, the __init__ method is automatically called when a class object is created. Its main job is to initialize the object's attributes.</p>
      <h3>8. What is a class?</h3>
      <p>A class is a blueprint for creating objects. It is defined using the class keyword. It can be used to bundle related attributes and methods, which can be inherited by objects created from class, thereby promoting code reusability and encapsulation in object-oriented programming.</p>
      <h3>9. What is Method Overriding?</h3>
      <p>Method overriding is a key concept in Object-Oriented Programming and Inheritance. It allows a child class to override the method inherited from the parent class. This is achieved by redefining the method in the child class with the same name, parameters, and return type as in the parent class.</p>
      <h3>10. What is self in OOPs?</h3>
      <p>In Python, <code>'self'</code> refers to the class object and is used for accessing and modifying the object's attributes, as well as calling its methods. Although 'self' is not a Python keyword, it's a widely accepted convention in object-oriented programming, enhancing readability and consistency in code.</p>
      <h3>11. What are the types of Inheritance?</h3>
      <p>In Python, there are several types of inheritance: Single Inheritance Multiple Inheritance Multilevel Inheritance Hierarchical Inheritance Hybrid Inheritance:</p>
      <h3>12. What are OOPs Concepts?</h3>
      <p>Four main concepts in OOPs are Encapsulation Inheritance Polymorphism Abstraction</p>
      <h3>13. What are OOPs Principles?</h3>
      <p>Four major principles in OOPs are:<br/> <b>Encapsulation</b>: Binding data and methods into a single unit (class) while hiding internal details.<br/> <b>Inheritance</b>: Acquiring properties and methods from a parent class to promote code reuse.<br/> <b>Polymorphism</b>: Using methods or operators in multiple ways, often through method overriding or method overloading.<br/> <b>Abstraction</b>: Exposing only relevant information and hiding unnecessary details to simplify complex systems.</p>
      <h3>14. What is meant by mutability and name some mutable data types in Python?</h3>
      <p>Mutablity means capable of being changed. In Python, objects whose value can be changed are said to be mutable. Some of the mutable data types in Python are list, dictionary, set and user-defined classes.</p>
      <h3>15. What is meant by immutability and name some immutable data types in Python?</h3>
      <p>Immutablity means capable of not being changed. In Python, objects whose value cannot be changed are said to be immutable. Some of the immutable data types in Python are tuple, integer, boolean, string, etc.</p>
      <h3>16. What is the main difference between linear and non-linear data structures?</h3>
      <p>The main difference is how elements are arranged and accessed.<br/> In linear data structures, elements are arranged sequentially and accessed in a linear order.<br/> In non-linear data structures, elements are not in sequence and can be accessed in multiple ways.</p>
      <h3>17. What is the main difference between a list and a set in Python?</h3>
      <p>The main difference is that lists are ordered and allow duplicate elements, while sets are unordered and don't allow duplicates.</p>
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

export default Python_Practice_Set_3
