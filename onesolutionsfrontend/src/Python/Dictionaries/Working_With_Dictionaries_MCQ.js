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
          code={`d1 = {"name": "Teja", "age": 15}
d2 = d1
print(d1)`}
        />
      </div>
    ),
    options: [`{"name": "Teja", "age": 15}`, `{}`, "Error", "None"],
    answer: `{"name": "Teja", "age": 15}`,
  },

  {
    question: (
      <div>
        <p>
          What happens when you modify <b>d2</b>?
        </p>
        <CodeBlock
          language="python"
          code={`d1 = {"a": 1}
d2 = d1
d2["a"] = 99
print(d1["a"])`}
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
          code={`original = {"x": 10}
copy = original.copy()
print(copy)`}
        />
      </div>
    ),
    options: [`{"x": 10}`, `{}`, "Same object", "Error"],
    answer: `{"x": 10}`,
  },

  {
    question: (
      <div>
        <p>Why does this affect the original?</p>
        <CodeBlock
          language="python"
          code={`orig = {"list": [1, 2]}
cp = orig.copy()
cp["list"].append(3)
print(orig)`}
        />
      </div>
    ),
    options: [`{"list": [1, 2]}`, `{"list": [1, 2, 3]}`, "Error", "Empty dict"],
    answer: `{"list": [1, 2, 3]}`,
  },

  {
    question: (
      <div>
        <p>
          What does <b>clear()</b> do?
        </p>
        <CodeBlock
          language="python"
          code={`d = {"a": 1, "b": 2}
d.clear()
print(d)`}
        />
      </div>
    ),
    options: [`{}`, `{"a": 1, "b": 2}`, "Error", "None"],
    answer: `{}`, // ✅ FIXED (string)
  },

  {
    question: (
      <div>
        <p>What is the length?</p>
        <CodeBlock
          language="python"
          code={`info = {"name": "Raj", "age": 12}
print(len(info))`}
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
          code={`def show(*args):
    print(len(args))

show(1, 2, 3)`}
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
          code={`nums = [10, 20, 30]
print(*nums)`}
        />
      </div>
    ),
    options: ["10 20 30", "[10, 20, 30]", "Error", "10,20,30"],
    answer: "10 20 30",
  },

  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock
          language="python"
          code={`def info(**kwargs):
    print(kwargs)

info(name="Teja", age=15)`}
        />
      </div>
    ),
    options: [
      `{"name": "Teja", "age": 15}`,
      "('Teja', 15)",
      "Teja 15",
      "Error",
    ],
    answer: `{"name": "Teja", "age": 15}`,
  },

  {
    question: (
      <div>
        <p>How to unpack a dictionary as keyword arguments?</p>
        <CodeBlock
          language="python"
          code={`def greet(name, age):
    print(name, "is", age)

data = {"name": "Bob", "age": 20}
greet(**data)`}
        />
      </div>
    ),
    options: ["Bob is 20", `{"name": "Bob", "age": 20}`, "Error", "name age"],
    answer: "Bob is 20",
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

  useEffect(() => {
    if (subtopicId && completedContent.includes(subtopicId)) {
      setIsCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleCompletion = async () => {
    if (isLoading || isCompleted) return;

    try {
      setIsLoading(true);

      const result = await markSubtopicComplete(
        subtopicId,
        goalName || "Goal 1",
        courseName || "Static Website: HTML CSS & Bootstrap"
      );

      if (result.success) {
        await loadProgressSummary();
        setIsCompleted(true);
        onComplete?.();
      }
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
