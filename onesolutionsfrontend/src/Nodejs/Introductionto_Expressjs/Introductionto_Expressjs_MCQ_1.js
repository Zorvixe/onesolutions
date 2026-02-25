import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ✅ THEORY (5)

  {
    question: <p>Express JS is a ______.</p>,
    options: [
      "Database",
      "Frontend framework",
      "Server-side web framework for Node.js",
      "Programming language",
    ],
    answer: "Server-side web framework for Node.js",
  },
  {
    question: <p>Which command installs Express?</p>,
    options: [
      "npm start express",
      "node install express",
      "npm install express --save",
      "npm express install",
    ],
    answer: "npm install express --save",
  },
  {
    question: <p>Which method handles GET request?</p>,
    options: ["app.post()", "app.get()", "app.put()", "app.delete()"],
    answer: "app.get()",
  },
  {
    question: <p>The app.listen(3000) is used to ______.</p>,
    options: [
      "Create database",
      "Send response",
      "Handle request",
      "Start server on port 3000",
    ],
    answer: "Start server on port 3000",
  },
  {
    question: <p>Which tool is used to test network calls?</p>,
    options: ["Browser network tab", "Node CLI", "VS Code terminal", "NPM"],
    answer: "Browser network tab",
  },

  // ✅ CODE BASED (10)

  {
    question: (
      <div>
        <p>What does this line do?</p>
        <CodeBlock language="javascript" code={`const app = express();`} />
      </div>
    ),
    options: [
      "Starts server",
      "Creates Express application",
      "Handles GET request",
      "Imports module",
    ],
    answer: "Creates Express application",
  },

  {
    question: (
      <div>
        <p>What will be the output in browser?</p>
        <CodeBlock
          language="javascript"
          code={`app.get("/", (req, res) => {
  res.send("Hello World!");
});`}
        />
      </div>
    ),
    options: ["Hello World!", "Cannot GET /", "undefined", "Server Error"],
    answer: "Hello World!",
  },

  {
    question: (
      <div>
        <p>Which URL should be opened for this API?</p>
        <CodeBlock language="javascript" code={`app.listen(3000);`} />
      </div>
    ),
    options: [
      "http://localhost:8000",
      "http://localhost:3000",
      "http://127.0.0.1:5000",
      "http://3000",
    ],
    answer: "http://localhost:3000",
  },

  {
    question: (
      <div>
        <p>What will this API return?</p>
        <CodeBlock
          language="javascript"
          code={`app.get("/date", (req, res) => {
  let date = new Date();
  res.send(\`Today's date is \${date}\`);
});`}
        />
      </div>
    ),
    options: ["HTML page", "JSON data", "Current date string", "Error"],
    answer: "Current date string",
  },

  {
    question: (
      <div>
        <p>Which method sends HTML file?</p>
        <CodeBlock
          language="javascript"
          code={`res.sendFile("./page.html", { root: __dirname });`}
        />
      </div>
    ),
    options: ["send()", "render()", "json()", "sendFile()"],
    answer: "sendFile()",
  },

  {
    question: (
      <div>
        <p>What does __dirname represent?</p>
        <CodeBlock language="javascript" code={`{ root: __dirname }`} />
      </div>
    ),
    options: [
      "Project name",
      "Current folder path",
      "Server URL",
      "Database path",
    ],
    answer: "Current folder path",
  },

  {
    question: (
      <div>
        <p>Which part is HANDLER?</p>
        <CodeBlock
          language="javascript"
          code={`app.get("/", (req, res) => {});`}
        />
      </div>
    ),
    options: ["(req, res) => {}", "app.get", "/", "get"],
    answer: "(req, res) => {}",
  },

  {
    question: (
      <div>
        <p>If server code changes, what should you do?</p>
        <CodeBlock language="javascript" code={`app.listen(3000);`} />
      </div>
    ),
    options: [
      "Restart the server",
      "Refresh browser only",
      "Run npm install",
      "Clear cache",
    ],
    answer: "Restart the server",
  },

  {
    question: (
      <div>
        <p>Which HTTP method is used to fetch data?</p>
        <CodeBlock language="javascript" code={`app.METHOD(PATH, HANDLER)`} />
      </div>
    ),
    options: ["POST", "PUT", "GET", "DELETE"],
    answer: "GET",
  },

  {
    question: (
      <div>
        <p>Which framework uses Java?</p>
      </div>
    ),
    options: ["Django", "Spring Boot", "Express", "Ruby on Rails"],
    answer: "Spring Boot",
  },
];

const Introductionto_Expressjs_MCQ_1 = ({
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

export default Introductionto_Expressjs_MCQ_1;
