import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../MCQLogic";

const Problem_sol_Debugging_5_MCQ = ({
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
  const questionsData = [
    // ==================== 10 CODE BLOCK QUESTIONS ====================

    {
      question: (
        <div>
          <p>What is the output?</p>
          <CodeBlock language="python" code={`print(17 // 5)`} />
        </div>
      ),
      options: [
        <span>3</span>,
        <span>3.4</span>,
        <span>2</span>,
        <span>Error</span>,
      ],
      answer: <span>3</span>,
    },

    {
      question: (
        <div>
          <p>What does floor division return?</p>
          <CodeBlock language="python" code={`print(10 // 3)`} />
        </div>
      ),
      options: [
        <span>3</span>,
        <span>3.33</span>,
        <span>1</span>,
        <span>10</span>,
      ],
      answer: <span>3</span>,
    },

    {
      question: (
        <div>
          <p>What is the final value of x?</p>
          <CodeBlock language="python" code={`x = 5\nx += 7\nprint(x)`} />
        </div>
      ),
      options: [
        <span>5</span>,
        <span>12</span>,
        <span>7</span>,
        <span>Error</span>,
      ],
      answer: <span>12</span>,
    },

    {
      question: (
        <div>
          <p>What will be printed?</p>
          <CodeBlock
            language="python"
            code={`a = 20\na -= 8\na *= 2\nprint(a)`}
          />
        </div>
      ),
      options: [
        <span>24</span>,
        <span>12</span>,
        <span>40</span>,
        <span>4</span>,
      ],
      answer: <span>24</span>,
    },

    {
      question: (
        <div>
          <p>What is the output?</p>
          <CodeBlock language="python" code={`print("Python\\nProgramming")`} />
        </div>
      ),
      options: [
        <span>
          Python
          <br />
          Programming
        </span>,
        <span>Python\nProgramming</span>,
        <span>PythonProgramming</span>,
        <span>Error</span>,
      ],
      answer: (
        <span>
          Python
          <br />
          Programming
        </span>
      ),
    },

    {
      question: (
        <div>
          <p>What does this print?</p>
          <CodeBlock language="python" code={`print("Hello\\tWorld")`} />
        </div>
      ),
      options: [
        <span>Hello World</span>,
        <span>HelloWorld</span>,
        <span>Hello\tWorld</span>,
        <span>Error</span>,
      ],
      answer: <span>Hello World</span>,
    },

    {
      question: (
        <div>
          <p>Which line prints correctly?</p>
          <CodeBlock language="python" code={`print('It's a beautiful day')`} />
        </div>
      ),
      options: [
        <span>It's a beautiful day</span>,
        <span>Error because of apostrophe</span>,
        <span>Its a beautiful day</span>,
        <span>None</span>,
      ],
      answer: <span>It's a beautiful day</span>,
    },

    {
      question: (
        <div>
          <p>What is the output?</p>
          <CodeBlock
            language="python"
            code={`print("He said, \\\"Python is fun!\\\"")`}
          />
        </div>
      ),
      options: [
        <span>He said, "Python is fun!"</span>,
        <span>He said, \"Python is fun!\"</span>,
        <span>Error</span>,
        <span>He said, Python is fun!</span>,
      ],
      answer: <span>He said, "Python is fun!"</span>,
    },

    {
      question: (
        <div>
          <p>What is the result?</p>
          <CodeBlock
            language="python"
            code={`num = 15\nnum %= 7\nprint(num)`}
          />
        </div>
      ),
      options: [
        <span>1</span>,
        <span>7</span>,
        <span>2</span>,
        <span>15</span>,
      ],
      answer: <span>1</span>,
    },

    {
      question: (
        <div>
          <p>What is printed?</p>
          <CodeBlock language="python" code={`print('Single' == "Single")`} />
        </div>
      ),
      options: [
        <span>True</span>,
        <span>False</span>,
        <span>Error</span>,
        <span>None</span>,
      ],
      answer: <span>True</span>,
    },

    // ==================== 5 NORMAL QUESTIONS ====================

    {
      question: "What does the // operator do in Python?",
      options: [
        "Regular division",
        "Returns the integral part of quotient (floor division)",
        "Returns remainder",
        "Multiplies numbers",
      ],
      answer: "Returns the integral part of quotient (floor division)",
    },

    {
      question: "Which of these is equivalent to x = x * 5?",
      options: ["x *= 5", "x =* 5", "x + 5", "x //= 5"],
      answer: "x *= 5",
    },

    {
      question: "Which escape sequence inserts a tab space?",
      options: ["\\n", "\\t", "\\\\", "\\'"],
      answer: "\\t",
    },

    {
      question:
        "How do you print: It's Python using double quotes without error?",
      options: [
        { id: 1, text: <code>print("It\'s Python")</code> },
        { id: 2, text: <code>print('It's Python')</code> },
        { id: 3, text: <code>print("It's Python")</code> },
        { id: 4, text: <code>print("Its Python")</code> },
      ],
      answer: 1, // print("It\'s Python")
    },

    {
      question: "Which compound operator gives the remainder?",
      options: ["+=", "/=", "%=", "-="],
      answer: "%=",
    },
  ];

  return (
    <MCQLogic
      title="Problem Solving & Debugging | Part 5 | MCQs"
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

export default Problem_sol_Debugging_5_MCQ;
