import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question:
      "Why should user-defined functions in class components be written as arrow functions?",
    options: [
      "To improve performance",
      "To avoid re-rendering",
      "To bind 'this' automatically",
      "To enable lifecycle methods",
    ],
    answer: "To bind 'this' automatically",
  },
  {
    question:
      "What happens if a normal function is used instead of arrow function in event handlers?",
    options: [
      "this refers to component",
      "this becomes undefined",
      "State updates faster",
      "No difference",
    ],
    answer: "this becomes undefined",
  },
  {
    question: "Why should Redirect not be used inside event handlers?",
    options: [
      "It is asynchronous",
      "It returns JSX",
      "It requires props",
      "It clears cookies",
    ],
    answer: "It returns JSX",
  },
  {
    question:
      "Which method should be used for navigation inside event handlers?",
    options: [
      "Redirect",
      "Link",
      "history.push() / history.replace()",
      "Switch",
    ],
    answer: "history.push() / history.replace()",
  },
  {
    question: "Why should history.replace() not be called inside render()?",
    options: [
      "render must return JSX",
      "It causes memory leak",
      "It clears state",
      "It blocks API calls",
    ],
    answer: "render must return JSX",
  },
  {
    question: "Which component should be used in render for redirection?",
    options: ["withRouter", "Switch", "Redirect", "Link"],
    answer: "Redirect",
  },
  {
    question: "Why is withRouter required for Header component?",
    options: [
      "To pass props",
      "To access history object",
      "To fetch API",
      "To store cookies",
    ],
    answer: "To access history object",
  },
  {
    question: "What happens if withRouter is not used and history is accessed?",
    options: [
      "Works normally",
      "history becomes undefined",
      "Component crashes",
      "State resets",
    ],
    answer: "history becomes undefined",
  },
  {
    question: "What is the mistake when using wrong key names in request body?",
    options: [
      "Server ignores request",
      "State not updated",
      "API returns error",
      "Redirect fails",
    ],
    answer: "API returns error",
  },
  {
    question: "Which key name is correct for login API?",
    options: ["userName", "user_name", "username", "name"],
    answer: "username",
  },
  {
    question: "What should be updated to show error message on login failure?",
    options: [
      "errorMsg only",
      "showSubmitError only",
      "Both showSubmitError and errorMsg",
      "password",
    ],
    answer: "Both showSubmitError and errorMsg",
  },
  {
    question: "Why is showSubmitError required in state?",
    options: [
      "To hide form",
      "To show loading",
      "To conditionally render error message",
      "To validate token",
    ],
    answer: "To conditionally render error message",
  },
  {
    question: "Which method correctly sets error state?",
    options: [
      "this.errorMsg = value",
      "this.state.errorMsg = value",
      "this.setState({errorMsg, showSubmitError: true})",
      "this.props.errorMsg = value",
    ],
    answer: "this.setState({errorMsg, showSubmitError: true})",
  },
  {
    question: "Which lifecycle methods need not be arrow functions?",
    options: [
      "Custom handlers",
      "Render methods",
      "Lifecycle methods",
      "API functions",
    ],
    answer: "Lifecycle methods",
  },
  {
    question:
      "Which of the following is a common mistake in React class components?",
    options: [
      "Using arrow functions",
      "Using Redirect in render",
      "Using history in events",
      "Using normal functions for event handlers",
    ],
    answer: "Using normal functions for event handlers",
  },
];

const Common_Mistake_3_MCQ = ({
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

export default Common_Mistake_3_MCQ;
