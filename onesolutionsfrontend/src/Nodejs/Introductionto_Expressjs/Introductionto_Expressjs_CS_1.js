import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Introductionto_Expressjs_CS_1 = ({
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
    <h1>Introduction to Express JS | Cheat Sheet</h1>
  
    {/* HTTP SERVER */}
  
    <section>
      <h2>1. HTTP Server</h2>
  
      <ul>
        <li>Works with HTTP requests and responses</li>
        <li>Handles different paths</li>
        <li>Handles query parameters</li>
        <li>Sends HTML, CSS, etc. as response</li>
        <li>Works with databases</li>
      </ul>
  
      <h3>1.1 Server-side Web Frameworks</h3>
  
      <p>These frameworks handle all server operations.</p>
  
      <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
        <thead>
          <tr>
            <th>Framework</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Express</td>
            <td>Node JS</td>
          </tr>
          <tr>
            <td>Django</td>
            <td>Python</td>
          </tr>
          <tr>
            <td>Ruby on Rails</td>
            <td>Ruby</td>
          </tr>
          <tr>
            <td>Spring Boot</td>
            <td>Java</td>
          </tr>
        </tbody>
      </table>
    </section>
  
    {/* EXPRESS */}
  
    <section>
      <h2>2. Express JS</h2>
  
      <p>
        Express is a free and open-source server-side web application
        framework for Node JS.
      </p>
  
      <p>It helps to build web and mobile applications quickly.</p>
  
      <h3>Installation</h3>
  
      <CodeBlock language="bash" code={`npm install express --save`} />
    </section>
  
    {/* SERVER CREATION */}
  
    <section>
      <h2>3. Network Call using Express JS</h2>
  
      <h3>Creating Server</h3>
  
      <CodeBlock
        language="javascript"
        code={`const express = require("express");
  const app = express();`}
      />
  
      <h3>Assigning Port</h3>
  
      <CodeBlock language="javascript" code={`app.listen(3000);`} />
  
      <p>The server listens on port 3000.</p>
  
      <h3>3.1 Handling HTTP Request</h3>
  
      <CodeBlock
        language="javascript"
        code={`app.METHOD(PATH, HANDLER)`}
      />
  
      <ul>
        <li>METHOD → get, post, put, delete</li>
        <li>PATH → URL path</li>
        <li>HANDLER → function executed</li>
      </ul>
  
      <h4>3.1.1 GET Request</h4>
  
      <CodeBlock
        language="javascript"
        code={`const express = require("express");
  const app = express();
  
  app.get("/", (request, response) => {
    response.send("Hello World!");
  });
  
  app.listen(3000);`}
      />
  
  <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
        <p> Restart the server whenever code changes.
      </p>
      </div>
    </section>
  
    {/* TESTING */}
  
    <section>
      <h2>4. Testing Network Calls</h2>
  
      <ul>
        <li>Browser Network Tab</li>
        <li>app.http file → Click Send Request</li>
      </ul>




    </section>
  
    {/* DATE API */}
  
    <section>
      <h2>5. Network Call to get Today’s Date</h2>
  
      <CodeBlock
        language="javascript"
        code={`const express = require("express");
  const app = express();
  
  app.get("/date", (request, response) => {
    let date = new Date();
    response.send(\`Today's date is \${date}\`);
  });
  
  app.listen(3000);`}
      />
    </section>
  
    {/* SEND HTML */}
  
    <section>
      <h2>6. Sending HTML as HTTP Response</h2>
  
      <h3>6.1 Sending File as Response</h3>
  
      <CodeBlock
        language="javascript"
        code={`response.sendFile(PATH, { root: __dirname });`}
      />
  
      <ul>
        <li>PATH → File path</li>
        <li>__dirname → Current folder path</li>
      </ul>
  
      <CodeBlock
        language="javascript"
        code={`const express = require("express");
  const app = express();
  
  app.get("/page", (request, response) => {
    response.sendFile("./page.html", { root: __dirname });
  });
  
  app.listen(3000);`}
      />
    </section>
  

      {/* Continue Button */}
      <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted}
        >
          {isSubtopicCompleted ? "Completed" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Introductionto_Expressjs_CS_1;
