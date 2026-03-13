import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";



const questionsData = [
  {
    question: <p>Which command checks network connectivity between two hosts?</p>,
    options: ["ping", "diff", "alias", "top"],
    answer: "ping",
  },
  {
    question: (
      <div>
        <p>What does the following command do?</p>
        <CodeBlock language="bash" code={`ping google.com`} />
      </div>
    ),
    options: [
      "Checks connectivity to google.com",
      "Downloads Google website",
      "Shows system processes",
      "Displays environment variables",
    ],
    answer: "Checks connectivity to google.com",
  },
  {
    question: (
      <div>
        <p>Which command shows the path that packets take to reach a host?</p>
        <CodeBlock language="bash" code={`traceroute google.com`} />
      </div>
    ),
    options: [
      "Displays route of packets",
      "Deletes route table",
      "Shows disk space",
      "Downloads files",
    ],
    answer: "Displays route of packets",
  },
  {
    question: (
      <div>
        <p>Which command displays network interface information?</p>
        <CodeBlock language="bash" code={`ifconfig`} />
      </div>
    ),
    options: [
      "Shows network interface details",
      "Lists files",
      "Shows system memory",
      "Creates network connection",
    ],
    answer: "Shows network interface details",
  },
  {
    question: <p>Which interface is used to communicate with services running on the same machine?</p>,
    options: ["eth0", "loopback (lo)", "wifi0", "usb0"],
    answer: "loopback (lo)",
  },
  {
    question: (
      <div>
        <p>Which command lists environment variables?</p>
        <CodeBlock language="bash" code={`env`} />
      </div>
    ),
    options: [
      "Shows environment variables",
      "Deletes variables",
      "Creates variables",
      "Moves variables",
    ],
    answer: "Shows environment variables",
  },
  {
    question: (
      <div>
        <p>Which command creates or updates an environment variable?</p>
        <CodeBlock language="bash" code={`export MY_VAR=10`} />
      </div>
    ),
    options: [
      "Creates environment variable",
      "Deletes variable",
      "Prints variable",
      "Moves variable",
    ],
    answer: "Creates environment variable",
  },
  {
    question: (
      <div>
        <p>Which command displays the value of an environment variable?</p>
        <CodeBlock language="bash" code={`echo $MY_VAR`} />
      </div>
    ),
    options: [
      "Displays variable value",
      "Deletes variable",
      "Copies variable",
      "Creates variable",
    ],
    answer: "Displays variable value",
  },
  {
    question: (
      <div>
        <p>Which command removes an environment variable?</p>
        <CodeBlock language="bash" code={`unset VARIABLE_NAME`} />
      </div>
    ),
    options: [
      "Deletes environment variable",
      "Creates environment variable",
      "Copies variable",
      "Lists variables",
    ],
    answer: "Deletes environment variable",
  },
  {
    question: (
      <div>
        <p>Which command shows directories where executables are stored?</p>
        <CodeBlock language="bash" code={`echo $PATH`} />
      </div>
    ),
    options: [
      "Displays PATH variable",
      "Deletes PATH",
      "Creates PATH",
      "Renames PATH",
    ],
    answer: "Displays PATH variable",
  },
  {
    question: (
      <div>
        <p>Which command creates a shortcut for another command?</p>
        <CodeBlock language="bash" code={`alias t="traceroute"`} />
      </div>
    ),
    options: [
      "Creates command shortcut",
      "Deletes command",
      "Moves command",
      "Updates command",
    ],
    answer: "Creates command shortcut",
  },
  {
    question: (
      <div>
        <p>Which command removes an alias?</p>
        <CodeBlock language="bash" code={`unalias t`} />
      </div>
    ),
    options: [
      "Deletes alias",
      "Creates alias",
      "Lists aliases",
      "Copies alias",
    ],
    answer: "Deletes alias",
  },
  {
    question: (
      <div>
        <p>Which command shows how long a command takes to execute?</p>
        <CodeBlock language="bash" code={`time ls`} />
      </div>
    ),
    options: [
      "Measures command execution time",
      "Deletes command",
      "Copies files",
      "Shows memory usage",
    ],
    answer: "Measures command execution time",
  },
  {
    question: (
      <div>
        <p>Which command monitors running processes in real time?</p>
        <CodeBlock language="bash" code={`top`} />
      </div>
    ),
    options: [
      "Displays running processes",
      "Deletes processes",
      "Creates processes",
      "Moves processes",
    ],
    answer: "Displays running processes",
  },
  {
    question: (
      <div>
        <p>Which command compares two files and shows their differences?</p>
        <CodeBlock language="bash" code={`diff file1.txt file2.txt`} />
      </div>
    ),
    options: [
      "Compares two files",
      "Copies files",
      "Deletes files",
      "Moves files",
    ],
    answer: "Compares two files",
  },
];

const  Miscellaneous_Commands_MCQ_2 = ({
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

export default  Miscellaneous_Commands_MCQ_2;
