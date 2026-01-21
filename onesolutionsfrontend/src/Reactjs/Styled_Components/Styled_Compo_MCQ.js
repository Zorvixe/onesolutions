import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>Which of the following is a way to style React components?</p>
      </div>
    ),
    options: ["Redux", "CSS", "Axios", "Context"],
    answer: "CSS",
  },
  {
    question: (
      <div>
        <p>What is CSS-in-JS?</p>
      </div>
    ),
    options: [
      "Writing CSS inside HTML",
      "Writing CSS inside JavaScript",
      "Using only external CSS",
      "Using inline styles only",
    ],
    answer: "Writing CSS inside JavaScript",
  },
  {
    question: (
      <div>
        <p>Which package is used for Styled Components?</p>
      </div>
    ),
    options: ["react-icons", "styled-components", "axios", "react-router"],
    answer: "styled-components",
  },
  {
    question: (
      <div>
        <p>Which command installs styled-components?</p>
        <CodeBlock language="bash" code={`npm install styled-components`} />
      </div>
    ),
    options: [
      "npm install react-icons",
      "npm install sass",
      "npm install styled-components",
      "npm install redux",
    ],
    answer: "npm install styled-components",
  },
  {
    question: (
      <div>
        <p>Which syntax is correct for creating a styled component?</p>
        <CodeBlock
          language="jsx"
          code={`const Button = styled.button\`
    color: red;
  \``}
        />
      </div>
    ),
    options: ["Correct", "Wrong"],
    answer: "Correct",
  },
  {
    question: (
      <div>
        <p>Styled component names should start with?</p>
      </div>
    ),
    options: ["Small letter", "Capital letter", "Number", "Symbol"],
    answer: "Capital letter",
  },
  {
    question: (
      <div>
        <p>How do you access props inside styled-components?</p>
        <CodeBlock language="jsx" code={`color: \${props => props.color};`} />
      </div>
    ),
    options: ["this.color", "state.color", "props.color", "event.color"],
    answer: "props.color",
  },
  {
    question: (
      <div>
        <p>Which operator is used for conditional styling?</p>
        <CodeBlock
          language="jsx"
          code={`\${props => (props.outline ? "white" : "blue")}`}
        />
      </div>
    ),
    options: ["Logical AND", "Ternary", "Switch", "For loop"],
    answer: "Ternary",
  },
  {
    question: (
      <div>
        <p>Which prop changes a styled button into an anchor tag?</p>
        <CodeBlock language="jsx" code={`<CustomButton as="a" />`} />
      </div>
    ),
    options: ["type", "href", "as", "tag"],
    answer: "as",
  },
  {
    question: (
      <div>
        <p>What does createGlobalStyle do?</p>
        <CodeBlock
          language="jsx"
          code={`const GlobalStyle = createGlobalStyle\`
    body { margin: 0; }
  \``}
        />
      </div>
    ),
    options: [
      "Creates local styles",
      "Creates global styles",
      "Creates inline styles",
      "Creates module styles",
    ],
    answer: "Creates global styles",
  },
  {
    question: (
      <div>
        <p>How do you extend a styled component?</p>
        <CodeBlock
          language="jsx"
          code={`const OutlineButton = styled(CustomButton)\`
    background: white;
  \``}
        />
      </div>
    ),
    options: [
      "Using spread",
      "Using inherit",
      "Using styled(Component)",
      "Using class",
    ],
    answer: "Using styled(Component)",
  },
  {
    question: (
      <div>
        <p>What is the advantage of styled-components?</p>
      </div>
    ),
    options: [
      "Unique class names",
      "Dead code elimination",
      "Dynamic styling",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question: (
      <div>
        <p>Boolean props work how?</p>
      </div>
    ),
    options: [
      "Must pass true or false",
      "Presence means true",
      "Always false",
      "Only strings allowed",
    ],
    answer: "Presence means true",
  },
  {
    question: (
      <div>
        <p>Which prop controls dynamic color in this code?</p>
        <CodeBlock
          language="jsx"
          code={`color: \${props => (props.outline ? "#000" : "#fff")};`}
        />
      </div>
    ),
    options: ["type", "class", "outline", "id"],
    answer: "outline",
  },
  {
    question: (
      <div>
        <p>Which plugin improves debugging styled-components?</p>
      </div>
    ),
    options: [
      "babel-plugin-styled-components",
      "redux-devtools",
      "react-devtools",
      "eslint-plugin-react",
    ],
    answer: "babel-plugin-styled-components",
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
