import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
    {
      question: "What is the purpose of the Switch component in React Router?",
      options: [
        "To render all matching routes",
        "To render only the first matching route",
        "To block navigation",
        "To store route history",
      ],
      answer: "To render only the first matching route",
    },
    {
      question: "What is a Wrapper Component?",
      options: [
        "A component that wraps HTML",
        "A component that reuses logic for multiple routes",
        "A styling component",
        "A component for API calls",
      ],
      answer: "A component that reuses logic for multiple routes",
    },
    {
      question: "What does a ProtectedRoute do?",
      options: [
        "Protects CSS",
        "Checks authentication before rendering a route",
        "Encrypts data",
        "Stores cookies",
      ],
      answer: "Checks authentication before rendering a route",
    },
    {
      question: "Where is JWT token stored in this application?",
      options: [
        "Local Storage",
        "Redux Store",
        "Cookies",
        "Session Storage",
      ],
      answer: "Cookies",
    },
    {
      question: "Which HTTP header is used to send JWT token?",
      options: [
        "Content-Type",
        "Accept",
        "Authorization",
        "Cookie",
      ],
      answer: "Authorization",
    },
  
   
    {
      question: (
        <div>
          <p>What will this code do if token is undefined?</p>
          <CodeBlock language="jsx" code={`if (token === undefined) { return <Redirect to="/login" />; }`} />
        </div>
      ),
      options: [
        "Show error page",
        "Reload page",
        "Redirect to login page",
        "Log out user",
      ],
      answer: "Redirect to login page",
    },
    {
      question: (
        <div>
          <p>What does this wrapper return when user is authenticated?</p>
          <CodeBlock language="jsx" code={`return <Route {...props} />;`} />
        </div>
      ),
      options: [
        "Redirect",
        "Component",
        "Route",
        "Switch",
      ],
      answer: "Route",
    },
    {
      question: (
        <div>
          <p>What is the role of this code?</p>
          <CodeBlock language="jsx" code={`Authorization: \`Bearer \${jwtToken}\``} />
        </div>
      ),
      options: [
        "Send password",
        "Send cookie",
        "Send JWT in header",
        "Send user id",
      ],
      answer: "Send JWT in header",
    },
    {
      question: (
        <div>
          <p>What happens when Logout button is clicked?</p>
          <CodeBlock language="javascript" code={`Cookie.remove("jwt_token"); history.replace("/login");`} />
        </div>
      ),
      options: [
        "JWT refreshed",
        "JWT removed and redirected to login",
        "Page reload",
        "API call",
      ],
      answer: "JWT removed and redirected to login",
    },
    {
      question: (
        <div>
          <p>Which component allows programmatic navigation?</p>
          <CodeBlock language="jsx" code={`export default withRouter(Header);`} />
        </div>
      ),
      options: [
        "BrowserRouter",
        "Route",
        "withRouter",
        "Switch",
      ],
      answer: "withRouter",
    },
    {
      question: (
        <div>
          <p>Where are API calls made in AllProductsSection?</p>
          <CodeBlock language="jsx" code={`componentDidMount() { this.getProducts(); }`} />
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
          <p>What does this line do?</p>
          <CodeBlock language="jsx" code={`<ProtectedRoute exact path="/products" component={Products} />`} />
        </div>
      ),
      options: [
        "Creates public route",
        "Creates private route",
        "Deletes route",
        "Redirects route",
      ],
      answer: "Creates private route",
    },
    {
      question: (
        <div>
          <p>What will happen if JWT is missing?</p>
          <CodeBlock language="jsx" code={`<Redirect to="/login" />`} />
        </div>
      ),
      options: [
        "User stays on page",
        "User redirected to home",
        "User redirected to login",
        "User logged out",
      ],
      answer: "User redirected to login",
    },
    {
      question: (
        <div>
          <p>Which method is used to get cookie value?</p>
          <CodeBlock language="javascript" code={`Cookies.get("jwt_token")`} />
        </div>
      ),
      options: [
        "Cookies.fetch()",
        "Cookies.read()",
        "Cookies.get()",
        "Cookies.load()",
      ],
      answer: "Cookies.get()",
    },
    {
      question: (
        <div>
          <p>Which HTTP method is used to fetch products?</p>
          <CodeBlock language="javascript" code={`method: "GET"`} />
        </div>
      ),
      options: [
        "POST",
        "PUT",
        "DELETE",
        "GET",
      ],
      answer: "GET",
    },
];
  
const Authentication_3_MCQ = ({
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

export default Authentication_3_MCQ;
