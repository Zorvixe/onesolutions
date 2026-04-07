import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: <p>What is the primary responsibility of memory management?</p>,
    options: [
      "Allocating physical memory to processes",
      "Compiling programs",
      "Managing network connections",
      "Executing instructions",
    ],
    answer: "Allocating physical memory to processes",
  },
  {
    question: <p>Primary memory is also called:</p>,
    options: [
      "Secondary memory",
      "Main memory",
      "Cache memory",
      "Virtual memory",
    ],
    answer: "Main memory",
  },
  {
    question: <p>Which of the following is considered secondary memory?</p>,
    options: [
      "RAM",
      "CPU registers",
      "Hard Disk",
      "Cache",
    ],
    answer: "Hard Disk",
  },
  {
    question: <p>Contiguous memory allocation assigns:</p>,
    options: [
      "Multiple scattered blocks",
      "A single continuous block of memory",
      "Only virtual memory",
      "Memory from secondary storage",
    ],
    answer: "A single continuous block of memory",
  },
  {
    question: <p>External fragmentation occurs when:</p>,
    options: [
      "Allocated memory is larger than required",
      "Enough memory exists but not in contiguous form",
      "Memory blocks are equal size",
      "Processes do not need memory",
    ],
    answer: "Enough memory exists but not in contiguous form",
  },
  {
    question: <p>Internal fragmentation occurs when:</p>,
    options: [
      "Memory is fully utilized",
      "Allocated memory block is larger than required",
      "Processes share the same block",
      "Memory is swapped to disk",
    ],
    answer: "Allocated memory block is larger than required",
  },
  {
    question: <p>Which hardware component maps virtual addresses to physical addresses?</p>,
    options: [
      "MMU",
      "CPU",
      "ALU",
      "GPU",
    ],
    answer: "MMU",
  },
  {
    question: <p>In paging, logical memory is divided into:</p>,
    options: [
      "Frames",
      "Pages",
      "Segments",
      "Blocks",
    ],
    answer: "Pages",
  },
  {
    question: <p>Physical memory in paging is divided into:</p>,
    options: [
      "Frames",
      "Pages",
      "Segments",
      "Blocks",
    ],
    answer: "Frames",
  },
  {
    question: <p>A logical address consists of:</p>,
    options: [
      "Page number and page offset",
      "Frame number and block size",
      "Segment and frame",
      "Offset and memory limit",
    ],
    answer: "Page number and page offset",
  },
  {
    question: <p>The page table is used to:</p>,
    options: [
      "Store program code",
      "Map page numbers to frame numbers",
      "Allocate CPU registers",
      "Store process IDs",
    ],
    answer: "Map page numbers to frame numbers",
  },
  {
    question: <p>Virtual memory creates the illusion of:</p>,
    options: [
      "Smaller memory",
      "Larger memory than physical RAM",
      "Only secondary memory",
      "Unlimited CPU",
    ],
    answer: "Larger memory than physical RAM",
  },
  {
    question: <p>Swapping is the process of:</p>,
    options: [
      "Moving processes between RAM and disk",
      "Deleting processes",
      "Executing instructions",
      "Changing page size",
    ],
    answer: "Moving processes between RAM and disk",
  },
  {
    question: <p>Demand paging loads pages into memory:</p>,
    options: [
      "At program start",
      "Only when they are needed",
      "Every CPU cycle",
      "When RAM is empty",
    ],
    answer: "Only when they are needed",
  },
  {
    question: <p>Which page replacement algorithm removes the least recently used page?</p>,
    options: [
      "LFU",
      "LRU",
      "FIFO",
      "Round Robin",
    ],
    answer: "LRU",
  },
];

const Memory_Managent_MCQ = ({
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
      title="Memory Management - MCQs"
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

export default  Memory_Managent_MCQ;
