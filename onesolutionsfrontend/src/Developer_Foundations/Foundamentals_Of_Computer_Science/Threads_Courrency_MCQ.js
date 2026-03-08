import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";
import Threads_Courrency_CS from "./Threads_Courrency_CS";

const questionsData = [
  {
    question: <p>What does the Program Counter determine?</p>,
    options: [
      "Next instruction to execute",
      "Memory size of process",
      "Number of CPU cores",
      "Thread priority",
    ],
    answer: "Next instruction to execute",
  },
  {
    question: <p>A thread is defined as:</p>,
    options: [
      "A hardware device",
      "A sequential flow of control within a process",
      "A database process",
      "A type of memory",
    ],
    answer: "A sequential flow of control within a process",
  },
  {
    question: (
      <div>
        <p>Which of the following is part of a thread?</p>
      </div>
    ),
    options: [
      "Program Counter",
      "Hard Disk",
      "GPU",
      "Network Card",
    ],
    answer: "Program Counter",
  },
  {
    question: (
      <div>
        <p>Which component stores temporary data such as function calls?</p>
      </div>
    ),
    options: ["Heap", "Stack", "Register", "Cache"],
    answer: "Stack",
  },
  {
    question: (
      <div>
        <p>A process that contains multiple threads is called:</p>
      </div>
    ),
    options: [
      "Single-thread process",
      "Multi-threaded process",
      "Kernel process",
      "Background process",
    ],
    answer: "Multi-threaded process",
  },
  {
    question: (
      <div>
        <p>Why are threads considered lightweight?</p>
      </div>
    ),
    options: [
      "They require fewer system resources",
      "They use more CPU",
      "They occupy more memory",
      "They are slower",
    ],
    answer: "They require fewer system resources",
  },
  {
    question: (
      <div>
        <p>Which browser runs each tab as a separate process?</p>
      </div>
    ),
    options: [
      "Mozilla Firefox",
      "Google Chrome",
      "Safari",
      "Opera",
    ],
    answer: "Google Chrome",
  },
  {
    question: (
      <div>
        <p>Which browser runs multiple tabs as threads inside fewer processes?</p>
      </div>
    ),
    options: [
      "Chrome",
      "Edge",
      "Mozilla Firefox",
      "Internet Explorer",
    ],
    answer: "Mozilla Firefox",
  },
  {
    question: (
      <div>
        <p>Concurrency refers to:</p>
      </div>
    ),
    options: [
      "Running a single program",
      "Multiple threads executing simultaneously",
      "Deleting threads",
      "Stopping CPU",
    ],
    answer: "Multiple threads executing simultaneously",
  },
  {
    question: (
      <div>
        <p>Which is an advantage of multi-threading?</p>
      </div>
    ),
    options: [
      "Improved responsiveness",
      "Increased memory usage",
      "Slower execution",
      "No resource sharing",
    ],
    answer: "Improved responsiveness",
  },
  {
    question: (
      <div>
        <p>Which is a disadvantage of multi-threading?</p>
      </div>
    ),
    options: [
      "Programs become harder to debug",
      "CPU usage decreases",
      "Programs run slower",
      "Memory usage becomes zero",
    ],
    answer: "Programs become harder to debug",
  },
  {
    question: (
      <div>
        <p>What is a critical section?</p>
      </div>
    ),
    options: [
      "A part of code where shared resources are accessed",
      "Memory allocation block",
      "Database transaction",
      "Operating system boot code",
    ],
    answer: "A part of code where shared resources are accessed",
  },
  {
    question: (
      <div>
        <p>What technique ensures only one thread executes a critical section?</p>
      </div>
    ),
    options: [
      "Mutual exclusion using locks",
      "CPU scheduling",
      "Memory paging",
      "Thread deletion",
    ],
    answer: "Mutual exclusion using locks",
  },
  {
    question: (
      <div>
        <p>Deadlock occurs when:</p>
      </div>
    ),
    options: [
      "Processes wait indefinitely for resources held by each other",
      "CPU speed increases",
      "Threads execute faster",
      "Memory becomes empty",
    ],
    answer: "Processes wait indefinitely for resources held by each other",
  },
  {
    question: (
      <div>
        <p>Which of the following is a condition for deadlock?</p>
      </div>
    ),
    options: [
      "Circular Wait",
      "Process Execution",
      "Memory Allocation",
      "Thread Scheduling",
    ],
    answer: "Circular Wait",
  },
];

const  Threads_Courrency_MCQ = ({
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

export default  Threads_Courrency_MCQ;
