import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
    {
      question: (
        <div>
          <p>What is Authentication?</p>
        </div>
      ),
      options: [
        "Checking user permissions",
        "Verifying user identity",
        "Granting access to resources",
        "Restricting routes",
      ],
      answer: "Verifying user identity",
    },
    {
      question: (
        <div>
          <p>What is Authorization?</p>
        </div>
      ),
      options: [
        "User login process",
        "Verifying credentials",
        "Checking access permissions",
        "Storing JWT token",
      ],
      answer: "Checking access permissions",
    },
    {
      question: (
        <div>
          <p>Which user can perform Read, Create, Update, and Delete operations?</p>
        </div>
      ),
      options: ["Guest", "User", "Admin", "Moderator"],
      answer: "Admin",
    },
    {
      question: (
        <div>
          <p>What is stored after successful authentication?</p>
        </div>
      ),
      options: [
        "Username",
        "Password",
        "JWT Token",
        "User role",
      ],
      answer: "JWT Token",
    },
    {
      question: (
        <div>
          <p>When does the Switch component re-evaluate routes?</p>
        </div>
      ),
      options: [
        "On state change",
        "On API call",
        "On route change",
        "On component mount",
      ],
      answer: "On route change",
    },
    {
      question: (
        <div>
          <p>What is the purpose of this method?</p>
          <CodeBlock
            language="javascript"
            code={`history.push("/home");`}
          />
        </div>
      ),
      options: [
        "Reload the page",
        "Navigate and allow back navigation",
        "Replace URL permanently",
        "Logout user",
      ],
      answer: "Navigate and allow back navigation",
    },
    {
      question: (
        <div>
          <p>What does this method do?</p>
          <CodeBlock
            language="javascript"
            code={`history.replace("/login");`}
          />
        </div>
      ),
      options: [
        "Navigate and allow back navigation",
        "Reload current page",
        "Replace current route and prevent going back",
        "Clear history",
      ],
      answer: "Replace current route and prevent going back",
    },
    {
      question: (
        <div>
          <p>What happens when response.ok is true?</p>
          <CodeBlock
            language="javascript"
            code={`if (response.ok === true) {
    this.onSubmitSuccess()
  }`}
          />
        </div>
      ),
      options: [
        "Login fails",
        "Error message shown",
        "Login is successful",
        "User is logged out",
      ],
      answer: "Login is successful",
    },
    {
      question: (
        <div>
          <p>Which lifecycle event triggers route rendering?</p>
          <CodeBlock
            language="jsx"
            code={`<Switch>
    <Route exact path="/" component={Home} />
  </Switch>`}
          />
        </div>
      ),
      options: [
        "State update",
        "API response",
        "Route change",
        "Component mount",
      ],
      answer: "Route change",
    },
    {
      question: (
        <div>
          <p>Which prop allows navigation inside components?</p>
          <CodeBlock
            language="javascript"
            code={`const { history } = this.props;`}
          />
        </div>
      ),
      options: [
        "match",
        "location",
        "history",
        "route",
      ],
      answer: "history",
    },
    {
      question: (
        <div>
          <p>Why is history.replace used after login?</p>
          <CodeBlock
            language="jsx"
            code={`onSubmitSuccess = () => {
    history.replace("/")
  }`}
          />
        </div>
      ),
      options: [
        "To allow back navigation",
        "To reload the app",
        "To prevent going back to login page",
        "To clear state",
      ],
      answer: "To prevent going back to login page",
    },
    {
      question: (
        <div>
          <p>What is the role of BrowserRouter here?</p>
          <CodeBlock
            language="jsx"
            code={`<BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
    </Switch>
  </BrowserRouter>`}
          />
        </div>
      ),
      options: [
        "API handling",
        "Authentication",
        "Enable routing",
        "Protect routes",
      ],
      answer: "Enable routing",
    },
    {
      question: (
        <div>
          <p>What triggers re-rendering of components?</p>
          <CodeBlock
            language="jsx"
            code={`history.push("/")`}
          />
        </div>
      ),
      options: [
        "State change",
        "Route change",
        "API call",
        "Props update",
      ],
      answer: "Route change",
    },
    {
      question: (
        <div>
          <p>Which HTTP status range makes response.ok true?</p>
          <CodeBlock
            language="javascript"
            code={`response.ok`}
          />
        </div>
      ),
      options: [
        "1XX",
        "2XX",
        "3XX",
        "4XX",
      ],
      answer: "2XX",
    },
    {
      question: (
        <div>
          <p>Which component renders when no route matches?</p>
          <CodeBlock
            language="jsx"
            code={`<Route component={NotFound} />`}
          />
        </div>
      ),
      options: [
        "Home",
        "Login",
        "Products",
        "NotFound",
      ],
      answer: "NotFound",
    },
];
  
const Authentication_MCQ = ({
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

export default Authentication_MCQ;
