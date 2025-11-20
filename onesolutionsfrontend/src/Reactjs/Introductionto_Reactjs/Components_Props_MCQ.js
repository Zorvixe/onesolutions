import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is a React component?</p>
      </div>
    ),
    options: [
      "A CSS class that styles elements",
      "A JavaScript function that returns a JSX element",
      "A JSON object storing data",
      "A Node.js module",
    ],
    answer: "A JavaScript function that returns a JSX element",
  },
  {
    question: (
      <div>
        <p>Which of the following is a correct example of a React component?</p>
        <CodeBlock
          language="jsx"
          code={`const Welcome = () => <h1 className="message">Hello, User</h1>;`}
        />
      </div>
    ),
    options: [
      "const Welcome = function <h1>Hello</h1>;",
      "const Welcome = <h1>Hello</h1>;",
      "const Welcome = () => <h1 className='message'>Hello, User</h1>;",
      "const Welcome = new Component('Hello');",
    ],
    answer: "const Welcome = () => <h1 className='message'>Hello, User</h1>;",
  },
  {
    question: (
      <div>
        <p>What happens if a component name starts with a lowercase letter?</p>
      </div>
    ),
    options: [
      "React treats it as an HTML tag",
      "It throws a syntax error",
      "It renders normally",
      "It is ignored by React",
    ],
    answer: "React treats it as an HTML tag",
  },
  {
    question: (
      <div>
        <p>Which of the following correctly passes props to a component?</p>
        <CodeBlock
          language="jsx"
          code={`<Welcome name="Rahul" greeting="Hello" />`}
        />
      </div>
    ),
    options: [
      "<Welcome('Rahul', 'Hello') />",
      "<Welcome name='Rahul' greeting='Hello' />",
      "<Welcome name:Rahul greeting:Hello />",
      "<Welcome name=>Rahul greeting=>Hello />",
    ],
    answer: "<Welcome name='Rahul' greeting='Hello' />",
  },
  {
    question: (
      <div>
        <p>How can props be accessed inside a functional component?</p>
        <CodeBlock
          language="javascript"
          code={`const Welcome = (props) => {
  const { name, greeting } = props;
  return <h1>{greeting}, {name}</h1>;
};`}
        />
      </div>
    ),
    options: [
      "Using this.props",
      "Using props parameter",
      "Using context API",
      "Using Redux store",
    ],
    answer: "Using props parameter",
  },
  {
    question: (
      <div>
        <p>What is the main advantage of using components in React?</p>
      </div>
    ),
    options: [
      "They make code reusable and modular",
      "They slow down the rendering process",
      "They are only used once per application",
      "They replace JavaScript entirely",
    ],
    answer: "They make code reusable and modular",
  },
  {
    question: (
      <div>
        <p>Which of the following shows component composition?</p>
        <CodeBlock
          language="jsx"
          code={`const Greetings = () => (
  <div>
    <Welcome name="Rahul" greeting="Hello" />
    <Welcome name="Sita" greeting="Hi" />
  </div>
);`}
        />
      </div>
    ),
    options: [
      "When one component uses another inside it",
      "When CSS is applied to components",
      "When data is passed between components",
      "When components are deleted",
    ],
    answer: "When one component uses another inside it",
  },
  {
    question: (
      <div>
        <p>Which command installs create-react-app globally?</p>
        <CodeBlock language="bash" code={`npm install -g create-react-app`} />
      </div>
    ),
    options: [
      "npm install react",
      "npm install -g react-setup",
      "npm install -g create-react-app",
      "npm create app-react",
    ],
    answer: "npm install -g create-react-app",
  },
  {
    question: (
      <div>
        <p>Which folder in a React project contains the main components?</p>
      </div>
    ),
    options: ["public", "node_modules", "src", "dist"],
    answer: "src",
  },
  {
    question: (
      <div>
        <p>Which tool is used to compile JSX into JavaScript?</p>
        <CodeBlock language="bash" code={`Babel`} />
      </div>
    ),
    options: ["Webpack", "ESLint", "Babel", "Prettier"],
    answer: "Babel",
  },
];

const Components_Props_MCQ = ({
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
    <MCQLogic title="Components and Props - MCQs" questions={randomQuestions}
    isCompleted={isCompleted}
    isLoading={isLoading}
    onComplete={handleCompletion}
    subtopicId={subtopicId}
    goalName={goalName}
    courseName={courseName} />
  );
};

export default Components_Props_MCQ;
