import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: "Which method adds a single element to the end of a list?",
    options: ["extend()", "insert()", "append()", "add()"],
    answer: "append()",
  },
  {
    question: "What does list.pop() return when called without an index?",
    options: ["None", "The removed element", "The entire list", "IndexError"],
    answer: "The removed element",
  },
  {
    question: "What is the key difference between sort() and sorted()?",
    options: [
      "sort() returns a new list, sorted() modifies in place",
      "sort() modifies the list in place, sorted() returns a new list",
      "Both modify in place",
      "Both return a new list",
    ],
    answer: "sort() modifies the list in place, sorted() returns a new list",
  },
  {
    question: "Which method removes the first occurrence of a specific value?",
    options: ["pop()", "remove()", "clear()", "delete()"],
    answer: "remove()",
  },
  {
    question: "What does list.clear() do?",
    options: [
      "Removes the last element",
      "Removes all elements (makes list empty)",
      "Removes duplicates",
      "Sorts the list",
    ],
    answer: "Removes all elements (makes list empty)",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`fruits = ["apple", "banana"]
fruits.append("cherry")
print("\\n".join(fruits))`}
        />
      </div>
    ),
    options: [
      "apple\nbanana\ncherry",
      "apple\nbanana",
      "Error",
      "[apple, banana, cherry]",
    ],
    answer: "apple\nbanana\ncherry",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`a = [1, 2]
b = [3, 4, 5]
a.extend(b)
print("\\n".join(map(str, a)))`}
        />
      </div>
    ),
    options: ["1\n2\n3\n4\n5", "[1, 2]\n[3, 4, 5]", "3\n4\n5", "Error"],
    answer: "1\n2\n3\n4\n5",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`nums = [10, 30, 40]
nums.insert(1, 20)
print("\\n".join(map(str, nums)))`}
        />
      </div>
    ),
    options: ["10\n20\n30\n40", "20\n10\n30\n40", "10\n30\n20\n40", "Error"],
    answer: "10\n20\n30\n40",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`values = [100, 200, 300, 400]
print(values.pop())
print("\\n".join(map(str, values)))`}
        />
      </div>
    ),
    options: [
      "400\n100\n200\n300",
      "100\n200\n300\n400",
      "300\n100\n200\n400",
      "Error",
    ],
    answer: "400\n100\n200\n300",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`colors = ["red", "blue", "green", "blue"]
colors.remove("blue")
print("\\n".join(colors))`}
        />
      </div>
    ),
    options: [
      "red\nblue\ngreen\nblue",
      "red\ngreen\nblue",
      "red\nblue\ngreen",
      "Error",
    ],
    answer: "red\ngreen\nblue",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`lst = [5, 2, 8, 1]
lst.sort()
print("\\n".join(map(str, lst)))`}
        />
      </div>
    ),
    options: ["1\n2\n5\n8", "8\n5\n2\n1", "[5, 2, 8, 1]", "Error"],
    answer: "1\n2\n5\n8",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`nums = [10, 20, 30, 40]
print(nums.index(30))`}
        />
      </div>
    ),
    options: ["0", "1", "2", "3"],
    answer: "2",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`data = [1, 2, 3]
original = data
data.clear()
print(original)`}
        />
      </div>
    ),
    options: ["[1, 2, 3]", "[]", "None", "Error"],
    answer: "[]",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`numbers = [4, 2, 7, 1]
sorted_nums = sorted(numbers)
print(numbers)
print(sorted_nums)`}
        />
      </div>
    ),
    options: [
      "[4, 2, 7, 1]\n[1, 2, 4, 7]",
      "[1, 2, 4, 7]\n[1, 2, 4, 7]",
      "[1, 2, 4, 7]\n[4, 2, 7, 1]",
      "Error",
    ],
    answer: "[4, 2, 7, 1]\n[1, 2, 4, 7]",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`items = [10, 20, 20, 30]
print(items.count(20))`}
        />
      </div>
    ),
    options: ["1", "2", "3", "4"],
    answer: "2",
  },
];

const ListMethods_MCQ = ({ subtopicId, goalName, courseName, onComplete }) => {
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
      title="List Methods | MCQs"
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

export default ListMethods_MCQ;
