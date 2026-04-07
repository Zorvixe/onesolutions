import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";


const questionsData = [
  {
    question: <p>Which digits are used in the binary number system?</p>,
    options: ["0 and 1", "0–9", "1–9", "0–7"],
    answer: "0 and 1",
  },
  {
    question: <p>What is the base of the decimal number system?</p>,
    options: ["2", "8", "10", "16"],
    answer: "10",
  },
  {
    question: <p>What is the base of the binary number system?</p>,
    options: ["10", "2", "8", "16"],
    answer: "2",
  },
  {
    question: <p>Computers process information in which form?</p>,
    options: [
      "Decimal numbers",
      "Binary numbers",
      "Hexadecimal numbers",
      "Roman numbers",
    ],
    answer: "Binary numbers",
  },
  {
    question: (
      <div>
        <p>Convert the binary number to decimal.</p>
        <CodeBlock language="text" code={`1101₂ = ?`} />
      </div>
    ),
    options: ["11", "13", "12", "14"],
    answer: "13",
  },
  {
    question: <p>How many different values can be represented using 4 bits?</p>,
    options: ["16", "8", "32", "64"],
    answer: "16",
  },
  {
    question: <p>What is the range of numbers represented using 4 bits?</p>,
    options: ["0 to 7", "0 to 15", "0 to 10", "1 to 16"],
    answer: "0 to 15",
  },
  {
    question: (
      <div>
        <p>Total combinations of n-bit binary numbers is:</p>
        <CodeBlock language="text" code={`Total combinations = ?`} />
      </div>
    ),
    options: ["n²", "2n", "2ⁿ", "n³"],
    answer: "2ⁿ",
  },
  {
    question: (
      <div>
        <p>If n = 8 bits, what is the maximum value that can be stored?</p>
      </div>
    ),
    options: ["127", "255", "128", "256"],
    answer: "255",
  },
  {
    question: <p>Which bit represents the sign in signed binary numbers?</p>,
    options: ["First bit", "Last bit", "Middle bit", "Random bit"],
    answer: "First bit",
  },
  {
    question: <p>In sign representation, what does 1 indicate?</p>,
    options: ["Positive number", "Negative number", "Zero", "Decimal number"],
    answer: "Negative number",
  },
  {
    question: <p>An image is made up of small units called:</p>,
    options: ["Bits", "Pixels", "Bytes", "Frames"],
    answer: "Pixels",
  },
  {
    question: <p>Which color model is commonly used in computers?</p>,
    options: ["CMY", "RGB", "HSV", "LAB"],
    answer: "RGB",
  },
  {
    question: <p>ASCII uses how many bits to represent a character?</p>,
    options: ["8 bits", "4 bits", "6 bits", "16 bits"],
    answer: "8 bits",
  },
  {
    question: <p>UTF-8 can represent up to how many characters?</p>,
    options: ["256", "65,536", "1,112,064", "10,000"],
    answer: "1,112,064",
  },
];

const Understaing_Binary_MCQ = ({
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
      title="Understanding Binary - MCQs"
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

export default Understaing_Binary_MCQ;
