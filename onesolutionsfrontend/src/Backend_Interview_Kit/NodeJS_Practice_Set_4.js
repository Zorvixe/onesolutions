
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const NodeJS_Practice_Set_4 = ({
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
      <h2>Practice the popular interview questions in NodeJs using ZorMock.</h2>

    <section>
      
    <div>
      <h3>1. How to create a simple backend login system using bcrypt and JWT and what happens behind the scenes?</h3>

<p>
To build a simple authentication backend using Node.js, Express, bcrypt, and JSON Web Token (JWT), follow these steps:
</p>

<ul>
  <li>
    <p><b>Step 1 – Setup Server:</b> Create a Node.js project and setup an Express server.</p>
  </li>

  <li>
    <p><b>Step 2 – Install Packages:</b> Install required packages using npm such as <b>express</b>, <b>bcrypt</b>, and <b>jsonwebtoken</b>.</p>
  </li>

  <li>
    <p><b>Step 3 – Create Routes:</b> Create routes like <b>/register</b> and <b>/login</b> to handle user authentication.</p>
  </li>

  <li>
    <p><b>Step 4 – Hash Password:</b> During registration, hash the user password using bcrypt before saving it in the database.</p>
  </li>

  <li>
    <p><b>Step 5 – Compare Password:</b> During login, compare the entered password with the stored hashed password using bcrypt.</p>
  </li>

  <li>
    <p><b>Step 6 – Generate Token:</b> If login is successful, generate a JWT token and send it to the client for authentication in future requests.</p>
  </li>
</ul>

<p><b>What happens behind the scenes?</b></p>

<ul>
  <li>
    <p>Password is never stored as plain text. bcrypt converts it into a secure hash.</p>
  </li>

  <li>
    <p>During login, bcrypt checks whether the entered password matches the stored hash.</p>
  </li>

  <li>
    <p>If authentication succeeds, the server creates a JWT token containing user information and a secret signature.</p>
  </li>

  <li>
    <p>The client stores this token and sends it in the request headers for protected routes.</p>
  </li>

  <li>
    <p>The server verifies the token on each request to allow or deny access.</p>
  </li>
</ul>
     <h3>2. What is a patch()?</h3>
     <p><code>patch()</code> is an HTTP method used to <code>partially update</code> a resource. In Node JS with Express.js, it defines a route for handling PATCH requests, efficiently updating specific fields without affecting the entire resource.</p>
     <h3>3. What are valid forms of route path?</h3>
     <p>Valid forms of route paths in Express.js can include static paths, dynamic paths with parameters, optional parameters, and route patterns using regular expressions.<br/> <b>Some examples</b> of valid route paths are '/users', '/users/:id', etc</p>
     <h3>4. What are the timing features of Node JS?</h3>

<p>
Node JS provides three important timing features to handle asynchronous operations and control execution flow in an application.
</p>

<ul>
  <li>
    <p><b>setTimeout:</b> It schedules a function to execute after a specified delay in milliseconds.</p>
  </li>

  <li>
    <p><b>setInterval:</b> It repeatedly executes a function at specified time intervals.</p>
  </li>

  <li>
    <p><b>setImmediate:</b> It executes a function immediately after the current event loop cycle is completed.</p>
  </li>
</ul>

<p>
These timing features help in managing asynchronous tasks and controlling the execution flow of a Node JS application.
</p>
<h3>5. How to use process.nextTick() and setImmediate() and what is the difference between them?</h3>
      <p>In Node JS, process.nextTick() and setImmediate() are used to <code>schedule asynchronous tasks</code>. The main difference is that <code>process.nextTick()</code> executes in the current event loop iteration, while <code>setImmediate()</code> executes in the next iteration.</p>
      <h3>6. What is CORS?</h3>
      <p>CORS <code>(Cross-Origin Resource Sharing)</code> is a security mechanism that allows web applications running on one domain to request resources from another domain. It ensures that requests from different origins are controlled, preventing unauthorized access and protecting user data.</p>
      <h3>7. What will happen if the call stack and the event loop are empty in Node?</h3>
      <p>When both the call stack and event loop are empty in Node JS, the process will <code>terminate</code> unless there are active timers or ongoing I/O operations.</p>
      <h3>8. What is fork in nodejs?</h3>
      <p>In Node JS, the <code>fork()</code> method creates <code>child processes</code> that run independently from the main application. This enables parallel execution and improved resource usage. Child processes can communicate with the parent process through inter-process communication (IPC).</p>
      <h3>9. What else can be used instead of express for handling requests?</h3>
      <p>Other frameworks like Koa, Hapi, Fastify, or Sails.js can replace Express for handling requests in Node JS, offering various features and performance optimizations to suit different project needs.</p>
      <h3>10. What are Node JS buffers?</h3>
      <p>Node JS buffers are <code>temporary storage</code> areas used to handle binary data. They store raw binary data in a fixed-size memory chunk. Buffers, created with the Buffer class, allow operations such as concatenation, slicing, and reading/writing values at specific positions.</p>
      <h3>11. What is the specific method in the Node Redis driver that should be used to automatically execute a set of commands without manual intervention?</h3>
      <p>To execute a set of commands automatically using the Node Redis driver, you can use the <code>`multi()`</code> method of the client object. This method allows you to queue multiple commands and execute them atomically as a single operation using the <code>`exec()`</code> method.</p>
      <h3>12. Where to find the implementation of the set timeout function in Node JS?</h3>
      <p>In Node JS, you can find the implementation of the setTimeout function in the <code>'timers'</code> module. It allows you to schedule a one-time execution of a function after a specified delay. The 'timers' module can be accessed globally or by requiring it in your code.</p>
      <h3>13. How to export in Node JS?</h3>
      <p>In Node JS, you can export functions, objects, or values by assigning them to properties of <code>"module.exports"</code> or <code>"exports"</code>. This allows other modules to import and use them.</p>
      <h3>14. Which class is used to create and consume custom events in Node JS?</h3>
      <p>To create and consume custom events in Node JS, developers use the EventEmitter class. It is a built-in module that implements the observer pattern, enabling the definition of custom events and attachment of event listeners for handling them, adding event-driven functionality to Node JS applications.</p>
      <h3>15. What is fs module in Node JS?</h3>
      <p>fs module in Node JS is built-in and enables file system operations on the server-side. It facilitates tasks like reading, writing, modifying, creating, deleting, and updating files and directories.</p>
      <h3>16. How to create and consume custom event in node JS?</h3>
      <p>To create and consume custom events in Node JS, import the 'events' module, create an event emitter instance, define the event with 'on', and trigger it with 'emit'.</p>
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

export default NodeJS_Practice_Set_4
