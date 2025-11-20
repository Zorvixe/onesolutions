import React, { useState, useEffect } from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is the purpose of <code>key</code> in React lists?</p>
      </div>
    ),
    options: [
      "To style list items",
      "To help React identify which items changed, added, or removed",
      "To pass data to child components",
      "To improve CSS performance",
    ],
    answer: "To help React identify which items changed, added, or removed",
  },
  {
    question: (
      <div>
        <p>Which is the best choice for a key?</p>
        <CodeBlock
          language="jsx"
          code={`userDetailsList.map(user => (
  <UserProfile key={user.id} userDetails={user} />
));`}
        />
      </div>
    ),
    options: [
      "user.name",
      "Math.random()",
      "index from map()",
      "user.id (unique identifier)",
    ],
    answer: "user.id (unique identifier)",
  },
  {
    question: (
      <div>
        <p>Can <code>key</code> be accessed inside the component as a prop?</p>
        <CodeBlock
          language="jsx"
          code={`const Item = (props) => {
  console.log(props.key); // ?
  return <li>{props.name}</li>;
};`}
        />
      </div>
    ),
    options: ["Yes", "No, key is reserved by React", "Only in class components", "Only if passed manually"],
    answer: "No, key is reserved by React",
  },
  {
    question: (
      <div>
        <p>How to pass the unique ID to the child if needed?</p>
      </div>
    ),
    options: [
      "Use key={id} and read props.key",
      "Pass it as a separate prop like id={user.id}",
      "Use React.cloneElement",
      "It's automatically available",
    ],
    answer: "Pass it as a separate prop like id={user.id}",
  },
  {
    question: (
      <div>
        <p>What happens if you use array index as key and delete an item?</p>
      </div>
    ),
    options: [
      "No effect",
      "React may re-render wrong components",
      "App crashes",
      "Performance improves",
    ],
    answer: "React may re-render wrong components",
  },
  {
    question: (
      <div>
        <p>Which command fixes the "ENOSPC" file watcher error?</p>
        <CodeBlock
          language="bash"
          code={`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`}
        />
      </div>
    ),
    options: [
      "npm install --save watchers",
      "The command increases the file watcher limit",
      "sudo restart react",
      "npm cache clean",
    ],
    answer: "The command increases the file watcher limit",
  },
  {
    question: (
      <div>
        <p>Keys must be unique:</p>
      </div>
    ),
    options: [
      "Globally in the entire app",
      "Among siblings only",
      "In the parent component only",
      "Across all components",
    ],
    answer: "Among siblings only",
  },
];

const Keys_MCQ = ({
  subtopicId,
  goalName,
  courseName,
  onComplete
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } = useAuth();

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
        courseName
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
  return <MCQLogic title="Keys - MCQs" questions={randomQuestions}
  isCompleted={isCompleted}
  isLoading={isLoading}
  onComplete={handleCompletion}
  subtopicId={subtopicId}
  goalName={goalName}
  courseName={courseName} />;
};

export default Lists_Keys_MCQ;