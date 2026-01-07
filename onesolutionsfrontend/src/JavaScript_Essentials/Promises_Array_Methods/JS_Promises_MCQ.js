import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ===================== CODE BLOCK QUESTIONS (10) =====================

  {
    question: (
      <div>
        <p>What type of execution is shown below?</p>
        <CodeBlock
          language="javascript"
          code={`alert("Hello");
  alert("World");`}
        />
      </div>
    ),
    options: [
      "Asynchronous Execution",
      "Parallel Execution",
      "Synchronous Execution",
      "Deferred Execution",
    ],
    answer: "Synchronous Execution",
  },

  {
    question: (
      <div>
        <p>What type of execution does fetch() use?</p>
        <CodeBlock
          language="javascript"
          code={`fetch("https://api.example.com/data");
  console.log("After fetch");`}
        />
      </div>
    ),
    options: [
      "Synchronous Execution",
      "Blocking Execution",
      "Asynchronous Execution",
      "Sequential Execution",
    ],
    answer: "Asynchronous Execution",
  },

  {
    question: (
      <div>
        <p>What does this code create?</p>
        <CodeBlock
          language="javascript"
          code={`const promise = new Promise((resolve, reject) => {
    resolve("Success");
  });`}
        />
      </div>
    ),
    options: ["A function", "A callback", "A Promise object", "An event"],
    answer: "A Promise object",
  },

  {
    question: (
      <div>
        <p>Which Promise state is this?</p>
        <CodeBlock
          language="javascript"
          code={`new Promise((resolve, reject) => {
    // no resolve or reject
  });`}
        />
      </div>
    ),
    options: ["Fulfilled", "Rejected", "Pending", "Completed"],
    answer: "Pending",
  },

  {
    question: (
      <div>
        <p>Which state is reached when resolve() is called?</p>
        <CodeBlock language="javascript" code={`resolve("Data loaded");`} />
      </div>
    ),
    options: ["Pending", "Rejected", "Fulfilled", "Stopped"],
    answer: "Fulfilled",
  },

  {
    question: (
      <div>
        <p>Which state is reached when reject() is called?</p>
        <CodeBlock language="javascript" code={`reject("Network error");`} />
      </div>
    ),
    options: ["Pending", "Fulfilled", "Rejected", "Resolved"],
    answer: "Rejected",
  },

  {
    question: (
      <div>
        <p>What concept is shown below?</p>
        <CodeBlock
          language="javascript"
          code={`fetch("https://api.example.com/data")
    .then(response => response.json())
    .then(data => console.log(data));`}
        />
      </div>
    ),
    options: [
      "Callback Hell",
      "Promise Chaining",
      "Synchronous Flow",
      "Blocking Code",
    ],
    answer: "Promise Chaining",
  },

  {
    question: (
      <div>
        <p>
          What does the first <b>.then()</b> return here?
        </p>
        <CodeBlock
          language="javascript"
          code={`fetch("https://api.example.com/data")
    .then(response => response.json())`}
        />
      </div>
    ),
    options: ["JSON object", "Promise", "String", "Undefined"],
    answer: "Promise",
  },

  {
    question: (
      <div>
        <p>How are errors handled in this code?</p>
        <CodeBlock
          language="javascript"
          code={`fetch("https://invalid-url.com")
    .then(res => res.json())
    .catch(error => console.log(error));`}
        />
      </div>
    ),
    options: [
      "Using resolve()",
      "Using reject()",
      "Using .catch()",
      "Using .finally()",
    ],
    answer: "Using .catch()",
  },

  {
    question: (
      <div>
        <p>What happens if the fetch URL is invalid?</p>
        <CodeBlock
          language="javascript"
          code={`fetch("https://wrong-url.com")
    .catch(err => console.log("Error"));`}
        />
      </div>
    ),
    options: [
      "Promise is fulfilled",
      "Promise is rejected",
      "Promise stays pending",
      "Code crashes immediately",
    ],
    answer: "Promise is rejected",
  },

  // ===================== NORMAL QUESTIONS (5) =====================

  {
    question: "What is synchronous execution?",
    options: [
      "Code executes randomly",
      "Code executes line by line",
      "Code executes in background",
      "Code executes in parallel",
    ],
    answer: "Code executes line by line",
  },

  {
    question: "What is asynchronous execution?",
    options: [
      "Each line waits for previous line",
      "Next line does not wait for previous line",
      "Code runs only once",
      "Code blocks execution",
    ],
    answer: "Next line does not wait for previous line",
  },

  {
    question: "What is a Promise in JavaScript?",
    options: [
      "A loop",
      "A conditional statement",
      "An object representing future result",
      "A synchronous function",
    ],
    answer: "An object representing future result",
  },

  {
    question: "How many states does a Promise have?",
    options: ["2", "3", "4", "5"],
    answer: "3",
  },

  {
    question: "Which Promise state indicates failure?",
    options: ["Pending", "Fulfilled", "Rejected", "Resolved"],
    answer: "Rejected",
  },
];

const JS_Promises_MCQ = ({ subtopicId, goalName, courseName, onComplete }) => {
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
      title="JS Promises - MCQs"
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
export default JS_Promises_MCQ;
