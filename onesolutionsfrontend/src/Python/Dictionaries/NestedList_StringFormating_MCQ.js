import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock } from "../../CodeOutputBlocks";
import MCQLogic from "../../SubtopicsPage/MCQLogic";

const questionsData = [
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`data = [10, [20, 30, 40], 50]\nprint(data)`}
        />
      </div>
    ),
    options: [
      "[10, [20, 30, 40], 50]",
      "[10, 20, 30, 40, 50]",
      "[[10, 20, 30], 50]",
      "Error",
    ],
    answer: "[10, [20, 30, 40], 50]",
  },

  {
    question: (
      <div>
        <p>How do you access the inner list?</p>
        <CodeBlock
          language="python"
          code={`nested = [1, [2, 3, 4], 5]\nprint(nested[1])`}
        />
      </div>
    ),
    options: ["[2, 3, 4]", "3", "[1, 2, 3, 4, 5]", "Error"],
    answer: "[2, 3, 4]",
  },

  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock
          language="python"
          code={`matrix = [[10, 20], [30, 40]]\nprint(matrix[1][0])`}
        />
      </div>
    ),
    options: ["30", "10", "20", "Error"],
    answer: "30",
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`name = "Alice"\nage = 25\nprint("My name is %s and I am %s." % (name, age))`}
        />
      </div>
    ),
    options: [
      "My name is Alice and I am 25.",
      "My name is name and I am age.",
      "Error",
      "%s %s",
    ],
    answer: "My name is Alice and I am 25.",
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`a = 15\nb = 25\nprint("%d + %d = %d" % (a, b, a + b))`}
        />
      </div>
    ),
    options: ["15 + 25 = 40", "a + b = a+b", "Error", "15 25 40"],
    answer: "15 + 25 = 40",
  },

  {
    question: (
      <div>
        <p>What is the output using numbered placeholders?</p>
        <CodeBlock
          language="python"
          code={`print("%2$s %1$s" % ("World", "Hello"))`}
        />
      </div>
    ),
    options: ["Hello World", "World Hello", "%2$s %1$s", "Error"],
    answer: "Hello World",
  },

  {
    question: (
      <div>
        <p>What is printed with named placeholders?</p>
        <CodeBlock
          language="python"
          code={`print("%(name)s is %(age)d years old" % {"name": "Bob", "age": 30})`}
        />
      </div>
    ),
    options: [
      "Bob is 30 years old",
      "name is age years old",
      "Error",
      "%(name)s %(age)d",
    ],
    answer: "Bob is 30 years old",
  },

  {
    question: (
      <div>
        <p>How do you get the number 3 from this nested list?</p>
        <CodeBlock
          language="python"
          code={`lst = [[1, 2], [3, 4], [5, 6]]\nprint(lst[1][0])`}
        />
      </div>
    ),
    options: ["3", "1", "4", "Error"],
    answer: "3",
  },

  {
    question: (
      <div>
        <p>What is the correct formatted output?</p>
        <CodeBlock
          language="python"
          code={`city = "Paris"\ntemp = 22\nprint("Today in %s it is %d degrees." % (city, temp))`}
        />
      </div>
    ),
    options: [
      "Today in Paris it is 22 degrees.",
      "Today in city it is temp degrees.",
      "Error",
      "%s %d",
    ],
    answer: "Today in Paris it is 22 degrees.",
  },

  {
    question: (
      <div>
        <p>Which line correctly accesses the item 'x'?</p>
        <CodeBlock
          language="python"
          code={`items = ['a', ['b', 'x', 'c'], 'd']\nprint(items[1][1])`}
        />
      </div>
    ),
    options: ["x", "b", "c", "Error"],
    answer: "x",
  },

  {
    question:
      "How do you access the first item of the second inner list in [[10, 20], [30, 40]]?",
    options: ["lst[1][0]", "lst[0][1]", "lst[2][1]", "lst[1][1]"],
    answer: "lst[1][0]",
  },

  {
    question: "Which formatting method uses %s, %d, %f placeholders?",
    options: ["f-strings", "str.format()", "Old-style % formatting", ".join()"],
    answer: "Old-style % formatting",
  },

  {
    question: "What does %s stand for in string formatting?",
    options: ["Integer", "String", "Float", "List"],
    answer: "String",
  },

  {
    question: "How do you use named placeholders in % formatting?",
    options: [
      '"%(key)s" % {"key": value}',
      '"{key}" % value',
      '"%key" % value',
      '"key%s" % value',
    ],
    answer: '"%(key)s" % {"key": value}',
  },

  {
    question: "A nested list means:",
    options: [
      "A list inside another list",
      "A list with only numbers",
      "A list that cannot be changed",
      "Two separate lists",
    ],
    answer: "A list inside another list",
  },
];

const NestedList_Stringformating_MCQ = ({
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
      title="Nested List String Formating | MCQs"
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

export default NestedList_Stringformating_MCQ;
