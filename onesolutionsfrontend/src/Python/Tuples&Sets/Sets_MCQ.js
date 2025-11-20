import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";
const questionsData = [
  {
    question: "Which of the following is true about sets in Python?",
    options: [
      "Sets allow duplicate elements",
      "Sets are ordered collections",
      "Set elements must be immutable and unique",
      "Sets support indexing and slicing",
    ],
    answer: "Set elements must be immutable and unique",
  },
  {
    question: "How do you correctly create an empty set in Python?",
    options: ["{}", "set()", "[]", "empty_set()"],
    answer: "set()",
  },
  {
    question: "What happens when you add a duplicate item to a set?",
    options: [
      "It gets added multiple times",
      "It is ignored (set remains unchanged)",
      "TypeError is raised",
      "ValueError is raised",
    ],
    answer: "It is ignored (set remains unchanged)",
  },
  {
    question: "Which method adds a single element to a set?",
    options: ["append()", "add()", "update()", "insert()"],
    answer: "add()",
  },
  {
    question: "Which method adds multiple elements to a set?",
    options: ["add()", "extend()", "update()", "insert()"],
    answer: "update()",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`fruits = {"apple", "banana", "apple"}
  print("\\n".join(sorted(fruits)))}`}
        />
      </div>
    ),
    options: [
      <span>
        apple
        <br />
        banana
        <br />
        apple
      </span>,
      <span>
        apple
        <br />
        banana
      </span>,
      <span>
        banana
        <br />
        apple
      </span>,
      "Error",
    ],
    answer: (
      <span>
        apple
        <br />
        banana
      </span>
    ),
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`s = set("hello")
  print("\\n".join(sorted(s)))}`}
        />
      </div>
    ),
    options: [
      <span>
        h<br />e<br />l<br />l<br />o
      </span>,
      <span>
        e<br />h<br />l<br />o
      </span>,
      <span>
        h<br />e<br />l<br />o
      </span>,
      "Error",
    ],
    answer: (
      <span>
        e<br />h<br />l<br />o
      </span>
    ),
  },
  {
    question: (
      <div>
        <p>What happens when this code runs?</p>
        <CodeBlock
          language="python"
          code={`my_set = {1, 2, 3}
  my_set.add(4)
  my_set.add(2)
  print(my_set)`}
        />
      </div>
    ),
    options: ["{1, 2, 3, 4, 2}", "{1, 2, 3, 4}", "{1, 2, 3}", "Error"],
    answer: "{1, 2, 3, 4}",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`nums = {10, 20, 30}
  nums.update([20, 40, 50])
  print(sorted(nums))`}
        />
      </div>
    ),
    options: ["[10, 20, 30]", "[20, 40, 50]", "[10, 20, 30, 40, 50]", "Error"],
    answer: "[10, 20, 30, 40, 50]",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`data = {1, 2, 3}
  data.remove(2)
  print(data)`}
        />
      </div>
    ),
    options: ["{1, 3}", "{1, 2, 3}", "{2, 3}", "KeyError"],
    answer: "{1, 3}",
  },
  {
    question: (
      <div>
        <p>What happens when this code runs?</p>
        <CodeBlock
          language="python"
          code={`s = {1, 2, 3}
  s.remove(99)`}
        />
      </div>
    ),
    options: [
      "s becomes empty",
      "No change, silently ignored",
      "KeyError: 99",
      "TypeError",
    ],
    answer: "KeyError: 99",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`s = {1, 2, 3}
  s.discard(2)
  s.discard(99)
  print(s)`}
        />
      </div>
    ),
    options: ["{1, 3}", "{1, 2, 3}", "KeyError", "Error"],
    answer: "{1, 3}",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`a = {1, 2, 3, 4}
  b = {3, 4, 5, 6}
  print(a | b)`}
        />
      </div>
    ),
    options: ["{3, 4}", "{1, 2, 5, 6}", "{1, 2, 3, 4, 5, 6}", "Error"],
    answer: "{1, 2, 3, 4, 5, 6}",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`x = {1, 2, 3}
  y = {2, 3, 4}
  print(x & y)`}
        />
      </div>
    ),
    options: ["{2, 3}", "{1, 2, 3, 4}", "{1, 4}", "Error"],
    answer: "{2, 3}",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`p = {1, 2, 3}
  q = {3, 4, 5}
  print(p - q)`}
        />
      </div>
    ),
    options: ["{1, 2}", "{4, 5}", "{1, 2, 4, 5}", "Error"],
    answer: "{1, 2}",
  },
];
const Sets_MCQ = ({
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
      title="Sets | MCQs"
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

export default Sets_MCQ;
