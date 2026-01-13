import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>Who can see Exclusive Prime Deals?</p>
      </div>
    ),
    options: [
      "All users",
      "Only logged-in users",
      "Only Prime users",
      "Only Admin",
    ],
    answer: "Only Prime users",
  },
  {
    question: (
      <div>
        <p>Which view is shown while the API request is in progress?</p>
      </div>
    ),
    options: ["Success View", "Failure View", "Loading View", "Not Found View"],
    answer: "Loading View",
  },
  {
    question: (
      <div>
        <p>Which is NOT a reason for API call failure?</p>
      </div>
    ),
    options: [
      "Unauthorized credentials",
      "Missing Authorization header",
      "Wrong HTTP method",
      "Valid JWT token",
    ],
    answer: "Valid JWT token",
  },
  {
    question: (
      <div>
        <p>Which state variable is used only for Success and Loading views?</p>
      </div>
    ),
    options: ["apiStatus", "isLoading", "productsList", "jwtToken"],
    answer: "isLoading",
  },
  {
    question: (
      <div>
        <p>Which state variable handles Success, Failure, and Loading views?</p>
      </div>
    ),
    options: ["isLoading", "apiStatus", "token", "primeDeals"],
    answer: "apiStatus",
  },
  {
    question: (
      <div>
        <p>What is the purpose of the Authorization header?</p>
        <CodeBlock
          language="jsx"
          code={`headers: { Authorization: \`Bearer \${jwtToken}\` }`}
        />
      </div>
    ),
    options: [
      "Send username",
      "Send JWT token",
      "Send password",
      "Send cookies",
    ],
    answer: "Send JWT token",
  },
  {
    question: (
      <div>
        <p>Why are apiStatusConstants used?</p>
        <CodeBlock
          language="jsx"
          code={`const apiStatusConstants = { initial: 'INITIAL', success: 'SUCCESS' }`}
        />
      </div>
    ),
    options: [
      "For styling",
      "To manage API states clearly",
      "To reduce code",
      "To handle routing",
    ],
    answer: "To manage API states clearly",
  },
  {
    question: (
      <div>
        <p>What does IN_PROGRESS state indicate?</p>
        <CodeBlock
          language="jsx"
          code={`this.setState({apiStatus: apiStatusConstants.inProgress})`}
        />
      </div>
    ),
    options: ["Success", "Failure", "Loading", "Initial"],
    answer: "Loading",
  },
  {
    question: (
      <div>
        <p>What does HTTP status 401 mean?</p>
        <CodeBlock
          language="jsx"
          code={`if (response.status === 401) { apiStatus: 'FAILURE' }`}
        />
      </div>
    ),
    options: ["Success", "Unauthorized", "Not Found", "Server Error"],
    answer: "Unauthorized",
  },
  {
    question: (
      <div>
        <p>What is rendered when API status is SUCCESS?</p>
        <CodeBlock
          language="jsx"
          code={`case apiStatusConstants.success: return this.renderPrimeDealsList()`}
        />
      </div>
    ),
    options: ["Loader", "Failure Image", "Prime Deals List", "Redirect"],
    answer: "Prime Deals List",
  },
  {
    question: (
      <div>
        <p>This is an example of which concept?</p>
        <CodeBlock
          language="jsx"
          code={`{isLoading ? this.renderLoader() : this.renderProductsList()}`}
        />
      </div>
    ),
    options: [
      "Routing",
      "Conditional Rendering",
      "State Update",
      "Props Passing",
    ],
    answer: "Conditional Rendering",
  },
  {
    question: (
      <div>
        <p>When is Redirect to login triggered?</p>
        <CodeBlock
          language="jsx"
          code={`if (token === undefined) { return <Redirect to="/login" /> }`}
        />
      </div>
    ),
    options: [
      "When token exists",
      "When token is expired",
      "When token is undefined",
      "When API fails",
    ],
    answer: "When token is undefined",
  },
  {
    question: (
      <div>
        <p>What is the role of ProtectedRoute?</p>
        <CodeBlock
          language="jsx"
          code={`<ProtectedRoute path="/products" component={Products} />`}
        />
      </div>
    ),
    options: [
      "Load components faster",
      "Restrict access to authenticated users",
      "Fetch API data",
      "Handle forms",
    ],
    answer: "Restrict access to authenticated users",
  },
  {
    question: (
      <div>
        <p>This state update indicates which API result?</p>
        <CodeBlock
          language="jsx"
          code={`this.setState({apiStatus: apiStatusConstants.success})`}
        />
      </div>
    ),
    options: ["Failure", "Loading", "Success", "Initial"],
    answer: "Success",
  },
  {
    question: (
      <div>
        <p>What does this component render?</p>
        <CodeBlock
          language="jsx"
          code={`renderLoadingView = () => <Loader type="ThreeDots" />`}
        />
      </div>
    ),
    options: ["Error message", "Prime Deals", "Spinner", "Redirect"],
    answer: "Spinner",
  },
];

const Authentication_P4_MCQ = ({
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

export default Authentication_P4_MCQ;
