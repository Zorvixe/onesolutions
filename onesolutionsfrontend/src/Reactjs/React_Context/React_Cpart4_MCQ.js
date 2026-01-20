import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>Which command is used to deploy the Ecommerce application?</p>
        <CodeBlock
          language="bash"
          code={`oneSolution publish RJSIV4YSTX domain.oneSolution.tech`}
        />
      </div>
    ),
    options: [
      "oneSolution start RJSIV4YSTX",
      "oneSolution deploy RJSIV4YSTX",
      "oneSolution publish RJSIV4YSTX domain.oneSolution.tech",
      "npm publish",
    ],
    answer: "oneSolution publish RJSIV4YSTX domain.oneSolution.tech",
  },
  {
    question: (
      <div>
        <p>
          What does the word <b>domain</b> represent in the publish command?
        </p>
      </div>
    ),
    options: [
      "Project name",
      "File name",
      "Domain name to be published",
      "Component name",
    ],
    answer: "Domain name to be published",
  },
  {
    question: (
      <div>
        <p>Which of the following is a recommended domain format for resume?</p>
      </div>
    ),
    options: [
      "myapp.react.com",
      "rahulnxttrendz.oneSolution.tech",
      "nxttrendz.localhost",
      "reactapp.github.io",
    ],
    answer: "rahulnxttrendz.oneSolution.tech",
  },
  {
    question: (
      <div>
        <p>What happens if you try to publish with an already existing URL?</p>
      </div>
    ),
    options: [
      "It overwrites the site",
      "It updates automatically",
      "An error will be thrown",
      "Nothing happens",
    ],
    answer: "An error will be thrown",
  },
  {
    question: (
      <div>
        <p>What is the maximum allowed length of the domain name?</p>
      </div>
    ),
    options: [
      "10 characters",
      "12 characters",
      "15 characters",
      "20 characters",
    ],
    answer: "15 characters",
  },
  {
    question: (
      <div>
        <p>Which command is used to download the final Ecommerce code?</p>
        <CodeBlock language="bash" code={`oneSolution start RJSIVPP7N7`} />
      </div>
    ),
    options: [
      "npm start",
      "oneSolution publish RJSIVPP7N7",
      "oneSolution start RJSIVPP7N7",
      "git clone",
    ],
    answer: "oneSolution start RJSIVPP7N7",
  },
  {
    question: (
      <div>
        <p>What is the purpose of the publish command?</p>
      </div>
    ),
    options: [
      "Run the app locally",
      "Build the project",
      "Host the project on a domain",
      "Delete the project",
    ],
    answer: "Host the project on a domain",
  },
  {
    question: (
      <div>
        <p>Which part of the command specifies the project ID?</p>
        <CodeBlock
          language="bash"
          code={`oneSolution publish RJSIV4YSTX domain.oneSolution.tech`}
        />
      </div>
    ),
    options: [
      "oneSolution",
      "publish",
      "RJSIV4YSTX",
      "domain.oneSolution.tech",
    ],
    answer: "RJSIV4YSTX",
  },
  {
    question: (
      <div>
        <p>Which part of the command specifies the hosting URL?</p>
        <CodeBlock
          language="bash"
          code={`oneSolution publish RJSIV4YSTX domain.oneSolution.tech`}
        />
      </div>
    ),
    options: [
      "publish",
      "RJSIV4YSTX",
      "oneSolution",
      "domain.oneSolution.tech",
    ],
    answer: "domain.oneSolution.tech",
  },
  {
    question: (
      <div>
        <p>What should the domain ideally contain for resume branding?</p>
      </div>
    ),
    options: [
      "Random numbers",
      "Project ID",
      "Your name + nxttrendz",
      "Only nxttrendz",
    ],
    answer: "Your name + nxttrendz",
  },
  {
    question: (
      <div>
        <p>Which tool is used here for deploying the application?</p>
      </div>
    ),
    options: ["npm", "yarn", "oneSolution CLI", "Vercel"],
    answer: "oneSolution CLI",
  },
  {
    question: (
      <div>
        <p>What will happen if the domain length exceeds 15 characters?</p>
      </div>
    ),
    options: [
      "It will auto-trim",
      "It will throw an error",
      "It will still publish",
      "It will ignore extra characters",
    ],
    answer: "It will throw an error",
  },
  {
    question: (
      <div>
        <p>Which command is used for deployment?</p>
      </div>
    ),
    options: [
      "oneSolution start",
      "oneSolution run",
      "oneSolution publish",
      "oneSolution build",
    ],
    answer: "oneSolution publish",
  },
  {
    question: (
      <div>
        <p>Which environment is required to run the publish command?</p>
      </div>
    ),
    options: ["Browser", "IDE/Terminal", "Mobile App", "CodeSandbox"],
    answer: "IDE/Terminal",
  },
  {
    question: (
      <div>
        <p>Why is unique domain important while publishing?</p>
      </div>
    ),
    options: [
      "For faster loading",
      "To avoid naming conflicts",
      "To reduce code size",
      "To improve CSS",
    ],
    answer: "To avoid naming conflicts",
  },
];

const React_Cpart4_MCQ = ({ subtopicId, goalName, courseName, onComplete }) => {
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
      title="Introduction to React JS - MCQs"
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

export default React_Cpart4_MCQ;
