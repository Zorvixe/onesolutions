import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>Which are the two types of React components?</p>
      </div>
    ),
    options: [
      "HTML and CSS Components",
      "Functional and Class Components",
      "State and Props Components",
      "UI and Logic Components",
    ],
    answer: "Functional and Class Components",
  },
  {
    question: (
      <div>
        <p>Which method is mandatory in a React class component?</p>
      </div>
    ),
    options: ["constructor()", "componentDidMount()", "render()", "setState()"],
    answer: "render()",
  },
  {
    question: (
      <div>
        <p>What is the purpose of state in React?</p>
      </div>
    ),
    options: [
      "To store static values",
      "To store component data that changes over time",
      "To pass data between components",
      "To style components",
    ],
    answer: "To store component data that changes over time",
  },
  {
    question: (
      <div>
        <p>Which keyword is used to inherit React component features?</p>
      </div>
    ),
    options: ["implements", "inherits", "extends", "super"],
    answer: "extends",
  },
  {
    question: (
      <div>
        <p>When does a React component re-render?</p>
      </div>
    ),
    options: [
      "When props or state change",
      "When CSS changes",
      "When JavaScript reloads",
      "When render() is removed",
    ],
    answer: "When props or state change",
  },

  {
    question: (
      <div>
        <p>Which of the following correctly defines a class component?</p>
        <CodeBlock
          language="jsx"
          code={`class MyComponent extends Component {
    render() {
      return <h1>Hello</h1>;
    }
  }`}
        />
      </div>
    ),
    options: [
      "Correct class component",
      "Missing render method",
      "Invalid JSX",
      "Functional component",
    ],
    answer: "Correct class component",
  },
  {
    question: (
      <div>
        <p>How are props accessed inside a class component?</p>
        <CodeBlock
          language="jsx"
          code={`class Welcome extends Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }`}
        />
      </div>
    ),
    options: ["props.name", "this.name", "this.props.name", "state.name"],
    answer: "this.props.name",
  },
  {
    question: (
      <div>
        <p>How is state initialized in a class component?</p>
        <CodeBlock
          language="jsx"
          code={`class Counter extends Component {
    state = { count: 0 };
  }`}
        />
      </div>
    ),
    options: [
      "Using props",
      "Using setState()",
      "Using state object",
      "Using render()",
    ],
    answer: "Using state object",
  },
  {
    question: (
      <div>
        <p>Which method is used to update state?</p>
        <CodeBlock language="jsx" code={`this.setState({ count: 1 });`} />
      </div>
    ),
    options: [
      "this.updateState()",
      "this.state()",
      "this.setState()",
      "this.changeState()",
    ],
    answer: "this.setState()",
  },
  {
    question: (
      <div>
        <p>Why should we use a function inside setState?</p>
        <CodeBlock
          language="jsx"
          code={`this.setState(prevState => ({
    count: prevState.count + 1
  }));`}
        />
      </div>
    ),
    options: [
      "To avoid JSX",
      "To access previous state safely",
      "To stop rendering",
      "To pass props",
    ],
    answer: "To access previous state safely",
  },
  {
    question: (
      <div>
        <p>What will happen when only one key is updated in state?</p>
        <CodeBlock language="jsx" code={`this.setState({ key1: value3 });`} />
      </div>
    ),
    options: [
      "Entire state is replaced",
      "Only key1 is updated",
      "State becomes empty",
      "Component crashes",
    ],
    answer: "Only key1 is updated",
  },
  {
    question: (
      <div>
        <p>What is wrong with this event handler?</p>
        <CodeBlock
          language="jsx"
          code={`<button onClick={this.handleClick()}>Click</button>`}
        />
      </div>
    ),
    options: [
      "handleClick is not defined",
      "Function is called instead of passed",
      "JSX syntax error",
      "Button tag is invalid",
    ],
    answer: "Function is called instead of passed",
  },
  {
    question: (
      <div>
        <p>Which is the correct way to pass an event handler?</p>
        <CodeBlock
          language="jsx"
          code={`<button onClick={this.handleClick}>Click</button>`}
        />
      </div>
    ),
    options: [
      "Correct way",
      "Missing parentheses",
      "Invalid JSX",
      "handleClick must be called",
    ],
    answer: "Correct way",
  },
  {
    question: (
      <div>
        <p>Why are arrow functions used for event handlers?</p>
        <CodeBlock
          language="jsx"
          code={`handleClick = () => {
    console.log(this);
  };`}
        />
      </div>
    ),
    options: [
      "To avoid JSX",
      "To bind this automatically",
      "To stop re-rendering",
      "To update props",
    ],
    answer: "To bind this automatically",
  },
  {
    question: (
      <div>
        <p>Which component type should be used when state is required?</p>
      </div>
    ),
    options: [
      "Functional Component",
      "Class Component",
      "Pure Component",
      "Stateless Component",
    ],
    answer: "Class Component",
  },
];

const Class_Component_State1_MCQ = ({
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

export default Class_Component_State1_MCQ;
