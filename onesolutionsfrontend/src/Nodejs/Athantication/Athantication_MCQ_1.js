import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
    // ✅ THEORY (5)
  
    {
      question: <p>Why do we hash passwords before storing them?</p>,
      options: [
        "To increase database size",
        "To make login faster",
        "To improve security",
        "To convert to JSON",
      ],
      answer: "To improve security",
    },
    {
      question: <p>Which bcrypt function is used to encrypt a password?</p>,
      options: [
        "bcrypt.compare()",
        "bcrypt.encrypt()",
        "bcrypt.hash()",
        "bcrypt.secure()",
      ],
      answer: "bcrypt.hash()",
    },
    {
      question: <p>What is the commonly used saltRounds value?</p>,
      options: ["5", "8", "10", "12"],
      answer: "10",
    },
    {
      question: <p>Which status code is used for Bad Request?</p>,
      options: ["200", "301", "400", "204"],
      answer: "400",
    },
    {
      question: <p>Which status code represents Unauthorized?</p>,
      options: ["401", "403", "200", "204"],
      answer: "401",
    },
  
    // ✅ CODE BASED (10)
  
    {
      question: (
        <div>
          <p>What does this line do?</p>
          <CodeBlock language="javascript" code={`const hashedPassword = await bcrypt.hash(password, 10);`} />
        </div>
      ),
      options: [
        "Decrypts password",
        "Compares passwords",
        "Encrypts password",
        "Stores password",
      ],
      answer: "Encrypts password",
    },
  
    {
      question: (
        <div>
          <p>What will this return?</p>
          <CodeBlock language="javascript" code={`await bcrypt.compare(password, dbUser.password);`} />
        </div>
      ),
      options: [
        "Hashed string",
        "Boolean",
        "Number",
        "Object",
      ],
      answer: "Boolean",
    },
  
    {
      question: (
        <div>
          <p>What happens if user already exists during registration?</p>
          <CodeBlock language="javascript" code={`response.status(400);
  response.send("User already exists");`} />
        </div>
      ),
      options: [
        "User created",
        "Login success",
        "Error response sent",
        "Password updated",
      ],
      answer: "Error response sent",
    },
  
    {
      question: (
        <div>
          <p>Which API is used for user registration?</p>
          <CodeBlock language="javascript" code={`app.post("/users/")`} />
        </div>
      ),
      options: ["GET", "POST", "PUT", "DELETE"],
      answer: "POST",
    },
  
    {
      question: (
        <div>
          <p>What happens when dbUser is undefined in login?</p>
          <CodeBlock language="javascript" code={`response.send("Invalid User");`} />
        </div>
      ),
      options: [
        "Login success",
        "User created",
        "Invalid user message",
        "Password updated",
      ],
      answer: "Invalid user message",
    },
  
    {
      question: (
        <div>
          <p>Which method checks whether user exists?</p>
          <CodeBlock language="javascript" code={`const dbUser = await db.get(selectUserQuery);`} />
        </div>
      ),
      options: [
        "db.run()",
        "db.all()",
        "db.get()",
        "db.exec()",
      ],
      answer: "db.get()",
    },
  
    {
      question: (
        <div>
          <p>What is stored in DB for password?</p>
          <CodeBlock language="javascript" code={`'\${hashedPassword}'`} />
        </div>
      ),
      options: [
        "Plain password",
        "Encrypted password",
        "Boolean",
        "Username",
      ],
      answer: "Encrypted password",
    },
  
    {
      question: (
        <div>
          <p>What is the response for successful login?</p>
          <CodeBlock language="javascript" code={`response.send("Login Success!");`} />
        </div>
      ),
      options: [
        "Login Failed",
        "User created",
        "Login Success!",
        "Invalid Password",
      ],
      answer: "Login Success!",
    },
  
    {
      question: (
        <div>
          <p>If password is wrong, what happens?</p>
          <CodeBlock language="javascript" code={`response.status(400);
  response.send("Invalid Password");`} />
        </div>
      ),
      options: [
        "Login success",
        "User deleted",
        "Error response",
        "Redirect",
      ],
      answer: "Error response",
    },
  
    {
      question: (
        <div>
          <p>Which status code means request succeeded?</p>
        </div>
      ),
      options: ["200", "400", "401", "403"],
      answer: "200",
    },
  ];

const Athantication_MCQ_1 = ({
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

export default Athantication_MCQ_1;
