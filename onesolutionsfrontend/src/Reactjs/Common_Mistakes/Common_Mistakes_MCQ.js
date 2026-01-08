import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
    {
      question: (
        <div>
          <p>Why must every React component be exported?</p>
        </div>
      ),
      options: [
        "To apply CSS styles",
        "To reuse the component in other files",
        "To update state",
        "To handle events",
      ],
      answer: "To reuse the component in other files",
    },
    {
      question: (
        <div>
          <p>Why should we not modify React state directly?</p>
        </div>
      ),
      options: [
        "It causes syntax errors",
        "It prevents render() from being called",
        "It deletes props",
        "It updates DOM automatically",
      ],
      answer: "It prevents render() from being called",
    },
    {
      question: (
        <div>
          <p>What happens if setState() is called inside render()?</p>
        </div>
      ),
      options: [
        "Component renders once",
        "State updates correctly",
        "Infinite rendering loop occurs",
        "No effect",
      ],
      answer: "Infinite rendering loop occurs",
    },
    {
      question: (
        <div>
          <p>Why are props considered read-only?</p>
        </div>
      ),
      options: [
        "They are immutable inputs to components",
        "They are stored in state",
        "They can be changed using setState",
        "They belong to DOM",
      ],
      answer: "They are immutable inputs to components",
    },
    {
      question: (
        <div>
          <p>Why are React Fragments used?</p>
        </div>
      ),
      options: [
        "To apply styles",
        "To return multiple elements without extra DOM nodes",
        "To update state",
        "To pass props",
      ],
      answer: "To return multiple elements without extra DOM nodes",
    },
  
    {
      question: (
        <div>
          <p>What is missing in this component setup?</p>
          <CodeBlock
            language="jsx"
            code={`const App = () => {
    return <Counter />;
  };`}
          />
        </div>
      ),
      options: [
        "export statement",
        "render method",
        "state object",
        "props",
      ],
      answer: "export statement",
    },
    {
      question: (
        <div>
          <p>Why will this code fail?</p>
          <CodeBlock
            language="jsx"
            code={`const App = () => {
    return <Counter />;
  };
  
  export default App;`}
          />
        </div>
      ),
      options: [
        "Counter is not exported",
        "Counter is not imported",
        "JSX syntax error",
        "State is missing",
      ],
      answer: "Counter is not imported",
    },
    {
      question: (
        <div>
          <p>What mistake is present here?</p>
          <CodeBlock
            language="jsx"
            code={`class Counter {
    render() {
      return <p>Counter</p>;
    }
  }`}
          />
        </div>
      ),
      options: [
        "Missing render method",
        "Missing extends Component",
        "Missing export",
        "Invalid JSX",
      ],
      answer: "Missing extends Component",
    },
    {
      question: (
        <div>
          <p>Which JSX rule is violated here?</p>
          <CodeBlock
            language="jsx"
            code={`<p class="counter">Counter</p>`}
          />
        </div>
      ),
      options: [
        "JSX must return one element",
        "class should be className",
        "Missing key prop",
        "Invalid HTML tag",
      ],
      answer: "class should be className",
    },
    {
      question: (
        <div>
          <p>What is the mistake in this event handler?</p>
          <CodeBlock
            language="jsx"
            code={`<button onclick={this.onIncrement}>Increase</button>`}
          />
        </div>
      ),
      options: [
        "onclick should be onClick",
        "Function must be called",
        "JSX syntax error",
        "State is missing",
      ],
      answer: "onclick should be onClick",
    },
    {
      question: (
        <div>
          <p>Why is this incorrect?</p>
          <CodeBlock
            language="javascript"
            code={`this.state.count = this.state.count + 1;`}
          />
        </div>
      ),
      options: [
        "State should be immutable",
        "JSX error",
        "Props are modified",
        "setState is missing import",
      ],
      answer: "State should be immutable",
    },
    {
      question: (
        <div>
          <p>What is the correct way to update state here?</p>
          <CodeBlock
            language="javascript"
            code={`this.setState(prevState => ({
    count: prevState.count + 1
  }));`}
          />
        </div>
      ),
      options: [
        "Direct mutation",
        "Using previous state safely",
        "Updating props",
        "Avoiding re-render",
      ],
      answer: "Using previous state safely",
    },
    {
      question: (
        <div>
          <p>What is wrong with this render method?</p>
          <CodeBlock
            language="jsx"
            code={`render() {
    this.setState({ count: 0 });
    return <div />;
  }`}
          />
        </div>
      ),
      options: [
        "render returns JSX",
        "setState inside render",
        "Missing state",
        "Missing props",
      ],
      answer: "setState inside render",
    },
    {
      question: (
        <div>
          <p>Why will this component throw an error?</p>
          <CodeBlock
            language="jsx"
            code={`const Welcome = () => (
    <h1>Hello</h1>
    <p>Learning React</p>
  );`}
          />
        </div>
      ),
      options: [
        "Multiple JSX elements returned",
        "Missing export",
        "Invalid HTML",
        "Missing props",
      ],
      answer: "Multiple JSX elements returned",
    },
    {
      question: (
        <div>
          <p>Which solution fixes the JSX issue?</p>
          <CodeBlock
            language="jsx"
            code={`<>
    <h1>Hello</h1>
    <p>Learning React</p>
  </>`}
          />
        </div>
      ),
      options: [
        "Using Fragment",
        "Using div",
        "Using state",
        "Using props",
      ],
      answer: "Using Fragment",
    },
];
  
const Common_Mistakes_MCQ = ({
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

export default Common_Mistakes_MCQ;
