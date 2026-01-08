import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
    {
      question: (
        <div>
          <p>How are web applications categorized?</p>
        </div>
      ),
      options: [
        "Static and Dynamic",
        "Client-side and Server-side",
        "Multi-page and Single-page",
        "Frontend and Backend",
      ],
      answer: "Multi-page and Single-page",
    },
    {
      question: (
        <div>
          <p>What is a Single Page Application (SPA)?</p>
        </div>
      ),
      options: [
        "Each URL loads a new HTML file",
        "All URLs map to a single HTML page",
        "Only CSS loads dynamically",
        "Backend renders all pages",
      ],
      answer: "All URLs map to a single HTML page",
    },
    {
      question: (
        <div>
          <p>Which library is commonly used for routing in React?</p>
        </div>
      ),
      options: [
        "Redux",
        "Axios",
        "React Router",
        "Bootstrap",
      ],
      answer: "React Router",
    },
    {
      question: (
        <div>
          <p>Which component is used for navigation instead of anchor tags?</p>
        </div>
      ),
      options: [
        "Route",
        "Switch",
        "Link",
        "BrowserRouter",
      ],
      answer: "Link",
    },
    {
      question: (
        <div>
          <p>Which feature ensures faster page loading in SPAs?</p>
        </div>
      ),
      options: [
        "Reloading the page",
        "Loading only required components",
        "Downloading all pages",
        "Using multiple HTML files",
      ],
      answer: "Loading only required components",
    },
  
    {
      question: (
        <div>
          <p>What is the purpose of this component?</p>
          <CodeBlock
            language="jsx"
            code={`<BrowserRouter>
    <App />
  </BrowserRouter>`}
          />
        </div>
      ),
      options: [
        "To render JSX",
        "To enable routing in the app",
        "To create links",
        "To define routes",
      ],
      answer: "To enable routing in the app",
    },
    {
      question: (
        <div>
          <p>What does the Link component do?</p>
          <CodeBlock
            language="jsx"
            code={`<Link to="/about">About</Link>`}
          />
        </div>
      ),
      options: [
        "Reloads the page",
        "Navigates to a route without reload",
        "Calls an API",
        "Updates state",
      ],
      answer: "Navigates to a route without reload",
    },
    {
      question: (
        <div>
          <p>What does this Route component do?</p>
          <CodeBlock
            language="jsx"
            code={`<Route path="/about" component={About} />`}
          />
        </div>
      ),
      options: [
        "Always renders About",
        "Renders About when path matches",
        "Navigates to About",
        "Redirects user",
      ],
      answer: "Renders About when path matches",
    },
    {
      question: (
        <div>
          <p>Why is the exact keyword used here?</p>
          <CodeBlock
            language="jsx"
            code={`<Route exact path="/" component={Home} />`}
          />
        </div>
      ),
      options: [
        "To allow partial matching",
        "To match the URL exactly",
        "To improve performance",
        "To enable navigation",
      ],
      answer: "To match the URL exactly",
    },
    {
      question: (
        <div>
          <p>What happens if exact is not used?</p>
          <CodeBlock
            language="jsx"
            code={`<Route path="/" component={Home} />`}
          />
        </div>
      ),
      options: [
        "Route never renders",
        "Route renders for all paths starting with /",
        "Application crashes",
        "Routing stops",
      ],
      answer: "Route renders for all paths starting with /",
    },
    {
      question: (
        <div>
          <p>What is the role of the Switch component?</p>
          <CodeBlock
            language="jsx"
            code={`<Switch>
    <Route path="/home" component={Home} />
    <Route path="/about" component={About} />
  </Switch>`}
          />
        </div>
      ),
      options: [
        "Renders all matching routes",
        "Renders the last route only",
        "Renders the first matching route",
        "Stops routing",
      ],
      answer: "Renders the first matching route",
    },
    {
      question: (
        <div>
          <p>What is the purpose of this Route?</p>
          <CodeBlock
            language="jsx"
            code={`<Route component={NotFound} />`}
          />
        </div>
      ),
      options: [
        "Renders Home",
        "Handles undefined paths",
        "Redirects user",
        "Stops routing",
      ],
      answer: "Handles undefined paths",
    },
    {
      question: (
        <div>
          <p>Which component enables SPA navigation?</p>
          <CodeBlock
            language="jsx"
            code={`<Link className="nav-link" to="/contact">Contact</Link>`}
          />
        </div>
      ),
      options: [
        "a tag",
        "Route",
        "Link",
        "Switch",
      ],
      answer: "Link",
    },
    {
      question: (
        <div>
          <p>Which import is required to use routing?</p>
          <CodeBlock
            language="jsx"
            code={`import { BrowserRouter, Route, Switch } from "react-router-dom";`}
          />
        </div>
      ),
      options: [
        "react",
        "react-dom",
        "react-router-dom",
        "redux",
      ],
      answer: "react-router-dom",
    },
    {
      question: (
        <div>
          <p>What does this routing setup create?</p>
          <CodeBlock
            language="jsx"
            code={`<BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
    </Switch>
  </BrowserRouter>`}
          />
        </div>
      ),
      options: [
        "Multi-page application",
        "Single-page application with routes",
        "Static website",
        "Server-rendered app",
      ],
      answer: "Single-page application with routes",
    },
];
 
const React_Router1_MCQ = ({
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

export default React_Router1_MCQ ;
