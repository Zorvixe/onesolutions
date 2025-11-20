import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Dates_Time_CS_4 = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});

  // Check if subtopic is already completed
  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleAnswer = (question, option) => {
    setMcqAnswers((prev) => ({ ...prev, [question]: option }));
  };

  const handleContinue = async () => {
    if (isLoading || isSubtopicCompleted) return;

    try {
      setIsLoading(true);
      const result = await markSubtopicComplete(
        subtopicId,
        goalName,
        courseName
      );

      if (result.success) {
        await loadProgressSummary();
        setIsSubtopicCompleted(true);
        console.log("✅ Cheat sheet marked as completed");
      } else {
        console.error(
          "❌ Failed to mark cheat sheet complete:",
          result.message
        );
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      console.error("❌ Failed to mark cheat sheet complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="intro-container">
      <h1>Dates & Time | Cheat Sheet</h1>

      {/* Introduction */}
      <section>
        <h2>Introduction</h2>
        <p>
          Python provides the <b>datetime</b> module to work with dates and
          times. It allows us to manipulate, format, and perform operations on
          date and time objects.
        </p>
      </section>

      {/* Getting Current Date & Time */}
      <section>
        <h2>Getting Current Date & Time</h2>
        <CodeBlock
          language="python"
          code={`from datetime import datetime\n\ncurrent_time = datetime.now()\nprint(current_time)`}
        />
      </section>

      {/* Creating Specific Dates */}
      <section>
        <h2>Creating Specific Dates</h2>
        <CodeBlock
          language="python"
          code={`from datetime import datetime\n\nspecific_date = datetime(2025, 9, 27, 14, 30)\nprint(specific_date)`}
        />
      </section>

      {/* Formatting Dates */}
      <section>
        <h2>Formatting Dates</h2>
        <p>
          Use <b>strftime</b> to format date objects as strings:
        </p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime\n\nnow = datetime.now()\nformatted = now.strftime("%d-%m-%Y %H:%M:%S")\nprint(formatted)`}
        />
      </section>

      {/* Parsing Dates */}
      <section>
        <h2>Parsing Dates</h2>
        <p>
          Use <b>strptime</b> to parse a string into a datetime object:
        </p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime\n\ndate_str = "27-09-2025 14:30:00"\nparsed_date = datetime.strptime(date_str, "%d-%m-%Y %H:%M:%S")\nprint(parsed_date)`}
        />
      </section>

      {/* Date & Time Arithmetic */}
      <section>
        <h2>Date & Time Arithmetic</h2>
        <p>
          Use <b>timedelta</b> to perform arithmetic with dates:
        </p>
        <CodeBlock
          language="python"
          code={`from datetime import datetime, timedelta\n\nnow = datetime.now()\nfuture = now + timedelta(days=5, hours=3)\nprint(future)`}
        />
      </section>

      {/* Summary */}
      <section>
        <h2>Summary</h2>
        <ul>
          <li>
            Use <b>datetime.now()</b> to get current date and time.
          </li>
          <li>
            Use <b>strftime</b> and <b>strptime</b> to format and parse dates.
          </li>
          <li>
            Use <b>timedelta</b> for date arithmetic.
          </li>
        </ul>
      </section>

      {/* Continue Button */}
      <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted || isLoading}
        >
          {isLoading
            ? "Marking..."
            : isSubtopicCompleted
            ? "✓ Completed"
            : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Dates_Time_CS_4;
