import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ---------- NORMAL QUESTIONS (5) ----------

  {
    question: <p>Computer hardware refers to:</p>,
    options: [
      "Physical components of a computer",
      "Programs running on a computer",
      "Operating systems",
      "Internet services",
    ],
    answer: "Physical components of a computer",
  },
  {
    question: <p>Which of the following is an internal component?</p>,
    options: ["Keyboard", "Mouse", "RAM", "Monitor"],
    answer: "RAM",
  },
  {
    question: <p>Which device is used for temporary storage while programs run?</p>,
    options: ["Hard Disk", "RAM", "GPU", "Motherboard"],
    answer: "RAM",
  },
  {
    question: <p>Which component is the central communication backbone of a computer?</p>,
    options: ["CPU", "GPU", "Motherboard", "Hard Disk"],
    answer: "Motherboard",
  },
  {
    question: <p>Which processor is specialized for graphics processing?</p>,
    options: ["CPU", "GPU", "RAM", "BIOS"],
    answer: "GPU",
  },

  // ---------- CODE / CONCEPT BASED QUESTIONS (10) ----------

  {
    question: (
      <div>
        <p>What does the following represent?</p>
        <CodeBlock language="text" code={`1 GHz = 1 Billion instructions per second`} />
      </div>
    ),
    options: [
      "RAM speed",
      "CPU clock speed",
      "GPU memory speed",
      "Hard drive speed",
    ],
    answer: "CPU clock speed",
  },

  {
    question: (
      <div>
        <p>Which storage type is volatile?</p>
        <CodeBlock language="text" code={`Data is lost when power is off`} />
      </div>
    ),
    options: ["Hard Disk", "SSD", "RAM", "USB"],
    answer: "RAM",
  },

  {
    question: (
      <div>
        <p>Which storage is fastest according to access times?</p>
        <CodeBlock language="text" code={`Registers → < 2 nanoseconds`} />
      </div>
    ),
    options: ["Hard Disk", "RAM", "Registers", "SSD"],
    answer: "Registers",
  },

  {
    question: (
      <div>
        <p>Which storage device stores applications permanently?</p>
        <CodeBlock language="text" code={`Applications are stored here before execution`} />
      </div>
    ),
    options: ["Registers", "RAM", "Hard Drive", "CPU"],
    answer: "Hard Drive",
  },

  {
    question: (
      <div>
        <p>What happens when an application starts running?</p>
        <CodeBlock language="text" code={`Hard Drive → RAM → CPU Registers`} />
      </div>
    ),
    options: [
      "Loaded directly into CPU",
      "Loaded into RAM first",
      "Loaded into GPU",
      "Loaded into BIOS",
    ],
    answer: "Loaded into RAM first",
  },

  {
    question: (
      <div>
        <p>Which processor supports larger RAM capacity?</p>
        <CodeBlock language="text" code={`32-bit → up to 4 GB`} />
      </div>
    ),
    options: ["16-bit", "32-bit", "64-bit", "8-bit"],
    answer: "64-bit",
  },

  {
    question: (
      <div>
        <p>Which hardware performs system startup checks?</p>
        <CodeBlock language="text" code={`Initializes hardware and loads OS`} />
      </div>
    ),
    options: ["CPU", "BIOS", "GPU", "RAM"],
    answer: "BIOS",
  },

  {
    question: (
      <div>
        <p>Which modern firmware replaced BIOS?</p>
        <CodeBlock language="text" code={`Supports secure boot and faster startup`} />
      </div>
    ),
    options: ["RAM", "UEFI", "GPU", "SSD"],
    answer: "UEFI",
  },

  {
    question: (
      <div>
        <p>Which port standardizes peripheral connections?</p>
        <CodeBlock language="text" code={`Universal Serial Bus`} />
      </div>
    ),
    options: ["HDMI", "VGA", "USB", "DVI"],
    answer: "USB",
  },

  {
    question: (
      <div>
        <p>Which device is about 25× faster than HDD?</p>
        <CodeBlock language="text" code={`Solid State Drive`} />
      </div>
    ),
    options: ["RAM", "SSD", "USB", "GPU"],
    answer: "SSD",
  },
];

const Computer_Hardware_MCQ = ({
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
      title=" Overview of Computer Hardware - MCQs"
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

export default  Computer_Hardware_MCQ;
