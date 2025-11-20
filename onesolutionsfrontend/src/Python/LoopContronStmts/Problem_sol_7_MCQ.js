import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 10 CODE BLOCK QUESTIONS ====================

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`num = 10\nnum += 5\nprint(num)`} />
      </div>
    ),
    options: ["10", "15", "5", "Error"],
    answer: "15",
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`text = "Hi"\ntext += " there"\nprint(text)`}
        />
      </div>
    ),
    options: ["Hi", "there", "Hi there", "Hithere"],
    answer: "Hi there",
  },

  {
    question: (
      <div>
        <p>What is the final value?</p>
        <CodeBlock language="python" code={`x = 4\nx *= 3\nprint(x)`} />
      </div>
    ),
    options: ["12", "7", "4", "1"],
    answer: "12",
  },

  {
    question: (
      <div>
        <p>What does this print?</p>
        <CodeBlock language="python" code={`a = 20\na -= 8\nprint(a)`} />
      </div>
    ),
    options: ["28", "12", "8", "20"],
    answer: "12",
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`result = ""\nfor i in range(3):\n    result += "7 "\nprint(result)`}
        />
      </div>
    ),
    options: ["777", <span>7 7 7 </span>, "7", "Error"],
    answer: <span>7 7 7 </span>,
  },

  {
    question: (
      <div>
        <p>How many times is "Hi" added?</p>
        <CodeBlock
          language="python"
          code={`s = ""\nfor i in range(4):\n    s += "Hi "\nprint(s)`}
        />
      </div>
    ),
    options: ["Hi", <span>Hi Hi Hi Hi </span>, "HiHiHiHi", "4"],
    answer: <span>Hi Hi Hi Hi </span>,
  },

  {
    question: (
      <div>
        <p>What is the final value of total?</p>
        <CodeBlock
          language="python"
          code={`total = 2\nfor i in range(3):\n    total += 3\nprint(total)`}
        />
      </div>
    ),
    options: ["5", "9", "11", "2"],
    answer: "11",
  },

  {
    question: (
      <div>
        <p>What does this compute?</p>
        <CodeBlock
          language="python"
          code={`value = 15\nvalue %= 7\nprint(value)`}
        />
      </div>
    ),
    options: ["1", "2", "7", "15"],
    answer: "1",
  },

  {
    question: (
      <div>
        <p>What string is built?</p>
        <CodeBlock
          language="python"
          code={`pattern = ""\nfor i in range(2):\n    pattern += "★"\nprint(pattern)`}
        />
      </div>
    ),
    options: ["★", "★★", "★ ", "Error"],
    answer: "★★",
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`num = 3\nnum *= 4\nnum += 2\nprint(num)`}
        />
      </div>
    ),
    options: ["14", "12", "9", "5"],
    answer: "14",
  },

  // ==================== 5 NORMAL QUESTIONS ====================

  {
    question: "Which of these is equivalent to a = a + 5?",
    options: ["a + 5", "a =+ 5", "a += 5", "a == 5"],
    answer: "a += 5",
  },

  {
    question: "Which compound operator is used for subtraction and assignment?",
    options: ["+=", "-=", "*=", "/="],
    answer: "-=",
  },

  {
    question:
      "Which operator can be used to repeatedly append a string in a loop?",
    options: ["*=", "+=", "-=", "%="],
    answer: "+=",
  },

  {
    question: "What does x *= 3 do if x was originally 5?",
    options: ["x becomes 8", "x becomes 15", "x becomes 2", "x becomes 5"],
    answer: "x becomes 15",
  },

  {
    question: "Which of the following is NOT a compound assignment operator?",
    options: ["+=", "-=", "*=", "=+"],
    answer: "=+",
  },
];

const Problem_sol_7_MCQ = ({
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
      title="Problem Solving - Part 7 | MCQs"
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

export default Problem_sol_7_MCQ;
