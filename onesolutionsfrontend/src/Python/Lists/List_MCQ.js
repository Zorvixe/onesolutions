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
          code={`fruits = ["apple", "banana", "cherry"]\nprint(type(fruits))`}
        />
      </div>
    ),
    options: ["<class 'tuple'>", "<class 'list'>", "<class 'str'>", "Error"],
    answer: "<class 'list'>",
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`data = [10, [1, 2, 3], "hello"]\nprint(data[1])`}
        />
      </div>
    ),
    options: ["[1, 2, 3]", "1", "10", "Error"],
    answer: "[1, 2, 3]",
  },

  {
    question: (
      <div>
        <p>How many items are in this list?</p>
        <CodeBlock
          language="python"
          code={`colors = ["red", "green", "blue", "yellow", "purple"]\nprint(len(colors))`}
        />
      </div>
    ),
    options: ["4", "5", "6", "Error"],
    answer: "5",
  },

  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock
          language="python"
          code={`nums = [100, 200, 300, 400]\nprint(nums[-1])`}
        />
      </div>
    ),
    options: ["100", "400", "300", "Error"],
    answer: "400",
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`for item in ["A", "B", "C"]:\n    print(item)`}
        />
      </div>
    ),
    options: [
      <span>
        A<br />B<br />C
      </span>,
      "ABC",
      "[A, B, C]",
      "Error",
    ],
    answer: (
      <span>
        A<br />B<br />C
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What will be the result?</p>
        <CodeBlock
          language="python"
          code={`list1 = [1, 2]\nlist2 = [3, 4]\nprint(list1 + list2)`}
        />
      </div>
    ),
    options: ["[1, 2, 3, 4]", "[1, 2][3, 4]", "[4, 3, 2, 1]", "Error"],
    answer: "[1, 2, 3, 4]",
  },

  {
    question: (
      <div>
        <p>What does this print?</p>
        <CodeBlock language="python" code={`print(["Hi"] * 4)`} />
      </div>
    ),
    options: ["['Hi', 'Hi', 'Hi', 'Hi']", "Hi Hi Hi Hi", "['Hi', 4]", "Error"],
    answer: "['Hi', 'Hi', 'Hi', 'Hi']",
  },

  {
    question: (
      <div>
        <p>What slice is returned?</p>
        <CodeBlock
          language="python"
          code={`values = [10, 20, 30, 40, 50, 60]\nprint(values[2:5])`}
        />
      </div>
    ),
    options: ["[30, 40, 50]", "[20, 30, 40]", "[40, 50, 60]", "Error"],
    answer: "[30, 40, 50]",
  },

  {
    question: (
      <div>
        <p>What is the output of extended slicing?</p>
        <CodeBlock
          language="python"
          code={`word = ['P', 'Y', 'T', 'H', 'O', 'N']\nprint(word[::2])`}
        />
      </div>
    ),
    options: [
      "['P', 'T', 'O']",
      "['Y', 'H', 'N']",
      "['P', 'Y', 'T', 'H', 'O', 'N']",
      "Error",
    ],
    answer: "['P', 'T', 'O']",
  },

  {
    question: (
      <div>
        <p>Can we modify a list?</p>
        <CodeBlock
          language="python"
          code={`my_list = [1, 2, 3]\nmy_list[0] = 99\nprint(my_list)`}
        />
      </div>
    ),
    options: ["[99, 2, 3]", "TypeError", "[1, 2, 3]", "Error"],
    answer: "[99, 2, 3]",
  },

  {
    question: "How do you convert a string into a list of characters?",
    options: ["list('hello')", "str('hello')", "convert('hello')", "['hello']"],
    answer: "list('hello')",
  },

  {
    question: "Which of these creates an empty list?",
    options: ["[]", "{}", "()", "list[]"],
    answer: "[]",
  },

  {
    question: "What makes lists different from strings in Python?",
    options: [
      "Lists are immutable, strings are mutable",
      "Lists are mutable, strings are immutable",
      "Lists use round brackets",
      "No difference",
    ],
    answer: "Lists are mutable, strings are immutable",
  },

  {
    question: "What does the * operator do with lists?",
    options: [
      "Multiplies each element",
      "Repeats the list",
      "Adds new items",
      "Converts to string",
    ],
    answer: "Repeats the list",
  },

  {
    question: "Which built-in function returns the number of items in a list?",
    options: ["size()", "count()", "len()", "length()"],
    answer: "len()",
  },
];

const List_MCQ = ({ subtopicId, goalName, courseName, onComplete }) => {
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
      title="List | MCQs"
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

export default List_MCQ;
