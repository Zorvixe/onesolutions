import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ✅ THEORY (5)

  {
    question: <p>What is an API?</p>,
    options: [
      "A database",
      "A software intermediary for communication",
      "A frontend framework",
      "A Node module",
    ],
    answer: "A software intermediary for communication",
  },
  {
    question: <p>Which database is file-based?</p>,
    options: ["MongoDB", "MySQL", "SQLite", "PostgreSQL"],
    answer: "SQLite",
  },
  {
    question: <p>Which command lists all tables in SQLite?</p>,
    options: [".show", ".tables", ".schema", ".list"],
    answer: ".tables",
  },
  {
    question: <p>The open() method returns ______.</p>,
    options: ["callback", "object", "promise", "array"],
    answer: "promise",
  },
  {
    question: <p>Which method is used to get multiple rows from DB?</p>,
    options: ["db.get()", "db.run()", "db.exec()", "db.all()"],
    answer: "db.all()",
  },

  // ✅ CODE BASED (10)

  {
    question: (
      <div>
        <p>What does this line do?</p>
        <CodeBlock
          language="javascript"
          code={`const dbPath = path.join(__dirname, "goodreads.db");`}
        />
      </div>
    ),
    options: [
      "Creates database",
      "Deletes database",
      "Gives database file path",
      "Connects to database",
    ],
    answer: "Gives database file path",
  },

  {
    question: (
      <div>
        <p>Why is await used here?</p>
        <CodeBlock
          language="javascript"
          code={`db = await open({ filename: dbPath, driver: sqlite3.Database });`}
        />
      </div>
    ),
    options: [
      "To stop server",
      "To handle promise",
      "To run SQL query",
      "To send response",
    ],
    answer: "To handle promise",
  },

  {
    question: (
      <div>
        <p>What happens if DB connection fails?</p>
        <CodeBlock
          language="javascript"
          code={`catch (e) {
  console.log(\`DB Error: \${e.message}\`);
  process.exit(1);
}`}
        />
      </div>
    ),
    options: [
      "Server continues",
      "Only logs error",
      "Stops the Node process",
      "Restarts database",
    ],
    answer: "Stops the Node process",
  },

  {
    question: (
      <div>
        <p>Which API is created here?</p>
        <CodeBlock
          language="javascript"
          code={`app.get("/books/", async (request, response) => {})`}
        />
      </div>
    ),
    options: ["POST API", "DELETE API", "GET API", "PUT API"],
    answer: "GET API",
  },

  {
    question: (
      <div>
        <p>What does db.all() return?</p>
        <CodeBlock
          language="javascript"
          code={`const booksArray = await db.all(getBooksQuery);`}
        />
      </div>
    ),
    options: ["Single object", "Array of rows", "Boolean", "String"],
    answer: "Array of rows",
  },

  {
    question: (
      <div>
        <p>What will this API send?</p>
        <CodeBlock language="javascript" code={`response.send(booksArray);`} />
      </div>
    ),
    options: ["HTML", "JSON data", "String", "Error"],
    answer: "JSON data",
  },

  {
    question: (
      <div>
        <p>Which package is used as driver?</p>
        <CodeBlock language="javascript" code={`driver: sqlite3.Database`} />
      </div>
    ),
    options: ["sqlite", "sqlite3", "express", "path"],
    answer: "sqlite3",
  },

  {
    question: (
      <div>
        <p>Which SQL query is used here?</p>
        <CodeBlock
          language="sql"
          code={`SELECT * FROM book ORDER BY book_id;`}
        />
      </div>
    ),
    options: ["Insert query", "Select query", "Update query", "Delete query"],
    answer: "Select query",
  },

  {
    question: (
      <div>
        <p>What is the purpose of async function in initialization?</p>
        <CodeBlock
          language="javascript"
          code={`const initializeDBAndServer = async () => {}`}
        />
      </div>
    ),
    options: [
      "To use await inside function",
      "To create API",
      "To connect Express",
      "To send response",
    ],
    answer: "To use await inside function",
  },

  {
    question: (
      <div>
        <p>When will the server start?</p>
        <CodeBlock language="javascript" code={`app.listen(3000, () => {})`} />
      </div>
    ),
    options: [
      "Before DB connection",
      "After DB connection",
      "When API is called",
      "After npm install",
    ],
    answer: "After DB connection",
  },
];

const Introductionto_Expressjs_MCQ_2 = ({
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

export default Introductionto_Expressjs_MCQ_2;
