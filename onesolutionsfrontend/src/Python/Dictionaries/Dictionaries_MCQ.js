import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 10 CODE BLOCK QUESTIONS ====================

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`person = {"name": "Te", "age": 15}\nprint(person)`}
        />
      </div>
    ),
    options: [
      <span>{`{"name": "Te", "age": 15}`}</span>,
      <span>["name", "age"]</span>,
      <span>("Te", 15)</span>,
      "Error",
    ],
    answer: <span>{`{"name": "Te", "age": 15}`}</span>,
  },

  {
    question: (
      <div>
        <p>How do you access the value of "city"?</p>
        <CodeBlock
          language="python"
          code={`info = {"name": "Raj", "city": "Delhi", "age": 12}\nprint(info["city"])`}
        />
      </div>
    ),
    options: ["Delhi", "Raj", "12", "Error"],
    answer: "Delhi",
  },

  {
    question: (
      <div>
        <p>What happens when key is not found?</p>
        <CodeBlock
          language="python"
          code={`d = {"a": 1, "b": 2}\nprint(d["c"])`}
        />
      </div>
    ),
    options: ["KeyError", "None", "0", "Empty dictionary"],
    answer: "KeyError",
  },

  {
    question: (
      <div>
        <p>What does .get() return if key is missing?</p>
        <CodeBlock
          language="python"
          code={`d = {"x": 10}\nprint(d.get("y"))`}
        />
      </div>
    ),
    options: ["None", "KeyError", "0", "Error"],
    answer: "None",
  },

  {
    question: (
      <div>
        <p>How do you add a new key-value pair?</p>
        <CodeBlock
          language="python"
          code={`student = {"name": "Anil"}\nstudent["grade"] = 10\nprint(student)`}
        />
      </div>
    ),
    options: [
      <span>{`{"name": "Anil", "grade": 10}`}</span>,
      <span>{`{"name": "Anil"}`}</span>,
      "Error",
      <span>["grade", 10]</span>,
    ],
    answer: <span>{`{"name": "Anil", "grade": 10}`}</span>,
  },

  {
    question: (
      <div>
        <p>What is printed after modifying?</p>
        <CodeBlock
          language="python"
          code={`data = {"score": 95}\ndata["score"] = 98\nprint(data["score"])`}
        />
      </div>
    ),
    options: ["95", "98", "Error", "None"],
    answer: "98",
  },

  {
    question: (
      <div>
        <p>What keys are shown?</p>
        <CodeBlock
          language="python"
          code={`info = {"name": "Priya", "age": 14, "city": "Mumbai"}\nfor k in info.keys():\n    print(k)`}
        />
      </div>
    ),
    options: [
      <span>
        name
        <br />
        age
        <br />
        city
      </span>,
      <span>
        Priya
        <br />
        14
        <br />
        Mumbai
      </span>,
      <span>{("name", "age", "city")}</span>,
      "Error",
    ],
    answer: (
      <span>
        name
        <br />
        age
        <br />
        city
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What values are printed?</p>
        <CodeBlock
          language="python"
          code={`d = {"fruit": "apple", "count": 5}\nfor v in d.values():\n    print(v)`}
        />
      </div>
    ),
    options: [
      <span>
        apple
        <br />5
      </span>,
      <span>
        fruit
        <br />
        count
      </span>,
      <span>("apple", 5)</span>,
      "Error",
    ],
    answer: (
      <span>
        apple
        <br />5
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What is printed for each item?</p>
        <CodeBlock
          language="python"
          code={`person = {"name": "Sam", "age": 16}\nfor k, v in person.items():\n    print(k, ":", v)`}
        />
      </div>
    ),
    options: [
      <span>
        name : Sam
        <br />
        age : 16
      </span>,
      <span>
        Sam
        <br />
        16
      </span>,
      "Error",
      <span>("name", "Sam")</span>,
    ],
    answer: (
      <span>
        name : Sam
        <br />
        age : 16
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>Can this be a dictionary key?</p>
        <CodeBlock
          language="python"
          code={`d = {[1, 2]: "numbers"}\nprint(d)`}
        />
      </div>
    ),
    options: ["TypeError (list is mutable)", "Works fine", "None", "[1, 2]"],
    answer: "TypeError (list is mutable)",
  },

  // ==================== 5 NORMAL QUESTIONS ====================

  {
    question: "Which of these creates an empty dictionary?",
    options: ["[]", "{}", "dict()", "Both {} and dict()"],
    answer: "Both {} and dict()",
  },

  {
    question: "What happens if you use a duplicate key in a dictionary?",
    options: [
      "Error",
      "Old value is kept",
      "New value overwrites the old one",
      "Both values are stored",
    ],
    answer: "New value overwrites the old one",
  },

  {
    question: "Which method safely returns None if key is not found?",
    options: ["d[key]", "d.get(key)", "d.keys()", "d.values()"],
    answer: "d.get(key)",
  },

  {
    question: "What does 'age' in person check?",
    options: [
      "Checks if value exists",
      "Checks if key exists",
      "Checks if dictionary exists",
      "Error",
    ],
    answer: "Checks if key exists",
  },

  {
    question: "Which method returns a view of key-value pairs as tuples?",
    options: [".keys()", ".values()", ".items()", ".get()"],
    answer: ".items()",
  },
];
const Dictionaries_MCQ =({
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
      title="Dictionaries | MCQs"
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

export default Dictionaries_MCQ;
