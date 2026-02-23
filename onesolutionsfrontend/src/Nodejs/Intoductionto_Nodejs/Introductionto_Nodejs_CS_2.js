import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Introductionto_Nodejs_CS_2 = ({
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
      <h1>Introduction to Node JS | Part 2 | Cheat Sheet</h1>

      {/* CORE MODULES */}

      <section>
        <h2>1. Core Modules</h2>
        <p>The Core Modules are inbuilt in Node JS.</p>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Module</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>path</td>
              <td>Handles file paths</td>
            </tr>
            <tr>
              <td>fs</td>
              <td>Handles file system</td>
            </tr>
            <tr>
              <td>url</td>
              <td>Parses URL strings</td>
            </tr>
          </tbody>
        </table>

        <h3>1.1 Path</h3>
        <p>
          The path module provides utilities for working with file and directory
          paths. It can be accessed using:
        </p>

        <CodeBlock
          language="javascript"
          code={`const path = require("path");`}
        />

        <p>Example:</p>

        <CodeBlock
          language="javascript"
          code={`// index.js
  const path = require("path");
  
  const filePath = path.join("users", "ravi", "notes.txt");
  
  console.log(filePath);`}
        />
        <p>Output:</p>
        <CodeBlock language="bash" code={`users/ravi/notes.txt`} />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p> Many developers prefer CommonJS over ES6 in Node projects.</p>
        </div>
      </section>

      {/* PACKAGE */}

      <section>
        <h2>2. Package</h2>
        <p>
          A package is a directory with one or more modules grouped together.
        </p>

        <h3>2.1 Node Package Manager (NPM)</h3>
        <p>
          NPM is the package manager for Node JS with more than one million
          packages.
        </p>

        <p>
          It allows you to publish, discover, install and develop Node programs.
        </p>

        <h3>2.1.1 CLI Commands</h3>
        <p>
          NPM CLI sets up the Node JS Project to organize various modules and
          work with third-party packages.
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Command</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>npm init -y</td>
              <td>Initializes project & creates package.json</td>
            </tr>
            <tr>
              <td>npm install &lt;package-name&gt; --save</td>
              <td>Installs third-party package</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* PROJECT STEPS */}

      <section>
        <h2>3. Steps to Create a Node JS Project</h2>
        <p>Run the below commands in the terminal.</p>

        <CodeBlock
          language="bash"
          code={`mkdir myapp
  cd myapp
  npm init -y`}
        />
      </section>

      {/* THIRD PARTY */}

      <section>
        <h2>4. Third-Party Packages</h2>
        <p>
          Third-party packages are external Node JS packages developed by the
          community and available through NPM.
        </p>

        <h3>4.1 date-fns</h3>
        <p>
          date-fns is used for manipulating JavaScript dates in both browser and
          Node.js.
        </p>

        <h4>Installation</h4>

        <CodeBlock language="bash" code={`npm install date-fns --save`} />

        <h4>4.1.1 addDays</h4>
        <p>Adds the specified number of days to the given date.</p>

        <p>Example:</p>

        <CodeBlock
          language="javascript"
          code={`// index.js
  const { addDays } = require("date-fns");
  
  const result = addDays(new Date(2021, 0, 11), 10);
  
  console.log(result);`}
        />
        <p>Output:</p>
        <CodeBlock language="bash" code={`2021-01-21T00:00:00.000Z`} />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            {" "}
            While creating the Date() object, we have to provide the month index
            from (0-11), whereas we will get the output considering Jan=1 and
            Dec=12.
          </p>
        </div>
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

export default Introductionto_Nodejs_CS_2;
