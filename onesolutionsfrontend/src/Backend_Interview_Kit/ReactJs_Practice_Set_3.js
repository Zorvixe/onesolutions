import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const ReactJs_Practice_Set_3 = ({
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
      <h2> Practice Set - 3</h2>
      <h2>Practice the popular interview questions in ReactJs using ZorMock.</h2>

    <section>
      <div>
        <h3>1. What are stateless Components in react ?</h3>
        <p>Stateless components in React <code>don't have their own state</code> These components obtain data and functionality from parent components via props. Their primary use is to construct presentation elements that do not require state management or user interaction handling</p>
        <h3>2. What is the extends keyword in React Class Component?</h3>
        <p>Extends keyword is used to <code>inherit properties and methods</code> from the base React.Component class. This allows the component to manage state, handle lifecycle events, and render JSX elements to the browser</p>
        <h3>3. What are the differences between props and state?</h3>
        <p>Props are typically used for <code>passing data</code> from a parent component to a child component, while state is used to manage data that changes over time within a component. Props are immutable and cannot be changed, while state can be changed.</p>
        <h3>4. What is Prop Drilling in React?</h3>
        <p>Its a process in which you <code>pass props</code> from a parent component through multiple layers of child components, even if intermediate components don't need props but only help in passing. This can make the code more complex and hard to maintain. To avoid prop drilling, you can use context, higher order components, or state management libraries like Redux.</p>
        <h3>5. What is meant by In React, everything is a component?</h3>
        <p>In React, everything is a component means that the entire frontend application is built using modular, reusable pieces called components. Each component is responsible for a specific part of the application and can be combined with other components to create complex, interactive frontend applications. (or) In React, everything is a component means that the entire frontend application is built by combining reusable, self contained building blocks called components.</p>
        <h3>6. When will we use the componentDidMount method?</h3>
        <p>It is used to do operations on the components after the <code>initial render</code>. This method is commonly used for tasks such as fetching data from APIs or setting up timers</p>
        <h3>7. What is meant by REST APIs?</h3>
        <p>REST stands for <code>Representational State Transfer</code>. It enables communication between systems by using HTTP methods such as GET, POST, PUT, and DELETE. REST APIs work with resources, which are identified by unique URLs.</p>
        <h3>8. What are the differences between Cookies and Local Storage?</h3>
        <p>Let dive into it. Cookies and Local Storage are both client side storage mechanisms. Cookies can store <code>small amounts of data</code> and are sent to the server with each HTTP request, making them suitable for maintaining user preferences. They have an expiration time. Local Storage, on the other hand can <code>store large amounts of data</code> in browser. It doesn't have built in expiration time and is only accessible through client side JavaScript.</p>
        <h3>9. Which directory is used to save the React Components?</h3>
        <p>In a typical React project created with tools like Create React App, the components are usually saved in the src or components directory.</p>
        <h3>10. How do we pass a property from a parent component to a child component?</h3>
        <p>Through Props</p>
        <h3>11. What are controlled and uncontrolled Components in React?</h3>
        <p>In React, controlled and uncontrolled components refer to two different ways of managing form data. In a controlled component, the component <code>itself manages</code> the form data using its state or props. In an Uncontrolled Components, form data is managed by the <code>browser</code> instead of a React Component.</p>
        <h3>12. What is React Context?</h3>
        <p>It is a way to <code>share data</code> between components without needing to pass the data via props. It's helpful when you want to share data with many components at various levels in your application.</p>
      </div>
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

export default ReactJs_Practice_Set_3
