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
          code={`for i in range(6):\n    if i == 4:\n        break\n    print(i)`}
        />
      </div>
    ),
    options: [
      <span>
        0<br />1<br />2<br />3<br />4
      </span>,
      <span>
        0<br />1<br />2<br />3
      </span>,
      <span>4</span>,
      <span>
        0<br />1<br />2<br />3<br />4<br />5
      </span>,
    ],
    answer: (
      <span>
        0<br />1<br />2<br />3
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What numbers are printed?</p>
        <CodeBlock
          language="python"
          code={`i = 0\nwhile i < 5:\n    if i == 3:\n        break\n    print(i)\n    i += 1`}
        />
      </div>
    ),
    options: [
      <span>
        0<br />1<br />2
      </span>,
      <span>
        0<br />1<br />2<br />3
      </span>,
      <span>3</span>,
      <span>No output</span>,
    ],
    answer: (
      <span>
        0<br />1<br />2
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`for i in range(5):\n    if i == 2:\n        continue\n    print(i)`}
        />
      </div>
    ),
    options: [
      <span>
        0<br />1<br />3<br />4
      </span>,
      <span>
        0<br />1<br />2<br />3<br />4
      </span>,
      <span>2</span>,
      <span>
        0<br />1<br />2
      </span>,
    ],
    answer: (
      <span>
        0<br />1<br />3<br />4
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock
          language="python"
          code={`for i in range(1, 6):\n    if i % 2 == 0:\n        continue\n    print(i)`}
        />
      </div>
    ),
    options: [
      <span>
        1<br />3<br />5
      </span>,
      <span>
        2<br />4
      </span>,
      <span>
        1<br />2<br />3<br />4<br />5
      </span>,
      <span>No output</span>,
    ],
    answer: (
      <span>
        1<br />3<br />5
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`for i in range(3):\n    for j in range(3):\n        if j == 1:\n            break\n        print("i=", i, "j=", j)`}
        />
      </div>
    ),
    options: [
      <span>
        i=0 j=0
        <br />
        i=1 j=0
        <br />
        i=2 j=0
      </span>,
      <span>
        i=0 j=0
        <br />
        i=0 j=1 only
      </span>,
      <span>All 9 pairs</span>,
      <span>Error</span>,
    ],
    answer: (
      <span>
        i=0 j=0
        <br />
        i=1 j=0
        <br />
        i=2 j=0
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`for i in range(4):\n    if i == 2:\n        pass\n    else:\n        print(i)`}
        />
      </div>
    ),
    options: [
      <span>
        0<br />1<br />3
      </span>,
      <span>
        0<br />1<br />2<br />3
      </span>,
      <span>
        0<br />1<br />3<br />2
      </span>,
      <span>No output</span>,
    ],
    answer: (
      <span>
        0<br />1<br />3
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What happens when this runs?</p>
        <CodeBlock
          language="python"
          code={`i = 0\nwhile i < 3:\n    i += 1\n    if i == 2:\n        continue\n    print(i)`}
        />
      </div>
    ),
    options: [
      <span>
        1<br />3
      </span>,
      <span>
        1<br />2<br />3
      </span>,
      <span>2</span>,
      <span>Infinite loop</span>,
    ],
    answer: (
      <span>
        1<br />3
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What is the final output?</p>
        <CodeBlock
          language="python"
          code={`for i in range(10):\n    if i == 5:\n        break\n    if i % 2 == 0:\n        continue\n    print(i)`}
        />
      </div>
    ),
    options: [
      <span>
        1<br />3
      </span>,
      <span>
        0<br />1<br />2<br />3<br />4
      </span>,
      <span>
        1<br />3<br />5
      </span>,
      <span>No output</span>,
    ],
    answer: (
      <span>
        1<br />3
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What does this code print?</p>
        <CodeBlock
          language="python"
          code={`for i in range(3):\n    pass\nprint("Finished")`}
        />
      </div>
    ),
    options: ["Nothing", "Finished", "0 1 2", "Error"],
    answer: "Finished",
  },

  {
    question: (
      <div>
        <p>How many numbers are printed?</p>
        <CodeBlock
          language="python"
          code={`count = 0\nfor i in range(100):\n    if i == 10:\n        break\n    count += 1\nprint(count)`}
        />
      </div>
    ),
    options: ["100", "10", "11", "0"],
    answer: "10",
  },

  {
    question: "What happens when break is executed inside a loop?",
    options: [
      "Loop skips one iteration",
      "Loop terminates immediately",
      "Loop restarts from beginning",
      "Program crashes",
    ],
    answer: "Loop terminates immediately",
  },

  {
    question: "What does continue do in a loop?",
    options: [
      "Exits the entire loop",
      "Skips the rest of the current iteration and moves to next",
      "Does nothing",
      "Prints a message",
    ],
    answer: "Skips the rest of the current iteration and moves to next",
  },

  {
    question: "When is pass statement commonly used?",
    options: [
      "To exit loop",
      "As a placeholder when code is not ready",
      "To skip iteration",
      "To print nothing",
    ],
    answer: "As a placeholder when code is not ready",
  },

  {
    question: "In a nested loop, break in the inner loop affects:",
    options: [
      "Only the inner loop",
      "Both inner and outer loops",
      "Only the outer loop",
      "The entire program",
    ],
    answer: "Only the inner loop",
  },

  {
    question: "Which statement does absolutely nothing when executed?",
    options: ["break", "continue", "pass", "return"],
    answer: "pass",
  },
];

const LoopControlStmts_MCQ = ({
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
      title="Loop Control Statements | MCQs"
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

export default LoopControlStmts_MCQ;
