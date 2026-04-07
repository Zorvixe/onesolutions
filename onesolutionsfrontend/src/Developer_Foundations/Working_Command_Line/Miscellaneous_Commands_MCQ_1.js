import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";



const questionsData = [
  {
    question: <p>Who is the administrator user in Linux?</p>,
    options: ["guest", "admin", "root user", "developer"],
    answer: "root user",
  },
  {
    question: (
      <div>
        <p>What does this command do?</p>
        <CodeBlock language="bash" code={`sudo apt update`} />
      </div>
    ),
    options: [
      "Runs command with administrative privileges",
      "Deletes packages",
      "Creates a user",
      "Shows package list",
    ],
    answer: "Runs command with administrative privileges",
  },
  {
    question: (
      <div>
        <p>Which command finds the executable path of a command?</p>
        <CodeBlock language="bash" code={`which sudo`} />
      </div>
    ),
    options: [
      "Find command path",
      "Delete sudo",
      "Create sudo user",
      "Update sudo",
    ],
    answer: "Find command path",
  },
  {
    question: (
      <div>
        <p>What does the following command do?</p>
        <CodeBlock language="bash" code={`sudo useradd abhi`} />
      </div>
    ),
    options: [
      "Deletes user",
      "Creates new user",
      "Renames user",
      "Lists users",
    ],
    answer: "Creates new user",
  },
  {
    question: (
      <div>
        <p>Which command changes a user password?</p>
        <CodeBlock language="bash" code={`sudo passwd abhi`} />
      </div>
    ),
    options: [
      "Change password",
      "Delete password",
      "Show password",
      "Lock password",
    ],
    answer: "Change password",
  },
  {
    question: (
      <div>
        <p>What does the command below do?</p>
        <CodeBlock language="bash" code={`su user`} />
      </div>
    ),
    options: [
      "Switch to another user",
      "Delete user",
      "Create user",
      "Lock user",
    ],
    answer: "Switch to another user",
  },
  {
    question: <p>Which of the following represents Linux permission types?</p>,
    options: [
      "Read, Write, Execute",
      "View, Edit, Delete",
      "Run, Edit, Open",
      "Input, Output, Execute",
    ],
    answer: "Read, Write, Execute",
  },
  {
    question: <p>Which Linux ownership type represents the user who created the file?</p>,
    options: [
      "Owner",
      "Group",
      "Others",
      "Guest",
    ],
    answer: "Owner",
  },
  {
    question: (
      <div>
        <p>What does the following command do?</p>
        <CodeBlock language="bash" code={`chmod 764 sample.txt`} />
      </div>
    ),
    options: [
      "Change file permissions",
      "Delete file",
      "Rename file",
      "Move file",
    ],
    answer: "Change file permissions",
  },
  {
    question: (
      <div>
        <p>Which command changes the owner of a file?</p>
        <CodeBlock language="bash" code={`sudo chown root sample.txt`} />
      </div>
    ),
    options: [
      "Change ownership",
      "Delete file",
      "Copy file",
      "Compress file",
    ],
    answer: "Change ownership",
  },
  {
    question: (
      <div>
        <p>Which command installs packages in Ubuntu Linux?</p>
        <CodeBlock language="bash" code={`sudo apt install package_name`} />
      </div>
    ),
    options: [
      "Install package using apt",
      "Delete package",
      "Search package",
      "Update system",
    ],
    answer: "Install package using apt",
  },
  {
    question: (
      <div>
        <p>What does this command do?</p>
        <CodeBlock language="bash" code={`wget "URL"`} />
      </div>
    ),
    options: [
      "Download file from web",
      "Delete URL",
      "Upload file",
      "Edit file",
    ],
    answer: "Download file from web",
  },
  {
    question: (
      <div>
        <p>What does the following command do?</p>
        <CodeBlock language="bash" code={`curl "wttr.in"`} />
      </div>
    ),
    options: [
      "Transfer or fetch data from server",
      "Delete server data",
      "Create server",
      "Rename server",
    ],
    answer: "Transfer or fetch data from server",
  },
  {
    question: (
      <div>
        <p>Which command searches packages in repositories?</p>
        <CodeBlock language="bash" code={`apt-cache search google`} />
      </div>
    ),
    options: [
      "Search packages",
      "Install package",
      "Remove package",
      "Update package",
    ],
    answer: "Search packages",
  },
  {
    question: (
      <div>
        <p>Which command lists installed packages in Linux?</p>
        <CodeBlock language="bash" code={`sudo dpkg -l`} />
      </div>
    ),
    options: [
      "Show installed packages",
      "Delete packages",
      "Install packages",
      "Update packages",
    ],
    answer: "Show installed packages",
  },
];

const  Miscellaneous_Commands_MCQ_1 = ({
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
      title="Miscellaneous Commands - Part | 1 - MCQs"
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

export default  Miscellaneous_Commands_MCQ_1;
