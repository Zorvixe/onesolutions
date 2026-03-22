import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const ReactJs_Practice_Set_2 = ({
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
      <h2> Practice Set - 2</h2>
      <h2>Practice the popular interview questions in ReactJs using ZorMock.</h2>

    <section>
      
    <div>
       <h3>1. What are Styled Components in React?</h3>
       <p>Styled Components is a popular library for <code>styling</code> React applications. It allows developers to write CSS code with in JS file and tie the styles directly to React components. This approach is often termed as CSS in JS.</p>
       <h3>2. Explain the use of Webpack and Babel in ReactJS?</h3>
       <p>When building ReactJS application, we usually write our code in multiple files (components, styles, etc.). Webpack combines all of them into a <code>single</code>, optimized file and this process is called bundling Browsers are not capable of understanding JSX. By using Babel, we can <code>convert JSX into JS</code> that browsers can understand</p>
       <h3>3. Are cookies stored on server side?</h3>
       <p><code>No</code>, Cookies are stored on the <code>client side</code>, within the user's web browser They allow servers to recognize and track users by sending and receiving cookie data in HTTP requests.</p>
       <h3>4. What is browser DOM?</h3>
       <p>Browser DOM is usually referred to as DOM. DOM means <code>Document Object Model</code>. A web page's HTML is like a tree, with different branches representing elements like paragraphs, images, and headings. DOM represents this tree like structure of the HTML document DOM makes it easier for developers to change the contents, style, and behavior of the web page using JavaScript</p>
       <h3>5. What is single page application?</h3>
       <p>A Single Page Application is a web application that dynamically updates content within a single HTML page <code>without full page reloads</code> It provides a smooth and seamless user experience</p>
       <h3>6. What is a React Fragment?</h3>
       <p>A React Fragment is a lightweight wrapper for <code>grouping elements</code> in a React component without adding extra nodes to the DOM It is useful for maintaining a cleaner and more semantical HTML structure.</p>
       <h3>7. What is the purpose of render() in React?</h3>
       <p>The render method in React class components specifies the <code>JSX to be displayed</code> in the browser. It's a built in method that's automatically called when the component is created or when its state/props change.</p>
       <h3>8. What is meant by React JSX?</h3>
       <p>Its a syntax that simplifies creating react elements by allowing HTML like code in JavaScript, making the code easier to read and understand.</p>
       <h3>9. What is a state in React?</h3>
       <p>state is a JS object in which we store the component's data that <code>changes over time</code>. When the state object changes, the component re renders.</p>
       <h3>10. How many elements does a React component returns?</h3>
       <p>A React Component can only return <code>one</code> element, but by using a React Fragment we can group multiple elements together and then return them.</p>
       <h3>11. What is an Event in React?</h3>
       <p>A event in React is an <code>action</code>, such as a user clicking a button, hovering over an element, or submitting a form. React allows you to respond to these events by attaching event handlers that run when the event occurs.</p>
       <h3>12. What is the Context API or React Context?</h3>
       <p>The Context API in React enables sharing of state and functions across components without prop drilling.</p>
       <h3>13. What is a React Fragment?</h3>
       <p>A React Fragment is an alternate way to return a single JSX element. It groups a list of children without adding extra nodes to the DOM.</p>
       <h3>14. What is meant by React JSX?</h3>
       <p>React JSX is a new HTML-like syntax introduced by React JS to create elements. React converts JSX elements to JS code to create elements.</p>
       <h3>15. What is meant by React JS props?</h3>
       <p>Props stands for Properties. React allows <code>passing information</code> to a component using props. Props can be passed to components as attributes for the elements. Components accept props as parameters and can access them.</p>
       <h3>16. What are the Lifecycle methods of React?</h3>
       <p>The React lifecycle methods are as follows, <code>"componentDidMount"</code>, which is used for network requests after the first render. <code>"componentDidUpdate"</code>, which performs tasks after component updates. <code>"componentWillUnmount"</code>, which handles cleanup before component removal.</p>
       <h3>17. What is react-router explain?</h3>
       <p>React Router is a library used in React applications for managing <code>navigation</code> between routes. It ensures the user interface is synchronized with the browser's URL.</p>
       <h3>18. How do you filter a list of values in React?</h3>
       <p>To filter a list in React, use the <code>filter</code> method on the list. It creates a new list with elements meeting the criteria, without changing the original one.</p>
       <h3>19. How do you send data to a child component?</h3>
       <p>We can send the data to the child component <code>using props</code>.</p>
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

export default ReactJs_Practice_Set_2
