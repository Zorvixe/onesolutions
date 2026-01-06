import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========= 10 CODE BLOCK QUESTIONS =========

  {
    question: (
      <div>
        <p>Identify the Web Resource from the given example.</p>
        <CodeBlock
          language="text"
          code={`http://www.flipkart.com/watches`}
        />
      </div>
    ),
    options: [
      "Protocol",
      "Web Resource",
      "Local File",
      "Database",
    ],
    answer: "Web Resource",
  },

  {
    question: (
      <div>
        <p>In the following URL, what does <b>http</b> represent?</p>
        <CodeBlock
          language="text"
          code={`http://www.flipkart.com`}
        />
      </div>
    ),
    options: [
      "Domain Name",
      "Protocol",
      "Path",
      "Query Parameters",
    ],
    answer: "Protocol",
  },

  {
    question: (
      <div>
        <p>Which part of the URL identifies the web server?</p>
        <CodeBlock
          language="text"
          code={`http://www.flipkart.com/watches`}
        />
      </div>
    ),
    options: [
      "Protocol",
      "Domain Name",
      "Path",
      "Query Parameters",
    ],
    answer: "Domain Name",
  },

  {
    question: (
      <div>
        <p>What does <b>/electronics/laptops/gaming</b> represent?</p>
        <CodeBlock
          language="text"
          code={`http://www.flipkart.com/electronics/laptops/gaming`}
        />
      </div>
    ),
    options: [
      "Protocol",
      "Domain Name",
      "Path",
      "Query Parameters",
    ],
    answer: "Path",
  },

  {
    question: (
      <div>
        <p>Identify the Query Parameters in the URL below.</p>
        <CodeBlock
          language="text"
          code={`http://www.flipkart.com/watches?type=digital&rating=4`}
        />
      </div>
    ),
    options: [
      "/watches",
      "www.flipkart.com",
      "type=digital&rating=4",
      "http",
    ],
    answer: "type=digital&rating=4",
  },

  {
    question: (
      <div>
        <p>Which HTTP method is used to read data from the server?</p>
        <CodeBlock
          language="text"
          code={`GET /products HTTP/1.1`}
        />
      </div>
    ),
    options: ["GET", "POST", "PUT", "DELETE"],
    answer: "GET",
  },

  {
    question: (
      <div>
        <p>Which HTTP method is used to create a new resource?</p>
        <CodeBlock
          language="text"
          code={`POST /users HTTP/1.1`}
        />
      </div>
    ),
    options: ["GET", "POST", "PUT", "DELETE"],
    answer: "POST",
  },

  {
    question: (
      <div>
        <p>What does the following status line indicate?</p>
        <CodeBlock
          language="text"
          code={`HTTP/1.1 201 Created`}
        />
      </div>
    ),
    options: [
      "Request failed",
      "Resource deleted",
      "New resource created",
      "Unauthorized access",
    ],
    answer: "New resource created",
  },

  {
    question: (
      <div>
        <p>Which HTTP status code represents <b>Not Found</b>?</p>
        <CodeBlock
          language="text"
          code={`HTTP/1.1 404 Not Found`}
        />
      </div>
    ),
    options: ["200", "301", "403", "404"],
    answer: "404",
  },

  {
    question: (
      <div>
        <p>Which part of an HTTP response contains metadata information?</p>
        <CodeBlock
          language="text"
          code={`Content-Type: application/json`}
        />
      </div>
    ),
    options: [
      "Status Line",
      "Headers",
      "Body",
      "URL",
    ],
    answer: "Headers",
  },

  // ========= 5 NORMAL QUESTIONS =========

  {
    question: "What is a Web Resource?",
    options: [
      "Only HTML files",
      "Any data obtained via the internet",
      "Only server-side files",
      "Only images",
    ],
    answer: "Any data obtained via the internet",
  },

  {
    question: "Which protocol transfers data in encrypted format?",
    options: ["HTTP", "HTTPS", "FTP", "SMTP"],
    answer: "HTTPS",
  },

  {
    question: "Which HTTP method is used to update an existing resource?",
    options: ["GET", "POST", "PUT", "DELETE"],
    answer: "PUT",
  },

  {
    question: "What does the 2XX series of HTTP status codes indicate?",
    options: [
      "Client Error",
      "Server Error",
      "Success",
      "Redirection",
    ],
    answer: "Success",
  },

  {
    question: "Which part of an HTTP request carries form data?",
    options: [
      "Headers",
      "Body",
      "Start Line",
      "Status Line",
    ],
    answer: "Body",
  },
];

const Hypertext_Transer_Protocal_MCQ = ({
  subtopicId,
  goalName,
  courseName,
  onComplete
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } = useAuth();

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
        courseName
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
        title="Hypertext Transer Protocal - MCQs"
        questions={randomQuestions}
        isCompleted={isCompleted}
        isLoading={isLoading}
        onComplete={handleCompletion}
        subtopicId={subtopicId}
        goalName={goalName}
        courseName={courseName}      />
    );
  };

export default Hypertext_Transer_Protocal_MCQ;
