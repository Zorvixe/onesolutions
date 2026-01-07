import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ===================== CODE BLOCK QUESTIONS (10) =====================

  {
    question: (
      <div>
        <p>
          What does <b>this</b> refer to here?
        </p>
        <CodeBlock
          language="javascript"
          code={`const car = {
  brand: "BMW",
  getBrand() {
    return this.brand;
  },
};

car.getBrand();`}
        />
      </div>
    ),
    options: ["window", "undefined", "car object", "global scope"],
    answer: "car object",
  },

  {
    question: (
      <div>
        <p>
          What does <b>this</b> refer to in this function?
        </p>
        <CodeBlock
          language="javascript"
          code={`function show() {
  console.log(this);
}

show();`}
        />
      </div>
    ),
    options: ["function itself", "undefined", "window object", "local scope"],
    answer: "window object",
  },

  {
    question: (
      <div>
        <p>What will this arrow function log?</p>
        <CodeBlock
          language="javascript"
          code={`const user = {
  name: "Alex",
  greet: () => {
    console.log(this.name);
  },
};

user.greet();`}
        />
      </div>
    ),
    options: ["Alex", "undefined", "user", "Error"],
    answer: "undefined",
  },

  {
    question: (
      <div>
        <p>
          What does <b>this</b> refer to here?
        </p>
        <CodeBlock
          language="javascript"
          code={`function Car(color) {
  this.color = color;
}

const car1 = new Car("red");`}
        />
      </div>
    ),
    options: ["window", "Car function", "instance object", "prototype"],
    answer: "instance object",
  },

  {
    question: (
      <div>
        <p>Which value is immutable?</p>
        <CodeBlock
          language="javascript"
          code={`let x = "Hello";
x[0] = "Y";`}
        />
      </div>
    ),
    options: ["String", "Array", "Object", "Function"],
    answer: "String",
  },

  {
    question: (
      <div>
        <p>What happens here?</p>
        <CodeBlock
          language="javascript"
          code={`const obj = { a: 10 };
obj.a = 20;
console.log(obj.a);`}
        />
      </div>
    ),
    options: ["Error", "10", "20", "undefined"],
    answer: "20",
  },

  {
    question: (
      <div>
        <p>What happens here?</p>
        <CodeBlock
          language="javascript"
          code={`const user = { name: "Sam" };
user = { name: "Alex" };`}
        />
      </div>
    ),
    options: ["Works fine", "Outputs Alex", "Error", "undefined"],
    answer: "Error",
  },

  {
    question: (
      <div>
        <p>Which variable declaration allows reassignment?</p>
        <CodeBlock
          language="javascript"
          code={`let count = 5;
count = 10;`}
        />
      </div>
    ),
    options: ["const", "let", "var only", "none"],
    answer: "let",
  },

  {
    question: (
      <div>
        <p>What happens if const is declared without initialization?</p>
        <CodeBlock language="javascript" code={`const x;`} />
      </div>
    ),
    options: ["undefined", "null", "Error", "0"],
    answer: "Error",
  },

  {
    question: (
      <div>
        <p>Which value is mutable?</p>
        <CodeBlock
          language="javascript"
          code={`const arr = [1, 2, 3];
arr.push(4);`}
        />
      </div>
    ),
    options: ["Number", "String", "Array", "Boolean"],
    answer: "Array",
  },

  // ===================== NORMAL QUESTIONS (5) =====================

  {
    question: "In object methods, what does this refer to?",
    options: ["window", "function", "object itself", "undefined"],
    answer: "object itself",
  },

  {
    question: "In arrow functions, this is determined by?",
    options: [
      "function call",
      "object reference",
      "where the code is defined",
      "new keyword",
    ],
    answer: "where the code is defined",
  },

  {
    question: "Which of the following is immutable?",
    options: ["Array", "Object", "Function", "String"],
    answer: "String",
  },

  {
    question: "Which keyword requires initialization at declaration?",
    options: ["var", "let", "const", "all"],
    answer: "const",
  },

  {
    question: "Which values are mutable in JavaScript?",
    options: ["Primitive values", "Only strings", "Objects", "Numbers"],
    answer: "Objects",
  },
];

const More_Modern_JS_Concepts_MCQ_3 = ({
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
      title="More Modern JS Concepts | Part 3 - MCQs"
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
export default More_Modern_JS_Concepts_MCQ_3;
