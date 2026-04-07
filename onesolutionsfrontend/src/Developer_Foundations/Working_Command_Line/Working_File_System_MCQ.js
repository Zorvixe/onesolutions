import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";


const questionsData = [
  {
    question: <p>Which command is used to create an empty file in Linux?</p>,
    options: ["touch", "create", "newfile", "make"],
    answer: "touch",
  },
  {
    question: (
      <div>
        <p>What does the following command do?</p>
        <CodeBlock language="bash" code={`cat notes.txt`} />
      </div>
    ),
    options: [
      "Deletes notes.txt",
      "Reads and prints file contents",
      "Creates the file",
      "Renames the file",
    ],
    answer: "Reads and prints file contents",
  },
  {
    question: (
      <div>
        <p>What will the following command do?</p>
        <CodeBlock language="bash" code={`echo "Hello World!"`} />
      </div>
    ),
    options: [
      "Deletes a file",
      "Prints Hello World! in terminal",
      "Creates a directory",
      "Renames a file",
    ],
    answer: "Prints Hello World! in terminal",
  },
  {
    question: (
      <div>
        <p>What will the following command do?</p>
        <CodeBlock language="bash" code={`echo "Hello World!" > file.txt`} />
      </div>
    ),
    options: [
      "Deletes file.txt",
      "Writes Hello World! into file.txt",
      "Copies file.txt",
      "Renames file.txt",
    ],
    answer: "Writes Hello World! into file.txt",
  },
  {
    question: (
      <div>
        <p>Which command renames a file?</p>
        <CodeBlock language="bash" code={`mv old.txt new.txt`} />
      </div>
    ),
    options: ["Moves file", "Deletes file", "Renames file", "Creates file"],
    answer: "Renames file",
  },
  {
    question: (
      <div>
        <p>What does the following command do?</p>
        <CodeBlock language="bash" code={`cp file1.txt file2.txt`} />
      </div>
    ),
    options: [
      "Deletes file1.txt",
      "Copies file1.txt to file2.txt",
      "Renames file2.txt",
      "Moves file1.txt",
    ],
    answer: "Copies file1.txt to file2.txt",
  },
  {
    question: (
      <div>
        <p>Which command deletes a file?</p>
        <CodeBlock language="bash" code={`rm notes.txt`} />
      </div>
    ),
    options: ["remove", "rm", "delete", "clear"],
    answer: "rm",
  },
  {
    question: (
      <div>
        <p>Which command shows hidden files?</p>
        <CodeBlock language="bash" code={`ls -a`} />
      </div>
    ),
    options: [
      "Lists all files including hidden ones",
      "Deletes hidden files",
      "Creates hidden files",
      "Renames hidden files",
    ],
    answer: "Lists all files including hidden ones",
  },
  {
    question: <p>What does <b>.</b> represent in Linux file paths?</p>,
    options: [
      "Parent directory",
      "Current directory",
      "Root directory",
      "Hidden file",
    ],
    answer: "Current directory",
  },
  {
    question: <p>What does <b>..</b> represent?</p>,
    options: [
      "Root directory",
      "Current directory",
      "Parent directory",
      "Hidden folder",
    ],
    answer: "Parent directory",
  },
  {
    question: (
      <div>
        <p>Which command creates a new directory?</p>
        <CodeBlock language="bash" code={`mkdir projects`} />
      </div>
    ),
    options: ["mkdir", "createdir", "touchdir", "newfolder"],
    answer: "mkdir",
  },
  {
    question: (
      <div>
        <p>Which command displays the current working directory?</p>
        <CodeBlock language="bash" code={`pwd`} />
      </div>
    ),
    options: [
      "Shows current directory path",
      "Deletes directory",
      "Creates directory",
      "Renames directory",
    ],
    answer: "Shows current directory path",
  },
  {
    question: (
      <div>
        <p>What does this command do?</p>
        <CodeBlock language="bash" code={`cd ..`} />
      </div>
    ),
    options: [
      "Moves to root directory",
      "Moves to parent directory",
      "Deletes directory",
      "Lists files",
    ],
    answer: "Moves to parent directory",
  },
  {
    question: (
      <div>
        <p>Which command copies an entire directory?</p>
        <CodeBlock language="bash" code={`cp -r src_dir dest_dir`} />
      </div>
    ),
    options: [
      "cp -r",
      "cp -d",
      "copydir",
      "mv -r",
    ],
    answer: "cp -r",
  },
  {
    question: (
      <div>
        <p>Which command deletes a directory and all its contents?</p>
        <CodeBlock language="bash" code={`rm -r myfolder`} />
      </div>
    ),
    options: [
      "rm -r",
      "del -dir",
      "delete",
      "removefolder",
    ],
    answer: "rm -r",
  },
];


const Working_File_System_MCQ= ({
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
      title="Working with File System - MCQs"
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

export default  Working_File_System_MCQ;
