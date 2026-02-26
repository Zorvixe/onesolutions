import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Athantication_CS_2 = ({   
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
    <h1>Authentication | Part 2 | Cheat Sheet</h1>
  
    {/* AUTH MECHANISMS */}
  
    <section>
      <h2>1. Authentication Mechanisms</h2>
  
      <ul>
        <li>Token Authentication</li>
        <li>Session Authentication</li>
      </ul>
  
      <p>Used to verify whether the user is logged in or not.</p>
    </section>
  
    {/* TOKEN AUTH */}
  
    <section>
      <h2>2. Token Authentication Mechanism</h2>
  
      <h3>2.1 Access Token</h3>
  
      <p>
        Access Token is a set of characters used to identify a valid user.
      </p>
  
      <h3>2.2 How Token Authentication Works?</h3>
  
      <ul>
        <li>Server generates token</li>
        <li>Client stores token</li>
        <li>Client sends token with every request</li>
        <li>Server validates token</li>
      </ul>
    </section>
  
    {/* JWT */}
  
    <section>
      <h2>3. JWT (JSON Web Token)</h2>
  
      <p>
        JWT is a standard used to create access tokens for applications.
      </p>
  
      <h3>3.1 How JWT Works?</h3>
  
      <ul>
        <li>Client → Login with credentials</li>
        <li>Server → Generates JWT Token</li>
        <li>Client → Sends JWT in request</li>
        <li>Server → Verifies and responds</li>
      </ul>
  
      <h3>3.2 JWT Package</h3>
    <p>jsonwebtoken package provides jwt.sign and jwt.verify functions</p>
      <CodeBlock language="bash" code={`npm install jsonwebtoken`} />
  
      <ul>
        <li>jwt.sign() → Generate token</li>
        <li>jwt.verify() → Verify token</li>
      </ul>
    </section>
  
    {/* LOGIN WITH TOKEN */}
  
    <section>
      <h2>4. Login User API → Generate JWT Token</h2>
  
      <CodeBlock
        language="javascript"
        code={`app.post("/login", async (request, response) => {
  
    const { username, password } = request.body;
  
    const selectUserQuery =
      \`SELECT * FROM user WHERE username = '\${username}';\`;
  
    const dbUser = await db.get(selectUserQuery);
  
    if (dbUser === undefined) {
      response.status(400);
      response.send("Invalid User");
    } else {
  
      const isPasswordMatched =
        await bcrypt.compare(password, dbUser.password);
  
      if (isPasswordMatched === true) {
  
        const payload = { username: username };
  
        const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
  
        response.send({ jwtToken });
  
      } else {
        response.status(400);
        response.send("Invalid Password");
      }
    }
  });`}
      />
    </section>
  
    {/* PASS TOKEN */}
  
    <section>
      <h2>5. How to Pass JWT Token?</h2>
  
      <p>Send token in Authorization header as Bearer token.</p>
  
      <CodeBlock
        language="http"
        code={`GET /books?offset=2&limit=3
  Authorization: Bearer <jwt_token>`}
      />
    </section>
  
    {/* PROTECTED API */}
  
    <section>
      <h2>6. Get Books API with Token Authentication</h2>
  
      <CodeBlock
        language="javascript"
        code={`app.get("/books/", (request, response) => {
  
    let jwtToken;
  
    const authHeader = request.headers["authorization"];
  
    if (authHeader !== undefined) {
      jwtToken = authHeader.split(" ")[1];
    }
  
    if (jwtToken === undefined) {
  
      response.status(401);
      response.send("Invalid Access Token");
  
    } else {
  
      jwt.verify(jwtToken, "MY_SECRET_TOKEN",
        async (error, payload) => {
  
        if (error) {
          response.status(401);
          response.send("Invalid Access Token");
        } else {
  
          const getBooksQuery = \`
            SELECT * FROM book ORDER BY book_id;
          \`;
  
          const books = await db.all(getBooksQuery);
          response.send(books);
        }
      });
    }
  });`}
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

export default Athantication_CS_2;
