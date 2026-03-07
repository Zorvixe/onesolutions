import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: <p>What is a process in an operating system?</p>,
    options: [
      "A program currently executing",
      "A file stored on disk",
      "A hardware component",
      "A database entry",
    ],
    answer: "A program currently executing",
  },
  {
    question: <p>When does a program become a process?</p>,
    options: [
      "When it is compiled",
      "When it is loaded into memory",
      "When it is deleted",
      "When it is installed",
    ],
    answer: "When it is loaded into memory",
  },
  {
    question: (
      <div>
        <p>Which part of process memory stores local variables and function calls?</p>
      </div>
    ),
    options: ["Heap", "Stack", "Text", "Data"],
    answer: "Stack",
  },
  {
    question: (
      <div>
        <p>Which process memory section contains program code?</p>
      </div>
    ),
    options: ["Heap", "Stack", "Data", "Text"],
    answer: "Text",
  },
  {
    question: (
      <div>
        <p>Context switching occurs when:</p>
      </div>
    ),
    options: [
      "CPU switches from one process to another",
      "Process changes memory",
      "Disk writes data",
      "CPU shuts down",
    ],
    answer: "CPU switches from one process to another",
  },
  {
    question: (
      <div>
        <p>Which situation may cause context switching?</p>
      </div>
    ),
    options: [
      "Process requests I/O",
      "User logs out",
      "RAM becomes full",
      "File is deleted",
    ],
    answer: "Process requests I/O",
  },
  {
    question: (
      <div>
        <p>Which state means the process is waiting for CPU allocation?</p>
      </div>
    ),
    options: ["Running", "Ready", "Waiting", "Terminated"],
    answer: "Ready",
  },
  {
    question: (
      <div>
        <p>Which state means a process has finished execution?</p>
      </div>
    ),
    options: ["Waiting", "Ready", "Running", "Terminated"],
    answer: "Terminated",
  },
  {
    question: (
      <div>
        <p>What is PCB in process management?</p>
      </div>
    ),
    options: [
      "Process Control Block",
      "Program Communication Buffer",
      "Process Command Base",
      "Primary Control Block",
    ],
    answer: "Process Control Block",
  },
  {
    question: (
      <div>
        <p>CPU scheduling decides:</p>
      </div>
    ),
    options: [
      "Which process gets CPU execution",
      "Which file to delete",
      "Which disk to format",
      "Which memory to remove",
    ],
    answer: "Which process gets CPU execution",
  },
  {
    question: (
      <div>
        <p>In FCFS scheduling, processes execute in which order?</p>
      </div>
    ),
    options: [
      "Shortest job first",
      "Random order",
      "Arrival order",
      "Highest priority first",
    ],
    answer: "Arrival order",
  },
  {
    question: (
      <div>
        <p>Which scheduling algorithm executes the process with the smallest burst time?</p>
      </div>
    ),
    options: [
      "Round Robin",
      "Priority Scheduling",
      "Shortest Job First",
      "FCFS",
    ],
    answer: "Shortest Job First",
  },
  {
    question: (
      <div>
        <p>Which scheduling algorithm selects the process with the highest priority?</p>
      </div>
    ),
    options: [
      "Priority Scheduling",
      "Round Robin",
      "FCFS",
      "SJF",
    ],
    answer: "Priority Scheduling",
  },
  {
    question: (
      <div>
        <p>In Round Robin scheduling, CPU time is divided into fixed units called:</p>
      </div>
    ),
    options: [
      "Burst Time",
      "Time Slice / Time Quantum",
      "Arrival Time",
      "Execution Slot",
    ],
    answer: "Time Slice / Time Quantum",
  },
  {
    question: (
      <div>
        <p>What is the purpose of Inter Process Communication (IPC)?</p>
      </div>
    ),
    options: [
      "Allow processes to communicate and share data",
      "Delete processes",
      "Restart operating system",
      "Increase CPU speed",
    ],
    answer: "Allow processes to communicate and share data",
  },
];

const Process_Managent_MCQ = ({
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

export default  Process_Managent_MCQ;
