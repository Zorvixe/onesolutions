
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";


const NodeJS_Practice_Set_2 = ({
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
      <h2>Practice the popular interview questions in NodeJs using ZorMock.</h2>

    <section>
      
    <div>
      <h3>1. What is Bcrypt and what are the uses, and methods of Bcrypt?</h3>
      <p>Bcrypt is a library used for secure password hashing in NodeJS. It helps in storing passwords safely in databases. Bcrypt provides methods like 'hash' to create a hashed password and 'compare' to check if a password matches the stored hash.</p>
      <h3>2. How to install Node.js?</h3>
      <p>To install Node.js, follow these simple steps:</p>
      <ul>
        <li>
          <p><b>Step 1:</b> Visit the official Node.js website and download the installer suitable for your operating system.</p>
        </li>
        <li>
          <p><b>Step 2:</b> Run the downloaded installer and follow the on-screen instructions to complete the installation.</p>
        </li>
        <li>
          <p><b>Step 3:</b> After installation, open the terminal or command prompt and type <b>node -v</b> to verify the installed version.</p>
        </li>
      </ul>
      <h3>3. Explain about Node JS and how to create APIs?</h3>
      <p>Node JS is a JavaScript runtime that executes JavaScript code outside of a browser. To create APIs, use Express.js. Install it with npm, create an app, define routes using HTTP methods like GET and POST, and specify responses. Start the server with app.listen() and a port number to handle requests.</p>
      <h3>4. What is npm and why do we use it?</h3>
      <p>NPM is the package manager for the Node JS packages with more than one million packages. It provides a command line tool that allows you to publish, discover, install, and develop node programs. It is used to install, manage, and share reusable code modules (packages) in your projects.</p>
      <h3>5. What are the applications of Node JS?</h3>
      <p>Node JS is used to build scalable, high-performance applications. Some common applications are real-time chat, API servers for single-page apps, data streaming, and server-side rendering. Examples include Socket.IO for real-time chat, Express.js for API servers, Node JS streams for data streaming, and Next.js for server-side rendering.</p>
      <h3>6. What is the difference between javascript and nodejs?</h3>
      <p>JavaScript is a client-side programming language for web browsers, while Node JS is a server-side runtime environment for JavaScript, which offers additional features like file system access and networking.</p>
      <h3>7. How does Node JS work?</h3>
      <p>Node JS is a JavaScript runtime environment that executes JavaScript code outside a web browser.</p>
      <h3>8. What is app.get()?</h3>
      <p>In Express.js, app.get() defines a route handler for handling HTTP GET requests. It takes a route path and a callback function that processes the request and sends a response.</p>
      <h3>9. How to expose node JS modules?</h3>
      <p>Node JS modules can be exposed using the `module.exports` or `exports` keywords. They allow us to make functions, objects, or variables available for use in other files.</p>
      <h3>10. Which command is used to install Node JS express module?</h3>
      <p>To install the Express module in Node JS, use the following command: `npm install express`. This command installs the Express package from the npm registry and adds it to your project's dependencies.</p>
      <h3>11. Which module is required to create a web server?</h3>
      <p>Express module is needed to create a web server in NodeJS.</p>
      <h3>12. What are the dependencies in Node JS?</h3>
      <p>Dependencies in Node JS are external modules or packages that your application relies on to perform certain tasks. They are specified in the "package.json" file and can be installed using a package manager like npm. Dependencies are essential components for adding functionality or integrating third-party libraries into your Node JS application.</p>
      <h3>13. What is jwt verify?</h3>
      <p>jwt.verify() verifies jwtToken and if it’s valid, returns payload. Else, it throws an error.</p>
      <h3>14. How to parse a JSON response?</h3>
      <p>To parse a JSON response, you can use the built-in JSON.parse() method.</p>
      <h3>15. Is the server implemented using Node.js?</h3>
      <p>Yes, the server is implemented using Node.js.</p>
      <h3>16. What is an HTTP request?</h3>
      <p>An HTTP request is a client message to a server for asking for data retrieval. It includes a method (GET, POST), URL, HTTP version, headers, and an optional message body within the HTTP request.</p>
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

export default NodeJS_Practice_Set_2
