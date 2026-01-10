import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [

  {
    question: (
      <div>
        <p>What is the main purpose of keys in React?</p>
      </div>
    ),
    options: [
      "To style list items",
      "To uniquely identify elements in a list",
      "To pass data to child components",
      "To update state",
    ],
    answer: "To uniquely identify elements in a list",
  },
  {
    question: (
      <div>
        <p>Why are keys important for performance?</p>
      </div>
    ),
    options: [
      "They reduce bundle size",
      "They prevent unnecessary re-renders",
      "They improve API speed",
      "They cache components",
    ],
    answer: "They prevent unnecessary re-renders",
  },
  {
    question: (
      <div>
        <p>Which is the best choice for a key?</p>
      </div>
    ),
    options: [
      "Array index",
      "Random number",
      "Unique ID from data",
      "Component name",
    ],
    answer: "Unique ID from data",
  },
  {
    question: (
      <div>
        <p>Are keys accessible inside child components as props?</p>
      </div>
    ),
    options: [
      "Yes",
      "No",
      "Only in class components",
      "Only in functional components",
    ],
    answer: "No",
  },
  {
    question: (
      <div>
        <p>What can happen if keys are not provided?</p>
      </div>
    ),
    options: [
      "Compilation error",
      "UI bugs and performance issues",
      "App crashes immediately",
      "State updates stop working",
    ],
    answer: "UI bugs and performance issues",
  },


  {
    question: (
      <div>
        <p>Which key usage shown below is correct?</p>
        <CodeBlock
          language="jsx"
          code={`userDetailsList.map(user => (
  <UserProfile key={user.uniqueNo} userDetails={user} />
));`}
        />
      </div>
    ),
    options: [
      "Correct usage of keys",
      "Incorrect because key must be index",
      "Incorrect because key must be name",
      "Incorrect because key must be random",
    ],
    answer: "Correct usage of keys",
  },
  {
    question: (
      <div>
        <p>Why does this log undefined?</p>
        <CodeBlock
          language="jsx"
          code={`const UserProfile = props => {
  console.log(props.key);
  return <li>User</li>;
};`}
        />
      </div>
    ),
    options: [
      "Key is not passed correctly",
      "Key is reserved and not available as prop",
      "Props are empty",
      "Component did not re-render",
    ],
    answer: "Key is reserved and not available as prop",
  },
  {
    question: (
      <div>
        <p>How can the ID be accessed inside the component?</p>
        <CodeBlock
          language="jsx"
          code={`<UserProfile
  key={user.uniqueNo}
  uniqueNo={user.uniqueNo}
  name={user.name}
/>`}
        />
      </div>
    ),
    options: [
      "Using props.key",
      "Using props.id",
      "Passing it explicitly as a prop",
      "Using state",
    ],
    answer: "Passing it explicitly as a prop",
  },
  {
    question: (
      <div>
        <p>What is wrong with this approach?</p>
        <CodeBlock
          language="jsx"
          code={`userDetailsList.map((user, index) => (
  <UserProfile key={index} userDetails={user} />
));`}
        />
      </div>
    ),
    options: [
      "Index cannot be used as key",
      "Causes issues when list changes",
      "Breaks JSX",
      "Creates syntax error",
    ],
    answer: "Causes issues when list changes",
  },
  {
    question: (
      <div>
        <p>What happens if list items are reordered with index as key?</p>
        <CodeBlock
          language="jsx"
          code={`key={index}`}
        />
      </div>
    ),
    options: [
      "No effect",
      "Incorrect component updates",
      "App crashes",
      "State resets correctly",
    ],
    answer: "Incorrect component updates",
  },
  {
    question: (
      <div>
        <p>Which value is used as key here?</p>
        <CodeBlock
          language="jsx"
          code={`<UserProfile key={user.uniqueNo} />`}
        />
      </div>
    ),
    options: [
      "user.name",
      "user.role",
      "user.uniqueNo",
      "user index",
    ],
    answer: "user.uniqueNo",
  },
  {
    question: (
      <div>
        <p>Why is a unique string preferred as key?</p>
        <CodeBlock
          language="jsx"
          code={`key={user.uniqueNo}`}
        />
      </div>
    ),
    options: [
      "Strings render faster",
      "Ensures stable identity across renders",
      "Required by JSX",
      "Avoids API calls",
    ],
    answer: "Ensures stable identity across renders",
  },
  {
    question: (
      <div>
        <p>What does React use keys for internally?</p>
        <CodeBlock
          language="jsx"
          code={`<li key={id}>Item</li>`}
        />
      </div>
    ),
    options: [
      "Passing props",
      "Tracking list item changes",
      "Styling elements",
      "Updating state",
    ],
    answer: "Tracking list item changes",
  },
  {
    question: (
      <div>
        <p>Which component correctly renders a list?</p>
        <CodeBlock
          language="jsx"
          code={`<ul>
  {userDetailsList.map(user => (
    <UserProfile key={user.uniqueNo} userDetails={user} />
  ))}
</ul>`}
        />
      </div>
    ),
    options: [
      "Correct list rendering",
      "Missing state",
      "Missing props",
      "Invalid JSX",
    ],
    answer: "Correct list rendering",
  },
  {
    question: (
      <div>
        <p>What problem does this command fix?</p>
        <CodeBlock
          language="bash"
          code={`fs.inotify.max_user_watches=524288`}
        />
      </div>
    ),
    options: [
      "React rendering issue",
      "ENOSPC file watcher error",
      "Routing error",
      "Build failure",
    ],
    answer: "ENOSPC file watcher error",
  },
];


const Lists_Keys_MCQ = ({
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

export default Lists_Keys_MCQ;
