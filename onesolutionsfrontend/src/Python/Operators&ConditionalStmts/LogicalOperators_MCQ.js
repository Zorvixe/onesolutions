import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print(25 > 20 and 30 == 30)`} />
      </div>
    ),
    options: ["True", "False", "Error", "30"],
    answer: "True",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock language="python" code={`print(40 < 35 and 50 > 45)`} />
      </div>
    ),
    options: ["True", "False", "40", "Error"],
    answer: "False",
  },
  {
    question: (
      <div>
        <p>What is the result?</p>
        <CodeBlock language="python" code={`print(9 == 9 or 10 != 10)`} />
      </div>
    ),
    options: ["True", "False", "9", "Error"],
    answer: "True",
  },
  {
    question: (
      <div>
        <p>What does this output?</p>
        <CodeBlock language="python" code={`print(60 < 50 or 70 > 80)`} />
      </div>
    ),
    options: ["True", "False", "Error", "70"],
    answer: "False",
  },
  {
    question: (
      <div>
        <p>What is printed?</p>
        <CodeBlock language="python" code={`print(not (12 > 6))`} />
      </div>
    ),
    options: ["True", "False", "12", "Error"],
    answer: "False",
  },
  {
    question: (
      <div>
        <p>What is the output here?</p>
        <CodeBlock language="python" code={`print(not (4 == 5))`} />
      </div>
    ),
    options: ["True", "False", "4", "Error"],
    answer: "True",
  },
  {
    question: (
      <div>
        <p>What will be the result?</p>
        <CodeBlock
          language="python"
          code={`print(150 >= 150 and 250 <= 249)`}
        />
      </div>
    ),
    options: ["True", "False", "Error", "150"],
    answer: "False",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock language="python" code={`print(35 > 30 or 45 == 45)`} />
      </div>
    ),
    options: ["True", "False", "Error", "45"],
    answer: "True",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock language="python" code={`print(not (18 < 20))`} />
      </div>
    ),
    options: ["True", "False", "18", "Error"],
    answer: "False",
  },
  {
    question: (
      <div>
        <p>What is the result?</p>
        <CodeBlock language="python" code={`print(55 < 60 or 65 > 70)`} />
      </div>
    ),
    options: ["True", "False", "Error", "60"],
    answer: "True",
  },

  {
    question: "Which logical operator returns True if both operands are True?",
    options: ["or", "not", "and", "xor"],
    answer: "and",
  },
  {
    question: "Which operator gives True if any one of the operands is True?",
    options: ["and", "or", "not", "none"],
    answer: "or",
  },
  {
    question: "What does the 'not' operator return?",
    options: [
      "True if operand is True",
      "The opposite value of the operand",
      "False if operand is False",
      "Error",
    ],
    answer: "The opposite value of the operand",
  },
  {
    question: "What is the result of False and False?",
    options: ["True", "False", "Error", "None"],
    answer: "False",
  },
  {
    question: "What is the result of True or False?",
    options: ["True", "False", "Error", "TrueFalse"],
    answer: "True",
  },
];

const LogicalOperators_MCQ = ({
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
      title="Logical Operators - MCQs"
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

export default LogicalOperators_MCQ;
