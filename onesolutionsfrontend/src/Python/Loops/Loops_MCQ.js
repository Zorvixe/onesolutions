import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>
          User enters: <b>3</b>
          <br />
          What will be printed?
        </p>
        <CodeBlock
          language="python"
          code={`num = int(input())\nwhile num < 6:\n    print(num + 1)\n    num += 1`}
        />
      </div>
    ),
    options: [
      <span>
        4<br />5<br />6
      </span>,
      <span>
        3<br />4<br />5
      </span>,
      <span>
        4<br />5
      </span>,
      <span>Infinite loop</span>,
    ],
    answer: (
      <span>
        4<br />5<br />6
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`i = 10\nwhile i > 7:\n    print(i)\n    i -= 1`}
        />
      </div>
    ),
    options: [
      <span>
        10
        <br />9<br />8
      </span>,
      <span>
        10
        <br />9<br />8<br />7
      </span>,
      <span>
        9<br />8<br />7
      </span>,
      <span>Infinite loop</span>,
    ],
    answer: (
      <span>
        10
        <br />9<br />8
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>How many times does "Hello" print?</p>
        <CodeBlock
          language="python"
          code={`count = 1\nwhile count <= 5:\n    print("Hello")\n    count += 1`}
        />
      </div>
    ),
    options: [
      <span>
        Hello
        <br />
        Hello
        <br />
        Hello
        <br />
        Hello
        <br />
        Hello
      </span>,
      <span>
        Hello
        <br />
        Hello
        <br />
        Hello
        <br />
        Hello
      </span>,
      <span>
        Hello
        <br />
        Hello
        <br />
        Hello
      </span>,
      <span>Infinite Hello</span>,
    ],
    answer: (
      <span>
        Hello
        <br />
        Hello
        <br />
        Hello
        <br />
        Hello
        <br />
        Hello
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`x = 0\nwhile x < 10:\n    x += 3\n    print(x)`}
        />
      </div>
    ),
    options: [
      <span>
        3<br />6<br />9
      </span>,
      <span>
        0<br />3<br />6<br />9
      </span>,
      <span>
        3<br />6<br />9<br />
        12
      </span>,
      <span>Infinite loop</span>,
    ],
    answer: (
      <span>
        3<br />6<br />9
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`n = 5\nwhile n < 20:\n    print(n)\n    n *= 2`}
        />
      </div>
    ),
    options: [
      <span>
        5<br />
        10
      </span>,
      <span>
        5<br />
        10
        <br />
        20
      </span>,
      <span>
        5<br />
        10
        <br />
        20
        <br />
        40
      </span>,
      <span>Infinite loop</span>,
    ],
    answer: (
      <span>
        5<br />
        10
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What happens here?</p>
        <CodeBlock
          language="python"
          code={`count = 1\nwhile count < 5:\n    print(count)`}
        />
      </div>
    ),
    options: [
      <span>
        1<br />2<br />3<br />4
      </span>,
      <span>
        1<br />2<br />3<br />4<br />5
      </span>,
      <span>Infinite loop (prints 1 forever)</span>,
      <span>NameError</span>,
    ],
    answer: <span>Infinite loop (prints 1 forever)</span>,
  },

  {
    question: (
      <div>
        <p>What error occurs?</p>
        <CodeBlock
          language="python"
          code={`while num < 10:\n    print(num)\n    num += 1`}
        />
      </div>
    ),
    options: [
      <span>IndentationError</span>,
      <span>NameError: name 'num' is not defined</span>,
      <span>Infinite loop</span>,
      <span>SyntaxError</span>,
    ],
    answer: <span>NameError: name 'num' is not defined</span>,
  },

  {
    question: (
      <div>
        <p>How many numbers are printed?</p>
        <CodeBlock
          language="python"
          code={`i = 2\nwhile i <= 8:\n    print(i)\n    i += 2`}
        />
      </div>
    ),
    options: [
      <span>
        2<br />4<br />6<br />8
      </span>,
      <span>
        2<br />4<br />6
      </span>,
      <span>
        4<br />6<br />8
      </span>,
      <span>Infinite loop</span>,
    ],
    answer: (
      <span>
        2<br />4<br />6<br />8
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock
          language="python"
          code={`a = 7\nwhile a > 0:\n    print(a)\n    a -= 2`}
        />
      </div>
    ),
    options: [
      <span>
        7<br />5<br />3<br />1
      </span>,
      <span>
        7<br />5<br />3
      </span>,
      <span>
        6<br />4<br />2<br />0
      </span>,
      <span>Infinite loop</span>,
    ],
    answer: (
      <span>
        7<br />5<br />3<br />1
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`k = 1\nwhile k <= 4:\n    print("Run")\n    k += 1`}
        />
      </div>
    ),
    options: [
      <span>
        Run
        <br />
        Run
        <br />
        Run
        <br />
        Run
      </span>,
      <span>
        Run
        <br />
        Run
        <br />
        Run
      </span>,
      <span>
        Run
        <br />
        Run
      </span>,
      <span>Infinite Run</span>,
    ],
    answer: (
      <span>
        Run
        <br />
        Run
        <br />
        Run
        <br />
        Run
      </span>
    ),
  },

  {
    question: "The while loop keeps running as long as the ______ is True.",
    options: ["print statement", "condition", "variable name", "indentation"],
    answer: "condition",
  },

  {
    question: "What is the most common reason for an infinite while loop?",
    options: [
      "Forgetting to update the counter variable",
      "Using print() too many times",
      "Wrong indentation",
      "Missing colon",
    ],
    answer: "Forgetting to update the counter variable",
  },

  {
    question:
      "What error occurs if you use a variable in while condition without initializing it?",
    options: ["SyntaxError", "IndentationError", "NameError", "Infinite loop"],
    answer: "NameError",
  },

  {
    question: "Which of these is required for a proper while loop?",
    options: [
      "Initialization + Condition + Update",
      "Only condition",
      "Only update",
      "Only print statement",
    ],
    answer: "Initialization + Condition + Update",
  },

  {
    question: "In a while loop, when should the counter be updated?",
    options: [
      "Before the loop starts",
      "Inside the loop body",
      "After the loop ends",
      "Never",
    ],
    answer: "Inside the loop body",
  },
];
const Loops_MCQ = ({
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

  const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5);
  return (
    <MCQLogic
      title="Loops - MCQs"
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

export default Loops_MCQ;
