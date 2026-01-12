import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: "Which operator or method returns the union of two sets?",
    options: [
      "| or .union()",
      "& or .intersection()",
      "- or .difference()",
      "^ or .symmetric_difference()",
    ],
    answer: "| or .union()",
  },
  {
    question: "Which operator or method returns the intersection of two sets?",
    options: [
      "| or .union()",
      "& or .intersection()",
      "- or .difference()",
      "^ or .symmetric_difference()",
    ],
    answer: "& or .intersection()",
  },
  {
    question:
      "Which operator or method returns elements in set A but not in set B?",
    options: [
      "| or .union()",
      "& or .intersection()",
      "- or .difference()",
      "^ or .symmetric_difference()",
    ],
    answer: "- or .difference()",
  },
  {
    question:
      "Which operator or method returns elements that are in either set, but not in both?",
    options: [
      "| or .union()",
      "& or .intersection()",
      "- or .difference()",
      "^ or .symmetric_difference()",
    ],
    answer: "^ or .symmetric_difference()",
  },
  {
    question: "What does A.issubset(B) return?",
    options: [
      "True if A is completely inside B",
      "True if A and B have no common elements",
      "True if B is completely inside A",
      "True if A and B are equal",
    ],
    answer: "True if A is completely inside B",
  },
  {
    question: "What does A.issuperset(B) return?",
    options: [
      "True if B is completely inside A",
      "True if A and B have no common elements",
      "True if A is completely inside B",
      "True if A and B are equal",
    ],
    answer: "True if B is completely inside A",
  },
  {
    question: "What does A.isdisjoint(B) return?",
    options: [
      "True if A and B have at least one common element",
      "True if A and B have no common elements",
      "True if A is a subset of B",
      "True if A equals B",
    ],
    answer: "True if A and B have no common elements",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`A = {1, 2, 3, 4}\nB = {3, 4, 5, 6}\nprint(A | B)`}
        />
      </div>
    ),
    options: ["{3, 4}", "{1, 2, 3, 4, 5, 6}", "{1, 2}", "{5, 6}"],
    answer: "{1, 2, 3, 4, 5, 6}",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`X = {10, 20, 30}\nY = {20, 30, 40}\nprint(X & Y)`}
        />
      </div>
    ),
    options: ["{10, 20, 30, 40}", "{20, 30}", "{10, 40}", "set()"],
    answer: "{20, 30}",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`P = {1, 2, 3}\nQ = {2, 3, 4}\nprint(P - Q)`}
        />
      </div>
    ),
    options: ["{1}", "{4}", "{1, 4}", "{2, 3}"],
    answer: "{1}",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`S1 = {1, 2, 3}\nS2 = {2, 3, 4}\nprint(S1 ^ S2)`}
        />
      </div>
    ),
    options: ["{2, 3}", "{1, 2, 3, 4}", "{1, 4}", "{1, 2, 3, 4}"],
    answer: "{1, 4}",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`evens = {2, 4, 6}\nodds = {1, 3, 5}\nprint(evens.isdisjoint(odds))`}
        />
      </div>
    ),
    options: ["True", "False", "Error", "None"],
    answer: "True",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`all_nums = {1, 2, 3, 4, 5}\nsmall = {2, 4}\nprint(small.issubset(all_nums))`}
        />
      </div>
    ),
    options: ["True", "False", "Error", "None"],
    answer: "True",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`big = {10, 20, 30, 40}\npart = {20, 40}\nprint(big.issuperset(part))`}
        />
      </div>
    ),
    options: ["True", "False", "Error", "None"],
    answer: "True",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`A = {1, 2}\nB = {3, 4}\nprint(A.union([2, 5]))`}
        />
      </div>
    ),
    options: ["{1, 2, 3, 4}", "{1, 2, 5}", "{1, 2, 3, 4, 5}", "Error"],
    answer: "{1, 2, 5}",
  },
];

const Set_Operations_MCQ = ({
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
      title="Set Operations | MCQs"
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

export default Set_Operations_MCQ;
