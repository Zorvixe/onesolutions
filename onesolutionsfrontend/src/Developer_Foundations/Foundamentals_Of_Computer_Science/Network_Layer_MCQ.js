import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";
import Compter_Networks_CS from "./Compter_Networks_CS";
import Network_Layer_CS from "./Network_Layer_CS";

const questionsData = [
  {
    question: <p>What is the main purpose of an IP address?</p>,
    options: [
      "To identify a device on a network",
      "To store files",
      "To encrypt network traffic",
      "To increase internet speed",
    ],
    answer: "To identify a device on a network",
  },
  {
    question: <p>IPv4 addresses are how many bits long?</p>,
    options: [
      "16 bits",
      "32 bits",
      "64 bits",
      "128 bits",
    ],
    answer: "32 bits",
  },
  {
    question: <p>An IPv4 address is divided into how many octets?</p>,
    options: [
      "2",
      "4",
      "6",
      "8",
    ],
    answer: "4",
  },
  {
    question: <p>Each octet in an IPv4 address contains how many bits?</p>,
    options: [
      "4 bits",
      "8 bits",
      "16 bits",
      "32 bits",
    ],
    answer: "8 bits",
  },
  {
    question: <p>Which IP version uses 128-bit addresses?</p>,
    options: [
      "IPv2",
      "IPv3",
      "IPv4",
      "IPv6",
    ],
    answer: "IPv6",
  },
  {
    question: <p>Which device forwards data between independent networks?</p>,
    options: [
      "Hub",
      "Router",
      "Switch",
      "Repeater",
    ],
    answer: "Router",
  },
  {
    question: <p>A wireless router combines which components?</p>,
    options: [
      "Router, Switch, Wireless Access Point",
      "Hub, Bridge, Router",
      "Switch, Firewall, Modem",
      "Router, Gateway, Repeater",
    ],
    answer: "Router, Switch, Wireless Access Point",
  },
  {
    question: <p>What does a Wireless Access Point (WAP) allow?</p>,
    options: [
      "Wi-Fi devices to connect to a wired network",
      "Only wired connections",
      "Only router configuration",
      "Encryption of MAC addresses",
    ],
    answer: "Wi-Fi devices to connect to a wired network",
  },
  {
    question: <p>What is a route in networking?</p>,
    options: [
      "A network cable",
      "The sequence of communication links a packet travels through",
      "A firewall rule",
      "A network port",
    ],
    answer: "The sequence of communication links a packet travels through",
  },
  {
    question: <p>What is subnetting?</p>,
    options: [
      "Combining multiple networks into one",
      "Dividing a large network into smaller subnets",
      "Increasing IP address size",
      "Removing routers from networks",
    ],
    answer: "Dividing a large network into smaller subnets",
  },
  {
    question: <p>Which component separates the network and host portions of an IP address?</p>,
    options: [
      "Gateway",
      "Subnet Mask",
      "MAC Address",
      "Port Number",
    ],
    answer: "Subnet Mask",
  },
  {
    question: <p>In CIDR notation, what does “/24” represent?</p>,
    options: [
      "24 available hosts",
      "24 routers",
      "24 bits used for the network portion",
      "24 bytes in address",
    ],
    answer: "24 bits used for the network portion",
  },
  {
    question: <p>What does a routing table store?</p>,
    options: [
      "User passwords",
      "IP addresses of websites",
      "Information about where packets should be forwarded",
      "Network cables used",
    ],
    answer: "Information about where packets should be forwarded",
  },
  {
    question: <p>What is a hop in networking?</p>,
    options: [
      "Movement of a packet from one router to another",
      "A network cable connection",
      "A switch port",
      "A MAC address lookup",
    ],
    answer: "Movement of a packet from one router to another",
  },
  {
    question: <p>What does TTL (Time To Live) control in a network packet?</p>,
    options: [
      "Packet size",
      "Number of routers a packet can pass through",
      "Encryption level",
      "Network bandwidth",
    ],
    answer: "Number of routers a packet can pass through",
  },
];


const  Network_Layer_MCQ = ({
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

export default  Network_Layer_MCQ;
