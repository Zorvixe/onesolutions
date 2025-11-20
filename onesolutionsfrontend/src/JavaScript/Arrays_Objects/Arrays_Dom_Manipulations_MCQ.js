import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What will this code print in the console?</p>
        <CodeBlock
          language="javascript"
          code={`const numbers = [10, 20, 30, 40];
console.log(numbers);`}
        />
      </div>
    ),
    options: ["[10, 20, 30, 40]", "10,20,30,40", "{10, 20, 30, 40}", "Error"],
    answer: "[10, 20, 30, 40]",
  },
  {
    question: (
      <div>
        <p>What will be displayed in the console?</p>
        <CodeBlock
          language="javascript"
          code={`const arr = [5, 15, 25, 35];
console.log(arr[1]);
console.log(arr[2]);`}
        />
      </div>
    ),
    options: ["15 and 25", "5 and 35", "undefined", "Error"],
    answer: "15 and 25",
  },
  {
    question: (
      <div>
        <p>Predict the output after modifying the array:</p>
        <CodeBlock
          language="javascript"
          code={`const data = [2, 4, 6, 8];
data[2] = 60;
console.log(data);`}
        />
      </div>
    ),
    options: ["[2, 4, 6, 8]", "[2, 4, 60, 8]", "[60, 2, 4, 8]", "Error"],
    answer: "[2, 4, 60, 8]",
  },
  {
    question: (
      <div>
        <p>What will this code log?</p>
        <CodeBlock
          language="javascript"
          code={`const items = [100, 200, 300];
console.log(items.length);`}
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
          What will be the output after using <code>push()</code>?
        </p>
        <CodeBlock
          language="javascript"
          code={`const values = [11, 22, 33];
values.push(false);
console.log(values);`}
        />
      </div>
    ),
    options: [
      "[11, 22, 33]",
      "[11, 22, 33, false]",
      "[false, 11, 22, 33]",
      "Error",
    ],
    answer: "[11, 22, 33, false]",
  },
  {
    question: (
      <div>
        <p>
          What happens after calling <code>pop()</code> here?
        </p>
        <CodeBlock
          language="javascript"
          code={`const colors = ['red', 'green', 'blue'];
colors.pop();
console.log(colors);`}
        />
      </div>
    ),
    options: ["['red', 'green']", "['green', 'blue']", "'blue'", "Error"],
    answer: "['red', 'green']",
  },
  {
    question: (
      <div>
        <p>What element will be created and displayed?</p>
        <CodeBlock
          language="javascript"
          code={`const para = document.createElement("p");
para.textContent = "Learning JavaScript!";
document.body.appendChild(para);`}
        />
      </div>
    ),
    options: [
      "Creates a paragraph with 'Learning JavaScript!'",
      "Creates a div element",
      "Creates nothing",
      "Throws an error",
    ],
    answer: "Creates a paragraph with 'Learning JavaScript!'",
  },
  {
    question: "Which array method adds elements to the beginning of an array?",
    options: ["push()", "unshift()", "pop()", "splice()"],
    answer: "unshift()",
  },
  {
    question:
      "Which DOM method is used to remove a child element from a parent element?",
    options: ["removeChild()", "deleteElement()", "clearChild()", "detach()"],
    answer: "removeChild()",
  },
  {
    question: "Which property gives the index of the last element in an array?",
    options: ["length - 1", "count - 1", "size", "index"],
    answer: "length - 1",
  },
];

const Arrays_Dom_Manipulations_MCQ = ({
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
  return <MCQLogic title="Arrays Dom Manipulations - MCQs" questions={randomQuestions}
  isCompleted={isCompleted}
  isLoading={isLoading}
  onComplete={handleCompletion}
  subtopicId={subtopicId}
  goalName={goalName}
  courseName={courseName} />;
};
export default Arrays_Dom_Manipulations_MCQ;
