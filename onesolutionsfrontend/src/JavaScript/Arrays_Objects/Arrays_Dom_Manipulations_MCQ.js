import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========= 5 Normal Questions =========
  {
    question: "What is a data structure?",
    options: [
      "A way to design web pages",
      "A method to style elements",
      "A way to store and organize data efficiently",
      "A JavaScript event",
    ],
    answer: "A way to store and organize data efficiently",
  },
  {
    question:
      "Which of the following is a built-in data structure in JavaScript?",
    options: ["Array", "Loop", "Condition", "Event"],
    answer: "Array",
  },
  {
    question: "What does an array store?",
    options: [
      "Only numbers",
      "Only strings",
      "An ordered sequence of items",
      "Only objects",
    ],
    answer: "An ordered sequence of items",
  },
  {
    question: "Which statement is true about function declarations?",
    options: [
      "They are not hoisted",
      "They must be anonymous",
      "They can be called before definition",
      "They cannot return values",
    ],
    answer: "They can be called before definition",
  },
  {
    question: "Why is DOM manipulation useful?",
    options: [
      "To create databases",
      "To dynamically modify HTML elements",
      "To declare variables",
      "To stop user interaction",
    ],
    answer: "To dynamically modify HTML elements",
  },

  // ========= 10 CodeBlock Questions =========
  {
    question: (
      <div>
        <p>What will this code print?</p>
        <CodeBlock
          language="javascript"
          code={`const numbers = [1, 2, 3, 4];
console.log(numbers);`}
        />
      </div>
    ),
    options: ["[1, 2, 3, 4]", "1,2,3,4", "{1,2,3,4}", "Error"],
    answer: "[1, 2, 3, 4]",
  },
  {
    question: (
      <div>
        <p>What value will be logged?</p>
        <CodeBlock
          language="javascript"
          code={`const arr = [10, 20, 30, 40];
console.log(arr[0]);
console.log(arr[3]);`}
        />
      </div>
    ),
    options: ["10 and 40", "20 and 30", "undefined", "Error"],
    answer: "10 and 40",
  },
  {
    question: (
      <div>
        <p>What will be the output after modifying the array?</p>
        <CodeBlock
          language="javascript"
          code={`const list = [1, 2, 3, 4];
list[1] = 20;
console.log(list);`}
        />
      </div>
    ),
    options: ["[1, 2, 3, 4]", "[1, 20, 3, 4]", "[20, 1, 3, 4]", "Error"],
    answer: "[1, 20, 3, 4]",
  },
  {
    question: (
      <div>
        <p>What does this code log?</p>
        <CodeBlock
          language="javascript"
          code={`const data = [5, 10, 15];
console.log(data.length);`}
        />
      </div>
    ),
    options: ["2", "3", "4", "undefined"],
    answer: "3",
  },
  {
    question: (
      <div>
        <p>
          What will be the result after using <b>push()</b>?
        </p>
        <CodeBlock
          language="javascript"
          code={`const values = [1, 2, 3];
values.push(true);
console.log(values);`}
        />
      </div>
    ),
    options: ["[1, 2, 3]", "[1, 2, 3, true]", "[true, 1, 2, 3]", "Error"],
    answer: "[1, 2, 3, true]",
  },
  {
    question: (
      <div>
        <p>
          What happens after calling <b>pop()</b>?
        </p>
        <CodeBlock
          language="javascript"
          code={`const items = [10, 20, 30];
items.pop();
console.log(items);`}
        />
      </div>
    ),
    options: ["[10, 20]", "[20, 30]", "30", "Error"],
    answer: "[10, 20]",
  },
  {
    question: (
      <div>
        <p>What will this function output?</p>
        <CodeBlock
          language="javascript"
          code={`function greet(name) {
  console.log("Hello " + name);
}
greet("Alice");`}
        />
      </div>
    ),
    options: ["Hello Alice", "Hi Alice", "Alice", "Error"],
    answer: "Hello Alice",
  },
  {
    question: (
      <div>
        <p>Which type of function is shown below?</p>
        <CodeBlock
          language="javascript"
          code={`const sayHi = function(name) {
  console.log("Hi " + name);
};
sayHi("Bob");`}
        />
      </div>
    ),
    options: [
      "Function Declaration",
      "Arrow Function",
      "Function Expression",
      "Anonymous Event",
    ],
    answer: "Function Expression",
  },
  {
    question: (
      <div>
        <p>What element will be created?</p>
        <CodeBlock
          language="javascript"
          code={`const heading = document.createElement("h1");
heading.textContent = "Welcome";
document.body.appendChild(heading);`}
        />
      </div>
    ),
    options: [
      "Creates an h1 element with text 'Welcome'",
      "Creates a div element",
      "Creates nothing",
      "Throws an error",
    ],
    answer: "Creates an h1 element with text 'Welcome'",
  },
  {
    question: (
      <div>
        <p>What does this code do?</p>
        <CodeBlock
          language="javascript"
          code={`const box = document.createElement("div");
box.classList.add("active");`}
        />
      </div>
    ),
    options: [
      "Removes a class",
      "Adds a CSS class to the element",
      "Deletes the element",
      "Triggers an event",
    ],
    answer: "Adds a CSS class to the element",
  },
];

const Arrays_Dom_Manipulations_MCQ = ({
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
      title="Arrays Dom Manipulations - MCQs"
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
export default Arrays_Dom_Manipulations_MCQ;
