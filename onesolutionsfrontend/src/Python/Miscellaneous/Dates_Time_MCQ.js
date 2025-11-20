import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What will this print?</p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime\nprint(datetime.now())`}
        />
      </div>
    ),
    options: [
      "Only today's date",
      "Only current time",
      "Current date and time",
      "Error",
    ],
    answer: "Current date and time",
  },

  {
    question: (
      <div>
        <p>How do you create the date: 15th October 2025?</p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime\ndt = datetime(2025, 10, 15)`}
        />
      </div>
    ),
    options: [
      "datetime(15, 10, 2025)",
      "datetime(2025, 10, 15)",
      "date(2025, 10, 15)",
      "datetime.new(2025, 10, 15)",
    ],
    answer: "datetime(2025, 10, 15)",
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime\ndt = datetime(2025, 9, 27)\nprint(dt.strftime("%d-%m-%Y"))`}
        />
      </div>
    ),
    options: ["27-09-2025", "2025-09-27", "27/09/2025", "Sep 27, 2025"],
    answer: "27-09-2025",
  },

  {
    question: (
      <div>
        <p>What does this code do?</p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime\nbirthday = datetime.strptime("15-03-2000", "%d-%m-%Y")`}
        />
      </div>
    ),
    options: [
      "Converts date to string",
      "Converts string to datetime object",
      "Adds days",
      "Prints the date",
    ],
    answer: "Converts string to datetime object",
  },

  {
    question: (
      <div>
        <p>How to get tomorrow's date?</p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime, timedelta\ntomorrow = datetime.now() + timedelta(days=1)`}
        />
      </div>
    ),
    options: [
      "datetime.now() + 1",
      "datetime.now() + timedelta(days=1)",
      "datetime.tomorrow()",
      "datetime.now().add_day()",
    ],
    answer: "datetime.now() + timedelta(days=1)",
  },

  {
    question: (
      <div>
        <p>What format code gives full weekday name (e.g., Monday)?</p>
        <CodeBlock language="python" code={`dt.strftime("%A")`} />
      </div>
    ),
    options: ["%A", "%a", "%w", "%d"],
    answer: "%A",
  },

  {
    question: (
      <div>
        <p>What will this return?</p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime, timedelta\nnow = datetime.now()\none_week_later = now + timedelta(weeks=1)`}
        />
      </div>
    ),
    options: [
      "Same date",
      "Date 7 days from now",
      "Date 1 month later",
      "Error",
    ],
    answer: "Date 7 days from now",
  },

  {
    question: (
      <div>
        <p>Which line correctly parses "2025-12-25" as a date?</p>
        <CodeBlock
          language="python"
          code={`datetime.strptime("2025-12-25", "%Y-%m-%d")`}
        />
      </div>
    ),
    options: ["%d-%m-%Y", "%Y-%m-%d", "%m-%d-%Y", "Wrong format"],
    answer: "%Y-%m-%d",
  },

  {
    question: (
      <div>
        <p>What format shows time in 12-hour clock with AM/PM?</p>
        <CodeBlock language="python" code={`now.strftime("%I:%M %p")`} />
      </div>
    ),
    options: ["%H:%M", "%I:%M %p", "%H:%M:%S", "%I:%M:%S"],
    answer: "%I:%M %p",
  },

  {
    question: (
      <div>
        <p>How to subtract 3 hours from current time?</p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime, timedelta\nthree_hours_ago = datetime.now() - timedelta(hours=3)`}
        />
      </div>
    ),
    options: [
      "datetime.now() - 3",
      "datetime.now() - timedelta(hours=3)",
      "datetime.now().subtract(3)",
      "timedelta(-3)",
    ],
    answer: "datetime.now() - timedelta(hours=3)",
  },

  {
    question:
      "Which module do you need to import to work with dates and times?",
    options: ["time", "date", "datetime", "calendar"],
    answer: "datetime",
  },

  {
    question: "What is the purpose of strftime()?",
    options: [
      "Parse string to date",
      "Format datetime object as string",
      "Add days",
      "Get current time",
    ],
    answer: "Format datetime object as string",
  },

  {
    question: "What is the purpose of strptime()?",
    options: [
      "Format date as string",
      "Parse string into datetime object",
      "Perform arithmetic",
      "Get current date",
    ],
    answer: "Parse string into datetime object",
  },

  {
    question: "Which class allows adding/subtracting days, hours, minutes?",
    options: ["date", "time", "timedelta", "datetime"],
    answer: "timedelta",
  },

  {
    question: "Which format code shows full month name (e.g., October)?",
    options: ["%m", "%B", "%b", "%M"],
    answer: "%B",
  },
];

const Dates_Time_MCQ = ({
  subtopicId,
  goalName,
  courseName,
  onComplete
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } = useAuth();

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
        courseName
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
      title="Dates Time | MCQs"
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

export default Dates_Time_MCQ;
