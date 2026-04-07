import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: <p>What does GUI stand for?</p>,
    options: [
      "Graphical User Interface",
      "General User Input",
      "Global User Interaction",
      "Graphical Utility Interface",
    ],
    answer: "Graphical User Interface",
  },
  {
    question: <p>What does CLI stand for?</p>,
    options: [
      "Command Line Interface",
      "Computer Language Input",
      "Command List Integration",
      "Central Logic Interface",
    ],
    answer: "Command Line Interface",
  },
  {
    question: <p>What is a command in CLI?</p>,
    options: [
      "A graphical button",
      "A text instruction given to a computer program",
      "A type of operating system",
      "A hardware device",
    ],
    answer: "A text instruction given to a computer program",
  },
  {
    question: <p>What is a shell?</p>,
    options: [
      "A hardware component",
      "A file system",
      "Software that interprets and executes commands",
      "A network protocol",
    ],
    answer: "Software that interprets and executes commands",
  },
  {
    question: <p>What is a terminal?</p>,
    options: [
      "A programming language",
      "A graphical application",
      "A text input/output environment to interact with the shell",
      "A type of processor",
    ],
    answer: "A text input/output environment to interact with the shell",
  },
  {
    question: <p>Which shell is most commonly used in Linux?</p>,
    options: [
      "bash",
      "ksh",
      "csh",
      "zsh",
    ],
    answer: "bash",
  },
  {
    question: <p>What keyboard shortcut opens the terminal in Linux?</p>,
    options: [
      "Ctrl + Shift + T",
      "Ctrl + Alt + T",
      "Ctrl + T",
      "Alt + T",
    ],
    answer: "Ctrl + Alt + T",
  },
  {
    question: <p>What command lists files and directories?</p>,
    options: [
      "list",
      "show",
      "ls",
      "dir",
    ],
    answer: "ls",
  },
  {
    question: <p>What does the command <b>ls -lh</b> display?</p>,
    options: [
      "Hidden files only",
      "Detailed file information in human readable format",
      "Only directory names",
      "Only system files",
    ],
    answer: "Detailed file information in human readable format",
  },
  {
    question: <p>Which command displays options available for another command?</p>,
    options: [
      "help",
      "--help",
      "info",
      "manual",
    ],
    answer: "--help",
  },
  {
    question: <p>Which command clears the terminal screen?</p>,
    options: [
      "reset",
      "remove",
      "clear",
      "clean",
    ],
    answer: "clear",
  },
  {
    question: <p>What command shows the manual page for a command?</p>,
    options: [
      "manual",
      "man",
      "help",
      "guide",
    ],
    answer: "man",
  },
  {
    question: <p>Which command displays the system date and time?</p>,
    options: [
      "date",
      "time",
      "clock",
      "showtime",
    ],
    answer: "date",
  },
  {
    question: <p>What does the command <b>whoami</b> display?</p>,
    options: [
      "The system name",
      "The current logged in user",
      "The shell version",
      "The system IP address",
    ],
    answer: "The current logged in user",
  },
  {
    question: <p>Where does Bash store command history?</p>,
    options: [
      ".bash_history",
      ".command_log",
      ".history_file",
      ".terminal_log",
    ],
    answer: ".bash_history",
  },
];


const Working_Command_Line_MCQ= ({
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
      title="Getting Started with Command Line - MCQs"
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

export default  Working_Command_Line_MCQ;
