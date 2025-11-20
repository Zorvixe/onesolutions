import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 10 Code Block Questions ==========
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`text = "Welcome"\nprint(text[1:4])`} />
      </div>
    ),
    options: ["Wel", "elc", "lco", "come"],
    answer: "elc",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock language="python" code={`word = "Python"\nprint(word[2:])`} />
      </div>
    ),
    options: ["Py", "tho", "thon", "Python"],
    answer: "thon",
  },
  {
    question: (
      <div>
        <p>What is the result?</p>
        <CodeBlock language="python" code={`msg = "HelloWorld"\nprint(msg[:5])`} />
      </div>
    ),
    options: ["Hello", "elloW", "World", "Hell"],
    answer: "Hello",
  },
  {
    question: (
      <div>
        <p>User enters: <code>25</code> and <code>30</code><br/>What is the output?</p>
        <CodeBlock
          language="python"
          code={`num1 = int(input())\nnum2 = int(input())\nprint(num1 + num2)`}
        />
      </div>
    ),
    options: ["2530", "55", "Error", "25 30"],
    answer: "55",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`age = 18\nprint("Age is " + str(age))`} />
      </div>
    ),
    options: ["Age is 18", "Age is age", "Error", "18"],
    answer: "Age is 18",
  },
  {
    question: (
      <div>
        <p>What will this print?</p>
        <CodeBlock language="python" code={`value = int("786")\nprint(value + 14)`} />
      </div>
    ),
    options: ["78614", "800", "786 + 14", "Error"],
    answer: "800",
  },
  {
    question: (
      <div>
        <p>What is the data type after conversion?</p>
        <CodeBlock language="python" code={`x = int("100")\nprint(type(x))`} />
      </div>
    ),
    options: ["<class 'str'>", "<class 'int'>", "<class 'float'>", "<class 'bool'>"],
    answer: "<class 'int'>",
  },
  {
    question: (
      <div>
        <p>What slice gives the middle part?</p>
        <CodeBlock language="python" code={`name = "Alexander"\nprint(name[2:7])`} />
      </div>
    ),
    options: ["Alex", "exand", "ander", "lexan"],
    answer: "exand",
  },
  {
    question: (
      <div>
        <p>User enters: <code>50</code><br/>What is printed?</p>
        <CodeBlock
          language="python"
          code={`marks = int(input())\nprint("You got " + str(marks) + " marks")`}
        />
      </div>
    ),
    options: ["You got 50 marks", "You got 50marks", "Error", "50"],
    answer: "You got 50 marks",
  },
  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock language="python" code={`city = "Mumbai"\nprint(city[:3])`} />
      </div>
    ),
    options: ["Mum", "bai", "Mumba", "umbai"],
    answer: "Mum",
  },

  // ========== 5 Normal (Non-CodeBlock) Questions ==========
  {
    question: "Which function converts a string number into a real integer?",
    options: ["str()", "int()", "float()", "bool()"],
    answer: "int()",
  },
  {
    question: "Which function converts any value into a string?",
    options: ["int()", "float()", "str()", "type()"],
    answer: "str()",
  },
  {
    question: "What is it called when we take a part of a string using indices?",
    options: ["String cutting", "String slicing", "String copying", "String splitting"],
    answer: "String slicing",
  },
  {
    question: "In string slicing text[3:6], which index is NOT included?",
    options: ["3", "6", "Both are included", "None"],
    answer: "6",
  },
  {
    question: "Why do we use int() on input() when adding two numbers?",
    options: [
      "Because input() returns a string",
      "Because input() returns a float",
      "To make it faster",
      "int() is optional",
    ],
    answer: "Because input() returns a string",
  },
];

const Type_Con_MCQ = ({
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
      title="Type Conversion & String Slicing - MCQs"
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

export default Type_Con_MCQ;
