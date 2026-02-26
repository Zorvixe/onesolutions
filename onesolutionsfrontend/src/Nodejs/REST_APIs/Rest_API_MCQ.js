import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
    // ✅ THEORY (5)
  
    {
      question: <p>What does REST stand for?</p>,
      options: [
        "Remote State Transfer",
        "Representational State Transfer",
        "Resource State Transfer",
        "Representational Standard Transfer",
      ],
      answer: "Representational State Transfer",
    },
    {
      question: <p>Which HTTP method is used to create data?</p>,
      options: ["GET", "PUT", "DELETE", "POST"],
      answer: "POST",
    },
    {
      question: <p>Which parameter is used to specify number of rows?</p>,
      options: ["offset", "limit", "search_q", "order"],
      answer: "limit",
    },
    {
      question: <p>Which parameter is used for searching text?</p>,
      options: ["order_by", "offset", "search_q", "limit"],
      answer: "search_q",
    },
    {
      question: <p>REST APIs usually use which format for data transfer?</p>,
      options: ["XML", "HTML", "JSON", "Text"],
      answer: "JSON",
    },
  
    // ✅ CODE BASED (10)
  
    {
      question: (
        <div>
          <p>What does offset represent?</p>
          <CodeBlock language="text" code={`?offset=2&limit=3`} />
        </div>
      ),
      options: [
        "Number of rows",
        "Starting position",
        "Search text",
        "Sorting order",
      ],
      answer: "Starting position",
    },
  
    {
      question: (
        <div>
          <p>What will this return?</p>
          <CodeBlock language="text" code={`http://localhost:3000/books/?limit=2`} />
        </div>
      ),
      options: [
        "All books",
        "First 2 books",
        "Last 2 books",
        "Error",
      ],
      answer: "First 2 books",
    },
  
    {
      question: (
        <div>
          <p>Which type of parameter is this?</p>
          <CodeBlock language="text" code={`/authors/20/books/`} />
        </div>
      ),
      options: [
        "Query parameter",
        "Path parameter",
        "Body parameter",
        "Header parameter",
      ],
      answer: "Path parameter",
    },
  
    {
      question: (
        <div>
          <p>What does this do?</p>
          <CodeBlock language="text" code={`search_q=potter`} />
        </div>
      ),
      options: [
        "Sort books",
        "Filter by ID",
        "Search books by title",
        "Limit rows",
      ],
      answer: "Search books by title",
    },
  
    {
      question: (
        <div>
          <p>What does order=DESC do?</p>
          <CodeBlock language="text" code={`order=DESC`} />
        </div>
      ),
      options: [
        "Ascending sort",
        "Random order",
        "Descending sort",
        "No sorting",
      ],
      answer: "Descending sort",
    },
  
    {
      question: (
        <div>
          <p>Default value of limit in the API is ______.</p>
          <CodeBlock
            language="javascript"
            code={`limit = 5`}
          />
        </div>
      ),
      options: ["0", "5", "10", "1"],
      answer: "5",
    },
  
    {
      question: (
        <div>
          <p>Which clause is used for searching?</p>
                    <CodeBlock
            language="sql"
            code={`WHERE title LIKE '%\${search_q}%'`}
            />
        </div>
      ),
      options: [
        "ORDER BY",
        "WHERE LIKE",
        "GROUP BY",
        "LIMIT",
      ],
      answer: "WHERE LIKE",
    },
  
    {
      question: (
        <div>
          <p>Which method retrieves data?</p>
          <CodeBlock language="javascript" code={`app.get("/books/")`} />
        </div>
      ),
      options: ["POST", "DELETE", "GET", "PUT"],
      answer: "GET",
    },
  
    {
      question: (
        <div>
          <p>What does this mean?</p>
          <CodeBlock language="text" code={`/books/?limit=2`} />
        </div>
      ),
      options: [
        "Slash is mandatory",
        "Slash is optional",
        "Invalid URL",
        "Only for POST",
      ],
      answer: "Slash is optional",
    },
  
    {
      question: (
        <div>
          <p>Which REST principle is followed?</p>
          <CodeBlock language="text" code={`/books/10`} />
        </div>
      ),
      options: [
        "Unique resource identification",
        "Using XML",
        "Using cookies",
        "Server rendering",
      ],
      answer: "Unique resource identification",
    },
  ];

const Rest_API_MCQ = ({
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

export default Rest_API_MCQ;
