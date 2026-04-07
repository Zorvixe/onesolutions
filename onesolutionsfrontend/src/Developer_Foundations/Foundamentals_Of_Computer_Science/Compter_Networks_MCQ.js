import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";
import Compter_Networks_CS from "./Compter_Networks_CS";

const questionsData = [
  {
    question: <p>What is the Internet?</p>,
    options: [
      "A local computer system",
      "A global network connecting billions of devices",
      "A single server",
      "A database management system",
    ],
    answer: "A global network connecting billions of devices",
  },
  {
    question: <p>Why are network models organized into layers?</p>,
    options: [
      "To increase cable length",
      "To reduce complexity in networking",
      "To increase CPU speed",
      "To remove protocols",
    ],
    answer: "To reduce complexity in networking",
  },
  {
    question: <p>What is the unit created when data is wrapped with headers at each network layer?</p>,
    options: [
      "Packet Frame",
      "Protocol Data Unit (PDU)",
      "Signal Block",
      "Binary Packet",
    ],
    answer: "Protocol Data Unit (PDU)",
  },
  {
    question: <p>Which layer is responsible for transmitting raw signals across physical media?</p>,
    options: [
      "Transport Layer",
      "Application Layer",
      "Physical Layer",
      "Network Layer",
    ],
    answer: "Physical Layer",
  },
  {
    question: <p>Which layer ensures reliable communication between directly connected devices?</p>,
    options: [
      "Application Layer",
      "Data Link Layer",
      "Network Layer",
      "Transport Layer",
    ],
    answer: "Data Link Layer",
  },
  {
    question: <p>Which protocol operates at the Network Layer?</p>,
    options: [
      "IP",
      "HTTP",
      "SMTP",
      "TCP",
    ],
    answer: "IP",
  },
  {
    question: <p>Which layer ensures data reaches the correct application process?</p>,
    options: [
      "Physical Layer",
      "Network Layer",
      "Transport Layer",
      "Data Link Layer",
    ],
    answer: "Transport Layer",
  },
  {
    question: <p>Which layer provides services for applications like web browsing?</p>,
    options: [
      "Application Layer",
      "Transport Layer",
      "Network Layer",
      "Physical Layer",
    ],
    answer: "Application Layer",
  },
  {
    question: <p>What is a protocol?</p>,
    options: [
      "A hardware device",
      "A network cable",
      "A set of rules for communication between devices",
      "A programming language",
    ],
    answer: "A set of rules for communication between devices",
  },
  {
    question: <p>Which protocol belongs to the Application Layer?</p>,
    options: [
      "TCP",
      "UDP",
      "HTTP",
      "IP",
    ],
    answer: "HTTP",
  },
  {
    question: <p>What is a network port?</p>,
    options: [
      "A software application",
      "A physical connector for network devices",
      "A network protocol",
      "A storage device",
    ],
    answer: "A physical connector for network devices",
  },
  {
    question: <p>How does a hub send incoming data?</p>,
    options: [
      "Only to the destination device",
      "To the router",
      "To all connected devices",
      "To the server only",
    ],
    answer: "To all connected devices",
  },
  {
    question: <p>What is a MAC address?</p>,
    options: [
      "A software application",
      "A globally unique identifier for network interfaces",
      "A routing protocol",
      "A network cable type",
    ],
    answer: "A globally unique identifier for network interfaces",
  },
  {
    question: <p>What happens during a data collision?</p>,
    options: [
      "Multiple devices send signals at the same time",
      "The network stops permanently",
      "Data is encrypted",
      "The router shuts down",
    ],
    answer: "Multiple devices send signals at the same time",
  },
  {
    question: <p>Which device reduces network collisions and stores MAC addresses?</p>,
    options: [
      "Hub",
      "Router",
      "Switch",
      "Modem",
    ],
    answer: "Switch",
  },
];
const  Compter_Networks_MCQ = ({
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
      title="Understanding Computer Networks - MCQs"
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

export default  Compter_Networks_MCQ;
