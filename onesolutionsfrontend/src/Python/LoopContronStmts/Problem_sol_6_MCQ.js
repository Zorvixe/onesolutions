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
    options: ["AppleBanana", "Apple Banana", "Apple\nBanana", "Error"],
    answer: "Apple\nBanana",
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
    options: ["Hi Python", "Hi\nPython", "HiPython", "Error"],
    answer: "Hi Python",
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
    options: ["★★★★", "★#★#★#★#", "★#★#★#★", "Error"],
    answer: "★#★#★#★#",
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
      "* * * * *\n* * * * *\n* * * * *",
      "* * * * * * * * * * * * * * *",
      "Error",
    ],
    answer: "* * * * *\n* * * * *\n* * * * *",
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
    options: ["A-B-C", "A-B\nC", "A B C", "Error"],
    answer: "A-B-C",
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
    options: ["012345", "0 1 2 3 4 5", "0\n1\n2\n3\n4\n5", "Error"],
    answer: "012345",
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
    options: ["####\n####", "########", "# # # #\n# # # #", "Error"],
    answer: "####\n####",
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
    options: ["Yes!No", "Yes!\nNo", "Yes! No", "Error"],
    answer: "Yes!No",
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
    options: ["* * *\n* * *\n* * *\n* * *", "* * * * * * * * * * * *", "Error"],
    answer: "* * *\n* * *\n* * *\n* * *",
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
    options: ["Cat-Dog", "Cat\nDog", "Cat- Dog", "CatDog"],
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
  onComplete,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (subtopicId && completedContent.includes(subtopicId)) {
      setIsCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleCompletion = async () => {
    if (isLoading || isCompleted) return;

    try {
      setIsLoading(true);

      const result = await markSubtopicComplete(
        subtopicId,
        goalName || "Goal 1",
        courseName || "Static Website: HTML CSS & Bootstrap"
      );

      if (result.success) {
        await loadProgressSummary();
        setIsCompleted(true);
        if (onComplete) onComplete();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MCQLogic
      title="Problem Solving | Part 6 - MCQs"
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
