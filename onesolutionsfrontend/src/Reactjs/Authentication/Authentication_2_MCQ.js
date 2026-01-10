import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: "What does JWT stand for?",
    options: [
      "Java Web Token",
      "JSON Web Token",
      "JavaScript Web Tool",
      "JSON Website Token",
    ],
    answer: "JSON Web Token",
  },
  {
    question: "Where should JWT token be sent in an HTTP request?",
    options: [
      "Body",
      "Query Params",
      "Headers with Authorization key",
      "Cookies only",
    ],
    answer: "Headers with Authorization key",
  },
  {
    question: "Which storage mechanism supports expiration?",
    options: ["Local Storage", "Session Storage", "Cookies", "IndexedDB"],
    answer: "Cookies",
  },
  {
    question: "Which method removes a cookie using js-cookie?",
    options: [
      "Cookies.delete()",
      "Cookies.clear()",
      "Cookies.remove()",
      "Cookies.unset()",
    ],
    answer: "Cookies.remove()",
  },
  {
    question: "Which function provides routing props to non-route components?",
    options: ["useHistory", "withRouter", "BrowserRouter", "Switch"],
    answer: "withRouter",
  },
  {
    question: (
      <div>
        <p>What does this header represent?</p>
        <CodeBlock code={`Authorization: Bearer jwt_token`} />
      </div>
    ),
    options: [
      "Sending password",
      "Sending session id",
      "Sending JWT token",
      "Sending API key",
    ],
    answer: "Sending JWT token",
  },
  {
    question: (
      <div>
        <p>What happens if JWT is stored in state and page refreshes?</p>
        <CodeBlock code={`this.state = { jwtToken: "abc123" }`} />
      </div>
    ),
    options: [
      "Token persists",
      "Token is encrypted",
      "Token is lost",
      "Token is refreshed",
    ],
    answer: "Token is lost",
  },
  {
    question: (
      <div>
        <p>Which method sets a cookie?</p>
        <CodeBlock
          language="javascript"
          code={`Cookies.set('jwt_token', token, {expires: 1})`}
        />
      </div>
    ),
    options: ["set()", "get()", "remove()", "clear()"],
    answer: "set()",
  },
  {
    question: (
      <div>
        <p>Which method fetches a cookie?</p>
        <CodeBlock language="javascript" code={`Cookies.get('jwt_token')`} />
      </div>
    ),
    options: [
      "Cookies.fetch()",
      "Cookies.get()",
      "Cookies.read()",
      "Cookies.load()",
    ],
    answer: "Cookies.get()",
  },
  {
    question: (
      <div>
        <p>Which component redirects users?</p>
        <CodeBlock language="jsx" code={`<Redirect to="/login" />`} />
      </div>
    ),
    options: ["Link", "Route", "Switch", "Redirect"],
    answer: "Redirect",
  },
  {
    question: (
      <div>
        <p>Redirect internally uses which methods?</p>
        <CodeBlock code={`history.push() / history.replace()`} />
      </div>
    ),
    options: ["setState", "fetch", "history methods", "componentDidMount"],
    answer: "history methods",
  },
  {
    question: (
      <div>
        <p>Why is withRouter used?</p>
        <CodeBlock language="jsx" code={`export default withRouter(Header)`} />
      </div>
    ),
    options: [
      "To style component",
      "To pass state",
      "To access routing props",
      "To create routes",
    ],
    answer: "To access routing props",
  },
  {
    question: (
      <div>
        <p>What does this do on logout?</p>
        <CodeBlock language="javascript" code={`Cookies.remove('jwt_token')`} />
      </div>
    ),
    options: ["Encrypt token", "Refresh token", "Delete token", "Store token"],
    answer: "Delete token",
  },
  {
    question: (
      <div>
        <p>Why use history.replace('/login') on logout?</p>
        <CodeBlock language="javascript" code={`history.replace('/login')`} />
      </div>
    ),
    options: [
      "Allow back navigation",
      "Prevent going back",
      "Reload page",
      "Clear cache",
    ],
    answer: "Prevent going back",
  },
  {
    question: (
      <div>
        <p>What happens if JWT is undefined?</p>
        <CodeBlock
          language="jsx"
          code={`if(jwtToken === undefined) return <Redirect to="/login" />`}
        />
      </div>
    ),
    options: [
      "User stays on page",
      "User logs out",
      "User redirected to login",
      "App crashes",
    ],
    answer: "User redirected to login",
  },
];

const Authentication_2_MCQ = ({
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

export default Authentication_2_MCQ;
