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
          code={`d1 = {"name": "Teja", "age": 15}\nd2 = d1\nprint(d1)`}
        />
      </div>
    ),
    options: [
      <span>{`{"name": "Teja", "age": 15}`}</span>,
      <span>{`{}`}</span>,
      "Error",
      "None",
    ],
    answer: <span>{`{"name": "Teja", "age": 15}`}</span>,
  },

  {
    question: (
      <div>
        <p>
          What happens when you modify <b>d2</b>?
        </p>
        <CodeBlock
          language="python"
          code={`d1 = {"a": 1}\nd2 = d1\nd2["a"] = 99\nprint(d1["a"])`}
        />
      </div>
    ),
    options: ["1", "99", "Error", "None"],
    answer: "99",
  },

  {
    question: (
      <div>
        <p>
          What does <b>.copy()</b> create?
        </p>
        <CodeBlock
          language="python"
          code={`original = {"x": 10}\ncopy = original.copy()\nprint(copy)`}
        />
      </div>
    ),
    options: [
      <span>{`{"x": 10}`}</span>,
      <span>{`{}`}</span>,
      "Same object",
      "Error",
    ],
    answer: <span>{`{"x": 10}`}</span>,
  },

  {
    question: (
      <div>
        <p>Why does this affect the original?</p>
        <CodeBlock
          language="python"
          code={`orig = {"list": [1, 2]}\ncp = orig.copy()\ncp["list"].append(3)\nprint(orig)`}
        />
      </div>
    ),
    options: [
      <span>{`{"list": [1, 2]}`}</span>,
      <span>{`{"list": [1, 2, 3]}`}</span>,
      "Error",
      "Empty dict",
    ],
    answer: <span>{`{"list": [1, 2, 3]}`}</span>,
  },

  {
    question: (
      <div>
        <p>
          What does <b>clear()</b> do?
        </p>
        <CodeBlock
          language="python"
          code={`d = {"a": 1, "b": 2}\nd.clear()\nprint(d)`}
        />
      </div>
    ),
    options: [
      <span>{`{}`}</span>,
      <span>{`{"a": 1, "b": 2}`}</span>,
      "Error",
      "None",
    ],
    answer: <span>{`{}`}</span>,
  },

  {
    question: (
      <div>
        <p>What is the length?</p>
        <CodeBlock
          language="python"
          code={`info = {"name": "Raj", "age": 12}\nprint(len(info))`}
        />
      </div>
    ),
    options: ["1", "2", "3", "Error"],
    answer: "2",
  },

  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock
          language="python"
          code={`def show(*args):\n    print(len(args))\nshow(1, 2, 3)`}
        />
      </div>
    ),
    options: ["1", "2", "3", "Error"],
    answer: "3",
  },

  {
    question: (
      <div>
        <p>How to unpack a list as arguments?</p>
        <CodeBlock
          language="python"
          code={`nums = [10, 20, 30]\nprint(*nums)`}
        />
      </div>
    ),
    options: [
      <span>10 20 30</span>,
      <span>[10, 20, 30]</span>,
      "Error",
      "10,20,30",
    ],
    answer: <span>10 20 30</span>,
  },

  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock
          language="python"
          code={`def info(**kwargs):\n    print(kwargs)\ninfo(name="Teja", age=15)`}
        />
      </div>
    ),
    options: [
      <span>{`{"name": "Teja", "age": 15}`}</span>,
      <span>("Teja", 15)</span>,
      "Teja 15",
      "Error",
    ],
    answer: <span>{`{"name": "Teja", "age": 15}`}</span>,
  },

  {
    question: (
      <div>
        <p>How to unpack a dictionary as keyword arguments?</p>
        <CodeBlock
          language="python"
          code={`def greet(name, age):\n    print(name, "is", age)\ndata = {"name": "Bob", "age": 20}\ngreet(**data)`}
        />
      </div>
    ),
    options: [
      <span>Bob is 20</span>,
      <span>{`{"name": "Bob", "age": 20}`}</span>,
      "Error",
      "name age",
    ],
    answer: <span>Bob is 20</span>,
  },

  {
    question: "What does .copy() return for a dictionary?",
    options: [
      "Same dictionary object",
      "Shallow copy (new dict, same nested objects)",
      "Deep copy",
      "Empty dictionary",
    ],
    answer: "Shallow copy (new dict, same nested objects)",
  },

  {
    question: "What does **kwargs represent inside a function?",
    options: ["A tuple", "A list", "A dictionary", "A set"],
    answer: "A dictionary",
  },

  {
    question:
      "Can you safely add/remove items from a dictionary while iterating over it?",
    options: [
      "Yes",
      "No → RuntimeError",
      "Only with .items()",
      "Only with keys()",
    ],
    answer: "No → RuntimeError",
  },

  {
    question: "How do you pass a dictionary as named arguments to a function?",
    options: ["func(dict)", "func(*dict)", "func(**dict)", "func(&dict)"],
    answer: "func(**dict)",
  },

  {
    question: "Which method removes all items from a dictionary?",
    options: [".remove()", ".delete()", ".clear()", ".popall()"],
    answer: ".clear()",
  },
];

const Working_With_Dictionaries_MCQ = ({
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
      title="Working with Dictionaries | MCQs"
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

export default Working_With_Dictionaries_MCQ;
