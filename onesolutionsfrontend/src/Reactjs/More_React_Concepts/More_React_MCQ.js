import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
    {
      question: (
        <div>
          <p>What is the Virtual DOM?</p>
        </div>
      ),
      options: [
        "Actual HTML DOM",
        "JavaScript representation of the real DOM",
        "CSS Object Model",
        "Browser cache",
      ],
      answer: "JavaScript representation of the real DOM",
    },
    {
      question: (
        <div>
          <p>What is Reconciliation in React?</p>
        </div>
      ),
      options: [
        "Rendering UI",
        "Comparing two Virtual DOM trees and updating differences",
        "Creating components",
        "Handling events",
      ],
      answer: "Comparing two Virtual DOM trees and updating differences",
    },
    {
      question: (
        <div>
          <p>What is React Batch Updating?</p>
        </div>
      ),
      options: [
        "Updating multiple states separately",
        "Combining multiple setState calls into one render",
        "Fetching multiple APIs",
        "Rendering multiple components",
      ],
      answer: "Combining multiple setState calls into one render",
    },
    {
      question: (
        <div>
          <p>Which syntax is used to update state based on previous state?</p>
        </div>
      ),
      options: [
        "Object Syntax",
        "Callback Syntax",
        "String Syntax",
        "Array Syntax",
      ],
      answer: "Callback Syntax",
    },
    {
      question: (
        <div>
          <p>Which prop represents content between opening and closing tags?</p>
        </div>
      ),
      options: ["value", "text", "children", "content"],
      answer: "children",
    },
    {
      question: (
        <div>
          <p>What will be the final count value?</p>
          <CodeBlock
            language="jsx"
            code={`this.setState((prevState) => ({count: prevState.count + 1}))
  this.setState((prevState) => ({count: prevState.count + 1}))
  this.setState((prevState) => ({count: prevState.count + 1}))`}
          />
        </div>
      ),
      options: ["1", "2", "3", "0"],
      answer: "3",
    },
    {
      question: (
        <div>
          <p>Which syntax is this?</p>
          <CodeBlock
            language="jsx"
            code={`this.setState({ count: 5 })`}
          />
        </div>
      ),
      options: [
        "Callback Syntax",
        "Object Syntax",
        "Promise Syntax",
        "Async Syntax",
      ],
      answer: "Object Syntax",
    },
    {
      question: (
        <div>
          <p>Why does this render only once?</p>
          <CodeBlock
            language="jsx"
            code={`this.setState(prev => ({count: prev.count + 1}))
  this.setState(prev => ({count: prev.count + 1}))`}
          />
        </div>
      ),
      options: [
        "Because of reconciliation",
        "Because of batch updating",
        "Because of keys",
        "Because of children",
      ],
      answer: "Because of batch updating",
    },
    {
      question: (
        <div>
          <p>What does <code>props.children</code> display?</p>
          <CodeBlock
            language="jsx"
            code={`<SocialButton>Like</SocialButton>`}
          />
        </div>
      ),
      options: ["Button", "Like", "SocialButton", "Undefined"],
      answer: "Like",
    },
    {
      question: (
        <div>
          <p>Which input is controlled?</p>
          <CodeBlock
            language="jsx"
            code={`<input value={searchInput} onChange={this.onChangeSearchInput} />`}
          />
        </div>
      ),
      options: [
        "Controlled Input",
        "Uncontrolled Input",
        "Read Only Input",
        "Static Input",
      ],
      answer: "Controlled Input",
    },
    {
      question: (
        <div>
          <p>What is missing to make this controlled?</p>
          <CodeBlock
            language="jsx"
            code={`<input type="text" />`}
          />
        </div>
      ),
      options: ["onClick", "onChange and value", "ref", "id"],
      answer: "onChange and value",
    },
    {
      question: (
        <div>
          <p>Why are keys used in lists?</p>
          <CodeBlock
            language="jsx"
            code={`<li key={user.id}>{user.name}</li>`}
          />
        </div>
      ),
      options: [
        "For styling",
        "To uniquely identify elements",
        "To fetch data",
        "For routing",
      ],
      answer: "To uniquely identify elements",
    },
    {
      question: (
        <div>
          <p>Which comparison process improves performance?</p>
          <CodeBlock
            language="jsx"
            code={`React compares old and new Virtual DOM`}
          />
        </div>
      ),
      options: [
        "Hydration",
        "Reconciliation",
        "Compilation",
        "Minification",
      ],
      answer: "Reconciliation",
    },
    {
      question: (
        <div>
          <p>Which state update will give wrong result?</p>
          <CodeBlock
            language="jsx"
            code={`this.setState({count: this.state.count + 1})
  this.setState({count: this.state.count + 1})`}
          />
        </div>
      ),
      options: [
        "Object Syntax",
        "Callback Syntax",
        "Children Prop",
        "Keys",
      ],
      answer: "Object Syntax",
    },
    {
      question: (
        <div>
          <p>What happens when list items change without keys?</p>
          <CodeBlock
            language="jsx"
            code={`users.map(user => <li>{user.name}</li>)`}
          />
        </div>
      ),
      options: [
        "Better performance",
        "React cannot track changes efficiently",
        "No re-render",
        "Crash",
      ],
      answer: "React cannot track changes efficiently",
    },
  ];
  

const More_React_MCQ = ({
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

export default More_React_MCQ;
