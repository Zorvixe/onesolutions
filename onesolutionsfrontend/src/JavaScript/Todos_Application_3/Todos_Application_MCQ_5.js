import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What will the following code output?</p>
        <CodeBlock
          language="javascript"
          code={`let numbers = [10, 20, 30, 40];\nnumbers.splice(2, 1);\nconsole.log(numbers);`}
        />
      </div>
    ),
    options: [
      "[10, 30, 40]",
      "[10, 20, 40]",
      "[20, 30, 40]",
      "[10, 20, 30, 40]",
    ],
    answer: "[10, 20, 40]",
  },
  {
    question: (
      <div>
        <p>Which array method adds elements to the beginning of the array?</p>
        <CodeBlock
          language="javascript"
          code={`let colors = ["blue", "green"];\ncolors.unshift("red");\nconsole.log(colors);`}
        />
      </div>
    ),
    options: ["push()", "unshift()", "splice()", "concat()"],
    answer: "unshift()",
  },
  {
    question: (
      <div>
        <p>What will be logged to the console?</p>
        <CodeBlock
          language="javascript"
          code={`let fruits = ["apple", "banana", "apple", "mango"];\nconsole.log(fruits.lastIndexOf("apple"));`}
        />
      </div>
    ),
    options: ["0", "1", "2", "-1"],
    answer: "2",
  },
  {
    question: (
      <div>
        <p>What will the find() method return in this example?</p>
        <CodeBlock
          language="javascript"
          code={`let nums = [2, 5, 8, 10];\nlet found = nums.find(num => num > 6);\nconsole.log(found);`}
        />
      </div>
    ),
    options: ["5", "8", "10", "undefined"],
    answer: "8",
  },
  {
    question: (
      <div>
        <p>What does the following splice() operation do?</p>
        <CodeBlock
          language="javascript"
          code={`let arr = ["a", "b", "c", "d"];\narr.splice(1, 2, "x", "y");\nconsole.log(arr);`}
        />
      </div>
    ),
    options: [
      `["a", "x", "y", "d"]`,
      `["x", "y", "c", "d"]`,
      `["a", "b", "x", "y", "c", "d"]`,
      `["a", "b", "c", "d"]`,
    ],
    answer: `["a", "x", "y", "d"]`,
  },
  {
    question: (
      <div>
        <p>What will be the output of the join() method here?</p>
        <CodeBlock
          language="javascript"
          code={`let words = ["Hello", "World"];\nconsole.log(words.join(" "));`}
        />
      </div>
    ),
    options: [
      `"HelloWorld"`,
      `"Hello,World"`,
      `"Hello World"`,
      `"Hello + World"`,
    ],
    answer: `"Hello World"`,
  },
  {
    question: (
      <div>
        <p>What does the concat() method do in this example?</p>
        <CodeBlock
          language="javascript"
          code={`let arr1 = [1, 2];\nlet arr2 = [3, 4];\nlet combined = arr1.concat(arr2);\nconsole.log(combined);`}
        />
      </div>
    ),
    options: ["[1, 2]", "[3, 4]", "[1, 2, 3, 4]", "[[1, 2], [3, 4]]"],
    answer: "[1, 2, 3, 4]",
  },
  {
    question: "Which array method returns true if an item exists in the array?",
    options: ["find()", "includes()", "indexOf()", "concat()"],
    answer: "includes()",
  },
  {
    question: "Which array method removes the first element of the array?",
    options: ["pop()", "shift()", "splice()", "unshift()"],
    answer: "shift()",
  },
  {
    question: "Which method sorts array items in ascending order by default?",
    options: ["sort()", "order()", "arrange()", "indexOf()"],
    answer: "sort()",
  },
];

const Todos_Application_MCQ_5 = ({
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
    <MCQLogic title="Todos Application 5 - MCQs" questions={randomQuestions}
    isCompleted={isCompleted}
    isLoading={isLoading}
    onComplete={handleCompletion}
    subtopicId={subtopicId}
    goalName={goalName}
    courseName={courseName} />
  );
};

export default Todos_Application_MCQ_5;
