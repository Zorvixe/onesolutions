import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ✅ THEORY (5)

  {
    question: <p>Which SQLite method returns a single row?</p>,
    options: ["db.run()", "db.all()", "db.get()", "db.exec()"],
    answer: "db.get()",
  },
  {
    question: <p>Which SQLite method is used for INSERT, UPDATE and DELETE?</p>,
    options: ["db.get()", "db.all()", "db.run()", "db.fetch()"],
    answer: "db.run()",
  },
  {
    question: <p>What is the use of nodemon?</p>,
    options: [
      "Connect database",
      "Automatically restart server",
      "Run SQL queries",
      "Handle HTTP requests",
    ],
    answer: "Automatically restart server",
  },
  {
    question: <p>Which middleware reads JSON request body?</p>,
    options: [
      "express.urlencoded()",
      "express.json()",
      "bodyParser()",
      "app.use(json())",
    ],
    answer: "express.json()",
  },
  {
    question: <p>Path parameters are accessed using ______.</p>,
    options: [
      "request.query",
      "request.body",
      "request.params",
      "request.headers",
    ],
    answer: "request.params",
  },

  // ✅ CODE BASED (10)

  {
    question: (
      <div>
        <p>What will this return?</p>
        <CodeBlock
          language="javascript"
          code={`const book = await db.get(query);`}
        />
      </div>
    ),
    options: ["Array of books", "Single book object", "Boolean", "String"],
    answer: "Single book object",
  },

  {
    question: (
      <div>
        <p>What does this command do?</p>
        <CodeBlock language="bash" code={`npm install -g nodemon`} />
      </div>
    ),
    options: [
      "Installs nodemon locally",
      "Installs nodemon globally",
      "Starts server",
      "Updates npm",
    ],
    answer: "Installs nodemon globally",
  },

  {
    question: (
      <div>
        <p>Which HTTP method is used here?</p>
        <CodeBlock
          language="javascript"
          code={`app.post("/books/", async () => {});`}
        />
      </div>
    ),
    options: ["GET", "POST", "PUT", "DELETE"],
    answer: "POST",
  },

  {
    question: (
      <div>
        <p>What will be available in request.body?</p>
        <CodeBlock language="javascript" code={`app.use(express.json());`} />
      </div>
    ),
    options: ["Path params", "JSON data", "Query params", "Headers"],
    answer: "JSON data",
  },

  {
    question: (
      <div>
        <p>What does dbResponse.lastID represent?</p>
        <CodeBlock
          language="javascript"
          code={`response.send(\`Book Successfully Added with ID \${dbResponse.lastID}\`);`}
        />
      </div>
    ),
    options: [
      "Deleted book ID",
      "Updated book ID",
      "Inserted book ID",
      "Author ID",
    ],
    answer: "Inserted book ID",
  },

  {
    question: (
      <div>
        <p>Which API updates the book?</p>
        <CodeBlock
          language="javascript"
          code={`app.put("/books/:bookId/", async () => {});`}
        />
      </div>
    ),
    options: ["PUT", "GET", "POST", "PATCH"],
    answer: "PUT",
  },

  {
    question: (
      <div>
        <p>What will this API do?</p>
        <CodeBlock
          language="javascript"
          code={`app.delete("/books/:bookId/", async () => {});`}
        />
      </div>
    ),
    options: ["Insert book", "Delete book", "Update book", "Get book"],
    answer: "Delete book",
  },

  {
    question: (
      <div>
        <p>Which method is used to get multiple rows?</p>
        <CodeBlock
          language="javascript"
          code={`const booksArray = await db.all(query);`}
        />
      </div>
    ),
    options: ["db.get()", "db.run()", "db.all()", "db.exec()"],
    answer: "db.all()",
  },

  {
    question: (
      <div>
        <p>What is bookId here?</p>
        <CodeBlock
          language="javascript"
          code={`app.get("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;
});`}
        />
      </div>
    ),
    options: ["Query parameter", "Path parameter", "Request body", "Header"],
    answer: "Path parameter",
  },

  {
    question: (
      <div>
        <p>Which API gets books of a specific author?</p>
        <CodeBlock
          language="javascript"
          code={`app.get("/authors/:authorId/books/", async () => {});`}
        />
      </div>
    ),
    options: ["POST", "GET", "DELETE", "PUT"],
    answer: "GET",
  },
];

const Introductionto_Expressjs_MCQ_3 = ({
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

export default Introductionto_Expressjs_MCQ_3;
