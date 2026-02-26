import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
    // ✅ THEORY (5)
  
    {
      question: <p>What is middleware in Express?</p>,
      options: [
        "Final API handler",
        "Function that processes request before handler",
        "Database query",
        "Response sender",
      ],
      answer: "Function that processes request before handler",
    },
    {
      question: <p>Which built-in middleware parses JSON?</p>,
      options: [
        "express.static()",
        "express.json()",
        "bodyParser()",
        "app.use(json)",
      ],
      answer: "express.json()",
    },
    {
      question: <p>What does next() do in middleware?</p>,
      options: [
        "Stops execution",
        "Sends response",
        "Calls next middleware or handler",
        "Restarts server",
      ],
      answer: "Calls next middleware or handler",
    },
    {
      question: <p>Where is JWT usually sent?</p>,
      options: [
        "request.body",
        "request.params",
        "request.headers",
        "request.query",
      ],
      answer: "request.headers",
    },
    {
      question: <p>Which status code is used for invalid JWT?</p>,
      options: ["200", "401", "400", "403"],
      answer: "401",
    },
  
    // ✅ CODE BASED (10)
  
    {
      question: (
        <div>
          <p>What is the correct middleware syntax?</p>
          <CodeBlock
            language="javascript"
            code={`app.method(path, middleware, handler);`}
          />
        </div>
      ),
      options: [
        "Middleware after response",
        "Middleware before handler",
        "Middleware inside DB",
        "Middleware in query",
      ],
      answer: "Middleware before handler",
    },
  
    {
      question: (
        <div>
          <p>What does this log?</p>
          <CodeBlock
            language="javascript"
            code={`console.log(request.query);`}
          />
        </div>
      ),
      options: [
        "Request body",
        "Headers",
        "Query parameters",
        "JWT token",
      ],
      answer: "Query parameters",
    },
  
    {
      question: (
        <div>
          <p>Why is next() required here?</p>
          <CodeBlock
            language="javascript"
            code={`const logger = (request, response, next) => {
    console.log(request.query);
    next();
  };`}
          />
        </div>
      ),
      options: [
        "To stop API",
        "To call next middleware/handler",
        "To send response",
        "To verify token",
      ],
      answer: "To call next middleware/handler",
    },
  
    {
      question: (
        <div>
          <p>What does this extract?</p>
          <CodeBlock
            language="javascript"
            code={`jwtToken = authHeader.split(" ")[1];`}
          />
        </div>
      ),
      options: [
        "Bearer keyword",
        "JWT token",
        "Header name",
        "Secret key",
      ],
      answer: "JWT token",
    },
  
    {
      question: (
        <div>
          <p>What is stored here?</p>
          <CodeBlock
            language="javascript"
            code={`request.username = payload.username;`}
          />
        </div>
      ),
      options: [
        "Token",
        "Password",
        "User data for next handler",
        "Database result",
      ],
      answer: "User data for next handler",
    },
  
    {
      question: (
        <div>
          <p>Which API is protected?</p>
          <CodeBlock
            language="javascript"
            code={`app.get("/books/", authenticateToken, async () => {});`}
          />
        </div>
      ),
      options: [
        "Login API",
        "Register API",
        "Get Books API",
        "Logout API",
      ],
      answer: "Get Books API",
    },
  
    {
      question: (
        <div>
          <p>What happens if JWT is missing?</p>
          <CodeBlock
            language="javascript"
            code={`response.send("Invalid JWT Token");`}
          />
        </div>
      ),
      options: [
        "200 OK",
        "401 error",
        "Books fetched",
        "Token generated",
      ],
      answer: "401 error",
    },
  
    {
      question: (
        <div>
          <p>Where is username accessed in profile API?</p>
          <CodeBlock
            language="javascript"
            code={`const { username } = request;`}
          />
        </div>
      ),
      options: [
        "request.body",
        "request.params",
        "request object set by middleware",
        "request.headers",
      ],
      answer: "request object set by middleware",
    },
  
    {
      question: (
        <div>
          <p>Which DB method is used in profile API?</p>
          <CodeBlock
            language="javascript"
            code={`const userDetails = await db.get(selectUserQuery);`}
          />
        </div>
      ),
      options: [
        "db.all()",
        "db.run()",
        "db.get()",
        "db.exec()",
      ],
      answer: "db.get()",
    },
  
    {
      question: (
        <div>
          <p>How many middleware can be used in a route?</p>
          <CodeBlock
            language="javascript"
            code={`app.method(path, middleware1, middleware2, handler);`}
          />
        </div>
      ),
      options: [
        "Only one",
        "Two only",
        "Multiple",
        "None",
      ],
      answer: "Multiple",
    },
];

const Athantication_MCQ_3 = ({
  subtopicId,
  goalName,
  courseName,
  onComplete,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  // Check if subtopic is already completed
  useEffect(() => {
    if (subtopicId && completedContent.includes(subtopicId)) {
      setIsCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleCompletion = async () => {
    if (isLoading || isCompleted) return;

    try {
      setIsLoading(true);

      // Validate that we have the required parameters
      if (!subtopicId) {
        console.error("❌ Subtopic ID is required");
        alert("Error: Subtopic ID is missing");
        return;
      }

      console.log("🎯 Marking subtopic complete:", {
        subtopicId,
        goalName,
        courseName,
      });

      const result = await markSubtopicComplete(
        subtopicId,
        goalName || "Goal 1",
        courseName || "Static Website: HTML CSS & Bootstrap"
      );

      if (result.success) {
        await loadProgressSummary();
        setIsCompleted(true);
        console.log("✅ MCQ successfully marked as completed");

        // Call the parent completion handler if provided
        if (onComplete) {
          onComplete();
        }
      } else {
        console.error("❌ Failed to mark MCQ complete:", result.message);
        alert(`Failed to mark as complete: ${result.message}`);
      }
    } catch (error) {
      console.error("❌ Failed to mark MCQ complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <MCQLogic
      title="Components and Props - MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      isLoading={isLoading}
      onComplete={handleCompletion}
      subtopicId={subtopicId}
      goalName={goalName}
      courseName={courseName}
    />
  );
};

export default Athantication_MCQ_3;
