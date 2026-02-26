import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path as needed
const Athantication_CS_3 = ({   
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
    <h1>Authentication | Part 3 | Cheat Sheet</h1>
  
    <section>
      <h2>1. Middleware Functions</h2>
  
      <p>
        Middleware is a function that processes the request before the
        final API handler.
      </p>
  
      <CodeBlock
        language="javascript"
        code={`app.method(path, middleware, handler);`}
      />
  
      <p>Built-in JSON middleware:</p>
  
      <CodeBlock
        language="javascript"
        code={`const jsonMiddleware = express.json();
  app.use(jsonMiddleware);`}
      />
      <p>It is a built-in middleware function it recognizes the incoming request object as a JSON object, parses it, and then calls handler in every API call</p>
  
      <h3>1.1 Multiple Middleware</h3>
  
      <CodeBlock
        language="javascript"
        code={`app.method(path, middleware1, middleware2, handler);`}
      />
    </section>
  
    {/* LOGGER */}
  
    <section>
      <h2>2. Logger Middleware</h2>
  
      <h3>2.1 Defining Middleware</h3>
  
      <CodeBlock
        language="javascript"
        code={`const middlewareFunction = (request, response, next) => {};`}
      />
  
      <h3>2.2 Logger Middleware</h3>
  
      <CodeBlock
        language="javascript"
        code={`const logger = (request, response, next) => {
    console.log(request.query);
    next();
  };`}
      />
  
  <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
        <b>next()</b> → Calls next middleware or API handler.
      </p>
      </div>
  
      <h3>2.3 Get Books API with Logger</h3>
  
      <CodeBlock
        language="javascript"
        code={`app.get("/books/", logger, async (request, response) => {
  
    const getBooksQuery = \`
      SELECT * FROM book ORDER BY book_id;
    \`;
  
    const booksArray = await db.all(getBooksQuery);
  
    response.send(booksArray);
  });`}
      />
    </section>
  
    {/* AUTH TOKEN */}
  
    <section>
      <h2>3. Authenticate Token Middleware</h2>
  
      <CodeBlock
        language="javascript"
        code={`const authenticateToken = (request, response, next) => {
  
    let jwtToken;
    const authHeader = request.headers["authorization"];
  
    if (authHeader !== undefined) {
      jwtToken = authHeader.split(" ")[1];
    }
  
    if (jwtToken === undefined) {
      response.status(401);
      response.send("Invalid JWT Token");
    } else {
  
      jwt.verify(jwtToken, "MY_SECRET_TOKEN",
        (error, payload) => {
  
        if (error) {
          response.status(401);
          response.send("Invalid JWT Token");
        } else {
  
          request.username = payload.username;
          next();
  
        }
      });
    }
  };`}
      />
    </section>
  
    {/* PROTECTED BOOKS */}
  
    <section>
      <h2>4. Get Books API with Authenticate Token</h2>
  
      <CodeBlock
        language="javascript"
        code={`app.get("/books/", authenticateToken, async (request, response) => {
  
    const getBooksQuery = \`
      SELECT * FROM book ORDER BY book_id;
    \`;
  
    const booksArray = await db.all(getBooksQuery);
  
    response.send(booksArray);
  });`}
      />
    </section>
  
    {/* PASSING DATA */}
  
    <section>
      <h2>5. Passing Data from Middleware</h2>
  
      <p>
        Data can be passed using the request object.
      </p>
  
      <CodeBlock
        language="javascript"
        code={`request.username = payload.username;`}
      />
    </section>
  
    {/* PROFILE API */}
  
    <section>
      <h2>6. Get User Profile API</h2>
  
      <CodeBlock
        language="javascript"
        code={`app.get("/profile/", authenticateToken, async (request, response) => {
  
    const { username } = request;
  
    const selectUserQuery = \`
      SELECT * FROM user WHERE username = '\${username}';
    \`;
  
    const userDetails = await db.get(selectUserQuery);
  
    response.send(userDetails);
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

export default Athantication_CS_3;
