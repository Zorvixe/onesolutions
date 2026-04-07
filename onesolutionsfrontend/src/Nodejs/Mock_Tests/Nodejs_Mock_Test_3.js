import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: <p>What is the purpose of middleware in Express?</p>,
    options: [
      "To process request before the final handler",
      "To store database records",
      "To create HTML pages",
      "To stop server execution",
    ],
    answer: "To process request before the final handler",
  },
  {
    question: (
      <div>
        <p>Which function encrypts a password using bcrypt?</p>
      </div>
    ),
    options: [
      "bcrypt.compare()",
      "bcrypt.hash()",
      "bcrypt.encrypt()",
      "bcrypt.generate()",
    ],
    answer: "bcrypt.hash()",
  },
  {
    question: (
      <div>
        <p>Which bcrypt function is used to compare passwords?</p>
      </div>
    ),
    options: [
      "bcrypt.decode()",
      "bcrypt.match()",
      "bcrypt.compare()",
      "bcrypt.verifyHash()",
    ],
    answer: "bcrypt.compare()",
  },
  {
    question: (
      <div>
        <p>What does the following middleware function parameter do?</p>
        <CodeBlock language="javascript" code={`next();`} />
      </div>
    ),
    options: [
      "Stops request",
      "Calls next middleware or handler",
      "Deletes request",
      "Closes server",
    ],
    answer: "Calls next middleware or handler",
  },
  {
    question: (
      <div>
        <p>Which header contains the JWT token in protected APIs?</p>
      </div>
    ),
    options: ["Content-Type", "Authorization", "Cookie", "Host"],
    answer: "Authorization",
  },
  {
    question: (
      <div>
        <p>Which format is used to send the JWT token?</p>
      </div>
    ),
    options: [
      "Token &lt;jwt&gt;",
      "JWT &lt;jwt&gt;",
      "Bearer &lt;jwt_token&gt;",
      "Auth &lt;jwt&gt;",
    ],
    answer: "Bearer <jwt_token>",
  },
  {
    question: (
      <div>
        <p>What happens if JWT token is missing in a protected API?</p>
      </div>
    ),
    options: [
      "Server stops",
      "User logged out",
      "Invalid JWT Token response",
      "Database cleared",
    ],
    answer: "Invalid JWT Token response",
  },
  {
    question: (
      <div>
        <p>Which function generates a JWT token?</p>
      </div>
    ),
    options: [
      "jwt.create()",
      "jwt.sign()",
      "jwt.encrypt()",
      "jwt.hash()",
    ],
    answer: "jwt.sign()",
  },
  {
    question: (
      <div>
        <p>Which function verifies a JWT token?</p>
      </div>
    ),
    options: [
      "jwt.check()",
      "jwt.validate()",
      "jwt.verify()",
      "jwt.confirm()",
    ],
    answer: "jwt.verify()",
  },
  {
    question: (
      <div>
        <p>Which object is used to access request headers in Express?</p>
      </div>
    ),
    options: [
      "request.headers",
      "request.body",
      "request.query",
      "request.params",
    ],
    answer: "request.headers",
  },
  {
    question: (
      <div>
        <p>Which middleware logs query parameters?</p>
      </div>
    ),
    options: ["logger middleware", "auth middleware", "json middleware", "router middleware"],
    answer: "logger middleware",
  },
  {
    question: (
      <div>
        <p>Where is username stored after JWT verification?</p>
      </div>
    ),
    options: [
      "response.username",
      "request.username",
      "db.username",
      "headers.username",
    ],
    answer: "request.username",
  },
  {
    question: (
      <div>
        <p>Which API returns user details after authentication?</p>
      </div>
    ),
    options: ["/login", "/users", "/profile", "/books"],
    answer: "/profile",
  },
  {
    question: (
      <div>
        <p>Which middleware protects the books API?</p>
      </div>
    ),
    options: ["logger", "authenticateToken", "express.json()", "router"],
    answer: "authenticateToken",
  },
  {
    question: (
      <div>
        <p>Which middleware parses JSON request bodies?</p>
      </div>
    ),
    options: [
      "express.json()",
      "jwt.verify()",
      "bcrypt.hash()",
      "app.listen()",
    ],
    answer: "express.json()",
  },
];

const Nodejs_Mock_Test_3 = ({
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
      title="Nodejs MCQ Test 3 - MCQs"
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

export default Nodejs_Mock_Test_3;
