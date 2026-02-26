import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Rest_API_CS = ({   
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
    <h1>REST APIs | Cheat Sheet</h1>
  
  
    {/* GET BOOKS API */}
  
    <section>
      <h2>1. Get Books API</h2>
  
      <h3>1.1 Filtering Books</h3>
  
      <ul>
        <li>Get specific number of books</li>
        <li>Search books using text</li>
        <li>Sort books</li>
      </ul>
  
      <h4>1.1.1 Get specific number of books (limit & offset)</h4>
  
      <p>
        <b>offset</b> → Starting position  
        <br />
        <b>limit</b> → Number of rows
      </p>
  
      <CodeBlock
        language="text"
        code={`http://localhost:3000/books/?limit=2
  http://localhost:3000/books/?offset=2&limit=3
  http://localhost:3000/authors/20/books/?offset=2`}
      />
  
  <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
        <p> Query parameters are used for filtering & sorting.
        Path parameters identify a specific resource.
      </p>
      </div>
  
      <h4>1.1.2 Search Books</h4>
  
      <CodeBlock language="text" code={`search_q=potter`} />
  
      <h4>1.1.3 Sorting</h4>
  
      <CodeBlock
        language="text"
        code={`order=ASC
  order=DESC`}
      />
  
      <h3>Filtering GET Books API</h3>
  
      <CodeBlock
        language="javascript"
        code={`app.get("/books/", async (request, response) => {
    const {
      offset = 0,
      limit = 5,
      order = "ASC",
      order_by = "book_id",
      search_q = "",
    } = request.query;
  
    const getBooksQuery = \`
      SELECT *
      FROM book
      WHERE title LIKE '%\${search_q}%'
      ORDER BY \${order_by} \${order}
      LIMIT \${limit} OFFSET \${offset};
    \`;
  
    const books = await db.all(getBooksQuery);
    response.send(books);
  });`}
      />
  
  <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>

        <p> Slash before query params is optional.
        <br />
        /books/?limit=2 is same as /books?limit=2
      </p>
      </div>
    </section>
  
    {/* REST API */}
  
    <section>
      <h2>2. REST APIs</h2>
  
      <p>
        REST stands for <b>Representational State Transfer</b>.
      </p>
  
      <p>
        It is a set of principles that define how web standards like HTTP
        and URLs should be used.
      </p>
  
      <h3>2.1 Why REST Principles?</h3>
  
      <ul>
        <li>Scalable</li>
        <li>Reliable</li>
        <li>Simple architecture</li>
        <li>Better performance</li>
      </ul>
  
      <h3>2.2 REST API Principles</h3>
  
      <ul>
        <li>Provide unique ID for each resource</li>
        <li>Use standard HTTP methods</li>
        <li>Use JSON for request & response</li>
      </ul>
  
      <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
        <thead>
          <tr>
            <th>Method</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GET</td>
            <td>Retrieve data</td>
          </tr>
          <tr>
            <td>POST</td>
            <td>Create data</td>
          </tr>
          <tr>
            <td>PUT</td>
            <td>Update data</td>
          </tr>
          <tr>
            <td>DELETE</td>
            <td>Delete data</td>
          </tr>
        </tbody>
      </table>
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

export default Rest_API_CS;
