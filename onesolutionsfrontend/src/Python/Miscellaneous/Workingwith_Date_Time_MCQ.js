import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>How do you get only today’s date (without time)?</p>
        <CodeBlock
          language="python"
          code={`from datetime import date\ntoday = date.today()\nprint(today)`}
        />
      </div>
    ),
    options: [
      "datetime.now()",
      "date.today() Correct",
      "datetime.today()",
      "time.today()",
    ],
    answer: "date.today() Correct",
  },

  {
    question: (
      <div>
        <p>Which class represents only time (hours, minutes, seconds)?</p>
        <CodeBlock
          language="python"
          code={`from datetime import time\nt = time(14, 30, 15)`}
        />
      </div>
    ),
    options: ["date", "datetime", "time Correct", "timedelta"],
    answer: "time Correct",
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime\ndt = datetime.now()\nprint(dt.strftime("%A"))`}
        />
      </div>
    ),
    options: [
      "Day number",
      "Full weekday name (e.g., Monday) Correct",
      "Short weekday (Mon)",
      "Error",
    ],
    answer: "Full weekday name (e.g., Monday) Correct",
  },

  {
    question: (
      <div>
        <p>How do you create a time object for 9:45 AM?</p>
        <CodeBlock
          language="python"
          code={`from datetime import time\nmeeting = time(9, 45)`}
        />
      </div>
    ),
    options: [
      "time(9, 45)",
      "time(9:45)",
      "datetime(9, 45)",
      "timedelta(hours=9, minutes=45)",
    ],
    answer: "time(9, 45)",
  },

  {
    question: (
      <div>
        <p>What does this return?</p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime\nnow = datetime.now()\nprint(now.year)`}
        />
      </div>
    ),
    options: ["Current month", "Current year Correct", "Current day", "Error"],
    answer: "Current year Correct",
  },

  {
    question: (
      <div>
        <p>How to parse "2025-12-25" into a datetime object?</p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime\nxmas = datetime.strptime("2025-12-25", "%Y-%m-%d")`}
        />
      </div>
    ),
    options: [
      "strptime(..., '%d-%m-%Y')",
      "strptime(..., '%Y-%m-%d') Correct",
      "strftime(..., '%Y-%m-%d')",
      "parse_date(...) ",
    ],
    answer: "strptime(..., '%Y-%m-%d') Correct",
  },

  {
    question: (
      <div>
        <p>How to get a date 15 days from today?</p>
        <CodeBlock
          language="python"
          code={`from datetime import date, timedelta\nfuture = date.today() + timedelta(days=15)`}
        />
      </div>
    ),
    options: [
      "date.today() + 15",
      "date.today() + timedelta(days=15) Correct",
      "datetime.now() + 15",
      "timedelta(days=15)",
    ],
    answer: "date.today() + timedelta(days=15) Correct",
  },

  {
    question: (
      <div>
        <p>Which attribute gives the day of the month?</p>
        <CodeBlock
          language="python"
          code={`today = date.today()\nprint(today.day)`}
        />
      </div>
    ),
    options: [
      "today.month",
      "today.year",
      "today.day Correct",
      "today.weekday()",
    ],
    answer: "today.day Correct",
  },

  {
    question: (
      <div>
        <p>What format code gives month name like "October"?</p>
        <CodeBlock language="python" code={`dt.strftime("%B")`} />
      </div>
    ),
    options: ["%m", "%b", "%B Correct", "%M"],
    answer: "%B Correct",
  },

  {
    question: (
      <div>
        <p>How to find the difference between two dates?</p>
        <CodeBlock
          language="python"
          code={`from datetime import date\nd1 = date(2025, 12, 25)\nd2 = date(2025, 1, 1)\ndiff = d1 - d2`}
        />
      </div>
    ),
    options: [
      "Returns a string",
      "Returns a timedelta object Correct",
      "Returns an integer",
      "Error",
    ],
    answer: "Returns a timedelta object Correct",
  },

  {
    question:
      "Which class in datetime module represents only the date (no time)?",
    options: ["datetime", "time", "date", "timedelta"],
    answer: "date",
  },

  {
    question: "Which class combines both date and time?",
    options: ["date", "time", "datetime", "timedelta"],
    answer: "datetime",
  },

  {
    question: "What does strftime() do?",
    options: [
      "Parses string → datetime",
      "Formats datetime → string Correct",
      "Adds days",
      "Gets current time",
    ],
    answer: "Formats datetime → string Correct",
  },

  {
    question: "What does strptime() do?",
    options: [
      "Formats date as string",
      "Parses string into datetime object Correct",
      "Calculates difference",
      "Creates timedelta",
    ],
    answer: "Parses string into datetime object Correct",
  },

  {
    question:
      "Which class is used to represent duration (like 5 days, 3 hours)?",
    options: ["date", "datetime", "time", "timedelta"],
    answer: "timedelta",
  },
];

const Workingwith_Date_Time_MCQ = ({
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
      title="Working with Date Time | MCQs"
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

export default Workingwith_Date_Time_MCQ;
