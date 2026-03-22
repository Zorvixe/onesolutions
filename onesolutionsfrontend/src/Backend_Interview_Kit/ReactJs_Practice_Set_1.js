
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";


const ReactJs_Practice_Set_1 = ({
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
      <h2> Practice Set - 1</h2>
      <h2>Practice the popular interview questions in ReactJs using ZorMock.</h2>

    <section>
      
    <div>
      <h3>1. Can browsers understand JSX?</h3>
      <p><code>No</code>, Browsers are capable of understanding HTML, CSS and JS There is a tool called babel which converts JSX in to JS which is understood by browser</p>
      <h3>2. What is a Component in React?</h3>
      <p>A component represents a s<code>ection of a webpage</code>, such as the header, body or footer When developing React applications, we create individual components for each section The key advantage is they're reusable across multiple webpages.</p>
      <h3>3. Why should a component name start with uppercase letter in React?</h3>
      <p>React treats the components starting with lowercase letters as HTML elements, which is why a component should always start with a uppercase letter.</p>
      <h3>4. What are props in React?</h3>
      <p>Props short hand for properties, are a way to pass information between React components Here Information can be styles, text or methods By changing props, we can modify a component's behavior or appearance, making them more customisable and reusable.</p>
      <h3>5. What is a React Component Life Cycle?</h3>
      <p>A React Component goes through three main phases in its lifetime. Mounting. Updating. Unmounting In Mounting phase, the component gets created and inserted into the browser. In Updating phase, the component gets updated whenver there is a change in state or props. In Unmounting phase, the component gets removed from the browser.</p>
      <h3>6. What is a Virtual DOM in React?</h3>
      <p>React maintains a light weight in memory representation of a browser DOM called Virtual DOM Its essentially a js object representation of a React Element This helps React reduce the number of DOM manipulations by updating only whats necessary.</p>
      <h3>7. What is a one way data flow in React?</h3>
      <p>In react, DATA can be passed in only one direction, from a parent component to child component via PROPS Data can be styles, text or methods and CHANGES to data is managed by parent component</p>
      <h3>8. What are the advantages of using create react app CLI?</h3>
      <p>It's a tool to quickly create a new React project with just one command. This comes with pre configured packages like ESLint, Babel, or Webpack These packages help you to write clean and efficient code without any need to manually configure Overall, It saves time and makes it easier to get started with a React project.</p>
      <h3>9. What are the differences between React and ReactDOM packages?</h3>
      <p>React and ReactDOM form the building blocks of the ReactJS library. While React is responsible to create and manage components, whereas ReactDOM is responsible for displaying the components on the webpage Or React and ReactDOM are essential parts of the ReactJS library. React creates and manages components, whereas ReactDOM displays the components on the webpage</p>
      <h3>10. What is the difference between React Native and ReactJS?</h3>
      <p>ReactJS is a JavaScript library for building web applications, while React Native is a framework for building mobile applications on both Android and iOS platforms.</p>
      <h3>11. What are the most common ways to style a React Component?</h3>
      <p>The three most common ways to style a react component are CSS Classes, Inline styles, or Styled Components</p>
      <h3>12. How much do you rate yourself in React?</h3>
      <p>I would rate myself an 8 out of 10 in React. I have a good understanding of fundamental concepts such as components, state, props, and lifecycle methods. I have used React Router for application navigation and managing authentication using cookies. Moreover, I have integrated third-party packages like Recharts and React Popup into various projects. I have also familiarized myself with React context and styled components. I have developed many applications using React, including real-world application clones such as an e-commerce app, a movies app, and a Spotify clone. Throughout all the projects, I followed clean code principles, maintained a uniform folder structure, and applied meaningful naming conventions.</p>
      <h3>13. What is redux, and why is it used in react applications?</h3>
      <p>Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments, and are easy to test. In React applications, Redux is used for managing application state and logic in a predictable way.</p>
      <h3>14. What are the benefits of server-side rendering (SSR) in react applications?</h3>
      <p>Server-side rendering in React improves performance, especially for slow networks. It provides a faster initial page load and better SEO as search engines can crawl the site more easily. It also allows content to be visible even if JavaScript is disabled on the client side.</p>
      <h3>15. What scenarios would you prefer functional components?</h3>
      <p>Functional components are preferred when the component doesn't need to maintain its own state, doesn't require lifecycle methods, and is simply responsible for rendering some part of the UI based on props.</p>
      <h3>16. What scenarios would you prefer class components?</h3>
      <p>Class components are preferred when you need to use lifecycle methods, or when you need to use 'this' keyword for accessing props, state or methods. They are also used when the component has a state.</p>
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

export default ReactJs_Practice_Set_1
