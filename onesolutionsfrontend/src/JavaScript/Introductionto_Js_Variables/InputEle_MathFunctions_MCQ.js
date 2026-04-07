import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========= 5 Normal Questions =========
  {
    question: "What does Math.random() return?",
    options: [
      "A random integer",
      "A random float between 0 and 1",
      "Always 1",
      "Always 0",
    ],
    answer: "A random float between 0 and 1",
  },
  {
    question: "What does Math.ceil() do?",
    options: [
      "Rounds down",
      "Rounds to nearest value",
      "Rounds up to next integer",
      "Removes decimals",
    ],
    answer: "Rounds up to next integer",
  },
  {
    question: "What is the default type of the HTML input element?",
    options: ["password", "text", "number", "email"],
    answer: "text",
  },
  {
    question: "Which property is used to get input value in JavaScript?",
    options: ["innerHTML", "value", "textContent", "id"],
    answer: "value",
  },
  {
    question: "What does strict equality (===) check?",
    options: [
      "Only value",
      "Only type",
      "Both value and type",
      "Neither",
    ],
    answer: "Both value and type",
  },

  // ========= 10 CodeBlock Questions =========
  {
    question: (
      <div>
        <p>What is the output of the following code?</p>
        <CodeBlock
          language="javascript"
          code={`console.log(Math.random());`}
        />
      </div>
    ),
    options: [
      "Random float between 0 and 1",
      "Random integer",
      "0",
      "1",
    ],
    answer: "Random float between 0 and 1",
  },
  {
    question: (
      <div>
        <p>What will this code output?</p>
        <CodeBlock
          language="javascript"
          code={`console.log(Math.ceil(3.1));`}
        />
      </div>
    ),
    options: ["3", "4", "3.1", "Error"],
    answer: "4",
  },
  {
    question: (
      <div>
        <p>Which input type is used below?</p>
        <CodeBlock
          language="html"
          code={`<input type="text" />`}
        />
      </div>
    ),
    options: ["Text input", "Password input", "Checkbox", "Radio"],
    answer: "Text input",
  },
  {
    question: (
      <div>
        <p>Which input type is used for secure password entry?</p>
        <CodeBlock
          language="html"
          code={`<input type="password" />`}
        />
      </div>
    ),
    options: ["text", "password", "secure", "hidden"],
    answer: "password",
  },
  {
    question: (
      <div>
        <p>What will this code print?</p>
        <CodeBlock
          language="html"
          code={`<input id="name" value="Onesolutions">
<script>
console.log(document.getElementById("name").value);
</script>`}
        />
      </div>
    ),
    options: ["name", "undefined", "Onesolutions", "null"],
    answer: "Onesolutions",
  },
  {
    question: (
      <div>
        <p>What is the result?</p>
        <CodeBlock
          language="javascript"
          code={`let x = "5" == 5;
console.log(x);`}
        />
      </div>
    ),
    options: ["true", "false", "Error", "undefined"],
    answer: "true",
  },
  {
    question: (
      <div>
        <p>What is the result?</p>
        <CodeBlock
          language="javascript"
          code={`let x = "5" === 5;
console.log(x);`}
        />
      </div>
    ),
    options: ["true", "false", "Error", "undefined"],
    answer: "false",
  },
  {
    question: (
      <div>
        <p>What does this code return?</p>
        <CodeBlock
          language="javascript"
          code={`console.log(Math.ceil(7.9));`}
        />
      </div>
    ),
    options: ["7", "8", "7.9", "Error"],
    answer: "8",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="javascript"
          code={`let input = document.createElement("input");
input.value = "Hello";
console.log(input.value);`}
        />
      </div>
    ),
    options: ["Hello", "undefined", "null", "Error"],
    answer: "Hello",
  },
  {
    question: (
      <div>
        <p>Which comparison operator is used below?</p>
        <CodeBlock
          language="javascript"
          code={`console.log(10 === "10");`}
        />
      </div>
    ),
    options: ["==", "===", "!=", "="],
    answer: "===",
  },
];

const InputEle_MathFunctions_MCQ = ({ subtopicId, goalName, courseName, onComplete }) => {
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
      title="Input Element & Math Functions - MCQs" 
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

export default InputEle_MathFunctions_MCQ;