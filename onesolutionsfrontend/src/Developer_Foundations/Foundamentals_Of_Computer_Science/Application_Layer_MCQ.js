import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";
import Compter_Networks_CS from "./Compter_Networks_CS";

const questionsData = [
  {
    question: <p>Which layer provides network services directly to user applications?</p>,
    options: [
      "Application Layer",
      "Transport Layer",
      "Network Layer",
      "Data Link Layer",
    ],
    answer: "Application Layer",
  },
  {
    question: <p>Which protocol belongs to the Application Layer?</p>,
    options: [
      "IP",
      "TCP",
      "HTTP",
      "Ethernet",
    ],
    answer: "HTTP",
  },
  {
    question: <p>What is the data unit used in the Application Layer?</p>,
    options: [
      "Frame",
      "Packet",
      "Segment",
      "Message",
    ],
    answer: "Message",
  },
  {
    question: <p>Why are domain names used instead of IP addresses?</p>,
    options: [
      "They are faster",
      "They are easier for humans to remember",
      "They increase network speed",
      "They encrypt data",
    ],
    answer: "They are easier for humans to remember",
  },
  {
    question: <p>What does URL stand for?</p>,
    options: [
      "Universal Resource Locator",
      "Uniform Resource Locator",
      "Universal Routing Link",
      "Unified Resource Link",
    ],
    answer: "Uniform Resource Locator",
  },
  {
    question: <p>What is the main purpose of DNS?</p>,
    options: [
      "Translate domain names to IP addresses",
      "Encrypt network traffic",
      "Store web pages",
      "Transfer files",
    ],
    answer: "Translate domain names to IP addresses",
  },
  {
    question: <p>Which DNS server type returns the final IP address of a domain?</p>,
    options: [
      "Root Server",
      "TLD Server",
      "Authoritative Name Server",
      "Caching Server",
    ],
    answer: "Authoritative Name Server",
  },
  {
    question: <p>Which DNS server type redirects queries to TLD servers?</p>,
    options: [
      "Recursive Server",
      "Root Server",
      "Caching Server",
      "Mail Server",
    ],
    answer: "Root Server",
  },
  {
    question: <p>Which protocol is commonly used for DNS queries?</p>,
    options: [
      "TCP",
      "UDP",
      "FTP",
      "HTTP",
    ],
    answer: "UDP",
  },
  {
    question: <p>Which DNS record maps a domain to an IPv4 address?</p>,
    options: [
      "AAAA",
      "CNAME",
      "A",
      "MX",
    ],
    answer: "A",
  },
  {
    question: <p>Which DNS record is used for email routing?</p>,
    options: [
      "MX",
      "TXT",
      "NS",
      "A",
    ],
    answer: "MX",
  },
  {
    question: <p>What architecture does the web use?</p>,
    options: [
      "Peer-to-Peer",
      "Client-Server",
      "Distributed Mesh",
      "Token Ring",
    ],
    answer: "Client-Server",
  },
  {
    question: <p>What is the default port number for HTTP?</p>,
    options: [
      "21",
      "25",
      "80",
      "443",
    ],
    answer: "80",
  },
  {
    question: <p>Which HTTP method is used to retrieve data from a server?</p>,
    options: [
      "POST",
      "PUT",
      "DELETE",
      "GET",
    ],
    answer: "GET",
  },
  {
    question: <p>What is the default port used by HTTPS?</p>,
    options: [
      "8080",
      "80",
      "21",
      "443",
    ],
    answer: "443",
  },
];

const   Application_Layer_MCQ = ({
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
      title="Application Layer - MCQs"
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

export default  Application_Layer_MCQ;
