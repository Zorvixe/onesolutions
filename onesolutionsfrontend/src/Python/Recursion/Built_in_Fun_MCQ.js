import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question:
      "What happens when you modify a list passed as an argument inside a function?",
    options: [
      "Only the local copy is changed",
      "The original list outside the function is also changed",
      "A new list is created",
      "TypeError occurs",
    ],
    answer: "The original list outside the function is also changed",
  },
  {
    question:
      "When are default argument values (like lst=[]) evaluated in Python?",
    options: [
      "Every time the function is called",
      "Only once, when the function is defined",
      "Only when no argument is passed",
      "Never",
    ],
    answer: "Only once, when the function is defined",
  },
  {
    question:
      "Which built-in function returns the smallest item among given arguments?",
    options: ["max()", "min()", "sum()", "sorted()"],
    answer: "min()",
  },
  {
    question:
      "Which built-in function returns a new sorted list in descending order when reverse=True?",
    options: ["sort()", "sorted()", "reverse()", "order()"],
    answer: "sorted()",
  },
  {
    question: "What does sum([1, 2, 3, 4, 5]) return?",
    options: ["15", "10", "24", "Error"],
    answer: "15",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`def update(data):
    data.append(99)
    print("Inside:", data)

my_list = [10, 20, 30]
update(my_list)
print("Outside:", my_list)`}
        />
      </div>
    ),
    options: [
      <span>
        Inside: [10, 20, 30, 99]
        <br />
        Outside: [10, 20, 30, 99]
      </span>,
      <span>
        Inside: [10, 20, 30, 99]
        <br />
        Outside: [10, 20, 30]
      </span>,
      <span>
        Inside: [10, 20, 30]
        <br />
        Outside: [10, 20, 30]
      </span>,
      "Error",
    ],
    answer: (
      <span>
        Inside: [10, 20, 30, 99]
        <br />
        Outside: [10, 20, 30, 99]
      </span>
    ),
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`def add_item(value, container=[]):
    container.append(value)
    return container

print(add_item(5))
print(add_item(10))`}
        />
      </div>
    ),
    options: [
      <span>
        [5]
        <br />
        [10]
      </span>,
      <span>
        [5]
        <br />
        [5, 10]
      </span>,
      <span>
        [5, 10]
        <br />
        [5, 10]
      </span>,
      "Error",
    ],
    answer: (
      <span>
        [5]
        <br />
        [5, 10]
      </span>
    ),
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print(min(12, 5, 8, 3, 19))`} />
      </div>
    ),
    options: ["3", "5", "12", "19"],
    answer: "3",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`print(min("apple", "banana", "cherry"))`}
        />
      </div>
    ),
    options: ["apple", "banana", "cherry", "Error"],
    answer: "apple",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print(max(7, 2, 9, 15, 6))`} />
      </div>
    ),
    options: ["15", "9", "7", "6"],
    answer: "15",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print(sum([5, 10, 15]))`} />
      </div>
    ),
    options: ["30", "15", "50", "Error"],
    answer: "30",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`nums = [30, 10, 40, 20]
print(sorted(nums))`}
        />
      </div>
    ),
    options: [
      "[10, 20, 30, 40]",
      "[40, 30, 20, 10]",
      "[30, 10, 40, 20]",
      "Error",
    ],
    answer: "[10, 20, 30, 40]",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`values = [3, 8, 1, 6]
print("\\n".join(map(str, sorted(values, reverse=True))))`}
        />
      </div>
    ),
    options: [
      <span>
        8<br />6<br />3<br />1
      </span>,
      <span>
        1<br />3<br />6<br />8
      </span>,
      "[8, 6, 3, 1]",
      "Error",
    ],
    answer: (
      <span>
        8<br />6<br />3<br />1
      </span>
    ),
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`def change(lst):
    lst[1] = 999
    print("Inside:", lst)

arr = [4, 5, 6]
change(arr)
print("Outside:", arr)`}
        />
      </div>
    ),
    options: [
      <span>
        Inside: [4, 999, 6]
        <br />
        Outside: [4, 999, 6]
      </span>,
      <span>
        Inside: [4, 999, 6]
        <br />
        Outside: [4, 5, 6]
      </span>,
      "Error",
      <span>
        Inside: [4, 5, 6]
        <br />
        Outside: [4, 5, 6]
      </span>,
    ],
    answer: (
      <span>
        Inside: [4, 999, 6]
        <br />
        Outside: [4, 999, 6]
      </span>
    ),
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`print(max("Python", "JavaScript", "HTML"))`}
        />
      </div>
    ),
    options: ["Python", "JavaScript", "HTML", "Error"],
    answer: "Python",
  },
];

const Built_in_Fun_MCQ = ({
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
      title="Built-in Functions | MCQs"
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

export default Built_in_Fun_MCQ;
