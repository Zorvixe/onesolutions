import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ---------- CODE QUESTIONS (10) ----------

  {
    question: (
      <div>
        <p>What does the following class represent?</p>
        <CodeBlock
          language="python"
          code={`class Car:
    pass`}
        />
      </div>
    ),
    options: ["An object", "A class/template", "A function", "A module"],
    answer: "A class/template",
  },

  {
    question: (
      <div>
        <p>Which of the following are attributes?</p>
        <CodeBlock
          language="python"
          code={`class Mobile:
    def __init__(self, model, camera):
        self.model = model
        self.camera = camera`}
        />
      </div>
    ),
    options: ["model and camera", "__init__", "self", "Mobile"],

    answer: "model and camera",
  },

  {
    question: (
      <div>
        <p>Which line defines a method?</p>
        <CodeBlock
          language="python"
          code={`class Car:
    def drive(self):
        print("Driving")`}
        />
      </div>
    ),
    options: ["class Car", "def drive(self)", "print('Driving')", "self"],
    answer: "def drive(self)",
  },

  {
    question: (
      <div>
        <p>What is created here?</p>
        <CodeBlock language="python" code={`car1 = Car()`} />
      </div>
    ),
    options: ["Class", "Method", "Object", "Attribute"],
    answer: "Object",
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`class Mobile:
    def make_call(self):
        print("Calling...")

m = Mobile()
m.make_call()`}
        />
      </div>
    ),
    options: ["Calling...", "make_call", "Error", "Nothing"],
    answer: "Calling...",
  },

  {
    question: (
      <div>
        <p>Which keyword is used to access attributes inside a class?</p>
        <CodeBlock
          language="python"
          code={`class Car:
    def __init__(self, brand):
        self.brand = brand`}
        />
      </div>
    ),
    options: ["this", "self", "object", "class"],
    answer: "self",
  },

  {
    question: (
      <div>
        <p>What does this method do?</p>
        <CodeBlock
          language="python"
          code={`def update_model(self, model):
    self.model = model`}
        />
      </div>
    ),
    options: [
      "Creates object",
      "Updates attribute value",
      "Deletes attribute",
      "Prints model",
    ],
    answer: "Updates attribute value",
  },

  {
    question: (
      <div>
        <p>
          What is <code>__init__</code> used for?
        </p>
        <CodeBlock
          language="python"
          code={`def __init__(self, name):
    self.name = name`}
        />
      </div>
    ),
    options: [
      "Create method",
      "Initialize object",
      "Delete object",
      "Call function",
    ],
    answer: "Initialize object",
  },

  {
    question: (
      <div>
        <p>What type of data structure is used here?</p>
        <CodeBlock language="python" code={`self.items = {}`} />
      </div>
    ),
    options: ["List", "Tuple", "Dictionary", "Set"],
    answer: "Dictionary",
  },

  {
    question: (
      <div>
        <p>
          What will <code>id(obj)</code> return?
        </p>
        <CodeBlock language="python" code={`print(id(mobile1))`} />
      </div>
    ),
    options: [
      "Object value",
      "Memory address",
      "Class name",
      "Attribute count",
    ],
    answer: "Memory address",
  },

  // ---------- THEORY QUESTIONS (5) ----------

  {
    question: "What is software?",
    options: [
      "A fixed product",
      "An easily changeable tool that performs tasks",
      "Only hardware",
      "Only coding problems",
    ],
    answer: "An easily changeable tool that performs tasks",
  },

  {
    question: "What does softness of software mean?",
    options: [
      "UI design",
      "Ease of understanding and modifying",
      "Speed of execution",
      "Hardware dependency",
    ],
    answer: "Ease of understanding and modifying",
  },

  {
    question: "Why is OOP used?",
    options: [
      "To write longer code",
      "To build unorganized systems",
      "To model real-life objects",
      "To avoid functions",
    ],
    answer: "To model real-life objects",
  },

  {
    question: "What is encapsulation?",
    options: [
      "Separating code",
      "Grouping related data and actions",
      "Deleting attributes",
      "Using multiple classes",
    ],
    answer: "Grouping related data and actions",
  },

  {
    question: "What is a class?",
    options: ["An object", "A blueprint/template", "A variable", "A loop"],
    answer: "A blueprint/template",
  },
];

const FoundationsOfOOP_MCQ = ({
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
        goalName,
        courseName
      );

      if (result.success) {
        await loadProgressSummary();
        setIsCompleted(true);
        if (onComplete) onComplete();
      } else {
        alert("Failed to mark as complete.");
      }
    } catch {
      alert("Failed to mark as complete.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MCQLogic
      title="Foundations of OOP | MCQs"
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

export default FoundationsOfOOP_MCQ;
