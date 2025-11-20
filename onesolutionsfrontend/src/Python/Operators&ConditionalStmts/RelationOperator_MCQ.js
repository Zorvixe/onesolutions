import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print(30 > 15)`} />
      </div>
    ),
    options: ["True", "False", "30", "Error"],
    answer: "True",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock language="python" code={`print(12 < 8)`} />
      </div>
    ),
    options: ["True", "False", "12", "Error"],
    answer: "False",
  },
  {
    question: (
      <div>
        <p>What is the result?</p>
        <CodeBlock language="python" code={`print(7.5 <= 7.5)`} />
      </div>
    ),
    options: ["True", "False", "7.5", "Error"],
    answer: "True",
  },
  {
    question: (
      <div>
        <p>What does this print?</p>
        <CodeBlock language="python" code={`print(45 != 45)`} />
      </div>
    ),
    options: ["True", "False", "0", "Error"],
    answer: "False",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print("cat" == "Cat")`} />
      </div>
    ),
    options: ["True", "False", "cat", "Error"],
    answer: "False",
  },
  {
    question: (
      <div>
        <p>What error will this cause?</p>
        <CodeBlock language="python" code={`print(20 = = 20)`} />
      </div>
    ),
    options: [
      "No error",
      "SyntaxError: invalid syntax",
      "TypeError",
      "ValueError",
    ],
    answer: "SyntaxError: invalid syntax",
  },
  {
    question: (
      <div>
        <p>What is the result?</p>
        <CodeBlock language="python" code={`print(99.0 == 99)`} />
      </div>
    ),
    options: ["True", "False", "99.0", "Error"],
    answer: "True",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock language="python" code={`print("hello" != "Hello")`} />
      </div>
    ),
    options: ["True", "False", "hello", "Error"],
    answer: "True",
  },
  {
    question: (
      <div>
        <p>What error occurs here?</p>
        <CodeBlock language="python" code={`print(5 > = 3)`} />
      </div>
    ),
    options: [
      "No error",
      "SyntaxError: invalid syntax",
      "TypeError",
      "NameError",
    ],
    answer: "SyntaxError: invalid syntax",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print("Python" == "python")`} />
      </div>
    ),
    options: ["True", "False", "Python", "Error"],
    answer: "False",
  },

  {
    question: "Which operator checks if a value is greater than another?",
    options: [">", "<", "==", "!="],
    answer: ">",
  },
  {
    question: "Which operator checks if two values are equal?",
    options: ["=", "==", "===", "!="],
    answer: "==",
  },
  {
    question: "What does != mean in Python?",
    options: [
      "Is equal to",
      "Is not equal to",
      "Is greater than",
      "Assignment",
    ],
    answer: "Is not equal to",
  },
  {
    question: "Are string comparisons in Python case-sensitive?",
    options: ["Yes", "No", "Only sometimes", "Only with numbers"],
    answer: "Yes",
  },
  {
    question: "Which of these will cause a SyntaxError?",
    options: [
      "print(10 == 10)",
      "print(10 = 10)",
      "print(10 != 10)",
      "print(10 >= 10)",
    ],
    answer: "print(10 = 10)",
  },
];

const RelationOperator_MCQ = ({
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
      title="Relational Operators - MCQs"
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

export default RelationOperator_MCQ;
