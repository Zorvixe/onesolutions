import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
    {
      question: (
        <div>
          <p>What is debugging?</p>
        </div>
      ),
      options: [
        "Writing new features",
        "Optimizing CSS",
        "Finding and fixing bugs in code",
        "Deploying applications",
      ],
      answer: "Finding and fixing bugs in code",
    },
    {
      question: (
        <div>
          <p>Which tools can be used for debugging web applications?</p>
        </div>
      ),
      options: [
        "Only React Developer Tools",
        "Only Browser Developer Tools",
        "Browser Developer Tools and React Developer Tools",
        "VS Code only",
      ],
      answer: "Browser Developer Tools and React Developer Tools",
    },
    {
      question: (
        <div>
          <p>Which browser commonly supports React Developer Tools?</p>
        </div>
      ),
      options: ["Firefox only", "Safari only", "Google Chrome", "Internet Explorer"],
      answer: "Google Chrome",
    },
    {
      question: (
        <div>
          <p>Which tool helps in inspecting React component hierarchy?</p>
        </div>
      ),
      options: [
        "Browser Console",
        "Network tab",
        "React Developer Tools",
        "CSS Inspector",
      ],
      answer: "React Developer Tools",
    },
    {
      question: (
        <div>
          <p>Which feature helps check responsiveness of an application?</p>
        </div>
      ),
      options: [
        "Console tab",
        "Device Mode",
        "Sources tab",
        "React Profiler",
      ],
      answer: "Device Mode",
    }, 
    {
      question: (
        <div>
          <p>Which browser tool displays logged messages like errors and warnings?</p>
          <CodeBlock
            language="javascript"
            code={`console.log("Debugging message");`}
          />
        </div>
      ),
      options: [
        "Elements tab",
        "Console tab",
        "Network tab",
        "Application tab",
      ],
      answer: "Console tab",
    },
    {
      question: (
        <div>
          <p>Where can you inspect HTML and CSS structure?</p>
          <CodeBlock
            language="html"
            code={`<div class="container">Hello</div>`}
          />
        </div>
      ),
      options: [
        "Console tab",
        "Elements tab",
        "Network tab",
        "Sources tab",
      ],
      answer: "Elements tab",
    },
    {
      question: (
        <div>
          <p>Which tool allows running JavaScript directly in the browser?</p>
          <CodeBlock
            language="javascript"
            code={`2 + 2`}
          />
        </div>
      ),
      options: [
        "Elements tab",
        "Console tab",
        "React Components tab",
        "Network tab",
      ],
      answer: "Console tab",
    },
    {
      question: (
        <div>
          <p>Which tab helps inspect API calls and network requests?</p>
          <CodeBlock
            language="text"
            code={`GET /api/users`}
          />
        </div>
      ),
      options: [
        "Console",
        "Elements",
        "Network",
        "Sources",
      ],
      answer: "Network",
    },
    {
      question: (
        <div>
          <p>Which feature helps simulate different screen sizes?</p>
          <CodeBlock
            language="text"
            code={`Responsive Design Mode`}
          />
        </div>
      ),
      options: [
        "Console",
        "Device Mode",
        "Elements",
        "Network",
      ],
      answer: "Device Mode",
    },
    {
      question: (
        <div>
          <p>Which React DevTools tab shows component tree?</p>
          <CodeBlock
            language="text"
            code={`<App><Header /><Footer /></App>`}
          />
        </div>
      ),
      options: [
        "Profiler",
        "Components",
        "Console",
        "Network",
      ],
      answer: "Components",
    },
    {
      question: (
        <div>
          <p>What can be viewed using React Developer Tools?</p>
          <CodeBlock
            language="jsx"
            code={`<UserProfile name="Rahul" />`}
          />
        </div>
      ),
      options: [
        "Only props",
        "Only state",
        "Props and state",
        "Only JSX",
      ],
      answer: "Props and state",
    },
    {
      question: (
        <div>
          <p>Which feature helps identify unnecessary re-renders?</p>
          <CodeBlock
            language="text"
            code={`Component render tracking`}
          />
        </div>
      ),
      options: [
        "Console",
        "Network",
        "React Profiler",
        "Elements",
      ],
      answer: "React Profiler",
    },
    {
      question: (
        <div>
          <p>Where do JavaScript errors appear?</p>
          <CodeBlock
            language="javascript"
            code={`throw new Error("Bug found");`}
          />
        </div>
      ),
      options: [
        "Elements tab",
        "Network tab",
        "Console tab",
        "Sources tab",
      ],
      answer: "Console tab",
    },
    {
      question: (
        <div>
          <p>Which tool is specifically meant for React apps?</p>
          <CodeBlock
            language="text"
            code={`React Developer Tools`}
          />
        </div>
      ),
      options: [
        "Browser DevTools",
        "React Developer Tools",
        "VS Code Debugger",
        "Node Inspector",
      ],
      answer: "React Developer Tools",
    },
];
  

const Debugging_Dev_Tool_MCQ = ({
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

export default Debugging_Dev_Tool_MCQ;
