import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Athantication_CS_1 = ({   
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
     <h1>Authentication | Cheat Sheet</h1>
  
    <section>
      <h2>1. Installing Third-party Package bcrypt</h2>
  
      <p>
        Storing passwords in plain text is not secure. Passwords must be
        encrypted before storing in the database.
      </p>
  
      <CodeBlock language="bash" code={`npm install bcrypt --save`} />
  
      <h3>bcrypt Functions</h3>
  
      <ul>
        <li>
          <b>bcrypt.hash(password, saltRounds)</b> → Encrypts password
        </li>
        <li>
          <b>bcrypt.compare(password, hashedPassword)</b> → Compares passwords
        </li>
      </ul>
      <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
         Salt rounds value 10 is commonly used.
      </p>
      </div>
    </section>
  
    {/* AUTH FLOW */}
  
    <section>
      <h2>2. Goodreads APIs for Specified Users</h2>
  
      <p>
        Only registered users can login and access the books.
      </p>
  
      <ul>
        <li>Register User API</li>
        <li>Login User API</li>
      </ul>
    </section>
  
    {/* REGISTER */}
  
    <section>
      <h2>2.1 Register User API</h2>
  
      <p>
        Check whether user already exists.  
        If new → store hashed password.
      </p>
  
      <CodeBlock
        language="javascript"
        code={`app.post("/users/", async (request, response) => {
    const { username, name, password, gender, location } = request.body;
  
    const selectUserQuery = \`
      SELECT * FROM user WHERE username = '\${username}';
    \`;
  
    const dbUser = await db.get(selectUserQuery);
  
    if (dbUser === undefined) {
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const createUserQuery = \`
        INSERT INTO user (username, name, password, gender, location)
        VALUES (
          '\${username}',
          '\${name}',
          '\${hashedPassword}',
          '\${gender}',
          '\${location}'
        );
      \`;
  
      await db.run(createUserQuery);
      response.send("User created successfully");
  
    } else {
      response.status(400);
      response.send("User already exists");
    }
  });`}
      />
</section>
  
    {/* LOGIN */}
  
    <section>
      <h2>2.2 Login User API</h2>
  
      <p>
        Check whether user exists → compare password → allow login.
      </p>
  
      <CodeBlock
        language="javascript"
        code={`app.post("/login", async (request, response) => {
    const { username, password } = request.body;
  
    const selectUserQuery = \`
      SELECT * FROM user WHERE username = '\${username}';
    \`;
  
    const dbUser = await db.get(selectUserQuery);
  
    if (dbUser === undefined) {
  
      response.status(400);
      response.send("Invalid User");
  
    } else {
  
      const isPasswordMatched =
        await bcrypt.compare(password, dbUser.password);
  
      if (isPasswordMatched === true) {
        response.send("Login Success!");
      } else {
        response.status(400);
        response.send("Invalid Password");
      }
    }
  });`}
      />
 </section>
  
    {/* STATUS CODES */}
  
    <section>
      <h2>3. Status Codes</h2>
  
      <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
        <thead>
          <tr>
            <th>Status Code</th>
            <th>Status Text</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>200</td>
            <td>OK</td>
          </tr>
          <tr>
            <td>204</td>
            <td>No Content</td>
          </tr>
          <tr>
            <td>301</td>
            <td>Moved Permanently</td>
          </tr>
          <tr>
            <td>400</td>
            <td>Bad Request</td>
          </tr>
          <tr>
            <td>401</td>
            <td>Unauthorized</td>
          </tr>
          <tr>
            <td>403</td>
            <td>Forbidden</td>
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

export default Athantication_CS_1;
