import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";


const questionsData = [
  {
    question: <p>What is the main purpose of version control?</p>,
    options: [
      "Track changes and manage file versions",
      "Compile programs",
      "Delete files automatically",
      "Run applications",
    ],
    answer: "Track changes and manage file versions",
  },
  {
    question: <p>Which of the following is a Version Control System?</p>,
    options: ["Git", "Chrome", "MySQL", "Docker"],
    answer: "Git",
  },
  {
    question: <p>Git is a ______ version control system.</p>,
    options: ["Centralized", "Distributed", "Linear", "Sequential"],
    answer: "Distributed",
  },
  {
    question: <p>What is a Git Repository?</p>,
    options: [
      "Database storing project versions",
      "Programming language",
      "Compiler",
      "Web server",
    ],
    answer: "Database storing project versions",
  },
  {
    question: <p>In Git terminology, a snapshot of project files is called:</p>,
    options: ["Commit", "Branch", "Tag", "Merge"],
    answer: "Commit",
  },
  {
    question: (
      <div>
        <p>Which command initializes a Git repository?</p>
        <CodeBlock language="bash" code={`git init`} />
      </div>
    ),
    options: [
      "Creates a Git repository in the current directory",
      "Deletes a repository",
      "Downloads a repository",
      "Updates repository",
    ],
    answer: "Creates a Git repository in the current directory",
  },
  {
    question: (
      <div>
        <p>Which command clones a remote repository?</p>
        <CodeBlock language="bash" code={`git clone https://github.com/user/repo.git`} />
      </div>
    ),
    options: [
      "Copies repository from remote to local",
      "Deletes repository",
      "Creates branch",
      "Renames repository",
    ],
    answer: "Copies repository from remote to local",
  },
  {
    question: <p>Which Git state represents files ready to be committed?</p>,
    options: [
      "Staged Files",
      "Modified Files",
      "Tracked Files",
      "Untracked Files",
    ],
    answer: "Staged Files",
  },
  {
    question: (
      <div>
        <p>Which command displays configured remote repositories?</p>
        <CodeBlock language="bash" code={`git remote -v`} />
      </div>
    ),
    options: [
      "Shows remote repository URLs",
      "Shows commit history",
      "Shows file differences",
      "Shows Git configuration",
    ],
    answer: "Shows remote repository URLs",
  },
  {
    question: (
      <div>
        <p>Which command sets the Git username globally?</p>
        <CodeBlock language="bash" code={`git config --global user.name "Your Name"`} />
      </div>
    ),
    options: [
      "Sets username for commits",
      "Deletes username",
      "Creates repository",
      "Pushes commits",
    ],
    answer: "Sets username for commits",
  },
  {
    question: (
      <div>
        <p>Which command sets the Git email globally?</p>
        <CodeBlock language="bash" code={`git config --global user.email "email@example.com"`} />
      </div>
    ),
    options: [
      "Sets author email for commits",
      "Deletes email configuration",
      "Creates new repository",
      "Shows commit log",
    ],
    answer: "Sets author email for commits",
  },
  {
    question: (
      <div>
        <p>Which command shows Git configuration settings?</p>
        <CodeBlock language="bash" code={`git config -l`} />
      </div>
    ),
    options: [
      "Lists Git configuration",
      "Lists repository files",
      "Lists commits",
      "Lists branches",
    ],
    answer: "Lists Git configuration",
  },
  {
    question: <p>Which platform is commonly used to host Git repositories online?</p>,
    options: ["GitHub", "Photoshop", "Jenkins", "Eclipse"],
    answer: "GitHub",
  },
  {
    question: (
      <div>
        <p>Which command enables colored output in Git?</p>
        <CodeBlock language="bash" code={`git config --global color.ui auto`} />
      </div>
    ),
    options: [
      "Enables colored Git output",
      "Changes repository color",
      "Creates branch color",
      "Deletes color settings",
    ],
    answer: "Enables colored Git output",
  },
  {
    question: <p>Why is a Personal Access Token (PAT) used in GitHub?</p>,
    options: [
      "Replace password authentication for Git commands",
      "Create new repositories",
      "Delete repositories",
      "Compile code",
    ],
    answer: "Replace password authentication for Git commands",
  },
];

const    Getting_Started_Git_MCQ = ({
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
      title="Getting Started with Git - MCQs"
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

export default  Getting_Started_Git_MCQ;
