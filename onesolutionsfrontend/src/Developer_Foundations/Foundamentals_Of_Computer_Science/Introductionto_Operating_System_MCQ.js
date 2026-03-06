import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // -------- NORMAL QUESTIONS (5) --------

  {
    question: <p>An Operating System acts as an interface between:</p>,
    options: [
      "Hardware and Software",
      "User and Internet",
      "Application and Database",
      "CPU and RAM",
    ],
    answer: "Hardware and Software",
  },
  {
    question: <p>Which component is the core of the operating system?</p>,
    options: ["Kernel", "BIOS", "Shell", "Driver"],
    answer: "Kernel",
  },
  {
    question: <p>Who developed the Linux kernel?</p>,
    options: ["Bill Gates", "Linus Torvalds", "Steve Jobs", "Dennis Ritchie"],
    answer: "Linus Torvalds",
  },
  {
    question: <p>Which of the following belongs to Userspace?</p>,
    options: ["Hardware devices", "Kernel modules", "Text editors", "Boot loader"],
    answer: "Text editors",
  },
  {
    question: <p>Which system allows multiple users to access the computer simultaneously?</p>,
    options: ["Single-user system", "Multi-user system", "Embedded system", "Standalone system"],
    answer: "Multi-user system",
  },

  // -------- CONCEPT / CODE STYLE QUESTIONS (10) --------

  {
    question: (
      <div>
        <p>Which process checks hardware when the computer starts?</p>
        <CodeBlock language="text" code={`Power On Self Test`} />
      </div>
    ),
    options: ["Boot loader", "POST", "Kernel", "Scheduler"],
    answer: "POST",
  },

  {
    question: (
      <div>
        <p>Which component loads the operating system during boot?</p>
        <CodeBlock language="text" code={`Boot loader loads OS`} />
      </div>
    ),
    options: ["Kernel", "BIOS", "Boot Loader", "Compiler"],
    answer: "Boot Loader",
  },

  {
    question: (
      <div>
        <p>Which OS responsibility hides complex hardware details?</p>
        <CodeBlock language="text" code={`Provides simple interfaces to applications`} />
      </div>
    ),
    options: ["Isolation", "Abstraction", "Process management", "Scheduling"],
    answer: "Abstraction",
  },

  {
    question: (
      <div>
        <p>Which OS feature ensures one application does not affect another?</p>
        <CodeBlock language="text" code={`Applications run independently`} />
      </div>
    ),
    options: ["Resource management", "Isolation and Protection", "Scheduling", "Booting"],
    answer: "Isolation and Protection",
  },

  {
    question: (
      <div>
        <p>Which OS function decides how much RAM each application can use?</p>
        <CodeBlock language="text" code={`Allocates RAM and CPU resources`} />
      </div>
    ),
    options: ["File management", "Memory management", "Process scheduling", "Networking"],
    answer: "Memory management",
  },

  {
    question: (
      <div>
        <p>CPU switching between processes quickly is called:</p>
        <CodeBlock language="text" code={`CPU switches between processes`} />
      </div>
    ),
    options: ["Time slicing", "Booting", "Interrupt", "Paging"],
    answer: "Time slicing",
  },

  {
    question: (
      <div>
        <p>Which path represents the root in Linux/macOS?</p>
        <CodeBlock language="text" code={`/`} />
      </div>
    ),
    options: ["C:\\", "/", "D:\\", "\\root"],
    answer: "/",
  },

  {
    question: (
      <div>
        <p>What is the default block size used to store file data?</p>
        <CodeBlock language="text" code={`Default Block Size = 4 KB`} />
      </div>
    ),
    options: ["1 KB", "2 KB", "4 KB", "8 KB"],
    answer: "4 KB",
  },

  {
    question: (
      <div>
        <p>Which file system is case sensitive?</p>
        <CodeBlock language="text" code={`Ext4`} />
      </div>
    ),
    options: ["NTFS", "APFS", "FAT", "Ext4"],
    answer: "Ext4",
  },

  {
    question: (
      <div>
        <p>Which information is stored as file metadata?</p>
        <CodeBlock language="text" code={`Owner, Permissions, File Size`} />
      </div>
    ),
    options: ["File content", "File metadata", "File blocks", "File cache"],
    answer: "File metadata",
  },
];

const Introductionto_Operating_System_MCQ = ({
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

export default  Introductionto_Operating_System_MCQ;
