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
          code={`import math\nprint(math.sqrt(25))`}
        />
      </div>
    ),
    options: ["25", "5.0", "5", "Error"],
    answer: "5.0",
  },

  {
    question: (
      <div>
        <p>What will this print?</p>
        <CodeBlock
          language="python"
          code={`import random\nprint(random.randint(1, 6))`}
        />
      </div>
    ),
    options: [
      "A number between 1 and 6 (inclusive)",
      "Always 1",
      "Always 6",
      "Error",
    ],
    answer: "A number between 1 and 6 (inclusive)",
  },

  {
    question: (
      <div>
        <p>
          How do you import only <b>sqrt</b> from math?
        </p>
        <CodeBlock language="python" code={`from math import _____`} />
      </div>
    ),
    options: ["sqrt", "math.sqrt", "import sqrt", "math"],
    answer: "sqrt",
  },

  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock language="python" code={`import math as m\nprint(m.pi)`} />
      </div>
    ),
    options: ["3.14", "3.14159...", "Error", "None"],
    answer: "3.14159...",
  },

  {
    question: (
      <div>
        <p>Which line picks a random fruit?</p>
        <CodeBlock
          language="python"
          code={`import random\nfruits = ["apple", "banana", "orange"]\nprint(random.choice(fruits))`}
        />
      </div>
    ),
    options: [
      "random.choice(fruits)",
      "random.randint(fruits)",
      "fruits.random()",
      "random.select(fruits)",
    ],
    answer: "random.choice(fruits)",
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`numbers = [1, 2, 3, 4]\nsquared = list(map(lambda x: x*x, numbers))\nprint(squared)`}
        />
      </div>
    ),
    options: ["[1, 4, 9, 16]", "[1, 2, 3, 4]", "10", "Error"],
    answer: "[1, 4, 9, 16]",
  },

  {
    question: (
      <div>
        <p>What is the result?</p>
        <CodeBlock
          language="python"
          code={`from functools import reduce\nnums = [1, 2, 3, 4]\nprint(reduce(lambda x, y: x + y, nums))`}
        />
      </div>
    ),
    options: ["10", "[1, 2, 3, 4]", "24", "Error"],
    answer: "10",
  },

  {
    question: (
      <div>
        <p>Which list is produced?</p>
        <CodeBlock
          language="python"
          code={`list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4, 5, 6]))`}
        />
      </div>
    ),
    options: ["[2, 4, 6]", "[1, 3, 5]", "[1, 2, 3, 4, 5, 6]", "Error"],
    answer: "[2, 4, 6]",
  },

  {
    question: (
      <div>
        <p>Which of these are built-in functions?</p>
        <CodeBlock
          language="python"
          code={`len([1,2,3])\nmax(10, 20)\nsqrt(16)`}
        />
      </div>
    ),
    options: ["Only len() and max()", "All three", "Only sqrt()", "None"],
    answer: "Only len() and max()",
  },

  {
    question: (
      <div>
        <p>How to use math functions with a short name?</p>
        <CodeBlock language="python" code={`import math as _____`} />
      </div>
    ),
    options: ["m", "math", "maths", "import"],
    answer: "m",
  },

  {
    question: "Which of these is part of the Python Standard Library?",
    options: ["numpy", "pandas", "random", "flask"],
    answer: "random",
  },

  {
    question: "What keyword brings a module into your program?",
    options: ["include", "using", "import", "require"],
    answer: "import",
  },

  {
    question: "What does map() do?",
    options: [
      "Filters items",
      "Applies a function to every item in a sequence",
      "Adds all numbers",
      "Sorts a list",
    ],
    answer: "Applies a function to every item in a sequence",
  },

  {
    question: "Which module helps generate random numbers?",
    options: ["math", "random", "datetime", "os"],
    answer: "random",
  },

  {
    question: "To use reduce(), you must import it from:",
    options: ["math", "random", "functools", "collections"],
    answer: "functools",
  },
];

const Python_Standard_Library_MCQ = ({
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
      title="Python Standard Library | MCQs"
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

export default Python_Standard_Library_MCQ;
