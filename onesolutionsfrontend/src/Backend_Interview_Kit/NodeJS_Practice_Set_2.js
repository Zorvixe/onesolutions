import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CodeBlock } from "../CodeOutputBlocks";
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
      <h2> Practice Set - 2</h2>
      <h2>Practice the popular interview questions in NodeJs using ZorMock.</h2>

    <section>
      <h3>1. Explain the post() method in Node JS.</h3>
      <p>The post() method in Node JS is used to send HTTP POST requests to a specified URL. It allows you to send data to the server in the request body.</p>
      <h3>2. What is the purpose of module.exports?</h3>
      <p>module.exports enables exporting functions, objects, or values for use in other modules. This promotes code reusability, modularity, and maintainability in Node JS applications.</p>
      <h3>3. What are URL, and API methods in Node JS?</h3>
      <p>In Node JS, URLs access web resources. The URL module resolves and parses URLs. API methods in Node JS interact with APIs, performing CRUD operations (GET, POST, PUT, DELETE) on exposed resources.</p>
      <h3>4. What is the difference between Express JS and Node JS?</h3>
      <p>Node JS is a JavaScript runtime environment that executes JavaScript code outside a web browser. While Express JS is a free and open-source Server-side Web Application Framework for Node JS. It provides features and tools for building web applications using Node JS.</p>
      <h3>5. What are Modules and their Methods in Express JS?</h3>
      <p>In Express JS, modules are reusable code pieces used for structuring the application, while methods are functions within modules that perform specific tasks. For example, the 'app' module handles HTTP requests, and the 'app.get()' method handles the get API.</p>
      <h3>6. What is the use of require() function?</h3>
      <p>The `require()` function in Node JS imports external modules or files and assigns their exported content to a variable, allowing you to use their functionality in your application.</p>
      <h3>7. What is the use of terminal (REPL), in Node JS?</h3>
      <p>The Node JS REPL (Read-Eval-Print Loop) is an interactive shell used for real-time code testing, debugging, and experimenting without creating separate script files, aiding in code evaluation and development.</p>
      <h3>8. What are Route paths in web applications, in combination with request methods and define the specific endpoints where requests can be made?</h3>
      <p>Route paths are URL patterns used in web applications to define the endpoints at which requests can be made. They are combined with the request methods app.METHOD(PATH, HANDLER) to specify the actions to be performed on those endpoints.</p>
      <h3>9. How to retrieve the body of a query?</h3>
      <p>To retrieve the body of a query in Node JS, you can use express.json() middleware to recognize the incoming request object as JSON and parse it. After that, you can access the HTTP request body using request.body.</p>
      <h3>10. What is the middleware function?</h3>
      <p>Middleware is a special function in Express JS that handles requests from the user or previous middleware. It processes the request and can either pass it to another middleware, call the API Handler, or send a response to the user.</p>
      <h3>11. Is node a single threaded application?</h3>
      <p>Yes, Node JS is mainly single-threaded. But it uses an event-driven, non-blocking I/O model to handle multiple requests at the same time, making it efficient for high-performance and scalable applications.</p>
      <h3>12. How to connect a database in NodeJS?</h3>
      <p>To connect a database in NodeJS, We can use `sqlite` and `sqlite3` node packages to connect SQLite Database from Node JS.</p>
      <h3>13. Explain Express js architecture.</h3>
      <p>Express.js has a simple and minimalist architecture. It allows developers to build web applications in a structured manner by using modular routes and middleware functions. It provides flexibility in handling HTTP requests and processing responses.</p>
      <h3>14. How to print Hello World in Node JS?</h3>
      <p>To print "Hello World" in Node.js, write console.log("Hello World"); in a JavaScript file and run it using node filename.js in the terminal.</p>
      <h3>15. What is package.json?</h3>
      <p>package.json is a file in NodeJS projects that holds important project details like name, version, description, and dependencies. It helps package managers (npm or yarn) manage dependencies and scripts, simplifying project sharing and collaboration.</p>
      <h3>16. What is the function of listen in Express?</h3>
      <p>In Express, the "listen" method is used to bind and listen for connections on the specified port. Essentially, it starts up the server and allows it to begin accepting requests from clients.</p>
      <h3>17. What is the use of 'express.json()' in your Node.js project?</h3>
      <p>The 'express.json()' is used to recognize the incoming request object as a JSON object and parse it, allowing you to work with it as a JavaScript object.</p>
      <h3>18. What is Nodemon?</h3>
      <p>The Nodemon is a tool that restarts the server automatically whenever we make changes in the Node JS application.</p>
    
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
