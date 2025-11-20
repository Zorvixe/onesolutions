import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`from datetime import date\ntoday = date.today()\nprint(today)`}
        />
      </div>
    ),
    options: ["Current date in YYYY-MM-DD format", "Error", "00:00:00", "None"],
    answer: "Current date in YYYY-MM-DD format",
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime\nnow = datetime.now()\nprint(now)`}
        />
      </div>
    ),
    options: ["Current date and time", "Only time", "Only date", "Error"],
    answer: "Current date and time",
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`from datetime import date\nd = date(2025, 12, 25)\nprint(d.year)`}
        />
      </div>
    ),
    options: ["2025", "12", "25", "Error"],
    answer: "2025",
  },

  {
    question: (
      <div>
        <p>What does this print?</p>
        <CodeBlock
          language="python"
          code={`from datetime import time\nt = time(14, 30, 45)\nprint(t.hour)`}
        />
      </div>
    ),
    options: ["14", "30", "45", "Error"],
    answer: "14",
  },

  {
    question: (
      <div>
        <p>What is the formatted output?</p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime\nnow = datetime.now()\nprint(now.strftime("%d/%m/%Y"))`}
        />
      </div>
    ),
    options: ["DD/MM/YYYY format", "MM/DD/YYYY format", "Error", "YYYY-MM-DD"],
    answer: "DD/MM/YYYY format",
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime\nnow = datetime.now()\nprint(now.strftime("%B %d, %Y"))`}
        />
      </div>
    ),
    options: [
      "Full month name Day, Year",
      "Short month name",
      "Error",
      "Only year",
    ],
    answer: "Full month name Day, Year",
  },

  {
    question: (
      <div>
        <p>What date object is created?</p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime\nd = datetime.strptime("2025-07-15", "%Y-%m-%d")\nprint(d.date())`}
        />
      </div>
    ),
    options: ["2025-07-15", "15-07-2025", "Error", "None"],
    answer: "2025-07-15",
  },

  {
    question: (
      <div>
        <p>How many days in the future?</p>
        <CodeBlock
          language="python"
          code={`from datetime import date, timedelta\ntoday = date.today()\nfuture = today + timedelta(days=10)\nprint(future)`}
        />
      </div>
    ),
    options: [
      "10 days ahead of today",
      "10 days before today",
      "Error",
      "Same date",
    ],
    answer: "10 days ahead of today",
  },

  {
    question: (
      <div>
        <p>What is the time difference?</p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime\nd1 = datetime(2025, 1, 1)\nd2 = datetime(2025, 12, 31)\ndiff = d2 - d1\nprint(diff.days)`}
        />
      </div>
    ),
    options: ["364", "365", "366", "Error"],
    answer: "364",
  },

  {
    question: (
      <div>
        <p>What weekday is displayed?</p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime\nnow = datetime.now()\nprint(now.strftime("%A"))`}
        />
      </div>
    ),
    options: [
      "Full weekday name (e.g., Monday)",
      "Short name (Mon)",
      "Number (0-6)",
      "Error",
    ],
    answer: "Full weekday name (e.g., Monday)",
  },

  {
    question: "Which method is used to get the current date and time?",
    options: ["datetime.now()", "date.today()", "time.now()", "current()"],
    answer: "datetime.now()",
  },

  {
    question: "What does %p represent in strftime()?",
    options: ["AM/PM", "Year", "Month", "Second"],
    answer: "AM/PM",
  },

  {
    question:
      "Which class represents a duration or difference between two dates?",
    options: ["datetime", "date", "time", "timedelta"],
    answer: "timedelta",
  },

  {
    question: "How do you parse a string into a datetime object?",
    options: [
      "datetime.parse()",
      "datetime.strptime()",
      "datetime.fromstring()",
      "date.convert()",
    ],
    answer: "datetime.strptime()",
  },

  {
    question: "Which format code gives the full month name?",
    options: ["%m", "%b", "%B", "%d"],
    answer: "%B",
  },
];

const Workingwith_Lists_MCQ = ({
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
      title="Working with Lists | MCQs"
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

export default Workingwith_Lists_MCQ;
