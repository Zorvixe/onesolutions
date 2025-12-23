import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 10 Code Block Questions ==========
  {
    question: (
      <div>
        <p>
          User enters: <b>22</b> What will be printed?
        </p>
        <CodeBlock
          language="python"
          code={`age = int(input())\nif age >= 18:\n    print("You are an adult")\nelse:\n    print("You are a minor")`}
        />
      </div>
    ),
    options: ["You are an adult", "You are a minor", "Error", "Nothing"],
    answer: "You are an adult",
  },
  {
    question: (
      <div>
        <p>
          User enters: <b>16</b> What is the output?
        </p>
        <CodeBlock
          language="python"
          code={`age = int(input())\nif age >= 18:\n    print("You can vote")\nelse:\n    print("Wait a few more years")`}
        />
      </div>
    ),
    options: ["You can vote", "Wait a few more years", "Error", "18"],
    answer: "Wait a few more years",
  },
  {
    question: (
      <div>
        <p>What error does this code produce?</p>
        <CodeBlock
          language="python"
          code={`if 50 > 30:\n    print("Yes")\n      print("This line has extra indent")`}
        />
      </div>
    ),
    options: [
      "No error",
      "IndentationError: unexpected indent",
      "SyntaxError",
      "NameError",
    ],
    answer: "IndentationError: unexpected indent",
  },
  {
    question: (
      <div>
        <p>What happens when this code runs?</p>
        <CodeBlock
          language="python"
          code={`else:\n    print("This is invalid")`}
        />
      </div>
    ),
    options: [
      "Prints the message",
      "SyntaxError: invalid syntax",
      "No output",
      "IndentationError",
    ],
    answer: "SyntaxError: invalid syntax",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`score = 85\nif score >= 80:\n    print("Great job!")\n    print("You got grade B")`}
        />
      </div>
    ),
    options: [
      "Great job!\nYou got grade B",
      "Great job!",
      "You got grade B",
      "Nothing",
    ],
    answer: "Great job!\nYou got grade B",
  },
  {
    question: (
      <div>
        <p>
          User enters: <b>44</b> What is output?
        </p>
        <CodeBlock
          language="python"
          code={`num = int(input())\nif num % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")`}
        />
      </div>
    ),
    options: ["Even", "Odd", "Error", "44"],
    answer: "Even",
  },
  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock
          language="python"
          code={`temp = 28\nif temp > 25:\n    print("It's warm outside")\n    print("Wear light clothes")`}
        />
      </div>
    ),
    options: [
      "It's warm outside\nWear light clothes",
      "Nothing",
      "Error",
      "28",
    ],
    answer: "It's warm outside\nWear light clothes",
  },
  {
    question: (
      <div>
        <p>What error occurs here?</p>
        <CodeBlock
          language="python"
          code={`if 10 == 10:\n    print("True")\nelse:\n    print("False")\n  print("This line is outside")`}
        />
      </div>
    ),
    options: [
      "No error",
      "IndentationError: unexpected indent",
      "SyntaxError",
      "The last print won't run",
    ],
    answer: "IndentationError: unexpected indent",
  },
  {
    question: (
      <div>
        <p>
          User enters: <b>100</b> What is printed?
        </p>
        <CodeBlock
          language="python"
          code={`marks = int(input())\nif marks >= 90:\n    print("Outstanding!")`}
        />
      </div>
    ),
    options: ["Outstanding!", "Nothing", "Error", "90"],
    answer: "Outstanding!",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`x = 5\nif x < 10:\n    print("Small number")\n    print("Done")`}
        />
      </div>
    ),
    options: ["Small number\nDone", "Small number", "Done", "Nothing"],
    answer: "Small number\nDone",
  },

  // ========== 5 Normal (Non-CodeBlock) Questions ==========
  {
    question: "What is a conditional block?",
    options: [
      "Code that always runs",
      "Code that runs only when condition is True",
      "Code inside a function",
      "Code with comments",
    ],
    answer: "Code that runs only when condition is True",
  },
  {
    question: "How is a conditional block identified in Python?",
    options: [
      "By parentheses",
      "By indentation (spaces)",
      "By curly braces",
      "By semicolons",
    ],
    answer: "By indentation (spaces)",
  },
  {
    question: "How many spaces are recommended for indentation in Python?",
    options: ["1", "2", "4", "Any number"],
    answer: "4",
  },
  {
    question: "Can 'else' be used without an 'if' statement?",
    options: ["Yes", "No", "Only in loops", "Only sometimes"],
    answer: "No",
  },
  {
    question:
      "What happens if the condition in 'if' is False and there is no 'else'?",
    options: [
      "Error occurs",
      "The conditional block runs anyway",
      "The conditional block is skipped",
      "Python waits for input",
    ],
    answer: "The conditional block is skipped",
  },
];

const ConditionalStmts_MCQ = ({
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
      title="Conditional Statements - MCQs"
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

export default ConditionalStmts_MCQ;
