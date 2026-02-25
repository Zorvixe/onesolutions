import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Introductionto_Expressjs_CS_2 = ({
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
    <h1>Introduction to Express JS | Part 2 | Cheat Sheet</h1>

  
    <section>
      <h2>1. Application Programming Interface (API)</h2>
  
      <p>
        An API is a software intermediary that allows two applications to
        communicate with each other.
      </p>
  
      <p>
        Example: OLA and UBER use the Google Maps API to provide location
        services.
      </p>
  
      <p>All the network calls we create in Express are APIs.</p>
    </section>
  
    {/* DATABASE */}
  
    <section>
      <h2>2. Database</h2>
  
      <p>Express apps can use any database supported by Node JS.</p>
  
      <p>Popular Databases:</p>
  
      <ul>
        <li>SQLite</li>
        <li>PostgreSQL</li>
        <li>MySQL</li>
        <li>MongoDB</li>
        <li>Redis</li>
      </ul>
    </section>
  
    {/* SQLITE */}
  
    <section>
      <h2>3. SQLite</h2>
  
      <p>
        SQLite provides a command-line tool <b>sqlite3</b> to execute SQL
        queries.
      </p>
  
      <h3>3.1 SQLite CLI</h3>
  
      <h4>3.1.1 List Tables</h4>
  
      <CodeBlock language="sql" code={`.tables`} />
  
      <h4>3.1.2 Select Table Data</h4>
  
      <CodeBlock language="sql" code={`SELECT * FROM table_name;`} />
    </section>
  
    {/* SQLITE METHODS */}
  
    <section>
      <h2>4. SQLite Methods</h2>
  
      <h3>4.1 open()</h3>
  
      <p>
        Used to connect to the database and returns a database connection
        object.
      </p>
  
      <CodeBlock
        language="javascript"
        code={`open({
    filename: DATABASE_PATH,
    driver: sqlite3.Database,
  });`}
      />
  
      <p className="note">
        <b>Note:</b> open() returns a promise.
      </p>
  
      <h3>4.2 Executing SQL Queries</h3>
  
      <ul>
        <li>db.all()</li>
        <li>db.get()</li>
        <li>db.run()</li>
        <li>db.exec()</li>
      </ul>
  
      <h4>4.2.1 all()</h4>
  
      <CodeBlock language="javascript" code={`db.all(SQL_QUERY);`} />
  
      <p>Used to get multiple rows of data.</p>
    </section>
  
    {/* INSTALL PACKAGES */}
  
    <section>
      <h2>5. SQL Third-party Packages</h2>
  
      <CodeBlock
        language="bash"
        code={`npm install sqlite --save
  npm install sqlite3 --save`}
      />
    </section>
  
    {/* DB CONNECTION */}
  
    <section>
      <h2>
        6. Connecting SQLite Database from Node JS (Goodreads Books API)
      </h2>
  
      <h3>6.1 Database Initialization</h3>
  
      <CodeBlock
        language="javascript"
        code={`const express = require("express");
  const path = require("path");
  const { open } = require("sqlite");
  const sqlite3 = require("sqlite3");
  
  const app = express();
  
  const dbPath = path.join(__dirname, "goodreads.db");
  
  let db = null;
  
  const initializeDBAndServer = async () => {
    try {
      db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      });
  
      app.listen(3000, () => {
        console.log("Server Running at http://localhost:3000/");
      });
    } catch (e) {
      console.log(\`DB Error: \${e.message}\`);
      process.exit(1);
    }
  };
  
  initializeDBAndServer();`}
      />
  
      <h3>6.2 Goodreads Get Books API</h3>
  
      <CodeBlock
        language="javascript"
        code={`app.get("/books/", async (request, response) => {
    const getBooksQuery = \`
      SELECT
        *
      FROM
        book
      ORDER BY
        book_id;
    \`;
  
    const booksArray = await db.all(getBooksQuery);
  
    response.send(booksArray);
  });`}
      />
  
      <h4>Output</h4>
  
      <CodeBlock
        language="json"
        code={`[
    {
      "book_id": 1,
      "title": "Harry Potter",
      "author_name": "J.K.Rowling",
      "rating": 4.8
    }
  ]`}
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

export default Introductionto_Expressjs_CS_2;
