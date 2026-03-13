import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";


const questionsData = [
  {
    question: <p>Which tool is used to edit text files?</p>,
    options: ["Compiler", "Text Editor", "Browser", "Database"],
    answer: "Text Editor",
  },
  {
    question: <p>Which of the following is a popular text editor?</p>,
    options: ["Chrome", "Visual Studio Code", "MySQL", "Docker"],
    answer: "Visual Studio Code",
  },
  {
    question: (
      <div>
        <p>Which command opens a file using Nano editor?</p>
        <CodeBlock language="bash" code={`nano file.txt`} />
      </div>
    ),
    options: [
      "Opens file in Nano editor",
      "Deletes file.txt",
      "Copies file.txt",
      "Compresses file.txt",
    ],
    answer: "Opens file in Nano editor",
  },
  {
    question: (
      <div>
        <p>Which shortcut saves a file in Nano editor?</p>
        <CodeBlock language="text" code={`Ctrl + O`} />
      </div>
    ),
    options: [
      "Exit nano",
      "Save file",
      "Delete file",
      "Copy file",
    ],
    answer: "Save file",
  },
  {
    question: (
      <div>
        <p>Which shortcut exits Nano editor?</p>
        <CodeBlock language="text" code={`Ctrl + X`} />
      </div>
    ),
    options: [
      "Open new file",
      "Save file",
      "Exit nano editor",
      "Delete file",
    ],
    answer: "Exit nano editor",
  },
  {
    question: (
      <div>
        <p>What does this command do?</p>
        <CodeBlock language="bash" code={`cat file.txt`} />
      </div>
    ),
    options: [
      "Deletes file",
      "Displays file content",
      "Creates file",
      "Compresses file",
    ],
    answer: "Displays file content",
  },
  {
    question: (
      <div>
        <p>What does the following command display?</p>
        <CodeBlock language="bash" code={`head -2 sentences.txt`} />
      </div>
    ),
    options: [
      "Last 2 lines",
      "First 2 lines",
      "All lines",
      "Only one line",
    ],
    answer: "First 2 lines",
  },
  {
    question: (
      <div>
        <p>What does this command show?</p>
        <CodeBlock language="bash" code={`tail -2 sentences.txt`} />
      </div>
    ),
    options: [
      "First 2 lines",
      "Last 2 lines",
      "Middle lines",
      "Entire file",
    ],
    answer: "Last 2 lines",
  },
  {
    question: (
      <div>
        <p>What does the following command do?</p>
        <CodeBlock language="bash" code={`wc file.txt`} />
      </div>
    ),
    options: [
      "Counts lines, words, and characters",
      "Deletes file",
      "Copies file",
      "Renames file",
    ],
    answer: "Counts lines, words, and characters",
  },
  {
    question: <p>What does the pipe symbol <b>|</b> do in Linux?</p>,
    options: [
      "Deletes file",
      "Combines commands by passing output to input",
      "Copies files",
      "Compresses files",
    ],
    answer: "Combines commands by passing output to input",
  },
  {
    question: (
      <div>
        <p>What does this command do?</p>
        <CodeBlock language="bash" code={`cat sentences.txt | head -2`} />
      </div>
    ),
    options: [
      "Shows last lines",
      "Shows first 2 lines",
      "Deletes file",
      "Creates file",
    ],
    answer: "Shows first 2 lines",
  },
  {
    question: (
      <div>
        <p>Which command searches for a specific word in a file?</p>
        <CodeBlock language="bash" code={`grep "morning" sentences.txt`} />
      </div>
    ),
    options: [
      "Search pattern in file",
      "Delete file",
      "Rename file",
      "Copy file",
    ],
    answer: "Search pattern in file",
  },
  {
    question: (
      <div>
        <p>What does the symbol <b>&gt;</b> do in Linux commands?</p>
        <CodeBlock language="bash" code={`command > file.txt`} />
      </div>
    ),
    options: [
      "Redirects output to file",
      "Deletes file",
      "Copies file",
      "Renames file",
    ],
    answer: "Redirects output to file",
  },
  {
    question: (
      <div>
        <p>Which command compresses files into a tar.gz archive?</p>
        <CodeBlock language="bash" code={`tar -czvf archive.tar.gz folder`} />
      </div>
    ),
    options: [
      "Extract files",
      "Compress files",
      "Delete files",
      "Rename files",
    ],
    answer: "Compress files",
  },
  {
    question: (
      <div>
        <p>Which command extracts files from a ZIP archive?</p>
        <CodeBlock language="bash" code={`unzip files.zip`} />
      </div>
    ),
    options: [
      "Compress files",
      "Extract ZIP archive",
      "Delete archive",
      "Move archive",
    ],
    answer: "Extract ZIP archive",
  },
];

const Working_with_Files_MCQ= ({
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

export default  Working_with_Files_MCQ;
