import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ✅ Simple MCQs (5)

  {
    question: <p>What does MERN stand for?</p>,
    options: [
      "MongoDB, Express, React, Node",
      "MySQL, Express, React, Node",
      "MongoDB, Express, Redux, Node",
      "MongoDB, Electron, React, Node",
    ],
    answer: "MongoDB, Express, React, Node",
  },
  {
    question: <p>Node JS is a ______.</p>,
    options: [
      "Frontend framework",
      "Database",
      "JavaScript runtime environment",
      "CSS library",
    ],
    answer: "JavaScript runtime environment",
  },
  {
    question: <p>Which command starts Node REPL?</p>,
    options: ["node", "node start", "npm start", "run node"],
    answer: "node",
  },
  {
    question: (
      <p>Which of the following is used to install third-party packages?</p>
    ),
    options: ["Node", "REPL", "NPM", "CLI"],
    answer: "NPM",
  },
  {
    question: <p>Each file in Node JS is treated as a ______.</p>,
    options: ["function", "module", "package", "class"],
    answer: "module",
  },

  // ✅ Code Based MCQs (10)

  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="javascript"
          code={`const a = 5;
  const b = 3;
  console.log(a + b);`}
        />
      </div>
    ),
    options: ["8", "53", "undefined", "Error"],
    answer: "8",
  },

  {
    question: (
      <div>
        <p>How do you exit from Node REPL?</p>
        <CodeBlock language="bash" code={`.exit`} />
      </div>
    ),
    options: ["Ctrl + C", ".exit", "exit()", "close()"],
    answer: ".exit",
  },

  {
    question: (
      <div>
        <p>Identify the correct way to run this file:</p>
        <CodeBlock
          language="javascript"
          code={`// app.js
  console.log("Hello Node");`}
        />
      </div>
    ),
    options: ["node app.js", "npm app.js", "run app.js", "start app.js"],
    answer: "node app.js",
  },

  {
    question: (
      <div>
        <p>What is exported here?</p>
        <CodeBlock
          language="javascript"
          code={`const add = (a, b) => a + b;
  module.exports = add;`}
        />
      </div>
    ),
    options: ["Named export", "Default export", "No export", "Class export"],
    answer: "Default export",
  },

  {
    question: (
      <div>
        <p>How do you import this module?</p>
        <CodeBlock language="javascript" code={`module.exports = add;`} />
      </div>
    ),
    options: [
      `const add = require("./file")`,
      `import add from "./file"`,
      `require add from "./file"`,
      `const { add } = require("./file")`,
    ],
    answer: `const add = require("./file")`,
  },

  {
    question: (
      <div>
        <p>What type of export is this?</p>
        <CodeBlock
          language="javascript"
          code={`exports.add = add;
  exports.sub = sub;`}
        />
      </div>
    ),
    options: ["Default export", "Named export", "ES module", "Invalid export"],
    answer: "Named export",
  },

  {
    question: (
      <div>
        <p>How do you import named exports in CommonJS?</p>
        <CodeBlock
          language="javascript"
          code={`exports.add = add;
  exports.sub = sub;`}
        />
      </div>
    ),
    options: [
      `const { add, sub } = require("./file")`,
      `const add = require("./file")`,
      `import add from "./file"`,
      `require("./file")`,
    ],
    answer: `const { add, sub } = require("./file")`,
  },

  {
    question: (
      <div>
        <p>Identify ES6 default export:</p>
        <CodeBlock language="javascript" code={`export default add;`} />
      </div>
    ),
    options: [
      "Default export",
      "Named export",
      "CommonJS export",
      "Invalid syntax",
    ],
    answer: "Default export",
  },

  {
    question: (
      <div>
        <p>How to import ES6 default export?</p>
        <CodeBlock language="javascript" code={`export default add;`} />
      </div>
    ),
    options: [
      `import add from "./file.mjs"`,
      `const add = require("./file")`,
      `import { add } from "./file.mjs"`,
      `require("./file.mjs")`,
    ],
    answer: `import add from "./file.mjs"`,
  },

  {
    question: (
      <div>
        <p>Why is .mjs used?</p>
        <CodeBlock
          language="javascript"
          code={`import add from "./calculator.mjs";`}
        />
      </div>
    ),
    options: [
      "To enable ES6 modules",
      "To run REPL",
      "To install npm",
      "To create server",
    ],
    answer: "To enable ES6 modules",
  },
];

const Introductionto_Expressjs_MCQ_1 = ({
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

export default Introductionto_Expressjs_MCQ_1;
