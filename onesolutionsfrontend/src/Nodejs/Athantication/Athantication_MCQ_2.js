import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
    // ✅ THEORY (5)
  
    {
      question: <p>Which authentication uses tokens to verify users?</p>,
      options: [
        "Session authentication",
        "Token authentication",
        "Basic authentication",
        "Password authentication",
      ],
      answer: "Token authentication",
    },
    {
      question: <p>What does JWT stand for?</p>,
      options: [
        "Java Web Token",
        "JSON Web Token",
        "JavaScript Web Token",
        "JSON With Token",
      ],
      answer: "JSON Web Token",
    },
    {
      question: <p>Which function is used to generate JWT?</p>,
      options: ["jwt.create()", "jwt.sign()", "jwt.verify()", "jwt.token()"],
      answer: "jwt.sign()",
    },
    {
      question: <p>Where is JWT stored on the client side?</p>,
      options: [
        "Database",
        "Local storage / client storage",
        "Server memory",
        "Cookies only",
      ],
      answer: "Local storage / client storage",
    },
    {
      question: <p>Which status code is sent for invalid token?</p>,
      options: ["200", "400", "401", "403"],
      answer: "401",
    },
  
    // ✅ CODE BASED (10)
  
    {
      question: (
        <div>
          <p>What does this generate?</p>
          <CodeBlock language="javascript" code={`const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");`} />
        </div>
      ),
      options: [
        "Encrypted password",
        "JWT token",
        "Session ID",
        "Hash value",
      ],
      answer: "JWT token",
    },
  
    {
      question: (
        <div>
          <p>What is payload here?</p>
          <CodeBlock language="javascript" code={`const payload = { username: username };`} />
        </div>
      ),
      options: [
        "Secret key",
        "User data",
        "Token header",
        "Database record",
      ],
      answer: "User data",
    },
  
    {
      question: (
        <div>
          <p>How is JWT sent in request?</p>
          <CodeBlock
            language="http"
            code={`Authorization: Bearer <jwt_token>`}
          />
        </div>
      ),
      options: [
        "In request body",
        "In query params",
        "In Authorization header",
        "In cookies",
      ],
      answer: "In Authorization header",
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
        "Full header",
        "JWT token",
        "Secret key",
      ],
      answer: "JWT token",
    },
  
    {
      question: (
        <div>
          <p>Which function verifies token?</p>
          <CodeBlock
            language="javascript"
            code={`jwt.verify(jwtToken, "MY_SECRET_TOKEN", callback);`}
          />
        </div>
      ),
      options: [
        "jwt.decode()",
        "jwt.check()",
        "jwt.verify()",
        "jwt.sign()",
      ],
      answer: "jwt.verify()",
    },
  
    {
      question: (
        <div>
          <p>What happens if authHeader is undefined?</p>
          <CodeBlock language="javascript" code={`if (authHeader !== undefined)`} />
        </div>
      ),
      options: [
        "Token generated",
        "401 error sent",
        "Books fetched",
        "Login success",
      ],
      answer: "401 error sent",
    },
  
    {
      question: (
        <div>
          <p>What is returned after successful login?</p>
          <CodeBlock language="javascript" code={`response.send({ jwtToken });`} />
        </div>
      ),
      options: [
        "User object",
        "JWT token",
        "Password",
        "Session ID",
      ],
      answer: "JWT token",
    },
  
    {
      question: (
        <div>
          <p>Which API is protected?</p>
          <CodeBlock language="javascript" code={`app.get("/books/", ...)`} />
        </div>
      ),
      options: [
        "Login API",
        "Register API",
        "Get Books API",
        "Delete User API",
      ],
      answer: "Get Books API",
    },
  
    {
      question: (
        <div>
          <p>What happens if token is invalid?</p>
          <CodeBlock language="javascript" code={`response.send("Invalid Access Token");`} />
        </div>
      ),
      options: [
        "200 OK",
        "Books returned",
        "401 error",
        "Token refreshed",
      ],
      answer: "401 error",
    },
  
    {
      question: (
        <div>
          <p>Which query runs after token verification?</p>
          <CodeBlock
            language="sql"
            code={`SELECT * FROM book ORDER BY book_id;`}
          />
        </div>
      ),
      options: [
        "Insert query",
        "Select query",
        "Update query",
        "Delete query",
      ],
      answer: "Select query",
    },
  ];

const Athantication_MCQ_2 = ({
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

export default Athantication_MCQ_2;
