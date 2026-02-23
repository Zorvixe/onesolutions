import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [ 
  
    {
      question: <p>In CommonJS, which object is used for default export?</p>,
      options: ["exports", "module.exports", "require()", "import"],
      answer: "module.exports",
    },
    {
      question: <p>How many default exports are allowed per file?</p>,
      options: ["Only one", "Two", "Unlimited", "Five"],
      answer: "Only one",
    },
    {
      question: <p>Which keyword is used to import a CommonJS module?</p>,
      options: ["import", "require", "include", "fetch"],
      answer: "require",
    },
    {
      question: <p>Named exports are accessed using ______.</p>,
      options: [
        "Object destructuring",
        "Dot operator only",
        "Array destructuring",
        "Default import",
      ],
      answer: "Object destructuring",
    },
    {
      question: <p>What does require() return?</p>,
      options: [
        "The exported value",
        "A promise",
        "A function always",
        "An empty object",
      ],
      answer: "The exported value",
    },
  
    // ✅ CODE BASED MCQs (10)
  
    {
      question: (
        <div>
          <p>What will happen?</p>
          <CodeBlock
            language="javascript"
            code={`module.exports = let value = 5;`}
          />
        </div>
      ),
      options: [
        "SyntaxError",
        "5",
        "undefined",
        "null",
      ],
      answer: "SyntaxError",
    },
  
    {
      question: (
        <div>
          <p>What is the output?</p>
          <CodeBlock
            language="javascript"
            code={`let value = 5;
  module.exports = value;`}
          />
        </div>
      ),
      options: ["5", "undefined", "Error", "value"],
      answer: "5",
    },
  
    {
      question: (
        <div>
          <p>What will be printed?</p>
          <CodeBlock
            language="javascript"
            code={`module.exports = 5 * 3;`}
          />
        </div>
      ),
      options: ["15", "5", "3", "Error"],
      answer: "15",
    },
  
    {
      question: (
        <div>
          <p>What is exported here?</p>
          <CodeBlock
            language="javascript"
            code={`module.exports = function (a, b) {
    return a + b;
  };`}
          />
        </div>
      ),
      options: [
        "A function",
        "An object",
        "A number",
        "Nothing",
      ],
      answer: "A function",
    },
  
    {
      question: (
        <div>
          <p>What will be the output?</p>
          <CodeBlock
            language="javascript"
            code={`function sum(a, b) {
    return a + b;
  }
  module.exports = sum;`}
          />
        </div>
      ),
      options: ["Function sum exported", "Error", "undefined", "0"],
      answer: "Function sum exported",
    },
  
    {
      question: (
        <div>
          <p>What is exported in this code?</p>
          <CodeBlock
            language="javascript"
            code={`module.exports = class Student {
    constructor(name) {
      this.name = name;
    }
  };`}
          />
        </div>
      ),
      options: [
        "A class",
        "An object",
        "A function",
        "A string",
      ],
      answer: "A class",
    },
  
    {
      question: (
        <div>
          <p>Identify the type of export:</p>
          <CodeBlock
            language="javascript"
            code={`exports.value = value;
  exports.name = "Rahul";`}
          />
        </div>
      ),
      options: [
        "Named export",
        "Default export",
        "ES module",
        "Invalid export",
      ],
      answer: "Named export",
    },
  
    {
      question: (
        <div>
          <p>How do you import these exports?</p>
          <CodeBlock
            language="javascript"
            code={`exports.sum = 2 + 3;
  exports.sub = 3 - 2;`}
          />
        </div>
      ),
      options: [
        `const { sum, sub } = require("./file")`,
        `const sum = require("./file")`,
        `import sum from "./file"`,
        `require("./file").sum`,
      ],
      answer: `const { sum, sub } = require("./file")`,
    },
  
    {
      question: (
        <div>
          <p>What will be exported?</p>
          <CodeBlock
            language="javascript"
            code={`exports.sum = function(a, b) {
    return a + b;
  };`}
          />
        </div>
      ),
      options: [
        "A named function",
        "Default function",
        "An object",
        "Nothing",
      ],
      answer: "A named function",
    },
  
    {
      question: (
        <div>
          <p>What is wrong in this import?</p>
          <CodeBlock
            language="javascript"
            code={`const { studentDetails } = require("./sample");`}
          />
        </div>
      ),
      options: [
        "Case mismatch with exported class",
        "require is invalid",
        "Destructuring is wrong",
        "Nothing is wrong",
      ],
      answer: "Case mismatch with exported class",
    },
];

const ES6_Module_MCQ = ({
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
      title="Components and Props - MCQs"
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

export default ES6_Module_MCQ;
