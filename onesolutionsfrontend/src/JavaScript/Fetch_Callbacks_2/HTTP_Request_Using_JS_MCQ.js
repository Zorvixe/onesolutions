import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>
          Which JavaScript method is used to fetch resources across the
          Internet?
        </p>
      </div>
    ),
    options: ["getRequest()", "fetch()", "http()", "requestData()"],
    answer: "fetch()",
  },

  {
    question: (
      <div>
        <p>
          What is the default HTTP method used by fetch() if no method is
          specified?
        </p>
      </div>
    ),
    options: ["POST", "PUT", "GET", "DELETE"],
    answer: "GET",
  },

  {
    question: (
      <div>
        <p>Which option is used to configure request headers in fetch?</p>
      </div>
    ),
    options: ["method", "body", "headers", "cache"],
    answer: "headers",
  },

  {
    question: (
      <div>
        <p>Which HTTP method is used to update an existing resource?</p>
      </div>
    ),
    options: ["GET", "POST", "PUT", "DELETE"],
    answer: "PUT",
  },

  {
    question: (
      <div>
        <p>Which HTTP method is used to delete a resource from the server?</p>
      </div>
    ),
    options: ["POST", "PUT", "DELETE", "GET"],
    answer: "DELETE",
  },

  {
    question: (
      <div>
        <p>Which of the following shows a basic GET request using fetch?</p>
        <CodeBlock
          language="javascript"
          code={`fetch("https://api.example.com/data");`}
        />
      </div>
    ),
    options: ["GET request", "POST request", "PUT request", "DELETE request"],
    answer: "GET request",
  },

  {
    question: (
      <div>
        <p>What does the following fetch request demonstrate?</p>
        <CodeBlock
          language="javascript"
          code={`fetch("https://api.example.com/user", {
  method: "POST"
});`}
        />
      </div>
    ),
    options: [
      "Fetching data",
      "Sending data to server",
      "Deleting data",
      "Updating data",
    ],
    answer: "Sending data to server",
  },

  {
    question: (
      <div>
        <p>Which HTTP method is used in the following code?</p>
        <CodeBlock
          language="javascript"
          code={`fetch("https://api.example.com/user/1", {
  method: "PUT"
});`}
        />
      </div>
    ),
    options: ["GET", "POST", "PUT", "DELETE"],
    answer: "PUT",
  },

  {
    question: (
      <div>
        <p>What operation does the following fetch request perform?</p>
        <CodeBlock
          language="javascript"
          code={`fetch("https://api.example.com/user/1", {
  method: "DELETE"
});`}
        />
      </div>
    ),
    options: ["Create user", "Fetch user", "Update user", "Delete user"],
    answer: "Delete user",
  },

  {
    question: (
      <div>
        <p>Which property gives the HTTP status code of the response?</p>
        <CodeBlock
          language="javascript"
          code={`fetch(url)
  .then(response => console.log(response.status));`}
        />
      </div>
    ),
    options: ["statusText", "headers", "status", "url"],
    answer: "status",
  },

  {
    question: (
      <div>
        <p>Which response method converts the response into JSON?</p>
        <CodeBlock
          language="javascript"
          code={`fetch(url)
  .then(response => response.json());`}
        />
      </div>
    ),
    options: ["text()", "parse()", "json()", "stringify()"],
    answer: "json()",
  },

  {
    question: (
      <div>
        <p>What will the following code return?</p>
        <CodeBlock
          language="javascript"
          code={`fetch(url)
  .then(response => response.text());`}
        />
      </div>
    ),
    options: ["JSON data", "Plain text", "Headers", "Status code"],
    answer: "Plain text",
  },

  {
    question: (
      <div>
        <p>Which option is used to send data in a fetch request?</p>
        <CodeBlock
          language="javascript"
          code={`fetch(url, {
  method: "POST",
  body: JSON.stringify({ name: "User" })
});`}
        />
      </div>
    ),
    options: ["headers", "params", "body", "cache"],
    answer: "body",
  },

  {
    question: (
      <div>
        <p>Which property contains the status message like "Unauthorized"?</p>
        <CodeBlock
          language="javascript"
          code={`fetch(url)
  .then(response => console.log(response.statusText));`}
        />
      </div>
    ),
    options: ["status", "statusText", "headers", "url"],
    answer: "statusText",
  },

  {
    question: (
      <div>
        <p>Which response property contains the requested URL?</p>
        <CodeBlock
          language="javascript"
          code={`fetch(url)
  .then(response => console.log(response.url));`}
        />
      </div>
    ),
    options: ["headers", "body", "url", "status"],
    answer: "url",
  },
];

const HTTP_Request_Using_JS_MCQ = ({
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
      title="Hypertext Transer Protocal - MCQs"
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
export default HTTP_Request_Using_JS_MCQ;
