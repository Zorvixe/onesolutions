import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is Prop Drilling in React?</p>
      </div>
    ),
    options: [
      "Passing props only to required component",
      "Passing props through components that do not need it",
      "Storing props in state",
      "Updating props using setState",
    ],
    answer: "Passing props through components that do not need it",
  },
  {
    question: (
      <div>
        <p>What problem does React Context solve?</p>
      </div>
    ),
    options: [
      "State mutation",
      "Component reusability",
      "Prop drilling",
      "Routing issues",
    ],
    answer: "Prop drilling",
  },
  {
    question: (
      <div>
        <p>Which method is used to create a Context?</p>
        <CodeBlock language="jsx" code={`React.createContext(INITIAL_VALUE)`} />
      </div>
    ),
    options: [
      "createContext()",
      "useContext()",
      "React.createContext()",
      "Context.create()",
    ],
    answer: "React.createContext()",
  },
  {
    question: (
      <div>
        <p>Which two properties does a Context object provide?</p>
      </div>
    ),
    options: [
      "state and props",
      "Provider and Consumer",
      "render and return",
      "useState and useEffect",
    ],
    answer: "Provider and Consumer",
  },
  {
    question: (
      <div>
        <p>Which component is used to read Context values?</p>
        <CodeBlock
          language="jsx"
          code={`<MyContext.Consumer>{value => <p>{value}</p>}</MyContext.Consumer>`}
        />
      </div>
    ),
    options: ["Provider", "Consumer", "Fragment", "Router"],
    answer: "Consumer",
  },
  {
    question: (
      <div>
        <p>How do you access Consumer from a context object?</p>
        <CodeBlock language="jsx" code={`MyContext.Consumer`} />
      </div>
    ),
    options: [
      "Using bracket notation",
      "Using dot notation",
      "Using import",
      "Using hooks only",
    ],
    answer: "Using dot notation",
  },
  {
    question: (
      <div>
        <p>What does the Consumer component expect as its child?</p>
        <CodeBlock
          language="jsx"
          code={`<Context.Consumer>{value => <Component />}</Context.Consumer>`}
        />
      </div>
    ),
    options: [
      "JSX element",
      "Callback function",
      "String",
      "Another component",
    ],
    answer: "Callback function",
  },
  {
    question: (
      <div>
        <p>What does the callback function in Consumer receive?</p>
        <CodeBlock language="jsx" code={`{value => <p>{value}</p>}`} />
      </div>
    ),
    options: ["Props", "State", "Context value", "Ref"],
    answer: "Context value",
  },
  {
    question: (
      <div>
        <p>Which syntax correctly creates a Context?</p>
        <CodeBlock
          language="jsx"
          code={`const MyContext = React.createContext("dark")`}
        />
      </div>
    ),
    options: [
      "React.newContext()",
      "createContext()",
      "React.createContext()",
      "Context.create()",
    ],
    answer: "React.createContext()",
  },
  {
    question: (
      <div>
        <p>What will this render?</p>
        <CodeBlock
          language="jsx"
          code={`<ThemeContext.Consumer>
    {value => <h1>{value}</h1>}
  </ThemeContext.Consumer>`}
        />
      </div>
    ),
    options: ["Theme name", "Component name", "Provider name", "Nothing"],
    answer: "Theme name",
  },
  {
    question: (
      <div>
        <p>Which command downloads the initial Windows App code?</p>
        <CodeBlock language="bash" code={`onesolutions start RJSIVWKZP2`} />
      </div>
    ),
    options: [
      "npm start",
      "onesolutions start RJSIVWKZP2",
      "git clone",
      "npm install",
    ],
    answer: "onesolutions start RJSIVWKZP2",
  },
  {
    question: (
      <div>
        <p>Which command downloads the final Windows App code?</p>
        <CodeBlock language="bash" code={`onesolutions start RJSIVM06DJ`} />
      </div>
    ),
    options: [
      "onesolutions run final",
      "npm build",
      "onesolutions start RJSIVM06DJ",
      "git pull",
    ],
    answer: "onesolutions start RJSIVM06DJ",
  },
  {
    question: (
      <div>
        <p>Which of the following is an advantage of Context?</p>
      </div>
    ),
    options: [
      "Avoids prop drilling",
      "Improves CSS",
      "Reduces JSX",
      "Replaces Redux always",
    ],
    answer: "Avoids prop drilling",
  },
  {
    question: (
      <div>
        <p>Context is mainly used to share data between?</p>
      </div>
    ),
    options: [
      "Sibling components only",
      "Parent and child only",
      "Unrelated components",
      "Server and client",
    ],
    answer: "Unrelated components",
  },
  {
    question: (
      <div>
        <p>Which example uses multiple languages in this cheat sheet?</p>
      </div>
    ),
    options: ["Todo App", "Weather App", "Windows App", "Chat App"],
    answer: "Windows App",
  },
];

const Styled_Compo_MCQ = ({ subtopicId, goalName, courseName, onComplete }) => {
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
      title="Introduction to React JS - MCQs"
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

export default Styled_Compo_MCQ;
