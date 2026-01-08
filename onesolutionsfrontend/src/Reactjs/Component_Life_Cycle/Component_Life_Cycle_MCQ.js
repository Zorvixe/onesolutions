import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
    {
      question: (
        <div>
          <p>How many phases are there in the React component lifecycle?</p>
        </div>
      ),
      options: ["Two", "Three", "Four", "Five"],
      answer: "Three",
    },
    {
      question: (
        <div>
          <p>Which phase occurs when a component is first added to the DOM?</p>
        </div>
      ),
      options: ["Updating", "Unmounting", "Mounting", "Rendering"],
      answer: "Mounting",
    },
    {
      question: (
        <div>
          <p>Which lifecycle method is used to clean up resources?</p>
        </div>
      ),
      options: [
        "componentDidMount",
        "render",
        "componentWillUnmount",
        "constructor",
      ],
      answer: "componentWillUnmount",
    },
    {
      question: (
        <div>
          <p>When does the Updating phase occur?</p>
        </div>
      ),
      options: [
        "When component is removed",
        "When state or props change",
        "When DOM loads",
        "When constructor runs",
      ],
      answer: "When state or props change",
    },
    {
      question: (
        <div>
          <p>Which lifecycle method always returns JSX?</p>
        </div>
      ),
      options: [
        "componentDidMount",
        "constructor",
        "render",
        "componentWillUnmount",
      ],
      answer: "render",
    },
  
    {
      question: (
        <div>
          <p>Which lifecycle method is shown below?</p>
          <CodeBlock
            language="jsx"
            code={`constructor(props) {
    super(props);
    this.state = { date: props.date };
  }`}
          />
        </div>
      ),
      options: [
        "render",
        "constructor",
        "componentDidMount",
        "componentWillUnmount",
      ],
      answer: "constructor",
    },
    {
      question: (
        <div>
          <p>Why is <code>super(props)</code> required?</p>
          <CodeBlock
            language="jsx"
            code={`constructor(props) {
    super(props);
  }`}
          />
        </div>
      ),
      options: [
        "To render JSX",
        "To call React.Component constructor",
        "To update state",
        "To bind methods",
      ],
      answer: "To call React.Component constructor",
    },
    {
      question: (
        <div>
          <p>Which method runs after the component is inserted into the DOM?</p>
          <CodeBlock
            language="jsx"
            code={`componentDidMount() {
    this.timerID = setInterval(this.tick, 1000);
  }`}
          />
        </div>
      ),
      options: [
        "constructor",
        "render",
        "componentDidMount",
        "componentWillUnmount",
      ],
      answer: "componentDidMount",
    },
    {
      question: (
        <div>
          <p>What is the purpose of this method?</p>
          <CodeBlock
            language="jsx"
            code={`componentWillUnmount() {
    clearInterval(this.timerID);
  }`}
          />
        </div>
      ),
      options: [
        "Start timer",
        "Update UI",
        "Clean up resources",
        "Initialize state",
      ],
      answer: "Clean up resources",
    },
    {
      question: (
        <div>
          <p>Which phase does this method belong to?</p>
          <CodeBlock
            language="jsx"
            code={`render() {
    return <div>Hello</div>;
  }`}
          />
        </div>
      ),
      options: [
        "Mounting only",
        "Unmounting only",
        "Both Mounting and Updating",
        "Unmounting and Updating",
      ],
      answer: "Both Mounting and Updating",
    },
    {
      question: (
        <div>
          <p>What triggers this re-render?</p>
          <CodeBlock
            language="jsx"
            code={`this.setState({
    date: new Date(),
  });`}
          />
        </div>
      ),
      options: [
        "Props update",
        "State update",
        "Component mount",
        "Component unmount",
      ],
      answer: "State update",
    },
    {
      question: (
        <div>
          <p>What does this conditional rendering do?</p>
          <CodeBlock
            language="jsx"
            code={`{showClock && <Clock />}`}
          />
        </div>
      ),
      options: [
        "Always renders Clock",
        "Never renders Clock",
        "Renders Clock only when showClock is true",
        "Removes Clock permanently",
      ],
      answer: "Renders Clock only when showClock is true",
    },
    {
      question: (
        <div>
          <p>Which lifecycle method starts the timer?</p>
          <CodeBlock
            language="jsx"
            code={`this.timerID = setInterval(this.tick, 1000);`}
          />
        </div>
      ),
      options: [
        "constructor",
        "render",
        "componentDidMount",
        "componentWillUnmount",
      ],
      answer: "componentDidMount",
    },
    {
      question: (
        <div>
          <p>Which method updates the clock time every second?</p>
          <CodeBlock
            language="jsx"
            code={`tick = () => {
    this.setState({ date: new Date() });
  };`}
          />
        </div>
      ),
      options: [
        "constructor",
        "componentDidMount",
        "tick",
        "render",
      ],
      answer: "tick",
    },
    {
      question: (
        <div>
          <p>What happens when the Clock component is hidden?</p>
          <CodeBlock
            language="jsx"
            code={`componentWillUnmount() {
    clearInterval(this.timerID);
  }`}
          />
        </div>
      ),
      options: [
        "Timer continues",
        "State updates",
        "Timer is cleared",
        "Render runs again",
      ],
      answer: "Timer is cleared",
    },
];
  

const Component_Life_Cycle_MCQ = ({
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

export default Component_Life_Cycle_MCQ;
