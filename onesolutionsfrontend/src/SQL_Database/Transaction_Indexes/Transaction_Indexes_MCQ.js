import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 5 CODE QUESTIONS ====================

  {
    question: (
      <>
        Which SQL statement starts a transaction?
        <CodeBlock language="sql" code={`BEGIN TRANSACTION;`} />
      </>
    ),
    options: [
      "START DB",
      "BEGIN TRANSACTION",
      "OPEN TRANSACTION",
      "INIT TRANSACTION",
    ],
    answer: "BEGIN TRANSACTION",
  },

  {
    question: (
      <>
        Which SQL statement saves all changes made in a transaction?
        <CodeBlock language="sql" code={`COMMIT;`} />
      </>
    ),
    options: ["ROLLBACK", "SAVEPOINT", "COMMIT", "END"],
    answer: "COMMIT",
  },

  {
    question: (
      <>
        Which SQL statement undoes all changes in a transaction?
        <CodeBlock language="sql" code={`ROLLBACK;`} />
      </>
    ),
    options: ["COMMIT", "UNDO", "ROLLBACK", "SAVE"],
    answer: "ROLLBACK",
  },

  {
    question: (
      <>
        Which SQL statement creates an index on a table?
        <CodeBlock
          language="sql"
          code={`CREATE INDEX idx_user_name
ON user(name);`}
        />
      </>
    ),
    options: [
      "CREATE TABLE index",
      "ADD INDEX",
      "CREATE INDEX idx_user_name ON user(name)",
      "MAKE INDEX",
    ],
    answer: "CREATE INDEX idx_user_name ON user(name)",
  },

  {
    question: (
      <>
        Which SQL statement removes an index?
        <CodeBlock language="sql" code={`DROP INDEX idx_user_name;`} />
      </>
    ),
    options: [
      "DELETE INDEX",
      "REMOVE INDEX",
      "DROP INDEX idx_user_name",
      "CLEAR INDEX",
    ],
    answer: "DROP INDEX idx_user_name",
  },

  // ==================== 10 THEORY QUESTIONS ====================

  {
    question: "What is a transaction?",
    options: [
      "A single SQL query",
      "A logical group of SQL statements",
      "A database table",
      "A database index",
    ],
    answer: "A logical group of SQL statements",
  },

  {
    question: "Which property ensures all or nothing execution?",
    options: ["Consistency", "Isolation", "Atomicity", "Durability"],
    answer: "Atomicity",
  },

  {
    question: "Which ACID property ensures database validity?",
    options: ["Atomicity", "Consistency", "Isolation", "Durability"],
    answer: "Consistency",
  },

  {
    question: "Which ACID property allows concurrent transactions safely?",
    options: ["Atomicity", "Consistency", "Isolation", "Durability"],
    answer: "Isolation",
  },

  {
    question: "Which ACID property guarantees data persistence after crash?",
    options: ["Atomicity", "Consistency", "Isolation", "Durability"],
    answer: "Durability",
  },

  {
    question: "ACID stands for?",
    options: [
      "Atomic, Correct, Isolated, Durable",
      "Atomicity, Consistency, Isolation, Durability",
      "Accurate, Consistent, Isolated, Durable",
      "Atomicity, Control, Isolation, Data",
    ],
    answer: "Atomicity, Consistency, Isolation, Durability",
  },

  {
    question: "Why are indexes used in databases?",
    options: [
      "To store data",
      "To delete records faster",
      "To speed up data retrieval",
      "To lock tables",
    ],
    answer: "To speed up data retrieval",
  },

  {
    question: "Indexes are similar to?",
    options: ["Primary keys", "Foreign keys", "Dictionary indexes", "Views"],
    answer: "Dictionary indexes",
  },

  {
    question: "Which operation can be slower due to indexes?",
    options: ["SELECT", "INSERT", "SEARCH", "READ"],
    answer: "INSERT",
  },

  {
    question: "Which command is used to permanently save transaction changes?",
    options: ["ROLLBACK", "COMMIT", "SAVEPOINT", "END"],
    answer: "COMMIT",
  },
];

const Transaction_Indexes_MCQ = ({
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
      title="Transactions & Indexes | MCQs"
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

export default Transaction_Indexes_MCQ;
