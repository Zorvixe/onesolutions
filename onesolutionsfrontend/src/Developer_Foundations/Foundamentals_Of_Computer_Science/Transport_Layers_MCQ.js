import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";
import Compter_Networks_CS from "./Compter_Networks_CS";
import Network_Layer_CS from "./Network_Layer_CS";

const questionsData = [
  {
    question: <p>Which layer directs data to the correct application running on a device?</p>,
    options: [
      "Transport Layer",
      "Network Layer",
      "Physical Layer",
      "Data Link Layer",
    ],
    answer: "Transport Layer",
  },
  {
    question: <p>A port number is how many bits long?</p>,
    options: [
      "8-bit",
      "16-bit",
      "32-bit",
      "64-bit",
    ],
    answer: "16-bit",
  },
  {
    question: <p>What forms a socket address?</p>,
    options: [
      "IP Address + MAC Address",
      "IP Address + Port Number",
      "MAC Address + Port Number",
      "IP Address + Protocol",
    ],
    answer: "IP Address + Port Number",
  },
  {
    question: <p>Multiplexing in the transport layer means:</p>,
    options: [
      "Sending packets through multiple routers",
      "Delivering packets to the correct application",
      "Directing traffic from multiple applications to the network",
      "Encrypting packets before transmission",
    ],
    answer: "Directing traffic from multiple applications to the network",
  },
  {
    question: <p>Which header contains the port number?</p>,
    options: [
      "Transport Layer Header",
      "Network Layer Header",
      "Physical Layer Header",
      "Data Link Header",
    ],
    answer: "Transport Layer Header",
  },
  {
    question: <p>Which protocol provides reliable data transfer?</p>,
    options: [
      "UDP",
      "TCP",
      "IP",
      "ARP",
    ],
    answer: "TCP",
  },
  {
    question: <p>Why are large messages divided into packets?</p>,
    options: [
      "To improve network efficiency and reliability",
      "To increase CPU usage",
      "To reduce encryption",
      "To remove headers",
    ],
    answer: "To improve network efficiency and reliability",
  },
  {
    question: <p>What ensures packets are assembled in the correct order in TCP?</p>,
    options: [
      "MAC Address",
      "Sequence Numbers",
      "Port Numbers",
      "TTL",
    ],
    answer: "Sequence Numbers",
  },
  {
    question: <p>Which signal is used to initiate a TCP connection?</p>,
    options: [
      "ACK",
      "FIN",
      "SYN",
      "RST",
    ],
    answer: "SYN",
  },
  {
    question: <p>How many steps are involved in the TCP connection establishment process?</p>,
    options: [
      "Two",
      "Three",
      "Four",
      "Five",
    ],
    answer: "Three",
  },
  {
    question: <p>What happens if the sender does not receive an acknowledgment (ACK) in TCP?</p>,
    options: [
      "Connection is closed immediately",
      "The packet is retransmitted",
      "The packet is deleted permanently",
      "The IP address changes",
    ],
    answer: "The packet is retransmitted",
  },
  {
    question: <p>Which protocol is best suited for real-time applications like video streaming?</p>,
    options: [
      "TCP",
      "UDP",
      "HTTP",
      "SMTP",
    ],
    answer: "UDP",
  },
  {
    question: <p>What does TTL expiration cause?</p>,
    options: [
      "Packet encryption",
      "Packet loss",
      "Network shutdown",
      "Port change",
    ],
    answer: "Packet loss",
  },
  {
    question: <p>Which IP range belongs to private networks?</p>,
    options: [
      "8.8.8.0 – 8.8.8.255",
      "10.0.0.0 – 10.255.255.255",
      "100.0.0.0 – 100.255.255.255",
      "1.1.1.0 – 1.1.1.255",
    ],
    answer: "10.0.0.0 – 10.255.255.255",
  },
  {
    question: <p>What is the main purpose of Network Address Translation (NAT)?</p>,
    options: [
      "Encrypt network packets",
      "Convert TCP to UDP",
      "Allow multiple private devices to share one public IP",
      "Increase packet size",
    ],
    answer: "Allow multiple private devices to share one public IP",
  },
];


const Transport_Layers_MCQ= ({
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

export default  Transport_Layers_MCQ;
