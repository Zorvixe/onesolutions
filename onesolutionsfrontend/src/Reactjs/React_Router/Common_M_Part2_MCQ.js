import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
   
    {
      question: (
        <div>
          <p>Why can’t React render a Promise object?</p>
        </div>
      ),
      options: [
        "Promises are asynchronous",
        "React can render only JSX elements",
        "Promises block the UI",
        "Promises return JSON",
      ],
      answer: "React can render only JSX elements",
    },
    {
      question: (
        <div>
          <p>Where is the best place to make API calls in class components?</p>
        </div>
      ),
      options: [
        "constructor()",
        "render()",
        "componentDidMount()",
        "componentWillUnmount()",
      ],
      answer: "componentDidMount()",
    },
    {
      question: (
        <div>
          <p>Which component must wrap Routes and Links?</p>
        </div>
      ),
      options: [
        "Switch",
        "Route",
        "BrowserRouter",
        "Link",
      ],
      answer: "BrowserRouter",
    },
    {
      question: (
        <div>
          <p>Why should each Route have a unique path?</p>
        </div>
      ),
      options: [
        "To improve styling",
        "To avoid rendering wrong component",
        "To reduce API calls",
        "To avoid re-renders",
      ],
      answer: "To avoid rendering wrong component",
    },
    {
      question: (
        <div>
          <p>What happens if a Route without a path is placed first inside Switch?</p>
        </div>
      ),
      options: [
        "Nothing happens",
        "Only home renders",
        "It renders for all paths",
        "App crashes",
      ],
      answer: "It renders for all paths",
    },
  
    {
      question: (
        <div>
          <p>What is the mistake in this render method?</p>
          <CodeBlock
            language="jsx"
            code={`render() {
    return (
      <div>
        {this.getBlogsData()}
      </div>
    )
  }`}
          />
        </div>
      ),
      options: [
        "Rendering Promise object",
        "Missing return",
        "Wrong JSX syntax",
        "Incorrect state usage",
      ],
      answer: "Rendering Promise object",
    },
    {
      question: (
        <div>
          <p>Why is this approach incorrect?</p>
          <CodeBlock
            language="jsx"
            code={`getBlogsData = async () => {
    const response = await fetch(url)
  }`}
          />
        </div>
      ),
      options: [
        "fetch is invalid",
        "Async functions return Promises",
        "State is not updated",
        "ComponentDidMount is missing",
      ],
      answer: "Async functions return Promises",
    },
    {
      question: (
        <div>
          <p>Which lifecycle method correctly triggers API calls?</p>
          <CodeBlock
            language="jsx"
            code={`componentDidMount() {
    this.getBlogsData()
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
      answer: "componentDidMount",
    },
    {
      question: (
        <div>
          <p>What is missing in this routing setup?</p>
          <CodeBlock
            language="jsx"
            code={`const App = () => (
    <>
      <Header />
      <Route path="/" component={Home} />
    </>
  )`}
          />
        </div>
      ),
      options: [
        "Switch",
        "BrowserRouter",
        "Link",
        "exact keyword",
      ],
      answer: "BrowserRouter",
    },
    {
      question: (
        <div>
          <p>What is the issue with this route path?</p>
          <CodeBlock
            language="jsx"
            code={`<Route path="/abot" component={About} />`}
          />
        </div>
      ),
      options: [
        "Missing exact",
        "Wrong component",
        "Typo in path",
        "Duplicate route",
      ],
      answer: "Typo in path",
    },
    {
      question: (
        <div>
          <p>Why is exact required here?</p>
          <CodeBlock
            language="jsx"
            code={`<Route path="/" component={BlogsList} />`}
          />
        </div>
      ),
      options: [
        "To match only root path",
        "To enable routing",
        "To avoid API calls",
        "To load Header",
      ],
      answer: "To match only root path",
    },
    {
      question: (
        <div>
          <p>What problem occurs when Switch is missing?</p>
          <CodeBlock
            language="jsx"
            code={`<Route path="/" component={Home} />
  <Route path="/about" component={About} />`}
          />
        </div>
      ),
      options: [
        "Routes won’t render",
        "Multiple routes may render",
        "App crashes",
        "Navigation fails",
      ],
      answer: "Multiple routes may render",
    },
    {
      question: (
        <div>
          <p>Why should Header be placed outside Switch?</p>
          <CodeBlock
            language="jsx"
            code={`<Switch>
    <Header />
    <Route path="/" component={Home} />
  </Switch>`}
          />
        </div>
      ),
      options: [
        "Header is not a Route",
        "Header needs props",
        "Header should render for all routes",
        "Switch cannot contain JSX",
      ],
      answer: "Header should render for all routes",
    },
    {
      question: (
        <div>
          <p>What is wrong with this dynamic route?</p>
          <CodeBlock
            language="jsx"
            code={`<Route path="/blogs/id" component={BlogItemDetails} />`}
          />
        </div>
      ),
      options: [
        "Missing exact",
        "Missing colon (:) for parameter",
        "Wrong component",
        "Duplicate route",
      ],
      answer: "Missing colon (:) for parameter",
    },
    {
      question: (
        <div>
          <p>Why is undefined logged here?</p>
          <CodeBlock
            language="jsx"
            code={`this.onSubmitFailure(data.errorText)`}
          />
        </div>
      ),
      options: [
        "Wrong API URL",
        "Incorrect key used from response",
        "Promise not resolved",
        "State not updated",
      ],
      answer: "Incorrect key used from response",
    },
];
  
 
const Common_M_Part2_MCQ = ({
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

export default Common_M_Part2_MCQ ;
