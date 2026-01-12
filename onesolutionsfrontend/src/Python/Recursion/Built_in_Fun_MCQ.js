import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ===== NORMAL QUESTIONS (5) =====
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

  // ===== CODEBLOCK QUESTIONS (10) =====
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
      "Inside: [10, 20, 30, 99]\nOutside: [10, 20, 30, 99]",
      "Inside: [10, 20, 30, 99]\nOutside: [10, 20, 30]",
      "Inside: [10, 20, 30]\nOutside: [10, 20, 30]",
      "Error",
    ],
    answer: "Inside: [10, 20, 30, 99]\nOutside: [10, 20, 30, 99]",
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
    options: ["[5]\n[10]", "[5]\n[5, 10]", "[5, 10]\n[5, 10]", "Error"],
    answer: "[5]\n[5, 10]",
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
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`values = [3, 8, 1, 6]
print("\\n".join(map(str, sorted(values, reverse=True))))`}
        />
      </div>
    ),
    options: ["8\n6\n3\n1", "1\n3\n6\n8", "[8, 6, 3, 1]", "Error"],
    answer: "8\n6\n3\n1",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
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
      "Inside: [4, 999, 6]\nOutside: [4, 999, 6]",
      "Inside: [4, 999, 6]\nOutside: [4, 5, 6]",
      "Error",
      "Inside: [4, 5, 6]\nOutside: [4, 5, 6]",
    ],
    answer: "Inside: [4, 999, 6]\nOutside: [4, 999, 6]",
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

const Built_in_Fun_MCQ = ({ subtopicId, goalName, courseName, onComplete }) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (subtopicId && completedContent.includes(subtopicId)) {
      setIsCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleCompletion = async () => {
    if (isLoading || isCompleted) return;

    try {
      setIsLoading(true);

      if (!subtopicId) return;

      const result = await markSubtopicComplete(
        subtopicId,
        goalName || "Goal 1",
        courseName || "Python Basics"
      );

      if (result.success) {
        await loadProgressSummary();
        setIsCompleted(true);
        if (onComplete) onComplete();
      }
    } catch (error) {
      console.error(error);
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
