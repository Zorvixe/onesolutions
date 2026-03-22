import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const ReactJs_Practice_Set_4 = ({
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
      <h2> Practice Set - 4</h2>
      <h2>Practice the popular interview questions in ReactJs using ZorMock.</h2>

    <section>
      <div>
        <h3>1. What is children prop in react?</h3>
        <p>Its a special prop that allows a parent component pass components or elements as content to a child component. It enables to create more generic and reusable components in react</p>
        <h3>2. What is API integration?</h3>
        <p>API stands for Application Programming Interfaces API integration in frontend development typically involves making HTTP requests to backend server APIs, parsing the response and using the data in the application.</p>
        <h3>3. Why react is faster than Javascript?</h3>
        <p>React is designed to optimize website performance by using Virtual DOM, which updates only what is necessary, thus reducing the number of actual DOM manipulations. This, along with other optimization techniques like grouping or batching updates and using reusable components, can make React based applications faster and more efficient than JavaScript applications.</p>
        <h3>4. What are the differences between React JS and JavaScript?</h3>
        <p>JavaScript is a language used for building both frontend and backend applications While React is a popular library built on top of javascript specifically designed for building frontend applications</p>
        <h3>5. What is a Multi page application?</h3>
        <p>A multi page web application has different pages, with each page being a separate HTML document. When a user interacts with the app, like clicking a link or submitting a form, the browser requests the server for a new HTML document, which makes the whole page refresh.</p>
        <h3>6. Why React instead of Angular?</h3>
        <p>React is JS library focused on building UI components, making it easier to learn and integrate with other libraries. Additionally, React has a large community and ecosystem, providing numerous resources and third party libraries. However, choosing between React and Angular ultimately depends on your projects specific needs and your familiarity with them.</p>
        <h3>7. What is React.createClass?</h3>
        <p>React.createClass was a method that returns a class component in earlier versions of react, but it has been replaced by the ES6 class syntax.</p>
        <h3>8. What are the differences between React JS and Node JS?</h3>
        <p>React JS is a JavaScript library used for building frontend web applications, while Node JS is a runtime environment that allows you to run JavaScript on the server side. It is used for building backend web applications</p>
        <h3>9. Why shouldnt we modify the state directly?</h3>
        <p>Modifying state directly in React can cause unexpected results like component not getting updated correctly Using relevant methods like setState or useState makes React keep track of the changes and ensure that components update correctly</p>
        <h3>10. Why is the key prop important for list elements in React?</h3>
        <p>When rendering a list of elements, React needs a way to identify which elements have been changed, added or removed. And for that React uses key prop to identify each element in a list of elements.</p>
        <h3>11. What is React JS used for?</h3>
        <p>React JS is a popular JavaScript library used for building frontend applications. Its advantages include improved performance through virtual DOM, reusable components for easier development, and a one way data flow for better state management.</p>
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

export default ReactJs_Practice_Set_4
