import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is the primary purpose of a transaction in a database?</p>
      </div>
    ),
    options: [
      "To increase UI performance",
      "To group multiple SQL operations into a single logical unit",
      "To delete data permanently",
      "To store indexes",
    ],
    answer: "To group multiple SQL operations into a single logical unit",
  },
  {
    question: (
      <div>
        <p>Which ACID property ensures that either all operations succeed or none are applied?</p>
      </div>
    ),
    options: [
      "Consistency",
      "Isolation",
      "Atomicity",
      "Durability",
    ],
    answer: "Atomicity",
  },
  {
    question: (
      <div>
        <p>Which ACID property ensures that the database remains valid before and after a transaction?</p>
      </div>
    ),
    options: [
      "Atomicity",
      "Consistency",
      "Isolation",
      "Durability",
    ],
    answer: "Consistency",
  },
  {
    question: (
      <div>
        <p>Which ACID property handles concurrent transactions without interference?</p>
      </div>
    ),
    options: [
      "Durability",
      "Isolation",
      "Atomicity",
      "Consistency",
    ],
    answer: "Isolation",
  },
  {
    question: (
      <div>
        <p>Which ACID property guarantees data persistence after system crash?</p>
      </div>
    ),
    options: [
      "Atomicity",
      "Isolation",
      "Durability",
      "Consistency",
    ],
    answer: "Durability",
  },

  // SCENARIO BASED

  {
    question: (
      <div>
        <p>
          A bank transfer deducts money from one account but fails to add to another.
          Which ACID property is violated?
        </p>
      </div>
    ),
    options: [
      "Consistency",
      "Atomicity",
      "Isolation",
      "Durability",
    ],
    answer: "Atomicity",
  },
  {
    question: (
      <div>
        <p>
          Two users update the same data simultaneously and cause incorrect results.
          Which property is affected?
        </p>
      </div>
    ),
    options: [
      "Isolation",
      "Atomicity",
      "Durability",
      "Consistency",
    ],
    answer: "Isolation",
  },
  {
    question: (
      <div>
        <p>
          After a successful transaction, data is lost due to system crash.
          Which property failed?
        </p>
      </div>
    ),
    options: [
      "Durability",
      "Consistency",
      "Isolation",
      "Atomicity",
    ],
    answer: "Durability",
  },

  // INDEXES (HARD)

  {
    question: (
      <div>
        <p>What is the main purpose of using indexes in a database?</p>
      </div>
    ),
    options: [
      "To store data permanently",
      "To speed up data retrieval",
      "To delete duplicate records",
      "To enforce constraints",
    ],
    answer: "To speed up data retrieval",
  },
  {
    question: (
      <div>
        <p>What is the trade-off of using indexes?</p>
      </div>
    ),
    options: [
      "Slower SELECT queries",
      "Faster INSERT/UPDATE operations",
      "Extra storage and slower write operations",
      "Data inconsistency",
    ],
    answer: "Extra storage and slower write operations",
  },

  // CODE / SQL BASED

  {
    question: (
      <div>
        <p>What does this SQL statement do?</p>
        <CodeBlock
          language="sql"
          code={`BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;`}
        />
      </div>
    ),
    options: [
      "Deletes data",
      "Performs a transaction",
      "Creates index",
      "Drops table",
    ],
    answer: "Performs a transaction",
  },
  {
    question: (
      <div>
        <p>What happens if COMMIT is not executed?</p>
      </div>
    ),
    options: [
      "Changes are permanent",
      "Changes may be rolled back",
      "Database crashes",
      "Index is deleted",
    ],
    answer: "Changes may be rolled back",
  },
  {
    question: (
      <div>
        <p>Which command cancels a transaction?</p>
      </div>
    ),
    options: [
      "STOP",
      "ROLLBACK",
      "UNDO",
      "DELETE",
    ],
    answer: "ROLLBACK",
  },
  {
    question: (
      <div>
        <p>What does this SQL statement do?</p>
        <CodeBlock
          language="sql"
          code={`CREATE INDEX idx_name ON users(name);`}
        />
      </div>
    ),
    options: [
      "Deletes index",
      "Creates index on name column",
      "Updates table",
      "Joins tables",
    ],
    answer: "Creates index on name column",
  },
  {
    question: (
      <div>
        <p>Which scenario benefits MOST from indexing?</p>
      </div>
    ),
    options: [
      "Frequent INSERT operations",
      "Frequent SELECT searches on large tables",
      "Deleting records",
      "Updating all rows",
    ],
    answer: "Frequent SELECT searches on large tables",
  },
];

const MCQ_Exam_1= ({ subtopicId, goalName, courseName, onComplete }) => {
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
        courseName || "SQL & Databases"
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
      title="MCQ Exam 1"
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

export default MCQ_Exam_1;
