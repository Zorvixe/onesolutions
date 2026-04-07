import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";


const questionsData = [
  {
    question: <p>What is the project folder called in Git terminology?</p>,
    options: ["Working Directory", "Repository Server", "Branch Folder", "Snapshot Folder"],
    answer: "Working Directory",
  },
  {
    question: (
      <div>
        <p>Which command creates new files in the working directory?</p>
        <CodeBlock language="bash" code={`touch alice.txt`} />
      </div>
    ),
    options: [
      "Creates an empty file",
      "Deletes a file",
      "Copies a file",
      "Moves a file",
    ],
    answer: "Creates an empty file",
  },
  {
    question: (
      <div>
        <p>Which command shows the current state of the working directory and staging area?</p>
        <CodeBlock language="bash" code={`git status`} />
      </div>
    ),
    options: [
      "Displays repository status",
      "Creates a commit",
      "Deletes repository",
      "Uploads files to GitHub",
    ],
    answer: "Displays repository status",
  },
  {
    question: <p>What is the first step in creating a commit?</p>,
    options: [
      "Add changes to staging area",
      "Push changes",
      "Clone repository",
      "Create branch",
    ],
    answer: "Add changes to staging area",
  },
  {
    question: (
      <div>
        <p>Which command adds file changes to the staging area?</p>
        <CodeBlock language="bash" code={`git add alice.txt`} />
      </div>
    ),
    options: [
      "Stages file changes",
      "Deletes file",
      "Creates repository",
      "Pushes commits",
    ],
    answer: "Stages file changes",
  },
  {
    question: (
      <div>
        <p>Which command creates a commit with staged changes?</p>
        <CodeBlock language="bash" code={`git commit -m "message"`} />
      </div>
    ),
    options: [
      "Creates snapshot of staged changes",
      "Deletes commit",
      "Copies repository",
      "Pulls remote changes",
    ],
    answer: "Creates snapshot of staged changes",
  },
  {
    question: <p>What does a commit represent in Git?</p>,
    options: [
      "Snapshot of staged project changes",
      "Branch creation",
      "Repository deletion",
      "File copy operation",
    ],
    answer: "Snapshot of staged project changes",
  },
  {
    question: (
      <div>
        <p>Which command displays the commit history?</p>
        <CodeBlock language="bash" code={`git log`} />
      </div>
    ),
    options: [
      "Shows commit history",
      "Shows file differences",
      "Deletes commits",
      "Creates new branch",
    ],
    answer: "Shows commit history",
  },
  {
    question: <p>What does HEAD refer to in Git logs?</p>,
    options: [
      "Current commit",
      "First commit",
      "Deleted commit",
      "Remote commit",
    ],
    answer: "Current commit",
  },
  {
    question: <p>What is a Commit ID?</p>,
    options: [
      "Unique hash identifying a commit",
      "Repository name",
      "File extension",
      "Branch name",
    ],
    answer: "Unique hash identifying a commit",
  },
  {
    question: (
      <div>
        <p>Which command shows changes that are not yet staged?</p>
        <CodeBlock language="bash" code={`git diff`} />
      </div>
    ),
    options: [
      "Shows unstaged changes",
      "Shows commit history",
      "Creates commit",
      "Pushes repository",
    ],
    answer: "Shows unstaged changes",
  },
  {
    question: (
      <div>
        <p>Which command shows staged but uncommitted changes?</p>
        <CodeBlock language="bash" code={`git diff --staged`} />
      </div>
    ),
    options: [
      "Shows staged changes",
      "Shows remote commits",
      "Deletes staged files",
      "Lists branches",
    ],
    answer: "Shows staged changes",
  },
  {
    question: (
      <div>
        <p>Which command uploads local commits to a remote repository?</p>
        <CodeBlock language="bash" code={`git push -u origin master`} />
      </div>
    ),
    options: [
      "Publishes commits to remote repository",
      "Deletes repository",
      "Creates commit",
      "Lists files",
    ],
    answer: "Publishes commits to remote repository",
  },
  {
    question: (
      <div>
        <p>Which command downloads the latest commits from a remote repository?</p>
        <CodeBlock language="bash" code={`git pull origin master`} />
      </div>
    ),
    options: [
      "Fetches latest commits from remote",
      "Deletes commits",
      "Creates repository",
      "Shows file status",
    ],
    answer: "Fetches latest commits from remote",
  },
  {
    question: <p>How can you edit a file directly on GitHub?</p>,
    options: [
      "Click the pencil icon and commit changes",
      "Use git push command",
      "Delete repository",
      "Clone repository again",
    ],
    answer: "Click the pencil icon and commit changes",
  },
];

const Staging_Area_Commits_MCQ = ({
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
      title="Staging Area & Commits - MCQs"
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

export default  Staging_Area_Commits_MCQ;
