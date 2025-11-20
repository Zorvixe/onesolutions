import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // 10 CODE BLOCK QUESTIONS
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print("Apple")\nprint("Banana")`} />
      </div>
    ),
    options: [
      <span>AppleBanana</span>,
      <span>Apple Banana</span>,
      <span>
        Apple
        <br />
        Banana
      </span>,
      <span>Error</span>,
    ],
    answer: (
      <span>
        Apple
        <br />
        Banana
      </span>
    ),
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`print("Hi", end=" ")\nprint("Python")`}
        />
      </div>
    ),
    options: [
      <span>Hi Python</span>,
      <span>
        Hi
        <br />
        Python
      </span>,
      <span>HiPython</span>,
      <span>Error</span>,
    ],
    answer: <span>Hi Python</span>,
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`for i in range(4):\n    print("★", end="#")`}
        />
      </div>
    ),
    options: [
      <span>★★★★</span>,
      <span>★#★#★#★#</span>,
      <span>★#★#★#★</span>,
      <span>Error</span>,
    ],
    answer: <span>★#★#★#★#</span>,
  },
  {
    question: (
      <div>
        <p>What pattern is printed?</p>
        <CodeBlock
          language="python"
          code={`for i in range(3):\n    for j in range(5):\n        print("*", end=" ")\n    print()`}
        />
      </div>
    ),
    options: [
      <span>
        * * * * *<br />* * * * *<br />* * * * *
      </span>,
      <span>* * * * * * * * * * * * * * *</span>,
      <span>Error</span>,
    ],
    answer: (
      <span>
        * * * * *<br />* * * * *<br />* * * * *
      </span>
    ),
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`print("A", end="-")\nprint("B", end="-")\nprint("C")`}
        />
      </div>
    ),
    options: [
      <span>A-B-C</span>,
      <span>
        A-B
        <br />C
      </span>,
      <span>A B C</span>,
      <span>Error</span>,
    ],
    answer: <span>A-B-C</span>,
  },
  {
    question: (
      <div>
        <p>What does this do?</p>
        <CodeBlock language="python" code={`print("X", end="*")`} />
      </div>
    ),
    options: [
      "Prints X and moves to the next line",
      "Prints X* and stays on the same line",
      "Prints X and adds * on the next line",
      "Causes an error",
    ],
    answer: "Prints X* and stays on the same line",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`for i in range(6):\n    print(i, end="")`}
        />
      </div>
    ),
    options: [
      <span>012345</span>,
      <span>0 1 2 3 4 5</span>,
      <span>
        0<br />1<br />2<br />3<br />4<br />5
      </span>,
      <span>Error</span>,
    ],
    answer: <span>012345</span>,
  },
  {
    question: (
      <div>
        <p>What pattern appears?</p>
        <CodeBlock
          language="python"
          code={`for i in range(2):\n    for j in range(4):\n        print("#", end="")\n    print()`}
        />
      </div>
    ),
    options: [
      <span>
        ####
        <br />
        ####
      </span>,
      <span>########</span>,
      <span>
        # # # #<br /># # # #
      </span>,
      <span>Error</span>,
    ],
    answer: (
      <span>
        ####
        <br />
        ####
      </span>
    ),
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`print("Yes", end="!")\nprint("No")`}
        />
      </div>
    ),
    options: [
      <span>Yes!No</span>,
      <span>
        Yes!
        <br />
        No
      </span>,
      <span>Yes! No</span>,
      <span>Error</span>,
    ],
    answer: <span>Yes!No</span>,
  },
  {
    question: (
      <div>
        <p>How many stars in each row?</p>
        <CodeBlock
          language="python"
          code={`for i in range(4):\n    for j in range(3):\n        print("*", end=" ")\n    print()`}
        />
      </div>
    ),
    options: [
      <span>
        * * *<br />* * *<br />* * *<br />* * *
      </span>,
      <span>* * * * * * * * * * * *</span>,
      <span>Error</span>,
    ],
    answer: (
      <span>
        * * *<br />* * *<br />* * *<br />* * *
      </span>
    ),
  },

  // 5 NORMAL QUESTIONS
  {
    question: "What is the default value of end in print()?",
    options: ["space", "nothing", "newline (\\n)", "comma"],
    answer: "newline (\\n)",
  },
  {
    question: "How do you print everything on the same line?",
    options: ['end="\\n"', 'end=""', "sep=", 'print(" ")'],
    answer: 'end=""',
  },
  {
    question: "In nested loops, how do you go to the next line after a row?",
    options: ['print(end=" ")', "print()", 'print("\\n")', 'print("next")'],
    answer: "print()",
  },
  {
    question: 'What does print("Cat", end="-") followed by print("Dog") print?',
    options: ["Cat-Dog", "Cat<br/>Dog", "Cat- Dog", "CatDog"],
    answer: "Cat-Dog",
  },
  {
    question: "Which code prints 123 without spaces or newlines?",
    options: [
      "print(1,2,3)",
      'print("1","2","3")',
      'for i in "123": print(i, end="")',
      'print(1,2,3, sep="")',
    ],
    answer: 'for i in "123": print(i, end="")',
  },
];

const Problem_sol_6_MCQ = ({
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
      title="End Keyword - MCQs"
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

export default Problem_sol_6_MCQ;
