import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What will this code log?</p>
        <CodeBlock
          language="javascript"
          code={`const person = {
  name: "Ravi",
  age: 25
};
console.log(person.name);`}
        />
      </div>
    ),
    options: ["Ravi", "25", "undefined", "Error"],
    answer: "Ravi",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="javascript"
          code={`const user = {
  city: "Hyderabad"
};
console.log(user["city"]);`}
        />
      </div>
    ),
    options: ["Hyderabad", "undefined", "Error", "city"],
    answer: "Hyderabad",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="javascript"
          code={`const data = { name: "Asha" };
console.log(data.age);`}
        />
      </div>
    ),
    options: ["Error", "null", "undefined", "0"],
    answer: "undefined",
  },
  {
    question: (
      <div>
        <p>Which notation is used here?</p>
        <CodeBlock
          language="javascript"
          code={`const obj = { color: "Red" };
console.log(obj.color);`}
        />
      </div>
    ),
    options: ["Dot Notation", "Bracket Notation", "Both", "None"],
    answer: "Dot Notation",
  },
  {
    question: (
      <div>
        <p>Which notation is required to access this property?</p>
        <CodeBlock
          language="javascript"
          code={`const car = { "car model": "Swift" };
console.log(car["car model"]);`}
        />
      </div>
    ),
    options: ["Dot Notation", "Bracket Notation", "Both", "None"],
    answer: "Bracket Notation",
  },
  {
    question: (
      <div>
        <p>What will this code output?</p>
        <CodeBlock
          language="javascript"
          code={`const key = "language";
const details = { language: "JavaScript" };
console.log(details[key]);`}
        />
      </div>
    ),
    options: ["key", "language", "JavaScript", "undefined"],
    answer: "JavaScript",
  },
  {
    question: (
      <div>
        <p>What happens here?</p>
        <CodeBlock
          language="javascript"
          code={`const student = { marks: 80 };
student.marks = 90;
console.log(student.marks);`}
        />
      </div>
    ),
    options: ["80", "90", "undefined", "Error"],
    answer: "90",
  },
  {
    question: (
      <div>
        <p>What will be logged?</p>
        <CodeBlock
          language="javascript"
          code={`const item = {};
item.type = "Book";
console.log(item);`}
        />
      </div>
    ),
    options: [`{ type: "Book" }`, `{}`, "undefined", "Error"],
    answer: `{ type: "Book" }`,
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="javascript"
          code={`const profile = {
  name: "Meena",
  skills: ["HTML", "CSS"]
};
console.log(profile.skills[0]);`}
        />
      </div>
    ),
    options: ["HTML", "CSS", "undefined", "Error"],
    answer: "HTML",
  },
  {
    question: (
      <div>
        <p>What will this print?</p>
        <CodeBlock
          language="javascript"
          code={`const app = {
  version: "1.0",
  info: { platform: "Web" }
};
console.log(app.info.platform);`}
        />
      </div>
    ),
    options: ["1.0", "Web", "undefined", "Error"],
    answer: "Web",
  },
  {
    question: (
      <div>
        <p>What is object destructuring used for?</p>
      </div>
    ),
    options: [
      "To delete object properties",
      "To extract properties into variables",
      "To merge objects",
      "To loop through objects",
    ],
    answer: "To extract properties into variables",
  },
  {
    question: (
      <div>
        <p>Which of the following is a valid object?</p>
      </div>
    ),
    options: [
      `{ name = "Ram" }`,
      `{ name: "Ram" }`,
      `{ "name" = "Ram" }`,
      `[ name: "Ram" ]`,
    ],
    answer: `{ name: "Ram" }`,
  },
  {
    question: (
      <div>
        <p>What is a method in JavaScript?</p>
      </div>
    ),
    options: [
      "A variable inside an object",
      "An object inside a function",
      "A function stored as an object property",
      "A loop inside an object",
    ],
    answer: "A function stored as an object property",
  },
  {
    question: (
      <div>
        <p>Which value type can an object property NOT have?</p>
      </div>
    ),
    options: ["Function", "Array", "Object", "None of the above"],
    answer: "None of the above",
  },
  {
    question: (
      <div>
        <p>Which notation allows using variables as keys?</p>
      </div>
    ),
    options: ["Dot Notation", "Bracket Notation", "Both", "Neither"],
    answer: "Bracket Notation",
  },
];

const Objects_MCQ = ({ subtopicId, goalName, courseName, onComplete }) => {
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
      title="Objects - MCQs"
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
export default Objects_MCQ;
